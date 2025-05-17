import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [isAuthenticated, setIsAuthenticated] = useState(!!user);
    const [pendingAddToCartProduct, setPendingAddToCartProduct] = useState(null);
    const [pendingWishProduct, setPendingWishProduct] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [wishItems, setWishItems] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartDetails, setCartDetails] = useState({ quantities: [], totalPrice: 0 });
    const [avg,setAvg] = useState(0);



    const addToCart = (product,quantity = 1) => {
        fetch('http://localhost/waltzify_copy_fake/Backend/add_to_cart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quantity,
            }),
        })
        .then(response => response.text()) // Read response as text
        
            .then(text => {
        try {
            const data = JSON.parse(text);
            if (data.result === "This product is already in your cart")     {
                // If the product is already in the cart, show a notification
                alert('This product is already in your cart');
            }

            setCartItems((prevItems) => {
                // Check if the product is already in the cart
                const existingItemIndex = prevItems.findIndex(item => item.Id === product.Id);
                if (existingItemIndex >= 0) {
                    // Update quantity of existing item
                    const updatedItems = [...prevItems];
                    updatedItems[existingItemIndex].quantity += quantity;
                    return updatedItems;
                } else {
                    // Add new item with quantity
                    return [...prevItems, { ...product, quantity }];
                }
            });
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    })
         .catch(error => console.error('Error adding to cart:', error));
    };

    const addToWish = (product,quantity = 1) => {
        fetch('http://localhost/waltzify_copy_fake/Backend/add_to_wishlist.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user.Id,
                productId: product.Id,
                quantity,
            }),
        })
        .then(response => response.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                if (data.result === "This product is already in your wishlis    t") {
                    // If the product is already in the cart, show a notification
                    alert('This product is already in your wishlist');
                }
                /* setWishItems((prevItems) => [...prevItems, product]); */
                setWishItems((prevItems) => {
                    // Check if the product is already in the wishlist
                    const existingItemIndex = prevItems.findIndex(item => item.Id === product.Id);
                    if (existingItemIndex >= 0) {
                        // Update quantity of existing item
                        const updatedItems = [...prevItems];
                        updatedItems[existingItemIndex].quantity += quantity;
                        return updatedItems;
                    } else {
                        // Add new item with quantity
                        return [...prevItems, { ...product, quantity }];
                    }
                });
                
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        })
        .catch(error => console.error('Error adding to wish:', error));
    };

    const addToOrders = (product) => {
        fetch('/Backend/Database/add_orders.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user.Id,
                productId: product.Id,
            }),
        })
        .then(response => response.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                //setOrders((prevItems) => [...prevItems, product]);    
                
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        })
        .catch(error => console.error('Error adding to Orders:', error));
    };

    const login = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        setCartItems([]);
        setWishItems([]);
    };
    //Here for the updated price with updated quanities

    

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (user && pendingAddToCartProduct) {
            addToCart(pendingAddToCartProduct);
            setPendingAddToCartProduct(null);
        }
    }, [user, pendingAddToCartProduct]);

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
                    console.error('Fetch error:', error);
                    setError(error);
                    setLoading(false);
                });
        }
    }, [user]);

    useEffect(() => {
    }, [cartItems]);    

    return (
        <UserContext.Provider value={{
            user,
            isAuthenticated,
            login,
            wishItems,
            setWishItems,
            logout,
            addToCart,
            cartItems,
            pendingAddToCartProduct,
            setPendingAddToCartProduct,
            addToWish,
            pendingWishProduct,
            setPendingWishProduct,
            cartDetails,
            setCartDetails,
            setCartItems,
            avg,
            setAvg,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};

export { UserContext };
