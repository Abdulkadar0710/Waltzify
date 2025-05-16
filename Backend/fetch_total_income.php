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

// Query to calculate the sum of prices with payment_status = 'Success'
$sql = "SELECT SUM(price) AS total_sum FROM checkout WHERE payment_status = 'Success'";
$result = $conn->query($sql);

$totalIncome = array();
if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    // Format the sum to 2 decimal places
    $totalSum = number_format($row['total_sum'], 2, '.', '');
    $totalIncome['total_sum'] = $totalSum;
} else {
    $totalIncome['total_sum'] = '0.00';
}

$conn->close();
echo json_encode($totalIncome);
?>
