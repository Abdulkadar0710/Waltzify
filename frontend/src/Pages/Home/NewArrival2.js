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
    <div className='overflow-hidden'>
      <Link to={`/allproduct`}>
        <div className='ml-[1rem] md:ml-[3rem]'>
          <h1 className='text-3xl md:text-5xl rs'>New Arrivals</h1>
        </div>
        <div className='m-5 p-6 flex flex-col md:flex-row gap-[3rem] md:gap-[7rem] bg-black rounded-xl text-white'>
          <div className='relative'>
            {products[0] && (
              <Link to={`/category/${products[0].category}`}>
                <img 
                  className='w-[30rem] h-[25rem] md:h-[40rem]' 
                  src={`http://localhost/waltzify_copy_fake/Backend/Products/${products[0].img1}`} 
                  alt={products[0].pname}
                />
                <p className='text-center w-[14rem] top-[90%] text-white text-xl font-bold'>
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
                    <img 
                      className='w-[14rem] h-[12rem] md:w-[30rem] md:h-[20rem] hover:blur-sm cursor-pointer' 
                      src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`} 
                      alt={product.pname}
                    />
                    <p className='text-center lg:w-[12rem] top-[90%] text-white text-xl font-bold'>
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





{/* import React, { useEffect, useState } from 'react';
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
    <div className='overflow-hidden'>
    <Link to = {`/allproduct`}>
      <div className='ml-[1rem] md:ml-[3rem]'>
        <h1 className='text-3xl md:text-5xl rs'>New Arrivals</h1>
      </div>
      <div className='m-5 p-6 flex flex-col md:flex-row gap-[3rem] md:gap-[7rem] bg-black rounded-xl text-white'>
        <div className='relative'>
          {products[0] && (
            <div>
              <Link to = {`/category/${products[0].category}`}>
            <img 
              className='w-[30rem] h-[25rem] md:h-[40rem]' 
              src={`http://localhost/waltzify_copy_fake/Backend/Products/${products[0].img1}`} 
              alt={products[0].pname}
            />
            </Link>
            </div>
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
          <div className='hover:scale-105 cursor-default ml-[2rem] gap-3 flex flex-col rs text-black top-[70%] md:top-[74%] absolute z-10'>
            
          </div>
        </div>
        <div className='flex flex-col gap-10'>
        {products[1] && (
          <Link to = {`/category/${products[1].category}`}>
          <div className='rs flex justify-center items-center'>
         
            <div className='w-[17rem]'>
            
              <p className='text-xl font-bold'>{products[1].category}</p>
              
              <button className='text-start'><span className='cursor-pointer underline'>Shop now</span>→</button>
            </div>
            <div>
            
                <img 
                  className='w-[30rem] h-[20rem]' 
                  src={`http://localhost/waltzify_copy_fake/Backend/Products/${products[1].img1}`} 
                  alt={products[1].pname}
                />
            
            </div>
            
          </div>
        </Link>
        )}
          <div className='flex lg:flex-row flex-col md:gap-[3rem]'>
            <div className='relative'>
              {products[2] && (
                <Link to = {`/category/${products[2].category}`}>
                <div>
              <p className='md:text-center w-[20rem] md:ml-[2rem] top-[30%] md:top-[65%] text-white text-xl md:text-2xl font-bold '>{products[2].category}</p>

                <img 
                  className='hover:blur-sm cursor-pointer w-[24rem] h-[20rem]' 
                  src={`http://localhost/waltzify_copy_fake/Backend/Products/${products[2].img1}`} 
                  alt={products[2].pname}
                />
              

                </div>
                </Link>
                 )}
             
            </div>
            <div className='flex gap-1 mr-[2rem] justify-center items-end md:items-center'>
            
              {products[3] && (
                <Link to = {`/category/${products[3].category}`}>
                <div>
                
                <p className='text-2xl font-bold'>{products[3].category}</p>
                <img 
                  className='hover:blur-sm w-[33rem] h-[16rem]' 
                  src={`http://localhost/waltzify_copy_fake/Backend/Products/${products[3].img1}`} 
                  alt={products[3].pname}
                />
                </div>
                </Link>
              )}
             
            </div>
            <div className='flex gap-1 mr-[2rem] justify-center items-end md:items-center'>
            
              {products[4] && (
                <Link to = {`/category/${products[4].category}`}>
                <div>
                
                <p className='text-2xl font-bold'>{products[3].category}</p>
                <img 
                  className='hover:blur-sm w-[33rem] h-[16rem]' 
                  src={`http://localhost/waltzify_copy_fake/Backend/Products/${products[4].img1}`} 
                  alt={products[4].pname}
                />
                </div>
                </Link>
              )}
             
            </div>
          </div>
        </div>
      </div>
    </Link>
    </div>
  );
}

export default Newarrival; */}
 
