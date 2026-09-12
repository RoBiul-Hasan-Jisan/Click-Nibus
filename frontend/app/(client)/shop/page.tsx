import Shop from "@/components/Shop";
import { serverGet } from "@/lib/serverApi";
import { Category, Brand } from "@/types";
import React from "react";

const ShopPage = async () => {
  const [{ categories }, { brands }] = await Promise.all([
    serverGet<{ categories: Category[] }>("/categories"),
    serverGet<{ brands: Brand[] }>("/brands"),
  ]);
  return (
    <div className="bg-white">
      <Shop categories={categories} brands={brands} />
    </div>
  );
};

export default ShopPage;
