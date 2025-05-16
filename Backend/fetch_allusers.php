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
    user.name, 
    user.email, 
    user.phone, 
    useraddress.Pincode,
    useraddress.State,
    useraddress.City,
    useraddress.Address1, 
    MAX(checkout.timestamp) AS last_order_date, 
    COUNT(order_items.productId) AS total_products, 
    SUM(checkout.price) AS total_price   
FROM 
    checkout 
JOIN 
    order_items ON checkout.Id = order_items.orderId 
JOIN 
    products ON order_items.productId = products.Id 
JOIN 
    user ON checkout.userId = user.Id 
JOIN 
    useraddress ON checkout.addressId = useraddress.addressId
GROUP BY 
    user.Id, 
    user.name, 
    user.email, 
    user.phone, 
    useraddress.Address1
ORDER BY 
    last_order_date DESC";
$result = $conn->query($sql);

$products = array();
if ($result->num_rows > 0) { 
    while($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

$conn->close();
echo json_encode($products); 
?>
