"use client";
import React from 'react'
import Link from 'next/link'
import ImageSlider from "./ImageSlider";
import { Star, CheckCircle, Fuel, Gauge, Settings } from 'lucide-react';
import { Vehicle } from '@/types/api';

interface VehicleCardProps {
  vehicle: Vehicle;
  showFeaturedBadge?: boolean;
  onViewDetails?: (vehicleId: string) => void;
  className?: string;
  isHorizontal?: boolean;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  showFeaturedBadge = false,
  className = "",
  isHorizontal = false
}) => {
  // Format price for display
  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined || isNaN(price)) return "Contact for Price";
    return `$${price.toLocaleString()}`;
  };

  // Format mileage for display
  const formatMileage = (mileage: number | null | undefined) => {
    if (mileage === null || mileage === undefined || isNaN(mileage)) return "Contact for Details";
    return `${mileage.toLocaleString()} km`;
  };

  if (isHorizontal) {
    // Horizontal Layout
    return (
      <div className={`bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-shadow ${className}`}>
        <div className="flex flex-col sm:flex-row">
          {/* Image Section */}
          <div className="relative sm:w-64 lg:w-72 flex-shrink-0">
            <div className="relative h-40 sm:h-full overflow-hidden bg-gray-100">
              <ImageSlider
                images={vehicle.images}
                alt={vehicle.name}
                className="w-full h-full"
              />

              {/* Featured Badge */}
              {showFeaturedBadge && vehicle.featured && (
                <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                  Featured
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4 sm:p-5">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="mb-3">
                <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1">{vehicle.name}</h3>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600 flex-wrap">
                  <span>{vehicle.brand}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{vehicle.year}</span>
                  {vehicle.safetyCertified && (
                    <>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="text-green-600 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        Certified
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Vehicle Information Grid */}
              <div className="flex-1 mb-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-gray-50 rounded p-2">
                    <div className="flex items-center gap-1 mb-1">
                      <Gauge className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-500">Mileage</span>
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">{formatMileage(vehicle.mileage)}</p>
                  </div>

                  <div className="bg-gray-50 rounded p-2">
                    <div className="flex items-center gap-1 mb-1">
                      <Fuel className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-500">Fuel</span>
                    </div>
                    <p className="font-semibold text-gray-900 text-sm capitalize">{vehicle.fuelType}</p>
                  </div>

                  {vehicle.transmission && (
                    <div className="bg-gray-50 rounded p-2">
                      <div className="flex items-center gap-1 mb-1">
                        <Settings className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500">Trans.</span>
                      </div>
                      <p className="font-semibold text-gray-900 text-sm">{vehicle.transmission}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Price and Action Section */}
              <div className="border-t border-gray-200 pt-3 mt-auto">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-bold text-gray-900">{formatPrice(vehicle.price)}</span>
                      <span className="text-xs text-gray-500">+ HST</span>
                    </div>
                  </div>
                  <Link
                    href={`/vehicles/${vehicle.slug || vehicle.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vertical Layout (Default)
  return (
    <div className={`bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-shadow ${className}`}>
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <ImageSlider
          images={vehicle.images}
          alt={vehicle.name}
          className="h-44 sm:h-48"
        />

        {/* Featured Badge */}
        {showFeaturedBadge && vehicle.featured && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Featured
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Header */}
        <div className="mb-3">
          <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-1">{vehicle.name}</h3>
          <div className="flex items-center gap-2 flex-wrap text-xs text-gray-600">
            <span>{vehicle.brand}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>{vehicle.year}</span>
            {vehicle.safetyCertified && (
              <>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Certified
                </span>
              </>
            )}
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-gray-600">
              <Gauge className="w-4 h-4" />
              <span className="text-xs">Mileage</span>
            </div>
            <span className="text-xs font-medium text-gray-900">{formatMileage(vehicle.mileage)}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-gray-600">
              <Fuel className="w-4 h-4" />
              <span className="text-xs">Fuel Type</span>
            </div>
            <span className="text-xs font-medium text-gray-900 capitalize">{vehicle.fuelType}</span>
          </div>
        </div>

        {/* Price Section */}
        <div className="border-t border-gray-200 pt-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-xl font-bold text-gray-900">{formatPrice(vehicle.price)}</span>
              <p className="text-xs text-gray-500">+ HST</p>
            </div>
            <Link
              href={`/vehicles/${vehicle.slug || vehicle.id}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
