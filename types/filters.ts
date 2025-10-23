/**
 * Filter Types
 * Type definitions for vehicle search and filter components
 */

export interface FuelType {
  _id: string
  name: string
  slug: string
  active?: boolean
}

export interface TransmissionType {
  _id: string
  name: string
  slug: string
  active?: boolean
}

export interface Model {
  _id: string
  name: string
  make: string | {
    _id: string
    name: string
    slug: string
  }
  slug: string
  active?: boolean
}

export interface DropdownOption {
  value: string | number
  label: string
}

/**
 * API Response Types
 */
export interface VehicleTypeAPI {
  _id: string
  name: string
  icon?: string
  image?: string
  slug: string
  active?: boolean
}

export interface BrandAPI {
  _id: string
  name: string
  logo: string
  slug: string
  active?: boolean
}

export interface ModelAPI {
  _id: string
  name: string
  make: {
    _id: string
    name: string
    slug: string
  }
  slug: string
  active?: boolean
}

export interface VehicleAPI {
  _id: string
  year: number
  make: {
    name: string
  }
  model: {
    name: string
  }
  pricing: {
    listPrice: number
  }
  odometer: {
    value: number
  }
  engine: {
    fuelType: {
      name: string
    }
  }
  transmission: {
    type: {
      name: string
    }
  }
  media: {
    images?: string[]
  }
  marketing: {
    slug: string
    description?: string
    featured?: boolean
  }
  status?: {
    _id: string
    name: string
    color: string
    slug: string
    isDefault?: boolean
    active?: boolean
  }
  ontario?: {
    safetyStandard: {
      passed: boolean
    }
  }
  carfax?: {
    hasCleanHistory: boolean
    serviceRecords?: number
    reportUrl?: string
  }
  numberOfPreviousOwners?: number
  accidentHistory?: boolean
  createdAt: string
  updatedAt: string
}
