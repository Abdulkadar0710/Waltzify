<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "root";
// $password = "rootroot";
$password = "";
$dbname = "waltzer";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}
$data = json_decode(file_get_contents("php://input"), true);
$orderIds = $data['orderIds'] ?? [];

if (empty($orderIds)) {
    echo json_encode(["error" => "No Order IDs provided."]);
    exit();
}

// Prepare a SQL query with IN clause to handle multiple order IDs
$orderIdsPlaceholder = implode(',', array_fill(0, count($orderIds), '?'));
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
            checkout.deliveryCharges,
            checkout.invoiceNo,
            checkout.trackingId,
            checkout.fssai,
            checkout.deliveryCharges,
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
            useraddress.GSTIN,
            useraddress.FullName AS shippingName,
            useraddress.Number AS shippingPhone,
            products.SKU,
            products.igstn,
            user.email AS billingEmail,
            useraddress.GSTIN,
            products.p_price AS unitPrice,
            products.discount,
            products.Id,
            products.SKU,
            products.HSN
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
            checkout.OrderId IN ($orderIdsPlaceholder)";

// Prepare the statement
$stmt = $conn->prepare($sql);

// Check if the statement preparation was successful
if (!$stmt) {
    echo json_encode(["error" => "SQL Error: " . $conn->error]);
    exit();
}

// Dynamically bind the parameters for the IN clause
$stmt->bind_param(str_repeat('s', count($orderIds)), ...$orderIds);

// Execute the query
if (!$stmt->execute()) {
    echo json_encode(["error" => "Query execution failed: " . $stmt->error]);
    exit();
}

$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $orders = [];
    while ($row = $result->fetch_assoc()) {
        $orderId = $row['OrderId'];
        
        // Initialize order if not already present
        if (!isset($orders[$orderId])) {
            $orders[$orderId] = [
                'checkoutId' => $row['checkoutId'],
                'OrderId' => $row['OrderId'],
                'checkoutPrice' => floatval($row['checkoutPrice']),
                'checkoutTimestamp' => $row['checkoutTimestamp'],
                'billingName' => $row['billingName'],
                'billingPhone' => $row['billingPhone'],
                'addressId' => $row['addressId'],
                'discount' => $row['discount'],
                'unitPrice'=> $row['unitPrice'],
                'userId' => $row['userId'],
                'paymode' => $row['paymode'],
                'HSN'  => $row['HSN'],
                'payment_status' => $row['payment_status'],
                'order_status' => $row['order_status'],
                'shipping_status' => $row['shipping_status'],
                'invoiceNo' => $row['invoiceNo'],
                'trackingId' => $row['trackingId'],
                'deliveryCharges' => $row['deliveryCharges'],
                'fssai' => $row['fssai'],
                'billingAddress' => $row['billingAddress'],
                'Pincode' => $row['Pincode'],
                'City' => $row['City'],
                'State' => $row['State'],
                'shippingName' => $row['shippingName'],
                'GSTIN'        => $row['GSTIN'],
                'shippingPhone' => $row['shippingPhone'],
                'billingEmail' => $row['billingEmail'],
                'SKU'     => $row['SKU'],
                'Id'  =>$row['Id'],
                 'igstn' => $row['igstn'],
                'products' => [],
                'totalQuantity' => 0,
                'totalTax' => 0,
                'totalAmount' => 0 // Initialize total amount
            ];
        }

        // Calculate tax for the product
        $discount  = $row['discount'];
        $unitPrice = $row['unitPrice'];
        $productPrice = floatval($row['orderItemPrice']);
        /* $discountedPrice = ($row['discount'] > 0) ? ($row['unitPrice'] - ($row['unitPrice'] * ($row['discount'] / 100))) : $row['unitPrice']; */ // Use unitPrice if discount is 0
        /* $discountedPrice = floatval($row['unitPrice'] - ($row['unitPrice'] * ($row['discount']) / 100)); */
        // Calculate discounted price using if-else
            if ($row['discount']> 0) {
                $discountedPrice = floatval(($row['unitPrice'] - ($row['unitPrice'] * ($row['discount'] / 100))) *100 /(100 + $row['igstn'])); // Apply discount
            } else {
                $discountedPrice = floatval($row['unitPrice'] * 100 / (100 + $row['igstn'])); // If discount is 0, set discountedPrice to unitPrice
            }
        $quantity = floatval($row['quantity']);
        $igstn = floatval($row['igstn']);
        $tax = $discountedPrice * $quantity * ($igstn / 100);
        $HSN = $row['HSN'];
        // Update total quantity, tax, and amount for the order
        $orders[$orderId]['totalQuantity'] += $quantity;
        $orders[$orderId]['totalTax'] += $tax;
        $orders[$orderId]['totalAmount'] += ($discountedPrice * $quantity) + $tax;

        // Append detailed product information
        $orders[$orderId]['products'][] = [
            'productId' => $row['productId'],
            'productName' => $row['orderItemProductName'],
            'quantity' => $quantity,
            'unitPrice' => $discountedPrice,
            'HSN'      => $row['HSN'],
            'SKU'     => $row['SKU'],
            'Id'     => $row['Id'],
            'price' => number_format($productPrice, 2), // Show price with 2 decimal places
            'totalProductPrice' => $discountedPrice * $quantity,
            'igstn' => $igstn, // Add tax rate to product info
            'totalTax' => number_format($tax, 2), // Add calculated tax to product info
            'totalAmount' => ($discountedPrice * $quantity) + $tax // Add total amount for the product
        ];
    }


    // Output the grouped orders with detailed product info
    echo json_encode(array_values($orders));
} else {
    echo json_encode(["error" => "No order data found."]);
}

$conn->close();

?>
