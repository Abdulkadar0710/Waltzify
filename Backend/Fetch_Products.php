<?php 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json"); 

$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id > 0) {
    // Fetch the product details using prepared statement
    $product_stmt = $conn->prepare("SELECT * FROM products WHERE Id = ?");
    $product_stmt->bind_param("i", $id); 
    $product_stmt->execute();
    $product_result = $product_stmt->get_result();

    if ($product_result->num_rows > 0) {
        $product = $product_result->fetch_assoc();

        // Fetch reviews for the product using prepared statement
        $reviews_stmt = $conn->prepare("
            SELECT * FROM user_review 
            JOIN user ON user_review.UserId = user.Id 
            JOIN products ON user_review.ProductId = products.Id 
            WHERE products.pname = (SELECT pname FROM products WHERE Id = ?)
        ");
        $reviews_stmt->bind_param("i", $id);
        $reviews_stmt->execute();
        $reviews_result = $reviews_stmt->get_result();

        $admin_review_stmt = $conn->prepare("
            SELECT r.* FROM review r
            JOIN products p ON r.productId = p.Id
            WHERE p.pname = (SELECT pname FROM products WHERE Id = ?)
        ");
        $admin_review_stmt->bind_param("i", $id);
        $admin_review_stmt->execute();
        $admin_result = $admin_review_stmt->get_result();

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

        $product['reviews'] = $reviews;
        $product['adminReviews'] = $adminReviews; 

        // Fetch related products using prepared statement
        $category = $product['category'];

        $related_stmt = $conn->prepare("SELECT p.*, 
       IFNULL(average_ratings.avg_rating, 0) AS average_rating
FROM products p
LEFT JOIN (
    SELECT pname, AVG(ur.Rating) AS avg_rating
    FROM products p1
    LEFT JOIN user_review ur ON p1.Id = ur.ProductId
    GROUP BY p1.pname
) average_ratings ON p.pname = average_ratings.pname
WHERE p.category = ? AND p.Id != ?
LIMIT 8");
        $related_stmt->bind_param("si", $category, $id);
        $related_stmt->execute();
        $related_result = $related_stmt->get_result();

        $related_products = [];
        if ($related_result->num_rows > 0) {
            while ($related_row = $related_result->fetch_assoc()) {
                $related_products[] = $related_row;
            }
        }
        $product['related_products'] = $related_products;
        
        // Fetch color products using prepared statement
        $productName = $product['pname'];
        $color = $product['color'];
        
        $color_stmt = $conn->prepare("SELECT * FROM products WHERE pname = ? AND color != ? AND color != '' AND Id != ?");
        $color_stmt->bind_param("ssi", $productName, $color, $id);
        $color_stmt->execute();
        $color_result = $color_stmt->get_result();
        
        $color_products = [];
        if ($color_result->num_rows > 0) {
            while ($color_row = $color_result->fetch_assoc()) {
                $color_products[] = $color_row;
            }
        }
        $product['color_products'] = $color_products;
        
        // Fetch sizes and prices of the product using prepared statement
        $size_stmt = $conn->prepare("SELECT * FROM products WHERE pname = ?");
        $size_stmt->bind_param("s", $productName);
        $size_stmt->execute();
        $size_result = $size_stmt->get_result();
        
        $size_products = [];
        if ($size_result->num_rows > 0) {
            while ($size_row = $size_result->fetch_assoc()) {
                $size_products[] = $size_row;
            }
        }
        $product['size_products'] = $size_products;



        // //Fetch review for reviews

        $stmt = $conn->prepare("SELECT * FROM review where review.productId=$id");
        $stmt->execute();
        $res = $stmt->get_result();

$size_pro = [];
if ($res->num_rows > 0) {
    while ($size_row = $res->fetch_assoc()) {
        $size_pro[] = $size_row;
    }
}

      $product['review2'] = $size_pro; // Fixed the variable assignment here

        echo json_encode($product);
    } else {
        echo json_encode(["error" => "Product not found"]);
    }
} else {
    echo json_encode(["error" => "Invalid product ID"]);
}

$conn->close();
?>


