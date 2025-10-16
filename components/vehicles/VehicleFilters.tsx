'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Search, X, ChevronDown, ChevronUp } from 'lucide-react'
import { FuelType, TransmissionType } from '@/types/filters'

interface FilterProps {
  // Search
  searchTerm: string
  onSearchChange: (value: string) => void
  
  // Brand & Model
  brands: Array<{ id: string | number; name: string; logo: string }>
  models: Array<{ _id: string; name: string }>
  selectedBrand: string
  selectedModel: string
  onBrandChange: (value: string) => void
  onModelChange: (value: string) => void
  
  // Body Types
  bodyTypes: Array<{ id: string | number; name: string; slug?: string; image?: string }>
  selectedBodyType: string
  onBodyTypeChange: (value: string) => void
  
  // Price Range
  minPrice: number
  maxPrice: number
  onPriceChange: (min: number, max: number) => void
  
  // Year Range
  minYear: number
  maxYear: number
  onYearChange: (min: number, max: number) => void
  
  // Mileage Range
  minMileage: number
  maxMileage: number
  onMileageChange: (min: number, max: number) => void
  
  // Transmission
  transmissions: TransmissionType[]
  selectedTransmissions: string[]
  onTransmissionsChange: (values: string[]) => void
  
  // Fuel Type
  fuelTypes: FuelType[]
  selectedFuelTypes: string[]
  onFuelTypesChange: (values: string[]) => void
  
  // Colors
  selectedColors: string[]
  onColorsChange: (values: string[]) => void
  
  // Sort
  sortBy: string
  onSortChange: (value: string) => void
  
  // Actions
  onClearAll: () => void
  activeFiltersCount: number
}

