<?php
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
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
    $pname            =  $_POST['pname'] ?? '';
    $category         =  $_POST['category'] ?? '';
    $sku              =  $_POST['sku'] ?? '';
    $brand            =  $_POST['brand'] ?? '';
    $color            =  $_POST['color'] ?? '';
    $description      =  $_POST['description'] ?? '';
    $HSN              =  $_POST['HSN'] ?? '';
    $keyFeatures      =  $_POST['keyFeatures'] ?? '';
    $youtubeLink      =  $_POST['youtubeLink'] ?? '';
    $igstn            =  $_POST['igstn'] ?? '';
    $weight           =  $_POST['weight'] ?? '';
    $length           =  $_POST['length'] ?? '';
    $breadth          =  $_POST['breadth'] ?? '';
    $height           =  $_POST['height'] ?? '';
    $price            =  $_POST['price'] ?? '';
    $discount         =  $_POST['discount'] ?? ''; 
    $pQuantity         =  $_POST['quantity'] ?? '';
    $size             =  $_POST['size'] ?? '';
    

    $img1 = $_FILES['img1']['name'] ?? '';
    $img2 = $_FILES['img2']['name'] ?? '';
    $img3 = $_FILES['img3']['name'] ?? '';
    $img4 = $_FILES['img4']['name'] ?? '';
    $img5 = $_FILES['img5']['name'] ?? '';
    $img6 = $_FILES['img6']['name'] ?? '';
    $img7 = $_FILES['img7']['name'] ?? '';
    $img8 = $_FILES['img8']['name'] ?? '';

    $tmp1        =  $_FILES['img1']['tmp_name'] ?? '';
    $tmp2        =  $_FILES['img2']['tmp_name'] ?? '';
    $tmp3        =  $_FILES['img3']['tmp_name'] ?? '';
    $tmp4        =  $_FILES['img4']['tmp_name'] ?? '';
    $tmp5        =  $_FILES['img5']['tmp_name'] ?? '';
    $tmp6        =  $_FILES['img6']['tmp_name'] ?? '';
    $tmp7        =  $_FILES['img7']['tmp_name'] ?? '';
    $tmp8        =  $_FILES['img8']['tmp_name'] ?? '';
    $result = "";

    if (empty($id)) {
        echo json_encode(["result" => "Product ID is required"]);
        exit();
    }

    $folder = $_SERVER['DOCUMENT_ROOT'].'Products/';

    if (!empty($pname) || !empty($img1) || !empty($img2) || !empty($img3) || !empty($img4) || !empty($img5) || !empty($img6) ||!empty($img7) || !empty($img8) || !empty($category) || !empty($sku) || !empty($brand) || !empty($color) || !empty($description) || !empty($weight) || !empty($length) || !empty($breadth) || !empty($height) || !empty($price) ||  isset($discount) || !empty($price)|| isset($pQuantity)|| !empty($size) || !empty($HSN) || !empty($keyFeatures)) {
        $updateFields = [];

        if (!empty($pname)) {
            $updateFields[] = "pname = ?";
        }
        if (!empty($category)) {
            $updateFields[] = "category = ?";
        }
        if (!empty($sku)) {
            $updateFields[] = "SKU = ?";
        }
        if (!empty($brand)) {
            $updateFields[] = "brand = ?";
        }
        if (!empty($color)) {
            $updateFields[] = "color = ?";
        }
        if (!empty($description)) {
            $updateFields[] = "description = ?";
        }
        if (!empty($HSN)) {
            $updateFields[] = "HSN = ?";
        }
        if (!empty($keyFeatures)) {
            $updateFields[] = "keyFeatures = ?";
        }
        if (!empty($youtubeLink)) {
            $updateFields[] = "youtubeLink = ?";
        }
        if (!empty($igstn)) {
            $updateFields[] = "igstn = ?";
        }
        
        if (!empty($weight)) {
            $updateFields[] = "weight = ?";
        }
        if (!empty($length)) {
            $updateFields[] = "length = ?";
        }
        if (!empty($breadth)) {
            $updateFields[] = "breadth = ?";
        }
        if (!empty($height)) {
            $updateFields[] = "height = ?";
        }
        if (!empty($price)) {
            $updateFields[] = "p_price = ?";
        }
        if (isset($discount)) {
            $updateFields[] = "discount = ?";
        }
        if (isset($pQuantity)) {
            $updateFields[] = "pQuantity = ?";
            $stockStatus = ($pQuantity > 0) ? "In Stock" : "Out of Stock";
            $updateFields[] = "Stock = ?";
        }
        if (!empty($size)) {
            $updateFields[] = "size = ?";
        }
        if (!empty($img1)) {
            $newImagePath = $folder . basename($img1);
            if (move_uploaded_file($tmp1, $newImagePath)) {
                $updateFields[] = "img1 = ?";
            } else {
                echo json_encode(["result" => "File upload failed"]);
                exit();
            }
        }
        if (!empty($img2)) {
            $newImagePath = $folder . basename($img2);
            if (move_uploaded_file($tmp2, $newImagePath)) {
                $updateFields[] = "img2 = ?";
            } else {
                echo json_encode(["result" => "File upload failed"]);
                exit();
            }
        }if (!empty($img3)) {
            $newImagePath = $folder . basename($img3);
            if (move_uploaded_file($tmp3, $newImagePath)) {
                $updateFields[] = "img3 = ?";
            } else {
                echo json_encode(["result" => "File upload failed"]);
                exit();
            }
        }if (!empty($img4)) {
            $newImagePath = $folder . basename($img4);
            if (move_uploaded_file($tmp4, $newImagePath)) {
                $updateFields[] = "img4 = ?";
            } else {
                echo json_encode(["result" => "File upload failed"]);
                exit();
            }
        }
        if (!empty($img5)) {
            $newImagePath = $folder . basename($img5);
            if (move_uploaded_file($tmp5, $newImagePath)) {
                $updateFields[] = "img5 = ?";
            } else {
                echo json_encode(["result" => "File upload failed"]);
                exit();
            }
        }
        if (!empty($img6)) {
            $newImagePath = $folder . basename($img6);
            if (move_uploaded_file($tmp6, $newImagePath)) {
                $updateFields[] = "img6 = ?";
            } else {
                echo json_encode(["result" => "File upload failed"]);
                exit();
            }
        }
        if (!empty($img7)) {
            $newImagePath = $folder . basename($img7);
            if (move_uploaded_file($tmp7, $newImagePath)) {
                $updateFields[] = "img7 = ?";
            } else {
                echo json_encode(["result" => "File upload failed"]);
                exit();
            }
        }
        if (!empty($img8)) {
            $newImagePath = $folder . basename($img8);
            if (move_uploaded_file($tmp8, $newImagePath)) {
                $updateFields[] = "img8 = ?";
            } else {
                echo json_encode(["result" => "File upload failed"]);
                exit();
            }
        }

        if (!empty($updateFields)) {
            $updateQuery = "UPDATE products SET " . implode(', ', $updateFields) . " WHERE Id = ?";
            $stmt = $conn->prepare($updateQuery);

            if (!$stmt) {
                echo json_encode(["result" => "Prepare statement failed: " . $conn->error]);
                exit();
            }

            // Bind parameters dynamically based on the fields to be updated
            $bindTypes = "";
            $bindValues = [];

            if (!empty($pname)) {
                $bindTypes .= "s";
                $bindValues[] = $pname;
            }
            
            if (!empty($category)) {
                $bindTypes .= "s";
                $bindValues[] = $category;
            }
            if (!empty($sku)) {
                $bindTypes .= "s";
                $bindValues[] = $sku;
            }
            if (!empty($brand)) {
                $bindTypes .= "s";
                $bindValues[] = $brand;
            }
            if (!empty($color)) {
                $bindTypes .= "s";
                $bindValues[] = $color;
            }
            if (!empty($description)) {
                $bindTypes .= "s";
                $bindValues[] = $description;
            }
            if (!empty($HSN)) {
                $bindTypes .= "s";
                $bindValues[] = $HSN;
            }
            if (!empty($keyFeatures)) {
                $bindTypes .= "s";
                $bindValues[] = $keyFeatures;
            }
            
            if (!empty($youtubeLink)) {
                $bindTypes .= "s";
                $bindValues[] = $youtubeLink;
            }
            if (!empty($igstn)) {
                $bindTypes .= "i";
                $bindValues[] = $igstn;
            }
            if (!empty($weight)) {
                $bindTypes .= "s";
                $bindValues[] = $weight;
            }
            if (!empty($length)) {
                $bindTypes .= "s";
                $bindValues[] = $length;
            }
            if (!empty($breadth)) {
                $bindTypes .= "s";
                $bindValues[] = $breadth;
            }
            if (!empty($height)) {
                $bindTypes .= "s";
                $bindValues[] = $height;
            }
            
            if (!empty($price)) {
                $bindTypes .= "s";
                $bindValues[] = $price;
            }
            if (isset($discount)) {
                $bindTypes .= "i";
                $bindValues[] = $discount;
            }
            if (isset($pQuantity)) {
                $bindTypes .= "s";
                $bindValues[] = $pQuantity;
                $bindTypes .= "s";
                $bindValues[] = $stockStatus;
            }
            if (!empty($size)) {
                $bindTypes .= "s";
                $bindValues[] = $size;
            }
            


            if (!empty($img1)) {
                $bindTypes .= "s";
                $bindValues[] = $img1;
            }
            if (!empty($img2)) {
                $bindTypes .= "s";
                $bindValues[] = $img2;
            }
            if (!empty($img3)) {
                $bindTypes .= "s";
                $bindValues[] = $img3;
            }
            if (!empty($img4)) {
                $bindTypes .= "s";
                $bindValues[] = $img4;
            }
            if (!empty($img5)) {
                $bindTypes .= "s";
                $bindValues[] = $img5;
            }
            if (!empty($img6)) {
                $bindTypes .= "s";
                $bindValues[] = $img6;
            }
            if (!empty($img7)) {
                $bindTypes .= "s";
                $bindValues[] = $img7;
            }
            if (!empty($img8)) {
                $bindTypes .= "s";
                $bindValues[] = $img8;
            }


            $bindTypes .= "i";
            $bindValues[] = $id;

            $stmt->bind_param($bindTypes, ...$bindValues);

            if ($stmt->execute()) {
                $result = "Product Record Updated Successfully!";
            } else {
                echo json_encode(["result" => "Error updating Record: " . $stmt->error]);
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