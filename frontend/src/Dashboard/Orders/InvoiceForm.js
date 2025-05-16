import React, { useState, useEffect } from 'react';
import {useParams, useNavigate } from 'react-router-dom';
const InvoiceForm = () => {
  // Define state variables for form fields
  const { id } = useParams();
  const [billingName, setBillingName] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [billingPhone, setBillingPhone] = useState('');
  const [billingEmail, setBillingEmail] = useState('');
  const [shippingName, setShippingName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const [shippingEmail, setShippingEmail] = useState('');
  const [orderNo, setOrderNo] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [PAN, setPAN] = useState('');
  const [FSSAI, setFSSAI] = useState('');
  const [GSTIN, setGSTIN] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [description, setDescription] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [taxRate, setTaxRate] = useState('');
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();


  {/* useEffect(() => {
    // Function to fetch user information
    const fetchUserInformation = async () => {
      try {
        const response = await fetch(`http://localhost/waltzify_copy_fake/Backend/User/fetch_user_information.php?id=${id}`);
        const data = await response.json();
  
        // Check if data is an array and has at least one item
        if (Array.isArray(data) && data.length > 0) {
          const userData = data[0]; // Access the first item in the array
          // Update state with fetched data
          setBillingName(userData.billingName || '');
          setBillingAddress(userData.billingAddress || '');
          setBillingPhone(userData.billingPhone || '');
          setBillingEmail(userData.billingEmail || '');
          setShippingName(userData.billingName || '');
          setShippingAddress(userData.billingAddress || '');
          setShippingPhone(userData.billingPhone || '');
          setShippingEmail(userData.billingEmail || '');
          setOrderNo(userData.OrderId || '');
          setOrderDate(userData.checkoutTimestamp || '');
          setInvoiceNo(userData.invoiceNo || '');
          setPAN(userData.Pan || '');
          setFSSAI(userData.fssai || '');
          setGSTIN(userData.gstin|| '');
          
          setTrackingId(userData.trackingId || '');
          setDescription(userData.orderItemProductName || '');
          setUnitPrice(userData.checkoutPrice || '');
          setQuantity(userData.quantity || 1);
          setTaxRate(userData.taxRate || '');
        } else {
          console.error('No data found or unexpected format', data);
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };
  
    fetchUserInformation();
  }, [id]);  */}
  useEffect(() => {
    // Function to fetch user information
    const fetchUserInformation = async () => {
      try {
        const response = await fetch(`http://localhost/waltzify_copy_fake/Backend/fetch_user_information.php?id=${id}`);
        const data = await response.json();
  
        // Check if data is an array and has at least one item
        if (Array.isArray(data) && data.length > 0) {
          // Initialize default values
          setProducts(data); // Store the list of products
          let billingName = '';
          let billingAddress = '';
          let billingPhone = '';
          let billingEmail = '';
          let shippingName = '';
          let shippingAddress = '';
          let shippingPhone = '';
          let shippingEmail = '';
          let orderNo = '';
          let orderDate = '';
          let invoiceNo = '';
          let PAN = '';
          let FSSAI = '';
          let GSTIN = '';
          let trackingId = '';
          let description = []; // Array to hold multiple product descriptions
          let unitPrice = 0;
          let quantity = 0;
          let taxRate = 0;
  
          data.forEach(item => {
            billingName = item.billingName || billingName;
            billingAddress = item.billingAddress || billingAddress;
            billingPhone = item.billingPhone || billingPhone;
            billingEmail = item.billingEmail || billingEmail;
            shippingName = item.billingName || shippingName; // assuming shipping details are same as billing
            shippingAddress = item.billingAddress || shippingAddress;
            shippingPhone = item.billingPhone || shippingPhone;
            shippingEmail = item.billingEmail || shippingEmail;
            orderNo = item.OrderId || orderNo;
            orderDate = item.checkoutTimestamp || orderDate;
            invoiceNo = item.invoiceNo || invoiceNo;
            PAN = item.Pan || PAN;
            FSSAI = item.fssai || FSSAI;
            GSTIN = item.gstin || GSTIN;
            trackingId = item.trackingId || trackingId;
            description.push(item.orderItemProductName || ''); // Add each product description
            unitPrice = item.checkoutPrice || unitPrice; // Assuming unitPrice is the same for all
            quantity += (item.quantity || 0); // Aggregate quantity
            taxRate = item.taxRate || taxRate; // Assuming tax rate is the same for all
          });
  
          // Update state with aggregated data
          setBillingName(billingName);
          setBillingAddress(billingAddress);
          setBillingPhone(billingPhone);
          setBillingEmail(billingEmail);
          setShippingName(shippingName);
          setShippingAddress(shippingAddress);
          setShippingPhone(shippingPhone);
          setShippingEmail(shippingEmail);
          setOrderNo(orderNo);
          setOrderDate(orderDate);
          setInvoiceNo(invoiceNo);
          setPAN(PAN);
          setFSSAI(FSSAI);
          setGSTIN(GSTIN);
          setTrackingId(trackingId);
          setDescription(description.join(', ')); // Join all descriptions with a comma
          setUnitPrice(unitPrice);
          setQuantity(quantity);
          setTaxRate(taxRate);
  
        } else {
          console.error('No data found or unexpected format', data);
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };
  
    fetchUserInformation();
  }, [id]);
  
  
  
  
    // Helper function to format the date
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const year = date.getFullYear();
      
      return `${day}-${month}-${year}`;
    };

  /* const handleInputChange = (event, setter) => {
    setter(event.target.value);
  }; */
  const handleInputChange = (event, index, field) => {
    const { value } = event.target;
    setProducts(prevProducts =>
      prevProducts.map((product, i) =>
        i === index ? { ...product, [field]: value } : product
      )
    );
  };
  const handleFormInputChange = (event, setState) => {
    const { value } = event.target;
    setState(value);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (billingName || billingAddress || billingPhone || billingEmail || shippingName || shippingAddress || shippingPhone || shippingEmail || orderNo || orderDate || invoiceNo || description || unitPrice || quantity || taxRate || PAN || FSSAI || GSTIN || trackingId) {
      try {
        const formData = new FormData();
        formData.append('billingName', billingName);
        formData.append('billingAddress', billingAddress);
        formData.append('billingPhone', billingPhone);
        formData.append('billingEmail', billingEmail);
        formData.append('shippingName', shippingName);
        formData.append('shippingAddress', shippingAddress);
        formData.append('shippingPhone', shippingPhone);
        formData.append('shippingEmail', shippingEmail);
        formData.append('orderNo', orderNo);
        formData.append('orderDate', orderDate);
        formData.append('invoiceNo', invoiceNo);
        formData.append('description', description);
        formData.append('unitPrice', unitPrice);
        formData.append('quantity', quantity);
        formData.append('taxRate', taxRate);
        formData.append('PAN', PAN);
        formData.append('FSSAI', FSSAI);
        formData.append('GSTIN', GSTIN);
        formData.append('trackingId', trackingId);

        const response = await fetch('http://localhost/waltzify_copy_fake/Backend/update_user_information.php', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok ${response.statusText}`);
        }

        const data = await response.json();
        if (data.result === 'Record Updated Successfully!') {
          setMsg('Records Updated successfully!');
          setTimeout(() => navigate('/orderlist'), 2000);
        } else {
          setError(data.result);
        }
      } catch (err) {
        setError('Error: ' + err.message);
      }
    } else {
      setError('At least one field is required!');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="max-w-4xl mx-auto p-4 border-2 border-black">
        {/* Billing Address */}
        <div className="flex justify-between">
          <div>
            <h2 className="font-bold">BILLING ADDRESS:</h2>
            <input
              type="text"
              name="billingName"
              value={billingName}
              onChange={(e) =>handleFormInputChange(e, setBillingName)}
              className="block border mb-2"
            />
            <input
              type="text"
              name="billingAddress"
              value={billingAddress}
              onChange={(e) => handleFormInputChange(e, setBillingAddress)}
              className="block border mb-2"
            />
            <input
              type="text"
              name="billingPhone"
              value={billingPhone}
              onChange={(e) =>handleFormInputChange(e, setBillingPhone)}
              className="block border mb-2"
            />
            <input
              type="email"
              name="billingEmail"
              value={billingEmail}
              onChange={(e) =>handleFormInputChange(e, setBillingEmail)}
              className="block border mb-2"
            />
          </div>
          {/* Shipping Address */}
          <div className="text-end">
            <h2 className="font-bold">SHIPPING ADDRESS:</h2>
            <input
              type="text"
              name="shippingName"
              value={shippingName}
              onChange={(e) => handleFormInputChange(e, setShippingName)}
              className="block border mb-2"
            />
            <input
              type="text"
              name="shippingAddress"
              value={shippingAddress}
              onChange={(e) => handleFormInputChange(e, setShippingAddress)}
              className="block border mb-2"
            />
            <input
              type="text"
              name="shippingPhone"
              value={shippingPhone}
              onChange={(e) => handleFormInputChange(e, setShippingPhone)}
              className="block border mb-2"
            />
            <input
              type="email"
              name="shippingEmail"
              value={shippingEmail}
              onChange={(e) => handleFormInputChange(e, setShippingEmail)}
              className="block border mb-2"
            />
          </div>
        </div>
        {/* Order and Invoice Details */}
        <div className="flex justify-between">
          <div className="text-start">
            <p><strong>ORDER NO.:</strong> <input type="text" name="orderNo" value={orderNo} onChange={(e) => handleFormInputChange(e, setOrderNo)} className="border mb-2" /></p>
            <p><strong>ORDER DATE:</strong> {formatDate(orderDate)}</p>
            <p><strong>INVOICE NO.:</strong> <input type="text" name="invoiceNo" value={invoiceNo} onChange={(e) => handleFormInputChange(e, setInvoiceNo)} className="border mb-2" /></p>
            <p><strong>PAN :</strong> <input type="text" name="pan" value={PAN} onChange={(e) => handleFormInputChange(e, setPAN)} className="border mb-2" /></p>
            <p><strong>FSSAI.:</strong> <input type="text" name="fssai" value={FSSAI} onChange={(e) => handleFormInputChange(e, setFSSAI)} className="border mb-2" /></p>
            <p><strong>GSTIN NO.:</strong> <input type="text" name="gstin" value={GSTIN} onChange={(e) => handleFormInputChange(e, setGSTIN)} className="border mb-2" /></p>
            
            <p><strong>TRACKING ID.:</strong> <input type="text" name="trackingId" value={trackingId} onChange={(e) => handleFormInputChange(e, setTrackingId)} className="border mb-2" /></p>
          </div>
        </div>
        {/* Order Items */}
        <div className="overflow-auto">
          <table className="w-full border-collapse border border-black mb-4">
            <thead>
              <tr>
                <th className="border-2 border-black p-2">Sl. No</th>
                <th className="border-2 border-black p-2">Description</th>
                <th className="border-2 border-black p-2">Unit Price</th>
                <th className="border-2 border-black p-2">Qty</th>
                <th className="border-2 border-black p-2">Net Amount</th>
                <th className="border-2 border-black p-2">Tax Rate (%)</th>
                <th className="border-2 border-black p-2">Tax Amount</th>
                <th className="border-2 border-black p-2">Total Amount</th>
              </tr>
            </thead>
            {/* <tbody>
              <tr>
                <td className="border border-black p-2">1</td>
                <td className="border border-black p-2">
                  <input
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => handleInputChange(e, setDescription)}
                    className="border w-full"
                  />
                </td>
                <td className="border border-black p-2">
                  <input
                    type="text"
                    name="unitPrice"
                    value={unitPrice}
                    onChange={(e) => handleInputChange(e, setUnitPrice)}
                    className="border w-full"
                  />
                </td>
                <td className="border border-black p-2">
                  <input
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => handleInputChange(e, setQuantity)}
                    className="border w-full"
                  />
                </td>
                <td className="border border-black p-2">
                  {unitPrice * quantity}
                </td>
                <td className="border border-black p-2">
                  <input
                    type="text"
                    name="taxRate"
                    value={taxRate}
                    onChange={(e) => handleInputChange(e, setTaxRate)}
                    className="border w-full"
                  />
                </td>
                <td className="border border-black p-2">
                {(unitPrice * quantity * (taxRate / 100)).toFixed(2)}
                </td>
                <td className="border border-black p-2">
                {(unitPrice * quantity + unitPrice * quantity * (taxRate / 100)).toFixed(2)}
                </td>
              </tr>
            </tbody> */}
            <tbody>
  {products.map((product, index) => (
    <tr key={product.orderItemId}>
      <td className="border border-black p-2">{index + 1}</td>
      <td className="border border-black p-2">
        <input
          type="text"
          name={`description-${index}`}
          value={product.orderItemProductName || ''}
          onChange={(e) => handleInputChange(e, index, 'orderItemProductName')}
          className="border w-full"
        />
      </td>
      <td className="border border-black p-2">
        <input
          type="text"
          name={`unitPrice-${index}`}
          /* value={product.p_price|| ''} */
          value={
            product.discount > 0
              ? (product.p_price - (product.p_price * product.discount) / 100).toFixed(2) // Calculate the discounted price and fix to 2 decimals
              : product.p_price || ''
          }
          onChange={(e) => handleInputChange(e, index, 'p_price')}
          className="border w-full"
        />
      </td>
      <td className="border border-black p-2">
        <input
          type="number"
          name={`quantity-${index}`}
          value={product.quantity || 1}
          onChange={(e) => handleInputChange(e, index, 'quantity')}
          className="border w-full"
        />
      </td>
      <td className="border border-black p-2">
        {/* {(product.p_price * product.quantity).toFixed(2)} */}
        {((product.p_price - (product.p_price * product.discount) / 100).toFixed(2)) * product.quantity }
      </td>
      <td className="border border-black p-2">
        <input
          type="text"
          name={`taxRate-${index}`}
          value={product.taxRate || ''}
          onChange={(e) => handleInputChange(e, index, 'taxRate')}
          className="border w-full"
        />
      </td>
      <td className="border border-black p-2">
        {((product.orderItemPrice * product.quantity * (product.taxRate / 100)) || 0).toFixed(2)}
      </td>
      <td className="border border-black p-2">
        {(
          (product.orderItemPrice * product.quantity) +
          (product.orderItemPrice * product.quantity * (product.taxRate / 100) || 0)
        ).toFixed(2)}
      </td>
    </tr>
  ))}
   {/* Footer Row */}
   <tr>
    <td colSpan="7" className="border border-black p-2 text-right font-bold">Total Amount:</td>
    <td className="border border-black p-2">
    ₹ {products.reduce((total, product) => {
        const itemTotal = (product.orderItemPrice * product.quantity) +
                          (product.orderItemPrice * product.quantity * (product.taxRate / 100) || 0);
        return total + itemTotal;
      }, 0).toFixed(2)}
    </td>
  </tr>
</tbody>

          </table>
        </div>
        {/* Submit Button */}
        <button type="submit" className="ml-[23rem] bg-blue-500 text-white p-2 rounded">Update Details</button>
      </div>
    </form>
  );
};

export default InvoiceForm;






{/*  import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const InvoiceForm = () => {
  
    const [billingName, setBillingName] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const [billingPhone, setBillingPhone] = useState("");
    const [billingEmail, setBillingEmail] = useState("");
    const [shippingName, setShippingName] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [shippingPhone, setShippingPhone] = useState("");
    const [shippingEmail, setShippingEmail] = useState("");
    const [orderNo, setOrderNo] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [invoiceNo, setInvoiceNo] = useState("");
    const [description, setDescription] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [taxRate, setTaxRate] = useState("");
    const [PAN, setPAN] = useState("");
    const [FSSAI, setFSSAI] = useState("");
    const [GSTIN, setGSTIN] = useState("");
    const [AWB, setAWB] = useState("");
    const [trackingId, setTrackingId] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [productData, setProductData] = useState({});
    const navigate = useNavigate();
  
    const handleInputChange = (e, setter) => {
      setError('');
      setter(e.target.value);
    };
  
    useEffect(() => {
      fetch('http://localhost/waltzify_copy_fake/Backend/User/fetch_user_information.php')
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
          setProductData(data);
          setBillingName(data.BillingName); // Default empty string
          setBillingAddress(data.billingAddress);
          setBillingPhone(data.billingPhone);
          setBillingEmail(data.billingEmail);
          setShippingName(data.shippingName); // Handle shipping information separately
          setShippingAddress(data.shippingAddress);
          setShippingPhone(data.shippingPhone);
          setShippingEmail(data.shippingEmail);

          setOrderDate(data.checkoutTimestamp);
          setOrderNo(data.OrderId);
          setInvoiceNo(data.invoiceNo);
          setPAN(data.Pan);
          setFSSAI(data.fssai);
          setGSTIN(data.gstin);
          setTaxRate(data.tax);
          
          setTrackingId(data.trackingId);
          setDescription(data.orderItemProductName);
          setUnitPrice(data.checkoutPrice);
          setQuantity(data.quantity);
        })
        .catch(error => {
          setError(error.message);
        });
    }, []);
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      if (billingName || billingAddress || billingPhone || billingEmail || shippingName || shippingAddress || shippingPhone || shippingEmail || orderNo || orderDate || invoiceNo || description || unitPrice || quantity || taxRate || PAN || FSSAI || GSTIN || AWB || trackingId) {
        try {
          const formData = new FormData();
          formData.append('billingName', billingName);
          formData.append('billingAddress', billingAddress);
          formData.append('billingPhone', billingPhone);
          formData.append('billingEmail', billingEmail);
          formData.append('shippingName', shippingName);
          formData.append('shippingAddress', shippingAddress);
          formData.append('shippingPhone', shippingPhone);
          formData.append('shippingEmail', shippingEmail);
          formData.append('orderNo', orderNo);
          formData.append('orderDate', orderDate);
          formData.append('invoiceNo', invoiceNo);
          formData.append('description', description);
          formData.append('unitPrice', unitPrice);
          formData.append('quantity', quantity);
          formData.append('taxRate', taxRate);
          formData.append('PAN', PAN);
          formData.append('FSSAI', FSSAI);
          formData.append('GSTIN', GSTIN);
          formData.append('AWB', AWB);
          formData.append('trackingId', trackingId);
  
          const response = await fetch('http://localhost/waltzify_copy_fake/Backend/User/update_user_information.php', {
            method: 'POST',
            body: formData,
          });
  
          if (!response.ok) {
            throw new Error(`Network response was not ok ${response.statusText}`);
          }
  
          const data = await response.json();
          if (data.result === 'Record Updated Successfully!') {
            setMsg('Records Updated successfully!');
            setTimeout(() => navigate('/'), 2000);
          } else {
            setError(data.result);
          }
        } catch (err) {
          setError('Error: ' + err.message);
        }
      } else {
        setError('At least one field is required!');
      }
    };
  

  return (

    <>
    
     <form onSubmit={handleFormSubmit}>
      <div className="max-w-4xl mx-auto p-4 border-2 border-black">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">INVOICE</h1>
          <div className="flex items-center">
            <i className="fas fa-shopping-bag text-3xl text-blue-500"></i>
            <span className="ml-2 text-lg font-bold">WALTZER INDIA</span>
          </div>
        </div>

        
       
        <div className="flex justify-between">
          <div>
            <h2 className="font-bold">BILLING ADDRESS:</h2>
            <input
              type="text"
              
              name="billingName"
              value={billingName}
              onChange={(e) => handleInputChange(e, setBillingName)} 

              className="block border mb-2"
            />
            <input
              type="text"
              
              name="billingAddress"
              value={billingAddress}
              onChange={(e) => handleInputChange(e, setBillingAddress)} 

              className="block border mb-2"
            />
            <input
              type="text"
            
              name="billingPhone"
              value={billingPhone}
              onChange={(e) => handleInputChange(e, setBillingPhone)} 
              className="block border mb-2"
            />
            <input
              type="email"
              
              name="billingEmail"
              value={billingEmail}
              onChange={(e) => handleInputChange(e, setBillingEmail)} 
              className="block border mb-2"
            />
            
           
          </div>
          

          
          <div className="text-end">
            <h2 className="font-bold">SHIPPING ADDRESS:</h2>
            <input
              type="text"
              
              name="shippingName"
              value={shippingName}
              onChange={(e) => handleInputChange(e, setShippingName)} 
              className="block border mb-2"
            />
            <input
              type="text"
             
              name="shippingAddress"
              value={shippingAddress}
              onChange={(e) => handleInputChange(e, setShippingAddress)} 
              className="block border mb-2"
            />
            <input
              type="text"
              
              name="shippingPhone"
              value={shippingPhone}
              onChange={(e) => handleInputChange(e, setShippingPhone)} 
              className="block border mb-2"
            />
            <input
              type="email"
             
              name="shippingEmail"
              value={shippingEmail}
              onChange={(e) => handleInputChange(e, setShippingEmail)} 
              className="block border mb-2"
            />
          </div>
        </div>

       
        <div className="flex justify-between">
          <div className="text-start">
            <p><strong>ORDER NO.:</strong> <input type="text" name="orderNo" value={orderNo} onChange={(e) => handleInputChange(e, setOrderNo)}  className="border mb-2" /></p>
            <p><strong>ORDER DATE:</strong> <input type="date" name="orderDate" value={orderDate} onChange={(e) => handleInputChange(e, setOrderDate)}  className="border mb-2" /></p>
            <p><strong>INVOICE NO.:</strong> <input type="text" name="invoiceNo" value={invoiceNo} onChange={(e) => handleInputChange(e, setInvoiceNo)}  className="border mb-2" /></p>
            <p><strong>PAN :</strong> <input type="text" name="pan" value={PAN} onChange={(e) => handleInputChange(e, setPAN)}  className="border mb-2" /></p>
            <p><strong>FSSAI.:</strong> <input type="text" name="fssai" value={FSSAI} onChange={(e) => handleInputChange(e, setFSSAI)}  className="border mb-2" /></p>
            <p><strong>GSTIN NO.:</strong> <input type="text" name="gstin" value={GSTIN} onChange={(e) => handleInputChange(e, setGSTIN)}  className="border mb-2" /></p>
            <p><strong>AWB NO.:</strong> <input type="text" name="awb" value={AWB} onChange={(e) => handleInputChange(e, setAWB)}  className="border mb-2" /></p>
            <p><strong>TRACKING ID.:</strong> <input type="text" name="trackingId" value={trackingId} onChange={(e) => handleInputChange(e, setTrackingId)}  className="border mb-2" /></p>
          </div>
        </div>

       
        <div className="overflow-auto">
          <table className="w-full border-collapse border border-black mb-4">
            <thead>
              <tr>
                <th className="border-2 border-black p-2">Sl. No</th>
                <th className="border-2 border-black p-2">Description</th>
                <th className="border-2 border-black p-2">Unit Price</th>
                <th className="border-2 border-black p-2">Qty</th>
                <th className="border-2 border-black p-2">Net Amount</th>
                <th className="border-2 border-black p-2">Tax Rate</th>
                <th className="border-2 border-black p-2">Tax Amount</th>
                <th className="border-2 border-black p-2">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2">1</td>
                <td className="border border-black p-2">
                  <input
                    type="text"
                    
                    name="description"
                    value={description}
                    onChange={(e) => handleInputChange(e, setDescription)} 
                    className="border w-full"
                  />
                </td>
                <td className="border border-black p-2">
                  <input
                    type="text"
                   
                    name="unitPrice"
                    value={unitPrice}
                    onChange={(e) => handleInputChange(e, setUnitPrice)} 
                    className="border"
                  />
                </td>
                <td className="border border-black p-2">
                  <input
                    type="number"
                    min={1}
                   
                    name="quantity"
                    value={quantity}
                    onChange={(e) => handleInputChange(e, setQuantity)} 
                    className="border"
                  />
                </td>
                <td className="border border-black p-2">
                  ₹ {(formData.unitPrice * formData.quantity).toFixed(2)}
                </td>
                <td className="border border-black p-2">
                  <input
                    type="text"
                   
                    name="taxRate"
                    value={taxRate}
                    onChange={(e) => handleInputChange(e, setTaxRate)} 
                    className="border"
                  />
                </td>
                <td className="border border-black p-2">
                  ₹ {((formData.unitPrice * formData.quantity * formData.taxRate) / 100).toFixed(2)}
                </td>
                <td className="border border-black p-2">
                  ₹ {(formData.unitPrice * formData.quantity + (formData.unitPrice * formData.quantity * formData.taxRate) / 100).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        
        <div className="flex justify-end mb-4 border-2">
          <div className="w-full">
            <div className="flex justify-between border-t border-black p-2">
              <span>TOTAL:</span>
              <span>₹ {(formData.unitPrice * formData.quantity + (formData.unitPrice * formData.quantity * formData.taxRate) / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-black p-2">
              <span>Amount in Words:</span>
              <span> Four Hundred Forty-nine only</span>
            </div>
          </div>
        </div>

        
        <div className="flex justify-between items-center">
          <div>
            <p>For WALTZER INDIA:</p>
          </div>
          <div className="text-center">
            <p>Authorized Signatory</p>
          </div>
        </div>
        <div className="text-center text-xs mt-4">
          <p>All disputes are subject to Madhya Pradesh jurisdiction only. Goods once sold will only be taken back or exchanged as per the store's exchange/return policy.</p>
        </div>
        <button type="submit" className="ml-[20rem] bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Update Information
    </button>
      </div>
      
      </form>
     
    </>
  );
};

export default InvoiceForm; 
 */}