<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit();
}

// Database connection
$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    die(json_encode([["result" => "Connection failed: " . $conn->connect_error]]));
}

// Read input data
$data = json_decode(file_get_contents("php://input"), true);
$password = $data['password'] ?? '';

// Check if the user is logged in and if OTP and expiration time exist
if (!isset($_SESSION['email']) || !isset($_SESSION['otp']) || !isset($_SESSION['otp_expiration']) || !isset($_SESSION['otp_verified']) || $_SESSION['otp_verified'] !== true) {
    echo json_encode([["result" => "Session expired or OTP not verified. Please try again."]]);
    exit();
}

// Check if the OTP has expired
$current_time = time();
error_log('Current time: ' . $current_time);
error_log('OTP expiration time: ' . $_SESSION['otp_expiration']);

if ($current_time > $_SESSION['otp_expiration']) {
    echo json_encode([["result" => "OTP has expired. Please request a new one."]]);
    session_unset(); // Clear the session
    session_destroy(); // Destroy the session
    exit();
}

// Validate password
if (empty($password)) {
    echo json_encode([["result" => "All fields are required!"]]);
    exit();
}

// Get the user's email from the session
$email = $_SESSION['email'];

// Hash the password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Update password in the database
$stmt = $conn->prepare("UPDATE user SET password = ? WHERE email = ?");
if ($stmt) {
    $stmt->bind_param("ss", $hashed_password, $email);
    if ($stmt->execute()) {
        echo json_encode([["result" => "Password updated successfully!"]]);
        session_unset(); // Clear the session after password update
        session_destroy(); // Destroy the session after password update
    } else {
        echo json_encode([["result" => "Not Submitted, Please try again!"]]);
    }
    $stmt->close();
} else {
    echo json_encode([["result" => "Failed to prepare statement."]]);
}

$conn->close(); 
?>






