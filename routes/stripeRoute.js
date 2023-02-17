import express from "express";
import { payment } from "../controllers/stripe.js";

const router = express.Router();

router.post("/payment", payment);

export default router;
