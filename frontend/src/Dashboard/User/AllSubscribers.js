import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSearch, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';

function AllSubscribers() {
    const [products, setProducts] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [subscriberToDelete, setSubscriberToDelete] = useState(null);

    useEffect(() => {
        fetch('http://localhost/waltzify_copy_fake/Backend/fetch_subscribers.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setProducts([]); // Handle error state
            });
    }, []);

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(products);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Subscribers_Details');
        XLSX.writeFile(workbook, 'subscribers_list.xlsx');
    };
    const confirmDelete = (Id) => {
        setSubscriberToDelete(Id);
        setShowConfirm(true);
    };

    const handleDelete = () => {
        fetch(`http://localhost/waltzify_copy_fake/Backend/delete_subscriber.php?Id=${subscriberToDelete}`, {
            method: 'DELETE'
        })
        .then((response) => response.json())
        .then(() => {
            setProducts(prevProductData => prevProductData.filter(product=> product.Id !== subscriberToDelete));
            setShowConfirm(false);
            setSubscriberToDelete(null);
        })
        .catch(error => console.log(error)); // Handle any errors
    };


    return (
        <div className='bg-[#F2F6F9] py-[2rem]'>
            <div className='flex flex-col lg:flex-row justify-between lg:items-center px-[2rem] lg:px-[4rem]'>
                <p className='text-xl lg:text-3xl font-bold'>All Subscribers</p>
                <p className='text-gray-600'>
                    Dashboard <FontAwesomeIcon icon={faArrowRight} /> Users <FontAwesomeIcon icon={faArrowRight} /> <span className='font-light text-gray-500'>Subscribers</span>
                </p>
            </div>
            <div className='bg-white rounded-xl my-[2rem] mx-[2rem] lg:mx-[4rem] py-[2rem]'>
                <div className='px-[2rem] py-[1rem] flex justify-end'>
                    <button onClick={handleExport} className='text-[#3B81F6] hover:text-white hover:bg-[#3B81F6] border-2 border-[#3B81F6] py-2 px-4 rounded-xl'>
                        <FontAwesomeIcon className='pr-[1rem]' icon={faFileAlt} />
                        Export All Users
                    </button>
                </div>
                {/* Users List */}
                <div className='overflow-x-auto lg:mx-[3rem]'>
                    <div className='w-full'>
                        {/* Headers */}
                        <div className='bg-[#F2F6F9] mx-[2rem] lg:mx-[3rem] rounded-xl'>
                            <div className='flex justify-between items-center p-[1rem]'>
                                
                            <p className='font-bold w-[20%]'>Id</p>
                            <p className='font-bold w-[20%]'>Email</p>
                                <p className='font-bold w-[15%' >Remove Subscriber</p>
                                
                            </div>
                        </div>
                        {/* User data */}
                        {products.map(user => (
                            <div key={user.Id} className='py-[0.5rem] flex items-center justify-between gap-[1rem] mx-[2rem] lg:mx-[3rem] border-b'>
                                <p className='w-[15%] text-sm'>{user.Id}</p>
                                <p className='w-[20%] text-sm'>{user.email}</p>
                                <p className='w-[15%] text-sm text-red-500 cursor-pointer font-bold'onClick={() => confirmDelete(user.Id)}>Remove</p>
                            </div>
                        ))}
                        {showConfirm && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white p-6 rounded-md'>
                        <p>Are you sure you want to remove this Subscriber?</p>
                        <div className='flex justify-end gap-4 mt-4'>
                            <button className='bg-gray-300 p-2 rounded' onClick={() => setShowConfirm(false)}>Cancel</button>
                            <button className='bg-red-500 text-white p-2 rounded' onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
                    </div>
                </div>
                <hr className='mx-[2rem]' />
                <div className='mx-[5rem] mt-[1rem]'>
                    <p className='font-thin text-sm'>Showing {products.length} entries</p>
                </div> 
            </div>
        </div>
    );
}

export default AllSubscribers;