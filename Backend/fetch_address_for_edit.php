<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection
$host = 'localhost';
$dbname = 'waltzer';
$username = 'root';
// $password = "rootroot";
$password = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// Get userId from query parameter
$addressId = isset($_GET['addressId']) ? $_GET['addressId'] : null;

if (empty($addressId)) {
    echo json_encode(['error' => 'Invalid user ID']);
    exit;
}

// Fetch addresses
try {
    // Log the userId for debugging
    error_log("Fetching addresses items for addressId: " . $addressId);

    $stmt = $pdo->prepare("SELECT * FROM useraddress WHERE addressId = :addressId");
    $stmt->bindParam(':addressId', $addressId, PDO::PARAM_INT);
    $stmt->execute();
    $addresses = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Log the number of addresses fetched for debugging
    error_log("Number of addresses fetched: " . count($addresses));

    if (empty($addresses)) {
        echo json_encode(['addresses' => [], 'message' => 'No address found for this addressId']);
    } else {
        echo json_encode(['addresses' => $addresses]);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Failed to fetch addresses: ' . $e->getMessage()]);
}
?>
