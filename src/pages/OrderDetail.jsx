import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const OrderDetail = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [open0, setOpen0] = useState(false);
  const cancelButtonRef = useRef(null);
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getSingleOrders();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setOrderId(decoded.id);
      setExpire(decoded.exp);
    } catch (error) {
      console.log(error);

      if (error.response) {
        navigate("/");
      }
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

  const getSingleOrders = async () => {
    try {
      const response = await axiosJWT.get(
        `http://localhost:5000/orders/${id}`,
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
  const updateStatusOrder = async (status) => {
    try {
      const response = await axiosJWT.put(
        `http://localhost:5000/orders/${id}`,
        { status: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpen(false);
      setOpen0(false);
      getSingleOrders();
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
              <li>
                <Link
                  style={{ textDecoration: "none" }}
                  className="hover:border-purple-500 border-transparent border-b-2  "
                  to={"/orders"}
                >
                  Orders List
                </Link>
              </li>

              <li>Order Detail</li>
            </ul>
          </div>
          {order && order.products && (
            <div className="justify-center py-5 rounded-lg bg-white shadow-lg w-full">
              <div className="flex w-full justify-center ">
                <div className="flex-1 p-5 pt-20">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.products.map((product) => (
                      <li key={product._id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.img}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <Link to={`/products/${product._id}`}>
                                  {product.productName}
                                </Link>
                              </h3>
                              <p className="ml-4">$ {product.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.color}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">
                              Qty {product.quantity}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-between border-t-2 border-purple-800 my-5">
                    <div className="text-lg font-semibold">Total</div>
                    <div className="text-lg font-semibold">
                      $ {(order.amount / 100).toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="flex-1 w-full p-5">
                  <div className="flex justify-center w-fu font-semibold text-lg p-3">
                    Detail Order
                  </div>
                  <div className="flex w-full p-3">
                    <div className="flex-1 flex justify-between">
                      <span>Order ID</span>
                      <span>:</span>
                    </div>
                    <div className="flex-1 pl-1">
                      <span>{order._id}</span>
                    </div>
                  </div>
                  <div className="flex w-full p-3">
                    <div className="flex-1 flex justify-between">
                      <span>User ID</span>
                      <span>:</span>
                    </div>
                    <div className="flex-1 pl-1">
                      <span>{order.userId}</span>
                    </div>
                  </div>
                  <div className="flex w-full p-3">
                    <div className="flex-1 flex justify-between">
                      <span>Username</span>
                      <span>:</span>
                    </div>
                    <div className="flex-1 pl-1">
                      <span>{order.userName}</span>
                    </div>
                  </div>

                  <div className="flex w-full p-3">
                    <div className="flex-1 flex justify-between">
                      <span>Order Date</span>
                      <span>:</span>
                    </div>
                    <div className="flex-1 pl-1">
                      <span>
                        {dayjs(order.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full p-3">
                    <div className="flex-1 flex justify-between">
                      <span>Quantity</span>
                      <span>:</span>
                    </div>
                    <div className="flex-1 pl-1">
                      <span>{order.totalQuantity}</span>
                    </div>
                  </div>
                  <div className="flex w-full p-3">
                    <div className="flex-1 flex justify-between">
                      <span>Total</span>
                      <span>:</span>
                    </div>
                    <div className="flex-1 pl-1">
                      <span>$ {(order.amount / 100).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex w-full p-3">
                    <div className="flex-1 flex justify-between">
                      <span>Address</span>
                      <span>:</span>
                    </div>
                    <div className="flex-1 pl-1">
                      <span>{order.address}</span>
                    </div>
                  </div>
                  <div className="flex w-full p-3">
                    <div className="flex-1 flex justify-between">
                      <span>Status</span>
                      <span>:</span>
                    </div>
                    <div className="flex-1 pl-1">
                      <span>
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
                        {order.status === "Failed" && (
                          <div className="badge badge-error text-white ">
                            {order.status}
                          </div>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {order.status === "Pending" && (
                <div className="flex justify-end gap-5 w-full pr-5">
                  <button
                    onClick={() => setOpen0(true)}
                    className="btn text-white border-none shadow-lg hover:bg-red-400 bg-red-600"
                  >
                    Reject Order
                  </button>
                  <button
                    onClick={() => setOpen(true)}
                    className="btn text-white border-none shadow-lg hover:bg-purple-500 bg-purple-800 "
                  >
                    Confirm Order
                  </button>
                </div>
              )}
            </div>
          )}
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
                          Confirm Order
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to confirm this order?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => updateStatusOrder("Success")}
                    >
                      Confirm
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
      <Transition.Root show={open0} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 "
          initialFocus={cancelButtonRef}
          onClose={setOpen0}
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
                          Reject Order
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to reject this order?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => updateStatusOrder("Failed")}
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen0(false)}
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

export default OrderDetail;
