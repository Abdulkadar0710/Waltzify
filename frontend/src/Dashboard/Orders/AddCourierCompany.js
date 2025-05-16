import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function AddCourierCompany() {
  const navigate = useNavigate();
  const [courierCompany, setCourierCompany] = useState('');
  const [companyURL, setCompanyURL] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setMsg(''), 15000);
    return () => clearTimeout(timer);
  }, [msg]);

  const handleInputChange = (e, type) => {
    setError('');
    const value = e.target.value;

    switch (type) {
      case 'courierCompany':
        setCourierCompany(value);
        if (value === '') setError('Courier Company has been left blank!');
        break;
      case 'companyURL':
        setCompanyURL(value);
        if (value === '') setError('Tracking URL has been left blank!');
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (courierCompany && companyURL) {
      const url = 'http://localhost/waltzify_copy_fake/Backend/AddCourierCompany.php';
      
      // Define the data object here
      const data = {
        courierCompany: courierCompany,
        companyURL: companyURL
      };

      console.log("Sending data:", data); // ✅ Log before sending

      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          console.log("Raw response:", response); // ✅ Log raw response
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log("Response from API:", data); // ✅ Log the actual data received
          if (data.result === 'Not Submitted, Please try again!') {
            setError(data.result);
            setTimeout(() => navigate('/NavAfterLog'), 2000);
          } else {
            setMsg(data.result);
          }
        })
        .catch((err) => {
          console.error("Fetch error:", err); // ✅ Log fetch errors
          setError('Error: ' + err.message);
        });

      setCourierCompany('');
      setCompanyURL('');
      
    } else {
      setError('All fields are Required!');
    }
  };

  return (
    <div className='bg-[#F2F6F9] py-[2rem]'>
      <div className='flex flex-col lg:flex-row justify-between lg:items-center px-[2rem] lg:px-[4rem]'>
        <p className='text-xl lg:text-3xl font-bold'>Add Courier Details</p>
        <p className='text-gray-600'>
          Dashboard <FontAwesomeIcon icon={faArrowRight} /> Add Courier Details <FontAwesomeIcon icon={faArrowRight} />{' '}
          <span className='font-light text-gray-500'>Add Courier Details</span>
        </p>
      </div>
      <div className='bg-white m-[2rem] lg:m-[4rem] p-[2rem] rounded-xl shadow-xl flex flex-col lg:flex-row gap-[3rem]'>
        <div className='lg:w-1/4'>
          <p className='font-thin'>Fill in the information to add a new courier company</p>
        </div>
        <div className='lg:w-3/4'>
          <form className='flex flex-col gap-[1rem]' onSubmit={handleSubmit}>
            <p>
              {msg ? <span className='success'>{msg}</span> : <span className='error'>{error}</span>}
            </p>
            <label className='font-bold' htmlFor='name'>Courier Company Name<span className='text-red-500'> *</span></label>
            <input
              className='focus:outline-none border-2 py-2 px-4 rounded-xl'
              type='text'
              name='couriercompany'
              id='name'
              placeholder='Courier Company Name'
              value={courierCompany}
              onChange={(e) => handleInputChange(e, 'courierCompany')}
            />
            <label className='font-bold' htmlFor='companyURL'>Company URL<span className='text-red-500'> *</span></label>
            <input
              className='focus:outline-none border-2 py-2 px-4 rounded-xl'
              type='text'
              name='companyURL'
              id='companyURL'
              placeholder='Company Tracking URL'
              value={companyURL}
              onChange={(e) => handleInputChange(e, 'companyURL')}
            />
           <button
            type='submit'
            className='ml-[18rem] w-[10rem] text-lg bg-blue-500 text-white hover:bg-white border-2 hover:text-blue-500 border-blue-500 px-6 py-2 rounded-xl transition-all ease-in-out'
            >
            Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCourierCompany;
