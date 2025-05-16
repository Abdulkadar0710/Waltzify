<?php
include('token.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "localhost";
$username = "root";
// $password = "rootroot"; //for hoisting on aws server arzan
$password = "";
$dbname = "waltzer"; // Replace with your database name

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);
$orderId = $data['OrderId'] ?? null;

if (!$orderId) {
    die(json_encode(["error" => "Order ID is missing."]));
}

// Fetch the Shiprocket order ID associated with this order
$sql = "SELECT shiprocket_order_id FROM checkout WHERE OrderId = '$orderId'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $shiprocketOrderId = $row['shiprocket_order_id'];
} else {
    die(json_encode(["error" => "Order not found."]));
}

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://apiv2.shiprocket.in/v1/external/courier/track?order_id=$shiprocketOrderId",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_HTTPGET  => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_HTTPHEADER => array(
       "Authorization: Bearer $token"
    ),
));
$response = curl_exec($curl);
curl_close($curl);

echo $response;

$conn->close();
?>
