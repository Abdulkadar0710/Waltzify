
<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$userId = isset($_GET['userId']) ? $_GET['userId'] : null;

if ($userId === null) {
    echo json_encode(['error' => 'User ID not provided']);
    exit;
}

        $sql = "SELECT 
        checkout.*, 
        checkout.price AS checkoutPrice,
        checkout.OrderId AS checkoutOrderId, 
        order_items.*, 
        products.*, 
        user.*
    FROM 
        checkout 
    JOIN 
        order_items ON checkout.Id = order_items.orderId
    JOIN 
        products ON order_items.productId = products.Id
    JOIN 
        user ON checkout.userId = user.Id
    WHERE 
        user.Id = ? ORDER BY checkout.Id DESC";



$stmt = $conn->prepare($sql);

// Bind the userId parameter to the statement
$stmt->bind_param("i", $userId);

// Execute the statement
$stmt->execute();

// Get the result
$result = $stmt->get_result();


if (!$result) {
    echo json_encode(['error' => 'Query error: ' . $conn->error]);
    exit;
}

$orders = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
} else {
    echo json_encode(['error' => 'No orders found']);
    exit;
}

$conn->close();
echo json_encode(['orders' => $orders]);
?>