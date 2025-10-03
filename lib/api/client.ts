/**
 * API Client Configuration
 * Centralized API client with proper error handling and type safety
 */

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.royaldrivecanada.com/api/v1';

interface ApiError {
  message: string;
  status: number;
  details?: unknown;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Generic fetch wrapper with error handling
   */
  async fetch<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const error: ApiError = {
          message: `API Error: ${response.statusText}`,
          status: response.status,
        };
        throw error;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to fetch ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.fetch<T>(endpoint, {
      ...options,
      method: 'GET',
    });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data: unknown, options?: RequestInit): Promise<T> {
    return this.fetch<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);
