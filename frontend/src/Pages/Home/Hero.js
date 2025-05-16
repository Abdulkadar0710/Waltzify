import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './style.css';

function Hero() {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [defaultbanner, setDefaultBanner] = useState([]);

  // useEffect(() => {
  //   fetch('http://localhost/waltzify_copy_fake/Backend/Fetch_category.php')
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log("Fetched Data:", data); // ✅ Debugging log
  //       if (Array.isArray(data)) {
  //         setProducts(data);
  //       } else {
  //         console.error("API did not return an array:", data);
  //         setProducts([]); // Prevent errors
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error fetching products:', error);
  //       setProducts([]); // Prevents `.map()` from failing
  //     });
  // }, []);

  useEffect(() => {
    fetch('http://localhost/waltzify_copy_fake/Backend/fetch_banner.php')
      .then(response => response.json())
      .then(data => setBanners(data))
      .catch(error => console.error('Error fetching banners:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost/waltzify_copy_fake/Backend/fetch_default_banner.php')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setDefaultBanner(data);
        } else {
          console.error('Error: Expected an array but received:', data);
          setDefaultBanner([]);
        }
      })
      .catch(error => {
        console.error('Error fetching default banners:', error);
        setDefaultBanner([]);
      });
  }, []);

  return (
    <div className="banner relative max-sm:h-[25rem] max-md:mt-[33vw] max-md:h-[30rem] h-[30rem] lg:h-[70rem] overflow-hidden">
      <div className="lg:h-[40rem] h-[16rem]">
        {banners.length > 0 ? (
          banners.map((banner, index) => (
            <div key={banner.id || index} className="relative w-full h-[16rem] lg:h-[40rem]">
              <img
                className="absolute lg:mt-[8rem] object-fill w-[100%] h-[100%] lg:h-full"
                src={`http://localhost/waltzify_copy_fake/Backend/Banner/${banner.image}`}
                alt={banner.text}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                {banner.text && (
                  <a href="/allproduct" className="bg-black bg-opacity-50 p-4 rounded">
                    <h2 className="text-xl lg:text-3xl font-bold">{banner.text}</h2>
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          defaultbanner
            .filter((defaultbanner) => defaultbanner.location === 'Home Page')
            .map((defaultbanner, index) => (
              <div key={defaultbanner.id || index} className="relative w-full h-[16rem] lg:h-[40rem]">
                <img
                  className="absolute lg:mt-[8rem] object-fill w-[100%] h-[100%] lg:h-full"
                  src={`http://localhost/waltzify_copy_fake/Backend/DefaultBanner/${defaultbanner.image}`}
                  alt="default banner"
                />
              </div>
            ))
        )}
      </div>

      <div className="absolute max-sm:top-[7rem] max-md:top-[9rem] lg:mt-[0rem] mt-[5rem] top-[13rem] lg:mt-[0] mt-[12rem] lg:top-[38rem] px-[1rem] w-full">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            375: {
              slidesPerView: 3,
              spaceBetween: 20
            },
            480: {
              slidesPerView: 4,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 30
            },
            1028: {
              slidesPerView: 5,
              spaceBetween: 20
            },
          }}
          className="mySwiper relative"
        >
          {products.map((product, index) => (
            <SwiperSlide key={index} >
              <div className="no-scrollbar hover:scale-[1.02] transition-all ease-in-out duration-[500ms] rounded-xl group relative w-[7rem] lg:w-[18rem] bg-white">
                <Link to={`/category/${product.cname}`}>
                  <div className="relative">
                    <img
                      className="group-hover:scale-105 shadow-2xl rounded-xl transition-all ease-in-out duration-[500ms] w-full lg:h-[28rem] h-[10rem] object-cover"
                      src={`http://localhost/waltzify_copy_fake/Backend/Category/${product.image}`}
                      alt=""
                    />
                    <p
                      className="text-white transition-all ease-in-out absolute top-[6vw] lg:top-[5vw] left-[20%] bottom-[0%] text-xs lg:text-2xl font-bold -rotate-90 overflow-hidden break-words"
                      style={{
                        width: '100%',
                        maxWidth: '100%',
                        whiteSpace: 'normal',
                        lineHeight: '1.2',
                      }}
                    >
                      {product.cname}
                      {console.log("product.cname-" + product.cname , "product.image-"+ product.image)}
                    </p>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev-custom absolute left-0 max-md:top-1/2 top-[12%] transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="swiper-button-next-custom absolute right-0 max-md:top-1/2 top-[12%] transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default Hero;