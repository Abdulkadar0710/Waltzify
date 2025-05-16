<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$conn = new mysqli("localhost", "root", "", "waltzer");

if (mysqli_connect_error()) { 
    echo json_encode(["result" => "Database connection failed"]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $rating = $_POST['rating'] ?? '';
    $headline = $_POST['headline'] ?? '';
    $review = $_POST['review'] ?? '';

    $user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;
    $product_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    $folder = $_SERVER['DOCUMENT_ROOT'] . 'User_Review/'; 
    $uploaded_images = [null, null, null, null]; // Default all images to null

    // Validate and upload images (if any)
    if (isset($_FILES['images']) && !empty($_FILES['images']['tmp_name'][0])) {
        foreach ($_FILES['images']['tmp_name'] as $key => $tmp_name) {
            if ($key >= 4) break; // Allow only up to 4 images
            $filename = $_FILES['images']['name'][$key];
            $tmp_file = $_FILES['images']['tmp_name'][$key];

            if (move_uploaded_file($tmp_file, $folder . $filename)) {
                $uploaded_images[$key] = $filename; // Store uploaded file name
            }
        }
    }

    // Check if the user has already submitted a review for the same product
    $checkQuery = "SELECT * FROM user_review WHERE UserId = ? AND ProductId = ?";
    $stmt = $conn->prepare($checkQuery);
    if (!$stmt) {
        echo json_encode(["result" => "Error preparing SQL: " . $conn->error]);
        exit();
    }
    $stmt->bind_param("ii", $user_id, $product_id);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo json_encode(["result" => "You have already submitted a review for this product."]);
    } else {
        // Insert the new review into the database
        $insertQuery = "
            INSERT INTO user_review (UserId, ProductId, rating, heading, images1, images2, images3, images4, review) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $insertStmt = $conn->prepare($insertQuery);
        if (!$insertStmt) {
            echo json_encode(["result" => "Error preparing SQL: " . $conn->error]);
            exit();
        }
        $insertStmt->bind_param(
            "iiissssss",
            $user_id,
            $product_id,
            $rating,
            $headline,
            $uploaded_images[0],
            $uploaded_images[1],
            $uploaded_images[2],
            $uploaded_images[3],
            $review
        );

        if ($insertStmt->execute()) {
            echo json_encode(["result" => "Review Added Successfully!"]);
        } else {
            echo json_encode(["result" => "Failed to add review: " . $insertStmt->error]);
        }
        $insertStmt->close();
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["result" => "Invalid input"]);
}
?>
