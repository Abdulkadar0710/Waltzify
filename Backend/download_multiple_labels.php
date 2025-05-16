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

// Decode the incoming JSON request
$data = json_decode(file_get_contents("php://input"), true);
$orderIds = $data['orderIds'] ?? [];

if (empty($orderIds)) {
    echo json_encode(["error" => "No Order IDs provided."]);
    exit();
}

// Prepare a SQL query with IN clause to handle multiple order IDs
$orderIdsPlaceholder = implode(',', array_fill(0, count($orderIds), '?'));

            $sql = "SELECT 
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
            SUM(order_items.quantity) AS totalQuantity, -- Summing quantities
            GROUP_CONCAT(products.SKU SEPARATOR ', ') AS SKU, -- Grouping SKUs
            useraddress.Address1 AS billingAddress,
            useraddress.Pincode,
            useraddress.City,
            useraddress.State,
            useraddress.FullName AS shippingName,
            useraddress.Number AS shippingPhone,
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
            checkout.OrderId IN ($orderIdsPlaceholder)
        GROUP BY 
            checkout.OrderId";

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
        $orders[] = $row;
    }
    echo json_encode($orders);
} else {
    echo json_encode(["error" => "No order data found."]);
}

$conn->close();
?>

