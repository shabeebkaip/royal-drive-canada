import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const vehiclesPageMetadata: Metadata = createMetadata({
  title: "Used Cars for Sale in Toronto | Browse Our Inventory",
  description: "Browse our extensive inventory of quality pre-owned vehicles at Royal Drive Canada. OMVIC licensed dealer offering safety-certified cars, SUVs, and trucks in Toronto. Financing available.",
  keywords: [
    "used cars inventory",
    "pre-owned vehicles Toronto",
    "car inventory Toronto",
    "browse used cars",
    "SUVs for sale",
    "trucks for sale Toronto",
  ],
  path: "/vehicles",
});
