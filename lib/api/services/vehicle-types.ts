/**
 * Vehicle Types API Service
 * Server-side service for fetching vehicle types with caching and revalidation
 */

import { apiClient } from '../client';
import { VehicleType } from '@/types/api';

interface VehicleTypeApiResponse {
  success: boolean;
  message: string;
  timestamp: string;
  data: VehicleTypeRaw[];
}

interface VehicleTypeRaw {
  _id: string;
  name: string;
  icon?: string;
  slug: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Fetch all vehicle types from the API
 * Uses Next.js 15 cache with revalidation for optimal performance
 * Data is cached and revalidated every 60 seconds (ISR)
 * This ensures fresh data when admin adds new vehicle types
 */
export async function getVehicleTypes(): Promise<VehicleType[]> {
  try {
    const response = await apiClient.get<VehicleTypeApiResponse>('/vehicle-types/dropdown', {
      // Next.js 15 fetch caching with revalidation
      // This will revalidate the cache every 60 seconds
      // ensuring new vehicle types appear within 1 minute
      next: { 
        revalidate: 60, // Revalidate every 60 seconds
        tags: ['vehicle-types'] // Tag for on-demand revalidation
      },
    });

    // Transform API response to match our VehicleType interface
    if (response.success && Array.isArray(response.data)) {
      return response.data.map((type) => ({
        id: type._id, // Use MongoDB _id as the ID
        name: type.name,
        image: type.icon || '', // Map 'icon' to 'image'
        slug: type.slug,
        description: '',
        createdAt: type.createdAt,
        updatedAt: type.updatedAt,
      }));
    }

    return [];
  } catch (error) {
    console.error('Failed to fetch vehicle types:', error);
    // Return empty array as fallback
    // You could also throw the error or return cached data
    return [];
  }
}

/**
 * Fetch a single vehicle type by slug
 */
export async function getVehicleTypeBySlug(slug: string): Promise<VehicleType | null> {
  try {
    const response = await apiClient.get<VehicleTypeApiResponse>(`/vehicle-types/dropdown`, {
      next: { 
        revalidate: 60,
        tags: ['vehicle-types', `vehicle-type-${slug}`]
      },
    });

    if (response.success && Array.isArray(response.data)) {
      const type = response.data.find(t => t.slug === slug);
      if (type) {
        return {
          id: type._id,
          name: type.name,
          image: type.icon || '',
          slug: type.slug,
          description: '',
          createdAt: type.createdAt,
          updatedAt: type.updatedAt,
        };
      }
    }

    return null;
  } catch (error) {
    console.error(`Failed to fetch vehicle type ${slug}:`, error);
    return null;
  }
}
