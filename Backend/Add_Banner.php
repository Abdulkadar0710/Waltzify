<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    echo json_encode(["result" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!isset($_FILES['image']) || empty($_FILES['image']['name'])) {
        echo json_encode(["result" => "Image file is required"]);
        exit();
    }

    $text = $_POST['text'] ?? '';
    $startDate = $_POST['startDate'] ?? '';
    $endDate = $_POST['endDate'] ?? '';
    $img = $_FILES['image']['name'];
    $tmp = $_FILES['image']['tmp_name'];

    // Ensure the folder exists and has the correct permissions
    $folder = $_SERVER['DOCUMENT_ROOT'] . '/Banner/';
    if (!is_dir($folder)) {
        mkdir($folder, 0777, true);
    }

    if (move_uploaded_file($tmp, $folder . $img)) {
        $query = "INSERT INTO banners (image, text, start_date, end_date) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        if (!$stmt) {
            echo json_encode(["result" => "SQL Prepare Error: " . $conn->error]);
            exit();
        }

        $stmt->bind_param("ssss", $img, $text, $startDate, $endDate);
        $res = $stmt->execute();

        if ($res) {
            echo json_encode(["result" => "Banner Added Successfully!"]);
        } else {
            echo json_encode(["result" => "Database Insert Failed: " . $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(["result" => "File upload failed"]);
    }

    $conn->close();
} else {
    echo json_encode(["result" => "Invalid request method"]);
}
?>
