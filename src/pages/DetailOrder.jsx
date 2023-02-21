import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

export default function DetailOrder() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  if (!user) {
    navigate("/");
    return;
  }
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];

  const order = useSelector((state) =>
    state.order.orders.find((order) => order._id === orderId)
  );

  return (
    <>
      <Navbar />
      <>
        <div className="text-md pl-3 breadcrumbs pt-20 ">
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/order"}>Order</Link>
            </li>
            <li>Order Detail</li>
          </ul>
        </div>
        <div className=" min-h-screen  py-6 px-4 sm:px-6 max-w-full  ">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Order Detail
            </h3>
          </div>
          <div className="flex w-full">
            <div className="flex-1">
              <div className="overflow-hidden bg-white  sm:rounded-lg">
                <div className="">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Order ID
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {order._id}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Order Date
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {dayjs(order.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Total Quantity
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {order.totalQuantity} pcs
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Total Price
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        $ {(order.amount / 100).toFixed(2)}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {order.address}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-8 mt-4">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.products.map((product, index) => (
                      <li key={index} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.img[3]}
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
                </div>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900 border-t-2 border-primary">
                <p className="mt-2">Total</p>
                <p className="mt-2 text-xl font-bold">
                  $ {(order.amount / 100).toFixed(2)}
                </p>
              </div>

              <div className="mt-6 max-w-full justify-end flex">
                <Link
                  to={"/order"}
                  className=" w-40 flex items-center justify-center rounded-md border border-primary bg-white px-6 py-3 text-base font-medium text-primary shadow-sm hover:text-white hover:bg-indigo-700"
                >
                  Back to order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
      <Footer />
    </>
  );
}
