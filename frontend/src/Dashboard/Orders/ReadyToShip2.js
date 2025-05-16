import React, { useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {useParams, useNavigate } from 'react-router-dom';

const ReadyToShip = () => {
    
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
  const [isSaveButtonActive, setIsSaveButtonActive] = useState(false);
  const [unsavedOrders, setUnsavedOrders] = useState({});
  const { id } = useParams();
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost/waltzify_copy_fake/Backend/fetch_ready_to_ship.php');
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

const handleSave = () => {
    const ordersToSave = Object.keys(unsavedOrders).map(orderId => ({
        orderId,
        ...unsavedOrders[orderId]
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

            // Remove saved orders from the main groupedOrders state
            setGroupedOrders(prevOrders => {
                const updatedOrders = { ...prevOrders };
                Object.keys(unsavedOrders).forEach(orderId => {
                    delete updatedOrders[orderId];
                });
                return updatedOrders;
            });

            // Clear the unsavedOrders state after saving
            setUnsavedOrders({});
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
/* const handleInputChange = (orderId, field, value) => {
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
}; */
useEffect(() => {
    if (Object.keys(unsavedOrders).length > 0) {
        setIsSaveButtonActive(true);
    } else {
        setIsSaveButtonActive(false);
    }
}, [unsavedOrders]);

const handleInputChange = (orderId, field, value) => {
    setGroupedOrders(prevOrders => {
        const updatedOrders = { ...prevOrders };
        const previousOrder = { ...updatedOrders[orderId][0] };
        const updatedOrder = { ...previousOrder, [field]: value };

        updatedOrders[orderId] = [updatedOrder];

        setUnsavedOrders(prev => ({
            ...prev,
            [orderId]: updatedOrder
        }));

        return updatedOrders;
    });
};

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
  const handleCheckboxChange = (orderId) => {
    setSelectedOrders((prevSelected) => {
        const isSelected = prevSelected.includes(orderId);
        setIsDropdownActive(true);
        const updatedSelected = isSelected
            ? prevSelected.filter(id => id !== orderId)
            : [...prevSelected, orderId];
        
        return updatedSelected;
    });
};
const handleSelectAll = (event) => {
    const isChecked = event.target.checked;

    // Filter orders based on the current filter criteria (date range)
    const displayedOrderIds = Object.keys(groupedOrders)
        .filter((orderId) => {
            const order = groupedOrders[orderId][0];
            if ( order.shipping_status === "Processing" &&
                order.order_status !== "Cancelled" &&
                (!order.AWB_Number || !order.courier_company || !order.trackingId || !order.invoiceNo || !order.courier_charges)) {
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

            // Match the date filter criteria
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
        .slice(indexOfFirstOrder, indexOfLastOrder);

    // If the "Select All" checkbox is checked, select the currently displayed orders uniquely
    if (isChecked) {
        setSelectedOrders(prevSelected => {
            const uniqueSelected = new Set([...prevSelected, ...displayedOrderIds]);
            setIsDropdownActive(true);
            return Array.from(uniqueSelected);
        });
    } else {
        setSelectedOrders([]); // If unchecked, deselect all orders
        setIsDropdownActive(false);
    }
};

/* const handleSelectAll = (event) => {
    const isChecked = event.target.checked;

    // Filter orders based on the current filter criteria (date range)
    const displayedOrderIds = Object.keys(groupedOrders)
        .filter((orderId) => {
            const order = groupedOrders[orderId][0];
            // Exclude cancelled orders or those not in Processing status
            if (order.shipping_status !== 'Processing' || order.order_status === 'Cancelled') {
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

            // Match the date filter criteria
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
        .slice(indexOfFirstOrder, indexOfLastOrder); // Apply pagination filter to get currently visible orders

    // If the "Select All" checkbox is checked, select the currently displayed orders
    if (isChecked) {
        setSelectedOrders(displayedOrderIds);
    } else {
        setSelectedOrders([]); // If unchecked, deselect all orders
    }
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
const handleCancelOrder = () => {
  if (selectedOrders.length === 0) {
      alert('No orders selected for Cancelling.');
      return;
  }

  // Prompt user for cancellation reason
  const reason = prompt('Once you cancel you cannot undo it .Please enter the reason for cancelling these orders: ');
  
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
          setGroupedOrders(prevOrders => {
            const updatedOrders = { ...prevOrders };
            Object.keys(unsavedOrders).forEach(orderId => {
                delete updatedOrders[orderId];
            });
            return updatedOrders;
        });
          setSelectedOrders([]); // Clear selected orders after cancelling
      } else {
          alert('Error in cancelling orders: ' + data.error);
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
};
const handleBulkAction = (action) => {
  if (selectedOrders.length === 0) {
      alert('Please select at least one order to perform an action.');
      return;
  }

   if (action === 'cancelOrder') {
      handleCancelOrder(selectedOrders); // Pass the selected orders for cancellation
  }
  
};

  return (
    <div className="container mx-auto p-4">
        
      {/* Header with order count and select action */}
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


                 {/* Search Bar */}
                {/*  <div className="flex items-center border border-gray-300 rounded-lg py-2 px-4">
                     <input
                         type="text"
                         placeholder="Search for AWB, Order ID, etc."
                         className="outline-none w-full"
                     />
                 </div> */}
                 <span className="mb-6 mr-4 text-xl font-bold text-violet-400">
                    {new Set(selectedOrders).size} Order(s) Selected
                </span>
                
                 <button
                 onClick={handleSave}
                 disabled={!isSaveButtonActive}
                 className={`mb-6 ml-[8rem] px-4 py-2 rounded-lg text-white ${isSaveButtonActive ? 'bg-blue-500' : 'bg-gray-500 cursor-not-allowed'}`}
             >
                 Save
             </button>
                  
                  <div className="flex items-center border border-gray-300 rounded-lg py-2 px-4 mb-4">
                  
                 
                 <select
 onChange={(e) => handleBulkAction(e.target.value)}
 className="outline-none w-full"
 disabled={!isDropdownActive} // Dynamically enable/disable based on selected orders
>
 <option value="">Select an action</option>
 

     
         
         <option value="cancelOrder">Cancel Order</option>
         
    

     
 
</select>

         </div>
             </div> 

      {/* Orders Table */}
      <div className="bg-white shadow-md rounded-lg">
      <table className="w-full table-auto border-collapse bg-violet-20">
            <thead>
                <tr className="bg-violet-200">
                    <th className="px-4 py-2">
                       {/*  <input
                            type="checkbox"
                            className="mr-2 h-5 w-5"
                            checked={
                                new Set(
                                    Object.keys(groupedOrders)
                                        .filter(orderId => {
                                            const order = groupedOrders[orderId][0];
                                            return order.shipping_status === "Processing" && order.order_status !== "Cancelled";
                                        })
                                ).size === selectedOrders.length
                            }
                            onChange={handleSelectAll}
                        /> */}
                        Order Details
                    </th>
                    <th className="px-4 py-2">Delivery Address</th>
                    <th className="px-4 py-2">Tracking URL</th>
                    <th className="px-4 py-2">Invoice No</th>
                    <th className="px-4 py-2">AWB No</th>
                    <th className="px-4 py-2">Courier Company</th>
                    <th className="px-4 py-2">Courier Charges</th>
                    <th className="px-4 py-2">Download Label</th>
                </tr>
            </thead>
            {/* <tbody>
                {Object.keys(groupedOrders)
                    .filter(orderId => {
                        const order = groupedOrders[orderId][0];
                        if (order.shipping_status !== "Processing" || order.order_status === "Cancelled" ) {
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
                                            <span className='text-violet-400 bg-violet-100 rounded-full border-2 border-gray-500 flex items-center justify-center h-10 w-10'>
                                                <Link to = {`/receipt/${order.OrderId}`}><MoreHorizIcon /></Link>
                                            </span>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))
                    ))
                }
            </tbody> */}
            <tbody>
  {Object.keys(groupedOrders)
    .filter(orderId => {
      const order = groupedOrders[orderId][0];

      // Only show orders that are processing, not cancelled, and missing AWB/courier details
      if (
        order.shipping_status === "Processing" &&
        order.order_status !== "Cancelled" &&
        (!order.AWB_Number || !order.courier_company || unsavedOrders[orderId]) 
      ) {
        // Date filter logic (keep as is)
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
      }
      return false;  // Exclude orders that have AWB or courier details
    })
    .slice(indexOfFirstOrder, indexOfLastOrder) // Pagination logic
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
              {/*   <span className='text-violet-700 bg-violet-100 rounded-full border-2 border-gray-500 flex items-center justify-center h-10 w-10'> */}
                  <Link to={`/readytoshiplabel/${order.OrderId}`}>
                   {/*  <MoreHorizIcon /> */}
                   <p className = 'text-xs text-red-500 font-bold mb-1'>Download Label</p>

                  </Link>
                  
               {/*  </span> */}
                

                <Link to={`/readytoshipinvoice/${order.OrderId}`}>
                   <p className = 'text-xs text-blue-500 font-bold mb-3'>Download Invoice</p>
                  </Link>
                  
              </td>
            </>
          )}
        </tr>
      ))
    ))}
</tbody>

        </table>

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

export default ReadyToShip;
