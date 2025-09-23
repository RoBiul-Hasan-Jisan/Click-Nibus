import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { products as allProducts } from "../data/products";

export default function Products() {
  const [search, setSearch] = useState("");

  // Filter products based on search
  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
  };

  return (
    <section className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Products</h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-l-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-500 transition">
          Search
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </section>
  );
}
