import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCloud } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './style.css';

function AddReview() {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState('');
  const [productId, setProductId] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e, type) => {
    setError("");
    const value = e.target.value;
    switch (type) {
      case "name":
        setName(value);
        break;
      case "productId":
        setProductId(value);
        break;
      case "reviewTitle":
        setReviewTitle(value);
        break;
      case "review":
        setReview(value);
        break;
      case "rating":
        setRating(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && productId && reviewTitle && review && rating) {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("productId", productId);
        formData.append("reviewTitle", reviewTitle);
        formData.append("review", review);
        formData.append("rating", rating);
        images.forEach((image, index) => {
          formData.append(`image${index + 1}`, image);
        });

 
        const response = await fetch("http://localhost/waltzify_copy_fake/Backend/Add_Review.php", {
          method: "POST",
          body: formData
        });

        const data = await response.json();
        if (data[0].result === "Not Submitted, Please try again!") {
          setError(data[0].result);
        } else {
          setMsg(data[0].result);
          setTimeout(() => navigate('/review'), 1000);
        }
      } catch (err) {
        setError("Error: " + err.message);
      }
    } else {
      setError("All fields are required!");
    }
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
    }
  };

  return (
    <div className='bg-[#F2F6F9] py-[2rem]'>
      <div className='flex lg:flex-row flex-col justify-between lg:items-center lg:px-[4rem] px-[1rem]'>
        <p className='text-xl lg:text-3xl font-bold'>Add Product Review</p>
        <p className='text-gray-600'>
          Dashboard <FontAwesomeIcon icon={faArrowRight} /> Ecommerce <FontAwesomeIcon icon={faArrowRight} />{' '}
          <span className='font-light text-gray-500'>Add Product Reviews</span>
        </p>
      </div>
      <div className='flex lg:flex-row flex-col gap-[2rem] px-[2rem]'>
        <div className='bg-white rounded-xl shadow-xl my-[3rem] p-[2rem] lg:w-1/2'>
          <p>
            {msg ? <span className="success">{msg}</span> : <span className="error">{error}</span>}
          </p>
          <form onSubmit={handleSubmit} className='flex flex-col gap-[1rem]' autoComplete='off'>
            <label className='font-bold' htmlFor='email'>
              Name <span className='text-red-500'> *</span>
            </label>
            <input
              className='rounded-xl p-1 focus:outline-none border-2'
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => handleInputChange(e, "name")}
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
            <label className='font-bold' htmlFor='reviewTitle'>
             Review Title<span className='text-red-500'> *</span>
            </label>
            <input
              className='rounded-xl p-1 focus:outline-none border-2'
              type='text'
              value={reviewTitle}
              onChange={(e) => handleInputChange(e, "reviewTitle")}
              placeholder='Enter Review Title'
            />
            <label className='font-bold' htmlFor='review'>
              Review<span className='text-red-500'> *</span>
            </label>
            <textarea
              className='h-[20rem] rounded-xl p-1 focus:outline-none border-2'
              name='review'
              placeholder='Enter Review'
              value={review}
              onChange={(e) => handleInputChange(e, "review")}
            ></textarea>
            <label className='font-bold' htmlFor='rating'>
              Rating<span className='text-red-500'> *</span>
            </label>
            <input
              className='rounded-xl p-1 focus:outline-none border-2'
              type='number'
              max={5}
              min={1}
              placeholder='Product Rating'
              value={rating}
              onChange={(e) => handleInputChange(e, "rating")}
            />
            <div className='flex flex-wrap gap-[1rem]'>
              {images.map((image, index) => (
                <div key={index} className='relative flex flex-col items-center border-2 border-dotted rounded-xl border-blue-500'>
                  <input
                    type='file'
                    className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                    onChange={(e) => handleImageChange(index, e)}
                  />
                  {image ? (
                    <img className='w-[10rem] h-[15rem] object-cover rounded-xl' src={URL.createObjectURL(image)} alt={`Upload ${index + 1}`} />
                  ) : (
                    <div className='flex flex-col items-center justify-center h-full'>
                      <FontAwesomeIcon icon={faCloud} color='#3B81F6' size='5x' />
                      <p className='text-center px-[1rem]'>
                        Drop your images here or <span className='text-blue-500'>click to browse</span>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className='font-thin px-[1rem] py-[2rem] text-sm'>
              You need to add at least 4 images. Pay attention to the quality of the pictures you add, comply with the
              background color standards. Pictures must be in certain dimensions. Notice that the product shows all the
              details
            </p>
            <div className='p-[1rem] flex lg:flex-row flex-col gap-[2rem]'>
              <button type='submit' className='py-[1rem] px-[2rem] text-white lg:text-lg rounded-xl font-bold bg-blue-500'>
                Add Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddReview;
