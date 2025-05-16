import React, { useState, useRef, useEffect, useContext , useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { UserContext, useUser } from "../../Context/UserContext";
import Fuse from "fuse.js";
import "./style.css";

function Navbar() {
  const { isAuthenticated, logout } = useUser();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [seen, setSeen] = useState(false);
  const navigate = useNavigate();
  // const { cartItems ,wishItems} = useUser();
  // const { cartItems ,wishItems} = useContext(UserContext);
  // const [cartCount,setCartCount] = useState(0);
  const [quantities, setQuantities] = useState([]);
  const { cartItems, user, setCartItems, wishItems, setWishItems } =
    useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const divRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (user) {
      fetch(
        `http://localhost/waltzify_copy_fake/Backend/fetch_cart.php?userId=${user.Id}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Network response was not ok ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {

          if (data.error) {
            throw new Error(data.error);
          }
          setCartItems(data.cartItems);
          setQuantities(data.cartItems.map(() => 1)); // Initialize quantities to 1
          setLoading(false);
        })
        .catch((error) => {
          console.error("Fetch error:", error); // Log error
          setError(error);
          setLoading(false);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetch(
        `http://localhost/waltzify_copy_fake/Backend/fetch_wish.php?userId=${user.Id}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Network response was not ok ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          setWishItems(data.wishItems);
          setQuantities(data.wishItems.map(() => 1)); // Initialize quantities to 1
          setLoading(false);
        })
        .catch((error) => {
          console.error("Fetch error:", error); // Log error
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
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divRef]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost/waltzify_copy_fake/Backend/Fetch_Searchbar.php"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Re-check authentication status on mount
    const checkAuthentication = () => {
      const user = localStorage.getItem("user");
      if (user && !isAuthenticated) {
        // Assuming 'user' session storage key contains authentication status
        setShowAccountDropdown(false); // Ensure dropdown is closed
      }
    };

    checkAuthentication();
  }, [isAuthenticated]);

  {
    /*  const handleInputChange = (event) => {
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
    }; */
  }
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      setShowSuggestions(true);

      // Fuzzy search configuration
      const fuse = new Fuse(products, {
        keys: ["pname"], // Specify the keys to search by (e.g., product name)
        includeScore: true, // Include score in results to filter based on relevance
        threshold: 0.5, // Adjust threshold for fuzziness (0 is exact match, 1 is match-all)
      });

      const filtered = fuse.search(value).map((result) => result.item); // Get the actual items from search results
      setFilteredProducts(filtered);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm("");
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
      const category = firstProduct.category; // Assuming the product object has a 'category' field

      // Navigate to the category page
      navigate(`/category/${category}`);
      // Clear the filteredProducts array after navigation
      setFilteredProducts([]);
      setSearchTerm("");
      setShowSuggestions(false);
    }
  };
  const handleSearchEnterClick = () => {
    if (filteredProducts.length > 0) {
      const firstProduct = filteredProducts[0];
      const category = firstProduct.category; // Assuming the product object has a 'category' field

      // Navigate to the category page
      navigate(`/WI/${firstProduct.Id}`);
      // Clear the filteredProducts array after navigation
      setFilteredProducts([]);
      setSearchTerm("");
      setShowSuggestions(false);
    }
  };
  useEffect(() => {
    fetch("http://localhost/waltzify_copy_fake/Backend/Fetch_category.php")
        .then((response) => {
            console.log("Raw Response:", response);
            return response.json();
        })
        .then((data) => {
            console.log("Fetched Data:", data);
            if (Array.isArray(data)) {
                setCategories(data);
            } else {
                setCategories([]);
                console.error("Unexpected API response:", data);
            }
        })
        .catch((error) => console.error("Error fetching categories:", error));
}, []);



  const handleLogout = () => {
    // Clear session storage and update context state
    localStorage.removeItem("user"); // Assuming 'user' is the key for user data
    logout();
    navigate("/login");
  };
  // edit
  const customstyle = {
    width: "22px",
    height: "26px",
  };
  // edit
  const [userProfile, setUserProfile] = useState({
    name: "",
    gender: "",
    email: "",
    phone: "",
  });
  const fetchUserData = useMemo(() => {
    if (user) {
      return () =>
        fetch(
          `http://localhost/waltzify_copy_fake/Backend/fetch_user.php?id=${user.Id}`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                `Network response was not ok: ${response.statusText}`
              );
            }
            return response.json();
          })
          .then((userProfile) => {
            if (userProfile.error) {
              throw new Error(userProfile.error);
            }
            return {
              name: userProfile.name,
              gender: userProfile.gender,
              email: userProfile.email,
              phone: userProfile.phone,
            };
          });
    }
    return null;
  }, [user]);

  // Effect to call the memoized fetch logic
  useEffect(() => {
    if (fetchUserData) {
      fetchUserData()
        .then((profile) => {
          setUserProfile(profile);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [fetchUserData]);

  const handleItemClick = () => {
    // Close dropdown on item click for both mobile and desktop screens
    setSeen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 786); // Set as mobile if screen width is <= 786px
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-[#F3F4F6] fixed top-0 w-full top-0 z-[1000]">
      <div className="flex justify-between items-center mx-[1rem] lg:mx-[5rem] border-b-2 h-[6rem]">
        <Link to={"/"}>
          <img
            className="adjust-logo lg:w-[12rem] max-sm:w-[20rem] max-md:w-[10rem] w-[100%] h-auto object-contain xs:absolute top-[20px] xs:left-0"
            src={require("../../asset/Group_448.png")}
            alt="logo"
          />
        </Link>
        <div className="gap-[1rem] flex flex-col-reverse lg:flex-row lg:w-[65rem] justify-evenly items-center">
          <div className="relative flex justify-between items-center bg-orange-500 rounded-2xl pl-[1px] lg:pr-[1rem] py-1 w-[15rem] lg:w-[35rem]">
            <input
              value={searchTerm}
              onChange={handleInputChange}
              type="text"
              placeholder="Search.."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchEnterClick();
                  e.target.blur();
                }
              }}
              className="rounded-2xl py-1 px-4 outline-none w-full sm:w-[10rem] md:w-[15rem] lg:w-[31rem] ml-1 text-sm sm:text-base md:text-lg lg:text-xl"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="xl"
              color="white"
              onClick={handleSearchClick}
              className="cursor-pointer w-6 h-6 xs:w-4 xs:h-4 sm:w-5 sm:h-5 px-2"
            />
            {showSuggestions && (
              <ul className="z-[999] lg:top[3.2rem] top-[2rem] absolute mt-2 py-2 sm:text-sm bg-white rounded-lg shadow-md border border-gray-200 max-w-full w-full sm:w-[50rem] lg:w-[42rem] left-0 right-0 mx-auto max-h-[15rem] overflow-y-auto">
                {filteredProducts.map((product) => (
                  <li
                    key={product.Id}
                    className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSuggestionClick(product)}
                  >
                    <img
                      className="w-[3rem]"
                      src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`}
                      alt="product-img"
                    />
                    <span>{product.pname}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex gap-[1rem] lg:text-xl md:text-md sm:text-sm mt-2">
            <Link to={"/cart"}>
              {/* <div className='relative flex items-center gap-2'>
                                <ShoppingCartOutlinedIcon />
                                <p className='lg:block hidden text-sm lg:text-lg'>Cart</p>
                                <p className='absolute top-[-7px] left-4 text-white bg-red-500 p-1 text-xs rounded-[50%]'>{cartItems.length}</p>
                            </div> */}
              <div className="relative flex items-center gap-2">
                {/* edit */}
                <ShoppingCartOutlinedIcon style={customstyle} />
                {/* edit */}
                <p className="lg:block transition-all font-bold duration-300 ease-in-out hover:text-orange-500 hidden text-sm lg:text-lg">
                  Cart
                </p>
                <p className="absolute top-[-7px] left-4 text-white bg-red-500 px-[5px] py-[1px] text-xs rounded-[50%] sm:max-sm:px-[0px]">
                  {cartItems.length}
                </p>
              </div>
            </Link>
            <Link to={"/wish"}>
              <div className="relative flex items-center gap-2">
                {/* edit */}
                <FavoriteBorderOutlinedIcon style={customstyle} />
                {/* edit */}
                <p className="lg:block hidden text-sm lg:text-lg font-bold hover:text-orange-500 ">
                  Wishlist
                </p>
                <p className="absolute top-[-7px] left-4 text-white bg-red-500 px-[5px] py-[1px] text-xs rounded-[50%]">
                  {wishItems.length}
                </p>
              </div>
            </Link>

            <div className="relative">
              <div className="flex items-center gap-2">
                <Person2OutlinedIcon />
                <span
                  onMouseOver={() => setShowAccountDropdown(true)}
                  className="cursor-pointer text-sm lg:text-lg"
                >
                  <p className="text-sm transition-all duration-300 ease-in-out hover:text-orange-500 lg:text-lg font-bold xs:text-xs">
                    Hello {user ? userProfile.name.trim().slice(0, 6) : ""}
                  </p>
                </span>
                <FontAwesomeIcon icon={faCaretDown} size="lg" />
              </div>
              {showAccountDropdown && (
                <div
                  ref={divRef}
                  onMouseLeave={() => setShowAccountDropdown(false)}
                  className="text-sm w-[10rem] top-5 right-[-2rem] lg:right-[-2rem] absolute bg-white shadow-lg rounded-md mt-2 p-2 z-10"
                >
                  <ul>
                    <li
                      className="transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer"
                      onClick={() => {
                        if (isAuthenticated) {
                          window.location.href = "/user"; // Redirect to User Profile
                        } else {
                          window.location.href = "/login"; // Redirect to Login page
                        }
                      }}
                    >
                      My Profile
                    </li>
                    <li
                      className="transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer"
                      onClick={() => {
                        if (isAuthenticated) {
                          window.location.href = "/myorders"; // Redirect to User Profile
                        } else {
                          window.location.href = "/login"; // Redirect to Login page
                        }
                      }}
                    >
                      Orders
                    </li>
                    <li className="transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer">
                      <Link to="/wish">Wishlist</Link>
                    </li>
                    <li className="transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer">
                      <Link to="/cart">My Cart</Link>
                    </li>

                    {isAuthenticated ? (
                      <li
                        onClick={handleLogout}
                        className="transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer"
                      >
                        Logout
                      </li>
                    ) : (
                      <li className="transition-all ease-in-out hover:text-white hover:bg-orange-500 p-2 cursor-pointer">
                        <Link to="/login">Login/signup</Link>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-evenly lg:mx-[5rem] py-[1rem] lg:pr-[5rem]">
        <Link to={"/"}>
          <p className="text-xs lg:text-sm font-bold cursor-pointer transition-all duration-300 ease-in-out hover:text-orange-500 hover:mb-xl">
            Home
          </p>
        </Link>
        <Link to={"/newarrival"}>
          <p className="text-xs lg:text-sm font-bold cursor-pointer transition-all duration-300 ease-in-out hover:text-orange-500">
            New Arrival
          </p>
        </Link>
        <div className="relative flex gap-2 items-center">
          <Link to={"/allproduct"}>
            <p
              onMouseOver={() => !isMobile && setSeen(true)} // Open dropdown on hover for larger screens
              onClick={() => isMobile && setSeen(!seen)} // Toggle dropdown on click for smaller screens
              className="font-bold cursor-pointer hover:text-orange-500 transition-all duration-300 ease-in-out text-xs lg:text-sm"
            >
              All Products
            </p>
          </Link>
          <FontAwesomeIcon icon={faCaretDown} size="xs" />

          {seen && (
            <div
              ref={divRef}
              onMouseLeave={() => !isMobile && setSeen(false)} // Close dropdown on mouse leave for larger screens
              className="text-lg absolute left-[-4rem] h-[25rem] overflow-auto  top-8 lg:top-9 flex flex-col gap-2 lg:w-[15rem] w-[12rem] bg-white border-2 p-3"
            >
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/category/${category.cname}`}
                  onClick={() => isMobile && setSeen(false)} // Close dropdown on click for smaller screens
                >
                  <p className="transition-all ease-in-out lg:text-md text-xs hover:text-white hover:bg-orange-500 p-2 cursor-pointer">
                    {category.cname}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link to={"/hotdeals"}>
          <p className="transition-all duration-300 ease-in-out font-bold cursor-pointer text-xs lg:text-sm hover:text-orange-500">
            Hot deals
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
