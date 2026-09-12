import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import Title from "@/components/Title";
import { serverGet } from "@/lib/serverApi";
import { Product } from "@/types";
import React from "react";

const BrandPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const { products } = await serverGet<{ products: Product[] }>(`/products?brand=${slug}&limit=100`);
  return (
    <div className="py-10">
      <Container>
        <Title>
          Products by Brand: <span className="font-bold text-green-600 capitalize tracking-wide">{slug}</span>
        </Title>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-5">
          {products?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BrandPage;
