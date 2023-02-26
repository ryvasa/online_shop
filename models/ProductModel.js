import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
    colors: {
      type: Array,
      required: true,
    },
    // colors: [
    //   {
    //     name: {
    //       type: String,
    //     },
    //     class: {
    //       type: String,
    //     },
    //     selectedClass: {
    //       type: String,
    //       default: "ring-gray-400",
    //     },
    //   },
    // ],
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
