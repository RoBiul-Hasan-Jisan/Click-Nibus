/**
 * Seeds sample categories, brands, and products into MongoDB.
 * Safe to call every time the server starts - it only inserts data
 * when the catalog is empty, so it never wipes existing/real data.
 */
const slugify = require("slugify");
const Category = require("../models/Category");
const Brand = require("../models/Brand");
const Product = require("../models/Product");

const categories = ["Electronics", "Fashion", "Home & Kitchen", "Beauty", "Sports"];
const brands = ["Apple", "Samsung", "Nike", "Adidas", "Sony"];

// Real brand logos bundled in frontend/public/brands (same root-relative approach as product images).
const brandLogoFiles = ["brand_1.webp", "brand_2.jpg", "brand_3.png", "brand_4.png", "brand_5.png"];

const productNames = [
  "Wireless Headphones",
  "Smart Watch",
  "Running Shoes",
  "Bluetooth Speaker",
  "Leather Backpack",
  "Coffee Maker",
  "Gaming Mouse",
  "Yoga Mat",
  "Sunglasses",
  "Desk Lamp",
];

// Real product photos bundled in frontend/public/products (copied from the
// original project's images/products folder). Referenced as root-relative
// paths, so they resolve against whichever frontend origin renders them —
// no image-host config needed.
const productImageFiles = [
  "product_1.png",
  "product_2.jpg",
  "product_3.png",
  "product_4.png",
  "product_5.png",
  "product_6.png",
  "product_7.png",
  "product_8.png",
  "product_9.png",
  "product_10.png",
];

/**
 * @param {{ force?: boolean }} [options] - pass force:true to wipe and reseed
 * regardless of existing data (used by the manual `npm run seed` CLI).
 */
async function seedCatalog(options = {}) {
  const { force = false } = options;

  const existingProducts = await Product.countDocuments();
  if (existingProducts > 0 && !force) {
    console.log(`[seed] catalog already has ${existingProducts} products, skipping`);
    return { skipped: true };
  }

  if (force) {
    await Promise.all([Category.deleteMany({}), Brand.deleteMany({}), Product.deleteMany({})]);
  }

  const categoryDocs = await Category.insertMany(
    categories.map((name, i) => ({
      name,
      slug: slugify(name, { lower: true, strict: true }),
      image: `/products/${productImageFiles[i % productImageFiles.length]}`,
    }))
  );
  const brandDocs = await Brand.insertMany(
    brands.map((name, i) => ({
      name,
      slug: slugify(name, { lower: true, strict: true }),
      logo: `/brands/${brandLogoFiles[i % brandLogoFiles.length]}`,
    }))
  );

  const products = productNames.map((name, i) => ({
    name,
    slug: slugify(name, { lower: true, strict: true }),
    description: `${name} - great quality, demo product for learning purposes.`,
    price: Math.floor(Math.random() * 200) + 20,
    discountPercent: [0, 10, 15, 20][i % 4],
    stock: Math.floor(Math.random() * 50) + 5,
    images: [`/products/${productImageFiles[i % productImageFiles.length]}`],
    category: categoryDocs[i % categoryDocs.length]._id,
    brand: brandDocs[i % brandDocs.length]._id,
    isFeatured: i % 3 === 0,
    status: ["new", "hot", "sale", ""][i % 4],
  }));

  await Product.insertMany(products);

  console.log(
    `[seed] inserted ${categoryDocs.length} categories, ${brandDocs.length} brands, ${products.length} products`
  );
  return { skipped: false, categories: categoryDocs.length, brands: brandDocs.length, products: products.length };
}

module.exports = seedCatalog;
