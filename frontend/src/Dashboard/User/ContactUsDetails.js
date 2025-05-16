import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSearch, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';

function ContactUsDetails() {
    const [details, setDetails] = useState([]);
    const [filteredDetails, setFilteredDetails] = useState([]);
    const [filter, setFilter] = useState('');
    const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' });
    const [selectedUserIds, setSelectedUserIds] = useState([]);

    useEffect(() => {
        fetch('http://localhost/waltzify_copy_fake/Backend/fetch_contactus_details.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setDetails(data);
                setFilteredDetails(data); // Initialize filtered data
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setDetails([]);
                setFilteredDetails([]);
            });
    }, []);

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredDetails);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'ContactDetails');
        XLSX.writeFile(workbook, 'contactus_list.xlsx');
    };

    const handleFilterChange = (e) => {
        const selectedFilter = e.target.value;
        setFilter(selectedFilter);
        filterData(selectedFilter);
    };

    const handleCustomDateChange = (e) => {
        const { name, value } = e.target;
        setCustomDateRange(prev => ({ ...prev, [name]: value }));
    };

    const filterData = (filterOption) => {
        let filtered;
        const today = dayjs();
        
        switch (filterOption) {
            case 'today':
                filtered = details.filter(item => dayjs(item.created_at).isSame(today, 'day'));
                break;
            case 'yesterday':
                filtered = details.filter(item => dayjs(item.created_at).isSame(today.subtract(1, 'day'), 'day'));
                break;
            case 'last7':
                filtered = details.filter(item => dayjs(item.created_at).isAfter(today.subtract(7, 'day')));
                break;
            case 'last30':
                filtered = details.filter(item => dayjs(item.created_at).isAfter(today.subtract(30, 'day')));
                break;
            case 'thisMonth':
                filtered = details.filter(item => dayjs(item.created_at).isSame(today, 'month'));
                break;
            case 'thisYear':
                filtered = details.filter(item => dayjs(item.created_at).isSame(today, 'year'));
                break;
            case 'custom':
                filtered = details.filter(item => {
                    const createdAt = dayjs(item.created_at);
                    const start = dayjs(customDateRange.start);
                    const end = dayjs(customDateRange.end);
                    return createdAt.isAfter(start.subtract(1, 'day')) && createdAt.isBefore(end.add(1, 'day'));
                });
                break;
            default:
                filtered = details;
                break;
        }
        setFilteredDetails(filtered);
    };

    useEffect(() => {
        if (filter === 'custom' && customDateRange.start && customDateRange.end) {
            filterData('custom');
        }
    }, [customDateRange]);

    const handleCheckboxChange = (userId) => {
        setSelectedUserIds(prevSelected =>
            prevSelected.includes(userId)
                ? prevSelected.filter(id => id !== userId)
                : [...prevSelected, userId]
        );
    };

    const markAsSolved = () => {
        fetch('http://localhost/waltzify_copy_fake/Backend/update_query_status.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userIds: selectedUserIds, status: 'Solved' })
        })
            .then(response => response.json())
            .then(updatedData => {
                setDetails(prevDetails =>
                    prevDetails.map(user =>
                        selectedUserIds.includes(user.Id) ? { ...user, status: 'Solved' } : user
                    )
                );
                setFilteredDetails(prevFiltered =>
                    prevFiltered.map(user =>
                        selectedUserIds.includes(user.Id) ? { ...user, status: 'Solved' } : user
                    )
                );
                setSelectedUserIds([]); // Clear selection
            })
            .catch(error => console.error('Error updating status:', error));
    };

    return (
        <div className='bg-[#F2F6F9] py-[2rem]'>
            <div className='flex flex-col lg:flex-row justify-between lg:items-center px-[2rem] lg:px-[4rem]'>
                <p className='text-xl lg:text-3xl font-bold'>All Users</p>
                <p className='text-gray-600'>
                    Dashboard <FontAwesomeIcon icon={faArrowRight} /> Users <FontAwesomeIcon icon={faArrowRight} /> <span className='font-light text-gray-500'>User List</span>
                </p>
            </div>
            <div className='bg-white rounded-xl my-[2rem] mx-[2rem] lg:mx-[4rem] py-[2rem]'>
                <div className='flex justify-between items-center px-[2rem] py-[1rem]'>
                    <select value={filter} onChange={handleFilterChange} className='border-2 border-gray-300 rounded-lg p-2'>
                        <option value=''>All Time</option>
                        <option value='today'>Today</option>
                        <option value='yesterday'>Yesterday</option>
                        <option value='last7'>Last 7 Days</option>
                        <option value='last30'>Last 30 Days</option>
                        <option value='thisMonth'>This Month</option>
                        <option value='thisYear'>This Year</option>
                        <option value='custom'>Custom</option>
                    </select>
                    {filter === 'custom' && (
                        <div className='flex gap-2'>
                            <input type='date' name='start' onChange={handleCustomDateChange} className='border-2 border-gray-300 rounded-lg p-2' />
                            <input type='date' name='end' onChange={handleCustomDateChange} className='border-2 border-gray-300 rounded-lg p-2' />
                        </div>
                    )}
                     <button
                    onClick={markAsSolved}
                    className='mt-4 mx-[2rem] lg:mx-[3rem] text-white bg-[#3B81F6] py-2 px-4 rounded-xl'>
                    Mark as Solved
                </button>
                    <button onClick={handleExport} className='text-[#3B81F6] hover:text-white hover:bg-[#3B81F6] border-2 border-[#3B81F6] py-2 px-4 rounded-xl'>
                        <FontAwesomeIcon className='pr-[1rem]' icon={faFileAlt} />
                        Export Filtered Users
                    </button>
                </div>
                <div className='overflow-x-auto lg:mx-[3rem]'>
                    <div className='w-full'>
                        <div className='bg-[#F2F6F9] mx-[2rem] lg:mx-[3rem] rounded-xl'>
                            <div className='flex justify-between items-center p-[1rem]'>
                                <p className='font-bold w-[5%]'>Select</p>
                                <p className='font-bold w-[15%]'>First Name</p>
                                <p className='font-bold w-[15%]'>Last Name</p>
                                <p className='font-bold w-[20%]'>Email</p>
                                <p className='font-bold w-[15%]'>Phone</p>
                                <p className='font-bold w-[15%]'>Subject</p>
                                <p className='font-bold w-[20%]'>Message</p>
                                <p className='font-bold w-[5%]'>Status</p>
                            </div>
                        </div>
                        {filteredDetails.map(user => (
                            <div key={user.Id} className='py-[0.5rem] flex items-center justify-between gap-[1rem] mx-[2rem] lg:mx-[3rem] border-b'>
                                <input
                                    type='checkbox'
                                    className='w-[5%]'
                                    checked={selectedUserIds.includes(user.Id)}
                                    onChange={() => handleCheckboxChange(user.Id)}
                                />
                                <p className='w-[15%] text-sm'>{user.first_name}</p>
                                <p className='w-[15%] text-sm'>{user.last_name}</p>
                                <p className='w-[20%] text-sm'>{user.email}</p>
                                <p className='w-[15%] text-sm'>{user.phone}</p>
                                <p className='w-[15%] text-sm'><span className = 'font-bold'>{user.subject}</span><br /><span className='text-gray-500'>{user.created_at}</span></p>
                                <p className='w-[20%] text-sm'>{user.message}</p>
                                <p className='w-[5%] text-sm'>{user.status === 'Pending' ? <span className = 'text-red-500 font-bold'>{user.status}</span> : <span className = 'text-green-500 font-bold'>{user.status}</span>}</p>
                            </div>
                        ))}
                    </div>
                </div>
               
            </div>
        </div>
    );
}

