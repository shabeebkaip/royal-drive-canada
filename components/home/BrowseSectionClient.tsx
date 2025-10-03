'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { VehicleType } from '@/types/api'

type TabType = 'types' | 'brands'

interface Brand {
  id: number;
  name: string;
  logo: string;
}

interface BrowseSectionClientProps {
  vehicleTypes: VehicleType[];
  brands: Brand[];
}

const BrowseSectionClient = ({ vehicleTypes, brands }: BrowseSectionClientProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('types')

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Tabs */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 tracking-tight">
            Explore Our Collection
          </h2>

          {/* Modern Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-50 rounded-2xl p-2 shadow-lg border border-gray-100">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('types')}
                  className={`relative px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    activeTab === 'types'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
                  }`}
                >
                  {activeTab === 'types' && (
                    <div className="absolute inset-0 bg-blue-600 rounded-xl shadow-lg" />
                  )}
                  <span className="relative z-10">Vehicle Types</span>
                </button>
                <button
                  onClick={() => setActiveTab('brands')}
                  className={`relative px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    activeTab === 'brands'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
                  }`}
                >
                  {activeTab === 'brands' && (
                    <div className="absolute inset-0 bg-blue-600 rounded-xl shadow-lg" />
                  )}
                  <span className="relative z-10">Popular Brands</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area with Smooth Transitions */}
        <div className="relative min-h-[400px]">
          {/* Vehicle Types Tab */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              activeTab === 'types'
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-4 pointer-events-none absolute inset-0'
            }`}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {vehicleTypes.map((type, index) => (
                <div
                  key={type.id}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl border border-white/50 hover:border-blue-200 flex flex-col items-center p-6 cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: activeTab === 'types' ? 'fadeInUp 0.6s ease-out forwards' : 'none'
                  }}
                >
                  <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-xl  group-hover:from-blue-100 group-hover:to-indigo-200 transition-all duration-300">
                      <Image
                        src={type.image}
                        alt={`${type.name} cars`}
                        width={64}
                        height={64}
                        className="object-contain w-full h-full "
                      />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-base text-center mb-2 tracking-wide group-hover:text-blue-600 transition-colors duration-300">
                    {type.name}
                  </h3>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-70 group-hover:opacity-100 group-hover:w-12 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Brands Tab */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              activeTab === 'brands'
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-4 pointer-events-none absolute inset-0'
            }`}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {brands.map((brand, index) => (
                <Link
                  href={`/brands/${brand.name.toLowerCase()}`}
                  key={brand.id}
                  className="group flex flex-col items-center justify-center"
                  style={{
                    animationDelay: `${index * 80}ms`,
                    animation: activeTab === 'brands' ? 'fadeInUp 0.6s ease-out forwards' : 'none'
                  }}
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl border border-white/50 hover:border-blue-200 flex items-center justify-center w-full h-28 mb-3 transition-all duration-300 group-hover:scale-105">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      width={80}
                      height={80}
                      className="object-contain w-16 h-16 drop-shadow-sm"
                    />
                  </div>
                  <span className="font-semibold text-gray-800 text-sm text-center mb-2 tracking-wide group-hover:text-blue-600 transition-colors duration-300">
                    {brand.name}
                  </span>
                  <div className="w-6 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-70 group-hover:opacity-100 group-hover:w-8 transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}

export default BrowseSectionClient
