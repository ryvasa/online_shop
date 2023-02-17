import Stripe from "stripe";
import Order from "../models/OrderModel.js";
export const payment = async (req, res) => {
  const { userId, address, tokenId, amount, product, totalQuantity } = req.body;
  const products = product.map(
    ({ _id, productName, price, img, quantity }) => ({
      productId: _id,
      productName,
      price,
      img,
      quantity: quantity,
    })
  );
  const order = new Order({ userId, address, amount, products, totalQuantity });
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
