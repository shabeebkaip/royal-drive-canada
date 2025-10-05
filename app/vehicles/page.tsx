'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import VehicleCard from '@/components/shared/VehicleCard'
import PageHero from '@/components/shared/PageHero'
import VehicleFilters from '@/components/vehicles/VehicleFilters'
import { LayoutGrid, List, SlidersHorizontal, Car, X, DollarSign } from 'lucide-react'
import { Vehicle, Brand, VehicleType } from '@/types/api'

interface FuelType {
  _id: string;
  name: string;
  slug: string;
}

interface TransmissionType {
  _id: string;
  name: string;
  slug: string;
}

interface Model {
  _id: string;
  name: string;
  make: string;
  slug: string;
}

const VehiclesPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Filter states from URL
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('make') || '')
  const [selectedModel, setSelectedModel] = useState(searchParams.get('model') || '')
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>(
    searchParams.get('fuelType') ? searchParams.get('fuelType')!.split(',') : []
  )
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>(
    searchParams.get('transmission') ? searchParams.get('transmission')!.split(',') : []
  )
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>(
    searchParams.get('vehicleType') ? searchParams.get('vehicleType')!.split(',') : []
  )
  const [selectedDrivetrain, setSelectedDrivetrain] = useState(searchParams.get('drivetrain') || '')
  const [selectedCondition, setSelectedCondition] = useState(searchParams.get('condition') || '')
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || '')
  const [selectedColors, setSelectedColors] = useState<string[]>(
    searchParams.get('exteriorColor') ? searchParams.get('exteriorColor')!.split(',') : []
  )
  const [minPrice, setMinPrice] = useState(Number(searchParams.get('minPrice')) || 0)
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get('maxPrice')) || 100000)
  const [minYear, setMinYear] = useState(Number(searchParams.get('minYear')) || 2000)
  const [maxYear, setMaxYear] = useState(Number(searchParams.get('maxYear')) || new Date().getFullYear())
  const [minMileage, setMinMileage] = useState(Number(searchParams.get('minMileage')) || 0)
  const [maxMileage, setMaxMileage] = useState(Number(searchParams.get('maxMileage')) || 200000)
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'created_desc')
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1)
  
  // Layout state
  const [isHorizontal, setIsHorizontal] = useState(false)
  const [showFilters, setShowFilters] = useState(true) // Default to showing filters on desktop

  // Data states
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [brands, setBrands] = useState<Brand[]>([])
  const [models, setModels] = useState<Model[]>([])
  const [fuelTypes, setFuelTypes] = useState<FuelType[]>([])
  const [transmissions, setTransmissions] = useState<TransmissionType[]>([])
  const [bodyTypes, setBodyTypes] = useState<VehicleType[]>([])
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 0
  })

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        // Fetch brands
        const brandsRes = await fetch('https://api.royaldrivecanada.com/api/v1/makes/dropdown')
        const brandsData = await brandsRes.json()
        if (brandsData.success && brandsData.data) {
          setBrands(brandsData.data.map((b: any) => ({
            id: b._id,
            name: b.name,
            logo: b.logo,
            slug: b.slug
          })))
        }

        // Fetch body types
        const bodyTypesRes = await fetch('https://api.royaldrivecanada.com/api/v1/vehicle-types')
        const bodyTypesData = await bodyTypesRes.json()
        if (bodyTypesData.success && bodyTypesData.data?.vehicleTypes) {
          setBodyTypes(bodyTypesData.data.vehicleTypes.map((vt: any) => ({
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
          setFuelTypes(fuelTypesData.data.fuelTypes.filter((ft: any) => ft.active))
        }

        // Fetch transmissions
        const transmissionsRes = await fetch('https://api.royaldrivecanada.com/api/v1/transmissions')
        const transmissionsData = await transmissionsRes.json()
        if (transmissionsData.success && transmissionsData.data?.transmissions) {
          setTransmissions(transmissionsData.data.transmissions.filter((t: any) => t.active))
        }
      } catch (error) {
        console.error('Failed to fetch filter options:', error)
      }
    }

    fetchFilterOptions()
  }, [])

  // Fetch models when brand changes
  useEffect(() => {
    const fetchModels = async () => {
      if (!selectedBrand) {
        setModels([])
        return
      }

      try {
        const modelsRes = await fetch(`https://api.royaldrivecanada.com/api/v1/models/dropdown`)
        const modelsData = await modelsRes.json()
        if (modelsData.success && modelsData.data) {
          // Filter models by the selected brand's _id
          const filteredModels = modelsData.data.filter((m: any) => 
            m.make && m.make._id === selectedBrand
          )
          setModels(filteredModels)
        }
      } catch (error) {
        console.error('Failed to fetch models:', error)
      }
    }

    fetchModels()
  }, [selectedBrand])

  // Fetch vehicles based on filters
  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        
        if (searchTerm) params.append('q', searchTerm)
        if (selectedBrand) params.append('make', selectedBrand)
        if (selectedModel) params.append('model', selectedModel)
        if (selectedFuelTypes.length) params.append('fuelType', selectedFuelTypes.join(','))
        if (selectedTransmissions.length) params.append('transmission', selectedTransmissions.join(','))
        if (selectedBodyTypes.length) params.append('vehicleType', selectedBodyTypes.join(','))
        if (selectedDrivetrain) params.append('drivetrain', selectedDrivetrain)
        if (selectedCondition) params.append('condition', selectedCondition)
        if (selectedStatus) params.append('status', selectedStatus)
        if (minPrice) params.append('minPrice', minPrice.toString())
        if (maxPrice) params.append('maxPrice', maxPrice.toString())
        if (minYear) params.append('minYear', minYear.toString())
        if (maxYear) params.append('maxYear', maxYear.toString())
        if (minMileage) params.append('minMileage', minMileage.toString())
        if (maxMileage) params.append('maxMileage', maxMileage.toString())
        if (sortBy) params.append('sortBy', sortBy)
        params.append('page', page.toString())
        params.append('limit', '12')

        const response = await fetch(`https://api.royaldrivecanada.com/api/v1/vehicles?${params.toString()}`)
        const data = await response.json()

        if (data.success && data.data?.vehicles) {
          const transformedVehicles = data.data.vehicles.map((vehicle: any) => ({
            id: vehicle._id,
            name: `${vehicle.year} ${vehicle.make.name} ${vehicle.model.name}`,
            brand: vehicle.make.name,
            model: vehicle.model.name,
            year: vehicle.year,
            price: vehicle.pricing.listPrice,
            mileage: vehicle.odometer.value,
            fuelType: vehicle.engine.fuelType.name,
            transmission: vehicle.transmission.type.name,
            images: vehicle.media.images || [],
            slug: vehicle.marketing.slug,
            description: vehicle.marketing.description,
            featured: vehicle.marketing.featured,
            safetyCertified: vehicle.ontario?.safetyStandard.passed || false,
            carfax: vehicle.carfax?.hasCleanHistory ? 'Clean' : undefined,
            createdAt: vehicle.createdAt,
            updatedAt: vehicle.updatedAt,
          }))

          setVehicles(transformedVehicles)
          if (data.data.pagination) {
            setPagination(data.data.pagination)
          }
        } else {
          setVehicles([])
        }
      } catch (error) {
        console.error('Failed to fetch vehicles:', error)
        setVehicles([])
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [searchTerm, selectedBrand, selectedModel, selectedFuelTypes, selectedTransmissions, 
      selectedBodyTypes, selectedDrivetrain, selectedCondition, selectedStatus,
      minPrice, maxPrice, minYear, maxYear, minMileage, maxMileage, sortBy, page])

  // Update URL when filters change
  const updateURL = () => {
    const params = new URLSearchParams()
    
    if (searchTerm) params.append('q', searchTerm)
    if (selectedBrand) params.append('make', selectedBrand)
    if (selectedModel) params.append('model', selectedModel)
    if (selectedFuelTypes.length) params.append('fuelType', selectedFuelTypes.join(','))
    if (selectedTransmissions.length) params.append('transmission', selectedTransmissions.join(','))
    if (selectedBodyTypes.length) params.append('vehicleType', selectedBodyTypes.join(','))
    if (selectedDrivetrain) params.append('drivetrain', selectedDrivetrain)
    if (selectedCondition) params.append('condition', selectedCondition)
    if (selectedStatus) params.append('status', selectedStatus)
    if (minPrice) params.append('minPrice', minPrice.toString())
    if (maxPrice) params.append('maxPrice', maxPrice.toString())
    if (minYear) params.append('minYear', minYear.toString())
    if (maxYear) params.append('maxYear', maxYear.toString())
    if (minMileage) params.append('minMileage', minMileage.toString())
    if (maxMileage) params.append('maxMileage', maxMileage.toString())
    if (sortBy) params.append('sortBy', sortBy)
    if (page > 1) params.append('page', page.toString())

    const queryString = params.toString()
    router.push(`/vehicles${queryString ? `?${queryString}` : ''}`, { scroll: false })
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedBrand('')
    setSelectedModel('')
    setSelectedFuelTypes([])
    setSelectedTransmissions([])
    setSelectedBodyTypes([])
    setSelectedColors([])
    setSelectedDrivetrain('')
    setSelectedCondition('')
    setSelectedStatus('')
    setMinPrice(0)
    setMaxPrice(100000)
    setMinYear(2000)
    setMaxYear(new Date().getFullYear())
    setMinMileage(0)
    setMaxMileage(200000)
    setSortBy('created_desc')
    setPage(1)
    router.push('/vehicles')
  }

  const handleViewDetails = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId)
    if (vehicle?.slug) {
      router.push(`/vehicles/${vehicle.slug}`)
    }
  }

  // Dropdown options
  const brandOptions = brands.map(brand => ({
    value: brand.id,
    label: brand.name
  }))

  const modelOptions = models.map(model => ({
    value: model._id,
    label: model.name
  }))

  const fuelTypeOptions = fuelTypes.map(ft => ({
    value: ft._id,
    label: ft.name
  }))

  const transmissionOptions = transmissions.map(t => ({
    value: t._id,
    label: t.name
  }))

  const bodyTypeOptions = bodyTypes.map(type => ({
    value: type.id.toString(),
    label: type.name
  }))

  const sortOptions = [
    { value: 'created_desc', label: 'Recently Added' },
    { value: 'created_asc', label: 'Oldest First' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'year_desc', label: 'Year: Newest First' },
    { value: 'year_asc', label: 'Year: Oldest First' },
    { value: 'mileage_asc', label: 'Mileage: Low to High' },
    { value: 'mileage_desc', label: 'Mileage: High to Low' },
    { value: 'featured', label: 'Featured First' },
  ]

  const currentYear = new Date().getFullYear()
  const priceOptions = [
    { value: '', label: 'Any' },
    { value: '5000', label: '$5,000' },
    { value: '10000', label: '$10,000' },
    { value: '15000', label: '$15,000' },
    { value: '20000', label: '$20,000' },
    { value: '30000', label: '$30,000' },
    { value: '40000', label: '$40,000' },
    { value: '50000', label: '$50,000' },
    { value: '75000', label: '$75,000' },
    { value: '100000', label: '$100,000' },
  ]

  const yearOptions = [
    { value: '', label: 'Any' },
    ...Array.from({ length: 30 }, (_, i) => currentYear - i).map(year => ({
      value: year.toString(),
      label: year.toString()
    }))
  ]

  const mileageOptions = [
    { value: '', label: 'Any' },
    { value: '25000', label: '25,000 km' },
    { value: '50000', label: '50,000 km' },
    { value: '75000', label: '75,000 km' },
    { value: '100000', label: '100,000 km' },
    { value: '150000', label: '150,000 km' },
    { value: '200000', label: '200,000 km' },
  ]

  const drivetrainOptions = [
    { value: '', label: 'All Drivetrains' },
    { value: 'FWD', label: 'FWD (Front Wheel Drive)' },
    { value: 'RWD', label: 'RWD (Rear Wheel Drive)' },
    { value: 'AWD', label: 'AWD (All Wheel Drive)' },
    { value: '4WD', label: '4WD (4 Wheel Drive)' },
  ]

  const conditionOptions = [
    { value: '', label: 'All Conditions' },
    { value: 'New', label: 'New' },
    { value: 'Used', label: 'Used' },
    { value: 'Certified Pre-Owned', label: 'Certified Pre-Owned' },
  ]

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'available', label: 'Available' },
    { value: 'sold', label: 'Sold' },
    { value: 'pending', label: 'Pending' },
  ]

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (searchTerm) count++
    if (selectedBrand) count++
    if (selectedModel) count++
    count += selectedFuelTypes.length
    count += selectedTransmissions.length
    count += selectedBodyTypes.length
    count += selectedColors.length
    if (selectedDrivetrain) count++
    if (selectedCondition) count++
    if (selectedStatus) count++
    if (minPrice > 0 || maxPrice < 100000) count++
    if (minYear > 2000 || maxYear < new Date().getFullYear()) count++
    if (minMileage > 0 || maxMileage < 200000) count++
    return count
  }, [searchTerm, selectedBrand, selectedModel, selectedFuelTypes, selectedTransmissions, 
      selectedBodyTypes, selectedColors, selectedDrivetrain, selectedCondition, selectedStatus,
      minPrice, maxPrice, minYear, maxYear, minMileage, maxMileage])

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Our Inventory"
        subtitle="Browse our complete collection of quality pre-owned vehicles"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <Car className="w-5 h-5 text-blue-600" />
              <p className="text-xs font-medium text-blue-600 uppercase">Total Vehicles</p>
            </div>
            <p className="text-2xl font-bold text-blue-900">{pagination.total}</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-5 h-5 text-green-600" />
              <p className="text-xs font-medium text-green-600 uppercase">Price Range</p>
            </div>
            <p className="text-2xl font-bold text-green-900">$5K-$100K</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center gap-2 mb-1">
              <SlidersHorizontal className="w-5 h-5 text-purple-600" />
              <p className="text-xs font-medium text-purple-600 uppercase">Active Filters</p>
            </div>
            <p className="text-2xl font-bold text-purple-900">{activeFiltersCount}</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center gap-2 mb-1">
              <LayoutGrid className="w-5 h-5 text-orange-600" />
              <p className="text-xs font-medium text-orange-600 uppercase">View Mode</p>
            </div>
            <p className="text-2xl font-bold text-orange-900">{isHorizontal ? 'List' : 'Grid'}</p>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Left Sidebar - Filters */}
          <aside className={`${
            showFilters ? 'block' : 'hidden'
          } lg:block w-full lg:w-80 flex-shrink-0 sticky top-6`}>
            <VehicleFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              brands={brands}
              models={models}
              selectedBrand={selectedBrand}
              selectedModel={selectedModel}
              onBrandChange={(value) => {
                setSelectedBrand(value)
                setSelectedModel('')
                setPage(1)
              }}
              onModelChange={(value) => {
                setSelectedModel(value)
                setPage(1)
              }}
              bodyTypes={bodyTypes}
              selectedBodyTypes={selectedBodyTypes}
              onBodyTypesChange={setSelectedBodyTypes}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onPriceChange={(min, max) => {
                setMinPrice(min)
                setMaxPrice(max)
                setPage(1)
              }}
              minYear={minYear}
              maxYear={maxYear}
              onYearChange={(min, max) => {
                setMinYear(min)
                setMaxYear(max)
                setPage(1)
              }}
              minMileage={minMileage}
              maxMileage={maxMileage}
              onMileageChange={(min, max) => {
                setMinMileage(min)
                setMaxMileage(max)
                setPage(1)
              }}
              transmissions={transmissions}
              selectedTransmissions={selectedTransmissions}
              onTransmissionsChange={setSelectedTransmissions}
              fuelTypes={fuelTypes}
              selectedFuelTypes={selectedFuelTypes}
              onFuelTypesChange={setSelectedFuelTypes}
              selectedColors={selectedColors}
              onColorsChange={setSelectedColors}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onClearAll={handleClearFilters}
              activeFiltersCount={activeFiltersCount}
            />
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {/* Mobile Filter Toggle & Top Bar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                {/* Left: Filter Toggle (Mobile) & Results Count */}
                <div className="flex items-center gap-4 flex-1">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="bg-white text-blue-600 text-xs px-2 py-0.5 rounded-full font-bold">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>
                  
                  <div className="hidden sm:flex items-center gap-2">
                    <Car className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-900">
                      {pagination.total} Vehicle{pagination.total !== 1 ? 's' : ''}
                    </h2>
                  </div>
                </div>

                {/* Right: View Toggle & Sort */}
                <div className="flex items-center gap-3">
                  {/* View Toggle */}
                  <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setIsHorizontal(false)}
                      className={`p-2 rounded-lg transition-colors ${
                        !isHorizontal ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'
                      }`}
                      title="Grid View"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsHorizontal(true)}
                      className={`p-2 rounded-lg transition-colors ${
                        isHorizontal ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'
                      }`}
                      title="List View"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="w-48">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Results Count */}
            <div className="sm:hidden bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">
                  {pagination.total} Vehicle{pagination.total !== 1 ? 's' : ''} Found
                </h2>
              </div>
            </div>

            {/* Vehicles Grid/List */}
            {loading ? (
              <div className="flex items-center justify-center py-32 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100">
                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="text-gray-700 font-semibold text-lg mb-2">Finding Your Perfect Vehicle</p>
                  <p className="text-gray-500 text-sm">Please wait while we load the latest inventory...</p>
                </div>
              </div>
            ) : vehicles.length > 0 ? (
              <>
                {/* Results Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6 border border-blue-200">
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-bold text-blue-600">{vehicles.length}</span> of{' '}
                    <span className="font-bold text-blue-600">{pagination.total}</span> vehicles
                    {activeFiltersCount > 0 && (
                      <span className="ml-2 text-gray-600">
                        • <span className="font-semibold">{activeFiltersCount}</span> filter{activeFiltersCount !== 1 ? 's' : ''} applied
                      </span>
                    )}
                  </p>
                </div>

                <div className={`${
                  isHorizontal 
                    ? 'space-y-4' 
                    : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                }`}>
                  {vehicles.map((vehicle) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      showFeaturedBadge={true}
                      onViewDetails={handleViewDetails}
                      isHorizontal={isHorizontal}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8 bg-white rounded-lg shadow-md p-4">
                    <button
                      onClick={() => {
                        setPage(page - 1)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      disabled={page === 1}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>

                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(pagination.totalPages, 7) }, (_, i) => {
                        let pageNum;
                        if (pagination.totalPages <= 7) {
                          pageNum = i + 1;
                        } else if (page <= 4) {
                          pageNum = i + 1;
                        } else if (page >= pagination.totalPages - 3) {
                          pageNum = pagination.totalPages - 6 + i;
                        } else {
                          pageNum = page - 3 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => {
                              setPage(pageNum)
                              window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}
                            className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-colors ${
                              page === pageNum
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => {
                        setPage(page + 1)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      disabled={page === pagination.totalPages}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl shadow-lg text-center py-20 px-6 border border-gray-200">
                <div className="max-w-md mx-auto">
                  {/* Animated Icon */}
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Car className="w-16 h-16 text-blue-400" />
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">No Vehicles Found</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    We couldn't find any vehicles matching your search criteria. 
                    Try adjusting your filters or clearing them to see all available vehicles.
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleClearFilters}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                    >
                      <X className="w-5 h-5" />
                      Clear All Filters
                    </button>
                    <button
                      onClick={() => router.push('/contact')}
                      className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors border-2 border-gray-300"
                    >
                      Contact Us
                    </button>
                  </div>
                  
                  {/* Suggestions */}
                  {activeFiltersCount > 0 && (
                    <div className="mt-8 p-4 bg-white rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-600 mb-2">You have {activeFiltersCount} active filter{activeFiltersCount !== 1 ? 's' : ''}</p>
                      <p className="text-xs text-gray-500">Try removing some filters to see more results</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default VehiclesPage
