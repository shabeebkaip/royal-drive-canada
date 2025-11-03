/**
 * Featured Vehicles - Client Component
 * Handles UI rendering and interactions
 */

"use client"
import React from 'react'
import { Vehicle } from "@/types/api";
import VehicleCard from "../shared/VehicleCard";
import { Star } from 'lucide-react';

interface FeaturedVehiclesClientProps {
  vehicles: Vehicle[];
}

const FeaturedVehiclesClient = ({ vehicles }: FeaturedVehiclesClientProps) => {

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-5 h-5 text-blue-600" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Featured Vehicles
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            Handpicked selection of quality vehicles inspected for reliability and value
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              showFeaturedBadge={true}
            />
          ))}
        </div>

        {vehicles.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No Featured Vehicles</h3>
            <p className="text-sm text-gray-500">Check back soon for our latest featured collection</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-8 sm:mt-10">
          <div className="bg-white rounded-lg p-6 sm:p-8 border border-gray-200 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Looking for More Options?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-2xl mx-auto">
              Browse our complete inventory or contact us to find your perfect vehicle
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm">
                View All Vehicles
              </button>
              <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors text-sm">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedVehiclesClient
