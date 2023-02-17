import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        productName: {
          type: String,
        },
        price: {
          type: Number,
        },
        img: {
          type: Array,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    totalQuantity: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
