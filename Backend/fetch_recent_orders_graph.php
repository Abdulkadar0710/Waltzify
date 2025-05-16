<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// Database connection
$conn = new mysqli("localhost", "root", "", "waltzer");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get today's and yesterday's date
$today = date('Y-m-d');
$yesterday = date('Y-m-d', strtotime('-1 day'));

// Query to get today's and yesterday's orders
$sqlRecentOrders = "
    SELECT Id, timestamp, payment_status, order_status 
    FROM checkout 
    WHERE payment_status = 'Success' 
    AND order_status = 'Delivered' 
    AND DATE(timestamp) IN ('$today', '$yesterday') 
    ORDER BY timestamp DESC";

// Fetch recent orders
$response['recent_orders'] = array();
if ($resultRecentOrders = $conn->query($sqlRecentOrders)) {
    while ($row = $resultRecentOrders->fetch_assoc()) {
        $response['recent_orders'][] = $row;
    }
}

// Count orders for today and yesterday
$response['orders_count'] = [
    'today' => 0,
    'yesterday' => 0
];

// Count today's orders
$sqlTodayCount = "SELECT COUNT(*) as count FROM checkout WHERE DATE(timestamp) = '$today' AND payment_status = 'Success' AND order_status = 'Delivered'";
$resultTodayCount = $conn->query($sqlTodayCount);
if ($row = $resultTodayCount->fetch_assoc()) {
    $response['orders_count']['today'] = $row['count'];
}

// Count yesterday's orders
$sqlYesterdayCount = "SELECT COUNT(*) as count FROM checkout WHERE DATE(timestamp) = '$yesterday' AND payment_status = 'Success' AND order_status = 'Delivered'";
$resultYesterdayCount = $conn->query($sqlYesterdayCount);
if ($row = $resultYesterdayCount->fetch_assoc()) {
    $response['orders_count']['yesterday'] = $row['count'];
}

// Close connection
$conn->close();

// Send JSON response
echo json_encode($response);
?>
