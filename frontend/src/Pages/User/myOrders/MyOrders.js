import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useUser } from "../../../Context/UserContext"; // Adjusted the path
import { Link } from "react-router-dom";

function MyOrders() {
  const { isAuthenticated } = useUser();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [groupedOrders, setGroupedOrders] = useState({}); // Store grouped orders by checkoutOrderId
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  // Check if user is authenticated and get user data
  useEffect(() => {
    const checkAuthentication = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && isAuthenticated) {
        setUser(user);
      }
    };
    checkAuthentication();
  }, [isAuthenticated]);

  // Fetch orders for the user
  useEffect(() => {
    if (user) {
      fetch(
        `http://localhost/waltzify_copy_fake/Backend/fetch_my_orders.php?userId=${user.Id}`
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
          setOrders(data.orders);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          setError(error.message || "An error occurred"); // Ensure error is a string
        });
    }
  }, [user]);

  // Group orders by checkoutOrderId
  useEffect(() => {
    const groupByOrderId = (orders) => {
      return orders.reduce((grouped, order) => {
        const { checkoutOrderId } = order;
        if (!grouped[checkoutOrderId]) {
          grouped[checkoutOrderId] = [];
        }
        grouped[checkoutOrderId].push(order);
        return grouped;
      }, {});
    };
    setGroupedOrders(groupByOrderId(orders));
  }, [orders]);

  // Handle order cancellation
  /*  const cancelOrder = (OrderId) => {
    
        fetch('http://localhost/waltzify_copy_fake/Backend/User/cancel.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ OrderId: OrderId })
        })
        .then(response => response.json()) // Expect a simplified JSON response
        .then(json => {
    
            if (json.success) {
                setMsg('Order cancelled successfully.');
                // Update the orders state to change the order_status to "Cancelled"
            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order.checkoutOrderId === OrderId 
                    ? { ...order, order_status: 'Cancelled' } 
                    : order
                )
            );
            } else {
                setError(json.error || 'Failed to cancel order.');
            }
        })
        .catch(error => {
            console.error('Cancel error:', error);
            setError(error.message || 'Failed to cancel order due to network error.');
        });
    }; */
  const cancelOrder = (OrderId) => {

    fetch("http://localhost/waltzify_copy_fake/Backend/cancel.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ OrderId: OrderId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Expect a JSON response
      })
      .then((json) => {

        if (json.success) {
          // Show success message
          setMsg("Order cancelled successfully.");

          // Update order status in state
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.checkoutOrderId === OrderId
                ? { ...order, order_status: "Cancelled" }
                : order
            )
          );
        } else {
          // Handle error message
          setError(json.error || "Failed to cancel order.");
        }
      })
      .catch((error) => {
        console.error("Cancel error:", error);
        setError(
          error.message || "Failed to cancel order due to network error."
        );
      });
  };

  const handleCancelClick = (OrderId) => {
    setOrderToCancel(OrderId);
    setShowConfirmModal(true); // Show the modal when cancel button is clicked
  };

  const handleConfirmCancel = () => {
    if (orderToCancel) {
      cancelOrder(orderToCancel);
      setShowConfirmModal(false); // Close modal after confirmation
    }
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false); // Close modal without cancelling
  };
  return (
    <div className="bg-[#F0F3F6] mt-[15vw] lg:mt-[8vw] py-[4rem]">
      {/* Display messages */}
      {msg && <p className="text-green-500">{msg}</p>}
      {error && <p className="text-red-500">{error}</p>}{" "}
      {/* Ensure error is displayed as a string */}
      <div className="text-center flex py-[2rem] justify-between items-center">
        <h1 className="align-items-center text-center lg:ml-[38rem] md:ml-[0rem] text-3xl  lg:text-5xl font-semibold">
          My Orders
        </h1>
      </div>
      {/* Headings Row */}
      <div className="xs:max-xs:hidden bg-white flex flex-col lg:flex-row items-start justify-evenly gap-[0.5rem] lg:gap-[8rem] mx-[1rem] lg:mx-[10rem] px-[2rem] py-[1rem] rounded-xl mt-[1.5rem]">
        <p className="text-2xl font-semibold w-[20%] hidden lg:block">
          Order Details
        </p>
        <p className="text-2xl font-semibold w-[8%] hidden lg:block">Price</p>
        <p className="text-2xl font-semibold w-[10%] hidden lg:block">
          Operations
        </p>
      </div>
      {/* Orders list */}
      <div className="flex flex-col">
        {Object.keys(groupedOrders).length > 0 ? (
          Object.keys(groupedOrders).map((checkoutOrderId, index) => (
            <div
              key={index}
              className="bg-white flex flex-col lg:flex-row items-start justify-evenly gap-[0.5rem] lg:gap-[8rem] mx-[1rem] lg:mx-[10rem] px-[2rem] py-[1rem] rounded-xl mt-[2rem]"
            >
              <div className="flex flex-col gap-[1.5rem]">
                {groupedOrders[checkoutOrderId].map((order, idx) => (
                  <div key={idx} className="flex gap-[2rem]">
                    <img
                      className="w-[4rem] h-[5rem]"
                      src={`http://localhost/waltzify_copy_fake/Backend/Products/${order.img1}`}
                      alt=""
                    />
                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-xs sm:text-sm">
                        {order.pname.length > 20
                          ? `${order.pname.slice(0, 20)}...`
                          : order.pname}
                      </p>
                      <p className="text-xs font-thin">
                        Order Id:{" "}
                        <span className="text-xs font-bold">
                          {order.checkoutOrderId}
                        </span>
                      </p>
                      <p className="text-xs font-thin">
                        Quantity:{" "}
                        <span className="text-xs font-bold">
                          {order.quantity}
                        </span>
                      </p>
                      <p className="text-xs font-thin">
                      {order.trackingId ? (
                        order.shipping_status === "Shipped" ? (
                          <>
                            Shipping Status:{" "}
                            <span className="text-xs font-bold">{order.shipping_status}</span> | Order Status:{" "}
                            <span className="text-xs font-bold">{order.order_status}</span>
                          </>
                        ) : (
                          <>
                            Shipping Status:{" "}
                            <span className="text-xs font-bold">{order.shipping_status}</span>
                          </>
                        )
                      ) : (
                        <>
                          Order Status:{" "}
                          <span className="text-xs font-bold">{order.order_status}</span>
                        </>
                      )}
                    </p>

                  
                      {/* Check if trackingId are not null, then display */}
                      {order.courier_company && (
                        <div className="text-xs font-thin">
                          <p>
                            Courier Company :{" "}
                            <span className="font-bold text-xs">
                              {order.courier_company}
                            </span>
                          </p>
                          
                        </div>
                      )}
                      {order.trackingId && (
                        <div className="text-xs font-thin">
                          <p>
                            Tracking ID:{" "}
                            <span className="font-bold text-xs">
                              {order.trackingId}
                            </span>
                          </p>
                          
                        </div>
                      )}
                        <p className="text-xs font-thin">Order Date :
                      {new Date(order.timestamp).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      |{" "}
                      {new Date(order.timestamp).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>

                    </div>
                  </div>
                ))}
              </div>
              <p className="font-semibold text-sm">
                ₹
                {Number(
                  groupedOrders[checkoutOrderId][0].checkoutPrice
                ).toFixed(2)}
                <br />
              </p>{" "}
              {/* Display price from the first item */}
              {/* <div className='flex lg:flex-col gap-[0.5rem]'>
                            <button
                                className={`text-white bg-orange-500 px-2 py-1 rounded-lg border-2 border-orange-500 hover:bg-white hover:text-orange-500 ${groupedOrders[checkoutOrderId][0].order_status === 'Cancelled' ? 'cursor-not-allowed opacity-50' : ''}`}
                                disabled={groupedOrders[checkoutOrderId][0].order_status === 'Cancelled'} // Disable button if the order is cancelled
                            >
                                {groupedOrders[checkoutOrderId][0].order_status === 'Cancelled' ? (
                                    <span>Tracking Disabled</span> // Display a message if cancelled
                                ) : (
                                    <Link to={`${groupedOrders[checkoutOrderId][0].trackingId}`}target="_blank" rel="noopener noreferrer">Track Order</Link>
                                )}
                            </button>
                                <button
                                className={`text-orange-500 hover:bg-orange-500 hover:text-white py-1 px-2 rounded-lg ${groupedOrders[checkoutOrderId][0].order_status === 'Cancelled' ? 'cursor-not-allowed opacity-50' : ''}`}
                                onClick={() => {
                                    if (groupedOrders[checkoutOrderId][0].order_status === 'Cancelled') {
                                        alert('This order has already been cancelled.'); // Display message if already cancelled
                                    } else {
                                        handleCancelClick(checkoutOrderId); // Open confirmation modal for non-cancelled orders
                                    }
                                }}
                                disabled={groupedOrders[checkoutOrderId][0].order_status === 'Cancelled'} // Disable button if the order is already cancelled
                            >
                                Cancel Order
                            </button>
                                <p className={`text-xm cursor-pointer ${groupedOrders[checkoutOrderId][0].order_status === 'Delivered' ? 'text-blue-500' : 'text-gray-400 cursor-not-allowed'}`}>
                                    {groupedOrders[checkoutOrderId][0].order_status === 'Delivered' ? (
                                        <Link to={`/user_receipt/${checkoutOrderId}`}>Click here to download Invoice</Link>
                                    ) : (
                                        "Invoice available after delivery"
                                    )}
                                    </p>
                            </div> */}
              <div className="flex lg:flex-col gap-[0.5rem]">
                <button
                  className={`text-white bg-orange-500 px-2 py-1 rounded-lg border-2 border-orange-500 hover:bg-white hover:text-orange-500 text-xs
        ${
          groupedOrders[checkoutOrderId][0].order_status === "Cancelled" ||
          groupedOrders[checkoutOrderId][0].order_status === "Delivered"
            ? "cursor-not-allowed opacity-50"
            : ""
        }`}
                  disabled={
                    groupedOrders[checkoutOrderId][0].order_status ===
                      "Cancelled" ||
                    groupedOrders[checkoutOrderId][0].order_status ===
                      "Delivered"
                  }
                >
                  {groupedOrders[checkoutOrderId][0].order_status ===
                  "Cancelled" ? (
                    <span>Tracking Disabled</span>
                  ) : groupedOrders[checkoutOrderId][0].order_status ===
                    "Delivered" ? (
                    <span>Tracking Not Available</span>
                  ) : (
                    <Link
                      to={`${groupedOrders[checkoutOrderId][0].trackingURL}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Track Order
                    </Link>
                  )}
                </button>

              {/*   <button
                  className={`text-orange-500 hover:bg-orange-500 hover:text-white py-1 px-2 rounded-lg text-sm
        ${
          groupedOrders[checkoutOrderId][0].order_status === "Cancelled" ||
          groupedOrders[checkoutOrderId][0].order_status === "Delivered"
            ? "cursor-not-allowed opacity-50"
            : ""
        }`}
                  onClick={() => {
                    if (
                      groupedOrders[checkoutOrderId][0].order_status ===
                      "Cancelled"
                    ) {
                      alert("This order has already been cancelled.");
                    } else if (
                      groupedOrders[checkoutOrderId][0].order_status ===
                      "Delivered"
                    ) {
                      alert("Order cannot be cancelled after delivery.");
                    } else {
                      handleCancelClick(checkoutOrderId);
                    }
                  }}
                  disabled={
                    groupedOrders[checkoutOrderId][0].order_status ===
                      "Cancelled" ||
                    groupedOrders[checkoutOrderId][0].order_status ===
                      "Delivered"
                  }
                >
                  Cancel Order
                </button>

                <p
                  className={`text-xm cursor-pointer ${
                    groupedOrders[checkoutOrderId][0].order_status ===
                    "Delivered"
                      ? "text-blue-500"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {groupedOrders[checkoutOrderId][0].order_status ===
                  "Delivered" ? (
                    <Link to={`/user_receipt/${checkoutOrderId}`}>
                      Click here to download Invoice
                    </Link>
                  ) : (
                    "Invoice available after delivery"
                  )}
                </p> */}
                <button
  className={`text-orange-500 hover:bg-orange-500 hover:text-white py-1 px-2 rounded-lg text-sm
    ${
      groupedOrders[checkoutOrderId][0].order_status === "Cancelled" ||
      groupedOrders[checkoutOrderId][0].order_status === "Delivered" ||
      (groupedOrders[checkoutOrderId][0].trackingId &&
        groupedOrders[checkoutOrderId][0].order_status === "New")
        ? "cursor-not-allowed opacity-50"
        : ""
    }`}
  onClick={() => {
    if (groupedOrders[checkoutOrderId][0].order_status === "Cancelled") {
      alert("This order has already been cancelled.");
    } else if (groupedOrders[checkoutOrderId][0].order_status === "Delivered") {
      alert("Order cannot be cancelled after delivery.");
    } else if (
      groupedOrders[checkoutOrderId][0].trackingId &&
      groupedOrders[checkoutOrderId][0].order_status === "New"
    ) {
      alert("Order cannot be cancelled as tracking is already generated.");
    } else {
      handleCancelClick(checkoutOrderId);
    }
  }}
  disabled={
    groupedOrders[checkoutOrderId][0].order_status === "Cancelled" ||
    groupedOrders[checkoutOrderId][0].order_status === "Delivered" ||
    (groupedOrders[checkoutOrderId][0].trackingId &&
      groupedOrders[checkoutOrderId][0].order_status === "New")
  }
>
  Cancel Order
</button>

<p
  className={`text-xm cursor-pointer ${
    groupedOrders[checkoutOrderId][0].order_status === "Delivered"
      ? "text-blue-500"
      : "text-gray-400 cursor-not-allowed"
  }`}
>
  {groupedOrders[checkoutOrderId][0].order_status === "Delivered" ? (
    <Link to={`/userreceipt/${checkoutOrderId}`}>
      Click here to download Invoice
    </Link>
  ) : (
    "Invoice available after delivery"
  )}
</p>

              </div>
            </div>
          ))
        ) : (
          <p className='text-center font-bold mt-[2rem] '>No orders found.</p>
        )}
      </div>
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold">
              Are you sure you want to cancel this order?
            </h2>
            <p className="font-semibold text-gray-400">
              Once You Cancelled, you can't undo it
            </p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={handleConfirmCancel}
              >
                Yes, Cancel
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg"
                onClick={handleCloseModal}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyOrders;

{
  /* import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useUser } from '../../../Context/UserContext'; // Adjusted the path
import { Link } from 'react-router-dom';

function MyOrders() {
    const { isAuthenticated } = useUser();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        const checkAuthentication = () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && isAuthenticated) {
                setUser(user);
            }
        };
        checkAuthentication();
    }, [isAuthenticated]);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost/waltzify_copy_fake/Backend/fetch_my_orders.php?userId=${user.Id}`)
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
                    setOrders(data.orders);
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    setError(error.message || "An error occurred"); // Ensure error is a string
                });
        }
    }, [user]);

    
    const cancelOrder = (OrderId) => {
    
        fetch('http://localhost/waltzify_copy_fake/Backend/cancel.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ OrderId: OrderId })
        })
        .then(response => response.json()) // Expect a simplified JSON response
        .then(json => {
    
            if (json.success) {
                setMsg('Order cancelled successfully.');
            } else {
                setError(json.error || 'Failed to cancel order.');
            }
        })
        .catch(error => {
            console.error('Cancel error:', error);
            setError(error.message || 'Failed to cancel order due to network error.');
        });
    };
     
   

    return (
        <div className='bg-[#F0F3F6] py-[4rem]'>
                       
                        {msg && <p className='text-green-500'>{msg}</p>}
            {error && <p className='text-red-500'>{error}</p>} 
            <div className='flex py-[2rem] justify-between items-center'>
                <h1 className='text-3xl lg:text-7xl font-semibold'>My Orders</h1>
                
            </div>

         
            <div className='flex flex-col mt-[2rem]'>

                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <div key={index} className='bg-white flex flex-col lg:flex-row items-start justify-evenly gap-[0.5rem] lg:gap-[8rem] mx-[1rem] lg:mx-[10rem] px-[2rem] py-[1rem] rounded-xl mt-[1.5rem]'>
                            <div className='flex gap-[2rem]'>
                                <img className='w-[4rem] h-[5rem]' src={`http://localhost/waltzify_copy_fake/Backend/Products/${order.img1}`} alt="" />
                                <div className='flex flex-col gap-2'>
                                    <p className='font-bold'>{order.pname.length > 20 ? `${order.pname.slice(0, 20)}...` : order.pname}</p>
                                    <p className='text-sm font-thin'>Quantity: {order.quantity}</p>
                                    <p className='text-sm font-thin'>OrderStatus: {order.order_status}</p>
                                    <p className='text-sm font-thin'>OrderId:  {order.checkoutOrderId}</p>
                                </div>
                            </div>
                            
                            <p className='font-semibold'>₹{order.price}</p>
                         
                            <div className='flex lg:flex-col gap-[0.5rem]'>
                                <button className='text-white bg-orange-500 px-2 py-1 rounded-lg border-2 border-orange-500 hover:bg-white hover:text-orange-500'><Link to = {`${order.trackingId}`}>Track Order</Link></button>
                                <button 
                                    className='text-orange-500 hover:bg-orange-500 hover:text-white py-1 px-2 rounded-lg'
                                    onClick={() => cancelOrder(order.checkoutOrderId)}
                                >
                                    Cancel Order
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>


        </div>
    );
}

export default MyOrders; */
}

/*  
    const trackOrder = (OrderId) => {
        fetch('http://localhost/waltzify_copy_fake/Backend/track.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ OrderId })
        })
        .then(response => response.text()) // Get the response as text
        .then(text => {
    
            let jsonObjects = [];
            let regex = /(\{.*?\})(?=\{|\s*$)/g; // Regex to match each JSON object
    
            let match;
            while ((match = regex.exec(text)) !== null) {
                try {
                    jsonObjects.push(JSON.parse(match[1])); // Push each parsed JSON object to the array
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                }
            }
    
    
            // Now process the last JSON object, which should contain the cancellation result
            let lastJsonObject = jsonObjects[jsonObjects.length - 1];
    
            if (lastJsonObject && lastJsonObject.response && lastJsonObject.response.status_code === 200) {
                setMsg('Order Tracking.');
            } else {
                setError(lastJsonObject.error || 'Failed to cancel order.');
            }
        })
        .catch(error => {
            console.error('Cancel error:', error);
            setError(error.message || 'Failed to cancel order due to network error.');
        });
    };
     */

/* const cancelOrder = (OrderId) => {
    
        fetch('http://localhost/waltzify_copy_fake/Backend/cancel.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ OrderId: OrderId })
        })
        .then(response => response.text()) // Get the response as text
        .then(text => {
    
            let jsonObjects = [];
            let regex = /(\{.*?\})(?=\{|\s*$)/g; // Regex to match each JSON object
    
            let match;
            while ((match = regex.exec(text)) !== null) {
                try {
                    jsonObjects.push(JSON.parse(match[1])); // Push each parsed JSON object to the array
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                }
            }
    
    
            // Now process the last JSON object, which should contain the cancellation result
            let lastJsonObject = jsonObjects[jsonObjects.length - 1];
    
            if (lastJsonObject && lastJsonObject.response && lastJsonObject.response.status_code === 200) {
                setMsg('Order cancelled successfully.');
            } else {
                setError(lastJsonObject.error || 'Failed to cancel order.');
            }
        })
        .catch(error => {
            console.error('Cancel error:', error);
            setError(error.message || 'Failed to cancel order due to network error.');
        });
    }; */



{/* import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useUser } from '../../../Context/UserContext'; // Adjusted the path
import { Link } from 'react-router-dom';

function MyOrders() {
    const { isAuthenticated } = useUser();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        const checkAuthentication = () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && isAuthenticated) {
                setUser(user);
            }
        };
        checkAuthentication();
    }, [isAuthenticated]);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost/waltzify_copy_fake/Backend/fetch_my_orders.php?userId=${user.Id}`)
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
                    setOrders(data.orders);
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    setError(error.message || "An error occurred"); // Ensure error is a string
                });
        }
    }, [user]);

    
    const cancelOrder = (OrderId) => {
    
        fetch('http://localhost/waltzify_copy_fake/Backend/cancel.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ OrderId: OrderId })
        })
        .then(response => response.json()) // Expect a simplified JSON response
        .then(json => {
    
            if (json.success) {
                setMsg('Order cancelled successfully.');
            } else {
                setError(json.error || 'Failed to cancel order.');
            }
        })
        .catch(error => {
            console.error('Cancel error:', error);
            setError(error.message || 'Failed to cancel order due to network error.');
        });
    };
     
   

    return (
        <div className='bg-[#F0F3F6] py-[4rem]'>
                       
                        {msg && <p className='text-green-500'>{msg}</p>}
            {error && <p className='text-red-500'>{error}</p>} 
            <div className='flex py-[2rem] justify-between items-center'>
                <h1 className='text-3xl lg:text-7xl font-semibold'>My Orders</h1>
                
            </div>

         
            <div className='flex flex-col mt-[2rem]'>

                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <div key={index} className='bg-white flex flex-col lg:flex-row items-start justify-evenly gap-[0.5rem] lg:gap-[8rem] mx-[1rem] lg:mx-[10rem] px-[2rem] py-[1rem] rounded-xl mt-[1.5rem]'>
                            <div className='flex gap-[2rem]'>
                                <img className='w-[4rem] h-[5rem]' src={`http://localhost/waltzify_copy_fake/Backend/Products/${order.img1}`} alt="" />
                                <div className='flex flex-col gap-2'>
                                    <p className='font-bold'>{order.pname.length > 20 ? `${order.pname.slice(0, 20)}...` : order.pname}</p>
                                    <p className='text-sm font-thin'>Quantity: {order.quantity}</p>
                                    <p className='text-sm font-thin'>OrderStatus: {order.order_status}</p>
                                    <p className='text-sm font-thin'>OrderId:  {order.checkoutOrderId}</p>
                                </div>
                            </div>
                            
                            <p className='font-semibold'>₹{order.price}</p>
                         
                            <div className='flex lg:flex-col gap-[0.5rem]'>
                                <button className='text-white bg-orange-500 px-2 py-1 rounded-lg border-2 border-orange-500 hover:bg-white hover:text-orange-500'><Link to = {`${order.trackingId}`}>Track Order</Link></button>
                                <button 
                                    className='text-orange-500 hover:bg-orange-500 hover:text-white py-1 px-2 rounded-lg'
                                    onClick={() => cancelOrder(order.checkoutOrderId)}
                                >
                                    Cancel Order
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>


        </div>
    );
}

export default MyOrders; */}






/*  
    const trackOrder = (OrderId) => {
        fetch('http://localhost/waltzify_copy_fake/Backend/track.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ OrderId })
        })
        .then(response => response.text()) // Get the response as text
        .then(text => {
    
            let jsonObjects = [];
            let regex = /(\{.*?\})(?=\{|\s*$)/g; // Regex to match each JSON object
    
            let match;
            while ((match = regex.exec(text)) !== null) {
                try {
                    jsonObjects.push(JSON.parse(match[1])); // Push each parsed JSON object to the array
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                }
            }
    
    
            // Now process the last JSON object, which should contain the cancellation result
            let lastJsonObject = jsonObjects[jsonObjects.length - 1];
    
            if (lastJsonObject && lastJsonObject.response && lastJsonObject.response.status_code === 200) {
                setMsg('Order Tracking.');
            } else {
                setError(lastJsonObject.error || 'Failed to cancel order.');
            }
        })
        .catch(error => {
            console.error('Cancel error:', error);
            setError(error.message || 'Failed to cancel order due to network error.');
        });
    };
     */

     /* const cancelOrder = (OrderId) => {
    
        fetch('http://localhost/waltzify_copy_fake/Backend/cancel.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ OrderId: OrderId })
        })
        .then(response => response.text()) // Get the response as text
        .then(text => {
    
            let jsonObjects = [];
            let regex = /(\{.*?\})(?=\{|\s*$)/g; // Regex to match each JSON object
    
            let match;
            while ((match = regex.exec(text)) !== null) {
                try {
                    jsonObjects.push(JSON.parse(match[1])); // Push each parsed JSON object to the array
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                }
            }
    
    
            // Now process the last JSON object, which should contain the cancellation result
            let lastJsonObject = jsonObjects[jsonObjects.length - 1];
    
            if (lastJsonObject && lastJsonObject.response && lastJsonObject.response.status_code === 200) {
                setMsg('Order cancelled successfully.');
            } else {
                setError(lastJsonObject.error || 'Failed to cancel order.');
            }
        })
        .catch(error => {
            console.error('Cancel error:', error);
            setError(error.message || 'Failed to cancel order due to network error.');
        });
    }; */