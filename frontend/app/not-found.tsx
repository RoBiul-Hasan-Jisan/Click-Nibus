import Logo from "@/components/Logo";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] bg-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10 md:py-32">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Logo />
          </div>
          <p className="text-8xl font-black text-shop_dark_green/10 leading-none">404</p>
          <h2 className="!mt-2 text-2xl md:text-3xl font-extrabold text-darkColor tracking-tight">
            Looking for something?
          </h2>
          <p className="text-sm text-lightColor">
            We&apos;re sorry, the page you&apos;re looking for doesn&apos;t
            exist or may have been moved.
          </p>
        </div>
        <div className="space-y-3">
          <Link
            href="/"
            className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-full text-white bg-shop_dark_green hover:bg-shop_light_green hoverEffect"
          >
            Go to ClickNibus&apos; home page
          </Link>
          <Link
            href="/shop"
            className="w-full flex items-center justify-center px-4 py-3 border border-black/10 text-sm font-semibold rounded-full text-darkColor bg-white hover:border-shop_dark_green hoverEffect"
          >
            Browse the shop
          </Link>
        </div>
        <div className="text-center">
          <p className="text-sm text-lightColor">
            Need help? Visit the{" "}
            <Link href="/help" className="font-medium text-shop_dark_green hover:text-shop_light_green hoverEffect">
              Help section
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="font-medium text-shop_dark_green hover:text-shop_light_green hoverEffect">
              contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
