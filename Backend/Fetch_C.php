<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$category = isset($_GET['category']) ? $_GET['category'] : '';

if ($category) {
    // Use a prepared statement to prevent SQL injection
    $product_sql  = "SELECT  
    p.*, 
    IFNULL(
        (SELECT AVG(ur.Rating) 
         FROM products p2 
         LEFT JOIN user_review ur ON p2.Id = ur.ProductId 
         WHERE p2.pname = p.pname), 
        0
    ) as average_rating 
FROM 
    products p 
WHERE 
    p.category = ? 
    AND p.discount >= 0 
GROUP BY 
    p.Id"
;
     
    // Prepare the statement
    $stmt = $conn->prepare($product_sql);
    if ($stmt === false) {
        die(json_encode(["error" => "Failed to prepare statement: " . $conn->error]));
    }

    // Bind the parameter
    $stmt->bind_param("s", $category);  // "s" means the variable is a string

    // Execute the query
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();

    $products = [];
    if ($result->num_rows > 0) {
        while ($product_row = $result->fetch_assoc()) {
            $products[] = $product_row;
        }
    } else {
        echo json_encode(["error" => "No products found for the given category"]);
        $stmt->close();
        $conn->close();
        exit();
    }

    // Return the products as JSON
    echo json_encode(["products" => $products]);

    // Close the statement
    $stmt->close();
} else {
    // Fetch any products if no category is provided
    $product_sql = "SELECT * FROM products LIMIT 4";
    $product_result = $conn->query($product_sql);

    $products = [];
    if ($product_result->num_rows > 0) {
        while ($product_row = $product_result->fetch_assoc()) {
            $products[] = $product_row;
        }
    }

    echo json_encode(["products" => $products]);
}

$conn->close();
?>
