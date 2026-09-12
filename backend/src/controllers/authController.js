// GET /api/auth/me  -> returns the current user's Mongo profile + role
async function me(req, res) {
  res.json({ user: req.dbUser });
}

module.exports = { me };
