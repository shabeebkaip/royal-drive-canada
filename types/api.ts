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
