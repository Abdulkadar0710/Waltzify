<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

session_start();
$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    die(json_encode(["result" => "Connection failed: " . $conn->connect_error]));
}

// Get the JSON data from the request
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];

if ($email && $password) {
    // Prepare the SQL statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM user WHERE email = ?");
    $stmt->bind_param("s", $email);  // 's' stands for string
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if user exists
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Check if the user's verification_status is "Verified"
        if ($user['verification_status'] !== "Verified") {
            $verification_url = "http://localhost/waltzify_copy_fake/Backend/email_verification.php?verification_token=" . $user['verification_token'];

                // Return the message with the "Click Here" button for verification
                echo json_encode([
                    "result" => "Please verify your email before logging in.We have already sent a verfication link on your email.",
                   
                ]);
        } else {
            // Verify the password
            if (password_verify($password, $user['password'])) {
                $_SESSION['user'] = $user;
                echo json_encode(["result" => "Login successful", "data" => $user]);
            } else {
                echo json_encode(["result" => "Invalid Email or Password"]);
            }
        }
    } else {
        echo json_encode(["result" => "Invalid Email or Password"]);
    }

    // Close the prepared statement
    $stmt->close();
} else {
    echo json_encode(["result" => "Email and Password are required"]);
}

// Close the database connection
$conn->close();
?>


