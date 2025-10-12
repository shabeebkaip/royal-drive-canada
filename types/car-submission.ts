/**
 * Car Submission Types
 * Type definitions for the sell your car feature
 */

// Vehicle Condition Types
export type VehicleCondition = 'excellent' | 'good' | 'fair' | 'poor'

// Contact Method Types
export type ContactMethod = 'email' | 'phone' | 'either'

// Contact Time Types
export type ContactTime = 'Morning' | 'Afternoon' | 'Evening' | 'Anytime'

// Submission Status Types
export type SubmissionStatus = 
  | 'new'
  | 'under_review'
  | 'contacted'
  | 'inspection_scheduled'
  | 'offer_made'
  | 'accepted'
  | 'declined'
  | 'completed'
  | 'cancelled'

// Vehicle Information
export interface VehicleInfo {
  make: string
  model: string
  year: number
  vin?: string
  mileage: number
  condition: VehicleCondition
  trim?: string
  bodyType?: string
  exteriorColor?: string
  interiorColor?: string
  transmission?: string
  fuelType?: string
  drivetrain?: string
  engineSize?: string
}

// Owner Information
export interface OwnerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  preferredContactMethod?: ContactMethod
  preferredContactTime?: ContactTime | string
}

// Pricing Information
export interface PricingInfo {
  expectedPrice: number
  reasonForSelling?: string
}

// Media Information
export interface MediaInfo {
  images?: string[]
}

// Complete Car Submission Data
export interface CarSubmissionData {
  vehicle: VehicleInfo
  owner: OwnerInfo
  pricing: PricingInfo
  media?: MediaInfo
}

// API Response Data
export interface SubmissionData {
  id: string
  submissionNumber: string
  status: SubmissionStatus
  submittedAt: string
  vehicle: {
    make: string
    model: string
    year: number
    mileage: number
    condition: VehicleCondition
  }
  owner: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  estimatedResponseTime: string
}

// API Response
export interface CarSubmissionResponse {
  success: boolean
  message: string
  data: SubmissionData
}

// API Error Response
export interface CarSubmissionError {
  success: false
  error: string
  details?: Array<{
    field: string
    message: string
  }>
}

// Image Upload Response
export interface ImageUploadData {
  url: string
  secureUrl: string
  publicId: string
  resourceType: string
  format: string
  bytes: number
  width: number
  height: number
  originalFilename: string
}

export interface ImageUploadResponse {
  success: boolean
  message: string
  timestamp: string
  data: ImageUploadData
}

// Component Props
export interface ImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
}

// Form State Type
export interface SellCarFormState {
  vehicle: VehicleInfo
  owner: OwnerInfo
  pricing: PricingInfo
  images: string[]
}
