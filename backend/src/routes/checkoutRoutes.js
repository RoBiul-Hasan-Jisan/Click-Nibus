const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { createSession } = require("../controllers/checkoutController");

const router = express.Router();
router.post("/create-session", requireAuth, createSession);

module.exports = router;
