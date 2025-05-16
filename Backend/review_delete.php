<?php 
error_reporting(0);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');
// $conn = mysqli_connect("localhost", "root", "rootroot", "waltzer");
$conn = mysqli_connect("localhost", "root", "", "waltzer");

if ($conn === false) {
    die("ERROR: Couldn't connect" . mysqli_connect_error());
}

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
   
    case "DELETE":
    $review_id = $_GET['Id'];

    $query = "DELETE FROM review WHERE Id = ?";
    $statement = $conn->prepare($query);
    $statement->bind_param("i", $review_id);

    if ($statement->execute()) {
        echo json_encode(["success" => "Review deleted successfully"]);
    } else {
        echo json_encode(["error" => "Error deleting Review: " . $conn->error]);
    }
    break;

    
    $statement->close();

    
}     



    
?>

