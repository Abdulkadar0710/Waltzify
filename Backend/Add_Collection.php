<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");

ob_start(); // Start output buffering to prevent accidental output

$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    echo json_encode(["result" => "Database connection failed"]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['images1'])) {
    $collectionName = $_POST['collectionName'] ?? '';
    $img1 = $_FILES['images1']['name'] ?? '';
    $tmp1 = $_FILES['images1']['tmp_name'] ?? '';

    $folder = $_SERVER['DOCUMENT_ROOT'] . '/Collection/';

    if (!is_dir($folder)) {
        mkdir($folder, 0777, true); // Ensure directory exists
    }

    $result = "";

    if (move_uploaded_file($tmp1, $folder . $img1)) {
        $query = "INSERT INTO collection (collectionName, images1) VALUES (?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ss", $collectionName, $img1);

        if ($stmt->execute()) {
            $result = "Collection Added Successfully!";
        } else {
            $result = "Database insertion failed!";
        }
        $stmt->close();
    } else {
        $result = "File upload failed";
    }

    $conn->close();
    ob_end_clean(); // Clear any accidental output
    echo json_encode(["result" => $result]);
    exit();
}

ob_end_clean();
echo json_encode(["result" => "Invalid input"]);
?>
