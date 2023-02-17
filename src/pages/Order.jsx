import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getOrders } from "../redux/apiCalls";

const Order = () => {
  const userId = useSelector((state) => state.user.currentUser._id);
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
      <Navbar />
      <div className="overflow-x-auto w-full py-20">
        <Link to={"/"} className="mb-4 flex  pl-4  items-center">
          <FaAngleLeft />
          Back to home page
        </Link>
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
                <td className="text-center flex-1">{data.totalQuantity}</td>
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
      <Footer />
    </>
  );
};

export default Order;
