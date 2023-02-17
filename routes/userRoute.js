import express from "express";
import {
  addUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { adminOnly, requireAuth } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/users", adminOnly, addUser);
router.put("/users/:id", updateUser);
router.get("/users/:id", getSingleUser);
router.get("/users", adminOnly, getAllUsers);
router.delete("/users/:id", requireAuth, deleteUser);

export default router;
