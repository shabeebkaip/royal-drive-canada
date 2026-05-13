/**
 * API Response Types
 * Type definitions for API responses
 */

export interface VehicleType {
  id: string | number;
  name: string;
  image: string;
  slug?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Brand {
  id: string | number;
  name: string;
  logo: string;
  slug?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Vehicle {
  id: string | number;
  name: string;
  brand: string;
  model: string;
  year: number;
  trim?: string;
  condition?: string;
  bodyType?: string;
  drivetrain?: string;
  engineSize?: number;
  cylinders?: number;
  horsepower?: number;
  exteriorColor?: string;
  interiorColor?: string;
  doors?: number;
  seatingCapacity?: number;
  daysInInventory?: number;
  price: number | null;
  discountPrice?: number | null;
  isOffer?: boolean;
  featured?: boolean;
  priceBadge?: 'great_price' | 'good_price' | 'fair_price' | null;
  mileage: number | null;
  fuelType: string;
  transmission: string;
  images: string[];
  slug?: string;
  description?: string;
  hstRequired?: boolean;
  licensing?: boolean;
  safetyCertified?: boolean;
  tradeInsWelcome?: boolean;
  location?: string;
  phone?: string;
  carfax?: {
    hasCleanHistory?: boolean;
    serviceRecords?: number;
    reportUrl?: string;
  };
  numberOfPreviousOwners?: number;
  accidentHistory?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}

// Re-export vehicle detail types for convenience
export type { VehicleDetail, VehicleEnquiry } from './vehicle'

// Re-export filter types for convenience
export type { FuelType, TransmissionType, Model, DropdownOption, VehicleTypeAPI, BrandAPI, ModelAPI, VehicleAPI } from './filters'
