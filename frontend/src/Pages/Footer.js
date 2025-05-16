import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyMap from './Map/MyMap'; // Import your map component
import { faTwitter, faInstagram, faYoutube, faFacebook ,faWhatsapp} from '@fortawesome/free-brands-svg-icons';
import { faBold, faPhone } from '@fortawesome/free-solid-svg-icons';
function Footer() {
    const [categories, setCategories] = useState([]);
    const [email, setEmail] = useState('');
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state

    useEffect(() => {
        fetch('http://localhost/waltzify_copy_fake/Backend/Fetch_category.php')
            .then(response => response.json())
            .then(data => {
                // console.log("Fetched data:", data); // Debugging
                if (Array.isArray(data)) {
                    setCategories(data); // Ensure only arrays are set
                } else {
                    // console.error("Data is not an array:", data);
                    setCategories([]); // Set an empty array to prevent crashes
                }
            })
            .catch(error => console.error('Error fetching products:', error));
    }, [])

    const handleInputChange = (e) => {
        setError("");
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) {
            return; // Prevent submission if already in progress
        }

        if (email) {
            setIsSubmitting(true); // Disable the button when form submission starts

            try {
                const formData = new FormData();
                formData.append('email', email);

                const response = await fetch('http://localhost/waltzify_copy_fake/Backend/add_subscribe_email.php', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                if (data[0].result === 'Not Submitted') {
                    setError(data[0].result);
                } else {
                    setMsg(data[0].result);
                }
            } catch (err) {
                setError('Error: ' + err.message);
            } finally {
                setIsSubmitting(false); // Re-enable the button after the request is complete
            }
        } else {
            setError('All fields are Required!');
        }
    };

    useEffect(() => {
        if (msg || error) {
            const timer = setTimeout(() => {
                setMsg('');
                setEmail('');
                setError('');
            }, 2000); // Clear messages after 2 seconds

            return () => clearTimeout(timer); // Cleanup timer on unmount
        }
    }, [msg, error]);

    return (
        <div className='w-full'>
            <div className='bg-black py-[1.5rem] flex flex-col lg:flex-row justify-center px-[1rem] lg:gap-6 gap-2 lg:justify-evenly text-white'>
                
                <div className='lg:w-1/3 h-[20rem]'>
                    <MyMap /> 
                </div>

                <div className='lg:w-[40rem] flex flex-col justify-between'>
                    <div className='flex lg:gap-4 gap-2 text-sm'>
                        <div className='flex flex-col gap-3 font-thin'>
                            <p className='font-bold text-lg'>Company</p>
                            <Link to={'/about'}><p className='hover:text-orange-500'>About Us</p></Link>
                            <Link to={'/return'}><p className='hover:text-orange-500 cursor-pointer lg:text-sm'>Return/Exchange</p></Link>
                            <Link to={'/returnpolicy'}><p className='hover:text-orange-500'>Refund Policy</p></Link>
                            <Link to={'/terms'}><p className='hover:text-orange-500'>Terms and Conditions</p></Link>
                        </div>

                        <div className='flex flex-col gap-2 font-thin lg:ml-[2rem] lg:w-[10rem]'>
                            <p className='font-bold text-lg'>Product</p>
                            {categories.map((category, index) => (
                                <div key={index}>
                                    <Link to={`/category/${category.cname}`}><p className='hover:text-orange-500'>{category.cname}</p></Link>
                                </div>
                            ))}
                        </div>

                        <div className='flex flex-col h-[13rem] ml-[0.5rem] lg:ml-[4rem] gap-[0.5rem] justify-between font-thin w-[6rem] lg:w-[13rem]'>
                            <p className='font-bold text-lg'>Help & contact</p>
                            <div className='flex lg:justify-between items-center gap-5'>
                                <div className=' w-[5rem] lg:w-[10rem]'>
                                    <p className='text-sm font-bold'>Email Support</p>
                                    <p className='text-xs lg:text-sm hover:text-orange-500'><a href="mailto:info@waltzify.com">info@waltzify.com</a></p>
                                    <p className='text-xs lg:text-sm hover:text-orange-500'><a href="mailto:sales@waltzerindia.com">sales@waltzerindia.com</a></p>
                                </div>
                            </div>
                            <div className='flex lg:justify-between items-center gap-5'>
                            <div className=' w-[10rem]'>
                                <p className='text-sm font-bold'>Phone Support</p>

                                <a href="tel:+91 7314245858" className="mt-[0.5rem] flex flex-nowrap gap-2 w-[10rem] text-white" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faPhone} size='sm'/> {/* WhatsApp icon */}
                                
                                <p className='text-xs hover:text-orange-500'>+91-7314245858</p>
                                </a>
                            </div>
                            </div>
                            <div className='flex lg:justify-between items-center gap-5'>
                            <div className = ' w-[10rem]'>
                                
                                <a href="https://wa.me/9522582422" className="mt-[0.5rem] flex flex-nowrap gap-2 w-[10rem] text-white hover:none" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faWhatsapp} size='sm'/> {/* WhatsApp icon */}
                                <p className='flex flex-nowrap hover:text-orange-500 text-xs'>+91-9522582422</p>
                                </a>
                            </div>
                            </div>
                            <p className='mt-[1rem] text-xs'><span className='font-bold'>Address : </span>Main Gate, 1A-Balaji Market, Hawa Bangala Rd, near R.R. Cat, opp. Hari Dham Mandir, Indore, Madhya Pradesh 452009</p>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-[1rem]'>
                    <p className='font-bold text-xl'>Connect with us</p>
                    <div className='flex gap-2'>
                        <Link to={`https://x.com/waltzerindia`} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} size='lg' className='bg-yellow-500 p-2 hover:bg-amber-600'/></Link>
                        <Link to={`https://www.instagram.com/waltzifywaltzer/`} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} size='lg' className='bg-yellow-500 p-2 hover:bg-amber-600'/></Link>
                        <Link to={`https://www.youtube.com/@waltzerindia`} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faYoutube} size='lg' className='bg-yellow-500 p-2 hover:bg-amber-600'/></Link>
                        <Link to={`https://www.facebook.com/waltzerindia/`} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} size='lg' className='bg-yellow-500 p-2 hover:bg-amber-600'/></Link>
                    </div>
                    <form className='flex flex-col gap-[1rem]' onSubmit={handleSubmit}>
                        <input className='mt-[2rem] p-2 w-[15rem] rounded-lg text-black' type="email" placeholder='example@gmail.com' value={email} onChange={handleInputChange} />
                        <div>
                            <button 
                                className={`bg-yellow-500 hover:bg-amber-600 text-black w-[15rem] rounded-lg p-1 ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`} 
                                type="submit"
                                disabled={isSubmitting} // Disable button during submission
                            >
                                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </div>
                        {msg && ( // Conditional rendering for the success message
                            <p className='text-green-300 mt-2'>
                                {msg}
                            </p>
                        )}
                        {error && ( // Conditional rendering for error message
                            <p className='text-red-500 mt-2'>
                                {error}
                            </p>
                        )}
                    </form>
                </div>
            </div>
            <div className='text-center bg-black text-white lg:ml-auto md:max-md:mt-[2rem] md:max-md:ml-0'>
                <p className='py-[2rem]'> © Copyright Waltzer India 2024. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Footer;

