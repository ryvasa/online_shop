import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cleanProduct } from "../redux/cartRedux";

function Success() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cleanProduct());
  }, [dispatch]);
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="bg-primary p-8 rounded-lg drop-shadow-lg text-center">
        <div className="text-white text-6xl mb-6">&#10004;</div>
        <h1 className="text-4xl font-bold mb-4 text-white">Payment Success</h1>
        <Link to={"/"}>
          <button className="bg-white text-primary px-6 py-2 rounded hover:bg-white">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Success;
