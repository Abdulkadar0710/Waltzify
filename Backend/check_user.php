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

session_start();
$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    die(json_encode(["result" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
$phone = $data['phone'] ?? '';

if (empty($email) && empty($phone)) {
    echo json_encode(["result" => "Invalid input"]);
    exit();
}

$sql = "SELECT email,name FROM user WHERE (email = ? AND ? <> '') OR (phone = ? AND ? <> '')";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $email, $email, $phone, $phone);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $userEmail = $result->fetch_assoc();
    $_SESSION['email'] = $userEmail['email'];
    
    // Generate a 6-digit OTP
    $otp = rand(100000, 999999);
    $_SESSION['otp'] = $otp;
    $_SESSION['otp_expiration'] = time() + 120;

    // Include PHPMailer
    require 'PHPMailer-master/src/Exception.php';
    require 'PHPMailer-master/src/PHPMailer.php';
    require 'PHPMailer-master/src/SMTP.php';

    $mail = new PHPMailer(true);
    
    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@waltzify.com';
        $mail->Password   = 'xdeh eanu ubiy yubd';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        $mail->setFrom('info@waltzify.com', 'Waltzify');
        $mail->addAddress($userEmail['email']);
        $mail->addEmbeddedImage('android-chrome-512x512.png', 'productimage');
        $mail->isHTML(true);
        $mail->Subject = 'OTP for Forgot Password Verification';
        $mail->Body    = '<strong>Dear Customer</strong>, <br> We have received your request for forgot password.<br>Your OTP code for password verification is - <b>' . $otp . '</b>. Your OTP will expire within 2 minutes.Please do not share this OTP with anyone.<br><p>If you have any problem and query, do not hesitate to contact us.<br>Thank You!<br><p>Best Regards,<br><b>Waltzify</b><br> Mob: +91 9522582422</p>
     <a href="https://www.waltzify.com" target="_blank"><img src="cid:productimage" alt="Product Image" style="width:50px;height:50px;" /></a>
   <br>Shop 1A,Balaji Market,Hawa Bangla Rd, Near RR Cat<br>Indore - 452009 | Tel 0731-4245858 | Tel: +91 8818893881';

        $mail->send();
        echo json_encode(["result" => "User Verified! An OTP has been sent to your mail."]);
    } catch (Exception $e) {
        echo json_encode(["result" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
    }

} else {
    echo json_encode(["result" => "Email or Phone Not Exist!"]);
}

$stmt->close();
$conn->close();
?>

