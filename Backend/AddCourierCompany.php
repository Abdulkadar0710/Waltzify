<?php
// Allow from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST");

// Set content type to application/json
header("Content-Type: application/json; charset=UTF-8");

// Database connection
$servername = "localhost";  // Your server name
$username = "root";         // Your MySQL username
$password = "";             // Your MySQL password
$dbname = "Waltzer"; // Your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Get the POST data
$data = json_decode(file_get_contents("php://input"), true);

// Validate input data
if (empty($data['courierCompany']) || empty($data['companyURL'])) {
    echo json_encode([["result" => "All fields are required!"]]);
    exit;
}

$courierCompany = $conn->real_escape_string($data['courierCompany']);
$companyURL = $conn->real_escape_string($data['companyURL']);

// Insert data into the DeliveryCompany table
$sql = "INSERT INTO DeliveryCompany (Courier_Company, Tracking_URL) VALUES (?,?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $courierCompany, $companyURL);
if ($stmt->execute()) {
    echo json_encode([["result" => "Courier Company added successfully!"]]);
} else {
    echo json_encode([["result" => "Not Submitted, Please try again!"]]);
}

// Close the connection
$stmt->close();
$conn->close();
?>
