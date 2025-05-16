import React, { useState, useEffect, useContext, memo } from "react";
import { useParams } from "react-router-dom"; // Correct import for useParams
import LoyaltyOutlinedIcon from "@mui/icons-material/LoyaltyOutlined";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { IoStarSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { UserContext } from "../../Context/UserContext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow"; // Importing the icon
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./temp.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"; // If using navigation buttons
import "swiper/css/pagination"; // If using pagination
import Magnifier from "react-magnifier";
import "react-medium-image-zoom/dist/styles.css";
import Modal from "react-modal";
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

function ProductDetail() {
  const { id } = useParams(); // Correct usage of useParams
  const { user, addToCart, addToWish, avg, setAvg } = useContext(UserContext);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [colorProducts, setColorProducts] = useState([]);
  const [sizeProducts, setSizeProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [adminReviews, setAdminReviews] = useState([]);
  const [error, setError] = useState();
  const [averageRating, setAverageRating] = useState(0);
  const [mainImage, setMainImage] = useState([]);
  const [mainMedia, setMainMedia] = useState([]); // Set the initial media to be displayed
  const [isLiked, setIsLiked] = useState(false); // State to track the like status
  const [dis, setDis] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // State for zoom level

  // Set app element for accessibility
  Modal.setAppElement("#root");

  const isImage = (media) => {
    return (
      media.endsWith(".jpg") ||
      media.endsWith(".jpeg") ||
      media.endsWith(".png") ||
      media.endsWith(".gif") ||
      media.endsWith(".webp") ||
      media.endsWith(".jfif")
    );
  };

  // const isVideo = (media) => {
  //   return (
  //     media.endsWith(".mp4") ||
  //     media.endsWith(".mov") ||
  //     media.endsWith(".avi") ||
  //     media.endsWith(".mkv")
  //   );
  // };

  const navigate = useNavigate();
  useEffect(() => {
    fetch(
      `http://localhost/waltzify_copy_fake/Backend/Fetch_Products.php?id=${id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        setProduct(data);
        setRelatedProducts(data.related_products || []);
        setReviews(data.reviews);
        setColorProducts(data.color_products || []);
        setSizeProducts(data.size_products || []);
        setMainImage(data.img1);
        setMainMedia(data.img1);
        console.log("main: ", data.img1);
        setAdminReviews(data.adminReviews);

        let totalRating = 0;
        if (data.reviews.length > 0) {
          totalRating += data.reviews.reduce((sum, review) => {
            return sum + Number(review.rating); // Ensure rating is treated as a number
          }, 0); // Ensure the initial sum is a number
        }

        if (data.review2.length > 0) {
          totalRating += data.review2.reduce((sum, review) => {
            return sum + Number(review.rating); // Ensure rating is treated as a number
          }, 0);
        }

        const average =
          totalRating / (data.reviews.length + data.review2.length);
        setAvg(average);
        setAverageRating(average);

        if (data.reviews.length == 0 && data.review2.length == 0) {
          setAvg(0);
          setAverageRating(0);
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, [id]);

  const handleCart = () => {
    if (!user) {
      navigate("/Login");
    } else {
      addToCart(product);
    }
  };
  const handleWish = () => {
    if (!user) {
      navigate("/Login");
      setIsLiked(true); // Toggle the like state
    } else {
      addToWish(product);
      setIsLiked(true); // Toggle the like state
    }
  };
  const handleBuyNow = () => {
    if (!user) {
      //setPendingAddToCartProduct(product);
      navigate("/Login");
    } else {
      addToCart(product); // Add the product to the cart
      navigate("/checkout", { state: { product: product } }); // Navigate to checkout page with product details
    }
  };
  if (!product) {
    return <p>Loading...</p>;
  }
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };
  const handleReview = () => {
    if (!user) {
      //setPendingAddToCartProduct(product);
      navigate("/Login");
    } else {
      navigate(`/reviewproduct/${id}`); // Navigate to checkout page with product details
    }
  };

  const discountedPrice =
    product.p_price - product.p_price * (product.discount / 100);
  const stockColor =
    product.Stock === "In Stock" ? "text-green-500" : "text-red-500";

  //const displayedPrice = selectedSize ? selectedSize.price : discountedPrice;

  const combinedReviews = [
    ...product.reviews.map((review) => ({ ...review, isAdmin: false })),
    ...product.adminReviews.map((review) => ({ ...review, isAdmin: true })),
  ];

  // //   edit
  // const ImageContainer = styled.div`
  //   position: relative;
  //   width: 100%;
  //   max-width: 600px;
  //   margin: auto;
  //   height: 30rem;
  //   object-fit: contain;
  //   aspect-ratio: auto;
  // `;

  const rating = {
    width: "20px",
    height: "20px",
  };
  const getYouTubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };
  const formatDescription = (description) => {
    // Use regex to split on spaces, while keeping punctuation
    return description
      .split(/(\s+)/)
      .map((word, index) => {
        // Remove punctuation from the word for the check
        const strippedWord = word.replace(/[.,!?-]/g, "");

        // If the word is fully uppercase, wrap it in <strong> for bold effect
        if (
          strippedWord === strippedWord.toUpperCase() &&
          strippedWord.length > 1
        ) {
          return <strong key={index}>{word}</strong>;
        }
        return word;
      })
      .reduce((prev, curr) => [prev, curr]); // Maintain original spaces
  };

  const formatKeyFeatures = (keyFeatures) => {
    if (!keyFeatures) return null; // Handle case where keyFeatures is empty or undefined

    // Split by newlines to create custom symbols for each line
    return (
      <ul>
        {keyFeatures.split("\n").map((line, index) => (
          <li key={index} className="text-sm">
            {line.trim() === "" ? (
              <>&nbsp;</> // Show a space for empty lines
            ) : (
              <>
                {/* Custom symbol instead of bullet points */}
                <span
                  role="img"
                  aria-label="bullet"
                  style={{ marginRight: "0.5rem", fontSize: "0.5rem" }}
                >
                  ⚫
                </span>
                {line.split(/(\s+)/).map((word, wordIndex) => {
                  const strippedWord = word.replace(/[.,!?-]/g, "");

                  // If the word is fully uppercase, wrap it in <strong> for bold effect
                  if (
                    strippedWord === strippedWord.toUpperCase() &&
                    strippedWord.length > 1
                  ) {
                    return <strong key={wordIndex}>{word}</strong>;
                  }
                  return word;
                })}
              </>
            )}
          </li>
        ))}
      </ul>
    );
  };

  const handleMediaChange = (media) => {
    setMainMedia(media);
    console.log("Media: ", media);
  };


  const buttonStyle = {
    position: "absolute",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "10px 20px",
    background: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "5px",
  };
  const buttonStyle2 = {
    position: "absolute",
    bottom: "10px",
    right: "50%",
    transform: "translateX(-50%)",
    padding: "10px 20px",
    background: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "5px",
  };

  return (
    <div className="py-[3rem] px-[1rem] lg:px-[2rem] lg:mt-[10vw] mt-[45vw] ">
      <div className="flex flex-col lg:flex-row gap-[4rem]">
        {/* Render product images and description */}
        <div className="border-2 h-[43rem] lg:h-[43rem] border-orange-500 rounded-xl py-[1rem] lg:px-[2rem] flex gap-4 flex-col lg:w-[38rem] object-contain aspect-auto">
          <FavoriteIcon
            fontSize="large"
            className={`text-2xl transition-all ease-in-out cursor-pointer ml-auto ${
              isLiked ? "text-red-500" : "text-gray-500"
            }`}
            onClick={handleWish}
          />

          <div className="relative">
            <div className="flex justify-center items-center object-contain place-items-center bgrboparent">
              {/* edit */}
              {mainMedia && isImage(mainMedia) ? (
                // <ImageContainer>
                // <img className="bgrbo" src={`http://localhost/waltzify_copy_fake/Backend/Products/${mainMedia}`} />
                <>
       <Magnifier
  src={`http://localhost/waltzify_copy_fake/Backend/Products/${mainMedia}`}
  width={400}
  zoomFactor={1.5}
  mgWidth={200}
  mgHeight={200}
  mgShape="circle"
  onClick={() => setModalOpen(true)} // Open full-screen on click
  style={{ cursor: "pointer" }}
/>

{/* Full-Screen Modal */}
<Modal
  isOpen={isModalOpen}
  onRequestClose={() => setModalOpen(false)}
  style={{
    overlay: {
      backgroundColor: "rgba(240, 240, 240, 1)", // Dark overlay
    },
    content: {
      top: "60%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "transparent",
      border: "none",
      zIndex:"10000"
    },
  }}
>
  <div style={{ textAlign: "center", position: "relative" }}>
    {/* react-zoom-pan-pinch with faster zoom-out speed */}
    <TransformWrapper
      initialScale={1}
      minScale={1}
      maxScale={3}
      wheel={{
        step: 10, // Increased step value to make zooming faster
      }}
      pinch={{
        step: 10, // Adjust pinch zoom speed (faster zoom-out)
      }}
      style={{
        cursor: "grab !important", // Set the cursor to "grab" when not interacting with the image
      }}
      onDoubleClick={() => {
        // Check if the current zoom level is at max and zoom out if it is
        if (zoomLevel >= 3) {
          setZoomLevel(1); // Reset zoom level to 1 (zoom out)
        }
      }}
    >
      <TransformComponent>
        <img
          src={`http://localhost/waltzify_copy_fake/Backend/Products/${mainMedia}`}
          alt="Full-Screen View"
          style={{
            width: "100%",
            height: "auto",
            cursor: "zoom-in", // Change the cursor to "zoom-in" when hovering over the image
          }}
        />
      </TransformComponent>
    </TransformWrapper>

  </div>
</Modal>
                </>
              ) : (
                // </ImageContainer>
                <div className="youtube-video-container">
                  <iframe
                    className="frame-vid"
                    width="100%"
                    src={`http://localhost/waltzify_copy_fake/Backend/Products/${mainMedia}`}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </div>
              )}
            </div>

            {/* edit */}

            {/* Thumbnail section */}
            <Swiper
              spaceBetween={10}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: {
                  slidesPerView: 4,
                },
                768: {
                  slidesPerView: 5,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
            >
              {[
                product.img1,
                product.img2,
                product.img3,
                product.img4,
                product.img5,
                product.img6,
                product.img7,
                product.youtubeLink,
              ].map((media, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="relative w-[4rem] h-[4rem] lg:mt-[3rem] lg:h-[5rem] lg:w-[8rem] border-2 border-black rounded-xl cursor-pointer object-contain aspect-auto"
                    onClick={() => {
                      if (isImage(media)) {
                        handleMediaChange(media);
                      } else if (
                        media === product.youtubeLink &&
                        media.trim() !== ""
                      ) {
                        handleMediaChange(media);
                      } else {
                        handleMediaChange(product.img1);
                      }
                    }}
                  >
                    {isImage(media) ? (
                      <img
                        src={`http://localhost/waltzify_copy_fake/Backend/Products/${media}`}
                        alt={`${product.pname} ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    ) : media === product.youtubeLink && media.trim() !== "" ? (
                      <div className="relative w-full h-full">
                        <img
                          src={`https://img.youtube.com/vi/${getYouTubeVideoId(
                            media
                          )}/maxresdefault.jpg`}
                          alt="YouTube Video"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <PlayArrowIcon
                            fontSize="large"
                            className="text-white bg-black bg-opacity-50 rounded-full p-1"
                          />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={`http://localhost/waltzify_copy_fake/Backend/Products/${product.img1}`}
                        alt="Fallback"
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="flex flex-col gap-[1rem]">
          <h1 className="text-2xl font-semibold lg:w-[40rem]">
            {product.pname}
          </h1>
          <div className="flex gap-[2rem] items-end">
            <p className="text-green-500 text-2xl font-bold">
              ₹{discountedPrice.toFixed(2)}
            </p>
            {/* <p className='text-green-500 text-2xl font-bold'>₹{(discountedPrice *  (1 + product.igstn / 100)).toFixed(2)}</p> */}
            {/*  <p className='text-red-500 text-sm line-through'>₹{(product.p_price *  (1 + product.igstn / 100)).toFixed(2)}</p> */}
            <p className="text-red-500 text-sm line-through">
              ₹{product.p_price}
            </p>
            <p className="text-red-500 text-sm">
              {product.discount == 0
                ? "No discount"
                : `${product.discount}% off`}
            </p>
          </div>
          {/* Render rating */}
          <div className="flex gap-[2rem]">
            <div className="text-yellow-500 flex-wrap items-center text-sm">
              {[...Array(5)].map((_, i) =>
                i < Math.floor(avg) ? (
                  <StarOutlinedIcon key={i} style={rating} />
                ) : (
                  <StarBorderOutlinedIcon key={i} />
                )
              )}
              <span className="text-black ml-[1rem] text-sm">
                ({avg.toFixed(1)} Rating)
              </span>
            </div>
            <p className="text-gray-500 text-xs">SKU : {product.SKU}</p>
            <p className="text-black text-xs">
              <span>Stock : </span>
              <span className={`font-bold ${stockColor}`}>{product.Stock}</span>
            </p>

            {/* Render review count */}
          </div>
          {/* Render available offers */}
          <div className="flex flex-col gap-[1rem] max-sm:flex-col-reverse lg:flex-col ">
            <div className="flex flex-col gap-[1rem] text-xl">
              <p className="text-2xl font-bold">Key Features:</p>
              <div className="">
                {/* Rendering the formatted key features */}
                <p className="list-disc text-justify">
                  {formatKeyFeatures(product.keyFeatures)}
                </p>
              </div>

              {/*color*/}
              {colorProducts.some((colorProduct) => colorProduct.color) && (
                <>
                  <p className="text-xl font-semibold">Colors:</p>
                  <div className="grid grid-cols-3 lg:grid-cols-5 gap-[1rem]">
                    {colorProducts.map(
                      (colorProduct, index) =>
                        colorProduct.color && (
                          <div
                            key={index}
                            className="flex flex-col items-center"
                          >
                            <Link to={`/WI/${colorProduct.Id}`}>
                              <img
                                className="cursor-pointer w-[6rem] h-[5rem] border-2 border-black rounded-xl object-contain aspect-auto"
                                src={`http://localhost/waltzify_copy_fake/Backend/Products/${colorProduct.img1}`}
                                alt={colorProduct.color}
                              />
                            </Link>
                            <p className="text-black">{colorProduct.color}</p>
                          </div>
                        )
                    )}
                  </div>
                </>
              )}

              {/*size of products */}
              {sizeProducts.some((sizeProduct) => sizeProduct.size) && (
                <>
                  <p className="text-xl font-semibold">Sizes:</p>
                  <div className="flex items-center no-scrollbar p-2 overflow-x-scroll lg:grid lg:grid-cols-4 gap-[1rem]">
                    {sizeProducts.map(
                      (sizeProduct, index) =>
                        sizeProduct.size && (
                          <div
                            key={index}
                            className="flex flex-wrap gap-[0.5rem]"
                          >
                            <Link to={`/WI/${sizeProduct.Id}`}>
                              <div className="w-[8rem] flex flex-col items-center border-2 border-black rounded-xl py-1 px-2 hover:scale-105 cursor-pointer hover:bg-gray-100 hover:border-orange-500">
                                <p className="">
                                  <span className="">{sizeProduct.size}</span>
                                </p>
                                {/*  <p className='font-bold'>₹{discountedPrice}</p> */}
                              </div>
                            </Link>
                          </div>
                        )
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Render add to cart and wishlist buttons */}
            <div className="lg:w-[40rem] mt-[3rem] flex flex-col text-xl gap-[2rem] sm:max-sm:text-sm">
              <button onClick={handleCart} className="add_to_cart">
                Add To Cart
              </button>
              <button onClick={handleBuyNow} className="add_to_cart">
                Buy Now
              </button>
            </div>
          </div>{" "}
          {/* Render the button on opposite site */}
        </div>
      </div>
      {/* Render about product section */}
      {/* ... */}
      <div className="lg:w-1/2 mt-[2rem] flex flex-col gap-[2rem]">
        <p className="text-2xl font-bold">About this item:</p>
        <div className="lg:w-[80rem]">
          <ul className="list-disc text-justify">
            {/*  {product.map((product,index)=>( */}
            <p className="mb-4 text-sm" style={{ whiteSpace: "pre-line" }}>
              {" "}
              {formatDescription(product.description)}
            </p>
            {/*))}*/}
          </ul>
        </div>
      </div>

      {/* Render warranty and other sections */}
      <div className="flex flex-wrap gap-[1rem] items-center justify-evenly text-sm lg:text-xl py-2 md:text-xs font-bold mt-2">
        <div className="flex items-center gap-[0.5rem]">
          <AssignmentReturnIcon />
          <p>Return & Exchange</p>
        </div>
        <div className="flex items-center gap-[0.5rem]">
          <SupportAgentIcon />
          <p>Customer Service</p>
        </div>
        <div className="flex items-center gap-[0.5rem]">
          <LocalShippingOutlinedIcon />
          <p>Shipping and Delivery</p>
        </div>
        <div className="flex items-center gap-[0.5rem]">
          <SecurityOutlinedIcon />
          <p>Warranty</p>
        </div>
      </div>
      {/* ... */}
      {/* Render customer reviews */}
      <div className="my-[2rem] py-[1.5rem] border-t-2">
        <p className="text-4xl">Customer Reviews:</p>
        <div className="flex flex-col mt-[2rem]">
          <p className="text-3xl">Review This Product:</p>
          <p className="text-xl">Share your thoughts with other customers</p>
          <button
            onClick={handleReview}
            className="w-[10rem] mt-[1rem] rounded-lg text-orange-500 border-orange-500 border-2 py-1 px-3 hover:text-white hover:bg-orange-500 transition-all ease-in-out"
          >
            Write a Review
          </button>
        </div>

        <div className="mt-[2rem] flex gap-[2rem] overflow-x-scroll no-scrollbar">
          {combinedReviews.map((review, index) => (
            <div
              key={index}
              className="border-2 rounded-xl w-[23rem] flex-shrink-0 flex flex-col px-[1rem] py-[0.5rem] justify-evenly"
            >
              <div className="flex items-center gap-2 text-xl">
                <AccountCircleOutlinedIcon />
                <p className="font-bold">{review.name}</p>
                <span
                  className="bg-green-600 flex items-center text-sm text-white p-0 rounded-sm"
                  style={rating}
                >
                  {review.rating}

                  <span style={{ fontSize: "0.8rem" }}>
                    {" "}
                    <IoStarSharp />
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-1 mt-[0.5rem]">
                <div className="text-yellow-500 text-xs">
                  {[...Array(5)].map((_, i) => {
                    return i < review.rating ? (
                      <StarOutlinedIcon key={i} />
                    ) : (
                      <StarBorderOutlinedIcon key={i} />
                    );
                  })}

                  <p className="text-black font-bold text-sm">
                    {review.isAdmin ? review.reviewTitle : review.heading}
                  </p>
                </div>
              </div>
              <p className="text-sm font-thin">{`${formatDate(
                review.timestamp
              )}`}</p>
              <p className="mt-3 font-bold text-justify">{review.review}</p>
              <div className={`flex`}>
                {review.isAdmin ? (
                  <div
                    className={`flex gap-1 ${
                      dis === "block" ? "hideen" : "block"
                    }`}
                  >
                    {review.img1 ? (
                      <img
                        className="mt-3 w-[5rem] h-[4rem] object-contain aspect-auto"
                        src={`http://localhost/waltzify_copy_fake/Backend/Review/${review.img1}`}
                        alt={review.title}
                      />
                    ) : null}
                    {review.img2 ? (
                      <img
                        className="mt-3 w-[5rem] h-[4rem] object-contain aspect-auto"
                        src={`http://localhost/waltzify_copy_fake/Backend/Review/${review.img2}`}
                        alt={review.title}
                      />
                    ) : null}
                    {review.img3 ? (
                      <img
                        className="mt-3 w-[5rem] h-[4rem] object-contain aspect-auto"
                        src={`http://localhost/waltzify_copy_fake/Backend/Review/${review.img3}`}
                        alt={review.title}
                      />
                    ) : null}
                    {review.img4 ? (
                      <img
                        className="mt-3 w-[5rem] h-[4rem] object-contain aspect-auto"
                        src={`http://localhost/waltzify_copy_fake/Backend/Review/${review.img4}`}
                        alt={review.title}
                      />
                    ) : null}
                  </div>
                ) : (
                  <>
                    {review.images1 && (
                      <img
                        className="mt-3 w-[5rem] h-[4rem] object-contain aspect-auto"
                        src={`http://localhost/waltzify_copy_fake/Backend/User_Review/${review.images1}`}
                        alt={review.title}
                      />
                    )}
                    {review.images2 && (
                      <img
                        className="mt-3 w-[5rem] h-[4rem] object-contain aspect-auto"
                        src={`http://localhost/waltzify_copy_fake/Backend/User_Review/${review.images2}`}
                        alt={review.title}
                      />
                    )}
                    {review.images3 && (
                      <img
                        className="mt-3 w-[5rem] h-[4rem] object-contain aspect-auto"
                        src={`http://localhost/waltzify_copy_fake/Backend/User_Review/${review.images3}`}
                        alt={review.title}
                      />
                    )}
                    {review.images4 && (
                      <img
                        className="mt-3 w-[5rem] h-[4rem] object-contain aspect-auto"
                        src={`http://localhost/waltzify_copy_fake/Backend/User_Review/${review.images4}`}
                        alt={review.title}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Render related products */}
      <div className="flex flex-col gap-[1rem] py-[3rem]">
        <div className="text-center lg:text-left mb-[2rem]">
          <p className="text-4xl font-bold">Related Products</p>
          <p>Below are some suggested items</p>
        </div>

        <p className="lg:hidden lg:mx-[2rem] bg-orange-500 px-[1rem] py-2 rounded-bl-2xl text-white text-sm lg:text-2xl">
          Selected Category
        </p>
        <div className="">
          <div className="px-1 lg:px-[2.5rem] py-[2rem] place-items-center grid gap-[1rem] lg:grid-cols-4 grid-cols-2 items-center justify-between lg:gap-2">
            {relatedProducts.map((relatedProduct, index) => {
              const discountedPrice =
                relatedProduct.p_price -
                relatedProduct.p_price * (relatedProduct.discount / 100);

              return (
                <Link
                  key={index}
                  to={{
                    pathname: `/WI/${relatedProduct.Id}`,
                    state: { product: product },
                  }}
                >
                  <div className="lg:mb-5 shadow-xl hover:border-orange-500 group p-1 w-[10rem] lg:w-[18rem] lg:p-[1rem] border-2 rounded-xl cursor-pointer lg:h-[23rem]">
                    <div className="flex justify-between items-center">
                      <p className="text-xs bg-orange-500 text-white p-2 rounded-xl">
                        {" "}
                        {relatedProduct.discount > 0
                          ? `Save ${relatedProduct.discount}%`
                          : "Best Price"}
                      </p>
                    </div>
                    {/* edit */}
                    <img
                      className="w-[9rem] h-[7rem] lg:h-[11rem] p-[1rem] lg:w-full rounded-xl object-contain aspect-auto"
                      src={`http://localhost/waltzify_copy_fake/Backend/Products/${relatedProduct.img1}`}
                      alt=""
                    />
                    {/* edit */}
                    <div className="hidden lg:block mt-[0.5rem] h-[2rem]">
                      <p className="hidden group-hover:block bg-orange-500 text-white text-center mx-[1rem] rounded-xl">
                        Quick View
                      </p>
                    </div>
                    <div className="px-[0.2rem]">
                      <p className="font-bold text-md">
                        {relatedProduct.pname.length > 15
                          ? `${relatedProduct.pname.slice(0, 15)}...`
                          : relatedProduct.pname}
                      </p>
                      <div className="flex gap-3 text-md">
                        <p className="font-bold">
                          ₹
                          {(
                            discountedPrice *
                            (1 + relatedProduct.igstn / 100)
                          ).toFixed(2)}
                        </p>
                        <span className="line-through text-xs my-auto">
                          ₹
                          {(
                            relatedProduct.p_price *
                            (1 + relatedProduct.igstn / 100)
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className="text-yellow-500 text-sm">
                        {[...Array(5)].map((_, i) =>
                          i < relatedProduct.average_rating ? (
                            <StarOutlinedIcon key={i} style={rating} />
                          ) : (
                            <StarBorderOutlinedIcon key={i} style={rating} />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
