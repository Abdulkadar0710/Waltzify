<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$conn = new mysqli("localhost", "root", "", "waltzer");

if (mysqli_connect_error()) {
    echo json_encode([["result" => "Database connection failed"]]);
    exit();
}

// Check if the request is a POST request with files
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['img1']) && isset($_FILES['img2']) && isset($_FILES['img3']) && isset($_FILES['img4']) && isset($_FILES['img5']) && isset($_FILES['img6']) && isset($_FILES['img7']) && isset($_FILES['img8'])) {
   // $email       =  $_POST['email'] ?? '';
    $pname            =  $_POST['pname'] ?? '';
    $category         =  $_POST['category'] ?? '';
    $sku              =  $_POST['sku'] ?? '';
    $brand            =  $_POST['brand'] ?? '';
    $color            =  $_POST['color'] ?? '';
    $description      =  $_POST['description'] ?? '';
    $youtubeLink      =  $_POST['youtubeLink'] ?? '';
    $igstn            =  $_POST['igstn'] ?? '';
    $weight           =  $_POST['weight'] ?? '';
    $length           =  $_POST['length'] ?? '';
    $breadth          =  $_POST['breadth'] ?? '';
    $height           =  $_POST['height'] ?? '';
    $price            =  $_POST['price'] ?? '';
    $discount         =  $_POST['discount'] ?? ''; 
    $pQuantity        =  $_POST['quantity'] ?? '';
    $size             =  $_POST['size'] ?? '';
    $HSN              = $_POST['HSN'] ?? '';
    $keyFeatures      = $_POST['keyFeatures'] ?? '';

    $img1        =  $_FILES['img1']['name'] ?? '';
    $img2        =  $_FILES['img2']['name'] ?? '';
    $img3        =  $_FILES['img3']['name'] ?? '';
    $img4        =  $_FILES['img4']['name'] ?? '';
    $img5        =  $_FILES['img5']['name'] ?? '';
    $img6        =  $_FILES['img6']['name'] ?? '';
    $img7        =  $_FILES['img7']['name'] ?? '';
    $img8        =  $_FILES['img8']['name'] ?? '';

    $tmp1        =  $_FILES['img1']['tmp_name'] ?? '';
    $tmp2        =  $_FILES['img2']['tmp_name'] ?? '';
    $tmp3        =  $_FILES['img3']['tmp_name'] ?? '';
    $tmp4        =  $_FILES['img4']['tmp_name'] ?? '';
    $tmp5        =  $_FILES['img5']['tmp_name'] ?? '';
    $tmp6        =  $_FILES['img6']['tmp_name'] ?? '';
    $tmp7        =  $_FILES['img7']['tmp_name'] ?? '';
    $tmp8        =  $_FILES['img8']['tmp_name'] ?? '';

    $folder      =  $_SERVER['DOCUMENT_ROOT'].'Products/';
    $result      = "";
    
  //  if($email == "admin_ecommerce@gmail.com" || $email == "admin_smitha@gmail.com")
  //  {
    $upload1 = move_uploaded_file($tmp1, $folder . $img1);
    $upload2 = move_uploaded_file($tmp2, $folder . $img2);
    $upload3 = move_uploaded_file($tmp3, $folder . $img3);
    $upload4 = move_uploaded_file($tmp4, $folder . $img4);
    $upload5 = move_uploaded_file($tmp5, $folder . $img5);
    $upload6 = move_uploaded_file($tmp6, $folder . $img6);
    $upload7 = move_uploaded_file($tmp7, $folder . $img7);
    $upload8 = move_uploaded_file($tmp8, $folder . $img8);

    if ($upload1 && $upload2 && $upload3 && $upload4 && $upload5 && $upload6 && $upload7 && $upload8) {
        $query = "INSERT INTO products (pname,SKU, category, brand,color, description,youtubeLink,igstn , img1, img2, img3, img4,img5,img6,img7,img8,weight,length,breadth,height, size,HSN,keyFeatures, p_price,discount,pQuantity) VALUES ( ?, ?, ?, ?,?,?,?,?, ?,?,?, ?,?,?,?,?, ?, ?,?, ?,?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("sssssssissssssssssssssssii",  $pname,$sku, $category, $brand,$color, $description, $youtubeLink,$igstn,$img1, $img2, $img3, $img4,$img5,$img6,$img7,$img8,$weight,$length,$breadth,$height,$size ,$HSN,$keyFeatures,$price, $discount,$pQuantity);
        $res = $stmt->execute();

        if ($res) {
            $result = "Registered Successfully!";
        } else {
            $result = "Not Submitted, Please try again!";
        }
        $stmt->close();
    } else {
        $result = "File upload failed";
    }
   // }
    

    $conn->close();
    echo json_encode([["result" => $result]]);
} else {
    echo json_encode([["result" => "Invalid input"]]);
}
?>