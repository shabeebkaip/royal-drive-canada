"use client"
import React, { useState, useEffect } from 'react'
import Dropdown from "@/components/shared/Dropdown";
import { useRouter } from 'next/navigation';
import { Brand, VehicleType } from '@/types/api';
import { Model, VehicleTypeAPI, BrandAPI } from '@/types/filters';

const SearchCard = () => {
  const router = useRouter();
  
  // Form states - only essential filters
  const [selectedBodyType, setSelectedBodyType] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedYearMin, setSelectedYearMin] = useState('');
  const [selectedYearMax, setSelectedYearMax] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Data from API
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [bodyTypes, setBodyTypes] = useState<VehicleType[]>([]);

  // Fetch filter options from API
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        // Fetch brands
        const brandsRes = await fetch('https://api.royaldrivecanada.com/api/v1/makes/dropdown');
        const brandsData = await brandsRes.json();
        
        if (brandsData.success && brandsData.data) {
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
        const bodyTypesRes = await fetch('https://api.royaldrivecanada.com/api/v1/vehicle-types/dropdown');
        const bodyTypesData = await bodyTypesRes.json();
        if (bodyTypesData.success && bodyTypesData.data) {
          setBodyTypes(bodyTypesData.data.map((vt: VehicleTypeAPI) => ({
            id: vt._id,
            name: vt.name,
            image: vt.icon || vt.image,
            slug: vt.slug
          })));
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
    
    if (selectedBodyType) params.append('vehicleType', selectedBodyType);
    if (selectedBrand) params.append('make', selectedBrand);
    if (selectedModel) params.append('model', selectedModel);
    if (selectedPrice) params.append('maxPrice', selectedPrice);
    if (selectedYearMin) params.append('minYear', selectedYearMin);
    if (selectedYearMax) params.append('maxYear', selectedYearMax);

    // Redirect to vehicles page with filters
    router.push(`/vehicles?${params.toString()}`);
  };

  const handleReset = () => {
    setSelectedBodyType('');
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedPrice('');
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

  const bodyTypeOptions = bodyTypes.map(type => ({
    value: type.id.toString(),
    label: type.name
  }));

  const priceOptions = [
    { value: '', label: 'All Prices' },
    { value: '10000', label: 'Under $10,000' },
    { value: '20000', label: 'Under $20,000' },
    { value: '30000', label: 'Under $30,000' },
    { value: '40000', label: 'Under $40,000' },
    { value: '50000', label: 'Under $50,000' },
    { value: '75000', label: 'Under $75,000' },
    { value: '100000', label: 'Under $100,000' },
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
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Compact Search Card */}
      <div className="bg-white rounded-lg">
        <div className="p-3 sm:p-4">
          <form onSubmit={handleSearch}>
            {/* Compact Filter Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-3">
              <Dropdown
                label=""
                value={selectedBodyType}
                onChange={setSelectedBodyType}
                options={bodyTypeOptions}
                placeholder="All Types"
              />

              <Dropdown
                label=""
                value={selectedBrand}
                onChange={(value) => {
                  setSelectedBrand(value);
                  setSelectedModel('');
                }}
                options={brandOptions}
                placeholder="All Makes"
              />

              <Dropdown
                label=""
                value={selectedModel}
                onChange={setSelectedModel}
                options={modelOptions}
                placeholder="All Models"
                disabled={!selectedBrand || models.length === 0}
              />

              <Dropdown
                label=""
                value={selectedPrice}
                onChange={setSelectedPrice}
                options={priceOptions}
                placeholder="All Prices"
              />

              <Dropdown
                label=""
                value={selectedYearMin}
                onChange={setSelectedYearMin}
                options={yearMinOptions}
                placeholder="Min. Year"
              />

              <Dropdown
                label=""
                value={selectedYearMax}
                onChange={setSelectedYearMax}
                options={yearMaxOptions}
                placeholder="Max. Year"
              />
            </div>

            {/* Action Buttons - Compact */}
            <div className="flex gap-2 sm:gap-3">
              <button
                type="submit"
                disabled={isSearching}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium px-4 py-2.5 rounded-md transition-colors disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-4 sm:px-6 py-2.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md text-gray-700 font-medium transition-colors text-sm sm:text-base"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SearchCard
