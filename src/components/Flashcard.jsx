import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, X } from "lucide-react";

export default function Flashcard({
  id,
  name,
  price,
  oldPrice,
  img,
  rating,
  discount,
  onAddToCart,
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [shortcutZoom, setShortcutZoom] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setIsZoomed(false);
        setShortcutZoom(false);
      }
      if (e.key.toLowerCase() === "m") {
        setShortcutZoom(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* Product Card */}
      <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.03] w-full sm:w-56 md:w-60 lg:w-64 overflow-hidden border border-gray-100">
        {/* Image Section */}
        <div
          className="relative w-full h-64 sm:h-72 md:h-80 bg-gray-50 flex items-center justify-center cursor-pointer overflow-hidden"
          onClick={() => setIsZoomed(true)}
        >
          {/* Loader */}
          {isLoading && (
            <div className="absolute inset-0 animate-pulse bg-gray-100" />
          )}

          {/* Product Image */}
          <img
  src={img}
  alt={name}
  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
  onLoad={() => setIsLoading(false)}
/>

          {/* Discount Badge */}
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              -{discount}%
            </span>
          )}

          {/* Favorite Button */}
          <button
            aria-label="Add to wishlist"
            className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow hover:scale-110 transition"
          >
            <Heart className="w-5 h-5 text-red-500" />
          </button>
        </div>

        {/* Info Section */}
        <div className="p-4 flex flex-col gap-2">
          <Link
            to={`/flashsale/${id}`}
            className="font-semibold text-sm md:text-base text-gray-900 line-clamp-2 hover:text-pink-600 transition-colors"
          >
            {name}
          </Link>

          {typeof rating === "number" && rating > 0 && (
            <div className="flex items-center gap-1 text-yellow-400">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating
                      ? "fill-yellow-400"
                      : "fill-gray-300 text-gray-300"
                  }`}
                />
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">{price}</span>
            {oldPrice && (
              <span className="text-sm line-through text-gray-400">
                {oldPrice}
              </span>
            )}
          </div>

          {/* Modern Add to Cart Button */}
          <button
            onClick={() => onAddToCart?.({ id, name, price, img })}
            className="mt-2 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-2 rounded-xl shadow-lg hover:scale-105 hover:brightness-110 transition-all duration-300"
          >
            <ShoppingCart className="w-5 h-5" /> Add to Cart
          </button>
        </div>
      </div>

      {/* Zoom Overlay (Click) */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsZoomed(false)}
        >
          <img
            src={img}
            alt={name}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-2xl animate-zoomIn"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            aria-label="Close zoom"
            className="absolute top-5 right-5 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
            onClick={() => setIsZoomed(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Zoom Overlay (Shortcut M) */}
      {shortcutZoom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShortcutZoom(false)}
        >
          <img
            src="/images/j3.jpeg"
            alt="Sneakers"
            className="w-full h-full max-h-[550px] object-contain rounded-3xl shadow-2xl transition-transform duration-500 animate-zoomIn"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            aria-label="Close zoom"
            className="absolute top-5 right-5 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
            onClick={() => setShortcutZoom(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
}
