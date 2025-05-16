import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EnterAdminOTP() {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [timeRemaining, setTimeRemaining] = useState(120); // 200 seconds = 2 minutes
    const navigate = useNavigate();

    useEffect(() => {
        if (timeRemaining > 0) {
            const timer = setInterval(() => {
                setTimeRemaining(timeRemaining - 1);
            }, 1000);
            return () => clearInterval(timer); // Clear timer on component unmount
        } else {
            setError('OTP has expired. Please request a new one.');
        }
    }, [timeRemaining]);

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const verifyOtp = (e) => {
        e.preventDefault();
        const url = 'http://localhost/waltzify_copy_fake/Backend/admin_verify_otp.php';
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        const data = { otp };

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
                if (response.result === 'Invalid OTP') {
                    setError(response.result);
                    navigate('/enterotp');
                } else {
                    setMsg(response.result);
                    setTimeout(() => {
                        navigate('/resetadminpassword'); // Navigate to password reset page
                    }, 1000);
                }
            })
            .catch((err) => {
                setError('Error verifying OTP. Please try again later.');
                console.error('Error verifying OTP:', err);
            });
    };

    // Convert timeRemaining from seconds to minutes:seconds format
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className='flex  items-center justify-center'>
            <form className='mt-[5rem] flex flex-col gap-4' onSubmit={verifyOtp}>
                <h2>Enter the OTP sent to your email or phone</h2>
                {error && <p className='text-red-500'>{error}</p>}
                {msg && <p className='text-green-500'>{msg}</p>}
                <input className='h-[2rem] outline-none border-2 rounded-xxl border-black'
                    type='text'
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder='Enter OTP'
                    required
                />
                <p>Time remaining: {formatTime(timeRemaining)}</p>
                <button className='ml-[4rem] bg-black text-white mb-[10rem] rounded-xl h-[3rem] w-[10rem]' type='submit' disabled={timeRemaining <= 0}>Verify OTP</button>
            </form>
        </div>
    );
}

export default EnterAdminOTP;