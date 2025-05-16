<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    echo json_encode([["result" => "Database connection failed: " . $conn->connect_error]]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'] ?? '';
    $proId = intval($_POST['productId'] ?? 0);
    $reviewTitle = $_POST['reviewTitle'] ?? '';
    $review = $_POST['review'] ?? '';
    $rating = intval($_POST['rating'] ?? 0);

    $image1 = $_FILES['image1']['name'] ?? '';
    $image2 = $_FILES['image2']['name'] ?? '';
    $image3 = $_FILES['image3']['name'] ?? '';
    $image4 = $_FILES['image4']['name'] ?? '';

    $tmp1 = $_FILES['image1']['tmp_name'] ?? '';
    $tmp2 = $_FILES['image2']['tmp_name'] ?? '';
    $tmp3 = $_FILES['image3']['tmp_name'] ?? '';
    $tmp4 = $_FILES['image4']['tmp_name'] ?? '';

    $folder = $_SERVER['DOCUMENT_ROOT'] . "/Review/";
    if (!is_dir($folder)) {
        mkdir($folder, 0777, true);
    }

    $upload1 = $image1 ? move_uploaded_file($tmp1, $folder . $image1) : false;
    $upload2 = $image2 ? move_uploaded_file($tmp2, $folder . $image2) : false;
    $upload3 = $image3 ? move_uploaded_file($tmp3, $folder . $image3) : false;
    $upload4 = $image4 ? move_uploaded_file($tmp4, $folder . $image4) : false;

    $stmt = $conn->prepare("INSERT INTO review (name, productId, reviewTitle, review, rating, img1, img2, img3, img4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sississss", $name, $proId, $reviewTitle, $review, $rating, $image1, $image2, $image3, $image4);

    $res = $stmt->execute();
    $result = $res ? "Registered Successfully!" : "Not Submitted, Please try again!";
    
    $stmt->close();
    $conn->close();
    
    echo json_encode([["result" => $result]]);
    exit();
}
?>
