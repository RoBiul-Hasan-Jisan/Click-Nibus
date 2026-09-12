/**
 * Manual, force reseed of the catalog (wipes and reinserts categories/brands/products).
 * You normally don't need this - the server auto-seeds an empty catalog on startup.
 * Run with: npm run seed
 */
require("dotenv").config();
const connectDB = require("../config/db");
const seedCatalog = require("./seedCatalog");

async function run() {
  await connectDB();
  await seedCatalog({ force: true });
  process.exit(0);
}

run().catch((err) => {
  console.error("[seed] failed:", err);
  process.exit(1);
});
