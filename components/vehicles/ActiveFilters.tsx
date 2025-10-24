"use client";

import React from "react";
import { X, SlidersHorizontal } from "lucide-react";
import type { BrandAPI, ModelAPI } from "@/types/filters";

interface FilterChip {
  label: string;
  onRemove: () => void;
}

interface ActiveFiltersProps {
  activeFiltersCount: number;
  searchTerm: string;
  selectedBrand: string;
  selectedModel: string;
  selectedBodyType: string;
  selectedTransmissions: string[];
  selectedFuelTypes: string[];
  selectedColors: string[];
  selectedDrivetrain: string;
  selectedCondition: string;
  selectedStatus: string;
  minPrice: string;
  maxPrice: string;
  minYear: string;
  maxYear: string;
  minMileage: string;
  maxMileage: string;
  brands: BrandAPI[] | null;
  models: ModelAPI[];
  bodyTypes: { value: string; label: string }[];
  transmissions: { _id: string; name: string }[];
  fuelTypes: { _id: string; name: string }[];
  onClearAll: () => void;
  onRemoveSearch: () => void;
  onRemoveBrand: () => void;
  onRemoveModel: () => void;
  onRemoveBodyType: () => void;
  onRemoveTransmission: (id: string) => void;
  onRemoveFuelType: (id: string) => void;
  onRemoveColor: (color: string) => void;
  onRemoveDrivetrain: () => void;
  onRemoveCondition: () => void;
  onRemoveStatus: () => void;
  onRemovePrice: () => void;
  onRemoveYear: () => void;
  onRemoveMileage: () => void;
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  activeFiltersCount,
  searchTerm,
  selectedBrand,
  selectedModel,
  selectedBodyType,
  selectedTransmissions,
  selectedFuelTypes,
  selectedColors,
  selectedDrivetrain,
  selectedCondition,
  selectedStatus,
  minPrice,
  maxPrice,
  minYear,
  maxYear,
  minMileage,
  maxMileage,
  brands,
  models,
  bodyTypes,
  transmissions,
  fuelTypes,
  onClearAll,
  onRemoveSearch,
  onRemoveBrand,
  onRemoveModel,
  onRemoveBodyType,
  onRemoveTransmission,
  onRemoveFuelType,
  onRemoveColor,
  onRemoveDrivetrain,
  onRemoveCondition,
  onRemoveStatus,
  onRemovePrice,
  onRemoveYear,
  onRemoveMileage,
}) => {
  if (activeFiltersCount === 0) {
    return null;
  }

  const getBrandName = (brandId: string) =>
    brands?.find((b) => b._id === brandId)?.name || brandId;

  const getModelName = (modelId: string) =>
    models.find((m) => m._id === modelId)?.name || modelId;

  const getBodyTypeName = (typeValue: string) =>
    bodyTypes.find((t) => t.value === typeValue)?.label || typeValue;

  const getTransmissionName = (id: string) =>
    transmissions.find((t) => t._id === id)?.name || id;

  const getFuelTypeName = (id: string) =>
    fuelTypes.find((f) => f._id === id)?.name || id;

  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-5 mb-4 sm:mb-6 border border-gray-200">
      <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Active Filters ({activeFiltersCount})
          </h3>
        </div>
        <button
          onClick={onClearAll}
          className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-red-600 hover:text-white bg-red-50 hover:bg-red-600 rounded-lg transition-all duration-200 border border-red-200 hover:border-red-600"
        >
          <X className="w-3 h-3 sm:w-4 sm:h-4" />
          Clear All
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {/* Search Term */}
        {searchTerm && (
          <span className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
            <span className="font-semibold">Search:</span> {searchTerm}
            <button
              onClick={onRemoveSearch}
              className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
              aria-label="Remove search"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </span>
        )}

        {/* Brand */}
        {selectedBrand && (
          <span className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border border-purple-200 shadow-sm hover:shadow-md transition-shadow">
            <span className="font-semibold">Brand:</span>{" "}
            {getBrandName(selectedBrand)}
            <button
              onClick={onRemoveBrand}
              className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
              aria-label="Remove brand"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </span>
        )}

        {/* Model */}
        {selectedModel && (
          <span className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border border-indigo-200 shadow-sm hover:shadow-md transition-shadow">
            <span className="font-semibold">Model:</span>{" "}
            {getModelName(selectedModel)}
            <button
              onClick={onRemoveModel}
              className="hover:bg-indigo-200 rounded-full p-0.5 transition-colors"
              aria-label="Remove model"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </span>
        )}

        {/* Body Type */}
        {selectedBodyType && (
          <span className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-green-50 to-green-100 text-green-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border border-green-200 shadow-sm hover:shadow-md transition-shadow">
            <span className="font-semibold">Type:</span>{" "}
            {getBodyTypeName(selectedBodyType)}
            <button
              onClick={onRemoveBodyType}
              className="hover:bg-green-200 rounded-full p-0.5 transition-colors"
              aria-label="Remove body type"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </span>
        )}

        {/* Transmissions */}
        {selectedTransmissions.map((id) => (
          <span
            key={id}
            className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border border-orange-200 shadow-sm hover:shadow-md transition-shadow"
          >
            {getTransmissionName(id)}
            <button
              onClick={() => onRemoveTransmission(id)}
              className="hover:bg-orange-200 rounded-full p-0.5 transition-colors"
              aria-label="Remove transmission"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </span>
        ))}

        {/* Fuel Types */}
        {selectedFuelTypes.map((id) => (
          <span
            key={id}
            className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-teal-50 to-teal-100 text-teal-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border border-teal-200 shadow-sm hover:shadow-md transition-shadow"
          >
            {getFuelTypeName(id)}
            <button
              onClick={() => onRemoveFuelType(id)}
              className="hover:bg-teal-200 rounded-full p-0.5 transition-colors"
              aria-label="Remove fuel type"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </span>
        ))}

        {/* Colors */}
        {selectedColors.map((color) => (
          <span
            key={color}
            className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-pink-50 to-pink-100 text-pink-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border border-pink-200 shadow-sm hover:shadow-md transition-shadow"
          >
            {color}
            <button
              onClick={() => onRemoveColor(color)}
              className="hover:bg-pink-200 rounded-full p-0.5 transition-colors"
              aria-label="Remove color"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </span>
        ))}

        {/* Drivetrain */}
        {selectedDrivetrain && (
          <span className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-cyan-50 to-cyan-100 text-cyan-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border border-cyan-200 shadow-sm hover:shadow-md transition-shadow">
            <span className="font-semibold">Drive:</span> {selectedDrivetrain}
            <button
              onClick={onRemoveDrivetrain}
              className="hover:bg-cyan-200 rounded-full p-0.5 transition-colors"
              aria-label="Remove drivetrain"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </span>
        )}

        {/* Condition */}
        {selectedCondition && (
          <span className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border border-amber-200 shadow-sm hover:shadow-md transition-shadow">
            <span className="font-semibold">Condition:</span>{" "}
            {selectedCondition}
            <button
              onClick={onRemoveCondition}
              className="hover:bg-amber-200 rounded-full p-0.5 transition-colors"
              aria-label="Remove condition"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </span>
        )}

        {/* Status */}
        {selectedStatus && (
          <span className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-lime-50 to-lime-100 text-lime-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border border-lime-200 shadow-sm hover:shadow-md transition-shadow">
            <span className="font-semibold">Status:</span> {selectedStatus}
            <button
              onClick={onRemoveStatus}
              className="hover:bg-lime-200 rounded-full p-0.5 transition-colors"
              aria-label="Remove status"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </span>
        )}

        {/* Price Range - Only show if not default values */}
        {(Number(minPrice) > 0 || Number(maxPrice) < 100000) && (
          <span className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border border-emerald-200 shadow-sm hover:shadow-md transition-shadow">
            <span className="font-semibold">Price:</span> $
            {minPrice || "0"} - ${maxPrice || "∞"}
            <button
              onClick={onRemovePrice}
              className="hover:bg-emerald-200 rounded-full p-0.5 transition-colors"
              aria-label="Remove price"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </span>
        )}

        {/* Year Range - Only show if not default values */}
        {(Number(minYear) > 2000 || Number(maxYear) < new Date().getFullYear()) && (
          <span className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-violet-50 to-violet-100 text-violet-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border border-violet-200 shadow-sm hover:shadow-md transition-shadow">
            <span className="font-semibold">Year:</span> {minYear || "Any"} -{" "}
            {maxYear || "Any"}
            <button
              onClick={onRemoveYear}
              className="hover:bg-violet-200 rounded-full p-0.5 transition-colors"
              aria-label="Remove year"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </span>
        )}

        {/* Mileage Range - Only show if not default values */}
        {(Number(minMileage) > 0 || Number(maxMileage) < 200000) && (
          <span className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-rose-50 to-rose-100 text-rose-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border border-rose-200 shadow-sm hover:shadow-md transition-shadow">
            <span className="font-semibold">Mileage:</span>{" "}
            {minMileage || "0"} - {maxMileage || "∞"} km
            <button
              onClick={onRemoveMileage}
              className="hover:bg-rose-200 rounded-full p-0.5 transition-colors"
              aria-label="Remove mileage"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </span>
        )}
      </div>
    </div>
  );
};
