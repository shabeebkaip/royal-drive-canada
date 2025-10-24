"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Car, X } from "lucide-react";

interface EmptyStateProps {
  activeFiltersCount: number;
  onClearFilters: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  activeFiltersCount,
  onClearFilters,
}) => {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl shadow-lg text-center py-20 px-6 border border-gray-200">
      <div className="max-w-md mx-auto">
        {/* Animated Icon */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Car className="w-16 h-16 text-blue-400" />
          </div>
        </div>

        <h3 className="text-3xl font-bold text-gray-900 mb-3">
          No Vehicles Found
        </h3>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We couldn&apos;t find any vehicles matching your search criteria. Try
          adjusting your filters or clearing them to see all available
          vehicles.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onClearFilters}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
          >
            <X className="w-5 h-5" />
            Clear All Filters
          </button>
          <button
            onClick={() => router.push("/contact")}
            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors border-2 border-gray-300"
          >
            Contact Us
          </button>
        </div>

        {/* Suggestions */}
        {activeFiltersCount > 0 && (
          <div className="mt-8 p-4 bg-white rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600 mb-2">
              You have {activeFiltersCount} active filter
              {activeFiltersCount !== 1 ? "s" : ""}
            </p>
            <p className="text-xs text-gray-500">
              Try removing some filters to see more results
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
