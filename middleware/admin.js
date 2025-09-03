// middleware/admin.js
const admin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  // normalize role check to string lower-case
  const role = (req.user.role || "").toString().toLowerCase();
  if (role !== "admin") {
    return res.status(403).json({ error: "Forbidden: Admins only" });
  }
  next();
};

export { admin };
