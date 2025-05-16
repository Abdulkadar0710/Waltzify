<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

// Database connection
$conn = new mysqli("localhost", "root", "", "waltzer");

// Check connection
if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

// SQL query
$sql = "SELECT 
    p.Id,
    p.pname, 
    p.SKU,
    p.category,
    p.brand,
    p.color,
    p.description,
    p.img1,
    p.img2,
    p.img3,
    p.img4,
    p.weight,
    p.length,
    p.breadth,
    p.height,
    p.size,
    p.p_price,
    p.discount,
    p.pQuantity,
    p.Stock,
    p.igstn,
    ROUND(AVG(ur.Rating), 1) as average_rating
FROM 
    products p 
LEFT JOIN 
    user_review ur 
ON 
    p.Id = ur.ProductId 

GROUP BY 
    pname";

$result = $conn->query($sql);

if ($result === false) {
    // Log the error message
    file_put_contents('error_log.txt', "Query Error: " . $conn->error . "\nQuery: $sql\n", FILE_APPEND);
    echo json_encode(['error' => 'Database query failed']);
    exit;
}

$products = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

$conn->close();
echo json_encode($products);
?>

