<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Fetch reviews for the product
$reviews_sql = "SELECT user_review.*, user.Name, user.Email FROM user_review JOIN user ON user_review.UserId = user.Id ORDER BY user_review.timestamp DESC LIMIT 7";
$reviews_result = $conn->query($reviews_sql);

$reviews = [];
if ($reviews_result->num_rows > 0) {
    while ($review_row = $reviews_result->fetch_assoc()) {
        $reviews[] = $review_row;
    }
} else {
    echo json_encode(["error" => "No reviews found"]);
    exit();
}

echo json_encode($reviews);

$conn->close();

?>
