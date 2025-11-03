"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import VehicleFilters from "@/components/vehicles/VehicleFilters";
import {
  BrandCarousel,
  ViewControls,
  ActiveFilters,
  VehicleResults,
  EmptyState,
  LoadingSkeleton,
} from "@/components/vehicles";
import { X } from "lucide-react";
import { Vehicle, Brand, VehicleType, FuelType, TransmissionType, Model } from "@/types/api";
import { VehicleTypeAPI, BrandAPI, ModelAPI, VehicleAPI } from "@/types/filters";

const VehiclesPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Filter states from URL
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get("make") || "");
  const [selectedModel, setSelectedModel] = useState(searchParams.get("model") || "");
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>(
    searchParams.get("fuelType") ? searchParams.get("fuelType")!.split(",") : []
  );
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>(
    searchParams.get("transmission") ? searchParams.get("transmission")!.split(",") : []
  );
  const [selectedBodyType, setSelectedBodyType] = useState(searchParams.get("vehicleType") || "");
  const [selectedDrivetrain, setSelectedDrivetrain] = useState(searchParams.get("drivetrain") || "");
  const [selectedCondition, setSelectedCondition] = useState(searchParams.get("condition") || "");
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get("status") || "");
  const [selectedColors, setSelectedColors] = useState<string[]>(
    searchParams.get("exteriorColor") ? searchParams.get("exteriorColor")!.split(",") : []
  );
  const [minPrice, setMinPrice] = useState(Number(searchParams.get("minPrice")) || 0);
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get("maxPrice")) || 100000);
  const [minYear, setMinYear] = useState(Number(searchParams.get("minYear")) || 2000);
  const [maxYear, setMaxYear] = useState(Number(searchParams.get("maxYear")) || new Date().getFullYear());
  const [minMileage, setMinMileage] = useState(Number(searchParams.get("minMileage")) || 0);
  const [maxMileage, setMaxMileage] = useState(Number(searchParams.get("maxMileage")) || 200000);
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "newest");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  // Layout state
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Data states
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [brands, setBrands] = useState<BrandAPI[] | null>(null);
  const [models, setModels] = useState<ModelAPI[]>([]);
  const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
  const [transmissions, setTransmissions] = useState<TransmissionType[]>([]);
  const [bodyTypes, setBodyTypes] = useState<VehicleType[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 0,
  });

  // Derived flag: do we have more items to load?
  const hasMore = useMemo(() => {
    return vehicles.length < (pagination?.total || 0);
  }, [vehicles.length, pagination.total]);

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ;
      try {
        const [brandsRes, bodyTypesRes, fuelTypesRes, transmissionsRes] = await Promise.all([
          fetch(`${apiBase}/makes/dropdown`),
          fetch(`${apiBase}/vehicle-types/dropdown`),
          fetch(`${apiBase}/fuel-types`),
          fetch(`${apiBase}/transmissions`),
        ]);

        const [brandsData, bodyTypesData, fuelTypesData, transmissionsData] = await Promise.all([
          brandsRes.json(),
          bodyTypesRes.json(),
          fuelTypesRes.json(),
          transmissionsRes.json(),
        ]);

        if (brandsData.success && brandsData.data) {
          setBrands(brandsData.data); // Keep as BrandAPI[]
        }

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

        if (fuelTypesData.success && fuelTypesData.data?.fuelTypes) {
          setFuelTypes(fuelTypesData.data.fuelTypes.filter((ft: FuelType) => ft.active));
        }

        if (transmissionsData.success && transmissionsData.data?.transmissions) {
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

      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ;
      try {
        const modelsRes = await fetch(
          `${apiBase}/models/dropdown`
        );
        const modelsData = await modelsRes.json();
        if (modelsData.success && modelsData.data) {
          const filteredModels = modelsData.data.filter(
            (model: ModelAPI) => model.make._id === selectedBrand
          );
          setModels(filteredModels); // Keep as ModelAPI[]
        }
      } catch (error) {
        console.error("Failed to fetch models:", error);
      }
    };

    fetchModels();
  }, [selectedBrand]);

  // Fetch vehicles with filters
  useEffect(() => {
    const fetchVehicles = async () => {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
      // If page is 1, show loading state; otherwise show loadingMore
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      try {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", "12");

        if (searchTerm) params.append("q", searchTerm);
        if (selectedBrand) params.append("make", selectedBrand);
        if (selectedModel) params.append("model", selectedModel);
        if (selectedBodyType) params.append("vehicleType", selectedBodyType);
        if (selectedFuelTypes.length) params.append("fuelType", selectedFuelTypes.join(","));
        if (selectedTransmissions.length) params.append("transmission", selectedTransmissions.join(","));
        if (selectedColors.length) params.append("exteriorColor", selectedColors.join(","));
        if (selectedDrivetrain) params.append("drivetrain", selectedDrivetrain);
        if (selectedCondition) params.append("condition", selectedCondition);
        if (selectedStatus) params.append("status", selectedStatus);
        // Only add price filters if they differ from defaults
        if (minPrice > 0) params.append("minPrice", minPrice.toString());
        if (maxPrice < 100000) params.append("maxPrice", maxPrice.toString());
        // Only add year filters if they differ from defaults
        if (minYear > 2000) params.append("minYear", minYear.toString());
        if (maxYear < new Date().getFullYear()) params.append("maxYear", maxYear.toString());
        // Only add mileage filters if they differ from defaults
        if (minMileage > 0) params.append("minMileage", minMileage.toString());
        if (maxMileage < 200000) params.append("maxMileage", maxMileage.toString());
        if (sortBy && sortBy !== "newest") params.append("sortBy", sortBy);

        const response = await fetch(
          `${apiBase}/vehicles?${params.toString()}`
        );
  const data = await response.json();

        if (data.success && data.data?.vehicles) {
          const transformedVehicles = data.data.vehicles.map((vehicle: VehicleAPI) => ({
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
            featured: vehicle.marketing.featured,
            status: vehicle.status,
            safetyCertified: vehicle.ontario?.safetyStandard?.passed,
            carfax: vehicle.carfax,
            numberOfPreviousOwners: vehicle.numberOfPreviousOwners,
            accidentHistory: vehicle.accidentHistory,
          }));

          // If page is 1, replace vehicles; otherwise, append them
          if (page === 1) {
            setVehicles(transformedVehicles);
          } else {
            setVehicles(prevVehicles => [...prevVehicles, ...transformedVehicles]);
          }

          // Normalize pagination from API (be robust to naming differences)
          const apiPg = data.data.pagination || {};
          const total = Number(
            apiPg.total ?? data.data.total ?? data.total ?? 0
          );
          const limit = Number(
            apiPg.limit ?? apiPg.perPage ?? data.data.limit ?? 12
          );
          const currentPage = Number(
            apiPg.page ?? apiPg.current ?? data.data.page ?? page
          );
          const totalPages = Number(
            apiPg.totalPages ?? apiPg.pages ?? (limit ? Math.ceil(total / limit) : 1)
          );

          setPagination({ total, page: currentPage, limit, totalPages });
        }
      } catch (error) {
        console.error("Failed to fetch vehicles:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchVehicles();
  }, [
    page,
    searchTerm,
    selectedBrand,
    selectedModel,
    selectedBodyType,
    selectedFuelTypes,
    selectedTransmissions,
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
    sortBy,
  ]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [
    searchTerm,
    selectedBrand,
    selectedModel,
    selectedBodyType,
    selectedFuelTypes,
    selectedTransmissions,
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
    sortBy,
  ]);

  // Calculate active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedBrand) count++;
    if (selectedModel) count++;
    if (selectedBodyType) count++;
    if (selectedTransmissions.length > 0) count += selectedTransmissions.length;
    if (selectedFuelTypes.length > 0) count += selectedFuelTypes.length;
    if (selectedColors.length > 0) count += selectedColors.length;
    if (selectedDrivetrain) count++;
    if (selectedCondition) count++;
    if (selectedStatus) count++;
    // Only count price if it's not the default range
    if (minPrice > 0 || maxPrice < 100000) count++;
    // Only count year if it's not the default range
    if (minYear > 2000 || maxYear < new Date().getFullYear()) count++;
    // Only count mileage if it's not the default range
    if (minMileage > 0 || maxMileage < 200000) count++;
    return count;
  }, [
    searchTerm,
    selectedBrand,
    selectedModel,
    selectedBodyType,
    selectedTransmissions,
    selectedFuelTypes,
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

  // Handlers
  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedBodyType("");
    setSelectedFuelTypes([]);
    setSelectedTransmissions([]);
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
    setPage(1);
  };

  const handleViewDetails = (slug: string) => {
    router.push(`/vehicles/${slug}`);
  };

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId);
    setSelectedModel("");
    setPage(1);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Brand Carousel Section */}
      <div className="pt-24 sm:pt-28">
        <BrandCarousel
          brands={brands}
          selectedBrand={selectedBrand}
          onBrandSelect={handleBrandSelect}
        />
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
              brands={brands?.map(b => ({ id: b._id, name: b.name, logo: b.logo })) || []}
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
            <ViewControls
              totalCount={pagination.total}
              isHorizontal={isHorizontal}
              onViewToggle={setIsHorizontal}
              sortBy={sortBy}
              onSortChange={setSortBy}
              showFilters={showFilters}
              onFilterToggle={() => setShowFilters(!showFilters)}
              activeFiltersCount={activeFiltersCount}
            />

            <ActiveFilters
              activeFiltersCount={activeFiltersCount}
              searchTerm={searchTerm}
              selectedBrand={selectedBrand}
              selectedModel={selectedModel}
              selectedBodyType={selectedBodyType}
              selectedTransmissions={selectedTransmissions}
              selectedFuelTypes={selectedFuelTypes}
              selectedColors={selectedColors}
              selectedDrivetrain={selectedDrivetrain}
              selectedCondition={selectedCondition}
              selectedStatus={selectedStatus}
              minPrice={minPrice.toString()}
              maxPrice={maxPrice.toString()}
              minYear={minYear.toString()}
              maxYear={maxYear.toString()}
              minMileage={minMileage.toString()}
              maxMileage={maxMileage.toString()}
              brands={brands}
              models={models}
              bodyTypes={bodyTypes.map((bt) => ({ value: String(bt.id), label: bt.name }))}
              transmissions={transmissions}
              fuelTypes={fuelTypes}
              onClearAll={handleClearFilters}
              onRemoveSearch={() => setSearchTerm("")}
              onRemoveBrand={() => {
                setSelectedBrand("");
                setSelectedModel("");
              }}
              onRemoveModel={() => setSelectedModel("")}
              onRemoveBodyType={() => setSelectedBodyType("")}
              onRemoveTransmission={(id) =>
                setSelectedTransmissions(selectedTransmissions.filter((t) => t !== id))
              }
              onRemoveFuelType={(id) =>
                setSelectedFuelTypes(selectedFuelTypes.filter((f) => f !== id))
              }
              onRemoveColor={(color) =>
                setSelectedColors(selectedColors.filter((c) => c !== color))
              }
              onRemoveDrivetrain={() => setSelectedDrivetrain("")}
              onRemoveCondition={() => setSelectedCondition("")}
              onRemoveStatus={() => setSelectedStatus("")}
              onRemovePrice={() => {
                setMinPrice(0);
                setMaxPrice(100000);
              }}
              onRemoveYear={() => {
                setMinYear(2000);
                setMaxYear(new Date().getFullYear());
              }}
              onRemoveMileage={() => {
                setMinMileage(0);
                setMaxMileage(200000);
              }}
            />

            {loading ? (
              <LoadingSkeleton />
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
        {hasMore && (
                      <span className="ml-2 text-gray-600">
                        •{" "}
                        <span className="font-semibold text-green-600">
          {Math.max(pagination.total - vehicles.length, 0)} more available
                        </span>
                      </span>
                    )}
                  </p>
                </div>

                <VehicleResults
                  vehicles={vehicles}
                  isHorizontal={isHorizontal}
                  onViewDetails={handleViewDetails}
                />
                
                {/* Load More Button */}
                {hasMore && (
                  <div className="flex justify-center mt-8 mb-4">
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:shadow-md flex items-center gap-2"
                    >
                      {loadingMore ? (
                        <>
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading More...
                        </>
                      ) : (
                        <>
                          Load More Vehicles
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <EmptyState
                activeFiltersCount={activeFiltersCount}
                onClearFilters={handleClearFilters}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

const VehiclesPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <VehiclesPageContent />
    </Suspense>
  );
};

export default VehiclesPage;
