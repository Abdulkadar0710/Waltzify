<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');

// Include database connection
$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Retrieve the raw POST data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate the OrderId as a string
$orderId = isset($data['OrderId']) ? $data['OrderId'] : '';

if (!empty($orderId)) {
    // Update payment status for COD orders
    $query = "UPDATE checkout SET order_status ='Delivered', shipping_status = 'Shipped' WHERE OrderId = ? AND paymode = 'Prepaid' AND payment_status = 'Success'";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $orderId);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => "Delivery status updated successfully"]);
    } else {
        echo json_encode(["error" => "Error updating payment status: " . $stmt->error]);
    }
    
    $stmt->close();
} else {
    echo json_encode(["error" => "Invalid orderId"]);
}

$conn->close();
?>
