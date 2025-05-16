<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");

// Database connection
$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    die(json_encode(["result" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);
$userId = $data['userId'];
$productId = $data['productId'];

// Check if the product is already in the user's wishlist
$checkSql = "SELECT * FROM wishlist WHERE UserId = ? AND ProductId = ?";
$checkStmt = $conn->prepare($checkSql);
$checkStmt->bind_param("ii", $userId, $productId);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult->num_rows > 0) {
    // Product is already in wishlist
    echo json_encode(["result" => "This product is already in your wishlist"]);
} else {
    // Insert product into wishlist
    $insertSql = "INSERT INTO wishlist (UserId, ProductId) VALUES (?, ?)";
    $insertStmt = $conn->prepare($insertSql);
    $insertStmt->bind_param("ii", $userId, $productId);
    
    if ($insertStmt->execute()) {
        echo json_encode(["result" => "Product added to Wishlist successfully"]);
    } else {
        echo json_encode(["result" => "Error: " . $conn->error]);
    }

    $insertStmt->close();
}

$checkStmt->close();
$conn->close();
?>
