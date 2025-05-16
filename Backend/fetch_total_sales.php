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


$sql = "SELECT COUNT(Id) AS total_sales FROM checkout WHERE payment_status = 'Success'";
$result = $conn->query($sql);

$totalSale = array();
if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    // Format the sum to 2 decimal places
    $totalSales = $row['total_sales'];
    $totalSale['total_sales'] = $totalSales;
} else {
    $totalSale['total_sales'] = '0.00';
}

$conn->close();
echo json_encode($totalSale);
?>
