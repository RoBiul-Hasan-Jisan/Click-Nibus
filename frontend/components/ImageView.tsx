"use client";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  images?: string[];
  isStock?: number | undefined;
}

const ImageView = ({ images = [], isStock }: Props) => {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="w-full md:w-1/2 space-y-2 md:space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-h-[550px] min-h-[450px] border border-black/[0.06] bg-shop_light_bg rounded-2xl group overflow-hidden"
        >
          {active && (
            <Image
              src={active}
              alt="productImage"
              width={700}
              height={700}
              priority
              className={`w-full h-96 max-h-[550px] min-h-[500px] object-contain p-6 group-hover:scale-105 hoverEffect ${
                isStock === 0 ? "opacity-50 grayscale" : ""
              }`}
            />
          )}
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-6 gap-2.5 h-20 md:h-24">
        {images?.map((image, i) => (
          <button
            key={image + i}
            onClick={() => setActive(image)}
            className={`border rounded-lg overflow-hidden bg-shop_light_bg hoverEffect ${active === image ? "border-shop_dark_green ring-2 ring-shop_dark_green/20" : "border-black/[0.06] opacity-70 hover:opacity-100"}`}
          >
            <Image src={image} alt={`Thumbnail ${i}`} width={100} height={100} className="w-full h-full object-contain p-1" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageView;
