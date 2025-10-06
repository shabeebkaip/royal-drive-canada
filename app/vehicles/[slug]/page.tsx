import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { 
  Gauge, Fuel, Settings, Car, Check, X, 
  MapPin, Phone, Mail, 
  Shield, FileText, Wrench, Zap, Clock
} from 'lucide-react'
import { ImageGallery, FavoriteButton, BackButton, ShareButton } from '@/components/vehicles/VehicleDetailClient'
import VehicleEnquiryDialog from '@/components/vehicles/VehicleEnquiryDialog'

interface VehicleDetail {
  _id: string
  make: { _id: string; name: string; logo: string; slug: string }
  model: { _id: string; name: string; slug: string }
  year: number
  type: { _id: string; name: string; icon: string; slug: string }
  trim?: string
  engine: {
    size: number
    cylinders: number
    fuelType: { _id: string; name: string; slug: string }
    horsepower: number
  }
  transmission: {
    type: { _id: string; name: string; slug: string }
  }
  drivetrain: { _id: string; name: string; slug: string }
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

// Helper function
const formatMileage = (value: number) => {
  return new Intl.NumberFormat('en-CA').format(value)
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.royaldrivecanada.com/api/v1'
  const { slug } = await params
  
  try {
    // Align with backend cache: 5 minutes (300s)
    // Backend uses: Cache-Control: public, max-age=300, s-maxage=600
    const response = await fetch(`${apiBaseUrl}/vehicles/${slug}`, {
      next: { 
        revalidate: 300, // 5 minutes - matches backend max-age
        tags: [`vehicle-${slug}`] // For on-demand revalidation
      }
    })
    const data = await response.json()
    
    if (data.success && data.data) {
      const vehicle = data.data
      const title = `${vehicle.year} ${vehicle.make.name} ${vehicle.model.name}${vehicle.trim ? ` ${vehicle.trim}` : ''} - Royal Drive Canada`
      const description = vehicle.marketing.description || `Shop this ${vehicle.year} ${vehicle.make.name} ${vehicle.model.name} at Royal Drive Canada. ${formatMileage(vehicle.odometer.value)} km, ${vehicle.engine.fuelType.name}, ${vehicle.transmission.type.name}.`
      
      return {
        title,
        description,
        openGraph: {
          title,
          description,
          images: vehicle.media.images.length > 0 ? [vehicle.media.images[0]] : [],
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description,
          images: vehicle.media.images.length > 0 ? [vehicle.media.images[0]] : [],
        },
      }
    }
  } catch (error) {
    console.error('Failed to generate metadata:', error)
  }
  
  return {
    title: 'Vehicle Details - Royal Drive Canada',
    description: 'View vehicle details at Royal Drive Canada',
  }
}

// Fetch vehicle data on the server
async function getVehicle(slug: string): Promise<VehicleDetail | null> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.royaldrivecanada.com/api/v1'
  
