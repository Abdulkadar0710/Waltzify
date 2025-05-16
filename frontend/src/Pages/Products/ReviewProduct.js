import React, { useState, useContext, useEffect } from 'react'; 
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { UserContext } from '../../Context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';

function ReviewProduct() {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [rating, setRating] = useState(0);
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost/waltzify_copy_fake/Backend/Fetch_Products.php?id=${id}`)
            .then(response => response.json()) 
            .then(data => setProduct(data))
            .catch(error => setError(error.message));
    }, [id]);

    const handleRating = (index) => {
        setRating(index + 1);
    };

    const iconStyle = { fontSize: '3rem', color: 'gold' };

    const [headline, setHeadline] = useState('');
    const [images, setImages] = useState([]);
    const [review, setReview] = useState('');

    const handleInputChange = (e, setter) => {
        setError('');
        setter(e.target.value);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (images.length + files.length > 4) {
            setError('You can upload a maximum of 4 photos.');
            return;
        }

        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setImages(prev => [...prev, ...newImages]);
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate only the required fields
        if (!rating || !headline || !review) {
            setError('Rating, headline, and written review are required!');
            return;
        }
    
        if (!user || !id) {
            setError('User ID or Product ID is missing');
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('rating', rating);
            formData.append('headline', headline);
            formData.append('review', review);
    
            // Add images to formData only if they are provided
            if (images.length > 0) {
                images.forEach(image => formData.append('images[]', image.file));
            }
    
            const response = await fetch(`http://localhost/waltzify_copy_fake/Backend/add_user_review.php?user_id=${user.Id}&id=${id}`, {
                method: 'POST',
                body: formData,
            });

            
            const data = await response.text();
            console.log("responseData: ",data);
    
            if (data.result === 'Review Added Successfully!') {
                setMsg('Review added successfully!');
                setError('');
                setTimeout(() => navigate(`/WI/${id}`), 2000);
            } else {
                setError(data.result || 'Unknown error occurred.');
            }
        } catch (err) {
            setError('Errors: ' + err.message);
        }
    };
    

    return (
        <div className='py-[3rem] lg:mt-[8rem] mt-[8rem] px-[1rem] lg:px-[9rem]'>
            <p className='text-3xl font-bold'>Please share your valuable review with us</p>
            {msg && <p className='text-green-500'>{msg}</p>}
            {error && <p className='text-red-500'>{error}</p>}
            <form>
                {product && (
                    <div className='mt-[1rem] flex items-center border-b-2 py-1 px-[2rem]'>
                        <img className='w-[8rem] h-[8rem]' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`} alt={product.pname} />
                        <p className='text-lg'>{product.pname}</p>
                    </div>
                )}
                <div className='my-[1rem] flex flex-col py-1 px-[2rem] border-b-2'>
                    <p className='text-2xl font-bold'>Overall Rating</p>
                    <div className='flex my-2 '>
                        {[...Array(5)].map((_, index) => (
                            <div key={index} onClick={() => handleRating(index)}>
                                {index < rating ? <StarOutlinedIcon style={iconStyle} /> : <StarBorderOutlinedIcon style={iconStyle} />}
                            </div>
                    ))}
                    </div>
                </div>
                <div className='mt-[1rem] flex flex-col py-1 px-[2rem] gap-[1rem] border-b-2'>
                    <p className='text-2xl font-bold'>Add a headline</p>
                    <input
                        className='text-lg mb-[1rem] py-1 border-2 outline-none px-2'
                        type="text"
                        placeholder="What's most important to know?"
                        value={headline}
                        onChange={(e) => handleInputChange(e, setHeadline)}
                    />
                </div>
                <div className='mt-[1rem] flex flex-col py-1 px-[2rem] gap-[1rem] border-b-2'>
                    <p className='text-2xl font-bold'>Add Photos (Max 4)</p>
                    <input type="file" multiple onChange={handleImageChange} />
                    <div className='flex gap-4 mt-4'>
                        {images.map((img, index) => (
                            <div key={index} className='relative'>
                                <img src={img.preview} alt="Preview" className='w-[6rem] h-[6rem] object-cover rounded-lg' />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1'
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mt-[1rem] flex flex-col py-1 px-[2rem] gap-[1rem] border-b-2'>
                    <p className='text-2xl font-bold'>Add a Written Review</p>
                    <textarea
                        className='text-lg h-[8rem] mb-[1rem] py-1 border-2 outline-none px-2'
                        placeholder='Write your comments about the product'
                        value={review}
                        onChange={(e) => handleInputChange(e, setReview)}
                    ></textarea>
                </div>
                <div className='flex justify-end px-[2rem]'>
                    <button
                        className='text-xl mt-[1rem] border-2 py-1 px-3 text-white bg-orange-500 border-orange-500 rounded-lg'
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ReviewProduct;

/* import React, { useState, useContext, useEffect } from 'react';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { UserContext } from '../../Context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';

function ReviewProduct() {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [rating, setRating] = useState(0);
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost/waltzify_copy_fake/Backend/Fetch_Products.php?id=${id}`)
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
                setProduct(data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, [id]);

    const handleRating = (index) => {
        setRating(index + 1);
    };

    const iconStyle = {
        fontSize: '3rem', 
        color: 'gold'
    };

    const [headline, setHeadline] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [review, setReview] = useState('');

    const handleInputChange = (e, setter) => {
        setError('');
        setter(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating && image && headline && review) {
            if (!user || !id) {
                setError('UserID or Product ID is missing');
                return;
            }

            try {
                const formData = new FormData();
                formData.append('rating', rating);
                formData.append('image', image);
                formData.append('headline', headline);
                formData.append('review', review);

                const response = await fetch(`http://localhost/waltzify_copy_fake/Backend/User/add_user_review.php?user_id=${user.Id}&id=${id}`, {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                if (data.result === 'Review Added Successfully!') {
                    setMsg('Review added successfully!');
                    setTimeout(() =>  navigate(`/WI/${id}`), 2000);
                } 
                else if(data.result === 'You have already submitted a review for this product.'){
                    setMsg('You have already submitted a review for this product.');
                    setTimeout(() =>  navigate(`/WI/${id}`), 2000);


                }
                    
                else {
                    setError(data.result);
                }
            } catch (err) {
                setError('Error: ' + err.message);
            }
        } else {
            setError('All fields are required!');
        }
    };

    return (
        <div className='py-[3rem] lg:mt-[8rem] mt-[8rem] px-[1rem] lg:px-[9rem]'>
            <p className='text-3xl font-bold'>Please share your valuable review with us</p>
            {msg && <p className='text-green-500'>{msg}</p>}
            {error && <p className='text-red-500'>{error}</p>}
            <form>
                {product && (
                    <div className='mt-[1rem] flex items-center border-b-2 py-1 px-[2rem]'>
                        <img className='w-[8rem] h-[8rem]' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`} alt={product.pname} />
                        <p className='text-lg'>{product.pname}</p>
                    </div>
                )}
                <div className='my-[1rem] flex flex-col py-1 px-[2rem] border-b-2'>
                    <p className='text-2xl font-bold'>Overall Rating</p>
                    <div className='flex my-2 '>
                        {[...Array(5)].map((_, index) => (
                            <div key={index} onClick={() => handleRating(index)}>
                                {index < rating ? <StarOutlinedIcon style={iconStyle} /> : <StarBorderOutlinedIcon style={iconStyle} />}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mt-[1rem] flex flex-col py-1 px-[2rem] gap-[1rem] border-b-2'>
                    <p className='text-2xl font-bold'>Add a headline</p>
                    <input className='text-lg mb-[1rem] py-1 border-2 outline-none px-2' type="text" placeholder="what's most important to know" value={headline}
                        onChange={(e) => handleInputChange(e, setHeadline)} />
                </div>
                <div className='mt-[1rem] flex flex-col py-1 px-[2rem] gap-[1rem] border-b-2'>
                    <p className='text-2xl font-bold'>Add a Photo</p>
                    <div className='relative border-dotted border-2 border-black w-[6rem] h-[6rem] mb-[1rem]'>
                        <input className=' w-[6rem] h-[6rem] opacity-0' type="file" onChange={handleImageChange} />
                        <p className='absolute top-[1.2rem] left-[1.8rem] text-5xl'>+</p>
                        {!imagePreview && (
                            <div className='flex flex-col items-center'></div>
                        )}
                        {imagePreview && (
                            <img src={imagePreview} alt='Preview' className='absolute inset-0 object-cover w-full h-full' />
                        )}
                    </div>
                </div>
                <div className='mt-[1rem] flex flex-col py-1 px-[2rem] gap-[1rem] border-b-2'>
                    <p className='text-2xl font-bold'>Add a Written Review</p>
                    <textarea className='text-lg h-[8rem] mb-[1rem] py-1 border-2 outline-none px-2' name="review" placeholder='Write your comments about the product' value={review} onChange={(e) => handleInputChange(e, setReview)}></textarea>
                </div>
                <div className='flex justify-end px-[2rem]'>
                    <button className='text-xl mt-[1rem] border-2 py-1 px-3 text-white bg-orange-500 border-orange-500 rounded-lg' onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default ReviewProduct;

 */