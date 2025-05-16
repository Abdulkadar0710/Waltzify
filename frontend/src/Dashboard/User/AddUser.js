import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function AddUser() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const [password, setPassword] = useState('');
  const [error ,setError] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setMsg(''), 15000);
    return () => clearTimeout(timer);
  }, [msg]);

  const handleInputChange = (e, type) => {
    setError('');
    const value = e.target.value;

    switch (type) {
      case 'name':
        setName(value);
        if (value === '') setError('Name has been left blank!');
        break;
      case 'email':
        setEmail(value);
        if (value === '') setError('Email has been left blank!');
        break;
        case 'password':
        setPassword(value);
        if (value === '') setError('Password has been left blank!');
        break;
        default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
      const url = 'http://localhost/waltzify_copy_fake/Backend/UserSign.php';
      const data = new URLSearchParams({ name, email, password });

      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data.toString(),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response[0].result === 'Not Submitted,Please try again!') {
            setError(response[0].result);
            setTimeout(() => navigate('/Sign'), 2000);
          } else {
            setMsg(response[0].result);
            setTimeout(() => navigate('/Login'), 2000);
          }
        })
        .catch((err) => {
          setError('Error: ' + err.message);
        });

      setName('');
      setEmail('');
      setPassword('');
    } else {
      setError('All fields are Required!');
    }
  };

  return (
    <div className='bg-[#F2F6F9] py-[2rem]'>
      <div className='flex flex-col lg:flex-row justify-between lg:items-center px-[2rem] lg:px-[4rem]'>
        <p className='text-xl lg:text-3xl font-bold'>Add User</p>
        <p className='text-gray-600'>
          Dashboard <FontAwesomeIcon icon={faArrowRight} /> Users <FontAwesomeIcon icon={faArrowRight} />{' '}
          <span className='font-light text-gray-500'>Add User</span>
        </p>
      </div>
      <div className='bg-white m-[2rem] lg:m-[4rem] p-[2rem] rounded-xl shadow-xl flex flex-col lg:flex-row gap-[3rem]'>
        <div className='lg:w-1/4'>
          <p className='font-bold text-2xl'>Account</p>
          <p className='font-thin'>Fill in the information to add a new account</p>
        </div>
        <div className='lg:w-3/4'>
          <form className='flex flex-col gap-[1rem]' onSubmit={handleSubmit}>
            <p>
              {msg ? <span className='success'>{msg}</span> : <span className='error'>{error}</span>}
            </p>
            <label className='font-bold' htmlFor='name'>Name</label>
            <input
              className='focus:outline-none border-2 py-2 px-4 rounded-xl'
              type='text'
              name='name'
              id='name'
              placeholder='Name'
              value={name}
              onChange={(e) => handleInputChange(e, 'name')}
            />
            <label className='font-bold' htmlFor='email'>Email</label>
            <input
              className='focus:outline-none border-2 py-2 px-4 rounded-xl'
              type='email'
              name='email'
              id='email'
              placeholder='Email'
              value={email}
              onChange={(e) => handleInputChange(e, 'email')}
            />
        
            <label className='font-bold' htmlFor='password'>Password</label>
            <input
              className='focus:outline-none border-2 py-2 px-4 rounded-xl'
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              value={password}
              onChange={(e) => handleInputChange(e, 'password')}
            />
            
            <button
              type='submit'
              className='text-lg bg-blue-500 text-white hover:bg-white border-2 hover:text-blue-500 border-blue-500 px-[4rem] py-[0.5rem] rounded-xl transition-all ease-in-out'
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;




