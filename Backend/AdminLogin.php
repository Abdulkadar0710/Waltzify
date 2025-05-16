
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    die(json_encode(["result" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];

$sql = "SELECT * FROM admin WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);  // Bind the email as a string
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $admin = $result->fetch_assoc();
    session_start();
    if (password_verify($password, $admin['password'])) {
        $_SESSION['adminEmail'] = $email;
        $_SESSION['adminRole'] = $admin['role'];
        echo json_encode(["result" => "Login successful", "data" => $admin]);
    } else {
        echo json_encode(["result" => "Invalid Email or Password"]);
    }
    /* $_SESSION['adminEmail'] = $email;
    $_SESSION['adminRole'] = $admin['role']; // Save the role in session
    echo json_encode(["result" => "Login successful", "data" => $admin]); */
} else {
    echo json_encode(["result" => "Invalid Email or Password"]);
}
$stmt->close();
$conn->close();
?>