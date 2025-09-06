import express from "express";
import {
  registerProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  loginProduct,
  getProductFromToken
} from "../controllers/Product.js";
import { verifyProduct } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";

const router = express.Router();

// Public routes
router.post("/register", registerProduct);
router.post("/login", loginProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/token/product", getProductFromToken);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
