<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: DELETE, POST");

$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === "DELETE" || $method === "POST") {
    // Read JSON input (for POST requests)
    $data = json_decode(file_get_contents("php://input"), true);
    $category_id = isset($data['Id']) ? intval($data['Id']) : null;

    if (!$category_id) {
        echo json_encode(["error" => "Invalid Category ID"]);
        exit;
    }

    $query = "DELETE FROM category WHERE category_id = ?";
    $statement = $conn->prepare($query);
    $statement->bind_param("i", $category_id);

    if ($statement->execute()) {
        echo json_encode(["success" => "Category deleted successfully"]);
    } else {
        echo json_encode(["error" => "Error deleting category: " . $conn->error]);
    }

    $statement->close();
}

$conn->close();
?>
