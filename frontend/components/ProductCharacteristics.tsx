import { Product } from "@/types";
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const ProductCharacteristics = ({ product }: { product: Product | null | undefined }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>{product?.name}: Characteristics</AccordionTrigger>
        <AccordionContent>
          <p className="flex items-center justify-between">
            Brand:{" "}
            <span className="font-semibold tracking-wide">{product?.brand?.name || "—"}</span>
          </p>
          <p className="flex items-center justify-between">
            Category:{" "}
            <span className="font-semibold tracking-wide">{product?.category?.name || "—"}</span>
          </p>
          <p className="flex items-center justify-between">
            Stock:{" "}
            <span className="font-semibold tracking-wide">
              {product?.stock ? "Available" : "Out of Stock"}
            </span>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCharacteristics;
