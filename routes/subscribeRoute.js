import express from "express";
import { subscribe } from "../controllers/subscribeController.js";

const router = express.Router();

router.post("/subscribe", subscribe);

export default router;
