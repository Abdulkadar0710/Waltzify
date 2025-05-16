<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
error_reporting(E_ALL);

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

$id = $_GET['id'] ?? null;

if (!$id) {
    echo json_encode(['error' => 'Invalid company ID']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM deliverycompany WHERE Id = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    $company = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($company) {
        echo json_encode($company);
    } else {
        echo json_encode(['error' => 'No company found for this ID']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Failed to fetch company: ' . $e->getMessage()]);
}
?>
