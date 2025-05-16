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
    $productPrice = $data['productPrice'] ?? 0.0;
    $price = $data['price'] ?? 0.0;
    $customerName = $data['customerName'] ?? '';
    $phone = $data['phone'] ?? '';
    $SKU = $data['SKU'] ?? '';
    $addressId = $data['addressId'] ?? '';
    $userId = $data['userId'] ?? 0;
    $paymode = $data['paymode'] ?? '';
    $cartItems = $data['cartItems'] ?? [];
    $deliveryCharges = $data['deliveryCharges'];


    // Function to generate the next invoice number
    function generateInvoiceNumber($conn) {
        $query = "SELECT invoiceNo FROM checkout ORDER BY Id DESC LIMIT 1";
        $result = $conn->query($query);

        $lastInvoice = 'Waltzify-00'; // Default for first order if no invoice exists
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $lastInvoice = $row['invoiceNo'];
        }

        // Extract the number part from the last invoice (Waltzify-01 -> 01)
        $lastNumber = (int)substr($lastInvoice, 9);

        // Increment the number by 1 for the new invoice
        $newNumber = $lastNumber + 1;

        // Format the new invoice number
        $newInvoice = 'Waltzify-' . str_pad($newNumber, 2, '0', STR_PAD_LEFT);

        return $newInvoice;
    }

    // Generate the new invoice number
    $invoiceNo = generateInvoiceNumber($conn);


    // Insert into checkout table
    $orderQuery = "INSERT INTO checkout (OrderId, price, customerName, phone, addressId, userId, paymode,invoiceNo,deliveryCharges) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($orderQuery);
    if ($stmt === false) {
        echo json_encode(["success" => false, "result" => "Error preparing statement: " . $conn->error]);
        exit();
    }

    $stmt->bind_param("sdssiisss", $orderId, $price, $customerName, $phone, $addressId, $userId, $paymode,$invoiceNo,$deliveryCharges);
    $res = $stmt->execute();

    if ($res) {
        $lastOrderId = $conn->insert_id;

        // Insert order items
        foreach ($cartItems as $item) {
            $productId = $item['productId'];
            $productName = $item['productName'];
            $quantity = $item['quantity'];
            $itemPrice = $item['productPrice'];

            $itemQuery = "INSERT INTO order_items (OrderId, productId, productName, quantity, price) 
                          VALUES (?, ?, ?, ?, ?)";
            $itemStmt = $conn->prepare($itemQuery);
            if ($itemStmt === false) {
                echo json_encode(["success" => false, "result" => "Error preparing item statement: " . $conn->error]);
                exit();
            }
            $itemStmt->bind_param("iisis", $lastOrderId, $productId, $productName, $quantity, $itemPrice);
            if (!$itemStmt->execute()) {
                // Log or track the specific item that failed, but don't exit the entire process
                echo json_encode(["success" => false, "result" => "Failed to add order item: " . $productId]);
            }
            $itemStmt->close();
        }

        // Update order status
        $response = []; // Array to collect all responses;
        $sql = "UPDATE checkout SET order_status = 'New' WHERE OrderId = ?";
        $updateStmt = $conn->prepare($sql);
        if ($updateStmt) {
            $updateStmt->bind_param("s", $orderId);
            $updateStmt->execute();
            $updateStmt->close();
            
            // Include external script for product quantity update
            include('../../update_products_quantity.php'); 

            // Send email notification
            $userEmail = 'er.shrutidsharma@gmail.com';
            $userName = 'Waltzify';

            $subject = "New Order : You Have New Order(Order Id - $orderId)";
            
                $message = "Dear <b>$userName</b>,\n\nYou have a new order with Order ID: <b>$orderId</b>\nPlease ship the products using Standard Delivery.\n\nOrder Details:\n";
                $subtotal = 0.0;
                // Loop through each product in the cart and append to the message
                foreach ($cartItems as $item) {
                    $productName = $item['productName'];
                    $SKU  = $item['SKU'];
                    $quantity = $item['quantity'];
                    $itemPrice = $item['productPrice'];
                    $subtotal += $itemPrice;
                    // Append each product's details
                    $message .= "Item: $productName\nSKU : $SKU\nQuantity: $quantity\nPrice:  ₹$itemPrice\n\n";
                }
                /* $deliveryCharges = $price - $subtotal; */
                $message .= "Sub Total : ₹$subtotal\n";
                $message .= "Delivery Charges : ₹$deliveryCharges\n";
                $message .= "Total Price: ₹<b>$price </b>\n";
                $message .= "Please check your new order at 'https://www.waltzify.com/adminlogin'.\n\nThank you!\n Best Regards,\n<b>Waltzify</b>\n";
                $message .= '<a href="https://www.waltzify.com" target="_blank"><img src="cid:productimage" alt="Product Image" style="width:50px;height:50px;" /></a>';
                $message .= "<br>Shop 1A,Balaji Market,Hawa Bangla Rd, Near RR Cat<br>Indore - 452009 | Tel 0731-4245858 | Tel: +91 8818893881";
                
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
                $mail->addAddress($userEmail);
                 // Embed the image correctly
                $mail->addEmbeddedImage('android-chrome-512x512.png', 'productimage'); // Ensure the correct file path
                $mail->isHTML(true);
                $mail->Subject = $subject;
                $mail->Body = nl2br($message);

                $mail->send();
                $response[] = ["success" => "Order email notification sent.Order successfully placed"];

                
                
            } catch (Exception $e) {
                $response[] = ["error" => "Message could not be sent. Mailer Error:Order successfully placed but email failed"];

               
            }
        } else {
            $response = ["success" => false, "result" => "Error updating order status: " . $conn->error];
        }
    } else {
        $response = ["success" => false, "result" => "Order not placed, please try again! " . $stmt->error];
    }

    //$stmt->close();
    //$conn->close();

    // Send final response
    echo json_encode($response);
    
} else {
    echo json_encode(["success" => false, "result" => "Invalid input"]);
} 
?>
