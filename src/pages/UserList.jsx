import axios from "axios";
import { Fragment, useRef, useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import jwt_decode from "jwt-decode";

const UserList = () => {
  const [id, setId] = useState("");
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getUser();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setId(decoded._id);
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
        setId(decoded._id);
        setExpire(decoded.exp);
      }

      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );
  const getUser = async () => {
    try {
      const response = await axiosJWT.get("http://localhost:5000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
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
          <div className="flex justify-between">
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

                <li>Users List</li>
              </ul>
            </div>
            <Link to={"/users/adduser"}>
              <button className="btn bg-purple-700 hover:bg-purple-400  border-none btn-sm  text-white">
                Add New Users
              </button>
            </Link>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="table relative z-[0] w-full">
              <thead>
                <tr>
                  <th className="text-center relative -z-[10]"></th>
                  <th className="text-center w-10">Username</th>
                  <th className="text-center w-10">Email</th>
                  <th className="text-center">Phone</th>
                  <th className="text-center">Status</th>
                  <th className="text-center"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td className="text-center text-xl ">{index + 1}</td>
                    <td className="text-center">
                      <div className="flex items-center justify-start space-x-3">
                        <div className="avatar">
                          <div className="rounded-full w-10 h-10">
                            <img
                              src={
                                user.img ||
                                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                              }
                              alt="rounded-full"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">{user.email}</td>
                    <td className="text-center">{user.phone}</td>
                    <th className="text-center">{user.role}</th>
                    <th className="text-center">
                      <Link to={`/users/${user._id}`} className="px-5">
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

export default UserList;
