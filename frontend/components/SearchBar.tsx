import Link from "next/link";
import { Search } from "lucide-react";
import React from "react";

const SearchBar = () => {
  return (
    <Link href={"/shop"} className="group" title="Search products">
      <Search className="w-5 h-5 group-hover:text-shop_light_green group-hover:scale-110 hoverEffect" />
    </Link>
  );
};

export default SearchBar;
