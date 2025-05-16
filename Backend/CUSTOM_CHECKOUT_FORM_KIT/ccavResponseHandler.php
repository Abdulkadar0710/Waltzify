<?php include('Crypto.php'); 
error_reporting(0);

// Database connection
$servername = "localhost";
$username = "root";
// $password = "rootroot";
$password = "";
$dbname = "waltzer"; // Replace with your database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Payment processing logic
$workingKey = 'C68D42CBD3BE8F7D4A50EF8C2012E2C3'; // Working Key should be provided here.
$encResponse = $_POST["encResp"]; // This is the response sent by the CCAvenue Server
$rcvdString = decrypt($encResponse, $workingKey); // Crypto Decryption used as per the specified working key.
$order_status = "";
$orderId = "";
$decryptValues = explode('&', $rcvdString);
$dataSize = sizeof($decryptValues);

$response = [];

// Parsing the response
for ($i = 0; $i < $dataSize; $i++) {
    $information = explode('=', $decryptValues[$i]);
    if ($information[0] == "order_id") {
        $orderId = $information[1]; // Assuming "order_id" contains the OrderId
    }
    if ($i == 3) {
        $order_status = $information[1];
    }
}

// Update payment status based on order status
if ($order_status === "Success") {
    $sql = "UPDATE checkout SET payment_status = 'Success' WHERE OrderId = '$orderId'";
    if ($conn->query($sql) === FALSE) {
        $response["error"] = "Error updating payment status: " . $conn->error;
    } else {
        //$response["success"] = "Payment status updated successfully";
        header("Location: https://waltzify.com/api/CUSTOM_CHECKOUT_FORM_KIT/success.php");
        exit();

    }
} else if ($order_status === "Aborted") {
    $sql = "UPDATE checkout SET payment_status = 'Aborted' WHERE OrderId = '$orderId'";
    if ($conn->query($sql) === FALSE) {
        $response["error"] = "Error updating payment status: " . $conn->error;
    } else {
        //$response["success"] = "Payment status updated successfully";
        header("Location: https://waltzify.com/api/CUSTOM_CHECKOUT_FORM_KIT/aborted.php");
        exit();
		
    }
} else if ($order_status === "Failure") {
    $sql = "UPDATE checkout SET payment_status = 'Failure' WHERE OrderId = '$orderId'";
    if ($conn->query($sql) === FALSE) {
        $response["error"] = "Error updating payment status: " . $conn->error;
    } else {
        //$response["success"] = "Payment status updated successfully";
        header("Location: https://waltzify.com/api/CUSTOM_CHECKOUT_FORM_KIT/failure.php");
        exit();
		
    }
} else {
    $response["error"] = "Security Error. Illegal access detected";
}

// Close the database connection
$conn->close();

// Set header for JSON response
header('Content-Type: application/json');
echo json_encode($response);

// If you need debugging, temporarily log the output here
error_log(json_encode($response)); // Uncomment to log response for debugging
?>

