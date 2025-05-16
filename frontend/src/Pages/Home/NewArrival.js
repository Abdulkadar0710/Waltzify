import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const coordinates = [
  { left: "68.54%", top: "1.32%", right: "96.25%", bottom: "20.59%", href: "/headphone" },
  { left: "18.13%", top: "1.62%", right: "45.83%", bottom: "11.47%", href: "/footwears" },
  { left: "2.50%", top: "10.00%", right: "24.58%", bottom: "39.12%", href: "/product/10" },
  { left: "4.17%", top: "35.74%", right: "36.88%", bottom: "55.44%", href: "/product/10" },
  { left: "7.92%", top: "65.29%", right: "33.13%", bottom: "87.65%", href: "/product/10" },
  { left: "40.00%", top: "74.12%", right: "58.13%", bottom: "82.94%", href: "/product/10" },
  { left: "59.79%", top: "72.50%", right: "95.83%", bottom: "88.38%", href: "/mobile" },
  { left: "69.58%", top: "45.44%", right: "96.25%", bottom: "61.18%", href: "/product/10" }
];

function Newarrival() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost/waltzify_copy_fake/Backend/fetch_temple_products.php')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className='overflow-hidden py-2'>
      <Link to={`/allproduct`}>
        <div className='ml-[1rem] md:ml-[3rem]'>
          <h1 className='text-3xl md:text-5xl rs'>New Arrivals</h1>
        </div>
        {/* edit */}
        <div className='m-5 p-6 flex flex-col md:flex-row gap-[1rem] md:gap-[2rem] bg-gray-800 rounded-xl text-white'>
        {/* edit */}
          <div className='relative'>
            {products[0] && (
              <Link to={`/category/${products[0].category}`}>
                {/* edit */}
                <img 
                  className='w-[35rem] h-[22rem] md:h-[32rem] object-cover aspect-auto object-bottom' 
                  src={`http://localhost/waltzify_copy_fake/Backend/Products/${products[0].img1}`} 
                  alt={products[0].pname}
                  />
                  {/* edit */}
                <p className='text-center w-full top-[90%] text-white text-xl font-bold'>
                      {products[0].category}
                    </p>
              </Link>
              
            )}
            {coordinates.map((coordinate, index) => (
              <a
                key={index}
                href={coordinate.href}
                className='absolute w-4 h-4 rounded-full cursor-pointer hover:w-6 hover:h-6'
                style={{ top: coordinate.top, left: coordinate.left}}
                title={`Shoe ${index + 1}`}
              ></a>
            ))}
          </div>
          
          <div className='flex flex-col gap-10'>
            <div className='grid grid-cols-2 gap-2'>
              {products.slice(1, 5).map((product, index) => (
                <Link key={index} to={`/category/${product.category}`}>
                  <div className='relative'>
                    {/* edit */}
                    <figure className='img-effect-figure w-[100%] h-full bg-white'>
                    <img 
                      className='img-effect w-[14rem] h-[10rem] md:w-[28rem] md:h-[15rem] cursor-pointer object-contain aspect-auto' 
                      src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`} 
                      alt={product.pname}
                      />
                    </figure>
                      {/* edit */}
                    <p className='text-center lg:w-full top-[90%] text-white text-xl font-bold'>
                      {product.category}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Newarrival;






 
