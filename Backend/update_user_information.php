<?php
error_reporting(0);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Database connection
$servername = "localhost";
$username = "root";
// $password = "rootroot";
$password = "";
$dbname = "waltzer";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Get the raw POST data
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Fetching data from $_POST
    $billingName = $_POST['billingName'] ?? null;
    $billingAddress = $_POST['billingAddress'] ?? null;
    $billingPhone = $_POST['billingPhone'] ?? null;
    $billingEmail = $_POST['billingEmail'] ?? null;
    $shippingName = $_POST['shippingName'] ?? null;
    $shippingAddress = $_POST['shippingAddress'] ?? null;
    $shippingPhone = $_POST['shippingPhone'] ?? null;
    $shippingEmail = $_POST['shippingEmail'] ?? null;
    $orderNo = $_POST['orderNo'] ?? null;
    $orderDate = $_POST['orderDate'] ?? null;
    $invoiceNo = $_POST['invoiceNo'] ?? null;
    $description = $_POST['description'] ?? null;
    $unitPrice = $_POST['unitPrice'] ?? null;
    $quantity = $_POST['quantity'] ?? null;
    $taxRate = $_POST['taxRate'] ?? null;
    $PAN = $_POST['PAN'] ?? null;
    $FSSAI = $_POST['FSSAI'] ?? null;
    $GSTIN = $_POST['GSTIN'] ?? null;
    
    $trackingId = $_POST['trackingId'] ?? null;

    // Validate required fields
    if (empty($orderNo)) {
        echo json_encode(["error" => "Order number is required"]);
        exit();
    }

    // Update the user information in the checkout table
    $updateCheckout = $conn->prepare("UPDATE checkout SET customerName = ?, phone = ?, invoiceNo = ?, Pan = ?, fssai = ?, gstin = ?, trackingId = ? WHERE OrderId = ?");
    $updateCheckout->bind_param("ssssssss", $billingName, $billingPhone, $invoiceNo, $PAN, $FSSAI, $GSTIN, $trackingId, $orderNo);

    if ($updateCheckout->execute()) {
        // Update the shipping information in the useraddress table
        $updateUserAddress = $conn->prepare("UPDATE useraddress SET Address1 = ? WHERE addressId = (SELECT addressId FROM checkout WHERE OrderId = ?)");
        $updateUserAddress->bind_param("ss", $billingAddress, $orderNo);

        if ($updateUserAddress->execute()) {
            echo json_encode(["result" => "Record Updated Successfully!"]);
        } else {
            echo json_encode(["error" => "Error updating address: " . $conn->error]);
        }
    } else {
        echo json_encode(["error" => "Error updating record: " . $conn->error]);
    }
}
$conn->close();
?>

