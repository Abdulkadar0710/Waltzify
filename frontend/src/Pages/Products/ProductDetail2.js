import React, { useState, useEffect ,useContext} from 'react';
import {useParams } from 'react-router-dom'; // Correct import for useParams
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import {faHeart} from '@fortawesome/free-solid-svg-icons'
import { IoStarSharp } from "react-icons/io5";
import { Link ,useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { UserContext } from '../../Context/UserContext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';  // Importing the icon
import ReactImageMagnify from 'react-image-magnify';

function ProductDetail() {
    const { id } = useParams(); // Correct usage of useParams
    const { user,  addToCart, addToWish} = useContext(UserContext);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [colorProducts,setColorProducts] = useState([]);
    const [sizeProducts,setSizeProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [adminReviews,setAdminReviews] = useState([]);
    const [error, setError] = useState();
    const [averageRating, setAverageRating] = useState(0);
    const [mainImage, setMainImage] = useState([]);
    const [mainMedia, setMainMedia] = useState([]); // Set the initial media to be displayed

    // Function to handle media change when a thumbnail is clicked
    const handleMediaChange = (media) => {
        setMainMedia(media);
    };

    const isImage = (media) => {
        return media.endsWith('.jpg') || media.endsWith('.jpeg') || media.endsWith('.png') || media.endsWith('.gif') || media.endsWith('.webp') || media.endsWith('.jfif');
    };

    const isVideo = (media) => {
        return media.endsWith('.mp4') || media.endsWith('.mov') || media.endsWith('.avi') || media.endsWith('.mkv');
    };
    
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`http://localhost/waltzify_copy_fake/Backend/Fetch_Products.php?id=${id}`)
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
                setProduct(data);
                setRelatedProducts(data.related_products || []);
                setReviews(data.reviews);
                setColorProducts(data.color_products || [])
                setSizeProducts(data.size_products || [])
                setMainImage(data.img1);
                setMainMedia(data.img1);
                setAdminReviews(data.adminReviews);
                if (data.reviews.length > 0) {
                    const totalRating = data.reviews.reduce((sum, review) => {
                        return sum + Number(review.rating); // Ensure rating is treated as a number
                    }, 0); // Ensure the initial sum is a number
                    const average = totalRating / data.reviews.length;
                    setAverageRating(average);
                } else {
                    setAverageRating(0);
                }
            })
            .catch(error => {
                setError(error);
            });
    }, [id]);
    

    
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
    }
       
    const handleBuyNow = () => {
        if (!user) {
            //setPendingAddToCartProduct(product);
            navigate('/Login');
        }
        else
        {
            addToCart(product); // Add the product to the cart
            navigate('/checkout', { state: { product: product } }); // Navigate to checkout page with product details

        }
    };
    if (!product) {
        return <p>Loading...</p>;
    }
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    };
    const handleReview = () => {
        if (!user) {
            //setPendingAddToCartProduct(product);
            navigate('/Login');
        }
        else
        {
           
            navigate(`/reviewproduct/${id}`); // Navigate to checkout page with product details

        }
    };
    
    const discountedPrice = product.p_price - (product.p_price * (product.discount / 100));
    const stockColor = product.Stock === 'In Stock' ? 'text-green-500' : 'text-red-500';


    //const displayedPrice = selectedSize ? selectedSize.price : discountedPrice;

    
    const combinedReviews = [
        ...product.reviews.map(review => ({ ...review, isAdmin: false })),
        ...product.adminReviews.map(review => ({ ...review, isAdmin: true }))
      ];
    return (
        <div className='py-[3rem] px-[1rem] lg:px-[2rem] '>
            <div className='flex flex-col lg:flex-row gap-[4rem]'>
                {/* Render product images and description */}
                <div className='border-2 h-[33rem] lg:h-[43rem] border-orange-500 rounded-xl py-[1rem] lg:px-[2rem] flex gap-4 flex-col lg:w-[38rem]'>
                <div className='relative'>
                   {/*  <div className='absolute top-2 right-2 text-red-500 text-4xl transition-all ease-in-out hover:text-8xl  cursor-pointer' onClick={handleWish} ><FavoriteIcon fontSize="inherit"/></div>
                        <div className='flex justify-center items-center'>
                    
                            <img className='w-[30rem] h-[25rem] lg:h-[30rem]' src={`http://localhost/waltzify_copy_fake/Backend/Products/${mainImage}`} alt={product.pname} />
                        </div> */}
                          <div className='flex justify-center items-center'>
                {/* Check the file extension and render image or video accordingly */}
                {mainMedia && isImage(mainMedia) ? (
                    <ReactImageMagnify 
                    {...{
                        smallImage: {
                            alt: product.pname,
                            isFluidWidth: true,
                            src: `http://localhost/waltzify_copy_fake/Backend/Products/${mainMedia}`,
                        },
                        largeImage: {
                            src: `http://localhost/waltzify_copy_fake/Backend/Products/${mainMedia}`,
                            width: 1500,
                            height: 1500,
                        },
                        enlargedImageContainerDimensions: {
                            width: '100%',
                            height: '100%'
                        }
                    }} 
                />
                ) : isVideo(mainMedia) ? (
                    <video className='w-[30rem] h-[25rem] lg:h-[30rem] object-contain' controls>
                        <source src={`http://localhost/waltzify_copy_fake/Backend/Products/${mainMedia}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <p>Unsupported media format</p>
                )}
            </div>

            {/* Thumbnail section */}
            <div className='flex justify-evenly items-center'>
                {[product.img1, product.img2, product.img3, product.img4].map((media, index) => (
                    <div key={index} className='relative w-[4rem] h-[4rem] lg:h-[8rem] lg:w-[8rem] border-2 border-black rounded-xl cursor-pointer' onClick={() => handleMediaChange(media)}>
                        {isImage(media) ? (
                            <img src={`http://localhost/waltzify_copy_fake/Backend/Products/${media}`} alt={`${product.pname} ${index + 1}`} className='w-full h-full object-contain' />
                        ) : isVideo(media) ? (
                            <div className='relative w-full h-full'>
                                {/* Video element as thumbnail */}
                                <video className='w-full h-full object-cover'>
                                    <source src={`http://localhost/waltzify_copy_fake/Backend/Products/${media}`} type="video/mp4" />
                                </video>

                                {/* Play icon overlay */}
                                <div className='absolute inset-0 flex items-center justify-center'>
                                    <PlayArrowIcon fontSize="large" className='text-white bg-black bg-opacity-50 rounded-full p-1' />
                                </div>
                            </div>
                        ) : (
                            <p>Unsupported</p>
                        )}
                    </div>
                ))}
            </div>

                    {/* Render other small images if needed */}
                    {/*<div className='flex justify-evenly items-center'>
                    <img className='w-[4rem] h-[4rem] lg:h-[8rem] lg:w-[8rem] border-2 border-black rounded-xl' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`} alt={product.pname}/>
                    <img className='w-[4rem] h-[4rem] lg:h-[8rem] lg:w-[8rem] border-2 border-black rounded-xl' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img2}`} alt={product.pname}/>
                    <img className='w-[4rem] h-[4rem] lg:h-[8rem] lg:w-[8rem] border-2 border-black rounded-xl' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img3}`} alt={product.pname} />
                    <img className='w-[4rem] h-[4rem] lg:h-[8rem] lg:w-[8rem] border-2 border-black rounded-xl' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img4}`} alt={product.pname}/>
                </div>*/}
                 {/* <div className='flex justify-evenly items-center'>
                    {[product.img1, product.img2, product.img3, product.img4].map((img, index) => (
                        <img
                            key={index}
                            className='w-[4rem] h-[4rem] lg:h-[8rem] lg:w-[8rem] border-2 border-black rounded-xl cursor-pointer'
                            src={`http://localhost/waltzify_copy_fake/Backend/Products/${img}`}
                            alt={product.pname}
                            onClick={() => setMainImage(img)} // Update the main image on click
                        />
                    ))}
                </div> */}

                </div>
                </div>
                <div className='flex flex-col gap-[1rem]'>
                    <h1 className='text-2xl font-semibold lg:w-[40rem]'>{product.pname}</h1>
                    <div className='flex gap-[2rem] items-end'>
                        <p className='text-green-500 text-5xl'>₹{discountedPrice}</p>
                        <p className='text-red-500 text-xl line-through'>₹{product.p_price}</p>
                        <p className='text-red-500 text-xl'>{product.discount == 0 ? 'No discount' : `${product.discount}% off`}
                        </p>
                        {/* {selectedSize ? (
                            <p className='text-red-500 text-xl line-through'>₹{product.p_price}</p>
                        ) : (
                            product.p_price && (
                                <p className='text-red-500 text-xl line-through'>₹{product.p_price}</p>
                            )
                        )} */}
                    </div>
                    {/* Render rating */}
                    <div className='flex gap-[2rem]'>
                    
                    <div className='text-yellow-500 flex items-center text-sm'>
                    {[...Array(5)].map((_, i) => (
                            i <Math.floor(averageRating)? <StarOutlinedIcon key={i} /> : <StarBorderOutlinedIcon key={i} />
                        ))}
                        <span className='text-black ml-[1rem]'>({averageRating.toFixed(1)} Rating)</span>
                        
                        
                        </div>
                        <p className='text-gray-500'>SKU : {product.SKU}</p>
                        <p className="text-black">
                            <span>Stock : </span>
                            <span className={stockColor}>{product.Stock}</span>
                        </p>
                        
                        {/* Render review count */}
                    </div>
                    {/* Render available offers */}
                    <div className='flex flex-col gap-[1rem]'>
                        <p>Available Offers</p>
                        <div className='flex items-center gap-2'>
                        <LoyaltyOutlinedIcon/>
                        <p className='text-sm'>Bank OfferGet ₹50 instant discount on first Flipkart UPI transaction on order of ₹200 and above</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <LoyaltyOutlinedIcon/>
                        <p className='text-sm'>Bank OfferGet ₹50 instant discount on first Flipkart UPI transaction on order of ₹200 and above</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <LoyaltyOutlinedIcon/>
                        <p className='text-sm'>Bank OfferGet ₹50 instant discount on first Flipkart UPI transaction on order of ₹200 and above</p>
                    </div>

                    {/*color*/}
                    <p className='text-xl font-semibold'>Colors:</p>
                    <div className='grid grid-cols-3 lg:grid-cols-5 gap-[1rem]'>
                            
                            {colorProducts.map((colorProduct, index) => (
                                <div key={index} className='flex flex-col items-center'>
                                    
                                    <Link to = {`/WI/${colorProduct.Id}`}>
                                    <img className='cursor-pointer w-[6rem] h-[5rem] border-2 border-black rounded-xl' 
                                        src={`http://localhost/waltzify_copy_fake/Backend/Products/${colorProduct.img1}`} 
                                        alt={colorProduct.color} />
                                    </Link>    
                                    <p className='text-black'>{colorProduct.color}</p>
                                </div>
                            ))}
                       
                    </div>
                {/*size of products */}    
                <p className='text-xl font-semibold'>Sizes:</p>
                <div className='flex items-center no-scrollbar p-2 overflow-x-scroll lg:grid lg:grid-cols-4 gap-[1rem]'>
                    {sizeProducts.map((sizeProduct, index) => (
                    <div key={index} className='flex flex-wrap gap-[0.5rem]'>
                        <Link to = {`/WI/${sizeProduct.Id}`}>
                        <div className='w-[8rem] flex flex-col items-center border-2 border-black rounded-xl py-1 px-2 hover:scale-105 cursor-pointer hover:bg-gray-100 hover:border-orange-500'>

                            <p className=''>Size: {sizeProduct.size}</p>
                            <p className='font-bold'>₹{sizeProduct.p_price}</p>
                        </div>
                        </Link>

                    </div>
                    ))}
                </div>
                        
            </div>
                    
                    {/* Render add to cart and wishlist buttons */}
                    <div className='lg:w-[40rem] mt-[3rem] flex flex-col text-xl gap-[2rem]'>
                        <button onClick={handleCart} className='add_to_cart'>Add To Cart</button>
                        <button onClick={handleBuyNow} className='add_to_cart'>Buy Now</button>
                    </div>
                </div>
                
              </div>
            {/* Render about product section */}
            {/* ... */}
            <div className='lg:w-1/2 mt-[2rem] flex flex-col gap-[2rem]'>
                <p className='text-2xl font-bold'>About this item:</p>
                <div className=''>
                    <ul className='list-disc text-justify'>
                        {/*  {product.map((product,index)=>( */}
                            <li className="mb-4">{product.description}</li>
                        {/*))}*/}
                    </ul>
                </div>
            </div>
            
          
            {/* Render warranty and other sections */}
            <div className='flex flex-wrap gap-[1rem] items-center justify-evenly text-sm lg:text-xl py-2'>
            <div className='flex items-center gap-[0.5rem]'>
                <AssignmentReturnIcon/>
                <p>Return & Exchange</p>
            </div>
            <div className='flex items-center gap-[0.5rem]'>
                <SupportAgentIcon/>
                <p>Customer Service</p>
            </div>
            <div className='flex items-center gap-[0.5rem]'>
                <LocalShippingOutlinedIcon/>
                <p>Shipping and Delivery</p>
            </div>
            <div className='flex items-center gap-[0.5rem]'>
                <SecurityOutlinedIcon/>
                <p>Warranty</p>
            </div>
        </div>
            {/* ... */}
            {/* Render customer reviews */}
            <div className='my-[2rem] py-[1.5rem] border-t-2'>
    <p className='text-4xl'>Customer Reviews:</p>
    <div className='flex flex-col mt-[2rem]'>
             <p className='text-3xl'>Review This Product:</p>
                <p className='text-xl'>Share your thoughts with other customers</p> 
                <button  onClick={handleReview} className='w-[10rem] mt-[1rem] rounded-lg text-orange-500 border-orange-500 border-2 py-1 px-3 hover:text-white hover:bg-orange-500 transition-all ease-in-out'>Write a Review</button>            
    </div>
        
  <div className='mt-[2rem] flex gap-[2rem] overflow-x-scroll no-scrollbar'>
  {combinedReviews.map((review, index) => (
    <div key={index} className='border-2 rounded-xl w-[23rem] flex-shrink-0 flex flex-col px-[1rem] py-[0.5rem]'>
      {/* Render review details */}
      <div className='flex items-center gap-2 text-xl'>
        <AccountCircleOutlinedIcon />
        <p className='font-bold'>{review.name}</p>
        <span className='bg-green-600 flex items-center text-white p-1 text-sm rounded-lg'>
          {review.rating}<IoStarSharp />
        </span>
      </div>
      <div className='flex items-center gap-1 mt-[0.5rem]'>
        <div className='text-yellow-500 text-sm'>
          {/* Render stars dynamically based on review.rating */}
          {[...Array(5)].map((_, i) => (
            i < review.rating ? <StarOutlinedIcon key={i} /> : <StarBorderOutlinedIcon key={i} />
          ))}
          <p className='text-black font-bold text-lg'>
            {review.isAdmin ? review.reviewTitle : review.heading}
          </p>
        </div>
      </div>
      <p className='text-sm font-thin'>{`${formatDate(review.timestamp)}`}</p>
      <p className='mt-3 font-bold text-justify'>{review.review}</p>
      <div className='flex'>
        {review.isAdmin ? (
          <>
            <img className='mt-3 w-[5rem] h-[5rem]' src={`http://localhost/waltzify_copy_fake/Backend/Review/${review.img1}`} alt={review.title} />
            <img className='mt-3 w-[5rem] h-[5rem]' src={`http://localhost/waltzify_copy_fake/Backend/Review/${review.img2}`} alt={review.title} />
            <img className='mt-3 w-[5rem] h-[5rem]' src={`http://localhost/waltzify_copy_fake/Backend/Review/${review.img3}`} alt={review.title} />
            <img className='mt-3 w-[5rem] h-[5rem]' src={`http://localhost/waltzify_copy_fake/Backend/Review/${review.img4}`} alt={review.title} />
          </>
        ) : (
          <>
            <img className='mt-3 w-[5rem] h-[5rem]' src={`http://localhost/waltzify_copy_fake/Backend/User_Review/${review.img}`} alt={review.title} />
            <img className='mt-3 w-[5rem] h-[5rem]' src={`http://localhost/waltzify_copy_fake/Backend/User_Review/${review.img}`} alt={review.title} />
            <img className='mt-3 w-[5rem] h-[5rem]' src={`http://localhost/waltzify_copy_fake/Backend/User_Review/${review.img}`} alt={review.title} />
            <img className='mt-3 w-[5rem] h-[5rem]' src={`http://localhost/waltzify_copy_fake/Backend/User_Review/${review.img}`} alt={review.title} />
          </>
        )}
      </div>
    </div>
  ))}
