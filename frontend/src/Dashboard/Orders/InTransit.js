import React, { useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link , useNavigate } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileAlt ,faShareSquare} from '@fortawesome/free-solid-svg-icons';

const InTransit = () => {
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [message, setMessage] = useState(''); // Add message state for showing alerts
  const [groupedOrders,setGroupedOrders] = useState({});
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [dateRange, setDateRange] = useState('Today');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);  
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(15);
  const [filteredProducts,setFilteredProducts] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]); // Track selected orders
  const [selectAll, setSelectAll] = useState(false); // Track if 'Select All' is checked
  const [visibleOrders,setVisibleOrders] = useState([]);
  const [mailedOrders, setMailedOrders] = useState([]);
  // Function to handle status filter change
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost/waltzify_copy_fake/Backend/fetch_in_transit.php');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data); // Set the products data from the API
        filterOrders(data); // Call your filtering function if necessary
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);
    // Export orders to Excel
   /*  const exportToExcel = () => {
        if (products && products.length > 0) {
          const worksheet = XLSX.utils.json_to_sheet(products); // Convert orders to a worksheet
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    
          // Create a binary Excel file and trigger download
          const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'orders.xlsx'; // File name for the download
          a.click();
          window.URL.revokeObjectURL(url); // Clean up the URL
        } else {
          alert('No orders available to export!');
        }
      }; */
      const exportToExcel = () => {
        // Filter the currently visible orders that are displayed on the page
        const visibleData = Object.keys(groupedOrders)
            .filter((orderId) => {
                // Your filtering logic (based on what is currently visible on the page)
                return groupedOrders[orderId]; // Adjust this if necessary
            })
            .map((orderId) => {
                // Map the grouped orders into the format you want for export
                const order = groupedOrders[orderId][0];
                return {
                    orderId: orderId,
                    customerName: order.customerName,
                    email: order.email,
                    phone: order.phone,
                    checkoutPrice: order.checkoutPrice,
                    paymode: order.paymode,
                    payment_status: order.payment_status,
                    Address1: order.Address1,
                    Pincode: order.Pincode,
                    City: order.City,
                    invoiceNo: order.invoiceNo,
                    courier_company: order.courier_company,
                    trackingURL: order.trackingURL,
                    trackingId: order.trackingId,
                    productName: groupedOrders[orderId].map((product) => product.orderItemProductName).join(', '),
                    Shipping_date: order.Shipping_date,
                };
            });
    
        if (visibleData.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(visibleData); // Convert visible data to a worksheet
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Visible Orders');
    
            // Create a binary Excel file and trigger download
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'visible_orders.xlsx'; // File name for the download
            a.click();
            window.URL.revokeObjectURL(url); // Clean up the URL
        } else {
            alert('No orders available to export!');
        }
    };
    
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
//const totalPages = Math.ceil(Object.keys(groupedOrders).length / ordersPerPage);
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



useEffect(() => {
    filterOrders(products); // Initially filter all products based on the current date range
}, [dateRange, startDate, endDate]);

