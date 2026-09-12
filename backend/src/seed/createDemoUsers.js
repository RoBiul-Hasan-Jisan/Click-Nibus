/**
 * Manually (re)creates the two demo accounts (admin + user).
 * You normally don't need this - the server auto-seeds them on startup.
 * Run with: npm run seed:users
 */
require("dotenv").config();
const connectDB = require("../config/db");
const seedUsers = require("./seedUsers");

async function run() {
  await connectDB();
  await seedUsers();
  process.exit(0);
}

run().catch((err) => {
  console.error("[seed] failed:", err);
  process.exit(1);
});
