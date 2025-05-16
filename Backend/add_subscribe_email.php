<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin:  *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

$conn = new mysqli("localhost", "root", "", "waltzer");

if (mysqli_connect_error()) {
    echo json_encode([["result" => "Database connection failed"]]);
    exit();
}

// Check if the request is a POST request with files
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
   
    $email = $_POST['email'] ?? '';
    $userEmail = 'info@waltzify.com';
  
    $result = "";
  

    
           
            $query = "INSERT INTO subscribing_user(email) VALUES (?)";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("s",$email);
            $res = $stmt->execute();
            if ($res)
            {
                $result = "Thankyou for subscribing us!";
                $subject = "$email is your new subscriber!";
                $message = "Dear <b>Waltzify</b>,\n\nWe are delighted to inform you that your waltzify.com has new subscriber.<br>Email :  <b>$email</b>\n";
                $message .= "<p>Thank You!\nBest Regards,<br><b>Waltzify</b><br> Mob: +91 9522582422</p>";
                $message .= '<a href="https://www.waltzify.com" target="_blank"><img src="cid:productimage" alt="Product Image" style="width:50px;height:50px;" /></a>';
                $message .= "<br>Shop 1A,Balaji Market,Hawa Bangla Rd, Near RR Cat<br>Indore - 452009 | Tel 0731-4245858 | Tel: +91 8818893881";
                
                $mail = new PHPMailer(true);
                try {
                    $mail->isSMTP();
                    $mail->Host = 'smtp.gmail.com';
                    $mail->SMTPAuth = true;
                    $mail->Username = 'info@waltzify.com';
                    $mail->Password = 'xdeh eanu ubiy yubd';
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                    $mail->Port = 465;
                
                    $mail->setFrom('info@waltzify.com', 'Waltzify');
                    $mail->addAddress($userEmail);
                    $mail->addEmbeddedImage('./android-chrome-512x512.png', 'productimage'); 
                    $mail->isHTML(true);
                    $mail->Subject = $subject;
                    $mail->Body = nl2br($message);
                
                    $mail->send();
                    $result = "Thankyou for subscribing us!";
                } catch (Exception $e) {
                    $result = "Error sending email: " . $mail->ErrorInfo;
                }
            }
            else
            {
                $result = "Not Submitted";
            }
            $stmt->close();
    
    $conn->close();
    echo json_encode([["result" => $result]]);
} 
else 
{
    echo json_encode([["result" => "Invalid input"]]);
}
?>