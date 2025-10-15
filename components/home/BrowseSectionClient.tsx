'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { VehicleType, Brand } from '@/types/api'

type TabType = 'types' | 'brands'

interface BrowseSectionClientProps {
  vehicleTypes: VehicleType[];
  brands: Brand[];
}

const BrowseSectionClient = ({ vehicleTypes, brands }: BrowseSectionClientProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('types')
  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header with Tabs */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Browse by Category
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Find your perfect vehicle by type or brand
              </p>
            </div>

            {/* Professional Tab Navigation */}
            <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
              <button
                onClick={() => setActiveTab('types')}
                className={`px-4 sm:px-6 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
                  activeTab === 'types'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Vehicle Types
              </button>
              <button
                onClick={() => setActiveTab('brands')}
                className={`px-4 sm:px-6 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
                  activeTab === 'brands'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Brands
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative">
          {/* Vehicle Types Tab */}
          <div
            className={`transition-all duration-300 ${
              activeTab === 'types'
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none absolute inset-0'
            }`}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {vehicleTypes.map((type) => (
                <Link
                  key={type.id}
                  href={`/vehicles?vehicleType=${type.id}`}
                  className="group bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 p-4 flex flex-col items-center"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mb-3 flex items-center justify-center">
                    {type.image ? (
                      <Image
                        src={type.image}
                        alt={type.name}
                        width={56}
                        height={56}
                        className="object-contain w-full h-full grayscale group-hover:grayscale-0 transition-all duration-200"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-xs sm:text-sm text-center group-hover:text-blue-600 transition-colors">
                    {type.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>

          {/* Brands Tab */}
          <div
            className={`transition-all duration-300 ${
              activeTab === 'brands'
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none absolute inset-0'
            }`}
          >
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
              {brands.map((brand) => (
                <Link
                  href={`/vehicles?make=${brand.id}`}
                  key={brand.id}
                  className="group bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 p-3 sm:p-4 flex flex-col items-center justify-center aspect-square"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-2">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={56}
                      height={56}
                      className="object-contain w-full h-full grayscale group-hover:grayscale-0 transition-all duration-200"
                    />
                  </div>
                  <span className="font-medium text-gray-900 text-xs text-center group-hover:text-blue-600 transition-colors line-clamp-1">
                    {brand.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BrowseSectionClient
