<?php
 error_reporting(0);
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

// Get the OrderId from the GET request
if ($_SERVER['REQUEST_METHOD'] == 'GET') { // Change this to GET
    $orderId = isset($_GET['id']) ? $_GET['id'] : ''; // Extract and ensure OrderId is an integer

    if ($orderId === 0) {
        echo json_encode(["error" => "Invalid OrderId"]);
        exit(); // Exit early if no valid OrderId is provided
    }

    // Update the SQL query to use the correct JOIN condition
    $sql = "SELECT 
            checkout.Id AS checkoutId,
            checkout.OrderId,
            checkout.price AS checkoutPrice,
            checkout.timestamp AS checkoutTimestamp,
            checkout.customerName AS billingName,
            checkout.phone AS billingPhone,
            checkout.addressId,
            checkout.userId,
            checkout.paymode,
            checkout.payment_status,
            checkout.order_status,
            checkout.shipping_status,
            checkout.invoiceNo,
            checkout.trackingId,
            checkout.fssai,
            order_items.Id AS orderItemId,
            order_items.productId,
            order_items.productName AS orderItemProductName,
            order_items.quantity,
            order_items.price AS orderItemPrice,
            order_items.timestamp AS orderItemTimestamp,
            useraddress.Address1 AS billingAddress,
            useraddress.Pincode,
            useraddress.City,
            useraddress.State,
            useraddress.FullName AS shippingName,
            useraddress.Number AS shippingPhone,
            products.SKU,
            products.Id,
            products.HSN,
            products.igstn,
            useraddress.GSTIN,
            checkout.deliveryCharges,
            products.*,  
            user.email AS billingEmail
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
            checkout.OrderId = ?";

    // Use a prepared statement to avoid SQL injection
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $orderId); // Bind the orderId to the query
    $stmt->execute();
    $result = $stmt->get_result();

    $products = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
        echo json_encode($products); // Return the result as JSON
    } else {
        echo json_encode([]); // Return an empty array if no rows are found
    }

} else {
    echo json_encode(["result" => "Invalid request method"]);
}

$conn->close(); 
?>

