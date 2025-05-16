// NavAfterLog.js
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMoon, faBell, faMessage, faBorderAll, faGear, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import { Link, useNavigate } from 'react-router-dom';

function NavAfterLog() {
    const [adminData, setAdminData] = useState(null);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const toggleShow = () => {
        setShow(!show);
    };

    const handleLogout = () => {
        localStorage.removeItem('adminData');
        setAdminData(null);
        navigate('/AdminLogin');
    };

    useEffect(() => {
        const storedAdminData = localStorage.getItem('adminData');
        if (storedAdminData) {
            try {
                const parsedData = JSON.parse(storedAdminData);
                setAdminData(parsedData);
            } catch (error) {
                console.error("Error parsing adminData from localStorage", error);
            }
        } else {
            navigate('/AdminLogin'); // Redirect to login if no admin data found
        }
    }, [navigate]);

    return (
        <div className='navbar flex justify-between items-center py-[1rem] lg:w-full h-[6rem] border-b-2 shadow-md'>
            <div className='relative ml-[1rem] flex gap-3 items-center justify-center'>
                <FontAwesomeIcon className='hover:text-blue-500 animate-pulse hover:cursor-pointer' onClick={toggleShow} icon={faBars} size='xl' />
                <Link to='/NavAfterLog'>
                    <div className='flex items-center'>
                        <img className='h-[6rem] w-[6rem]' src={require('../asset/logo.png')} alt="logo" />
                        <p className='text-xl'>Waltzify</p>
                    </div>
                </Link>
            </div>
            {show && <Sidebar />}
            <div className='hidden lg:flex justify-evenly items-center lg:w-[70rem]'>
                {/* <div className='border-2 rounded-[2rem] p-2'>
                    <input className='w-[27rem] focus:outline-none' type="text" placeholder='Search...' />
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div> */}
                {/*<FontAwesomeIcon icon={faMoon} size='xl' />*/}
               {/*  <FontAwesomeIcon icon={faBell} size='xl' /> */}
                {/*<FontAwesomeIcon icon={faMessage} size='xl' /> */}
                {/*<FontAwesomeIcon icon={faBorderAll} size='xl' />*/}
                <div className='ml-[50rem] flex gap-4 border-r-2 pr-5'>
                    {adminData ? (
                        <>
                            <img className='rounded-full w-[3rem]' src={`http://localhost/waltzify_copy_fake/Backend/AdminImages/${adminData.pfile}`} alt="dp" />
                            <div>
                                <p className='text-lg font-bold'>{adminData.name}</p>
                                <p className='text-sm font-light'>Admin</p>
                            </div>
                        </>
                    ) : (
                        <div className='flex items-center'>
                            <Link to='/AdminLogin'>
                                <p className='text-lg font-bold'>Login</p>
                                <p className='text-sm font-light'>Admin</p>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex items-center gap-4 mr-[1rem] lg:mr-[3rem]'>
                {adminData && (
                    <FontAwesomeIcon 
                        icon={faSignOutAlt} 
                        size='xl' 
                        className='hover:text-red-500 hover:cursor-pointer' 
                        onClick={handleLogout} 
                    />
                )}
                <FontAwesomeIcon className='animate-spin' icon={faGear} size='2x' />
            </div>
        </div>
    );
}

export default NavAfterLog;















































































