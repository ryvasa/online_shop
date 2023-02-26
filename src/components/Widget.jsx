import axios from "axios";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  FaDollarSign,
  FaShoppingBag,
  FaTruck,
  FaUserAlt,
  FaUserLock,
} from "react-icons/fa";

const Widget = () => {
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [income, setIncome] = useState([]);
  const [orders, setOrder] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getOrders();
    getUsers();
    getIncome();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setUserId(decoded.id);
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
        setUserId(decoded.id);
        setExpire(decoded.exp);
      }

      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );
  const getOrders = async () => {
    try {
      const response = await axiosJWT.get(
        `http://localhost:5000/orders/get/stats`,
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
  const getUsers = async () => {
    try {
      const response = await axiosJWT.get(
        `http://localhost:5000/users/get/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getIncome = async () => {
    try {
      const response = await axiosJWT.get(
        `http://localhost:5000/orders/get/income`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIncome(response.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  income.sort((a, b) => {
    if (a._id.year > b._id.year) return -1;
    if (a._id.year < b._id.year) return 1;
    if (a._id.month > b._id.month) return -1;
    if (a._id.month < b._id.month) return 1;
    return 0;
  });
  orders.sort((a, b) => {
    if (a._id.year > b._id.year) return -1;
    if (a._id.year < b._id.year) return 1;
    if (a._id.month > b._id.month) return -1;
    if (a._id.month < b._id.month) return 1;
    return 0;
  });
  users.sort((a, b) => {
    if (a._id.year > b._id.year) return -1;
    if (a._id.year < b._id.year) return 1;
    if (a._id.month > b._id.month) return -1;
    if (a._id.month < b._id.month) return 1;
    return 0;
  });

  const latestIncome = income[0];
  const latestOrders = orders[0];
  const newJoinUsers = users[0];

  return (
    <div className="py-2 pl-5 flex-1">
      <div className="stats shadow-lg mr-4  mb-4 bg-blue-700  text-white">
        <div className="stat ">
          <div className="stat-title text-white font-semibold">New Users</div>
          {users && newJoinUsers && (
            <>
              <div className="stat-value flex  text-white">
                <div className="">{newJoinUsers.total}</div>
                <div className="text-sm font-semibold flex justify-center items-center">
                  <FaUserAlt className="ml-2  w-4 h-4 mr-1" />
                  <div className="text-lg font-bold">
                    {newJoinUsers.total > 1 ? " Users" : " User"}
                  </div>
                </div>
              </div>
              <div className="stat-desc text-white font-medium">
                {(users[0].total / users[1].total) * 100}%
                {users[0].total > users[1].total ? "more" : "less"} than last
                month
              </div>
            </>
          )}
        </div>
      </div>
      <div className="stats shadow-lg mr-4  mb-4 bg-purple-500  text-white">
        <div className="stat">
          <div className="stat-title text-white font-semibold">Orders</div>
          {orders && latestOrders && (
            <>
              <div className="stat-value flex  text-white">
                <div className="">{latestOrders.total}</div>
                <div className="text-sm font-semibold flex justify-center items-center">
                  <FaTruck className="ml-2 w-5 h-5 mr-1" />
                  <div className="text-lg font-bold">
                    {latestOrders.total > 1 ? " Orders" : " Order"}
                  </div>
                </div>
              </div>
              <div className="stat-desc text-white font-medium">
                {(orders[0].total / orders[1].total) * 100}%
                {orders[0].total > orders[1].total ? "more" : "less"} than last
                month
              </div>
            </>
          )}
        </div>
      </div>
      <div className="stats shadow-lg mr-4  mb-4 bg-gray-400  text-white">
        <div className="stat">
          <div className="stat-title text-white font-semibold">Income</div>
          {income && latestIncome && (
            <>
              <div className="stat-value text-white">
                $ {(latestIncome.totalPrice / 100).toFixed(2)}
              </div>
              <div className="stat-desc text-white font-medium">
                {(income[0].totalPrice / income[1].totalPrice) * 100}%
                {income[0].totalPrice > income[1].totalPrice
                  ? " more"
                  : " less"}
                than last month
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Widget;
