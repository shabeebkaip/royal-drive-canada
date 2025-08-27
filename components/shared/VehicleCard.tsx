"use client";
import React from 'react'
import ImageSlider from "./ImageSlider";
import { Star, CheckCircle, Fuel, Gauge } from 'lucide-react';

interface Vehicle {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number | null;
  mileage: number | null;
  fuelType: string;
  safetyCertified?: boolean;
  featured?: boolean;
  images: string[];
}

interface VehicleCardProps {
  vehicle: Vehicle;
  showFeaturedBadge?: boolean;
  onViewDetails?: (vehicleId: number) => void;
  className?: string;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  showFeaturedBadge = false,
  onViewDetails,
  className = ""
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

  return (
    <div className={`group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-1 ${className}`}>
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <ImageSlider
          images={vehicle.images}
          alt={vehicle.name}
          className="h-52"
        />

        {/* Featured Badge - Only show if showFeaturedBadge is true and vehicle is featured */}
        {showFeaturedBadge && vehicle.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Featured
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section */}
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

        {/* Vehicle Details */}
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

        {/* Price Section */}
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
