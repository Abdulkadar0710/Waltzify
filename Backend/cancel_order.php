<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json; charset=UTF-8");

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

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
$cancelReason = $data['CancelReason'] ?? '';

if (empty($orderIds)) {
    die(json_encode(["error" => "No Order IDs provided."]));
}

if (empty($cancelReason)) {
    die(json_encode(["error" => "Cancellation reason is required."]));
}

foreach ($orderIds as $orderId) {
    // Update order status and cancellation reason for each Order ID
    $sql = "UPDATE checkout SET order_status = 'Cancelled', payment_status = 'Cancelled', shipping_status = 'Cancelled', cancel_reason = ? WHERE OrderId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $cancelReason, $orderId);
    $result = $stmt->execute();

    if (!$result) {
        die(json_encode(["error" => "Failed to update order status for Order ID $orderId."]));
    }

    // Fetch user email to send notification
    $sql_user = "SELECT user.email, user.name FROM checkout INNER JOIN user ON checkout.userId = user.Id WHERE checkout.OrderId = ?";
    $stmt_user = $conn->prepare($sql_user);
    $stmt_user->bind_param("s", $orderId);
    $stmt_user->execute();
    $result_user = $stmt_user->get_result();

    if ($result_user->num_rows > 0) {
        $user = $result_user->fetch_assoc();
        $userEmail = $user['email'];
        $userName = $user['name'];

        // Prepare email subject and body
        $subject = "Order Cancellation Notice";
        $message = "
        Dear <b>$userName</b>,<br><br>
        We regret to inform you that your order with Order ID: <b>$orderId</b> has been cancelled.<br><br>
        <b>Cancellation Reason:</b> $cancelReason<br>
        If you have any questions or need further assistance, please do not hesitate to contact us.<br><br>
        We apologize for any inconvenience this may have caused.<br>
        <p>Thank You!\nBest Regards,<br><b>Waltzify</b><br> Mob: +91 9522582422</p>";
        $message .= '<a href="https://www.waltzify.com" target="_blank"><img src="cid:productimage" alt="Product Image" style="width:50px;height:50px;" /></a>';
        $message .= "<br>Shop 1A,Balaji Market,Hawa Bangla Rd, Near RR Cat<br>Indore - 452009 | Tel 0731-4245858 | Tel: +91 8818893881";


        // Send the email notification
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'info@waltzify.com'; // Update with your email
            $mail->Password = 'xdeh eanu ubiy yubd'; // Update with your email password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port = 465;

            $mail->setFrom('info@waltzify.com', 'Waltzify');
            $mail->addAddress($userEmail);
            // Embed the image correctly
            $mail->addEmbeddedImage('android-chrome-512x512.png', 'productimage'); // Ensure the correct file path
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = nl2br($message);

            $mail->send();
        } catch (Exception $e) {
            error_log("Mailer Error: " . $mail->ErrorInfo); // Log the error
        }

    } else {
        die(json_encode(["error" => "User not found for Order ID $orderId."]));
    }
}

// If all orders processed successfully
echo json_encode(["success" => true, "message" => "Orders cancelled and emails sent."]);

$conn->close();
?>