const VehicleFilters: React.FC<FilterProps> = ({
  searchTerm,
  onSearchChange,
  brands,
  models,
  selectedBrand,
  selectedModel,
  onBrandChange,
  onModelChange,
  bodyTypes,
  selectedBodyType,
  onBodyTypeChange,
  minPrice,
  maxPrice,
  onPriceChange,
  minYear,
  maxYear,
  onYearChange,
  minMileage,
  maxMileage,
  onMileageChange,
  transmissions,
  selectedTransmissions,
  onTransmissionsChange,
  fuelTypes,
  selectedFuelTypes,
  onFuelTypesChange,
  selectedColors,
  onColorsChange,
  sortBy,
  onSortChange,
  onClearAll,
  activeFiltersCount
}) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    year: true,
    mileage: true,
    bodyType: true,
    transmission: true,
    fuelType: true,
    colors: false
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const availableColors = [
    { name: 'White', hex: '#FFFFFF', value: 'white' },
    { name: 'Black', hex: '#000000', value: 'black' },
    { name: 'Gray', hex: '#6B7280', value: 'gray' },
    { name: 'Silver', hex: '#C0C0C0', value: 'silver' },
    { name: 'Red', hex: '#DC2626', value: 'red' },
    { name: 'Blue', hex: '#2563EB', value: 'blue' },
    { name: 'Brown', hex: '#92400E', value: 'brown' },
    { name: 'Beige', hex: '#D4B896', value: 'beige' },
    { name: 'Green', hex: '#059669', value: 'green' },
    { name: 'Orange', hex: '#EA580C', value: 'orange' }
  ]

  const sortOptions = [
    { value: 'created_desc', label: 'Recently Added' },
    { value: 'created_asc', label: 'Oldest First' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'year_desc', label: 'Year: Newest First' },
    { value: 'year_asc', label: 'Year: Oldest First' },
    { value: 'mileage_asc', label: 'Mileage: Low to High' },
    { value: 'mileage_desc', label: 'Mileage: High to Low' },
    { value: 'featured', label: 'Featured First' }
  ]

  const toggleArraySelection = (array: string[], value: string, onChange: (values: string[]) => void) => {
    if (array.includes(value)) {
      onChange(array.filter(v => v !== value))
    } else {
      onChange([...array, value])
    }
  }

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${value}`
  }

  const formatMileage = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K KM`
    }
    return `${value} KM`
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-5 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          {activeFiltersCount > 0 && (
            <button
              onClick={onClearAll}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
        <div className="p-5 space-y-5">
          
          {/* Sort Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Make, model, year..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="border-t border-gray-200"></div>

          {/* Brand & Model Dropdowns */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => {
                  onBrandChange(e.target.value)
                  onModelChange('')
                }}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedBrand && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Model
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => onModelChange(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Models</option>
                  {models.map(model => (
                    <option key={model._id} value={model._id}>
                      {model.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Price Range */}
          <div>
            <button
              onClick={() => toggleSection('price')}
              className="w-full flex items-center justify-between mb-2"
            >
              <span className="text-sm font-medium text-gray-700">Price Range</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  {formatCurrency(minPrice)} - {formatCurrency(maxPrice)}
                </span>
                {expandedSections.price ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </button>

            {expandedSections.price && (
              <div className="pt-1">
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>Min: <span className="font-medium">{formatCurrency(minPrice)}</span></span>
                  <span>Max: <span className="font-medium">{formatCurrency(maxPrice)}</span></span>
                </div>
                <div className="relative h-1.5 bg-gray-200 rounded-lg">
                  {/* Active range bar */}
                  <div 
                    className="absolute h-full bg-blue-600 rounded-lg"
                    style={{
                      left: `${(minPrice / 100000) * 100}%`,
                      right: `${100 - (maxPrice / 100000) * 100}%`
                    }}
                  />
                  {/* Min slider */}
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={minPrice}
                    onChange={(e) => {
                      const newMin = Number(e.target.value)
                      if (newMin < maxPrice) {
                        onPriceChange(newMin, maxPrice)
                      }
                    }}
                    className="absolute w-full h-1.5 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
                  />
                  {/* Max slider */}
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={maxPrice}
                    onChange={(e) => {
                      const newMax = Number(e.target.value)
                      if (newMax > minPrice) {
                        onPriceChange(minPrice, newMax)
                      }
                    }}
                    className="absolute w-full h-1.5 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200"></div>

          {/* Year Range */}
          <div>
            <button
              onClick={() => toggleSection('year')}
              className="w-full flex items-center justify-between mb-2"
            >
              <span className="text-sm font-medium text-gray-700">Year Range</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  {minYear} - {maxYear}
                </span>
                {expandedSections.year ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </button>

            {expandedSections.year && (
              <div className="pt-1">
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>Min: <span className="font-medium">{minYear}</span></span>
                  <span>Max: <span className="font-medium">{maxYear}</span></span>
                </div>
                <div className="relative h-1.5 bg-gray-200 rounded-lg">
                  {/* Active range bar */}
                  <div 
                    className="absolute h-full bg-blue-600 rounded-lg"
                    style={{
                      left: `${((minYear - 2000) / (new Date().getFullYear() - 2000)) * 100}%`,
                      right: `${100 - ((maxYear - 2000) / (new Date().getFullYear() - 2000)) * 100}%`
                    }}
                  />
                  {/* Min slider */}
                  <input
                    type="range"
                    min="2000"
                    max={new Date().getFullYear()}
                    step="1"
                    value={minYear}
                    onChange={(e) => {
                      const newMin = Number(e.target.value)
                      if (newMin < maxYear) {
                        onYearChange(newMin, maxYear)
                      }
                    }}
                    className="absolute w-full h-1.5 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
                  />
                  {/* Max slider */}
                  <input
                    type="range"
                    min="2000"
                    max={new Date().getFullYear()}
                    step="1"
                    value={maxYear}
                    onChange={(e) => {
                      const newMax = Number(e.target.value)
                      if (newMax > minYear) {
                        onYearChange(minYear, newMax)
                      }
                    }}
                    className="absolute w-full h-1.5 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200"></div>

          {/* Mileage Range */}
          <div>
            <button
              onClick={() => toggleSection('mileage')}
              className="w-full flex items-center justify-between mb-2"
            >
              <span className="text-sm font-medium text-gray-700">Mileage Range</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  {formatMileage(minMileage)} - {formatMileage(maxMileage)}
                </span>
                {expandedSections.mileage ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </div>
            </button>

            {expandedSections.mileage && (
              <div className="pt-1">
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>Min: <span className="font-medium">{formatMileage(minMileage)}</span></span>
                  <span>Max: <span className="font-medium">{formatMileage(maxMileage)}</span></span>
                </div>
                <div className="relative h-1.5 bg-gray-200 rounded-lg">
                  {/* Active range bar */}
                  <div 
                    className="absolute h-full bg-blue-600 rounded-lg"
                    style={{
                      left: `${(minMileage / 200000) * 100}%`,
                      right: `${100 - (maxMileage / 200000) * 100}%`
                    }}
                  />
                  {/* Min slider */}
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="5000"
                    value={minMileage}
                    onChange={(e) => {
                      const newMin = Number(e.target.value)
                      if (newMin < maxMileage) {
                        onMileageChange(newMin, maxMileage)
                      }
                    }}
                    className="absolute w-full h-1.5 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
                  />
                  {/* Max slider */}
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="5000"
                    value={maxMileage}
                    onChange={(e) => {
                      const newMax = Number(e.target.value)
                      if (newMax > minMileage) {
                        onMileageChange(minMileage, newMax)
                      }
                    }}
                    className="absolute w-full h-1.5 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200"></div>

          {/* Body Types */}
          <div>
            <button
              onClick={() => toggleSection('bodyType')}
              className="w-full flex items-center justify-between mb-2"
            >
              <span className="text-sm font-medium text-gray-700">Body Type</span>
              {expandedSections.bodyType ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>

            {expandedSections.bodyType && (
              <div className="grid grid-cols-3 gap-2">
                {bodyTypes.map((type) => {
                  const isSelected = selectedBodyType === type.id.toString()
                  return (
                    <button
                      key={type.id}
                      onClick={() => onBodyTypeChange(isSelected ? '' : type.id.toString())}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 shadow-sm'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      {type.image ? (
                        <div className="relative w-10 h-10 mb-2 flex items-center justify-center">
                          <Image 
                            src={type.image} 
                            alt={type.name}
                            fill
                            className="object-contain"
                            sizes="40px"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 mb-2 flex items-center justify-center text-2xl text-gray-400">
                          🚗
                        </div>
                      )}
                      <span className={`text-xs font-medium text-center leading-tight ${
                        isSelected ? 'text-blue-700' : 'text-gray-700'
                      }`}>
                        {type.name}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <div className="border-t border-gray-200"></div>

          {/* Transmission */}
          <div>
            <button
              onClick={() => toggleSection('transmission')}
              className="w-full flex items-center justify-between mb-2"
            >
              <span className="text-sm font-medium text-gray-700">Transmission</span>
              {expandedSections.transmission ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>

            {expandedSections.transmission && (
              <div className="space-y-2 pt-1">
                {transmissions.map((trans) => {
                  const isSelected = selectedTransmissions.includes(trans._id)
                  return (
                    <button
                      key={trans._id}
                      onClick={() => toggleArraySelection(selectedTransmissions, trans._id, onTransmissionsChange)}
                      className={`w-full px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {trans.name}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <div className="border-t border-gray-200"></div>

          {/* Fuel Type */}
          <div>
            <button
              onClick={() => toggleSection('fuelType')}
              className="w-full flex items-center justify-between mb-2"
            >
              <span className="text-sm font-medium text-gray-700">Fuel Type</span>
              {expandedSections.fuelType ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>

            {expandedSections.fuelType && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                {fuelTypes.map((fuel) => {
                  const isSelected = selectedFuelTypes.includes(fuel._id)
                  return (
                    <button
                      key={fuel._id}
                      onClick={() => toggleArraySelection(selectedFuelTypes, fuel._id, onFuelTypesChange)}
                      className={`px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {fuel.name}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <div className="border-t border-gray-200"></div>

          {/* Body Color */}
          <div>
            <button
              onClick={() => toggleSection('colors')}
              className="w-full flex items-center justify-between mb-2"
            >
              <span className="text-sm font-medium text-gray-700">Color</span>
              {expandedSections.colors ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>

            {expandedSections.colors && (
              <div className="grid grid-cols-5 gap-2 pt-1">
                {availableColors.map((color) => {
                  const isSelected = selectedColors.includes(color.value)
                  return (
                    <button
                      key={color.value}
                      onClick={() => toggleArraySelection(selectedColors, color.value, onColorsChange)}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-md transition-all ${
                        isSelected
                          ? 'bg-blue-50 ring-2 ring-blue-600'
                          : 'hover:bg-gray-50'
                      }`}
                      title={color.name}
                    >
                      <span
                        className={`w-8 h-8 rounded-full border-2 flex-shrink-0 ${
                          color.value === 'white' ? 'border-gray-300' : 'border-gray-200'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      ></span>
                      <span className="text-xs text-gray-600 truncate w-full text-center">
                        {color.name}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default VehicleFilters
