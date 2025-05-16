import React, { useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link , useNavigate } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
const New = () => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isDropdownActive, setIsDropdownActive] = useState(false); // To control dropdown activation
  const [groupedOrders,setGroupedOrders] = useState({});
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [dateRange, setDateRange] = useState('Today');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);  
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(15); 
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost/waltzify_copy_fake/Backend/fetch_new_orders.php');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data); // Set the products data from the API
        filterOrders(data); // Call your filtering function if necessary
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const newGroupedOrders = products.reduce((acc, product) => {
        if (!acc[product.OrderId]) {
            acc[product.OrderId] = [];
        }
        acc[product.OrderId].push(product);
        return acc;
    }, {});
    setGroupedOrders(newGroupedOrders); // Ensure that grouped orders are updated
}, [products]);

// Calculate total pages
/* const totalPages = Math.ceil(orders.length / ordersPerPage); */
const totalPages = Math.ceil(Object.keys(groupedOrders).length / ordersPerPage);

// Handle orders per page change
const handleOrdersPerPageChange = (event) => {
setOrdersPerPage(Number(event.target.value));
setCurrentPage(1); // Reset to first page when orders per page changes
};

// Get current orders to display
const indexOfLastOrder = currentPage * ordersPerPage;
const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

// Handle next page
const nextPage = () => {
if (currentPage < totalPages) {
  setCurrentPage(currentPage + 1);
}
};

// Handle previous page
const prevPage = () => {
if (currentPage > 1) {
  setCurrentPage(currentPage - 1);
}
};
/* const handleCheckboxChange = (orderId) => {
    setSelectedOrders((prevSelected) => {
        const isSelected = prevSelected.includes(orderId);
        if (isSelected) {
            const updatedSelected = prevSelected.filter(id => id !== orderId);
            // If no checkboxes are selected, deactivate the dropdown
            setIsDropdownActive(updatedSelected.length > 0);
            return updatedSelected;
        } else {
            // Activate dropdown when any checkbox is selected
            setIsDropdownActive(true);
            return [...prevSelected, orderId];
        }
    });
}; */ 
/*  const handleCheckboxChange = (orderId) => {
    setSelectedOrders(prevSelectedOrders =>
        prevSelectedOrders.includes(orderId)
            ? prevSelectedOrders.filter(id => id !== orderId)
            : [...prevSelectedOrders, orderId]
    );
}; */
/* const handleCheckboxChange = (orderId) => {
    setSelectedOrders((prevSelected) => {
        const isSelected = prevSelected.includes(orderId);
        const updatedSelected = isSelected
            ? prevSelected.filter(id => id !== orderId)
            : [...prevSelected, orderId];

        // Update the dropdown activation state
        setIsDropdownActive(updatedSelected.length > 0);
        
        return updatedSelected;
    });
}; */


/* const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    const orderIds = Object.keys(groupedOrders);

    if (isChecked) {
        setSelectedOrders(orderIds);
    } else {
        setSelectedOrders([]);
    }

    // Activate dropdown if any orders are selected
    setIsDropdownActive(isChecked || orderIds.length > 0);
}; */
/* const handleSelectAll = (event) => {
    const isChecked = event.target.checked;

    // Filter the orders currently displayed on the page (consider pagination and filters)
    const displayedOrderIds = Object.keys(groupedOrders)
        .filter((orderId) => {
            const order = groupedOrders[orderId][0];
            if (order.shipping_status === 'Processing' || order.order_status === 'Cancelled') {
                return false;
            }

            const orderDate = new Date(order.checkoutTimestamp);
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            const last7Days = new Date(today);
            last7Days.setDate(today.getDate() - 7);
            const last30Days = new Date(today);
            last30Days.setDate(today.getDate() - 30);

            if (dateRange === 'Today') {
                return orderDate.toDateString() === today.toDateString();
            } else if (dateRange === 'Yesterday') {
                return orderDate.toDateString() === yesterday.toDateString();
            } else if (dateRange === 'Last 7 days') {
                return orderDate >= last7Days && orderDate <= today;
            } else if (dateRange === 'Last 30 days') {
                return orderDate >= last30Days && orderDate <= today;
            } else if (dateRange === 'This month') {
                return orderDate.getMonth() === today.getMonth() && orderDate.getFullYear() === today.getFullYear();
            } else if (dateRange === 'Last month') {
                const lastMonth = new Date(today);
                lastMonth.setMonth(today.getMonth() - 1);
                return orderDate.getMonth() === lastMonth.getMonth() && orderDate.getFullYear() === lastMonth.getFullYear();
            } else if (dateRange === 'Custom') {
                return orderDate >= startDate && orderDate <= endDate;
            }
            return true;
        })
        .slice(indexOfFirstOrder, indexOfLastOrder) // Pagination logic

    if (isChecked) {
        setSelectedOrders(displayedOrderIds); // Select only displayed orders
    } else {
        setSelectedOrders([]); // Deselect all
    }

    // Activate dropdown if any orders are selected
    setIsDropdownActive(isChecked || displayedOrderIds.length > 0);
}; */


