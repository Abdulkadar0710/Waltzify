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
    $query = "UPDATE checkout SET payment_status = 'COD Payment Not Received'  WHERE OrderId = ? AND paymode = 'COD'";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $orderId);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => "Payment status updated successfully"]);
    } else {
        echo json_encode(["error" => "Error updating payment status: " . $stmt->error]);
    }
    
    $stmt->close();
} else {
    echo json_encode(["error" => "Invalid orderId"]);
}

$conn->close();
?>
