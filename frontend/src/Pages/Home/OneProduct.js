import React, { useState, useEffect, useContext } from 'react';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import Youtube from '../../asset/Youtube.png';
import './style.css'
import Magnifier from 'react-magnifier';

function OneProduct() {
    const { user, addToCart, addToWish } = useContext(UserContext);
    const [product, setProduct] = useState(null);
    const [activeImage, setActiveImage] = useState(''); // For managing the big image or video
    const [activeType, setActiveType] = useState('image'); // To differentiate between image and video
    const navigate = useNavigate();

    const handleCart = () => {
        if (!user) {
            navigate('/Login');
        } else {
            addToCart(product);
        }
    };

    const handleWish = () => {
        if (!user) {
            navigate('/Login');
        } else {
            addToWish(product);
        }
    };

    const handleBuyNow = () => {
        if (!user) {
            navigate('/Login');
        } else {
            addToCart(product); // Add the product to the cart
            navigate('/checkout', { state: { product: product } }); // Navigate to checkout page with product details
        }
    };

    useEffect(() => {
        fetch('http://localhost/waltzify_copy_fake/Backend/fetch_one_product.php')
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                setActiveImage(data.img1); // Set the first image as the default active image
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    if (!product) {
        return <div>Loading...</div>;
    }

    const discountedPrice = product.p_price - (product.p_price * (product.discount / 100));

    // Function to change the big image or video when a thumbnail is clicked
    const handleMediaClick = (type, content) => {
        setActiveType(type);
        setActiveImage(content);
    };

    return (
        <div className='py-[3rem] px-[1rem] lg:px-[2rem] flex flex-col lg:flex-row gap-[1rem]'>
            {/* images and video */}
            <div className='relative lg:px-[4rem] flex gap-8 flex-col lg:w-1/2'>
                <div className='absolute right-[5rem] text-red-500 text-4xl transition-all ease-in-out hover:text-5xl cursor-pointer z-[1]' onClick={handleWish}>
                    <FavoriteIcon fontSize='inherit' />
                </div>
                
                {/* Big Image or Video */}
                <div className="media-container">
      {activeType === 'image' ? (
         <Magnifier
                          src={`http://localhost/waltzify_copy_fake/Backend/Products/${activeImage}`}
                          mgWidth={200}
                          mgHeight={200}
                        />
      ) : (
        <div className="youtube-video-container">
          {/* <iframe
            width="100%"
            height="400"
            src={activeImage} // YouTube video URL
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe> */}
         <iframe className='frame-vid' width="100%" src={activeImage} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      )}
    </div>

                {/* Small images and video tabs */}
                <div className='flex justify-evenly items-center'>
                    <img
                        className={`h-[4rem] lg:h-[8rem] w-[4rem] lg:w-[8rem] border-2 ${activeImage === product.img1 && activeType === 'image' ? 'border-black' : 'border-gray-400'} rounded-xl cursor-pointer`}
                        src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`}
                        alt=""
                        onClick={() => handleMediaClick('image', product.img1)}
                    /> 
                    <img
                        className={`h-[4rem] lg:h-[8rem] w-[4rem] lg:w-[8rem] border-2 ${activeImage === product.img2 && activeType === 'image' ? 'border-black' : 'border-gray-400'} rounded-xl cursor-pointer`}
                        src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img2}`}
                        alt=""
                        onClick={() => handleMediaClick('image', product.img2)}
                    />
                    <img
                        className={`h-[4rem] lg:h-[8rem] w-[4rem] lg:w-[8rem] border-2 ${activeImage === product.img4 && activeType === 'image' ? 'border-black' : 'border-gray-400'} rounded-xl cursor-pointer`}
                        src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img3}`}
                        alt=""
                        onClick={() => handleMediaClick('image', product.img3)}
                    />
                    {/* YouTube Video Thumbnail */}
                    <img
                        className={`h-[4rem] lg:h-[8rem] w-[4rem] lg:w-[8rem] border-2 ${activeType === 'video' ? 'border-black' : 'border-gray-400'} rounded-xl cursor-pointer`}
                        src={Youtube} // YouTube thumbnail URL
                        alt="YouTube Video"
                        onClick={() => handleMediaClick('video', `${product.youtubeLink}`)} // YouTube embed URL
                    />
                </div>
            </div>

            {/* description */}
            <div className='flex flex-col gap-[1rem]'>
                <h1 className='text-2xl font-semibold lg:w-[40rem]'>{product.pname}</h1>
                <div className='flex gap-[2rem]'>
                <p className='text-green-500 text-xl'>₹{Number(product.p_price - (product.p_price * (product.discount / 100))).toFixed(2)}</p>
               {/*  <p className='text-green-500 text-xl'>₹{((product.p_price - (product.p_price * (product.discount / 100))) * (1 + product.igstn / 100)).toFixed(2)}</p> */}
                    <p className='text-red-500 text-xl line-through'>₹{Number(product.p_price).toFixed(2)}</p>
                </div>
                <div className='flex gap-[2rem]'>
                    <div className='text-yellow-500 text-sm'>
                        {[...Array(5)].map((_, i) => (
                            i < product.average_rating ? <StarOutlinedIcon key={i} /> : <StarBorderOutlinedIcon key={i} />
                        ))}
                    </div>
                </div>
                <div>
                    <Link to={`/WI/${product.Id}`}>
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
