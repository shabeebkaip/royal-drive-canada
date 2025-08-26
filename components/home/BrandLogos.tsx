import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { brands } from '@/constants'

const BrandLogos = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Popular Brands</h2>
          
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-11 gap-6">
          {brands.map((brand, index) => (
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
