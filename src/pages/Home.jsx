import Hero from "../components/Hero";
import FlashSale from "../components/FlashSale";
import Categories from "../components/Categories";
import JustForYou from "../components/JustForYou";

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <FlashSale />
      <Categories />
      <JustForYou />
    </div>
  );
}
