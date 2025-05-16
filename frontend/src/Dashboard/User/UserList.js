import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSearch, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx'; 

function UserList() {
    const [users, setUsers] = useState([]);
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost/waltzify_copy_fake/Backend/fetch_allusers.php')
            .then(response => { 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUsers(data);
                setDisplayedUsers(data); // Initialize displayedUsers with all users
                console.log("displayedUsers: ",displayedUsers);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setUsers([]); // Handle error state
            });
    }, []);

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(value) ||
            user.phone.toLowerCase().includes(value) ||
            user.email.toLowerCase().includes(value)
        );

        setDisplayedUsers(filteredUsers); // Update displayedUsers with filtered results
    };

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(users);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
        XLSX.writeFile(workbook, 'users_list.xlsx');
    };

    return (
        <div className='bg-[#F2F6F9] py-[2rem]'>
            <div className='flex flex-col lg:flex-row justify-between lg:items-center px-[2rem] lg:px-[4rem]'>
                <p className='text-xl lg:text-3xl font-bold'>All Users</p>
                <p className='text-gray-600'>Dashboard <FontAwesomeIcon icon={faArrowRight} /> Users <FontAwesomeIcon icon={faArrowRight} /> <span className='font-light text-gray-500'>User List</span></p>
            </div>
            <div className='bg-white rounded-xl my-[2rem] mx-[2rem] lg:mx-[4rem] py-[2rem]'>
                <div className='px-[2rem] py-[1rem] flex flex-col lg:flex-row gap-[2rem] justify-between lg:items-center'>
                    <div className='border-2 flex items-center p-2 rounded-lg'>
                        <input
                            className='w-[25rem] focus:outline-none'
                            type="text"
                            placeholder='Search user by name,email,phone...'
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <FontAwesomeIcon icon={faSearch} color='#3B81F6' />
                    </div>
                    <button onClick={handleExport} className='text-[#3B81F6] hover:text-white hover:bg-[#3B81F6] border-2 border-[#3B81F6] py-2 px-[2rem] rounded-xl'>
                        <FontAwesomeIcon className='pr-[1rem]' icon={faFileAlt}/>
                        Export All Users
                    </button>
                </div>
                {/* Users List */}
                <div className='overflow-x-auto'>
                    <div className='min-w-full'>
                        {/* Headers */}
                        <div className='bg-[#F2F6F9] mx-[2rem] lg:mx-[3rem] rounded-xl'>
                            <div className='grid grid-cols-4 gap-4 text-center font-bold mx-[1rem] items-center p-[1rem]'>
                                <p className='col-span-1'>User</p>
                                <p className='col-span-1'>Phone</p>
                                <p className='col-span-1'>Email</p>
                                <p className='col-span-1'>Address</p>
                            </div>
                        </div>
                        {/* User data */}
                        {displayedUsers.map(user => (
                            <div key={user.Id} className='grid grid-cols-4 gap-4 text-center mx-[2rem] lg:mx-[3rem] py-[0.5rem]'>
                                <p className='text-sm font-bold col-span-1'>{user.name}</p>
                                <p className='text-sm col-span-1'>{user.phone}</p>
                                <p className='text-sm col-span-1'>{user.email}</p>
                                <p className='text-sm col-span-1'>{user.City}<br/>{user.Pincode}<br/>{user.Address1}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserList;





