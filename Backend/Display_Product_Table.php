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

$sql = "SELECT pname,img1,product_Id,p_price,quantity,sale,stock FROM products AS p JOIN productlist AS pl on p.Id = pl.product_Id ";
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
