// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Load full user from DB to ensure latest role, etc.
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "User not found (from token)" });
    }

    // attach plain object (not Sequelize instance) for easier checks / logging
    req.user = user.get ? user.get({ plain: true }) : user;
    next();
  } catch (err) {
    console.error("auth.verifyUser error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export { verifyUser };
