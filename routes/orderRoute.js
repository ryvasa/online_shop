import express from "express";
import { getAllOrder, getOneOrder } from "../controllers/orderController.js";
const router = express.Router();

router.get("/order", getAllOrder);
router.get("/order/:userId", getOneOrder);

export default router;
