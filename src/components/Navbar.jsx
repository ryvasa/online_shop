import {
  FaBell,
  FaShoppingBag,
  FaShoppingCart,
  FaUserAlt,
} from "react-icons/fa";
import { IoShirt } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutFailure, logoutStart, logoutSuccess } from "../redux/userRedux";
import axios from "axios";

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const product = useSelector((state) => state.product.products);
  const order = useSelector((state) => state.order.orders);

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
  console.log();
  return (
    <div className="navbar  bg-white h-9 drop-shadow-lg fixed   z-[90]">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost normal-case text-xl">
          DDshop
        </Link>
      </div>

      <div className="flex-none">
        <Link to={"/products"}>
          <div className="tooltip tooltip-bottom" data-tip="products">
            <button className="btn btn-ghost btn-circle ">
              <div className="indicator">
                <IoShirt className="h-6 w-6" />
                {cart.quantity > 0 && (
                  <span className=" badge-primary shadow-lg badge badge-sm indicator-item">
                    {product.length}
                  </span>
                )}
              </div>
            </button>
          </div>
        </Link>
        <Link to={"/order"}>
          <div className="tooltip tooltip-bottom" data-tip="order">
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <FaShoppingBag className="h-6 w-6" />
                {cart.quantity > 0 && (
                  <span className=" badge-primary shadow-lg badge badge-sm indicator-item">
                    {order.length}
                  </span>
                )}
              </div>
            </button>
          </div>
        </Link>
        <div className="dropdown dropdown-end pr-3 ">
          <div className="tooltip tooltip-bottom" data-tip="cart">
            <label tabIndex={0} className="btn btn-ghost  btn-circle">
              <div className="indicator">
                <FaShoppingCart className="h-6 w-6" />
                {cart.quantity > 0 && (
                  <span className=" badge-primary shadow-lg badge badge-sm indicator-item">
                    {cart.quantity}
                  </span>
                )}
              </div>
            </label>
          </div>

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
