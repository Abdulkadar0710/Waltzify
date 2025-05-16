import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faTruck } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


function OrderDetails() {
    const[products,setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost/waltzify_copy_fake/Backend/fetch_all_orders.php');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("det: ",data);
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleRowClick = (product) => {
        setSelectedProduct(product);
      };
      
    
  return (
    
    <div  className='bg-[#F2F6F9] py-[2rem]'>
        
        <div  className='flex flex-col lg:flex-row justify-between lg:items-center px-[2rem] lg:px-[4rem]'>
            <p className='text-xl lg:text-3xl font-bold'>Order Details</p>
            <p className='text-gray-600'>Dashboard <FontAwesomeIcon icon={faArrowRight}/> Orders <FontAwesomeIcon icon={faArrowRight}/> <span className='font-light text-gray-500'>Order Details</span></p>
        </div>
        <div className='flex flex-col lg:flex-row gap-[2rem] px-[1rem] lg:px-[2rem]'>
            <div className=' rounded-xl pt-[2rem] lg:py-[3rem]  lg:w-2/3'>
                <div className='bg-white flex flex-col gap-[1rem] p-[1rem] rounded-xl shadow-xl'>
                    <div className='bg-white p-[1rem] rounded-xl'>
                        {/* <div className=' flex justify-between'>
                            <p>All item</p>
                            <select className='focus:outline-none' name="sort" id="sort">
                                <option value="" className='bg-[#F2F6F9]'>Sort</option>
                                <option value="" className='bg-[#F2F6F9]'>Name</option>
                                <option value="" className='bg-[#F2F6F9]'>Quantity</option>
                                <option value="" className='bg-[#F2F6F9]'>Price</option>
                            </select>
                        </div> */}
                    </div>
                    <div className='overflow-y-scroll h-[60vh]'>
                    {products.map((product, index) => (
                    <div key={index} className='flex justify-between  items-center mb-[0.5rem] lg:mr-[15rem] cursor-pointer' onClick={() => handleRowClick(product)}>
                    
                        <div className='w-[25rem] flex items-center gap-[5rem]'>
                            <img className='object-contain w-[4rem] h-[4rem] ' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`} alt={product.pname} />
                            <div >
                                <p className='text-sm font-thin'>Product Name</p>
                                <p className='font-bold text-sm'>{product.orderItemProductName}</p>
                            </div>
                        </div>
                    
                        <div className='text-center'>
                            <p className='text-sm'>Quantity</p>
                            <p className='font-bold text-sm'>{product.totalQuantityOrdered}</p>
                        </div>
                        <div className='text-center'>
                            <p className='text-sm'>Price</p>
                            <p className='font-bold text-sm'>₹{product.orderItemPrice}</p>
                        </div>
                    
                    </div>
                    ))}
                    </div>
                    
                    
                </div>
                <div className='bg-white mt-[3rem] flex flex-col gap-[1.5rem] p-[2rem] rounded-xl shadow-xl'>
                    <div className='bg-[#f2f6f9] rounded-xl p-[1rem] flex justify-between items-center'>
                        <p className='font-bold'>Cart Totals</p>
                        <p className='font-bold lg:mr-[10rem]'>₹{selectedProduct ? `${selectedProduct.orderItemPrice}` : 'N/A'}</p>
                    </div>
                  {/*   <div className='flex px-[1rem] justify-between items-center lg:mr-[10rem]'>
                        <p className='font-thin'>Sub Totals:</p>
                        <p className='font-bold'>₹{selectedProduct ? `${selectedProduct.p_price * selectedProduct.quantity}` : 'N/A'}</p>
                    </div>*/}
                   {/*  <div className='flex px-[1rem] justify-between items-center lg:mr-[10rem]'>
                        <p className='font-thin'>Shipping:</p>
                        <p className='font-bold'>₹{
            selectedProduct
                ? (parseFloat(selectedProduct.checkoutPrice) - parseFloat(selectedProduct.orderItemPrice)) || 0 // Calculate shipping charge
                : 'N/A'
        }</p>
                    </div> */}
                 <div className='flex px-[1rem] justify-between items-center lg:mr-[10rem]'>
                <p className='font-thin'>Shipping:</p>
                <p className='font-bold'>
                {
                     selectedProduct ? (
                (() => {
                    // Log the entire selectedProduct object

                    // Parse prices with commas removed
                    const checkoutPrice = parseFloat(selectedProduct.checkoutPrice.replace(/,/g, ''));
                    const orderItemPrice = parseFloat(selectedProduct.orderItemPrice);

                    // Log parsed values

                    // Calculate shipping charge
                    const shippingCharge = checkoutPrice - orderItemPrice;

                    // Ensure shipping charge is not NaN or negative
                    const formattedShippingCharge = shippingCharge >= 0 ? shippingCharge.toFixed(2) : '0.00';

                    // Return formatted shipping charge
                    return formattedShippingCharge;
                })()
            ) : 'N/A'
        }
    </p>
</div>




                    
                    <div className='flex px-[1rem] justify-between items-center lg:mr-[10rem]'>
                        <p className='font-bold'>Total Price:</p>
                        <p className='font-bold text-red-500'>{selectedProduct ? `${selectedProduct.checkoutPrice}` : 'N/A'}</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-[1rem] rounded-xl py-[3rem] lg:w-1/3'>
                <div className='bg-white flex flex-col gap-[1rem] p-[1.5rem] rounded-xl shadow-xl'>
                    <p className='font-bold text-lg'>Summary</p>
                    <div className='flex flex-col gap-3'>
                        <div className='flex gap-[2rem] justify-between w-[15rem]'>
                            <p className='font-thin text-sm'>OrderId</p>
                            <p className='font-bold text-sm'>#{selectedProduct ? `${selectedProduct.OrderId}`: 'N/A'}</p>
                        </div>
                        <div className='flex gap-[2rem] justify-between w-[15rem]'>
                            <p className='font-thin text-sm'>Date</p>
                            <p className='font-bold text-sm'>{selectedProduct ? `${selectedProduct.orderItemTimestamp}` : 'N/A'}</p>
                        </div>
                        <div className='flex gap-[2rem] justify-between w-[15rem]'>
                            <p className='font-thin text-sm'>Total</p>
                            <p className='font-bold text-red-500 text-sm'>₹{selectedProduct ? `${selectedProduct.orderItemPrice}` : 'N/A'}</p>
                        </div>
                    </div>
                </div>
                <div className='bg-white flex flex-col gap-[1rem] p-[1.5rem] rounded-xl shadow-xl'>
                    <p className='font-bold text-sm'>Shipping Address</p>
                    <p className='font-thin text-sm'>{selectedProduct ? `${selectedProduct.Address1}` : 'N/A'}</p>
                </div>
                <div className='bg-white flex flex-col gap-[1rem] p-[1.5rem] rounded-xl shadow-xl'>
                    <p className='font-bold text-sm'>Payment Method</p>
                    <p className='font-thin w-[20rem] text-sm'>{selectedProduct ? `${selectedProduct.paymode}` : 'N/A'}</p>
                </div>
                <div className='bg-white flex flex-col gap-[1rem] p-[1.5rem] rounded-xl shadow-xl'>
                   {/*  <p className='text-sm font-bold'>Expected Date of Delivery</p>
                    <p className='text-sm text-green-500'>20 Nov 2023</p> */}
                    {/* <button className='mx-[1rem] text-blue-500 border-2 border-blue-500 p-2 rounded-xl font-bold hover:bg-blue-500 hover:text-white'><FontAwesomeIcon icon={faTruck}/> <Link to = {`${selectedProduct.trackingId}`} >Track Order</Link></button> */}
                    {selectedProduct && selectedProduct.trackingId ? (
                        <button className='mx-[1rem] text-blue-500 border-2 border-blue-500 p-2 rounded-xl font-bold hover:bg-blue-500 hover:text-white'>
                            <FontAwesomeIcon icon={faTruck}/> 
                            <Link to={`${selectedProduct.trackingId}`} target="_blank" rel="noopener noreferrer">Track Order</Link>
                        </button>
                    ) : (
                        <p className='mx-[1rem] text-gray-500 p-2'>Tracking not available</p>
                    )}

                </div>
            </div>
        </div>
       
    </div>
     
  )
}

export default OrderDetails