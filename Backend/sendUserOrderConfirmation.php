<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

error_reporting(0); // Turn off all error reporting for production
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST");
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json; charset=UTF-8");

session_start();
require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "result" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data === null) {
        echo json_encode(["success" => false, "result" => "Invalid JSON format"]);
        exit();
    }

    // Collect POST data
    $orderId = $data['OrderId'] ?? '';
    $price = $data['price'] ?? 0.0;
    $customerName = $data['customerName'] ?? '';
    $userId = $data['userId'] ?? ''; // Get userId from frontend
    $cartItems = $data['cartItems'] ?? [];
    $deliveryCharges = $data['deliveryCharges'];

    // Fetch the user's email based on userId
    $userEmail = '';
    $stmt = $conn->prepare("SELECT email FROM user WHERE Id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $stmt->bind_result($userEmail);
    $stmt->fetch();
    $stmt->close();

    if (empty($userEmail)) {
        echo json_encode(["success" => false, "message" => "User email not found."]);
        exit();
    }

    // Send email notification
    $subject = "Order Confirmation: Your Waltzify Order (ID: $orderId)";
    
    // Construct the email body
    $message = "<p>Dear <b>$customerName</b>,</p>";
    $message .= "<p>Your order with Order ID: <b>$orderId</b> has been confirmed.</p>";
    $message .= "Here are the details of your order:";
    $subtotal = 0.0;

    // Loop through each product in the cart and append to the message
    foreach ($cartItems as $item) {
        $productName = $item['productName'];
        $quantity = $item['quantity'];
        $itemPrice = $item['productPrice'];
        $subtotal += $itemPrice;
        $message .= "<br>Item: $productName<br>Quantity: $quantity<br>Price: ₹$itemPrice<br>";
    }

    
    $message .= "<br>Sub Total: ₹$subtotal";
    $message .= "<br>Delivery Charges: ₹$deliveryCharges";
    $message .= "<br>Total Price: <b>₹$price</b>";
    $message .= "<p>Thank you for shopping with us!</p>";
    $message .= "<p>Best Regards,<br><b>Waltzify</b><br> Mob: +91 9522582422</p>";
    $message .= '<a href="https://www.waltzify.com" target="_blank"><img src="cid:productimage" alt="Product Image" style="width:50px;height:50px;" /></a>';
    $message .= "<br>Shop 1A,Balaji Market,Hawa Bangla Rd, Near RR Cat<br>Indore - 452009 | Tel 0731-4245858 | Tel: +91 8818893881";
    
    // Send the email using PHPMailer
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'info@waltzify.com'; // Your SMTP username
        $mail->Password = 'xdeh eanu ubiy yubd'; // Your SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;

        $mail->setFrom('info@waltzify.com', 'Waltzify');
        $mail->addAddress($userEmail); // Send email to the user

        // Embed the image correctly
        $mail->addEmbeddedImage('android-chrome-512x512.png', 'productimage'); // Ensure the correct file path

        $mail->isHTML(true); // Set email format to HTML
        $mail->Subject = $subject;
        $mail->Body = $message; // Use the HTML message

        $mail->send();
        echo json_encode(["success" => true, "message" => "Order email sent successfully to $userEmail."]);
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Order placed but email failed: " . $mail->ErrorInfo]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
} 
?>
