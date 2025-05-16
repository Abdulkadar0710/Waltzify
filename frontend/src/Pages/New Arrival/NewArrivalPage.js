import React, { useState, useEffect } from 'react';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Link } from 'react-router-dom';
import './NewArrivalPage.css';

function NewArrivalPage() {
  const [banners, setBanners] = useState([]);
  const [defaultbanner,setDefaultBanner] = useState([]);
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [rightProducts,setRightProducts] = useState([]);

  const [imageFitClasses, setImageFitClasses] = useState([]);

  useEffect(() => {
    const handleImageLoad = (img, index) => {
      const { naturalWidth, naturalHeight } = img;
      if (naturalWidth > 1000 || naturalHeight > 1000) {
        setImageFitClasses(prev => {
          const newClasses = [...prev];
          newClasses[index] = 'object-contain';
          return newClasses;
        });
      } else {
        setImageFitClasses(prev => {
          const newClasses = [...prev];
          newClasses[index] = 'object-cover';
          return newClasses;
        });
      }
    };

    collections.forEach((_, index) => {
      const img = new Image();
      img.src = `http://localhost/waltzify_copy_fake/Backend/Collection/${collections[index].images1}`;
      img.onload = () => handleImageLoad(img, index);
    });
  }, [collections]);


  useEffect(() => {
    fetch('http://localhost/waltzify_copy_fake/Backend/fetch_newArrivalBanner.php')
      .then(response => response.json())
      .then(data => setBanners(data))
      .catch(error => console.error('Error fetching banners:', error));
  }, []);
  useEffect(() => {
    fetch('http://localhost/waltzify_copy_fake/Backend/fetch_default_banner_new.php')
      .then(response => response.json())
      .then(data => setDefaultBanner(data))
      .catch(error => console.error('Error fetching banners:', error));
      
  }, []);

  useEffect(() => {
    fetch('http://localhost/waltzify_copy_fake/Backend/fetch_temple_products.php')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);
  useEffect(() => {
    fetch('http://localhost/waltzify_copy_fake/Backend/fetch_new_right.php')
      .then(response => response.json())
      .then(data => setRightProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost/waltzify_copy_fake/Backend/Fetch_New_Collection.php')
      .then(response => response.json())
      .then(data => setCollections(data))
      .catch(error => console.error('Error fetching collections:', error));
  }, []);

  return (
    <div className='overflow-hidden lg:mt-[0vw] mt-[30vw]'>
      {/* Hero */}
      {banners.length > 0 ? (
        banners.map((banner, index) => (
          <div key={index} className = "mt-[1rem] lg:mt-[9rem] relative w-full h-[16rem] max-md:h-[10rem] lg:h-[28rem]" >
          <img className='Newarrivalbanner w-[100%] object-cover absolute h-[100%]' src={`http://localhost/waltzify_copy_fake/Backend/NewArrivalBanner/${banner.image}`} alt="" />
        </div>
        ))
      ) : (
        defaultbanner
      .filter((defaultbanner) => defaultbanner.location === "New Arrival")
      .map((defaultbanner, index) => (
        <div key={index}  className=" mt-[1rem] lg:mt-[9rem] relative w-full h-[16rem] max-md:h-[10rem] lg:h-[25rem]" >
          <img
            className="Newarrivalbanner"
            src={`http://localhost/waltzify_copy_fake/Backend/DefaultBannerNew/${defaultbanner.image}`}
            alt="default banner"
          />
        </div>
          ))
      )}
      {/* Content */}
      <div className='lg:px-[4rem] px-[1rem]'>
        {/* Top */}
        <div className='py-[3rem] flex flex-col lg:flex-row gap-[2rem] justify-between justify-start items-left'>
          <button className='rounded-lg text-3xl bg-red-500 text-white py-2 px-[2rem] place-items-left'>Latest Collections</button>
        </div>
        {/* Bottom */}
        <div className='py-[2rem] flex flex-col lg:flex-row gap-[1rem] lg:gap-[4rem] place-items-center'>
          {/* Left */}
          <div className='lg:w-2/3'>
      <div className='grid grid-cols-2 gap-2 lg:gap-4'>
        {collections.map((collection, index) => (
          <Link to={`/category/${collection.collectionName}`} key={index}>
            <img
              className={`obj-cont w-full h-[15rem] lg:h-[20rem] rounded ${imageFitClasses[index] || 'object-contain'}`}
              src={`http://localhost/waltzify_copy_fake/Backend/Collection/${collection.images1}`}
              alt={`Collection ${index + 1}`}
            />
          </Link>
        ))}
      </div>
    </div>
          {/* Right */}
          <div className='lg:w-1/4 flex flex-col gap-[1rem]'>
            {/* Products */}
            {rightProducts.map((product, index) => (
              <Link
                key={index}
                to={{
                  pathname: `/WI/${product.Id}`,
                  state: { product: product }
                }}
              >
                <div className='shadow-xl rounded-xl px-[1rem] py-2 flex flex-col'>
                <div className='flex justify-between items-center'>
                                        {product.discount > 0 ? (
                                            <p className='text-xs bg-orange-500 text-white p-2 rounded-xl'>
                                                Save {product.discount}%
                                            </p>
                                        ) : (
                                            <p className='text-xs bg-orange-500 text-white p-2 rounded-xl'>
                                                Best Price
                                            </p>
                                        )}
                                      {/*   <FontAwesomeIcon className='group-hover:block hidden' icon={faHeart} /> */}
                                    
                                    </div>
                  <img className='w-full lg:h-[12rem] object-contain' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`} alt={product.pname} />
                  <p className='mt-[1rem] font-bold text-xs'>{product.pname}</p>
                 {/*  <p className='font-bold text-xl'>₹{((product.p_price - (product.p_price * (product.discount / 100))) * (1 + product.igstn / 100)).toFixed(2)}</p> */}
                 <p className='font-bold text-xl'>₹{Number(product.p_price - (product.p_price * (product.discount / 100))).toFixed(2)}
                 {product.discount > 0 && (
    <span className="text-gray-500 text-sm line-through ml-[0.5rem]">
      ₹{Number(product.p_price).toFixed(2)}
    </span>
  )}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Products */}
        <div className='py-[2rem]'>
          <h1 className='text-4xl font-bold pb-[2rem]'>Latest Products</h1>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-[2rem] lg:px-[3rem] place-items-center'>
            {products.map((product, index) => (
              <Link
                key={index}
                to={{
                  pathname: `/WI/${product.Id}`,
                  state: { product: product }
                }}
              >
                <div key={index} className='shadow-xl hover:border-orange-500 group p-1 lg:p-[1rem] border-2 rounded-xl cursor-pointer  latest-card'>
                <div className='flex justify-between items-center '>
                                        {product.discount > 0 ? (
                                            <p className='text-xs bg-orange-500 text-white p-2 rounded-xl'>
                                                Save {product.discount}%
                                            </p>
                                        ) : (
                                            <p className='text-xs bg-orange-500 text-white p-2 rounded-xl'>
                                                Best Price
                                            </p>
                                        )}
                                      {/*   <FontAwesomeIcon className='group-hover:block hidden' icon={faHeart} /> */}
                                    
                                    </div>
                <div className='flex justify-center items-center'>
                <img className='lg:w-[16rem] w-[8rem] h-[6rem] lg:h-[10rem] rounded-xl object-contain' src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`} alt={product.pname} />
                </div>
                  <div className='text-yellow-500 text-xl'>
                  {[...Array(5)].map((_, i) => (
                      i < product.average_rating ? <StarOutlinedIcon fontSize='inherit' key={i} /> : <StarBorderOutlinedIcon fontSize='inherit' key={i} />
                  ))}
                            
                  </div>
                  <p className='mt-[1rem] font-bold text-xs lg:text-sm'>{product.pname.length > 45 ? `${product.pname.slice(0, 45)}...` : product.pname}</p>
                  <p className='font-bold text-sm lg:text-xl'>₹{Number(product.p_price - (product.p_price * (product.discount / 100))).toFixed(2)}
                  {product.discount > 0 && (
    <span className="text-gray-500 text-sm line-through ml-[0.5rem]">
        ₹{Number( product.p_price).toFixed(2)}
    </span>
  )}
                  </p>
               {/*    <p className='font-bold text-sm lg:text-sm'>₹{((product.p_price - (product.p_price * (product.discount / 100))) * (1 + product.igstn / 100)).toFixed(2)}</p> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewArrivalPage;










































































