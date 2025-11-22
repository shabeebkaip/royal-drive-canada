import React from "react";
import { Metadata } from "next";
import CertificationsSection from "@/components/about/CertificationsSection";
import HeroSection from "@/components/about/HeroSection";
import OurStory from "@/components/about/OurStory";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About Royal Drive Canada - OMVIC Licensed Used Car Dealer Toronto",
  description:
    "Learn about Royal Drive Canada, Toronto's trusted OMVIC licensed used car dealership. Over 10 years of experience providing quality pre-owned vehicles, exceptional customer service, and reliable auto sales in the GTA.",
  keywords: [
    "dealer history",
    "automotive expertise",
    "customer service excellence",
  ],
  path: "/about",
  type: "article",
});

const Page = () => {
  // Structured Data for About page
  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "AutoDealer",
      name: "Royal Drive Canada",
      foundingDate: "2013",
      description:
        "OMVIC licensed used car dealership in Toronto with over 10 years of experience providing quality pre-owned vehicles and exceptional customer service.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "751 Danforth Road",
        addressLocality: "Toronto",
        addressRegion: "ON",
        postalCode: "M1K 1N1",
        addressCountry: "CA",
      },
      telephone: "(647) 622-2202",
      url: "https://royaldrivecanada.com",
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "OMVIC License",
          recognizedBy: {
            "@type": "Organization",
            name: "Ontario Motor Vehicle Industry Council",
          },
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "UCDA Member",
          recognizedBy: {
            "@type": "Organization",
            name: "Used Car Dealers Association",
          },
        },
      ],
      memberOf: [
        {
          "@type": "Organization",
          name: "Ontario Motor Vehicle Industry Council",
        },
        {
          "@type": "Organization",
          name: "Used Car Dealers Association",
        },
      ],
    },
  };

  return (
    <>
      {/* Structured Data for About page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutStructuredData),
        }}
      />

      <div>
        <HeroSection />
        <OurStory />
        <CertificationsSection />
      </div>
    </>
  );
};

export default Page;
