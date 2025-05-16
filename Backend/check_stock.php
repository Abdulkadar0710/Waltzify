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

// Get the cart items from the request
$data = json_decode(file_get_contents("php://input"), true);

$outOfStockItems = [];

foreach ($data as $cartItem) {
    $productId = $cartItem['productId'];
    $requestedQuantity = $cartItem['quantity'];

    // Query to get the stock for the current product
    $query = "SELECT pQuantity FROM products WHERE Id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $productId);  // Bind $productId as an integer (assuming it's an integer)
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $stock = $row['pQuantity'];

        // If requested quantity exceeds available stock, add to out of stock items
        if ($requestedQuantity > $stock) {
            $outOfStockItems[] = $cartItem;
        }
    }
}

if (count($outOfStockItems) > 0) {
    echo json_encode([
        "success" => false,
        "outOfStockItems" => $outOfStockItems
    ]);
} else {
    echo json_encode([
        "success" => true
    ]);
}
$stmt->close();
$conn->close();
?>