</div>


</div> 

{/* Render related products */}
<div className='flex flex-col gap-[1rem] py-[3rem]'>
    <div className='text-center lg:text-left mb-[2rem]'>
        <p className='text-4xl font-bold'>Related Products</p>
        <p>Below are some suggested items</p>
    </div>
    
     <p className='lg:hidden lg:mx-[2rem] bg-orange-500 px-[1rem] py-2 rounded-bl-2xl text-white text-sm lg:text-2xl'>Selected Category</p>
                <div className=''>
                    <div className='px-1 lg:px-[2.5rem] py-[2rem] grid gap-[1rem] lg:grid-cols-4 grid-cols-2 items-center justify-between lg:gap-5'>
                        {relatedProducts.map((relatedProduct, index) => {
                            const discountedPrice = relatedProduct.p_price - (relatedProduct.p_price * (relatedProduct.discount / 100));
                            
                            return(
                                <Link
                                key={index}
                                to={{
                                  pathname: `/WI/${relatedProduct.Id}`,
                                  state: { product: product }
                                }}
                              >
                                <div className='shadow-xl hover:border-orange-500 group p-1 w-[9rem] lg:w-[20rem] lg:p-[1rem] border-2 rounded-xl cursor-pointer lg:h-[23rem]'>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-xs bg-orange-500 text-white p-2 rounded-xl'>Save {relatedProduct.discount}%</p>
                                        <FontAwesomeIcon className='group-hover:block hidden' icon={faHeart} />
                                    </div>
                                    <img className='w-[9rem] h-[7rem] lg:h-[11rem] p-[1rem] lg:w-full rounded-xl' src={`http://localhost/waltzify_copy_fake/Backend/Products/${relatedProduct.img1}`} alt="" />
                                    <div className='hidden lg:block mt-[0.5rem] h-[2rem]'>
                                        <p className='hidden group-hover:block bg-orange-500 text-white text-center mx-[1rem] rounded-xl'>Quick View</p>
                                    </div>
                                    <div className='px-[0.2rem]'>
                                    <p className='font-bold text-sm'>{relatedProduct.pname.length > 20? `${relatedProduct.pname.slice(0, 20)}...` : relatedProduct.pname}</p>
                                        <div className='flex gap-3 text-xl'>
                                            <p>₹{discountedPrice}</p>
                                            <span className='line-through text-sm'>₹{relatedProduct.p_price}</span>
                                        </div>
                                        <div className='text-yellow-500 text-sm'>
                                  
                                        {[...Array(5)].map((_, i) => (
                                        i < relatedProduct.average_rating ? <StarOutlinedIcon key={i} /> : <StarBorderOutlinedIcon key={i} />
                                    ))}
                            
                                </div>
                                    </div>
                                </div>
                            </Link>
                            );
                        })}
                    </div>

                </div>
</div>

        </div>
    );
}

export default ProductDetail;
