<?php
// Enable error reporting
$successCount = 0;
$errorMessages = [];
error_reporting(0);
ini_set('display_errors', 1);

// Set headers for CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');

// Database connection parameters
$servername = "localhost";
$username = "root";
// $password = "rootroot";
$password = "";
$dbname = "waltzer";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to fetch order items and related product details
$sql = "SELECT order_items.productId, order_items.quantity AS ordered_quantity, products.pQuantity AS available_quantity 
        FROM order_items 
        JOIN products ON order_items.productId = products.Id";
$result = $conn->query($sql);

$response = []; // Array to collect all responses

// Check if the query returned results
if ($result->num_rows > 0) {
    // Iterate through each order item
    while($row = $result->fetch_assoc()) {
        $productId = $row['productId'];
        $orderedQuantity = $row['ordered_quantity'];
        $availableQuantity = $row['available_quantity'];

        // Check if there is enough stock
        if ($availableQuantity >= $orderedQuantity) {
            // Calculate the new quantity
            $newQuantity = $availableQuantity - $orderedQuantity;

            // Determine stock status based on the new quantity
            $stockStatus = $newQuantity > 0 ? 'In Stock' : 'Out of Stock';

            // Update the product's quantity and stock status using placeholders
            $updateSql = "UPDATE products 
                          SET pQuantity = ?, Stock = ? 
                          WHERE Id = ?";
            $updateStmt = $conn->prepare($updateSql);
            
            // Bind parameters: i for integer, s for string
            $updateStmt->bind_param("isi", $newQuantity, $stockStatus, $productId);

            // Execute the update
            if ($updateStmt->execute()) {
                $successCount++; // Increment success counter
            } else {
                //$errorMessages[] = "Error updating product ID $productId: " . $conn->error;
            }

            $updateStmt->close();
        } else {
            // Notify that the requested quantity exceeds available stock
            //$errorMessages[] = "Only $availableQuantity quantity available for product ID $productId";
        }
    }
} else {
    //$errorMessages[] = "No order items found";
}

// Build a summarized response
$response = [
    //"success_count" => $successCount,
    //"errors" => $errorMessages
];

// Return a single JSON response containing all results
///echo json_encode($responses);

// Close the database connection
$conn->close();
?>




