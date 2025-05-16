<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers for CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');

// Database connection parameters
$servername = "localhost";
$username = "root";
// $password = "rootroot";
$password = "";
$dbname = "waltzer";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

// Read input data
$data = json_decode(file_get_contents('php://input'), true);

// Initialize the response array
$response = ['success' => [], 'error' => []];

if (isset($data['orders']) && is_array($data['orders'])) {
    foreach ($data['orders'] as $order) {
        $orderId = $order['orderId'];
        $updates = [];
        $params = [];
        $types = '';

        // Check which fields are provided and build the query dynamically
       
       /*  if (isset($order['invoiceNo'])) {
            $updates[] = "invoiceNo = ?";
            $params[] = $order['invoiceNo'];
            $types .= "s";
        } */
       
        if (isset($order['courier_company'])) {
            $updates[] = "courier_company = ?";
            $params[] = $order['courier_company'];
            $types .= "s";
        }
        if (isset($order['trackingURL'])) {
            $updates[] = "trackingURL = ?";
            $params[] = $order['trackingURL'];
            $types .= "s";
        }
        if (isset($order['trackingId'])) {
            $updates[] = "trackingId = ?";
            $params[] = $order['trackingId'];
            $types .= "s";
        }
       
        if (!isset($order['Date']) || empty($order['Date'])) {
            $updates[] = "Shipping_date = CURRENT_TIMESTAMP";
        } else {
            $updates[] = "Shipping_date = ?";
            $params[] = $order['Date'];
            $types .= "s";
        }
       

        if (!empty($updates)) {
            // Prepare the SQL statement
            $sql = "UPDATE checkout SET " . implode(", ", $updates) . " WHERE OrderId = ?";
            $stmt = $conn->prepare($sql);

            if (!$stmt) {
                http_response_code(500);
                echo json_encode(["error" => "Failed to prepare the SQL statement: " . $conn->error]);
                exit();
            }

            // Bind the parameters
            $params[] = $orderId;
            $types .= "s";
            $stmt->bind_param($types, ...$params);

            // Execute the query and handle response for each order
            if ($stmt->execute()) {
                $response['success'][] = "Order ID $orderId updated successfully.";
            } else {
                $response['error'][] = "Error updating Order ID $orderId: " . $stmt->error;
            }

            // Close the statement
            $stmt->close();
        } else {
            $response['error'][] = "No valid fields to update for Order ID $orderId.";
        }
    }
} else {
    $response['error'][] = 'No valid orders data received.';
}

// Send response back to the frontend
echo json_encode($response);

// Close the connection
$conn->close();
?>
