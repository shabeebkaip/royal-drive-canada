import Hero from "../components/home/Hero";
import BrowseSection from "@/components/home/BrowseSection";
import BuyingSelling from "@/components/home/BuyingSelling";
import FeaturedVehicles from "@/components/home/FeaturedVehicles";
import VehicleGrid from "@/components/home/VehicleGrid";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Royal Drive Canada - Toronto's Premier Used Car Dealership | OMVIC Licensed",
  description: "Shop premium pre-owned vehicles at Royal Drive Canada in Toronto. OMVIC licensed dealer offering safety-certified cars, flexible financing, trade-ins, and exceptional customer service. Visit us at 751 Danforth Road.",
  keywords: "Royal Drive Canada, used cars Toronto, pre-owned vehicles Toronto, OMVIC licensed dealer, safety certified cars, car financing Toronto, trade-in value, auto sales, quality used cars, car dealership Danforth Road",
  openGraph: {
    title: "Royal Drive Canada - Toronto's Premier Used Car Dealership",
    description: "Shop premium pre-owned vehicles at Toronto's trusted OMVIC licensed dealer. Safety-certified cars with financing available.",
    url: 'https://royaldrivecanada.com',
  },
};

export default function Home() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": "Royal Drive Canada",
    "description": "Premium used car dealership in Toronto offering quality pre-owned vehicles, financing options, and exceptional customer service.",
    "url": "https://royaldrivecanada.com",
    "logo": "https://royaldrivecanada.com/favicon.svg",
    "image": "https://royaldrivecanada.com/og-image.jpg",
    "telephone": "(647) 622-2202",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "751 Danforth Road",
      "addressLocality": "Toronto",
      "addressRegion": "ON",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.6426",
      "longitude": "-79.3871"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card", "Financing"],
    "areaServed": [
      "Toronto",
      "Scarborough", 
      "North York",
      "Etobicoke",
      "Mississauga",
      "Markham",
      "Richmond Hill",
      "Vaughan",
      "Brampton",
      "Greater Toronto Area"
    ],
    "serviceType": [
      "Used Car Sales",
      "Pre-owned Vehicle Sales", 
      "Car Financing",
      "Trade-in Services",
      "Vehicle Certification",
      "Auto Sales"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "OMVIC License",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Ontario Motor Vehicle Industry Council"
        }
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://www.facebook.com/royaldrivecanada",
      "https://www.instagram.com/royaldrivecanada",
      "https://twitter.com/royaldrivecanada"
    ]
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* SEO-optimized page content */}
      <div className="relative">
        <Hero />
        <BrowseSection />
        <BuyingSelling />
        <FeaturedVehicles />
        <VehicleGrid />
        <WhyChooseUs />
      </div>
    </>
  );
}
