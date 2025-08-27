"use client"
import React, { useState } from 'react'
import { inventories, brands, carTypes } from "@/constants";
import Dropdown from "@/components/shared/Dropdown";

const SearchCard = () => {
  const [selectedName, setSelectedName] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedBodyType, setSelectedBodyType] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Get unique brands from inventory
  const availableBrands = brands.filter(brand =>
    inventories.some(vehicle => vehicle.brand === brand.name)
  );

  // Get unique vehicle names from inventory
  const availableVehicleNames = [...new Set(inventories.map(vehicle => vehicle.name))];

  // Get models based on selected brand
  const availableModels = selectedBrand
    ? [...new Set(inventories
        .filter(vehicle => vehicle.brand === selectedBrand)
        .map(vehicle => vehicle.model))]
    : [];

  // Get unique fuel types from inventory
  const availableFuelTypes = [...new Set(inventories.map(vehicle => vehicle.fuelType))];

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
    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      console.log('Search params:', {
        name: selectedName,
        brand: selectedBrand,
        model: selectedModel,
        price: selectedPrice,
        bodyType: selectedBodyType,
        fuelType: selectedFuelType
      });
    }, 1000);
  };

  const handleReset = () => {
    setSelectedName('');
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedPrice('');
    setSelectedBodyType('');
    setSelectedFuelType('');
  };

  // Transform data for dropdown options
  const vehicleNameOptions = availableVehicleNames.map(name => ({
    value: name,
    label: name
  }));

  const brandOptions = availableBrands.map(brand => ({
    value: brand.name,
    label: brand.name
  }));

  const modelOptions = availableModels.map(model => ({
    value: model,
    label: model
  }));

  const fuelTypeOptions = availableFuelTypes.map(fuelType => ({
    value: fuelType,
    label: fuelType
  }));

  const bodyTypeOptions = carTypes.map(type => ({
    value: type.name.toLowerCase(),
    label: type.name
  }));

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Compact Professional Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">

        {/* Compact Header */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Vehicle Search</h3>
                <p className="text-sm text-gray-600">Search {vehicleCount} available vehicles</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1 bg-white rounded-lg border border-gray-200">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs font-medium text-gray-700">Live</span>
            </div>
          </div>
        </div>

        {/* Compact Search Form */}
        <div className="p-6">
          <form onSubmit={handleSearch} className="space-y-6">

            {/* Compact Filter Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Dropdown
                label="Vehicle Name"
                value={selectedName}
                onChange={setSelectedName}
                options={vehicleNameOptions}
                placeholder="All Vehicles"
              />

              <Dropdown
                label="Brand"
                value={selectedBrand}
                onChange={(value) => {
                  setSelectedBrand(value);
                  setSelectedModel('');
                }}
                options={brandOptions}
                placeholder="All Brands"
              />

              <Dropdown
                label="Model"
                value={selectedModel}
                onChange={setSelectedModel}
                options={modelOptions}
                placeholder="All Models"
                disabled={!selectedBrand}
              />

              <Dropdown
                label="Price Range"
                value={selectedPrice}
                onChange={setSelectedPrice}
                options={priceRanges}
                placeholder="All Prices"
              />

              <Dropdown
                label="Fuel Type"
                value={selectedFuelType}
                onChange={setSelectedFuelType}
                options={fuelTypeOptions}
                placeholder="All Fuel Types"
              />

              <Dropdown
                label="Body Type"
                value={selectedBodyType}
                onChange={setSelectedBodyType}
                options={bodyTypeOptions}
                placeholder="All Types"
              />
            </div>

            {/* Compact Action Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200">

              {/* Primary Search Button */}
              <button
                type="submit"
                disabled={isSearching}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed flex items-center justify-center min-w-[180px]"
              >
                {isSearching ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Search Vehicles</span>
                  </>
                )}
              </button>

              {/* Clear Button Only */}
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-700 font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Clear</span>
              </button>
            </div>

            {/* Professional Quick Filters */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-600">Quick:</span>
              <button
                type="button"
                onClick={() => setSelectedFuelType('Hybrid')}
                className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-800 text-sm font-medium rounded-lg transition-colors duration-200"
              >
                Hybrid
              </button>
              <button
                type="button"
                onClick={() => setSelectedPrice('0-10000')}
                className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium rounded-lg transition-colors duration-200"
              >
                Under $10K
              </button>
              <button
                type="button"
                onClick={() => setSelectedBrand('Toyota')}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-lg transition-colors duration-200"
              >
                Toyota
              </button>
              <button
                type="button"
                onClick={() => setSelectedBrand('Honda')}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-lg transition-colors duration-200"
              >
                Honda
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SearchCard
