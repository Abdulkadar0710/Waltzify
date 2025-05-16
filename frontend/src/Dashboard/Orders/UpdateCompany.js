import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateCompany() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [company, setCompany] = useState({});
  const [courierCompany, setCourierCompany] = useState('');
  const [companyURL, setCompanyURL] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => {
        setMsg('');
        navigate('/couriercompanylist'); // Redirect after 2 seconds
      }, 2000); // 2 seconds
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [msg, navigate]);

  const handleInputChange = (e, type) => {
    const value = e.target.value;
    setError('');
    if (type === 'courierCompany') {
      setCourierCompany(value);
    } else if (type === 'companyURL') {
      setCompanyURL(value);
    }
  };

  useEffect(() => {
    fetch(`http://localhost/waltzify_copy_fake/Backend/Fetch_Company.php?id=${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setCompany(data);
          setCourierCompany(data.Courier_Company || '');
          setCompanyURL(data.Tracking_URL || '');
        }
      })
      .catch(error => setError('Failed to fetch company data: ' + error.message));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courierCompany || !companyURL) {
      setError('Both fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('Courier_Company', courierCompany);
    formData.append('Company_URL', companyURL);

    fetch(`http://localhost/waltzify_copy_fake/Backend/Update_Courier.php?id=${id}`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.result.includes("Courier Company Updated Successfully!")) {
          setMsg(data.result); // Set success message
          setError('');
        } else {
          setError(data.result);
        }
      })
      .catch(error => setError('Failed to update company: ' + error.message));
  };

  return (
    <div className='bg-[#F2F6F9] py-[2rem]'>
      <div className='flex flex-col lg:flex-row justify-between lg:items-center px-[2rem] lg:px-[4rem]'>
        <p className='text-xl lg:text-3xl font-bold'>Update Courier Details</p>
        <p className='text-gray-600'>
          Dashboard <FontAwesomeIcon icon={faArrowRight} /> Update Courier Details{' '}
        </p>
      </div>
      <div className='bg-white m-[2rem] lg:m-[4rem] p-[2rem] rounded-xl shadow-xl flex flex-col lg:flex-row gap-[3rem]'>
        <div className='lg:w-1/4'>
          <p className='font-thin'>Fill in the information to update a courier company</p>
        </div>
        <div className='lg:w-3/4'>
          <form className='flex flex-col gap-[1rem]' onSubmit={handleSubmit}>
            <p>{msg ? <span className='success'>{msg}</span> : <span className='error'>{error}</span>}</p>
            <label className='font-bold' htmlFor='name'>
              Courier Company Name<span className='text-red-500'> *</span>
            </label>
            <input
              className='focus:outline-none border-2 py-2 px-4 rounded-xl'
              type='text'
              name='couriercompany'
              id='name'
              placeholder='Courier Company Name'
              value={courierCompany}
              onChange={(e) => handleInputChange(e, 'courierCompany')}
            />
            <label className='font-bold' htmlFor='companyURL'>
              Company URL<span className='text-red-500'> *</span>
            </label>
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
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateCompany;

