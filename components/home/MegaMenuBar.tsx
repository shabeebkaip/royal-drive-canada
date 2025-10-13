"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Brand, VehicleType } from '@/types/api'
import { BrandAPI, VehicleTypeAPI, FuelType, TransmissionType } from '@/types/filters'

const MegaMenuBar = () => {
    const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
    const [brands, setBrands] = useState<Brand[]>([])
    const [bodyTypes, setBodyTypes] = useState<VehicleType[]>([])
    const [fuelTypes, setFuelTypes] = useState<FuelType[]>([])
    const router = useRouter()

    useEffect(() => {
        const fetchFilterOptions = async () => {
            try {
                // Fetch brands
                const brandsRes = await fetch('https://api.royaldrivecanada.com/api/v1/makes/dropdown')
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

                // Fetch body types
                const bodyTypesRes = await fetch('https://api.royaldrivecanada.com/api/v1/vehicle-types')
                const bodyTypesData = await bodyTypesRes.json()
                if (bodyTypesData.success && bodyTypesData.data?.vehicleTypes) {
                    setBodyTypes(bodyTypesData.data.vehicleTypes.map((vt: VehicleTypeAPI) => ({
                        id: vt._id,
                        name: vt.name,
                        image: vt.icon || vt.image,
                        slug: vt.slug
                    })))
                }

                // Fetch fuel types
                const fuelTypesRes = await fetch('https://api.royaldrivecanada.com/api/v1/fuel-types')
                const fuelTypesData = await fuelTypesRes.json()
                if (fuelTypesData.success && fuelTypesData.data?.fuelTypes) {
                    setFuelTypes(fuelTypesData.data.fuelTypes.filter((ft: FuelType) => ft.active))
                }
            } catch (error) {
                console.error('Failed to fetch filter options:', error)
            }
        }
        fetchFilterOptions()
    }, [])

    const navigateWithFilters = (params: Record<string, string | undefined>) => {
        const searchParams = new URLSearchParams()
        Object.entries(params).forEach(([key, value]) => {
            if (value) searchParams.append(key, value)
        })
        router.push(`/vehicles?${searchParams.toString()}`)
        setActiveMegaMenu(null)
    }

    const priceRanges = [
        { label: 'Under $10,000', minPrice: '', maxPrice: '10000', popular: true },
        { label: '$10,000 - $15,000', minPrice: '10000', maxPrice: '15000', popular: true },
        { label: '$15,000 - $20,000', minPrice: '15000', maxPrice: '20000', popular: true },
        { label: '$20,000 - $25,000', minPrice: '20000', maxPrice: '25000', popular: false },
        { label: '$25,000 - $30,000', minPrice: '25000', maxPrice: '30000', popular: false },
        { label: '$30,000 - $40,000', minPrice: '30000', maxPrice: '40000', popular: false },
        { label: '$40,000 - $50,000', minPrice: '40000', maxPrice: '50000', popular: false },
        { label: 'Over $50,000', minPrice: '50000', maxPrice: '', popular: false },
    ]

    const paymentRanges = [
        { label: 'Under $200/month', maxPayment: '200' },
        { label: '$200 - $300/month', minPayment: '200', maxPayment: '300' },
        { label: '$300 - $400/month', minPayment: '300', maxPayment: '400' },
        { label: '$400 - $500/month', minPayment: '400', maxPayment: '500' },
        { label: '$500 - $600/month', minPayment: '500', maxPayment: '600' },
        { label: 'Over $600/month', minPayment: '600' },
    ]

    return (
        <>
            {/* Mega Menu Bar - Hidden on mobile, visible on lg+ screens */}
            <div className="hidden lg:block fixed top-[72px] sm:top-[80px] left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-md">
                <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                    <div className="flex items-center gap-1 pt-5 pb-2 overflow-x-auto scrollbar-hide">
                        {/* Shop Used Vehicles */}
                        <div className="relative">
                            <button
                                onMouseEnter={() => setActiveMegaMenu('vehicles')}
                                onClick={() => setActiveMegaMenu(activeMegaMenu === 'vehicles' ? null : 'vehicles')}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap text-sm font-semibold ${
                                    activeMegaMenu === 'vehicles' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                Shop Used Vehicles
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>

                        {/* Shop By Price */}
                        <div className="relative">
                            <button
                                onMouseEnter={() => setActiveMegaMenu('price')}
                                onClick={() => setActiveMegaMenu(activeMegaMenu === 'price' ? null : 'price')}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap text-sm font-semibold ${
                                    activeMegaMenu === 'price' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                Shop By Price
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>

                        {/* Shop By Payment */}
                        <div className="relative">
                            <button
                                onMouseEnter={() => setActiveMegaMenu('payment')}
                                onClick={() => setActiveMegaMenu(activeMegaMenu === 'payment' ? null : 'payment')}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap text-sm font-semibold ${
                                    activeMegaMenu === 'payment' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                Shop By Payment
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>

                        {/* Shop By Brand */}
                        <div className="relative">
                            <button
                                onMouseEnter={() => setActiveMegaMenu('brand')}
                                onClick={() => setActiveMegaMenu(activeMegaMenu === 'brand' ? null : 'brand')}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap text-sm font-semibold ${
                                    activeMegaMenu === 'brand' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                Shop By Brand
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>

                        {/* Special Categories */}
                        <div className="relative">
                            <button
                                onMouseEnter={() => setActiveMegaMenu('special')}
                                onClick={() => setActiveMegaMenu(activeMegaMenu === 'special' ? null : 'special')}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap text-sm font-semibold ${
                                    activeMegaMenu === 'special' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                Special Categories
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mega Menu Dropdown */}
                {activeMegaMenu && (
                    <div 
                        className="absolute left-0 right-0 bg-white border-t border-gray-200 shadow-lg"
                        onMouseLeave={() => setActiveMegaMenu(null)}
                    >
                        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6">
                            {/* Vehicle Types Menu - Using Real API Data */}
                            {activeMegaMenu === 'vehicles' && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Browse by Type</h3>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                                        {/* All Vehicles Option */}
                                        <button
                                            onClick={() => navigateWithFilters({})}
                                            className="group p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
                                        >
                                            <div className="flex flex-col items-center text-center gap-2">
                                                <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                </svg>
                                                <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600">All Vehicles</span>
                                            </div>
                                        </button>
                                        
                                        {/* Dynamic Body Types from API */}
                                        {bodyTypes.map((type) => (
                                            <button
                                                key={type.id}
                                                onClick={() => navigateWithFilters({ vehicleType: type.id.toString() })}
                                                className="group p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
                                            >
                                                <div className="flex flex-col items-center text-center gap-2">
                                                    <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600">{type.name}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Price Ranges Menu - Compact */}
                            {activeMegaMenu === 'price' && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Shop by Budget</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2">
                                        {priceRanges.map((range, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => navigateWithFilters({ minPrice: range.minPrice, maxPrice: range.maxPrice })}
                                                className={`p-3 rounded-lg border transition-all text-left ${
                                                    range.popular 
                                                        ? 'border-blue-500 bg-blue-50 hover:bg-blue-100' 
                                                        : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-gray-900">{range.label}</span>
                                                    {range.popular && (
                                                        <span className="text-xs font-semibold text-blue-600">★</span>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Payment Ranges Menu - Compact */}
                            {activeMegaMenu === 'payment' && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Monthly Payments</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
                                        {paymentRanges.map((range, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => navigateWithFilters({ minPayment: range.minPayment, maxPayment: range.maxPayment })}
                                                className="p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                                            >
                                                <span className="text-sm font-medium text-gray-900">{range.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Brands Menu - Compact Grid */}
                            {activeMegaMenu === 'brand' && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Shop by Brand</h3>
                                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 max-h-80 overflow-y-auto custom-scrollbar">
                                        {brands.map((brand) => (
                                            <button
                                                key={brand.id}
                                                onClick={() => navigateWithFilters({ make: brand.id.toString() })}
                                                className="p-2.5 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
                                            >
                                                <span className="text-xs font-medium text-gray-900">{brand.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Special Categories - Compact */}
                            {activeMegaMenu === 'special' && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Special Categories</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
                                        {/* Budget Friendly */}
                                        <button
                                            onClick={() => navigateWithFilters({ maxPrice: '15000' })}
                                            className="p-3 rounded-lg border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all text-left"
                                        >
                                            <div className="text-sm font-medium text-gray-900">Budget Friendly</div>
                                            <div className="text-xs text-gray-500">Under $15k</div>
                                        </button>

                                        {/* Fuel Types from API */}
                                        {fuelTypes.slice(0, 3).map((fuel) => (
                                            <button
                                                key={fuel._id}
                                                onClick={() => navigateWithFilters({ fuelType: fuel._id })}
                                                className="p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                                            >
                                                <div className="text-sm font-medium text-gray-900">{fuel.name}</div>
                                                <div className="text-xs text-gray-500">Eco-friendly</div>
                                            </button>
                                        ))}

                                        {/* Luxury */}
                                        <button
                                            onClick={() => navigateWithFilters({ minPrice: '50000' })}
                                            className="p-3 rounded-lg border border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all text-left"
                                        >
                                            <div className="text-sm font-medium text-gray-900">Luxury</div>
                                            <div className="text-xs text-gray-500">Premium</div>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Backdrop for mega menu */}
            {activeMegaMenu && (
                <div 
                    className="fixed inset-0 bg-black/5 z-30"
                    onClick={() => setActiveMegaMenu(null)}
                />
            )}
        </>
    )
}

export default MegaMenuBar
