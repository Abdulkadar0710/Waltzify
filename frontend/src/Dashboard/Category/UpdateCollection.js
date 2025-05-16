import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCloud } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';

function UpdateCollection() {
  const { id } = useParams();
  const [collectionName, setCollectionName] = useState('');
  const [images1, setImages1] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const [collectionData, setCollectionData] = useState(null);

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
    if (collectionName || images1) {
      try {
        const formData = new FormData();
        formData.append('collectionName', collectionName);
        if (images1) {
          formData.append('images1', images1);
        }

        const response = await fetch(`http://localhost/waltzify_copy_fake/Backend/Update_Collection.php?id=${id}`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok ${response.statusText}`);
        }

        const data = await response.json();
        if (data.result === 'Collection Updated Successfully!') {
          setMsg('Collection Updated successfully!');
          
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
    if (!id) return; // Prevent API call if id is empty
  
    fetch(`http://localhost/waltzify_copy_fake/Backend/Fetch_Collection.php?id=${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        if (!data || data.length === 0) {
          throw new Error("No data found for the given ID.");
        }
  
        setCollectionData(data);
        setCollectionName(data[0].collectionName);
        if (data[0].images1) {
          setImagePreview(`http://localhost/waltzify_copy_fake/Backend/Collection/${data[0].images1}`);
        }
      })
      .catch(error => {
        setError(error.message);
      });
  }, [id]);
  

  return (
    <div className='bg-[#F2F6F9] py-[2rem]'>
      <div className='flex flex-col lg:flex-row justify-between lg:items-center px-[2rem] lg:px-[4rem]'>
        <p className='text-xl lg:text-3xl font-bold'>Update Collection</p>
        <p className='text-gray-600'>
          Dashboard <FontAwesomeIcon icon={faArrowRight} /> Ecommerce <FontAwesomeIcon icon={faArrowRight} />{' '}
          <span className='font-light text-gray-500'>Update Collection</span>
        </p>
      </div>
      {collectionData && (
        <div className='flex flex-col gap-[3rem] bg-white rounded-xl my-[2rem] mx-[2rem] lg:mx-[4rem] py-[2rem]'>
          <div className='px-[2rem] flex flex-col lg:flex-row lg:items-center justify-between'>
            <p className='font-bold'>
              Collection Name 
            </p>
            <input
              className='focus:outline-none border-2 rounded-lg p-1 lg:w-[50rem]'
              type='text'
              value={collectionName}
              onChange={(e) => handleInputChange(e, setCollectionName)}
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

export default UpdateCollection;


