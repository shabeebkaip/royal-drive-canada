"use client";

import React from "react";

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="relative w-full h-48 sm:h-56 bg-gray-200" />

          {/* Content Skeleton */}
          <div className="p-4 space-y-3">
            {/* Title */}
            <div className="h-6 bg-gray-200 rounded w-3/4" />

            {/* Details */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>

            {/* Price */}
            <div className="h-8 bg-gray-200 rounded w-1/2" />

            {/* Badges */}
            <div className="flex gap-2">
              <div className="h-6 bg-gray-200 rounded w-16" />
              <div className="h-6 bg-gray-200 rounded w-20" />
            </div>

            {/* Button */}
            <div className="h-10 bg-gray-200 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};
