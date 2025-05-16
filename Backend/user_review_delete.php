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

        // Prepare the SQL DELETE statement using prepared statements
        $query = "DELETE FROM user_review WHERE ReviewId = ?";
        $stmt = mysqli_prepare($conn, $query);

        if ($stmt) {
            // Bind the ReviewId to the prepared statement
            mysqli_stmt_bind_param($stmt, 'i', $review_id); // 'i' for integer

            // Execute the statement
            if (mysqli_stmt_execute($stmt)) {
                echo json_encode(["success" => "Review deleted successfully"]);
            } else {
                echo json_encode(["error" => "Error deleting Review: " . mysqli_stmt_error($stmt)]);
            }

            // Close the statement
            mysqli_stmt_close($stmt);
        } else {
            echo json_encode(["error" => "Error preparing the statement: " . mysqli_error($conn)]);
        }
        break;
}

mysqli_close($conn);
?>
