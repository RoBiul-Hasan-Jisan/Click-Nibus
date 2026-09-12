"use client";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";
import SignIn from "./SignIn";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import { Logs, LogOut, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Order } from "@/types";

const Header = () => {
  const { firebaseUser, appUser, isAdmin, signOut } = useAuth();
  const [orderCount, setOrderCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!firebaseUser) {
      setOrderCount(0);
      return;
    }
    api
      .get<{ orders: Order[] }>("/orders/mine", { auth: true })
      .then(({ orders }) => setOrderCount(orders?.length || 0))
      .catch(() => setOrderCount(0));
  }, [firebaseUser]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 glass-panel hoverEffect ${
        scrolled
          ? "py-3 shadow-[0_8px_24px_-16px_rgba(11,61,46,0.45)] border-b border-black/5"
          : "py-5 border-b border-transparent"
      }`}
    >
      <Container className="flex items-center justify-between text-lightColor">
        <div className="w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0">
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-4 md:gap-5">
          <SearchBar />
          <CartIcon />
          <FavoriteButton />

          {firebaseUser && (
            <Link href={"/orders"} className="group relative hover:text-shop_light_green hoverEffect">
              <Logs className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-shop_orange text-white h-4 w-4 rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm animate-pop">
                {orderCount}
              </span>
            </Link>
          )}

          {isAdmin && (
            <Link
              href="/admin"
              className="hidden sm:flex items-center gap-1 text-sm font-semibold hover:text-shop_light_green hoverEffect"
              title="Admin dashboard"
            >
              <ShieldCheck size={18} /> Admin
            </Link>
          )}

          {firebaseUser ? (
            <button
              onClick={() => signOut()}
              className="hidden sm:flex items-center gap-1 text-sm font-semibold hover:text-darkColor text-lightColor hoverEffect"
              title={appUser?.email}
            >
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <SignIn />
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
