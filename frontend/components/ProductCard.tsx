import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Star, Flame } from "lucide-react";
import { Product } from "@/types";
import PriceView from "./PriceView";
import Title from "./Title";
import ProductSideMenu from "./ProductSideMenu";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="text-sm rounded-xl border border-black/[0.06] group bg-white overflow-hidden card-lift">
      <div className="relative overflow-hidden bg-shop_light_bg aspect-square">
        {product?.images?.[0] && (
          <Link href={`/product/${product?.slug}`}>
            <Image
              src={product.images[0]}
              alt="productImage"
              width={500}
              height={500}
              priority
              className={`w-full h-full object-contain p-4 transition-transform duration-500 ease-out
              ${product?.stock !== 0 ? "group-hover:scale-[1.08]" : "opacity-40 grayscale"}`}
            />
          </Link>
        )}
        <ProductSideMenu product={product} />
        {product?.status === "sale" ? (
          <span className="absolute top-2.5 left-2.5 z-10 text-[11px] font-bold uppercase tracking-wide bg-shop_dark_green text-white px-2.5 py-1 rounded-full shadow-sm">
            Sale
          </span>
        ) : (
          <Link
            href={"/deal"}
            className="absolute top-2.5 left-2.5 z-10 bg-white/90 backdrop-blur p-1.5 rounded-full shadow-sm border border-shop_orange/20 hover:border-shop_orange hoverEffect"
            title="See hot deals"
          >
            <Flame size={15} className="text-shop_orange/70 group-hover:text-shop_orange hoverEffect" />
          </Link>
        )}
        {product?.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/40">
            <span className="text-xs font-bold uppercase tracking-wide bg-darkColor text-white px-3 py-1 rounded-full">
              Sold out
            </span>
          </div>
        )}
      </div>
      <div className="p-3.5 flex flex-col gap-2">
        {product?.category?.name && (
          <p className="uppercase line-clamp-1 text-[10px] font-semibold tracking-wider text-lightColor/80">
            {product.category.name}
          </p>
        )}
        <Link href={`/product/${product?.slug}`}>
          <Title className="text-sm line-clamp-1 hover:text-shop_dark_green hoverEffect">{product?.name}</Title>
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={13}
                className={index < 4 ? "text-shop_light_green" : "text-lightText"}
                fill={index < 4 ? "#3FA34D" : "#d9d9d9"}
                strokeWidth={0}
              />
            ))}
          </div>
          <p className="text-lightText text-[11px] tracking-wide">(5)</p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span
            className={`h-1.5 w-1.5 rounded-full ${product?.stock === 0 ? "bg-red-500" : "bg-shop_light_green"}`}
          />
          <p className={product?.stock === 0 ? "text-red-600 font-medium" : "text-lightColor"}>
            {(product?.stock as number) > 0 ? `${product?.stock} in stock` : "Unavailable"}
          </p>
        </div>

        <PriceView price={product?.price} discountPercent={product?.discountPercent} className="text-sm" />
        <AddToCartButton product={product} className="w-full rounded-full" />
      </div>
    </div>
  );
};

export default ProductCard;
