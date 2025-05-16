<?php 
error_reporting(0);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// $conn = mysqli_connect("localhost", "root", "rootroot", "waltzer");
$conn = mysqli_connect("localhost", "root", "", "waltzer");

if ($conn === false) {
    die("ERROR: Couldn't connect" . mysqli_connect_error());
}

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
   
    case "DELETE":
    $Id = $_GET['Id'];

    $query = "DELETE FROM admin WHERE Id = ?";
    $statement = $conn->prepare($query);
    $statement->bind_param("i", $Id);

    if ($statement->execute()) {
        echo json_encode(["success" => "Admin deleted successfully"]);
    } else {
        echo json_encode(["error" => "Error deleting Admin: " . $conn->error]);
    }
    break;

    
    $stmt->close();

    
}    



    
?>