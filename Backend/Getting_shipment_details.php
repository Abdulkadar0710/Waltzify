<?php
// Replace this with your generated token
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQ5MDI0ODAsInNvdXJjZSI6InNyLWF1dGgtaW50IiwiZXhwIjoxNzI2MjkxODE1LCJqdGkiOiJzQmozV3h5S3Nld1Q5dEluIiwiaWF0IjoxNzI1NDI3ODE1LCJpc3MiOiJodHRwczovL3NyLWF1dGguc2hpcHJvY2tldC5pbi9hdXRob3JpemUvdXNlciIsIm5iZiI6MTcyNTQyNzgxNSwiY2lkIjo1NTk2MjUsInRjIjozNjAsInZlcmJvc2UiOmZhbHNlLCJ2ZW5kb3JfaWQiOjAsInZlbmRvcl9jb2RlIjoid29vY29tbWVyY2UifQ.M8aQR7UnVCE-ghaeCGK3scWwL--4kAMy0pkJKAg9iro";

// Replace this with your specific order ID
$order_id = "ORD575127";

// cURL request to fetch shipment details
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://apiv2.shiprocket.in/v1/external/shipments?order_id=" . $order_id);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

curl_setopt($ch, CURLOPT_ENCODING, "");
curl_setopt($ch, CURLOPT_MAXREDIRS, 10);   
curl_setopt($ch, CURLOPT_TIMEOUT, 0);    
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);    
curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Content-Type: application/json",
    "Authorization: Bearer " . $token
));

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'cURL error: ' . curl_error($ch);
} else {
    echo "Raw Response: " . $response;
}

curl_close($ch);

$responseData = json_decode($response, true);

// Check if the response is successful
if (isset($responseData['data']) && !empty($responseData['data'])) {
    foreach ($responseData['data'] as $shipment) {
        echo "Shipment ID: " . $shipment['id'] . "\n";
        echo "Order ID: " . $shipment['order_id'] . "\n";
        echo "AWB: " . $shipment['awb'] . "\n";
        echo "Status: " . $shipment['status'] . "\n";
        echo "Created At: " . $shipment['created_at'] . "\n";
        echo "Channel Name: " . $shipment['channel_name'] . "\n";
        echo "Payment Method: " . $shipment['payment_method'] . "\n";

        echo "Products:\n";
        foreach ($shipment['products'] as $product) {
            echo "  Name: " . $product['name'] . "\n";
            echo "  SKU: " . $product['sku'] . "\n";
            echo "  Quantity: " . $product['quantity'] . "\n";
        }
        echo "\n";
    }
} else {
    echo "No shipment details found for the given order ID.";
    // Optionally, you can print the full response for debugging
    // echo json_encode($responseData, JSON_PRETTY_PRINT);
}
?>
