"use client"
import React, { useState, useEffect } from 'react'
import Dropdown from "@/components/shared/Dropdown";
import { useRouter } from 'next/navigation';
import { Brand, VehicleType } from '@/types/api';
import { FuelType, TransmissionType, Model, VehicleTypeAPI, BrandAPI } from '@/types/filters';

const SearchCard = () => {
  const router = useRouter();
  
  // Form states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedPriceMin, setSelectedPriceMin] = useState('');
  const [selectedPriceMax, setSelectedPriceMax] = useState('');
  const [selectedBodyType, setSelectedBodyType] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState('');
  const [selectedTransmission, setSelectedTransmission] = useState('');
  const [selectedYearMin, setSelectedYearMin] = useState('');
  const [selectedYearMax, setSelectedYearMax] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Data from API
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
  const [transmissions, setTransmissions] = useState<TransmissionType[]>([]);
  const [bodyTypes, setBodyTypes] = useState<VehicleType[]>([]);
  const [vehicleCount, setVehicleCount] = useState(0);

  // Fetch filter options from API
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        // Fetch brands
        const brandsRes = await fetch('https://api.royaldrivecanada.com/api/v1/makes/dropdown');
        const brandsData = await brandsRes.json();
        
        if (brandsData.success && brandsData.data) {
          // API returns array directly in data, not data.makes
          const brandsList = Array.isArray(brandsData.data) ? brandsData.data : brandsData.data.makes || [];
          const activeBrands = brandsList.map((b: BrandAPI) => ({
            id: b._id,
            name: b.name,
            logo: b.logo,
            slug: b.slug
          }));
          setBrands(activeBrands);
        }

        // Fetch body types
        const bodyTypesRes = await fetch('https://api.royaldrivecanada.com/api/v1/vehicle-types');
        const bodyTypesData = await bodyTypesRes.json();
        if (bodyTypesData.success && bodyTypesData.data?.vehicleTypes) {
          setBodyTypes(bodyTypesData.data.vehicleTypes.map((vt: VehicleTypeAPI) => ({
            id: vt._id,
            name: vt.name,
            image: vt.icon || vt.image,
            slug: vt.slug
          })));
        }

        // Fetch fuel types
        const fuelTypesRes = await fetch('https://api.royaldrivecanada.com/api/v1/fuel-types');
        const fuelTypesData = await fuelTypesRes.json();
        if (fuelTypesData.success && fuelTypesData.data?.fuelTypes) {
          setFuelTypes(fuelTypesData.data.fuelTypes.filter((ft: FuelType) => ft.active));
        }

        // Fetch transmissions
        const transmissionsRes = await fetch('https://api.royaldrivecanada.com/api/v1/transmissions');
        const transmissionsData = await transmissionsRes.json();
        if (transmissionsData.success && transmissionsData.data?.transmissions) {
          setTransmissions(transmissionsData.data.transmissions.filter((t: TransmissionType) => t.active));
        }

        // Get vehicle count
        const vehiclesRes = await fetch('https://api.royaldrivecanada.com/api/v1/vehicles?limit=1');
        const vehiclesData = await vehiclesRes.json();
        if (vehiclesData.success && vehiclesData.data?.pagination) {
          setVehicleCount(vehiclesData.data.pagination.total);
        }
      } catch (error) {
        console.error('Failed to fetch filter options:', error);
      }
    };

    fetchFilterOptions();
  }, []);

  // Fetch models when brand is selected
  useEffect(() => {
    const fetchModels = async () => {
      if (!selectedBrand) {
        setModels([]);
        setSelectedModel('');
        return;
      }

      try {
        // Backend now correctly filters by make parameter
        const modelsRes = await fetch(`https://api.royaldrivecanada.com/api/v1/models?make=${selectedBrand}&active=true&limit=100`);
        const modelsData = await modelsRes.json();
        if (modelsData.success && modelsData.data?.models) {
          // Backend already filters by make, just use the active models
          setModels(modelsData.data.models.filter((m: Model) => m.active));
        }
      } catch (error) {
        console.error('Failed to fetch models:', error);
      }
    };

    fetchModels();
  }, [selectedBrand]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    // Build search params
    const params = new URLSearchParams();
    
    if (searchQuery) params.append('q', searchQuery);
    if (selectedBrand) params.append('make', selectedBrand);
    if (selectedModel) params.append('model', selectedModel);
    if (selectedPriceMin) params.append('minPrice', selectedPriceMin);
    if (selectedPriceMax) params.append('maxPrice', selectedPriceMax);
    if (selectedBodyType) params.append('vehicleType', selectedBodyType);
    if (selectedFuelType) params.append('fuelType', selectedFuelType);
    if (selectedTransmission) params.append('transmission', selectedTransmission);
    if (selectedYearMin) params.append('minYear', selectedYearMin);
    if (selectedYearMax) params.append('maxYear', selectedYearMax);

    // Redirect to vehicles page with filters
    router.push(`/vehicles?${params.toString()}`);
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedPriceMin('');
    setSelectedPriceMax('');
    setSelectedBodyType('');
    setSelectedFuelType('');
    setSelectedTransmission('');
    setSelectedYearMin('');
    setSelectedYearMax('');
  };

  // Transform data for dropdown options
  const brandOptions = brands.map(brand => ({
    value: brand.id,
    label: brand.name
  }));

  const modelOptions = models.map(model => ({
    value: model._id,
    label: model.name
  }));

  const fuelTypeOptions = fuelTypes.map(ft => ({
    value: ft._id,
    label: ft.name
  }));

  const transmissionOptions = transmissions.map(t => ({
    value: t._id,
    label: t.name
  }));

  const bodyTypeOptions = bodyTypes.map(type => ({
    value: type.id.toString(),
    label: type.name
  }));

  const priceMinOptions = [
    { value: '', label: 'No Min' },
    { value: '5000', label: '$5,000' },
    { value: '10000', label: '$10,000' },
    { value: '15000', label: '$15,000' },
    { value: '20000', label: '$20,000' },
    { value: '25000', label: '$25,000' },
    { value: '30000', label: '$30,000' },
    { value: '40000', label: '$40,000' },
    { value: '50000', label: '$50,000' },
  ];

  const priceMaxOptions = [
    { value: '', label: 'No Max' },
    { value: '10000', label: '$10,000' },
    { value: '15000', label: '$15,000' },
    { value: '20000', label: '$20,000' },
    { value: '25000', label: '$25,000' },
    { value: '30000', label: '$30,000' },
    { value: '40000', label: '$40,000' },
    { value: '50000', label: '$50,000' },
    { value: '75000', label: '$75,000' },
    { value: '100000', label: '$100,000' },
  ];

  const currentYear = new Date().getFullYear();
  const yearMinOptions = [
    { value: '', label: 'No Min' },
    ...Array.from({ length: 30 }, (_, i) => currentYear - i).map(year => ({
      value: year.toString(),
      label: year.toString()
    }))
  ];

  const yearMaxOptions = [
    { value: '', label: 'No Max' },
    ...Array.from({ length: 30 }, (_, i) => currentYear - i).map(year => ({
      value: year.toString(),
      label: year.toString()
    }))
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Professional Search Card */}
      <div className="bg-white rounded-lg border border-gray-200">

        {/* Compact Search Form */}
        <div className="p-4 sm:p-5">
          <form onSubmit={handleSearch} className="space-y-4">
            
            {/* Search Bar */}
            <div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by make, model, or keyword..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Filter Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
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
                disabled={!selectedBrand || models.length === 0}
              />

              <Dropdown
                label="Body Type"
                value={selectedBodyType}
                onChange={setSelectedBodyType}
                options={bodyTypeOptions}
                placeholder="All Types"
              />

              <Dropdown
                label="Price Min"
                value={selectedPriceMin}
                onChange={setSelectedPriceMin}
                options={priceMinOptions}
                placeholder="No Min"
              />

              <Dropdown
                label="Price Max"
                value={selectedPriceMax}
                onChange={setSelectedPriceMax}
                options={priceMaxOptions}
                placeholder="No Max"
              />

              <Dropdown
                label="Fuel Type"
                value={selectedFuelType}
                onChange={setSelectedFuelType}
                options={fuelTypeOptions}
                placeholder="All Fuel Types"
              />

              <Dropdown
                label="Transmission"
                value={selectedTransmission}
                onChange={setSelectedTransmission}
                options={transmissionOptions}
                placeholder="All Transmissions"
              />

              <Dropdown
                label="Year Min"
                value={selectedYearMin}
                onChange={setSelectedYearMin}
                options={yearMinOptions}
                placeholder="No Min"
              />

              <Dropdown
                label="Year Max"
                value={selectedYearMax}
                onChange={setSelectedYearMax}
                options={yearMaxOptions}
                placeholder="No Max"
              />
            </div>

            {/* Action Section */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              {/* Primary Search Button */}
              <button
                type="submit"
                disabled={isSearching}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium px-6 py-2.5 rounded-lg transition-colors disabled:cursor-not-allowed flex items-center justify-center text-sm"
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

              {/* Clear Button */}
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-4 py-2.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-700 font-medium transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Clear</span>
              </button>

              {/* Vehicle Count */}
              <span className="text-xs text-gray-500 sm:ml-auto">{vehicleCount} vehicles available</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SearchCard
