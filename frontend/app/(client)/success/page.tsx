"use client";

import useStore from "@/store";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Check, Home, Package, ShoppingBag, Loader2 } from "lucide-react";
import Link from "next/link";
import { Address } from "@/types";

const SuccessPageContent = () => {
  const { resetCart, getGroupedItems, getTotalPrice } = useStore();
  const { firebaseUser, loading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [status, setStatus] = useState<"working" | "done" | "error">("working");
  const hasRun = useRef(false);

  useEffect(() => {
    if (authLoading || hasRun.current || !sessionId || !firebaseUser) return;
    hasRun.current = true;

    const placeOrder = async () => {
      try {
        const items = getGroupedItems();
        if (!items.length) {
          setStatus("done"); // already placed (e.g. page refresh) — nothing left to do
          return;
        }
        const addressRaw = sessionStorage.getItem("checkout-address");
        const address: Address | undefined = addressRaw ? JSON.parse(addressRaw) : undefined;

        const { order } = await api.post<{ order: { orderNumber: string } }>(
          "/orders",
          {
            items: items.map(({ product, quantity }) => ({
              product: product._id,
              name: product.name,
              image: product.images?.[0],
              price: product.price,
              quantity,
            })),
            totalAmount: getTotalPrice(),
            shippingAddress: address,
            paymentMethod: "stripe",
            stripeSessionId: sessionId,
            paymentStatus: "paid",
          },
          { auth: true }
        );

        setOrderNumber(order.orderNumber);
        sessionStorage.removeItem("checkout-address");
        resetCart();
        setStatus("done");
      } catch (err) {
        console.error("Failed to record order:", err);
        setStatus("error");
      }
    };

    placeOrder();
  }, [authLoading, firebaseUser, sessionId, getGroupedItems, getTotalPrice, resetCart]);

  if (status === "working") {
    return (
      <div className="py-20 flex flex-col items-center gap-3 text-shop_dark_green">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p>Finalizing your order...</p>
      </div>
    );
  }

  return (
    <div className="py-5 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mx-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl flex flex-col gap-8 shadow-2xl p-6 max-w-xl w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
        >
          <Check className="text-white w-10 h-10" />
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        <div className="space-y-4 mb-4 text-left">
          <p className="text-gray-700">
            Thank you for your purchase. We&apos;re processing your order and will ship it soon.
          </p>
          {orderNumber && (
            <p className="text-gray-700">
              Order Number: <span className="text-black font-semibold">{orderNumber}</span>
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/" className="flex items-center justify-center px-4 py-3 font-semibold bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md">
            <Home className="w-5 h-5 mr-2" />
            Home
          </Link>
          <Link href="/orders" className="flex items-center justify-center px-4 py-3 font-semibold bg-lightGreen text-black border border-lightGreen rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-md">
            <Package className="w-5 h-5 mr-2" />
            Orders
          </Link>
          <Link href="/shop" className="flex items-center justify-center px-4 py-3 font-semibold bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Shop
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

const SuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
};

export default SuccessPage;
