import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

function AdminLogin() {
  const navigate = useNavigate();
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
      const timer = setTimeout(() => setMsg(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  const handleInputChange = (e, type) => {
    setError("");
    if (type === "email") {
      setEmail(e.target.value);
      if (e.target.value === "") {
        setError("Email has been left Blank!");
      }
    } else if (type === "password") {
      setPassword(e.target.value);
      if (e.target.value === "") {
        setError("Password has been left Blank!");
      }
    }
  };

  const loginSubmit = () => {
    if (email !== "" && password !== "") {
      const url = "http://localhost/waltzify_copy_fake/Backend/AdminLogin.php";
      const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
      };
      const data = { email, password };

      fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.result === "Invalid Email!" || response.result === "Invalid Password" || response.result === "Invalid Email or Password") {
            setError(response.result);
            setTimeout(() => {
              navigate('/AdminLogin');
            }, 2000);
          } else {
            setMsg(response.result);
            localStorage.setItem('adminData', JSON.stringify(response.data));
            // Redirect based on role
            navigate('/NavAfterLog');
            if (response.data.role === 'Main Admin') {
              navigate('/NavAfterLog');
            }else if (response.data.role === 'Sub Admin') {
              navigate('/newcategory');
            }
            else if (response.data.role === 'Sub Admin') {
              navigate('/addproduct');
            } 
            else if (response.data.role === 'Sub Admin') {
              navigate('/review');
            }   
            else if (response.data.role === 'Sub Admin') {
              navigate('/userlist');
            } 
            else if (response.data.role === 'HandleOrderAdmin') {
              navigate('/orderlist');
            } 
            else if (response.data.role === 'Main Admin') {
              navigate('/addadmin');
            }            
            else {
              setError("Unknown role");
            } 
          }
        })
        .catch((err) => {
          setError("An error occurred. Please try again later.");
          console.error(err); // Log for debugging purposes
        });
    } else {
      setError("All fields are required!");
    }
  };

  return (
    <div className='flex flex-col items-center gap-[2rem] mt-[6rem]'>
      <div className='text-center pb-[3rem]'>
        <h3 className='text-4xl'>Admin Login</h3><br></br>
        <p className='text-2xl'>Enter your credential login</p>
      </div>
      <div className='flex flex-col md:w-1/4 gap-6 border-[1px] p-[3rem] rounded-2xl border-black'>
        <p>
          {msg ? <span className="success">{msg}</span> : <span className="error">{error}</span>}
        </p>
        <input className='border-[1px] border-black p-2 rounded-3xl outline-none' type="email" value={email} onChange={(e) => handleInputChange(e, "email")} placeholder='email' />
        {/* <input className='border-[1px] border-black p-2 rounded-3xl outline-none' type="password" value={password} onChange={(e) => handleInputChange(e, "password")} placeholder='Password' /> */}
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

        <button type="submit" onClick={loginSubmit} className='bg-black text-white p-2 rounded-3xl font-bold'>Login</button>
        {/*<p className='cursor-pointer font-bold'><Link to = {'/changepassword'}>Forgot Password?</Link></p>*/}
      </div>
      <div>
        <p className='cursor-default'>Forgot Password? <Link to={'/changeadminpassword'}><span className='text-[#00843C] font-bold cursor-pointer'>Forgot Password</span></Link></p>
      </div>
    </div>
  );
}

export default AdminLogin;

























