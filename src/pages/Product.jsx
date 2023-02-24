import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import jwt_decode from "jwt-decode";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
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
      setProduct(response.data);
      // navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex relative">
        <Sidebar />

        <div className=" flex-3 w-full pt-20 pl-56 flex-col pr-3 mb-10 justify-center min-h-screen ">
          <div className="text-sm breadcrumbs py-2">
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
                  to={"/products"}
                >
                  Products List
                </Link>
              </li>
              <li>Detail Product</li>
            </ul>
          </div>
          <div className="rounded-lg shadow-xl  border">
            <div className="font-semibold text-2xl py-3 text-center w-full">
              Products Detail
            </div>
            {product && product.img && (
              <div className="flex ">
                <div className="flex-1 py-10   flex-wrap mx-3">
                  <img
                    src={
                      product.img ||
                      "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                    }
                    alt=""
                    className=" border shadow-xl  object-cover w-11/12 mx-3 rounded-lg"
                  />
                </div>
                <div className="flex-1 py-10  px-4">
                  <div className="border p-5 w-full  shadow-lg rounded-lg">
                    <div className="flex pb-3 w-full">
                      <div className="flex-1 flex justify-between">
                        <span>Productt ID</span>
                        <span>:</span>
                      </div>
                      <div className="flex-1 px-3">{product._id}</div>
                    </div>
                    <div className="flex py-3 w-full">
                      <div className="flex-1 flex justify-between">
                        <span>Product</span>
                        <span>:</span>
                      </div>
                      <div className="flex-1 px-3">{product.productName}</div>
                    </div>
                    <div className="flex py-3 w-full">
                      <div className="flex-1 flex justify-between">
                        <span>Category</span>
                        <span>:</span>
                      </div>
                      <ul className="flex-1 flex px-3">
                        {product.categories.map((cat, index) => (
                          <li key={index} className="px-1">
                            {cat}
                            {product.categories.length - 1 === index
                              ? "."
                              : ","}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex py-3 w-full">
                      <div className="flex-1 flex justify-between">
                        <span>Size</span>
                        <span>:</span>
                      </div>
                      <ul className="flex-1 flex px-3">
                        {product.sizes.map((size, index) => (
                          <li key={index} className=" px-1">
                            {size}
                            {product.sizes.length - 1 === index ? "." : ","}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex py-3 w-full">
                      <div className="flex-1 flex justify-between">
                        <span>Colors</span>
                        <span>:</span>
                      </div>
                      <ul className="flex-1 flex px-3">
                        {product.colors.map((color, index) => (
                          <li key={index} className="flex px-1">
                            <div
                              className="rounded-full w-7 shadow-lg h-7"
                              style={{ backgroundColor: color }}
                            ></div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex py-3 w-full">
                      <div className="flex-1 flex justify-between">
                        <span>Price</span>
                        <span>:</span>
                      </div>

                      <div className="flex-1 px-3">
                        $ {product.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="flex max-w-full p-5 justify-center">
                    <Link
                      to={`/products/${product._id}/edit`}
                      className=" btn bg-purple-700 border-none hover:bg-purple-400 shadow-md "
                    >
                      <FaEdit /> <span className="mx-2">Edit</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-24 w-full bg-gradient-to-t from-base-200"></div>

      <Footer />
    </>
  );
};

export default Product;
