"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "motion/react";
import NoProductAvailable from "./NoProductAvailable";
import Container from "./Container";
import HomeTabbar from "./HomeTabbar";
import { Product } from "@/types";
import { api } from "@/lib/api";

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("featured");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = selectedTab === "featured" ? "featured=true" : `status=${selectedTab}`;
        const { products } = await api.get<{ products: Product[] }>(`/products?${query}`);
        setProducts(products);
      } catch (error) {
        console.log("Product fetching Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedTab]);

  return (
    <Container className="flex flex-col lg:px-0 my-10">
      <HomeTabbar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 mt-10">
          {[...Array(10)].map((_, i) => (
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
      ) : products?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 mt-10">
          <>
            {products?.map((product) => (
              <AnimatePresence key={product?._id}>
                <motion.div layout initial={{ opacity: 0.2 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <ProductCard key={product?._id} product={product} />
                </motion.div>
              </AnimatePresence>
            ))}
          </>
        </div>
      ) : (
        <NoProductAvailable selectedTab={selectedTab} />
      )}
    </Container>
  );
};

export default ProductGrid;