  try {
    // Optimized caching strategy aligned with backend
    // Backend: max-age=300 (5min), s-maxage=600 (10min), stale-while-revalidate=86400 (24h)
    // Next.js ISR: revalidate every 5 minutes to match backend cache
    const response = await fetch(`${apiBaseUrl}/vehicles/${slug}`, {
      next: { 
        revalidate: 300, // 5 minutes - matches backend cache (max-age=300)
        tags: [`vehicle-${slug}`] // Enable on-demand revalidation when vehicle updates
      },
      // Add headers for conditional requests (ETag support)
      headers: {
        'Accept': 'application/json',
      }
    })
    
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`API responded with ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.success && data.data) {
      return data.data
    }
    return null
  } catch (error) {
    console.error('Failed to fetch vehicle:', error)
    return null
  }
}

export default async function VehicleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const vehicle = await getVehicle(slug)

  if (!vehicle) {
    notFound()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatMileageDisplay = (value: number) => {
    return new Intl.NumberFormat('en-CA').format(value)
  }

  const allFeatures = [
    ...vehicle.features.exterior,
    ...vehicle.features.interior,
    ...vehicle.features.safety,
    ...vehicle.features.technology,
    ...vehicle.features.convenience
  ]

  const vehicleName = `${vehicle.year} ${vehicle.make.name} ${vehicle.model.name}`

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <BackButton />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image Gallery */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative aspect-video bg-gray-900">
                {vehicle.media.images.length > 0 ? (
                  <ImageGallery images={vehicle.media.images} vehicleName={vehicleName} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Car className="w-24 h-24 text-gray-600" />
                  </div>
                )}
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className="px-3 py-1.5 rounded-full text-sm font-semibold text-white shadow-lg"
                    style={{ backgroundColor: vehicle.status.color }}
                  >
                    {vehicle.status.name}
                  </span>
                </div>

                {/* Favorite Button */}
                <FavoriteButton />
              </div>
            </div>

            {/* Vehicle Title */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {vehicle.year} {vehicle.make.name} {vehicle.model.name}
                    {vehicle.trim && ` ${vehicle.trim}`}
                  </h1>
                  <p className="text-lg text-gray-600">{vehicle.type.name}</p>
                </div>
                <ShareButton />
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-blue-50 rounded-lg flex-shrink-0">
                    <Gauge className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Mileage</p>
                    <p className="font-semibold text-gray-900">{formatMileage(vehicle.odometer.value)} km</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-green-50 rounded-lg flex-shrink-0">
                    <Fuel className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Fuel Type</p>
                    <p className="font-semibold text-gray-900">{vehicle.engine.fuelType.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-purple-50 rounded-lg flex-shrink-0">
                    <Settings className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Transmission</p>
                    <p className="font-semibold text-gray-900">{vehicle.transmission.type.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-orange-50 rounded-lg flex-shrink-0">
                    <Zap className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Drivetrain</p>
                    <p className="font-semibold text-gray-900">{vehicle.drivetrain.name}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {vehicle.marketing.description && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">{vehicle.marketing.description}</p>
              </div>
            )}

            {/* Specifications */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Specifications</h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                <div className="flex justify-between py-4 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Year</span>
                  <span className="text-sm font-semibold text-gray-900">{vehicle.year}</span>
                </div>
                <div className="flex justify-between py-4 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Make</span>
                  <span className="text-sm font-semibold text-gray-900">{vehicle.make.name}</span>
                </div>
                <div className="flex justify-between py-4 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Model</span>
                  <span className="text-sm font-semibold text-gray-900">{vehicle.model.name}</span>
                </div>
                {vehicle.trim && (
                  <div className="flex justify-between py-4 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Trim</span>
                    <span className="text-sm font-semibold text-gray-900">{vehicle.trim}</span>
                  </div>
                )}
                <div className="flex justify-between py-4 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Body Type</span>
                  <span className="text-sm font-semibold text-gray-900">{vehicle.type.name}</span>
                </div>
                <div className="flex justify-between py-4 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Condition</span>
                  <span className="text-sm font-semibold text-gray-900 capitalize">{vehicle.condition}</span>
                </div>
                <div className="flex justify-between py-4 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Exterior Color</span>
                  <span className="text-sm font-semibold text-gray-900">{vehicle.specifications.exteriorColor}</span>
                </div>
                <div className="flex justify-between py-4 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Interior Color</span>
                  <span className="text-sm font-semibold text-gray-900">{vehicle.specifications.interiorColor}</span>
                </div>
                <div className="flex justify-between py-4 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Doors</span>
                  <span className="text-sm font-semibold text-gray-900">{vehicle.specifications.doors}</span>
                </div>
                <div className="flex justify-between py-4 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Seating</span>
                  <span className="text-sm font-semibold text-gray-900">{vehicle.specifications.seatingCapacity} passengers</span>
                </div>
                <div className="flex justify-between py-4 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Engine Size</span>
                  <span className="text-sm font-semibold text-gray-900">{vehicle.engine.size}L</span>
                </div>
                <div className="flex justify-between py-4 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Cylinders</span>
                  <span className="text-sm font-semibold text-gray-900">{vehicle.engine.cylinders}</span>
                </div>
                <div className="flex justify-between py-4 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Horsepower</span>
                  <span className="text-sm font-semibold text-gray-900">{vehicle.engine.horsepower} HP</span>
                </div>
                <div className="flex justify-between py-4 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Previous Owners</span>
                  <span className="text-sm font-semibold text-gray-900">{vehicle.numberOfPreviousOwners}</span>
                </div>
                <div className="flex justify-between py-4 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {new Date(vehicle.updatedAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Features */}
            {allFeatures.length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Features & Options</h2>
                <div className="space-y-6">
                  {vehicle.features.exterior.length > 0 && (
                    <div>
                      <h3 className="text-md font-semibold text-gray-900 mb-3">Exterior</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {vehicle.features.exterior.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {vehicle.features.interior.length > 0 && (
                    <div>
                      <h3 className="text-md font-semibold text-gray-900 mb-3">Interior</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {vehicle.features.interior.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {vehicle.features.safety.length > 0 && (
                    <div>
                      <h3 className="text-md font-semibold text-gray-900 mb-3">Safety</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {vehicle.features.safety.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {vehicle.features.technology.length > 0 && (
                    <div>
                      <h3 className="text-md font-semibold text-gray-900 mb-3">Technology</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {vehicle.features.technology.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {vehicle.features.convenience.length > 0 && (
                    <div>
                      <h3 className="text-md font-semibold text-gray-900 mb-3">Convenience</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {vehicle.features.convenience.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : vehicle.marketing.description && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Vehicle Description</h2>
                <p className="text-gray-700 leading-relaxed">{vehicle.marketing.description}</p>
              </div>
            )}

            {/* Vehicle History */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Vehicle History</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className={`w-6 h-6 ${vehicle.carfax.hasCleanHistory ? 'text-green-600' : 'text-red-600'}`} />
                    <div>
                      <p className="font-semibold text-gray-900">CARFAX History</p>
                      <p className="text-sm text-gray-600">
                        {vehicle.carfax.hasCleanHistory ? 'Clean history report' : 'History issues reported'}
                      </p>
                    </div>
                  </div>
                  {vehicle.carfax.hasCleanHistory ? (
                    <Check className="w-6 h-6 text-green-600" />
                  ) : (
                    <X className="w-6 h-6 text-red-600" />
                  )}
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Car className={`w-6 h-6 ${vehicle.accidentHistory ? 'text-red-600' : 'text-green-600'}`} />
                    <div>
                      <p className="font-semibold text-gray-900">Accident History</p>
                      <p className="text-sm text-gray-600">
                        {vehicle.accidentHistory ? 'Accidents reported' : 'No accidents reported'}
                      </p>
                    </div>
                  </div>
                  {vehicle.accidentHistory ? (
                    <X className="w-6 h-6 text-red-600" />
                  ) : (
                    <Check className="w-6 h-6 text-green-600" />
                  )}
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Wrench className={`w-6 h-6 ${vehicle.ontario.safetyStandard.passed ? 'text-green-600' : 'text-orange-600'}`} />
                    <div>
                      <p className="font-semibold text-gray-900">Safety Standard</p>
                      <p className="text-sm text-gray-600">
                        {vehicle.ontario.safetyStandard.passed ? 'Safety certified' : 'Safety certification pending'}
                      </p>
                    </div>
                  </div>
                  {vehicle.ontario.safetyStandard.passed ? (
                    <Check className="w-6 h-6 text-green-600" />
                  ) : (
                    <Clock className="w-6 h-6 text-orange-600" />
                  )}
                </div>

                {vehicle.carfax.serviceRecords > 0 && (
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Service Records</p>
                        <p className="text-sm text-gray-600">
                          {vehicle.carfax.serviceRecords} service record{vehicle.carfax.serviceRecords !== 1 ? 's' : ''} available
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Pricing and Contact */}
          <div className="lg:col-span-1 space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 sticky top-6">
              <div className="mb-8">
                <p className="text-sm text-gray-600 mb-2">Price</p>
                <p className="text-4xl font-bold text-gray-900 mb-1">{formatPrice(vehicle.pricing.listPrice)}</p>
                <p className="text-sm text-gray-500">+ HST ({vehicle.pricing.taxes.hst}%)</p>
              </div>

              {vehicle.pricing.financing.available && (
                <div className="p-4 bg-blue-50 rounded-lg mb-6">
                  <p className="text-sm font-semibold text-blue-900 mb-1">Financing Available</p>
                  <p className="text-xs text-blue-700">Ask about our competitive rates</p>
                </div>
              )}

              <div className="space-y-3 mb-8">
                <VehicleEnquiryDialog 
                  vehicle={{
                    id: vehicle._id,
                    slug: vehicle.marketing.slug,
                    year: vehicle.year,
                    make: vehicle.make,
                    model: vehicle.model,
                    stockNumber: vehicle.marketing.slug.toUpperCase(),
                    price: vehicle.pricing.listPrice
                  }}
                />
                <VehicleEnquiryDialog 
                  vehicle={{
                    id: vehicle._id,
                    slug: vehicle.marketing.slug,
                    year: vehicle.year,
                    make: vehicle.make,
                    model: vehicle.model,
                    stockNumber: vehicle.marketing.slug.toUpperCase(),
                    price: vehicle.pricing.listPrice
                  }}
                  trigger={
                    <button className="w-full px-6 py-3.5 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors border-2 border-blue-600">
                      Make an Offer
                    </button>
                  }
                />
                <button className="w-full px-6 py-3.5 bg-gray-50 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                  Get Pre-Approved
                </button>
              </div>

              <div className="pt-6 border-t border-gray-200 space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Call us</p>
                    <p className="text-sm font-semibold text-gray-900">1-800-123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Email us</p>
                    <p className="text-sm font-semibold text-gray-900">info@royaldrive.ca</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Visit us</p>
                    <p className="text-sm font-semibold text-gray-900">123 Main St, Toronto</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Availability</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">In Stock</span>
                  <span className={`text-sm font-semibold ${vehicle.availability.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {vehicle.availability.inStock ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(vehicle.availability.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Calculator Placeholder */}
            <div className="bg-blue-50 rounded-lg shadow-sm border border-blue-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Payment Calculator</h3>
              <p className="text-sm text-gray-600 mb-4">
                Estimate your monthly payments
              </p>
              <button className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Calculate Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
