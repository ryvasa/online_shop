import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { FaFileImage } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

const AddUser = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
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
  const handleClick = async (e) => {
    e.preventDefault();
    if (file === null) {
      const user = { ...inputs };
      try {
        const response = await axiosJWT.post(
          `http://localhost:5000/users`,
          user,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate("/users");
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
          const user = { ...inputs, img: downloadURL };
          console.log(downloadURL);
          try {
            const response = await axiosJWT.post(
              `http://localhost:5000/users`,
              user,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            navigate("/users");
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
                  to={"/users"}
                >
                  Users List
                </Link>
              </li>
              <li>Add Users</li>
            </ul>
          </div>
          <div className="flex border shadow-lg mx-10 rounded-lg p-10 justify-center">
            <div className="flex-1    flex-wrap mx-3">
              <div className="flex justify-center">
                <img
                  src={
                    "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                  }
                  alt=""
                  className="object-cover border  rounded-full w-72 h-72 mt-20 mx-3"
                />
              </div>
              <div className="flex py-3 max-w-full justify-center">
                <label
                  htmlFor="file"
                  className=" btn bg-purple-800 hover:bg-purple-400 border-none shadow-md "
                >
                  <FaFileImage /> Avatar
                </label>
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  id="file"
                  name="file"
                  type="file"
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div className="isolate flex-1 bg-white ">
              <form className="mx-auto  max-w-xl ">
                <div className=" gap-y-6 gap-x-8 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Username
                    </label>
                    <div className="mt-2.5">
                      <input
                        onChange={handleChange}
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-2 px-3.5 text-md leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2.5">
                      <input
                        onChange={handleChange}
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-2 px-3.5 text-md leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone-number"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Phone number
                    </label>
                    <div className="relative mt-2.5">
                      <input
                        onChange={handleChange}
                        type="tel"
                        name="phone"
                        id="phone"
                        autoComplete="tel"
                        className="block w-full rounded-md border-0 py-2 px-3.5 text-md leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="relative mt-2.5">
                      <div className="absolute inset-y-0 left-0 flex items-center">
                        <label htmlFor="password" className="sr-only">
                          password
                        </label>
                      </div>
                      <input
                        onChange={handleChange}
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="tel"
                        className="block w-full rounded-md border-0 py-2 px-3.5 text-md leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Confirm Password
                    </label>
                    <div className="relative mt-2.5">
                      <div className="absolute inset-y-0 left-0 flex items-center">
                        <label htmlFor="confirmPassword" className="sr-only">
                          confirmPassword
                        </label>
                      </div>
                      <input
                        onChange={handleChange}
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        autoComplete="tel"
                        className="block w-full rounded-md border-0 py-2 px-3.5 text-md leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      />
                    </div>
                  </div>
                </div>
                {error && (
                  <span className="text-red-600 flex justify-start w-full mt-5">
                    {error}
                  </span>
                )}
                <div className="mt-5">
                  <button
                    onClick={handleClick}
                    className="btn bg-purple-800 hover:bg-purple-400 text-white border-none"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="h-24 w-full bg-gradient-to-t from-base-200"></div>
      <Footer />
    </>
  );
};

export default AddUser;
