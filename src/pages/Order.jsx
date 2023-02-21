import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getOrders } from "../redux/apiCalls";
import Notfound from "./Notfound";

const Order = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  if (!user) {
    navigate("/");
    return;
  }

  const userId = user._id;
  const dispatch = useDispatch();
  useEffect(() => {
    getOrders(userId, dispatch);
  }, [dispatch]);
  const dataArray = useSelector((state) => state.order.orders);
  const datas = dataArray.slice().sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  return (
    <>
      {user ? (
        <>
          <Navbar />
          <>
            <div className="text-md pl-3 breadcrumbs pt-20 ">
              <ul>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>Order</li>
              </ul>
            </div>
            <div className="overflow-x-auto w-full pb-20">
              <div className="flex pb-4 pl-3 justify-center items-center ">
                <span className="font-bold text-3xl text-primary drop-shadow">
                  Your order
                </span>
              </div>
              <table className="table w-full  pb-10">
                <thead>
                  <tr>
                    <th className="text-center">Order Date</th>
                    <th className="text-center">Total Price</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {datas.map((data) => (
                    <tr key={data._id}>
                      <td className="text-center flex-1">
                        {dayjs(data.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                      </td>
                      <td className="text-center flex-1">
                        $ {(data.amount / 100).toFixed(2)}
                      </td>
                      <td className="text-center flex-1">
                        {data.totalQuantity}
                      </td>
                      <td className="text-center flex-1">
                        {data.status === "Pending" && (
                          <div className="badge badge-info text-white ">
                            {data.status}
                          </div>
                        )}
                        {data.status === "Success" && (
                          <div className="badge badge-success text-white ">
                            {data.status}
                          </div>
                        )}
                        {data.status === "Error" && (
                          <div className="badge badge-error text-white ">
                            {data.status}
                          </div>
                        )}
                      </td>
                      <td className="text-center flex-1">
                        <Link to={`/order/${data._id}`}>
                          <button className="btn btn-primary ">details</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
          <Footer />
        </>
      ) : (
        <Notfound />
      )}
    </>
  );
};

export default Order;
