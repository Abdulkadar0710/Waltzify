import React, { useEffect, useState } from 'react';
import { 
    Plus, 
    Search, 
    ArrowRight, 
    Reply, 
    AlertTriangle,
    Star 
  } from 'lucide-react';
import { Link } from 'react-router-dom';
function Review() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetch('http://localhost/waltzify_copy_fake/Backend/fetch_allreview.php')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching data:', error));
            console.log("allrev: ",products);
    }, []);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (value.length > 0) {
            setShowSuggestions(true);
            const filtered = products.filter(product =>
                product.pname.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setShowSuggestions(false);
            setSelectedProduct(null);
        }
    };

    const handleSuggestionClick = (product) => {
        setSearchTerm(product.pname);
        setShowSuggestions(false);
        setSelectedProduct(product);
    };
    const handleDelete = (review_id, isAdmin) => {
          // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure that you want to delete it?')) {
            const url = isAdmin
                ? `http://localhost/waltzify_copy_fake/Backend/review_delete.php?Id=${review_id}`
                : `http://localhost/waltzify_copy_fake/Backend/user_review_delete.php?Id=${review_id}`;
    
            fetch(url, { method: 'DELETE' })
                .then(response => response.text()) // Read response as text first
                .then(text => {
                    if (text.trim() === '') {
                        throw new Error('Empty response from server');
                    }
                    try {
                        const data = JSON.parse(text); // Attempt to parse JSON
                        return data;
                    } catch (e) {
                        console.error("Failed to parse JSON:", e);
                        return {}; // Return empty object in case of parsing error
                    }
                })
                .then(data => {
                    if (data.success) {
                        setProducts(prevProducts => prevProducts.filter(review => review.Id !== review_id));
                        if (selectedProduct) {
                            const updatedProduct = {
                                ...selectedProduct,
                                reviews: selectedProduct.reviews.filter(review => review.Id !== review_id),
                                adminReviews: selectedProduct.adminReviews.filter(review => review.ReviewId !== review_id)
                            };
                            setSelectedProduct(updatedProduct);
                        }
                    } else {
                        console.error('Error deleting review:', data.error || 'Unknown error');
                    }
                })
                .catch(error => console.log('Fetch error:', error));
        }
    };
    

    

    return (
        <div className="bg-gray-50 p-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Reviews And Rating</h1>
            <Link to='/AddReview'>
                        <button className='ml-4 inline-flex items-center px-4 py-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-xl'>
                        <Plus className="mr-2 w-4 h-4" />
                            Add New
                        </button>
                    </Link>
        </div>
        
        <div className="relative">
          <div className="flex items-center border-2 rounded-lg p-2">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full lg:w-96 focus:outline-none"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <Search className="text-blue-500 w-5 h-5" />
          </div>
          
          {showSuggestions && (
            <ul className="absolute left-0 top-full mt-2 w-full bg-white rounded-lg shadow-lg border max-h-60 overflow-y-auto z-10">
              {filteredProducts.map((product) => (
                <li
                  key={product.Id}
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(product)}
                >
                  <img 
                    src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`}
                    alt={product.pname}
                    className="w-12 h-12 object-cover mr-3"
                  />
                  <span>{product.pname}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="text-gray-600">
          Dashboard <ArrowRight className="inline w-4 h-4" /> <span className="font-light">Reviews and Rating</span>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Product</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Review Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Id</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Rating</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Review</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">User</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Timestamp</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {console.log("selectedProduct: ",selectedProduct)}
              {selectedProduct ? (
                <>
                  {selectedProduct.reviews?.map((review) => (
                    <tr key={review.Id} className="hover:bg-gray-50">
                      {console.log("review: ", review)}
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={`http://localhost/waltzify_copy_fake/Backend/Products/${selectedProduct.img1}`}
                            alt={selectedProduct.pname}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <span className="ml-3 font-medium">{selectedProduct.pname}</span>
                          <span className="ml-3 font-medium">{review.Id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{review.heading}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800">
                          {review.rating} <Star className="ml-1 w-4 h-4 fill-current" />
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs truncate">{review.review}</div>
                      </td>
                      <td className="px-6 py-4">{review.email}</td>
                      <td className="px-6 py-4">{review.timestamp}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(review.ReviewId, false)}
                          className="text-red-600 hover:text-red-900 mr-3"
                        >
                          <Reply className="inline w-4 h-4 mr-1" /> Delete
                        </button>
                       
                      </td>
                    </tr>
                  ))}
                  {selectedProduct.adminReviews?.map((review) => (
                    <tr key={review.Id} className="hover:bg-gray-50 bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={`http://localhost/waltzify_copy_fake/Backend/Products/${selectedProduct.img1}`}
                            alt={selectedProduct.pname}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <span className="ml-3 font-medium">{selectedProduct.pname}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{review.reviewTitle}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800">
                          {review.rating} <Star className="ml-1 w-4 h-4 fill-current" />
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs truncate">{review.review}</div>
                      </td>
                      <td className="px-6 py-4">{review.name}</td>
                      <td className="px-6 py-4">{review.timestamp}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(review.Id, true)}
                          className="text-red-600 hover:text-red-900 mr-3"
                        >
                          <Reply className="inline w-4 h-4 mr-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                products.map((product) => (
                  <>
                  {/* {console.log("Product.reviews: ",product.reviews)}  */}
                    {product.reviews.map((review) => (
                      <tr key={review.Id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img
                              src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`}
                              alt={product.pname}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <span className="ml-3 font-medium">{product.pname}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">  {review.heading}</td>
                        <td className="px-6 py-4">  {review.ProductId}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800">
                            {review.rating} <Star className="ml-1 w-4 h-4 fill-current" />
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="max-w-xs truncate">{review.review}</div>
                        </td>
                        <td className="px-6 py-4">{review.email}</td>
                        <td className="px-6 py-4">{review.timestamp}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(review.ReviewId, false)}
                            className="text-red-600 hover:text-red-900 mr-3"
                          >
                            <Reply className="inline w-4 h-4 mr-1" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {console.log("productsss.adminReviews: ",product.adminReviews)}
                    {product.adminReviews.map((review) => (
                      <tr key={review.Id} className="hover:bg-gray-50 bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img
                              src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`}
                              alt={product.pname}
                              className="w-12 h-12 object-cover rounded"
                            /> 
                            <span className="ml-3 font-medium">{product.pname}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">{review.reviewTitle}</td>
                        <td className="px-6 py-4"> {review.productId}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800">
                            {review.rating} <Star className="ml-1 w-4 h-4 fill-current" />
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="max-w-xs truncate">{review.review}</div>
                        </td>
                        <td className="px-6 py-4">{review.name}</td>
                        <td className="px-6 py-4">{review.timestamp}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(review.Id, true)}
                            className="text-red-600 hover:text-red-900 mr-3"
                          >
                            <Reply className="inline w-4 h-4 mr-1" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
}

export default Review;


