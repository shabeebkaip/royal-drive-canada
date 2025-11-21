/**
 * Business Settings API Service
 * Server-side service for fetching business settings with proper caching
 */

import { BusinessSettings, SettingsApiResponse } from "@/types/settings";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1';

/**
 * Default fallback settings to ensure the app always has data
 */
export const DEFAULT_SETTINGS: BusinessSettings = {
  businessName: "Royal Drive Canada",
  tagline: "Your First Stop for Quality Pre-Owned Vehicles",
  description: "Offering safety-certified, dependable pre-owned cars in the Greater Toronto Area.",
  contactInfo: {
    primaryPhone: "(647) 622-2202",
    primaryEmail: "info@royaldrivecanada.com",
  },
  address: {
    street: "751 Danforth Road",
    city: "Toronto",
    province: "Ontario",
    postalCode: "M1K 1G9",
    country: "Canada",
  },
  socialMedia: {},
  businessHours: [
    { day: "Monday", isOpen: true, openTime: "09:00", closeTime: "18:00" },
    { day: "Tuesday", isOpen: true, openTime: "09:00", closeTime: "18:00" },
    { day: "Wednesday", isOpen: true, openTime: "09:00", closeTime: "18:00" },
    { day: "Thursday", isOpen: true, openTime: "09:00", closeTime: "18:00" },
    { day: "Friday", isOpen: true, openTime: "09:00", closeTime: "18:00" },
    { day: "Saturday", isOpen: true, openTime: "10:00", closeTime: "17:00" },
    { day: "Sunday", isOpen: false },
  ],
  features: {
    enableTestDrive: true,
    enableFinancing: true,
    enableTradeIn: true,
    enableOnlineBooking: true,
    showPricing: true,
  },
  currency: "CAD",
  timezone: "America/Toronto",
  language: "en",
  maintenanceMode: {
    enabled: false,
  },
};

/**
 * Fetch public business settings from API (Server-side)
 * Uses Next.js 14 fetch with built-in caching
 * 
 * @param options - Fetch options for cache control
 * @returns Business settings data
 */
export async function getPublicSettings(options?: {
  revalidate?: number | false;
  tags?: string[];
}): Promise<BusinessSettings> {
  try {
    const response = await fetch(`${API_BASE_URL}/settings/public`, {
      // Revalidate every 5 minutes by default (good balance between freshness and performance)
      next: {
        revalidate: options?.revalidate ?? 300,
        tags: options?.tags ?? ['settings'],
      },
      // Add cache control headers
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });

    if (!response.ok) {
      console.error(`Settings API returned ${response.status}: ${response.statusText}`);
      return DEFAULT_SETTINGS;
    }

    const json: SettingsApiResponse = await response.json();

    if (!json.success || !json.data) {
      console.error('Settings API returned unsuccessful response');
      return DEFAULT_SETTINGS;
    }

    // Merge with defaults to ensure all fields exist
    return {
      ...DEFAULT_SETTINGS,
      ...json.data,
      contactInfo: {
        ...DEFAULT_SETTINGS.contactInfo,
        ...json.data.contactInfo,
      },
      address: {
        ...DEFAULT_SETTINGS.address,
        ...json.data.address,
      },
      socialMedia: {
        ...DEFAULT_SETTINGS.socialMedia,
        ...json.data.socialMedia,
      },
      features: {
        ...DEFAULT_SETTINGS.features,
        ...json.data.features,
      },
    };
  } catch (error) {
    console.error('Error fetching business settings:', error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Fetch public business settings for client-side use
 * Use this only when you need to fetch settings on the client
 * 
 * @returns Business settings data or null on error
 */
export async function getPublicSettingsClient(): Promise<BusinessSettings | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/settings/public`);

    if (!response.ok) {
      return null;
    }

    const json: SettingsApiResponse = await response.json();

    if (!json.success || !json.data) {
      return null;
    }

    return json.data;
  } catch (error) {
    console.error('Error fetching business settings (client):', error);
    return null;
  }
}

/**
 * Format phone number for display
 */
export function formatPhone(phone?: string): string {
  if (!phone) return '';
  return phone;
}

/**
 * Format address for display (single line)
 */
export function formatAddressLine(address?: BusinessSettings['address']): string {
  if (!address) return '';
  const parts = [
    address.street,
    address.city,
    address.province,
    address.postalCode,
  ].filter(Boolean);
  return parts.join(', ');
}

/**
 * Get formatted business hours for a specific day
 */
export function getBusinessHoursForDay(
  businessHours: BusinessSettings['businessHours'],
  day: string
): string {
  const dayHours = businessHours?.find((h) => h.day === day);
  if (!dayHours || !dayHours.isOpen) return 'Closed';
  return `${dayHours.openTime} - ${dayHours.closeTime}`;
}

/**
 * Check if business is currently open
 */
export function isBusinessOpen(businessHours: BusinessSettings['businessHours']): boolean {
  if (!businessHours) return false;

  const now = new Date();
  const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM format

  const todayHours = businessHours.find((h) => h.day === dayName);
  if (!todayHours || !todayHours.isOpen) return false;

  return (
    todayHours.openTime !== undefined &&
    todayHours.closeTime !== undefined &&
    currentTime >= todayHours.openTime &&
    currentTime <= todayHours.closeTime
  );
}
