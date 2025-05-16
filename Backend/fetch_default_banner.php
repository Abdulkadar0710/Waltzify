<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin:  *");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM defaultbanner ORDER BY Id DESC LIMIT 1";
$result = $conn->query($sql);

$defaultbanner = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $defaultbanner[] = $row;
    }
}

$conn->close();
echo json_encode($defaultbanner);
?>