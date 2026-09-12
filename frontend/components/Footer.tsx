import React from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { SubText, SubTitle } from "./ui/text";
import { categoriesData, quickLinksData } from "@/constants/data";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-black/[0.06] relative">
      <div className="h-1 w-full bg-gradient-to-r from-shop_dark_green via-shop_light_green to-shop_orange" />
      <Container>
        <FooterTop />
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Logo />
            <SubText className="leading-relaxed">
              Discover curated furniture collections at ClickNibus, blending
              style and comfort to elevate your living spaces.
            </SubText>
            <SocialMedia
              className="text-darkColor/60"
              iconClassName="border-darkColor/15 hover:border-shop_light_green hover:bg-shop_light_green hover:text-white"
              tooltipClassName="bg-darkColor text-white"
            />
          </div>
          <div>
            <SubTitle className="text-base mb-1">Quick Links</SubTitle>
            <ul className="space-y-3 mt-4">
              {quickLinksData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="text-sm text-lightColor hover:text-shop_light_green hoverEffect font-medium"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SubTitle className="text-base mb-1">Categories</SubTitle>
            <ul className="space-y-3 mt-4">
              {categoriesData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={`/category/${item?.href}`}
                    className="text-sm text-lightColor hover:text-shop_light_green hoverEffect font-medium"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <SubTitle className="text-base mb-1">Newsletter</SubTitle>
            <SubText>
              Subscribe to get updates on new arrivals and exclusive offers.
            </SubText>
            <form className="space-y-3">
              <Input
                placeholder="Enter your email"
                type="email"
                required
                className="rounded-full h-11 px-4 focus-visible:ring-shop_light_green"
              />
              <Button className="w-full rounded-full h-11 group">
                Subscribe
                <ArrowRight size={15} className="group-hover:translate-x-0.5 hoverEffect" />
              </Button>
            </form>
          </div>
        </div>
        <div className="py-6 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-sm text-lightColor">
          <div className="flex items-center gap-1">
            © {new Date().getFullYear()} <Logo className="text-sm" />. All
            rights reserved.
          </div>
          <p className="text-xs text-lightColor/70">Built as a school project with Next.js &amp; Express</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
