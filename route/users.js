import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/user.js";
import { verifyUser } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/", verifyUser, getAllUsers);
router.get("/:id", verifyUser, getUserById);
router.put("/:id", verifyUser, updateUser);

// Admin-only route
router.delete("/:id", verifyUser, admin, deleteUser);

export default router;
