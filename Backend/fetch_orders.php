<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT 
    checkout.Id AS checkoutId,
    checkout.OrderId,
    FORMAT(checkout.price, 2) AS checkoutPrice,  -- Format price to 2 decimal places
    checkout.timestamp AS checkoutTimestamp,
    checkout.customerName,
    checkout.phone,
    checkout.addressId,
    checkout.userId,
    checkout.paymode,
    checkout.payment_status,
    checkout.order_status,
    order_items.Id AS orderItemId,
    order_items.OrderId AS orderItemOrderId,
    order_items.productId,
    order_items.productName AS orderItemProductName,
    SUM(order_items.quantity) AS totalQuantityOrdered, -- Total quantity ordered for each product
    ROUND(order_items.price, 2) AS orderItemPrice, -- Round order item price to 2 decimal places
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
GROUP BY 
    order_items.productId, checkout.Id, order_items.Id, checkout.OrderId, 
    checkout.timestamp, checkout.customerName, checkout.phone, 
    checkout.addressId, checkout.userId, checkout.paymode, 
    order_items.price, order_items.timestamp, useraddress.addressId, products.Id LIMIT 6";

$result = $conn->query($sql);

$orderProducts = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $orderProducts[] = $row;
    }
}

$conn->close();
echo json_encode($orderProducts);
?>
