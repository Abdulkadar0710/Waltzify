import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style.css";
function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
      case "phone":
        setPhone(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const isPhonevalid = (phone) => {
    const minLength = 10;
    if (phone.length < minLength) {
      return "Phone Number must be at least 10 characters.";
    } else if (phone.length > minLength) {
      return "Phone Number should not be more than 10 digits.";
    }
  };

  const isPasswordValid = (password) => {
    const minLength = 8;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const digitRegex = /\d/;
    const uppercaseRegex = /[A-Z]/;

    if (password.length < minLength) {
      return "Password must be at least 8 characters long.";
    }
    if (!specialCharRegex.test(password)) {
      return "Password must contain at least one special character.";
    }
    if (!digitRegex.test(password)) {
      return "Password must contain at least one digit.";
    }
    if (!uppercaseRegex.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneError = isPhonevalid(phone);
    const passwordError = isPasswordValid(password);
    if (phoneError) {
      setError(phoneError);
      return;
    }
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (email && name && password) {
      try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("password", password);

        const response = await fetch(
          "http://localhost/waltzify_copy_fake/Backend/UserSign.php",
          {
            method: "POST",
            body: formData,
          }
        );

        // Check if response is JSON
        const text = await response.text();
        console.log("Raw Response:", text); // Debug raw response
        const data = JSON.parse(text); // Convert to JSON

        if (data.result) {
          setMsg(data.result);
        } else {
          setError("Unexpected response from server.");
        }
      } catch (err) {
        setError("Error: " + err.message);
      }
    } else {
      setError("All fields are required!");
    }
  };

  return (
    <div className="flex items-center lg:mt-[8vw] mt-[30vw] justify-center py-[2.5rem] bg-[#ffc89b]">
      <div className="flex lg:w-2/3 lg:h-[90vh] overflow-hidden rounded-xl">
        {/* image */}
        <div className="hidden lg:block relative w-1/2">
          <img
            className=" w-full h-[90vh]"
            src="https://i.pinimg.com/564x/5d/fb/5f/5dfb5f08b8d33aacd35b672339bd679a.jpg"
            alt="bg"
          />
          <p className="text-white font-bold absolute top-[16rem] left-4 text-8xl">
            {" "}
            Hey There Welcome!
          </p>
          {/* <img className='absolute top-10 w-[10rem]' src={require('../../assets/logo.png')} alt="" /> */}
        </div>
        {/* details */}
        <div className="lg:w-1/2 bg-white pt-[.5rem] pb-[1rem] flex flex-col pl-8 lg:pl-[5rem] pr-[3rem] gap-[2rem] overflow-y-scroll no-scrollbar">
          <h1 className="text-5xl font-bold text-orange-500">Sign Up</h1>
          <p className="font-thin w-[17rem]">
            Welcome! Please enter your credentials to create an account.
          </p>
          {msg ? (
            <span className="success font-bold">{msg}</span>
          ) : (
            <span className="error font-bold">{error}</span>
          )}
          <form className="flex flex-col gap-[1rem]" action="submit">
            <label className="text-gray-500 " htmlFor="Name">
              Name
            </label>
            <input
              className="border-2 p-1 outline-none"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => handleInputChange(e, "name")}
              required
            />
            <label className="text-gray-500" htmlFor="username">
              Email
            </label>
            <input
              className="border-2 p-1 outline-none"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => handleInputChange(e, "email")}
              required
            />
            <label className="text-gray-500 " htmlFor="username">
              Phone
            </label>
            <input
              className="border-2 p-1 outline-none"
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => handleInputChange(e, "phone")}
              required
            />
            <label className="text-gray-500 " htmlFor="password">
              Password
            </label>
            {/* <input className='border-2 p-1 outline-none' type="password" placeholder='******'  value = {password} onChange={(e) => handleInputChange(e, "password")} required/> */}
            <div className="relative">
              <input
                className="border-2 p-1 pr-12 outline-none w-full" // Add pr-10 for icon space
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => handleInputChange(e, "password")}
                placeholder="******"
                required
              />
              {/* Icon for showing/hiding password */}
              <span
                className="absolute right-3 top-2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3l18 18"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.823 7.548 5 12 5c4.452 0 8.268 2.823 9.542 7-.017.472-.068.937-.152 1.39"
                    />
                  </svg>
                )}
              </span>
            </div>
            <button className="submit_button" onClick={handleSubmit}>
              Sign Up
            </button>
          </form>
          <Link to={"/login"}>
            <p className="text-lg">
              Have an Account?{" "}
              <button className="text-orange-500 font-bold">Login</button>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
