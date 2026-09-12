import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import FavoriteButton from "@/components/FavoriteButton";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import ProductCharacteristics from "@/components/ProductCharacteristics";
import { serverGet } from "@/lib/serverApi";
import { Product } from "@/types";
import { CornerDownLeft, Star, Truck } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { RxBorderSplit } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";

const SingleProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  let product: Product | null = null;
  try {
    const data = await serverGet<{ product: Product }>(`/products/${slug}`);
    product = data.product;
  } catch {
    return notFound();
  }
  if (!product) return notFound();

  return (
    <Container className="flex flex-col md:flex-row gap-10 py-10 md:py-14">
      {product?.images && <ImageView images={product?.images} isStock={product?.stock} />}
      <div className="w-full md:w-1/2 flex flex-col gap-5">
        <div className="space-y-2">
          {product?.category?.name && (
            <p className="uppercase text-xs font-semibold tracking-wider text-shop_light_green">
              {product.category.name}
            </p>
          )}
          <h2 className="text-2xl md:text-3xl font-extrabold text-darkColor tracking-tight">{product?.name}</h2>
          <p className="text-sm text-lightColor tracking-wide leading-relaxed">{product?.description}</p>
          <div className="flex items-center gap-0.5 text-xs">
            {[...Array(5)].map((_, index) => (
              <Star key={index} size={12} className="text-shop_light_green" fill={"#3FA34D"} strokeWidth={0} />
            ))}
            <p className="font-semibold text-lightColor ml-1">{`(120 reviews)`}</p>
          </div>
        </div>
        <div className="space-y-3 border-t border-b border-black/[0.06] py-5">
          <PriceView price={product?.price} discountPercent={product?.discountPercent} className="text-xl font-extrabold" />
          <p
            className={`px-3.5 py-1.5 text-xs text-center inline-flex items-center gap-1.5 font-semibold rounded-full ${product?.stock === 0 ? "bg-red-50 text-red-600" : "text-shop_light_green bg-shop_light_green/10"}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${product?.stock === 0 ? "bg-red-500" : "bg-shop_light_green"}`} />
            {(product?.stock as number) > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>
        <div className="flex items-center gap-2.5 lg:gap-3">
          <AddToCartButton product={product} />
          <FavoriteButton showProduct={true} product={product} />
        </div>
        <ProductCharacteristics product={product} />
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-black/[0.06] py-5 -mt-2 text-lightColor">
          <div className="flex items-center gap-2 text-sm hover:text-shop_dark_green hoverEffect">
            <RxBorderSplit className="text-lg" />
            <p>Compare color</p>
          </div>
          <div className="flex items-center gap-2 text-sm hover:text-shop_dark_green hoverEffect">
            <FaRegQuestionCircle className="text-lg" />
            <p>Ask a question</p>
          </div>
          <div className="flex items-center gap-2 text-sm hover:text-shop_dark_green hoverEffect">
            <TbTruckDelivery className="text-lg" />
            <p>Delivery &amp; Return</p>
          </div>
          <div className="flex items-center gap-2 text-sm hover:text-shop_dark_green hoverEffect">
            <FiShare2 className="text-lg" />
            <p>Share</p>
          </div>
        </div>
        <div className="flex flex-col rounded-xl overflow-hidden border border-black/[0.06]">
          <div className="p-4 flex items-center gap-3 bg-shop_light_bg border-b border-black/[0.06]">
            <span className="flex items-center justify-center w-11 h-11 rounded-full bg-white text-shop_orange shrink-0">
              <Truck size={22} />
            </span>
            <div>
              <p className="text-sm font-semibold text-darkColor">Free Delivery</p>
              <p className="text-xs text-lightColor underline underline-offset-2 decoration-lightColor/30">
                Enter your postal code for delivery availability
              </p>
            </div>
          </div>
          <div className="p-4 flex items-center gap-3 bg-white">
            <span className="flex items-center justify-center w-11 h-11 rounded-full bg-shop_light_bg text-shop_orange shrink-0">
              <CornerDownLeft size={22} />
            </span>
            <div>
              <p className="text-sm font-semibold text-darkColor">Return Delivery</p>
              <p className="text-xs text-lightColor">
                Free 30-day returns.{" "}
                <span className="underline underline-offset-2 decoration-lightColor/30">Details</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleProductPage;
