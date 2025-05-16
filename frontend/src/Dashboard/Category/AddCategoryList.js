import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCloud } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './style.css';

function AddCategoryList() {
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sale, setSale] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e, type) => {
    setError("");
    const value = e.target.value;
    switch (type) {
      case "email":
        setEmail(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "quantity":
        setQuantity(value);
        break;
      case "sale":
        setSale(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && category && quantity && sale) {
      try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("category", category);
        formData.append("quantity", quantity);
        formData.append("sale", sale);

        const response = await fetch("http://localhost/waltzify_copy_fake/Backend/database/addCategoryList.php", {
          method: "POST",
          body: formData
        });

        const data = await response.json();
        if (data[0].result === "Not Submitted, Please try again!" ){
          setError(data[0].result);
        } else {
          setMsg(data[0].result);
          setTimeout(() => navigate('/categorylist'), 2000);
        }
      } catch (err) {
        setError("Error: " + err.message);
      }
    } else {
      setError("All fields are required!");
    }
  };

  return (
    <div className='bg-[#F2F6F9] py-[2rem]'>
      <div className='flex lg:flex-row flex-col justify-between lg:items-center lg:px-[4rem] px-[1rem]'>
        <p className='text-xl lg:text-3xl font-bold'>Add Category Details</p>
        <p className='text-gray-600'>
          Dashboard <FontAwesomeIcon icon={faArrowRight} /> Ecommerce <FontAwesomeIcon icon={faArrowRight} />{' '}
          <span className='font-light text-gray-500'>Add Category Details</span>
        </p>
      </div>
      <div className='flex lg:flex-row flex-col gap-[2rem] px-[2rem]'>
        <div className='bg-white rounded-xl shadow-xl my-[3rem] p-[2rem] lg:w-1/2'>
          <p>
            {msg ? <span className="success">{msg}</span> : <span className="error">{error}</span>}
          </p>
          <form onSubmit={handleSubmit} className='flex flex-col gap-[1rem]' autoComplete='off'>
            <label className='font-bold' htmlFor='email'>
              Admin Email<span className='text-red-500'> *</span>
            </label>
            <input
              className='flex flex-col gap-[1rem] rounded-xl p-1 focus:outline-none border-2'
              type='email'
              placeholder='Admin Email'
              value={email}
              onChange={(e) => handleInputChange(e, "email")}
            />
    
            <label className='font-bold' htmlFor='category'>
              Category<span className='text-red-500'> *</span>
            </label>
            <input
              className='rounded-xl p-1 focus:outline-none border-2'
              type='text'
              value={category}
              onChange={(e) => handleInputChange(e, "category")}
              placeholder='Enter Category'
            />
            <label className='font-bold' htmlFor='quantity'>
              Quantity<span className='text-red-500'> *</span>
            </label>
            <input
              className='rounded-xl p-1 focus:outline-none border-2'
              type='number'
              value={quantity}
              onChange={(e) => handleInputChange(e, "quantity")}
              placeholder='Enter Quantity'
            />
            <label className='font-bold' htmlFor='sale'>
              Sale<span className='text-red-500'> *</span>
            </label>
            <input
              className='rounded-xl p-1 focus:outline-none border-2'
              type='number'
              value={sale}
              onChange={(e) => handleInputChange(e, "sale")}
              placeholder='Enter Sale'
            />
            <div className='p-[1rem] flex lg:flex-row flex-col gap-[2rem]'>
              <button type='submit' className='py-[1rem] px-[2rem] text-white lg:text-lg rounded-xl font-bold bg-blue-500'>Add Category Details</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCategoryList;
