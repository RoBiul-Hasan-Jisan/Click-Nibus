require("dotenv").config();
require("express-async-errors"); // lets async route handlers throw and hit the error middleware below
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./src/config/db");
const autoSeed = require("./src/seed/autoSeed");

const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const brandRoutes = require("./src/routes/brandRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const checkoutRoutes = require("./src/routes/checkoutRoutes");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/checkout", checkoutRoutes);

// Central error handler (catches async errors thrown in controllers)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  await autoSeed();
  app.listen(PORT, () => console.log(`[server] listening on http://localhost:${PORT}`));
});
