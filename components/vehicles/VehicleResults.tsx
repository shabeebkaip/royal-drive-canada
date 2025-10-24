"use client";

import React from "react";
import VehicleCard from "@/components/shared/VehicleCard";
import type { Vehicle } from "@/types/api";

interface VehicleResultsProps {
  vehicles: Vehicle[];
  isHorizontal: boolean;
  onViewDetails: (slug: string) => void;
}

export const VehicleResults: React.FC<VehicleResultsProps> = ({
  vehicles,
  isHorizontal,
  onViewDetails,
}) => {
  return (
    <div
      className={`${
        isHorizontal
          ? "space-y-3 sm:space-y-4"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6"
      }`}
    >
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          showFeaturedBadge={true}
          onViewDetails={onViewDetails}
          isHorizontal={isHorizontal}
        />
      ))}
    </div>
  );
};
