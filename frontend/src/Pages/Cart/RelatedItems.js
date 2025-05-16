import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

function RelatedItems({ productIds }) {
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    if (productIds.length > 0) {
      fetch(`http://localhost/waltzify_copy_fake/Backend/fetch_related_products.php?ids=${productIds.join(',')}`)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
            setRelatedItems(data);
          } else {
            console.error('Data fetched is not an array:', data);
          }
        })
        .catch(error => console.error('Error fetching related items:', error));
    }
  }, [productIds]);

  return (
    <div className='py-[2rem] '>
      <div className=' py-[1rem] flex overflow-scroll no-scrollbar items-center justify-between gap-5'>
        {relatedItems.map((item, index) => {
          const discountedPrice = item.p_price - (item.p_price * (item.discount / 100));
          return (
            <Link
              key={index}
              to={{
                pathname: `/WI/${item.Id}`,
                state: { product: item }
              }}
            >
              <div className='shadow-xl hover:border-orange-500 group p-[1rem] border-2 rounded-xl cursor-pointer h-[23rem] w-[15rem]'>
                <div className='flex justify-between items-center'>
                  <p className='text-xs bg-orange-500 text-white p-1 rounded-xl'>Save 20%</p>
                  <FontAwesomeIcon className='group-hover:block hidden' icon={faHeart} />
                </div>
                 {/* edit */}
                 <img className='h-[11rem] w-full rounded-xl mt-2 object-contain aspect-auto' src={`http://localhost/waltzify_copy_fake/Backend/Products/${item.img1}`} alt="" />
                {/* edit */}
                <div className='mt-[0.5rem] h-[2rem]'>
                  <p className='hidden group-hover:block bg-orange-500 text-white text-center mx-[1rem] rounded-xl'>Quick View</p>
                </div>
                <div className='px-[0.2rem]'>
                <p className='font-bold'>{item.pname.length > 14 ? `${item.pname.slice(0, 14)}...` : item.pname}</p>
                  <div className='flex gap-3'>
                    <p>₹{discountedPrice}</p>
                    <span className='line-through'>₹{item.p_price}</span>
                  </div>
                  <div className='text-yellow-500 text-sm'>
                    {[...Array(5)].map((_, i) => (
                      i < item.average_rating ? <StarOutlinedIcon key={i} /> : <StarBorderOutlinedIcon key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default RelatedItems;



