<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

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

// Get addressId from query parameter
$addressId = isset($_GET['addressId']) ? $_GET['addressId'] : null;

if (empty($addressId)) {
    echo json_encode(['error' => 'Invalid address ID']);
    exit;
}

// Read the JSON body
$data = json_decode(file_get_contents("php://input"), true);

// Validate the received data
$fullName = isset($data['FullName']) ? $data['FullName'] : null;
$number = isset($data['Number']) ? $data['Number'] : null;
$pincode = isset($data['Pincode']) ? $data['Pincode'] : null;
$state = isset($data['State']) ? $data['State'] : null;
$addressOne = isset($data['AddressOne']) ? $data['AddressOne'] : null;
$addressTwo = isset($data['AddressTwo']) ? $data['AddressTwo'] : null;
$addressThree = isset($data['AddressThree']) ? $data['AddressThree'] : null;
$city = isset($data['City']) ? $data['City'] : null;
$landmark = isset($data['Landmark']) ? $data['Landmark'] : null;
$gstin = isset($data['GSTIN']) ? $data['GSTIN'] : null;

if (empty($fullName) || empty($number) || empty($pincode) || empty($state) || empty($addressOne) || empty($city)) {
    echo json_encode(['error' => 'All required fields must be filled']);
    exit;
}

// Update the address in the database
try {
    $stmt = $pdo->prepare("UPDATE useraddress 
                           SET FullName = ?, Number = ?, Pincode = ?, State = ?, Address1 = ?, Address2 = ?, Address3 = ?, City = ?, Landmark = ?, GSTIN = ? 
                           WHERE addressId = ?");
    $stmt->execute([$fullName, $number, $pincode, $state, $addressOne, $addressTwo, $addressThree, $city, $landmark, $gstin, $addressId]);

    echo json_encode(['success' => true, 'message' => 'Address updated successfully']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Failed to update address: ' . $e->getMessage()]);
}
?>
