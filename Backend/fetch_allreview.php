<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

$products = [];

if ($id > 0) {
    // Fetch the product details
    $product_sql = "SELECT * FROM products WHERE Id = ?";
    $stmt = $conn->prepare($product_sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $product_result = $stmt->get_result();

    if ($product_result->num_rows > 0) {
        $product_row = $product_result->fetch_assoc();

        // Fetch reviews for the product
        $reviews_sql = "SELECT user_review.*, user.* 
                        FROM user_review 
                        JOIN user ON user_review.UserId = user.Id 
                        WHERE ProductId = ?";
        $reviews_stmt = $conn->prepare($reviews_sql);
        $reviews_stmt->bind_param("i", $id);
        $reviews_stmt->execute();
        $reviews_result = $reviews_stmt->get_result();

        $admin_review_sql = "SELECT * FROM review WHERE productId = ?";
        $admin_stmt = $conn->prepare($admin_review_sql);
        $admin_stmt->bind_param("i", $id);
        $admin_stmt->execute();
        $admin_result = $admin_stmt->get_result();

        $reviews = [];
        if ($reviews_result->num_rows > 0) {
            while ($review_row = $reviews_result->fetch_assoc()) {
                $reviews[] = $review_row;
            }
        }

        $adminReviews = [];
        if ($admin_result->num_rows > 0) {
            while ($admin_row = $admin_result->fetch_assoc()) {
                $adminReviews[] = $admin_row;
            }
        }

        $product_row['reviews'] = $reviews;
        $product_row['adminReviews'] = $adminReviews;

        $products[] = $product_row;
    } else {
        echo json_encode(["error" => "Product not found"]);
        exit;
    }
} else {
    // Fetch all products
    $product_sql = "SELECT * FROM products";
    $product_result = $conn->query($product_sql);

    if ($product_result->num_rows > 0) {
        while ($product_row = $product_result->fetch_assoc()) {
            $product_id = $product_row['Id'];

            // Fetch reviews for each product
            $reviews_sql = "SELECT user_review.*, user.* 
                            FROM user_review 
                            JOIN user ON user_review.UserId = user.Id 
                            WHERE ProductId = ?";
            $reviews_stmt = $conn->prepare($reviews_sql);
            $reviews_stmt->bind_param("i", $product_id);
            $reviews_stmt->execute();
            $reviews_result = $reviews_stmt->get_result();

            $admin_review_sql = "SELECT * FROM review WHERE productId = ?";
            $admin_stmt = $conn->prepare($admin_review_sql);
            $admin_stmt->bind_param("i", $product_id);
            $admin_stmt->execute();
            $admin_result = $admin_stmt->get_result();

            $reviews = [];
            if ($reviews_result->num_rows > 0) {
                while ($review_row = $reviews_result->fetch_assoc()) {
                    $reviews[] = $review_row;
                }
            }

            $adminReviews = [];
            if ($admin_result->num_rows > 0) {
                while ($admin_row = $admin_result->fetch_assoc()) {
                    $adminReviews[] = $admin_row;
                }
            }

            $product_row['reviews'] = $reviews;
            $product_row['adminReviews'] = $adminReviews;
            $products[] = $product_row;
        }
    }
}

echo json_encode($products);

$conn->close();

?>
