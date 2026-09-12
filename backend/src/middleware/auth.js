const admin = require("../config/firebaseAdmin");
const User = require("../models/User");

/**
 * Verifies the Firebase ID token sent as: Authorization: Bearer <token>
 * Attaches req.firebaseUser (decoded token) and req.dbUser (Mongo user doc).
 */
async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;

    if (!token) {
      return res.status(401).json({ message: "No auth token provided" });
    }

    const decoded = await admin.auth().verifyIdToken(token);
    req.firebaseUser = decoded;

    let dbUser = await User.findOne({ firebaseUid: decoded.uid });

    // Auto-provision a User document the first time we see a valid Firebase user.
    if (!dbUser) {
      const role = decoded.email === process.env.DEMO_ADMIN_EMAIL ? "admin" : "user";
      dbUser = await User.create({
        firebaseUid: decoded.uid,
        email: decoded.email,
        name: decoded.name || decoded.email.split("@")[0],
        role,
      });
    }

    req.dbUser = dbUser;
    next();
  } catch (err) {
    console.error("[auth] token verification failed:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = { requireAuth };
