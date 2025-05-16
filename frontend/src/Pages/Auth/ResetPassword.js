import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './style.css';

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => {
        setMsg('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  const handleInputChange = (e) => {
    setError('');
    setPassword(e.target.value);
  };
  const isPasswordValid = (password) => {
    const minLength = 8;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const digitRegex = /\d/;
    const uppercaseRegex = /[A-Z]/;
    
    if (password.length < minLength) {
      return 'Password must be at least 8 characters long.';
    }
    if (!specialCharRegex.test(password)) {
      return 'Password must contain at least one special character.';
    }
    if (!digitRegex.test(password)) {
      return 'Password must contain at least one digit.';
    }
    if (!uppercaseRegex.test(password)) {
      return 'Password must contain at least one uppercase letter.';
    }
    return '';
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordError = isPasswordValid(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    if (password) {
      try {
        const response = await fetch("http://localhost/waltzify_copy_fake/Backend/resetPassword.php", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password }),
          credentials: 'include', // Include credentials (cookies)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data[0].result === "Not Submitted, Please try again!") {
          setError(data[0].result);
        }
        else if(data[0].result === "Session expired. Please try again.")
        {
            setError(data[0].result);
            //setTimeout(() => navigate('/forgorPassword'));
        } 
        else if(data[0].result === "Session expired or OTP not verified. Please try again."){
          setError(data[0].result);
        }
          else {
          setMsg(data[0].result);
          setTimeout(() => navigate('/login'), 2000);
        }
      } catch (err) {
        setError("Error: " + err.message);
      }
    } else {
      setError("All fields are Required!");
    }
  };

  return (
    <div className='flex items-center justify-center py-[2.5rem] bg-[#ffc89b]'>
      <div className='flex lg:w-2/3 lg:h-[90vh] overflow-hidden rounded-xl'>
        <div className='hidden lg:block relative w-1/2'>
          <img className=' w-full h-[90vh]' src="https://i.pinimg.com/564x/5d/fb/5f/5dfb5f08b8d33aacd35b672339bd679a.jpg" alt="bg" />
          <p className='text-white font-bold absolute top-[16rem] left-4 text-8xl'> Hey There Welcome Back!</p>
        </div>
        <div className='lg:w-1/2 bg-white py-[4rem] flex flex-col pl-[2rem] lg:pl-[5rem] pr-[3rem] gap-[2rem]'>
          <h1 className='text-5xl font-bold text-orange-500'>Reset Your Password Here!</h1>
          <p className='font-thin w-[20rem]'>Set a new password for your account</p>
          {error && <p className='text-red-500'>{error}</p>}
            {msg && <p className='text-green-500'>{msg}</p>}
          <form className='flex flex-col gap-[1rem]' onSubmit={handleSubmit}>
            <label className='text-gray-500 p-1' htmlFor="password">Password</label>
{/*             <input className='border-2 p-1 outline-none' type="password" value={password}
              onChange={handleInputChange} placeholder='New Password' /> */}
              <div className='relative'>
              <input 
                className='border-2 p-1 pr-12 outline-none w-full' // Add pr-10 for icon space
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={handleInputChange} 
                placeholder='******' 
                required 
              />
              {/* Icon for showing/hiding password */}
              <span 
                className='absolute right-3 top-2 cursor-pointer' 
                onClick={togglePasswordVisibility}>
                {showPassword ? (
                   <svg
                   xmlns="http://www.w3.org/2000/svg"
                   className="h-6 w-6 text-gray-500"
                   fill="none"
                   viewBox="0 0 24 24"
                   stroke="currentColor"
                   strokeWidth="2"
                 >
                   {/* Eye shape */}
                   <path d="M12 4.5c4.142 0 7.5 2.686 9 6.5-1.5 3.814-4.858 6.5-9 6.5s-7.5-2.686-9-6.5c1.5-3.814 4.858-6.5 9-6.5z" />
                   {/* Eye's center (pupil) */}
                   <path d="M12 9a3 3 0 110 6 3 3 0 010-6z" />
                   {/* Diagonal line cutting the eye */}
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                 </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.823 7.548 5 12 5c4.452 0 8.268 2.823 9.542 7-.017.472-.068.937-.152 1.39" />
                  </svg>
                )}
              </span>
            </div>
            <button type='submit' className='submit_button w-[15rem]'>Submit</button>
            
          </form>
          <Link to='/login'>
            <p className='text-lg text-center '>Back to <button className='text-orange-500 font-bold'>Login</button></p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;










