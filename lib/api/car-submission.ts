// Car Submission API Service

export interface CarSubmissionData {
  vehicle: {
    make: string
    model: string
    year: number
    vin?: string
    mileage: number
    condition: 'excellent' | 'good' | 'fair' | 'poor'
    trim?: string
    bodyType?: string
    exteriorColor?: string
    interiorColor?: string
    transmission?: string
    fuelType?: string
    drivetrain?: string
    engineSize?: string
  }
  owner: {
    firstName: string
    lastName: string
    email: string
    phone: string
    preferredContactMethod?: 'email' | 'phone' | 'either'
    preferredContactTime?: string
  }
  pricing: {
    expectedPrice: number
    reasonForSelling?: string
  }
  media?: {
    images?: string[]
  }
}

export interface CarSubmissionResponse {
  success: boolean
  message: string
  data: {
    id: string
    submissionNumber: string
    status: string
    submittedAt: string
    vehicle: {
      make: string
      model: string
      year: number
      mileage: number
      condition: string
    }
    owner: {
      firstName: string
      lastName: string
      email: string
      phone: string
    }
    estimatedResponseTime: string
  }
}

export async function submitCar(data: CarSubmissionData): Promise<CarSubmissionResponse> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.royaldrivecanada.com/api/v1'
  
  const response = await fetch(`${apiBaseUrl}/car-submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || errorData.message || 'Failed to submit car')
  }

  return response.json()
}
