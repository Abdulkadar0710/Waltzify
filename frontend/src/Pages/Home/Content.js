import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

function Content() {
    const [products, setProducts] = useState([]);
    const [seen, setSeen] = useState(true);
    const [fade, setFade] = useState(true);
    const [sortOption, setSortOption] = useState('');
    const [showAllNewIn, setShowAllNewIn] = useState(false);

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const currentDate = getCurrentDate();

    useEffect(() => {
        fetch('http://localhost/waltzify_copy_fake/Backend/fetch_temple_products.php')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleBest = () => {
        setFade(false);
        setTimeout(() => {
            setSeen(true);
            setFade(true);
        }, 300);
    }

    const handleNew = () => {
        setFade(false);
        setTimeout(() => {
            setSeen(false);
            setFade(true);
        }, 300);
    }

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    }

    const sortProducts = (products) => {
        return [...products].sort((a, b) => {
            switch (sortOption) {
                case 'Price': {
                    const discountedPriceA = a.p_price - (a.p_price * (a.discount / 100));
                    const discountedPriceB = b.p_price - (b.p_price * (b.discount / 100));
                    return discountedPriceA - discountedPriceB; // Sort by discounted price (ascending)
                }
                case 'Reviews': {
                    // Sort by reviews in ascending order (fewest reviews first)
                    return b.reviews - a.reviews;
                }
                default:
                    return 0; // Default sorting
            }
        });
    };
    

    const renderProduct = (products) => {
        const sortedProducts = sortProducts(products);
        const displayedProducts = showAllNewIn ? sortedProducts : sortedProducts.slice(0, 4);

        return (
            <div className='lg:px-[2.5rem] py-[2rem] grid grid-cols-2 lg:grid-cols-4 items-center justify-between gap-3 lg:gap-5'>
                {displayedProducts.map((product, index) => {
                    const discountedPrice = product.p_price - (product.p_price * (product.discount / 100));
                    return (
                        <Link
                            key={index}
                            to={{
                                pathname: `/WI/${product.Id}`,
                                state: { product: product }
                            }}
                        >
                            <div className='shadow-xl hover:border-orange-500 group p-1 lg:p-[1rem] border-2 rounded-xl cursor-pointer lg:h-[23rem]'>
                                <div className='flex justify-between items-center'>
                                    <p className='text-xs bg-orange-500 text-white p-2 rounded-xl'> {product.discount > 0 ? `Save ${product.discount}%` : 'Best Price'}</p>
                                  
                                </div>
                                
                                <img className='w-[10rem] h-[7rem] lg:h-[11rem] lg:w-full rounded-xl object-contain aspect-auto' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`} alt={product.pname} />
                               
                                <div className='mt-[0.5rem] h-[2rem]'>
                                    <p className='hidden group-hover:block bg-orange-500 text-white text-center mx-[1rem] rounded-xl'>Quick View</p>
                                </div>
                                <div className='px-[0.2rem]'>
                                    <p className='font-bold text-sm lg:text-md'>{product.pname.length > 45 ? `${product.pname.slice(0, 45)}...` : product.pname}</p>
                                    <div className='flex gap-3'>
                                    <p>₹{Number(product.p_price - (product.p_price * (product.discount / 100))).toFixed(2)}</p> 
                                        {product.discount > 0 && (
                                                <span className='line-through text-gray-500 text-sm'>₹{Number(product.p_price).toFixed(2)}</span>
                                            )}
                                        {/* <p>₹{((product.p_price - (product.p_price * (product.discount / 100))) * (1 + product.igstn / 100)).toFixed(2)}</p> 
                                        {product.discount > 0 && (
                                                <span className='line-through'>₹{(product.p_price *  (1 + product.igstn / 100)).toFixed(2)}</span>
                                            )} */}
                                       
                                    </div>
                                    <div className='text-yellow-500 text-sm'>
                                        {[...Array(5)].map((_, i) => (
                                            i < product.average_rating ? <StarOutlinedIcon key={i} /> : <StarBorderOutlinedIcon key={i} />
                                        ))}
                            
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        );
    }

    return (
        <div className='px-[2rem] lg:px-[5rem] py-[3rem] lg:mx-[2rem] border-t-2'>
            
            <div className='flex items-center justify-center gap-[5rem]'>
                <p onClick={handleBest} className={`cursor-pointer ${seen ? ' font-bold underline underline-offset-[16px]' : ''} hover:underline hover:underline-offset-[16px]`}>Best Seller</p>
                <p onClick={handleNew} className={`cursor-pointer ${seen ? '' : 'font-bold underline underline-offset-[16px]'} hover:underline hover:underline-offset-[16px]`}>New IN</p>
            </div>
            
            <div className='mt-[2rem] flex items-center gap-[2rem] justify-between'>
                <p className='bg-red-500 p-2 text-white text-sm rounded-lg'>Best Deals</p>
                <select className='outline outline-orange-500 border-2 rounded px-[1rem] w-[15rem]' name="sort" id="sort" onChange={handleSortChange}>
                    <option value="">Sort by: featured</option>
                    <option value="Price">Price</option>
                    <option value="Reviews">Reviews</option>
                   
                </select>
            </div>
           
            <div className={` ease-in-out transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
            {seen && renderProduct(
    products
        .filter(product => product.total_sales > 0) // Filter products with total_sales > 0
        .sort((a, b) => b.total_sales - a.total_sales) // Sort by total_sales in descending order
        .slice(0, 4) // Take the top 4 best-selling products
        .length > 0 ? (
            products
                .filter(product => product.total_sales > 0) // Filter and sort best sellers
                .sort((a, b) => b.total_sales - a.total_sales)
                .slice(0, 4) // Display top 4 best sellers
        ) : (
            products.slice(0, 4) // If no best sellers, show any 4 products
        )
)}
                            {!seen && renderProduct(
        // Sort by 'id' or 'created_at' in descending order and take the top products
        products
            .sort((a, b) => b.Id - a.Id) // Assuming 'id' is used to track product order
            
    )}
            </div>
       
            <div className='flex justify-center items-center'>
                {!showAllNewIn && !seen && (
                    <button className='apply_button' onClick={() => setShowAllNewIn(true)}>
                        VIEW ALL
                    </button>
                )}
            </div>
        </div>
    );
}

export default Content;

