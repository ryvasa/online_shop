import express from "express";
import {
  addUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  userStats,
} from "../controllers/userController.js";
import { adminOnly, requireAuth } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/users", adminOnly, addUser);
router.put("/users/:id", requireAuth, updateUser);
router.get("/users/:id", requireAuth, getSingleUser);
router.get("/users", requireAuth, getAllUsers);
router.get("/users/get/stats", requireAuth, userStats);
router.delete("/users/:id", requireAuth, deleteUser);

export default router;
