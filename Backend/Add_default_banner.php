<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers to allow CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header('Content-Type: application/json');

// Database connection
$conn = new mysqli("localhost", "root", "", "waltzer");

// Check for connection errors
if ($conn->connect_error) {
    die(json_encode(["result" => "Database connection failed: " . $conn->connect_error]));
}

// Ensure the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    // Check if a file was uploaded
    if (!isset($_FILES['image'])) {
        echo json_encode(["result" => "No file uploaded"]);
        exit();
    }

    // Retrieve form data
    $location = $_POST['location'] ?? '';
    $image = $_FILES['image']['name'] ?? '';
    $tmp = $_FILES['image']['tmp_name'] ?? '';

    // Set the upload folder
    $uploadDir = $_SERVER['DOCUMENT_ROOT'] . '/DefaultBanner/';
    
    // Ensure the upload directory exists
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Generate a unique filename to prevent overwriting
    $imageName = time() . "_" . basename($image);
    $targetFile = $uploadDir . $imageName;

    // Move uploaded file to the destination folder
    if (move_uploaded_file($tmp, $targetFile)) {
        
        // Insert into database
        $query = "INSERT INTO defaultbanner (location, image) VALUES (?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ss", $location, $imageName);
        $res = $stmt->execute();

        if ($res) {
            echo json_encode(["result" => "Banner Added Successfully!", "image" => $imageName]);
        } else {
            echo json_encode(["result" => "Database insertion failed"]);
        }
        $stmt->close();
    } else {
        echo json_encode(["result" => "File upload failed"]);
    }
} else {
    echo json_encode(["result" => "Invalid request method"]);
}

$conn->close();
?>
