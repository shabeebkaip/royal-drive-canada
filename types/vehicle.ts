/**
 * Vehicle Detail Types
 * Comprehensive type definitions for vehicle details from API
 */

export interface VehicleDetail {
  _id: string
  make: { 
    _id: string
    name: string
    logo: string
    slug: string 
  }
  model: { 
    _id: string
    name: string
    slug: string 
  }
  year: number
  type: { 
    _id: string
    name: string
    icon: string
    slug: string 
  }
  trim?: string
  engine: {
    size: number
    cylinders: number
    fuelType: { 
      _id: string
      name: string
      slug: string 
    }
    horsepower: number
  }
  transmission: {
    type: { 
      _id: string
      name: string
      slug: string 
    }
  }
  drivetrain: { 
    _id: string
    name: string
    slug: string 
  }
  odometer: {
    value: number
    unit: string
    isAccurate: boolean
  }
  condition: string
  accidentHistory: boolean
  numberOfPreviousOwners: number
  carfax: {
    hasCleanHistory: boolean
    serviceRecords: number
  }
  pricing: {
    listPrice: number
    currency: string
    taxes: {
      hst: number
      licensing: number
    }
    financing: {
      available: boolean
    }
  }
  features: {
    exterior: string[]
    interior: string[]
    safety: string[]
    technology: string[]
    convenience: string[]
  }
  specifications: {
    exteriorColor: string
    interiorColor: string
    doors: number
    seatingCapacity: number
  }
  status: {
    _id: string
    name: string
    color: string
    slug: string
  }
  availability: {
    inStock: boolean
    lastUpdated: string
  }
  media: {
    images: string[]
    videos: string[]
    documents: string[]
  }
  ontario: {
    safetyStandard: {
      passed: boolean
    }
    emissionTest: {
      required: boolean
    }
    uvip: {
      required: boolean
      cost: number
    }
  }
  marketing: {
    featured: boolean
    description: string
    keywords: string[]
    slug: string
  }
  createdAt: string
  updatedAt: string
}

/**
 * Vehicle Enquiry Types
 */
export interface VehicleEnquiry {
  id: string
  slug: string
  year: number
  make: {
    _id: string
    name: string
    logo: string
    slug: string
  }
  model: {
    _id: string
    name: string
    slug: string
  }
  stockNumber: string
  price: number
}
