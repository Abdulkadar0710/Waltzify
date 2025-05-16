<?php
session_start();
header("Access-Control-Allow-Origin:  *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if (isset($_SESSION['user'])) {
    echo json_encode(['isAuthenticated' => true, 'user' => $_SESSION['user']]);
} else {
    echo json_encode(['isAuthenticated' => false]);
}
?>
