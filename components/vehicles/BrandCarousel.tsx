"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BrandAPI } from "@/types/filters";

const BRAND_LOCAL_LOGOS: Record<string, string> = {
  acura: "/brand-images/acura.png",
  audi: "/brand-images/audi.webp",
  bmw: "/brand-images/bmw.webp",
  chevrolet: "/brand-images/chevrolet.webp",
  chevy: "/brand-images/chevrolet.webp",
  dodge: "/brand-images/dodge.svg",
  ford: "/brand-images/ford.webp",
  gmc: "/brand-images/gmc.webp",
  honda: "/brand-images/honda.webp",
  hyundai: "/brand-images/hyundai.webp",
  infiniti: "/brand-images/infiniti.webp",
  jeep: "/brand-images/jeep.webp",
  kia: "/brand-images/kia.svg",
  lexus: "/brand-images/lexus.webp",
  mazda: "/brand-images/mazda.webp",
  mercedes: "/brand-images/mercedes.webp",
  "mercedes-benz": "/brand-images/mercedes.webp",
  mg: "/brand-images/mg.webp",
  mitsubishi: "/brand-images/mitsubishi.webp",
  nissan: "/brand-images/nissan.webp",
  porsche: "/brand-images/porsche.webp",
  "range rover": "/brand-images/range-rover.webp",
  "land rover": "/brand-images/range-rover.webp",
  renault: "/brand-images/renault.webp",
  suzuki: "/brand-images/suzuki.webp",
  tesla: "/brand-images/tesla.webp",
  toyota: "/brand-images/toyota.webp",
  volkswagen: "/brand-images/volkswagen.webp",
  vw: "/brand-images/volkswagen.webp",
};

interface BrandCarouselProps {
  brands: BrandAPI[] | null;
  selectedBrand: string;
  onBrandSelect: (brandId: string) => void;
}

export const BrandCarousel: React.FC<BrandCarouselProps> = ({
  brands,
  selectedBrand,
  onBrandSelect,
}) => {
  const brandScrollRef = useRef<HTMLDivElement>(null);

  const scrollBrands = (direction: "left" | "right") => {
    if (brandScrollRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        brandScrollRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      brandScrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  if (!brands || brands.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 py-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              Used Cars for Sale in Toronto
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">Filter by make to find your vehicle</p>
          </div>
          {selectedBrand && (
            <button
              onClick={() => onBrandSelect("")}
              className="text-xs font-semibold text-red-600 hover:text-red-700 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              Clear make
            </button>
          )}
        </div>

        {/* Brand pills */}
        <div className="relative group">
          <button onClick={() => scrollBrands("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md border border-gray-200 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll left">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button onClick={() => scrollBrands("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md border border-gray-200 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll right">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>

          <div ref={brandScrollRef}
            className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1"
            onWheel={(e) => {
              const c = e.currentTarget;
              if (c.scrollWidth > c.clientWidth) { e.preventDefault(); c.scrollLeft += e.deltaY; }
            }}
          >
            {brands.map((brand) => {
              const isActive = selectedBrand === String(brand._id);
              const logoSrc = brand.logo || BRAND_LOCAL_LOGOS[brand.name.toLowerCase()];
              return (
                <button
                  key={brand._id}
                  onClick={() => {
                    onBrandSelect(String(brand._id));
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }}
                  title={brand.name}
                  className={`flex-shrink-0 flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl border transition-all duration-150 ${
                    isActive
                      ? "bg-gray-900 border-gray-900 shadow-md"
                      : "bg-white border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  {logoSrc ? (
                    <Image
                      src={logoSrc}
                      alt={brand.name}
                      width={36}
                      height={36}
                      className={`object-contain w-9 h-9 ${isActive ? "brightness-0 invert" : ""}`}
                    />
                  ) : (
                    <div className={`w-9 h-9 flex items-center justify-center rounded-full text-xs font-bold ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"}`}>
                      {brand.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <span className={`text-[11px] font-semibold leading-none ${isActive ? "text-white" : "text-gray-700"}`}>
                    {brand.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
