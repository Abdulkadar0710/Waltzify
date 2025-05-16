import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

function Sign() {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pfile, setPfile] = useState(null);
  const [password,setPassword] = useState(''); 
  const [role,setRole] = useState('');
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  
  const handleInputChange = (e, type) => {
    setError("");
    const value = e.target.value;
    switch (type) {
      case "email":
        setEmail(value);
        break;
      case "name":
        setName(value);
        break;
    
      case "pfile":
        setPfile(e.target.files[0]);
        break;
      case "password":
        setPassword(value);
        break;
      case "role":
          setRole(value);
          break;
      default:
        break;
    }
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
    if (email && name && pfile && password && role) {
      const passwordError = isPasswordValid(password);
          if (passwordError) {
            setError(passwordError);
            return;
          }
      try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("name", name);
        formData.append("pfile", pfile);
        formData.append("password", password);
        formData.append("role", role);
        
  
        const response = await fetch("http://localhost/waltzify_copy_fake/Backend/AdminSign.php", {
          method: "POST",
          body: formData
        });
  
        const data = await response.json();
        if (data[0].result === "Not Submitted,Please try again!" || data[0].result === "File upload failed") {
          setError(data[0].result);
        } else {
          setMsg(data[0].result);
          setTimeout(() => navigate('/AdminLogin'), 2000);
        }
      } catch (err) {
        setError("Error: " + err.message);
      }
    } else {
      setError("All fields are Required!");
    }
  };
  return (
    <div className='flex flex-col items-center gap-[2rem] mt-[3rem] md:mt-[1rem]'>
      <div className='text-center pb-[20px] md:pb-[5px]'>
        <h1 className='text-4xl pb-8 md:pb-0'>Sign Up</h1><br></br>
        <p className='text-2xl'>Admin Sign Up</p>
      </div>
      <div className='flex flex-col md:w-1/4 gap-6 md:gap-3 border-[1px] p-[3rem] rounded-2xl border-black'>
        <p>
          {msg ? <span className="success">{msg}</span> : <span className="error">{error}</span>}
        </p>
        <input className='border-[1px] border-black g-black p-2 rounded-3xl outline-none' type="email" name="email" value={email} onChange={(e) => handleInputChange(e, "email")} placeholder='email' />
        <input className='border-[1px] border-black g-black p-2 rounded-3xl outline-none' type="text" name="name" value={name} onChange={(e) => handleInputChange(e, "name")} placeholder='username' />
        <input className='border-[1px] border-black p-2 rounded-3xl outline-none' type="file" name="pfile" onChange={(e) => handleInputChange(e, "pfile")} />
        <input className='border-[1px] border-black p-2 rounded-3xl outline-none' type="password" name="password" value={password} onChange={(e) => handleInputChange(e, "password")} placeholder='password' />
        {/* <input className='border-[1px] border-black g-black p-2 rounded-3xl outline-none' type="text" name="role" value={role} onChange={(e) => handleInputChange(e, "role")} placeholder='role' /> */}
        <select className='border-[1px] border-black p-2 rounded-3xl outline-none' name="role" value={role} onChange={(e) => handleInputChange(e, "role")}>
          <option value="" disabled>Select role</option>
          <option value="Main Admin">Main Admin</option>
          <option value="Products Admin">Products Admin</option>
          <option value="Category Admin">Category Admin</option>
          <option value="ReviewsRatingAdmin">Reviews & Rating Admin</option>
          <option value="HandleUserAdmin">Handle User Admin</option>
          <option value="HandleOrderAdmin">Handle Order Admin</option>
        </select>
        <button type="submit" className='bg-black text-white p-2 rounded-3xl font-bold' onClick={handleSubmit}>Sign Up</button>
      </div>
      <div>
        <p className='cursor-default pb-5'>Already have an account? <Link to={'/Adminlogin'}><span className='text-[#00843C] font-bold cursor-pointer'>Login</span></Link></p>
      </div>
    </div>
  );
}

export default Sign;