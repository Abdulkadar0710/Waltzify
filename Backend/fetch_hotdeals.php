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

$sql = "SELECT 
    p.Id,
    p.pname, 
    p.SKU,
    p.category,
    p.brand,
    p.color,
    p.date,
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
WHERE 
    p.discount >= 10 
GROUP BY 
   pname";
$result = $conn->query($sql);

$products = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

$conn->close();
echo json_encode($products);
?>
