const slugify = require("slugify");
const Category = require("../models/Category");

async function list(req, res) {
  const categories = await Category.find().sort({ name: 1 });
  res.json({ categories });
}

async function create(req, res) {
  const { name, image } = req.body;
  const slug = slugify(name, { lower: true, strict: true });
  const category = await Category.create({ name, slug, image });
  res.status(201).json({ category });
}

async function update(req, res) {
  const { id } = req.params;
  const { name, image } = req.body;
  const update = { image };
  if (name) update.name = name, update.slug = slugify(name, { lower: true, strict: true });
  const category = await Category.findByIdAndUpdate(id, update, { new: true });
  res.json({ category });
}

async function remove(req, res) {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ success: true });
}

module.exports = { list, create, update, remove };
