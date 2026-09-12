const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { requireAdmin } = require("../middleware/admin");
const ctrl = require("../controllers/productController");

const router = express.Router();
router.get("/", ctrl.list);
router.get("/:slug", ctrl.getBySlug);
router.post("/", requireAuth, requireAdmin, ctrl.create);
router.put("/:id", requireAuth, requireAdmin, ctrl.update);
router.delete("/:id", requireAuth, requireAdmin, ctrl.remove);

module.exports = router;
