import { useState } from "react";
import { X, ShoppingCart } from "lucide-react";

export default function Cart() {
  // Sample cart items
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Smart Watch", price: 199, image: "/images/watch.jpeg", qty: 1 },
    { id: 2, name: "Wireless Earbuds", price: 99, image: "/images/earbuds.jpeg", qty: 2 },
  ]);

  // Remove item
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Update quantity
  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCartItems(cartItems.map(item => item.id === id ? { ...item, qty } : item));
  };

  // Calculate total
  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <section className="px-6 sm:px-8 lg:px-12 py-10 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <ShoppingCart className="w-6 h-6" /> Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-contain rounded-lg" />
              <div className="flex-1 flex flex-col">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600">${item.price} each</p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => updateQty(item.id, item.qty - 1)}
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => updateQty(item.id, item.qty + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}

          {/* Total & Checkout */}
          <div className="flex justify-between items-center mt-6 p-4 bg-gray-100 rounded-xl">
            <span className="text-xl font-bold">Total: ${total}</span>
            <button className="bg-pink-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-pink-600 transition">
              Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
