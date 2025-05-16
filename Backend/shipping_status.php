<?php
/* use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception; */

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json; charset=UTF-8");

/* require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php'; */

$servername = "localhost";
$username = "root";
// $password = "rootroot";
$password = "";
$dbname = "waltzer";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);
$orderIds = $data['OrderIds'] ?? [];

if (empty($orderIds)) {
    die(json_encode(["error" => "No Order IDs provided."]));
}

foreach ($orderIds as $orderId) {
    // Update shipping status to "Processing" for each Order ID
    $sql = "UPDATE checkout SET shipping_status = 'Processing' WHERE OrderId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $orderId);
    $result = $stmt->execute();

    if (!$result) {
        die(json_encode(["error" => "Failed to update shipping status for Order ID $orderId."]));
    }

}

// If all orders processed successfully
echo json_encode(["success" => true, "message" => "Shipping Status is updated successfully."]);

$conn->close();
?>




