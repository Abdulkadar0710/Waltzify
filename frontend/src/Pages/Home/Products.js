import React, { useEffect, useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

function Products() {
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState(''); // Updated initial state
    const [fade, setFade] = useState(true);
    const [categories, setCategories] = useState([]); // Dynamic categories

    // Fetch products
    useEffect(() => {
        fetch('http://localhost/waltzify_copy_fake/Backend/fetch_home_products.php')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Fetch categories and set default category
    useEffect(() => {
        fetch('http://localhost/waltzify_copy_fake/Backend/Fetch_Selected_Categories.php')
            .then(response => response.json())
            .then(data => {
                setCategories(data);
                if (data.length > 0) {
                    setActiveCategory(data[0].cname); // Set the first category as default
                }
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleCategoryChange = (category) => {
        setFade(false);
        setTimeout(() => {
            setActiveCategory(category);
            setFade(true);
        }, 300);
    };

    const renderProduct = (products) => (
        <div className='lg:px-[2.5rem] py-[2rem] grid grid-cols-2 lg:grid-cols-4 items-center justify-between gap-3 lg:gap-5'>
            {products.slice(-4).map((product, index) => {
                const discountedPrice = product.p_price - (product.p_price * (product.discount / 100));
                return (
                    <Link
                        key={index}
                        to={{
                            pathname: `/WI/${product.Id}`,
                            state: { product: product }
                        }}
                    >
                        <div className='shadow-xl hover:border-orange-500 group p-1 lg:p-[1rem] border-2 rounded-xl cursor-pointer lg:h-[25rem]'>
                            <div className='flex justify-between items-center'>
                                <p className='text-xs bg-orange-500 text-white p-2 rounded-xl'> 
                                    {product.discount > 0 ? `Save ${product.discount}%` : 'Best Price'}
                                </p>
                      
                            </div>
                            <div className='flex justify-center items-center'>
                            <img className='w-[10rem] h-[7rem] lg:h-[11rem] lg:w-full text-center rounded-xl object-contain aspect-auto' 
                                 src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`} 
                                 alt={product.pname} />
                                 </div>
                            <div className='mt-[0.5rem] h-[2rem]'>
                                <p className='lg:hidden block group-hover:block bg-orange-500 text-white text-center mx-[1rem] rounded-xl'>
                                    Quick View
                                </p>
                            </div>
                            <div className='px-[0.2rem] '>
                                <p className='mt-[1rem] font-bold text-xs lg:text-sm'>
                                    {product.pname.length > 45 ? `${product.pname.slice(0, 45)}...` : product.pname}
                                </p>
                                <div className="flex gap-3">
    {product.discount === '0' || discountedPrice === product.p_price ? (
        // Show only one price if there's no discount or if the discounted price is the same as the original price
        <p>₹{(discountedPrice).toFixed(2)}</p>
    ) : (
        // Show discounted price and original price with line-through when there's a discount
        <>
            <p>₹{(discountedPrice).toFixed(2)}</p>
            <span className="line-through text-gray-500 text-sm">
                ₹{Number(product.p_price).toFixed(2)}
            </span>
        </>
    )}
</div>
                             {/*    <div className='flex gap-3'>
                                    
                                <p>₹{(discountedPrice).toFixed(2)}</p>
                               <p>₹{((discountedPrice) * (1 + product.igstn / 100)).toFixed(2)}</p>
                                    
                                    <span className='line-through lg:text-md text-xs'>
                                    ₹{(product.p_price)}
                                     ₹{(product.p_price * (1 + product.igstn / 100)).toFixed(2)} 
                                    </span>
                                </div> */}
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

    const getCategoryProducts = () => {
        return products.filter(product => product.category === activeCategory);
    }

    return (
        <div className='pb-[3rem]'>
            {/* Dynamic Categories */}
            <div className='lg:mx-[11rem] mx-[2rem] border-b-2 flex gap-[1rem] lg:gap-[4rem] justify-center items-center text-center'>
                {categories.map((category, index) => (
                    <p
                        key={index}
                        onClick={() => handleCategoryChange(category.cname)} 
                        className={`cursor-pointer text-xs lg:text-2xl ${activeCategory === category.cname ? 'underline font-bold' : ''} lg:underline-offset-8 underline-offset-4`}
                    >
                        {category.cname}
                    </p>
                ))}
            </div>
            {/* Products */}
            <div className={`px-[2rem] lg:px-[6rem] py-[2rem] transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                {renderProduct(getCategoryProducts())}
            </div>
            {/* View More Button */}
            <div className='flex justify-center items-center'>
                <Link to={`/category/${activeCategory}`}>
                    <button className='apply_button'>
                        VIEW ALL
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Products;




/* import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

function Products() {
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('Safety Products');
    const [fade, setFade] = useState(true);
    const [categories,setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost/waltzify_copy_fake/Backend/fetch_home_products.php')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    useEffect(() => {
        fetch('http://localhost/waltzify_copy_fake/Backend/Fetch_category.php')
          .then(response => response.json())
          .then(data => setCategories(data))
          .catch(error => console.error('Error fetching products:', error));
      }, []);
    

    const handleCategoryChange = (category) => {
        setFade(false);
        setTimeout(() => {
            setActiveCategory(category);
            setFade(true);
        }, 300);
    };

    const renderProduct = (products) => (
        <div className='lg:px-[2.5rem] py-[2rem] grid grid-cols-2 lg:grid-cols-4 items-center justify-between gap-3 lg:gap-5'>
            {products.slice(-4).map((product, index) => {
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
                                <FontAwesomeIcon className='group-hover:block hidden' icon={faHeart} />
                            </div>
                            
                            <img className='w-[10rem] h-[7rem] lg:h-[11rem] lg:w-full rounded-xl object-contain aspect-auto' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`} alt={product.pname} />
                            
                            <div className='mt-[0.5rem] h-[2rem]'>
                                <p className='lg:hidden block group-hover:block bg-orange-500 text-white text-center mx-[1rem] rounded-xl'>Quick View</p>
                            </div>
                            <div className='px-[0.2rem]'>
                            <p className='mt-[1rem] font-bold text-xs lg:text-xl'>{product.pname.length > 14 ? `${product.pname.slice(0, 14)}...` : product.pname}</p>
                                <div className='flex gap-3'>
                                    <p>₹{((product.p_price - (product.p_price * (product.discount / 100))) * (1 + product.igstn / 100)).toFixed(2)}</p>
                                    <span className='line-through lg:text-md text-xs'>₹{(product.p_price * (1 + product.igstn / 100)).toFixed(2)}</span>
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

    const getCategoryProducts = () => {
        return products.filter(product => product.category === activeCategory);
    }

    return (
        <div className='pb-[3rem]'>
            
            <div className='lg:mx-[11rem] mx-[2rem] border-b-2 flex gap-[1rem] lg:gap-[4rem] justify-center items-center text-center'>
                <p onClick={() => handleCategoryChange('Safety Products and PPE')} className={`cursor-pointer text-xs lg:text-2xl ${activeCategory === 'Safety Products and PPE' ? 'underline font-bold' : ''} lg:underline-offset-8 underline-offset-4`}>Safety Products & PPE</p>
                <p onClick={() => handleCategoryChange('Home Improvement')} className={`cursor-pointer text-xs lg:text-2xl ${activeCategory === 'Home Improvement' ? 'underline font-bold' : ''} lg:underline-offset-8 underline-offset-4`}>Home Improvement</p>
                <p onClick={() => handleCategoryChange('Silica Gel and Desciccent')} className={`cursor-pointer text-xs lg:text-2xl ${activeCategory === 'Silica Gel and Desciccent' ? 'underline font-bold' : ''} lg:underline-offset-8 underline-offset-4`}>Silica Gel and Desciccent</p>
                <p onClick={() => handleCategoryChange('Foot Steps and Building Material')} className={`cursor-pointer text-xs lg:text-2xl ${activeCategory === 'Foot Steps and Building Material' ? 'underline font-bold' : ''} lg:underline-offset-8 underline-offset-4`}>Foot Steps & Building Material</p>
            </div>
           
            <div className={`px-[2rem] lg:px-[6rem] py-[2rem] transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                {renderProduct(getCategoryProducts())}
            </div>
           
            <div className='flex justify-center items-center'>
                <Link to={`/category/${activeCategory}`}>
                    <button className='apply_button'>
                        VIEW ALL
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Products; */






