// Handle individual order selection
/*  const handleCheckboxChange = (orderId) => {
    setSelectedOrders((prevSelected) => {
        const isSelected = prevSelected.includes(orderId);
        const updatedSelected = isSelected
            ? prevSelected.filter(id => id !== orderId)
            : [...prevSelected, orderId];

        // Update the dropdown activation state
        setIsDropdownActive(updatedSelected.length > 0);
        
        return updatedSelected;
    });
}; */
  /* const handleCheckboxChange = (orderId) => {
    setSelectedOrders((prevSelected) => {
        const isSelected = prevSelected.includes(orderId);
        const updatedSelected = isSelected
            ? prevSelected.filter(id => id !== orderId)
            : [...prevSelected, orderId];

        // Update the dropdown activation state
        setIsDropdownActive(updatedSelected.length > 0);

        // Check if the "Select All" should be unchecked
        const displayedOrderIds = Object.keys(groupedOrders)
            .filter((id) => {
                const order = groupedOrders[id][0];
                const orderDate = new Date(order.checkoutTimestamp);
                const today = new Date();
                const last30Days = new Date(today);
                last30Days.setDate(today.getDate() - 30);
                return orderDate >= last30Days && orderDate <= today; // Adjust as needed for your date range
            })
            .slice(indexOfFirstOrder, indexOfLastOrder);

        // If any displayed order is not selected, uncheck "Select All"
        const allSelected = displayedOrderIds.every(id => updatedSelected.includes(id));
        setSelectAllChecked(allSelected); // Assuming you have a state variable for "Select All" checked state

        return updatedSelected;
    });
}; */
const handleCheckboxChange = (orderId) => {
    setSelectedOrders((prevSelected) => {
        const isSelected = prevSelected.includes(orderId);
        const updatedSelected = isSelected
            ? prevSelected.filter(id => id !== orderId)
            : [...prevSelected, orderId];

        // Filter the orders currently displayed on the page
        const displayedOrderIds = Object.keys(groupedOrders)
            .filter((id) => {
                const order = groupedOrders[id][0];
                const orderDate = new Date(order.checkoutTimestamp);
                const today = new Date();
                const last30Days = new Date(today);
                last30Days.setDate(today.getDate() - 30);
                return orderDate >= last30Days && orderDate <= today; // Adjust as needed for your date range
            })
            .slice(indexOfFirstOrder, indexOfLastOrder); // Pagination logic

        // Check if "Select All" should be unchecked
        const allSelected = displayedOrderIds.every(id => updatedSelected.includes(id));
        setSelectAllChecked(allSelected); // Update "Select All" checkbox state

        return updatedSelected;
    });
};

