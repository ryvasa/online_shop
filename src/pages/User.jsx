import axios from "axios";
import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";

const User = () => {
  const currentId = useSelector((state) => state.user.currentUser._id);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const cancelButtonRef = useRef(null);
  const { id } = useParams();
  const [userId, setUserId] = useState("");
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

  const deleteUser = async () => {
    try {
      const response = await axiosJWT.delete(
        `http://localhost:5000/users/${id}`,
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
  };
  return (
    <>
      <Navbar />
      <div className="flex relative">
        <Sidebar />

        <div className="flex-3 w-full pt-20 pl-56 flex-col pr-3 mb-10 justify-center min-h-screen">
          <div className="flex justify-between w-full">
            <div className="text-sm breadcrumbs py-2">
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

                <li>User Detail</li>
              </ul>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="btn  bg-red-600 hover:bg-red-400 text-white border-none shadow-lg btn-xs"
            >
              delete
            </button>
          </div>
          <div className="rounded-lg shadow-xl  border">
            <div className="font-semibold text-2xl py-3 text-center w-full">
              User Detail
            </div>
            <div className="flex ">
              <div className="flex-1 pt-5   flex-wrap mx-3">
                <div className="flex justify-center">
                  <img
                    src={
                      user.img ||
                      "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                    }
                    alt=""
                    className=" border shadow-xl rounded-full w-56 h-56 object-cover mx-3"
                  />
                </div>

                <div className="flex justify-center py-5">
                  <span>ID : {user._id}</span>
                </div>
              </div>
              <div className="flex-1 py-10  px-4">
                <div className="border p-5 w-full  rounded-lg">
                  <div className="flex py-3 w-full">
                    <div className="flex-1 flex justify-between">
                      <span>Username</span>
                      <span>:</span>
                    </div>
                    <div className="flex-1 px-3">{user.username}</div>
                  </div>
                  <div className="flex py-3 w-full">
                    <div className="flex-1 flex justify-between">
                      <span>Email</span>
                      <span>:</span>
                    </div>
                    <div className="flex-1 px-3">{user.email}</div>
                  </div>
                  <div className="flex py-3 w-full">
                    <div className="flex-1 flex justify-between">
                      <span>Phone</span>
                      <span>:</span>
                    </div>
                    <div className="flex-1 px-3">{user.phone}</div>
                  </div>
                  <div className="flex py-3 w-full">
                    <div className="flex-1 flex justify-between">
                      <span>Role</span>
                      <span>:</span>
                    </div>
                    <div className="flex-1 px-3">{user.role}</div>
                  </div>
                </div>
                <div className="flex max-w-full p-5 justify-center">
                  <Link
                    to={`/users/${user._id}/edit`}
                    className=" btn bg-purple-700 border-none hover:bg-purple-400 shadow-md "
                  >
                    <FaEdit /> <span className="mx-2">Edit</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 "
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed pl-56 inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative self-auto transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Delete Users
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete this user? All of
                            data will be permanently removed. This action cannot
                            be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={deleteUser}
                    >
                      Deactivate
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Footer />
    </>
  );
};

export default User;
