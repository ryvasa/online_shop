import express from "express";
import {
  getAllOrder,
  getOneOrder,
  getOrder,
  income,
  notificationOrders,
  orderStats,
  successOrders,
  updateOrder,
} from "../controllers/orderController.js";
import { requireAuth } from "../middleware/verifyUser.js";
const router = express.Router();

router.get("/orders", requireAuth, getAllOrder);
router.get("/transactions", requireAuth, successOrders);
router.get("/notiforders", requireAuth, notificationOrders);
router.get("/orders/:id", requireAuth, getOrder);
router.put("/orders/:id", requireAuth, updateOrder);
router.get("/orders/get/stats", requireAuth, orderStats);
router.get("/orders/get/income", requireAuth, income);
router.get("/orders/find/:userId", getOneOrder);

export default router;
