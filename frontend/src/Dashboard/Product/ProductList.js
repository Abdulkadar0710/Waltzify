import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCoffee, faPlus, faSearch, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

function ProductList() {
    const [selectedValue, setSelectedValue] = useState('');
    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Table headings
    const headings = [
        'Product',
        'Product ID',
        'Price',
        'SKU',
        'Discount',
        'Quantity',
        'Category',
        'Update',
        'Delete',
        'Stock',
    ];

    useEffect(() => {
        const adminData = localStorage.getItem('adminData');
        if (!adminData) {
            navigate('/AdminLogin'); // Redirect to login if no admin data found
        }

        fetch('http://localhost/waltzify_copy_fake/Backend/Fetch_home_products.php')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setDisplayedProducts(data); // Initialize displayedProducts with all products
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [navigate]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value.length > 0) {
            const filtered = products.filter((product) => {
                const isMatchingName = product.pname.toLowerCase().includes(value.toLowerCase());
                const isMatchingId = product.Id.toString() === value.trim();
                return isMatchingName || isMatchingId;
            });
            setDisplayedProducts(filtered); // Update displayedProducts with filtered results
        } else {
            setDisplayedProducts(products); // Show all products if search term is empty
        }
    };
    const confirmDelete = (Id) => {
        setProductToDelete(Id);
        setShowConfirm(true);
    };
    const handleDelete = () => {
        fetch(`http://localhost/waltzify_copy_fake/Backend/Delete_Products.php?Id=${productToDelete}`, {
            method: 'DELETE'
        })
        .then((response) => response.json())
        .then(() => {
            setDisplayedProducts(prevProductData => prevProductData.filter(product=> product.Id !== productToDelete));
            setShowConfirm(false);
            setProductToDelete(null);
        })
        .catch(error => console.log(error)); // Handle any errors
    };
    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(products);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
        XLSX.writeFile(workbook, 'product_list.xlsx');
    };

    const handleDropdownChange = (event) => {
        setSelectedValue(Number(event.target.value));
    };

    return (
        <div className='bg-[#F2F6F9] py-[2rem]'>
            <div className='flex lg:flex-row flex-col justify-between lg:items-center px-[1rem] lg:px-[4rem]'>
                <p className='text-xl lg:text-3xl font-bold'>Product List</p>
                <p className='text-gray-600'>
                    Dashboard <FontAwesomeIcon icon={faArrowRight} /> Ecommerce <FontAwesomeIcon icon={faArrowRight} />{' '}
                    <span className='font-light text-gray-500'>Product List</span>
                </p>
            </div>
            <div className='bg-white rounded-xl my-[2rem] mx-[2rem] lg:mx-[4rem] py-[2rem]'>
                <div className='px-[2rem] py-[1rem] flex lg:flex-row flex-col gap-[2rem] justify-between items-center'>
                    <div className='border-2 flex items-center p-2 rounded-lg'>
                        <input
                            className='lg:w-[25rem] focus:outline-none'
                            type='text'
                            placeholder='Search here...'
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                        <FontAwesomeIcon icon={faSearch} color='#3B81F6' />
                    </div>
                    <div>
                        <select
                            className='border-2 p-2 rounded-lg'
                            value={selectedValue}
                            onChange={handleDropdownChange}
                        >
                            <option value={0}>Select Columns</option>
                            {headings.map((_, index) => (
                                <option key={index} value={index + 1}>
                                    Show {index + 1} Columns
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={handleExport}
                        className='text-[#3B81F6] hover:text-white hover:bg-[#3B81F6] border-2 border-[#3B81F6] py-2 px-[2rem] rounded-xl'
                    >
                        <FontAwesomeIcon className='pr-[1rem]' icon={faFileAlt} />
                        Export All Users
                    </button>
                </div>

                <div className='overflow-x-auto mx-[1rem] lg:mx-[3rem]'>
                    <table className='min-w-[80rem]'>
                        <thead>
                            <tr className='bg-[#F2F6F9]'>
                                {headings.slice(0, selectedValue || headings.length).map((heading, index) => (
                                    <th key={index} className='p-2'>
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {displayedProducts.length > 0 ? (
                                displayedProducts.map((product, index) => (
                                    <tr key={index}>
                                        {headings.slice(0, selectedValue || headings.length).map((heading, hIndex) => {
                                            switch (hIndex) {
                                                case 0:
                                                    return (
                                                        <td key={hIndex}>
                                                            <img
                                                                className='w-[4rem]'
                                                                src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`}
                                                                alt='productimg'
                                                            />
                                                            {product.pname}
                                                        </td>
                                                    );
                                                case 1:
                                                    return <td  className = 'w-[5%]' key={hIndex}>{product.Id}</td>;
                                                case 2:
                                                    return <td className = 'font-bold'key={hIndex}>₹{product.p_price}</td>;
                                                case 3:
                                                    return <td className = 'w-[10%]' key={hIndex}>{product.SKU}</td>;
                                                case 4:
                                                    return (
                                                        <td  key={hIndex}>
                                                            {product.discount === 0
                                                                ? 'No Discount'
                                                                : `${product.discount}%`}
                                                        </td>
                                                    );
                                                case 5:
                                                    return <td key={hIndex}>{product.pQuantity}</td>;
                                                    case 6:
                                                        return (
                                                            <td className='w-[3%]' key={hIndex}>
                                                                {product.category.length > 20 
                                                                    ? product.category.slice(0, 20) + '...' 
                                                                    : product.category}
                                                            </td>
                                                        );
                                                case 7:
                                                    return (
                                                        <td key={hIndex} className='cursor-pointer text-blue-700'>
                                                            
                                                            <Link to={`/UpdateProduct/${product.Id}`}>Update</Link>
                                                        </td>
                                                    );
                                                case 8:
                                                    return (
                                                        <td
                                                            key={hIndex}
                                                            className='cursor-pointer text-red-500'
                                                            onClick={() => confirmDelete(product.Id)}
                                                        >
                                                            Delete
                                                        </td>
                                                    );
                                                case 9:
                                                    return (
                                                        <td
                                                            key={hIndex}
                                                            className={`${
                                                                product.Stock === 'In Stock'
                                                                    ? 'text-green-500'
                                                                    : 'text-orange-500'
                                                            }`}
                                                        >
                                                            {product.Stock}
                                                        </td>
                                                    );
                                                default:
                                                    return null;
                                            }
                                        })}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={headings.length} className='text-center py-4'>
                                        No products available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className='my-[1rem] mx-[2rem]'>
                    <p className='text-sm text-gray-500'>Showing {displayedProducts.length} items</p>
                </div>
            </div>
            {showConfirm && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white p-6 rounded-md'>
                        <p>Are you sure you want to delete this Product?</p>
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

export default ProductList;
/* import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCoffee, faPlus, faSearch ,faFileAlt} from '@fortawesome/free-solid-svg-icons';
import { Link , useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

function ProductList() {
    const [selectedValue, setSelectedValue] = useState('');
    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        const adminData = localStorage.getItem('adminData');
        if (!adminData) {
            navigate('/AdminLogin'); // Redirect to login if no admin data found
        }

        fetch('http://localhost/waltzify_copy_fake/Backend/Fetch_home_products.php')
          .then(response => response.json())
          .then(data => {
              setProducts(data);
              setDisplayedProducts(data); // Initialize displayedProducts with all products immediately
          })
          .catch(error => console.error('Error fetching data:', error));
    }, [navigate]);
    
    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
    
        if (value.length > 0) {
            const filtered = products.filter(product => {
                const isMatchingName = product.pname.toLowerCase().includes(value.toLowerCase());
                const isMatchingId = product.Id.toString() === value.trim();
                return isMatchingName || isMatchingId;
            });
            setDisplayedProducts(filtered); // Update displayedProducts with filtered results
        } else {
            setDisplayedProducts(products); // Show all products if search term is empty
        }
    };
    const handleSearchClick = () => {
        if (searchTerm.trim() === '') {
            setDisplayedProducts(products);
        }
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const confirmDelete = (Id) => {
        setProductToDelete(Id);
        setShowConfirm(true);
    };

    const handleDelete = () => {
        fetch(`http://localhost/waltzify_copy_fake/Backend/Delete/Delete_Products.php?Id=${productToDelete}`, {
            method: 'DELETE'
        })
        .then((response) => response.json())
        .then(() => {
            setDisplayedProducts(prevProductData => prevProductData.filter(product=> product.Id !== productToDelete));
            setShowConfirm(false);
            setProductToDelete(null);
        })
        .catch(error => console.log(error)); // Handle any errors
    };
    
    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(products);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
        XLSX.writeFile(workbook, 'product_list.xlsx');
    };

    return (
        <div className='bg-[#F2F6F9] py-[2rem]'>
            <div className='flex lg:flex-row flex-col justify-between lg:items-center px-[1rem] lg:px-[4rem]'>
                <p className='text-xl lg:text-3xl font-bold'>Product List</p>
                <p className='text-gray-600'>Dashboard <FontAwesomeIcon icon={faArrowRight}/> Ecommerce <FontAwesomeIcon icon={faArrowRight}/> <span className='font-light text-gray-500'>Product List</span></p>
            </div>
            <div className='bg-white rounded-xl my-[2rem] mx-[2rem] lg:mx-[4rem] py-[2rem]'>
                <div className='px-[2rem] py-[1rem] flex gap-[1rem] items-center'>
                    <FontAwesomeIcon icon={faCoffee} size='lg' color='#3B81F6'/>
                    <p className='text-gray-500 text-sm'>Tip search by Product Name: Each product is provided with a unique ID, which you can rely on to find the exact product you need.</p>
                </div>
                 <div className='px-[2rem] py-[1rem] flex lg:flex-row flex-col gap-[2rem] justify-between items-center'>

                    <div className='border-2 flex items-center p-2 rounded-lg'> 
                        <input 
                            className='lg:w-[25rem] focus:outline-none' 
                            type="text" 
                            placeholder='Search here...'
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                        <FontAwesomeIcon icon={faSearch} onClick={handleSearchClick} color='#3B81F6'/>
                    </div>
                    <button onClick={handleExport} className='text-[#3B81F6] ml-[17rem] hover:text-white hover:bg-[#3B81F6] border-2 border-[#3B81F6] py-2 px-[2rem] rounded-xl'>
                        <FontAwesomeIcon className='pr-[1rem]' icon={faFileAlt}/>
                        Export All Users
                    </button>
                    <Link to='/AddProduct'>
                        <button className='text-[#3B81F6] hover:text-white hover:bg-[#3B81F6] border-2 border-[#3B81F6] py-2 px-[2rem] rounded-xl'>
                            <FontAwesomeIcon className='pr-[1rem]' icon={faPlus}/>
                            Add New
                        </button>
                    </Link>
                </div> 
                
                <div className='overflow-x-auto mx-[1rem] lg:mx-[3rem]'>
                    <div className='min-w-[80rem]'>
                        <div className='w-full mt-[1rem]'>
                            <div className='bg-[#F2F6F9] flex justify-between items-center p-[1rem]'>
                                <p className='font-bold flex-1'>Product</p>
                                <p className='font-bold flex-1'>Product ID</p>
                                <p className='font-bold flex-1 ml-[2rem]'>Price</p>
                                <p className='font-bold flex-1 ml-[2rem]'>SKU</p>
                                <p className='font-bold flex-1'>Discount</p>
                                <p className='font-bold flex-1'>Quantity</p>
                                <p className='font-bold flex-1'>Category</p>
                                <p className='font-bold flex-1'>Update</p>
                                <p className='font-bold flex-1'>Delete</p>
                                <p className='font-bold flex-1'>Stock</p>
                            </div>
                        </div>
                        {displayedProducts.length > 0 ? (
                            displayedProducts.map((product, index) => (
                                <div key={index} className='py-[0.5rem] flex items-center justify-between'>
                                    <div className='flex items-center gap-[0.5rem] flex-1'>
                                        <img className='w-[4rem]' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`} alt="productimg" />
                                        <p className='font-bold text-sm'>{product.pname}</p>
                                    </div>
                                    <p className='text-sm flex-1 ml-[3rem]'>{product.Id}</p>
                                    <p className='text-sm flex-1'>₹{product.p_price}</p>
                                    <p className='text-sm flex-1 ml-[1rem]'>{product.SKU}</p>
                                    
                                    <p className='text-sm flex-1 ml-[1rem]'>
                                    {product.discount == 0 ? "No Discount" : `${product.discount}%`}
                                    </p>
                                
                                    
                                    <p className='text-sm flex-1'>{product.pQuantity}</p>
                                    <p className='text-sm flex-1'>
                                    {product.category.length > 10 
                                        ? product.category.slice(0, 10) + '...' 
                                        : product.category}
                                    </p>
                                    
                                    <p className='text-sm flex-1 text-blue-800'><Link to = {`/UpdateProduct/${product.Id}`}>Update</Link></p>
                                    <p className='text-sm flex-1 cursor-pointer text-red-500' onClick={() => confirmDelete(product.Id)}>Delete</p>
                                    <p className={`text-sm flex-1 ${product.Stock === 'In Stock' ? 'text-green-500' : 'text-orange-500'}`}>
                                        {product.Stock}
                                        </p>

                                    
                                </div>
                            ))
                        ) : (
                            <p className='text-gray-500 text-center py-4'>No products available</p>
                        )}
                    </div>
                </div>
               <hr className='mx-[2rem]'/>
                <div className='my-[1rem] mx-[2rem]'>
                    <p className='text-sm text-gray-500'>Showing {displayedProducts.length} items</p>
                </div>
            </div>
           
            {showConfirm && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white p-6 rounded-md'>
                        <p>Are you sure you want to delete this Product?</p>
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

export default ProductList;
  */