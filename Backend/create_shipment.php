<?php 
function createShipment($token, $orderId) {
    $url = "https://apiv2.shiprocket.in/v1/external/courier/generate/awb"; 

    $data = array(
        "shipment_id" => $orderId, 
        "courier_id" => "COURIER ID",  // Replace with actual courier ID
        "request_auto_pickup" => 1
    );

    $options = array(
        'http' => array(
            'header' => "Content-Type: application/json\r\nAuthorization: Bearer $token\r\n",
            'method' => 'POST',
            'content' => json_encode($data),
        ),
    );

    $context = stream_context_create($options); 
    $result = file_get_contents($url, false, $context);

    if ($result === FALSE) {
        die("Error occurred");
    }

    $response = json_decode($result, true);
    return $response; 
} 

$token = 'YOUR GENERATED TOKEN';  // Replace with actual token
$orderId = 'YOUR ORDER ID';  // Replace with actual order ID
$response = createShipment($token, $orderId);
print_r($response); 
?>
