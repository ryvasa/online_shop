import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import jwt_decode from "jwt-decode";

const OrderList = () => {
  const { id } = useParams();
  const [orderId, setOrderId] = useState("");
  const [ordersArray, setOrdersArray] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getAllOrders();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setOrderId(decoded.id);
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
  const orders = ordersArray.slice().sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const getAllOrders = async () => {
    try {
      const response = await axiosJWT.get(`http://localhost:5000/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrdersArray(response.data);
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

              <li>Orders List</li>
            </ul>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="text-center"></th>
                  <th className="text-center">Order Date</th>
                  <th className="text-center">Total</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Username</th>
                  <th className="text-center"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id}>
                    <td className="text-center text-xl ">{index + 1}</td>
                    <td className="text-center">
                      <div className="flex items-center justify-start space-x-3">
                        <div>
                          <div className="font-bold">
                            {dayjs(order.createdAt).format(
                              "DD/MM/YYYY HH:mm:ss"
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      $ {(order.amount / 100).toFixed(2)}
                    </td>
                    <td className="text-center">{order.totalQuantity}</td>
                    <td className="text-center">
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
                    </td>
                    <td className="text-center">{order.userName}</td>
                    <th className="text-center">
                      <Link to={`/orders/${order._id}`}>
                        <button className="btn bg-purple-700 hover:bg-purple-400 text-white border-none shadow-lg btn-xs">
                          details
                        </button>
                      </Link>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="h-24 w-full bg-gradient-to-t to-gray-200 from-base-200"></div>

      <Footer />
    </>
  );
};

export default OrderList;
