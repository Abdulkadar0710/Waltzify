<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

ob_start(); // Start output buffering
error_reporting(E_ALL);
ini_set('display_errors', 1); // Show errors temporarily
ini_set('log_errors', 1);
ini_set('error_log', 'error_log.log');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

function sendJsonResponse($message) {
    ob_end_clean(); // Clear any previous output
    echo json_encode(["result" => $message]);
    exit();
}

// Database Connection
$conn = new mysqli("localhost", "root", "", "waltzer");
if ($conn->connect_error) {
    sendJsonResponse("Database connection failed");
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (empty($name) || empty($email) || empty($phone) || empty($password)) {
        sendJsonResponse("All fields are required");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendJsonResponse("Invalid email format");
    }

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $token = bin2hex(random_bytes(16));

    $query = "INSERT INTO user (name, email, password, phone, verification_token) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param("sssss", $name, $email, $hashedPassword, $phone, $token);
        if ($stmt->execute()) {
            require 'PHPMailer-master/src/Exception.php';
            require 'PHPMailer-master/src/PHPMailer.php';
            require 'PHPMailer-master/src/SMTP.php';

            $mail = new PHPMailer(true);
            try {
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com';
                $mail->SMTPAuth = true;
                $mail->Username = 'info@waltzify.com';
                $mail->Password = 'hixwoqewopxfogeg'; // Secure in .env file
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port = 587;
                $mail->SMTPDebug = 0; // Disable debug output

                $mail->setFrom('info@waltzify.com', 'Waltzify');
                $mail->addAddress($email);
                $mail->isHTML(true);
                $mail->Subject = 'Your Account Verification at Waltzify';

                $verificationLink = "http://localhost/waltzify_copy_fake/Backend/email_verification.php?verification_token=" . $token;
                $mail->Body = "<strong>Dear $name,</strong><br>
                    Please verify your account: <a href='$verificationLink'>$verificationLink</a>";

                $mail->send();
                sendJsonResponse("Registered Successfully! Verification link sent.");
            } catch (Exception $e) {
                error_log("Mailer Error: " . $mail->ErrorInfo);
                sendJsonResponse("Mail sending failed.");
            }
        } else {
            sendJsonResponse("Failed to register. Try a different email.");
        }
        $stmt->close();
    } else {
        sendJsonResponse("Database error: Unable to prepare statement");
    }
    $conn->close();
} else {
    sendJsonResponse("Invalid Request Method");
}

exit();
?>
