<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
// header('Content-Type: application/json');

// Database connection
$conn = new mysqli("localhost", "root", "", "waltzer");
// Check for connection errors
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the user ID from the query parameter
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Initialize an empty array to hold user data
$userProfile = array();

if ($id > 0) {
    // Prepare SQL query to fetch user data based on the ID using prepared statements
    $stmt = $conn->prepare("SELECT * FROM user WHERE Id = ?");
    $stmt->bind_param("i", $id);  // 'i' denotes the parameter type as integer
    $stmt->execute();
    $result = $stmt->get_result();

    // If user data is found, fetch and store it
    if ($result->num_rows > 0) {
        $userProfile = $result->fetch_assoc();  // Fetch a single row as an associative array
    } else {
        // If no user is found, return an error message
        $userProfile['error'] = "User not found";
    }

    // Close the statement
    $stmt->close();
} else {
    // If invalid ID, return an error message
    $userProfile['error'] = "Invalid user ID";
}

// Close the database connection
$conn->close();

// Return user data as JSON
echo json_encode($userProfile);
?>
