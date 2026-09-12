"use client";

import NoAccess from "@/components/NoAccess";
import WishListProducts from "@/components/WishListProducts";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

const WishListPage = () => {
  const { firebaseUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-shop_dark_green" />
      </div>
    );
  }

  return (
    <>
      {firebaseUser ? (
        <WishListProducts />
      ) : (
        <NoAccess details="Log in to view your wishlist items. Don't miss out on your cart products to make the payment!" />
      )}
    </>
  );
};

export default WishListPage;
