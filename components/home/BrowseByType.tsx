import React from 'react'
import Image from 'next/image'

const vehicleTypes = [
  { name: 'Sedan', image: '/sedan.webp', count: '5,234' },
  { name: 'SUV', image: '/suv.webp', count: '3,456' },
  { name: 'Truck', image: '/pickup.webp', count: '2,123' },
  { name: 'Coupe', image: '/coupe.webp', count: '1,890' },
  { name: 'Hatchback', image: '/hatchback.webp', count: '2,567' },
  { name: 'Convertible', image: '/convertible.webp', count: '892' },
  { name: 'Wagon', image: '/wagon.webp', count: '1,234' },
]

const BrowseByType = () => {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Browse by Type</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-10">
          {vehicleTypes.map((type, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className="h-16 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Image 
                  src={type.image}
                  alt={`${type.name} cars`}
                  width={100}
                  height={50}
                  className="object-contain"
                />
              </div>
              <h3 className="font-medium text-gray-900">{type.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrowseByType
