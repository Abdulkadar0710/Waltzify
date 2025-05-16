import React, { useState, useRef, useEffect,useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { UserContext, useUser } from '../../Context/UserContext';
import Fuse from 'fuse.js'; 

function Navbar() {
    const { isAuthenticated, logout } = useUser();
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showAccountDropdown, setShowAccountDropdown] = useState(false);
    const [seen, setSeen] = useState(false);
    const navigate = useNavigate();
   // const { cartItems ,wishItems} = useUser();
   // const { cartItems ,wishItems} = useContext(UserContext);
   // const [cartCount,setCartCount] = useState(0);
   const [quantities, setQuantities] = useState([]);
   const { cartItems,user ,setCartItems,wishItems,setWishItems} = useContext(UserContext);
   const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const divRef = useRef(null);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost/waltzify_copy_fake/Backend/fetch_cart.php?userId=${user.Id}`)
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
                    setCartItems(data.cartItems);
                    setQuantities(data.cartItems.map(() => 1)); // Initialize quantities to 1
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Fetch error:', error); // Log error
                    setError(error);
                    setLoading(false);
                });
        }
    }, [user]);

    
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
  useEffect(() => {
    function handleClickOutside(event) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setSeen(false);
        setShowAccountDropdown(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [divRef]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost/waltzify_copy_fake/Backend/Fetch_Searchbar.php');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        // Re-check authentication status on mount
        const checkAuthentication = () => {
            const user = localStorage.getItem('user');
            if (user && !isAuthenticated) {
                // Assuming 'user' session storage key contains authentication status
                setShowAccountDropdown(false); // Ensure dropdown is closed
            }
        };

        checkAuthentication();
    }, [isAuthenticated]);

   {/*  const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (value.length > 0) {
            setShowSuggestions(true);
            const filtered = products.filter(product =>
                product.pname.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm('');
        setShowSuggestions(false);
        navigate(`/product/${suggestion.Id}`);
    };

    const handleSearchClick = () => {
        if (selectedProduct) {
            navigate(`/product/${selectedProduct.Id}`);
        }
    }; */}
    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value.length > 0) {
            setShowSuggestions(true);

            // Fuzzy search configuration
            const fuse = new Fuse(products, {
                keys: ['pname'],  // Specify the keys to search by (e.g., product name)
                includeScore: true,  // Include score in results to filter based on relevance
                threshold: 0.5 // Adjust threshold for fuzziness (0 is exact match, 1 is match-all)
            });

            const filtered = fuse.search(value).map(result => result.item);  // Get the actual items from search results
            setFilteredProducts(filtered);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm('');
        setShowSuggestions(false);
        navigate(`/WI/${suggestion.Id}`);
    };

    /* const handleSearchClick = () => {
        if (filteredProducts.length > 0) {
           navigate(`/category/${filteredProducts[0].Id}`);
            //navigate(`/allproduct`);
        }
    }; */
    const handleSearchClick = () => {
        if (filteredProducts.length > 0) {
            const firstProduct = filteredProducts[0];
            const category = firstProduct.category;  // Assuming the product object has a 'category' field
    
            // Navigate to the category page
            navigate(`/category/${category}`);
        }
    };

    const handleLogout = () => {
        // Clear session storage and update context state
        localStorage.removeItem('user'); // Assuming 'user' is the key for user data
        logout();
        navigate('/login');
    };

    
    // edit
    const customstyle = {
        width:"32px",
        height : "26px"
    }
    // edit

     
    return (
        <div className='bg-[#F3F4F6] sticky top-0 z-[1000]'>
            <div className='flex justify-between items-center mx-[1rem] lg:mx-[5rem] border-b-2 h-[6rem]'>
                <Link to={'/'}><img className='lg:w-[9rem] w-[7rem] h-[5.5rem] lg:h-[7.5rem]' src={require('../../asset/logo.png')} alt="logo" /></Link>
                <div className='gap-[1rem] flex flex-col-reverse lg:flex-row lg:w-[65rem] justify-evenly items-center'>
                    <div className='relative flex justify-between items-center bg-orange-500 rounded-2xl pl-[1px] lg:pr-[1rem] py-1 w-[13rem] lg:w-[35rem]'>
                        <input
                            value={searchTerm}
                            onChange={handleInputChange}
                            type="text"
                            placeholder='Search..'
                            className='rounded-2xl lg:text-xl py-1 px-[1rem] outline-none w-[11rem] lg:w-[30rem] ml-[.5rem]'
                        />
                        <FontAwesomeIcon icon={faMagnifyingGlass} size='xl' color='white' onClick={handleSearchClick} className='cursor-pointer' />
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
                    <div className='flex gap-[1rem] lg:text-xl'>
                        <Link to={'/cart'}>
                            <div className='relative flex items-center gap-2'>
                                {/* edit */}
                                <ShoppingCartOutlinedIcon style={customstyle}/>
                                {/* edit */}
                                <p className='lg:block hidden text-sm lg:text-lg'>Cart</p>
                                <p className='absolute top-[-7px] left-4 text-white bg-red-500 px-[5px] py-[1px] text-xs rounded-[50%]'>{cartItems.length}</p>
                            </div>
                        </Link>
                        <Link to={'/wish'}>
                            <div className='relative flex items-center gap-2'>
                                {/* edit */}
                                <FavoriteBorderOutlinedIcon  style={customstyle}/>
                                {/* edit */}
                                <p className='lg:block hidden text-sm lg:text-lg'>Wishlist</p>
                                <p className='absolute top-[-7px] left-4 text-white bg-red-500 px-[5px] py-[1px] text-xs rounded-[50%]'>{wishItems.length}</p>
                            </div>
                        </Link>
                        {isAuthenticated && (
                            
                            <div className='items-center gap-2 lg:flex'>
                                 <Person2OutlinedIcon style={{ fontSize: 28 }} />
                                <p className='text-sm lg:text-lg '>Hello,{user ? user.name : 'User Name'}</p>
                                
                            </div>
                        
                    )} 
                        <div className='relative'>
                            <div className='flex items-center gap-2'>
                                {/*< Person2OutlinedIcon /> */}
                                <p onMouseOver={() => setShowAccountDropdown(true)} className='cursor-pointer text-sm lg:text-lg'>Account</p>
                                <FontAwesomeIcon icon={faCaretDown} size='lg' />
                            </div>
                            {showAccountDropdown && (
                                <div ref={divRef} onMouseLeave={() => setShowAccountDropdown(false)} className='w-[10rem] top-5 right-0 lg:right-[-1rem] absolute bg-white shadow-lg rounded-md mt-2 p-2 z-10'>
                                    <ul>
                                        <li className='transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer'><Link to="/user">My Profile</Link></li>
                                        <li className='transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer'><Link to="/myorders">Orders</Link></li>
                                        <li className='transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer'><Link to="/wish">Wishlist</Link></li>
                                        <li className='transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer'><Link to="/cart">My Cart</Link></li>
                              
                                        {isAuthenticated ? (
                                            <li onClick={handleLogout} className='transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer'>Logout</li>
                                            
                                        ) : (
                                            <li className='transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer'><Link to="/login">Login/signup</Link></li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                         
                    </div>
                </div>
            </div>
            <div className='flex justify-evenly lg:mx-[5rem] py-[1rem] lg:pr-[5rem]'>
                <Link to={'/'}><p className='text-xs lg:text-sm font-bold cursor-pointer'>Home</p></Link>
                <Link to={'/newarrival'}><p className='text-xs lg:text-sm font-bold cursor-pointer'>New Arrival</p></Link>
                <div className='relative flex gap-2 items-center'>
                    <Link to={'/allproduct'}><p onMouseOver={() => setSeen(true)} className='font-bold cursor-pointer text-xs lg:text-sm'>All Products</p></Link>
                    <FontAwesomeIcon icon={faCaretDown} size='xs' />
                    {seen && (
                        <div ref={divRef} onMouseLeave={() => setSeen(false)} className='text-lg absolute left-[-2rem] top-10 flex flex-col gap-2 w-[16rem] bg-white border-2 p-3'>
                            <Link to={'/category/Safety%20Products'}><p className='transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer'>Safety Products</p></Link>
                            <Link to={'/category/Search%20&%20Rescue'}><p className='transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer'>Search & Rescue</p></Link>
                            <Link to={'/category/Concrete%20Accessories'}><p className='transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer'>Concrete Accessories</p></Link>
                            <Link to={'/category/Civil%20Lab%20Equipments'}><p className='transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer'>Civil Lab Equipments</p></Link>
                            <Link to={'/category/Safety%20Shoes'}><p className='transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer'>Safety Shoes</p></Link>
                        </div>
                    )}
                </div>
                <Link to={'/hotdeals'}><p className='font-bold cursor-pointer text-xs lg:text-sm'>Hot deals</p></Link>
            </div>
        </div>
    );
}

export default Navbar;










