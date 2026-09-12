"use client";
import useStore from "@/store";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";
import { AnimatePresence, motion } from "motion/react";

const CartIcon = () => {
  const { items } = useStore();
  const count = items?.length ? items.length : 0;
  return (
    <Link href={"/cart"} className="group relative">
      <ShoppingBag className="w-5 h-5 group-hover:text-shop_light_green hoverEffect" />
      <AnimatePresence>
        <motion.span
          key={count}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
          className="absolute -top-1.5 -right-1.5 bg-shop_orange text-white h-4 w-4 rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm"
        >
          {count}
        </motion.span>
      </AnimatePresence>
    </Link>
  );
};

export default CartIcon;
