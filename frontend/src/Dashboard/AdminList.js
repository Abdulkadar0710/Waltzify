import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function AdminList() {
    const [selectedValue, setSelectedValue] = useState('');
    const [adminData, setAdminData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [adminToDelete, setAdminToDelete] = useState(null);

    useEffect(() => {
        fetchAdminData();
    }, []);

    useEffect(() => {
        const filtered = adminData.filter(admin => 
            admin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            admin.Id.toString().includes(searchQuery)
        );
        setFilteredData(filtered);
    }, [searchQuery, adminData]);

    const fetchAdminData = async () => {
        try {
            const response = await fetch('http://localhost/waltzify_copy_fake/Backend/FetchAdmin.php');
            const data = await response.json();
            setAdminData(data);
            setFilteredData(data);
        } catch (error) {
            console.error('Error fetching Admin data:', error);
        }
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const confirmDelete = (Id) => {
        setAdminToDelete(Id);
        setShowConfirm(true);
    };

    const handleDelete = () => {
        fetch(`http://localhost/waltzify_copy_fake/Backend/DeleteAdmin.php?Id=${adminToDelete}`, {
            method: 'DELETE'
        })
        .then((response) => response.json())
        .then(() => {
            setAdminData(prevAdminData => prevAdminData.filter(admin => admin.Id !== adminToDelete));
            setShowConfirm(false);
            setAdminToDelete(null);
        })
        .catch(error => console.log(error));
    };

    return (
        <div className='bg-[#F2F6F9] py-[2rem]'>
            <div className='flex flex-col lg:flex-row justify-between lg:items-center px-[2rem] lg:px-[4rem]'>
                <p className='text-xl lg:text-3xl font-bold'>Admin List</p>
                <p className='text-gray-600'>Dashboard <FontAwesomeIcon icon={faArrowRight}/> Ecommerce <FontAwesomeIcon icon={faArrowRight}/> <span className='font-light text-gray-500'>Admin List</span></p>
            </div>
            <div className='bg-white rounded-xl my-[2rem] mx-[2rem] lg:mx-[4rem] py-[2rem]'>
                <div className='px-[2rem] py-[1rem] flex flex-col lg:flex-row gap-[2rem] justify-between lg:items-center'>
                    <div className='border-2 flex items-center p-2 rounded-lg'> 
                        <input 
                            className='w-[25rem] focus:outline-none' 
                            type="text" 
                            placeholder='Search here by ID or name...'
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <FontAwesomeIcon icon={faSearch} color='#3B81F6'/>
                    </div>
                    <Link to='/addadmin'>
                        <button className='text-[#3B81F6] hover:text-white hover:bg-[#3B81F6] border-2 border-[#3B81F6] py-2 px-[2rem] rounded-xl'>
                            <FontAwesomeIcon className='pr-[1rem]' icon={faPlus}/>
                            Add New
                        </button>
                    </Link>
                </div>
                
                <div className='overflow-scroll lg:mx-[3rem]'>
                    <div className='w-[85rem]'>
                        <div className='bg-[#F2F6F9] mt-[1rem] mx-[3rem] rounded-xl'>
                            <div className='flex justify-between items-center p-[1rem] pr-[15rem]'>
                                <p className='font-bold mr-[10rem]'>Admin Id</p>                                
                                <p className='font-bold mr-[12rem]'>Admin Profile</p>
                                <p className='font-bold mr-[12rem]'>Admin's Email</p> {/* Updated label */}
                                <p className='font-bold mr-[10rem]'>Admin's Role</p>  {/* Updated label */}
                                <p className='font-bold'>Delete Admin</p>
                            </div>
                        </div>
                        {filteredData.map(admin => (
                            <div key={admin.Id} className='flex items-center justify-between mx-[4rem] pr-[15rem]'>
                                <div className='w-[25rem] flex items-center gap-[1rem]'>
                                    <p className='w-8 ml-8'>{admin.Id}</p>
                                    <img className='ml-[5rem] h-[4rem] w-[4rem]' src={`http://localhost/waltzify_copy_fake/Backend/AdminImages/${admin.pfile}`} alt="admin-img" />
                                    <p className='w-[10rem]'>{admin.name}</p>
                                </div>
                                <p className='w-[15rem]'>{admin.email}</p> {/* Adjusted width for alignment */}
                                <p className='font-bold text-gray-500 w-[10rem]'>{admin.role}</p>   {/* Adjusted width for alignment */}
                                
                                <p className='cursor-pointer text-red-500' onClick={() => confirmDelete(admin.Id)}>Delete</p>
                            </div>
                        ))}
                    </div>
                </div>
                <hr className='mx-[2rem]'/>
                <div className='my-[1rem] mx-[2rem]'>
                    <p className='text-sm text-gray-500'>Showing {filteredData.length} items</p>
                </div>
            </div>

            {showConfirm && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white p-6 rounded-md'>
                        <p>Are you sure you want to delete this Admin?</p>
                        <div className='flex justify-end gap-4 mt-4'>
                            <button className='bg-gray-300 p-2 rounded' onClick={() => setShowConfirm(false)}>Cancel</button>
                            <button className='bg-red-500 text-white p-2 rounded' onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminList;

