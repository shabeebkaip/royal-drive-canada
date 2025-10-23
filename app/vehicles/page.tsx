"use client";

import React, { useState, useEffect, useMemo, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import VehicleCard from "@/components/shared/VehicleCard";
import VehicleFilters from "@/components/vehicles/VehicleFilters";
import {
  LayoutGrid,
  List,
  SlidersHorizontal,
  Car,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Vehicle, Brand, VehicleType, FuelType, TransmissionType, Model } from "@/types/api";
import { VehicleTypeAPI, BrandAPI, ModelAPI, VehicleAPI } from "@/types/filters";
import Image from "next/image";

const VehiclesPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Filter states from URL
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("make") || ""
  );
  const [selectedModel, setSelectedModel] = useState(
    searchParams.get("model") || ""
  );
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>(
    searchParams.get("fuelType") ? searchParams.get("fuelType")!.split(",") : []
  );
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>(
    searchParams.get("transmission")
      ? searchParams.get("transmission")!.split(",")
      : []
  );
  const [selectedBodyType, setSelectedBodyType] = useState(
    searchParams.get("vehicleType") || ""
  );
  const [selectedDrivetrain, setSelectedDrivetrain] = useState(
    searchParams.get("drivetrain") || ""
  );
  const [selectedCondition, setSelectedCondition] = useState(
    searchParams.get("condition") || ""
  );
  const [selectedStatus, setSelectedStatus] = useState(
    searchParams.get("status") || ""
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(
    searchParams.get("exteriorColor")
      ? searchParams.get("exteriorColor")!.split(",")
      : []
  );
  const [minPrice, setMinPrice] = useState(
    Number(searchParams.get("minPrice")) || 0
  );
  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("maxPrice")) || 100000
  );
  const [minYear, setMinYear] = useState(
    Number(searchParams.get("minYear")) || 2000
  );
  const [maxYear, setMaxYear] = useState(
    Number(searchParams.get("maxYear")) || new Date().getFullYear()
  );
  const [minMileage, setMinMileage] = useState(
    Number(searchParams.get("minMileage")) || 0
  );
  const [maxMileage, setMaxMileage] = useState(
    Number(searchParams.get("maxMileage")) || 200000
  );
  const [sortBy, setSortBy] = useState(
    searchParams.get("sortBy") || "created_desc"
  );
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  // Layout state
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [showFilters, setShowFilters] = useState(false); // Hidden by default on mobile, visible on desktop

  // Data states
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
  const [transmissions, setTransmissions] = useState<TransmissionType[]>([]);
  const [bodyTypes, setBodyTypes] = useState<VehicleType[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 0,
  });

  // Ref for brand logos carousel
  const brandScrollRef = useRef<HTMLDivElement>(null);

  // Scroll brand logos left/right
  const scrollBrands = (direction: "left" | "right") => {
    if (brandScrollRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        direction === "left"
          ? brandScrollRef.current.scrollLeft - scrollAmount
          : brandScrollRef.current.scrollLeft + scrollAmount;

      brandScrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        // Fetch brands
        const brandsRes = await fetch(
          "https://api.royaldrivecanada.com/api/v1/makes/dropdown"
        );
        const brandsData = await brandsRes.json();
        if (brandsData.success && brandsData.data) {
          setBrands(
            brandsData.data.map((b: BrandAPI) => ({
              id: b._id,
              name: b.name,
              logo: b.logo,
              slug: b.slug,
            }))
          );
        }

        // Fetch body types (using dropdown API)
        const bodyTypesRes = await fetch(
          "https://api.royaldrivecanada.com/api/v1/vehicle-types/dropdown"
        );
        const bodyTypesData = await bodyTypesRes.json();
        if (bodyTypesData.success && bodyTypesData.data) {
          setBodyTypes(
            bodyTypesData.data.map((vt: VehicleTypeAPI) => ({
              id: vt._id,
              name: vt.name,
              image: vt.icon || vt.image,
              slug: vt.slug,
            }))
          );
        }

        // Fetch fuel types
        const fuelTypesRes = await fetch(
          "https://api.royaldrivecanada.com/api/v1/fuel-types"
        );
        const fuelTypesData = await fuelTypesRes.json();
        if (fuelTypesData.success && fuelTypesData.data?.fuelTypes) {
          setFuelTypes(
            fuelTypesData.data.fuelTypes.filter((ft: FuelType) => ft.active)
          );
        }

        // Fetch transmissions
        const transmissionsRes = await fetch(
          "https://api.royaldrivecanada.com/api/v1/transmissions"
        );
        const transmissionsData = await transmissionsRes.json();
        if (
          transmissionsData.success &&
          transmissionsData.data?.transmissions
        ) {
          setTransmissions(
            transmissionsData.data.transmissions.filter((t: TransmissionType) => t.active)
          );
        }
      } catch (error) {
        console.error("Failed to fetch filter options:", error);
      }
    };

    fetchFilterOptions();
  }, []);

  // Fetch models when brand changes
  useEffect(() => {
    const fetchModels = async () => {
      if (!selectedBrand) {
        setModels([]);
        return;
      }

      try {
        const modelsRes = await fetch(
          `https://api.royaldrivecanada.com/api/v1/models/dropdown`
        );
        const modelsData = await modelsRes.json();
        if (modelsData.success && modelsData.data) {
          // Filter models by the selected brand's _id
          const filteredModels = modelsData.data.filter(
            (m: ModelAPI) => m.make && m.make._id === selectedBrand
          );
          setModels(filteredModels);
        }
      } catch (error) {
        console.error("Failed to fetch models:", error);
      }
    };

    fetchModels();
  }, [selectedBrand]);

  // Fetch vehicles based on filters
  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();

        // ALWAYS exclude sold vehicles
        params.append("excludeStatus", "sold");

        if (searchTerm) params.append("q", searchTerm);
        if (selectedBrand) params.append("make", selectedBrand);
        if (selectedModel) params.append("model", selectedModel);
        if (selectedFuelTypes.length)
          params.append("fuelType", selectedFuelTypes.join(","));
        if (selectedTransmissions.length)
          params.append("transmission", selectedTransmissions.join(","));
        if (selectedBodyType) params.append("vehicleType", selectedBodyType);
        if (selectedDrivetrain) params.append("drivetrain", selectedDrivetrain);
        if (selectedCondition) params.append("condition", selectedCondition);
        if (selectedStatus) params.append("status", selectedStatus);
        if (minPrice) params.append("minPrice", minPrice.toString());
        if (maxPrice) params.append("maxPrice", maxPrice.toString());
        if (minYear) params.append("minYear", minYear.toString());
        if (maxYear) params.append("maxYear", maxYear.toString());
        if (minMileage) params.append("minMileage", minMileage.toString());
        if (maxMileage) params.append("maxMileage", maxMileage.toString());
        if (sortBy) params.append("sortBy", sortBy);
        params.append("page", page.toString());
        params.append("limit", "12");

        const response = await fetch(
          `https://api.royaldrivecanada.com/api/v1/vehicles?${params.toString()}`
        );
        const data = await response.json();

        if (data.success && data.data?.vehicles) {
          const transformedVehicles = data.data.vehicles
            .filter((vehicle: VehicleAPI) => {
              // ALWAYS filter out sold vehicles on client-side as well
              return vehicle.status?.slug !== 'sold';
            })
            .map(
            (vehicle: VehicleAPI) => ({
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
              carfax: vehicle.carfax,
              status: vehicle.status ? {
                slug: vehicle.status.slug,
                name: vehicle.status.name,
                color: vehicle.status.color,
              } : undefined,
              createdAt: vehicle.createdAt,
              updatedAt: vehicle.updatedAt,
            })
          );

          setVehicles(transformedVehicles);
          if (data.data.pagination) {
            const paginationData = {
              total: data.data.pagination.total,
              page: data.data.pagination.page,
              limit: data.data.pagination.limit,
              totalPages: data.data.pagination.pages, // API returns 'pages' not 'totalPages'
            };
            setPagination(paginationData);
          }
        } else {
          setVehicles([]);
        }
      } catch (error) {
        console.error("Failed to fetch vehicles:", error);
        setVehicles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [
    searchTerm,
    selectedBrand,
    selectedModel,
    selectedFuelTypes,
    selectedTransmissions,
    selectedBodyType,
    selectedDrivetrain,
    selectedCondition,
    selectedStatus,
    minPrice,
    maxPrice,
    minYear,
    maxYear,
    minMileage,
    maxMileage,
    sortBy,
    page,
  ]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedFuelTypes([]);
    setSelectedTransmissions([]);
    setSelectedBodyType("");
    setSelectedColors([]);
    setSelectedDrivetrain("");
    setSelectedCondition("");
    setSelectedStatus("");
    setMinPrice(0);
    setMaxPrice(100000);
    setMinYear(2000);
    setMaxYear(new Date().getFullYear());
    setMinMileage(0);
    setMaxMileage(200000);
    setSortBy("created_desc");
    setPage(1);
    router.push("/vehicles");
  };

  const handleViewDetails = (vehicleId: string) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    if (vehicle?.slug) {
      router.push(`/vehicles/${vehicle.slug}`);
    }
  };




  const sortOptions = [
    { value: "created_desc", label: "Recently Added" },
    { value: "created_asc", label: "Oldest First" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "year_desc", label: "Year: Newest First" },
    { value: "year_asc", label: "Year: Oldest First" },
    { value: "mileage_asc", label: "Mileage: Low to High" },
    { value: "mileage_desc", label: "Mileage: High to Low" },
    { value: "featured", label: "Featured First" },
  ];





  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedBrand) count++;
    if (selectedModel) count++;
    count += selectedFuelTypes.length;
    count += selectedTransmissions.length;
    if (selectedBodyType) count++;
    count += selectedColors.length;
    if (selectedDrivetrain) count++;
    if (selectedCondition) count++;
    if (selectedStatus) count++;
    if (minPrice > 0 || maxPrice < 100000) count++;
    if (minYear > 2000 || maxYear < new Date().getFullYear()) count++;
    if (minMileage > 0 || maxMileage < 200000) count++;
    return count;
  }, [
    searchTerm,
    selectedBrand,
    selectedModel,
    selectedFuelTypes,
    selectedTransmissions,
    selectedBodyType,
    selectedColors,
    selectedDrivetrain,
    selectedCondition,
    selectedStatus,
    minPrice,
    maxPrice,
    minYear,
    maxYear,
    minMileage,
    maxMileage,
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Rich Description Section - Compact */}
      <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200 pt-24 sm:pt-28">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="max-w-6xl mx-auto">
            {/* Title - Compact and Visible */}
            <div className="text-center mb-4 sm:mb-5">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                Quality Pre-Owned Vehicles in Toronto
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Browse by popular brands
              </p>
            </div>

            {/* Brand Logos Carousel - From API */}
            <div className="mb-3 sm:mb-4 relative group">
              {/* Left Scroll Button */}
              <button
                onClick={() => scrollBrands("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>

              {/* Right Scroll Button */}
              <button
                onClick={() => scrollBrands("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>

              <div
                ref={brandScrollRef}
                className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 px-1 scrollbar-hide sm:justify-center"
                onWheel={(e) => {
                  // Enable horizontal scroll with mouse wheel
                  const container = e.currentTarget;
                  if (container.scrollWidth > container.clientWidth) {
                    e.preventDefault();
                    container.scrollLeft += e.deltaY;
                  }
                }}
              >
                {brands?.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => {
                      setSelectedBrand(String(brand.id));
                      setSelectedModel("");
                      setPage(1);
                      window.scrollTo({ top: 400, behavior: "smooth" });
                    }}
                    className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-lg border-2 transition-all duration-200 p-2 flex items-center justify-center group hover:shadow-lg ${
                      selectedBrand === String(brand.id)
                        ? "border-blue-500 shadow-md"
                        : "border-gray-200 hover:border-blue-400"
                    }`}
                    title={brand.name}
                  >
                    {brand.logo ? (
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={64}
                        height={64}
                        className={`object-contain transition-all duration-200 ${
                          selectedBrand === brand.id
                            ? ""
                            : "grayscale group-hover:grayscale-0"
                        }`}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const textNode = document.createElement("span");
                          textNode.className =
                            "text-xs font-bold text-gray-700";
                          textNode.textContent = brand.name
                            .substring(0, 3)
                            .toUpperCase();
                          target.parentElement?.appendChild(textNode);
                        }}
                      />
                    ) : (
                      <span className="text-xs font-bold text-gray-700">
                        {brand.name.substring(0, 3).toUpperCase()}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6">
          {/* Mobile Filter Backdrop */}
          {showFilters && (
            <div
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowFilters(false)}
            />
          )}

          {/* Left Sidebar - Filters */}
          <aside
            className={`${
              showFilters
                ? "fixed inset-y-0 left-0 z-50 w-full sm:w-96 overflow-y-auto"
                : "hidden"
            } lg:block lg:w-80 flex-shrink-0 lg:sticky lg:top-6 lg:z-auto bg-white lg:bg-transparent`}
          >
            {/* Mobile Close Button */}
            <div className="lg:hidden sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
              <h2 className="text-lg font-bold text-gray-900">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <VehicleFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              brands={brands}
              models={models}
              selectedBrand={selectedBrand}
              selectedModel={selectedModel}
              onBrandChange={(value) => {
                setSelectedBrand(value);
                setSelectedModel("");
                setPage(1);
              }}
              onModelChange={(value) => {
                setSelectedModel(value);
                setPage(1);
              }}
              bodyTypes={bodyTypes}
              selectedBodyType={selectedBodyType}
              onBodyTypeChange={(value) => {
                setSelectedBodyType(value);
                setPage(1);
              }}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onPriceChange={(min, max) => {
                setMinPrice(min);
                setMaxPrice(max);
                setPage(1);
              }}
              minYear={minYear}
              maxYear={maxYear}
              onYearChange={(min, max) => {
                setMinYear(min);
                setMaxYear(max);
                setPage(1);
              }}
              minMileage={minMileage}
              maxMileage={maxMileage}
              onMileageChange={(min, max) => {
                setMinMileage(min);
                setMaxMileage(max);
                setPage(1);
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
            <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
                {/* Left: Filter Toggle (Mobile) & Results Count */}
                <div className="flex items-center gap-2 sm:gap-4 flex-1">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm sm:text-base"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="bg-white text-blue-600 text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-bold">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>

                  <div className="hidden sm:flex items-center gap-2">
                    <Car className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-900">
                      {pagination.total} Vehicle
                      {pagination.total !== 1 ? "s" : ""}
                    </h2>
                  </div>
                </div>

                {/* Right: View Toggle & Sort */}
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  {/* View Toggle - Hidden on mobile */}
                  <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setIsHorizontal(false)}
                      className={`p-2 rounded-lg transition-colors ${
                        !isHorizontal
                          ? "bg-white shadow-sm text-blue-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      title="Grid View"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsHorizontal(true)}
                      className={`p-2 rounded-lg transition-colors ${
                        isHorizontal
                          ? "bg-white shadow-sm text-blue-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      title="List View"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Sort Dropdown - Full width on mobile */}
                  <div className="flex-1 sm:flex-none sm:w-48">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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
            <div className="sm:hidden bg-white rounded-lg shadow-md p-3 mb-4">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-blue-600" />
                <h2 className="text-base font-bold text-gray-900">
                  {pagination.total} Vehicle{pagination.total !== 1 ? "s" : ""}{" "}
                  Found
                </h2>
              </div>
            </div>

            {/* Active Filters Summary */}
            {activeFiltersCount > 0 && (
              <div className="bg-white rounded-lg shadow-md p-3 sm:p-5 mb-4 sm:mb-6 border border-gray-200">
                <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide">
                      Active Filters ({activeFiltersCount})
                    </h3>
                  </div>
                  <button
                    onClick={handleClearFilters}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-red-600 hover:text-white bg-red-50 hover:bg-red-600 rounded-lg transition-all duration-200 border border-red-200 hover:border-red-600"
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    Clear All
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-200">
                      <span className="font-medium">Search:</span>
                      <span className="font-semibold">{searchTerm}</span>
                      <button
                        onClick={() => setSearchTerm("")}
                        className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {selectedBrand && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm border border-purple-200">
                      <span className="font-medium">Brand:</span>
                      <span className="font-semibold">
                        {brands.find((b) => b.id === selectedBrand)?.name}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedBrand("");
                          setSelectedModel("");
                        }}
                        className="ml-1 hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {selectedModel && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm border border-purple-200">
                      <span className="font-medium">Model:</span>
                      <span className="font-semibold">
                        {models.find((m) => m._id === selectedModel)?.name}
                      </span>
                      <button
                        onClick={() => setSelectedModel("")}
                        className="ml-1 hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {selectedBodyType &&
                    (() => {
                      const bodyType = bodyTypes.find(
                        (t) => t.id === selectedBodyType
                      );
                      return bodyType ? (
                        <div
                          key={selectedBodyType}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm border border-green-200"
                        >
                          <span className="font-medium">Type:</span>
                          <span className="font-semibold">{bodyType.name}</span>
                          <button
                            onClick={() => setSelectedBodyType("")}
                            className="ml-1 hover:bg-green-200 rounded-full p-0.5 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : null;
                    })()}

                  {selectedFuelTypes.length > 0 &&
                    selectedFuelTypes.map((fuelTypeId) => {
                      const fuelType = fuelTypes.find(
                        (ft) => ft._id === fuelTypeId
                      );
                      return fuelType ? (
                        <div
                          key={fuelTypeId}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm border border-amber-200"
                        >
                          <span className="font-medium">Fuel:</span>
                          <span className="font-semibold">{fuelType.name}</span>
                          <button
                            onClick={() =>
                              setSelectedFuelTypes(
                                selectedFuelTypes.filter(
                                  (id) => id !== fuelTypeId
                                )
                              )
                            }
                            className="ml-1 hover:bg-amber-200 rounded-full p-0.5 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : null;
                    })}

                  {selectedTransmissions.length > 0 &&
                    selectedTransmissions.map((transId) => {
                      const transmission = transmissions.find(
                        (t) => t._id === transId
                      );
                      return transmission ? (
                        <div
                          key={transId}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm border border-indigo-200"
                        >
                          <span className="font-medium">Transmission:</span>
                          <span className="font-semibold">
                            {transmission.name}
                          </span>
                          <button
                            onClick={() =>
                              setSelectedTransmissions(
                                selectedTransmissions.filter(
                                  (id) => id !== transId
                                )
                              )
                            }
                            className="ml-1 hover:bg-indigo-200 rounded-full p-0.5 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : null;
                    })}

                  {selectedColors.length > 0 &&
                    selectedColors.map((color) => (
                      <div
                        key={color}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-pink-50 text-pink-700 rounded-lg text-sm border border-pink-200"
                      >
                        <span className="font-medium">Color:</span>
                        <span className="font-semibold capitalize">
                          {color}
                        </span>
                        <button
                          onClick={() =>
                            setSelectedColors(
                              selectedColors.filter((c) => c !== color)
                            )
                          }
                          className="ml-1 hover:bg-pink-200 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                  {(minPrice > 0 || maxPrice < 100000) && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm border border-emerald-200">
                      <span className="font-medium">Price:</span>
                      <span className="font-semibold">
                        ${minPrice.toLocaleString()} - $
                        {maxPrice.toLocaleString()}
                      </span>
                      <button
                        onClick={() => {
                          setMinPrice(0);
                          setMaxPrice(100000);
                        }}
                        className="ml-1 hover:bg-emerald-200 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {(minYear > 2000 || maxYear < new Date().getFullYear()) && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-50 text-cyan-700 rounded-lg text-sm border border-cyan-200">
                      <span className="font-medium">Year:</span>
                      <span className="font-semibold">
                        {minYear} - {maxYear}
                      </span>
                      <button
                        onClick={() => {
                          setMinYear(2000);
                          setMaxYear(new Date().getFullYear());
                        }}
                        className="ml-1 hover:bg-cyan-200 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {(minMileage > 0 || maxMileage < 200000) && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-sm border border-teal-200">
                      <span className="font-medium">Mileage:</span>
                      <span className="font-semibold">
                        {minMileage.toLocaleString()} -{" "}
                        {maxMileage.toLocaleString()} km
                      </span>
                      <button
                        onClick={() => {
                          setMinMileage(0);
                          setMaxMileage(200000);
                        }}
                        className="ml-1 hover:bg-teal-200 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {selectedCondition && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg text-sm border border-slate-200">
                      <span className="font-medium">Condition:</span>
                      <span className="font-semibold capitalize">
                        {selectedCondition}
                      </span>
                      <button
                        onClick={() => setSelectedCondition("")}
                        className="ml-1 hover:bg-slate-200 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {selectedDrivetrain && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg text-sm border border-orange-200">
                      <span className="font-medium">Drivetrain:</span>
                      <span className="font-semibold capitalize">
                        {selectedDrivetrain}
                      </span>
                      <button
                        onClick={() => setSelectedDrivetrain("")}
                        className="ml-1 hover:bg-orange-200 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {selectedStatus && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-50 text-rose-700 rounded-lg text-sm border border-rose-200">
                      <span className="font-medium">Status:</span>
                      <span className="font-semibold capitalize">
                        {selectedStatus}
                      </span>
                      <button
                        onClick={() => setSelectedStatus("")}
                        className="ml-1 hover:bg-rose-200 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Vehicles Grid/List */}
            {loading ? (
              <div className="flex items-center justify-center py-32 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100">
                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="text-gray-700 font-semibold text-lg mb-2">
                    Finding Your Perfect Vehicle
                  </p>
                  <p className="text-gray-500 text-sm">
                    Please wait while we load the latest inventory...
                  </p>
                </div>
              </div>
            ) : vehicles.length > 0 ? (
              <>
                {/* Results Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 border border-blue-200">
                  <p className="text-xs sm:text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-bold text-blue-600">
                      {vehicles.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-bold text-blue-600">
                      {pagination.total}
                    </span>{" "}
                    vehicles
                    {activeFiltersCount > 0 && (
                      <span className="ml-2 text-gray-600">
                        •{" "}
                        <span className="font-semibold">
                          {activeFiltersCount}
                        </span>{" "}
                        filter{activeFiltersCount !== 1 ? "s" : ""} applied
                      </span>
                    )}
                  </p>
                </div>

                <div
                  className={`${
                    isHorizontal
                      ? "space-y-3 sm:space-y-4"
                      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6"
                  }`}
                >
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
                  <div className="flex items-center justify-center gap-1 sm:gap-2 mt-6 sm:mt-8 bg-white rounded-lg shadow-md p-3 sm:p-4">
                    <button
                      onClick={() => {
                        setPage(page - 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      disabled={page === 1}
                      className="px-2 sm:px-4 py-1.5 sm:py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <span className="hidden sm:inline">Previous</span>
                      <span className="sm:hidden">Prev</span>
                    </button>

                    <div className="flex gap-0.5 sm:gap-1">
                      {Array.from(
                        { length: Math.min(pagination.totalPages, 7) },
                        (_, i) => {
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
                                setPage(pageNum);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className={`min-w-[32px] sm:min-w-[40px] px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                                page === pageNum
                                  ? "bg-blue-600 text-white shadow-md"
                                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setPage(page + 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      disabled={page === pagination.totalPages}
                      className="px-2 sm:px-4 py-1.5 sm:py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

                  <h3 className="text-3xl font-bold text-gray-900 mb-3">
                    No Vehicles Found
                  </h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    We couldn&apos;t find any vehicles matching your search criteria.
                    Try adjusting your filters or clearing them to see all
                    available vehicles.
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
                      onClick={() => router.push("/contact")}
                      className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors border-2 border-gray-300"
                    >
                      Contact Us
                    </button>
                  </div>

                  {/* Suggestions */}
                  {activeFiltersCount > 0 && (
                    <div className="mt-8 p-4 bg-white rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-600 mb-2">
                        You have {activeFiltersCount} active filter
                        {activeFiltersCount !== 1 ? "s" : ""}
                      </p>
                      <p className="text-xs text-gray-500">
                        Try removing some filters to see more results
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

const VehiclesPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <VehiclesPageContent />
    </Suspense>
  );
};

export default VehiclesPage;
