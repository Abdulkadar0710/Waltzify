import React, { useState, useEffect ,useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import RelatedItems from './RelatedItems';
import { UserContext } from '../../Context/UserContext';

function Cart() {
  const [quantities, setQuantities] = useState([]);
 //  const [cartItems, setCartItems] = useState([]); 
 // const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const { cartItems,user,isAuthenticated ,setCartItems} = useContext(UserContext);

     
    
    const shipping = totalPrice * 0;

    const handleRemoveCart = (item) => {
        fetch(`http://localhost/waltzify_copy_fake/Backend/remove_cart.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user.Id, productId: item.Id }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setCartItems(prevItems => prevItems.filter(cartItem => cartItem.Id !== item.Id));
            } else {
                console.error(data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    };

  useEffect(() => {
    setQuantities(new Array(cartItems.length).fill(1));
  }, [cartItems]);

  useEffect(() => {
    const totalPrice = cartItems.reduce((acc, item, index) => {
      const discountedPrice = item.p_price - (item.p_price * (item.discount / 100));
      return acc + discountedPrice * quantities[index];
      /* return acc + discountedPrice * quantities[index] * (1 + item.igstn / 100); */
    }, 0);
    setTotalPrice(totalPrice);
  }, [cartItems, quantities]);

 

  

  // Extract product IDs to pass to the RelatedItems component
  const productIds = cartItems.map(item => item.Id);

  return (
    <div className='px-[1rem] lg:mt-[8vw] mt-[20vw] lg:px-[7rem] py-[3rem]'>
      {/* top */}
      <div className='flex py-[2rem] justify-between items-center'>
        <h1 className='text-3xl lg:text-5xl font-semibold'>My Cart</h1>
        <Link to={'/'}>
          <div className='hover:text-orange-500 transition-all ease-in-out delay-75 flex justify-evenly items-center w-[15rem] border-l-2'>
            <FontAwesomeIcon icon={faArrowLeft} />
            <p className='font-bold'>Continue Shopping</p>
          </div>
        </Link>
      </div>
      {/* items */}
      <div className='py-[3rem]'>
        {/* category */}
        <div className='hidden lg:flex font-bold items-center justify-center justify-between px-[5rem] items-center border-b-2 pb-[2rem]'>
          
          <div className='flex gap-[37rem] w-[45rem] place-items-start'>
          <p>Product</p>
          <p>Price</p>
         
            {/* <p>Quantity</p> */}
            
          </div>
        </div>
        {/* product list */}
        <div className='flex flex-col lg:px-[3rem] justify-evenly'>
          {cartItems.map((item, index) => {
            const discountedPrice = item.p_price - (item.p_price * (item.discount / 100));

            return (
              <div key={index} className='py-[1rem] flex flex-col lg:flex-row justify-center items-center justify-between border-b-2'>
                <div className='flex w-[25rem] max-md:w-[20rem] gap-[4rem] items-center'>
                  <img className='object-contain lg:w-[10rem] lg:w-[10rem] w-[10rem] h-[8rem]' src={`http://localhost/waltzify_copy_fake/Backend/Products/${item.img1}`} alt={item.pname} />
                  <div className='w-[10rem'>
                    <p className='font-bold max-md:w-[6rem] lg:w-[full] text-sm'>{item.pname.length > 35 ? `${item.pname.slice(0, 35)}...` : item.pname}</p>
                  </div>
                </div>
                <div className='lg:text-items-center lg:right-0 lg:left-0  lg:mt-0 right-[50%] left-[50%] flex items-center'>
               
                <p className='w-full text-sm text-center font-bold'>₹{discountedPrice.toFixed(2)}<br/>{item.size}</p>
                
                 
                
                </div>
                <div className='mt-[1rem] lg:mt-0 flex items-center justify-center'>
                  <button className='bg-orange-500 text-white p-1 px-3 rounded-full' onClick={() => handleRemoveCart(item)}><FontAwesomeIcon icon={faXmark} /></button>
                </div>
                
                    </div>
            );
          })}
        </div>
      </div>
      {/* checkout */}
      <div className='shadow-xl border-2 rounded-xl px-[1rem] lg:px-[3rem] py-[2rem] bg-[#EDF0F3]'>
        <p className='text-3xl lg:text-5xl font-bold text-orange-500'>CheckOut</p>
        <div className='flex flex-col-reverse lg:flex-row lg:justify-between py-[2rem] items-center lg:px-[2rem]'>
          <div className='flex flex-col gap-[1rem]'>
            {/* <p className='text-xl font-semibold'>Apply Promo Code</p>
            <input className='text-xl p-1 outline-none border-2 rounded-md' type="text" placeholder='Enter Promo Code' /> */} 
          </div> 
          <div className='flex flex-col gap-[1rem] justify-evenly pb-[1rem] w-[13rem]'>
            <div className='flex items-center justify-between'>
              <p className='font-thin'>SubTotal</p>
              <p className='font-semibold'>₹{totalPrice.toFixed(2)}</p>
            </div>
            <div className='flex items-center justify-between'>
              <p className='font-thin'>Shipping</p>
              <p className='font-semibold'>₹{(shipping).toFixed(2)}</p>
            </div>
            <div className='flex items-center justify-between'>
              <p className='font-thin'>Total</p>
              <p className='font-semibold'>₹{(totalPrice + shipping).toFixed(2)}</p>
            </div>
            <Link to={'/checkout'}>
              <button className='apply_button'>CheckOut</button>
            </Link>
          </div>
        </div>
      </div>
      {/* pair */}
      <div>
        <p className='font-bold text-3xl mt-4'>Pair with your Carts</p>
        <RelatedItems productIds={productIds} />
      </div>
    </div>
  );
}

export default Cart;
 




















