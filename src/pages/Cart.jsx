import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../redux/cartRedux";

export const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const handleRemoveProduct = (index) => {
    dispatch(removeProduct(index));
  };

  return (
    <>
      <Navbar />
      <>
        <div className="text-md pl-3 breadcrumbs pt-20 ">
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>Cart</li>
          </ul>
        </div>
        <div className="border-t min-h-screen border-gray-200 py-6 px-4 sm:px-6 max-w-full  pt-3">
          <div className="mb-8 mt-4">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cart.products.map((product, index) => (
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
                        <p className="text-gray-500">Qty {product.quantity}</p>

                        <div className="flex">
                          <button
                            onClick={() => handleRemoveProduct(index)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900 border-t-2 border-primary">
            <p className="mt-2">Subtotal</p>
            <p className="mt-2 text-xl font-bold">$ {cart.total}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          {user ? (
            <div className="mt-6 max-w-full justify-end flex">
              <Link
                to={"/checkout"}
                className=" w-28 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
          ) : (
            <div className="mt-6 max-w-full justify-end flex">
              <Link
                to={"/login"}
                className=" flex items-center justify-center   px-6 py-3 shadow-sm btn btn-outline btn-primary"
              >
                Login to Checkout
              </Link>
            </div>
          )}
        </div>
      </>
      <Footer />
    </>
  );
};

export default Cart;