const handleSelectAll = (event) => {
    const isChecked = event.target.checked;

    // Filter the orders currently displayed on the page
    const displayedOrderIds = Object.keys(groupedOrders)
        .filter((orderId) => {
            const order = groupedOrders[orderId][0];

            if (order.shipping_status === 'Processing' && 
                order.order_status === 'Cancelled' && 
                order.order_status === 'Delivered' || (order.payment_status === 'Success' && order.paymode === 'COD')) {
                return false;
            }

            const orderDate = new Date(order.checkoutTimestamp);
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            const last7Days = new Date(today);
            last7Days.setDate(today.getDate() - 7);
            const last30Days = new Date(today);
            last30Days.setDate(today.getDate() - 30);

            // Filter by date range
            if (dateRange === 'Today') {
                return orderDate.toDateString() === today.toDateString();
            } else if (dateRange === 'Yesterday') {
                return orderDate.toDateString() === yesterday.toDateString();
            } else if (dateRange === 'Last 7 days') {
                return orderDate >= last7Days && orderDate <= today;
            } else if (dateRange === 'Last 30 days') {
                return orderDate >= last30Days && orderDate <= today;
            } else if (dateRange === 'This month') {
                return orderDate.getMonth() === today.getMonth() && orderDate.getFullYear() === today.getFullYear();
            } else if (dateRange === 'Last month') {
                const lastMonth = new Date(today);
                lastMonth.setMonth(today.getMonth() - 1);
                return orderDate.getMonth() === lastMonth.getMonth() && orderDate.getFullYear() === lastMonth.getFullYear();
            } else if (dateRange === 'Custom') {
                return orderDate >= startDate && orderDate <= endDate;
            }
            return true;
        })
        .slice(indexOfFirstOrder, indexOfLastOrder); // Pagination logic

    if (isChecked) {
        setSelectedOrders(displayedOrderIds); // Select only displayed orders
    } else {
        setSelectedOrders([]); // Deselect all
    }

    // Update dropdown activation based on selected orders
    setIsDropdownActive(isChecked || displayedOrderIds.length > 0);
    setSelectAllChecked(isChecked); // Update the "Select All" checkbox
};

  const handleBulkAction = (action) => {
    if (selectedOrders.length === 0) {
        alert('Please select at least one order to perform an action.');
        return;
    }

    if (action === 'readyToShip') {
        handleShipping(selectedOrders); // Pass the selected orders for shipping
    } else if (action === 'cancelOrder') {
        handleCancelOrder(selectedOrders); // Pass the selected orders for cancellation
    } else if (action === 'export') {
        exportSelectedOrders(selectedOrders); // Export selected orders
    }
    
};
const handleShipping = () => {
  if (selectedOrders.length === 0) {
      alert('No orders selected for shipping.');
      return;
  }

  fetch('http://localhost/waltzify_copy_fake/Backend/shipping_status.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ OrderIds: selectedOrders }) // Pass all selected orders
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      if (data.success) {
          alert('Orders shipped and email notifications sent.');
           // Remove the shipped order from the orders list without refresh
            // Safely update groupedOrders to filter out shipped orders
            /* setGroupedOrders(prevOrders => {
                // Ensure prevOrders is an array
                if (Array.isArray(prevOrders)) {
                  // Filter out the shipped orders by checking against selectedOrders array
                  return prevOrders.filter(order => !selectedOrders.includes(order.OrderId));
                }
                return prevOrders; // Return as is if not an array
              }); */
        
              setSelectedOrders([]); // Clear selected orders after shipping
        

      } else {
          alert('Error in shipping: ' + data.error);
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
};

const exportSelectedOrders = () => {
    // Ensure there are selected orders to export
    if (selectedOrders.length === 0) {
        return;
    }

    // Prepare grouped orders for export
    const selectedOrdersData = selectedOrders.map(orderId => {
        const orderGroup = groupedOrders[orderId];
        if (!orderGroup) return null; // Skip if no group for the selected order

        const firstOrder = orderGroup[0]; // Assuming all grouped products share the same order details

        return {
            "Order Details": `OrderId: ${firstOrder.OrderId}`,
            "Customer Details": `${firstOrder.customerName} (${firstOrder.email})`,
            "Price": firstOrder.checkoutPrice,
            "Payment Mode": firstOrder.paymode,
            "Payment Status": firstOrder.payment_status,
            "Delivery Address": `${firstOrder.Address1}, ${firstOrder.City}, ${firstOrder.Pincode}`,
            "Product Details": orderGroup.map(product => 
                `Product Name: ${product.orderItemProductName}, SKU: ${product.SKU}, QTY: ${product.totalQuantityOrdered}`
            ).join(', '), // Join product details
        };
    }).filter(Boolean); // Remove any null/undefined results

    // Ensure there are valid orders to export
    if (selectedOrdersData.length === 0) {
        return;
    }

    // Create a new worksheet with the selected orders data
    const worksheet = XLSX.utils.json_to_sheet(selectedOrdersData);
    const workbook = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Selected Orders');

    // Write the workbook to a file
    XLSX.writeFile(workbook, 'selected_orders_list.xlsx');
};

const handleCancelOrder = () => {
  if (selectedOrders.length === 0) {
      alert('No orders selected for Cancelling.');
      return;
  }

  // Prompt user for cancellation reason
  const reason = prompt('Please enter the reason for cancelling these orders:');
  
  if (!reason) {
      alert('Cancellation reason is required.');
      return;
  }
  
  fetch('http://localhost/waltzify_copy_fake/Backend/cancel_order.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
          OrderIds: selectedOrders,
          CancelReason: reason // Pass cancellation reason
      })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      if (data.success) {
          alert('Orders cancelled successfully.');
          setSelectedOrders([]); // Clear selected orders after cancelling
      } else {
          alert('Error in cancelling orders: ' + data.error);
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
};
useEffect(() => {
  filterOrders(orders);
}, [dateRange, startDate, endDate]);

const filterOrders = (allOrders) => {
  const now = new Date();
  let filtered = [];

  if (dateRange === 'Today') {
      filtered = allOrders.filter(order => {
          const orderDate = new Date(order.checkoutTimestamp);
          return (
              orderDate.toDateString() === now.toDateString()
          );
      });
  } else if (dateRange === 'Yesterday') {
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      filtered = allOrders.filter(order => {
          const orderDate = new Date(order.checkoutTimestamp);
          return (
              orderDate.toDateString() === yesterday.toDateString()
          );
      });
  } else if (dateRange === 'Last 7 days') {
      const last7Days = new Date(now);
      last7Days.setDate(now.getDate() - 7);
      filtered = allOrders.filter(order => {
          const orderDate = new Date(order.checkoutTimestamp);
          return (
              orderDate >= last7Days && orderDate <= now
          );
      });
  } else if (dateRange === 'Last 30 days') {
      const last30Days = new Date(now);
      last30Days.setDate(now.getDate() - 30);
      filtered = allOrders.filter(order => {
          const orderDate = new Date(order.checkoutTimestamp);
          return (
              orderDate >= last30Days && orderDate <= now
          );
      });
  } else if (dateRange === 'This month') {
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      filtered = allOrders.filter(order => {
          const orderDate = new Date(order.checkoutTimestamp);
          return orderDate >= firstDayOfMonth && orderDate <= now;
      });
  } else if (dateRange === 'Last month') {
      const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      filtered = allOrders.filter(order => {
          const orderDate = new Date(order.checkoutTimestamp);
          return orderDate >= firstDayOfLastMonth && orderDate <= lastDayOfLastMonth;
      });
  } else if (dateRange === 'Custom' && startDate && endDate) {
      filtered = allOrders.filter(order => {
          const orderDate = new Date(order.checkoutTimestamp);
          return orderDate >= startDate && orderDate <= endDate;
      });
  }

  setFilteredOrders(filtered);
};
  return (
    <div className="w-full p-6 bg-gray-100 min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex space-x-4 mb-6">
                
            </div>
          
     <div className="flex items-center justify-between mb-6">
                 
                      
                     
                 {/* Status Filter */}
                 <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center space-x-4">
             <select
                 value={dateRange}
                 onChange={(e) => setDateRange(e.target.value)}
                 className="border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-[#3B81F6] focus:outline-none"
             >
                 <option value="Today">Today</option>
                 <option value="Yesterday">Yesterday</option>
                 <option value="Last 7 days">Last 7 days</option>
                 <option value="Last 30 days">Last 30 days</option>
                 <option value="This month">This month</option>
                 <option value="Last month">Last month</option>
                 <option value="Custom">Custom</option>
             </select>
             {dateRange === 'Custom' && (
    <div className="flex space-x-4 relative z-50">
        <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy/MM/dd"
            placeholderText="Start Date"
            className="z-50 border-2 border-blue-500 rounded-lg py-2 px-4"  // Ensure DatePicker has high z-index
        />
        <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy/MM/dd"
            placeholderText="End Date"
            className="z-50 border-2 border-blue-500 rounded-lg py-2 px-4"  // Ensure DatePicker has high z-index
        />
    </div>
)}
         </div>
                
             </div>


                 
                 <span className="mr-4 text-xl font-bold text-violet-400">{selectedOrders.length} Order(s) Selected</span>
                 
                  <div className="flex items-center border border-gray-300 rounded-lg py-2 px-4 mb-4">
                  
                  <select
  onChange={(e) => handleBulkAction(e.target.value)}
  className="outline-none w-full"
  disabled={selectedOrders.length === 0} // Enable dropdown only if there are selected orders
>
  <option value="">Select an action</option>
 
    <>
      <option value="readyToShip">Ready to Ship</option>
      <option value="cancelOrder">Cancel Order</option>
      <option value="export">Export Orders</option>
    </>
  
</select>

         </div>
             </div> 
             <div className="w-full">
            
            
            

      {/* <table className="w-full table-auto border-collapse bg-violet-20">
        <thead>
            <tr className="bg-violet-200">
                <th className="border p-2">
                    <input
                        type="checkbox"
                        className="mr-2 h-5 w-5"
                        checked={
                            filteredOrders.length > 0 &&
                            filteredOrders
                                .slice(indexOfFirstOrder, indexOfLastOrder)
                                .every(order => selectedOrders.includes(order.OrderId))
                        } // Only check if all current page orders are selected
                  
                        onChange={handleSelectAll}
                    />  
                    Order Details
                </th>
                <th className="border p-2 ">Customer Details</th>
                <th className="border p-2">Payment</th>
                <th className="border p-2">Delivery Address</th>
                <th className="border p-2">Product Details</th>
            </tr>
        </thead>
        <tbody>
           
            {Object.keys(groupedOrders)
                .filter((orderId) => {
                    // Exclude orders where the shipping_status is "Processing" or orders are canceled
                    const order = groupedOrders[orderId][0]; // Get the first product in the order
                    if (order.shipping_status !== 'Processing' || order.order_status === 'Cancelled') {
                        return false;
                    }
                    
                    // Get the checkoutTimestamp for filtering
                    const orderDate = new Date(order.checkoutTimestamp);
                    const today = new Date();
                    const yesterday = new Date(today);
                    yesterday.setDate(today.getDate() - 1);
                    const last7Days = new Date(today);
                    last7Days.setDate(today.getDate() - 7);
                    const last30Days = new Date(today);
                    last30Days.setDate(today.getDate() - 30);
                    
                    // Apply filtering based on dateRange
                    if (dateRange === 'Today') {
                        return (
                            orderDate.toDateString() === today.toDateString()
                        );
                    } else if (dateRange === 'Yesterday') {
                        return (
                            orderDate.toDateString() === yesterday.toDateString()
                        );
                    } else if (dateRange === 'Last 7 days') {
                        return (
                            orderDate >= last7Days && orderDate <= today
                        );
                    } else if (dateRange === 'Last 30 days') {
                        return (
                            orderDate >= last30Days && orderDate <= today
                        );
                    } else if (dateRange === 'This month') {
                        return (
                            orderDate.getMonth() === today.getMonth() &&
                            orderDate.getFullYear() === today.getFullYear()
                        );
                    } else if (dateRange === 'Last month') {
                        const lastMonth = new Date(today);
                        lastMonth.setMonth(today.getMonth() - 1);
                        return (
                            orderDate.getMonth() === lastMonth.getMonth() &&
                            orderDate.getFullYear() === lastMonth.getFullYear()
                        );
                    } else if (dateRange === 'Custom') {
                        // If the user selects a custom date range
                        return (
                            orderDate >= startDate && orderDate <= endDate
                        );
                    }
                    return true;
                })
                .slice(indexOfFirstOrder, indexOfLastOrder) // Adjust for pagination
                .map((orderId) => (
                    groupedOrders[orderId].map((product, index) => (
                        <tr key={`${orderId}-${index}`}>
                            {index === 0 && (
                                <>
                                    <td className="border p-2" rowSpan={groupedOrders[orderId].length}>
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={selectedOrders.includes(orderId)}
                                            onChange={() => handleCheckboxChange(orderId)}
                                        />
                                        <span className="font-bold">{orderId}</span><br />
                                        <span className='text-gray-500'>
                                            {new Date(product.checkoutTimestamp).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            })} | 
                                            {new Date(product.checkoutTimestamp).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true,
                                            })}
                                        </span>
                                    </td>
                                    <td className="border p-2" rowSpan={groupedOrders[orderId].length}>
                                        {product.customerName}<br />
                                        {product.email}<br />
                                        {product.phone}
                                    </td>
                                    <td className="border p-2" rowSpan={groupedOrders[orderId].length}>
                                        <span className="font-bold">₹{product.checkoutPrice}</span><br />
                                        <span className="font-bold text-green-500 rounded-xxl">{product.paymode}</span><br />
                                        <span className="font-bold text-red-500">{product.payment_status}</span>
                                    </td>
                                    <td className="border p-2" rowSpan={groupedOrders[orderId].length}>
                                        {product.Address1}<br />
                                        {product.Pincode}<br />
                                        {product.City}
                                    </td>
                                </>
                            )}
                            <td className="border p-2">
                                {product.orderItemProductName.length > 20
                                    ? `${product.orderItemProductName.slice(0, 20)}...`
                                    : product.orderItemProductName}
                                <br/>
                                <span className='font-bold text-gray-400'>SKU: </span>{product.SKU}
                                <br/>
                                <span className='font-bold'>QTY: </span>{product.totalQuantityOrdered}
                            </td>
                        </tr>
                    ))
                ))} 
        </tbody>
      </table> */}
        <table className="w-full table-auto border-collapse bg-violet-20">
        <thead>
            <tr className="bg-violet-200">
                <th className="border p-2">
                <input
                        type="checkbox"
                        className="mr-2 h-5 w-5"
                        
                         checked={
                            filteredOrders.length > 0 &&
                            filteredOrders
                              .slice(indexOfFirstOrder, indexOfLastOrder)
                              .every(order => selectedOrders.includes(order.OrderId))
                          }  // Only check if all current page orders are selected
                   
                  
                        onChange={handleSelectAll}
                    />   
                    Order Details
                </th>
                <th className="border p-2 ">Customer Details</th>
                <th className="border p-2">Payment</th>
                <th className="border p-2">Delivery Address</th>
                <th className="border p-2">Product Details</th>
            </tr>
        </thead>
        <tbody>
            {/* Helper function to filter orders based on date range */}
            {Object.keys(groupedOrders)
                .filter((orderId) => {
                    // Exclude orders where the shipping_status is "Processing" or orders are canceled
                    const order = groupedOrders[orderId][0]; // Get the first product in the order
                    if (order.shipping_status === 'Processing' && order.order_status === 'Cancelled' && order.payment_status === 'Success') {
                        return false;
                    }
                    
                    // Get the checkoutTimestamp for filtering
                    const orderDate = new Date(order.checkoutTimestamp);
                    const today = new Date();
                    const yesterday = new Date(today);
                    yesterday.setDate(today.getDate() - 1);
                    const last7Days = new Date(today);
                    last7Days.setDate(today.getDate() - 7);
                    const last30Days = new Date(today);
                    last30Days.setDate(today.getDate() - 30);
                    
                    // Apply filtering based on dateRange
                    if (dateRange === 'Today') {
                        return (
                            orderDate.toDateString() === today.toDateString()
                        );
                    } else if (dateRange === 'Yesterday') {
                        return (
                            orderDate.toDateString() === yesterday.toDateString()
                        );
                    } else if (dateRange === 'Last 7 days') {
                        return (
                            orderDate >= last7Days && orderDate <= today
                        );
                    } else if (dateRange === 'Last 30 days') {
                        return (
                            orderDate >= last30Days && orderDate <= today
                        );
                    } else if (dateRange === 'This month') {
                        return (
                            orderDate.getMonth() === today.getMonth() &&
                            orderDate.getFullYear() === today.getFullYear()
                        );
                    } else if (dateRange === 'Last month') {
                        const lastMonth = new Date(today);
                        lastMonth.setMonth(today.getMonth() - 1);
                        return (
                            orderDate.getMonth() === lastMonth.getMonth() &&
                            orderDate.getFullYear() === lastMonth.getFullYear()
                        );
                    } else if (dateRange === 'Custom') {
                        // If the user selects a custom date range
                        return (
                            orderDate >= startDate && orderDate <= endDate
                        );
                    }
                    return true;
                })
                .slice(indexOfFirstOrder, indexOfLastOrder) // Adjust for pagination
                .map((orderId) => (
                    groupedOrders[orderId].map((product, index) => (
                        <tr key={`${orderId}-${index}`}>
                            {index === 0 && (
                                <>
                                    <td className="border p-2" rowSpan={groupedOrders[orderId].length}>
                                    <input
                                            type="checkbox"
                                            className="text-gray-200 mr-2 h-5 w-5"
                                            checked={selectedOrders.includes(orderId)}
                                            onChange={() => handleCheckboxChange(orderId)}
                                        />
                                        <span className="font-bold">{orderId}</span><br />
                                        <span className='text-gray-500'>
                                            {new Date(product.checkoutTimestamp).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            })} | 
                                            {new Date(product.checkoutTimestamp).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true,
                                            })}
                                        </span>
                                    </td>
                                    <td className="border p-2" rowSpan={groupedOrders[orderId].length}>
                                        {product.customerName}<br />
                                        {product.email}<br />
                                        {product.phone}
                                    </td>
                                    <td className="border p-2" rowSpan={groupedOrders[orderId].length}>
                                        <span className="font-bold">₹{product.checkoutPrice}</span><br />
                                        <span className="font-bold text-green-500 rounded-xxl">{product.paymode}</span><br />
                                        <span className="font-bold text-red-500">{product.payment_status}</span>
                                    </td>
                                    <td className="border p-2" rowSpan={groupedOrders[orderId].length}>
                                        {product.Address1}<br />
                                        {product.Pincode}<br />
                                        {product.City}
                                    </td>
                                </>
                            )}
                            <td className="border p-2">
                                {product.orderItemProductName.length > 20
                                    ? `${product.orderItemProductName.slice(0, 20)}...`
                                    : product.orderItemProductName}
                                <br/>
                                <span className='font-bold text-gray-400'>SKU: </span>{product.SKU}
                                <br/>
                                <span className='font-bold'>QTY: </span>{product.totalQuantityOrdered}
                            </td>
                        </tr>
                    ))
                ))} 
        </tbody>
    </table>
    
