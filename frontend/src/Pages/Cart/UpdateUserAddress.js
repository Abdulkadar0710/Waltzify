import React, { useState, useEffect ,useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faAdd, faLocation } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../Context/UserContext'; 
import { useParams, useNavigate} from 'react-router-dom';
const UpdateUserAddress = () => {
    const { addressId } = useParams();
    const { user, isAuthenticated } = useContext(UserContext);
    const [FullName, setFullName] = useState('');
    const [Number, setNumber] = useState('');
    const [City, setCity] = useState('');
    const [State, setState] = useState('');
    const [AddressOne, setAddressOne] = useState('');
    const [AddressTwo, setAddressTwo] = useState('');
    const [AddressThree, setAddressThree] = useState('');
    const [Pincode, setPincode] = useState('');
    const [Landmark, setLandmark] = useState('');
    const [GSTIN,setGSTIN] = useState('');
    const [msg,setMsg] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate('');
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
        if (user) {
        fetch(`http://localhost/waltzify_copy_fake/Backend/fetch_address_for_edit.php?addressId=${addressId}`)
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
            const address = data.addresses[0];
            setFullName(address.FullName);
            setNumber(address.Number);
            setCity(address.City);
            setState(address.State);
            setAddressOne(address.Address1);
            setAddressTwo(address.Address2);
            setAddressThree(address.Address3);
            setPincode(address.Pincode);
            setLandmark(address.Landmark);
            setGSTIN(address.GSTIN);
            
          })
          .catch(error => {
            setError(error.message);
          });
        }
        else
        {
            navigate('/login');
        }
      }, [addressId]);
    

      const handleSubmit = (e) => {
        e.preventDefault();
        
        const updatedAddress = {
            FullName, 
            Number, 
            City, 
            State, 
            AddressOne, 
            AddressTwo, 
            AddressThree, 
            Pincode, 
            Landmark, 
            GSTIN
        };
    
        fetch(`http://localhost/waltzify_copy_fake/Backend/update_user_address.php?addressId=${addressId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedAddress),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setMsg('Address updated successfully.');
                setTimeout(() => navigate('/checkout'), 2000); // Redirect after successful update
            } else {
                setError(data.error || 'Failed to update address.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            setError('An error occurred while updating the address.');
        });
    };
    

    return (
        <div className='my-[2rem] mt-[10rem] lg:mt-[12rem] p-4 lg:p-[2rem] border-2 border-orange-500 rounded-lg'>
            <p className='text-2xl mb-[2rem]'>Edit Address</p>
            
            
            <form onSubmit={handleSubmit} className='mt-[2rem] flex flex-col gap-[1.5rem]'>
                <div className='flex flex-col lg:flex-row gap-[2rem]'>
                    <input 
                        required 
                        className='border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem]' 
                        type="text" 
                        placeholder='Full Name' 
                        value={FullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                    />
                    <input 
                        required 
                        className='border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem]' 
                        type="text" 
                        placeholder='10-digit mobile number' 
                        value={Number} 
                        onChange={(e) => setNumber(e.target.value)} 
                    />
                </div>
                <div className='flex flex-col lg:flex-row gap-[2rem]'>
                    <input 
                        required 
                        className='border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem]' 
                        value={City} 
                        onChange={(e) => setCity(e.target.value)} 
                        type="text" 
                        placeholder='City'
                    />
                    <select
                        className='rounded-xl p-1 focus:outline-none border-2'
                        value={State} // This will show the previously selected state
                        onChange={(e) => setState(e.target.value)} // This updates the state when the user selects a new one
                        >
                        <option value="">Select State</option>
                        {states.map((state, index) => (
                            <option key={index} value={state}>
                            {state}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col gap-[1rem]'>
                    <input 
                        required 
                        className='border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[35rem]' 
                        type="text" 
                        value={AddressOne} 
                        onChange={(e) => setAddressOne(e.target.value)} 
                        placeholder='Address Line 1'
                    />
                    <input 
                        className='border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[35rem]' 
                        type="text" 
                        value={AddressTwo} 
                        onChange={(e) => setAddressTwo(e.target.value)} 
                        placeholder='Address Line 2'
                    />
                    <input 
                        className='border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[35rem]' 
                        type="text" 
                        value={AddressThree} 
                        onChange={(e) => setAddressThree(e.target.value)} 
                        placeholder='Address Line 3'
                    />
                    <div className='flex flex-col lg:flex-row gap-[2rem]'>
                        <input 
                            required 
                            className='border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem]' 
                            value={Pincode} 
                            onChange={(e) => setPincode(e.target.value)} 
                            type="text" 
                            placeholder='Pincode'
                        />
                        <input 
                            className='border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem]'  
                            value={Landmark} 
                            onChange={(e) => setLandmark(e.target.value)} 
                            type="text" 
                            placeholder='Landmark'
                        />
                        <input className='border-2 outline-none p-2 rounded-lg w-[12rem] lg:w-[15rem]'  value={GSTIN} onChange={(e) => setGSTIN(e.target.value)} type="text" placeholder='GSTIN'/>
                    </div>
                </div>
                <div className='lg:flex-row flex-col flex items-center lg:gap-[2rem]'>
                    <button type='submit' className='text-lg bg-orange-500 text-white px-[3rem] py-2'>Save</button>
                    <button onClick={()=>{
        navigate('/checkout');  // Close the address form
        // Navigate to the checkout page
    }} className='text-orange-500 px-[3rem] text-lg'>Cancel</button>
                </div>
                {msg && <p className="text-green-500">{msg}</p>}
            {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>


    );

};
export default UpdateUserAddress