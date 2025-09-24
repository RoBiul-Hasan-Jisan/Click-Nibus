import { useParams, Link } from "react-router-dom";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import ProductCard from "../components/Flashcard";

export const allProducts = [
  {
    id: 101,
    name: "Wireless Headphones",
    price: "$49",
    oldPrice: "$99",
    img: "/images/p3.jpeg",
    rating: 4,
    discount: 50,
    description: "High-quality wireless headphones with noise-cancellation, long battery life, and comfortable fit."
  },
  {
    id: 102,
    name: "Smart Watch",
    price: "$79",
    oldPrice: "$129",
    img: "/images/p2.jpeg",
    rating: 5,
    discount: 40,
    description: "Smart watch with fitness tracking, heart rate monitoring, and message notifications."
  },
  {
    id: 103,
    name: "Gaming Mouse",
    price: "$25",
    oldPrice: "$50",
    img: "/images/p1.jpeg",
    rating: 3,
    discount: 50,
    description: "Ergonomic gaming mouse with customizable DPI settings and RGB lighting."
  },
];

export default function FlashSaleDetails() {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === parseInt(id));
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) return <div className="min-h-screen flex items-center justify-center text-xl">Product not found!</div>;

  const similarProducts = allProducts.filter((p) => p.id !== product.id);

  return (
    <div className="px-6 sm:px-8 lg:px-12 py-10 max-w-7xl mx-auto">

      {/* Product Details */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Product Image */}
        <div className="flex-1 relative group">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full max-h-[550px] object-contain rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
          />
          {product.discount && (
            <span className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-1 rounded-full font-bold shadow-lg">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className={`w-6 h-6 ${i < product.rating ? "fill-yellow-400" : "fill-gray-300 text-gray-300"}`} />
            ))}
            <span className="text-gray-500 ml-2">({product.rating} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-gray-900">{product.price}</span>
            {product.oldPrice && <span className="text-lg line-through text-gray-400">{product.oldPrice}</span>}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button className="flex items-center gap-2 bg-pink-500 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-pink-600 hover:scale-105 transition-transform duration-300">
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <button
              className={`flex items-center justify-center w-14 h-14 rounded-2xl shadow-lg transition-transform hover:scale-105 ${isFavorite ? "bg-red-500 text-white" : "bg-white text-red-500"}`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Similar Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {similarProducts.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>

      <Link to="/flashsale" className="text-pink-600 mt-6 inline-block hover:underline">
        Back to Flash Sale
      </Link>
    </div>
  );
}
