<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// Database connection
$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    echo json_encode(["result" => "Database connection failed"]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_GET['id'] ?? '';
    $cname = $_POST['categoryName'] ?? '';
    $img = $_FILES['image']['name'] ?? '';
    $tmp = $_FILES['image']['tmp_name'] ?? '';
    $result = "";

    if (empty($id)) {
        echo json_encode(["result" => "Category ID is required"]);
        exit();
    }

    $folder = $_SERVER['DOCUMENT_ROOT'].'Category/';

    if (!empty($cname) || !empty($img)) {
        $updateFields = [];

        if (!empty($cname)) {
            $updateFields[] = "cname = ?";
        }

        if (!empty($img)) {
            $newImagePath = $folder . basename($img);
            if (move_uploaded_file($tmp, $newImagePath)) {
                $updateFields[] = "image = ?";
            } else {
                echo json_encode(["result" => "File upload failed"]);
                exit();
            }
        }

        if (!empty($updateFields)) {
            $updateQuery = "UPDATE category SET " . implode(', ', $updateFields) . " WHERE category_id = ?";
            $stmt = $conn->prepare($updateQuery);

            if (!$stmt) {
                echo json_encode(["result" => "Prepare statement failed: " . $conn->error]);
                exit();
            }

            // Bind parameters dynamically based on the fields to be updated
            $bindTypes = "";
            $bindValues = [];

            if (!empty($cname)) {
                $bindTypes .= "s";
                $bindValues[] = $cname;
            }

            if (!empty($img)) {
                $bindTypes .= "s";
                $bindValues[] = $img;
            }

            $bindTypes .= "i";
            $bindValues[] = $id;

            $stmt->bind_param($bindTypes, ...$bindValues);

            if ($stmt->execute()) {
                $result = "Category Updated Successfully!";
            } else {
                echo json_encode(["result" => "Error updating category: " . $stmt->error]);
                exit();
            }

            $stmt->close();
        } else {
            $result = "No fields to update";
        }
    } else {
        $result = "No fields to update";
    }

    $conn->close();
    echo json_encode(["result" => $result]);
} else {
    echo json_encode(["result" => "Invalid request method"]);
}
?>


