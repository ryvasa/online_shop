import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginFailure, loginStart, loginSuccess } from "../redux/userRedux";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = { email, password };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("http://localhost:5000/login", user);
      if (res.data.details.role === "admin") {
        dispatch(loginSuccess(res.data.details));
        navigate("/");
      }
      setError("Only admin can access");
    } catch (err) {
      dispatch(loginFailure());
      setError(err.response.data);
    }
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="card flex-shrink-0 w-full max-w-lg  shadow-2xl bg-base-100">
          <span className="text-center pt-5 font-semibold text-2xl">Login</span>
          {error && (
            <span className="text-red-600 flex justify-center w-full -mb-5">
              {error}
            </span>
          )}
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="input input-bordered"
              />
            </div>
            <Link onClick={handleClick}>
              <div className="form-control mt-3">
                <button className="btn bg-purple-800 hover:bg-purple-500 text-white border-none">
                  Login
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
