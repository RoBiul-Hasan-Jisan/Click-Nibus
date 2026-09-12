"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { ArrowRight, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { banner_1 } from "@/images";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const HomeBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-shop_dark_green">
      {/* ambient shapes */}
      <div className="pointer-events-none absolute -top-24 -right-16 w-72 h-72 rounded-full bg-shop_light_green/30 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-20 left-10 w-64 h-64 rounded-full bg-shop_orange/25 blur-3xl animate-float" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1.5px)",
          backgroundSize: "22px 22px",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 py-16 md:py-20 px-6 sm:px-10 lg:px-20 flex flex-col-reverse md:flex-row items-center justify-between gap-10"
      >
        <div className="space-y-6 max-w-xl text-center md:text-left">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-1.5 bg-white/10 text-shop_light_green rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide"
          >
            <Sparkles size={14} className="text-shop_orange" />
            New season arrivals
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-white leading-[1.08] tracking-tight"
          >
            Save up to <span className="text-shop_orange">50%</span> on
            select headphones
          </motion.h1>

          <motion.p variants={item} className="text-white/70 text-sm sm:text-base max-w-md mx-auto md:mx-0">
            Premium sound, everyday prices. Shop this week&apos;s featured
            audio deals before they&apos;re gone.
          </motion.p>

          <motion.div variants={item} className="flex items-center justify-center md:justify-start gap-4 pt-1">
            <Link
              href={"/shop"}
              className="group inline-flex items-center gap-2 bg-shop_orange text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg shadow-shop_orange/30 hover:bg-white hover:text-shop_dark_green hoverEffect"
            >
              Shop the deal
              <ArrowRight size={16} className="group-hover:translate-x-1 hoverEffect" />
            </Link>
            <Link
              href={"/deal"}
              className="text-sm font-semibold text-white/80 hover:text-white hoverEffect underline underline-offset-4 decoration-white/30"
            >
              View all deals
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="flex items-center justify-center md:justify-start gap-6 pt-3 text-white/70 text-xs"
          >
            <span className="flex items-center gap-1.5">
              <Truck size={16} className="text-shop_light_green" /> Free
              shipping over $100
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-shop_light_green" />
              Secure checkout
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative"
        >
          <div className="absolute inset-0 -z-10 rounded-full bg-white/10 blur-2xl scale-90" />
          <Image
            src={banner_1}
            alt="Featured headphone deal"
            className="w-56 sm:w-72 lg:w-96 drop-shadow-2xl animate-float"
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomeBanner;
