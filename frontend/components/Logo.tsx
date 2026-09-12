import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Logo = ({
  className,
  spanDesign,
}: {
  className?: string;
  spanDesign?: string;
}) => {
  return (
    <Link href={"/"} className="inline-flex items-center gap-2 group">
      <span
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-lg bg-shop_dark_green text-white text-sm font-black shadow-sm group-hover:bg-shop_light_green group-hover:rotate-6 hoverEffect",
          spanDesign
        )}
      >
        C
      </span>
      <h2
        className={cn(
          "text-xl text-darkColor font-black tracking-tight group-hover:text-shop_dark_green hoverEffect font-sans",
          className
        )}
      >
        ClickNibu
        <span className="text-shop_light_green group-hover:text-shop_orange hoverEffect">s</span>
      </h2>
    </Link>
  );
};

export default Logo;