</div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md shadow ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
        >
          Previous
        </button>
        <span className="text-gray-700"> Page {currentPage} of {totalPages} </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md shadow ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
        >
          Next
        </button>
      </div>

      {/* Sticky Dropdown at the Bottom */}
      <div className="sticky bottom-0 bg-gray-300 p-4 z-10 shadow-md flex justify-between items-center mt-4">
        <label className="font-medium text-gray-700">Show Orders Per Page:</label>
        <select
          value={ordersPerPage}
          onChange={handleOrdersPerPageChange}
          className="border border-gray-400 rounded-md p-2 ml-2 bg-white shadow-sm"
        >
          <option value="15">15</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
    </div>
  );
};

export default New;





/* import React, { useState } from 'react';
//import Tabs from './Tabs';

const New = () => {
  const [activeTab, setActiveTab] = useState('New');

  const orders = [
    {
      orderId: 'ORD514324',
      date: '11 Sept 2024 | 05:38 PM',
      customer: {
        name: 'Shruti Sharma',
        email: 'er.shrutidsharma@gmail.com',
        phone: '7987361186'
      },
      payment: {
        amount: '₹1,001.00',
        method: 'COD',
        status: 'Pending'
      },
      address: 'Hasalpur, 453661, Indore',
      products: [
        { name: 'Chocolate', sku: 'choco-29', qty: 1 },
        { name: 'G Lab Compound', sku: '', qty: 2 }
      ]
    },
    // More orders...
  ];

  return (
    <div className="container mx-auto p-4">

       
       <div className="flex items-center justify-between mb-6">
                 
                      
             
                 <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center space-x-4">
             <select
                 value={dateRange}
                 onChange={(e) => setDateRange(e.target.value)}
                 className="border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-[#3B81F6] focus:outline-none"
             >
                 <option value="Today">Today</option>
                 <option value="Yesterday">Yesterday</option>
                 <option value="Last 7 days">Last 7 days</option>
                 <option value="Last 30 days">Last 30 days</option>
                 <option value="This month">This month</option>
                 <option value="Last month">Last month</option>
                 <option value="Custom">Custom</option>
             </select>
             {dateRange === 'Custom' && (
                 <div className="flex space-x-4">
                     <DatePicker
                         selected={startDate}
                         onChange={(date) => setStartDate(date)}
                         selectsStart
                         startDate={startDate}
                         endDate={endDate}
                         dateFormat="yyyy/MM/dd"
                         placeholderText="Start Date"
                     />
                     <DatePicker
                         selected={endDate}
                         onChange={(date) => setEndDate(date)}
                         selectsEnd
                         startDate={startDate}
                         endDate={endDate}
                         dateFormat="yyyy/MM/dd"
                         placeholderText="End Date"
                     />
                 </div>
             )}
         </div>
                
             </div>


                
                 <span className="mr-4 text-xl font-bold text-violet-400">{selectedOrders.length} Order(s) Selected</span>
                
                
                  
                  <div className="flex items-center border border-gray-300 rounded-lg py-2 px-4 mb-4">
                  
                   <select
 onChange={(e) => handleBulkAction(e.target.value)}
 className="outline-none w-full"
 disabled={!isDropdownActive} // Dynamically enable/disable based on selected orders
>
 <option value="">Select an action</option>
 <option value="readyToShip">Ready to Ship</option>
 <option value="cancelOrder">Cancel Order</option>
 
 <option value="export">Export Orders</option>
                 </select>


         </div>
             </div> 

          

      <table className="w-full table-auto border-collapse bg-violet-20">
        <thead>
            <tr className="bg-violet-200">
                <th className="border p-2">
                    <input
                        type="checkbox"
                        className="mr-2 h-5 w-5"
                        checked={selectedOrders.length === Object.keys(groupedOrders).length}
                        onChange={handleSelectAll}
                    />  
                    Order Details
                </th>
                <th className="border p-2 ">Customer Details</th>
                <th className="border p-2">Payment</th>
                <th className="border p-2">Delivery Address</th>
                <th className="border p-2">Product Details</th>
            </tr>
        </thead>
        <tbody>
            
            {Object.keys(groupedOrders)
                .filter((orderId) => {
                    // Exclude orders where the shipping_status is "Processing" or orders are canceled
                    const order = groupedOrders[orderId][0]; // Get the first product in the order
                    if (order.shipping_status === 'Processing' || order.order_status === 'Cancelled') {
                        return false;
                    }
                    
                    // Get the checkoutTimestamp for filtering
                    const orderDate = new Date(order.checkoutTimestamp);
                    const today = new Date();
                    const yesterday = new Date(today);
                    yesterday.setDate(today.getDate() - 1);
                    const last7Days = new Date(today);
                    last7Days.setDate(today.getDate() - 7);
                    const last30Days = new Date(today);
                    last30Days.setDate(today.getDate() - 30);
                    
                    // Apply filtering based on dateRange
                    if (dateRange === 'Today') {
                        return (
                            orderDate.toDateString() === today.toDateString()
                        );
                    } else if (dateRange === 'Yesterday') {
                        return (
                            orderDate.toDateString() === yesterday.toDateString()
                        );
                    } else if (dateRange === 'Last 7 days') {
                        return (
                            orderDate >= last7Days && orderDate <= today
                        );
                    } else if (dateRange === 'Last 30 days') {
                        return (
                            orderDate >= last30Days && orderDate <= today
                        );
                    } else if (dateRange === 'This month') {
                        return (
                            orderDate.getMonth() === today.getMonth() &&
                            orderDate.getFullYear() === today.getFullYear()
                        );
                    } else if (dateRange === 'Last month') {
                        const lastMonth = new Date(today);
                        lastMonth.setMonth(today.getMonth() - 1);
                        return (
                            orderDate.getMonth() === lastMonth.getMonth() &&
                            orderDate.getFullYear() === lastMonth.getFullYear()
                        );
                    } else if (dateRange === 'Custom') {
                        // If the user selects a custom date range
                        return (
                            orderDate >= startDate && orderDate <= endDate
                        );
                    }
                    return true;
                })
                .slice(indexOfFirstOrder, indexOfLastOrder) // Adjust for pagination
                .map((orderId) => (
                    groupedOrders[orderId].map((product, index) => (
                        <tr key={`${orderId}-${index}`}>
                            {index === 0 && (
                                <>
                                    <td className="border p-2" rowSpan={groupedOrders[orderId].length}>
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={selectedOrders.includes(orderId)}
                                            onChange={() => handleCheckboxChange(orderId)}
                                        />
                                        <span className="font-bold">{orderId}</span><br />
                                        <span className='text-gray-500'>
                                            {new Date(product.checkoutTimestamp).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            })} | 
                                            {new Date(product.checkoutTimestamp).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true,
                                            })}
                                        </span>
                                    </td>
                                    <td className="border p-2" rowSpan={groupedOrders[orderId].length}>
                                        {product.customerName}<br />
                                        {product.email}<br />
                                        {product.phone}
                                    </td>
                                    <td className="border p-2" rowSpan={groupedOrders[orderId].length}>
                                        <span className="font-bold">₹{product.checkoutPrice}</span><br />
                                        <span className="font-bold text-green-500 rounded-xxl">{product.paymode}</span><br />
                                        <span className="font-bold text-red-500">{product.payment_status}</span>
                                    </td>
                                    <td className="border p-2" rowSpan={groupedOrders[orderId].length}>
                                        {product.Address1}<br />
                                        {product.Pincode}<br />
                                        {product.City}
                                    </td>
                                </>
                            )}
                            <td className="border p-2">
                                {product.orderItemProductName.length > 20
                                    ? `${product.orderItemProductName.slice(0, 20)}...`
                                    : product.orderItemProductName}
                                <br/>
                                <span className='font-bold text-gray-400'>SKU: </span>{product.SKU}
                                <br/>
                                <span className='font-bold'>QTY: </span>{product.totalQuantityOrdered}
                            </td>
                        </tr>
                    ))
                ))} 
        </tbody>
    </table>
    
    </div>
    
    
  );
};

export default New; */
