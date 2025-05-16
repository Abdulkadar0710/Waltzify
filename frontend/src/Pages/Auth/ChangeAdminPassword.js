import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ChangeAdminPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => setMsg(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  const loginSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === '') {
        setError('Email field is required!');
        return;
    }
    const url = 'http://localhost/waltzify_copy_fake/Backend/check_admin.php';
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
    const data = { email };

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
            if (response.result === 'Email Not Exist!') {
                setError(response.result);
            } else {
                setMsg(response.result);
                setTimeout(() => {
                  if(response.result === 'Email or Phone Not Exist!'){
                    navigate('/adminlogin');
                  }
                  else
                  {
                    navigate('/enteradminotp');
                  }
                }, 1000);
            }
        })
        .catch((err) => {
            setError('An error occurred. Please try again later.');
            console.error('Error fetching data:', err);
        });
  };

  const handleInputChange = (e, type) => {
    setError("");
    if (type === "email") {
      setEmail(e.target.value);
      if (e.target.value === "") {
        setError("Email cannot be left Blank!");
      }
    }
  };

  return (
    <div className='flex flex-col items-center gap-[2rem] mt-[6rem]'>
      <div className='text-center pb-[3rem]'>
        <h3 className='text-4xl'>Forgot Password!</h3><br></br>
        <p className='text-2xl'>Enter your new password</p>
      </div>
      <div className='flex flex-col md:w-1/4 gap-6 border-[1px] p-[3rem] rounded-2xl border-black'>
        <p>
          {msg ? <span className="success">{msg}</span> : <span className="error">{error}</span>}
        </p>
        <form className='flex flex-col gap-[1rem]' onSubmit={loginSubmit}>
          <input className='border-[1px] border-black p-2 rounded-3xl outline-none' type="email" value={email} onChange={(e) => handleInputChange(e, "email")} placeholder='Enter Your Email Here..' />
          <button type="submit" className='bg-black text-white p-2 rounded-3xl font-bold'>Verify</button>
        </form>
        <Link to={'/AdminLogin'}>
          <p className='cursor-pointer font-bold'>Want to Login?</p>
        </Link>
      </div>
      
    </div>
  )
}

export default ChangeAdminPassword;
