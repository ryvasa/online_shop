import express from "express";
import {
  createCart,
  deleteCart,
  getCart,
  getUserCart,
  updateCart,
} from "../controllers/cartController.js";

const router = express.Router();
router.post("/cart", createCart);
router.put("/cart/:id", updateCart);
router.delete("/cart/:id", deleteCart);
router.get("/cart/find/:userId", getUserCart);
router.get("/cart", getCart);

export default router;
