import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCloud } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './style.css';

function AddProductList() {
  const [email, setEmail] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sale, setSale] = useState('');
  const [stock, setStock] = useState('');
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
      case "productId":
        setProductId(value);
        break;
      case "quantity":
        setQuantity(value);
        break;
      case "sale":
        setSale(value);
        break;
      case "stock":
        setStock(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && productId && quantity && sale && stock) {
      try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("productId", productId);
        formData.append("quantity", quantity);
        formData.append("sale", sale);
        formData.append("stock", stock);

        const response = await fetch("http://localhost/waltzify_copy_fake/Backend/addProductList.php", {
          method: "POST",
          body: formData
        });

        const data = await response.json();
        if (data[0].result === "Not Submitted, Please try again!" ){
          setError(data[0].result);
        } else {
          setMsg(data[0].result);
          setTimeout(() => navigate('/productlist'), 2000);
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
        <p className='text-xl lg:text-3xl font-bold'>Add Product Details</p>
        <p className='text-gray-600'>
          Dashboard <FontAwesomeIcon icon={faArrowRight} /> Ecommerce <FontAwesomeIcon icon={faArrowRight} />{' '}
          <span className='font-light text-gray-500'>Add Product Details</span>
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
    
            <label className='font-bold' htmlFor='productId'>
              Product ID<span className='text-red-500'> *</span>
            </label>
            <input
              className='rounded-xl p-1 focus:outline-none border-2'
              type='number'
              value={productId}
              onChange={(e) => handleInputChange(e, "productId")}
              placeholder='Enter Product ID'
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
            <label className='font-bold' htmlFor='stock'>
              Stock<span className='text-red-500'> *</span>
            </label>
            <input
              className='rounded-xl p-1 focus:outline-none border-2'
              type='text'
              value={stock}
              onChange={(e) => handleInputChange(e, "stock")}
              placeholder='Enter Stock'
            />
            <div className='p-[1rem] flex lg:flex-row flex-col gap-[2rem]'>
              <button type='submit' className='py-[1rem] px-[2rem] text-white lg:text-lg rounded-xl font-bold bg-blue-500'>Add Product Details</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProductList;