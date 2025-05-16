    import React, { useState, useEffect } from 'react';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faArrowRight, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
    import { Link } from 'react-router-dom';

    function CategoryList() {
        const [categoryData, setCategoryData] = useState([]);
        const [filteredCategories, setFilteredCategories] = useState([]);
        const [searchQuery, setSearchQuery] = useState('');
        const [selectedCategories, setSelectedCategories] = useState([]);
        const [showConfirm, setShowConfirm] = useState(false);
        const [categoryToDelete, setCategoryToDelete] = useState(null);

        useEffect(() => {
            fetchCategoryData();
        }, []);

        const fetchCategoryData = async () => {
            try {
                const response = await fetch('https://www.waltzify.com/Fetch_category.php');
                const data = await response.json();
        
                console.log("Fetched categories:", data);
        
                if (Array.isArray(data)) {
                    setCategoryData(data);
                    setFilteredCategories(data);
                } else {
                    console.error("Unexpected API response:", data);
                    setCategoryData([]);
                    setFilteredCategories([]);
                }
            } catch (error) {
                console.error('Error fetching category data:', error);
                setCategoryData([]);
                setFilteredCategories([]);
            }
        };
        
        

        const handleSearchChange = (event) => {
            const query = event.target.value.toLowerCase();
            setSearchQuery(query);

            const filtered = categoryData.filter(category =>
                category.cname.toLowerCase().includes(query) || 
                category.category_id.toString().includes(query)
            );

            setFilteredCategories(filtered);
        };

        const handleCheckboxChange = (categoryId) => {
            setSelectedCategories((prevSelected) =>
                prevSelected.includes(categoryId)
                    ? prevSelected.filter(id => id !== categoryId)
                    : [...prevSelected, categoryId]
            );
        };

        const saveSelectedCategories = async () => {
            try {
                await fetch('http://localhost/waltzify_copy_fake/Backend/Save_Categories.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ selectedCategories }),
                });
                alert('Selected categories saved successfully!');
            } catch (error) {
                console.error('Error saving categories:', error);
            }
        };

        const confirmDelete = (category_id) => {
            setCategoryToDelete(category_id);
            setShowConfirm(true);
        };

        const handleDelete = () => {
            fetch(`http://localhost/waltzify_copy_fake/Backend/Delete_Category.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Id: categoryToDelete })
            })
            .then((response) => response.json())
            .then(() => {
                setCategoryData(prevCategoryData => prevCategoryData.filter(category => category.category_id !== categoryToDelete));
                setFilteredCategories(prevCategoryData => prevCategoryData.filter(category => category.category_id !== categoryToDelete));
                setShowConfirm(false);
                setCategoryToDelete(null);
            })
            .catch(error => console.log(error));
        };

        return (
            <div className='bg-[#F2F6F9] py-[2rem]'>
                <div className='flex flex-col lg:flex-row justify-between lg:items-center px-[2rem] lg:px-[4rem]'>
                    <p className='text-xl lg:text-3xl font-bold'>Category List</p>
                    <p className='text-gray-600'>Dashboard <FontAwesomeIcon icon={faArrowRight}/> Ecommerce <FontAwesomeIcon icon={faArrowRight}/> <span className='font-light text-gray-500'>Category List</span></p>
                </div>
                <div className='bg-white rounded-xl my-[2rem] mx-[2rem] lg:mx-[4rem] py-[2rem]'>
                    <div className='px-[2rem] py-[1rem] flex flex-col lg:flex-row gap-[2rem] justify-between lg:items-center'>
                        <div className='border-2 flex items-center p-2 rounded-lg'> 
                            <input 
                                className='w-[25rem] focus:outline-none' 
                                type="text" 
                                placeholder='Search Category by ID and Name...'
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <FontAwesomeIcon icon={faSearch} color='#3B81F6'/>
                        </div>
                        <button  
                            className={`py-2 px-4 rounded ${selectedCategories.length === 0 ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-500 text-white'}`} 
                            onClick={saveSelectedCategories} 
                            disabled={selectedCategories.length === 0}
                        >
                            Save Selected Categories
                        </button>
                        <Link to='/newcategory'>
                            <button className='text-[#3B81F6] hover:text-white hover:bg-[#3B81F6] border-2 border-[#3B81F6] py-2 px-[2rem] rounded-xl'>
                                <FontAwesomeIcon className='pr-[1rem]' icon={faPlus}/>
                                Add New
                            </button>
                        </Link>
                    </div>
                    {/* Category List */}
                    <div className='overflow-scroll lg:mx-[3rem]'>
                        <div className='w-[85rem]'>
                            <div className='bg-[#F2F6F9] mt-[1rem] mx-[3rem] rounded-xl'>
                                <div className='flex justify-between items-center p-[1rem] pr-[15rem]'>
                                    <p className='font-bold'>CategoryId</p>                                
                                    <p className='font-bold mr-[10rem]'>Category</p>
                                    <p className='font-bold ml-4'>Operation Update</p>
                                    <p className='font-bold'>Operation Delete</p>
                                </div>
                            </div>
                            {filteredCategories.map(category => (
                                (<>
                                <div key={category.category_id} className='flex items-center justify-between mx-[4rem] pr-[15rem]'>
                                    <div className='w-[25rem] flex items-center gap-[1rem]'>
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(category.category_id)}
                                            onChange={() => handleCheckboxChange(category.category_id)}
                                        />
                                        <p className='w-8 ml-8'>{category.category_id}</p>
                                        <img className='ml-[5rem] h-[4rem] w-[4rem]' src={`http://localhost/waltzify_copy_fake/Backend/Category/${category.image}`} alt="category-img" />
                                        <p className='w-[10rem]'>{category.cname}</p>
                                    </div>
                                    <Link to={`/UpdateCategory/${category.category_id}`}><p>Update</p></Link>
                                    <p className='cursor-pointer' onClick={() => confirmDelete(category.category_id)}>Delete</p>
                                </div></>)
                            ))}
                        </div>
                    </div>
                    <div className='my-[1rem] mx-[2rem]'>
                    
                        <p className='text-sm text-gray-500'>Showing {filteredCategories.length} items</p>
                    </div>
                </div>

                {/* Confirmation Modal */}
                {showConfirm && (
                    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                        <div className='bg-white p-6 rounded-md'>
                            <p>Are you sure you want to delete this category?</p>
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

    export default CategoryList;

