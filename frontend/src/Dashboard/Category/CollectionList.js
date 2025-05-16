import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function CollectionList() {
    const [selectedValue, setSelectedValue] = useState('');
    const [collectionData, setCollectionData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [collectionToDelete, setCollectionToDelete] = useState(null);

    useEffect(() => {
        fetchCollectionData();
    }, []);

    useEffect(() => {
        // Filter the collectionData based on the searchQuery
        const filtered = collectionData.filter(collection => 
            collection.collectionName.toLowerCase().includes(searchQuery.toLowerCase()) || 
            collection.Id.toString().includes(searchQuery)
        );
        setFilteredData(filtered);
    }, [searchQuery, collectionData]);

    const fetchCollectionData = async () => {
        try {
            const response = await fetch('http://localhost/waltzify_copy_fake/Backend/Fetch_Collection.php');
            const data = await response.json();
            setCollectionData(data);
            setFilteredData(data); // Initialize filteredData with all collections
        } catch (error) {
            console.error('Error fetching collection data:', error);
        }
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const confirmDelete = (Id) => {
        setCollectionToDelete(Id);
        setShowConfirm(true);
    };

    const handleDelete = () => {
        fetch(`http://localhost/waltzify_copy_fake/Backend/Delete_Collection.php?Id=${collectionToDelete}`, {
            method: 'DELETE'
        })
        .then((response) => response.json())
        .then(() => {
            setCollectionData(prevCollectionData => prevCollectionData.filter(collection => collection.Id !== collectionToDelete));
            setShowConfirm(false);
            setCollectionToDelete(null);
        })
        .catch(error => console.log(error)); // Handle any errors
    };

    return (
        <div className='bg-[#F2F6F9] py-[2rem]'>
            <div className='flex flex-col lg:flex-row justify-between lg:items-center px-[2rem] lg:px-[4rem]'>
                <p className='text-xl lg:text-3xl font-bold'>Collection List</p>
                <p className='text-gray-600'>Dashboard <FontAwesomeIcon icon={faArrowRight}/> Ecommerce <FontAwesomeIcon icon={faArrowRight}/> <span className='font-light text-gray-500'>Collection List</span></p>
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
                    <Link to='/collection'>
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
                                <p className='font-bold'>Collection Id</p>                                
                                <p className='font-bold mr-[10rem]'>Collection</p>
                                <p className='font-bold ml-4'>Operation Update</p>
                                <p className='font-bold'>Operation Delete</p>
                            </div>
                        </div>
                        {filteredData.map(collection => (
                            <div key={collection.Id} className='flex items-center justify-between mx-[4rem] pr-[15rem]'>
                                <div className='w-[25rem] flex items-center gap-[1rem]'>
                                    <p className='w-8 ml-8'>{collection.Id}</p>
                                    <img className='ml-[5rem] h-[4rem] w-[4rem]' src={`http://localhost/waltzify_copy_fake/Backend/Collection/${collection.images1}`} alt="collection-img" />
                                    <p className='w-[10rem]'>{collection.collectionName}</p>
                                </div>
                                <Link to = {`/UpdateCollection/${collection.Id}`}><p>Update</p></Link>
                                <p className = 'cursor-pointer' onClick={() => confirmDelete(collection.Id)}>Delete</p>
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
                        <p>Are you sure you want to delete this collection?</p>
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

export default CollectionList;

