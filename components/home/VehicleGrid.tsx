import React from 'react'

const vehicles = [
  {
    id: 1,
    name: 'BMW X5',
    year: 2023,
    price: '$72,000',
    image: '/placeholder-car.jpg',
    location: 'Toronto',
    mileage: '15,000 km',
    fuel: 'Gasoline'
  },
  {
    id: 2,
    name: 'Audi Q7',
    year: 2022,
    price: '$68,500',
    image: '/placeholder-car.jpg',
    location: 'Vancouver',
    mileage: '22,000 km',
    fuel: 'Gasoline'
  },
  {
    id: 3,
    name: 'Tesla Model Y',
    year: 2024,
    price: '$82,000',
    image: '/placeholder-car.jpg',
    location: 'Calgary',
    mileage: '8,000 km',
    fuel: 'Electric'
  },
  {
    id: 4,
    name: 'Mercedes GLE',
    year: 2023,
    price: '$78,900',
    image: '/placeholder-car.jpg',
    location: 'Montreal',
    mileage: '12,000 km',
    fuel: 'Gasoline'
  },
  {
    id: 5,
    name: 'Lexus RX',
    year: 2022,
    price: '$65,000',
    image: '/placeholder-car.jpg',
    location: 'Ottawa',
    mileage: '18,000 km',
    fuel: 'Hybrid'
  },
  {
    id: 6,
    name: 'Porsche Macan',
    year: 2024,
    price: '$89,500',
    image: '/placeholder-car.jpg',
    location: 'Edmonton',
    mileage: '5,000 km',
    fuel: 'Gasoline'
  },
  {
    id: 7,
    name: 'Range Rover Sport',
    year: 2023,
    price: '$95,000',
    image: '/placeholder-car.jpg',
    location: 'Winnipeg',
    mileage: '10,000 km',
    fuel: 'Gasoline'
  },
  {
    id: 8,
    name: 'Volvo XC90',
    year: 2022,
    price: '$72,500',
    image: '/placeholder-car.jpg',
    location: 'Halifax',
    mileage: '25,000 km',
    fuel: 'Hybrid'
  }
]

const VehicleGrid = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Explore All Vehicles</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image placeholder */}
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <div className="text-gray-400">Vehicle Image</div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{vehicle.name}</h3>
                  <span className="text-sm text-gray-500">{vehicle.year}</span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center justify-between">
                    <span>Location:</span>
                    <span>{vehicle.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Mileage:</span>
                    <span>{vehicle.mileage}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Fuel:</span>
                    <span>{vehicle.fuel}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">{vehicle.price}</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    View Details
                  </button>
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
