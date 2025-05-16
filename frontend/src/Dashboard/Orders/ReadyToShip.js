import React, { useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import * as XLSX from 'xlsx';
import logoPath from '../../asset/logo.png';
import html2pdf from 'html2pdf.js';
import Prompt from './prompt'; 
import "./style.css"
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { toWords } from 'number-to-words';


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
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const { id } = useParams();
  const [showPrompt, setShowPrompt] = useState(false);
  const [shippingDates, setShippingDates] = useState({}); 
  const navigate = useNavigate('');
  const [companies,setCompanies] = useState([]);
  const [courierCompanyURLs, setCourierCompanyURLs] = useState({}); // State to hold courier URLs
  /* const courierCompanyURLs = {
    BlueDart: "https://www.bluedart.com/",
    Delhivery: "https://www.delhivery.com/",
    DHL: "https://www.dhl.com/en/express/tracking.html",
    DTDC: "https://www.dtdc.in/trace.asp",
    ecomExpress: "https://www.ecomexpress.in/tracking/",
    eKartLogistics: "https://ekartlogistics.com/",
    Xpressbees: "https://www.xpressbees.com/track",
  }; */
  
  
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

  useEffect(() => {
    // Fetch courier companies from the backend
    fetch('http://localhost/waltzify_copy_fake/Backend/Fetch_Courier_company.php')
      .then(response => response.json())
      .then(data => {
        // Assuming data is an array of objects
        const urls = {}; // Create an object to hold URLs
        data.forEach(company => {
          urls[company.Courier_Company] = company.Tracking_URL; // Map company name to its URL
        });
        setCompanies(data); // Set the companies state
        setCourierCompanyURLs(urls); // Set the URLs state
      })
      .catch(error => console.error('Error fetching courier companies:', error));
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
        if (selectedOrders.length > 0) {
          // Filter the products (orders) to include only selected orders
          const selectedProducts = products.filter(order => selectedOrders.includes(order.OrderId));
      
          if (selectedProducts.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(selectedProducts); // Convert selected orders to a worksheet
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
      
            // Create a binary Excel file and trigger download
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'selected_orders.xlsx'; // File name for the download
            a.click();
            window.URL.revokeObjectURL(url); // Clean up the URL
          } else {
            alert('No selected orders available to export!');
          }
        } else {
          alert('No orders selected for export!');
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

const handleCancelOrder = (reason) => {
    if (selectedOrders.length === 0) {
      alert('No orders selected for Cancelling.');
      return;
    }

    fetch('http://localhost/waltzify_copy_fake/Backend/cancel_order.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        OrderIds: selectedOrders,
        CancelReason: reason, // Pass the cancellation reason here
      }),
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
        // Remove the cancelled orders from groupedOrders
        setGroupedOrders(prevGroupedOrders => {
          const updatedGroupedOrders = { ...prevGroupedOrders };
          
          // Filter out the canceled orders
          selectedOrders.forEach(orderId => {
            delete updatedGroupedOrders[orderId];
          });

          return updatedGroupedOrders;
        });
        //setSelectedOrders([]); // Clear selected orders after cancelling
      } else {
        alert('Error in cancelling orders: ' + data.error);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  /* const handleDeliveryAction = (selectedCourier) => {
    if (selectedOrders.length === 0) {
      alert('Please select at least one order to perform an action.');
      return;
    }

    // Loop through selected orders and update the courier company and tracking URL
  selectedOrders.forEach((orderId) => {
    const currentDate = new Date().toISOString().split('T')[0]; 
    // Update courier company
    handleInputChange(orderId, 'courier_company', selectedCourier);

    // Update tracking URL
    const trackingURL = courierCompanyURLs[selectedCourier] || '';
    handleInputChange(orderId, 'trackingURL', trackingURL);
    setShippingDates(prev => ({
      ...prev,
      [orderId]: prev[orderId] || currentDate // Set current date if not already set
    }));
  });
  }; 
   */
  
  const handleDeliveryAction = (selectedCourier) => {
    if (selectedOrders.length === 0) {
      alert('Please select at least one order to perform an action.');
      return;
    }

    // Loop through selected orders and update the courier company and tracking URL
    selectedOrders.forEach((orderId) => {
      const currentDate = new Date().toISOString().split('T')[0];
      
      // Update courier company
      handleInputChange(orderId, 'courier_company', selectedCourier);

      // Update tracking URL based on selected courier
      const trackingURL = courierCompanyURLs[selectedCourier] || '';
      handleInputChange(orderId, 'trackingURL', trackingURL);
      
      setShippingDates(prev => ({
        ...prev,
        [orderId]: prev[orderId] || currentDate // Set current date if not already set
      }));
    });
  };
  const handleShippingDateChange = (orderId, value) => {
    setShippingDates(prev => ({
      ...prev,
      [orderId]: value // Update shipping date manually
    }));
  };
  const handleBulkAction = (action) => {
    if (selectedOrders.length === 0) {
      alert('Please select at least one order to perform an action.');
      return;
    }

    if (action === 'cancelOrder') {
      setShowPrompt(true);  // Show the prompt when the user selects cancelOrder
    }
    else if(action === 'downloadlabel')
    {
       handleDownloadLabel(selectedOrders);
    }
    else if(action === 'downloadinvoice')
    {
       handleDownloadInvoice(selectedOrders);
    }
    else if(action === 'export')
    {
      exportToExcel(selectedOrders);
    }
  };

  const handlePromptConfirm = (reason) => {
    setShowPrompt(false);  // Hide the prompt after confirmation
    handleCancelOrder(reason);  // Pass the reason from the prompt to handleCancelOrder
  };

  const handlePromptCancel = () => {
    setShowPrompt(false);  // Hide the prompt if the user cancels
  };

const handleDownloadLabel = async (selectedOrders) => {
  if (selectedOrders.length === 0) {
    alert('Please select at least one order to download.');
    return;
  }

  // Fetch order data for selected orders from backend
  try {
    const response = await fetch('http://localhost/waltzify_copy_fake/Backend/download_multiple_labels.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderIds: selectedOrders }),
    });

    const orderData = await response.json();

    if (!orderData || orderData.length === 0) {
      alert('No order data found.');
      return;
    }

    // Generate the PDF using html2pdf
    const pdfContent = orderData.map(order => ` 
      <div class="max-w-6xl h-auto my-0 mx-auto p-4 border-2 border-dashed border-black label-page" style="font-family: Arial, sans-serif; width: 6in; height: 4in;">
        <div class="flex justify-between mb-4">
          <div>
            <h2 class="font-bold text-lg">Ship To</h2>
            <p class="font-bold text-md">${order.shippingName}</p>
            <p>${order.billingAddress.length > 43 
            ? order.billingAddress.substring(0, 43) + ".." 
            : order.billingAddress}</p>
            <p class="font-bold">${order.City}, ${order.State}, ${order.Pincode}</p>
            <p>Phone: ${order.shippingPhone}</p>
            <p class="text-nowrap">Email: ${order.billingEmail}</p>
          </div>
          <div class="text-right">
            <p>ORDER NO.: ${order.OrderId}</p>
            <p>ORDER DATE: ${new Date(order.checkoutTimestamp).toLocaleDateString('en-GB')}</p>
            <p class="font-bold">Payment: ${order.paymode}</p>
            <p class="font-bold">ORDER TOTAL: ₹${(Number(order.checkoutPrice)).toFixed(2)}</p>
          </div>
        </div>
        <div class="border-2 border-dashed border-black"></div>
        <div class="flex items-center">
          <img src="${logoPath}" alt="Store logo" class="mr-4" style="width: 200px; height: 200px;" />
          <div>
            <h2 class="font-bold">WALTZIFY STORE</h2>
            <p class="text-md">C/o Waltzer India, Balaji Market Shop no. 1, Hava Bangla road, Near Kundan Nagar, INDORE, Madhya Pradesh, 452013</p>
            <p class="text-md">GST: 23BKBP2369N1ZR</p>
            <p class="text-md"><i class="fas fa-phone-alt"></i> 07314245858; +91 9522582422</p>
            <p class="text-md"><i class="fas fa-envelope"></i> sales@waltzerindia.com</p>
          </div>
        </div>
      </div>
    `).join('');
    
    const opt = {
      margin: 0, // Remove margin for edge-to-edge content
      filename: 'shipping_labels.pdf',
      html2canvas: { scale: 2 }, // High resolution for clarity
      jsPDF: { unit: 'in', format: [6, 4], orientation: 'landscape' }, // Set to 6x4 inches
    };
    
    // Convert the HTML content to PDF and download
    html2pdf().from(pdfContent).set(opt).save();
    
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};


const handleDownloadInvoice = async (selectedOrders) => {
  if (selectedOrders.length === 0) {
    alert('Please select at least one order to download.');
    return;
  }

  try {
    const response = await fetch('http://localhost/waltzify_copy_fake/Backend/download_multiple_invoice.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderIds: selectedOrders }),
    });

    const orderData = await response.json();

    if (!orderData || orderData.length === 0 || orderData.error) {
      alert(orderData.error || 'No order data found.');
      return;
    }

    // Generate the PDF using html2pdf
    const pdfContent = orderData.map((order, orderIndex) => {
      let productRows = '';
      order.products.forEach((product, index) => {
        productRows += `
          <tr>
            <td style="border: 1px solid black; padding: 5px;">${index + 1}</td>
            <td style="border: 1px solid black; padding: 5px;">${product.productName} | WI/${product.Id} (SKU - ${product.SKU}) HSN:${product.HSN}</td>
            <td style="border: 1px solid black; padding: 5px;">₹${Number(product.unitPrice).toFixed(2)}</td>
            <td style="border: 1px solid black; padding: 5px;">${product.quantity}</td>
            <td style="border: 1px solid black; padding: 5px;">₹${Number(product.totalProductPrice).toFixed(2)}</td>
            <td style="border: 1px solid black; padding: 5px;">${product.igstn}%</td>
            <td style="border: 1px solid black; padding: 5px;">₹${Number(product.totalTax).toFixed(2)}</td>
            <td style="border: 1px solid black; padding: 5px;">₹${Number(product.totalAmount).toFixed(2)}</td>
          </tr>
        `;
      });

      // Apply page-break for each invoice and padding between content and border
      const pageBreak = (orderIndex < orderData.length - 1) ? 'page-break-after: always;' : '';

      return `
        <div style="max-width: 800px; margin: 20px auto; padding: 20px; border: 2px solid black; padding: 10px; font-family: Arial, sans-serif; ${pageBreak}">
          <!-- Invoice Header and Title -->
          <h1 style="text-align:center; font-size: 16px; font-weight: bold;">INVOICE</h1>
          <div style="text-align: center; margin-bottom: 10px;">
              <h2 style="font-size: 16px; font-weight: bold;">WALTZER INDIA</h2>
          </div>

          <!-- Billing and Shipping Info -->
          <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
              <div>
                  <h2 style="font-size: 14px; font-weight: bold;">BILLING ADDRESS:</h2>
                  <p>${order.billingName}</p>
                  <p>${order.billingAddress}, ${order.City}-${order.Pincode}</p>
                  <p>${order.State}, India</p>
                  <p>Phone: ${order.billingPhone}</p>
                  <p>Email: ${order.billingEmail}</p>
                  <p>GSTIN No.: ${order.GSTIN || 'N/A'}</p>

                  <h2 style="font-size: 14px; font-weight: bold;">SHIPPING ADDRESS:</h2>
                  <p>${order.shippingName}</p>
                  <p>${order.billingAddress}, ${order.City}-${order.Pincode}</p>
                  <p>${order.State}, India</p>
                  <p>Phone: ${order.shippingPhone}</p>
                  <p>Email: ${order.billingEmail}</p>
              </div>

              <div style="text-align: right;">
                  <h2 style="font-size: 14px; font-weight: bold;">SOLD BY:</h2>
                  <p>WALTZER INDIA</p>
                  <p>Shop no 1, Balaji Market, Hawa Bangla Road, Kundan Nagar</p>
                  <p>INDORE-452013, Madhya Pradesh, India</p>
                  <p>State Code: 23</p>
                  <p>Phone: 07314245858</p>
                  <p>Mobile: 9522582422</p>
                  <p>Email: sales@waltzerindia.com</p>
                  <p>PAN: BKBPS2369N</p>
                  <p>GSTIN No.: 23BKBPS2369N1ZR</p>
                  <p>FSSAI: 21419850002107</p>
                  <div style="margin-top: 16px;">
                      <p><strong>ORDER NO.:</strong> ${order.OrderId}</p>
                      <p><strong>ORDER DATE:</strong> ${new Date(order.checkoutTimestamp).toLocaleDateString('en-GB')}</p>
                      <p><strong>INVOICE NO.:</strong> ${order.invoiceNo}</p>
                  </div>
              </div>
          </div>

          <!-- Product Table -->
          <table style="width: 100%; border-collapse: collapse; border: 1px solid black;">
            <thead>
              <tr>
                <th style="border: 2px solid black; padding: 5px;">Sl. No</th>
                <th style="border: 2px solid black; padding: 5px;">Description</th>
                <th style="border: 2px solid black; padding: 5px;">Unit Price</th>
                <th style="border: 2px solid black; padding: 5px;">Qty</th>
                <th style="border: 2px solid black; padding: 5px;">Net Amount</th>
                <th style="border: 2px solid black; padding: 5px;">Tax Rate</th>
                <th style="border: 2px solid black; padding: 5px;">Tax Amount</th>
                <th style="border: 2px solid black; padding: 5px;">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              ${productRows}
            </tbody>
          </table>
          
          <!-- Total and Footer -->
          <div style="margin-top: 10px; width: 100%; border-top: 1px solid black; padding-top: 6px;">
            <div style="display: flex; justify-content: space-between; padding: 8px; border-bottom: 1px solid black;">
                <span>GROSS TOTAL:</span>
                <span>₹${order.totalAmount.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 6px; border-bottom: 1px solid black;">
                <span>COURIER CHARGES (Inclusive GST):</span>
                <span>₹${Number(order.deliveryCharges).toFixed(2)}</span>
            </div>
            <!-- COD Charges -->
    <div style="display: flex; justify-content: space-between; padding: 6px; border-bottom: 1px solid black;">
        <span style="text-align: left;">COD & OTHER CHARGES (Inclusive GST):</span>
        <span style="text-align: right;">
            ₹${order.paymode === 'COD' 
                ? ((Number(order.totalAmount) + Number(order.deliveryCharges)) * 0.03).toFixed(2) 
                : '0.00'}
        </span>
    </div>

    <!-- Final Total -->
    <div style="display: flex; justify-content: space-between; padding: 6px; border-bottom: 1px solid black;">
        <strong style="text-align: left;">FINAL TOTAL:</strong>
        <strong style="text-align: right;">
            ₹${(order.paymode === 'COD' 
                 ? (Number(order.totalAmount) + Number(order.deliveryCharges) + (Number(order.totalAmount) + Number(order.deliveryCharges)) * 0.03) 
                 : (Number(order.totalAmount) + Number(order.deliveryCharges))).toFixed(2)}
        </strong>
    </div>
    <!-- Amount in Words -->
    <div style="display: flex; justify-content: space-between; padding: 6px;"> 
  <strong style="text-align: left;">
    Amount in Words :
    ${(() => {
      const amount = order.paymode === 'COD'
        ? (Number(order.totalAmount) + Number(order.deliveryCharges) + (Number(order.totalAmount) + Number(order.deliveryCharges)) * 0.03)
        : (Number(order.totalAmount) + Number(order.deliveryCharges));

      // Split the amount into integer and decimal parts
      const [integerPart, decimalPart] = amount.toFixed(2).split('.');

      // Convert the integer part to words and remove any commas
      const integerInWords = toWords(Number(integerPart)).replace(/,/g, '');

      // Convert the decimal part to words if it exists and remove any commas
      const decimalInWords = decimalPart ? toWords(Number(decimalPart)).replace(/,/g, '') : '';

      // Return the final string with both integer and decimal parts in words
      return integerInWords.charAt(0).toUpperCase() + integerInWords.slice(1) + 
             (decimalPart ? ` and ${decimalInWords} paise` : '') + ' only';
    })()}
  </strong>
</div>
</div>


                  <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                      <div>
                          <p>For WALTZER INDIA:</p>
                      </div>
                      <div style="text-align: center;">
                          <p>Authorized Signatory</p>
                      </div>
                  </div>

                  <div style="text-align: center; font-size: 10px; margin-top: 16px;">
                      <p>All disputes are subject to Madhya Pradesh jurisdiction only. Goods once sold will only be taken back or exchanged as per the store's exchange/return policy.</p>
                  </div>
              </div>
      `;
    }).join('');

    // Generate the PDF
    html2pdf()
      .from(pdfContent)
      .set({
        filename: 'multiple_invoices.pdf',
        margin: [10, 0],
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      })
      .save();
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

 
  return (
    <div className="container mx-auto p-4">
        
      {/* Header with order count and select action */}
      <div className="flex items-center justify-evenly mb-6">
                 
                      
                     
                 {/* Status Filter */}
                 <div className="flex items-center justify-between ">
                 <div className="flex items-center">
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
    <div className="flex space-x-4 relative z-50 ml-2">
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
                
                 <button
                 onClick={handleSave}
                 disabled={!isSaveButtonActive}
                 className={` ml-[8rem] px-4 py-2 rounded-lg text-white ${isSaveButtonActive ? 'bg-blue-500' : 'bg-gray-500 cursor-not-allowed'}`}
             >
                 Save
             </button>
                  
             
                  <div className="flex items-center border border-gray-300 rounded-lg py-2 px-4">
                  
                 
                  <div>
      {/* Your dropdown */}
       
      
     {/*  <select
        onChange={(e) => handleDeliveryAction(e.target.value)}
        className="outline-none w-full"
        disabled={selectedOrders.length === 0}
      >
        <option value="">Select Courier Company</option>
        <option value="BlueDart">Blue Dart</option>
        <option value="Delhivery">Delhivery</option>
        <option value="DHL">DHL</option>
        <option value="DTDC">DTDC</option>
        <option value="ecomExpress">Ecom Express</option>
        <option value="eKartLogistics">eKart Logistics</option>
        <option value="Xpressbees">Xpressbees</option>
      </select> */}
      <select
        onChange={(e) => handleDeliveryAction(e.target.value)}
        className="outline-none w-full"
        disabled={selectedOrders.length === 0}
        id="courierCompany"
      >
        <option value="">Select Courier Company</option>
        {companies.map((company) => (
          <option key={company.Id} value={company.Courier_Company}>
            {company.Courier_Company} {/* Display the company name */}
          </option>
        ))}
      </select>

      {/* Conditional rendering of the Prompt */}
      {showPrompt && (
        <Prompt 
          message="Once you cancel, you cannot undo it. Please enter the reason for cancelling these orders:"
          onConfirm={handlePromptConfirm}
          onCancel={handlePromptCancel}
        />
      )}
    </div>

         </div>
         <div>
         <select
        onChange={(e) => handleBulkAction(e.target.value)}
        className="outline-none w-[10rem] border-[2px] p-2 text-md rounded "
        disabled={selectedOrders.length === 0}
      >
        <option value="">Select an action</option>
        <option value="cancelOrder">Cancel Order</option>
        <option value="downloadlabel">Download Label</option>
        <option value="downloadinvoice">Download Invoice</option>
        <option value="export">Export Orders</option>
      </select>
      </div>
             </div> 

      {/* Orders Table */}
      <div className="bg-white shadow-md rounded-lg">
      <table className="w-full table-auto border-collapse bg-violet-20">
            <thead>
                <tr className="bg-violet-200">
                    <th className="px-4 py-2">
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
                    <th className="px-4 py-2">Delivery Address</th>
                    <th className="px-4 py-2">Courier Company</th>
                    <th className="px-4 py-2">Tracking URL</th> 
                    <th className="px-4 py-2">Tracking ID</th> 
                    <th className="px-4 py-2">Shipping Date</th>
                    
                    {/* <th className="px-4 py-2">Courier Charges</th> */}
                    {/* <th className="px-4 py-2">Download Label</th> */}
                </tr>
            </thead>
            <tbody>
  {Object.keys(groupedOrders)
    .filter(orderId => {
      const order = groupedOrders[orderId][0];

      // Only show orders that are processing, not cancelled, and missing courier details
      if (
        order.shipping_status === "Processing" &&
        order.order_status !== "Cancelled" &&
        (!order.courier_company || unsavedOrders[orderId]) 
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
      return false;  // Exclude orders that have  or courier details
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
              <td className="px-4 py-2">
                <input
                  type="text"
                  value={order.courier_company || ''}
                  onChange={(e) => handleInputChange(orderId, 'courier_company', e.target.value)}
                  className="border p-1 border-blue-500 rounded-xl"
                  placeholder="Enter Courier Company"
                />
              </td>
              <td className="px-4 py-2" rowSpan={groupedOrders[orderId].length}>
                <input
                  type="text"
                  value={order.trackingURL|| ''}
                  onChange={(e) => handleInputChange(orderId, 'trackingURL', e.target.value)}
                  className="border p-1 border-blue-500 rounded-xl"
                  placeholder="Enter Tracking URL"
                />
              </td>
              <td className="px-4 py-2" rowSpan={groupedOrders[orderId].length}>
                <input
                  type="text"
                  value={order.trackingId || ''}
                  onChange={(e) => handleInputChange(orderId, 'trackingId', e.target.value)}
                  className="border p-1 border-blue-500 rounded-xl"
                  placeholder="Enter Tracking Id"
                />
              </td> 
             
              
              <td className="px-4 py-2">
                      <input
                        type="date"
                        value={shippingDates[orderId] || new Date().toISOString().split('T')[0]}
                        onChange={(e) => handleShippingDateChange(orderId, e.target.value)}
                        className="border p-1 border-blue-500 rounded-xl"
                      />
                    </td>
              
           {/*    <td className="px-4 py-2 space-x-2">
             
                  <Link to={`/readytoshiplabel/${order.OrderId}`}>
                   
                   <p className = 'text-xs text-red-500 font-bold mb-1'>Download Label</p>

                  </Link>
                  
               
                

                <Link to={`/readytoshipinvoice/${order.OrderId}`}>
                   <p className = 'text-xs text-blue-500 font-bold mb-3'>Download Invoice</p>
                  </Link>
                  
              </td> */}
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