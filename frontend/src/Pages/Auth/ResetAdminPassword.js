import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ResetAdminPassword() {
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
        const response = await fetch("http://localhost/waltzify_copy_fake/Backend/update_adminPwd.php", {
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
          setTimeout(() => navigate('/adminlogin'), 2000);
        }
      } catch (err) {
        setError("Error: " + err.message);
      }
    } else {
      setError("All fields are Required!");
    }
  };


  return (
    <div className='flex flex-col items-center gap-[2rem] mt-[6rem]'>
      <div className='text-center pb-[3rem]'>
        <h3 className='text-4xl'>Reset Password!</h3><br></br>
        <p className='text-2xl'>Enter your new password</p>
      </div>
      <div className='flex flex-col md:w-1/4 gap-6 border-[1px] p-[3rem] rounded-2xl border-black'>
        <p>
          {msg ? <span className="success">{msg}</span> : <span className="error">{error}</span>}
        </p>
        <form className='flex flex-col gap-[1rem]' onSubmit={handleSubmit}>
          {/* <input className='border-[1px] border-black p-2 rounded-3xl outline-none' type="password" value={password} onChange={(e) => handleInputChange(e, "password")} placeholder='Enter New Password' /> */}
          <div className='relative'>
              <input 
                className='border-[1px] border-black p-2 rounded-3xl outline-none w-full' // Add pr-10 for icon space
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => handleInputChange(e, 'password')} 
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
          <button type="submit" className='bg-black text-white p-2 rounded-3xl font-bold'>Reset Password</button>
        </form>
        <Link to={'/AdminLogin'}>
          <p className='cursor-pointer font-bold'>Want to Login?</p>
        </Link>
      </div>
      
    </div>
  )
}

export default ResetAdminPassword;

