"use client";
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ImageSlider from "./ImageSlider";
import { Star, CheckCircle, Fuel, Gauge, Settings, Shield, User } from 'lucide-react';
import { VehicleCardProps } from '@/types/vehicleCard';

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

  // Check if vehicle is coming soon and use placeholder image
  const vehicleImages = vehicle.status?.slug === 'coming-soon' 
    ? ['/coming-soon.jpeg'] 
    : vehicle.images;

  if (isHorizontal) {
    // Horizontal Layout
    return (
      <div className={`bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-shadow ${className}`}>
        <div className="flex flex-col sm:flex-row">
          {/* Image Section - Increased height for better mobile viewing */}
          <div className="relative sm:w-80 lg:w-96 xl:w-[28rem] flex-shrink-0">
            <div className="relative h-64 sm:h-full overflow-hidden bg-gray-100">
              <ImageSlider
                images={vehicleImages}
                alt={vehicle.name}
                className="w-full h-full"
              />

              {/* Featured Badge */}
              {showFeaturedBadge && vehicle.featured && (
                <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium z-10">
                  Featured
                </div>
              )}

              {/* Coming Soon Badge */}
              {vehicle.status?.slug === 'coming-soon' && (
                <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium z-10">
                  Coming Soon
                </div>
              )}

              {/* Sold Badge */}
              {vehicle.status?.name?.toLowerCase() === 'sold' && (
                <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wide z-10 shadow-lg">
                  Sold
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
                        Safety Certified
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Premium Badges Section */}
              <div className="mb-3 flex flex-wrap gap-2">
                {/* CARFAX Badge */}
                {vehicle.carfax?.hasCleanHistory && (
                  vehicle.carfax.reportUrl ? (
                    <a
                      href={vehicle.carfax.reportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border-2 border-green-500 rounded-md hover:bg-green-50 transition-colors group"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Image
                        src="/certifications/carfax.png"
                        alt="CARFAX"
                        width={60}
                        height={16}
                        className="object-contain"
                      />
                      <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border-2 border-green-500 rounded-md">
                      <Image
                        src="/certifications/carfax.png"
                        alt="CARFAX"
                        width={60}
                        height={16}
                        className="object-contain"
                      />
                      <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                    </div>
                  )
                )}

                {/* Single Owner Badge */}
                {(vehicle.numberOfPreviousOwners !== undefined && vehicle.numberOfPreviousOwners <= 1) && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-md">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-700">
                      {vehicle.numberOfPreviousOwners === 0 ? 'First Owner' : 'Single Owner'}
                    </span>
                  </div>
                )}

                {/* No Accidents Badge */}
                {!vehicle.accidentHistory && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 border border-green-200 rounded-md">
                    <Shield className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-xs font-semibold text-green-700">No Accidents</span>
                  </div>
                )}
              </div>

              {/* Vehicle Information Grid */}
              <div className="flex-1 mb-4">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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

                  {vehicle.model && (
                    <div className="bg-gray-50 rounded p-2">
                      <div className="flex items-center gap-1 mb-1">
                        <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span className="text-xs text-gray-500">Model</span>
                      </div>
                      <p className="font-semibold text-gray-900 text-sm">{vehicle.model}</p>
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
      {/* Image Section - Increased height for better mobile viewing */}
      <div className="relative overflow-hidden">
        <ImageSlider
          images={vehicleImages}
          alt={vehicle.name}
          className="h-64 sm:h-72 md:h-80 lg:h-96"
        />

        {/* Featured Badge */}
        {showFeaturedBadge && vehicle.featured && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1 z-10">
            <Star className="w-3 h-3 fill-current" />
            Featured
          </div>
        )}

        {/* Coming Soon Badge */}
        {vehicle.status?.slug === 'coming-soon' && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium z-10">
            Coming Soon
          </div>
        )}

        {/* Sold Badge */}
        {vehicle.status?.name?.toLowerCase() === 'sold' && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wide z-10 shadow-lg">
            Sold
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="mb-3">
          <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1 line-clamp-1">{vehicle.name}</h3>
          <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm text-gray-600">
            <span>{vehicle.brand}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>{vehicle.year}</span>
            {vehicle.safetyCertified && (
              <>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  Safety Certified
                </span>
              </>
            )}
          </div>
        </div>

        {/* Premium Badges Section */}
        <div className="mb-3 flex flex-wrap gap-2">
          {/* CARFAX Badge */}
          {vehicle.carfax?.hasCleanHistory && (
            vehicle.carfax.reportUrl ? (
              <a
                href={vehicle.carfax.reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border-2 border-green-500 rounded-md hover:bg-green-50 transition-colors group"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src="/certifications/carfax.png"
                  alt="CARFAX"
                  width={60}
                  height={16}
                  className="object-contain"
                />
                <CheckCircle className="w-3.5 h-3.5 text-green-600" />
              </a>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border-2 border-green-500 rounded-md">
                <Image
                  src="/certifications/carfax.png"
                  alt="CARFAX"
                  width={60}
                  height={16}
                  className="object-contain"
                />
                <CheckCircle className="w-3.5 h-3.5 text-green-600" />
              </div>
            )
          )}

          {/* Single Owner Badge */}
          {(vehicle.numberOfPreviousOwners !== undefined && vehicle.numberOfPreviousOwners <= 1) && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-md">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-semibold text-blue-700">
                {vehicle.numberOfPreviousOwners === 0 ? 'First Owner' : 'Single Owner'}
              </span>
            </div>
          )}

          {/* No Accidents Badge */}
          {!vehicle.accidentHistory && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 border border-green-200 rounded-md">
              <Shield className="w-3.5 h-3.5 text-green-600" />
              <span className="text-xs font-semibold text-green-700">No Accidents</span>
            </div>
          )}
        </div>

        {/* Vehicle Details - Enhanced with more information */}
        <div className="space-y-2.5 mb-4">
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2 text-gray-600">
              <Gauge className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">Mileage</span>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-gray-900">{formatMileage(vehicle.mileage)}</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2 text-gray-600">
              <Fuel className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">Fuel Type</span>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-gray-900 capitalize">{vehicle.fuelType}</span>
          </div>

          {vehicle.transmission && (
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2 text-gray-600">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm">Transmission</span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-900">{vehicle.transmission}</span>
            </div>
          )}

          {vehicle.model && (
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="text-xs sm:text-sm">Model</span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-900">{vehicle.model}</span>
            </div>
          )}
        </div>

        {/* Price Section */}
        <div className="border-t border-gray-200 pt-3 mt-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900">{formatPrice(vehicle.price)}</span>
              <p className="text-xs text-gray-500">+ HST</p>
            </div>
            <Link
              href={`/vehicles/${vehicle.slug || vehicle.id}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
