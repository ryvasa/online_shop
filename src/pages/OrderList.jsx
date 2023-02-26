import axios from "axios";
import dayjs from "dayjs";
import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import jwt_decode from "jwt-decode";
import { FaInfoCircle } from "react-icons/fa";

const OrderList = () => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [orderId, setOrderId] = useState("");
  const [userId, setUserId] = useState("");
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

  const getId = (idGated) => {
    setOpen(true);
    setOrderId(idGated);
    return;
  };
  const updateStatusOrder = async () => {
    try {
      const response = await axiosJWT.put(
        `http://localhost:5000/orders/${orderId}`,
        { status: "Success" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpen(false);
      getAllOrders();
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
                  <th className="text-center">Order Id</th>
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
                    <td className="text-center font-bold ">{index + 1}</td>
                    <td className="text-center ">{order._id}</td>
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
                        <div className="badge badge-info  text-white shadow-lg">
                          {order.status}
                        </div>
                      )}
                      {order.status === "Success" && (
                        <div className="badge badge-success text-white shadow-lg">
                          {order.status}
                        </div>
                      )}
                      {order.status === "Failed" && (
                        <div className="badge badge-error text-white shadow-lg">
                          {order.status}
                        </div>
                      )}
                    </td>
                    <td className="text-center">{order.userName}</td>
                    <th className="text-end ">
                      <div className="flex items-center justify-end">
                        {order.status === "Pending" && (
                          <button
                            onClick={() => getId(order._id)}
                            className="btn mr-1 bg-purple-700 hover:bg-white border hover:border-purple-700 border-purple-700 hover:text-purple-700  text-white  shadow-lg btn-xs"
                          >
                            Confirm
                          </button>
                        )}
                        <Link to={`/orders/${order._id}`}>
                          <button className="btn bg-white border-purple-700 hover:text-white hover:border-purple-700 hover:bg-purple-700 text-purple-700  border shadow-lg btn-xs">
                            <FaInfoCircle className="mr-1" /> details
                          </button>
                        </Link>
                      </div>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="h-24 w-full bg-gradient-to-t to-gray-200 from-base-200"></div>
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
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-purple-600"
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
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={updateStatusOrder}
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

export default OrderList;
