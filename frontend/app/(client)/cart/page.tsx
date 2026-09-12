"use client";

import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import NoAccess from "@/components/NoAccess";
import PriceFormatter from "@/components/PriceFormatter";
import ProductSideMenu from "@/components/ProductSideMenu";
import QuantityButtons from "@/components/QuantityButtons";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import useStore from "@/store";
import { Address } from "@/types";
import { ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const emptyAddress: Address = {
  fullName: "",
  phone: "",
  addressLine: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

const CartPage = () => {
  const { deleteCartProduct, getTotalPrice, getItemCount, getSubTotalPrice, resetCart } = useStore();
  const [loading, setLoading] = useState(false);
  const groupedItems = useStore((state) => state.getGroupedItems());
  const { firebaseUser } = useAuth();
  const [address, setAddress] = useState<Address>(emptyAddress);

  const handleResetCart = () => {
    const confirmed = window.confirm("Are you sure you want to reset your cart?");
    if (confirmed) {
      resetCart();
      toast.success("Cart reset successfully!");
    }
  };

  const handleCheckout = async () => {
    if (!address.fullName || !address.addressLine || !address.city) {
      toast.error("Please fill in your delivery address");
      return;
    }
    setLoading(true);
    try {
      // Persist the address + cart snapshot so the success page can build the order
      // after Stripe redirects back (Stripe never sends cart contents itself).
      sessionStorage.setItem("checkout-address", JSON.stringify(address));

      const { url } = await api.post<{ url: string }>(
        "/checkout/create-session",
        {
          items: groupedItems.map(({ product, quantity }) => ({
            name: product.name,
            price: product.price,
            quantity,
            image: product.images?.[0],
          })),
          metadata: { address: JSON.stringify(address) },
        },
        { auth: true }
      );
      if (url) window.location.href = url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error(error instanceof Error ? error.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-shop_light_bg/60 pb-52 md:pb-10 min-h-[70vh]">
      {firebaseUser ? (
        <Container>
          {groupedItems?.length ? (
            <>
              <div className="flex items-center gap-2.5 py-6">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-shop_dark_green/10 text-shop_dark_green">
                  <ShoppingBag size={18} />
                </span>
                <Title className="!text-2xl">Shopping Cart</Title>
              </div>
              <div className="grid lg:grid-cols-3 md:gap-8">
                <div className="lg:col-span-2 rounded-lg">
                  <div className="border border-black/[0.06] bg-white rounded-2xl overflow-hidden">
                    {groupedItems?.map(({ product }) => {
                      const itemCount = getItemCount(product?._id);
                      return (
                        <div key={product?._id} className="border-b border-black/[0.06] p-3.5 last:border-b-0 flex items-center justify-between gap-5 hover:bg-shop_light_bg/50 hoverEffect">
                          <div className="flex flex-1 items-start gap-2 h-36 md:h-44">
                            {product?.images?.[0] && (
                              <Link href={`/product/${product?.slug}`} className="border border-black/[0.06] bg-shop_light_bg p-1.5 mr-2 rounded-xl overflow-hidden group">
                                <Image
                                  src={product.images[0]}
                                  alt="productImage"
                                  width={500}
                                  height={500}
                                  loading="lazy"
                                  className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 hoverEffect"
                                />
                              </Link>
                            )}
                            <div className="h-full flex flex-1 flex-col justify-between py-1">
                              <div className="flex flex-col gap-0.5 md:gap-1.5">
                                <h2 className="text-base font-semibold line-clamp-1">{product?.name}</h2>
                                <p className="text-sm capitalize">
                                  Status: <span className="font-semibold">{product?.status || "—"}</span>
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <ProductSideMenu product={product} className="relative top-0 right-0" />
                                    </TooltipTrigger>
                                    <TooltipContent className="font-bold">Add to Favorite</TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Trash
                                        onClick={() => {
                                          deleteCartProduct(product?._id);
                                          toast.success("Product deleted successfully!");
                                        }}
                                        className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect"
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent className="font-bold bg-red-600">Delete product</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1">
                            <PriceFormatter amount={(product?.price as number) * itemCount} className="font-bold text-lg" />
                            <QuantityButtons product={product} />
                          </div>
                        </div>
                      );
                    })}
                    <Button onClick={handleResetCart} className="m-4 rounded-full font-semibold" variant="destructive" size="sm">
                      Reset Cart
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="lg:col-span-1 space-y-5">
                    <Card className="rounded-2xl border-black/[0.06] shadow-none">
                      <CardHeader>
                        <CardTitle className="text-base">Delivery Address</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Input placeholder="Full name" value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} />
                        <Input placeholder="Phone" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} />
                        <Input placeholder="Address line" value={address.addressLine} onChange={(e) => setAddress({ ...address, addressLine: e.target.value })} />
                        <div className="grid grid-cols-2 gap-2">
                          <Input placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                          <Input placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input placeholder="ZIP" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} />
                          <Input placeholder="Country" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} />
                        </div>
                      </CardContent>
                    </Card>
                    <div className="hidden md:inline-block w-full bg-white p-6 rounded-2xl border border-black/[0.06]">
                      <h2 className="text-lg font-bold mb-4 text-darkColor">Order Summary</h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>SubTotal</span>
                          <PriceFormatter amount={getSubTotalPrice()} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Discount</span>
                          <PriceFormatter amount={getSubTotalPrice() - getTotalPrice()} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between font-semibold text-lg">
                          <span>Total</span>
                          <PriceFormatter amount={getTotalPrice()} className="text-lg font-bold text-black" />
                        </div>
                        <Button className="w-full rounded-full font-semibold tracking-wide hoverEffect" size="lg" disabled={loading} onClick={handleCheckout}>
                          {loading ? "Please wait..." : "Proceed to Checkout"}
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                          Stripe test mode — use card 4242 4242 4242 4242, any future date/CVC.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:hidden fixed bottom-0 left-0 w-full bg-white pt-2 border-t border-black/[0.06]">
                  <div className="bg-white p-4 rounded-2xl border border-black/[0.06] mx-4 shadow-lg">
                    <h2>Order Summary</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Total</span>
                        <PriceFormatter amount={getTotalPrice()} className="text-lg font-bold text-black" />
                      </div>
                      <Button className="w-full rounded-full font-semibold tracking-wide hoverEffect" size="lg" disabled={loading} onClick={handleCheckout}>
                        {loading ? "Please wait..." : "Proceed to Checkout"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccess />
      )}
    </div>
  );
};

export default CartPage;
