/**
 * Vehicles API Service
 * Server-side service for fetching vehicles with caching and revalidation
 */

import { apiClient } from '../client';
import { Vehicle } from '@/types/api';

interface VehicleApiResponse {
  success: boolean;
  message: string;
  timestamp: string;
  data: {
    vehicles: VehicleRaw[];
    pagination?: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

interface MakeReference {
  _id: string;
  name: string;
  logo?: string;
  slug?: string;
}

interface ModelReference {
  _id: string;
  name: string;
  make?: string;
  slug?: string;
}

interface FuelTypeReference {
  _id: string;
  name: string;
  active: boolean;
  slug: string;
}

interface TransmissionReference {
  type: {
    _id: string;
    name: string;
    active: boolean;
    slug: string;
  };
}

interface VehicleRaw {
  _id: string;
  make: MakeReference;
  model: ModelReference;
  year: number;
  engine: {
    size: number;
    cylinders: number;
    fuelType: FuelTypeReference;
    horsepower: number;
  };
  transmission: TransmissionReference;
  odometer: {
    value: number;
    unit: string;
    isAccurate: boolean;
  };
  pricing: {
    listPrice: number;
    currency: string;
    taxes: {
      hst: number;
      licensing: number;
    };
    financing: {
      available: boolean;
    };
  };
  media: {
    images: string[];
    videos: string[];
    documents: string[];
  };
  marketing: {
    featured: boolean;
    description: string;
    keywords: string[];
    slug: string;
  };
  ontario?: {
    safetyStandard: {
      passed: boolean;
    };
  };
  carfax?: {
    hasCleanHistory: boolean;
    serviceRecords: number;
  };
  internal: {
    stockNumber: string;
    daysInInventory: number;
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * Fetch featured vehicles from the API
 * Uses Next.js 15 cache with revalidation for optimal performance
 * Data is cached and revalidated every 60 seconds (ISR)
 * This ensures fresh data when admin adds new featured vehicles
 */
export async function getFeaturedVehicles(limit: number = 6): Promise<Vehicle[]> {
  try {
    const response = await apiClient.get<VehicleApiResponse>(
      `/vehicles?featured=true&limit=${limit}`,
      {
        // Next.js 15 fetch caching with revalidation
        // This will revalidate the cache every 60 seconds
        // ensuring new featured vehicles appear within 1 minute
        next: {
          revalidate: 60, // Revalidate every 60 seconds
          tags: ['vehicles', 'featured-vehicles'], // Tags for on-demand revalidation
        },
      }
    );

    // Transform API response to match our Vehicle interface
    if (response.success && response.data?.vehicles) {
      return response.data.vehicles.map((vehicle) => {
        // Extract data from nested API structure
        const makeName = vehicle.make.name;
        const modelName = vehicle.model.name;
        const vehicleName = `${vehicle.year} ${makeName} ${modelName}`;
        
        return {
          id: vehicle._id,
          name: vehicleName,
          brand: makeName,
          model: modelName,
          year: vehicle.year,
          price: vehicle.pricing.listPrice,
          discountPrice: undefined,
          isOffer: false,
          featured: vehicle.marketing.featured,
          mileage: vehicle.odometer.value,
          fuelType: vehicle.engine.fuelType.name,
          transmission: vehicle.transmission.type.name,
          images: vehicle.media.images || [],
          slug: vehicle.marketing.slug,
          description: vehicle.marketing.description,
          hstRequired: vehicle.pricing.taxes.hst > 0,
          licensing: vehicle.pricing.taxes.licensing > 0,
          safetyCertified: vehicle.ontario?.safetyStandard.passed || false,
          tradeInsWelcome: false,
          location: undefined,
          phone: undefined,
          carfax: vehicle.carfax?.hasCleanHistory ? 'Clean' : undefined,
          createdAt: vehicle.createdAt,
          updatedAt: vehicle.updatedAt,
        };
      });
    }

    return [];
  } catch (error) {
    console.error('Failed to fetch featured vehicles:', error);
    // Return empty array as fallback
    return [];
  }
}

/**
 * Fetch latest vehicles from the API with limit
 * @param limit - Number of vehicles to fetch (default: 8)
 */
export async function getLatestVehicles(limit: number = 8): Promise<Vehicle[]> {
  try {
    const response = await apiClient.get<VehicleApiResponse>(
      `/vehicles?limit=${limit}&sort=-createdAt`,
      {
        next: {
          revalidate: 60,
          tags: ['vehicles', 'latest-vehicles'],
        },
      }
    );

    if (response.success && response.data?.vehicles) {
      return response.data.vehicles.map((vehicle) => {
        // Extract data from nested API structure
        const makeName = vehicle.make.name;
        const modelName = vehicle.model.name;
        const vehicleName = `${vehicle.year} ${makeName} ${modelName}`;
        
        return {
          id: vehicle._id,
          name: vehicleName,
          brand: makeName,
          model: modelName,
          year: vehicle.year,
          price: vehicle.pricing.listPrice,
          discountPrice: undefined,
          isOffer: false,
          featured: vehicle.marketing.featured,
          mileage: vehicle.odometer.value,
          fuelType: vehicle.engine.fuelType.name,
          transmission: vehicle.transmission.type.name,
          images: vehicle.media.images || [],
          slug: vehicle.marketing.slug,
          description: vehicle.marketing.description,
          hstRequired: vehicle.pricing.taxes.hst > 0,
          licensing: vehicle.pricing.taxes.licensing > 0,
          safetyCertified: vehicle.ontario?.safetyStandard.passed || false,
          tradeInsWelcome: false,
          location: undefined,
          phone: undefined,
          carfax: vehicle.carfax?.hasCleanHistory ? 'Clean' : undefined,
          createdAt: vehicle.createdAt,
          updatedAt: vehicle.updatedAt,
        };
      });
    }

    return [];
  } catch (error) {
    console.error('Failed to fetch latest vehicles:', error);
    return [];
  }
}

/**
 * Fetch all vehicles from the API
 */
export async function getVehicles(): Promise<Vehicle[]> {
  try {
    const response = await apiClient.get<VehicleApiResponse>('/vehicles', {
      next: {
        revalidate: 60,
        tags: ['vehicles'],
      },
    });

    if (response.success && response.data?.vehicles) {
      return response.data.vehicles.map((vehicle) => {
        // Extract data from nested API structure
        const makeName = vehicle.make.name;
        const modelName = vehicle.model.name;
        const vehicleName = `${vehicle.year} ${makeName} ${modelName}`;
        
        return {
          id: vehicle._id,
          name: vehicleName,
          brand: makeName,
          model: modelName,
          year: vehicle.year,
          price: vehicle.pricing.listPrice,
          discountPrice: undefined,
          isOffer: false,
          featured: vehicle.marketing.featured,
          mileage: vehicle.odometer.value,
          fuelType: vehicle.engine.fuelType.name,
          transmission: vehicle.transmission.type.name,
          images: vehicle.media.images || [],
          slug: vehicle.marketing.slug,
          description: vehicle.marketing.description,
          hstRequired: vehicle.pricing.taxes.hst > 0,
          licensing: vehicle.pricing.taxes.licensing > 0,
          safetyCertified: vehicle.ontario?.safetyStandard.passed || false,
          tradeInsWelcome: false,
          location: undefined,
          phone: undefined,
          carfax: vehicle.carfax?.hasCleanHistory ? 'Clean' : undefined,
          createdAt: vehicle.createdAt,
          updatedAt: vehicle.updatedAt,
        };
      });
    }

    return [];
  } catch (error) {
    console.error('Failed to fetch vehicles:', error);
    return [];
  }
}

/**
 * Vehicle Search Parameters Interface
 */
export interface VehicleSearchParams {
  q?: string; // Full-text search
  page?: number;
  limit?: number;
  make?: string; // Brand/Make ObjectId
  model?: string; // Model ObjectId
  year?: number;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
  minMileage?: number;
  maxMileage?: number;
  fuelType?: string; // Fuel Type ObjectId
  transmission?: string; // Transmission ObjectId
  drivetrain?: string;
  vehicleType?: string; // Body Type ObjectId
  condition?: 'new' | 'used' | 'certified-pre-owned';
  status?: string;
  featured?: boolean;
  inStock?: boolean;
  accidentHistory?: boolean;
  exteriorColor?: string;
  interiorColor?: string;
  minDoors?: number;
  maxDoors?: number;
  minSeating?: number;
  maxSeating?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'year_desc' | 'year_asc' | 'mileage_asc' | 'mileage_desc' | 'created_desc' | 'created_asc' | 'featured';
}

/**
 * Search vehicles with filters
 * @param params - Search and filter parameters
 */
export async function searchVehicles(params: VehicleSearchParams): Promise<{
  vehicles: Vehicle[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}> {
  try {
    // Build query string from params
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/vehicles?${queryString}` : '/vehicles';

    const response = await apiClient.get<VehicleApiResponse>(endpoint, {
      next: {
        revalidate: 30, // Shorter revalidation for search results
        tags: ['vehicles', 'search'],
      },
    });

    if (response.success && response.data) {
      const vehicles = (response.data.vehicles || []).map((vehicle) => {
        const makeName = vehicle.make.name;
        const modelName = vehicle.model.name;
        const vehicleName = `${vehicle.year} ${makeName} ${modelName}`;
        
        return {
          id: vehicle._id,
          name: vehicleName,
          brand: makeName,
          model: modelName,
          year: vehicle.year,
          price: vehicle.pricing.listPrice,
          discountPrice: undefined,
          isOffer: false,
          featured: vehicle.marketing.featured,
          mileage: vehicle.odometer.value,
          fuelType: vehicle.engine.fuelType.name,
          transmission: vehicle.transmission.type.name,
          images: vehicle.media.images || [],
          slug: vehicle.marketing.slug,
          description: vehicle.marketing.description,
          hstRequired: vehicle.pricing.taxes.hst > 0,
          licensing: vehicle.pricing.taxes.licensing > 0,
          safetyCertified: vehicle.ontario?.safetyStandard.passed || false,
          tradeInsWelcome: false,
          location: undefined,
          phone: undefined,
          carfax: vehicle.carfax?.hasCleanHistory ? 'Clean' : undefined,
          createdAt: vehicle.createdAt,
          updatedAt: vehicle.updatedAt,
        };
      });

      return {
        vehicles,
        pagination: response.data.pagination || {
          total: vehicles.length,
          page: params.page || 1,
          limit: params.limit || 10,
          totalPages: Math.ceil(vehicles.length / (params.limit || 10)),
        },
      };
    }

    return {
      vehicles: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      },
    };
  } catch (error) {
    console.error('Failed to search vehicles:', error);
    return {
      vehicles: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      },
    };
  }
}

/**
 * Fetch a single vehicle by slug
 */
export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  try {
    const response = await apiClient.get<VehicleApiResponse>(`/vehicles/slug/${slug}`, {
      next: {
        revalidate: 60,
        tags: ['vehicles', `vehicle-${slug}`],
      },
    });

    if (response.success && response.data?.vehicles?.[0]) {
      const vehicle = response.data.vehicles[0];
      // Extract data from nested API structure
      const makeName = vehicle.make.name;
      const modelName = vehicle.model.name;
      const vehicleName = `${vehicle.year} ${makeName} ${modelName}`;
      
      return {
        id: vehicle._id,
        name: vehicleName,
        brand: makeName,
        model: modelName,
        year: vehicle.year,
        price: vehicle.pricing.listPrice,
        discountPrice: undefined,
        isOffer: false,
        featured: vehicle.marketing.featured,
        mileage: vehicle.odometer.value,
        fuelType: vehicle.engine.fuelType.name,
        transmission: vehicle.transmission.type.name,
        images: vehicle.media.images || [],
        slug: vehicle.marketing.slug,
        description: vehicle.marketing.description,
        hstRequired: vehicle.pricing.taxes.hst > 0,
        licensing: vehicle.pricing.taxes.licensing > 0,
        safetyCertified: vehicle.ontario?.safetyStandard.passed || false,
        tradeInsWelcome: false,
        location: undefined,
        phone: undefined,
        carfax: vehicle.carfax?.hasCleanHistory ? 'Clean' : undefined,
        createdAt: vehicle.createdAt,
        updatedAt: vehicle.updatedAt,
      };
    }

    return null;
  } catch (error) {
    console.error(`Failed to fetch vehicle ${slug}:`, error);
    return null;
  }
}
