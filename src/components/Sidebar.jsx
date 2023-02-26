import { MdSpaceDashboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import {
  FaDollarSign,
  FaShoppingBag,
  FaUserAlt,
  FaUserLock,
} from "react-icons/fa";
import { IoShirt } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logoutFailure, logoutStart, logoutSuccess } from "../redux/userRedux";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";

const Sidebar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [userId, setUserId] = useState("");
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getAllOrders();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(logoutStart());
    try {
      const res = await axios.delete("http://localhost:5000/logout", user._id);
      dispatch(logoutSuccess());
      navigate("/login");
    } catch (err) {
      dispatch(logoutFailure());
    }
  };
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
  const getAllOrders = async () => {
    try {
      const response = await axiosJWT.get(`http://localhost:5000/notiforders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed top-0 w-0 z-[50]">
      <div className=" h-full  flex-1 w-52">
        <div className="drawer drawer-mobile pt-20 bg-white shadow-xl">
          <div className="drawer-side">
            <ul className="menu w-52 bg-base-100 text-base-content   ">
              <li className="hover:bg-purple-600 rounded-r-xl">
                <Link
                  to={"/"}
                  className="text-md font-medium  text-black group hover:text-white"
                >
                  <MdSpaceDashboard className="w-5 h-5 text-purple-800 group-hover:text-white" />
                  Dasboard
                </Link>
              </li>
              <li className="hover:bg-purple-600 rounded-r-xl">
                <Link
                  to={"/users"}
                  className="text-md font-medium  text-black group hover:text-white"
                >
                  <FaUserAlt className="w-5 h-5 text-purple-800 group-hover:text-white" />
                  User
                </Link>
              </li>
              <li className="hover:bg-purple-600 rounded-r-xl">
                <Link
                  to={"/products"}
                  className="text-md font-medium  text-black group hover:text-white"
                >
                  <IoShirt className="w-5 h-5 text-purple-800 group-hover:text-white" />
                  Product
                </Link>
              </li>
              <li className="hover:bg-purple-600 rounded-r-xl">
                <Link
                  to={"/orders"}
                  className="text-md font-medium w-full text-black group hover:text-white"
                >
                  <div className="flex justify-between w-full">
                    <div className="flex">
                      <FaShoppingBag className="w-5 h-5 text-purple-800 group-hover:text-white" />
                      <span className="ml-3">Order</span>
                    </div>
                    <div className="bg-purple-800 h-5 w-5 group-hover:bg-white group-hover:text-purple-800 rounded-full flex items-center justify-center shadow-md text-sm text-white">
                      {orders.length}
                    </div>
                  </div>
                </Link>
              </li>
              <li className="hover:bg-purple-600 rounded-r-xl">
                <Link
                  to={"/transaction"}
                  className="text-md font-medium  text-black group hover:text-white"
                >
                  <FaDollarSign className="w-5 h-5 text-purple-800 group-hover:text-white" />
                  Transaction
                </Link>
              </li>
              <li className="hover:bg-purple-600 rounded-r-xl">
                <button
                  onClick={handleClick}
                  className="text-md font-medium  text-black group hover:text-white"
                >
                  <FaUserLock className="w-5 h-5 text-purple-800 group-hover:text-white" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
