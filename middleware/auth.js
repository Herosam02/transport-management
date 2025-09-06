// middleware/auth.js
import jwt from "jsonwebtoken";
import Products from "../models/Product.js";

const verifyProduct = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Load full user from DB to ensure latest role, etc.
    const Product = await Products.findByPk(decoded.id);
    if (!Product) {
      return res.status(401).json({ error: "User not found (from token)" });
    }

    // attach plain object (not Sequelize instance) for easier checks / logging
    req.Product = Product.get ? Product.get({ plain: true }) : Product;
    next();
  } catch (err) {
    console.error("auth.verifyProduct error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export { verifyProduct };
