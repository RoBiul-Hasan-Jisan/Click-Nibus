"use client";
import { Product } from "@/types";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import useStore from "@/store";
import toast from "react-hot-toast";
import PriceFormatter from "./PriceFormatter";
import QuantityButtons from "./QuantityButtons";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const { addItem, getItemCount } = useStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;

  const handleAddToCart = () => {
    if ((product?.stock as number) > itemCount) {
      addItem(product);
      toast.success(
        `${product?.name?.substring(0, 12)}... added successfully!`
      );
    } else {
      toast.error("Can not add more than available stock");
    }
  };
  return (
    <div className="w-full h-12 flex items-center">
      {itemCount ? (
        <div className="text-sm w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs text-darkColor/80">Quantity</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product?.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <motion.div whileTap={{ scale: 0.96 }} className="w-full">
          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={cn(
              "w-full bg-shop_dark_green text-white shadow-none border border-shop_dark_green font-semibold tracking-wide hover:bg-shop_dark_green hover:brightness-110 hover:translate-y-0 hoverEffect",
              className
            )}
          >
            <ShoppingBag size={16} /> {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default AddToCartButton;
