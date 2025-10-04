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
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-100/40 to-pink-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 backdrop-blur-sm border border-blue-200/30 text-blue-700 px-5 py-2.5 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Latest Arrivals
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Your
            <span className="block text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text">
              Perfect Ride
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Explore our curated collection of premium pre-owned vehicles, each carefully inspected
            and selected for exceptional quality and value.
          </p>

          {/* Stats Bar */}
          {vehicles.length > 0 && (
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-900">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  {stats.totalVehicles}
                </div>
                <p className="text-sm text-gray-600 font-medium">Latest Vehicles</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-900">
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                  {stats.featuredCount}
                </div>
                <p className="text-sm text-gray-600 font-medium">Featured Models</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-900">
                  <Eye className="w-6 h-6 text-blue-500" />
                  ${stats.avgPrice.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600 font-medium">Average Price</p>
              </div>
            </div>
          )}
        </div>

        {/* Controls Section */}
        {vehicles.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
            <div className="flex items-center gap-3">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-1 border border-gray-200/50 shadow-lg">
                <button
                  onClick={() => setViewMode('horizontal')}
                  className={`p-3 rounded-lg transition-all duration-200 ${
                    viewMode === 'horizontal'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  aria-label="Horizontal view"
                >
                  <Rows3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('vertical')}
                  className={`p-3 rounded-lg transition-all duration-200 ${
                    viewMode === 'vertical'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                <span>Showing</span>
                <span className="font-semibold text-gray-900">{vehicles.length}</span>
                <span>latest vehicles</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleViewAllCars}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                View All Cars
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        
        {/* Vehicle Grid */}
        {vehicles.length > 0 ? (
          <div className={`transition-all duration-500 ${
            viewMode === 'horizontal' 
              ? 'space-y-6' 
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
          }`}>
            {vehicles.map((vehicle, index) => (
              <div
                key={vehicle.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <VehicleCard
                  vehicle={vehicle}
                  showFeaturedBadge={true}
                  onViewDetails={handleViewDetails}
                  isHorizontal={viewMode === 'horizontal'}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Sparkles className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Vehicles Available</h3>
            <p className="text-gray-600">Check back soon for our latest arrivals!</p>
          </div>
        )}

        {/* View All Cars Section */}
        {vehicles.length > 0 && (
          <div className="text-center mt-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-xl max-w-md mx-auto">
              <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Explore Our Full Collection
                </h3>
                <p className="text-gray-600">
                  Browse all vehicles with advanced search and filters
                </p>
              </div>

              <button
                onClick={handleViewAllCars}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                View All Cars
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}

export default LatestVehiclesClient
