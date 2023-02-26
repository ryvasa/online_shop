import express from "express";
import {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteUser,
} from "../controllers/productController.js";
import { adminOnly, requireAuth } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/products", adminOnly, addProduct);
router.put("/products/:id", adminOnly, updateProduct);
router.put("/products/order/:id", requireAuth, updateProduct);
router.get("/products/:id", getSingleProduct);
router.get("/products", getAllProducts);
router.delete("/products/:id", deleteUser);

export default router;
