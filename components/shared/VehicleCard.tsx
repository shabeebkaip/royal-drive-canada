"use client";
import React from 'react'
import ImageSlider from "./ImageSlider";
import { Star, CheckCircle, Fuel, Gauge, Settings, MapPin, FileText, RefreshCw, ArrowRight } from 'lucide-react';

interface Vehicle {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number | null;
  mileage: number | null;
  fuelType: string;
  transmission?: string;
  safetyCertified?: boolean;
  featured?: boolean;
  tradeInsWelcome?: boolean;
  location?: string;
  carfax?: string;
  images: string[];
}

interface VehicleCardProps {
  vehicle: Vehicle;
  showFeaturedBadge?: boolean;
  onViewDetails?: (vehicleId: number) => void;
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
  const formatPrice = (price: number | null) => {
    if (price === null) return "Contact for Price";
    return `$${price.toLocaleString()}`;
  };

  // Format mileage for display
  const formatMileage = (mileage: number | null) => {
    if (mileage === null) return "Contact for Details";
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
        <div className="flex flex-col md:flex-row">
          {/* Image Section - Clean */}
          <div className="relative md:w-80 flex-shrink-0">
            <div className="relative h-48 md:h-full overflow-hidden bg-gray-100">
              <ImageSlider
                images={vehicle.images}
                alt={vehicle.name}
                className="w-full h-full"
              />

              {/* Featured Badge - Minimal */}
              {showFeaturedBadge && vehicle.featured && (
                <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium">
                  Featured
                </div>
              )}
            </div>
          </div>

          {/* Content Section - Clean Layout */}
          <div className="flex-1 p-6">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="mb-4">
                <h3 className="font-bold text-gray-900 text-xl mb-2">{vehicle.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{vehicle.brand}</span>
                  <span>{vehicle.year}</span>
                  {vehicle.safetyCertified && (
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Safety Certified
                    </span>
                  )}
                </div>
              </div>

              {/* Vehicle Information Grid - Minimal */}
              <div className="flex-1 mb-6">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="border border-gray-200 rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Gauge className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-500 font-medium">Mileage</span>
                    </div>
                    <p className="font-semibold text-gray-900">{formatMileage(vehicle.mileage)}</p>
                  </div>

                  <div className="border border-gray-200 rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Fuel className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-500 font-medium">Fuel Type</span>
                    </div>
                    <p className="font-semibold text-gray-900 capitalize">{vehicle.fuelType}</p>
                  </div>

                  {vehicle.transmission && (
                    <div className="border border-gray-200 rounded p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Settings className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-500 font-medium">Transmission</span>
                      </div>
                      <p className="font-semibold text-gray-900">{vehicle.transmission}</p>
                    </div>
                  )}

                  {vehicle.location && (
                    <div className="border border-gray-200 rounded p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-500 font-medium">Location</span>
                      </div>
                      <p className="font-semibold text-gray-900 text-sm">{vehicle.location}</p>
                    </div>
                  )}

                  {vehicle.carfax && (
                    <div className="border border-gray-200 rounded p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-500 font-medium">CARFAX</span>
                      </div>
                      <p className="font-semibold text-blue-600 text-sm">Available</p>
                    </div>
                  )}

                  {vehicle.tradeInsWelcome && (
                    <div className="border border-gray-200 rounded p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <RefreshCw className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-500 font-medium">Trade-In</span>
                      </div>
                      <p className="font-semibold text-green-600 text-sm">Welcome</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Price and Action Section */}
              <div className="border-t border-gray-200 pt-4 mt-auto">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Starting at</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">{formatPrice(vehicle.price)}</span>
                      <span className="text-sm text-gray-500">+ HST</span>
                    </div>
                  </div>
                  <button
                    onClick={handleViewDetails}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium transition-colors duration-200"
                  >
                    View Details
                  </button>
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
    <div className={`group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-1 ${className}`}>
      {/* Image Section - Vertical */}
      <div className="relative overflow-hidden">
        <ImageSlider
          images={vehicle.images}
          alt={vehicle.name}
          className="h-52"
        />

        {/* Featured Badge */}
        {showFeaturedBadge && vehicle.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Featured
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section - Vertical */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">{vehicle.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-blue-600 font-medium">{vehicle.brand}</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className="text-sm text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md">{vehicle.year}</span>
            </div>
          </div>
        </div>

        {/* Vehicle Details - Vertical */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2 text-gray-600">
              <Gauge className="w-4 h-4" />
              <span className="text-sm">Mileage</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{formatMileage(vehicle.mileage)}</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2 text-gray-600">
              <Fuel className="w-4 h-4" />
              <span className="text-sm">Fuel Type</span>
            </div>
            <span className="text-sm font-medium text-gray-900 capitalize">{vehicle.fuelType}</span>
          </div>

          {vehicle.safetyCertified && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Safety Certified</span>
            </div>
          )}
        </div>

        {/* Price Section - Vertical */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Starting at</p>
              <span className="text-2xl font-bold text-gray-900">{formatPrice(vehicle.price)}</span>
            </div>
            <button
              onClick={handleViewDetails}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              View Details
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">+ HST & Licensing</p>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
