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
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['pfile'])) {
    $email = $_POST['email'] ?? '';
    $name = $_POST['name'] ?? '';
    $pfile = $_FILES['pfile']['name'] ?? '';
    $pfile_tmp = $_FILES['pfile']['tmp_name'] ?? '';
    $folder = $_SERVER['DOCUMENT_ROOT'].'AdminImages/' . $pfile;
    $password = $_POST['password'] ?? '';
    $role = $_POST['role'] ?? '';
    $result = "";
  

    
        if (move_uploaded_file($pfile_tmp, $folder))
        {
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
            $query = "INSERT INTO admin (email, name, pfile, password,role) VALUES (?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("sssss", $email, $name, $pfile, $hashedPassword,$role);
            $res = $stmt->execute();
            if ($res)
            {
                $result = "Registered Successfully!";
            }
            else
            {
                $result = "Not Submitted,Please try again!";
            }
            $stmt->close();
        }
        else
        {
            $result = "File upload failed";
        }
    
    $conn->close();
    echo json_encode([["result" => $result]]);
} 
else 
{
    echo json_encode([["result" => "Invalid input"]]);
}
?>