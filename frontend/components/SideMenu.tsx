import React, { FC } from "react";
import Logo from "./Logo";
import { X } from "lucide-react";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialMedia from "./SocialMedia";
import { useOutsideClick } from "@/hooks";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);
  return (
    <div
      className={`fixed inset-y-0 h-screen left-0 z-50 w-full text-white/70 shadow-xl hoverEffect ${
        isOpen ? "translate-x-0 bg-black/50" : "-translate-x-full bg-black/0"
      }`}
    >
      <div
        ref={sidebarRef}
        className="min-w-72 max-w-96 bg-shop_dark_green h-screen p-10 border-r border-r-shop_light_green/40 flex flex-col gap-8 shadow-2xl"
      >
        <div className="flex items-center justify-between gap-5">
          <Logo className="text-white" spanDesign="bg-white text-shop_dark_green" />
          <button
            onClick={onClose}
            className="hover:text-shop_light_green hover:rotate-90 hoverEffect"
          >
            <X />
          </button>
        </div>

        <div className="flex flex-col space-y-4 font-semibold tracking-wide text-lg">
          {headerData?.map((item) => (
            <Link
              href={item?.href}
              key={item?.title}
              onClick={onClose}
              className={`hover:text-shop_light_green hover:translate-x-1 hoverEffect w-fit ${
                pathname === item?.href && "text-shop_light_green"
              }`}
            >
              {item?.title}
            </Link>
          ))}
        </div>
        <div className="mt-auto">
          <SocialMedia
            className="text-white/70"
            iconClassName="border-white/20 hover:border-shop_light_green hover:bg-shop_light_green hover:text-white"
            tooltipClassName="bg-white text-darkColor"
          />
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
