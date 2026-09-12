function requireAdmin(req, res, next) {
  if (!req.dbUser || req.dbUser.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
}

module.exports = { requireAdmin };
