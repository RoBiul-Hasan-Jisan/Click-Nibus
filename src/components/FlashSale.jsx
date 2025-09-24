import { Flame } from "lucide-react"; // use Flame instead of Fire
import Flashcard from "../components/Flashcard";

export default function FlashSale() {
  const flashSaleProducts = [
     { id:101, name: "Wireless Headphones", price: "$49", oldPrice: "$99", img: "/images/p3.jpeg", rating: 4, discount: 50 },
    { id: 102, name: "Smart Watch", price: "$79", oldPrice: "$129", img: "/images/p2.jpeg", rating: 5, discount: 40 },
    { id: 103, name: "Gaming Mouse", price: "$25", oldPrice: "$50", img: "/images/p1.jpeg", rating: 3, discount: 50 },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 text-pink-600 animate-pulse">
          <Flame className="w-6 h-6" /> Flash Sale
        </h2>
        <button className="text-sm md:text-base text-pink-600 hover:text-pink-500 font-semibold transition">
          See All
        </button>
      </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
  {flashSaleProducts.map((p) => (
    <Flashcard
      key={p.id}
      id={p.id}           // <-- Add this
      name={p.name}
      price={p.price}
      oldPrice={p.oldPrice}
      img={p.img}
      rating={p.rating}
      discount={p.discount}
    />
  ))}
</div>

    </section>
  );
}
