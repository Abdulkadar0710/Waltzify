<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$conn = new mysqli("localhost", "root", "", "waltzer");

if (mysqli_connect_error()) {
    echo json_encode([["result" => "Database connection failed"]]);
    exit();
}

// Check if the request is a POST request with files
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
   // $email       =  $_POST['email'] ?? '';
    $productId            =  $_POST['productId'] ?? '';
    $productName          =  $_POST['productName'] ?? '';
    $size                 =  $_POST['size'] ?? '';
    $price                =  $_POST['price'] ?? '';
    

    $result      = "";
    
  

    if ($productId && $productName && $size && $price) {
        $query = "INSERT INTO productsize (P_Id,productName,size,price) VALUES ( ?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("isss", $productId, $productName, $size, $price);
        $res = $stmt->execute();

        if ($res) {
            $result = "Registered Successfully!";
        } else {
            $result = "Not Submitted, Please try again!";
        }
        $stmt->close();
    } 
  
    

    $conn->close();
    echo json_encode([["result" => $result]]);
} else {
    echo json_encode([["result" => "Invalid input"]]);
}
?>