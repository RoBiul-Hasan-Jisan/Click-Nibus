/**
 * Runs automatically every time the server starts (npm run dev / npm start).
 * Both steps are idempotent, so this is safe on every restart:
 *  - Catalog (categories/brands/products) is only inserted when empty.
 *  - Demo users are get-or-created, never duplicated.
 *
 * Set AUTO_SEED=false in .env to disable this behavior.
 */
const seedCatalog = require("./seedCatalog");
const seedUsers = require("./seedUsers");

async function autoSeed() {
  if (process.env.AUTO_SEED === "false") {
    console.log("[seed] AUTO_SEED=false, skipping automatic seeding");
    return;
  }

  try {
    await seedCatalog();
  } catch (err) {
    console.error("[seed] catalog auto-seed failed:", err.message);
  }

  try {
    await seedUsers();
  } catch (err) {
    console.error(
      "[seed] demo user auto-seed failed (check FIREBASE_* env vars):",
      err.message
    );
  }
}

module.exports = autoSeed;
