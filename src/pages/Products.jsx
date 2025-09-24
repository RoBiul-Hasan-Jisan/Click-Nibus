import { useState } from "react";
import Maincard from "../components/Maincard";


// Products data
const products = [
  { id: 1, name: "Smart Watch", price: 199, image: "/images/watch.jpeg" },
  { id: 2, name: "Wireless Earbuds", price: 99, image: "/images/earbuds.jpeg" },
  { id: 3, name: "Gaming Laptop", price: 1299, image: "/images/laptop.jpeg" },
  { id: 4, name: "Smartphone", price: 899, image: "/images/phone.jpeg" },
  { id: 5, name: "Noise Cancelling Headphones", price: 299, image: "/images/headphones.jpeg" },
  { id: 6, name: "Tablet", price: 499, image: "/images/tablet.jpeg" },
  { id: 7, name: "Bluetooth Speaker", price: 129, image: "/images/speaker.jpeg" },
  { id: 8, name: "Digital Camera", price: 599, image: "/images/camera.jpeg" },
  { id: 9, name: "Fitness Tracker", price: 149, image: "/images/fitness-tracker.jpeg" },
  { id: 10, name: "VR Headset", price: 399, image: "/images/vr-headset.jpeg" }
];

export default function Products() {
  const [search, setSearch] = useState("");

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
  };

  return (
    <section className="px-6 sm:px-8 lg:px-12 py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Products</h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-l-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button className="bg-pink-500 text-white px-4 py-2 rounded-r-lg hover:bg-pink-600 transition">
          Search
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Maincard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
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
