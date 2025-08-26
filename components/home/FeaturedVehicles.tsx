import React from 'react'
import Image from 'next/image'

const FeaturedVehicles = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left side - Car image */}
          <div className="relative">
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              {/* Placeholder for car image */}
              <div className="text-gray-400 text-center">
                <div className="w-32 h-20 bg-gray-300 rounded-lg mx-auto mb-4"></div>
                <p>Car Image Placeholder</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Get A Fair Price For Your Car Sell To Us Today
            </h2>
            <p className="text-gray-600 mb-6">
              We buy any car, any condition. Get an instant quote and sell your car today. 
              No hidden fees, no waiting around.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Instant online valuation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Free vehicle inspection</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Same day payment</span>
              </div>
            </div>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors w-fit">
              Get Instant Quote
            </button>
          </div>
        </div>
        
        {/* Featured cars grid */}
        <div className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[830, 738, 100, 238].map((price, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-200 rounded-lg h-32 mb-4 flex items-center justify-center">
                  <div className="text-gray-400">Car {index + 1}</div>
                </div>
                <div className="text-xl font-bold">${price}M</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedVehicles
