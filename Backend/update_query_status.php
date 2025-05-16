<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection
$conn = new mysqli("localhost", "root", "", "waltzer");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Read the JSON input
$input = json_decode(file_get_contents("php://input"), true);
$userIds = $input['userIds'] ?? [];
$status = $input['status'] ?? 'Solved';

// Check if there are user IDs to update
if (!empty($userIds)) {
    // Prepare the SQL statement
    $stmt = $conn->prepare("UPDATE contact_form SET status = ? WHERE Id = ?");
    if (!$stmt) {
        $response = ["success" => false, "message" => "Statement preparation failed: " . $conn->error];
        echo json_encode($response);
        $conn->close();
        exit();
    }

    $stmt->bind_param("si", $status, $userId);

    // Update each user by ID
    $affectedRows = 0;
    foreach ($userIds as $userId) {
        $stmt->execute();
        $affectedRows += $stmt->affected_rows;
    }

    // Check for errors
    if ($affectedRows > 0) {
        $response = ["success" => true, "message" => "Status updated for selected users."];
    } else {
        $response = ["success" => false, "message" => "No rows were updated."];
    }

    $stmt->close();
} else {
    $response = ["success" => false, "message" => "No user IDs provided."];
}

$conn->close();

// Return the response as JSON
echo json_encode($response);
?>
