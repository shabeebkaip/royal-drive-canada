import React from 'react'
import { inventories } from "@/constants";
import ImageSlider from "../shared/ImageSlider";


const VehicleGrid = () => {
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

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Explore All Vehicles</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {inventories.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image Slider */}
              <ImageSlider
                images={vehicle.images}
                alt={vehicle.name}
                className="h-48"
              />

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{vehicle.name}</h3>
                  <span className="text-xs text-gray-500">{vehicle.year}</span>
                </div>
                
                <div className="space-y-1 text-xs text-gray-600 mb-3">
                  <div className="flex items-center justify-between">
                    <span>Brand:</span>
                    <span className="font-medium">{vehicle.brand}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Mileage:</span>
                    <span>{formatMileage(vehicle.mileage)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Fuel:</span>
                    <span className="capitalize">{vehicle.fuelType}</span>
                  </div>
                  {vehicle.safetyCertified && (
                    <div className="text-green-600 text-xs font-medium">
                      ✅ Safety Certified
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">{formatPrice(vehicle.price)}</span>
                  {/*<button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">*/}
                  {/*  View Details*/}
                  {/*</button>*/}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VehicleGrid
