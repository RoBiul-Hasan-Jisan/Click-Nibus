/**
 * Creates two demo Firebase Auth accounts (admin + regular user) and their
 * matching MongoDB User documents with the correct role.
 * Uses get-or-create + upsert, so it's safe to call every time the server starts.
 */
const admin = require("../config/firebaseAdmin");
const User = require("../models/User");

function getDemoAccounts() {
  return [
    {
      email: process.env.DEMO_ADMIN_EMAIL || "admin@clicknibus.com",
      password: process.env.DEMO_ADMIN_PASSWORD || "Admin@12345",
      name: "Demo Admin",
      role: "admin",
    },
    {
      email: process.env.DEMO_USER_EMAIL || "user@clicknibus.com",
      password: process.env.DEMO_USER_PASSWORD || "User@12345",
      name: "Demo User",
      role: "user",
    },
  ];
}

async function upsertFirebaseUser({ email, password, name }) {
  try {
    return await admin.auth().getUserByEmail(email);
  } catch (err) {
    if (err.code === "auth/user-not-found") {
      return admin.auth().createUser({ email, password, displayName: name, emailVerified: true });
    }
    throw err;
  }
}

async function seedUsers() {
  const demoAccounts = getDemoAccounts();
  const results = [];

  for (const acc of demoAccounts) {
    const fbUser = await upsertFirebaseUser(acc);

    // Custom claim lets the frontend/backend trust the role straight from the ID token too.
    await admin.auth().setCustomUserClaims(fbUser.uid, { role: acc.role });

    await User.findOneAndUpdate(
      { firebaseUid: fbUser.uid },
      { firebaseUid: fbUser.uid, email: acc.email, name: acc.name, role: acc.role },
      { upsert: true, new: true }
    );

    results.push(acc);
  }

  console.log("[seed] demo accounts ready:");
  results.forEach((a) => console.log(`  ${a.role.toUpperCase()}: ${a.email} / ${a.password}`));

  return results;
}

module.exports = seedUsers;
