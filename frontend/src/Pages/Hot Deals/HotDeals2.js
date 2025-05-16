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



function HotDeals() {
    const [products,setProducts] = useState([]);
    const [productSearch,setSearchProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedRating, setSelectedRating] = useState(0);
    const [selectedPrice, setSelectedPrice] = useState([0, Infinity]);
    const [displayedProducts, setDisplayedProducts] = useState(products);
    const [selectedProductTypes, setSelectedProductTypes] = useState([]);
    const [priceVisible, setPriceVisible] = useState(false);
    const [productVisible, setProductVisible] = useState(false);
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const [dateFilter, setDateFilter] = useState('');
    const [selectedStock, setSelectedStock] = useState('');
  
    useEffect(() => {
        fetch('http://localhost/waltzify_copy_fake/Backend/fetch_hotdeals.php')
          .then(response => response.json())
          .then(data => {
            setProducts(data);
            setDisplayedProducts(data); // Initialize displayedProducts with all products
          })
          .catch(error => console.error('Error fetching Collection:', error));
      }, []);

      // Event handlers
      const handleDateFilter = (days) => {
        setDateFilter(days);
      };
      const handleStockChange = (e) => {
        const value = e.target.value;
        setSelectedStock(value);
    };
    
     
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
      const handleAvailable = () =>{
        setAvailable(!available);
    }


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
          updatedProducts = updatedProducts.filter(product => product.category === selectedCategory);
        }
    
        // Rating filter
        if (selectedRating > 0) {
          updatedProducts = updatedProducts.filter(product => product.average_rating >= selectedRating);
        }
    
        // Discount filter
        if (selectedDiscount) {
          const minDiscount = parseInt(selectedDiscount.replace('% Off or more', ''));
          updatedProducts = updatedProducts.filter(product => product.discount >= minDiscount);
        }
    
        // Price filter
        updatedProducts = updatedProducts.filter(product => product.p_price >= selectedPrice[0] && product.p_price <= selectedPrice[1]);
    
        // Category (Choose Multiple) filter
        if (selectedProductTypes.length > 0) {
          updatedProducts = updatedProducts.filter(product => selectedProductTypes.includes(product.category));
        }
        // Stock filter
       
        if (selectedStock) {
            updatedProducts = updatedProducts.filter(product => product.Stock === selectedStock);
        }

    
        setDisplayedProducts(updatedProducts);
      }, [selectedCategory, selectedRating, selectedPrice, selectedProductTypes, selectedDiscount,selectedStock, products]);
   
   


    //const [price,setPrice] = useState(false);
   // const [size,setSize] = useState(false);
    //const [product,setProduct] = useState(false);
    const [available,setAvailable] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filteredProducts,setFilteredProducts] = useState(null);
    const navigate = useNavigate();
    
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


    /* const handlePriceseen = () =>{
        setPrice(!price);
    }
    const handleSize = () =>{
        setSize(!size);
    }
    const handleProduct = () =>{
        setProduct(!product);
    } */
 
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
    <div className={`pb-[3rem] relative`}>
        <div className='lg:hidden flex mb-[2rem] border-2 text-xl text-black'>
            <p onClick={handleFilter} className='w-1/2 text-center p-2 border-r-2'><FilterListIcon/> Filter</p>
            <p className='w-1/2 text-center p-2'><SortIcon/>Sort</p>
        </div>

        {/* filter section responsive */}
        {filter && (
            <div className={`flex justify-evenly p-[1rem] w-[90vw] top-0 z-[10] bg-white text-black transition-transform ease-in-out duration-500 transform ${slide ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className=''>
                    <div className=' flex justify-between items-center bg-orange-500 rounded-2xl pl-[1px] gap-2 pr-4 py-1 mr-2'>
                        <input className='relative rounded-2xl lg:text-xl outline-none w-[13rem] px-2 py-1 text-black' value={searchTerm} type="text" onChange={handleInputChange} placeholder='Search..'/>
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
                   {/*category */}
                <div className='all-products text-black'>
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
                </div>
                  {/*review*/}
                <div className='pb-[1rem] px-[2rem]'>
                    <p className='text-xl font-bold'>Avg. Customer Review</p>
                        <div className='px-[1rem] py-[1rem]'>
                            {[5, 4, 3, 2, 1].map(rating => (
                            <p
                                key={rating}
                                className='transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer'
                                onClick={() => setSelectedRating(rating)}
                            >
                            {'⭐'.repeat(rating) + '☆'.repeat(5 - rating)} 
                            </p>
                            ))}
                        </div>
                </div>
                    {/* new arrival */}
                    
                
                    {/*Discount*/}
                    <div className='all-products'>
                    <div className='py-[1rem] px-[2rem]'>
                        <p className='text-xl font-bold'>Discount</p>
                        <div className='px-[1rem] py-[1rem]'>
                        {['10% Off or more', '25% Off or more', '35% Off or more', '50% Off or more', '60% Off or more','70% Off or more'].map(discount => (
                            <p
                            key={discount}
                            className='transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer'
                            onClick={() => setSelectedDiscount(discount)}
                            >
                            {discount}
                            </p>
                         ))}
                        </div>
                    </div>
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
                 
                    {/* size */}
                    {/* <div className='pb-[2rem] px-[2rem]'>
                        <div onClick={handleSize} className='flex items-center justify-between border-b-2'>
                            <p className='text-xl font-bold'>Size</p>
                            <FontAwesomeIcon icon={faAngleDown}/>
                        </div>
                        {size && (
                            <div className='px-[1rem]'>
                                <div className="flex items-center pt-[1rem] gap-[0.5rem]">
                                    <input id="size-1" type="checkbox" value="" />
                                    <label htmlFor="size-1" >26-28 inches</label>
                                </div>
                                <div className="flex items-center pt-[1rem] gap-[0.5rem]">
                                    <input id="size-2" type="checkbox" value="" />
                                    <label htmlFor="size-2" >28-30 inches</label>
                                </div>
                                <div className="flex items-center pt-[1rem] gap-[0.5rem]">
                                    <input id="size-3" type="checkbox" value="" />
                                    <label htmlFor="size-3" >30-32 inches</label>
                                </div>
                                <div className="flex items-center pt-[1rem] gap-[0.5rem]">
                                    <input id="size-4" type="checkbox" value="" />
                                    <label htmlFor="size-4" >32-34 inches</label>
                                </div>
                            </div>
                        )}  
                    </div> */}
                    {/* Category (Choose Multiple) */}
                   {/*  <div className='pb-[2rem] px-[2rem]'>
                        <div onClick={handleProduct} className='flex items-center justify-between border-b-2'>
                            <p className='text-xl font-bold'>Category (Choose Multiple)</p>
                            <FontAwesomeIcon icon={faAngleDown}/>
                        </div>
                        {product && (
                            <div className='px-[1rem]'>
                                <div className="flex items-center pt-[1rem] gap-[0.5rem]">
                                    <input id="product-1" type="checkbox" value="" />
                                    <label htmlFor="product-1" >Safety Product</label>
                                </div>
                                <div className="flex items-center pt-[1rem] gap-[0.5rem]">
                                    <input id="product-2" type="checkbox" value="" />
                                    <label htmlFor="product-2" >Search & Rescue</label>
                                </div>
                                <div className="flex items-center pt-[1rem] gap-[0.5rem]">
                                    <input id="product-3" type="checkbox" value="" />
                                    <label htmlFor="product-3" >Silica Gel</label>
                                </div>
                                <div className="flex items-center pt-[1rem] gap-[0.5rem]">
                                    <input id="product-4" type="checkbox" value="" />
                                    <label htmlFor="product-4" >Civil Lab Equipments</label>
                                </div>
                            </div>
                        )}  
                    </div> */}
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
                    </div>
                    {/* availability */}
                    <div className='pb-[2rem] px-[2rem]'>
                        <div onClick={handleAvailable} className='flex items-center justify-between border-b-2'>
                            <p className='text-xl font-bold'>Availability</p>
                            <FontAwesomeIcon icon={faAngleDown}/>
                        </div>
                        {available && (
                            <div className='px-[1rem]'>
                                <div className="flex items-center pt-[1rem] gap-[0.5rem]">
                                    <input id="default-checkbox" type="checkbox" value="In Stock" checked={selectedStock === 'In Stock'} onChange={handleStockChange}  />
                                    <label htmlFor="default-checkbox" >In Stock</label>
                                </div>
                                <div className="flex items-center pt-[1rem] gap-[0.5rem]">
                                    <input id="checked-checkbox" type="checkbox"  value="Out of Stock" checked={selectedStock === 'Out of Stock'} onChange={handleStockChange} />
                                    <label htmlFor="checked-checkbox" >Out of Stock</label>
                                </div>
                            </div>
                        )}  
                    </div>
                </div>
                <FontAwesomeIcon className='mt-[0.2rem]' icon={faClose} size='2x' onClick={handleCloseFilter}/>
            </div>
        )}


        <div className={`${filter? ' opacity-50':''}`}>
        
        <p className='mx-[3rem] bg-orange-500 w-[16rem] px-[1rem] py-2 rounded-bl-2xl text-white text-sm lg:text-2xl'>Hot Deals Available</p>
            {/* top Line */}
            <div className='px-3 lg:px-[2.5rem] py-[2rem] flex overflow-scroll no-scrollbar gap-[2rem] lg:grid-cols-4 items-center justify-between lg:gap-5'>
                {products.map((product, index) => (
                    <Link
                        key={index}
                        to={{
                            pathname: `/WI/${product.Id}`,
                            state: { product: product }
                        }}
                    >
                       <div className="card lg:h-[23.5rem] h-[15rem] w-[12rem] lg:w-96 shadow-xl bg-white rounded-md relative">
                            <figure>
                                <img
                                className='lg:h-[15rem] h-[8rem] w-full rounded-t-md'
                                src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`}
                                alt="Shoes" />
                            </figure>
                            <div className="card-body p-4 flex flex-col justify-between">
                                <h2 className="text-xl flex h-[4rem]">
                                <p className='mt-[1rem] font-bold text-xs lg:text-xl'>{product.pname.length > 14 ? `${product.pname.slice(0, 14)}...` : product.pname}</p>
                                </h2>
                                <div className="py-1 px-3 absolute top-0 text-sm badge text-orange-500 bg-orange-500 text-white p-2 rounded-xl">Save {product.discount}%</div>
                                <div className="flex gap-[1rem] justify-end">
                                    <div className="text-xs lg:text-lg badge badge-outline border-2 py-1 px-3 rounded-full">{product.category}</div>
                                </div>
                            </div>
                        </div>

                    </Link>
                ))}
            </div>
      
        
            {/* following products */}
            <div className='flex flex-col lg:flex-row gap-[1rem] py-[3rem] lg:ml-[2rem]'>
                {/* filter */}
                <div className='hidden lg:block'>
                    <div className=' flex justify-between items-center bg-orange-500 rounded-2xl pl-[1px] gap-2 pr-4 py-1 '>
                        <input className='rounded-2xl lg:text-xl outline-none w-[20rem] px-2 py-1' value={searchTerm} type="text" onChange={handleInputChange} placeholder='Search..'/>
                        <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSearchClick} size='xl' color='white'/>
                        {showSuggestions && (
                            <ul className="z-[999] top-[36rem] absolute mt-2 py-2 bg-white rounded-lg shadow-md border border-gray-200 w-[16rem] lg:w-[42rem] max-h-[15rem] overflow-y-auto">
                                {filteredProducts.map((product) => (
                                    <li key={product.Id} className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSuggestionClick(product)}>
                                        <img className='w-[3rem]' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`} alt="product-img" />
                                        <span>{product.pname}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                 
                    <div className='all-products'>
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
                    </div>
                    
                   
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
                    
                     {/*Discount*/} 
            <div className='all-products'>
                    <div className='py-[1rem] px-[2rem]'>
                        <p className='text-xl font-bold'>Discount</p>
                        <div className='px-[1rem] py-[1rem]'>
                        {['10% Off or more', '25% Off or more', '35% Off or more', '50% Off or more', '60% Off or more','70% Off or more'].map(discount => (
                            <p
                            key={discount}
                            className='transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer'
                            onClick={() => setSelectedDiscount(discount)}
                            >
                            {discount}
                            </p>
                         ))}
                        </div>
                    </div>
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
                    </div>                    
                    {/* availability */}
                     <div className='pb-[2rem] px-[2rem]'>
                        <div onClick={handleAvailable} className='flex items-center justify-between border-b-2'>
                            <p className='text-xl font-bold'>Availability</p>
                            <FontAwesomeIcon icon={faAngleDown}/>
                        </div>
                        {available && (
                            <div className='px-[1rem]'>
                                <div className="flex items-center pt-[1rem] gap-[0.5rem]">
                                    <input id="default-checkbox" type="checkbox" value="In Stock" checked={selectedStock === 'In Stock'} onChange={handleStockChange} />
                                    <label htmlFor="default-checkbox" >In Stock</label>
                                </div>
                                <div className="flex items-center pt-[1rem] gap-[0.5rem]">
                                    <input id="checked-checkbox" type="checkbox" value="Out of Stock" checked={selectedStock === 'Out of Stock'} onChange={handleStockChange} />
                                    <label htmlFor="checked-checkbox" >Out of Stock</label>
                                </div>
                            </div>
                        )}  
                    </div> 
                </div>
                {/* product */}
                <p className='lg:hidden mx-[2rem] bg-orange-500 px-[2rem] py-2 rounded-bl-2xl text-white text-sm lg:text-2xl'>Selected Category</p>
                <div className='lg:w-4/5 overflow-hidden'>
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
                                <div className='shadow-xl hover:border-orange-500 group p-1 w-[9rem] lg:w-[20rem] lg:p-[1rem] border-2 rounded-xl cursor-pointer lg:h-[23rem]'>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-xs bg-orange-500 text-white p-2 rounded-xl'>Save {product.discount}%</p>
                                        <FontAwesomeIcon className='group-hover:block hidden' icon={faHeart} />
                                    </div>
                                    <img className='w-[8rem] h-[6rem] lg:h-[11rem] p-[1rem] lg:w-full rounded-xl' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`} alt="" />
                                    <div className='hidden lg:block mt-[0.5rem] h-[2rem]'>
                                        <p className='hidden group-hover:block bg-orange-500 text-white text-center mx-[1rem] rounded-xl'>Quick View</p>
                                    </div>
                                    <div className='px-[0.2rem]'>
                                    <p className='mt-[1rem] font-bold text-xs lg:text-xl'>{product.pname.length > 14 ? `${product.pname.slice(0, 14)}...` : product.pname}</p>
                                        <div className='flex gap-3 text-xl'>
                                            <p>₹{discountedPrice}</p>
                                            <span className='line-through text-sm'>₹{product.p_price}</span>
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

export default HotDeals