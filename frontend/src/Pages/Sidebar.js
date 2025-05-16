import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faAngleDown, faCartShopping,faLayerGroup,faStar, faFile, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Sidebar() {
    const [show,setShow] = useState(true);
    const toggleshow = () =>{
        setShow(!show);
    }
    //const [showDash,setShowDash] = useState(false);
    const [showEcommerce,setShowEcommerce] = useState(false);
    const [showCat,setShowCat] = useState(false);
    const [showOrder,setShowOrder] = useState(false);
    const [showUser,setShowUser] = useState(false);
    const [showAdmin,setShowAdmin] = useState(false);

    const toggleEcommerce = () => {
        setShowEcommerce(!showEcommerce);
        setShowUser(false);
        setShowCat(false);
        setShowOrder(false);
        setShowAdmin(false); // hide admin section
    }
    const toggleCat = () => {
        setShowCat(!showCat);
        setShowOrder(false);
        setShowUser(false);
        setShowEcommerce(false);
        setShowAdmin(false); // hide admin section
    }
    const toggleOrder = () => {
        setShowOrder(!showOrder);
        setShowUser(false);
        setShowCat(false);
        setShowEcommerce(false);
        setShowAdmin(false); // hide admin section
    }
    const toggleUser = () => {
        setShowUser(!showUser);
        setShowOrder(false);
        setShowCat(false);
        setShowEcommerce(false);
        setShowAdmin(false); // hide admin section
    }
    const toggleAdmin = () => {
        setShowAdmin(!showAdmin);
        setShowOrder(false);
        setShowCat(false);
        setShowUser(false);
        setShowEcommerce(false); // hide other sections
    };
  return (
    <>
    {show ? (
        <div className='z-[1000] w-[20rem] h-auto fixed top-0 left-0 bg-white border-r-2 h-[130dvh] max-md:h-[auto] shadow-lg '>
                <div className='flex justify-evenly items-center pr-[1rem]'>
                    <Link className='flex items-center' to={'/NavAfterLog'}>
                        <img className='h-[6rem] w-[6rem] ' src={require('../asset/logo.png')} alt="logo" />
                        <p className='text-4xl mr-[6rem] '>Waltzify</p>
                    </Link>
                    <FontAwesomeIcon className='hover:text-blue-500 cursor-pointer animate-pulse' onClick={toggleshow} icon={faBars} size='xl'/>
                </div>
            
            <p className='mt-[3rem] mb-[1.5rem] pl-[1rem] text-gray-500 font-bold'>All Pages</p>
            <div onClick={toggleEcommerce} className='hover:bg-blue-200 mx-[1rem] py-[0.5rem] rounded-xl hover:text-blue-500 cursor-pointer flex items-center justify-between pr-[1rem] mb-[1.5rem]'>
                <div className='flex items-center gap-2 pl-[1rem]'>
                    <FontAwesomeIcon icon={faCartShopping} size='lg'/>
                    <p className='font-semibold'>E-Commerce</p>
                </div>
                <FontAwesomeIcon onClick={toggleEcommerce} className='cursor-pointer' icon={faAngleDown} />
            </div>
            {showEcommerce ? (
                <div className='ml-[2rem] my-[1rem]'>
                    <ul className='font-semibold'>
                        <Link onClick={toggleshow} to={'/addproduct'}><li className='hover:text-blue-500 mb-[0.7rem]'>• Add Product</li></Link>
                        <Link onClick={toggleshow} to={'/adddefaultbanner'}><li className='hover:text-blue-500 mb-[0.7rem]'>• Add Default Banner (Home Page)</li></Link>
                        <Link onClick={toggleshow} to={'/adddefaultbannernewarrival'}><li className='hover:text-blue-500 mb-[0.7rem]'>• Add Default Banner(New Arrival)</li></Link>
                        <Link onClick={toggleshow} to={'/productlist'}><li className='hover:text-blue-500 mb-[0.7rem]'>• Product List</li></Link>
                        {/* <Link onClick={toggleshow} to={'/addproductsize'}><li className='hover:text-blue-500 mb-[0.7rem]'>• Add Product Size</li></Link */}                        
                        {/* <Link onClick={toggleshow} to={'/addoneproduct'}><li className='hover:text-blue-500 mb-[0.7rem]'>• Add One Product</li></Link> */}
                    </ul>
                </div>
            ):''}
            <div onClick={toggleCat} className='hover:bg-blue-200 mx-[1rem] py-[0.5rem] rounded-xl hover:text-blue-500 cursor-pointer flex items-center justify-between pr-[1rem] mb-[1.5rem]'>
                <div className='flex items-center gap-2 pl-[1rem]'>
                    <FontAwesomeIcon icon={faLayerGroup} size='lg'/>
                    <p className='font-semibold'>Category</p>
                </div>
                <FontAwesomeIcon onClick={toggleCat} className='cursor-pointer' icon={faAngleDown} />
            </div>
            {showCat ? (
                <div className='ml-[2rem] my-[1rem]'>
                    <ul className='font-semibold'>
                        <Link onClick={toggleshow} to={'/categorylist'}><li className='hover:text-blue-500 mb-[0.7rem]'>• Category List</li></Link>
                        <Link onClick={toggleshow} to={'/newcategory'}><li className='hover:text-blue-500 mb-[0.7rem]'>• New Category</li></Link>
                        <Link onClick={toggleshow} to={'/collection'}><li className='hover:text-blue-500 mb-[0.7rem]'>• New Collection</li></Link>
                        <Link onClick={toggleshow} to={'/collectionlist'}><li className='hover:text-blue-500 mb-[0.7rem]'>• Collection List</li></Link>
                        <Link onClick={toggleshow} to={'/addbanner'}><li className='hover:text-blue-500 mb-[0.7rem]'>• Add Banner(Home Page)</li></Link>
                        <Link onClick={toggleshow} to={'/addnewarrivalbanner'}><li className='hover:text-blue-500 mb-[0.7rem]'>• Add Banner(New ArrivalPage)</li></Link>
                    </ul>
                </div>
            ):''}
            <div className='hover:bg-blue-200 mx-[1rem] py-[0.5rem] rounded-xl hover:text-blue-500 cursor-pointer flex items-center justify-between pr-[1rem] mb-[1.5rem]'>
                <div className='cursor-pointer flex items-center gap-2 pl-[1rem]'>
                    <FontAwesomeIcon icon={faStar} size='lg'/>
                    <Link onClick={toggleshow} to={'/review'}><p className='font-semibold'>Review and Ratings</p></Link>
                </div>
            </div>
            <div onClick={toggleOrder} className='hover:bg-blue-200 mx-[1rem] py-[0.5rem] rounded-xl hover:text-blue-500 cursor-pointer flex items-center justify-between pr-[1rem] mb-[1.5rem]'>
                <div className='flex items-center gap-2 pl-[1rem]'>
                    <FontAwesomeIcon icon={faFile} size='lg'/>
                    <p className='font-semibold'>Orders</p>
                </div>
                <FontAwesomeIcon onClick={toggleOrder} className='cursor-pointer' icon={faAngleDown} />
            </div>
            {showOrder ? (
                <div className='ml-[2rem] my-[1rem]'>
                    <ul className='font-semibold'>
                        <Link onClick={toggleshow} to={'/orderlist'}><li className='hover:text-blue-500 mb-[0.7rem]'>• Order List</li></Link>
                        <Link onClick={toggleshow} to={'/orderdetails'}><li className='hover:text-blue-500 mb-[0.7rem]'>• Order Detail</li></Link>
                        <Link onClick={toggleshow} to={'/addcouriercompany'}><li className='hover:text-blue-500 mb-[0.7rem]'>• Add Courier Details</li></Link>
                        <Link onClick={toggleshow} to={'/couriercompanylist'}><li className='hover:text-blue-500 mb-[0.7rem]'>•Courier Company List</li></Link>
                        {/*<Link onClick={toggleshow} to={'/receipt_invoice'}><li className='hover:text-blue-500 mb-[0.7rem]'>•Invoice Form</li></Link> */}
                    </ul>
                </div>
            ):''}
            <div onClick={toggleUser} className='hover:bg-blue-200 mx-[1rem] py-[0.5rem] rounded-xl hover:text-blue-500 cursor-pointer flex items-center justify-between pr-[1rem] mb-[1.5rem]'>
                <div className='w-[20rem] flex items-center gap-2 pl-[1rem]'>
                    <FontAwesomeIcon icon={faUser} size='lg'/>
                    <p className='font-semibold'>Users</p>
                </div>
                <FontAwesomeIcon onClick={toggleUser} className='cursor-pointer'  icon={faAngleDown} />
            </div>
            {showUser ? (
                <div className='ml-[2rem] mt-[1rem]'>
                    <ul className='font-semibold'>
                        <Link onClick={toggleshow} to={'/userlist'}><li className='mb-[0.7rem] hover:text-blue-500'>• Users List</li></Link>
                        
                        <Link onClick={toggleshow} to={'/contactusdetails'}><li className='mb-[0.7rem] hover:text-blue-500'>• Contact Form Details</li></Link>
                        <Link onClick={toggleshow} to={'/allsubscribers'}><li className='mb-[0.7rem] hover:text-blue-500'>• All Subscribers</li></Link>
                    </ul>
                </div>
            ):''}
            <div onClick={toggleAdmin} className='hover:bg-blue-200 mx-[1rem] py-[0.5rem] rounded-xl hover:text-blue-500 cursor-pointer flex items-center justify-between pr-[1rem] mb-[1.5rem]'>
                        <div className='flex items-center gap-2 pl-[1rem]'>
                            <FontAwesomeIcon icon={faUser} size='lg' />
                            <p className='font-semibold'>Add Admin</p>
                        </div>
                        <FontAwesomeIcon className='cursor-pointer' icon={faAngleDown} />
                    </div>
                    {showAdmin && (
                        <div className='ml-[2rem] mt-[1rem]'>
                            <ul className='font-semibold'>
                                <Link onClick={toggleshow} to={'/addadmin'}><li className='mb-[0.7rem] hover:text-blue-500'>• Add Admin</li></Link>
                                <Link onClick={toggleshow} to={'/adminlist'}><li className='mb-[0.7rem] hover:text-blue-500'>• Admin List</li></Link>
                            </ul>
                        </div>
                    )}
        </div>
        
    ):''}

    </>
  )
}

export default Sidebar