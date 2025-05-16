import React from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import { useEffect,useState } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCloud } from '@fortawesome/free-solid-svg-icons';
function AddProductSize() {
    const navigate = useNavigate();
  
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [price,setPrice] = useState('');  
    const [size,setSize] = useState('');
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
  
    const handleInputChange = (e, type) => {
      setError("");
      const value = e.target.value;
      switch (type) {
        case "productId":
          setProductId(value);
          break;
        case "productName":
          setProductName(value);
          break;
        case "size":
        setSize(value);
          break;
        case "price" :
        setPrice(value);
        break;
         default:
          break;
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (productId && productName && size && price) {
        try {
          const formData = new FormData();
          formData.append("productId", productId);
          formData.append("productName", productName);
          formData.append("size", size);
          formData.append("price",price);          
    
          const response = await fetch("http://localhost/waltzify_copy_fake/Backend/add_size.php", {
            method: "POST",
            body: formData
          });
    
          const data = await response.json();
          if (data[0].result === "Not Submitted,Please try again!") {
            setError(data[0].result);
          } else {
            setMsg(data[0].result);
            setTimeout(() => navigate('/'), 2000);
          }
        } catch (err) {
          setError("Error: " + err.message);
        }
      } else {
        setError("All fields are Required!");
      }
    };
  

  return (
    <div className='bg-[#F2F6F9] py-[2rem]'>
      <div className='flex lg:flex-row flex-col justify-between lg:items-center lg:px-[4rem] px-[1rem]'>
        <p className='text-xl lg:text-3xl font-bold'>Add Product Size</p>
        <p className='text-gray-600'>
          Dashboard <FontAwesomeIcon icon={faArrowRight} /> Ecommerce <FontAwesomeIcon icon={faArrowRight} />{' '}
          <span className='font-light text-gray-500'>Add Product Size</span>
        </p>
      </div>
      <div className='flex lg:flex-row flex-col gap-[2rem] px-[2rem]'>
        <div className='bg-white rounded-xl shadow-xl my-[3rem] p-[2rem] lg:w-1/2'>
          <p>
            {msg ? <span className="success">{msg}</span> : <span className="error">{error}</span>}
          </p>
          <form onSubmit={handleSubmit} className='flex flex-col gap-[1rem]' autoComplete='off'>
          <label className='font-bold' htmlFor="productId">
            Product Id <span className='text-red-500'>*</span>
            </label>
            <input className='w-[19rem] rounded-xl p-1 focus:outline-none border-2' type='number' min={1} value={productId} onChange={(e) => handleInputChange(e, "productId")} placeholder='Enter ProductId' />
            <label className='font-bold' htmlFor='name'>
              Product Name<span className='text-red-500'> *</span>
            </label>
            <input className='rounded-xl p-1 focus:outline-none border-2' type='text' value={productName} onChange={(e) => handleInputChange(e, "productName")} placeholder='Enter Product Name' />
            <label className='font-bold' htmlFor='size'>
              Size<span className='text-red-500'> *</span>
            </label>
            <input className='rounded-xl p-1 focus:outline-none border-2' type='text' value={size} onChange={(e) => handleInputChange(e, "size")} placeholder='Enter Size' />
            
            <label className='font-bold' htmlFor='price'>
              Price<span className='text-red-500'> *</span>
            </label>
            <input className='rounded-xl p-1 focus:outline-none border-2' type='text' value={price} onChange={(e) => handleInputChange(e, "price")} name='price' placeholder='Price' />
          
            <div className='p-[1rem] flex lg:flex-row flex-col gap-[2rem]'>
              <button type='submit' className='py-[1rem] px-[2rem] text-white lg:text-lg rounded-xl font-bold bg-blue-500 '>Add</button>
            </div>
            </form>
        </div>
        
      </div>
      
    </div>
   
  );
}

export default AddProductSize