import Hero from "../components/home/Hero";
import MegaMenuBar from "@/components/home/MegaMenuBar";
import BrowseSection from "@/components/home/BrowseSection";
import BuyingSelling from "@/components/home/BuyingSelling";
import FeaturedVehicles from "@/components/home/FeaturedVehicles";
import LatestVehicles from "@/components/home/LatestVehicles";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { Metadata } from "next";
import { createMetadata, generateBusinessStructuredData, generateWebsiteStructuredData, generateJsonLd } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Royal Drive Canada - Toronto's Premier Used Car Dealership | OMVIC Licensed",
  description: "Shop premium pre-owned vehicles at Royal Drive Canada in Toronto. OMVIC licensed dealer offering safety-certified cars, flexible financing, trade-ins, and exceptional customer service. Visit us at 751 Danforth Road.",
  keywords: ["Toronto premier dealer", "Danforth Road dealership", "trade-in value"],
  path: "/",
});

export default function Home() {
  // Structured Data for SEO
  const businessData = generateBusinessStructuredData();
  const websiteData = generateWebsiteStructuredData();
  const structuredData = [businessData, websiteData];

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateJsonLd(structuredData) }}
      />
      
      {/* SEO-optimized page content */}
      <div className="relative">
        <MegaMenuBar />
        <Hero />
        <BrowseSection />
        <BuyingSelling />
        <FeaturedVehicles />
        <LatestVehicles />
        <WhyChooseUs />
      </div>
    </>
  );
}
