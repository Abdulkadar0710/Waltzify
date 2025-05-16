import React,{useState,useEffect}from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faCircle, faStar } from '@fortawesome/free-solid-svg-icons'
import VisitorGraph from './Graphs/VisitorGraph';
import { Link } from 'react-router-dom';
import RecentOrderGraph from './Graphs/RecentOrderGraph';
import EarningsGraph from './Graphs/EarningsGraph';

function Home() {
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);
    const [totalVisitors, setTotalVisitors] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [products, setProducts] = useState([]);
    const [orderProducts,setOrderProducts] = useState([]);
    const [totalIncome, setTotalIncome] = useState({ total_sum: '0.00' });
    const [totalSale,setTotalSale] = useState({total_sales: '0.00'});
    const [totalOrderPaid,setTotalOrderPaid] = useState({total_orders: '0.00'});
    const [orderData, setOrderData] = useState({ orders_count: { today: 0, yesterday: 0 } });
    {/* Fetch weekly visitor counts */}
    useEffect(() => {
        
        fetch('http://localhost/waltzify_copy_fake/Backend/count_weekly_user.php')
            .then(response => response.json())
            .then(data => {
                const labels = data.map(item => `Week ${item.week}`);
                const values = data.map(item => item.count);
                setLabels(labels);
                setData(values);
            })
            .catch(error => console.error('Error fetching weekly visitors:', error));

        {/* // Fetch total visitors for other calculations */}
        fetch('http://localhost/waltzify_copy_fake/Backend/count_visitors.php')
            .then(response => response.json())
            .then(data => {
                // Use the correct field from your API response
                setTotalVisitors(data.totalUsers || 0);
                setPercentage(((data.totalUsers / 10000) * 100).toFixed(2)); // Adjust denominator if needed
            })
            .catch(error => console.error('Error fetching total users:', error));
    }, []);

    const visitorData = {
        labels: labels,
        data: data,
    };
    {/*For New Reviews */}
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost/waltzify_copy_fake/Backend/fetch_new_comment.php')  // Replace with the actual path to your PHP script
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setReviews(data);
                }
            })
            .catch(error => setError("Error fetching data: " + error));
    }, []);
   {/*For Top Orders */}
    useEffect(() => {
        fetch('http://localhost/waltzify_copy_fake/Backend/fetch_top_orders.php')
            .then(response => response.json()) // Parse the JSON from the response
            .then(data => {
                setProducts(data || []); // Set the products state with the fetched data
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);
    {/*For Normal Orders */}
    useEffect(() => {
        fetch('http://localhost/waltzify_copy_fake/Backend/fetch_orders.php')
            .then(response => response.json()) // Parse the JSON from the response
            .then(data => {
                setOrderProducts(data || []); // Set the products state with the fetched data
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);
    {/*For Total Income */}
    useEffect(() => {
        fetch('http://localhost/waltzify_copy_fake/Backend/fetch_total_income.php')
            .then(response => response.json()) // Parse the JSON from the response
            .then(data => {
                setTotalIncome(data); // Set the Total Income with the fetched data
            })
            .catch(error => {
                console.error("There was an error fetching the total income!", error);
            });
    }, []);
     {/*For Total Sales */}
     useEffect(() => {
        fetch('http://localhost/waltzify_copy_fake/Backend/fetch_total_sales.php')
            .then(response => response.json()) // Parse the JSON from the response
            .then(data => {
                setTotalSale(data); // Set the Total Income with the fetched data
            })
            .catch(error => {
                console.error("There was an error fetching the total sales!", error);
            });
    }, []);
     {/*For Total Orders */}
     useEffect(() => {
        fetch('http://localhost/waltzify_copy_fake/Backend/fetch_orders_paid.php')
            .then(response => response.json()) // Parse the JSON from the response
            .then(data => {
                setTotalOrderPaid(data); // Set the Total Income with the fetched data
            })
            .catch(error => {
                console.error("There was an error fetching the total orders!", error);
            });
    }, []);
    
   {/* For Recent Order Graph */}
   useEffect(() => {
    // Fetch recent orders data
    const fetchData = async () => {
        const response = await fetch('http://localhost/waltzify_copy_fake/Backend/fetch_recent_orders_graph.php');
        const data = await response.json();
        setOrderData(data);
    };

    fetchData();
}, []);
    {/*For calculate Profit And Revenue */}
    const [earnings, setEarnings] = useState({
        revenue: 0,
        profit: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost/waltzify_copy_fake/Backend/fetch_revenue_profit.php'); // Adjust the URL accordingly

                // Check if the response is ok (status in the range 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                
                // Log the result for debugging

                // Update state with the fetched data
                setEarnings(result);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Optionally, you can set an error state here to display a message in your UI
            }
        };

        fetchData();
    }, []);

  return (
    <div className='pl-[2rem] py-[2rem] pr-[2rem] bg-[#EEF3F9] w-full h-full'>
            <div className='flex flex-col lg:flex-row justify-evenly gap-[1rem]'>
                <div className='rounded-xl shadow-xl flex flex-col items-center justify-evenly lg:w-1/4 h-[10rem] bg-white'>
                    <div className='gap-[2rem] flex flex-row justify-center items-center'>
                      
                        <div className='flex flex-col justify-center items-center'>
                            <p className='font-light'>Total Sales</p>
                            <p className='font-bold text-xl'>{totalSale.total_sales}</p>
                        </div>
                        
                    </div>
                    {/* <div>
                       <img className='p-[1rem]' src={require('../asset/graph2.png')} alt="" />
                    </div> */}
                </div> 
                <div className='rounded-xl shadow-xl flex flex-col items-center justify-evenly lg:w-1/4 h-[10rem] bg-white'>
                    <div className='gap-[2rem] flex flex-row justify-center items-center'>
                        
                        <div className='flex flex-col justify-center items-center'>
                            <p className='font-light'>Total Income</p>
                            <p className='font-bold text-xl'>₹{totalIncome.total_sum}</p>
                        </div>
                        
                    </div>
                    {/* <div>
                        <img className='p-[1rem]' src={require('../asset/graph3.png')} alt="" />      
                    </div> */}
                </div>
                <div className='rounded-xl shadow-xl flex flex-col items-center justify-evenly lg:w-1/4 h-[10rem] bg-white'>
                    <div className='gap-[2rem] flex flex-row justify-center items-center'>
                        
                        <div className='flex flex-col justify-center items-center'>
                            <p className='font-light'>Successful Orders</p>
                            <p className='font-bold text-xl'>{totalOrderPaid.total_orders}</p>
                        </div>
                       
                    </div>
                    
                    {/* <div>
                       <img className='p-[1rem]' src={require('../asset/graph2.png')} alt="" />
                    </div> */}
                </div>

                <div className='rounded-xl shadow-xl flex flex-col items-center justify-evenly lg:w-1/4 h-[10rem] bg-white'>
                    <div className='gap-[2rem] flex flex-row justify-center items-center'>
                        
                        <div className='flex flex-col justify-center items-center'>
                            <p className='font-light'>Today's Revenue</p>
                            <p className='font-bold text-xl'>₹{earnings.revenue}</p>
                        </div>
                       
                    </div>
                    
                    {/* <div>
                       <img className='p-[1rem]' src={require('../asset/graph2.png')} alt="" />
                    </div> */}
                </div>
                
            </div>
            <div className='mt-[2rem] flex flex-col lg:flex-row gap-[1rem]'>
                <div className='lg:w-1/3 h-[25rem] rounded-xl shadow-xl bg-white'>
                    <div className='flex justify-between px-[2rem] items-center pt-[1rem]'>
                        <p className='text-2xl font-bold'>Recent Orders</p>
                        <Link to = {'/orderlist'}><p className='font-bold'>•••</p></Link>
                    </div>
                    <RecentOrderGraph data={orderData} />
                </div>
                <div className='ml-[1rem] lg:w-1/3 h-[25rem] rounded-xl shadow-xl bg-white overflow-y-scroll no-scrollbar'>
                    <div className='flex justify-between px-[2rem] items-center pt-[1rem]'>
                        <p className='text-2xl font-bold'>Top Orders</p>
                        <Link to = {'/orderlist'}><p className='font-bold'>•••</p></Link>
                        {/*<p className='font-light'>View All <FontAwesomeIcon className='cursor-pointer' icon={faAngleDown} /></p>*/}
                    </div>
                    {products.map((product, index) => (
                <div key={index} className='flex justify-between gap-[1rem] items-center px-[3rem]'>
                    <div className='flex justify-center items-center gap-[1rem] mt-[2rem]'>
                        <img className='w-[2rem]' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`} alt={product.orderItemProductName} />
                        <p className='font-bold'>{product.orderItemProductName}</p>
                    </div>
                    <div className='mr-[2.5rem] mt-[2rem]'>
                        <p className='font-bold'>₹{product.checkoutPrice}</p>
                    </div>
                </div>
            ))}
                </div>
               {/*  <div className='lg:w-1/3 h-[25rem] rounded-xl shadow-xl bg-white'>
                    <div className='flex justify-between px-[2rem] items-center pt-[1rem]'>
                        <p className='text-2xl font-bold'>Top Countries by Sale</p>
                        <p className='font-light'>View All <FontAwesomeIcon className='cursor-pointer' icon={faAngleDown} /></p>
                    </div>
                    <div className='flex justify-evenly items-center mt-[1rem]'>
                        <p className='text-3xl font-bold'>$37,802</p>
                        <p className='text-green-500'>1.56%</p>
                        <p>Since last weekend</p>
                    </div>
                    <div className='flex justify-between px-[4rem] mt-[1rem]'> 
                        <div className='flex gap-[1rem] justify-center items-center'>
                            <img className='w-[1.5rem] rounded-full' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAflBMVEXxWyUAaTT////xVhoAZCz2kXFfmnrz8/fY2OTS0uDk5OwnJ2729vnq6vHw8PX6+vy9vc8jI21sbJcAAGEMDGSoqMKBgadgYJBbW4txcZuHh6kxMXIYGGjGxtcsLG8SEmU7O3odHWmZmba3t854eJ9RUYVISH+RkbFBQXyvr8UfgS9oAAABwUlEQVRoge2W2W6cMBRAyU1bvOCFfTBhMyae+f8f7G0aKW3VaibCVl98hIwf0BHy9V2yLJFIJBKJRCKR+B88RyT7GpEMPoGSUn3m+4fl+a3iNcKrWx5YLrtmqbeyqsqtXhYjQsr3ueErLUhRUEVX3ox7OLltNi8kEBACFyn81thQcluvThH8fyAEFyDKXetH7A/I94ZTAEahVYSoFihDP290CLmYFweTAguaIho3agK3zPejel/uGg9QWCU64bX2+FIWL6Nv3Hk541dBGORDbkhvbU8MboERtnJ2Wm6Xi4SpZbKfjsGY4aC9EO0E8rLY0/KjpAUmkff6MJ3B59DWSzwoWh5n5XJ8FWxvqdQX48ww4HLZJb3dmHgd5Uk54SXe8HzqKtf5a1leO4PbCSNKNk5OyulLh9Gjk24HN/B55m4YWj1RjLF7oaHlQ0B51GOJGtCoV/E9iWycJGJ8ZVgHc/eR/i5Y+kctXCDGv5fcMUTJjdosfm1zjIVuc28N2vzeoO/flIflsI8/RgtFf44WZdDRApPILG9DUb+FH4og6jj3jrxXTf6Qf4tI9iUi2VNEkjzJkzzJkzzJkzzJkzzJ/8V3qoFT2IY72o0AAAAASUVORK5CYII=" alt="india" />
                            <p className='text-xl '>India</p>
                        </div>
                        <p className='text-lg'>6,972</p>
                    </div>
                    <div className='flex justify-between px-[4rem] mt-[1rem]'> 
                        <div className='flex gap-[1rem] justify-center items-center'>
                            <img className='w-[1.5rem] rounded-full' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAIVBMVEX/zAPEAD4AAADFAz//1AB2ZRv1vxG+AEAEBAR0ZR3/zgDi9FdmAAAAUklEQVRoge3awRGAIAwAwYAoQv8F20Cc+PC5V8BWcHEn9XNE0b7mURY96xPequBwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8Nf8HSHWP/sEA/NwSkBzNR7zgAAAABJRU5ErkJggg==" alt="india" />
                            <p className='text-xl '>Belgium</p>
                        </div>
                        <p className='text-lg'>6,972</p>
                    </div>
                    <div className='flex justify-between px-[4rem] mt-[1rem]'> 
                        <div className='flex gap-[1rem] justify-center items-center'>
                            <img className='w-[1.5rem] rounded-full' src="https://i.pinimg.com/originals/30/47/3f/30473f08ede561b8b8c7953078127d31.jpg" alt="india" />
                            <p className='text-xl '>Australia</p>
                        </div>
                        <p className='text-lg'>6,972</p>
                    </div>
                    <div className='flex justify-between px-[4rem] mt-[1rem]'> 
                        <div className='flex gap-[1rem] justify-center items-center'>
                            <img className='w-[1.5rem] rounded-full' src="https://i.pinimg.com/564x/2c/60/86/2c608693f21531817c6b10129840e9b3.jpg" alt="india" />
                            <p className='text-xl '>Mexico</p>
                        </div>
                        <p className='text-lg'>6,972</p>
                    </div>
                    <div className='flex justify-between px-[4rem] mt-[1rem]'> 
                        <div className='flex gap-[1rem] justify-center items-center'>
                            <img className='w-[1.5rem] rounded-full' src="https://i.pinimg.com/564x/a6/7a/f9/a67af9c593ba25a687b95e35d294dc18.jpg" alt="india" />
                            <p className='text-xl '>Sweden</p>
                        </div>
                        <p className='text-lg'>6,972</p>
                    </div>
                    <div className='flex justify-between px-[4rem] mt-[1rem]'> 
                        <div className='flex gap-[1rem] justify-center items-center'>
                            <img className='w-[1.5rem] rounded-full' src="https://i.pinimg.com/564x/2a/cb/7d/2acb7d9371550e4f145d5a1a841a41cb.jpg" alt="india" />
                            <p className='text-xl '>Vietnam</p>
                        </div>
                        <p className='text-lg'>6,972</p>
                    </div>
                </div> */}
                <div className='ml-[1rem] rounded-xl shadow-xl flex flex-col items-center justify-evenly lg:w-1/4 h-[25rem] bg-white'>
                    <div className='gap-[2rem] flex flex-row justify-center items-center'>
                        
                        <div className='flex flex-col justify-center items-center'>
                            <p className='font-light'>Total Users</p>
                            <p className='font-bold text-xl'>{totalVisitors}</p>
                        </div>
                        <p className='text-blue-500'>{percentage}%</p>
                    </div>
                    <div>
                    <VisitorGraph visitorData={visitorData} />
                    </div>
                </div>
            </div>
            <div className='mt-[2rem] flex flex-col lg:flex-row gap-[1rem]'>
               
                <div className='lg:w-1/3 h-[35rem] rounded-xl shadow-xl bg-white overflow-y-scroll no-scrollbar'>
                    <div className='flex justify-between px-[2rem] items-center pt-[1rem]'>
                        <p className='text-2xl font-bold'>Orders</p>
                        <Link to = {'/orderlist'}><p className='font-bold'>•••</p></Link>
                    </div>
                    {orderProducts.map((product, index) => (
                <div key={index} className='flex justify-between gap-[1rem] items-center px-[3rem]'>
                    <div className='flex justify-center items-center gap-[1rem] mt-[2rem]'>
                        <img className='w-[2rem]' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`} alt={product.orderItemProductName} />
                        <p className='font-bold'>{product.orderItemProductName}</p>
                    </div>
                    <div className='mr-[2.5rem] mt-[2rem]'>
                        <p className='font-bold'>₹{product.checkoutPrice}</p>
                    </div>
                </div>
            ))}
            
                      {/*   <div className=' flex justify-between gap-[1rem] items-center px-[3rem]'>
                            <div className='flex justify-center items-center gap-[1rem]'>
                                <img className='w-[2rem]' src="https://m.media-amazon.com/images/I/614GA7ARZxL._AC_UL640_FMwebp_QL65_.jpg" alt="" />
                                <p className='font-bold'>Park Avenue</p>
                            </div>
                            <div className='mr-[2.5rem]'>
                                <p className='font-bold'>₹320</p>
                            </div>
                        </div> */}
                        {/* <div className=' flex justify-between gap-[1rem] items-center px-[3rem]'>
                            <div className='flex justify-center items-center gap-[1rem]'>
                                <img className='w-[2rem]' src="https://m.media-amazon.com/images/I/614GA7ARZxL._AC_UL640_FMwebp_QL65_.jpg" alt="" />
                                <p className='font-bold'>Park Avenue</p>
                            </div>
                            <div className='mr-[2.5rem]'>
                                <p className='font-bold'>₹320</p>
                            </div>
                        </div> */}
                       {/*  <div className=' flex justify-between gap-[1rem] items-center px-[3rem]'>
                            <div className='flex justify-center items-center gap-[1rem]'>
                                <img className='w-[2rem]' src="https://m.media-amazon.com/images/I/614GA7ARZxL._AC_UL640_FMwebp_QL65_.jpg" alt="" />
                                <p className='font-bold'>Park Avenue</p>
                            </div>
                            <div className='mr-[2.5rem]'>
                                <p className='font-bold'>₹320</p>
                            </div>
                        </div> */}
                        {/* <div className=' flex justify-between gap-[1rem] items-center px-[3rem]'>
                            <div className='flex justify-center items-center gap-[1rem]'>
                                <img className='w-[2rem]' src="https://m.media-amazon.com/images/I/614GA7ARZxL._AC_UL640_FMwebp_QL65_.jpg" alt="" />
                                <p className='font-bold'>Park Avenue</p>
                            </div>
                            <div className='mr-[2.5rem]'>
                                <p className='font-bold'>₹320</p>
                            </div>
                        </div> */}
                        
                    
                </div>
               
               {/*  <div className='lg:w-1/3 h-[35rem] rounded-xl shadow-xl bg-white'>
                    <div className='flex justify-between px-[2rem] items-center pt-[1rem]'>
                        <p className='text-2xl font-bold'>Earnings</p>
                        <p className='font-bold'>•••</p>
                    </div>
                    <div>
                        <div className='flex gap-[1rem] items-center pl-[2rem] pt-[1.5rem]'>
                            <FontAwesomeIcon icon={faCircle} color='#D7E5FE' size='sm'/>
                            <p className='font-bold text-sm text-gray-400'>Revenue</p>
                        </div>
                        <div className='flex gap-[1rem] items-center pl-[2rem] pt-[0.5rem]'>
                            <p className='text-3xl font-bold'>{earnings.revenue}</p>
                            
                        </div>
                    </div>
                    <div>
                        <div className='flex gap-[1rem] items-center pl-[2rem] pt-[1.5rem]'>
                            <FontAwesomeIcon icon={faCircle} color='#4F86E8' size='sm'/>
                            <p className='font-bold text-sm text-gray-400'>Profit</p>
                        </div>
                        <div className='flex gap-[1rem] items-center pl-[2rem] pt-[0.5rem]'>
                            <p className='text-3xl font-bold'>10</p>
                            <p className='text-green-500'>0.56%</p>
                        </div> 
                    </div>
                     <div>
                     
                    </div> 
                </div>  */}
                <div className=' ml-[2rem] lg:w-1/3 h-[35rem] rounded-xl shadow-xl bg-white overflow-y-scroll no-scrollbar'>
                    <div className='flex justify-between px-[2rem] items-center pt-[1rem]'>
                        <p className='text-2xl font-bold'>New Comments</p>
                        <p className='font-bold'>•••</p>
                    </div>
                    <div className='reviews-container flex flex-col'>
                        {reviews.map((review, index) => (
                        <div 
                            key={index} 
                            className='review-item flex justify-start items-start py-[0.5rem] px-[1rem] gap-[1rem] border-b border-gray-300'>
                            <img 
                                className='w-[3rem] rounded-full' 
                                src="https://i.pinimg.com/564x/4e/22/be/4e22beef6d94640c45a1b15f4a158b23.jpg" 
                                alt={review.Name} 
                        />
                        <div>
                            <p className='font-bold text-sm'>{review.Name}</p>
                            <div className='flex'>
                                {[...Array(5)].map((_, i) => (
                                    <FontAwesomeIcon
                                        key={i}
                                        icon={faStar}
                                        color={i < review.rating ? 'gold' : 'gray'}
                                        size='sm'
                                    />
                                ))}
                            </div>
                            <p className='font-light text-sm'>{review.review}</p>
                        </div>
                        </div>
                        ))}
                    </div>

                   {/* 
                       <div className='flex justify-center items-start py-[0.5rem] px-[1rem] gap-[1rem]'>
                        <img className='w-[3rem] rounded-full' src="https://i.pinimg.com/564x/4e/22/be/4e22beef6d94640c45a1b15f4a158b23.jpg" alt="" />
                        <div>
                            <p className='font-bold text-sm'>Kathryn Murphy</p>
                            <FontAwesomeIcon icon={faStar} color='gold' size='sm'/>
                            <FontAwesomeIcon icon={faStar} color='gold' size='sm'/>
                            <FontAwesomeIcon icon={faStar} color='gold' size='sm'/>
                            <FontAwesomeIcon icon={faStar} color='gold' size='sm'/>
                            <FontAwesomeIcon icon={faStar} color='gray' size='sm'/>
                            <p className='font-light text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, repellat? Beatae consectetur sequi distinctio quos.</p>
                        </div>
                    </div> */}
                </div>
            </div>
    </div>
  )
}

export default Home