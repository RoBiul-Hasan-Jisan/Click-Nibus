"use client";
import React from "react";
import { motion, type Variants } from "motion/react";
import { Title } from "./ui/text";
import { Category } from "@/types";
import Image from "next/image";
import Link from "next/link";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

const HomeCategories = ({ categories }: { categories: Category[] }) => {
  if (!categories?.length) return null;

  return (
    <section className="my-14 md:my-24">
      <div className="flex items-end justify-between mb-8">
        <div className="section-heading">
          <Title className="!text-2xl md:!text-3xl">Popular categories</Title>
        </div>
        <p className="hidden sm:block text-sm text-lightColor">Browse by what you need</p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {categories?.map((category) => (
          <motion.div key={category?._id} variants={item}>
            <Link
              href={`/category/${category?.slug}`}
              className="group flex flex-col items-center gap-3 bg-white border border-black/[0.06] rounded-2xl p-5 card-lift"
            >
              {category?.image && (
                <div className="w-16 h-16 rounded-full bg-shop_light_bg overflow-hidden p-2.5 group-hover:bg-shop_light_green/10 hoverEffect">
                  <Image
                    src={category.image}
                    alt={category?.name || "category"}
                    width={200}
                    height={200}
                    className="w-full h-full object-contain group-hover:scale-110 hoverEffect"
                  />
                </div>
              )}
              <h3 className="text-sm font-semibold text-darkColor text-center line-clamp-1 group-hover:text-shop_dark_green hoverEffect">
                {category?.name}
              </h3>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HomeCategories;
