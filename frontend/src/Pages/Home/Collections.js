 import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Collections() {
  const [categories, setCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('http://localhost/waltzify_copy_fake/Backend/Fetch_Collection.php')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const displayedCategories = showAll ? categories : categories.slice(0, 12);

  return (
    <div className="py-[3rem]">
     
      <div className="flex flex-col gap-3 justify-center items-center">
        <h1 className="text-3xl font-bold drop-shadow-xl">COLLECTIONS</h1>
        <p>BEST OF WALTZIFY</p>
      </div>

      
      <div className="py-[3rem] px-[1rem] lg:px-[4rem] grid grid-col-2 sm:grid-cols-2 lg:flex lg:flex-wrap lg:gap-y-[2rem] justify-center max-sm:py-[3rem] max-sm:px-[1rem] max-sm:grid max-sm:grid-cols-2 max-sm:grid-cols-2 place-items-center">
        {displayedCategories.map((category, index) => (
          <div
            key={index}
            className={`group flex flex-col text-center place-items-center justify-center gap-2 ${
              index % 6 === 0 ? 'lg:w-full lg:justify-center' : ''
            }`}
            style={{
              flexBasis: '16.66%', // Each item takes 1/6 of the row
              maxWidth: '16.66%',
            }}
          >
            <Link to={`/category/${category.collectionName}`}>
              <img
                className="group-hover:border-orange-500 border-4 lg:w-[10rem] w-[7rem] h-[7rem] lg:h-[10rem] rounded-full"
                src={`http://localhost/waltzify_copy_fake/Backend/Collection/${category.images1}`}
                alt={category.collectionName}
              />
              <p className="w-[8rem] text-sm lg:ml-[1rem] font-bold py-1 px-2 rounded-lg group-hover:bg-orange-500 group-hover:text-white transition-all ease-in-out delay-100 text-center ">
                {category.collectionName}
              </p>
            </Link>
          </div>
        ))}
      </div>

     
      {categories.length > 12 && !showAll && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-all"
          >
            VIEW ALL
          </button>
        </div>
      )}
    </div>
  );
}

export default Collections;










