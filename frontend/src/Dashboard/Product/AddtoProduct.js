import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCloud } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./style.css";

function AddtoProduct() {
  const [images, setImages] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [sku, setSku] = useState("");
  const [pname, setPname] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [igstn, setigstn] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
  const [size, setSize] = useState("");
  const [HSN, setHSN] = useState("");
  const [keyFeatures, setKeyFeatures] = useState("");
  const [breadth, setBreadth] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [categories, setCategories] = useState([]);
  const [volumetricWeight, setVolumetricWeight] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost/waltzify_copy_fake/Backend/Fetch_category.php")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched categories:", data); // Debugging line
  
        if (Array.isArray(data)) {
          setCategories(data);
        } else if (data && Array.isArray(data.categories)) {
          setCategories(data.categories); // If the API returns `{ categories: [...] }`
        } else {
          setCategories([]); // Fallback to an empty array
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([]); // Set default value in case of an error
      });
  }, []);
  

  const handleInputChange = (e, type) => {
    setError("");
    const value = e.target.value;
    switch (type) {
      case "pname":
        setPname(value);
        break;
      case "sku":
        setSku(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "brand":
        setBrand(value);
        break;
      case "color":
        setColor(value);
        break;
      case "youtubeLink":
        setYoutubeLink(value);
        break;
      case "igstn":
        setigstn(value);
        break;
      case "weight":
        setWeight(value);
        break;
      case "length":
        setLength(value);
        calculateVolumetricWeight(value, breadth, height);
        break;
      case "breadth":
        setBreadth(value);
        calculateVolumetricWeight(length, value, height); // Call after breadth is set
        break;
      case "height":
        setHeight(value);
        calculateVolumetricWeight(length, breadth, value); // Call after height is set
        break;
      case "description":
        setDescription(value);
        break;
      case "size":
        setSize(value);
        break;
      case "HSN":
        setHSN(value);
        break;
      case "keyFeatures":
        setKeyFeatures(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "discount":
        setDiscount(value);
        break;
      case "quantity":
        setQuantity(value);
        break;
      default:
        break;
    }
  };
  const calculateVolumetricWeight = (l, b, h) => {
    const lengthNum = parseFloat(l);
    const breadthNum = parseFloat(b);
    const heightNum = parseFloat(h);

    if (lengthNum && breadthNum && heightNum) {
      const volume = lengthNum * breadthNum * heightNum;
      const calculatedWeight = volume / 5000; // Dividing by 5000 for the volumetric weight
      setVolumetricWeight(calculatedWeight.toFixed(2));
    }
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      pname &&
      sku &&
      category &&
      brand &&
      images.every((img) => img !== null) &&
      weight &&
      length &&
      breadth &&
      height &&
      description &&
      HSN &&
      keyFeatures &&
      price &&
      quantity
    ) {
      try {
        const formData = new FormData();
        formData.append("pname", pname);
        formData.append("sku", sku);
        formData.append("category", category);
        formData.append("brand", brand);
        formData.append("weight", weight);
        formData.append("length", length);
        formData.append("breadth", breadth);
        formData.append("height", height);
        formData.append("description", description);
        formData.append("HSN", HSN);
        formData.append("keyFeatures", keyFeatures);
        formData.append("price", price);
        formData.append("quantity", quantity);

        images.forEach((img, index) => {
          formData.append(`img${index + 1}`, img);
        });
        // Only append discount if it's provided
        if (discount) {
          formData.append("discount", discount);
        }
        if (color) {
          formData.append("color", color);
        }
        if (size) {
          formData.append("size", size);
        }
        if (youtubeLink) {
          formData.append("youtubeLink", youtubeLink);
        }
        if (igstn) {
          formData.append("igstn", igstn);
        }

        const response = await fetch(
          "http://localhost/waltzify_copy_fake/Backend/Add_Products.php",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (
          data[0].result === "Not Submitted,Please try again!" ||
          data[0].result === "File upload failed"
        ) {
          setError(data[0].result);
        } else {
          setMsg(data[0].result);
          setTimeout(() => navigate("/productlist"), 2000);
        }
      } catch (err) {
        setError("Error: " + err.message);
      }
    } else {
      setError("All fields are required!");
    }
  };

  return (
    <div className="bg-[#F2F6F9] py-[2rem]">
      <div className="flex lg:flex-row flex-col justify-between lg:items-center lg:px-[4rem] px-[1rem]">
        <p className="text-xl lg:text-3xl font-bold">Add Product</p>
        <p className="text-gray-600">
          Dashboard <FontAwesomeIcon icon={faArrowRight} /> Ecommerce{" "}
          <FontAwesomeIcon icon={faArrowRight} />{" "}
          <span className="font-light text-gray-500">Add Product</span>
        </p>
      </div>
      <div className="flex lg:flex-row flex-col gap-[2rem] px-[2rem]">
        <div className="bg-white rounded-xl shadow-xl my-[3rem] p-[2rem] lg:w-1/2">
          <p>
            {msg ? (
              <span className="success">{msg}</span>
            ) : (
              <span className="error">{error}</span>
            )}
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[1rem]"
            autoComplete="off"
          >
            <p className="text-gray-600">
              Note:- If You Want to Add Multiple Variants of Particular
              Product,You Must Have To Enter Same Product Name.
            </p>
            <label className="font-bold" htmlFor="name">
              Product Name<span className="text-red-500"> *</span>
            </label>
            <input
              className="rounded-xl p-1 focus:outline-none border-2"
              type="text"
              value={pname}
              onChange={(e) => handleInputChange(e, "pname")}
              placeholder="Enter Product Name"
            />
            <p className="font-thin text-sm">
              Do not exceed 20 characters when entering the product name.
            </p>
            <label className="font-bold" htmlFor="name">
              SKU<span className="text-red-500"> *</span>
            </label>
            <input
              className="rounded-xl p-1 focus:outline-none border-2"
              type="text"
              value={sku}
              onChange={(e) => handleInputChange(e, "sku")}
              placeholder="Enter SKU"
            />
            <div className="flex lg:flex-row flex-col gap-[2rem]">
              <div className="flex flex-col gap-[1rem]">
                <label className="font-bold" htmlFor="category">
                  Category<span className="text-red-500"> *</span>
                </label>
                <select
                  className="rounded-xl p-1 focus:outline-none border-2"
                  value={category}
                  onChange={(e) => handleInputChange(e, "category")}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat.cname}>
                      {cat.cname}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <label className="font-bold" htmlFor="brand">
              Brand<span className="text-red-500"> *</span>
            </label>
            <input
              className="rounded-xl p-1 focus:outline-none border-2"
              type="text"
              value={brand}
              onChange={(e) => handleInputChange(e, "brand")}
              name="brand"
              placeholder="Brand"
            />
            <label className="font-bold" htmlFor="brand">
              Color
            </label>
            <input
              className="rounded-xl p-1 focus:outline-none border-2"
              type="text"
              value={color}
              onChange={(e) => handleInputChange(e, "color")}
              name="color"
              placeholder="Color"
            />
            <label className="font-bold" htmlFor="description">
              Description<span className="text-red-500"> *</span>
            </label>
            <textarea
              className="h-[20rem] rounded-xl p-1 focus:outline-none border-2"
              name="desc"
              placeholder="Description"
              value={description}
              onChange={(e) => handleInputChange(e, "description")}
            ></textarea>
            <label className="font-bold" htmlFor="price">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              className="w-[19rem] rounded-xl p-1 focus:outline-none border-2"
              type="text"
              value={price}
              onChange={(e) => handleInputChange(e, "price")}
              placeholder="price"
            />
            <label className="font-bold" htmlFor="discount">
              Discount( Percentage %)
            </label>
            <input
              className="w-[19rem] rounded-xl p-1 focus:outline-none border-2"
              type="number"
              min={1}
              value={discount}
              onChange={(e) => handleInputChange(e, "discount")}
              placeholder="discount"
            />
            <label className="font-bold" htmlFor="quantity">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              className="w-[19rem] rounded-xl p-1 focus:outline-none border-2"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => handleInputChange(e, "quantity")}
              placeholder="Enter Quantity"
            />

            <div className="p-[1rem] flex lg:flex-row flex-col gap-[2rem]">
              <button
                type="submit"
                className="py-[1rem] px-[2rem] text-white lg:text-lg rounded-xl font-bold bg-blue-500"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
        <div className="bg-white rounded-xl shadow-xl my-[3rem] p-[2rem] lg:w-1/2">
          <p className="font-bold text-lg mb-5">
            Upload Images (Min Dimensions 300 x 300 & Max Dimensions 700 * 700)
            <span className="text-red-500"> *</span>
          </p>
          <div className="flex flex-wrap gap-[1rem] justify-center items-center">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center border-2 border-dotted rounded-xl border-blue-500"
              >
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => handleImageChange(index, e)}
                />
                {image ? (
                  <img
                    className="w-[10rem] h-[15rem] object-cover rounded-xl "
                    src={URL.createObjectURL(image)}
                    alt={`Upload ${index + 1}`}
                  />
                ) : (
                  <div className="w-[8rem] h-[10rem] text-center flex flex-col items-center justify-center text-gray-400">
                    <FontAwesomeIcon icon={faCloud} size="3x" />
                    <p>Upload Image {index + 1}</p>
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-col w-[100%] gap-[1rem] mt-[2rem]">
              <label className="font-bold" htmlFor="size">
                HSN <span className="text-red-500">*</span>
              </label>
              <input
                className="w-[40vw] rounded-xl p-2 focus:outline-none border-2"
                type="text"
                value={HSN}
                onChange={(e) => handleInputChange(e, "HSN")}
                placeholder="HSN"
              />
              <label className="font-bold" htmlFor="keyfeatures">
                Key Features<span className="text-red-500"> *</span>
              </label>
              <textarea
                className="h-[20rem] rounded-xl p-1 focus:outline-none border-2"
                name="keyfeatures"
                placeholder="Key Features"
                value={keyFeatures}
                onChange={(e) => handleInputChange(e, "keyFeatures")}
              ></textarea>

              <label className="font-bold" htmlFor="length">
                Length(In CM)<span className="text-red-500">*</span>
              </label>
              <input
                className="w-[40vw] rounded-xl p-2 focus:outline-none border-2"
                type="text"
                value={length}
                onChange={(e) => handleInputChange(e, "length")}
                placeholder="length"
              />
              <label className="font-bold" htmlFor="length">
                Breadth(In CM) <span className="text-red-500">*</span>
              </label>
              <input
                className="w-[40vw] rounded-xl p-2 focus:outline-none border-2"
                type="text"
                value={breadth}
                onChange={(e) => handleInputChange(e, "breadth")}
                placeholder="breadth"
              />
              <label className="font-bold" htmlFor="height">
                Height (In CM) <span className="text-red-500">*</span>
              </label>
              <input
                className="w-[40vw] rounded-xl p-2 focus:outline-none border-2"
                type="text"
                value={height}
                onChange={(e) => handleInputChange(e, "height")}
                placeholder="height"
              />
              <label className="font-bold">
                Volumetric Weight Calculation (in KG):
              </label>
              <div className="w-[40vw] rounded-xl p-2 bg-gray-100 border-2">
                {volumetricWeight} kg
              </div>
              <label className="font-bold" htmlFor="Weight">
                Weight(In Kg)<span className="text-red-500">*</span>
              </label>
              <input
                className="w-[40vw] rounded-xl p-2 focus:outline-none border-2"
                type="text"
                value={weight}
                onChange={(e) => handleInputChange(e, "weight")}
                placeholder="Weight"
              />
              <label className="font-bold" htmlFor="size">
                Size
              </label>
              <input
                className="w-[40vw] rounded-xl p-2 focus:outline-none border-2"
                type="text"
                value={size}
                onChange={(e) => handleInputChange(e, "size")}
                placeholder="size"
              />
              <label className="font-bold" htmlFor="youtubeLink">
                Youtube Embed URL
              </label>
              <input
                className="w-[40vw] rounded-xl p-2 focus:outline-none border-2"
                type="text"
                value={youtubeLink}
                onChange={(e) => handleInputChange(e, "youtubeLink")}
                placeholder="youtube video link"
              />
              <label className="font-bold" htmlFor="gst">
                GST(%)
              </label>
              <input
                className="w-[40vw] rounded-xl p-2 focus:outline-none border-2"
                type="text"
                value={igstn}
                onChange={(e) => handleInputChange(e, "igstn")}
                placeholder="GST"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddtoProduct;