const filterOrders = (allOrders) => {
    const now = new Date();
    let filtered = [];

    // Filter based on date range first
    if (dateRange === 'Today') {
        filtered = allOrders.filter(order => {
            const orderDate = new Date(order.checkoutTimestamp);
            return orderDate.toDateString() === now.toDateString();
        });
    } else if (dateRange === 'Yesterday') {
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        filtered = allOrders.filter(order => {
            const orderDate = new Date(order.checkoutTimestamp);
            return orderDate.toDateString() === yesterday.toDateString();
        });
    } else if (dateRange === 'Last 7 days') {
        const last7Days = new Date(now);
        last7Days.setDate(now.getDate() - 7);
        filtered = allOrders.filter(order => {
            const orderDate = new Date(order.checkoutTimestamp);
            return orderDate >= last7Days && orderDate <= now;
        });
    } else if (dateRange === 'Last 30 days') {
        const last30Days = new Date(now);
        last30Days.setDate(now.getDate() - 30);
        filtered = allOrders.filter(order => {
            const orderDate = new Date(order.checkoutTimestamp);
            return orderDate >= last30Days && orderDate <= now;
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

    

    setFilteredOrders(filtered); // Update the filtered orders state
};
// After filtering orders, reset selected orders
useEffect(() => {
  filterOrders(products); // Initially filter all products based on the current date range
  setSelectedOrders([]); // Reset selected orders when orders change
}, [dateRange, startDate, endDate, products]);

// Update to correctly calculate visible orders
useEffect(() => {
  const visible = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder); // Only visible orders for current page
  setVisibleOrders(visible); // Set the visible orders for rendering
}, [filteredOrders, indexOfFirstOrder, indexOfLastOrder]);

// Toggle selection for a single order
const toggleSelectOrder = (orderId) => {
  setSelectedOrders((prevSelected) =>
    prevSelected.includes(orderId)
      ? prevSelected.filter((id) => id !== orderId) // Deselect if already selected
      : [...prevSelected, orderId] // Select if not already selected
  );
};

// Function to toggle selecting all visible orders

useEffect(() => {
  setSelectedOrders([]); // Reset selected orders when filters or pagination changes
}, [filteredOrders, currentPage, dateRange, startDate, endDate]);


/* const sendOrderDetails = (orderId) => {
    // Make API call to send the order details to the user
    fetch('http://localhost/waltzify_copy_fake/Backend/User/sendOrderDetails.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId }), // Send the OrderId as JSON
    })
      .then(response => response.json()) // Parse the JSON from the response
      .then(data => {
        if (data.success) {
          alert('Order details sent to the user\'s email!');
        } else {
          alert('Error: ' + data.message);
        }
      })
      .catch(error => {
        console.error('There was an error sending the email:', error);
      });
  }; */
  const sendMultipleOrderDetails = () => {
    // Send selected order IDs to backend
    setIsLoading(true);
  setMessage('Please wait, your sending is in process...');
    fetch('http://localhost/waltzify_copy_fake/Backend/sendOrderDetails.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderIds: selectedOrders }), // Send multiple orderIds
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Order details sent to the users\' emails!');
          const updatedProducts = products.map((product) => {
            if (selectedOrders.includes(product.OrderId)) {
              // Update the product's trackingIdmail to 'Mailed'
              return { ...product, trackingIdmail: 'Mailed' };
            }
            return product;
          });

          // Set the updated products to re-render the UI
          setProducts(updatedProducts);

          
        } else {
          alert('Error: ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Error sending emails:', error);
      })
      .finally(() => {
        // Set loading to false once the process is complete
        setIsLoading(false);
      });
  };
