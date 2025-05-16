import React, { useState, useEffect ,useContext} from 'react';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link ,useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
function OneProduct() {
    
    const { user, addToCart,addToWish} = useContext(UserContext);
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    const handleCart = () => {
        if(!user)
        {
            navigate('/Login');
        }
        else
        {
            addToCart(product);
        }
    };

    const handleWish = () => {
        if(!user)
            {
                navigate('/Login');
            }
            else
            {
                addToWish(product);
            }
    };
 
    const handleBuyNow = () => {

        if (!user) {
            
            navigate('/Login');
        }
        else
        {
            addToCart(product); // Add the product to the cart
            navigate('/checkout', { state: { product: product } }); // Navigate to checkout page with product details

        }
        
    };

    useEffect(() => {
        fetch('http://localhost/waltzify_copy_fake/Backend/fetch_one_product.php')
            .then(response => response.json())
            .then(data => {
                setProduct(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    if (!product) {
        return <div>Loading...</div>;
    }

    const discountedPrice = product.p_price - (product.p_price * (product.discount / 100));

    return (
        
        <div className='py-[3rem] px-[1rem] lg:px-[2rem] flex flex-col lg:flex-row gap-[1rem]'>
            {/* images */}
            
            <div className='relative lg:px-[4rem] flex gap-8 flex-col lg:w-1/2'>
                <div className='absolute right-10 text-red-500 text-4xl  transition-all ease-in-out hover:text-5xl cursor-pointer'onClick={handleWish}><FavoriteIcon fontSize='inherit'/></div>
                {/* big */}
                <Link to = {`/WI/${product.Id}`}>
                <div className='flex justify-center items-center mb-[1rem]'>
                    
                    <img className='lg:h-[30rem] h-[15rem] w-[15rem] lg:w-[30rem]' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`} alt="" onError={(e) => console.error('Image load error:', e)} />
                    
                </div>
                {/* small ones */}
                <div className='flex justify-evenly items-center'>
                    <img className='h-[4rem] lg:h-[8rem] w-[4rem] lg:w-[8rem] border-2 border-black rounded-xl' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`} alt="" />
                    <img className='h-[4rem] lg:h-[8rem] w-[4rem] lg:w-[8rem] border-2 border-black rounded-xl' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img2}`} alt="" />
                    <img className='h-[4rem] lg:h-[8rem] w-[4rem] lg:w-[8rem] border-2 border-black rounded-xl' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img3}`} alt="" />
                    <img className='h-[4rem] lg:h-[8rem] w-[4rem] lg:w-[8rem] border-2 border-black rounded-xl' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img4}`} alt="" />
                </div>
                </Link>
            </div>
            {/* desc */}
            <div className='flex flex-col gap-[1rem]'>
                <h1 className='text-2xl font-semibold lg:w-[40rem]'>{product.pname}</h1>
                <div className='flex gap-[2rem]'>
                    <p className='text-green-500 text-xl'>₹{discountedPrice}</p>
                    <p className='text-red-500 text-xl line-through'>₹{product.p_price}</p>
                    
                </div>
                <div className='flex gap-[2rem]'>
                    <div className='text-yellow-500 text-sm'>
                    {[...Array(5)].map((_, i) => (
                        i < product.average_rating ? <StarOutlinedIcon key={i} /> : <StarBorderOutlinedIcon key={i} />
                    ))}
                            
                    </div>
                </div>
                <div>
                <Link to = {`/WI/${product.Id}`}>
                    <img className='w-[10rem] border-2 border-black rounded-xl' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img4}`} alt="" />
                </Link>
                </div>
                <div className='mt-[3rem] flex flex-col text-xl gap-[2rem]'>
                    <button onClick={handleCart} className='add_to_cart'>Add To Cart</button>
                    <button onClick={handleBuyNow} className='add_to_cart'>Buy Now</button>
                </div>
            </div>
            
        </div>
    );
}

export default OneProduct;
