import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Logo from "./Logo";
import Link from "next/link";
import { Button } from "./ui/button";

const NoAccess = ({
  details = "Log in to view your cart items and checkout. Don't miss out on your favorite products!",
}: {
  details?: string;
}) => {
  return (
    <div className="flex items-center justify-center py-12 md:py-32 bg-shop_light_bg p-4">
      <Card className="w-full max-w-md p-6 rounded-2xl shadow-lg border-black/[0.06]">
        <CardHeader className="flex items-center flex-col">
          <Logo />
          <CardTitle className="text-2xl font-bold text-center">Welcome Back!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center font-medium text-darkColor/80">{details}</p>
          <Link href="/sign-in">
            <Button className="w-full rounded-full" size="lg">
              Sign in
            </Button>
          </Link>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">Don&rsquo;t have an account?</div>
          <Link href="/sign-up" className="w-full">
            <Button variant="outline" className="w-full rounded-full" size="lg">
              Create an account
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoAccess;
