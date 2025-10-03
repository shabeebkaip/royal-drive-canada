/**
 * Brands (Makes) API Service
 * Server-side service for fetching vehicle brands/makes with caching and revalidation
 */

import { apiClient } from '../client';
import { Brand } from '@/types/api';

interface BrandApiResponse {
  success: boolean;
  message: string;
  timestamp: string;
  data: {
    makes: BrandRaw[];
  };
}

interface BrandRaw {
  _id: string;
  id: string;
  name: string;
  logo: string;
  slug: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Fetch all brands (makes) from the API
 * Uses Next.js 15 cache with revalidation for optimal performance
 * Data is cached and revalidated every 60 seconds (ISR)
 * This ensures fresh data when admin adds new brands
 */
export async function getBrands(): Promise<Brand[]> {
  try {
    const response = await apiClient.get<BrandApiResponse>('/makes', {
      // Next.js 15 fetch caching with revalidation
      // This will revalidate the cache every 60 seconds
      // ensuring new brands appear within 1 minute
      next: { 
        revalidate: 60, // Revalidate every 60 seconds
        tags: ['brands', 'makes'] // Tags for on-demand revalidation
      },
    });

    // Transform API response to match our Brand interface
    if (response.success && response.data?.makes) {
      return response.data.makes
        .filter(brand => brand.active) // Only return active brands
        .map((brand) => ({
          id: brand._id,
          name: brand.name,
          logo: brand.logo,
          slug: brand.slug,
          active: brand.active,
          createdAt: brand.createdAt,
          updatedAt: brand.updatedAt,
        }));
    }

    return [];
  } catch (error) {
    console.error('Failed to fetch brands:', error);
    // Return empty array as fallback
    return [];
  }
}

/**
 * Fetch a single brand by slug
 */
export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  try {
    const response = await apiClient.get<BrandApiResponse>(`/makes/slug/${slug}`, {
      next: { 
        revalidate: 60,
        tags: ['brands', `brand-${slug}`]
      },
    });

    if (response.success && response.data?.makes?.[0]) {
      const brand = response.data.makes[0];
      return {
        id: brand._id,
        name: brand.name,
        logo: brand.logo,
        slug: brand.slug,
        active: brand.active,
        createdAt: brand.createdAt,
        updatedAt: brand.updatedAt,
      };
    }

    return null;
  } catch (error) {
    console.error(`Failed to fetch brand ${slug}:`, error);
    return null;
  }
}
