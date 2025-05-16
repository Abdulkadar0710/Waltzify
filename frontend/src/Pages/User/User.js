import React, { useState , useRef,useEffect,useMemo} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faAdd, faAngleDown, faAngleRight, faBagShopping, faLocation, faPowerOff, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import {useUser } from '../../Context/UserContext';

function User() {
    
    const inputRef = useRef(null); // Create a ref for the input field

    const handleEditClick = () => {
        // Focus on the Full Name input field
        inputRef.current.focus();
    };
    const { isAuthenticated, logout } = useUser();
    const [user,setUser] = useState(null);
    const navigate = useNavigate();
    const [account,setAccount] = useState(true);
    const [profile, setProfile] = useState(true);
    const [address, setAddress] = useState(false);
    const [addAddress, setAddAddress] = useState(false);
    
    /*for Updating user Data*/
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [phone,setPhone] = useState('');  
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
  

    // Memoize the fetch URL based on `user`
    const fetchUrl = useMemo(() => {
        return user ? `http://localhost/waltzify_copy_fake/Backend/fetch_user.php?id=${user.Id}` : null;
    }, [user]);

    
     {/*Fetch user personal information */}
     
     const [userProfile, setUserProfile] = useState({
        name: '',
        gender: '',
        email: '',
        phone: ''
    });
    useEffect(() => {
        if (fetchUrl) {
            fetch(fetchUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(userProfile => {
                    if (userProfile.error) {
                        throw new Error(userProfile.error);
                    }
                    setUserProfile({
                        name: userProfile.name,
                        gender: userProfile.gender,
                        email: userProfile.email,
                        phone: userProfile.phone
                    });
                })
                .catch(error => {
                    setError(error.message);
                });
        }
    }, [fetchUrl]); // Depend on the memoized URL
          
    useEffect(() => {
        if (userProfile) {
            setGender(userProfile.gender);  // Initialize gender when component loads
        }
    }, [userProfile]);
    
    const handleInputChange = (e, type) => {
        const value = e.target.value;
        switch(type) {
            case "name":
                setName(value);
                break;
            case "email":
                setEmail(value);
                break; 
            case "phone":
                setPhone(value);
                break;
            default:
                break;
        }
    };
    
    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };
   
   /*  const handleSubmit = async (e) => {
        e.preventDefault();
        if (gender || phone) {
            try {
                const formData = new FormData();
                formData.append("gender", gender);
                formData.append("phone", phone);

                const response = await fetch(`http://localhost/waltzify_copy_fake/Backend/User/add_user.php?id=${user.Id}`, {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();
                if (data[0].result === "Not Submitted,Please try again!") {
                    setError(data[0].result);
                } else {
                    setMsg(data[0].result);
                    setTimeout(() => navigate('/'), 2000);
                }
            } catch (err) {
                setError("Error: " + err.message);
            }
        } else {
            setError("All fields are Required!");
        }
    };  */
    
   /* 
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Ensure we are only updating fields that have new values
        const updatedGender = gender || user.gender;  // If gender is not updated, keep old value
        const updatedPhone = phone || user.phone;     // If phone is not updated, keep old value
    
        try {
            const formData = new FormData();
            formData.append("gender", updatedGender);
            formData.append("phone", updatedPhone);
    
            // Make the POST request to update user data
            const response = await fetch(`http://localhost/waltzify_copy_fake/Backend/User/add_user.php?id=${user.Id}`, {
                method: "POST",
                body: formData
            });
    
            const data = await response.json();
            if (data[0].result === "Not Submitted,Please try again!") {
                setError(data[0].result);
            } else {
                setMsg(data[0].result);
                setTimeout(() => navigate('/'), 2000); // Redirect after saving
            }
        } catch (err) {
            setError("Error: " + err.message);
        }
    }; */
    /* const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Ensure we are only updating fields that have new values
        const updatedName = name || userProfile.name;
        const updatedGender = gender || userProfile.gender;  // Keep old value if not updated
        const updatedPhone = phone || userProfile.phone;
        const updatedEmail = email || userProfile.email;     // Keep old value if not updated
    
        try {
            const formData = new FormData();
            formData.append("name", updatedName);
            formData.append("gender", updatedGender);
            formData.append("phone", updatedPhone);
            formData.append("email", updatedEmail);
    
            // Make the POST request to update user data
            const response = await fetch(`http://localhost/waltzify_copy_fake/Backend/User/add_user.php?id=${user.Id}`, {
                method: "POST",
                body: formData
            });
    
            const data = await response.json();
            if (data.error) {
                setError(data.error); // Handle error response
            } else {
                // Successfully updated the user data
                setUserProfile((prevUserProfile) => ({
                    ...prevUserProfile,
                    name: updatedName,
                    gender: updatedGender,
                    phone: updatedPhone,
                    email: updatedEmail
                }));
    
                setMsg(data.message); // Show success message
                setTimeout(() => navigate('/'), 2000); // Redirect after saving
            }
        } catch (err) {
            setError("Error: " + err.message);
        }
    }; */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedName = name || userProfile.name;
        const updatedGender = gender || userProfile.gender;
        const updatedPhone = phone || userProfile.phone;
        const updatedEmail = email || userProfile.email;

        try {
            const formData = new FormData();
            formData.append('name', updatedName);
            formData.append('gender', updatedGender);
            formData.append('phone', updatedPhone);
            formData.append('email', updatedEmail);

            const response = await fetch(`http://localhost/waltzify_copy_fake/Backend/add_user.php?id=${user.Id}`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.error) {
                setError(data.error);  // Handle error response
            } else {
                // Successfully updated, now update userProfile state and gender state
                setUserProfile((prevUserProfile) => ({
                    ...prevUserProfile,
                    name: updatedName,
                    gender: updatedGender,
                    phone: updatedPhone,
                    email: updatedEmail
                }));

                // Ensure local gender state is updated as well
                setGender(updatedGender);  // Update gender state after saving to reflect latest change
                if(data.result === 'Updated Successfully!'){
                    setMsg('Updated Successfully!');
                }  // Show success message
                setTimeout(() => navigate('/'), 2000);  // Redirect after saving
            }
        } catch (err) {
            setError('Error: ' + err.message);
        }
    };

    
    
    

    /*for updating address*/

    const [fullname,setFullName]         = useState('');
    const [number,setNumber]             = useState('');
    const [pincode ,setPinCode]          = useState('');
    const [state,setState]               = useState('');
    const [addressOne,setAddressOne]     = useState('');
    const [addressTwo,setAddressTwo]     = useState('');
    const [addressThree,setAddressThree] = useState('');
    const [city,setCity]                 = useState('');
    const [landmark,setLandMark]         = useState('');
  
    const handleDeleteAddress = (addressId) => { 
        if (window.confirm('Are you sure you want to delete this address?')) {
            fetch(`http://localhost/waltzify_copy_fake/Backend/delete_address.php?Id=${addressId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Remove the address from the state after successful deletion
                    setAddresses(addresses.filter(address => address.addressId !== addressId));
                } else {
                    console.error('Error deleting address:', data.error);
                }
            })
            .catch(error => console.error('Error:', error));
        }
    };
    
    const handleInput = (e, type) => {
        setError("");
        const value = e.target.value;
        switch (type) {
          case "fullname":
            setFullName(value);
            break;
          case "number":
            setNumber(value);
            break;
          case "pincode":
            setPinCode(value);
            break;
          case "state":
            setState(value);
            break;
          case "addressOne":
            setAddressOne(value);
            break;
          case "addressTwo":
            setAddressTwo(value);
            break;
          case "addressThree":
            setAddressThree(value);
            break;
          case "city":
            setCity(value);
            break;
          case "landmark":
            setLandMark(value);
            break;
          default:
            break;
        }
      };
    
      const handleSubmission = async (e) => {
        e.preventDefault();
        const phoneNumberPattern = /^[0-9]{10}$/;  // Regex for exactly 10 digits
    const pincodePattern = /^[0-9]{6}$/;       // Regex for exactly 6 digits

    if (!fullname || !number || !pincode || !state || !addressOne || !city) {
        setError("All fields are required!");
        return;
    }

    // Validate phone number
    if (!phoneNumberPattern.test(number)) {
        setError("Phone number must be exactly 10 digits.");
        return;
    }

    // Validate pincode
    if (!pincodePattern.test(pincode)) {
        setError("Pincode must be exactly 6 digits.");
        return;
    }
    
    
        if (fullname && number && pincode && state && addressOne  && city) {
              
          try {
            const formData = new FormData();
            formData.append("fullname", fullname);
            formData.append("number", number);
            formData.append("pincode", pincode);
            formData.append("state", state);
            formData.append("addressOne", addressOne);
            formData.append("city", city);
                        
            if(addressTwo)
            {
                formData.append("addressTwo", addressTwo);
            }
            if(addressThree)
            {
                formData.append("addressThree", addressThree);

            }
            if(landmark)
            {
                formData.append("landmark", landmark);
            }
            const response = await fetch(`http://localhost/waltzify_copy_fake/Backend/add_address.php?id=${user.Id}`, {
              method: "POST",
              body: formData 
            });
    
            const data = await response.json();
            if (data[0].result === "Not Submitted, Please try again!") {
              setError(data[0].result);
            } else {
              setMsg(data[0].result);
              setTimeout(() => navigate('/user'), 2000);
            }
          } catch (err) {
            if(err.message === "Cannot read properties of null (reading 'Id')")
               {
                err.message = "You are not Loggined!";
                setError(err.message);
                setTimeout(() => navigate('/user'), 2000);
               }
          }
        } else {
          setError("All fields are required!");
        }
      };
      const states = [
        'Andaman and Nicobar Islands',
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chandigarh',
        'Chhattisgarh',
        'Dadra and Nagar Haveli and Daman and Diu',
        'Delhi',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jharkhand',
        'Jammu & Kashmir',
        'Karnataka',
        'Kerala',
        'Ladakh',
        'Lakshadweep',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Puducherry',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttar Pradesh',
        'Uttarakhand',
        'West Bengal'
    ];
    
    
  
    useEffect(() => {
        // Re-check authentication status on mount
        const checkAuthentication = () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && isAuthenticated) {
                setUser(user);
            }
        };

        checkAuthentication();
    }, [isAuthenticated]);
    const handleProfile = ()=>{
        setProfile(true);
        setAddress(false);
        setFilter(false);
    }
    const handleAddress = ()=>{
        setProfile(false);
        setAddress(true);
        setFilter(false);
    }
    const handleNotification = ()=>{
        setProfile(false);
        setAddress(false);
        setFilter(false);
    }

    const handleAddAddress = () =>{
        setAddAddress(true);
    }
    
    const handleAccount = () =>{
        setAccount(!account);
    } 
    const [filter, setFilter] = useState(false);
    const [drop, setDrop] = useState(false);

    const handleFilter = () => {
        setDrop(false);
        setFilter(!filter);
        setTimeout(() => setDrop(true), 100); // Slight delay to ensure re-render
    };
    const handleLogout = () => {
        // Clear session storage and update context state
        localStorage.removeItem('user'); // Assuming 'user' is the key for user data
        logout();
        navigate('/login');
    };
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account,and after deletion please refresh your page?");
        if (confirmDelete) {
            // Send a request to the backend to delete the user account from the database
            try {
                const response = await fetch(`http://localhost/waltzify_copy_fake/Backend/Delete_user.php?userId=${user.Id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: user.Id }), // Pass the user's ID
                });
    
                const result = await response.json();
                if (result.success) {
                    // Clear local storage and update context state
                    localStorage.removeItem('user'); // Assuming 'user' is the key for user data
                    logout();
                    navigate('/login');
                } else {
                    console.error("Failed to delete the account");
                }
            } catch (error) {
                console.error("Error deleting account:", error);
            }
        }
    };
    /*Fetching Address*/
    const [addresses,setAddresses] = useState([]);
    useEffect(() => {
        if (user) {
            fetch(`http://localhost/waltzify_copy_fake/Backend/fetch_address.php?userId=${user.Id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    setAddresses(data.addresses);
                    //setLoading(false);
                })
                .catch(error => {
                    console.error('Fetch error:', error); // Log error
                    setError(error.message);
                    //setLoading(false);
                });
        }
    }, [user]);
  return (
    <div className='mx-[1rem] lg:mt-[10vw] mt-[15vw]  lg:mx-[3rem] lg:py-[3rem] flex flex-col lg:flex-row lg:gap-[1.5rem]'>
        
        <div className='lg:hidden flex mb-[2rem] mt-2 border-2 rounded-xl text-xl text-orange-500'>
            <p onClick={handleFilter} className='w-full text-center p-2'><Person2OutlinedIcon/> User</p>
        </div>

        {/* filter section responsive */}
        {filter && (
            <div className={`lg:hidden flex justify-evenly lg:p-[1rem] w-[90vw] top-0 z-[10] bg-white text-orange-500 transition-transform ease-in-out duration-500 transform ${drop ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className='w-full'>
                    <div className='flex flex-col gap-[1.5rem]'>
                        {/* other details */}
                        <div className='border-2'>
                            {/* my orders */}
                            <div className='flex items-center justify-between text-lg p-3 lg:border-b-black border-b-2'>   
                                <div className='flex items-center gap-[1.5rem]'>
                                    <FontAwesomeIcon icon={faBagShopping}/>
                                    <p>My Orders</p>
                                </div>
                                <FontAwesomeIcon icon={faAngleDown}/>
                            </div>
                            {/* accounts */}
                            <div className=''>
                                <div onClick={handleAccount} className='flex items-center justify-between text-lg p-3 lg:border-b-black border-b-2'>   
                                    <div className='flex items-center gap-[1.5rem]'>
                                        <FontAwesomeIcon icon={faUserAlt}/>
                                        <p>Account</p>
                                    </div>
                                    <FontAwesomeIcon icon={faAngleDown}/>
                                </div>
                                {account && (
                                    <div className='text-lg text-gray-500 cursor-default border-b-black border-b-2'>
                                        <p onClick={handleProfile} className='px-[1rem] py-2 hover:bg-orange-500 hover:text-white transition-all ease-in-out'>Profile Information</p>
                                        <p onClick={handleAddress} className='px-[1rem] py-2 hover:bg-orange-500 hover:text-white transition-all ease-in-out'>Manage Addresses</p>
                                        <Link to={'/wish'}><p className='px-[1rem] py-2 hover:bg-orange-500 hover:text-white transition-all ease-in-out'>My Wishlist</p></Link>
                                        <p onClick={handleNotification} className='px-[1rem] py-2 hover:bg-orange-500 hover:text-white transition-all ease-in-out'>All Notification</p>
                                    </div>
                                )}
                            </div>
                            {/* logout */}
                            <div className='flex items-center gap-[1.5rem] text-lg p-3 lg:border-b-black border-b-2'>
                                <FontAwesomeIcon icon={faPowerOff}/>
                                <p onClick={handleLogout} className='hover:cursor-pointer'>Logout</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
        
        
        {/* left */}
        <div className='hidden lg:block lg:w-1/5'>
            <div className='flex flex-col gap-[1.5rem]'>
                {/* name */}
                <div className='flex items-center gap-[1.5rem] text-lg border-2 rounded-xl p-3'>
                    <FontAwesomeIcon icon={faUser} color='orange'/>
                    
                      
                        <p>Hello <span className='font-bold'>{user ? userProfile.name : ''}</span></p>
                        
                        </div>
                {/* other details */}
                <div className='border-2 rounded-xl'>
                    {/* my orders */}
                    <Link to={'/myorders'}>
                        <div className='flex items-center justify-between text-lg p-3 border-b-black border-b-2'>   
                            <div className='flex items-center gap-[1.5rem]'>
                                <FontAwesomeIcon icon={faBagShopping} color='orange'/>
                                <p>My Orders</p>
                            </div>
                            <FontAwesomeIcon icon={faAngleRight}/>
                        </div>
                    </Link>
                    {/* accounts */}
                    <div className=''>
                        <div onClick={handleAccount} className='flex items-center justify-between text-lg p-3 border-b-black border-b-2'>   
                            <div className='flex items-center gap-[1.5rem]'>
                                <FontAwesomeIcon icon={faUserAlt} color='orange'/>
                                <p>Account</p>
                            </div>
                            <FontAwesomeIcon icon={faAngleDown}/>
                        </div>
                        {account && (
                            <div className='text-lg text-gray-500 cursor-default border-b-black border-b-2'>
                                <p onClick={handleProfile} className={`px-[1rem] py-2  ${profile? 'bg-orange-100 text-orange-600':''} hover:bg-orange-500 hover:text-white transition-all ease-in-out`}>Profile Information</p>
                                <p onClick={handleAddress} className={`px-[1rem] py-2  ${address? 'bg-orange-100 text-orange-600':''} hover:bg-orange-500 hover:text-white transition-all ease-in-out`}>Manage Addresses</p>
                                <Link to={'/wish'}><p className='px-[1rem] py-2 hover:bg-orange-500 hover:text-white transition-all ease-in-out'>My Wishlist</p></Link>
                                <p onClick={handleDelete} className='px-[1rem] py-2 hover:bg-orange-500 hover:text-white transition-all ease-in-out hover:cursor-pointer'>Delete Account</p>
                            </div>
                        )}
                    </div>
                    {/* logout */}
                    
                    <div className='flex items-center gap-[1.5rem] text-lg p-3 border-b-black border-b-2'>
                        <FontAwesomeIcon icon={faPowerOff} color='orange'/>
                        <p onClick={handleLogout} className='hover:cursor-pointer'>Logout</p> 
                        
                    </div>
                    
                    
                </div>
            </div>
        </div>
        {/* right */}
        <div className='lg:w-4/5 mb-[2rem]'>
            {profile && (
                
                <div className='w-full border-2 rounded-xl p-[1rem] lg:p-[2rem]'>
                     {msg ? (
        <span className="success">{msg}</span>
    ) : (
        error && <span className="error">{error}</span>
)}
                    <h1 className='text-2xl font-semibold'>Personal Information <span className='text-blue-700 text-xl cursor-pointer font-bold 'onClick={handleEditClick}title="You can edit any information" >Edit</span></h1>
                    <form className='flex flex-col justify-center gap-[2rem] py-[2rem]' action="submit">
                    
                        <div className='flex flex-col lg:flex-row gap-[2rem] items-center'>
                        <label className='flex items-center gap-[1rem]' htmlFor="f_name">Full Name
                        <input ref={inputRef} required className='border-2 outline-none p-1 rounded-lg w-[12rem]' type="text" placeholder={userProfile.name} value={name} onChange={(e) => handleInputChange(e, "name")} />
                    </label>
                            
                        </div>
                
                       
            <label htmlFor='gender'>Gender</label>
            <div className='flex gap-[1rem]'>
                <input 
                    type='radio' 
                    value='Male' 
                    name='gender' 
                    onChange={handleGenderChange} 
                    checked={gender === 'Male'}  // Properly check based on state
                /> Male
                <input 
                    type='radio' 
                    value='Female' 
                    name='gender' 
                    onChange={handleGenderChange} 
                    checked={gender === 'Female'}  // Properly check based on state
                /> Female
                <input 
                    type='radio' 
                    value='Other' 
                    name='gender' 
                    onChange={handleGenderChange} 
                    checked={gender === 'Other'}  // Properly check based on state
                /> Other
            </div>



                <label className='flex items-center gap-[1rem]' htmlFor="email">Email
                    <input required className='border-2 outline-none p-1 rounded-lg w-[15rem]' type="email" placeholder={userProfile.email} value={email} onChange={(e) => handleInputChange(e, "email")} />
                </label>

                <label className='flex items-center gap-[0.5rem]' htmlFor="mobile">Mobile Number
                    <input required minLength={10} maxLength={10} className='border-2 outline-none p-1 rounded-lg w-[11rem]' pattern="\d{10}" type="tel" placeholder={userProfile.phone} value={phone} onChange={(e) => handleInputChange(e, "phone")} />
                </label>
                        <button className='submit_button ' type = 'submit' onClick={handleSubmit}>Save Changes</button>
                        
                        </form>
                </div>
            )}
            {address &&  (
                <div className='w-full border-2 rounded-xl p-[2rem]'>
                    <h1 className='text-2xl font-semibold'>Personal Information</h1>
                    
                    <div>
                        {addAddress ? (
                            <div className='my-[2rem] p-4 lg:p-[2rem] border-2 border-orange-500 rounded-lg'>
                               <p>
                                 {msg ? <span className="success">{msg}</span> : <span className="error">{error}</span>}
                                </p>
                                <p className='text-2xl mb-[2rem]'>Add new Address</p>
                               
                                <form onSubmit={handleSubmission} className='mt-[2rem] flex flex-col gap-[1.5rem]'>
                                    <div className='flex flex-col lg:flex-row gap-[2rem]'>
                                        <input required className='border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem]' type="text" placeholder='Full Name'   value={fullname}
                                        onChange={(e) => handleInput(e, 'fullname')} />
                                        <input required className='border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem]' type="text" placeholder='10-digit mobile number'  value={number} onChange={(e) => handleInput(e, 'number')}/>
                                    </div>
                                    <div className='flex flex-col lg:flex-row gap-[2rem]'>
                                    <input required className='border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem]' value={city} onChange={(e) => handleInput(e, 'city')} type="text" placeholder='city'/>
                                       
                                        <select
                                        className='rounded-xl p-1 focus:outline-none border-2'
                                        value={state}
                                        onChange={(e) => handleInput(e, 'state')}
                                        >
                                        <option value="">Select State</option>
                                        {states.map((cat, index) => (
                                            <option key={index} value={cat}>{cat}</option>
                                        ))}
                                        </select>
                                    </div>
                                    <div className='flex flex-col gap-[1rem]'>
                                        <input required className='border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem] lg:w-[35rem]' type="text" name="address line 1" value={addressOne} onChange={(e) => handleInput(e, 'addressOne')} id="address" placeholder='Address Line 1'/>
                                        <input className='border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem] lg:w-[35rem]' type="text" name="address line 2" value={addressTwo} onChange={(e) => handleInput(e, 'addressTwo')} id="address" placeholder='Address Line 2'/>
                                        <input className='border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem] lg:w-[35rem]' type="text" name="address line 3" value={addressThree} onChange={(e) => handleInput(e, 'addressThree')} id="address" placeholder='Address Line 3'/>
                                        <div className='flex flex-col lg:flex-row gap-[2rem]'>
                                        <input required className='border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem]' value={pincode} onChange={(e) => handleInput(e, 'pincode')} type="text" placeholder='Pincode'/>
                                            <input className='border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem]'  value={landmark} onChange={(e) => handleInput(e, 'landmark')} type="text" placeholder='Landmark'/>
                                        </div>
                                    </div>
                                    
                                    <div className='lg:flex-row flex-col flex items-center lg:gap-[2rem]'>
                                        <button type='submit' className='text-lg bg-orange-500 text-white px-[3rem] py-2'>Save</button>
                                        <button onClick={()=>setAddAddress(false)} className='text-orange-500 px-[3rem] text-lg'>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        ):(
                            <div className='text-orange-500 font-bold mt-[1rem] text-lg p-[1rem] border-2 flex items-center gap-[2rem]'>
                                <FontAwesomeIcon icon={faAdd}/>
                                <button onClick={handleAddAddress} className='w-full text-start'>Add New Address</button>
                            </div>
                        )}
                    </div>
                    <div className='my-[2rem] border-2'>
                    {addresses.map((address, index) => (
                        <div key={index} className='border-b-2 p-4'>
                            {/* <p className='bg-gray-300 p-1 text-center rounded-lg w-[6rem] text-gray-600'>Home</p> */}
                            <div className='font-bold flex items-center gap-[2rem]'>
                            <p>{address.FullName}</p>
                            <p>{address.Number}</p>
                        </div>
                        <p>{address.Address1}</p>
                        <div className="flex gap-4">
                         <button 
                             className='bg-blue-500 text-white px-3 py-1 rounded'
                             
                         >
                           <Link to = {`/UpdateUserAddress/${address.addressId}`}>Edit</Link>
                         </button>
                         <button 
                             className='bg-red-500 text-white px-3 py-1 rounded'
                             onClick={() => handleDeleteAddress(address.addressId)}
                         >
                             Delete
                         </button>
                     </div>
                        </div>
                    ))}
                </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default User