import React, { useState, useEffect,useRef } from 'react';
import {useParams ,Link , useNavigate} from 'react-router-dom';
import { toWords } from 'number-to-words';
import html2pdf from 'html2pdf.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; 
import logoPath from '../../asset/logo.png';

const Recipt = () => {
    const { id } = useParams();
    const [billingName, setBillingName] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [state,setState] = useState('');
  const [pincode,setPincode] = useState('');
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
  const [IGSTN, setIGSTN] = useState('');
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
            const response = await fetch(`http://localhost/waltzify_copy_fake/Backend/fetch_invoice_Details.php?id=${id}`);
            const data = await response.json();
      
            // Check if data is an array and has at least one item
            if (Array.isArray(data) && data.length > 0) {
              // Initialize default values
              setProducts(data); // Store the list of products
              let billingName = '';
              let billingAddress = '';
              let billingPhone = '';
              let pincode = '';
              let city = '';
              let state = '';
              let billingEmail = '';
              let shippingName = '';
              let shippingAddress = '';
              let shippingPhone = '';
              let shippingEmail = '';
              let orderNo = '';
              let orderDate = '';
              let invoiceNo = '';
              let GSTIN  = '';
              let FSSAI = '';
              let IGSTN = '';
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
                state = item.State || state;
                city = item.City || city;
                shippingName = item.shippingName || shippingName; // assuming shipping details are same as billing
                shippingAddress = item.billingAddress || shippingAddress;
                shippingPhone = item.shippingPhone || shippingPhone;
                shippingEmail = item.billingEmail || shippingEmail;
                orderNo = item.OrderId || orderNo;
                orderDate = item.checkoutTimestamp || orderDate;
                invoiceNo = item.invoiceNo || invoiceNo;
                FSSAI = item.fssai || FSSAI;
                GSTIN = item.GSTIN || GSTIN;
                IGSTN = item.igstn || IGSTN;
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
              setState(state);
              setCity(city);
              setShippingName(shippingName);
              setShippingAddress(shippingAddress);
              setShippingPhone(shippingPhone);
              setShippingEmail(shippingEmail);
              setOrderNo(orderNo);
              setOrderDate(orderDate);
              setInvoiceNo(invoiceNo);
              setFSSAI(FSSAI);
              setIGSTN(IGSTN);
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
      /* const handleDownloadPdf = () => {
        const element = pdfRef.current;
        const opt = {
            margin: 0.5,
            filename: `Invoice_${orderNo}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().from(element).set(opt).save();
    }; */
    const handleDownloadPdf = () => {
      const element = pdfRef.current;
      const opt = {
          margin: 0.5,
          filename: `Invoice_${orderNo}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'A3', orientation: 'portrait' }
      };
      html2pdf().from(element).set(opt).save();
  };

 
  return (
    <>
       <button 
      className='flex items-center justify-center text-xl text-white bg-orange-500 border-2 border-transparent hover:bg-white hover:text-orange-500 hover:border-orange-500 transition-all duration-300 ease-in-out px-6 py-3 rounded-md shadow-sm hover:shadow-md mt-4 ml-4'
      onClick={() => navigate('/orderlist', { state: { activeTab: 'Delivered' } })}
    >
      {/* Arrow Icon */}
      Back
    </button>
       <div ref={pdfRef}  className="max-w-4xl mx-auto p-4 border-2 border-black">
                    <div className="flex flex-col justify-between items-center mb-4">
                        <h1 className="text-xl text-center font-bold">INVOICE</h1>
                        <div className="flex items-center">
                            <i className="fas fa-shopping-bag text-3xl text-blue-500"></i>
                            <span className="ml-2 text-lg font-bold">WALTZER INDIA</span>
                             {/* <img src={logoPath} alt="Store logo" className="w-[10rem] h-[10rem] mt-2"/>  */}
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <h2 className="font-bold">BILLING ADDRESS:</h2>
                            <p>{billingName}</p>
                            <p>{billingAddress}</p>
                            <p>{billingAddress}, {city}-{pincode}</p>
                            <p>{state}, India</p>
                            <p>Phone : {billingPhone}</p>
                            <p>Email : {billingEmail}</p>
                            <p>GSTIN No. :{GSTIN}</p>

                        <div className="mb-4 mt-4">
                        <h2 className="font-bold">SHIPPING ADDRESS :</h2>
                        <p>{shippingName}</p>
                        <p>{billingAddress}</p>
                        <p>{billingAddress},{city}-{pincode}</p>
                        <p>{state}, India</p>
                        <p>Phone : {shippingPhone}</p>
                        <p>Email : {billingEmail}</p>
                        
                    </div>
                        </div>
                        <div className='text-end'>
                            <h2 className="font-bold">SOLD BY:</h2>
                            <p>WALTZER INDIA</p>
                            <p>Shop no 1, Balaji Market, Hawa Bangla <br /> Road, Kundan Nagar INDORE-452013</p>
                            <p>Madhya Pradesh, India</p>
                            <p><span className='font-bold'> State Code :</span> 23</p>
                            <p><span className='font-bold'>Ph :</span> 07314245858</p>
                            <p><span className='font-bold'>Mob no. : </span>9522582422</p>
                            <p><span className='font-bold'>Email : </span>sales@waltzerindia.com</p>
                            <p><span className='font-bold'>PAN : </span>BKBPS2369N</p>
                            <p><span className='font-bold'>GSTIN No. : </span>23BKBPS2369N1ZR</p>
                            <p><span className='font-bold'>FSSAI : </span>21419850002107</p>

                            <div className='mt-5'>
                            <p><span className='font-bold'>ORDER NO. : </span>{orderNo}</p>
                            <p><span className='font-bold'>ORDER DATE: </span>{orderDate}</p>
                            <p><span className='font-bold'>INVOICE NO. :</span>{invoiceNo}</p>
                            </div>
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
                            {/* <tbody>
                                <tr>
                                    <td className="border border-black p-2">1</td>
                                    <td className="border border-black p-2">{description}</td>
                                    <td className="border border-black p-2">₹ {Number(unitPrice).toFixed(2)}</td>
                                    <td className="border border-black p-2">{quantity}</td>
                                    <td className="border border-black p-2">₹{Number(unitPrice).toFixed(2)}</td>
                                    <td className="border border-black p-2">{IGSTN}% IGST</td>
                                    <td className="border border-black p-2">
                                        ₹{(Number(unitPrice) * (IGSTN / 100)).toFixed(2)} 
                                    </td>
                                    <td className="border border-black p-2">
                                      ₹{(Number(unitPrice) + (Number(unitPrice) * (IGSTN / 100))).toFixed(2)}
                                    </td>
                                </tr>
                            </tbody> */}
                           <tbody>
            {products.map((product, index) => (
                <tr key={index}>
                    <td className="border border-black p-2">{index + 1}</td>
                    <td className="border border-black p-2">{product.orderItemProductName}| WI/{product.Id}(SKU - {product.SKU}) HSN:{product.HSN}</td>
                    <td className="border border-black p-2">₹{Number((product.p_price * (1 - product.discount / 100)) / (1 + product.igstn / 100)).toFixed(2)}</td> 
                   {/*  <td className="border border-black p-2">₹ {95 * 100 / (100+ 18)}</td> */}
                  {/*   <td className="border border-black p-2">₹ {Number(product.p_price - (product.p_price * (product.discount / 100))).toFixed(2)}</td> */}
                    <td className="border border-black p-2">{product.quantity}</td>
                    <td className="border border-black p-2">
                        ₹ {(Number((product.p_price * (1 - product.discount / 100)) / (1 + product.igstn / 100)) * product.quantity).toFixed(2)}
                    </td>
                    <td className="border border-black p-2">{product.igstn}% IGST</td>
                    <td className="border border-black p-2">
                    ₹ {(((product.p_price * (1 - product.discount / 100) / (1 + product.igstn / 100)) * (product.igstn / 100)) * product.quantity).toFixed(2)}
</td>
<td className="border border-black p-2">
₹ {(
        Number((product.p_price * (1 - product.discount / 100)) / (1 + product.igstn / 100)) * product.quantity + 
        Number(((product.p_price * (1 - product.discount / 100)) / (1 + product.igstn / 100)) * (product.igstn / 100) * product.quantity)
    ).toFixed(2)}
</td>

                </tr>
            ))}
        </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end mb-4 border-2">
                        <div className="w-full">
                              {/* Gross Total */}
        <div className="flex justify-between border-t border-black p-2">
            <span>GROSS TOTAL:</span>
            <span>
                ₹
                {products.reduce((total, product) => { 
                    const productTotal = Number((product.p_price * (1 - product.discount / 100)) / (1 + product.igstn / 100)) * product.quantity;
                    const taxAmount = ((product.p_price * (1 - product.discount / 100) / (1 + product.igstn / 100)) * (product.igstn / 100)) * product.quantity;
                    return total + (productTotal + taxAmount);
                }, 0).toFixed(2)}
            </span>
        </div>

          {/* Courier Charges */}
          <div className="flex justify-between border-t border-black p-2">
            <span>COURIER CHARGES (Inclusive GST%) :</span>
            <span>
                ₹ {products.reduce((total, product) => Number(product.deliveryCharges || 0), 0).toFixed(2)}
            </span>
        </div>

 {/* COD & Other Charges */}
{/* COD & Other Charges */}
{/* <div className="flex justify-between border-t border-black p-2">
    <span>COD & Other Charges:</span>
    <span>
        ₹
        {(
            (() => {
                // Step 1: Calculate Gross Total (products with discount and tax)
                const grossTotal = products.reduce((total, product) => {
                    const productTotal = Number(product.p_price - (product.p_price * (product.discount / 100))) * product.quantity;
                    const taxAmount = productTotal * (product.igstn / 100);
                    return total + productTotal + taxAmount;
                }, 0);

                // Step 2: Calculate Courier Charges
                const courierCharges = products.reduce((total, product) =>  Number(product.deliveryCharges || 0), 0);

                // Step 3: Apply COD charges (3% of Gross Total + Courier Charges)
                const codCharges = (grossTotal + courierCharges) * 0.03;

                // Return the COD charges
                return codCharges.toFixed(2);
            })()
        )}
    </span>
</div> */}
<div className="flex justify-between border-t border-black p-2">
    <span>COD & Other Charges (Inclusive GST%) :</span>
    <span>
        ₹
        {(
            (() => {
                // Step 1: Calculate Gross Total (products with discount and tax)
                const grossTotal = products.reduce((total, product) => {
                    const productTotal = Number((product.p_price * (1 - product.discount / 100)) / (1 + product.igstn / 100)) * product.quantity;
                    const taxAmount = ((product.p_price * (1 - product.discount / 100) / (1 + product.igstn / 100)) * (product.igstn / 100)) * product.quantity;
                    return total + (productTotal + taxAmount);
                }, 0);

                // Step 2: Calculate Courier Charges
                const courierCharges = products.reduce((total, product) =>  Number(product.deliveryCharges || 0), 0);

                // Step 3: Apply COD charges ONLY if any product has paymode === 'COD'
                const codCharges = products.some(product => product.paymode === 'COD') 
                    ? (grossTotal + courierCharges) * 0.03 
                    : 0;

                // Return the COD & Other Charges
                return codCharges.toFixed(2);
            })()
        )}
    </span>
</div>






        {/* FINAL TOTAL */}
        {/* FINAL TOTAL */}
        <div className="flex justify-between border-t border-black p-2 font-bold">
    <span>FINAL TOTAL:</span>
    <span>
        ₹
        {(
            (() => {
                // Step 1: Calculate Gross Total (products with discount and tax)
                const grossTotal = products.reduce((total, product) => {
                    const productTotal = Number((product.p_price * (1 - product.discount / 100)) / (1 + product.igstn / 100)) * product.quantity;
                    const taxAmount = ((product.p_price * (1 - product.discount / 100) / (1 + product.igstn / 100)) * (product.igstn / 100)) * product.quantity;
                    return total + (productTotal + taxAmount);
                }, 0);

                // Step 2: Calculate Courier Charges
                const courierCharges = products.reduce((total, product) =>  Number(product.deliveryCharges || 0), 0);

                // Step 3: Apply COD charges ONLY if paymode is 'COD'
                const codCharges = products.some(product => product.paymode === 'COD') 
                    ? (grossTotal + courierCharges) * 0.03 
                    : 0;

                // Step 4: FINAL TOTAL is the sum of gross total, courier charges, and COD charges
                const finalCost = grossTotal + courierCharges + codCharges;

                return finalCost.toFixed(2);
            })()
        )}
    </span>
</div>





<div className="flex justify-between border-t border-black p-2 font-bold">
  {/*   <span>Amount in Words :  
    
        {(
            (() => {
                // Step 5: Calculate the final cost again for amount in words
                const grossTotal = products.reduce((total, product) => {
                    const productTotal = Number(product.p_price - (product.p_price * (product.discount / 100))) * product.quantity;
                    const taxAmount = productTotal * (product.igstn / 100);
                    return total + productTotal + taxAmount;
                }, 0);

                const courierCharges = products.reduce((total, product) => Number(product.deliveryCharges || 0), 0);

                const codCharges = products.some(product => product.paymode === 'COD')
                    ? (grossTotal + courierCharges) * 0.03
                    : 0;

                const finalCost = grossTotal + courierCharges + codCharges;

                // Convert the finalCost to words and capitalize the first letter
                const amountInWords = toWords(Number(finalCost));
                return ' ' +amountInWords.charAt(0).toUpperCase() + amountInWords.slice(1) + ' only';
            })()
        )}
    </span> */}
    <span>Amount in Words : 
    {(() => {
        // Step 1: Calculate the final cost again for amount in words
        const grossTotal = products.reduce((total, product) => {
            const productTotal = Number((product.p_price * (1 - product.discount / 100)) / (1 + product.igstn / 100)) * product.quantity;
                    const taxAmount = ((product.p_price * (1 - product.discount / 100) / (1 + product.igstn / 100)) * (product.igstn / 100)) * product.quantity;
                    return total + (productTotal + taxAmount);
        }, 0);

        const courierCharges = products.reduce((total, product) => Number(product.deliveryCharges || 0), 0);
        const codCharges = products.some(product => product.paymode === 'COD')
            ? (grossTotal + courierCharges) * 0.03
            : 0;

        const finalCost = grossTotal + courierCharges + codCharges;

        // Step 2: Function to convert rupees and paise to words without commas
        const toWordsWithPaise = (amount) => {
            const [rupees, paise] = amount.toFixed(2).split('.').map(Number);
            const rupeesInWords = toWords(rupees).replace(/,/g, '');  // remove commas from rupees
            const paiseInWords = paise > 0 ? `and ${toWords(paise).replace(/,/g, '')} paise` : '';
            return `${rupeesInWords.charAt(0).toUpperCase() + rupeesInWords.slice(1)} ${paiseInWords} only`;
        };

        // Step 3: Convert finalCost to words with paise
        const amountInWords = toWordsWithPaise(finalCost);
        return ' ' + amountInWords;
    })()}
</span>
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
                </div>
               
            <div className="flex justify-center">
    <button className="bg-blue-500 text-white p-2 mt-4 hover:bg-blue-700" onClick={handleDownloadPdf}>
        Download Invoice as PDF
    </button>
</div>

                
    </>
  )
}

export default Recipt





/* import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const Recipt = () => {
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
  const [AWB, setAWB] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [description, setDescription] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [taxRate, setTaxRate] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const response = await fetch(`http://localhost/waltzify_copy_fake/Backend/User/fetch_invoice_Details.php?id=${id}`);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
          let billingName = '', billingAddress = '', billingPhone = '', billingEmail = '', 
              shippingName = '', shippingAddress = '', shippingPhone = '', shippingEmail = '',
              orderNo = '', orderDate = '', invoiceNo = '', PAN = '', FSSAI = '', GSTIN = '',
              AWB = '', trackingId = '', description = [], unitPrice = 0, quantity = 0, taxRate = 0;
          
          data.forEach(item => {
            billingName = item.billingName || billingName;
            billingAddress = item.billingAddress || billingAddress;
            billingPhone = item.billingPhone || billingPhone;
            billingEmail = item.billingEmail || billingEmail;
            shippingName = item.billingName || shippingName; 
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
            description.push(item.orderItemProductName || '');
            unitPrice = item.checkoutPrice || unitPrice;
            quantity += (item.quantity || 0);
            taxRate = item.taxRate || taxRate;
          });

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
          setAWB(AWB);
          setTrackingId(trackingId);
          setDescription(description.join(', '));
          setUnitPrice(unitPrice);
          setQuantity(quantity);
          setTaxRate(taxRate);
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };
    fetchUserInformation();
  }, [id]);

  const downloadPDF = () => {
    const invoiceElement = document.getElementById('invoice');
    const opt = {
      margin:       0.3,
      filename:     `invoice_${orderNo}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(invoiceElement).set(opt).save();
  };

  return (
    <>
      <div id="invoice" className="max-w-4xl mx-auto p-4 border-2 border-black">
       

        <h2 className="font-bold">BILLING ADDRESS:</h2>
        <p>{billingName}</p>
        <p>{billingAddress}</p>
        <p>Phone: {billingPhone}</p>
        <p>Email: {billingEmail}</p>

      
        <h2 className="font-bold">SHIPPING ADDRESS:</h2>
        <p>{shippingName}</p>
        <p>{shippingAddress}</p>
        <p>Phone: {shippingPhone}</p>
        <p>Email: {shippingEmail}</p>

        Your current table code goes here 
      </div>

      <div className="text-center mt-4">
        <button onClick={downloadPDF} className="bg-blue-500 text-white p-2 rounded">Download PDF</button>
      </div>
    </>
  );
};

export default Recipt;
 */