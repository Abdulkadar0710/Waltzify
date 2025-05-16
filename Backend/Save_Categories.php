<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    die(json_encode(["result" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);
error_log(print_r($data, true));

$selectedCategories = $data['selectedCategories'];

if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

$results = [];

foreach ($selectedCategories as $categoryId) {
    // Insert the category into the database without checking if it already exists
    $insertQuery = "INSERT INTO save_selected_categories (categoryId) VALUES (?)";
    $insertStmt = $conn->prepare($insertQuery);
    $insertStmt->bind_param("i", $categoryId);

    if ($insertStmt->execute()) {
        $results[] = ["categoryId" => $categoryId, "result" => "Category Saved successfully"];
    } else {
        $results[] = ["categoryId" => $categoryId, "result" => "Error: " . $conn->error];
    }

    $insertStmt->close();
}

$conn->close();

// Return all results as JSON
echo json_encode($results);
?>