// To check if any orders are selected for enabling the dropdown


  return (
    <div className="container mx-auto p-4">
    {/* Filters Section */}
    <div className="flex justify-between items-center mb-4">
      <div className="flex space-x-4">
        {/* Date Filter */}
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
        {/* Order Status Filter */}
      
      
      {/* <button className='text-purple-500 hover:text-white hover:bg-purple-500 border-2 border-purple-500 py-2 px-[2rem] rounded-xl'
 
>
  <FontAwesomeIcon className='pr-[1rem]' icon={faShareSquare} />
  Share Email

</button> */}
      <p className='mb-6 mr-4 text-xl font-bold text-violet-400'>{selectedOrders.length} order(s) selected</p> {/* Display number of selected orders */}
      {/*<button
      className={`text-purple-500 hover:text-white hover:bg-purple-500 border-2 border-purple-500 py-2 px-[2rem] rounded-xl ${
        selectedOrders.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={selectedOrders.length === 0}
      onClick={sendMultipleOrderDetails}
    >
      <FontAwesomeIcon className='pr-[1rem]' icon={faShareSquare} />
      Share Email
    </button>*/}
    <button
  className={`text-purple-500 hover:text-white hover:bg-purple-500 border-2 border-purple-500 py-2 px-[2rem] rounded-xl ${
    selectedOrders.length === 0 || isLoading ? 'opacity-50 cursor-not-allowed' : ''
  }`}
  disabled={selectedOrders.length === 0 || isLoading} // Disable if no orders are selected or loading
  onClick={sendMultipleOrderDetails}
>
  <FontAwesomeIcon className='pr-[1rem]' icon={faShareSquare} />
  {isLoading ? 'Sending...' : 'Share Email'} {/* Change button text when loading */}
</button>

      <button className='text-[#3B81F6] hover:text-white hover:bg-[#3B81F6] border-2 border-[#3B81F6] py-2 px-[2rem] rounded-xl'onClick={exportToExcel } >
                      <FontAwesomeIcon className='pr-[1rem]' icon={faFileAlt}/>
                      Export All Orders
                  </button>
    
    </div>

      {/* Orders Table */}
      <div className="bg-white shadow-md rounded-lg">
      <table className="w-full table-auto border-collapse bg-violet-20">
        <thead>
            <tr className="bg-violet-200">
                <th className="border p-2">
                   {/*  <input
                        type="checkbox"
                       
                    
                       onChange={toggleSelectAll} 
                       checked={selectedOrders.length === visibleOrders.length && visibleOrders.length > 0} 
                    />   */}
                       Order Details
                </th>
                <th className="border p-2">Customer Details</th>
                <th className="border p-2">Payment</th>
                <th className="border p-2">Delivery Address</th>
                <th className="border p-2">Invoice Number</th>
                
               
                <th className="border p-2">Courier Company</th>
                <th className="border p-2">Tracking URL</th>
                <th className="border p-2">Tracking Id</th>
                <th className="border p-2">Product Details</th>
                <th className="border p-2">Shipping Date</th>
              
                {/* <th className="px-4 py-2">Download Label</th> */}

            </tr>
        </thead>
        <tbody>
        {Object.keys(groupedOrders)
                .filter((orderId) => {
                    // Get the order object and check if the status is "Cancelled"
                    const order = groupedOrders[orderId][0];
                    if (order.trackingURL === '' || order.courier_company === '' || order.trackingId === '' || order.payment_status === 'Cancelled' || order.order_status === 'Cancelled') {
                        return false; // Skip orders that are not cancelled
                    }
                    
                    // Get the checkoutTimestamp for further date filtering
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
                        return orderDate.toDateString() === today.toDateString();
                    } else if (dateRange === 'Yesterday') {
                        return orderDate.toDateString() === yesterday.toDateString();
                    } else if (dateRange === 'Last 7 days') {
                        return orderDate >= last7Days && orderDate <= today;
                    } else if (dateRange === 'Last 30 days') {
                        return orderDate >= last30Days && orderDate <= today;
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
                        return orderDate >= startDate && orderDate <= endDate;
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
                                      onChange={() => toggleSelectOrder(orderId)}
                                      checked={selectedOrders.includes(orderId)} // Check if selected
                                    />
                                         <span className="font-bold">{orderId}</span>
                                         <br />
                                          
                                        <span className='text-gray-500'>
                                            {new Date(product.checkoutTimestamp).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                                timeZone: 'Asia/Kolkata', // Set the time zone to IST
                                            })} | 
                                            {new Date(product.checkoutTimestamp).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true,
                                                timeZone: 'Asia/Kolkata', // Set the time zone to IST
                                            })}
                                        </span> <br/>
                                        
                                            <span className="text-orange-500 font-bold">{product.trackingIdmail}</span>
                                          
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
                                    <td className="border p-2" rowSpan={groupedOrders[orderId].length}>                     
                                    
                                        {product.invoiceNo}
                                    </td>
                                    
                                    <td className="border p-2" rowSpan={groupedOrders[orderId].length}>                     
                                    
                                    {product.courier_company}
                                </td>
                                <td className="border p-2" rowSpan={groupedOrders[orderId].length}>                     
                                    
                                    {product.trackingURL}
                                </td>
                                <td className="border p-2" rowSpan={groupedOrders[orderId].length}>                     
                                    
                                {product.trackingId}
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

                           {/*  <td className="border p-2" rowSpan={groupedOrders[orderId].length}>                     
                                    
                                {product.Shipping_date}
                                </td> */}
                            {index === 0 && (
                            <td className="px-4 py-2 space-x-2">
                           {product.Shipping_date}
                  {/* <Link to={`/intransitlabel/${product.OrderId}`}>
                    <p className='text-xm text-red-500 font-bold'>Download Label</p>
                  </Link>
                  <Link to={`/intransitinvoice/${product.OrderId}`}>
                  <p className = "text-xm text-blue-500 font-bold">Download Invoice</p>

                  </Link> */}
                
              
              </td>
                                  )}
                                        </tr>
                    ))
                ))}
        </tbody>
    </table>

        {/* Pagination & Orders Per Page */}
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

export default InTransit;
