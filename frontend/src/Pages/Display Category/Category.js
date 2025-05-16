import React, { useState ,useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleDown, faClose, faHeart,faMagnifyingGlass,faAngleUp} from '@fortawesome/free-solid-svg-icons'
import {Link,useNavigate} from 'react-router-dom'
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useParams } from 'react-router-dom';




function Category() {
    const { category } = useParams();
    const [products,setProducts] = useState([]);
    const [productSearch,setSearchProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedRating, setSelectedRating] = useState(0);
    const [selectedPrice, setSelectedPrice] = useState([0, Infinity]);
    const [displayedProducts, setDisplayedProducts] = useState(products);
    const [selectedProductTypes, setSelectedProductTypes] = useState([]);
    const [priceVisible, setPriceVisible] = useState(false);
    const [productVisible, setProductVisible] = useState(false);
    const [error, setError] = useState();
    const [dateFilter,setDateFilter] = useState('');
    //const [price,setPrice] = useState(false);
   // const [product,setProduct] = useState([]);
    const [available,setAvailable] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filteredProducts,setFilteredProducts] = useState(null);
    const navigate = useNavigate();
    const [selectedStock, setSelectedStock] = useState('');
    
  
    const handleDateFilter = (days) => {
        setDateFilter(days);
      };
    /* useEffect(() => {
        fetch(`http://localhost/waltzify_copy_fake/Backend/Fetch_C.php?category=${category}`)
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
                setProducts(data);
                setDisplayedProducts(data.products);
            })
            .catch(error => {
                setError(error);
            });
    }, [category]);

      useEffect(() => {
        let updatedProducts = products;
        if (dateFilter === '30_days') {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            updatedProducts = updatedProducts.filter(product => new Date(product.date) >= thirtyDaysAgo);
          } else if (dateFilter === '60_days') {
            const sixtyDaysAgo = new Date();
            sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
            updatedProducts = updatedProducts.filter(product => new Date(product.date) >= sixtyDaysAgo);
          }
        // Category filter
        if (selectedCategory) {
            
            navigate(`/category/${selectedCategory}`)
            //updatedProducts = updatedProducts.filter(product => product.category === selectedCategory);
        }
    
        // Rating filter
        if (selectedRating > 0) {
          updatedProducts = updatedProducts.filter(product => product.average_rating >= selectedRating);
        }
    
        // Price filter
        if(selectedPrice > 0)
        {
            updatedProducts = updatedProducts.filter(product => product.p_price >= selectedPrice[0] && product.p_price <= selectedPrice[1]);

        }    
        // Category (Choose Multiple) filter
        if (selectedProductTypes.length > 0) {
          updatedProducts = updatedProducts.filter(product => selectedProductTypes.includes(product.category));
        }
    
        setDisplayedProducts(updatedProducts);
      }, [selectedCategory, selectedRating, selectedPrice, selectedProductTypes, products]);
     */
      useEffect(() => {
        fetch(`http://localhost/waltzify_copy_fake/Backend/Fetch_C.php?category=${category}`)
            .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
            .then(data => {
                setProducts(data.products || []);
                setDisplayedProducts(data.products || []);
            })
            .catch(error => setError(error));
    }, [category]);
    const handleStockChange = (e) => {
        const value = e.target.value;
        setSelectedStock(value);
    };
    useEffect(() => {
        let updatedProducts = products;

        if (dateFilter) {
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - (dateFilter === '30_days' ? 30 : 60));
            updatedProducts = updatedProducts.filter(product => new Date(product.date) >= cutoffDate);
        }

        if (selectedCategory) {
            updatedProducts = updatedProducts.filter(product => product.category === selectedCategory);
        }

        if (selectedRating > 0) {
            updatedProducts = updatedProducts.filter(product => product.average_rating >= selectedRating);
        }

        if (selectedPrice) {
            updatedProducts = updatedProducts.filter(product => product.p_price >= selectedPrice[0] && product.p_price <= selectedPrice[1]);
        }

        if (selectedProductTypes.length > 0) {
            updatedProducts = updatedProducts.filter(product => selectedProductTypes.includes(product.category));
        }
        // Stock filter
       
        if (selectedStock) {
            updatedProducts = updatedProducts.filter(product => product.Stock === selectedStock);
        }

        setDisplayedProducts(updatedProducts);
    }, [selectedCategory, selectedRating, selectedPrice, selectedProductTypes, selectedStock,products, dateFilter]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost/waltzify_copy_fake/Backend/Fetch_Searchbar.php');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setSearchProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

      const handlePriceSelect = (range) => {
        setSelectedPrice(range);
      };
    
      const handlePriceToggle = () => {
        setPriceVisible(!priceVisible);
      };
    
      const handleProductToggle = () => {
        setProductVisible(!productVisible);
      };
    
      const handleProductTypeChange = (event) => {
        const type = event.target.value;
        setSelectedProductTypes(prev =>
          prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
      };

   


    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost/waltzify_copy_fake/Backend/Fetch_Searchbar.php');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSearchProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

   
    const handleAvailable = () =>{
        setAvailable(!available);
    }

    const [filter, setFilter] = useState(false);
    const [slide, setSlide] = useState(false);

    const handleFilter = () => {
        setSlide(false);
        setFilter(true);
        setTimeout(() => setSlide(true), 100); // Slight delay to ensure re-render
    };
    const handleCloseFilter = () => {
        setSlide(false);
        setTimeout(() => setFilter(false), 300); // Adjust the timeout to match the animation duration
    };
    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (value.length > 0) {
            setShowSuggestions(true);
            const filtered = productSearch.filter(productSearch =>
                productSearch.pname.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.pname);
        setSelectedProduct(suggestion);
        setShowSuggestions(false);
    };

    const handleSearchClick = () => {
        if (selectedProduct) {
            navigate(`/WI/${selectedProduct.Id}`);
        }
    };

    
    
    
  return (
    <div className={`pb-[3rem] relative lg:mt-[8vw] mt-[45vw]`}>
        <div className='lg:hidden flex mb-[1rem] text-xl border-2 rounded-[10px] text-black'>
            <p onClick={handleFilter} className='w-full text-center p-2 '><FilterListIcon/> Filter</p>
        </div>

        {/* filter section responsive */}
        {filter && (
            <div className={`absolute flex justify-evenly p-[1rem] w-[90vw] top-0 z-[10] bg-white text-black transition-transform ease-in-out duration-500 transform ${slide ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className=''>
                    <div className=' flex justify-between items-center bg-orange-500 rounded-2xl pl-[1px] gap-2 pr-4 py-1 mr-2'>
                        <input className='rounded-2xl lg:text-xl outline-none w-[13rem] px-2 py-1 ml-1 text-black' value={searchTerm} type="text" onChange={handleInputChange} placeholder='Search..'/>
                        <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSearchClick} size='xl' color='white'/>
                        {showSuggestions && (
                            <ul className="z-[999] top-[3.2rem] absolute mt-2 py-2 bg-white rounded-lg shadow-md border border-gray-200 w-[16rem] lg:w-[42rem] max-h-[15rem] overflow-y-auto">
                                {filteredProducts.map((product) => (
                                    <li key={product.Id} className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSuggestionClick(product)}>
                                        <img className='w-[3rem]' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`} alt="product-img" />
                                        <span>{product.pname}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {/* category */}
                   
                {/*<div className='all-products'>
                    <div className='py-[1rem] px-[2rem]'>
                        <p className='text-xl font-bold'>Category</p>
                        <div className='px-[1rem] py-[1rem]'>
                        {['Safety Products', 'Search & Rescue', 'Silica Gel', 'Civil Lab Equipments', 'Sneakers'].map(category => (
                            <p
                            key={category}
                            className='transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer'
                            onClick={() => setSelectedCategory(category)}
                            >
                            {category}
                            </p>
                         ))}
                        </div>
                    </div>
                </div>*/}
                    {/* reviews */}
                  
                <div className='pb-[1rem] px-[2rem]'>
                    <p className='text-xl font-bold'>Avg. Customer Review</p>
                        <div className='px-[1rem] py-[1rem]'>
                            {[5, 4, 3, 2, 1].map(rating => (
                            <p
                                key={rating}
                                className='transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer'
                                onClick={() => setSelectedRating(rating)}
                            >
                            {'⭐'.repeat(rating) + '☆'.repeat(5 - rating)} & Up
                            </p>
                            ))}
                        </div>
                </div>
                    {/* Availability */}
                    <div className='pb-[2rem] px-[2rem]'>
                        <div onClick={handleAvailable} className='flex items-center justify-between border-b-2'>
                            <p className='text-xl font-bold'>Availability</p>
                            <FontAwesomeIcon icon={faAngleDown}/>
                        </div>
                        {available && (
                            <div className='px-[1rem]'>
                                <div className="flex items-center pt-[1rem] gap-[0.5rem]">
                                    <input id="default-checkbox" type="checkbox"  value="In Stock" checked={selectedStock === 'In Stock'} onChange={handleStockChange} />
                                    <label htmlFor="default-checkbox" >In Stock</label>
                                </div>
                                <div className="flex items-center pt-[1rem] gap-[0.5rem]">
                                    <input id="checked-checkbox" type="checkbox"  value="Out of Stock" checked={selectedStock === 'Out of Stock'} onChange={handleStockChange} />
                                    <label htmlFor="checked-checkbox" >Out of Stock</label>
                                </div>
                            </div>
                        )}  
                    </div>
                        
                    <div className='pb-[2rem] px-[2rem]'>
                <div onClick={handlePriceToggle} className='flex items-center justify-between border-b-2 cursor-pointer'>
                    <p className='text-xl font-bold'>Price</p>
                    <FontAwesomeIcon icon={priceVisible ? faAngleUp : faAngleDown} />
                </div>
                {priceVisible && (
                    <div className='px-[1rem]'>
                        <div className="pt-[1rem]">
                            <Slider
                                range
                                min={0}
                                max={20000}
                                defaultValue={[0, 20000]}
                                value={selectedPrice}
                                onChange={handlePriceSelect}
                                allowCross={false}
                            />
                            <div className="flex justify-between mt-[1rem]">
                                <span>₹{selectedPrice[0]}</span>
                                <span>₹{selectedPrice[1]}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>     
                    {/* 
                    <div className='pb-[2rem] px-[2rem]'>
                        <div onClick={handleProductToggle} className='flex items-center justify-between border-b-2'>
                        <p className='text-xl font-bold'>Category (Choose Multiple)</p>
                        <FontAwesomeIcon icon={faAngleDown} />
                        </div>
                        {productVisible && (
                        <div className='px-[1rem]'>
                            {['Safety Products', 'Search & Rescue', 'Silica Gel', 'Civil Lab Equipments'].map(type => (
                            <div key={type} className="flex items-center pt-[1rem] gap-[0.5rem]">
                                <input
                                id={`product-${type}`}
                                type="checkbox"
                                value={type}
                                onChange={handleProductTypeChange}
                                />
                                <label htmlFor={`product-${type}`}>{type}</label>
                            </div>
                            ))}
                        </div>
                        )}
                    </div> */}
                    
                </div>
                <FontAwesomeIcon className='mt-[0.2rem]' icon={faClose} size='2x' onClick={handleCloseFilter}/>
            </div>
        )}


        <div className={`${filter? ' opacity-50':''}`}>
      
        
            {/* following products */}
            <div className='flex flex-col lg:flex-row gap-[1rem] py-[3rem] lg:ml-[2rem]'>
                {/* filter */}
                <div className='hidden lg:block'>
                    <div className=' flex justify-between items-center bg-orange-500 rounded-2xl pl-[1px] gap-2 pr-4 py-1 '>
                        <input className='rounded-2xl ml-1 lg:text-xl outline-none w-[20rem] px-2 py-1' value={searchTerm} type="text" onChange={handleInputChange} placeholder='Search..'/>
                        <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSearchClick} size='xl' color='white'/>
                        {showSuggestions && (
                            <ul className="z-[999] top-[3.2rem] absolute mt-2 py-2 bg-white rounded-lg shadow-md border border-gray-200 w-[16rem] lg:w-[42rem] max-h-[15rem] overflow-y-auto">
                                {filteredProducts.map((product) => (
                                    <li key={product.Id} className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSuggestionClick(product)}>
                                        <img className='w-[3rem]' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`} alt="product-img" />
                                        <span>{product.pname}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {/* category */}
                    
                  
                   {/*  <div className='all-products'>
                        <div className='py-[1rem] px-[2rem]'>
                            <p className='text-xl font-bold'>Category</p>
                                <div className='px-[1rem] py-[1rem]'>
                                    {['Safety Products', 'Search & Rescue', 'Silica Gel', 'Civil Lab Equipments', 'Sneakers'].map(category => (
                            <p
                            key={category}
                            className='transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer'
                             onClick={() => setSelectedCategory(category)}
                            >
                            {category}
                            </p>
                                ))}
                                 </div>
                        </div>
                    </div> */}
                    
                    {/* reviews */}
                   
                    <div className='pb-[1rem] px-[2rem]'>
                        <p className='text-xl font-bold'>Avg. Customer Review</p>
                        <div className='px-[1rem] py-[1rem]'>
                        {[5, 4, 3, 2, 1].map(rating => (
                        <p
                            key={rating}
                            className='transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer'
                            onClick={() => setSelectedRating(rating)}
                        >
                            {'⭐'.repeat(rating) + '☆'.repeat(5 - rating)} & Up
                        </p>
                        ))}
                        </div>
                    </div>
                    {/* new arrival */}
                    {/* <div className='pb-[1rem] px-[2rem]'>
                        <p className='text-xl font-bold'>New Arrival</p>
                        <div className='px-[1rem] py-[1rem]'> 
                            <p className=' transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer'onClick={() => handleDateFilter('30_days')}>Last 30 days</p>
                            <p className=' transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer'onClick={() => handleDateFilter('60_days')}>Last 60 days</p>
                            
                        </div>
                    </div> */}
                    <div className='pb-[2rem] px-[2rem]'>
                        <div onClick={handleAvailable} className='flex items-center justify-between border-b-2'>
                            <p className='text-xl font-bold'>Availability</p>
                            <FontAwesomeIcon icon={faAngleDown}/>
                        </div>
                        {available && (
                            <div className='px-[1rem]'>
                                <div className="flex items-center pt-[1rem] gap-[0.5rem]">
                                    <input id="default-checkbox" type="checkbox"  value="In Stock" checked={selectedStock === 'In Stock'} onChange={handleStockChange} />
                                    <label htmlFor="default-checkbox" >In Stock</label>
                                </div>
                                <div className="flex items-center pt-[1rem] gap-[0.5rem]">
                                    <input id="checked-checkbox" type="checkbox"  value="Out of Stock" checked={selectedStock === 'Out of Stock'} onChange={handleStockChange} />
                                    <label htmlFor="checked-checkbox" >Out of Stock</label>
                                </div>
                            </div>
                        )}  
                    </div>
                  
                <div className='pb-[2rem] px-[2rem]'>
                <div onClick={handlePriceToggle} className='flex items-center justify-between border-b-2 cursor-pointer'>
                    <p className='text-xl font-bold'>Price</p>
                    <FontAwesomeIcon icon={priceVisible ? faAngleUp : faAngleDown} />
                </div>
                {priceVisible && (
                    <div className='px-[1rem]'>
                        <div className="pt-[1rem]">
                            <Slider
                                range
                                min={0}
                                max={20000}
                                defaultValue={[0, 20000]}
                                value={selectedPrice}
                                onChange={handlePriceSelect}
                                allowCross={false}
                            />
                            <div className="flex justify-between mt-[1rem]">
                                <span>₹{selectedPrice[0]}</span>
                                <span>₹{selectedPrice[1]}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>       
                    
                    {/* Category (Choose Multiple) */}
{/*                     <div className='pb-[2rem] px-[2rem]'>
                        <div onClick={handleProductToggle} className='flex items-center justify-between border-b-2'>
                        <p className='text-xl font-bold'>Category (Choose Multiple)</p>
                        <FontAwesomeIcon icon={faAngleDown} />
                        </div>
                        {productVisible && (
                        <div className='px-[1rem]'>
                            {['Safety Products', 'Search & Rescue', 'Silica Gel', 'Civil Lab Equipments'].map(type => (
                            <div key={type} className="flex items-center pt-[1rem] gap-[0.5rem]">
                                <input
                                id={`product-${type}`}
                                type="checkbox"
                                value={type}
                                onChange={handleProductTypeChange}
                                />
                                <label htmlFor={`product-${type}`}>{type}</label>
                            </div>
                            ))}
                        </div>
                        )}
                    </div>  */}                   
                 
                </div>
                {/* product */}
                <p className='lg:hidden mx-[2rem] bg-orange-500 px-[2rem] py-2 rounded-bl-2xl text-white text-sm lg:text-2xl'>Selected Category</p>
                <div className='lg:w-3/4 overflow-hidden'>
                    <div className='px-3 lg:px-[2.5rem] py-[2rem] grid gap-[1rem] lg:grid-cols-3 grid-cols-2 items-center justify-between lg:gap-5'>
                        {displayedProducts.map((product, index) => {
                            const discountedPrice = product.p_price - (product.p_price * (product.discount / 100));
                            
                            return(
                            <Link
                                key={index}
                                to={{
                                    pathname: `/WI/${product.Id}`,
                                    state: { product: product }
                                }}
                            >
                                <div className='shadow-xl hover:border-orange-500 group p-1 w-[9rem] lg:w-[17rem] lg:p-[1rem] border-2 rounded-xl cursor-pointer lg:h-[25rem]'>
                                    
                                        {/* <p className='text-xs bg-orange-500 text-white p-2 rounded-xl'>Save {product.discount}%</p> */}
                                        {/* <FontAwesomeIcon className='group-hover:block hidden' icon={faHeart} /> */}
                                        <div className='flex justify-between items-center'>
                                        {product.discount > 0 ? (
                                            <p className='text-xs bg-orange-500 text-white p-2 rounded-xl'>
                                                Save {product.discount}%
                                            </p>
                                        ) : (
                                            <p className='text-xs bg-orange-500 text-white p-2 rounded-xl'>
                                                Best Price
                                            </p>
                                        )}
                                      {/*   <FontAwesomeIcon className='group-hover:block hidden' icon={faHeart} /> */}
                                    
                                    </div>
                                    {/* edit */}
                                    <img className='w-[9rem] h-[7rem] lg:h-[11rem] p-[1rem] lg:w-full rounded-xl object-contain aspect-auto' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`} alt="" />
                                    {/* edit */}
                                    <div className='hidden lg:block mt-[0.5rem] h-[2rem]'>
                                        <p className='hidden group-hover:block bg-orange-500 text-white text-center mx-[1rem] rounded-xl'>Quick View</p>
                                    </div>
                                    <div className='px-[0.2rem] '>
                                    <p className='mt-[1rem] font-bold text-xs lg:text-sm'>{product.pname.length > 45 ? `${product.pname.slice(0, 45)}...` : product.pname}</p>
                                        <div className='flex gap-3 text-sm '>
                                        <p>₹{(product.p_price - (product.p_price * (product.discount / 100))).toFixed(2)}{product.discount > 0 && (
    <span className="text-gray-500 text-sm line-through ml-[0.5rem]">
      ₹{Number(product.p_price).toFixed(2)}
    </span>
  )}</p>
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

                </div>
            </div>
        </div>
    </div>
  )
}

export default Category