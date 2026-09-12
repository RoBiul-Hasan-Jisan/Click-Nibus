const slugify = require("slugify");
const Brand = require("../models/Brand");

async function list(req, res) {
  const brands = await Brand.find().sort({ name: 1 });
  res.json({ brands });
}

async function create(req, res) {
  const { name, logo } = req.body;
  const slug = slugify(name, { lower: true, strict: true });
  const brand = await Brand.create({ name, slug, logo });
  res.status(201).json({ brand });
}

async function update(req, res) {
  const { id } = req.params;
  const { name, logo } = req.body;
  const update = { logo };
  if (name) update.name = name, update.slug = slugify(name, { lower: true, strict: true });
  const brand = await Brand.findByIdAndUpdate(id, update, { new: true });
  res.json({ brand });
}

async function remove(req, res) {
  await Brand.findByIdAndDelete(req.params.id);
  res.json({ success: true });
}

module.exports = { list, create, update, remove };
