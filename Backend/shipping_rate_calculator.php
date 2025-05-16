<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include('token.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['products']) || !is_array($data['products'])) {
        echo json_encode(["error" => "Products data is missing or invalid."]);
        exit;
    }

    $pickup_postcode = "452013";
    $responses = [];

    foreach ($data['products'] as $product) {
        if (!isset($product['delivery_postcode'], $product['weight'], $product['length'], $product['breadth'], $product['height'], $product['cod'], $product['qc_check'])) {
            $responses[] = ["error" => "Required fields are missing for a product."];
            continue;
        }

        $delivery_postcode = $product['delivery_postcode'];
        $cod = $product['cod'];
        $weight = $product['weight'];
        $length = $product['length'];
        $breadth = $product['breadth'];
        $height = $product['height'];
        $qc_check = $product['qc_check'];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://apiv2.shiprocket.in/v1/external/courier/serviceability/");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_ENCODING, "");
        curl_setopt($ch, CURLOPT_MAXREDIRS, 10);   
        curl_setopt($ch, CURLOPT_TIMEOUT, 0);    
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);    
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            "Content-Type: application/json",
            "Authorization: Bearer " . $token
        ));
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
            "pickup_postcode" => $pickup_postcode,
            "delivery_postcode" => $delivery_postcode,
            "cod" => $cod,
            "weight" => $weight,
            "length" => $length,
            "breadth" => $breadth,
            "height" => $height,
            "qc_check" => $qc_check
        ]));

        $response = curl_exec($ch);

        if (curl_errno($ch)) {
            $responses[] = ['error' => 'cURL error: ' . curl_error($ch)];
        } else {
            $responseData = json_decode($response, true);

            if (json_last_error() === JSON_ERROR_NONE) {
                if (isset($responseData['status']) && $responseData['status'] == 200) {
                    $available_couriers = $responseData['data']['available_courier_companies'];
                    $couriersList = [];
                    $freightCharge = null;

                    foreach ($available_couriers as $courier) {
                        $couriersList[] = [
                            "courier_name" => $courier['courier_name'],
                            "freight_charge" => $courier['freight_charge']
                        ];

                        if ($freightCharge === null || $courier['freight_charge'] < $freightCharge) {
                            $freightCharge = $courier['freight_charge'];
                        }
                    }
                    
                    $responses[] = [
                        "product" => $product,
                        "freight_charge" => $freightCharge,
                        "available_couriers" => $couriersList
                    ];
                } else {
                    $responses[] = [
                        "product" => $product,
                        "error" => "Failed to fetch delivery charges.",
                        "details" => $responseData
                    ];
                }
            } else {
                $responses[] = [
                    "product" => $product,
                    "error" => 'Invalid JSON response from Shiprocket.',
                    'raw_response' => $response
                ];
            }
        }

        curl_close($ch);
    }

    echo json_encode($responses);
} else {
    echo json_encode(["error" => "Invalid request method."]);
}
?>



<?php
/* error_reporting(E_ALL);
ini_set('display_errors', 1);
include('token.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['products']) || !is_array($data['products'])) {
        echo json_encode(["error" => "Products data is missing or invalid."]);
        exit;
    }

    $pickup_postcode = "452013";
    $responses = [];

    foreach ($data['products'] as $product) {
        if (!isset($product['delivery_postcode'], $product['weight'], $product['length'], $product['breadth'], $product['height'], $product['cod'], $product['qc_check'])) {
            $responses[] = ["error" => "Required fields are missing for a product."];
            continue;
        }

        $delivery_postcode = $product['delivery_postcode'];
        $cod = $product['cod'];
        $weight = $product['weight'];
        $length = $product['length'];
        $breadth = $product['breadth'];
        $height = $product['height'];
        $qc_check = $product['qc_check'];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://apiv2.shiprocket.in/v1/external/courier/serviceability/");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_ENCODING, "");
        curl_setopt($ch, CURLOPT_MAXREDIRS, 10);   
        curl_setopt($ch, CURLOPT_TIMEOUT, 0);    
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);    
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            "Content-Type: application/json",
            "Authorization: Bearer " . $token
        ));
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
            "pickup_postcode" => $pickup_postcode,
            "delivery_postcode" => $delivery_postcode,
            "cod" => $cod,
            "weight" => $weight,
            "length" => $length,
            "breadth" => $breadth,
            "height" => $height,
            "qc_check" => $qc_check
        ]));

        $response = curl_exec($ch);

        if (curl_errno($ch)) {
            $responses[] = ['error' => 'cURL error: ' . curl_error($ch)];
        } else {
            // Decode JSON response
            $responseData = json_decode($response, true);

            if (json_last_error() === JSON_ERROR_NONE) {
                if (isset($responseData['status']) && $responseData['status'] == 200) {
                    $available_couriers = $responseData['data']['available_courier_companies'];
                    $freightCharge = 0;

                    foreach ($available_couriers as $courier) {
                        // Use the freight charge from the first available courier
                        //$courier  =  $courier['courier_name'] . "\n";
                        $freightCharge = $courier['freight_charge'];
                        //break;  // Break after getting the first available courier's charge
                    }

                    $responses[] = [
                        "product" => $product,
                       // "courier" => $courier,
                        "freight_charge" => $freightCharge
                    ];
                } else {
                    $responses[] = [
                        "product" => $product,
                        "error" => "Failed to fetch delivery charges.",
                        "details" => $responseData
                    ];
                }
            } else {
                $responses[] = [
                    "product" => $product,
                    "error" => 'Invalid JSON response from Shiprocket.',
                    'raw_response' => $response
                ];
            }
        }

        curl_close($ch);
    }

    echo json_encode($responses);
} else {
    echo json_encode(["error" => "Invalid request method."]);
}  */
?>






