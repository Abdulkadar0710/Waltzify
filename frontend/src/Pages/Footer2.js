import React ,{useState,useEffect}from 'react'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import { faTwitter, faInstagram, faYoutube, faFacebook} from '@fortawesome/free-brands-svg-icons'


function Footer() {
    const [categories,setCategories] = useState([]);
    const [subscribed, setSubscribed] = useState(false);
    const [email, setEmail] = useState(''); // State to track the email input
    useEffect(() => {
        fetch('http://localhost/waltzify_copy_fake/Backend/Fetch_category.php')
          .then(response => response.json())
          .then(data => setCategories(data))
          .catch(error => console.error('Error fetching products:', error));
      }, []);
      
      const handleSubscribe = () => {
        
        if (email) {
            // Simulate a subscription action (e.g., API call)
            // After the action is complete, set the subscribed state to true
            setSubscribed(true);
        } else {
           
            alert('Please enter a valid email address');
        }
    };
    
  return (
    <div className='w-full'>
        {/* top */}
         
        {/* bottom */}
        <div className='bg-[#252527] py-[3rem] flex flex-col lg:flex-row justify-center px-[1rem] lg:gap-6 gap-2 lg:justify-evenly text-white'>
            {/* map */}
            
            <div className='lg:w-1/3 h-[20rem]'>
            <Link to = 'https://maps.app.goo.gl/wRtgDBafm2gsV4kn6'>
                <img className = 'w-full h-full' src = {require('../asset/map.png')} alt = ""/>
            </Link> 
            </div>
            
            {/* category */}
            <div className='lg:w-[40rem] flex flex-col justify-between'>
                <div className='flex lg:gap-4 gap-2 text-sm'>
                    <div className='flex flex-col gap-3 font-thin'>
                        <p className='font-bold text-xl'>Company</p>
                        <Link to={'/about'}><p>About Us</p></Link>
                        <Link to={'/return'}><p className='cursor-pointer lg:text-sm'>Return/Exchange</p></Link>
                        <Link to={'/returnpolicy'}><p>Refund Policy</p></Link>
                        <Link to={'/terms'}><p>Terms and Conditions</p></Link>
                    </div>
                    
                    <div className='flex flex-col gap-2 font-thin lg:ml-[2rem] lg:w-[10rem]'>
                        <p className='font-bold text-xl'>Product</p>
                        {categories.map((category, index) => (
                            <div key={index}>
                        <Link to={`/category/${category.cname}`}><p>{category.cname}</p></Link>
                        {/*< Link to={'/Search & Rescue'}><p>Search & Rescue</p></Link>
                        <Link to={'/Silica Gel'}><p>Silica Gel</p></Link>
                        <Link to = {'/Civil Lab Equipments'}><p>Civil Lab Equipments</p></Link>
                        <Link to = {'/Sneakers'}><p>Personal Care</p></Link>
                        <Link to={'/Safety Products'}><p>Safety Products</p></Link>
                        <Link to={'/Search & Rescue'}><p>Search & Rescue</p></Link>
                        <Link to={'/Silica Gel'}><p>Silica Gel</p></Link>
                        <Link to = {'/Civil Lab Equipments'}><p>Civil Lab Equipments</p></Link>
                        <Link to = {'/Sneakers'}><p>Personal Care</p></Link> */}
                        </div>
                    ))}    
                    </div>
                   
                    <div className='flex flex-col h-[13rem] ml-[0.5rem] lg:ml-[4rem] gap-[0.5rem] justify-between font-thin w-[6rem] lg:w-[13rem]'>
                        <p className='font-bold text-xl'>Help & contact</p>
                        
                        <div className='flex lg:justify-between items-center gap-5'>
                            {/* <FontAwesomeIcon className='border-2 p-1 rounded-full bg-white' icon={faEnvelope} size='xl' color='#2E2D39'/> */}
                            <div className=' w-[5rem] lg:w-[10rem]'>
                                <p className='text-sm font-bold'>Email Support</p>
                                <p className='text-xs lg:text-sm'> <a href="mailto:info@waltzify.com">info@waltzify.com</a></p>
                                <p className='text-xs lg:text-sm'><a href="mailto:info@waltzify.com">info@waltzify.com</a></p>
                            </div>
                        </div>
                        <div className='flex lg:justify-between items-center gap-5'>
                            {/* <FontAwesomeIcon className='border-2 p-1 rounded-full bg-white' icon={faPhone} size='xl' color='#2E2D39'/> */}
                            <div className=' w-[10rem]'>
                                <p className='text-sm font-bold'>Phone Support</p>
                                <a href="tel:+91 7314245858" className="text-white hover:none">
                                <p className='text-sm'>+91 7314245858</p>
                                </a>
                            </div>
                        </div> 
                        <div className='flex lg:justify-between items-center gap-5'>
                            {/* <FontAwesomeIcon className='border-2 p-1 rounded-full bg-white' icon={faWhatsapp} size='xl' color='#2E2D39'/> */}
                            <div className = ' w-[10rem]'>
                                <p className='text-sm font-bold'>Whatsapp Support</p>
                                <a href="https://wa.me/9522582422" className="text-white hover:none">
                                <p className='text-sm'>+91-9522582422</p>
                                </a>
                            </div>
                        </div>

                        
                        <p className='mt-[1rem]'><span className='font-bold'>Address:</span> Main Gate, 1A-Balaji Market, Hawa Bangala Rd, near R.R. Cat, opp. Hari Dham Mandir, Indore, Madhya Pradesh 452009</p>
                    </div>
                </div>
                <div className='mt-[1rem]'>
                    <p className='text-sm w-[10rem] lg:w-full'>Copyright © 2024 Waltzer.com All rights reserved</p>
                </div>
            </div>
            {/* connect */}
            <div className='flex flex-col gap-[1rem]'>
                <p className='font-bold text-xl'>Connect with us</p>
                <div className='flex gap-2'>
                    <Link to = {`https://x.com/waltzerindia`}><FontAwesomeIcon icon={faTwitter} size='lg' className='bg-yellow-500 p-2'/></Link>
                    <Link to = {`https://www.instagram.com/waltzifywaltzer/`}><FontAwesomeIcon icon={faInstagram} size='lg' className='bg-yellow-500 p-2'/></Link>
                    <Link to = {`https://www.youtube.com/@waltzerindia`}><FontAwesomeIcon icon={faYoutube} size='lg' className='bg-yellow-500 p-2'/></Link>
                    <Link to = {`https://www.facebook.com/waltzerindia/`}><FontAwesomeIcon icon={faFacebook} size='lg' className='bg-yellow-500 p-2'/></Link>
                </div>
                <input className='mt-[2rem] p-2 w-[15rem] rounded-lg text-black' type="text" placeholder='example@gmail.com'  value={email}  // Bind the input value to the email state
    onChange={(e) => setEmail(e.target.value)}/>
                <div>
                        {!subscribed ? (
                            <button
                                className='bg-yellow-500 text-black w-[15rem] rounded-lg p-1'
                                onClick={handleSubscribe}
                            >
                                Subscribe
                            </button>
                        ) : (
                            <p className='text-green-300'>Thank you for subscribing us!</p>
                        )}
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Footer