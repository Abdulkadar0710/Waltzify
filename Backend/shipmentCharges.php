<?php
include('token.php'); // Ensure your token is defined here

// Define the API URL for Rate API
$apiUrl = "https://apiv2.shiprocket.in/v1/external/rates/checkout";


$product = [
    "name" => "Sample Product",
    "sku" => "SP001",
    "units" => 1,
    "selling_price" => 100,
    "discount" => 0,
    "tax" => 0,
    "hsn" => ""
];

$pickupAddress = [
    "city" => "Indore",
    "pincode" => "452001",
    "state" => "Madhya Pradesh",
    "country" => "India"
];

$deliveryAddress = [
    "city" => "Delhi",
    "pincode" => "110001",
    "state" => "Delhi",
    "country" => "India"
];

$requestData = [
    "pickup_location" => $pickupAddress['city'],
    "billing_customer_name" => "Sender Name",
    "billing_last_name" => "",
    "billing_address" => "Pickup Address in Indore",
    "billing_address_2" => "",
    "billing_city" => $pickupAddress['city'],
    "billing_pincode" => $pickupAddress['pincode'],
    "billing_country" => $pickupAddress['country'],
    "billing_state" => $pickupAddress['state'],
    "billing_email" => "sender@example.com",
    "billing_phone" => "1234567890",
    "shipping_customer_name" => "Receiver Name",
    "shipping_last_name" => "",
    "shipping_address" => "Delivery Address in Delhi",
    "shipping_address_2" => "",
    "shipping_city" => $deliveryAddress['city'],
    "shipping_pincode" => $deliveryAddress['pincode'],
    "shipping_country" => $deliveryAddress['country'],
    "shipping_state" => $deliveryAddress['state'],
    "order_items" => [
        [
            "name" => $product['name'],
            "sku" => $product['sku'],
            "units" => $product['units'],
            "selling_price" => $product['selling_price'],
            "discount" => $product['discount'],
            "tax" => $product['tax'],
            "hsn" => $product['hsn']
        ]
    ],
    "payment_method" => "Prepaid",
    "shipping_charges" => 0,
    "giftwrap_charges" => 0,
    "transaction_charges" => 0,
    "total_discount" => 0,
    "sub_total" => $product['selling_price'],
    "length" => 10, // Replace with actual length
    "breadth" => 10, // Replace with actual breadth
    "height" => 10, // Replace with actual height
    "weight" => 0.5 // Replace with actual weight
];

// Initialize cURL
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => $apiUrl,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => json_encode($requestData),
    CURLOPT_HTTPHEADER => array(
        "Content-Type: application/json",
        "Authorization: Bearer $token" // Replace with actual token
    ),
));

// Execute the request and get the response
$response = curl_exec($curl);
curl_close($curl);

// Decode the JSON response
$responseData = json_decode($response, true);

// Output the response (for debugging purposes)
echo '<pre>';
print_r($responseData);
echo '</pre>';

// Extract shipping charges
$shippingCharges = isset($responseData['rate']) ? $responseData['rate'] : 0;

// Use the shipping charges in your checkout process
echo "Shipping Charges: " . $shippingCharges;
?>
