"use client";
import { Category, Brand, Product } from "@/types";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import Title from "./Title";
import CategoryList from "./shop/CategoryList";
import { useSearchParams } from "next/navigation";
import BrandList from "./shop/BrandList";
import PriceList from "./shop/PriceList";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";
import { api } from "@/lib/api";

interface Props {
  categories: Category[];
  brands: Brand[];
}
const Shop = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();
  const brandParams = searchParams?.get("brand");
  const categoryParams = searchParams?.get("category");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParams || null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(brandParams || null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory) params.set("category", selectedCategory);
      if (selectedBrand) params.set("brand", selectedBrand);
      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-");
        params.set("minPrice", min);
        params.set("maxPrice", max);
      }
      params.set("limit", "100");
      const { products } = await api.get<{ products: Product[] }>(`/products?${params.toString()}`);
      setProducts(products);
    } catch (error) {
      console.log("Shop product fetching Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedBrand, selectedPrice]);

  return (
    <div className="border-t border-black/[0.06] bg-shop_light_bg/40">
      <Container className="mt-6 pb-16">
        <div className="sticky top-0 z-10 mb-6 bg-shop_light_bg/40 backdrop-blur-sm pt-2">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <Title className="text-lg md:text-xl">Find products that fit your needs</Title>
            {(selectedCategory !== null || selectedBrand !== null || selectedPrice !== null) && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand(null);
                  setSelectedPrice(null);
                }}
                className="text-shop_dark_green text-sm font-semibold hover:text-shop_light_green hoverEffect underline underline-offset-4"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:sticky md:top-24 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 space-y-4 scrollbar-hide">
            <CategoryList categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <BrandList brands={brands} setSelectedBrand={setSelectedBrand} selectedBrand={selectedBrand} />
            <PriceList setSelectedPrice={setSelectedPrice} selectedPrice={selectedPrice} />
          </div>
          <div className="flex-1">
            <div className="h-[calc(100vh-160px)] overflow-y-auto pr-1 scrollbar-hide">
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="rounded-xl border border-black/[0.06] overflow-hidden bg-white">
                      <div className="aspect-square skeleton-shimmer" />
                      <div className="p-3.5 space-y-2">
                        <div className="h-2.5 w-1/3 rounded skeleton-shimmer" />
                        <div className="h-3.5 w-3/4 rounded skeleton-shimmer" />
                        <div className="h-3.5 w-1/2 rounded skeleton-shimmer" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : products?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products?.map((product) => (
                    <ProductCard key={product?._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoProductAvailable className="bg-white mt-0" />
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
