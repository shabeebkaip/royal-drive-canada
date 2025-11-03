"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Brand } from '@/types/api'
import { BrandAPI } from '@/types/filters'

interface QuickFilterOption {
  label: string
  params: Record<string, string>
  icon: string
}

const SubHeader = () => {
  const router = useRouter()
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    const fetchFilterOptions = async () => {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ;
      try {
        // Fetch brands
        const brandsRes = await fetch(`${apiBase}/makes/dropdown`)
        const brandsData = await brandsRes.json()
        
        if (brandsData.success && brandsData.data) {
          const brandsList = Array.isArray(brandsData.data) ? brandsData.data : brandsData.data.makes || []
          const activeBrands = brandsList.map((b: BrandAPI) => ({
            id: b._id,
            name: b.name,
            logo: b.logo,
            slug: b.slug
          }))
          setBrands(activeBrands)
        }
      } catch (error) {
        console.error('Failed to fetch filter options:', error)
      }
    }

    fetchFilterOptions()
  }, [])

  const navigateWithFilters = (params: Record<string, string>) => {
    const searchParams = new URLSearchParams(params)
    router.push(`/vehicles?${searchParams.toString()}`)
    setActiveDropdown(null)
  }

  const vehicleTypeFilters: QuickFilterOption[] = [
    { label: 'Used Cars For Sale', params: {}, icon: '🚗' },
    { label: 'Used SUVs For Sale', params: { vehicleType: 'suv' }, icon: '🚙' },
    { label: 'Used Vans For Sale', params: { vehicleType: 'van' }, icon: '🚐' },
    { label: 'Used Trucks For Sale', params: { vehicleType: 'truck' }, icon: '🚚' },
    { label: 'Used Sedans For Sale', params: { vehicleType: 'sedan' }, icon: '🚘' },
    { label: 'Used Coupes For Sale', params: { vehicleType: 'coupe' }, icon: '🏎️' },
    { label: 'Cheap Cars', params: { maxPrice: '15000' }, icon: '💰' },
    { label: 'Fuel Efficient Cars', params: { fuelType: 'hybrid' }, icon: '⚡' },
    { label: '7+ Seater Vehicles', params: { minSeats: '7' }, icon: '👨‍👩‍👧‍�' },
  ]

  const priceFilters: QuickFilterOption[] = [
    { label: 'Under $10,000', params: { maxPrice: '10000' }, icon: '💰' },
    { label: 'Under $15,000', params: { maxPrice: '15000' }, icon: '💵' },
    { label: 'Under $20,000', params: { maxPrice: '20000' }, icon: '💸' },
    { label: 'Under $25,000', params: { maxPrice: '25000' }, icon: '💳' },
    { label: 'Under $30,000', params: { maxPrice: '30000' }, icon: '💎' },
    { label: '$30k - $50k', params: { minPrice: '30000', maxPrice: '50000' }, icon: '👑' },
    { label: 'Over $50,000', params: { minPrice: '50000' }, icon: '🏆' },
  ]

  const paymentFilters: QuickFilterOption[] = [
    { label: 'Under $200/month', params: { maxPayment: '200' }, icon: '📅' },
    { label: 'Under $300/month', params: { maxPayment: '300' }, icon: '📊' },
    { label: 'Under $400/month', params: { maxPayment: '400' }, icon: '📈' },
    { label: 'Under $500/month', params: { maxPayment: '500' }, icon: '💼' },
    { label: 'Under $600/month', params: { maxPayment: '600' }, icon: '🎯' },
  ]

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 sticky top-[56px] sm:top-[64px] z-40 shadow-xl">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center overflow-x-auto scrollbar-hide py-3 sm:py-3.5 gap-2 sm:gap-3 md:gap-4">
          {/* Shop Used Vehicles Dropdown */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'vehicles' ? null : 'vehicles')}
              className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 text-white hover:bg-gray-700 rounded-lg transition-all duration-200 text-sm sm:text-base whitespace-nowrap font-semibold border border-gray-700 hover:border-gray-600"
            >
              <span>Shop Used Vehicles</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {activeDropdown === 'vehicles' && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 min-w-[250px] sm:min-w-[280px] z-50">
                <div className="p-2">
                  {vehicleTypeFilters.map((filter, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigateWithFilters(filter.params)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3 text-gray-800 text-sm sm:text-base"
                    >
                      <span className="text-xl">{filter.icon}</span>
                      <span className="font-medium">{filter.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Shop By Price Dropdown */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'price' ? null : 'price')}
              className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 text-white hover:bg-gray-700 rounded-lg transition-all duration-200 text-sm sm:text-base whitespace-nowrap font-semibold border border-gray-700 hover:border-gray-600"
            >
              <span>Shop By Price</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {activeDropdown === 'price' && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 min-w-[250px] sm:min-w-[280px] z-50">
                <div className="p-2">
                  {priceFilters.map((filter, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigateWithFilters(filter.params)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3 text-gray-800 text-sm sm:text-base"
                    >
                      <span className="text-xl">{filter.icon}</span>
                      <span className="font-medium">{filter.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Shop By Payment Dropdown */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'payment' ? null : 'payment')}
              className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 text-white hover:bg-gray-700 rounded-lg transition-all duration-200 text-sm sm:text-base whitespace-nowrap font-semibold border border-gray-700 hover:border-gray-600"
            >
              <span>Shop By Payment</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {activeDropdown === 'payment' && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 min-w-[250px] sm:min-w-[280px] z-50">
                <div className="p-2">
                  {paymentFilters.map((filter, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigateWithFilters(filter.params)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3 text-gray-800 text-sm sm:text-base"
                    >
                      <span className="text-xl">{filter.icon}</span>
                      <span className="font-medium">{filter.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Shop By Brand Dropdown */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'brand' ? null : 'brand')}
              className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 text-white hover:bg-gray-700 rounded-lg transition-all duration-200 text-sm sm:text-base whitespace-nowrap font-semibold border border-gray-700 hover:border-gray-600"
            >
              <span>Shop By Brand</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {activeDropdown === 'brand' && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 min-w-[280px] sm:min-w-[320px] max-h-[400px] overflow-y-auto z-50">
                <div className="p-2 grid grid-cols-2 gap-1">
                  {brands.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => navigateWithFilters({ make: brand.id.toString() })}
                      className="text-left px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2 text-gray-800 text-sm"
                    >
                      <span className="font-medium">{brand.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop overlay */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </div>
  )
}

export default SubHeader
