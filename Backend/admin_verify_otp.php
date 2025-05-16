<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"), true);
$otp = $data['otp'] ?? ''; 

if (empty($otp)) {
    echo json_encode(["result" => "Invalid OTP"]);
    exit();
}

if ($otp == $_SESSION['otp']) {
    echo json_encode(["result" => "OTP Verified"]);
    // Clear OTP from session after verification
    $_SESSION['otp_verified'] = true;
    //unset($_SESSION['otp']);
} else {
    echo json_encode(["result" => "Invalid OTP"]);
} 
?>
