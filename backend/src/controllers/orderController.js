const Order = require("../models/Order");

// POST /api/orders  -> create order for the logged-in user (called after successful stripe payment)
async function create(req, res) {
  const { items, totalAmount, shippingAddress, paymentMethod, stripeSessionId, paymentStatus } = req.body;

  const orderNumber = "ORD-" + Date.now().toString(36).toUpperCase();

  const order = await Order.create({
    user: req.dbUser._id,
    orderNumber,
    items,
    totalAmount,
    shippingAddress,
    paymentMethod: paymentMethod || "stripe",
    stripeSessionId,
    paymentStatus: paymentStatus || "pending",
  });

  res.status(201).json({ order });
}

// GET /api/orders/mine -> logged-in user's own orders
async function myOrders(req, res) {
  const orders = await Order.find({ user: req.dbUser._id }).sort({ createdAt: -1 });
  res.json({ orders });
}

// GET /api/orders -> ADMIN: all orders
async function all(req, res) {
  const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
  res.json({ orders });
}

// PATCH /api/orders/:id/status -> ADMIN: update order status
async function updateStatus(req, res) {
  const { orderStatus } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus }, { new: true });
  res.json({ order });
}

module.exports = { create, myOrders, all, updateStatus };
