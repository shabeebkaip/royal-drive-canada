"use client"
import React, { useState } from 'react'
import VehicleCard from "../shared/VehicleCard";
import { ArrowRight, Grid3X3, Rows3, Sparkles, TrendingUp, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Vehicle } from '@/types/api';

interface LatestVehiclesClientProps {
  vehicles: Vehicle[];
}

const LatestVehiclesClient: React.FC<LatestVehiclesClientProps> = ({ vehicles }) => {
  const [viewMode, setViewMode] = useState<'vertical' | 'horizontal'>('horizontal');
  const router = useRouter();

  const handleViewDetails = (vehicleId: string) => {
    // Navigate to vehicle details page using slug
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (vehicle?.slug) {
      router.push(`/vehicles/${vehicle.slug}`);
    }
  };

  const handleViewAllCars = () => {
    router.push('/vehicles');
  };

  const stats = {
    totalVehicles: vehicles.length,
    avgPrice: vehicles.length > 0 
      ? Math.round(vehicles.reduce((sum, v) => sum + (v.price || 0), 0) / vehicles.length)
      : 0,
    featuredCount: vehicles.filter(v => v.featured).length
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Latest Arrivals
                </h2>
              </div>
              <p className="text-sm sm:text-base text-gray-600">
                Recently added vehicles to our inventory
              </p>
            </div>

            {vehicles.length > 0 && (
              <button
                onClick={handleViewAllCars}
                className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Controls Section */}
        {vehicles.length > 0 && (
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="inline-flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('horizontal')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'horizontal'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="List view"
                >
                  <Rows3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('vertical')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'vertical'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>

              <span className="text-sm text-gray-600">
                {vehicles.length} vehicles
              </span>
            </div>

            <button
              onClick={handleViewAllCars}
              className="sm:hidden flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
        
        {/* Vehicle Grid */}
        {vehicles.length > 0 ? (
          <div className={`${
            viewMode === 'horizontal' 
              ? 'space-y-4' 
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'
          }`}>
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                showFeaturedBadge={true}
                onViewDetails={handleViewDetails}
                isHorizontal={viewMode === 'horizontal'}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No Vehicles Available</h3>
            <p className="text-sm text-gray-500">Check back soon for our latest arrivals</p>
          </div>
        )}

        {/* View All Section - Mobile Only */}
        {vehicles.length > 0 && (
          <div className="text-center mt-8 sm:hidden">
            <button
              onClick={handleViewAllCars}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm"
            >
              View All Vehicles
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default LatestVehiclesClient
