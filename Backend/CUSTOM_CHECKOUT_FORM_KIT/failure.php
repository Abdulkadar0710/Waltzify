<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Failed</title>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <!-- Icons -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Roboto', sans-serif;
            background: linear-gradient(to bottom, #ff4b4b, #ffffff);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            color: #333;
        }

        .success-container {
            text-align: center;
            background: #ffffff;
            border-radius: 15px;
            padding: 40px 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            animation: fadeIn 1s ease-in-out;
            max-width: 400px;
            width: 90%;
        }

        .success-container .icon {
            font-size: 80px;
            color: #ff4b4b;
            margin-bottom: 20px;
            animation: shake 0.5s ease-in-out infinite;
        }

        .success-container h1 {
            font-size: 28px;
            margin-bottom: 10px;
            color: #333;
        }

        .success-container p {
            font-size: 16px;
            color: #555;
            margin-bottom: 20px;
        }

        .success-container .button {
            text-decoration: none;
            padding: 12px 25px;
            background: #ff4b4b;
            color: #ffffff;
            font-size: 16px;
            border-radius: 25px;
            transition: all 0.3s ease;
            display: inline-block;
        }

        .success-container .button:hover {
            background: #e63939;
            transform: scale(1.05);
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        
    </style>
</head>
<body>
    <div class="success-container">
        <div class="icon">
            <i class="fas fa-times-circle"></i>
        </div>
        <h1>Payment Failed!</h1>
        <p>Unfortunately, your payment was unsuccessful. Please check your payment details or try again later.</p>
        <a href="https://waltzify.com" class="button">Go to Home</a>
    </div>
</body>
</html>
