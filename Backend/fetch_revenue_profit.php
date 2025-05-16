<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set CORS headers to allow access from all origins
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET");

// Database connection
$conn = new mysqli("localhost", "root", "", "waltzer");

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Get today's date
$dateToday = date('Y-m-d');

// Query to calculate the sum of prices for products sold today
$sql = "SELECT SUM(price) AS revenue FROM checkout 
        WHERE payment_status = 'Success' AND DATE(timestamp) = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $dateToday);
$stmt->execute();
$result = $stmt->get_result();

$totalIncome = [
    'revenue' => '0.00',
    'profit' => '10',
];

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    
    // Format the revenue to 2 decimal places
    $revenue = number_format((float)$row['revenue'], 2, '.', '');
    
    // Assuming profit is equal to revenue since cost is not available
    $profit = $revenue;

    // Prepare the response
    $totalIncome['revenue'] = $revenue;
    $totalIncome['profit'] = $profit; // Displaying profit as revenue
}

// Close connection
$stmt->close();
$conn->close();

// Send JSON response
echo json_encode($totalIncome);
?>
