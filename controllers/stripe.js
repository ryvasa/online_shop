import Stripe from "stripe";
import Order from "../models/OrderModel.js";
export const payment = async (req, res) => {
  const { userId, address, tokenId, amount, product } = req.body;
  const products = product.map(({ _id, quantity }) => ({
    productId: _id,
    quantity: quantity,
  }));
  const order = new Order({ userId, address, amount, products });
  const stripe = new Stripe(process.env.STRIPE);
  try {
    await stripe.charges.create({
      source: tokenId,
      amount,
      currency: "usd",
    });
    const response = await order.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
