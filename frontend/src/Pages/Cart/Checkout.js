import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faAdd, faLocation } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../Context/UserContext";
import { useNavigate, Link } from "react-router-dom";
function Checkout() {
  const [quantities, setQuantities] = useState([]);
  const [count, setCount] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const { user, isAuthenticated } = useContext(UserContext);
  const [addAddress, setAddAddress] = useState(false);
  const [paymentMode, setPaymentMode] = useState(null);
  const [shippingCharge, setShippingCharge] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [shipping, setShipping] = useState(0);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const handleAddAddress = () => {
    setAddAddress(true);
  };
  useEffect(() => {
    if (user) {
      fetch(
        `http://localhost/waltzify_copy_fake/Backend/fetch_cart.php?userId=${user.Id}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Network response was not ok ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          setCartItems(data.cartItems);
          setQuantities(data.cartItems.map(() => 1)); // Initialize quantities to 1
          setLoading(false);
        })
        .catch((error) => {
          console.error("Fetch error:", error); // Log error
          setError(error);
          setLoading(false);
        });
    }
  }, [user]);
  /* const calculateShippingCost = () => {
        const shipping = cod ? totalPrice * setShippingCharge : 0; // Adjust calculation as needed
        return shipping;
    }; */
  let totalShippingCost = 0;
  const [cod, setCod] = useState(true);
  //const totalShippingCost = cod ? totalPrice + shipping : 0;

  //Adding Addresses
  const [fullname, setFullName] = useState("");
  const [number, setNumber] = useState("");
  const [pincode, setPinCode] = useState("");
  const [state, setState] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [addressThree, setAddressThree] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandMark] = useState("");
  const [GSTIN, setGSTIN] = useState("");

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
      case "GSTIN":
        setGSTIN(value);
        break;
      default:
        break;
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();

    const phoneNumberPattern = /^[0-9]{10}$/; // Regex for exactly 10 digits
    const pincodePattern = /^[0-9]{6}$/; // Regex for exactly 6 digits

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

    try {
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("number", number);
      formData.append("pincode", pincode);
      formData.append("state", state);
      formData.append("addressOne", addressOne);
      formData.append("city", city);

      if (addressTwo) formData.append("addressTwo", addressTwo);
      if (addressThree) formData.append("addressThree", addressThree);
      if (landmark) formData.append("landmark", landmark);
      if (GSTIN) formData.append("GSTIN", GSTIN);

      const response = await fetch(
        `http://localhost/waltzify_copy_fake/Backend/add_address.php?id=${user.Id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data[0].result === "Not Submitted, Please try again!") {
        setError(data[0].result);
      } else {
        setMsg(data[0].result);
        // Clear all input fields after successful submission
        setFullName("");
        setNumber("");
        setPinCode("");
        setState("");
        setAddressOne("");
        setCity("");
        setAddressTwo("");
        setAddressThree("");
        setLandMark("");
        setGSTIN("");
        /*  const newAddress = {
                    FullName: fullname,
                    Number: number,
                    Pincode: pincode,
                    State: state,
                    Address1: addressOne,
                    Address2: addressTwo || '',  // Handle optional fields
                    Address3: addressThree || '',
                    Landmark: landmark || '',
                    addressId: data[0].addressId, // Assuming the addressId is returned by the server
                    City: city,
                };
    
                // Insert the new address at the beginning and limit the array to 3 addresses
                setAddresses((prevAddresses) => {
                    const updatedAddresses = [newAddress, ...prevAddresses].slice(0, 3);
                    return updatedAddresses;
                });
                setSelectedAddress(data[0].addressId);
 */

        // Navigate to checkout after a short delay
        setTimeout(() => navigate("/checkout"), 2000);
      }
    } catch (err) {
      if (err.message === "Cannot read properties of null (reading 'Id')") {
        setError("You are not logged in!");
        setTimeout(() => navigate("/login"), 1000);
      }
    }
  };

  /*   const handleQuantityChange = (index, value) => {
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
      }; */
  /* const handleQuantityChange = (index, value) => {
        // Convert the input value to a number, ensuring it's at least 1
        const newValue = Math.max(1, parseInt(value, 10) || 1);
    
        const currentItem = cartItems[index];
        
        // If the product is out of stock, set quantity to 0
        if (currentItem.pQuantity === 0) {
          alert(`${currentItem.pname} is out of stock now. You cannot buy it.`);
          setQuantities((prevQuantities) => {
            const newQuantities = [...prevQuantities];
            newQuantities[index] = 0;
            return newQuantities;
          });
          return;
        }
    
        // Ensure new quantity does not exceed stock
        if (newValue > currentItem.pQuantity) {
          alert(`Only ${currentItem.pQuantity} quantity is available for ${currentItem.pname}`);
          setQuantities((prevQuantities) => {
            const newQuantities = [...prevQuantities];
            newQuantities[index] = currentItem.pQuantity;
            return newQuantities;
          });
        } else {
          // Update quantity normally
          setQuantities((prevQuantities) => {
            const newQuantities = [...prevQuantities];
            newQuantities[index] = newValue;
            return newQuantities;
          });
        }
      }; */
  const handleQuantityChange = (index, value) => {
    // Allow the value to be empty while typing
    if (value === "") {
      setQuantities((prevQuantities) => {
        const newQuantities = [...prevQuantities];
        newQuantities[index] = ""; // Temporarily set to an empty string
        return newQuantities;
      });
      return;
    }

    // Convert input to a number and validate
    let newValue = parseInt(value, 10);

    if (!isNaN(newValue)) {
      const currentItem = cartItems[index];

      // Ensure new quantity does not exceed stock
      if (newValue > currentItem.pQuantity) {
        alert(
          `Only ${currentItem.pQuantity} quantity is available for ${currentItem.pname}`
        );
        newValue = currentItem.pQuantity;
      }

      setQuantities((prevQuantities) => {
        const newQuantities = [...prevQuantities];
        newQuantities[index] = newValue;
        return newQuantities;
      });
    }
  };

  // Handle validation on blur (when the input loses focus)
  const handleQuantityBlur = (index) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      if (newQuantities[index] === "" || newQuantities[index] < 1) {
        newQuantities[index] = 1; // Set to minimum quantity if empty or less than 1
      }
      return newQuantities;
    });
  };

  const handleIncrement = (index) => {
    handleQuantityChange(index, quantities[index] + 1);
  };

  const handleDecrement = (index) => {
    const newValue = quantities[index] - 1;

    // Prevent quantity from going below 0
    if (newValue >= 0) {
      handleQuantityChange(index, newValue);
    }
  };

  {
    /*For Handle Prepaid Order */
  }

  const handleOrder = async () => {
    if (!paymentMode && !selectedAddress) {
      setError("Please select a payment mode and Address.");
      return;
    }
    if (!paymentMode) {
      setError("Please select a payment mode.");
      return;
    }
    if (!selectedAddress) {
      setError("Please select an Address.");
      return;
    }
    setIsButtonDisabled(true);
    if (paymentMode === "Prepaid") {
      const orderId = generateOrderId(); // Generate the OrderId for prepaid orders
      const orderDetails = {
        OrderId: orderId,
        cartItems: cartItems.map((item, index) => ({
          productId: item.Id,
          productName: item.pname,
          SKU: item.SKU,
          quantity: quantities[index],
          productPrice:
            item.discount > 0
              ? (item.p_price - item.p_price * (item.discount / 100)) *
                quantities[index] *
                (1 + item.igstn / 100)
              : item.p_price * quantities[index] * (1 + item.igstn / 100), // Calculate price with discount
        })),
        addressId: selectedAddress,
        price: totalPrice + deliveryCharges,
        deliveryCharges: deliveryCharges,
        customerName: user.name,
        phone: user.phone,
        userId: user.Id,
        paymode: paymentMode,
      };

      try {
        const addResponse = await fetch(
          "http://localhost/waltzify_copy_fake/Backend/add_orders.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderDetails),
          }
        );
        if (!addResponse.ok) {
          throw new Error(`HTTP error! Status: ${addResponse.status}`);
        }

        let addResponseText = await addResponse.text();

        // Parse the cleaned response as JSON
        const addResponseData = JSON.parse(addResponseText);

        // Handle the parsed response
        if (
          Array.isArray(addResponseData) &&
          addResponseData.length > 0 &&
          addResponseData[0].success
        ) {
          /* alert('Order Placed Successfully!!'); */
          window.location.href = `http://localhost/waltzify_copy_fake/Backend/CUSTOM_CHECKOUT_FORM_KIT/dataFrom.php?orderId=${orderId}`;

          // Fetch the order status from ccavResponseHandler.php
          const payResponse = await fetch(
            "http://localhost/waltzify_copy_fake/Backend/CUSTOM_CHECKOUT_FORM_KIT/ccavResponseHandler.php",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({}), // Send necessary data
            }
          );

          const payData = await payResponse.json();

          if (payData.payment_status === "Success") {
            setConfirmationMessage("Your order is confirmed successfully! ✅");
            setError("");
            navigate("/myorders");
          }
        } else {
          console.error("Error in placing order:", addResponseData);
          setError(
            "Order placement failed. Please check the cart items and try again."
          );
          setConfirmationMessage(""); // Clear any previous confirmation message
        }
      } catch (error) {
        console.error("Error in placing order:", error);
        setError("Order placement failed. Please try again.");
      } finally {
        // Re-enable the button after processing
        setIsButtonDisabled(false);
      }
    } else {
      handleCODOrder();
      setIsButtonDisabled(false);
    }
  };

  {
    /*Handle COD Order */
  }

  useEffect(() => {
    // Set timeout to clear confirmation message after 5 seconds
    if (confirmationMessage) {
      const timer = setTimeout(() => {
        setConfirmationMessage("");
      }, 5000); // 5000 ms = 5 seconds

      // Clear timeout on component unmount or when confirmation message changes
      return () => clearTimeout(timer);
    }
  }, [confirmationMessage]);

  const handleDeleteAddress = (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      fetch(
        `http://localhost/waltzify_copy_fake/Backend/delete_address.php?Id=${addressId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Remove the address from the state after successful deletion
            setAddresses(
              addresses.filter((address) => address.addressId !== addressId)
            );
          } else {
            console.error("Error deleting address:", data.error);
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const handleAddressChange = async (event) => {
    const selectedAddressId = event.target.value;
    setSelectedAddress(selectedAddressId);

    const selectedAdd = addresses.find(
      (address) => address.addressId === selectedAddressId
    );

    if (selectedAdd && cartItems.length > 0) {
      const delivery_postcode = selectedAdd.Pincode;

      // Prepare data to send to the backend
      const requestData = {
        products: cartItems.map((product, index) => ({
          delivery_postcode: delivery_postcode,
          weight: parseFloat(product.weight),
          length: parseFloat(product.length),
          breadth: parseFloat(product.breadth),
          height: parseFloat(product.height),
          cod: 1, // Assuming COD is always true; adjust if needed
          qc_check: parseInt(quantities[index], 10), // Use the selected quantity
        })),
      };

      try {
        const response = await fetch(
          "http://localhost/waltzify_copy_fake/Backend/shipping_rate_calculator.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          }
        );

        const text = await response.text();

        // Separate JWT and JSON response
        const jsonPart = text.substring(text.indexOf("["));
        let jsonObjects = [];

        try {
          jsonObjects = JSON.parse(jsonPart); // Directly parse the JSON part
        } catch (e) {
          console.error("Error parsing JSON:", e);
        }

        if (Array.isArray(jsonObjects)) {
          let anyCourierAvailable = false; // To check if any couriers are available
          let minFreightCharge = Infinity;

          jsonObjects.forEach((item) => {
            if (item && Array.isArray(item.available_couriers)) {
              item.available_couriers.forEach((courier) => {
                anyCourierAvailable = true; // Set flag to true if courier is found
                if (courier.freight_charge < minFreightCharge) {
                  minFreightCharge = courier.freight_charge;
                }
              });

              // Calculate the total shipping cost

              totalShippingCost += minFreightCharge * 1.15;
            } else {
              console.error("No valid courier data found in item:", item);
            }
          });

          // Check if no courier services are available
          if (!anyCourierAvailable) {
            alert("No courier service available for this address.");
          } else if (totalShippingCost === 0) {
            // Check if shipping cost is 0
            alert(
              "Shipping cost is 0, which means there is no valid courier service available."
            );
          }

          setShipping(totalShippingCost);
        } else {
          console.error("Expected JSON array but got:", jsonObjects);
        }
      } catch (error) {
        console.error("Error fetching shipping charges:", error);
      }
    } else {
      console.error(
        "Selected address or cart items are not defined or cart is empty."
      );
    }
  };

  const generateOrderId = () => {
    return "ORD" + Math.floor(Math.random() * 1000000); // example implementation
  };

  const states = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Jammu & Kashmir",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    if (user) {
      fetch(
        `http://localhost/waltzify_copy_fake/Backend/fetch_address.php?userId=${user.Id}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Network response was not ok ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          setAddresses(data.addresses);
          //setLoading(false);
        })
        .catch((error) => {
          console.error("Fetch error:", error); // Log error
          setError(error);
          //setLoading(false);
        });
    }
  }, [user]);
  const handleRemoveCart = (item) => {
    fetch(`http://localhost/waltzify_copy_fake/Backend/remove_cart.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.Id, productId: item.Id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCartItems((prevItems) =>
            prevItems.filter((cartItem) => cartItem.Id !== item.Id)
          );
        } else {
          console.error(data.error);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    setQuantities(new Array(cartItems.length).fill(1));
  }, [cartItems]);

  useEffect(() => {
    const totalPrice = cartItems.reduce((acc, item, index) => {
      const discountedPrice =
        item.p_price - item.p_price * (item.discount / 100);
      return acc + discountedPrice * quantities[index];
      /* return acc + discountedPrice * quantities[index] * (1 + item.igstn / 100); */
    }, 0);
    setTotalPrice(totalPrice);
  }, [cartItems, quantities]);

  useEffect(() => {
    const totalDeliveryCharges = cartItems.reduce((acc, item, index) => {
      return acc + quantities[index] * shipping; // Calculate the total delivery charges
    }, 0);
    setDeliveryCharges(totalDeliveryCharges); // Set the calculated delivery charges
  }, [cartItems, quantities, shipping]); // Also include 'shipping' in dependencies

  const handleCODOrder = async () => {
    try {
      if (cartItems.length === 0) {
        setError("Your cart is empty! Please add items to your cart.");
        setIsButtonDisabled(false); // Ensure the button is not disabled indefinitely
        return; // Stop further execution if the cart is empty
      }

      // if (deliveryCharges === 0) {
      //     setError('Delivery charges cannot be zero. Please update your delivery charges.');
      //     setIsButtonDisabled(false); // Ensure the button is not disabled indefinitely
      //     return; // Stop further execution if delivery charges are zero
      // }

      setIsButtonDisabled(true);
      // Generate order details
      const orderDetails = {
        OrderId: generateOrderId(),
        cartItems: cartItems.map((item, index) => ({
          productId: item.Id,
          productName: item.pname,
          SKU: item.SKU,
          quantity: quantities[index],
          productPrice:
            item.discount > 0
              ? (item.p_price - item.p_price * (item.discount / 100)) *
                quantities[
                  index
                ] /* (item.p_price - (item.p_price * (item.discount / 100))) * quantities[index] * (1 + item.igstn / 100) */
              : item.p_price * quantities[index], // Calculate price with discount
          /* : (item.p_price * quantities[index] * (1 + item.igstn / 100)), // Calculate price with discount */
        })),
        deliveryCharges: deliveryCharges,
        addressId: selectedAddress,
        price:
          totalPrice + deliveryCharges + (totalPrice + deliveryCharges) * 0.03, // Add COD charges
        customerName: user.name,
        phone: user.phone,
        userId: user.Id,
        paymode: paymentMode,
      };

      // Check stock availability for each product in the cart
      const stockCheckResponse = await fetch(
        "http://localhost/waltzify_copy_fake/Backend/check_stock.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderDetails.cartItems),
        }
      );

      if (!stockCheckResponse.ok) {
        throw new Error(
          `Stock check failed! Status: ${stockCheckResponse.status}`
        );
      }

      const stockData = await stockCheckResponse.json();

      if (stockData.success) {
        const outOfStockItems = stockData.outOfStockItems || [];

        if (outOfStockItems.length > 0) {
          setError(
            "Some items in your cart are out of stock: " +
              outOfStockItems.map((item) => item.pname).join(", ")
          );

          setIsButtonDisabled(false); // Re-enable the button
          return; // Stop further execution if any item is out of stock
        }

        setError("Please Wait, Your Order is Progressing!");

        // If all items are in stock, proceed with placing the order
        const addResponse = await fetch(
          "http://localhost/waltzify_copy_fake/Backend/add_orders.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderDetails),
          }
        );

        if (!addResponse.ok) {
          throw new Error(`HTTP error! Status: ${addResponse.status}`);
        }

        let addResponseText = await addResponse.text();
        const addResponseData = JSON.parse(addResponseText);

        if (
          Array.isArray(addResponseData) &&
          addResponseData.length > 0 &&
          addResponseData[0].success
        ) {
          setConfirmationMessage("Your order is confirmed successfully! ✅");

          setError("");
          await fetch(
            "http://localhost/waltzify_copy_fake/Backend/sendUserOrderConfirmation.php",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(orderDetails),
            }
          );
          setError("");
          navigate("/myorders");
        } else {
          setError(
            "Order placement failed. Please check the cart items and try again."
          );
          setConfirmationMessage("");
        }
      } else {
        setError("Out of Stock itmes Cannot Buy");
      }
    } catch (error) {
      console.error("Error in placing order:", error);
      setError("Order placement failed. Please try again.");
    } finally {
      // Re-enable the button after processing
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="lg:mt-[10rem] mt-[10rem]">
      {/* item */}
      <div className="flex pt-[2rem] flex-col lg:flex-row">
        {/* show products */}
        <div className="lg:w-2/3 pb-[1rem] lg:px-[3rem]">
          {/* category */}
          <p className="pb-[2rem] text-4xl font-bold">Product Summary</p>
          <div className="border-2 rounded-xl border-orange-500">
            <div className="pt-[2rem] justify-evenly hidden lg:flex gap-[12rem] font-bold  px-[9rem] items-center border-b-2 pb-[2rem]">
              <p>Product</p>

              <div className="flex justify-evenly items-center ml-[14rem]">
                <p>Price</p>
              </div>
            </div>
            {/* product list */}
            <div className="flex flex-col lg:px-[3rem] justify-evenly">
              {cartItems.map((item, index) => {
                // Calculate discounted price for each item
                const discountedPrice =
                  item.p_price - item.p_price * (item.discount / 100);

                return (
                  <div
                    key={index}
                    className="py-[1rem] flex flex-col lg:flex-row justify-between border-b-2"
                  >
                    <div className="flex gap-[0.5rem] items-center">
                      <img
                        className="object-contain w-[7rem] h-[8rem]"
                        src={`http://localhost/waltzify_copy_fake/Backend/Products/${item.img1}`}
                        alt={item.pname}
                      />
                      <div className="w-[30rem]">
                        <p
                          className="font-bold text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[15ch] hover:max-w-full hover:whitespace-normal transition-all duration-300 ease-in-out"
                          title={item.pname} // Optional, shows full text on hover tooltip
                        >
                          {item.pname}
                        </p>
                        {/* <p className='mt-2'>
                                                {item.pQuantity == 0 ? (
                                                    // Display "Out of stock" message if quantity is 0
                                                    <span className='text-red-500 font-bold text-xs'>Out of stock now,you cannot buy it</span>
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
                                                </p> */}
                        <p className="mt-2">
                          {item.pQuantity == 0 ? (
                            <span className="text-red-500 font-bold text-xs">
                              Out of stock now, you cannot buy it
                            </span>
                          ) : (
                            <>
                              Quantity:
                              <span className="border ml-[30px] rounded-lg py-1  border-gray-500">
                                <button
                                  className="text-xl ml-[5px] "
                                  onClick={() => handleDecrement(index)}
                                >
                                  -
                                </button>
                                <input
                                  type="text"
                                  min="1"
                                  className="text-center w-[2rem] lg:w-[3rem] border-0 border-black mx-2 outline-none rounded-xl"
                                  value={quantities[index]}
                                  onChange={(e) =>
                                    handleQuantityChange(index, e.target.value)
                                  }
                                  onBlur={() => handleQuantityBlur(index)}
                                />
                                <button
                                  className="text-xl mr-[5px]"
                                  onClick={() => handleIncrement(index)}
                                >
                                  +
                                </button>
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="mt-[1rem] ml-[1rem] flex lg:justify-evenly justify-center gap-[2rem] lg:gap-[10rem] items-center lg:w-[40rem]">
                      <p className="w-[5rem] text-lg text-center font-bold">
                        ₹{(discountedPrice * quantities[index]).toFixed(2)}
                      </p>
                      {/* <p className='w-[5rem] text-lg text-center font-bold'>₹{(discountedPrice * quantities[index] * (1 + item.igstn / 100)).toFixed(2)}</p> */}
                    </div>
                    <div className="mt-[1rem] lg:mt-0 flex items-center justify-center">
                      <button
                        className="bg-orange-500 px-3 py-1 text-white rounded-full"
                        onClick={() => handleRemoveCart(item)}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* total */}
        <div className="lg:w-1/3 pb-[1rem] px-[2rem]">
          <p className="text-3xl font-bold">Checkout</p>
          <div className="text-orange-500 font-bold flex flex-col gap-[1rem] mt-[2rem] px-[2rem] py-[1rem] border-2 border-orange-500 rounded-xl">
            <div className="flex items-center justify-between border-b-2">
              <p className="pb-3">Sub-total</p>
              <p className="text-black">₹{totalPrice.toFixed(2)}</p>
            </div>
            {/*  <div className='flex items-center justify-between border-b-2'>
                            
                            <p className='pb-3'>Delivery Charges</p>
                            {cod ? (
                                <div>
                                <p className='text-black'>₹{shipping.toFixed(2)}</p>
                                </div>
                            )
                            :(
                                
                                <div>
                                <p className='text-black'>₹{shipping.toFixed(2)}</p>
                                </div>
                            )}
                        </div> */}
            {/* <div className='flex items-center justify-between border-b-2'>
    {cartItems.map((item, index) => (
        <div key={index} className='flex justify-between w-full'>
            <p className='pb-3'>Delivery Charges</p>
            {cod ? (
                <div>
                    <p className='text-black'>₹{(shipping * quantities[index]).toFixed(2)}</p>
                </div>
            ) : (
                <div>
                    <p className='text-black'>₹{(shipping * quantities[index]).toFixed(2)}</p>
                </div>
            )}
        </div>
    ))}
</div> */}
            <div className="flex items-center justify-between border-b-2">
              <div className="flex justify-between w-full">
                <p className="pb-3">Delivery Charges</p>
                {cod ? (
                  <div>
                    <p className="text-black">
                      ₹
                      {(cod
                        ? (totalPrice + deliveryCharges) * 0.03
                        : 0
                      ).toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-black">₹{deliveryCharges.toFixed(2)}</p>
                  </div>
                )}
              </div>
              {/* ))
    ) : (
        <div className='flex justify-between w-full'>
            <p className='pb-3'>Delivery Charges</p>
            <p className='text-black'>₹0.00</p>
        </div> */}
            </div>

            <div className="flex items-center justify-between">
              <p>Total</p>
              {/* <p className='text-black'>₹{(totalPrice + (cod ? (totalPrice * 0.03) + shipping : shipping)).toFixed(2)}</p> */}
              <p className="text-black">
                ₹
                {(
                  totalPrice +
                  deliveryCharges +
                  (cod ? (totalPrice + deliveryCharges) * 0.03 : 0)
                ).toFixed(2)}
              </p>
            </div>
          </div>
          <div className="py-[1rem]">
            <p className="text-xl font-bold">Mode of Payment</p>
            {error === "Please select a payment mode." ||
              ("Please select a payment mode and Address." && (
                <p className="text-red-500">{error}</p>
              ))}
            {confirmationMessage && (
              <div className="bg-green-100 text-green-700 p-4 my-5 border border-green-200 rounded flex items-center text-base">
                {confirmationMessage}
              </div>
            )}
            {/* <div className='p-[1rem] flex items-center gap-[1rem]'>
                            <input  onClick={() => { setCod(true); setPaymentMode('COD'); }} type="radio" value="COD" name='mode of payment' />
                            <p className='font-semibold'>Cash on Delivery (3% Fee for COD)</p>
                        </div> */}
            <div className="p-[1rem] flex items-center gap-[1rem]">
              <label
                className={`flex items-center gap-[0.5rem] cursor-pointer ${
                  totalPrice > 5000 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <input
                  onClick={() => {
                    setCod(true);
                    setPaymentMode("COD");
                  }}
                  type="radio"
                  value="COD"
                  name="mode of payment"
                  disabled={totalPrice > 5000} // Disable if total price is above 5000
                  className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-orange-500 checked:border-orange-500 focus:outline-none transition-all duration-300 cursor-pointer"
                />
                <span
                  className={`font-semibold ${
                    totalPrice > 5000 ? "text-gray-400" : "text-gray-800"
                  }`}
                >
                  Cash on Delivery (3% Fee for COD)
                </span>
              </label>
              {totalPrice > 5000 && (
                <p className="text-red-500 text-sm ml-[1rem]">
                  COD is unavailable for orders above ₹5000.
                </p>
              )}
            </div>

            <div className="px-[1rem] flex items-center gap-[1rem]">
              <label className="flex items-center gap-[0.5rem] cursor-pointer">
                <input
                  onClick={() => {
                    setCod(false);
                    setPaymentMode("Prepaid");
                  }}
                  type="radio"
                  value="prepaid"
                  name="mode of payment"
                  className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-green-500 checked:border-green-500 focus:outline-none transition-all duration-300 cursor-pointer"
                />
                <span className="font-semibold text-gray-800">
                  Prepaid Order
                </span>
              </label>
            </div>
          </div>
          <div className="py-[2rem] lg:flex-row flex-col flex items-center gap-[2rem]">
            <button
              className={`rounded-xl text-lg px-[3rem] py-2 transition-all duration-200
    ${
      isButtonDisabled || cartItems.length === 0
        ? "bg-gray-400 text-gray-200 cursor-not-allowed opacity-50"
        : "bg-orange-500 text-white hover:bg-orange-600 hover:opacity-90"
    }`}
              disabled={isButtonDisabled || cartItems.length === 0}
              onClick={handleOrder}
            >
              Place Order
            </button>
            <button className="text-orange-500 px-[3rem] text-lg">
              Cancel
            </button>
          </div>
        </div>
      </div>
      {/* address */}
      <div>
        <div className="mx-[2rem] mt-[2rem]">
          <h1 className="text-4xl font-semibold">Select Address</h1>

          <div>
            {addAddress ? (
              <div className="my-[2rem] p-[2rem] border-2 border-orange-500 rounded-lg">
                <p className="text-2xl mb-[2rem]">Add new Address</p>
                {/* <div className='flex items-center gap-[1rem] text-lg bg-orange-500 text-white lg:w-[20rem] px-4 py-2'>
                                    <FontAwesomeIcon icon={faLocation}/>
                                    <button>Add Your Address</button>
                                </div> */}
                <form
                  onSubmit={handleSubmission}
                  className="mt-[2rem] flex flex-col gap-[1.5rem]"
                >
                  <div className="flex flex-col lg:flex-row gap-[2rem]">
                    <input
                      required
                      className="border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem]"
                      type="text"
                      placeholder="Full Name"
                      value={fullname}
                      onChange={(e) => handleInput(e, "fullname")}
                    />
                    <input
                      required
                      className="border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem]"
                      type="text"
                      placeholder="10-digit mobile number"
                      value={number}
                      onChange={(e) => handleInput(e, "number")}
                    />
                  </div>
                  <div className="flex flex-col lg:flex-row gap-[2rem]">
                    <input
                      required
                      className="border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem]"
                      value={city}
                      onChange={(e) => handleInput(e, "city")}
                      type="text"
                      placeholder="city"
                    />

                    <select
                      className="rounded-xl p-1 focus:outline-none border-2"
                      value={state}
                      onChange={(e) => handleInput(e, "state")}
                    >
                      <option value="">Select State</option>
                      {states.map((cat, index) => (
                        <option key={index} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-[1rem]">
                    <input
                      required
                      className="border-2 outline-none p-2 rounded-lg w-[12rem]  lg:w-[35rem]"
                      type="text"
                      name="address line 1"
                      value={addressOne}
                      onChange={(e) => handleInput(e, "addressOne")}
                      id="address"
                      placeholder="Address Line 1"
                    />
                    <input
                      className="border-2 outline-none p-2 rounded-lg w-[12rem]  w-[12rem] lg:w-[35rem]"
                      type="text"
                      name="address line 2"
                      value={addressTwo}
                      onChange={(e) => handleInput(e, "addressTwo")}
                      id="address"
                      placeholder="Address Line 2"
                    />
                    <input
                      className="border-2 outline-none p-2 rounded-lg w-[12rem]  w-[12rem] lg:w-[35rem]"
                      type="text"
                      name="address line 3"
                      value={addressThree}
                      onChange={(e) => handleInput(e, "addressThree")}
                      id="address"
                      placeholder="Address Line 3"
                    />
                    <div className="flex flex-col lg:flex-row gap-[2rem]">
                      <input
                        required
                        className="border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem]"
                        value={pincode}
                        onChange={(e) => handleInput(e, "pincode")}
                        type="text"
                        placeholder="Pincode"
                      />

                      <input
                        className="border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem]"
                        value={landmark}
                        onChange={(e) => handleInput(e, "landmark")}
                        type="text"
                        placeholder="Landmark"
                      />
                      <input
                        className="border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem]"
                        value={GSTIN}
                        onChange={(e) => handleInput(e, "GSTIN")}
                        type="text"
                        placeholder="GSTIN"
                      />
                    </div>
                  </div>

                  <div className="lg:flex-row flex-col flex items-center gap-[2rem]">
                    <button
                      type="submit"
                      className="text-lg bg-orange-500 text-white px-[3rem] py-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setAddAddress(false); // Close the address form
                        // Navigate to the checkout page
                      }}
                      className="text-orange-500 px-[3rem] text-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
                <p className="mt-5">
                  {/*  {msg ? <span className="success">{msg}</span> : <span className="error">{error === 'Please select an Address.' || 'Please select a payment mode And Address.'}</span>} */}
                  {msg ? (
                    <span className="success font-bold">{msg}</span>
                  ) : error ? (
                    <span className="error font-bold">{error}</span>
                  ) : null}
                </p>
              </div>
            ) : (
              <div className="text-orange-500 font-bold mt-[1rem] text-lg p-[1rem] border-2 flex items-center gap-[2rem]">
                <FontAwesomeIcon icon={faAdd} />
                <button
                  onClick={handleAddAddress}
                  className="w-full text-start"
                >
                  Add New Address
                </button>
              </div>
            )}
          </div>
          {/* list of address */}
          {addresses.map((address, index) => (
            <div key={index} className="border-b-2 p-4 flex items-center gap-4">
              <input
                type="radio"
                value={address.addressId}
                name="address"
                checked={selectedAddress === address.addressId}
                onChange={handleAddressChange}
                className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 cursor-pointer"
              />

<div className="border p-6 w-full rounded-lg shadow-md transition-transform transform hover:scale-05 hover:shadow-lg cursor-pointer">
  <div
    key={address.addressId}
    className={`${
      selectedAddress === address.addressId ? 'border-blue-500' : 'border-gray-300'
    }`}
    onClick={() => setSelectedAddress(address.addressId)}
  >
    <p className="text-xl w-full font-semibold text-gray-800">{address.FullName}</p>
    <p className="text-gray-600 w-full">{address.Number}</p>
    <p className="text-gray-600 w-full">
      {address.Street}, {address.City}
    </p>
    <p className="text-gray-600 w-full">
      {address.State}, {address.ZipCode}
    </p>
  </div>
  <p className="font-bold mt-4">{address.Address1}</p>
  <div className="flex gap-4 mt-4">
    <Link to={`/UpdateUserAddress/${address.addressId}`}>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
        Edit
      </button>
    </Link>
    <button
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
      onClick={() => handleDeleteAddress(address.addressId)}
    >
      Delete
    </button>
  </div>
</div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
