"use client";
import React, { useEffect, useState } from "react";
import { motion, type Variants } from "motion/react";
import { Title } from "./ui/text";
import Link from "next/link";
import Image from "next/image";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";
import { Brand } from "@/types";
import { api } from "@/lib/api";

const extraData = [
  { title: "Free Delivery", description: "Free shipping over $100", icon: <Truck size={24} /> },
  { title: "Free Return", description: "Within 30 days", icon: <GitCompareArrows size={24} /> },
  { title: "Customer Support", description: "Friendly 24/7 support", icon: <Headset size={24} /> },
  { title: "Money Back", description: "Quality checked", icon: <ShieldCheck size={24} /> },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

const ShopByBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    api
      .get<{ brands: Brand[] }>("/brands")
      .then(({ brands }) => setBrands(brands))
      .catch(() => {});
  }, []);

  return (
    <section className="mb-14 lg:mb-24">
      <div className="bg-white border border-black/[0.06] rounded-2xl p-6 lg:p-9">
        <div className="flex items-center gap-5 justify-between mb-8">
          <div className="section-heading">
            <Title className="!text-2xl md:!text-3xl">Shop by brands</Title>
          </div>
          <Link
            href={"/shop"}
            className="text-sm font-semibold text-shop_dark_green hover:text-shop_light_green hoverEffect underline underline-offset-4 decoration-shop_dark_green/20"
          >
            View all
          </Link>
        </div>

        {brands?.length > 0 && (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3"
          >
            {brands?.map((brand) => (
              <motion.div key={brand?._id} variants={item}>
                <Link
                  href={{ pathname: "/shop", query: { brand: brand?.slug } }}
                  className="bg-shop_light_bg h-24 flex items-center justify-center rounded-xl overflow-hidden hover:shadow-md hover:shadow-shop_dark_green/10 border border-transparent hover:border-shop_light_green/30 hoverEffect"
                >
                  {brand?.logo ? (
                    <Image
                      src={brand.logo}
                      alt={brand?.name || "brand"}
                      width={250}
                      height={250}
                      className="w-24 h-16 object-contain"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-darkColor/70">{brand?.name}</span>
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 pt-8 border-t border-dashed border-black/10">
          {extraData?.map((data, index) => (
            <div key={index} className="flex items-center gap-3.5 group">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-shop_light_green/10 text-shop_light_green group-hover:bg-shop_dark_green group-hover:text-white hoverEffect shrink-0">
                {data?.icon}
              </span>
              <div className="text-sm">
                <p className="text-darkColor font-semibold">{data?.title}</p>
                <p className="text-lightColor text-xs mt-0.5">{data?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByBrands;
