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

$data = json_decode(file_get_contents("php://input"), true);
$orderId = $data['OrderId'] ?? null;

if (!$orderId) {
    die(json_encode(["success" => false, "error" => "Order ID is missing."]));
}

// SQL query to fetch order details based on the given OrderId
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
    checkout.shipping_status,
    order_items.productId,
    order_items.productName AS orderItemProductName,
    order_items.quantity AS productQuantity, -- Total quantity for each product
    ROUND(order_items.price, 2) AS orderItemPrice, -- Round order item price to 2 decimal places
    useraddress.*,
    products.productName AS productName,
    products.price AS productPrice 
FROM 
    checkout
JOIN 
    order_items ON checkout.OrderId = order_items.OrderId
JOIN 
    useraddress ON checkout.addressId = useraddress.addressId
JOIN 
    user ON checkout.userId = user.Id
JOIN 
    products ON order_items.productId = products.Id
WHERE 
    checkout.OrderId = ?"; // Filter by specific OrderId

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $orderId); // Bind the OrderId as a parameter
$stmt->execute();
$result = $stmt->get_result();

$products = array();
if ($result->num_rows > 0) {
    // Fetch the order details and products for the given OrderId
    while($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

$conn->close();

// Send the fetched data back as a JSON response
echo json_encode(["success" => true, "orderDetails" => $products]);
?>
