import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, X } from "lucide-react";

export default function ProductCard({ id, name, price, oldPrice, img, rating, discount }) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Close zoom with ESC key
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && setIsZoomed(false);
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* Product Card */}
      <div className="relative bg-gradient-to-b from-white via-gray-50 to-white rounded-3xl shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-2 w-full sm:w-56 md:w-60 lg:w-64 group overflow-hidden">
        
        {/* Image */}
        <div 
          className="relative w-full h-64 sm:h-72 md:h-80 overflow-hidden rounded-t-3xl cursor-pointer"
          onClick={() => setIsZoomed(true)}
        >
          <img
            src={img}
            alt={name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
          {discount && (
            <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              -{discount}%
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4 flex-1 flex flex-col relative">
          
          {/* Clickable Product Name */}
          <Link 
            to={`/product/${id}`} 
            className="font-semibold text-sm md:text-base text-gray-800 line-clamp-2 mb-2 hover:text-pink-600 transition-colors"
          >
            {name}
          </Link>

          {/* Rating */}
          {rating && (
            <div className="flex items-center text-yellow-400 mb-3">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400" : "fill-gray-300 text-gray-300"}`} />
              ))}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-lg font-bold text-gray-900">{price}</span>
            {oldPrice && <span className="text-sm line-through text-gray-400">{oldPrice}</span>}
          </div>

          {/* Add to Cart */}
          <button className="mt-auto w-full flex items-center justify-center gap-2 bg-pink-500 text-white font-semibold py-2 rounded-xl shadow-lg hover:bg-pink-600 hover:scale-105 transition-transform duration-300">
            <ShoppingCart className="w-5 h-5" /> Add to Cart
          </button>

          {/* Favorite */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className={`bg-white p-2 rounded-full shadow-lg hover:scale-110 transition transform`}>
              <Heart className="w-5 h-5 text-red-500" />
            </button>
          </div>

        </div>
      </div>

      {/* Zoom Overlay */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setIsZoomed(false)}
        >
          <img
            src={img}
            alt={name}
            className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain rounded-xl shadow-2xl transform scale-90 opacity-0 animate-zoomIn cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-5 right-5 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
            onClick={() => setIsZoomed(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Tailwind Zoom Animation */}
      <style jsx>{`
        @keyframes zoomIn {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-zoomIn {
          animation: zoomIn 0.35s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }
      `}</style>
    </>
  );
}
