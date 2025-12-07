/**
 * Filters API Service
 * Server-side service for fetching all filter options with parallel requests and caching
 */

import { apiClient } from '../client';
import { FuelType, TransmissionType } from '@/types/api';
import { BrandAPI, VehicleTypeAPI } from '@/types/filters';

interface FuelTypesResponse {
  success: boolean;
  message: string;
  timestamp: string;
  data: {
    fuelTypes: FuelType[];
  };
}

interface TransmissionsResponse {
  success: boolean;
  message: string;
  timestamp: string;
  data: {
    transmissions: TransmissionType[];
  };
}

interface BrandDropdownResponse {
  success: boolean;
  message: string;
  timestamp: string;
  data: BrandAPI[];
}

interface VehicleTypeDropdownResponse {
  success: boolean;
  message: string;
  timestamp: string;
  data: VehicleTypeAPI[];
}

export interface FilterOptions {
  brands: BrandAPI[];
  bodyTypes: VehicleTypeAPI[];
  fuelTypes: FuelType[];
  transmissions: TransmissionType[];
}

/**
 * Fetch all filter options in parallel
 * Uses Next.js 15 cache with revalidation for optimal performance
 * All requests are made in parallel for maximum speed
 */
export async function getFilterOptions(): Promise<FilterOptions> {
  try {
    // Fetch all filter options in parallel for maximum performance
    const [brandsResponse, bodyTypesResponse, fuelTypesResponse, transmissionsResponse] = 
      await Promise.all([
        apiClient.get<BrandDropdownResponse>('/makes/dropdown', {
          next: { 
            revalidate: 300, // 5 minutes - filters don't change often
            tags: ['brands', 'filters'] 
          },
        }),
        apiClient.get<VehicleTypeDropdownResponse>('/vehicle-types/dropdown', {
          next: { 
            revalidate: 300, // 5 minutes
            tags: ['vehicle-types', 'filters'] 
          },
        }),
        apiClient.get<FuelTypesResponse>('/fuel-types', {
          next: { 
            revalidate: 300, // 5 minutes
            tags: ['fuel-types', 'filters'] 
          },
        }),
        apiClient.get<TransmissionsResponse>('/transmissions', {
          next: { 
            revalidate: 300, // 5 minutes
            tags: ['transmissions', 'filters'] 
          },
        }),
      ]);

    // Extract and filter data
    const brands = brandsResponse.success && brandsResponse.data 
      ? brandsResponse.data 
      : [];

    const bodyTypes = bodyTypesResponse.success && bodyTypesResponse.data 
      ? bodyTypesResponse.data 
      : [];

    const fuelTypes = fuelTypesResponse.success && fuelTypesResponse.data?.fuelTypes 
      ? fuelTypesResponse.data.fuelTypes.filter((ft) => ft.active) 
      : [];

    const transmissions = transmissionsResponse.success && transmissionsResponse.data?.transmissions 
      ? transmissionsResponse.data.transmissions.filter((t) => t.active) 
      : [];

    return {
      brands,
      bodyTypes,
      fuelTypes,
      transmissions,
    };
  } catch (error) {
    console.error('Failed to fetch filter options:', error);
    // Return empty arrays as fallback
    return {
      brands: [],
      bodyTypes: [],
      fuelTypes: [],
      transmissions: [],
    };
  }
}

/**
 * Fetch models for a specific brand
 */
interface ModelDropdownResponse {
  success: boolean;
  message: string;
  timestamp: string;
  data: Array<{
    _id: string;
    name: string;
    slug: string;
    make: {
      _id: string;
      name: string;
    };
  }>;
}

export async function getModelsByBrand(brandId: string) {
  try {
    const response = await apiClient.get<ModelDropdownResponse>('/models/dropdown', {
      next: { 
        revalidate: 300, // 5 minutes
        tags: ['models', `models-${brandId}`] 
      },
    });

    if (response.success && response.data) {
      return response.data.filter((model) => model.make._id === brandId);
    }

    return [];
  } catch (error) {
    console.error('Failed to fetch models:', error);
    return [];
  }
}
