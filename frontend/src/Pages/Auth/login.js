import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './style.css';
import { useUser } from '../../Context/UserContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [email, setEmail] = useState("");
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

  const handleInputChange = (e, type) => {
    setError('');
    if (type === 'email') {
      setEmail(e.target.value);
    } else if (type === 'password') {
      setPassword(e.target.value);
    }
  };

  const loginSubmit = () => {
    if (email.trim() === '' || password.trim() === '') {
        setError('All fields are required!');
        return;
    }
    const url = 'http://localhost/waltzify_copy_fake/Backend/UserLogin.php';
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
    const data = { email, password };

    fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((response) => {
            if (response.result) {
                if (response.result === 'Invalid Email or Password') {
                    setError(response.result);
                    navigate('/login');
                } 
                else if (response.result === 'Please verify your email before logging in.We have already sent a verfication link on your email.'){
                  setError(
                    <span>
                        {response.result}
                      
                    </span>
                );
                  
                }
                else {
                    login(response.data); // Update context state
                    setMsg(response.result);
                    setTimeout(() => {
                        navigate('/allproduct');
                    }, 1000);
                }
            } else {
                throw new Error('Unexpected response format from server');
            }
        })
        .catch((err) => {
            setError('An error occurred. Please try again later.');
            console.error('Error fetching data:', err);
        });
};

  
  return (
    <div className='flex items-center lg:mt-[8vw] mt-[21vw] justify-center py-[2.5rem] bg-[#ffc89b]'>
      <div className='flex lg:w-2/3 lg:h-[90vh] overflow-hidden rounded-xl'>
        {/* image */}
        <div className='hidden lg:block relative w-1/2'>
          <img className=' w-full h-[90vh]' src="https://i.pinimg.com/564x/5d/fb/5f/5dfb5f08b8d33aacd35b672339bd679a.jpg" alt="bg" />
          <p className='text-white font-bold absolute top-[16rem] left-4 text-8xl'> Hey There Welcome!</p>
        </div>
        {/* details */}
        <div className='lg:h-[90vh] lg:w-1/2 bg-white py-[2rem] flex flex-col pl-[2rem] lg:pl-[5rem] pr-[3rem] gap-[1rem]'>
          <h1 className='text-5xl font-bold text-orange-500'>Login</h1>
          <p className='font-thin w-[17rem]'>Welcome! Please enter your credentials to create an account.</p>
          {msg ? <span className="success font-bold">{msg}</span> : <span className="error font-bold">{error}</span>}
          <form className='flex flex-col gap-[1rem]' action="submit">
            <label className='text-gray-500 p-1' htmlFor="username">Username</label>
            <input className='border-2 p-1 outline-none' type="email" value={email}
              onChange={(e) => handleInputChange(e, 'email')} placeholder='example@gmail.com' required />
            <label className='text-gray-500 p-1' htmlFor="password">Password</label>
            <div className='relative'>
              <input 
                className='border-2 p-1 pr-12 outline-none w-full' // Add pr-10 for icon space
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

            {/* <input className='border-2 p-1 outline-none' type="password" value={password}
              onChange={(e) => handleInputChange(e, 'password')} placeholder='******' required /> */}
            <button type='button' className='submit_button' onClick={loginSubmit}>Login</button>
          </form>
          <Link to={'/forgotpassword'}>
            <p className='text-lg'>Forgot Password? <button className='text-orange-500 font-bold'>Click Here!</button></p>
          </Link>
          <Link to={'/register'}>
            <p className='text-lg'>Don't have an Account? <button className='text-orange-500 font-bold'>Sign up</button></p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;








