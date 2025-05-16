<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json"); // Ensure JSON response

$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    echo json_encode(["result" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['image'])) {
    $cname = $_POST['categoryName'] ?? '';
    $img = $_FILES['image']['name'] ?? '';
    $tmp = $_FILES['image']['tmp_name'] ?? '';

    $folder = __DIR__ . "/Category/"; // Ensure this directory exists
    if (!is_dir($folder)) {
        mkdir($folder, 0777, true); // Create directory if not exists
    }

    $result = "";

    if (move_uploaded_file($tmp, $folder . $img)) {
        $query = "INSERT INTO category (cname, image) VALUES (?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ss", $cname, $img);
        $res = $stmt->execute();

        if ($res) {
            $result = "Category Added Successfully!";
        } else {
            $result = "Database insertion failed: " . $stmt->error;
        }
        $stmt->close();
    } else {
        $result = "File upload failed";
    }

    $conn->close();
    echo json_encode(["result" => $result]);
    exit();
} else {
    echo json_encode(["result" => "Invalid input"]);
    exit();
}
?>
