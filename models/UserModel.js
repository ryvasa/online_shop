import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    img: {
      type: String,
    },
    phone: {
      type: Number,
      required: true,
    },
    refresh_token: {
      type: String,
    },
  },
  { timestamps: true }
);
export default mongoose.model("User", UserSchema);
