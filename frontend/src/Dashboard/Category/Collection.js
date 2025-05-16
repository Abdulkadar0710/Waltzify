import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCloud } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './style.css';
function NewCategory() {
  //const [email, setEmail] = useState('');
  const [collectionName, setCollectionName] = useState('');
  const [images1, setImages1] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e, setter) => {
    setError('');
    setter(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImages1(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (collectionName && images1) {
      try {
        const formData = new FormData();
        formData.append('collectionName', collectionName);
        formData.append('images1', images1);
  
        const response = await fetch('http://localhost/waltzify_copy_fake/Backend/Add_Collection.php', {
          method: 'POST',
          body: formData,
        });
  
        const textResponse = await response.text();
        console.log("Raw Response:", textResponse); // Check for errors
  
        try {
          const data = JSON.parse(textResponse);
          if (data.result === 'Collection Added Successfully!') {
            setMsg('Collection added successfully!');
          } else {
            setError(data.result);
          }
        } catch (err) {
          setError("Invalid JSON response from server: " + textResponse);
          console.error("JSON Parse Error:", err, textResponse);
        }
      } catch (err) {
        setError('Error: ' + err.message);
      }
    } else {
      setError('All fields are required!');
    }
  };
  

  return (
    <div className='bg-[#F2F6F9] py-[2rem]'>
      <div className='flex flex-col lg:flex-row justify-between lg:items-center px-[2rem] lg:px-[4rem]'>
        <p className='text-xl lg:text-3xl font-bold'>Add Collection</p>
        <p className='text-gray-600'>
          Dashboard <FontAwesomeIcon icon={faArrowRight} /> Ecommerce <FontAwesomeIcon icon={faArrowRight} />{' '}
          <span className='font-light text-gray-500'>Add Collection</span>
        </p>
      </div>

     
      <div className='flex flex-col gap-[3rem] bg-white rounded-xl my-[2rem] mx-[2rem] lg:mx-[4rem] py-[2rem]'>
      {msg && <p className='text-green-500'>{msg}</p>}
      {error && <p className='text-red-500'>{error}</p>}
        <div className='px-[2rem] flex flex-col lg:flex-row lg:items-center justify-between'>
          <p className='font-bold'>
            Collection Name <span className='text-red-500'>*</span>
          </p>
          <input
            className='focus:outline-none border-2 rounded-lg p-1 lg:w-[50rem]'
            type='text'
            placeholder='Collection Name'
            value={collectionName}
            onChange={(e) => handleInputChange(e, setCollectionName)}
          />
        </div>
        <div className='px-[2rem] flex flex-col lg:flex-row lg:items-center justify-between'>
          <p className='font-bold'>
            Upload Image (Image Dimensions must be atleast 300 x 300) <span className='text-red-500'>*</span>
          </p>
          <div className='relative border-2 border-dotted border-blue-500 rounded-lg h-[10rem] lg:h-[20rem] lg:w-[50rem] flex items-center justify-center overflow-hidden'>
            <input
              className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
              type='file'
              onChange={handleImageChange}
            />
            {!imagePreview && (
              <div className='flex flex-col items-center'>
                <FontAwesomeIcon icon={faCloud} color='#3B81F6' size='7x' />
                <p className='text-center'>
                  Drop your images here or select <span className='text-blue-500'>click to browse</span>
                </p>
              </div>
            )}
            {imagePreview && (
              <img src={imagePreview} alt='Preview' className='absolute inset-0 object-cover w-full h-full' />
            )}
          </div>
        </div>
        <div className='ml-[2rem] lg:ml-[30rem]'>
          <button
            className='text-lg bg-blue-500 text-white hover:bg-white border-2 hover:text-blue-500 border-blue-500 px-[4rem] lg:py-[0.5rem] rounded-xl transition-all ease-in-out'
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>

      
    </div>
  );
}

export default NewCategory;











/* import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCloud } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Collection() {
  const [images, setImages] = useState([null, null, null]);
  const [collectionName, setCollectionName] = useState('');
 // const [productId,setProductId] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setError("");
    setCollectionName(e.target.value);
    //setProductId(e.target.value);
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (collectionName  && images.every(img => img !== null)) {
      try {
        const formData = new FormData();
        formData.append("collectionName", collectionName);
       // formData.append("productId",productId);
        images.forEach((image, index) => {
          formData.append(`images${index + 1}`, image);
        });

        const response = await fetch("http://localhost/waltzify_copy_fake/Backend/Add_Collection.php", {
          method: "POST",
          body: formData
        });

        const data = await response.json();
        if (data.result === "Not Submitted, Please try again!" || data.result === "File upload failed") {
          setError(data.result);
        } else {
          setMsg(data.result);
          setTimeout(() => navigate('/'), 2000);
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
        <p className='text-xl lg:text-3xl font-bold'>Add Collection</p>
        <p className='text-gray-600'>
          Dashboard <FontAwesomeIcon icon={faArrowRight} /> Ecommerce <FontAwesomeIcon icon={faArrowRight} />{' '}
          <span className='font-light text-gray-500'>Add Collection</span>
        </p>
      </div>
      <div className='flex lg:flex-row flex-col gap-[2rem] px-[2rem]'>
        <div className='bg-white rounded-xl shadow-xl my-[3rem] p-[2rem] lg:w-1/2'>
          <p>
            {msg ? <span className="success">{msg}</span> : <span className="error">{error}</span>}
          </p>
          <form onSubmit={handleSubmit} className='flex flex-col gap-[1rem]' autoComplete='off'>
            <label className='font-bold' htmlFor='name'>
              Collection Name<span className='text-red-500'> *</span>
            </label>
            <input className='rounded-xl p-1 focus:outline-none border-2' type='text' value={collectionName} onChange={handleInputChange} placeholder='Enter Collection Name' />
            <p className='font-thin text-sm'>Do not exceed 20 characters when entering the collection name.</p>
            
            <div className='p-[1rem] flex lg:flex-row flex-col gap-[2rem]'>
              <button type='submit' className='py-[1rem] px-[2rem] text-white lg:text-lg rounded-xl font-bold bg-blue-500'>Add Collection</button>
            </div>
          </form>
        </div>
        <div className='bg-white rounded-xl shadow-xl my-[3rem] p-[2rem] lg:w-1/2'>
          <p className='font-bold text-lg'>Upload Images</p>
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
            You need to add at least 3 images. Pay attention to the quality of the pictures you add, comply with the
            background color standards. Pictures must be in certain dimensions. Notice that the product shows all the
            details.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Collection;
 */