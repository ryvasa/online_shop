import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { FaEye } from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
const NewestUsers = () => {
  const [id, setId] = useState("");
  const [usersArray, setUsersArray] = useState([]);
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
  const users = usersArray
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
  const getUser = async () => {
    try {
      const response = await axiosJWT.get("http://localhost:5000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsersArray(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  dayjs.extend(relativeTime);
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
              <th className="text-center">Username</th>
              <th className="text-center">Joined</th>
              <th className="text-center">Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td className="text-center text-xl ">{index + 1}</td>
                <td className="text-center">
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={
                            user.img ||
                            "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                          }
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.username}</div>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  {dayjs(user.createdAt).fromNow()}
                </td>
                <td className="text-center">{user.role}</td>
                <td className="text-center">
                  <Link to={`/users/${user._id}`}>
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

export default NewestUsers;
