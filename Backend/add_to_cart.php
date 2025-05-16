<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    die(json_encode(["result" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);
error_log(print_r($data, true));

$userId = $data['userId'];
$productId = $data['productId'];

if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// Check if the product is already in the cart for this user
$checkQuery = "SELECT * FROM cart WHERE UserId = ? AND ProductId = ?";
$stmt = $conn->prepare($checkQuery);
$stmt->bind_param("ii", $userId, $productId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Product already exists in the cart
    echo json_encode(["result" => "This product is already in your cart"]);
} else {
    // Insert the product into the cart if not already present
    $insertQuery = "INSERT INTO cart (UserId, ProductId) VALUES (?, ?)";
    $insertStmt = $conn->prepare($insertQuery);
    $insertStmt->bind_param("ii", $userId, $productId);

    if ($insertStmt->execute()) {
        echo json_encode(["result" => "Product added to cart successfully"]);
    } else {
        echo json_encode(["result" => "Error: " . $conn->error]);
    }

    $insertStmt->close();
}

$stmt->close();
$conn->close();
?>
