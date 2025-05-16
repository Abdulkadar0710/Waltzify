import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCloud } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';

function UpdateProduct() {
  const { id } = useParams();
  const [images, setImages] = useState([null, null, null, null,null,null,null,null]);
  const [sku,setSku] = useState('');
  const [pname, setPname] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [color ,setColor] = useState('');
  const [youtubeLink,setYoutubeLink] = useState('');
  const [igstn,setIgstn] = useState('');
  const [weight ,setWeight] = useState('');
  const [length,setLength] = useState('');
  const [height,setHeight] = useState('');
  const [size,setSize]    = useState('');
  const [HSN,setHSN]      = useState('');
  const [keyFeatures,setKeyFeatures] = useState('');
  const [breadth,setBreadth]   = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [categories,setCategories] = useState([]); 
  const [productData, setProductData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost/waltzify_copy_fake/Backend/Fetch_category.php')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleInputChange = (e, setter) => {
    setError('');
    setter(e.target.value);
  };
  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      // Update selected images
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
  
      // Update image previews
      const newImagePreviews = [...imagePreview];
      newImagePreviews[index] = URL.createObjectURL(file);
      setImagePreview(newImagePreviews);
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pname || sku || category || brand || images.every(img => img !== null) || weight || length || breadth || height || description || price || discount || quantity || size || youtubeLink || igstn || HSN || keyFeatures) {
      try {
        const formData = new FormData();
        formData.append("pname", pname);
        formData.append("sku",sku);
        formData.append("category", category);
        formData.append("brand", brand);
        formData.append("youtubeLink", youtubeLink);
        formData.append("igstn", igstn);
        formData.append("weight" ,weight);
        formData.append("length",length);
        formData.append("breadth",breadth);
        formData.append("height",height);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("discount",discount);
        formData.append("quantity", quantity);
        formData.append("size",size);
        formData.append("HSN",HSN);
        formData.append("keyFeatures",keyFeatures);
        images.forEach((img, index) => {
          formData.append(`img${index + 1}`, img);
        });
  

        const response = await fetch(`http://localhost/waltzify_copy_fake/Backend/Update_Products.php?id=${id}`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok ${response.statusText}`);
        }

        const data = await response.json();
        if (data.result === 'Product Record Updated Successfully!') {
          setMsg('Product Updated successfully!');
          setTimeout(() => navigate('/productlist'), 2000);
        } else {
          setError(data.result);
        }
      } catch (err) {
        setError('Error: ' + err.message);
      }
    } else {
      setError('At least one field is required!');
    }
  };

 


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
  
        setProductData(data);
        setPname(data.pname);
        setSku(data.SKU);
        setBrand(data.brand);
        setCategory(data.category);
        setYoutubeLink(data.youtubeLink);
        setIgstn(data.igstn);
        setWeight(data.weight);
        setLength(data.length);
        setBreadth(data.breadth);
        setHeight(data.height);
        setColor(data.color);
        setDescription(data.description);
        setSize(data.size);
        setHSN(data.HSN);
        setKeyFeatures(data.keyFeatures);
        setPrice(data.p_price);
        setDiscount(data.discount);
        setQuantity(data.pQuantity);
  
        // Initialize image previews
        setImagePreview([
          data.img1 ? `http://localhost/waltzify_copy_fake/Backend/Products/${data.img1}` : null,
          data.img2 ? `http://localhost/waltzify_copy_fake/Backend/Products/${data.img2}` : null,
          data.img3 ? `http://localhost/waltzify_copy_fake/Backend/Products/${data.img3}` : null,
          data.img4 ? `http://localhost/waltzify_copy_fake/Backend/Products/${data.img4}` : null,
          data.img5 ? `http://localhost/waltzify_copy_fake/Backend/Products/${data.img5}` : null,
          data.img6 ? `http://localhost/waltzify_copy_fake/Backend/Products/${data.img6}` : null,
          data.img7 ? `http://localhost/waltzify_copy_fake/Backend/Products/${data.img7}` : null,
          data.img8 ? `http://localhost/waltzify_copy_fake/Backend/Products/${data.img8}` : null,
        ]);
      })
      .catch(error => {
        setError(error.message);
      });
  }, [id]);
  





  

  return (
    <div className='bg-[#F2F6F9] py-[2rem]'>
      <div className='flex lg:flex-row flex-col justify-between lg:items-center lg:px-[4rem] px-[1rem]'>
        <p className='text-xl lg:text-3xl font-bold'>Update Product</p>
        <p className='text-gray-600'>
          Dashboard <FontAwesomeIcon icon={faArrowRight} /> Ecommerce <FontAwesomeIcon icon={faArrowRight} />{' '}
          <span className='font-light text-gray-500'>Update Product</span>
        </p>
      </div>
      {productData && (
      <div className='flex lg:flex-row flex-col gap-[2rem] px-[2rem]'>
        <div className='bg-white rounded-xl shadow-xl my-[3rem] p-[2rem] lg:w-1/2'>
          <p>
            {msg ? <span className="success">{msg}</span> : <span className="error">{error}</span>}
          </p>
          <form onSubmit={handleSubmit} className='flex flex-col gap-[1rem]' autoComplete='off'>
            <p className='text-gray-600'>Note:- If You Want to Add Multiple Variants of Particular Product,You Must Have To Enter Same Product Name.</p>
            <label className='font-bold' htmlFor='name'>
              Product Name
            </label>
            <input className='rounded-xl p-1 focus:outline-none border-2' type='text' value={pname}
              onChange={(e) => handleInputChange(e, setPname)}  />
            <p className='font-thin text-sm'>Do not exceed 20 characters when entering the product name.</p>
            <label className='font-bold' htmlFor='name'>
              SKU
            </label>
            <input className='rounded-xl p-1 focus:outline-none border-2' type='text' value={sku}
              onChange={(e) => handleInputChange(e, setSku)} />
            <div className='flex lg:flex-row flex-col gap-[2rem]'>
              <div className='flex flex-col gap-[1rem]'>
                <label className='font-bold' htmlFor='category'>
                  Category
                </label>
                <select
                  className='rounded-xl p-1 focus:outline-none border-2'
                  value={category}
                  onChange={(e) => handleInputChange(e, setCategory)}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat.cname}>{cat.cname}</option>
                  ))}
                </select>
              </div>
            </div>
            <label className='font-bold' htmlFor='brand'>
              Brand
            </label>
            <input className='rounded-xl p-1 focus:outline-none border-2' type='text' value={brand}
              onChange={(e) => handleInputChange(e, setBrand)} name='brand' />
            <label className='font-bold' htmlFor='brand'>
              Color
            </label>
            <input className='rounded-xl p-1 focus:outline-none border-2' type='text' value={color}
              onChange={(e) => handleInputChange(e, setColor)} />
            <label className='font-bold' htmlFor='description'>
              Description
            </label>
            <textarea
              className='h-[20rem] rounded-xl p-1 focus:outline-none border-2'
              name='desc'
              
              value={description}
              
              onChange={(e) => handleInputChange(e, setDescription)}
            ></textarea>
            <label className='font-bold' htmlFor='price'>
              Price 
            </label>
            <input className='w-[19rem] rounded-xl p-1 focus:outline-none border-2' type='text' value={price}
              onChange={(e) => handleInputChange(e, setPrice)} />
            <label className='font-bold' htmlFor='discount'>
              Discount( Percentage %)
            </label>
            <input className='w-[19rem] rounded-xl p-1 focus:outline-none border-2' type='number' min={0} value={discount}
              onChange={(e) => handleInputChange(e, setDiscount)} />
            <label className='font-bold' htmlFor='quantity'>
              Quantity 
            </label>
            <input className='w-[19rem] rounded-xl p-1 focus:outline-none border-2' type='number' min={0} value={quantity}
              onChange={(e) => handleInputChange(e, setQuantity)} />
          
            <div className='p-[1rem] flex lg:flex-row flex-col gap-[2rem]'>
              <button type='submit' className='py-[1rem] px-[2rem] text-white lg:text-lg rounded-xl font-bold bg-blue-500'>Update Product</button>
            </div>
            </form>
        </div>
        <div className='bg-white rounded-xl shadow-xl my-[3rem] p-[2rem] lg:w-1/2'>
          <p className='font-bold text-lg mb-5'>Upload Images (Min Dimensions 300 x 300 & Max Dimensions 700 * 700)<span className='text-red-500'> *</span></p>
          <div className='flex flex-wrap gap-[1rem]'>
  {Array.from({ length: 8 }).map((_, index) => (
    <div key={index} className="w-[100px] h-[100px] border border-gray-300 rounded-lg overflow-hidden relative">
      {/* Display preview */}
      {imagePreview && imagePreview[index] ? (
        <img
          src={imagePreview[index]}
          alt={`Preview ${index + 1}`}
          className="w-full h-full object-cover"
        />
      ) : (
        <p className="text-center text-gray-500 text-sm">No Image</p>
      )}
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={(e) => handleImageChange(index, e)}
      />
    </div>
  ))}
