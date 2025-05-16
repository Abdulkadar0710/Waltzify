<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

// Enable error reporting for debugging
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

// Get categoryId from query parameter
$id = isset($_GET['id']) ? $_GET['id'] : null;

if (empty($id)) {
    echo json_encode(['error' => 'Invalid collection ID']);
    exit;
}

// Fetch category
try {
    // Log the categoryId for debugging
    error_log("Fetching collection for Id: " . $id);

    $stmt = $pdo->prepare("SELECT * FROM collection WHERE Id = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    $collection = $stmt->fetch(PDO::FETCH_ASSOC); // Fetch single category

    if ($collection) {
        echo json_encode($collection);
    } else {
        echo json_encode(['error' => 'No collection found for this id']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Failed to fetch collection : ' . $e->getMessage()]);
}
?>
