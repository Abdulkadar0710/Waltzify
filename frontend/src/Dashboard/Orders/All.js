import React, { useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link , useNavigate } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileAlt } from '@fortawesome/free-solid-svg-icons';
const All = () => {
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
  const [selectedStatus, setSelectedStatus] = useState(''); 
  const [filteredProducts,setFilteredProducts] = useState([]);

  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost/waltzify_copy_fake/Backend/fetch_all_orders.php');
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
   
    const exportToExcel = () => {
        // Fetch all orders without applying any filters
        const allOrders = Object.keys(groupedOrders).map((orderId) => groupedOrders[orderId]);
    
        // Flatten the orders for export
        const productsToExport = allOrders.flat();
    
        const dataToExport = productsToExport.map((product, index) => {
            const order = product;
    
            // Calculate product price with discount
            const productPriceWithDiscount = (product.p_price * (1 - product.discount / 100)) / (1 + product.igstn / 100);
    
            // Calculate GST
            const productGST = productPriceWithDiscount * (order.igstn / 100);
    
            // Total price including GST
            const totalPriceWithGST = productPriceWithDiscount + productGST;
    
            // Ensure deliveryCharges is a valid number
            const deliveryCharges = Number(order.deliveryCharges) || 0;
    
            // Calculate modified delivery charges
            const modifiedDeliveryCharges = (deliveryCharges * 100) / totalPriceWithGST;
    
            // Initialize codCharges as 0 for non-COD orders
            let codCharges = 0;
    
            // COD charge calculation (only if the payment mode is COD)
            if (order.paymode === 'COD') {
                codCharges = (totalPriceWithGST + deliveryCharges) * 0.03;
            }
    
            // Calculate modified COD charges
            const modifiedCodCharges = (codCharges * 100) / totalPriceWithGST;
    
            // Total with GST, delivery, and COD charges
            const finalTotal = totalPriceWithGST + deliveryCharges + codCharges;
    
            return {
                'S.No': index + 1,
                'Order Id': order.OrderId,
                'Order Date': new Date(order.checkoutTimestamp).toLocaleDateString(),
                'Shipping Date': new Date(order.Shipping_date).toLocaleDateString(),
                'Invoice No': order.invoiceNo,
                'Customer Name': order.customerName,
                'Phone': order.Number,
                'Customer Address': order.Address1,
                'City': order.City,
                'Pincode': order.Pincode,
                'State': order.State,
                'Customer GSTIN Number': order.customerGSTIN,
                'Payment Mode': order.paymode,
                'Payment Status': order.payment_status,
                'Item Name': order.orderItemProductName,
                'SKU': order.SKU,
                'Quantity': order.totalQuantityOrdered,
                'Order Status': order.order_status,
                'Cancel Reason': order.cancel_reason,
                'Shipping Status': order.shipping_status,
                'Product Price (With Discount)': productPriceWithDiscount.toFixed(2),
                'GST %': order.igstn,
                'Product GST Amount': productGST.toFixed(2),
                'Total Product Price (With GST)': totalPriceWithGST.toFixed(2),
                'Including Tax Delivery Charges': `${modifiedDeliveryCharges.toFixed(2)} + ${(deliveryCharges - modifiedDeliveryCharges).toFixed(2)}`,
                'Delivery Charges': deliveryCharges.toFixed(2),
                'Including Tax COD Charges': order.paymode === 'COD' ? `${modifiedCodCharges.toFixed(2)} + ${(codCharges - modifiedCodCharges).toFixed(2)}` : 'N/A',
                'COD Charges': codCharges.toFixed(2),
                'Final Total': finalTotal.toFixed(2),
                'User Bill Amount': order.checkoutPrice,                
                'HSN Number': order.HSN,
                
            };
        });
    
        // Export to Excel
        if (dataToExport.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(dataToExport);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'All_Orders.xlsx';
            a.click();
            window.URL.revokeObjectURL(url);
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
  // Handle status change
/*   const handleStatusFilterChange = (e) => {
    const selected = e.target.value;
    setSelectedStatus(selected);
  
    if (selected === '') {
      // If "All Orders" is selected, show all products
      setFilteredProducts(products);
    } else {
      // Filter products based on the selected status in any of the status fields
      const filtered = products.filter((product) => {
        // Check if the selected status matches any of the order_status, payment_status, or shipping_status
        return (
          product.order_status === selected ||
          product.payment_status === selected ||
          product.shipping_status === selected
        );
      });
      setFilteredProducts(filtered);
    }
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
}; */
const handleStatusFilterChange = (e) => {
    const selected = e.target.value;
    setSelectedStatus(selected);
    filterOrders(filteredOrders); // Call filterOrders with the current filtered orders
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

    // Now filter based on selected status
    if (selectedStatus) {
        filtered = filtered.filter(order => {
            return (
                order.order_status === selectedStatus ||
                order.payment_status === selectedStatus ||
                order.shipping_status === selectedStatus
            );
        });
    }

    setFilteredOrders(filtered); // Update the filtered orders state
};

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

          {/* Order Status Filter */}
         <select
             className="border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-[#3B81F6] focus:outline-none"
             value={selectedStatus}
            onChange={handleStatusFilterChange} 
            
          >
            <option value="">All Orders</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Cancelled">Cancelled</option>
            <option value="New">New</option>
            <option value="Success">Success</option>
          </select> 
        </div>

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
            <th className="border p-2">Order Details</th>
            <th className="border p-2">Customer Details</th>
            <th className="border p-2">Payment</th>
            <th className="border p-2">Delivery Address</th>
            <th className="border p-2">Shipping Status</th>
            <th className="border p-2">Order Status</th>
            <th className="border p-2">Product Details</th>
        </tr>
    </thead>
    <tbody>
        {Object.keys(groupedOrders)
            .filter((orderId) => {
                // Get the checkoutTimestamp for filtering
                const orderDate = new Date(groupedOrders[orderId][0].checkoutTimestamp);
                const today = new Date();
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);
                const last7Days = new Date(today);
                last7Days.setDate(today.getDate() - 7);
                const last30Days = new Date(today);
                last30Days.setDate(today.getDate() - 30);
                
                // Apply filtering based on dateRange
                let dateMatch = true; // Initialize dateMatch as true
                if (dateRange === 'Today') {
                    dateMatch = orderDate.toDateString() === today.toDateString();
                } else if (dateRange === 'Yesterday') {
                    dateMatch = orderDate.toDateString() === yesterday.toDateString();
                } else if (dateRange === 'Last 7 days') {
                    dateMatch = orderDate >= last7Days && orderDate <= today;
                } else if (dateRange === 'Last 30 days') {
                    dateMatch = orderDate >= last30Days && orderDate <= today;
                } else if (dateRange === 'This month') {
                    dateMatch = orderDate.getMonth() === today.getMonth() && orderDate.getFullYear() === today.getFullYear();
                } else if (dateRange === 'Last month') {
                    const lastMonth = new Date(today);
                    lastMonth.setMonth(today.getMonth() - 1);
                    dateMatch = orderDate.getMonth() === lastMonth.getMonth() && orderDate.getFullYear() === lastMonth.getFullYear();
                } else if (dateRange === 'Custom') {
                    // If the user selects a custom date range
                    dateMatch = orderDate >= startDate && orderDate <= endDate;
                }

                // Apply filtering based on selected status
                const statusMatch = selectedStatus === '' || 
                    groupedOrders[orderId].some(product => 
                        product.order_status === selectedStatus || 
                        product.payment_status === selectedStatus || 
                        product.shipping_status === selectedStatus
                    );

                // Return true if both dateMatch and statusMatch are true
                return dateMatch && statusMatch;
            })
            .slice(indexOfFirstOrder, indexOfLastOrder) // Adjust for pagination
            .map((orderId) => (
                groupedOrders[orderId].map((product, index) => (
                    <tr key={`${orderId}-${index}`}>
                        {index === 0 && (
                            <>
                                <td className="border p-2" rowSpan={groupedOrders[orderId].length}>
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
                                <td className={`border p-2 font-bold ${product.shipping_status === 'Pending' || product.shipping_status === 'Cancelled' ? 'text-red-500' : product.shipping_status === 'Processing' ? 'text-green-500' : product.shipping_status === 'Shipped' ? 'text-blue-500' : ''}`} rowSpan={groupedOrders[orderId].length}>
                                    {product.shipping_status}
                                </td>
                                <td className={`border p-2 font-bold ${product.order_status === 'New' ? 'text-green-500' : product.order_status === 'Delivered' ? 'text-blue-500' : product.order_status === 'Cancelled' ? 'text-red-500' : ''}`} rowSpan={groupedOrders[orderId].length}>
                                    {product.order_status}
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

export default All;
