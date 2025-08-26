import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Array of car brands with their logo paths
const brands = [
  { name: 'Audi', logo: '/audi.webp' },
  { name: 'BMW', logo: '/bmw.webp' },
  { name: 'Chevrolet', logo: '/chevrolet.webp' },
  { name: 'Ford', logo: '/ford.webp' },
  { name: 'GMC', logo: '/gmc.webp' },
  { name: 'Honda', logo: '/honda.webp' },
  { name: 'Hyundai', logo: '/hyundai.webp' },
  { name: 'Infiniti', logo: '/infiniti.webp' },
  { name: 'Jeep', logo: '/jeep.webp' },
  { name: 'Lexus', logo: '/lexus.webp' },
  { name: 'Mazda', logo: '/mazda.webp' },
  { name: 'Mercedes', logo: '/mercedes.webp' },
  { name: 'MG', logo: '/mg.webp' },
  { name: 'Mitsubishi', logo: '/mitsubishi.webp' },
  { name: 'Nissan', logo: '/nissan.webp' },
  { name: 'Porsche', logo: '/porsche.webp' },
  { name: 'Range Rover', logo: '/range-rover.webp' },
  { name: 'Renault', logo: '/renault.webp' },
  { name: 'Suzuki', logo: '/suzuki.webp' },
  { name: 'Tesla', logo: '/tesla.webp' },
  { name: 'Toyota', logo: '/toyota.webp' },
  { name: 'Volkswagen', logo: '/volkswagen.webp' },
]

const BrandLogos = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Popular Brands</h2>
          <Link href="/brands" className="text-blue-600 hover:text-blue-700 font-medium">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-11 gap-6">
          {brands.slice(0, 11).map((brand, index) => (
            <Link 
              href={`/brands/${brand.name.toLowerCase()}`} 
              key={index}
              className="flex flex-col items-center justify-center group"
            >
              <div className="h-16 w-24 flex items-center justify-center bg-white border border-gray-100 rounded-lg p-3 mb-2 group-hover:shadow-md transition-shadow">
                <Image 
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={80}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-sm text-gray-700">{brand.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandLogos
