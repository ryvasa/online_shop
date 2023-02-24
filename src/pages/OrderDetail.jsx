import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const OrderDetail = () => {
  const { id } = useParams();
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getSingleOrders();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setOrderId(decoded.id);
      setExpire(decoded.exp);
    } catch (error) {
      console.log(error);

      if (error.response) {
        navigate("/");
      }
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
        setOrderId(decoded.id);
        setExpire(decoded.exp);
      }

      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  const getSingleOrders = async () => {
    try {
      const response = await axiosJWT.get(
        `http://localhost:5000/orders/find/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex relative">
        <Sidebar />
        <div className="flex-3 w-full pt-20 pb-10 pl-56 flex-col pr-3 justify-center bg-gray-200  ">
          <div className="text-sm breadcrumbs py-3">
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
                  to={"/orders"}
                >
                  Orders List
                </Link>
              </li>

              <li>Order Detail</li>
            </ul>
          </div>
          {order && order.products && (
            <div className="justify-center py-5 rounded-lg bg-white shadow-lg w-full">
              <div className="flex w-full justify-center ">
                <div className="flex-1 p-5 pt-20">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.products.map((product) => (
                      <li key={product._id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.img[3]}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <Link to={`/products/${product._id}`}>
                                  {product.productName}
                                </Link>
                              </h3>
                              <p className="ml-4">$ {product.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.color}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">
                              Qty {product.quantity}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-between border-t-2 border-purple-800 my-5">
                    <div className="text-lg font-semibold">Total</div>
                    <div className="text-lg font-semibold">
                      $ {(order.amount / 100).toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="flex-1 w-full p-5">
                  <div className="flex justify-center w-fu font-semibold text-lg p-3">
                    Detail Order
                  </div>
                  <div className="flex w-full p-3">
                    <div className="flex-1 flex justify-between">
                      <span>Order ID</span>
                      <span>:</span>
                    </div>
                    <div className="flex-1 pl-1">
                      <span>{order._id}</span>
                    </div>
                  </div>
                  <div className="flex w-full p-3">
                    <div className="flex-1 flex justify-between">
                      <span>User ID</span>
                      <span>:</span>
                    </div>
                    <div className="flex-1 pl-1">
                      <span>{order.userId}</span>
                    </div>
                  </div>
                  <div className="flex w-full p-3">
                    <div className="flex-1 flex justify-between">
                      <span>Username</span>
                      <span>:</span>
                    </div>
                    <div className="flex-1 pl-1">
                      <span>{order.userName}</span>
                    </div>
                  </div>

                  <div className="flex w-full p-3">
                    <div className="flex-1 flex justify-between">
                      <span>Order Date</span>
                      <span>:</span>
                    </div>
                    <div className="flex-1 pl-1">
                      <span>
                        {dayjs(order.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full p-3">
                    <div className="flex-1 flex justify-between">
                      <span>Quantity</span>
                      <span>:</span>
                    </div>
                    <div className="flex-1 pl-1">
                      <span>{order.totalQuantity}</span>
                    </div>
                  </div>
                  <div className="flex w-full p-3">
                    <div className="flex-1 flex justify-between">
                      <span>Total</span>
                      <span>:</span>
                    </div>
                    <div className="flex-1 pl-1">
                      <span>$ {(order.amount / 100).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex w-full p-3">
                    <div className="flex-1 flex justify-between">
                      <span>Address</span>
                      <span>:</span>
                    </div>
                    <div className="flex-1 pl-1">
                      <span>{order.address}</span>
                    </div>
                  </div>
                  <div className="flex w-full p-3">
                    <div className="flex-1 flex justify-between">
                      <span>Status</span>
                      <span>:</span>
                    </div>
                    <div className="flex-1 pl-1">
                      <span>
                        {order.status === "Pending" && (
                          <div className="badge badge-info  text-white ">
                            {order.status}
                          </div>
                        )}
                        {order.status === "Success" && (
                          <div className="badge badge-success text-white ">
                            {order.status}
                          </div>
                        )}
                        {order.status === "Error" && (
                          <div className="badge badge-error text-white ">
                            {order.status}
                          </div>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {order.status === "Pending" && (
                <div className="flex justify-end gap-5 w-full pr-5">
                  <button className="btn text-white border-none shadow-lg hover:bg-red-400 bg-red-600">
                    Reject Order
                  </button>
                  <button className="btn text-white border-none shadow-lg hover:bg-purple-500 bg-purple-800 ">
                    Confirm Order
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="h-24 w-full bg-gradient-to-t to-gray-200 from-base-200"></div>

      <Footer />
    </>
  );
};

export default OrderDetail;
