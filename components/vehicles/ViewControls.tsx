"use client";

import React from "react";
import { Car, LayoutGrid, List, SlidersHorizontal } from "lucide-react";

interface ViewControlsProps {
  totalCount: number;
  isHorizontal: boolean;
  onViewToggle: (isHorizontal: boolean) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  showFilters: boolean;
  onFilterToggle: () => void;
  activeFiltersCount: number;
}

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "year-desc", label: "Year: Newest First" },
  { value: "year-asc", label: "Year: Oldest First" },
  { value: "mileage-asc", label: "Mileage: Low to High" },
  { value: "mileage-desc", label: "Mileage: High to Low" },
  { value: "featured", label: "Featured" },
];

export const ViewControls: React.FC<ViewControlsProps> = ({
  totalCount,
  isHorizontal,
  onViewToggle,
  sortBy,
  onSortChange,
  onFilterToggle,
  activeFiltersCount,
}) => {
  return (
    <>
      {/* Desktop/Tablet Bar */}
      <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
          {/* Left: Filter Toggle (Mobile) & Results Count */}
          <div className="flex items-center gap-2 sm:gap-4 flex-1">
            <button
              onClick={onFilterToggle}
              className="lg:hidden flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm sm:text-base"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-white text-blue-600 text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <div className="hidden sm:flex items-center gap-2">
              <Car className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">
                {totalCount} Vehicle{totalCount !== 1 ? "s" : ""}
              </h2>
            </div>
          </div>

          {/* Right: View Toggle & Sort */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* View Toggle - Hidden on mobile */}
            <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onViewToggle(false)}
                className={`p-2 rounded-lg transition-colors ${
                  !isHorizontal
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewToggle(true)}
                className={`p-2 rounded-lg transition-colors ${
                  isHorizontal
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Dropdown - Full width on mobile */}
            <div className="flex-1 sm:flex-none sm:w-48">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-full px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Results Count */}
      <div className="sm:hidden bg-white rounded-lg shadow-md p-3 mb-4">
        <div className="flex items-center gap-2">
          <Car className="w-4 h-4 text-blue-600" />
          <h2 className="text-base font-bold text-gray-900">
            {totalCount} Vehicle{totalCount !== 1 ? "s" : ""} Found
          </h2>
        </div>
      </div>
    </>
  );
};
