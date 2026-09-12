"use client";
import Link from "next/link";
import React from "react";

const SignIn = () => {
  return (
    <Link
      href="/sign-in"
      className="text-sm font-semibold bg-shop_dark_green text-white px-4 py-2 rounded-full hover:bg-shop_light_green hoverEffect"
    >
      Login
    </Link>
  );
};

export default SignIn;
