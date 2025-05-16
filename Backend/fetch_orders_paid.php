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


$sql = "SELECT COUNT(Id) AS total_orders FROM checkout WHERE payment_status = 'Success' AND order_status = 'Delivered'";
$result = $conn->query($sql);

$totalOrderPaid = array();
if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    // Format the sum to 2 decimal places
    $totalOrders = $row['total_orders'];
    $totalOrderPaid['total_orders'] = $totalOrders;
} else {
    $totalOrdrePaid['total_orders'] = '0.00';
}

$conn->close();
echo json_encode($totalOrderPaid);
?>
