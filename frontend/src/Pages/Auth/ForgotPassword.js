import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (msg) {
            const timer = setTimeout(() => {
                setMsg('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [msg]);

    const handleInputChange = (e, type) => {
        setError('');
        if (type === 'email') {
            setEmail(e.target.value);
        } else if (type === 'phone') {
            setPhone(e.target.value);
        }
    };

    const loginSubmit = (e) => {
        e.preventDefault();
        if (email.trim() === '' && phone.trim() === '') {
            setError('At least one field is required!');
            return;
        }
        const url = 'http://localhost/waltzify_copy_fake/Backend/check_user.php';
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        const data = { email, phone };

        fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
            credentials: 'include', // Include credentials (cookies)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((response) => {
                if (response.result === 'Email or Phone Not Exist!') {
                    setError(response.result);
                } else {
                    setMsg(response.result);
                    setTimeout(() => {
                        navigate('/enterotp');
                    }, 1000);
                }
            })
            .catch((err) => {
                setError('An error occurred. Please try again later.');
                console.error('Error fetching data:', err);
            });
    };

    return (
        <div className='px-[1rem] mt-[12vw] lg:mt-[8vw] flex items-center justify-center py-[2.5rem] bg-[#ffc89b]'>
            <div className='flex lg:w-2/3 lg:h-[90vh] overflow-hidden rounded-xl'>
                <div className='hidden lg:block relative w-1/2'>
                    <img className=' w-full h-[90vh]' src="https://i.pinimg.com/564x/5d/fb/5f/5dfb5f08b8d33aacd35b672339bd679a.jpg" alt="bg" />
                    <p className='text-white font-bold absolute top-[12rem] left-4 text-7xl'>Don't Remember Password? No worries!</p>
                </div>
                <div className='lg:w-1/2 rounded-r-xl pb-[1rem] bg-white pt-[5rem] flex flex-col pl-[2rem] lg:pl-[5rem] mr-[2rem] pr-[3rem] gap-[2rem]'>
                    <h1 className='text-5xl font-bold text-orange-500'>Forgot Password</h1>
                    <p className='font-thin w-[18rem]'>Enter your details to retrieve your password</p>
                    {error && <p className='text-red-500'>{error}</p>}
                    {msg && <p className='text-green-500'>{msg}</p>}
                    <form className='flex flex-col gap-[1rem]' onSubmit={loginSubmit}>
                        <label className='text-gray-500 p-1' htmlFor="email">Email</label>
                        <input className='w-[15rem] lg:w-[20rem] border-2 p-1 outline-none' type="email" value={email}
                            onChange={(e) => handleInputChange(e, 'email')} placeholder='example@gmail.com' />
                        <button type='submit' className='submit_button w-[15rem]'>Enter</button>
                    </form>
                    <Link to={'/register'}>
                        <p className='text-lg'>New User? <button className='text-orange-500 font-bold'>Sign up</button></p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
