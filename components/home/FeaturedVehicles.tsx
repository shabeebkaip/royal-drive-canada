import React from 'react'
import { inventories } from "@/constants";
import ImageSlider from "../shared/ImageSlider";

const FeaturedVehicles = () => {
  // Filter vehicles that have featured: true
  const featuredVehicles = inventories.filter(vehicle => vehicle.featured === true);

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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Vehicles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium vehicles. Each featured car has been carefully selected for its quality, reliability, and value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
              {/* Featured Badge */}
              <div className="relative">
                <ImageSlider
                  images={vehicle.images}
                  alt={vehicle.name}
                  className="h-48"
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  ⭐ Featured
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-sm">{vehicle.name}</h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{vehicle.year}</span>
                </div>

                <div className="space-y-2 text-xs text-gray-600 mb-4">
                  <div className="flex items-center justify-between">
                    <span>Brand:</span>
                    <span className="font-medium text-blue-600">{vehicle.brand}</span>
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
                    <div className="text-green-600 text-xs font-medium flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Safety Certified
                    </div>
                  )}
                </div>

                <div className="border-t pt-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-gray-900">{formatPrice(vehicle.price)}</span>
                  </div>
                  {/*<button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">*/}
                  {/*  View Details*/}
                  {/*</button>*/}
                </div>
              </div>
            </div>
          ))}
        </div>

        {featuredVehicles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No featured vehicles available at the moment.</p>
          </div>
        )}

        <div className="text-center mt-8">
        </div>
      </div>
    </section>
  )
}

export default FeaturedVehicles
