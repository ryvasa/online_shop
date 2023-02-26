import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const KEY = import.meta.env.VITE_API_KEY;
const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);

  const [address, setAddress] = useState("");
  // stripe;
  const navigate = useNavigate();
  const handleClick = async (token) => {
    try {
      const res = await axios.post("http://localhost:5000/payment", {
        userId: user._id,
        userName: user.username,
        product: cart.products,
        address,
        tokenId: token.id,
        totalQuantity: cart.quantity,
        amount: cart.total * 100,
      });
      navigate("/success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="card flex-shrink-0 w-full max-w-lg  shadow-2xl bg-base-100">
          <span className="text-center pt-5 font-semibold text-2xl">
            Checkout
          </span>
          <div className="card-body">
            <div className=" flex justify-between w-full">
              <span className="label-text">Total</span>

              <span>
                $ <span className="text-xl font-bold">{cart.total}</span>
              </span>
            </div>
            <div className="flex justify-between w-full">
              <span className="label-text">Total quantity</span>
              <span>
                <span className="text-xl font-bold">{cart.quantity}</span> pcs
              </span>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Complete Address</span>
              </label>
              <textarea
                onChange={(e) => setAddress(e.target.value)}
                className="textarea textarea-bordered h-24"
                placeholder="Address"
                required
              ></textarea>
            </div>
            <StripeCheckout
              stripeKey={KEY}
              name="Pay With Credit Card"
              billingAddress
              shippingAddress
              amount={cart.total * 100}
              description={`Your total is $${cart.total}`}
              token={handleClick}
            >
              <button className="btn btn-primary w-full">Pay</button>
            </StripeCheckout>
            <Link to={"/cart"}>
              <div className="form-control mt-3">
                <button className="btn  border text-primary hover:bg-white hover:border-primary bg-white border-primary">
                  Cancel
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