<?php
/* error_reporting(E_ALL);
ini_set('display_errors', 1);
include('token.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['delivery_postcode'], $data['weight'], $data['length'], $data['breadth'], $data['height'])) {
        echo json_encode(["error" => "Required fields are missing."]);
        exit;
    }

    $pickup_postcode = "452009";
    $delivery_postcode = $data['delivery_postcode'];
    $cod = $data['cod'];
    $weight = $data['weight'];
    $length = $data['length'];
    $breadth = $data['breadth'];
    $height = $data['height'];
    $qc_check = $data['qc_check'];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://apiv2.shiprocket.in/v1/external/courier/serviceability/");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        "Content-Type: application/json",
        "Authorization: Bearer " . $token
    ));
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
        "pickup_postcode" => $pickup_postcode,
        "delivery_postcode" => $delivery_postcode,
        "cod" => $cod,
        "weight" => $weight,
        "length" => $length,
        "breadth" => $breadth,
        "height" => $height,
        "qc_check" => $qc_check
    ]));

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        echo json_encode(['error' => 'cURL error: ' . curl_error($ch)]);
    } else {
        // Extract only the JSON part
        $json_start = strpos($response, '{');
        $json_end = strrpos($response, '}');
        if ($json_start !== false && $json_end !== false) {
            $json_response = substr($response, $json_start, $json_end - $json_start + 1);
            $responseData = json_decode($json_response, true);

            if (json_last_error() === JSON_ERROR_NONE) {
                if (isset($responseData['status']) && $responseData['status'] == 200) {
                    $available_couriers = $responseData['data']['available_courier_companies'];
                    $courierCharges = [];

                    foreach ($available_couriers as $courier) {
                        $courierCharges[] = [
                            "courier_name" => $courier['courier_name'],
                            "freight_charge" => $courier['freight_charge']
                        ];
                        break;  // Use only the first available courier
                    }

                    echo json_encode(["available_couriers" => $courierCharges]);
                } else {
                    echo json_encode(["error" => "Failed to fetch delivery charges.", "details" => $responseData]);
                }
            } else {
                echo json_encode(['error' => 'Invalid JSON response from Shiprocket.', 'raw_response' => $json_response]);
            }
        } else {
            echo json_encode(['error' => 'No valid JSON data found in response.', 'raw_response' => $response]);
        }
    }

    curl_close($ch);
} else {
    echo json_encode(["error" => "Invalid request method."]);
}
 */
?>




<?php
// Token from the previous step
/* $token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQ5MDI0ODAsInNvdXJjZSI6InNyLWF1dGgtaW50IiwiZXhwIjoxNzI2MjIxOTcwLCJqdGkiOiJmVVB6bWx4WmZVdzlVcDhLIiwiaWF0IjoxNzI1MzU3OTcwLCJpc3MiOiJodHRwczovL3NyLWF1dGguc2hpcHJvY2tldC5pbi9hdXRob3JpemUvdXNlciIsIm5iZiI6MTcyNTM1Nzk3MCwiY2lkIjo1NTk2MjUsInRjIjozNjAsInZlcmJvc2UiOmZhbHNlLCJ2ZW5kb3JfaWQiOjAsInZlbmRvcl9jb2RlIjoid29vY29tbWVyY2UifQ.foTFSvkHguItK0tXjJztW9w7HT3mFiaSh4YjtK3Vzog";  // replace this with the token you generated

// Shipping rate calculation details
$pickup_postcode = "452013";    // Pickup location pin code
$delivery_postcode = "453661";  // Delivery location pin code
$cod = 1;                       // 0 for Prepaid, 1 for COD
$weight = 0.5;                    // Weight in kg
$length = 15;                   // Length in cm
$breadth = 15;                  // Breadth in cm
$height = 15;                  // Height in cm
$qc_check = 1;

// cURL request to fetch shipping rates
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://apiv2.shiprocket.in/v1/external/courier/serviceability/");
// curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

curl_setopt($ch, CURLOPT_ENCODING, "");
curl_setopt($ch, CURLOPT_MAXREDIRS, 10);   
curl_setopt($ch, CURLOPT_TIMEOUT, 0);    
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);    
curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);

curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Content-Type: application/json",
    "Authorization: Bearer " . $token
));
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array(
    "pickup_postcode" => $pickup_postcode,
    "delivery_postcode" => $delivery_postcode,
    "cod" => $cod,
    "weight" => $weight,
    "length" => $length,
    "breadth" => $breadth,
    "height" => $height,
    "qc_check" => $qc_check
)));

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'cURL error: ' . curl_error($ch);
} else {
    echo "Raw Response: " . $response;
}

curl_close($ch);

$responseData = json_decode($response, true);

if (isset($responseData['status']) && $responseData['status'] == 200) {
    $available_couriers = $responseData['data']['available_courier_companies'];
    
    foreach ($available_couriers as $courier) {
        echo "Courier: " . $courier['courier_name'] . "\n";
        echo "Freight Charge: " . $courier['freight_charge'] . "\n\n";
    }
} else {
    echo "Failed to fetch delivery charges.";
    // echo json_encode($responseData);
} */
?>
