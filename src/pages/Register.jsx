import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  registerFailure,
  registerStart,
  registerSuccess,
} from "../redux/userRedux";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = { username, email, password, confirmPassword, phone };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(registerStart());
    try {
      const res = await axios.post("http://localhost:5000/register", user);
      dispatch(registerSuccess(res.data));
      navigate("/");
    } catch (err) {
      console.log(err);
      dispatch(registerFailure());
    }
  };
  console.log(user);
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="card flex-shrink-0 w-full max-w-xl  shadow-2xl bg-base-100">
          <span className="text-center pt-5 font-semibold text-2xl">
            Register
          </span>
          <div className="card-body flex-row">
            <div className="flex-1 pr-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                />
              </div>
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
                  <span className="label-text">Phone</span>
                </label>
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  type="number"
                  placeholder="+123 456 789"
                  className="input input-bordered"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                />
              </div>

              <label className="label">
                <Link to={"/login"} className="label-text-alt link link-hover">
                  Do you have account ? Login
                </Link>
              </label>
              <Link onClick={handleClick}>
                <div className="form-control mt-2  justify-self-center">
                  <button className="btn btn-primary">Register</button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
