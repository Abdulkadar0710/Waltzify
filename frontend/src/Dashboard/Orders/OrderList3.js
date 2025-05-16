import React, { useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link , useNavigate } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import logoPath from '../../asset/logo.png';

const OrderList = () => {
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [isDropdownActive, setIsDropdownActive] = useState(false); // To control dropdown activation
    const [groupedOrders,setGroupedOrders] = useState({});
    const [allOrders, setAllOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('New');
    const [orders, setOrders] = useState([]);
    const [dateRange, setDateRange] = useState('Today');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(''); // New state for selected status
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage, setOrdersPerPage] = useState(15);
    const [isSaveButtonActive, setIsSaveButtonActive] = useState(false);
    const [ordersData, setOrdersData] = useState({});

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    
    
/*     const handleCheckboxChange = (orderId) => {
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
    const handleCheckboxChange = (orderId) => {
        setSelectedOrders((prevSelected) => {
            const isSelected = prevSelected.includes(orderId);
            const updatedSelected = isSelected
                ? prevSelected.filter(id => id !== orderId)
                : [...prevSelected, orderId];
    
            // Update the dropdown activation state
            setIsDropdownActive(updatedSelected.length > 0);
            
            return updatedSelected;
        });
    };

   
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
    const handleSelectAll = (event) => {
        const isChecked = event.target.checked;
        
        const displayedOrderIds = Object.keys(groupedOrders)
            .filter((orderId) => {
                const order = groupedOrders[orderId][0];
                if (activeTab === 'Ready To Ship') {
                    return order.shipping_status === 'Processing' && order.order_status !== 'Cancelled';
                }
                if(activeTab === 'New')
                {
                    return order.order_status === 'New' && order.shipping_status !== 'Processing';
                }
                
                // Add tab-specific filtering logic here
                return true;
            })
            .slice(indexOfFirstOrder, indexOfLastOrder); // Pagination logic
    
        if (isChecked) {
            setSelectedOrders(displayedOrderIds); // Select only displayed orders
        } else {
            setSelectedOrders([]); // Deselect all
        }
    
        setIsDropdownActive(isChecked || displayedOrderIds.length > 0);
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
    const handleDownloadPDF = (order) => {
        const doc = new jsPDF();
        
        // Ship To Section
        doc.setFontSize(16);
        doc.text('Ship To', 10, 10);
        
        doc.setFontSize(12);
        doc.setFont('Helvetica', 'bold');
        doc.text(order.customerName || 'N/A', 10, 20); // Customer Name
        doc.setFont('Helvetica', 'normal');
        doc.text(order.Address1 || 'N/A', 10, 30); // Address
        doc.text(`${order.City || 'N/A'}, ${order.State || 'N/A'}, ${order.Pincode || 'N/A'}, India`, 10, 40); // City, State, Pincode
        
        doc.text(`Phone : ${order.phone || 'N/A'}`, 10, 50); // Phone Number
        //doc.text(`Alternate no. : ${order.alt_phone || 'N/A'}`, 10, 60); // Alternate Phone Number
        doc.text(`Email : ${order.email || 'N/A'}`, 10, 70); // Email Address
        doc.text(`GSTIN : ${order.gstin || 'N/A'}`, 10, 80); // GSTIN
        
        // Order Details Section
        let yOffset = 100; // Starting Y position for the order details
        
        doc.setFontSize(12);
        doc.text('ORDER NO .', 150, 10);
        doc.text(order.OrderId || 'N/A', 150, 20);
        
        doc.text('ORDER DATE :', 150, 30);
        doc.text(order.checkoutTimestamp ? new Date(order.checkoutTimestamp).toLocaleDateString() : 'N/A', 150, 40);
        
        // Product Details Section
        doc.text('PRODUCT DETAILS', 10, yOffset);
        yOffset += 10; // Move down for product details
       
        doc.text(`Product Name : ${order.orderItemProductName || 'N/A'}`, 10, 50); // Phone Number
        doc.text(`SKU : ${order.SKU || 'N/A'}`, 10, 50); // Phone Number
        doc.text(`Quantity : ${order.totalQuantityOrdered || 'N/A'}`, 10, 50); // Phone Number
        
        // Total Price
        doc.text('ORDER TOTAL :', 150, yOffset);
        doc.text(`₹${order.checkoutPrice || 'N/A'}`, 150, yOffset + 10);
        yOffset += 20;
    
        // Divider Line
        doc.setFontSize(12);
        doc.text('------------------------------------------', 10, yOffset);
        yOffset += 10;
        
        // Logo
        //const logoPath = '../../asset/logo.png'; // Replace with the correct path for the logo image
        doc.addImage(logoPath, 'PNG', 10, yOffset, 40, 30); // Adjust position and size as needed
        
        yOffset += 40; // Move down for store information
        
        // Store Information Section
        doc.setFontSize(16);
        doc.setFont('Helvetica', 'bold');
        doc.text('WALTZIFY STORE', 60, yOffset);
        
        doc.setFontSize(12);
        doc.setFont('Helvetica', 'normal');
        doc.text('C/o Waltzer India, Balaji Market Shop no . 1 ,', 60, yOffset + 10);
        doc.text('Hava Bangla road, Near Kundan Nagar,', 60, yOffset + 20);
        doc.text('INDORE, Madhya Pradesh, 452013', 60, yOffset + 30);
        
        doc.text('GST : 23BKBPS2369N1ZR', 60, yOffset + 40);
        doc.text('Phone : 07314245858; +91 9522582422', 60, yOffset + 50);
        doc.text('Email : sales@waltzerindia.com', 60, yOffset + 60);
        
        // Save the PDF
        doc.save(`Order_${order.OrderId}.pdf`);
    };
    
    const exportSelectedOrders = () => {
        // Group products by OrderId
        const groupedOrders = {};
    
        orders.forEach((order) => {
            if (selectedOrders.includes(order.OrderId)) {
                if (!groupedOrders[order.OrderId]) {
                    // If the order does not exist, initialize it with other details and an empty array for products
                    groupedOrders[order.OrderId] = {
                        "Order Details": `OrderId: ${order.OrderId}`,
                        "Customer Details": `${order.customerName} ${order.email}`,
                        "Price": `${order.checkoutPrice}`,
                        "Payment Mode": `${order.paymode}`,
                        "Payment Status": `${order.payment_status}`,
                        "Delivery Address": `${order.Address1}, ${order.City}, ${order.Pincode}`,
                        "Product Details": [],
                    };
                }
                // Add product details to the 'Product Details' array
                groupedOrders[order.OrderId]["Product Details"].push(`Product Name: ${order.orderItemProductName},SKU: ${order.SKU}, QTY: ${order.totalQuantityOrdered}`);
            }
        });
    
        // Convert groupedOrders to an array and concatenate product details
        const selectedOrdersData = Object.values(groupedOrders).map((order) => ({
            ...order,
            "Product Details": order["Product Details"].join(', '), // Concatenate products with a comma
        }));
    
        if (selectedOrdersData.length === 0) {
            return;
        }
    
        // Create a new worksheet with the filtered selected orders data
        const worksheet = XLSX.utils.json_to_sheet(selectedOrdersData);
        const workbook = XLSX.utils.book_new();
    
        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Selected Orders');
    
        // Write the workbook to a file
        XLSX.writeFile(workbook, 'selected_orders_list.xlsx');
    };
   const exportShippingDetails = () => {
    // Get selected order IDs for the active tab
    const selectedOrderIds = selectedOrders[activeTab] || [];

    // Log selected order IDs for debugging

    // Filter orders by selected order IDs
    const ordersToExport = selectedOrderIds.map(orderId => groupedOrders[orderId][0]);

    // Check if any orders are selected
    if (ordersToExport.length === 0) {
        alert('Please select at least one order to export.');
        return;
    }

    // Prepare data for Excel
    const data = [
        ['Order ID', 'Tracking ID', 'Invoice No', 'AWB No', 'Courier Company', 'Courier Charges']
    ];

    // Populate the Excel data with the selected orders
    ordersToExport.forEach(order => {
        data.push([
            order.OrderId,
            order.trackingId || '',
            order.invoiceNo || '',
            order.AWB_Number || '',
            order.courier_company || '',
            order.courier_charges || ''
        ]);
    });

    // Create a new workbook and add the data
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Shipping Details');

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, 'shipping_details.xlsx');
};

    
    
    
    
    /* const handleBulkAction = (action) => {
        if (action === 'readyToShip') {
            handleShipping(); // Call handleShipping with selected orders
        } else if (action === 'cancelOrder') {
            handleCancelOrder(); // Implement handleCancelOrder similarly
        }
    }; */

    // Trigger fetch when active tab changes
    useEffect(() => {
        const fetchOrdersByTab = async (tab) => {
            try {
                const response = await fetch(`http://localhost/waltzify_copy_fake/Backend/fetch_orders_by_tab.php?tab=${tab}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data); // Ensure this is an array
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrdersByTab(activeTab);
    }, [activeTab]);
    
    /* const handleDateRangeChange = (e) => {
        const value = e.target.value;
        setDateRange(value);

        // Clear date pickers if not 'Custom'
        if (value !== 'Custom') {
            setStartDate(null);
            setEndDate(null);
        }
    }; */
     

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await fetch('http://localhost/waltzify_copy_fake/Backend/fetch_all_orders.php');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(Array.isArray(data) ? data : []);
            setOrders(data);
            filterOrders(data);
            
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchProducts();
      }, []);
      

    /*    groupedOrders = products?.reduce((acc, product) => {
        if (!acc[product.OrderId]) {
            acc[product.OrderId] = [];
        }
        acc[product.OrderId].push(product);
        return acc;
    }, {}); */
    useEffect(() => {
        const newGroupedOrders = products?.reduce((acc, product) => {
            if (!acc[product.OrderId]) {
                acc[product.OrderId] = [];
            }
            acc[product.OrderId].push(product);
            return acc;
        }, {});
        setGroupedOrders(newGroupedOrders);
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

   
    {/*Handle Shipping */}
    /* const handleShipping = (OrderId) => {
        fetch('http://localhost/waltzify_copy_fake/Backend/User/shipping_status.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ OrderId: OrderId }) // Send the orderId in the request body
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Order shipped and email notification sent.');
                
            } else {
                alert('Error in shipping: ' + data.error);
            }
        })
    }; */
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
                setSelectedOrders([]); // Clear selected orders after shipping
            } else {
                alert('Error in shipping: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    {/*handle Cancle Order */}
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
    
    {/*Handle COD Orders */}
    const handleClick = (OrderId) => {
        // Handle updating payment status
        fetch('http://localhost/waltzify_copy_fake/Backend/update_cod_payment.php', {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json'
          },
          body: JSON.stringify({ OrderId: OrderId }) // Send the orderId in the request body
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('Payment status updated successfully');
          } else {
            alert('Error: ' + data.error);
          }
        })
        .catch(error => {
          alert('Network error: ' + error.message);
        });
    };
    {/*Handle COD Orders For No */}
    const handleClickNo = (OrderId) => {
        // Handle updating payment status to No
        fetch('http://localhost/waltzify_copy_fake/Backend/update_cod_statusNo.php', {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json'
          },
          body: JSON.stringify({ OrderId: OrderId }) // Send the orderId in the request body
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('Payment status updated successfully');
          } else {
            alert('Error: ' + data.error);
          }
        })
        .catch(error => {
          alert('Network error: ' + error.message);
        });
    };
    {/*Filtering the products*/}
    
    
    // Handle Download Manifest
    const handleDownloadManifest = (orderId) => {
        
    };

    // Handle Download Invoice
    const handleDownloadInvoice = (orderId) => {
        // Add your download logic here
    };
    // Filter orders based on selected date range
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
   

const handleSave = () => {
    const ordersToSave = Object.keys(groupedOrders).map(orderId => ({
        orderId,
        ...groupedOrders[orderId][0]
    }));


    fetch('http://localhost/waltzify_copy_fake/Backend/saveInvoiceDetails.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orders: ordersToSave }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Orders saved successfully!');
            setIsSaveButtonActive(false);

        } else {
            alert('Error saving orders: ' + (data.error || 'Unknown error'));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while saving orders.');
    });
};
{/* const handleInputChange = (orderId, field, value) => {
    setGroupedOrders(prevOrders => {
        const updatedOrders = { ...prevOrders };
        if (!updatedOrders[orderId]) {
            console.error(`Order with ID ${orderId} not found.`);
            return prevOrders;
        }

        const updatedOrder = { ...updatedOrders[orderId][0], [field]: value };
        updatedOrders[orderId] = [updatedOrder];

        // Check if all fields are filled
        const allDetailsFilled = Object.keys(updatedOrders).every(id => 
            updatedOrders[id][0].trackingId &&
            updatedOrders[id][0].invoiceNo &&
            updatedOrders[id][0].AWB_Number &&
            updatedOrders[id][0].courier_company &&
            updatedOrders[id][0].courier_charges
        );


        setIsSaveButtonActive(allDetailsFilled);
        setIsSaveButtonActive(true);
        return updatedOrders;
    });
}; */}
const handleInputChange = (orderId, field, value) => {
    setGroupedOrders(prevOrders => {
        // Clone previous orders object
        const updatedOrders = { ...prevOrders };

        if (!updatedOrders[orderId]) {
            console.error(`Order with ID ${orderId} not found.`);
            return prevOrders;
        }

        const previousOrder = { ...updatedOrders[orderId][0] };
        const updatedOrder = { ...previousOrder, [field]: value };
        updatedOrders[orderId] = [updatedOrder];

        // Instead of checking if all details are filled, just update the state to allow saving
        setIsSaveButtonActive(true);  // Button becomes active as long as any field is updated

        return updatedOrders;  // Return updated orders object
    });
};

const saveOrders = async () => {
    try {
        const response = await fetch('your-api-endpoint.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orders: Object.values(groupedOrders).flat() }),
        });

        const result = await response.json();

        if (response.ok) {
            // Handle successful update
            if (result.updatedOrders) {
                // Update your state with the latest order details
                setGroupedOrders(prevOrders => {
                    const updatedOrders = { ...prevOrders };
                    for (const [orderId, orderDetails] of Object.entries(result.updatedOrders)) {
                        updatedOrders[orderId] = [orderDetails];
                    }
                    return updatedOrders;
                });

                // Optionally, show success messages
                result.success.forEach(message => console.log(message));
            }
        } else {
            // Handle errors
            console.error('API Error:', result.error);
            result.error.forEach(errorMessage => console.error(errorMessage));
        }
    } catch (error) {
        console.error('Fetch Error:', error);
    }
};


    return (
        <div className="w-full p-6 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-lg rounded-lg p-6">
               

                {/* Tabs Section */}
                <div className="flex space-x-4 mb-6">
                {['New', 'Ready To Ship', 'In Transit', 'Delivered', 'Cancel Orders', 'Reconciliation', 'All'].map((tab) => (
                    <button
                        key={tab}
                        className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none ${
                            activeTab === tab
                                ? 'text-[#3B81F6] font-bold after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-[#3B81F6] after:bottom-0 after:left-0'
                                : 'text-gray-500 hover:text-[#3B81F6] hover:font-semibold'
                        }`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>


                {/* Filter Section */}
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


                    {/* Search Bar */}
                   {/*  <div className="flex items-center border border-gray-300 rounded-lg py-2 px-4">
                        <input
                            type="text"
                            placeholder="Search for AWB, Order ID, etc."
                            className="outline-none w-full"
                        />
                    </div> */}
                    <span className="mr-4 text-xl font-bold text-violet-400">{selectedOrders.length} Order(s) Selected</span>
                    {activeTab === 'Ready To Ship' && (
                    <button
                    onClick={handleSave}
                    disabled={!isSaveButtonActive}
                    className={`mt-4 px-4 py-2 rounded-lg text-white ${isSaveButtonActive ? 'bg-blue-500' : 'bg-gray-500 cursor-not-allowed'}`}
                >
                    Save
                </button>
                     )}
                     <div className="flex items-center border border-gray-300 rounded-lg py-2 px-4 mb-4">
                     
                     {/* <select
    onChange={(e) => handleBulkAction(e.target.value)}
    className="outline-none w-full"
    disabled={!isDropdownActive} // Dynamically enable/disable based on selected orders
>
    <option value="">Select an action</option>
    <option value="readyToShip">Ready to Ship</option>
    <option value="cancelOrder">Cancel Order</option>
    {activeTab === 'Ready To Ship' && (
            <option value="inTransit">In Transit</option>
    
            

        )}
    <option value="export">Export Orders</option>
                    </select> */}
                    <select
    onChange={(e) => handleBulkAction(e.target.value)}
    className="outline-none w-full"
    disabled={!isDropdownActive} // Dynamically enable/disable based on selected orders
>
    <option value="">Select an action</option>
    
    {activeTab === 'Ready To Ship' ? (
        // Show only these options if the active tab is 'Ready To Ship'
        <>
            
            <option value="cancelOrder">Cancel Order</option>
            <option value="exportReadyToShip">Export Orders</option>

        </>
    ) : (
        // Show the regular options if the active tab is not 'Ready To Ship'
        <>
            <option value="readyToShip">Ready to Ship</option>
            <option value="cancelOrder">Cancel Order</option>
            <option value="export">Export Orders</option>
        </>
    )}
</select>

            </div>
                </div> 

             
                
                
                {/* Orders Display */}
            <div className="w-full">
            {Object.keys(groupedOrders).length === 0 ? (
                <div className="w-full text-center p-12">
                    <img
                        src={require('../../asset/no_orders_found.webp')}
                        alt="No orders found"
                        className="mx-auto mb-4"
                    />
                    <p className="text-gray-600">No Orders Found for {activeTab}</p>
                </div>
            ) : (
            <>
         
{activeTab === 'New' && (
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
            {/* Helper function to filter orders based on date range */}
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
)}





           


{/* {activeTab === 'Ready To Ship' && (
    <div>
        <table className="w-full table-auto border-collapse bg-violet-20">
            <thead>
                <tr className="bg-violet-200">
                    <th className="px-4 py-2">
                        <input
                            type="checkbox"
                            className="mr-2 h-5 w-5"
                            checked={selectedOrders.length === Object.keys(groupedOrders)
                                .filter(orderId => 
                                    groupedOrders[orderId][0].shipping_status === "Processing" && 
                                    groupedOrders[orderId][0].order_status !== "Cancelled"
                                ).length
                            }
                            onChange={handleSelectAll}
                        />
                        Order Details
                    </th>
                    <th className="px-4 py-2">Delivery Address</th>
                    <th className="px-4 py-2">Tracking ID</th>
                    <th className="px-4 py-2">Invoice No</th>
                    <th className="px-4 py-2">AWB No</th>
                    <th className="px-4 py-2">Courier Company</th>
                    <th className="px-4 py-2">Courier Charges</th>
                    <th className="px-4 py-2">Action</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(groupedOrders)
                    .filter(orderId => {
                        // Filter orders with shipping_status === "Processing" and order_status !== "Cancelled"
                        const order = groupedOrders[orderId][0];
                        if (order.shipping_status !== "Processing" ||order.order_status === "Cancelled") {
                            return false;
                        }

                        // Date filter logic
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
                            // Custom date range
                            return orderDate >= startDate && orderDate <= endDate;
                        }
                        return true;
                    })
                    .slice(indexOfFirstOrder, indexOfLastOrder) // Adjust for pagination
                    .map((orderId, idx) => (
                        groupedOrders[orderId].map((order, index) => (
                            <tr key={`${orderId}-${index}`}>
                                {index === 0 && (
                                    <>
                                        <td className="px-4 py-2" rowSpan={groupedOrders[orderId].length}>
                                            <input
                                                type="checkbox"
                                                className="mr-2 h-5 w-5"
                                                checked={selectedOrders.includes(orderId)}
                                                onChange={() => handleCheckboxChange(orderId)}
                                            />
                                            {order.OrderId}
                                        </td>
                                        <td className="px-4 py-2" rowSpan={groupedOrders[orderId].length}>
                                            {order.Address1}
                                        </td>
                                        <td className="px-4 py-2" rowSpan={groupedOrders[orderId].length}>
                                            <input
                                                type="text"
                                                value={order.trackingId || ''}
                                                onChange={(e) => handleInputChange(orderId, 'trackingId', e.target.value)}
                                                className="border p-1 border-blue-500 rounded-xl"
                                                placeholder="Enter Tracking ID"
                                            />
                                        </td>
                                        <td className="px-4 py-2" rowSpan={groupedOrders[orderId].length}>
                                            <input
                                                type="text"
                                                value={order.invoiceNo || ''}
                                                onChange={(e) => handleInputChange(orderId, 'invoiceNo', e.target.value)}
                                                className="border p-1 border-blue-500 rounded-xl"
                                                placeholder="Enter Invoice No"
                                            />
                                        </td>
                                        <td className="px-4 py-2" rowSpan={groupedOrders[orderId].length}>
                                            <input
                                                type="text"
                                                value={order.AWB_Number || ''}
                                                onChange={(e) => handleInputChange(orderId, 'AWB_Number', e.target.value)}
                                                className="border p-1 border-blue-500 rounded-xl"
                                                placeholder="AWB No"
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                value={order.courier_company || ''}
                                                onChange={(e) => handleInputChange(orderId, 'courier_company', e.target.value)}
                                                className="border p-1 border-blue-500 rounded-xl"
                                                placeholder="Enter Courier Company"
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                value={order.courier_charges || ''}
                                                onChange={(e) => handleInputChange(orderId, 'courier_charges', e.target.value)}
                                                className="border p-1 border-blue-500 rounded-xl"
                                                placeholder="₹ Courier Charges"
                                            />
                                        </td>
                                        <td className="px-4 py-2 space-x-2">
                                            <span className='text-violet-400 bg-violet-100 rounded-full border-2 border-gray-500 flex items-center justify-center h-10 w-10'>
                                                <MoreHorizIcon />
                                            </span>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))
                    ))
                }
            </tbody>
        </table>
    </div>
)} */}
{activeTab === 'Ready To Ship' && (
    <div>
        <table className="w-full table-auto border-collapse bg-violet-20">
            <thead>
                <tr className="bg-violet-200">
                    <th className="px-4 py-2">
                        <input
                            type="checkbox"
                            className="mr-2 h-5 w-5"
                            checked={selectedOrders.length === Object.keys(groupedOrders)
                                .filter(orderId => 
                                    groupedOrders[orderId][0].shipping_status === "Processing" && 
                                    groupedOrders[orderId][0].order_status !== "Cancelled"
                                ).length
                            }
                            onChange={handleSelectAll}
                        />
                        Order Details
                    </th>
                    <th className="px-4 py-2">Delivery Address</th>
                    <th className="px-4 py-2">Tracking ID</th>
                    <th className="px-4 py-2">Invoice No</th>
                    <th className="px-4 py-2">AWB No</th>
                    <th className="px-4 py-2">Courier Company</th>
                    <th className="px-4 py-2">Courier Charges</th>
                    <th className="px-4 py-2">Action</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(groupedOrders)
                    .filter(orderId => {
                        const order = groupedOrders[orderId][0];
                        if (order.shipping_status !== "Processing" || order.order_status === "Cancelled") {
                            return false;
                        }

                        // Date filter logic
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
                    .map((orderId, idx) => (
                        groupedOrders[orderId].map((order, index) => (
                            <tr key={`${orderId}-${index}`}>
                                {index === 0 && (
                                    <>
                                        <td className="px-4 py-2" rowSpan={groupedOrders[orderId].length}>
                                            <input
                                                type="checkbox"
                                                className="mr-2 h-5 w-5"
                                                checked={selectedOrders.includes(orderId)}
                                                onChange={() => handleCheckboxChange(orderId)}
                                            />
                                            {order.OrderId}
                                        </td>
                                        <td className="px-4 py-2" rowSpan={groupedOrders[orderId].length}>
                                            {order.Address1}
                                        </td>
                                        <td className="px-4 py-2" rowSpan={groupedOrders[orderId].length}>
                                            <input
                                                type="text"
                                                value={order.trackingId || ''}
                                                onChange={(e) => handleInputChange(orderId, 'trackingId', e.target.value)}
                                                className="border p-1 border-blue-500 rounded-xl"
                                                placeholder="Enter Tracking ID"
                                            />
                                        </td>
                                        <td className="px-4 py-2" rowSpan={groupedOrders[orderId].length}>
                                            <input
                                                type="text"
                                                value={order.invoiceNo || ''}
                                                onChange={(e) => handleInputChange(orderId, 'invoiceNo', e.target.value)}
                                                className="border p-1 border-blue-500 rounded-xl"
                                                placeholder="Enter Invoice No"
                                            />
                                        </td>
                                        <td className="px-4 py-2" rowSpan={groupedOrders[orderId].length}>
                                            <input
                                                type="text"
                                                value={order.AWB_Number || ''}
                                                onChange={(e) => handleInputChange(orderId, 'AWB_Number', e.target.value)}
                                                className="border p-1 border-blue-500 rounded-xl"
                                                placeholder="AWB No"
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                value={order.courier_company || ''}
                                                onChange={(e) => handleInputChange(orderId, 'courier_company', e.target.value)}
                                                className="border p-1 border-blue-500 rounded-xl"
                                                placeholder="Enter Courier Company"
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                value={order.courier_charges || ''}
                                                onChange={(e) => handleInputChange(orderId, 'courier_charges', e.target.value)}
                                                className="border p-1 border-blue-500 rounded-xl"
                                                placeholder="₹ Courier Charges"
                                            />
                                        </td>
                                        <td className="px-4 py-2 space-x-2">
                                            <span className='text-violet-400 bg-violet-100 rounded-full border-2 border-gray-500 flex items-center justify-center h-10 w-10'onClick={() => handleDownloadPDF(order)}>
                                                <MoreHorizIcon />
                                            </span>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))
                    ))
                }
            </tbody>
        </table>
    </div>
)}






{activeTab === 'Delivered' && (
    <table className="w-full table-auto border-collapse">
        <thead>
            <tr>
                <th className="px-4 py-2">Order Details</th>
                <th className="px-4 py-2">Customer Details</th>
                <th className="px-4 py-2">Payment</th>
                <th className="px-4 py-2">Shipping Status</th>
                <th className="px-4 py-2">Order Status</th>
                <th className="px-4 py-2">Actions</th>
            </tr>
        </thead>
        <tbody>
            {Object.keys(groupedOrders)
                .filter(orderId =>
                    groupedOrders[orderId].some(order =>
                        order.payment_status === 'Success' &&
                        order.order_status === 'Delivered' &&
                        order.shipping_status === 'Shipped'
                    )
                )
                .map(orderId => (
                    groupedOrders[orderId].filter(order =>
                        order.payment_status === 'Success' &&
                        order.order_status === 'Delivered' &&
                        order.shipping_status === 'Shipped'
                    ).map((order, index) => (
                        <tr key={index}>
                            {index === 0 && (
                                <>
                                    <td className="px-4 py-2" rowSpan={groupedOrders[orderId].length}>{order.OrderId}</td>
                                    <td className="px-4 py-2" rowSpan={groupedOrders[orderId].length}>{order.payment_status}</td>
                                    <td className="px-4 py-2" rowSpan={groupedOrders[orderId].length}>{order.order_status}</td>
                                    <td className="px-4 py-2" rowSpan={groupedOrders[orderId].length}>{order.shipping_status}</td>
                                    <td className="px-4 py-2 space-x-2">
                                        <button className="bg-blue-500 text-white px-4 py-1 rounded-lg">
                                            <Link to={`/generatinginvoiceform/${order.OrderId}`}>Download Manifest</Link>
                                        </button>
                                        <button className="bg-green-500 text-white px-4 py-1 rounded-lg">
                                            <Link to={`/receipt_invoice/${order.OrderId}`}>Download Invoice</Link>
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))
                ))
            }
        </tbody>
    </table>
)}
        </>
    )}
</div>

{activeTab === 'All' && (
    <table className="w-full table-auto border-collapse bg-violet-20">
        <thead>
            <tr className="bg-violet-200" >
                <th className="border p-2">
                    {/* <input
                        type="checkbox"
                        className="mr-2 h-5 w-5"
                        checked={selectedOrders.length === Object.keys(groupedOrders).length}
                        onChange={handleSelectAll}
                    />   */}
                    Order Details
                </th>
                <th className="border p-2 ">Customer Details</th>
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
                                        {/* <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={selectedOrders.includes(orderId)}
                                            onChange={() => handleCheckboxChange(orderId)}
                                        /> */}
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
                                    <td
                                        className={`border p-2 font-bold ${product.shipping_status === 'Pending' ? 'text-red-500' : product.shipping_status === 'Processing' ? 'text-green-500' : product.shipping_status === 'Shipped' ? 'text-blue-500' : ''}`}
                                        rowSpan={groupedOrders[orderId].length}
                                        >
                                        {product.shipping_status}
                                    </td>
                                    <td
                                        className={`border p-2 font-bold ${product.order_status === 'New' ? 'text-green-500' :  product.order_status === 'Delivered' ? 'text-blue-500' : product.order_status === 'Cancelled' ? 'text-red-500' : ''}`}
                                        rowSpan={groupedOrders[orderId].length}
                                        >
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
)} 
{activeTab === 'Cancel Orders' && (
    <table className="w-full table-auto border-collapse bg-violet-20">
        <thead>
            <tr className="bg-violet-200">
                <th className="border p-2">Order Details</th>
                <th className="border p-2">Customer Details</th>
                <th className="border p-2">Payment</th>
                <th className="border p-2">Delivery Address</th>
                <th className="border p-2">Shipping Status</th>
                <th className="border p-2">Order Status</th>
                <th className="border p-2">Cancellation Reason</th>
            </tr>
        </thead>
        <tbody>
            {Object.keys(groupedOrders)
                .filter((orderId) => {
                    // Get the order object and check if the status is "Cancelled"
                    const order = groupedOrders[orderId][0];
                    if (order.order_status !== 'Cancelled') {
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
                                    <td
                                        className={`border p-2 font-bold ${product.shipping_status === 'Pending' ? 'text-red-500' : product.shipping_status === 'Processing' ? 'text-green-500' : product.shipping_status === 'Shipped' ? 'text-blue-500' : ''}`}
                                        rowSpan={groupedOrders[orderId].length}
                                    >
                                        {product.shipping_status}
                                    </td>
                                    <td
                                        className={`border p-2 font-bold ${product.order_status === 'New' ? 'text-green-500' : product.order_status === 'Delivered' ? 'text-blue-500' : product.order_status === 'Cancelled' ? 'text-red-500' : ''}`}
                                        rowSpan={groupedOrders[orderId].length}
                                    >
                                        {product.order_status}
                                    </td>
                                    <td className="border p-2" rowSpan={groupedOrders[orderId].length}>
                                        {product.cancel_reason}
                                    </td>
                                </>
                            )}
                        </tr>
                    ))
                ))}
        </tbody>
    </table>
)}
{/* {activeTab === 'In Transit' && (
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
                <th className="border p-2">Customer Details</th>
                <th className="border p-2">Payment</th>
                <th className="border p-2">Delivery Address</th>
                <th className="border p-2">Invoice Number</th>
                <th className="border p-2">AWB Number</th>
                <th className="border p-2">Tracking Id</th>
                <th className="border p-2">Courier Company</th>
                <th className="border p-2">Courier Charges</th>
                <th className="border p-2">Product Details</th>
            </tr>
        </thead>
        <tbody>
        {Object.keys(groupedOrders)
        .filter((orderId) => {
            const order = groupedOrders[orderId][0]; // Get the first product in the order
            
            // Exclude orders where the shipping_status is "Processing" or order_status is "Cancelled"
            if (order.shipping_status === 'Processing' || order.order_status === 'Cancelled') {
                return false;
            }
            
            // Filter by presence of required fields
            const hasRequiredFields = !!(order.invoiceNo?.trim() || order.trackingId?.trim() || order.AWB_Number?.trim() || order.courier_company?.trim() || order.courier_charges);

            // Include only orders that have required fields
            if (!hasRequiredFields) {
                return false; // Exclude orders that don't have all the required fields
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
        .slice(indexOfFirstOrder, indexOfLastOrder)
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
                            <td className="border p-2" rowSpan={groupedOrders[orderId].length}>
                                {product.invoiceNo || 'N/A'}
                            </td>
                            <td className="border p-2" rowSpan={groupedOrders[orderId].length}>
                                {product.AWB_Number || 'N/A'}
                            </td>
                            <td className="border p-2" rowSpan={groupedOrders[orderId].length}>
                                {product.trackingId || 'N/A'}
                            </td>
                            <td className="border p-2" rowSpan={groupedOrders[orderId].length}>
                                {product.courier_company || 'N/A'}
                            </td>
                            <td className="border p-2" rowSpan={groupedOrders[orderId].length}>
                                ₹{product.courier_charges || 'N/A'}
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
)} */}
{activeTab === 'In Transit' && (
    <table className="w-full table-auto border-collapse bg-violet-20">
        <thead>
            <tr className="bg-violet-200">
                <th className="border p-2">Customer Details</th>
                <th className="border p-2">Payment</th>
                <th className="border p-2">Delivery Address</th>
                <th className="border p-2">Invoice Number</th>
                <th className="border p-2">AWB Number</th>
                <th className="border p-2">Tracking Id</th>
                <th className="border p-2">Courier Company</th>
                <th className="border p-2">Courier Charges</th>
                <th className="border p-2">Product Details</th>
            </tr>
        </thead>
        <tbody>
            {Object.keys(groupedOrders)
                .filter((orderId) => {
                    const order = groupedOrders[orderId][0]; // Get the first product in the order

                    // Exclude orders where the shipping_status is "Processing" or order_status is "Cancelled"
                    if (order.shipping_status === 'Processing' || order.order_status === 'Cancelled') {
                        return false;
                    }

                    // Check if the order has at least one of the required fields
                    const hasRequiredFields = !!(order.invoiceNo?.trim() || order.trackingId?.trim() || order.AWB_Number?.trim() || order.courier_company?.trim() || order.courier_charges);

                    // If the order does not have required fields, exclude it
                    if (!hasRequiredFields) {
                        return false;
                    }

                    // Get the checkoutTimestamp for filtering by date range
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
                .map((orderId) => (
                    groupedOrders[orderId].map((product, index) => (
                        <tr key={`${orderId}-${index}`}>
                            {index === 0 && (
                                <>
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
                                        {product.AWB_Number}
                                    </td>
                                    <td className="border p-2" rowSpan={groupedOrders[orderId].length}>
                                        {product.trackingId}
                                    </td>
                                    <td className="border p-2" rowSpan={groupedOrders[orderId].length}>
                                        {product.courier_company}
                                    </td>
                                    <td className="border p-2" rowSpan={groupedOrders[orderId].length}>
                                        {product.courier_charges}
                                    </td>
                                    <td className="border p-2" rowSpan={groupedOrders[orderId].length}>
                                        {/* Add product details here if needed */}
                                        {product.productDetails}
                                    </td>
                                </>
                            )}
                        </tr>
                    ))
                ))}
        </tbody>
    </table>
)}


         
               {/* Pagination Buttons */}
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

export default OrderList;







{/* import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faFileAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver'; // To download the file 

function OrderList() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost/waltzify_copy_fake/Backend/fetch_all_orders.php');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(products);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
        XLSX.writeFile(workbook, 'order_list.xlsx');
    };

    const filteredProducts = products.filter(product => 
        product.pname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.checkoutPrice.toString().includes(searchQuery) ||
        product.quantity?.toString().includes(searchQuery) ||
        product.discount?.toString().includes(searchQuery)
    );

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handleClick = (OrderId) => {
        // Handle updating payment status
        fetch('http://localhost/waltzify_copy_fake/Backend/update_cod_payment.php', {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json'
          },
          body: JSON.stringify({ OrderId: OrderId }) // Send the orderId in the request body
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('Payment status updated successfully');
          } else {
            alert('Error: ' + data.error);
          }
        })
        .catch(error => {
          alert('Network error: ' + error.message);
        });
    };

    const handleClickNo = (OrderId) => {
        // Handle updating payment status to No
        fetch('http://localhost/waltzify_copy_fake/Backend/update_cod_statusNo.php', {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json'
          },
          body: JSON.stringify({ OrderId: OrderId }) // Send the orderId in the request body
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('Payment status updated successfully');
          } else {
            alert('Error: ' + data.error);
          }
        })
        .catch(error => {
          alert('Network error: ' + error.message);
        });
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleShipping = (OrderId) => {
        fetch('http://localhost/waltzify_copy_fake/Backend/User/shipping_status.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ OrderId: OrderId }) // Send the orderId in the request body
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Order shipped and email notification sent.');
            } else {
                alert('Error: ' + data.error);
            }
        })
        .catch(error => {
            alert('Network error: ' + error.message);
        });
    };
    
    const handleClickDownload = async (OrderId) => {
        try {
      
          // Fetch order details from the backend
          const response = await fetch('http://localhost/waltzify_copy_fake/Backend/getting_invoice.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ OrderId: OrderId }), // Send the OrderId in the request body
          });
      
          const data = await response.json();
      
          // Check if the API returned success
          if (data.success) {
            const orderDetails = data.orderDetails; // Extract order details from the response
      
            // Create a new PDF document
            const pdfDoc = await PDFDocument.create();
      
            // Add a page to the document
            const page = pdfDoc.addPage([600, 400]);
      
            // Set font size and draw text for the invoice
            page.drawText('Invoice', { x: 260, y: 360, size: 18, color: rgb(0, 0, 0) });
      
            // Draw order details on the page
            page.drawText(`Order ID: ${orderDetails.OrderId}`, { x: 50, y: 320, size: 12 });
            page.drawText(`Customer Name: ${orderDetails.customerName}`, { x: 50, y: 300, size: 12 });
            page.drawText(`Order Date: ${orderDetails.orderDate}`, { x: 50, y: 280, size: 12 });
      
            // Draw product details
            let productY = 260;
            orderDetails.products.forEach((product, index) => {
              page.drawText(
                `${index + 1}. ${product.name} (x${product.quantity}) - ₹${product.price}`,
                { x: 50, y: productY, size: 12 }
              );
              productY -= 20;
            });
      
            // Draw total amount
            page.drawText(`Total Amount: ₹${orderDetails.totalAmount}`, { x: 50, y: productY - 10, size: 12 });
      
            // Serialize the PDFDocument to bytes (Uint8Array)
            const pdfBytes = await pdfDoc.save();
      
            // Trigger the download
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            saveAs(blob, `Invoice_${orderDetails.OrderId}.pdf`);
          } else {
            alert('Error: ' + data.error); // Show an error if data.success is false
          }
        } catch (error) {
          alert('Network error: ' + error.message); // Handle network errors
        }
      }; 
    return (
        <div className='bg-[#F2F6F9] py-[2rem]'>
            <div className='flex flex-col lg:flex-row justify-between items-center px-[2rem] lg:px-[4rem]'>
                <p className='text-xl lg:text-3xl font-bold'>Orders List</p>
                <p className='text-gray-600'>Dashboard <FontAwesomeIcon icon={faArrowRight}/> Orders <FontAwesomeIcon icon={faArrowRight}/> <span className='font-light text-gray-500'>Orders List</span></p>
            </div>
            <div className='bg-white rounded-xl my-[2rem] mx-[2rem] lg:mx-[4rem] py-[2rem]'>
                <div className='px-[2rem] py-[1rem] flex flex-col lg:flex-row gap-[2rem] justify-between lg:items-center'>
                    <div className='border-2 flex items-center p-2 rounded-lg'>
                        <input 
                            className='w-[25rem] focus:outline-none' 
                            type="text" 
                            placeholder='Search Order by Name & Price....'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <FontAwesomeIcon icon={faSearch} color='#3B81F6'/>
                    </div>
                    <button onClick={handleExport} className='text-[#3B81F6] hover:text-white hover:bg-[#3B81F6] border-2 border-[#3B81F6] py-2 px-[2rem] rounded-xl'>
                        <FontAwesomeIcon className='pr-[1rem]' icon={faFileAlt}/>
                        Export All Orders
                    </button>
                </div>
                
                <div className='overflow-scroll mx-[1rem] lg:mx-[3rem]'>
                    <div className='min-w-[85rem]'>
                        <div className='bg-[#F2F6F9] mt-[1rem] lg:mx-[3rem] rounded-xl'>
                            <div className='mx-[4rem] flex justify-between items-center p-[1rem]'>
                                <p className='font-bold w-[20%]'>Product</p>
                                <p className='font-bold w-[10%] text-center'>Order ID</p>
                                <p className='font-bold w-[10%] text-center'>Price</p>
                                <p className='font-bold w-[10%] text-center'>Quantity</p>
                                <p className='font-bold w-[10%] text-center'>Payment</p>
                                <p className='font-bold w-[10%] text-center'>Payment Mode</p>
                                <p className='font-bold w-[10%] text-center'>Order Status</p>
                                <p className='font-bold w-[10%] text-center'>Shipping</p>
                                <p className='font-bold w-[10%] text-center'>Shipping Status</p>
                                <p className='font-bold w-[10%] text-center'>Amount Credited For COD</p>
                                <p className='font-bold w-[10%] text-center'>Download</p>
                            </div>
                        </div>
                        {currentProducts.map((product, index) => (
                        <div key={index} className='py-[0.5rem] flex items-center lg:mx-[4rem] justify-between'>
                            <div className='flex items-center gap-[0.5rem] w-[20%]'>
                                <img className='h-[4rem] w-[4rem]' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`} alt={product.pname} />
                                <p className='font-bold text-sm'>{product.pname}</p>
                            </div>
                            <p className='text-sm w-[10%] text-center'>#{product.OrderId}</p>
                            <p className='text-sm w-[10%] text-center'>₹{product.checkoutPrice}</p>
                            <p className='text-sm w-[10%] text-center'>{product.totalQuantityOrdered}</p>
                            <p className='p-1 text-xs text-green-500 w-[10%] text-center'>{product.payment_status}</p>
                            <p className='p-1 text-xs text-green-500 w-[10%] text-center'>{product.paymode}</p>
                            <p className='p-1 text-xs text-green-500 w-[10%] text-center'>{product.order_status}</p>
                            <button className='p-1 text-xs bg-blue-900 text-white rounded' onClick={() => handleShipping(product.OrderId)}>Ship Now</button>
                            <p className='p-1 text-xs text-green-500 w-[10%] text-center'>{product.shipping_status}</p>
                            
                            <div className='flex items-center gap-[0.5rem] w-[10%] justify-center'>
                                <button className='p-1 text-xs bg-red-500 text-white rounded' onClick={() => handleClick(product.OrderId)}>Yes</button>
                                <button className='p-1 text-xs bg-blue-500 text-white rounded' onClick={() => handleClickNo(product.OrderId)}>No</button>
                            </div>
                         <button className='p-1 text-xs bg-blue-500 text-white rounded' onClick={() => handleClickDownload(product.OrderId)}>Download</button> 

                        </div>        
                        ))}   
                    </div>
                </div>

                
                <div className='flex justify-between items-center my-[2rem] px-[4rem]'>
                    <button 
                        className={`px-4 py-2 bg-gray-300 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        onClick={handlePrevPage} 
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <p>Page {currentPage} of {totalPages}</p>
                    <button 
                        className={`px-4 py-2 bg-gray-300 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        onClick={handleNextPage} 
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderList;
 */}























{/* import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faFileAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';

function OrderList() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost/waltzify_copy_fake/Backend/fetch_all_orders.php');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(products);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
        XLSX.writeFile(workbook, 'order_list.xlsx');
    };

    const filteredProducts = products.filter(product => 
        product.pname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.checkoutPrice.toString().includes(searchQuery) ||
        product.quantity?.toString().includes(searchQuery) ||
        product.discount?.toString().includes(searchQuery)
    );
    const handleClick = (OrderId) => {
        fetch('http://localhost/waltzify_copy_fake/Backend/update_cod_payment.php', {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json'
          },
          body: JSON.stringify({ OrderId: OrderId }) // Send the orderId in the request body
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('Payment status updated successfully');
          } else {
            alert('Error: ' + data.error);
          }
        })
        .catch(error => {
          alert('Network error: ' + error.message);
        });
      };
      const handleClickNo = (OrderId) => {
        fetch('http://localhost/waltzify_copy_fake/Backend/update_cod_statusNo.php', {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json'
          },
          body: JSON.stringify({ OrderId: OrderId }) // Send the orderId in the request body
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('Payment status updated successfully');
          } else {
            alert('Error: ' + data.error);
          }
        })
        .catch(error => {
          alert('Network error: ' + error.message);
        });
      };

    return (
        <div className='bg-[#F2F6F9] py-[2rem]'>
            <div className='flex flex-col lg:flex-row justify-between items-center px-[2rem] lg:px-[4rem]'>
                <p className='text-xl lg:text-3xl font-bold'>Orders List</p>
                <p className='text-gray-600'>Dashboard <FontAwesomeIcon icon={faArrowRight}/> Orders <FontAwesomeIcon icon={faArrowRight}/> <span className='font-light text-gray-500'>Orders List</span></p>
            </div>
            <div className='bg-white rounded-xl my-[2rem] mx-[2rem] lg:mx-[4rem] py-[2rem]'>
                <div className='px-[2rem] py-[1rem] flex flex-col lg:flex-row gap-[2rem] justify-between lg:items-center'>
                    <div className='border-2 flex items-center p-2 rounded-lg'>
                        <input 
                            className='w-[25rem] focus:outline-none' 
                            type="text" 
                            placeholder='Search Order by Name & Price....'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <FontAwesomeIcon icon={faSearch} color='#3B81F6'/>
                    </div>
                    <button onClick={handleExport} className='text-[#3B81F6] hover:text-white hover:bg-[#3B81F6] border-2 border-[#3B81F6] py-2 px-[2rem] rounded-xl'>
                        <FontAwesomeIcon className='pr-[1rem]' icon={faFileAlt}/>
                        Export All Orders
                    </button>
                </div>
                
                <div className='overflow-scroll mx-[1rem] lg:mx-[3rem]'>
                    <div className='min-w-[85rem]'>
                        <div className='bg-[#F2F6F9] mt-[1rem] lg:mx-[3rem] rounded-xl'>
                            <div className='mx-[4rem] flex justify-between items-center p-[1rem]'>
                                <p className='font-bold w-[20%]'>Product</p>
                                <p className='font-bold w-[10%] text-center'>Order ID</p>
                                <p className='font-bold w-[10%] text-center'>Price</p>
                                <p className='font-bold w-[10%] text-center'>Quantity</p>
                                <p className='font-bold w-[10%] text-center'>Payment</p>
                                <p className='font-bold w-[10%] text-center'>Payment Mode</p>
                                <p className='font-bold w-[10%] text-center'>Order Status</p>
                                <p className='font-bold w-[10%] text-center'>Amount Credited For COD</p>
                            </div>
                        </div>
                        {filteredProducts.map((product, index) => (
                        <div key={index} className='py-[0.5rem] flex items-center lg:mx-[4rem] justify-between'>
                            <div className='flex items-center gap-[0.5rem] w-[20%]'>
                                <img className='h-[4rem] w-[4rem]' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`} alt={product.pname} />
                                <p className='font-bold text-sm'>{product.pname}</p>
                            </div>
                            <p className='text-sm w-[10%] text-center'>#{product.OrderId}</p>
                            <p className='text-sm w-[10%] text-center'>₹{product.checkoutPrice}</p>
                            <p className='text-sm w-[10%] text-center'>{product.totalQuantityOrdered}</p>
                            <p className='p-1 text-xs text-green-500  w-[10%] text-center'>{product.payment_status}</p>
                            <p className='p-1 text-xs text-green-500  w-[10%] text-center'>{product.paymode}</p>
                            <p className='p-1 text-xs text-green-500  w-[10%] text-center'>{product.order_status}</p>
                            <div className='flex items-center gap-[0.5rem] w-[10%] justify-center'>
                                <button className='p-1 text-xs bg-red-500 text-white rounded'onClick={() => handleClick(product.OrderId)}>Yes</button>
                                <button className='p-1 text-xs bg-blue-500 text-white rounded' onClick={() => handleClickNo(product.OrderId)}>No</button>
                            </div>
                        </div>        
                        ))}   
                    </div>
                </div>
                <hr className='mx-[2rem]'/>
            </div>
        </div>
    );
}

export default OrderList; */}





