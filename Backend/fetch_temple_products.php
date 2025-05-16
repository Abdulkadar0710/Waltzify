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
    p.*, 
    IFNULL(average_ratings.avg_rating, 0) AS average_rating,
    IFNULL(SUM(s.quantity), 0) AS total_sales
FROM 
    (SELECT 
        * 
     FROM 
        products 
     ORDER BY 
        Id DESC 
     LIMIT 8) p
LEFT JOIN 
    (SELECT 
        p1.pname, 
        AVG(ur.Rating) AS avg_rating
     FROM 
        products p1
     LEFT JOIN 
        user_review ur 
     ON 
        p1.Id = ur.ProductId
     GROUP BY 
        p1.pname) average_ratings
ON 
    p.pname = average_ratings.pname
LEFT JOIN 
    order_items s
ON 
    p.Id = s.productId
GROUP BY 
    p.Id
ORDER BY 
    total_sales DESC, p.Id DESC;
";


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
