import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import ProductGrid from "@/components/ProductGrid";
import ShopByBrands from "@/components/ShopByBrands";
import { serverGet } from "@/lib/serverApi";
import { Category } from "@/types";

const Home = async () => {
  let categories: Category[] = [];
  try {
    const data = await serverGet<{ categories: Category[] }>("/categories");
    categories = data.categories?.slice(0, 6) || [];
  } catch {
    categories = [];
  }

  return (
    <Container className="pt-6 md:pt-8">
      <HomeBanner />
      <ProductGrid />
      <HomeCategories categories={categories} />
      <ShopByBrands />
    </Container>
  );
};

export default Home;
