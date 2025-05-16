<?php
error_reporting(0);
include('token.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Database connection
$servername = "localhost";
$username = "root";
// $password = "rootroot";
$password = "";
$dbname = "waltzer"; // Replace with your database name

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Get the raw POST data
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Fetch JSON input
    $data = json_decode(file_get_contents('php://input'), true);

    // Debug: Check if OrderId is received correctly
    if (isset($data['OrderId'])) {
        error_log("OrderId received: " . $data['OrderId']); // Log to server logs
        $orderId = $data['OrderId'];
    } else {
        error_log("OrderId not received."); // Log to server logs
        echo json_encode(["result" => "OrderId not received"]);
        exit();
    }

    $sql = "SELECT 
        checkout.Id AS checkoutId,
        checkout.OrderId,
        checkout.price AS checkoutPrice,
        checkout.timestamp AS checkoutTimestamp,
        checkout.customerName,
        checkout.phone,
        checkout.addressId,
        checkout.userId,
        checkout.paymode,
        order_items.Id AS orderItemId,
        order_items.OrderId AS orderItemOrderId,
        order_items.productId,
        order_items.productName AS orderItemProductName,
        order_items.quantity,
        order_items.price AS orderItemPrice,
        order_items.timestamp AS orderItemTimestamp,
        useraddress.*,
        products.*  
    FROM 
        checkout
    JOIN 
        order_items ON checkout.Id = order_items.OrderId
    JOIN 
        useraddress ON checkout.addressId = useraddress.addressId
    JOIN 
        user ON checkout.userId = user.Id
    JOIN 
        products ON order_items.productId = products.Id
    WHERE 
        checkout.OrderId = '$orderId'";

    $result = $conn->query($sql);

    // Check if any rows are returned
    if ($result->num_rows > 0) {
        $orderDetails = [];
        while ($row = $result->fetch_assoc()) {
            $orderDetails[] = $row;
        }

        // Prepare order items
        $orderItems = [];
        foreach ($orderDetails as $item) {
            $orderItems[] = [
                'name' => $item['orderItemProductName'],
                'sku' => $item['SKU'], // SKU number from products table
                'units' => $item['quantity'],
                'selling_price' => $item['orderItemPrice'],
                'discount' => "", // Adjust if needed
                'tax' => "", // Adjust if needed
                'hsn' => "" // Adjust if needed
            ];
        }

        // Prepare data for Shiprocket API
        $postData = [
            'order_id' => $orderDetails[0]['OrderId'],
            'order_date' => $orderDetails[0]['checkoutTimestamp'],
            'pickup_location' => "Primary",
            'billing_customer_name' => $orderDetails[0]['customerName'],
            "billing_last_name" => "",
            'billing_address' => $orderDetails[0]['Address1'],
            'billing_address_2' => "",
            'billing_city' => $orderDetails[0]['City'],
            'billing_pincode' => $orderDetails[0]['Pincode'],
            'billing_country' => "India",
            "billing_state" => $orderDetails[0]['State'],
            'billing_email' => $orderDetails[0]['email'],
            'billing_phone' => $orderDetails[0]['Number'],
            'shipping_is_billing' => true,
            'order_items' => $orderItems,
            'payment_method' => $orderDetails[0]['paymode'],
            'shipping_charges' => 0, 
            'giftwrap_charges' => 0, 
            'transaction_charges' => 0, 
            'total_discount' => 0, 
            'sub_total' => $orderDetails[0]['checkoutPrice'],
            'length' => $orderDetails[0]['length'], 
            'breadth' => $orderDetails[0]['breadth'],
            'height' => $orderDetails[0]['height'],
            'weight' => $orderDetails[0]['weight']
        ];

        // Initialize cURL for Shiprocket API
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => json_encode($postData),
            CURLOPT_HTTPHEADER => array(
                "Content-Type: application/json",
                "Authorization: Bearer $token" // Replace with actual token
            ),
        ));

        $SR_login_Response = curl_exec($curl);
        curl_close($curl);

        $response = json_decode($SR_login_Response, true);
        if (isset($response['status_code']) && $response['status_code'] === 1 && isset($response['order_id'])) {
            $shiprocketOrderId = $response['order_id'];
            $sql = "UPDATE checkout set shiprocket_order_id = '$shiprocketOrderId', order_status = 'Placed' WHERE OrderId = '$orderId'";
            if ($conn->query($sql) === TRUE) {
            echo json_encode(["result" => "Order successfully placed with Shiprocket!"]);
            include ('update_products_quantity.php'); // Replace with the actual path    
        }
            //echo json_encode(["result" => "Order successfully placed with Shiprocket!"]);

        } 
        
    } else {
        echo json_encode(["result" => "No data found for the given OrderId"]);
    }
    
    $conn->close();
}
?>

