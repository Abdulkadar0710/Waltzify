<?php
// Include your database connection file
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the tab parameter from the query string
$tab = isset($_GET['tab']) ? $_GET['tab'] : '';

// Write a SQL query based on the tab
$query = '';

switch($tab) {
    case 'New':
        $query = "SELECT * FROM checkout WHERE order_status = 'New' || shipping_status = 'Pending'";
        break;
        case 'Ready To Ship':
            $query = "SELECT * FROM checkout WHERE shipping_status = 'Processing'";
            break;
    
    case 'Delivered':
        $query = "SELECT * FROM checkout WHERE order_status = 'Delivered' and payment_status = 'Success' and shipping_status = 'Shipped'";
        break;
        case 'In Transit':
            // Fetch orders that have at least one of the required fields
            $query = "SELECT * FROM checkout WHERE invoiceNo != ''  OR courier_company != '' OR courier_charges != '' OR trackingId != '' ";
            break;
        case 'Cancel Orders':
            $query = "SELECT * FROM checkout WHERE order_status  = 'Cancelled'";
            break;
        case 'All':
            $query = "SELECT * FROM checkout WHERE order_status = 'Delivered' || order_status = 'Cancelled' || order_status = 'New' || payment_status = 'Success' || shipping_status = 'Shipped' || shipping_status = 'Cancelled' || shipping_status = 'Processing' || payment_status = 'Pending'  ";
            break;
    default:
        echo json_encode(['error' => 'Invalid tab']);
        exit();
}

// Execute the query
$result = mysqli_query($conn, $query);

if ($result) {
    $orders = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $orders[] = $row;
    }
    echo json_encode($orders);
} else {
    echo json_encode(['error' => 'Error fetching orders']);
}
?>
