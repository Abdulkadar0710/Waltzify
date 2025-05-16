import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCloud } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';

function UpdateCategory() {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState(null);

  const handleInputChange = (e, setter) => {
    setError('');
    setter(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (categoryName || image) {
      try {
        const formData = new FormData();
        formData.append('categoryName', categoryName);
        if (image) {
          formData.append('image', image);
        }

        const response = await fetch(`http://localhost/alaukik/waltzify_copy_real/Backend/Update_Category.php?id=${id}`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok ${response.statusText}`);
        }

        const data = await response.json();
        if (data.result === 'Category Updated Successfully!') {
          setMsg('Category Updated successfully!');
          //setTimeout(() => navigate('/'), 2000);
        } else {
          setError(data.result);
        }
      } catch (err) {
        setError('Error: ' + err.message);
      }
    } else {
      setError('At least one field is required!');
    }
  };

  useEffect(() => {
    fetch(`http://localhost/waltzify_copy_fake/Backend/Fetch_category.php?id=${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        if (!data || data.error) {
          throw new Error(data.error || "No category found");
        }
  
        setCategoryData(data); // Now data is a single object, not an array
        setCategoryName(data.cname);
        if (data.image) {
          setImagePreview(`http://localhost/alaukik/waltzify_copy_real/Backend/Category/${data.image}`);
        }
      })
      .catch(error => {
        setError(error.message);
      });
  }, [id]);
  
  return (
    <div className='bg-[#F2F6F9] py-[2rem]'>
      <div className='flex flex-col lg:flex-row justify-between lg:items-center px-[2rem] lg:px-[4rem]'>
        <p className='text-xl lg:text-3xl font-bold'>Update Category</p>
        <p className='text-gray-600'>
          Dashboard <FontAwesomeIcon icon={faArrowRight} /> Ecommerce <FontAwesomeIcon icon={faArrowRight} />{' '}
          <span className='font-light text-gray-500'>Update Category</span>
        </p>
      </div>
      {categoryData && (
        <div className='flex flex-col gap-[3rem] bg-white rounded-xl my-[2rem] mx-[2rem] lg:mx-[4rem] py-[2rem]'>
          <div className='px-[2rem] flex flex-col lg:flex-row lg:items-center justify-between'>
            <p className='font-bold'>
              Category Name 
            </p>
            <input
              className='focus:outline-none border-2 rounded-lg p-1 lg:w-[50rem]'
              type='text'
              value={categoryName}
              onChange={(e) => handleInputChange(e, setCategoryName)}
            />
          </div>
          <div className='px-[2rem] flex flex-col lg:flex-row lg:items-center justify-between'>
            <p className='font-bold'>
              Upload Images (Image Dimensions must be atleast 300 x 300)
            </p>
            <div className='relative border-2 border-dotted border-blue-500 rounded-lg h-[10rem] lg:h-[20rem] lg:w-[50rem] flex items-center justify-center overflow-hidden'>
              <input
                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                type='file'
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img src={imagePreview} alt='Preview' className='absolute inset-0 object-cover w-full h-full' />
              )}
              {!imagePreview && (
                <div className='flex flex-col items-center'>
                  <FontAwesomeIcon icon={faCloud} color='#3B81F6' size='7x' />
                  <p className='text-center'>
                    Drop your images here or select <span className='text-blue-500'>click to browse</span>
                  </p>
                </div>
              )}
              {imagePreview && (
                <div className='absolute mb-[5rem] bottom-2 right-2 bg-white px-2 py-1 rounded-md cursor-pointer'>
                  
                  <input type="file" onChange={handleImageChange} />
                  
                </div>
              )}
            </div>
          </div>
          <div className='ml-[2rem] lg:ml-[30rem]'>
            <button
              className='text-lg bg-blue-500 text-white hover:bg-white border-2 hover:text-blue-500 border-blue-500 px-[4rem] lg:py-[0.5rem] rounded-xl transition-all ease-in-out'
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      )}
      {msg && <p className='text-green-500'>{msg}</p>}
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  );
}

export default UpdateCategory;


