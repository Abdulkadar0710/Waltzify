<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

error_reporting(E_ALL);
ini_set('display_errors', 0); // Disable error display in production
ini_set('log_errors', 1);
ini_set('error_log', 'path/to/error.log');

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

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);
$orderIds = $data['orderIds'] ?? [];

if (empty($orderIds)) {
    die(json_encode(["error" => "No Order IDs provided."]));
}

$emailsSent = [];
$errors = [];

foreach ($orderIds as $orderId) {
    $sql_user = "SELECT user.email, user.Name,checkout.courier_company,checkout.trackingURL, checkout.trackingId, checkout.invoiceNo 
                 FROM checkout INNER JOIN user ON checkout.userId = user.Id WHERE checkout.OrderId = ?";
    $stmt_user = $conn->prepare($sql_user);
    $stmt_user->bind_param("s", $orderId);
    $stmt_user->execute();
    $result_user = $stmt_user->get_result();

    if ($result_user->num_rows > 0) {
        $user = $result_user->fetch_assoc();
        $userEmail = $user['email'];
        $userName = $user['Name'];
        $trackingId = $user['trackingId'];
        $trackingURL = $user['trackingURL'];
        $courier_company = $user['courier_company'];
       

        $subject = "Your Order is on the Way! Track Your Shipment Now";
        $message = "Dear <b>$userName</b>,\n\nWe are delighted to inform you that your order with ID <b>$orderId</b> is now being processed and is on its way!\nYou can track your shipment using the following:\n\n<b>Courier Company :</b> $courier_company\n<b>Tracking URL :</b> $trackingURL\n<b>Tracking Id : </b>$trackingId\n";
        $message .= "<p>If you have any questions or encounter any issues with your order, please don't hesitate to reach out to our support team.<br>We are here to assist you!</p>";
        $message .= "<p>Thank You!\nBest Regards,<br><b>Waltzify</b><br> Mob: +91 9522582422</p>";
        $message .= '<a href="https://www.waltzify.com" target="_blank"><img src="cid:productimage" alt="Product Image" style="width:50px;height:50px;" /></a>';
        $message .= "<br>Shop 1A,Balaji Market,Hawa Bangla Rd, Near RR Cat<br>Indore - 452009 | Tel 0731-4245858 | Tel: +91 8818893881";
        
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'info@waltzify.com'; // Your email address
            $mail->Password = 'xdeh eanu ubiy yubd'; // Your email password
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

            // After sending the email, update the trackingIdmail field to 'Mailed'
            $sql_update = "UPDATE checkout SET trackingIdmail = 'Mailed' WHERE OrderId = ?";
            $stmt_update = $conn->prepare($sql_update);
            $stmt_update->bind_param("s", $orderId);
            $stmt_update->execute();

            $emailsSent[] = $orderId;
        } catch (Exception $e) {
            $errors[] = "Error sending email for Order ID $orderId: " . $mail->ErrorInfo;
        }
    } else {
        $errors[] = "User not found for Order ID $orderId.";
    }
}

if (empty($errors)) {
    echo json_encode(["success" => true, "message" => "Emails sent successfully.", "orders" => $emailsSent]);
} else {
    echo json_encode(["success" => false, "errors" => $errors]);
}

$conn->close();
?>



