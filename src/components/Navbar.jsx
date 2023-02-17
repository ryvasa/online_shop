import { FaUserAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutFailure, logoutStart, logoutSuccess } from "../redux/userRedux";
import axios from "axios";

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(logoutStart());
    try {
      const res = await axios.post("http://localhost:5000/logout");
      dispatch(logoutSuccess(res.cookies));
    } catch (err) {
      dispatch(logoutFailure());
    }
  };
  return (
    <div className="navbar  bg-white h-9 drop-shadow-lg fixed   z-10">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost normal-case text-xl">
          DDshop
        </Link>
      </div>

      <div className="flex-none">
        <div className="dropdown dropdown-end pr-3 ">
          <button class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {cart.quantity > 0 && (
                <span className="badge badge-sm indicator-item">
                  {cart.quantity}
                </span>
              )}
            </div>
          </button>
          <label tabIndex={0} className="btn btn-ghost  btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cart.quantity > 0 && (
                <span className="badge badge-sm indicator-item">
                  {cart.quantity}
                </span>
              )}
            </div>
          </label>

          <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body w-full flex text-center">
              <span className="font-bold text-lg">{cart.quantity} Items</span>
              <span className="text-info">Subtotal: ${cart.total}</span>
              <div className="card-actions">
                <Link to={"/cart"} className="mx-auto">
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {!user ? (
          <div className="">
            <Link to={"/login"} className="btn btn-primary normal-case text-md">
              Login
            </Link>{" "}
            <Link
              to={"/register"}
              className="btn btn-ghost border-1 border-primary text-primary mx-2 normal-case text-md"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="dropdown dropdown-end ">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar ">
              <div className=" rounded-full w-8">
                {(
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src={
                      user.img
                        ? user.img
                        : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                    }
                    alt=""
                  />
                ) || <FaUserAlt />}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link onClick={handleClick}>Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
