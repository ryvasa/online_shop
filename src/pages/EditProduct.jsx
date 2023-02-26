import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import jwt_decode from "jwt-decode";
import { FaFileImage } from "react-icons/fa";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

const colors = [
  "red",
  "green",
  "blue",
  "black",
  "pink",
  "brown",
  "gray",
  "white",
  "purple",
  "yellow",
];
const sizes = ["XXS", "XS", "M", "L", "XL", "XXL"];
const categories = [
  "men",
  "women",
  "hat",
  "shoes",
  "casual",
  "tshirt",
  "sport",
];
const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [file, setFile] = useState(null);
  const [inputs, setInputs] = useState({});
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [selectedCat, setSelectedCat] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getProductById();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      // setProductId(decoded.id);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
      console.log(error);
    }
  };
  const axiosJWT = axios.create();

  const handleCat = (event) => {
    const value = event.target.value;
    const currentIndex = selectedCat.indexOf(value);
    const newSelectedCheckboxes = [...selectedCat];

    if (currentIndex === -1) {
      newSelectedCheckboxes.push(value);
    } else {
      newSelectedCheckboxes.splice(currentIndex, 1);
    }

    setSelectedCat(newSelectedCheckboxes);
  };
  const handleSize = (event) => {
    const value = event.target.value;
    const currentIndex = selectedSize.indexOf(value);
    const newSelectedCheckboxes = [...selectedSize];

    if (currentIndex === -1) {
      newSelectedCheckboxes.push(value);
    } else {
      newSelectedCheckboxes.splice(currentIndex, 1);
    }

    setSelectedSize(newSelectedCheckboxes);
  };
  const handleColor = (event) => {
    const value = event.target.value;
    const currentIndex = selectedColor.indexOf(value);
    const newSelectedCheckboxes = [...selectedColor];

    if (currentIndex === -1) {
      newSelectedCheckboxes.push(value);
    } else {
      newSelectedCheckboxes.splice(currentIndex, 1);
    }

    setSelectedColor(newSelectedCheckboxes);
  };

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        // setProductId(decoded.id);
        setExpire(decoded.exp);
      }

      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );
  const getProductById = async () => {
    try {
      const response = await axiosJWT.get(
        `http://localhost:5000/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedSize(response.data.sizes);
      setSelectedCat(response.data.categories);
      setSelectedColor(response.data.colors);

      // navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (file === null) {
      const data = {
        ...inputs,
        categories: selectedCat,
        sizes: selectedSize,
        colors: selectedColor,
      };

      try {
        const response = await axiosJWT.put(
          `http://localhost:5000/products/${id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate("/products");
        // navigate("/products");
      } catch (error) {
        console.log(error);
      }
    } else {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        async () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const data = {
            ...inputs,
            categories: selectedCat,
            sizes: selectedSize,
            colors: selectedColor,
            img: downloadURL,
          };

          try {
            const response = await axiosJWT.put(
              `http://localhost:5000/products/${id}`,
              data,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log(response);
            navigate("/products");
            // navigate("/products");
          } catch (error) {
            console.log(error);
          }
        }
      );
    }
  };
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <>
      <Navbar />
      <div className="flex relative">
        <Sidebar />

        {product && product.img && (
          <div className="flex-3 w-full pt-5 pb-20 pl-56     ">
            <div className="text-sm breadcrumbs pt-20">
              <ul>
                <li>
                  <Link
                    style={{ textDecoration: "none" }}
                    className="hover:border-purple-500 border-transparent border-b-2  "
                    to={"/"}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    style={{ textDecoration: "none" }}
                    className="hover:border-purple-500 border-transparent border-b-2  "
                    to={`/products`}
                  >
                    Product List
                  </Link>
                </li>
                <li>
                  <Link
                    style={{ textDecoration: "none" }}
                    className="hover:border-purple-500 border-transparent border-b-2  "
                    to={`/products/${product._id}`}
                  >
                    Product Detail
                  </Link>
                </li>
                <li> Edit Product</li>
              </ul>
            </div>
            <div className="flex border mx-10 rounded-lg shadow-lg p-10 justify-center">
              <div className="flex-1    flex-wrap mx-3">
                <img
                  src={
                    product.img ||
                    "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                  }
                  alt=""
                  className="object-cover p-1"
                />
                <div className="flex py-3 max-w-full justify-center">
                  <label
                    htmlFor="file"
                    className=" btn bg-purple-800 shadow-md hover:bg-purple-400 border-none"
                  >
                    <FaFileImage /> Product Image
                  </label>
                  <input
                    id="file"
                    name="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                    style={{ display: "none" }}
                  />
                </div>

                <div className="flex justify-center py-5">
                  <span>Product ID : {product._id}</span>
                </div>
              </div>
              <div className="isolate flex-1 bg-white ">
                <form className="mx-auto  max-w-xl ">
                  <div className=" gap-y-6 gap-x-8 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="productName"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        Product
                      </label>
                      <div className="mt-2.5">
                        <input
                          onChange={handleChange}
                          placeholder={product.productName}
                          type="text"
                          name="productName"
                          id="productName"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-2 px-3.5 text-md leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 pt-2">
                      <label
                        htmlFor="price"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        Price
                      </label>
                      <div className="mt-2.5">
                        <input
                          onChange={handleChange}
                          placeholder={product.price.toFixed(2)}
                          type="number"
                          name="price"
                          id="price"
                          autoComplete="price"
                          className="block w-full rounded-md border-0 py-2 px-3.5 text-md leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2 pt-2">
                      <label
                        htmlFor="stock"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        Stock
                      </label>
                      <div className="relative mt-2.5">
                        <input
                          onChange={handleChange}
                          placeholder={product.stock}
                          type="number"
                          name="stock"
                          id="stock"
                          className="block w-full rounded-md border-0 py-2 px-3.5 text-md leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2 pt-2">
                      <label
                        htmlFor="desc"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        Description
                      </label>
                      <div className="relative mt-2.5">
                        <textarea
                          placeholder={product.desc}
                          onChange={handleChange}
                          type="text"
                          name="desc"
                          id="desc"
                          className="textarea block w-full rounded-md border-0 py-2 px-3.5 text-md leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        ></textarea>
                      </div>
                    </div>
                    <div className="sm:col-span-2 pt-2  ">
                      <label
                        htmlFor="phone-number"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        Categories
                      </label>
                      <div className="sm:col-span-2  grid grid-cols-2">
                        {categories.map((cat, index) => (
                          <div
                            className="relative mt-2.5 flex items-center"
                            key={index}
                          >
                            <input
                              type="checkbox"
                              onChange={handleCat}
                              value={cat}
                              multiple
                              name="categories"
                              id="categories"
                              className="checkbox "
                            />
                            <label className="p-1">{cat}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="sm:col-span-2 pt-2  ">
                      <label
                        htmlFor="sizes"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        Categories
                      </label>
                      <div className="sm:col-span-2  grid grid-cols-2">
                        {sizes.map((size, index) => (
                          <div
                            className="relative mt-2.5 flex items-center"
                            key={index}
                          >
                            <input
                              type="checkbox"
                              onChange={handleSize}
                              value={size}
                              multiple
                              name="sizes"
                              id="sizes"
                              className="checkbox "
                            />
                            <label className="p-1">{size}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="sm:col-span-2 pt-2  ">
                      <label
                        htmlFor="colors"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        Colors
                      </label>
                      <div className="sm:col-span-2  grid grid-cols-2">
                        {colors.map((color, index) => (
                          <div
                            className="relative gap-2 mt-2.5 flex items-center"
                            key={index}
                          >
                            <input
                              type="checkbox"
                              onChange={handleColor}
                              value={color}
                              multiple
                              name="colors"
                              id="colors"
                              className="checkbox p-1"
                            />
                            <label htmlFor="colors p-1">
                              <div
                                className="p-1 w-7 h-7 rounded-full"
                                style={{ backgroundColor: color }}
                              ></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-10">
                    <button
                      onClick={handleClick}
                      className="block w-full rounded-md bg-purple-800 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-800"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="h-24 w-full bg-gradient-to-t from-base-200"></div>
      <Footer />
    </>
  );
};

export default EditProduct;
