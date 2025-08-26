"use client"
import React, { useState } from 'react'
import { inventories, brands, carTypes } from "@/constants";

const SearchCard = () => {
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedBodyType, setSelectedBodyType] = useState('');

  // Get unique brands from inventory
  const availableBrands = brands.filter(brand =>
    inventories.some(vehicle => vehicle.brand === brand.name)
  );

  // Get models based on selected make
  const availableModels = selectedMake
    ? [...new Set(inventories
        .filter(vehicle => vehicle.brand === selectedMake)
        .map(vehicle => vehicle.model))]
    : [];

  // Generate realistic price ranges based on actual inventory
  const priceRanges = [
    { value: "0-5000", label: "Under $5,000" },
    { value: "5000-10000", label: "$5,000 - $10,000" },
    { value: "10000-20000", label: "$10,000 - $20,000" },
    { value: "20000-30000", label: "$20,000 - $30,000" },
    { value: "30000-40000", label: "$30,000 - $40,000" },
    { value: "40000+", label: "$40,000+" },
  ];

  // Get actual vehicle count
  const vehicleCount = inventories.length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search params:', {
      make: selectedMake,
      model: selectedModel,
      price: selectedPrice,
      bodyType: selectedBodyType
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 space-y-2 sm:space-y-0">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900">
          Search <span className="text-blue-600">{vehicleCount}</span> Cars, Trucks & SUVs
        </h3>
      </div>


      {/* Search Form */}
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {/* Make */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
            <select
              value={selectedMake}
              onChange={(e) => {
                setSelectedMake(e.target.value);
                setSelectedModel(''); // Reset model when make changes
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            >
              <option value="">All Makes</option>
              {availableBrands.map((brand) => (
                <option key={brand.id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          {/* Model */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={!selectedMake}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-sm md:text-base"
            >
              <option value="">All Models</option>
              {availableModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            >
              <option value="">All Prices</option>
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Body Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Body Type</label>
            <select
              value={selectedBodyType}
              onChange={(e) => setSelectedBodyType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            >
              <option value="">All Types</option>
              {carTypes.map((type) => (
                <option key={type.id} value={type.name.toLowerCase()}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center pt-6 pb-4">
          <button
            type="submit" 
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 md:px-8 py-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm md:text-base shadow-lg min-h-[48px]"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search Vehicles
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchCard
