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
    die("Error: " . $e->getMessage());
}

// Get the JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if ($data) {
    $firstName = $data['firstName'];
    $lastName = $data['lastName'];
    $email = $data['email'];
    $phone = $data['phone'];
    $subject = $data['subject'];
    $message = $data['message'];

    // Insert the form data into the database
    $stmt = $pdo->prepare("INSERT INTO contact_form (first_name, last_name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$firstName, $lastName, $email, $phone, $subject, $message]);

    // Prepare dynamic email subject based on the user's selected subject
    $mailSubject = "";
    switch ($subject) {
        case 'Query':
            $mailSubject = "User has a query : User wants to know something from you.";
            break;
        case 'Complaint':
            $mailSubject = "A user has raised a concern : Please review their complaint.";
            break;
        case 'Return/Refund':
            $mailSubject = "Return/Refund request: User seeks assistance with a return or refund.";
            break;
        default:
            $mailSubject = "New contact form submission: A user has reached out to you.";
            break;
    }

    // Prepare email message body with user's details and message
    $userEmail = 'info@waltzify.com';
    $userName = 'Waltzify';

    $emailContent = "<b>Dear $userName</b>,<br><br>";
    $emailContent .= "You have received a new contact form submission from a user.<br><br>";
    $emailContent .= "<b>User Details:</b><br>";
    $emailContent .= "Name: $firstName $lastName<br>";
    $emailContent .= "Email: $email<br>";
    $emailContent .= "Phone: $phone<br>";
    $emailContent .= "Subject: $subject<br><br>";
    $emailContent .= "<b>Message:</b><br>";
    $emailContent .= nl2br($message); // Preserve line breaks
    $emailContent .= "<br><br>Thank you!<br>Best Regards,<br><b>Waltzify</b><br>";
    $emailContent .= '<a href="https://www.waltzify.com" target="_blank"><img src="cid:productimage" alt="Product Image" style="width:50px;height:50px;" /></a>';
    $emailContent .= "<br>Shop 1A, Balaji Market, Hawa Bangla Rd, Near RR Cat<br>Indore - 452009 | Tel 0731-4245858 | Tel: +91 8818893881";

    // Send the email
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'info@waltzify.com'; // Your SMTP username
        $mail->Password = 'xdeh eanu ubiy yubd'; // Your SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Use TLS encryption for port 587
        $mail->Port = 587;

        $mail->setFrom('info@waltzify.com', 'Waltzify');
        $mail->addAddress($userEmail);
        $mail->addEmbeddedImage('android-chrome-512x512.png', 'productimage'); // Ensure the correct file path
        $mail->isHTML(true);
        $mail->Subject = $mailSubject; // Set dynamic subject
        $mail->Body = $emailContent; // Set email body content

        $mail->send();
        echo json_encode(["success" => "Email sent successfully."]);
    } catch (Exception $e) {
        echo json_encode(["error" => "Email could not be sent. Mailer Error: " . $mail->ErrorInfo]);
    }
} else {
    echo json_encode(["error" => "Invalid input"]);
}
?>



