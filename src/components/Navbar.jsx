import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-white/20 backdrop-blur-md shadow-md">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-900 hover:text-pink-600 transition-colors"
        >
          Click Nibus
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-pink-600 transition">Home</Link>
          <Link to="/products" className="hover:text-pink-600 transition">Products</Link>
          <Link to="/cart" className="hover:text-pink-600 transition flex items-center gap-1">
            <ShoppingCart className="w-5 h-5" /> Cart
          </Link>
          <div className="flex gap-4">
            <Link
              to="/signin"
              className="px-4 py-2 border border-pink-500 text-pink-500 rounded-lg hover:bg-pink-500 hover:text-white transition"
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-900 hover:text-pink-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Glass Search Bar (Mobile) */}
      <div className="px-4 pb-2 md:hidden">
        <div className="relative bg-white/40 backdrop-blur-md border border-white/60 rounded-full shadow-inner w-full flex items-center px-4 py-2 transition-all hover:shadow-lg">
          <Search className="w-5 h-5 text-gray-600" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none ml-2 w-full text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden fixed top-0 left-0 w-3/4 h-full bg-white/95 backdrop-blur-lg z-40 flex flex-col items-center pt-24 gap-6 shadow-lg"
          >
            <Link
              to="/"
              className="text-gray-800 text-2xl font-semibold hover:text-pink-600"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-800 text-2xl font-semibold hover:text-pink-600"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-2 text-gray-800 text-2xl font-semibold hover:text-pink-600"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart className="w-6 h-6" /> Cart
            </Link>

            <div className="flex flex-col gap-4 mt-8 w-3/4">
              <Link
                to="/signin"
                className="w-full text-center px-6 py-3 border border-pink-500 text-pink-500 rounded-lg hover:bg-pink-500 hover:text-white transition-all"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/login"
                className="w-full text-center px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
