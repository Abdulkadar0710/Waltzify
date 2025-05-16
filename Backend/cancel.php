<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

ob_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

// Database connection
$servername = "localhost";
$username = "root";
// $password = "rootroot";
$password = "";
$dbname = "waltzer";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    ob_end_flush();
    exit();
}

$response = [];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['OrderId'])) {
        $orderId = $data['OrderId'];

        // Update order status in the database
        $sql = "UPDATE checkout SET payment_status = 'Cancelled', shipping_status = 'Cancelled', order_status = 'Cancelled', cancel_reason = 'Order has been cancelled by User' WHERE OrderId = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $orderId);
        if ($stmt->execute()) {
            // Send response to the frontend first
            $response = ["success" => true, "message" => "Order successfully cancelled"];
            echo json_encode($response);
            ob_flush(); // Ensure the response is sent immediately to the frontend
            flush();

            // Fetch order details for the email
            $orderDetailsSql = "SELECT checkout.OrderId, checkout.price AS checkoutPrice, order_items.productName, order_items.quantity, ROUND(order_items.price, 2) AS productPrice
                                FROM checkout
                                JOIN order_items ON checkout.Id = order_items.OrderId
                                WHERE checkout.OrderId = ?";
                                $orderDetailsStmt = $conn->prepare($orderDetailsSql);
                                $orderDetailsStmt->bind_param("s", $orderId); // 's' for string
                                $orderDetailsStmt->execute();
                                $result = $orderDetailsStmt->get_result();

            if ($result->num_rows > 0) {
                $subtotal = 0.0;
                $message = "<b>Dear Waltzify</b>,<br>User has cancelled their order.<br>Order ID: <b>$orderId</b><br>Order Details:<br>";

                while ($row = $result->fetch_assoc()) {
                    $price = $row['checkoutPrice'];
                    $productName = $row['productName'];
                    $quantity = $row['quantity'];
                    $itemPrice = $row['productPrice'];
                    $subtotal += $itemPrice;

                    $message .= "Item: $productName\nQuantity: $quantity\nPrice: ₹". number_format($itemPrice, 2) . "<br>";
                }

                // Calculate delivery charges and total price
                
                $deliveryCharges = $price - $subtotal;
                $message .= "<br>Sub Total: ₹" . number_format($subtotal, 2) . "\n";
                $message .= "Delivery Charges: ₹" . number_format($deliveryCharges, 2) . "\n";
                $message .= "Total Price: ₹<b>" . number_format($price, 2) . "</b><br>";
                $message .= "Please check the cancelled order at 'https://www.waltzify.com/adminlogin'.\n\nThank you!\nBest Regards,\n<b>Waltzify</b><br>";
                $message .= '<a href="https://www.waltzify.com" target="_blank"><img src="cid:productimage" alt="Product Image" style="width:50px;height:50px;" /></a>';
                $message .= "<br>Shop 1A,Balaji Market,Hawa Bangla Rd, Near RR Cat<br>Indore - 452009 | Tel 0731-4245858 | Tel: +91 8818893881";

                // Send the email
                $userEmail = 'er.shrutidsharma@gmail.com';
                $subject = "Cancel Order: User Cancelled Order";

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
                    $mail->addEmbeddedImage('android-chrome-512x512.png', 'productimage');
                    $mail->isHTML(true);
                    $mail->Subject = $subject;
                    $mail->Body = nl2br($message);

                    $mail->send();
                } catch (Exception $e) {
                    error_log("Mailer Error: " . $mail->ErrorInfo); // Log the error, but don't block the frontend response
                }
            }
            // Close the prepared statement
            $orderDetailsStmt->close();
        } else {
            $response = ["error" => "Failed to update database: " . $conn->error];
            echo json_encode($response);
        }
        $stmt->close(); // Close the prepared statement
    } else {
        $response = ["error" => "OrderId not received"];
        echo json_encode($response);
    }
}

ob_end_clean();
?>
