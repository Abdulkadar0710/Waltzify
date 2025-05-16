import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocation, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Navigate, useNavigate } from 'react-router-dom';

function Return() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false); // New loading state

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.subject || !formData.message) {
            setErrorMessage('All fields are required.');
            setSubmissionMessage('');
            return;
        }

        setErrorMessage(''); // Clear error message
        setLoading(true); // Disable the button

        try {
            const response = await fetch('http://localhost/waltzify_copy_fake/Backend/handleContactForm.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmissionMessage('Form submitted successfully!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
                setTimeout(() => navigate('/'), 1000);
            } else {
                setSubmissionMessage('Failed to submit the form. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmissionMessage('An error occurred while submitting the form.');
        } finally {
            setLoading(false); // Re-enable the button after response
        }
    };

    return (
        <div className='flex items-center justify-center mt-[12vw] lg:mt-[10vw] py-[2.5rem] bg-[#F3F4F6]'>
            <div className='flex lg:w-full mx-[1rem] lg:mx-[3rem] overflow-hidden rounded-xl'>
                <div className='hidden lg:block relative w-2/5'>
                    <img className='w-full h-[90vh]' src="https://i.pinimg.com/564x/a6/66/b7/a666b7ec66d46d7985ac66527219ab62.jpg" alt="bg" />
                    <div className='flex flex-col gap-[2rem] absolute z-[10] top-10 left-10 text-white font-bold'>
                        <p className='text-3xl'>Contact Information</p>
                        <p className='text-xl text-gray-500 font-thin'>Say something to start live chat</p>
                        <div className='mt-[8rem] flex items-center gap-[2rem]'>
                            <FontAwesomeIcon icon={faPhone} size='lg' />
                            <p>+91 7314245858</p>
                        </div>
                        <div className='flex items-center gap-[2rem]'>
                            <FontAwesomeIcon icon={faEnvelope} size='lg' />
                            <p>sales@waltzerindia.com</p>
                        </div>
                        <div className='flex items-center gap-[2rem]'>
                            <FontAwesomeIcon icon={faLocation} size='lg' />
                            <p>Main Gate, 1A-Balaji Market, Hawa Bangala Rd, near R.R. Cat, opp. Hari Dham Mandir, Indore, Madhya Pradesh 452009 | Tel : 07314245858 | Mob : +91 9522582422</p>
                        </div>
                    </div>
                </div>
                <div className='lg:w-3/5 bg-white pt-[4rem] pb-[3rem] flex flex-col px-[2rem] lg:pl-[5rem] lg:pr-[3rem] gap-[2rem]'>
                    <h1 className='text-5xl font-bold text-orange-500'>Contact Us</h1>
                    <p className='font-thin w-[20rem]'>Any question or remarks? Just write a message.</p>

                    {/* Conditional Message Display */}
                    {submissionMessage && (
                        <div className={`py-2 px-4 rounded-md text-center ${submissionMessage.includes('successfully') ? 'bg-white text-green-600' : 'bg-white text-red-500'}`}>
                            {submissionMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className='py-2 px-4 rounded-md text-center bg-white text-red-500'>
                            {errorMessage}
                        </div>
                    )}

                    <form className='text-gray-500 flex flex-col gap-[2rem]' onSubmit={handleSubmit}>
                        <div className='flex flex-col lg:flex-row lg:items-center gap-[2rem] lg:gap-[4rem]'>
                            <label className='flex flex-col' htmlFor="firstName">First Name
                                <input className='text-black border-b-2 pb-2 w-[15rem] outline-none' type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                            </label>
                            <label className='flex flex-col' htmlFor="lastName">Last Name
                                <input className='text-black border-b-2 pb-2 w-[15rem] outline-none' type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                            </label>
                        </div>
                        <div className='flex flex-col lg:flex-row lg:items-center gap-[4rem]'>
                            <label className='flex flex-col' htmlFor="email">Email
                                <input className='text-black border-b-2 pb-2 w-[15rem] outline-none' type="email" name="email" value={formData.email} onChange={handleChange} />
                            </label>
                            <label className='flex flex-col' htmlFor="phone">Phone Number
                                <input className='text-black border-b-2 pb-2 w-[15rem] outline-none' type="text" name="phone" pattern="[0-9]{10}"  title="Phone number must be 10 digits"
 value={formData.phone} onChange={handleChange} />
                            </label>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <p className='text-black font-bold'>Select Subject</p>
                            <div className='flex items-center gap-[1rem]'>
                                <label>
                                    <input type="radio" value="Return/Refund" name="subject" checked={formData.subject === 'Return/Refund'} onChange={handleChange} /> Return/Refund
                                </label>
                                <label>
                                    <input type="radio" value="Query" name="subject" checked={formData.subject === 'Query'} onChange={handleChange} /> Query
                                </label>
                                <label>
                                    <input type="radio" value="Complaint" name="subject" checked={formData.subject === 'Complaint'} onChange={handleChange} /> Complaint
                                </label>
                            </div>
                        </div>
                        <label className='flex flex-col' htmlFor="message">Message
                            <input className='text-black border-b-2 pb-2 w-[18rem] lg:w-[30rem] outline-none' type="text" name="message" value={formData.message} onChange={handleChange} />
                        </label>
                        <button type="submit" className='submit_button w-[20rem]' disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Return;


/* import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocation, faPhone } from '@fortawesome/free-solid-svg-icons';

function Return() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // New state for error message

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.subject || !formData.message) {
            setErrorMessage('All fields are required.'); // Set error message
            setSubmissionMessage(''); // Clear submission message
            return;
        }

        setErrorMessage(''); // Clear error message if validation passes

        try {
            const response = await fetch('http://localhost/waltzify_copy_fake/Backend/User/handleContactForm.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setSubmissionMessage('Form submitted successfully!'); // Set success message
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
            } else {
                setSubmissionMessage('Failed to submit the form. Please try again.'); // Set error message
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmissionMessage('An error occurred while submitting the form.'); // Set error message
        }
    };

    return (
        <div className='flex items-center justify-center py-[2.5rem] bg-[#F3F4F6]'>
            <div className='flex lg:w-full mx-[1rem] lg:mx-[3rem] overflow-hidden rounded-xl'>
                <div className='hidden lg:block relative w-2/5'>
                    <img className='w-full h-[90vh]' src="https://i.pinimg.com/564x/a6/66/b7/a666b7ec66d46d7985ac66527219ab62.jpg" alt="bg" />
                    <div className='flex flex-col gap-[2rem] absolute z-[10] top-10 left-10 text-white font-bold'>
                        <p className='text-3xl'>Contact Information</p>
                        <p className='text-xl text-gray-500 font-thin'>Say something to start live chat</p>
                        <div className='mt-[8rem] flex items-center gap-[2rem]'>
                            <FontAwesomeIcon icon={faPhone} size='lg' />
                            <p>+91 7314245858</p>
                        </div>
                        <div className='flex items-center gap-[2rem]'>
                            <FontAwesomeIcon icon={faEnvelope} size='lg' />
                            <p>sales@waltzerindia.com</p>
                        </div>
                        <div className='flex items-center gap-[2rem]'>
                            <FontAwesomeIcon icon={faLocation} size='lg' />
                            <p>Main Gate, 1A-Balaji Market, Hawa Bangala Rd, near R.R. Cat, opp. Hari Dham Mandir, Indore, Madhya Pradesh 452009 | Tel : 07314245858 | Mob : +91 9522582422</p>
                        </div>
                    </div>
                </div>
                <div className='lg:w-3/5 bg-white pt-[4rem] pb-[3rem] flex flex-col px-[2rem] lg:pl-[5rem] lg:pr-[3rem] gap-[2rem]'>
                    <h1 className='text-5xl font-bold text-orange-500'>Contact Us</h1>
                    <p className='font-thin w-[20rem]'>Any question or remarks? Just write a message.</p>


                    {submissionMessage && (
                        <div className={`py-2 px-4 rounded-md text-center ${submissionMessage.includes('successfully') ? 'bg-white text-green-600' : 'bg-white text-red-500'}`}>
                            {submissionMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className='py-2 px-4 rounded-md text-center bg-white text-red-500'>
                            {errorMessage}
                        </div>
                    )}

                    <form className='text-gray-500 flex flex-col gap-[2rem]' onSubmit={handleSubmit}>
                        <div className='flex flex-col lg:flex-row lg:items-center gap-[2rem] lg:gap-[4rem]'>
                            <label className='flex flex-col' htmlFor="firstName">First Name
                                <input className='text-black border-b-2 pb-2 w-[15rem] outline-none' type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                            </label>
                            <label className='flex flex-col' htmlFor="lastName">Last Name
                                <input className='text-black border-b-2 pb-2 w-[15rem] outline-none' type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                            </label>
                        </div>
                        <div className='flex flex-col lg:flex-row lg:items-center gap-[4rem]'>
                            <label className='flex flex-col' htmlFor="email">Email
                                <input className='text-black border-b-2 pb-2 w-[15rem] outline-none' type="email" name="email" value={formData.email} onChange={handleChange} />
                            </label>
                            <label className='flex flex-col' htmlFor="phone">Phone Number
                                <input className='text-black border-b-2 pb-2 w-[15rem] outline-none' type="text" name="phone" value={formData.phone} onChange={handleChange} />
                            </label>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <p className='text-black font-bold'>Select Subject</p>
                            <div className='flex items-center gap-[1rem]'>
                                <label>
                                    <input type="radio" value="Return/Refund" name="subject" checked={formData.subject === 'Return/Refund'} onChange={handleChange} /> Return/Refund
                                </label>
                                <label>
                                    <input type="radio" value="Query" name="subject" checked={formData.subject === 'Query'} onChange={handleChange} /> Query
                                </label>
                                <label>
                                    <input type="radio" value="Complaint" name="subject" checked={formData.subject === 'Complaint'} onChange={handleChange} /> Complaint
                                </label>
                            </div>
                        </div>
                        <label className='flex flex-col' htmlFor="message">Message
                            <input className='text-black border-b-2 pb-2 w-[18rem] lg:w-[30rem] outline-none' type="text" name="message" value={formData.message} onChange={handleChange} />
                        </label>
                        <button type="submit" className='submit_button w-[20rem]'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Return; */

