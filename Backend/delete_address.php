<?php 
error_reporting(0);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: DELETE, GET, POST, OPTIONS, PUT");

$conn = mysqli_connect("localhost", "root", "", "waltzer");

if ($conn === false) {
    die("ERROR: Couldn't connect" . mysqli_connect_error());
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'DELETE') {
    $Id = $_GET['Id'];

    if (isset($Id)) {
        $query = "DELETE FROM useraddress WHERE addressId = ?";
        $statement = $conn->prepare($query);
        $statement->bind_param("i", $Id);

        if ($statement->execute()) {
            echo json_encode(["success" => "Address deleted successfully"]);
        } else {
            echo json_encode(["error" => "Error deleting Address: " . $conn->error]);
        }
        $statement->close();
    } else {
        echo json_encode(["error" => "Address ID not provided"]);
    }
}

$conn->close();
