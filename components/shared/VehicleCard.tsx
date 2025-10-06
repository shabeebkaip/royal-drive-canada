"use client";
import React from 'react'
import Link from 'next/link'
import ImageSlider from "./ImageSlider";
import { Star, CheckCircle, Fuel, Gauge, Settings, MapPin, FileText, RefreshCw } from 'lucide-react';
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
  onViewDetails,
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

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(vehicle.id);
    }
  };

  if (isHorizontal) {
    // Horizontal Layout - Clean and Professional
    return (
      <div className={`group bg-white rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-gray-300 ${className}`}>
        <div className="flex flex-col sm:flex-row">
          {/* Image Section - Clean */}
          <div className="relative sm:w-64 lg:w-80 flex-shrink-0">
            <div className="relative h-40 sm:h-full overflow-hidden bg-gray-100">
              <ImageSlider
                images={vehicle.images}
                alt={vehicle.name}
                className="w-full h-full"
              />

              {/* Featured Badge - Minimal */}
              {showFeaturedBadge && vehicle.featured && (
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-blue-600 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded text-xs font-medium">
                  Featured
                </div>
              )}
            </div>
          </div>

          {/* Content Section - Clean Layout */}
          <div className="flex-1 p-3 sm:p-4 lg:p-6">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="mb-3 sm:mb-4">
                <h3 className="font-bold text-gray-900 text-base sm:text-lg lg:text-xl mb-1 sm:mb-2">{vehicle.name}</h3>
                <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 flex-wrap">
                  <span>{vehicle.brand}</span>
                  <span>{vehicle.year}</span>
                  {vehicle.safetyCertified && (
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Safety Certified</span>
                      <span className="sm:hidden">Certified</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Vehicle Information Grid - Minimal */}
              <div className="flex-1 mb-4 sm:mb-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                  <div className="border border-gray-200 rounded p-2 sm:p-3">
                    <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                      <Gauge className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                      <span className="text-[10px] sm:text-xs text-gray-500 font-medium">Mileage</span>
                    </div>
                    <p className="font-semibold text-gray-900 text-xs sm:text-sm">{formatMileage(vehicle.mileage)}</p>
                  </div>

                  <div className="border border-gray-200 rounded p-2 sm:p-3">
                    <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                      <Fuel className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                      <span className="text-[10px] sm:text-xs text-gray-500 font-medium">Fuel</span>
                    </div>
                    <p className="font-semibold text-gray-900 text-xs sm:text-sm capitalize">{vehicle.fuelType}</p>
                  </div>

                  {vehicle.transmission && (
                    <div className="border border-gray-200 rounded p-2 sm:p-3">
                      <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                        <Settings className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                        <span className="text-[10px] sm:text-xs text-gray-500 font-medium">Trans.</span>
                      </div>
                      <p className="font-semibold text-gray-900 text-xs sm:text-sm">{vehicle.transmission}</p>
                    </div>
                  )}

                  {vehicle.location && (
                    <div className="border border-gray-200 rounded p-2 sm:p-3">
                      <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                        <span className="text-[10px] sm:text-xs text-gray-500 font-medium">Location</span>
                      </div>
                      <p className="font-semibold text-gray-900 text-[10px] sm:text-xs">{vehicle.location}</p>
                    </div>
                  )}

                  {vehicle.carfax && (
                    <div className="border border-gray-200 rounded p-2 sm:p-3">
                      <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                        <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                        <span className="text-[10px] sm:text-xs text-gray-500 font-medium">CARFAX</span>
                      </div>
                      <p className="font-semibold text-blue-600 text-[10px] sm:text-xs">Available</p>
                    </div>
                  )}

                  {vehicle.tradeInsWelcome && (
                    <div className="border border-gray-200 rounded p-2 sm:p-3">
                      <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                        <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                        <span className="text-[10px] sm:text-xs text-gray-500 font-medium">Trade-In</span>
                      </div>
                      <p className="font-semibold text-green-600 text-[10px] sm:text-xs">Welcome</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Price and Action Section */}
              <div className="border-t border-gray-200 pt-3 sm:pt-4 mt-auto">
                <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">Starting at</p>
                    <div className="flex items-baseline gap-1 sm:gap-2">
                      <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{formatPrice(vehicle.price)}</span>
                      <span className="text-xs sm:text-sm text-gray-500">+ HST</span>
                    </div>
                  </div>
                  <Link
                    href={`/vehicles/${vehicle.slug || vehicle.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 rounded text-sm sm:text-base font-medium transition-colors duration-200 whitespace-nowrap"
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
    <div className={`group bg-white rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-1 ${className}`}>
      {/* Image Section - Vertical */}
      <div className="relative overflow-hidden">
        <ImageSlider
          images={vehicle.images}
          alt={vehicle.name}
          className="h-40 sm:h-48 lg:h-52"
        />

        {/* Featured Badge */}
        {showFeaturedBadge && vehicle.featured && (
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold shadow-lg flex items-center gap-1">
            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
            Featured
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section - Vertical */}
      <div className="p-3 sm:p-4 lg:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg mb-1 line-clamp-1">{vehicle.name}</h3>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="text-xs sm:text-sm text-blue-600 font-medium">{vehicle.brand}</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className="text-xs sm:text-sm text-gray-500 bg-gray-50 px-1.5 sm:px-2 py-0.5 rounded-md">{vehicle.year}</span>
            </div>
          </div>
        </div>

        {/* Vehicle Details - Vertical */}
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          <div className="flex items-center justify-between py-0.5 sm:py-1">
            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600">
              <Gauge className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">Mileage</span>
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-900">{formatMileage(vehicle.mileage)}</span>
          </div>

          <div className="flex items-center justify-between py-0.5 sm:py-1">
            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600">
              <Fuel className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">Fuel Type</span>
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-900 capitalize">{vehicle.fuelType}</span>
          </div>

          {vehicle.safetyCertified && (
            <div className="flex items-center gap-1.5 sm:gap-2 text-green-600 bg-green-50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Safety Certified</span>
            </div>
          )}
        </div>

        {/* Price Section - Vertical */}
        <div className="border-t border-gray-100 pt-3 sm:pt-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Starting at</p>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{formatPrice(vehicle.price)}</span>
            </div>
            <Link
              href={`/vehicles/${vehicle.slug || vehicle.id}`}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 whitespace-nowrap"
            >
              View
            </Link>
          </div>
          <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">+ HST & Licensing</p>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
