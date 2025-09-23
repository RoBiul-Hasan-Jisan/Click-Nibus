import { useParams, Link } from "react-router-dom";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

const products = [
  { id: 1, name: "Laptop Backpack", price: "$39", img: "/images/j1.jpg", oldPrice: "$49", rating: 4, discount: 20, description: "High-quality laptop backpack with multiple compartments for all your daily essentials." },
  { id: 2, name: "Bluetooth Speaker", price: "$59", img: "/images/j2.jpeg", oldPrice: "$79", rating: 5, discount: 25, description: "Portable Bluetooth speaker with superior sound quality and long-lasting battery life." },
  { id: 3, name: "Sneakers", price: "$89", img: "/images/j3.jpeg", oldPrice: "$109", rating: 4, discount: 18, description: "Comfortable and stylish sneakers perfect for everyday wear and sports activities." },
  { id: 4, name: "Coffee Maker", price: "$129", img: "/images/j4.jpeg", oldPrice: "$159", rating: 5, discount: 20, description: "Premium coffee maker for brewing the perfect cup every time with ease." },
  { id: 5, name: "Laptop Backpack", price: "$39", img: "/images/j1.jpg", oldPrice: "$49", rating: 4, discount: 20, description: "High-quality laptop backpack with multiple compartments for all your daily essentials." },
  { id: 6, name: "Bluetooth Speaker", price: "$59", img: "/images/j2.jpeg", oldPrice: "$79", rating: 5, discount: 25, description: "Portable Bluetooth speaker with superior sound quality and long-lasting battery life." },
  { id: 7, name: "Sneakers", price: "$89", img: "/images/j3.jpeg", oldPrice: "$109", rating: 4, discount: 18, description: "Comfortable and stylish sneakers perfect for everyday wear and sports activities." },
  { id: 8, name: "Coffee Maker", price: "$129", img: "/images/j4.jpeg", oldPrice: "$159", rating: 5, discount: 20, description: "Premium coffee maker for brewing the perfect cup every time with ease." },
];

export default function JustforDetails() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) return <div className="min-h-screen flex items-center justify-center text-xl">Product not found</div>;

  // Similar products
  const similarProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-10 max-w-7xl mx-auto">

      {/* Product Details */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Image */}
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

        {/* Info */}
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
          {similarProducts.map(p => (
            <Link to={`/product/${p.id}`} key={p.id}>
              <div className="bg-white rounded-2xl shadow hover:shadow-xl overflow-hidden group transition-transform duration-300 hover:-translate-y-1">
                <div className="relative w-full h-44 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-pink-600 transition-colors">{p.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-900 font-bold">{p.price}</span>
                    {p.oldPrice && <span className="line-through text-gray-400 text-sm">{p.oldPrice}</span>}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
