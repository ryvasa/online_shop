import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const TopProducts = () => {
  const [productsArray, setProductsArray] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getProducts();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      // setProductsId(decoded.id);
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
        // setProductsId(decoded.id);
        setExpire(decoded.exp);
      }

      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );
  const getProducts = async () => {
    try {
      const response = await axiosJWT.get(`http://localhost:5000/products/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProductsArray(response.data);
      // navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };
  const products = productsArray
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="flex-1 w-full py-5 px-2 ">
      <div className=" w-full ">
        <div className="w-full pb-2 pt-5 flex justify-center text-md font-semibold">
          <span>New Join Member</span>
        </div>
        <table className="table w-full shadow-lg">
          <thead>
            <tr>
              <th></th>
              <th className="text-center">Product</th>
              <th className="text-center">Price</th>
              <th className="text-center">Sold</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td className="text-center text-xl ">{index + 1}</td>
                <td className="text-center">
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={
                            product.img ||
                            "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                          }
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{product.productName}</div>
                    </div>
                  </div>
                </td>
                <td className="text-center">$ {product.price.toFixed(2)}</td>
                <td className="text-center">{product.stock}</td>
                <td className="text-center">
                  <Link to={`/products/${product._id}`}>
                    <div className="tooltip flex text-center" data-tip="detail">
                      <FaEye className="text-purple-800" />
                    </div>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProducts;
