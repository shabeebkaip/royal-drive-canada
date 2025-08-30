'use client'

import React, {useState, useMemo} from 'react'
import {inventories, brands} from '@/constants'
import VehicleCard from '@/components/shared/VehicleCard'
import PageHero from '@/components/shared/PageHero'
import Dropdown from '@/components/shared/Dropdown'
import {Search, LayoutGrid, List, SlidersHorizontal, Car, DollarSign} from 'lucide-react'

const VehiclesPage = () => {
    // Filter states
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedBrand, setSelectedBrand] = useState('')
    const [selectedFuelType, setSelectedFuelType] = useState('')
    const [selectedTransmission, setSelectedTransmission] = useState('')
    const [priceRange, setPriceRange] = useState('')
    const [mileageRange, setMileageRange] = useState('')
    const [yearRange, setYearRange] = useState('')
    const [safetyCertified, setSafetyCertified] = useState(false)
    const [featuredOnly, setFeaturedOnly] = useState(false)

    // Layout state
    const [isHorizontal, setIsHorizontal] = useState(false)
    const [showFilters, setShowFilters] = useState(false)

    // Filter options
    const fuelTypes = [...new Set(inventories.map(v => v.fuelType))].filter(Boolean)
    const transmissions = [...new Set(inventories.map(v => v.transmission))].filter(Boolean)
    const priceRanges = [
        {value: '', label: 'Any Price'},
        {value: '0-5000', label: 'Under $5,000'},
        {value: '5000-10000', label: '$5,000 - $10,000'},
        {value: '10000-15000', label: '$10,000 - $15,000'},
        {value: '15000-25000', label: '$15,000 - $25,000'},
        {value: '25000-35000', label: '$25,000 - $35,000'},
        {value: '35000+', label: '$35,000+'}
    ]
    const mileageRanges = [
        {value: '', label: 'Any Mileage'},
        {value: '0-50000', label: 'Under 50,000 km'},
        {value: '50000-100000', label: '50,000 - 100,000 km'},
        {value: '100000-150000', label: '100,000 - 150,000 km'},
        {value: '150000-200000', label: '150,000 - 200,000 km'},
        {value: '200000+', label: '200,000+ km'}
    ]
    const yearRanges = [
        {value: '', label: 'Any Year'},
        {value: '2020+', label: '2020 & Newer'},
        {value: '2015-2019', label: '2015 - 2019'},
        {value: '2010-2014', label: '2010 - 2014'},
        {value: '2005-2009', label: '2005 - 2009'}
    ]

    // Filtered vehicles
    const filteredVehicles = useMemo(() => {
        return inventories.filter(vehicle => {
            // Search term filter
            if (searchTerm && !vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false
            }

            // Brand filter
            if (selectedBrand && vehicle.brand !== selectedBrand) return false

            // Fuel type filter
            if (selectedFuelType && vehicle.fuelType !== selectedFuelType) return false

            // Transmission filter
            if (selectedTransmission && vehicle.transmission !== selectedTransmission) return false

            // Price range filter
            if (priceRange && vehicle.price) {
                const [min, max] = priceRange.split('-').map(p => p.replace('+', ''))
                const price = vehicle.price
                if (priceRange.includes('+')) {
                    if (price < parseInt(min)) return false
                } else {
                    if (price < parseInt(min) || price > parseInt(max)) return false
                }
            }

            // Mileage range filter
            if (mileageRange && vehicle.mileage) {
                const [min, max] = mileageRange.split('-').map(m => m.replace('+', ''))
                const mileage = vehicle.mileage
                if (mileageRange.includes('+')) {
                    if (mileage < parseInt(min)) return false
                } else {
                    if (mileage < parseInt(min) || mileage > parseInt(max)) return false
                }
            }

            // Year range filter
            if (yearRange) {
                const year = vehicle.year
                if (yearRange.includes('+')) {
                    if (year < parseInt(yearRange.replace('+', ''))) return false
                } else {
                    const [min, max] = yearRange.split('-').map(y => parseInt(y))
                    if (year < min || year > max) return false
                }
            }

            // Safety certified filter
            if (safetyCertified && !vehicle.safetyCertified) return false

            // Featured only filter
            if (featuredOnly && !vehicle.featured) return false

            return true
        })
    }, [searchTerm, selectedBrand, selectedFuelType, selectedTransmission, priceRange, mileageRange, yearRange, safetyCertified, featuredOnly])

    // Clear all filters
    const clearFilters = () => {
        setSearchTerm('')
        setSelectedBrand('')
        setSelectedFuelType('')
        setSelectedTransmission('')
        setPriceRange('')
        setMileageRange('')
        setYearRange('')
        setSafetyCertified(false)
        setFeaturedOnly(false)
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <PageHero
                title="Our Vehicle Collection"
                subtitle="Discover quality pre-owned vehicles with transparent pricing, safety certifications, and exceptional value. Every vehicle is carefully inspected and ready for the road."
                backgroundImage="https://res.cloudinary.com/dm5c31z7w/image/upload/v1756556283/bg_bfnqou.jpg"
                compact={true}
                badges={[
                    {
                        text: `${inventories.length} Vehicles Available`,
                        icon: <Car className="w-4 h-4 text-blue-400"/>
                    },
                    {
                        text: "All Budgets Welcome",
                        icon: <DollarSign className="w-4 h-4 text-green-400"/>
                    }
                ]}
                stats={[
                    {value: `${inventories.length}`, label: "Total Vehicles"},
                    {value: `${inventories.filter(v => v.featured).length}`, label: "Featured Vehicles"},
                    {value: `${inventories.filter(v => v.safetyCertified).length}`, label: "Safety Certified"}
                ]}
                cta={{
                    primary: {
                        text: "Call (647) 622-2202",
                        action: "call"
                    },
                    secondary: {
                        text: "Get Directions",
                        action: "directions"
                    }
                }}
            />

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                {/* Search and Filter Header */}
                <div className="mb-8">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                        {/* Search Bar */}
                        <div className="mb-6">
                            <div className="relative">
                                <Search
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
                                <input
                                    type="text"
                                    placeholder="Search by make, model, or keyword..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                />
                            </div>
                        </div>

                        {/* Filter Toggle and Layout Controls */}
                        <div
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    <SlidersHorizontal className="w-4 h-4"/>
                                    Filters
                                    {(selectedBrand || selectedFuelType || selectedTransmission || priceRange || mileageRange || yearRange || safetyCertified || featuredOnly) && (
                                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      Active
                    </span>
                                    )}
                                </button>

                                {/* Clear Filters */}
                                {(selectedBrand || selectedFuelType || selectedTransmission || priceRange || mileageRange || yearRange || safetyCertified || featuredOnly) && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Results Count */}
                                <span className="text-gray-600">
                  {filteredVehicles.length} vehicle{filteredVehicles.length !== 1 ? 's' : ''} found
                </span>

                                {/* Layout Toggle */}
                                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                                    <button
                                        onClick={() => setIsHorizontal(false)}
                                        className={`p-2 rounded transition-colors ${!isHorizontal ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                                    >
                                        <LayoutGrid className="w-4 h-4"/>
                                    </button>
                                    <button
                                        onClick={() => setIsHorizontal(true)}
                                        className={`p-2 rounded transition-colors ${isHorizontal ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                                    >
                                        <List className="w-4 h-4"/>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Expandable Filters */}
                        {showFilters && (
                            <div className="border-t border-gray-200 pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {/* Brand Filter */}
                                    <Dropdown
                                        label="Brand"
                                        value={selectedBrand}
                                        onChange={setSelectedBrand}
                                        options={[
                                            {value: '', label: 'All Brands'},
                                            ...brands.map(brand => ({value: brand.name, label: brand.name}))
                                        ]}
                                    />

                                    {/* Fuel Type Filter */}
                                    <Dropdown
                                        label="Fuel Type"
                                        value={selectedFuelType}
                                        onChange={setSelectedFuelType}
                                        options={[
                                            {value: '', label: 'All Fuel Types'},
                                            ...fuelTypes.map(fuel => ({value: fuel, label: fuel}))
                                        ]}
                                    />

                                    {/* Price Range Filter */}
                                    <Dropdown
                                        label="Price Range"
                                        value={priceRange}
                                        onChange={setPriceRange}
                                        options={priceRanges}
                                    />

                                    {/* Year Range Filter */}
                                    <Dropdown
                                        label="Year"
                                        value={yearRange}
                                        onChange={setYearRange}
                                        options={yearRanges}
                                    />

                                    {/* Transmission Filter */}
                                    <Dropdown
                                        label="Transmission"
                                        value={selectedTransmission}
                                        onChange={setSelectedTransmission}
                                        options={[
                                            {value: '', label: 'All Transmissions'},
                                            ...transmissions.map(trans => ({value: trans, label: trans}))
                                        ]}
                                    />

                                    {/* Mileage Range Filter */}
                                    <Dropdown
                                        label="Mileage"
                                        value={mileageRange}
                                        onChange={setMileageRange}
                                        options={mileageRanges}
                                    />
                                </div>

                                {/* Checkbox Filters */}
                                <div className="flex flex-wrap gap-6 mt-6">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={safetyCertified}
                                            onChange={(e) => setSafetyCertified(e.target.checked)}
                                            className="mr-2"
                                        />
                                        Safety Certified Only
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={featuredOnly}
                                            onChange={(e) => setFeaturedOnly(e.target.checked)}
                                            className="mr-2"
                                        />
                                        Featured Vehicles Only
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Vehicle Grid/List */}
                {filteredVehicles.length > 0 ? (
                    <div
                        className={isHorizontal ? 'space-y-6' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
                        {filteredVehicles.map((vehicle) => (
                            <VehicleCard
                                key={vehicle.id}
                                vehicle={vehicle}
                                showFeaturedBadge={true}
                                isHorizontal={isHorizontal}
                                onViewDetails={(id) => {
                                    // Handle view details - could navigate to individual vehicle page
                                    console.log('View details for vehicle:', id)
                                }}
                                className="h-full"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <Car className="w-16 h-16 text-gray-300 mx-auto mb-4"/>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No vehicles found</h3>
                        <p className="text-gray-600 mb-6">
                            Try adjusting your filters or search criteria
                        </p>
                        <button
                            onClick={clearFilters}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Call to Action Section */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {`Can't Find What You're Looking For?`}
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        {` Our inventory changes frequently. Contact us and we'll help you find the perfect vehicle for your needs and budget.`}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                            Call (647) 622-2202
                        </button>
                        <button
                            className="px-8 py-3 bg-white hover:bg-gray-50 text-blue-600 font-semibold rounded-lg border border-blue-600 transition-colors">
                            Request Specific Vehicle
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default VehiclesPage
