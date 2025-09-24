import { Star } from "lucide-react";
import ProductCard from "../components/ProductCard";

const justForYou = [
  { id: 1, name: "Laptop Backpack", price: "$39", img: "/images/j1.jpg" },
  { id: 2, name: "Bluetooth Speaker", price: "$59", img: "/images/j2.jpeg" },
  { id: 3, name: "Sneakers", price: "$89", img: "/images/j3.jpg" },
  { id: 4, name: "Coffee Maker", price: "$129", img: "/images/j4.jpeg" },
  { id: 5, name: "Laptop Backpack", price: "$39", img: "/images/j1.jpg" },
  { id: 6, name: "Bluetooth Speaker", price: "$59", img: "/images/j2.jpeg" },
  { id: 7, name: "Sneakers", price: "$89", img: "/images/j3.jpeg" },
  { id: 8, name: "Coffee Maker", price: "$129", img: "/images/j4.jpeg" },
];

export default function JustForYou() {
  return (
    <section className="px-4 sm:px-6 lg:px-12 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-500 animate-pulse" /> Just For You
        </h2>
        <button className="text-sm md:text-base text-pink-600 hover:text-pink-500 font-semibold transition">
          See All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {justForYou.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}               // pass id for linking
            name={p.name}
            price={p.price}
            img={p.img}
            rating={Math.floor(Math.random() * 5) + 1}
            discount={p.id % 2 === 0 ? 15 : 0}
          />
        ))}
      </div>
    </section>
  );
}
