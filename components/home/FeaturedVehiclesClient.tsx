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
  const handleViewDetails = (vehicleId: string | number) => {
    // TODO: Navigate to vehicle details page
    console.log('View details for vehicle:', vehicleId);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Featured Collection
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Premium Vehicles
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {`Handpicked selection of exceptional vehicles, each inspected for quality,
            reliability, and outstanding value. Your perfect drive awaits.`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              showFeaturedBadge={true}
              onViewDetails={() => handleViewDetails(vehicle.id)}
            />
          ))}
        </div>

        {vehicles.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Featured Vehicles</h3>
            <p className="text-gray-500">Check back soon for our latest featured collection.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {`Can't Find What You're Looking For?`}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {`Browse our complete inventory or let us help you find the perfect vehicle.
              We have access to hundreds of quality pre-owned vehicles.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
                View All Inventory
              </button>
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl font-semibold transition-colors">
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
