import React, { useState, useEffect ,useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faLocation } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../Context/UserContext'; 
import { useNavigate } from 'react-router-dom';
function Checkout() {
    const [quantities, setQuantities] = useState([]);
    const [count, setCount] = useState(1);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [msg,setMsg] = useState(null);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const { user, isAuthenticated } = useContext(UserContext);
    const [addAddress, setAddAddress] = useState(false);
    const [paymentMode, setPaymentMode] = useState(null);
    const [shippingCharge, setShippingCharge] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [shipping, setShipping] = useState(0);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const navigate = useNavigate();

    const handleAddAddress = () => {
        setAddAddress(true);
    };
    useEffect(() => {
        if (user) {
            fetch(`http://localhost/waltzify_copy_fake/Backend/fetch_cart.php?userId=${user.Id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    setCartItems(data.cartItems);
                    setQuantities(data.cartItems.map(() => 1)); // Initialize quantities to 1
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Fetch error:', error); // Log error
                    setError(error);
                    setLoading(false);
                });
        }
    }, [user]);
    /* const calculateShippingCost = () => {
        const shipping = cod ? totalPrice * setShippingCharge : 0; // Adjust calculation as needed
        return shipping;
    }; */
    const [cod,setCod] = useState(true);
    const totalShippingCost = cod ? totalPrice + shipping : 0;
    
    //Adding Addresses
    const [fullname,setFullName]         = useState('');
    const [number,setNumber]             = useState('');
    const [pincode ,setPinCode]          = useState('');
    const [state,setState]               = useState('');
    const [addressOne,setAddressOne]     = useState('');
    const [addressTwo,setAddressTwo]     = useState('');
    const [addressThree,setAddressThree] = useState('');
    const [city,setCity]                 = useState('');
    const [landmark,setLandMark]         = useState('');
  
   
    const handleInput = (e, type) => {
        setError("");
        const value = e.target.value;
        switch (type) {
          case "fullname":
            setFullName(value);
            break;
          case "number":
            setNumber(value);
            break;
          case "pincode":
            setPinCode(value);
            break;
          case "state":
            setState(value);
            break;
          case "addressOne":
            setAddressOne(value);
            break;
          case "addressTwo":
            setAddressTwo(value);
            break;
          case "addressThree":
            setAddressThree(value);
            break;
          case "city":
            setCity(value);
            break;
          case "landmark":
            setLandMark(value);
            break;
          default:
            break;
        }
      };
    
      const handleSubmission = async (e) => {
        e.preventDefault();
        const phoneNumberPattern = /^[0-9]{10}$/;  // Regex for exactly 10 digits
    const pincodePattern = /^[0-9]{6}$/;       // Regex for exactly 6 digits

    if (!fullname || !number || !pincode || !state || !addressOne || !city) {
        setError("All fields are required!");
        return;
    }

    // Validate phone number
    if (!phoneNumberPattern.test(number)) {
        setError("Phone number must be exactly 10 digits.");
        return;
    }

    // Validate pincode
    if (!pincodePattern.test(pincode)) {
        setError("Pincode must be exactly 6 digits.");
        return;
    }
    
        if (fullname && number && pincode && state && addressOne  && city) {
              
          try {
            const formData = new FormData();
            formData.append("fullname", fullname);
            formData.append("number", number);
            formData.append("pincode", pincode);
            formData.append("state", state);
            formData.append("addressOne", addressOne);
            formData.append("city", city);
                        
            if(addressTwo)
            {
                formData.append("addressTwo", addressTwo);
            }
            if(addressThree)
            {
                formData.append("addressThree", addressThree);

            }
            if(landmark)
            {
                formData.append("landmark", landmark);

            }
            const response = await fetch(`http://localhost/waltzify_copy_fake/Backend/add_address.php?id=${user.Id}`, {
              method: "POST",
              body: formData
            });
    
            const data = await response.json();
            if (data[0].result === "Not Submitted, Please try again!") {
              setError(data[0].result);
            } else {
              setMsg(data[0].result);
              

              setTimeout(() => navigate('/checkout'), 200);
            }
          } catch (err) {
            if(err.message === "Cannot read properties of null (reading 'Id')")
                {
                 err.message = "You are not Loggined!";
                 setError(err.message);
                 setTimeout(() => navigate('/login'), 1000);
                }
          }
        } else {
          setError("All fields are required!");
        }
      };
     

      /* const handleQuantityChange = (index, value) => {
        // Convert the input value to a number and handle invalid inputs
        const newValue = parseInt(value, 10) || 1;
      
        // Retrieve the current item from the items array
        const currentItem = cartItems[index]; // Changed 'items' to 'cartItems'
      
        // Check if the new value exceeds the available stock
        if (newValue > currentItem.pQuantity) {
            // Show an alert or set an error message if the selected quantity exceeds stock
            if (currentItem.pQuantity > 0) {
                alert(`Only ${currentItem.pQuantity} quantity is available for ${currentItem.pname}`);
            } else {
                alert(`${currentItem.pname} is out of stock now.`);
            }
      
            // Set the quantity to the available stock
            setQuantities((prevQuantities) => {
                const newQuantities = [...prevQuantities];
                newQuantities[index] = currentItem.pQuantity;
                return newQuantities;
            });
        } else {
            // Update the quantity normally if it's within the stock limit
            setQuantities((prevQuantities) => {
                const newQuantities = [...prevQuantities];
                newQuantities[index] = newValue;
                return newQuantities;
            });
        }
    };
     */
    const handleQuantityChange = (index, value) => {
        // Convert the input value to a number and handle invalid inputs
        const newValue = parseInt(value, 10) || 1;
      
        // Retrieve the current item from the cartItems array
        const currentItem = cartItems[index];
      
        // If the product is out of stock, show an alert and prevent quantity change
        if (currentItem.pQuantity === 0) {
          alert(`${currentItem.pname} is out of stock now. You cannot purchase this item.`);
          
          // Set the quantity to 0 to reflect out-of-stock status
          setQuantities((prevQuantities) => {
            const newQuantities = [...prevQuantities];
            newQuantities[index] = 0;
            return newQuantities;
          });
          return; // Prevent further changes since the item is out of stock
        }
      
        // Check if the new value exceeds the available stock
        if (newValue > currentItem.pQuantity) {
          // Show an alert if the selected quantity exceeds stock
          alert(`Only ${currentItem.pQuantity} quantity is available for ${currentItem.pname}`);
          setQuantities((prevQuantities) => {
            const newQuantities = [...prevQuantities];
            newQuantities[index] = currentItem.pQuantity;
            return newQuantities;
          });
        } else {
          // Update the quantity normally if it's within the stock limit
          setQuantities((prevQuantities) => {
            const newQuantities = [...prevQuantities];
            newQuantities[index] = newValue;
            return newQuantities;
          });
        }
      };
      
      
    {/*For Handle Prepaid Order */}
   
    
    const handleOrder = async () => {
        if (!paymentMode && !selectedAddress) {
            setError('Please select a payment mode and Address.');
            return;
        }
        if (!paymentMode) {
            setError('Please select a payment mode.');
            return;
        }
        if (!selectedAddress) {
            setError('Please select an Address.');
            return;
        }
        if (paymentMode === 'Prepaid') {
            const orderId = generateOrderId(); // Generate the OrderId for prepaid orders
            const orderDetails = {
                OrderId: orderId,
                cartItems: cartItems.map((item, index) => ({
                    productId: item.Id,
                    productName: item.pname,
                    quantity: quantities[index],
                    productPrice :item.discount > 0 ? (item.p_price - (item.p_price * (item.discount / 100))) * quantities[index] :  (item.p_price * quantities[index]), // Calculate price with discount

                })),
                addressId: selectedAddress,
                price: totalPrice,
                customerName: user.name,
                phone: user.phone,
                userId: user.Id,
                paymode: paymentMode,
            };
        
            try {
                const addResponse = await fetch('http://localhost/waltzify_copy_fake/Backend/add_orders.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderDetails)
                });
                if (!addResponse.ok) {
                    throw new Error(`HTTP error! Status: ${addResponse.status}`);
                }
        
                let addResponseText = await addResponse.text();
        
                // Parse the cleaned response as JSON
                const addResponseData = JSON.parse(addResponseText);
        
                // Handle the parsed response
                if (Array.isArray(addResponseData) && addResponseData.length > 0 && addResponseData[0].success) {
                    /* alert('Order Placed Successfully!!'); */
                    window.location.href = `http://localhost/waltzify_copy_fake/Backend/CUSTOM_CHECKOUT_FORM_KIT/dataFrom.php?orderId=${orderId}`;
        
                    // Fetch the order status from ccavResponseHandler.php
                    const payResponse = await fetch('http://localhost/waltzify_copy_fake/Backend/CUSTOM_CHECKOUT_FORM_KIT/ccavResponseHandler.php', {
                        method: 'GET', 
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({}) // Send necessary data
                    });
        
                    const payData = await payResponse.json();
        
                    if (payData.payment_status === "Success") {
                    setConfirmationMessage('Your order is confirmed successfully! ✅');
                    setError('');
                    navigate('/myorders');
                    }
                } else {
                    console.error('Error in placing order:', addResponseData);
                    setError('Order placement failed. Please check the cart items and try again.');
                    setConfirmationMessage(''); // Clear any previous confirmation message
                }
            } catch (error) {
                console.error('Error in placing order:', error);
                setError('Order placement failed. Please try again.');
            }
                /* const addResponseText = await addResponse.text();
                const addResponseData = JSON.parse(addResponseText);
        
                if (addResponseData[0]?.success === "Order Added successfully!") {
                    window.location.href = `http://localhost/waltzify_copy_fake/Backend/CUSTOM_CHECKOUT_FORM_KIT/dataFrom.php?orderId=${orderId}`;
        
                    // Fetch the order status from ccavResponseHandler.php
                    const payResponse = await fetch('http://localhost/waltzify_copy_fake/Backend/CUSTOM_CHECKOUT_FORM_KIT/ccavResponseHandler.php', {
                        method: 'GET', 
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({}) // Send necessary data
                    });
        
                    const payData = await payResponse.json();
        
                    if (payData.payment_status === "Success") {
                        const placedOrderResponse = await fetch('http://localhost/waltzify_copy_fake/Backend/place_order.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ OrderId: orderDetails.OrderId })
                        });
        
                        // Read the placed order response as text
                        const placedOrderText = await placedOrderResponse.text();
        
                        // Extract JSON part from the response
                        let placedOrderData;
                        try {
                            // Try parsing the response directly
                            placedOrderData = JSON.parse(placedOrderText);
                        } catch (e) {
                            // If JSON parsing fails, extract JSON part manually
                            const jsonStringMatch = placedOrderText.match(/({.*})/);
                            if (jsonStringMatch) {
                                try {
                                    placedOrderData = JSON.parse(jsonStringMatch[1]);
                                } catch (parseError) {
                                    console.error('Error parsing JSON from mixed content:', parseError);
                                    alert('Received response is not valid JSON.');
                                    return;
                                }
                            } else {
                                console.error('No JSON data found in response.');
                                alert('Received response is not valid JSON.');
                                return;
                            }
                        }
        
                        // Check if the JSON response indicates success
                        if (placedOrderData.result === "Order successfully placed with Shiprocket!") {
                            alert('Order placed successfully!');
                            navigate('/myorders');
                        } else {
                            alert('Failed to place the order.');
                        }
                    } else {
                        alert('Payment failed. Order not placed.');
                    }
                } else {
                    alert('Failed to place order in add_orders.php.');
                }
            } catch (error) {
                console.error('Error placing order:', error);
                alert('An error occurred while placing the order.');
            } */
        } else {
            handleCODOrder();
        }
    };
        
    {/*Handle COD Order */}
  

    {/* const handleCODOrder = async () => {
        try {
            // Generate order details
            const orderDetails = {
                OrderId: generateOrderId(),
                cartItems: cartItems.map((item, index) => ({
                    productId: item.Id,
                    productName: item.pname,
                    quantity: quantities[index],
                    price: totalPrice
                })),
                addressId: selectedAddress,
                price: totalPrice + shipping,
                customerName: user.name,
                phone: user.phone,
                userId: user.Id,
                paymode: paymentMode,
            };
    
            // Add order to the database
            const addResponse = await fetch('http://localhost/waltzify_copy_fake/Backend/add_orders.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderDetails)
            });
    
            const addResponseText = await addResponse.text();
            const addResponseData = JSON.parse(addResponseText);
    
            // Check if order was added successfully
            if (addResponseData[0]?.result === "Order Added successfully!") {
                // Place the order with Shiprocket
                const placedOrderResponse = await fetch('http://localhost/waltzify_copy_fake/Backend/place_order.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ OrderId: orderDetails.OrderId })
                });
    
                // Read the placed order response as text
                const placedOrderText = await placedOrderResponse.text();
    
                // Extract JSON part from the response
                let placedOrderData;
                try {
                    // Attempt to parse the response directly
                    placedOrderData = JSON.parse(placedOrderText);
                } catch (e) {
                    // Handle the case where the response contains mixed content (e.g., JWT + JSON)
                    const jsonStringMatch = placedOrderText.match(/{[^}]*}/);
                    if (jsonStringMatch) {
                        try {
                            placedOrderData = JSON.parse(jsonStringMatch[0]);
                        } catch (parseError) {
                            console.error('Error parsing JSON from mixed content:', parseError);
                            alert('Received response is not valid JSON.');
                            return;
                        }
                    } else {
                        console.error('No JSON data found in response.');
                        alert('Received response is not valid JSON.');
                        return;
                    }
                }
    
                // Check if the JSON response indicates success
                if (placedOrderData.result === "Order successfully placed with Shiprocket!") {
                    alert('Order placed successfully!');
                    navigate('/myorders');
                } else {
                    alert('Failed to place the order.');
                }
            } else {
                alert('Failed to place order in add_orders.php.');
            }
    
        } catch (error) {
            console.error('There was an error!', error);
            setError('There was an error placing the order. Please try again later.');
        }
    }; */}
    const handleCODOrder = async () => {
        try {
            // Generate order details
            const orderDetails = {
                OrderId: generateOrderId(),
                cartItems: cartItems.map((item, index) => ({
                    productId: item.Id,
                    productName: item.pname,
                    quantity: quantities[index],
                    //productPrice: item.p_price,
                    
                    productPrice :item.discount > 0 ? (item.p_price - (item.p_price * (item.discount / 100))) * quantities[index] :  (item.p_price * quantities[index]), // Calculate price with discount
                })),
                addressId: selectedAddress,
                price: totalPrice + shipping,
                customerName: user.name,
                phone: user.phone,
                userId: user.Id,
                paymode: paymentMode,
            };
    
            // Add order to the database
            const addResponse = await fetch('http://localhost/waltzify_copy_fake/Backend/add_orders.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDetails),
            });
    
            // Check if the response is OK (status 200-299)
              // Check if the response is OK (status 200-299)
        if (!addResponse.ok) {
            throw new Error(`HTTP error! Status: ${addResponse.status}`);
        }

        let addResponseText = await addResponse.text();

        // Parse the cleaned response as JSON
        const addResponseData = JSON.parse(addResponseText);

        // Handle the parsed response
        if (Array.isArray(addResponseData) && addResponseData.length > 0 && addResponseData[0].success) {
            /* alert('Order Placed Successfully!!'); */
            setConfirmationMessage('Your order is confirmed successfully! ✅');
            const usermail = await fetch('http://localhost/waltzify_copy_fake/Backend/sendUserOrderConfirmation.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDetails),
            });
            
            setError('');
            navigate('/myorders');
        } else {
            console.error('Error in placing order:', addResponseData);
            setError('Order placement failed. Please check the cart items and try again.');
            setConfirmationMessage(''); // Clear any previous confirmation message
        }
    } catch (error) {
        console.error('Error in placing order:', error);
        setError('Order placement failed. Please try again.');
    }
    };
    useEffect(() => {
        // Set timeout to clear confirmation message after 5 seconds
        if (confirmationMessage) {
            const timer = setTimeout(() => {
                setConfirmationMessage('');
            }, 5000); // 5000 ms = 5 seconds

            // Clear timeout on component unmount or when confirmation message changes
            return () => clearTimeout(timer);
        }
    }, [confirmationMessage]);

    
    


       
    {/*Handle Address Change*/}
   
    {/*  const handleAddressChange = async (event) => {
        const selectedAddressId = event.target.value;
        setSelectedAddress(selectedAddressId);
    
        const selectedAdd = addresses.find(address => address.addressId === selectedAddressId);
    
        if (selectedAdd && cartItems.length > 0) {
            const delivery_postcode = selectedAdd.Pincode;
            let totalShippingCost = 0;
    
            // Prepare data to send to the backend
            const requestData = {
                products: cartItems.map(product => ({
                    delivery_postcode: delivery_postcode,
                    weight: parseFloat(product.weight),
                    length: parseFloat(product.length),
                    breadth: parseFloat(product.breadth),
                    height: parseFloat(product.height),
                    cod: 1, // Assuming COD is always true; adjust if needed
                    qc_check: parseInt(product.pQuantity, 10)
                }))
            };
    
    
            try {
                const response = await fetch('http://localhost/waltzify_copy_fake/Backend/shipping_rate_calculator.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });
    
                const text = await response.text();
    
                // Separate JWT and JSON response
                const jsonPart = text.substring(text.indexOf('['));
                let jsonObjects = [];
    
                try {
                    jsonObjects = JSON.parse(jsonPart); // Directly parse the JSON part
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                }
    
                if (Array.isArray(jsonObjects)) {
                    jsonObjects.forEach(item => {
                        if (item && Array.isArray(item.available_couriers)) {
                            let minFreightCharge = Infinity;
    
                            item.available_couriers.forEach(courier => {
                                if (courier.freight_charge < minFreightCharge) {
                                    minFreightCharge = courier.freight_charge;
                                }
                            });
    
                            totalShippingCost += minFreightCharge;
                        } else {
                            console.error('No valid courier data found in item:', item);
                        }
                    });
    
                    setShipping(totalShippingCost);
                } else {
                    console.error('Expected JSON array but got:', jsonObjects);
                }
            } catch (error) {
                console.error('Error fetching shipping charges:', error);
            }
        } else {
            console.error('Selected address or cart items are not defined or cart is empty.');
        }
    }; */}
    
    
   {/* const handleAddressChange = async (event) => {
        const selectedAddressId = event.target.value;
        setSelectedAddress(selectedAddressId);
    
        const selectedAdd = addresses.find(address => address.addressId === selectedAddressId);
    
        if (selectedAdd && cartItems.length > 0) {
            const delivery_postcode = selectedAdd.Pincode;
            let totalShippingCost = 0;
    
            // Prepare data to send to the backend
            const requestData = {
                products: cartItems.map((product, index) => ({
                    delivery_postcode: delivery_postcode,
                    weight: parseFloat(product.weight),
                    length: parseFloat(product.length),
                    breadth: parseFloat(product.breadth),
                    height: parseFloat(product.height),
                    cod: 1, // Assuming COD is always true; adjust if needed
                    qc_check: parseInt(quantities[index], 10) // Use the selected quantity
                }))
            };
    
    
            try {
                const response = await fetch('http://localhost/waltzify_copy_fake/Backend/shipping_rate_calculator.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });
    
                const text = await response.text();
    
                // Separate JWT and JSON response
                const jsonPart = text.substring(text.indexOf('['));
                let jsonObjects = [];
    
                try {
                    jsonObjects = JSON.parse(jsonPart); // Directly parse the JSON part
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                }
    
                if (Array.isArray(jsonObjects)) {
                    jsonObjects.forEach(item => {
                        if (item && Array.isArray(item.available_couriers)) {
                            let minFreightCharge = Infinity;
    
                            item.available_couriers.forEach(courier => {
                                if (courier.freight_charge < minFreightCharge) {
                                    minFreightCharge = courier.freight_charge;
                                }
                            });
    
                            totalShippingCost += minFreightCharge;
                        } else {
                            console.error('No valid courier data found in item:', item);
                        }
                    });
    
                    setShipping(totalShippingCost);
                } else {
                    console.error('Expected JSON array but got:', jsonObjects);
                }
            } catch (error) {
                console.error('Error fetching shipping charges:', error);
            }
        } else {
            console.error('Selected address or cart items are not defined or cart is empty.');
        }
    }; */}
    const handleAddressChange = async (event) => {
        const selectedAddressId = event.target.value;
        setSelectedAddress(selectedAddressId);
    
        const selectedAdd = addresses.find(address => address.addressId === selectedAddressId);
    
        if (selectedAdd && cartItems.length > 0) {
            const delivery_postcode = selectedAdd.Pincode;
            let totalShippingCost = 0;
    
            // Prepare data to send to the backend
            const requestData = {
                products: cartItems.map((product, index) => ({
                    delivery_postcode: delivery_postcode,
                    weight: parseFloat(product.weight),
                    length: parseFloat(product.length),
                    breadth: parseFloat(product.breadth),
                    height: parseFloat(product.height),
                    cod: 1, // Assuming COD is always true; adjust if needed
                    qc_check: parseInt(quantities[index], 10) // Use the selected quantity
                }))
            };
    
    
            try {
                const response = await fetch('http://localhost/waltzify_copy_fake/Backend/shipping_rate_calculator.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });
    
                const text = await response.text();
    
                // Separate JWT and JSON response
                const jsonPart = text.substring(text.indexOf('['));
                let jsonObjects = [];
    
                try {
                    jsonObjects = JSON.parse(jsonPart); // Directly parse the JSON part
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                }
    
                if (Array.isArray(jsonObjects)) {
                    let anyCourierAvailable = false;  // To check if any couriers are available
                    let minFreightCharge = Infinity;
    
                    jsonObjects.forEach(item => {
                        if (item && Array.isArray(item.available_couriers)) {
                            item.available_couriers.forEach(courier => {
                                anyCourierAvailable = true;  // Set flag to true if courier is found
                                if (courier.freight_charge < minFreightCharge) {
                                    minFreightCharge = courier.freight_charge;
                                }
                            });
    
                            // Calculate the total shipping cost
                            totalShippingCost += minFreightCharge;
                        } else {
                            console.error('No valid courier data found in item:', item);
                        }
                    });
    
                    // Check if no courier services are available
                    if (!anyCourierAvailable) {
                        alert('No courier service available for this address.');
                    } else if (totalShippingCost === 0) {
                        // Check if shipping cost is 0
                        alert('Shipping cost is 0, which means there is no valid courier service available.');
                    }
    
                    setShipping(totalShippingCost);
                } else {
                    console.error('Expected JSON array but got:', jsonObjects);
                }
            } catch (error) {
                console.error('Error fetching shipping charges:', error);
            }
        } else {
            console.error('Selected address or cart items are not defined or cart is empty.');
        }
    };
    
    
    
    
    
    
    
    const generateOrderId = () => {
        return 'ORD' + Math.floor(Math.random() * 1000000); // example implementation
    };

    const states = [
        'Andaman and Nicobar Islands',
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chandigarh',
        'Chhattisgarh',
        'Dadra and Nagar Haveli and Daman and Diu',
        'Delhi',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jharkhand',
        'Jammu & Kashmir',
        'Karnataka',
        'Kerala',
        'Ladakh',
        'Lakshadweep',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Puducherry',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttar Pradesh',
        'Uttarakhand',
        'West Bengal'
    ];
    
    const [addresses,setAddresses] = useState([]);
    useEffect(() => {
        if (user) {
            fetch(`http://localhost/waltzify_copy_fake/Backend/fetch_address.php?userId=${user.Id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    setAddresses(data.addresses);
                    //setLoading(false);
                })
                .catch(error => {
                    console.error('Fetch error:', error); // Log error
                    setError(error);
                    //setLoading(false);
                });
        }
    }, [user]);
       
    useEffect(() => {
        setQuantities(new Array(cartItems.length).fill(1));
      }, [cartItems]);
    
      useEffect(() => {
        const totalPrice = cartItems.reduce((acc, item, index) => {
          const discountedPrice = item.p_price - (item.p_price * (item.discount / 100));
          return acc + discountedPrice * quantities[index];
        }, 0);
        setTotalPrice(totalPrice);
      }, [cartItems, quantities]);
    return (
        <div>
            {/* item */}
            <div className='flex pt-[2rem] flex-col lg:flex-row'>
                {/* show products */}
                <div className='lg:w-2/3 pb-[1rem] px-[3rem]'>
                    {/* category */}
                    <p className='pb-[2rem] text-4xl font-bold'>Product Summary</p>
                    <div className='border-2 rounded-xl border-orange-500'>
                        <div className='pt-[2rem] justify-evenly hidden lg:flex gap-[12rem] font-bold  px-[9rem] items-center border-b-2 pb-[2rem]'>
                            <p>Product</p>
                           
                            <div className='flex justify-evenly items-center ml-[10rem]'>
                                <p>Price</p>
                                
                            </div>
                        </div>
                        {/* product list */}
                        <div className='flex flex-col lg:px-[3rem] justify-evenly'>
                            {cartItems.map((item, index) => {
                                // Calculate discounted price for each item
                                const discountedPrice = item.p_price - (item.p_price * (item.discount / 100));

                                return (
                                    <div key={index} className='py-[1rem] flex flex-col lg:flex-row justify-between border-b-2'>
                                    <div className='flex gap-[0.5rem] items-center'>
                                        <img className='w-[10rem] h-[8rem]' src={`http://localhost/waltzify_copy_fake/Backend/Products/${item.img1}`} alt={item.pname} />
                                        <div className='w-[30rem]'>
                                            
                                            <p className='font-bold text-sm'>{item.pname}</p>
                                           {/*  <p className='mt-2'>Quantity:<input
                                                type='number'
                                                min='1'
                                                className='text-center w-[3rem] lg:w-[5rem] border-2 border-black mx-2 outline-none rounded-xl'
                                                placeholder='1'
                                                value={quantities[index]}
                                                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                                            />
                                            
                                            </p> */}
                                            <p className='mt-2'>
                                                {item.pQuantity == 0 ? (
                                                    // Display "Out of stock" message if quantity is 0
                                                    <span className='text-red-500'>Out of stock now, you cannot buy it</span>
                                                ) : (
                                                    // Show the input field if product is in stock
                                                    <>
                                                    Quantity:
                                                    <input
                                                        type='number'
                                                        min='1'
                                                        className='text-center w-[3rem] lg:w-[5rem] border-2 border-black mx-2 outline-none rounded-xl'
                                                        placeholder='1'
                                                        value={quantities[index]}
                                                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                                                    />
                                                    </>
                                                )}
                                                </p>

                                        </div>
                                    </div>
                                    <div className='mt-[1rem] ml-[1rem] flex lg:justify-evenly justify-center gap-[2rem] lg:gap-[10rem] items-center lg:w-[40rem]' >
                                       <p className='w-[5rem] text-lg text-center font-bold'>₹{discountedPrice * quantities[index]}</p>
                                    </div>
                                </div>
                                    
                                    
                                );
                            })}
                        </div>
                    </div>
                </div>
                {/* total */}
                <div  className='lg:w-1/3 pb-[1rem] px-[2rem]'>
                    <p className='text-3xl font-bold'>Checkout</p>
                    <div className='text-orange-500 font-bold flex flex-col gap-[1rem] mt-[2rem] px-[2rem] py-[1rem] border-2 border-orange-500 rounded-xl'>
                        <div className='flex items-center justify-between border-b-2'>
                            <p className='pb-3'>Sub-total</p>
                            <p className='text-black'>₹{(totalPrice).toFixed(2)}</p>
                        </div>
                        <div className='flex items-center justify-between border-b-2'>
                            <p className='pb-3'>Delivery Charges</p>
                            {cod ? (
                                <div>
                                <p className='text-black'>₹{shipping.toFixed(2)}</p>
                                </div>
                            )
                            :(
                                
                                <div>
                                <p className='text-black'>Free</p>
                                </div>
                            )}
                        </div>
                        <div className='flex items-center justify-between'>
                            <p>Total</p>
                            <p className='text-black'>₹{(totalPrice + (cod ? shipping : 0)).toFixed(2)}</p>
                        </div>
                    </div>
                    <div className='py-[1rem]'>
                                                
                        <p className='text-xl font-bold'>Mode of Payment</p>
                        {error === 'Please select a payment mode.' || 'Please select a payment mode and Address.' && (
                            <p className='text-red-500'>{error}</p>
                        )}
                         {confirmationMessage && (
            <div className="bg-green-100 text-green-700 p-4 my-5 border border-green-200 rounded flex items-center text-base">
                {confirmationMessage}
            </div>
        )}
                        <div className='p-[1rem] flex items-center gap-[1rem]'>
                            <input  onClick={() => { setCod(true); setPaymentMode('COD'); }} type="radio" value="COD" name='mode of payment' />
                            <p className='font-semibold'>Cash on Delivery</p>
                        </div>
                        <div className='px-[1rem] flex items-center gap-[1rem]'>
                            <input  onClick={() => { setCod(false); setPaymentMode('Prepaid'); }} type="radio" value="prepaid" name='mode of payment' />
                            <p className='font-semibold'>Prepaid Order</p>
                        </div>
                         
                    </div>
                    <div className='py-[2rem] lg:flex-row flex-col flex items-center gap-[2rem]'>
                        <button className='rounded-xl text-lg bg-orange-500 text-white px-[3rem] py-2' onClick={handleOrder}>Place Order</button>
                        <button className='text-orange-500 px-[3rem] text-lg'>Cancel</button>
                    </div>
                </div>
            </div>
            {/* address */}
            <div>
                <div className='mx-[2rem] mt-[2rem]'>
                    <h1 className='text-4xl font-semibold'>Select Address</h1>
                                <p>
                                {/*  {msg ? <span className="success">{msg}</span> : <span className="error">{error === 'Please select an Address.' || 'Please select a payment mode And Address.'}</span>} */}
                                {msg ? <span className="success">{msg}</span> : 
        error ? <span className="error">{error}</span> : null}
                                </p>
                    <div>
                        {addAddress ? (
                            <div className='my-[2rem] p-[2rem] border-2 border-orange-500 rounded-lg'>
                               
                                <p className='text-2xl mb-[2rem]'>Add new Address</p>
                                <div className='flex items-center gap-[1rem] text-lg bg-orange-500 text-white lg:w-[20rem] px-4 py-2'>
                                    <FontAwesomeIcon icon={faLocation}/>
                                    <button>Add Your Address</button>
                                </div>
                                <form onSubmit={handleSubmission} className='mt-[2rem] flex flex-col gap-[1.5rem]'>
                                    <div className='flex flex-col lg:flex-row gap-[2rem]'>
                                        <input required className='border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem]' type="text" placeholder='Full Name'   value={fullname}
                                        onChange={(e) => handleInput(e, 'fullname')} />
                                        <input required className='border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem]' type="text" placeholder='10-digit mobile number'  value={number} onChange={(e) => handleInput(e, 'number')}/>
                                    </div>
                                    <div className='flex flex-col lg:flex-row gap-[2rem]'>
                                    <input required className='border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem]' value={city} onChange={(e) => handleInput(e, 'city')} type="text" placeholder='city'/>
                                        
                                        <select
                                        className='rounded-xl p-1 focus:outline-none border-2'
                                        value={state}
                                        onChange={(e) => handleInput(e, 'state')}
                                        >
                                        <option value="">Select State</option>
                                        {states.map((cat, index) => (
                                            <option key={index} value={cat}>{cat}</option>
                                        ))}
                                        </select>
                                    </div>
                                    <div className='flex flex-col gap-[1rem]'>
                                        <input required className='border-2 outline-none p-2 rounded-lg w-[12rem]  lg:w-[35rem]' type="text" name="address line 1" value={addressOne} onChange={(e) => handleInput(e, 'addressOne')} id="address" placeholder='Address Line 1'/>
                                        <input className='border-2 outline-none p-2 rounded-lg w-[12rem]  w-[12rem] lg:w-[35rem]' type="text" name="address line 2" value={addressTwo} onChange={(e) => handleInput(e, 'addressTwo')} id="address" placeholder='Address Line 2'/>
                                        <input className='border-2 outline-none p-2 rounded-lg w-[12rem]  w-[12rem] lg:w-[35rem]' type="text" name="address line 3" value={addressThree} onChange={(e) => handleInput(e, 'addressThree')} id="address" placeholder='Address Line 3'/>
                                        <div className='flex flex-col lg:flex-row gap-[2rem]'>
                                        <input required className='border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem]' value={pincode} onChange={(e) => handleInput(e, 'pincode')} type="text" placeholder='Pincode'/>
                                            
                                            <input className='border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem]'  value={landmark} onChange={(e) => handleInput(e, 'landmark')} type="text" placeholder='Landmark'/>
                                        </div>
                                    </div>
                                   
                                    <div className='lg:flex-row flex-col flex items-center gap-[2rem]'>
                                        <button type='submit' className='text-lg bg-orange-500 text-white px-[3rem] py-2'>Save</button>
                                        <button onClick={()=>setAddAddress(false)} className='text-orange-500 px-[3rem] text-lg'>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        ):(
                            <div className='text-orange-500 font-bold mt-[1rem] text-lg p-[1rem] border-2 flex items-center gap-[2rem]'>
                                <FontAwesomeIcon icon={faAdd}/>
                                <button onClick={handleAddAddress} className='w-full text-start'>Add New Address</button>
                            </div>
                        )}
                    </div>
                    {/* list of address */}
                    {addresses.map((address, index) => (
                <div key={index} className='border-b-2 p-4 flex gap-4'>
                    <input
                    type="radio"
                    value={address.addressId}
                    name='address'
                    checked={selectedAddress === address.addressId}
                    onChange={handleAddressChange}
                    />
               <div>
                     <div className='font-bold flex items-center gap-[0.5rem]'onClick={() => setSelectedAddress(address.addressId)}>
                                <p>{address.FullName},</p>
                                <p>{address.Number}</p>
                            </div> 
                            <p className='font-bold'>{address.Address1}</p>
                       </div>
                    
                        </div>
            ))}
                
                </div>
            </div>
        </div>
    );
}

export default Checkout;
