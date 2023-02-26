import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import jwt_decode from "jwt-decode";

const Chart = () => {
  const namaBulan = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OKT",
    "NOV",
    "DES",
  ];
  // const [data, setData] = useState(initialData);
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

  // income.sort((a, b) => {
  //   if (a._id.year > b._id.year) return -1;
  //   if (a._id.year < b._id.year) return 1;
  //   if (a._id.month > b._id.month) return -1;
  //   if (a._id.month < b._id.month) return 1;
  //   return 0;
  // });
  // orders.sort((a, b) => {
  //   if (a._id.year > b._id.year) return -1;
  //   if (a._id.year < b._id.year) return 1;
  //   if (a._id.month > b._id.month) return -1;
  //   if (a._id.month < b._id.month) return 1;
  //   return 0;
  // });
  // users.sort((a, b) => {
  //   if (a._id.year > b._id.year) return -1;
  //   if (a._id.year < b._id.year) return 1;
  //   if (a._id.month > b._id.month) return -1;
  //   if (a._id.month < b._id.month) return 1;
  //   return 0;
  // });

  // const latestIncome = income;
  // const latestOrders = orders;
  // const newJoinUsers = users;
  // console.log(latestIncome);
  // console.log(latestOrders);
  // console.log(newJoinUsers);
  const combinedData = namaBulan.map((bulan, index) => {
    const order = orders[index] || { total: 0 };
    const user = users[index] || { total: 0 };
    const incomeData = income[index] || { totalPrice: 0 };
    return {
      name: bulan,
      orders: order.total,
      users: user.total,
      income: incomeData.totalPrice / 100,
    };
  });
  return (
    <div className="flex-2" style={{ width: "calc(100% - 224px)" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={combinedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#1d4ed8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="orders" stroke="#a855f7" />
          <Line type="monotone" dataKey="income" stroke="#000205" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
