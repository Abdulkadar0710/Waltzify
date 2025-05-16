<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

$verificationMessage = "";
if (isset($_GET['verification_token'])) {
    $token = $_GET['verification_token'];
    $query = "UPDATE user SET verification_status = 'Verified' WHERE verification_token = ?";
    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param("s", $token);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $verificationMessage = "Your email has been successfully verified!";
        } else {
            $verificationMessage = "Invalid or already verified link.";
        }

        $stmt->close();
    } else {
        $verificationMessage = "Database query failed!";
    }
} else {
    $verificationMessage = "No email parameter found!";
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            margin: 0;
            font-family: 'Arial', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #6e8efb, #a777e3);
            color: #fff;
            text-align: center;
        }
        .container {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
            max-width: 400px;
            width: 90%;
        }
        .logo {
            margin-bottom: 20px;
        }
        .logo img {
            width: 80px;
        }
        h1 {
            font-size: 1.8em;
            margin: 20px 0;
        }
        p {
            font-size: 1em;
            margin-bottom: 20px;
        }
        .button {
            display: inline-block;
            background-color: #fff;
            color: #6e8efb;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 10px;
            font-weight: bold;
            transition: background 0.3s, color 0.3s;
        }
        .button:hover {
            background-color: #fd4a1d;
            color: #fff;
        }
        @media (max-width: 480px) {
            h1 {
                font-size: 1.5em;
            }
            p {
                font-size: 0.9em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="logo.avif" alt="Logo">
        </div>
        <h1>Email Verification Message</h1>
        <p style="font-weight: bold;"><?php echo htmlspecialchars($verificationMessage); ?></p>
        <a class="button" href="https://www.waltzify.com/login">Go to login page</a>
    </div>
</body>
</html>
