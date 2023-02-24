import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutFailure, logoutStart, logoutSuccess } from "../redux/userRedux";
import axios from "axios";

const Navbar = () => {
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
    <div className="navbar  bg-white h-9 drop-shadow-lg fixed   z-[90]">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost  normal-case text-xl">
          DDshop
        </Link>
      </div>

      <div className="flex-none">
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
              <Link to={`/users/${user._id}`} className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link onClick={handleClick}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
