import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCloud } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './style.css';

function AddNewArrivalBanner() {

  const [image, setImage] = useState(null);
  //const [text, setText] = useState('');
  //const [linkUrl, setLinkUrl] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
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
        const img = new Image();
        const reader = new FileReader();
        
        reader.onload = (readerEvent) => {
            img.src = readerEvent.target.result;
        };
        
        img.onload = () => {
            const { width, height } = img;
            
            // if (width >= 410 && height >= 123) {
                setImage(file);
                setImagePreview(URL.createObjectURL(file));
                setError('');
            // } else {
            //     setError('Image dimensions should be at least 410 x 123 pixels.');
            //     setImage(null);
            //     setImagePreview(null);
            // }
        };
        
        reader.readAsDataURL(file);
    }
};


const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setMsg('');

  if (!image || !startDate || !endDate) {
      setError('All fields are required!');
      return;
  }

  try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);

      const response = await fetch('http://localhost/waltzify_copy_fake/Backend/Add_NewArrivalBanner.php', {
          method: 'POST',
          body: formData,
      });

      const responseText = await response.text(); // Get raw response
      console.log(responseText); // Debugging: Check output
      
      const data = JSON.parse(responseText); // Convert to JSON
      if (data.result === 'Banner Added Successfully!') {
          setMsg('Banner added successfully!');
      } else {
          setError(data.result);
      }
  } catch (err) {
      setError('Error: ' + err.message);
  }
};


  return (
    <div className='bg-[#F2F6F9] py-[2rem]'>
      <div className='flex flex-col lg:flex-row justify-between lg:items-center px-[2rem] lg:px-[4rem]'>
        <p className='text-xl lg:text-3xl font-bold'>Add Banner(New Arrival)</p>
        <p className='text-gray-600'>
          Dashboard <FontAwesomeIcon icon={faArrowRight} /> Ecommerce <FontAwesomeIcon icon={faArrowRight} />{' '}
          <span className='font-light text-gray-500'>Add Banner</span>
        </p>
      </div>

    {/*   <div className='flex flex-col gap-[3rem] bg-white rounded-xl my-[2rem] mx-[2rem] lg:mx-[4rem] py-[2rem]'>
        <div className='px-[2rem] flex flex-col lg:flex-row lg:items-center justify-between'>
          <p className='font-bold'>
            Text <span className='text-red-500'>*</span>
          </p>
          <input
            className='focus:outline-none border-2 rounded-lg p-1 lg:w-[50rem]'
            type='text'
            placeholder='Text'
            value={text}
            onChange={(e) => handleInputChange(e, setText)}
          />
        </div>
      </div> */}

      <div className='flex flex-col gap-[3rem] bg-white rounded-xl my-[2rem] mx-[2rem] lg:mx-[4rem] py-[2rem]'>


        <div className='px-[2rem] flex flex-col lg:flex-row lg:items-center justify-between'>
          <p className='font-bold'>
            Start Date <span className='text-red-500'>*</span>
          </p>
          <input
            className='w-[17rem] rounded-xl p-1 focus:outline-none border-2'
            type='date'
            value={startDate}
            onChange={(e) => handleInputChange(e, setStartDate)}
            placeholder='dd/mm/yyyy'
          />
        </div>

        <div className='px-[2rem] flex flex-col lg:flex-row lg:items-center justify-between'>
          <p className='font-bold'>
            End Date <span className='text-red-500'>*</span>
          </p>
          <input
            className='w-[17rem] rounded-xl p-1 focus:outline-none border-2'
            type='date'
            value={endDate}
            onChange={(e) => handleInputChange(e, setEndDate)}
            placeholder='dd/mm/yyyy'
          />
        </div>

        <div className='px-[2rem] flex flex-col lg:flex-row lg:items-center justify-between'>
          <p className='font-bold'>
            Upload Image (Dimensions range 410 * 123 and above is required) <span className='text-red-500'>*</span>
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

      {msg && <p className='text-green-500'>{msg}</p>}
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  );
}

export default AddNewArrivalBanner;
