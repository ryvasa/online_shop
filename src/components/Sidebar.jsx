import { MdSpaceDashboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBell,
  FaDollarSign,
  FaShoppingBag,
  FaUserAlt,
  FaUserLock,
} from "react-icons/fa";
import { IoShirt } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logoutFailure, logoutStart, logoutSuccess } from "../redux/userRedux";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(logoutStart());
    try {
      const res = await axios.delete("http://localhost:5000/logout", user._id);
      dispatch(logoutSuccess());
      navigate("/login");
    } catch (err) {
      dispatch(logoutFailure());
    }
  };
  return (
    <div className="fixed top-0 w-0 z-[50]">
      <div className=" h-full  flex-1 w-52">
        <div className="drawer drawer-mobile pt-20 bg-white shadow-xl">
          <div className="drawer-side">
            <ul className="menu w-52 bg-base-100 text-base-content   ">
              <li className="hover:bg-purple-400 rounded-r-xl">
                <Link
                  to={"/"}
                  className="text-md font-medium  text-black group hover:text-white"
                >
                  <MdSpaceDashboard className="w-5 h-5 text-purple-800 group-hover:text-white" />
                  Dasboard
                </Link>
              </li>
              <li className="hover:bg-purple-400 rounded-r-xl">
                <Link
                  to={"/users"}
                  className="text-md font-medium  text-black group hover:text-white"
                >
                  <FaUserAlt className="w-5 h-5 text-purple-800 group-hover:text-white" />
                  User
                </Link>
              </li>
              <li className="hover:bg-purple-400 rounded-r-xl">
                <Link
                  to={"/products"}
                  className="text-md font-medium  text-black group hover:text-white"
                >
                  <IoShirt className="w-5 h-5 text-purple-800 group-hover:text-white" />
                  Product
                </Link>
              </li>
              <li className="hover:bg-purple-400 rounded-r-xl">
                <Link
                  to={"/orders"}
                  className="text-md font-medium  text-black group hover:text-white"
                >
                  <FaShoppingBag className="w-5 h-5 text-purple-800 group-hover:text-white" />
                  Order
                </Link>
              </li>
              <li className="hover:bg-purple-400 rounded-r-xl">
                <Link
                  to={"/transaction"}
                  className="text-md font-medium  text-black group hover:text-white"
                >
                  <FaDollarSign className="w-5 h-5 text-purple-800 group-hover:text-white" />
                  Transaction
                </Link>
              </li>
              <li className="hover:bg-purple-400 rounded-r-xl">
                <button
                  onClick={handleClick}
                  className="text-md font-medium  text-black group hover:text-white"
                >
                  <FaUserLock className="w-5 h-5 text-purple-800 group-hover:text-white" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
