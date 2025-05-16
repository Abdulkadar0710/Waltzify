<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit();
}

$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    echo json_encode([["result" => "Database connection failed: " . $conn->connect_error]]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'] ?? null;
    $email = $_POST['email'] ?? null;
    $gender = $_POST['gender'] ?? null;
    $phone = $_POST['phone'] ?? null;
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    // Build the query dynamically based on what fields are provided
    $fields = [];
    $params = [];
    $types = '';

    if ($name) {
        $fields[] = "name = ?";
        $params[] = $name;
        $types .= 's';
    }
    if ($email) {
        $fields[] = "email = ?";
        $params[] = $email;
        $types .= 's';
    }
    if ($gender) {
        $fields[] = "gender = ?";
        $params[] = $gender;
        $types .= 's';
    }
    if ($phone) {
        $fields[] = "phone = ?";
        $params[] = $phone;
        $types .= 's';
    }
    $params[] = $id; // Add the user ID for the WHERE clause
    $types .= 'i';   // The last parameter (ID) is an integer

    if (count($fields) > 0) {
        // Only update if we have fields to update
        $query = "UPDATE user SET " . implode(", ", $fields) . " WHERE Id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param($types, ...$params);

        if ($stmt->execute()) {
            $result = "Updated Successfully!";
        } else {
            $result = "Update failed. Please try again!";
        }

        $stmt->close();
    } else {
        $result = "No fields to update.";
    }

    $conn->close();
    echo json_encode(["result" => $result]); 
} else {
    echo json_encode(["result" => "Invalid request"]);
}
?>
