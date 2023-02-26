import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { FaFileImage } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
const roles = [
  { value: "admin", color: "#6B21A8" },
  { value: "user", color: "#4B5563" },
];
const EditUser = () => {
  const currentId = useSelector((state) => state.user.currentUser._id);
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const [userId, setUserId] = useState("");
  const [inputs, setInputs] = useState("");
  const [user, setUser] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getSingleUser();
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
  const getSingleUser = async () => {
    try {
      const response = await axiosJWT.get(`http://localhost:5000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.otherDetails);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = async (e) => {
    e.preventDefault();
    if (file === null) {
      const user = { ...inputs };
      try {
        const response = await axiosJWT.put(
          `http://localhost:5000/users/${id}`,
          user,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate(`/users/${id}`);
        // navigate("/users");
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
          try {
            const response = await axiosJWT.put(
              `http://localhost:5000/users/${id}`,
              user,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            getSingleUser();
            // navigate("/users");
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
                  to={currentId === id ? `/users/${currentId}` : "/users"}
                >
                  {currentId === id ? "Profile" : " Users List"}
                </Link>
              </li>
              <li> {currentId === id ? "Edit Profile" : "Edit Users"}</li>
            </ul>
          </div>
          <div className="flex border mx-10 rounded-lg p-10 justify-center">
            <div className="flex-1    flex-wrap mx-3">
              <div className="flex justify-center">
                <img
                  src={
                    user.img ||
                    "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                  }
                  alt=""
                  className="object-cover border  rounded-full w-72 h-72 mt-20 mx-3"
                />
              </div>
              <div className="flex py-3 max-w-full justify-center">
                <label
                  htmlFor="file"
                  className=" btn bg-purple-800 border-none hover:bg-purple-500 shadow-md "
                >
                  <FaFileImage /> Avatar
                </label>
                <input
                  id="file"
                  name="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  style={{ display: "none" }}
                />
              </div>

              <div className="flex justify-center py-5">
                <span>ID : {user._id}</span>
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
                        placeholder={user.username}
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
                        placeholder={user.email}
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
                        placeholder={user.phone}
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
                      htmlFor="phone-number"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Curret Password
                    </label>
                    <div className="relative mt-2.5">
                      <div className="absolute inset-y-0 left-0 flex items-center">
                        <label htmlFor="currentPassword" className="sr-only">
                          currentPassword
                        </label>
                      </div>
                      <input
                        onChange={handleChange}
                        type="password"
                        name="currentPassword"
                        id="currentPassword"
                        autoComplete="tel"
                        className="block w-full rounded-md border-0 py-2 px-3.5 text-md leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      New Password
                    </label>
                    <div className="relative mt-2.5">
                      <div className="absolute inset-y-0 left-0 flex items-center">
                        <label htmlFor="newPassword" className="sr-only">
                          newPassword
                        </label>
                      </div>
                      <input
                        onChange={handleChange}
                        type="password"
                        name="newPassword"
                        id="newPassword"
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
                      Confirm New Password
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
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      User Role
                    </label>
                    <div className="flex items-center space-x-3">
                      {roles.map((role, index) => (
                        <label
                          className="border shadow-lg p-2 rounded-lg flex items-center justify-center"
                          key={index}
                        >
                          <input
                            type="radio"
                            name="role"
                            value={role.value}
                            onChange={handleChange}
                            className="radio h-8 w-8 border bg-gray-600 border-purple-800 border-opacity-10 rounded-full "
                            style={{ backgroundColor: role.color }}
                          />
                          <span className="p-1">{role.value}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <button
                    onClick={handleClick}
                    className="block w-full rounded-md bg-purple-800 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-800"
                  >
                    Update
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

export default EditUser;
