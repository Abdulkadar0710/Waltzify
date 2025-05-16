import React, { useState, useEffect,useRef } from 'react';
import logoPath from '../../asset/logo.png';
import {useParams, useNavigate } from 'react-router-dom';
import { toWords } from 'number-to-words';
import html2pdf from 'html2pdf.js';
const ReciptP2 = () => {
    const { id } = useParams();
    const [billingName, setBillingName] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [state,setState] = useState('');
    const [SKU,setSKU] = useState('');
    const [pincode,setPincode] = useState('');
    const [paymode,setPaymode] = useState('');
    const [city,setCity] = useState('');
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
    const pdfRef = useRef();
    useEffect(() => {
      // Function to fetch user information
      const fetchUserInformation = async () => {
        try {
          const response = await fetch('http://localhost/waltzify_copy_fake/Backend/download_multiple_invoice.php');
          const data = await response.json();
    
          // Check if data is an array and has at least one item
          if (Array.isArray(data) && data.length > 0) {
            // Initialize default values
            setProducts(data); // Store the list of products
            let billingName = '';
            let billingAddress = '';
            let billingPhone = '';
            let pincode = '';
            let paymode = '';
            let city = '';
            let state = '';
            let billingEmail = '';
            let SKU = '';
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
              pincode = item.Pincode || pincode;
              paymode = item.paymode || paymode;
              state = item.State || state;
              city = item.City || city;
              shippingName = item.shippingName || shippingName; // assuming shipping details are same as billing
              shippingAddress = item.billingAddress || shippingAddress;
              shippingPhone = item.shippingPhone || shippingPhone;
              shippingEmail = item.billingEmail || shippingEmail;
              SKU = item.SKU || SKU;
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
            setPincode(pincode);
            setPaymode(paymode);
            setState(state);
            setCity(city);
            setShippingName(shippingName);
            setShippingAddress(shippingAddress);
            setShippingPhone(shippingPhone);
            setShippingEmail(shippingEmail);
            setSKU(SKU);
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
    }, []);
     /*  useEffect(() => {
          // Function to fetch user information
          const fetchUserInformation = async () => {
            try {
              const response = await fetch(`http://localhost/waltzify_copy_fake/Backend/User/fetch_invoice_Details.php?id=${id}`);
              const data = await response.json();
        
              // Check if data is an array and has at least one item
              if (Array.isArray(data) && data.length > 0) {
                // Initialize default values
                setProducts(data); // Store the list of products
                let billingName = '';
                let billingAddress = '';
                let billingPhone = '';
                let pincode = '';
                let paymode = '';
                let city = '';
                let state = '';
                let billingEmail = '';
                let SKU = '';
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
                  pincode = item.Pincode || pincode;
                  paymode = item.paymode || paymode;
                  state = item.State || state;
                  city = item.City || city;
                  shippingName = item.shippingName || shippingName; // assuming shipping details are same as billing
                  shippingAddress = item.billingAddress || shippingAddress;
                  shippingPhone = item.shippingPhone || shippingPhone;
                  shippingEmail = item.billingEmail || shippingEmail;
                  SKU = item.SKU || SKU;
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
                setPincode(pincode);
                setPaymode(paymode);
                setState(state);
                setCity(city);
                setShippingName(shippingName);
                setShippingAddress(shippingAddress);
                setShippingPhone(shippingPhone);
                setShippingEmail(shippingEmail);
                setSKU(SKU);
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
        }, [id]); */
        const handleDownloadPdf = () => {
            const element = pdfRef.current;
            const opt = {
                margin: 0.5,
                filename: `Label_${orderNo}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            };
            html2pdf().from(element).set(opt).save();
        };
  return (
    <>
           <button 
      className='flex items-center justify-center text-xl text-white bg-orange-500 border-2 border-transparent hover:bg-white hover:text-orange-500 hover:border-orange-500 transition-all duration-300 ease-in-out px-6 py-3 rounded-md shadow-sm hover:shadow-md mt-4 ml-4'
      onClick={() => navigate('/orderlist', { state: { activeTab: 'In Transit' } })}
    >
      {/* Arrow Icon */}
      Back
    </button>
          <div ref={pdfRef} className="container mx-auto p-8 border-2  mt-5">
                    <div className="border-2 border-black border-dotted p-4">
                        <div className="flex justify-between">
                            <div>
                                <p className="font-bold">Ship To</p>
                                <p className="font-bold">{shippingName}</p>
                                <p>{billingAddress}</p>
                                <p className="font-bold">{city} {pincode} {state}, India</p>
                                <p>Phone : <span className="font-bold">{shippingPhone}</span></p>
                                <p>Email : <span className="font-bold">{billingEmail}</span></p>
                                <p>GSTIN :</p>
                            </div>
                            <div>
                                <p><span className='font-bold'>ORDER NO. </span><span className="ml-4">{orderNo}</span></p>
                                <p><span className='font-bold'>ORDER DATE : </span><span className="ml-4">{orderDate}</span></p>
                               {/*  <p><span className='font-bold'>PRODUCT DETAILS : </span> <span className="ml-4">
    {description.length > 25 ? description.slice(0, 25) + '...' : description}
  </span></p> */}
                                <p><span className='font-bold'>SKU : </span><span className="ml-4">{SKU}</span></p>
                                <p><span className='font-bold'>QTY. </span><span className="ml-4">{quantity}</span></p>
                                <p><span className='font-bold'>Payment :</span> <span className="ml-4">{paymode}</span></p>
                                <p><span className='font-bold'>ORDER TOTAL :</span> <span className="ml-4">₹{unitPrice}</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="border-2 border-black border-dotted">
                        <div className="flex items-center "> 
                            <img src={logoPath} alt="Store logo" className="mr-4 w-[10rem] h-[10rem]"/>
                            <div>
                                <p className="font-bold">WALTZIFY STORE</p>
                                <p>C/o Waltzer India, Balaji Market Shop no . 1 ,</p>
                                <p>Hawa Bangla road, Near Kundan Nagar</p>
                                <p>INDORE, Madhya Pradesh, 452013</p>
                                <p>GST : 23BKBPS2369N1ZR</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 mt-4">
                            <i className="fas fa-phone-alt mr-2"></i>
                            <p>07314245858; +91 9522582422</p> 
                            <div className="flex items-center ml-auto">
                            <i className="fas fa-envelope mr-2"></i>
                            <p>sales@waltzerindia.com</p>
                        </div>
                        </div>
                       
                    </div>
                </div>
                      
            <div className="flex justify-center">
    <button className="bg-blue-500 text-white p-2 mt-4 hover:bg-blue-700" onClick={handleDownloadPdf}>
        Download Invoice as PDF
    </button>
</div>
    </>
  )
}

export default ReciptP2
