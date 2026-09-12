"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const tabs = [
  { title: "Featured", value: "featured" },
  { title: "New", value: "new" },
  { title: "Hot", value: "hot" },
  { title: "Sale", value: "sale" },
];

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabbar = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <div className="flex items-center flex-wrap gap-5 justify-between">
      <div className="flex items-center gap-1 md:gap-1.5 text-sm font-semibold bg-shop_light_bg p-1 rounded-full">
        {tabs.map((item) => {
          const isActive = selectedTab === item.value;
          return (
            <button
              onClick={() => onTabSelect(item.value)}
              key={item.value}
              className={`relative px-4 py-1.5 md:px-6 md:py-2 rounded-full hoverEffect ${
                isActive ? "text-white" : "text-lightColor hover:text-shop_dark_green"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-shop_dark_green"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.title}</span>
            </button>
          );
        })}
      </div>
      <Link
        href={"/shop"}
        className="group flex items-center gap-1.5 border border-darkColor/15 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-shop_dark_green hover:text-white hover:border-shop_dark_green hoverEffect"
      >
        See all
        <ArrowRight size={14} className="group-hover:translate-x-0.5 hoverEffect" />
      </Link>
    </div>
  );
};

export default HomeTabbar;
