import { useParams, Link } from "react-router-dom";
import { Star, Heart, ShoppingCart } from "lucide-react";

const mainProducts = [
  
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

export default function MainDetails() {
  const { id } = useParams();
  const product = mainProducts.find((p) => p.id === parseInt(id));

  if (!product) return <p className="text-center mt-10">Product not found!</p>;

  return (
    <div className="px-6 sm:px-8 lg:px-12 py-10 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10">
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-auto object-contain rounded-2xl shadow-lg" />
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            <span className="line-through text-gray-400">${product.oldPrice}</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < product.rating ? "fill-yellow-400" : "fill-gray-300 text-gray-300"}`} />
            ))}
          </div>
          <p className="text-gray-600">{product.description}</p>
          <button className="mt-4 flex items-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-2xl shadow hover:bg-pink-600 transition">
            <ShoppingCart className="w-5 h-5" /> Add to Cart
          </button>
          <Link to="/main" className="text-pink-600 mt-4 inline-block hover:underline">Back to Main</Link>
        </div>
      </div>
    </div>
  );
}
