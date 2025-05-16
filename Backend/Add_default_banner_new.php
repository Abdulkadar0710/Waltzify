<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

ob_clean(); // Ensure no unwanted output

$conn = new mysqli("localhost", "root", "", "waltzer");
if ($conn->connect_error) {
    echo json_encode(["result" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['image'])) {
    $location = $_POST['location'] ?? '';
    $img = $_FILES['image']['name'] ?? '';
    $tmp = $_FILES['image']['tmp_name'] ?? '';
    $uploadError = $_FILES['image']['error'];

    if ($uploadError !== UPLOAD_ERR_OK) {
        echo json_encode(["result" => "File upload error: " . $uploadError]);
        exit();
    }

    $folder = $_SERVER['DOCUMENT_ROOT'] . '/DefaultBannerNew/';
    if (!is_dir($folder)) {
        mkdir($folder, 0777, true);
    }

    $imageName = time() . "_" . basename($img);
    $targetFile = $folder . $imageName;

    if (move_uploaded_file($tmp, $targetFile)) {
        $query = "INSERT INTO defaultbannernew (location, image) VALUES (?, ?)";
        $stmt = $conn->prepare($query);
        if (!$stmt) {
            echo json_encode(["result" => "Database Error: " . $conn->error]);
            exit();
        }
        $stmt->bind_param("ss", $location, $imageName);
        if ($stmt->execute()) {
            echo json_encode(["result" => "Banner Added Successfully!", "image" => $imageName]);
        } else {
            echo json_encode(["result" => "Database insertion failed: " . $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(["result" => "File upload failed"]);
    }
} else {
    echo json_encode(["result" => "Invalid request"]);
}

$conn->close();
?>
