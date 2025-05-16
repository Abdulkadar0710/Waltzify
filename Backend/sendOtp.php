<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

if(isset($_POST["send"])){
    $mail = new PHPMailer(true);
    
    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'shruti.sarovi@gmail.com';
        $mail->Password   = 'rpq qufvk spsf wzql';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        $mail->setFrom('shruti.sarovi@gmail.com', 'Waltzer India');
        $mail->addAddress('er.shrutidsharma@gmail.com');

        $mail->isHTML(true);
        $mail->Subject = 'Here is your OTP';
        $mail->Body    = 'This is your OTP - 123456. Please do not share this OTP with anyone.';

        $mail->send();
        echo "<script>alert('OTP has been sent to your mail.');</script>";
    } catch (Exception $e) {
        echo "<script>alert('Message could not be sent. Mailer Error: {$mail->ErrorInfo}');</script>";
    }
}