export default ContactUsDetails;


/* import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSearch, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';

function ContactUsDetails() {
    const [details, setDetails] = useState([]);

    useEffect(() => {
        fetch('http://localhost/waltzify_copy_fake/Backend/fetch_contactus_details.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setDetails(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setDetails([]); // Handle error state
            });
    }, []);

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(details);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'ContactDetails');
        XLSX.writeFile(workbook, 'contactus_list.xlsx');
    };

    return (
        <div className='bg-[#F2F6F9] py-[2rem]'>
            <div className='flex flex-col lg:flex-row justify-between lg:items-center px-[2rem] lg:px-[4rem]'>
                <p className='text-xl lg:text-3xl font-bold'>All Users</p>
                <p className='text-gray-600'>
                    Dashboard <FontAwesomeIcon icon={faArrowRight} /> Users <FontAwesomeIcon icon={faArrowRight} /> <span className='font-light text-gray-500'>User List</span>
                </p>
            </div>
            <div className='bg-white rounded-xl my-[2rem] mx-[2rem] lg:mx-[4rem] py-[2rem]'>
                <div className='px-[2rem] py-[1rem] flex justify-end'>
                    <button onClick={handleExport} className='text-[#3B81F6] hover:text-white hover:bg-[#3B81F6] border-2 border-[#3B81F6] py-2 px-4 rounded-xl'>
                        <FontAwesomeIcon className='pr-[1rem]' icon={faFileAlt} />
                        Export All Users
                    </button>
                </div>
                
                <div className='overflow-x-auto lg:mx-[3rem]'>
                    <div className='w-full'>
                       
                        <div className='bg-[#F2F6F9] mx-[2rem] lg:mx-[3rem] rounded-xl'>
                            <div className='flex justify-between items-center p-[1rem]'>
                                <p className='font-bold w-[15%]'>First Name</p>
                                <p className='font-bold w-[15%]'>Last Name</p>
                                <p className='font-bold w-[20%]'>Email</p>
                                <p className='font-bold w-[15%]'>Phone</p>
                                <p className='font-bold w-[15%]'>Subject</p>
                                <p className='font-bold w-[20%]'>Message</p>
                            </div>
                        </div>
                        
                        {details.map(user => (
                            <div key={user.Id} className='py-[0.5rem] flex items-center justify-between gap-[1rem] mx-[2rem] lg:mx-[3rem] border-b'>
                                <p className='w-[15%] text-sm'>{user.first_name}</p>
                                <p className='w-[15%] text-sm'>{user.last_name}</p>
                                <p className='w-[20%] text-sm'>{user.email}</p>
                                <p className='w-[15%] text-sm'>{user.phone}</p>
                                <p className='w-[15%] text-sm'>{user.subject}</p>
                                <p className='w-[20%] text-sm'>{user.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <hr className='mx-[2rem]' />
                <div className='mx-[5rem] mt-[1rem]'>
                    <p className='font-thin text-sm'>Showing {details.length} entries</p>
                </div> 
            </div>
        </div>
    );
}

export default ContactUsDetails; */





