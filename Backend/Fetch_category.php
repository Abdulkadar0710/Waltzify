<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection
$host = 'localhost';
$dbname = 'waltzer';
$username = 'root';
// $password = 'rootroot';
$password = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// Check if 'id' is provided in the query string
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

try {
    if ($id > 0) {
        // Fetch a specific category
        $stmt = $pdo->prepare("SELECT category_id, cname, image FROM category WHERE category_id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $category = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$category) {
            echo json_encode(['error' => 'Category not found']);
        } else {
            echo json_encode($category);
        }
    } else {
        // Fetch all categories
        $stmt = $pdo->query("SELECT category_id, cname, image FROM category ORDER BY category_id ASC");
        $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (empty($categories)) {
            echo json_encode(['error' => 'No categories found']);
        } else {
            echo json_encode($categories);
        }
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
