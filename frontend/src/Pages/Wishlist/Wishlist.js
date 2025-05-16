import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../Context/UserContext';

function Wishlist() {
    const [quantities, setQuantities] = useState([]);
   // const [wishItems, setWishItems] = useState([]);
    const {wishItems, user,setWishItems } = useContext(UserContext);
    const [totalPrice,setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost/waltzify_copy_fake/Backend/fetch_wish.php?userId=${user.Id}`)
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
                    setWishItems(data.wishItems);
                    setQuantities(data.wishItems.map(() => 1)); // Initialize quantities to 1
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Fetch error:', error); // Log error
                    setError(error);
                    setLoading(false);
                });
        }
    }, [user]);

    const handleRemoveWish = (item) => {
        fetch(`http://localhost/waltzify_copy_fake/Backend/remove_wish.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user.Id, productId: item.Id }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setWishItems(prevItems => prevItems.filter(wishItem => wishItem.Id !== item.Id));
            } else {
                console.error(data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    };

    useEffect(() => {
        // Initialize quantities state when selectedItems change
        setQuantities(new Array(wishItems.length).fill(1));
    }, [wishItems]);

    

    useEffect(() => {
        // Calculate the total price based on the selected items and quantities
        const totalPrice = wishItems.reduce((acc, item, index) => {
            const discountedPrice = item.p_price - (item.p_price * (item.discount / 100));
            return acc + discountedPrice * quantities[index];
        }, 0);
        setTotalPrice(totalPrice);
    }, [wishItems, quantities]);

    const increaseQuantity = (index) => {
        setQuantities((prevQuantities) => {
            const newQuantities = [...prevQuantities];
            newQuantities[index] += 1;
            return newQuantities;
        });
    };

    const decreaseQuantity = (index) => {
        setQuantities((prevQuantities) => {
            const newQuantities = [...prevQuantities];
            if (newQuantities[index] > 1) {
                newQuantities[index] -= 1;
            }
            return newQuantities;
        });
    };

    return (
        <div className='px-[1rem] lg:mt-[8vw] mt-[20vw] lg:px-[7rem] py-[3rem]'>
            <div className='flex py-[2rem] justify-between items-center'>
        <h1 className='text-3xl lg:text-5xl font-semibold'>My Wishlist</h1>
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
                <div className='hidden lg:flex font-bold w-full items-center justify-center justify-between px-[5rem] items-center border-b-2 pb-[2rem]'>
                    
                    <div className='flex items-center justify-center justify-between gap-[8rem] text-center items-center'>
                        <p className='w-[11rem]'>Product</p>
                        <p className='w-[14rem] ml-[2rem]'>Price</p>
                        <p className='w-[5rem]'>Quantity</p>
                        <p className='w-[10rem]'>Total</p>
                    </div>
                </div>
                {/* product list */}
                <div className='flex flex-col lg:px-[3rem] justify-evenly'>
                    {wishItems.map((item, index) => (
                        <div key={index} className='py-[1rem] flex gap-3 flex-col justify-center items-center lg:flex-row justify-between border-b-2'>
                            <div className='flex gap-[0.5rem] items-center'>
                                <img className='object-contain w-[10rem] h-[8rem] rounded-xl' src={`http://localhost/waltzify_copy_fake/Backend/Products/${item.img1}`} alt="product-img" />
                                <div className='w-[10rem]'>
                                    <p className='font-bold text-sm'>{item.pname}</p>
                                    {/* <p className='text-sm'>Color: Orange</p> */}
                                </div>
                            </div>
                            <div className='ml-[1rem] flex lg:justify-evenly gap-[2rem] lg:gap-[10rem] items-center lg:w-[40rem]'>
                                <p className='w-[5rem] text-sm text-center font-bold'>₹{item.p_price}</p>
                                <div className='w-[8rem] flex gap-5 items-center justify-center text-lg border-2 px-[1rem] rounded-xl'>
                                <p className='cursor-pointer ml-2' onClick={() => decreaseQuantity(index)}>-</p>
                                    <p className='cursor-default w-2 text-sm'>{quantities[index]}</p>
                                    
                                    <p className='cursor-pointer' onClick={() => increaseQuantity(index)}>+</p>
                                </div>
                                <p className='w-[4rem] text-center text-sm font-bold'>₹{quantities[index] * item.p_price}</p>
                            </div>
                            <div className='mt-[1rem] lg:mt-0 flex items-center justify-center'>
                                <button className='bg-orange-500 text-white p-1 px-3 rounded-full' onClick={() => handleRemoveWish(item)}><FontAwesomeIcon icon={faXmark} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* checkout */}
        </div>
    );
}

export default Wishlist;
