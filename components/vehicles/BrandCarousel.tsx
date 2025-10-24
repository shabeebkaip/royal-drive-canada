"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BrandAPI } from "@/types/filters";

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
    <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-4 sm:mb-5">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              Quality Pre-Owned Vehicles in Toronto
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Browse by popular brands
            </p>
          </div>

          {/* Brand Carousel */}
          <div className="mb-3 sm:mb-4 relative group">
            {/* Left Scroll Button */}
            <button
              onClick={() => scrollBrands("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            {/* Right Scroll Button */}
            <button
              onClick={() => scrollBrands("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            {/* Brand Logos Container */}
            <div
              ref={brandScrollRef}
              className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 px-1 scrollbar-hide sm:justify-center"
              onWheel={(e) => {
                const container = e.currentTarget;
                if (container.scrollWidth > container.clientWidth) {
                  e.preventDefault();
                  container.scrollLeft += e.deltaY;
                }
              }}
            >
              {brands.map((brand) => (
                <button
                  key={brand._id}
                  onClick={() => {
                    onBrandSelect(String(brand._id));
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }}
                  className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-lg border-2 transition-all duration-200 p-2 flex items-center justify-center group hover:shadow-lg ${
                    selectedBrand === String(brand._id)
                      ? "border-blue-500 shadow-md"
                      : "border-gray-200 hover:border-blue-400"
                  }`}
                  title={brand.name}
                >
                  {brand.logo ? (
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={64}
                      height={64}
                      className={`object-contain transition-all duration-200 ${
                        selectedBrand === brand._id
                          ? ""
                          : "grayscale group-hover:grayscale-0"
                      }`}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const textNode = document.createElement("span");
                        textNode.className = "text-xs font-bold text-gray-700";
                        textNode.textContent = brand.name
                          .substring(0, 3)
                          .toUpperCase();
                        target.parentElement?.appendChild(textNode);
                      }}
                    />
                  ) : (
                    <span className="text-xs font-bold text-gray-700">
                      {brand.name.substring(0, 3).toUpperCase()}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
