const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { requireAdmin } = require("../middleware/admin");
const ctrl = require("../controllers/orderController");

const router = express.Router();
router.post("/", requireAuth, ctrl.create);
router.get("/mine", requireAuth, ctrl.myOrders);
router.get("/", requireAuth, requireAdmin, ctrl.all);
router.patch("/:id/status", requireAuth, requireAdmin, ctrl.updateStatus);

module.exports = router;
