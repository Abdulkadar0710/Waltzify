<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
error_reporting(E_ALL);

$conn = new mysqli("localhost", "root", "", "waltzer");

if ($conn->connect_error) {
    echo json_encode(["result" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_GET['id'] ?? '';
    $courierCompany = $_POST['Courier_Company'] ?? '';
    $companyURL = $_POST['Company_URL'] ?? '';

    if (empty($id) || empty($courierCompany) || empty($companyURL)) {
        echo json_encode(["result" => "All fields are required"]);
        exit();
    }

    try {
        $stmt = $conn->prepare("UPDATE deliverycompany SET Courier_Company = ?, Tracking_URL = ? WHERE Id = ?");
        $stmt->bind_param("ssi", $courierCompany, $companyURL, $id);

        if ($stmt->execute()) {
            echo json_encode(["result" => "Courier Company Updated Successfully!"]);
        } else {
            echo json_encode(["result" => "Failed to update company: " . $stmt->error]);
        }
        $stmt->close();
    } catch (Exception $e) {
        echo json_encode(["result" => "Error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["result" => "Invalid request method"]);
}

$conn->close();
?>
