<?php
session_start();
header("Access-Control-Allow-Origin:  https://www.waltzify.com");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

session_unset();
//header("Location: /login"); // Redirect to login page after logout
?>
<meta http-equiv="refresh" 
          content="0; url = https://www.waltzify.com/login" />
          <?php
?>