import { Metadata } from "next";

// Site configuration - single source of truth
export const SITE_CONFIG = {
  name: "Royal Drive Canada",
  url: "https://royaldrivecanada.com",
  domain: "royaldrivecanada.com",
  title: "Royal Drive Canada",
  description: "Toronto's premier used car dealership offering premium pre-owned vehicles, flexible financing, and exceptional service. OMVIC licensed dealer at 751 Danforth Road.",
  
  // Business Information
  business: {
    legalName: "Royal Drive Canada",
    phone: "(647) 622-2202",
    email: "royaldrivemotor@gmail.com",
    address: {
      street: "751 Danforth Road",
      city: "Toronto",
      province: "Ontario",
      provinceCode: "ON",
      postalCode: "M1K 1N1",
      country: "Canada",
      countryCode: "CA",
    },
    hours: {
      weekday: "Monday to Friday: 9:00 AM - 7:00 PM",
      saturday: "Saturday: 9:00 AM - 6:00 PM",
      sunday: "Sunday: Closed",
    },
    coordinates: {
      latitude: "43.6426",
      longitude: "-79.3871",
    },
  },
  
  // Social Media
  social: {
    facebook: "https://facebook.com/royaldrivecanada",
    instagram: "https://instagram.com/royaldrivecanada",
    twitter: "https://twitter.com/royaldrivecan",
  },
  
  // SEO
  keywords: [
    "used cars Toronto",
    "pre-owned vehicles",
    "OMVIC licensed dealer",
    "car dealership Toronto",
    "Royal Drive Canada",
    "quality used cars",
    "car financing Toronto",
    "safety certified cars",
    "auto sales Toronto",
    "Danforth Road dealership",
  ],
  
  // Images
  images: {
    logo: "/favicon.svg",
    ogImage: "/og-image.jpg",
    defaultVehicleImage: "/car-buy.jpg",
  },
};

// Default metadata configuration
export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.images.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Premium Used Cars in Toronto`,
        type: "image/jpeg",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    site: "@royaldrivecan",
    creator: "@royaldrivecan",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.images.ogImage],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  verification: {
    google: "your-google-site-verification-code-here",
    // Add other verification codes as needed
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon.svg",
        color: "#1e40af",
      },
    ],
  },
  
  manifest: "/manifest.json",
};

// Helper function to create page-specific metadata
interface CreateMetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  images?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
}

export function createMetadata({
  title,
  description,
  keywords = [],
  path = "",
  images = [SITE_CONFIG.images.ogImage],
  type = "website",
  noIndex = false,
}: CreateMetadataOptions): Metadata {
  const url = path ? `${SITE_CONFIG.url}${path}` : SITE_CONFIG.url;
  const fullTitle = title.includes(SITE_CONFIG.name) 
    ? title 
    : `${title} | ${SITE_CONFIG.name}`;
  
  return {
    title,
    description,
    keywords: [...SITE_CONFIG.keywords, ...keywords],
    
    alternates: {
      canonical: url,
    },
    
    openGraph: {
      type,
      locale: "en_CA",
      url,
      siteName: SITE_CONFIG.name,
      title: fullTitle,
      description,
      images: images.map((img) => ({
        url: img.startsWith("http") ? img : `${SITE_CONFIG.url}${img}`,
        width: 1200,
        height: 630,
        alt: fullTitle,
      })),
    },
    
    twitter: {
      card: "summary_large_image",
      site: "@royaldrivecan",
      creator: "@royaldrivecan",
      title: fullTitle,
      description,
      images,
    },
    
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

// Structured data generators
export function generateBusinessStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.business.legalName,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}${SITE_CONFIG.images.logo}`,
    image: `${SITE_CONFIG.url}${SITE_CONFIG.images.ogImage}`,
    
    telephone: SITE_CONFIG.business.phone,
    email: SITE_CONFIG.business.email,
    
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.business.address.street,
      addressLocality: SITE_CONFIG.business.address.city,
      addressRegion: SITE_CONFIG.business.address.provinceCode,
      postalCode: SITE_CONFIG.business.address.postalCode,
      addressCountry: SITE_CONFIG.business.address.countryCode,
    },
    
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.business.coordinates.latitude,
      longitude: SITE_CONFIG.business.coordinates.longitude,
    },
    
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "18:00",
      },
    ],
    
    priceRange: "$$",
    currenciesAccepted: "CAD",
    paymentAccepted: "Cash, Credit Card, Debit Card, Financing",
    
    areaServed: {
      "@type": "City",
      name: "Toronto",
      "@id": "https://www.wikidata.org/wiki/Q172",
    },
    
    sameAs: [
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.twitter,
    ],
  };
}

export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    publisher: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    inLanguage: "en-CA",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/vehicles?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbStructuredData(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}

export function generateVehicleStructuredData(vehicle: {
  name: string;
  description: string;
  image: string[];
  price: number;
  year: number;
  make: string;
  model: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyStyle: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Car",
    name: vehicle.name,
    description: vehicle.description,
    image: vehicle.image,
    
    offers: {
      "@type": "Offer",
      price: vehicle.price,
      priceCurrency: "CAD",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "AutoDealer",
        name: SITE_CONFIG.name,
      },
      url: vehicle.url,
    },
    
    brand: {
      "@type": "Brand",
      name: vehicle.make,
    },
    
    model: vehicle.model,
    vehicleModelDate: vehicle.year.toString(),
    productionDate: vehicle.year.toString(),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehicle.mileage,
      unitCode: "KMT",
    },
    fuelType: vehicle.fuelType,
    vehicleTransmission: vehicle.transmission,
    bodyType: vehicle.bodyStyle,
    vehicleEngine: {
      "@type": "EngineSpecification",
      fuelType: vehicle.fuelType,
    },
  };
}

// JSON-LD helper - returns stringified JSON for use in script tags
export function generateJsonLd(data: object | object[]) {
  return JSON.stringify(Array.isArray(data) ? data : data);
}
