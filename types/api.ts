/**
 * API Response Types
 * Type definitions for API responses
 */

export interface VehicleType {
  id: number;
  name: string;
  image: string;
  slug?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  slug?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  discountPrice?: number | null;
  isOffer?: boolean;
  featured?: boolean;
  mileage: number;
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
  carfax?: string;
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