</div>

         
          {/* <div className='flex flex-wrap gap-[1rem]'>
            {images.map((image, index) => (
              <div key={index} className='relative flex flex-col items-center border-2 border-dotted rounded-xl border-blue-500'>
                <input
                  type='file'
                  className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                  onChange={(e) => handleImageChange(index, e)}
                />
                {image ? (
                  <img className='w-[10rem] h-[15rem] object-cover rounded-xl' src={URL.createObjectURL(image)} alt={`Upload ${index + 1}`} />
                ) : (
                  <div className='w-[8rem] h-[10rem] text-center flex flex-col items-center justify-center text-gray-400'>
                    <FontAwesomeIcon icon={faCloud} size='3x' />
                    <p>Upload Image {index + 1}</p>
                  </div>
                )}
              </div>
              
            ))}
             <div className='flex flex-col w-[100%] gap-[1rem] mt-[2rem]'>
             <label className='font-bold' htmlFor='hsn'>
             HSN
            </label>
            <input className='w-[40vw] rounded-xl p-1 focus:outline-none border-2' type='text' value={HSN}
              onChange={(e) => handleInputChange(e, setHSN)}  />
            <label className='font-bold' htmlFor='keyfeatures'>
              Key Features
            </label>
            <textarea
              className='h-[20rem] rounded-xl p-1 focus:outline-none border-2'
              name='keyFeatures'              
              value={keyFeatures}              
              onChange={(e) => handleInputChange(e, setKeyFeatures)}
            ></textarea>
            
            
            <label className='font-bold' htmlFor='length'>
              Length (In cm)
            </label>
            <input className='w-[40vw] rounded-xl p-1 focus:outline-none border-2' type='text' value={length}
              onChange={(e) => handleInputChange(e, setLength)}  />
            <label className='font-bold' htmlFor='length'>
              Breadth (In cm)
            </label>
            <input className='w-[40vw] rounded-xl p-1 focus:outline-none border-2' type='text' value={breadth}onChange={(e) => handleInputChange(e, setBreadth)} />
            <label className='font-bold' htmlFor='height'>
              Height (In cm)
            </label>
            <input className='w-[40vw] rounded-xl p-1 focus:outline-none border-2' type='text' value={height}onChange={(e) => handleInputChange(e, setHeight)}/>
            <label className='font-bold' htmlFor='Weight'>
              Weight (In Kg)
            </label>
            <input className='w-[40vw] rounded-xl p-1 focus:outline-none border-2' type='text' value={weight}
              onChange={(e) => handleInputChange(e, setWeight)}/>
            <label className='font-bold' htmlFor='height'>
              Size
            </label>
            <input className='w-[40vw] rounded-xl p-1 focus:outline-none border-2' type='text' value={size} onChange={(e) => handleInputChange(e, setSize)} />
            <label className='font-bold' htmlFor='youtubeLink'>
              Youtube Embed Link
            </label>
            <input className='w-[40vw] rounded-xl p-1 focus:outline-none border-2' type='text' value={youtubeLink}
              onChange={(e) => handleInputChange(e, setYoutubeLink)}/>
           <label className='font-bold' htmlFor='GST'>
              GST (%)
            </label>
            <input className='w-[40vw] rounded-xl p-1 focus:outline-none border-2' type='number' value={igstn}
              onChange={(e) => handleInputChange(e, setIgstn)}/>
            </div> 
          </div> */}
          
        </div>
      </div>
      )}
    </div>
   
  );
}

export default UpdateProduct;  

