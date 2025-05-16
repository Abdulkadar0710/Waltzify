<?php
error_reporting(0);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// $conn = mysqli_connect("localhost", "root", "rootroot", "waltzer");
$conn = mysqli_connect("localhost", "root", "", "waltzer");

if ($conn === false) {
    die("ERROR: Couldn't connect" . mysqli_connect_error());
}


$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['userId']) || !isset($data['productId'])) {
    echo json_encode(['success' => false, 'error' => 'Invalid input']);
    exit;
}

$userId = $data['userId'];
$productId = $data['productId'];



// Check connection
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'error' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

// Prepare the SQL statement to delete the item from the cart
$stmt = $conn->prepare("DELETE FROM cart WHERE UserId = ? AND ProductId = ?");
$stmt->bind_param("ii", $userId, $productId);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to remove item from cart']);
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
