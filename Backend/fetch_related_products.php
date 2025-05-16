<?php
// Enable error reporting
error_reporting(E_ALL);
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

// Fetch product IDs from GET request
$ids = isset($_GET['ids']) ? $_GET['ids'] : '';
$idsArray = explode(',', $ids);

// Ensure there are product IDs to process
if (empty($ids) || count($idsArray) == 0) {
    echo json_encode(['error' => 'No product IDs provided']);
    exit;
}

// Generate placeholders for SQL IN clause
$placeholders = implode(',', array_fill(0, count($idsArray), '?'));

// Prepare the SQL statement
/* $stmt = $conn->prepare("SELECT * FROM products WHERE category IN (SELECT category FROM products WHERE id IN ($placeholders)) AND id NOT IN ($placeholders)"); */
$stmt = $conn->prepare("SELECT 
    p.*, 
    IFNULL(AVG(ur.Rating), 0) as average_rating 
FROM 
    products p 
LEFT JOIN 
    user_review ur 
ON 
    p.Id = ur.ProductId 
WHERE 
    p.category IN (SELECT category FROM products WHERE id IN ($placeholders)) 
    AND p.id NOT IN ($placeholders) 
GROUP BY 
    p.Id");

// Check if statement preparation was successful
if ($stmt === false) {
    echo json_encode(['error' => $conn->error]);
    exit;
}

// Bind the parameters to the placeholders
$types = str_repeat('i', count($idsArray) * 2);
$params = array_merge($idsArray, $idsArray);
$stmt->bind_param($types, ...$params);

// Execute the statement
$stmt->execute();

// Get the result
$result = $stmt->get_result();
$relatedProducts = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $relatedProducts[] = $row;
    }
}

// Close the statement and connection
$stmt->close();
$conn->close();

// Return the related products as JSON
echo json_encode($relatedProducts);
?>
