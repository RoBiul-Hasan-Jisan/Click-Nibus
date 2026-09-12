const slugify = require("slugify");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Brand = require("../models/Brand");

// GET /api/products?search=&category=&brand=&featured=true&limit=&page=
async function list(req, res) {
  const { search, category, brand, featured, status, minPrice, maxPrice, limit = 20, page = 1 } = req.query;
  const filter = {};

  if (search) filter.name = { $regex: search, $options: "i" };
  if (category) {
    const cat = await Category.findOne({ slug: category });
    filter.category = cat ? cat._id : null; // null -> yields empty results for unknown slug
  }
  if (brand) {
    const br = await Brand.findOne({ slug: brand });
    filter.brand = br ? br._id : null;
  }
  if (featured === "true") filter.isFeatured = true;
  if (status) filter.status = status;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate("category", "name slug")
      .populate("brand", "name slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Product.countDocuments(filter),
  ]);

  res.json({ products, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
}

async function getBySlug(req, res) {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category", "name slug")
    .populate("brand", "name slug");
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ product });
}

async function create(req, res) {
  const body = req.body;
  const slug = slugify(body.name, { lower: true, strict: true });
  const product = await Product.create({ ...body, slug });
  res.status(201).json({ product });
}

async function update(req, res) {
  const { id } = req.params;
  const body = { ...req.body };
  if (body.name) body.slug = slugify(body.name, { lower: true, strict: true });
  const product = await Product.findByIdAndUpdate(id, body, { new: true });
  res.json({ product });
}

async function remove(req, res) {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
}

module.exports = { list, getBySlug, create, update, remove };
