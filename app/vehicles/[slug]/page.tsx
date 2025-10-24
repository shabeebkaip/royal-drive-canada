import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { 
  Gauge, Fuel, Settings, Car, Check, X, 
  MapPin, Phone, Mail, 
  Shield, FileText, Wrench, Zap, Clock
} from 'lucide-react'
import { ImageGallery, FavoriteButton, BackButton, ShareButton } from '@/components/vehicles/detailPage/VehicleDetailClient'
import VehicleEnquiryDialog from '@/components/vehicles/VehicleEnquiryDialog'
import { VehicleDetail } from '@/types/vehicle'
import './vehicle-description.css'
import Specifications from '@/components/vehicles/detailPage/Specifications'
import VehicleHistory from '@/components/vehicles/detailPage/VehicleHistory'

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

  const allFeatures = [
    ...vehicle.features.exterior,
    ...vehicle.features.interior,
    ...vehicle.features.safety,
    ...vehicle.features.technology,
    ...vehicle.features.convenience
  ]

  const vehicleName = `${vehicle.year} ${vehicle.make.name} ${vehicle.model.name}`
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <BackButton />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-12 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Main Image Gallery */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative aspect-video bg-white">
                {vehicle.media.images.length > 0 ? (
                  <ImageGallery images={vehicle.media.images} vehicleName={vehicleName} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
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
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {vehicle.year} {vehicle.make.name} {vehicle.model.name}
                    {vehicle.trim && ` ${vehicle.trim}`}
                  </h1>
                  <p className="text-base sm:text-lg text-gray-600">{vehicle.type.name}</p>
                </div>
                <div className="ml-2 flex-shrink-0">
                  <ShareButton />
                </div>
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 pt-4 sm:pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-50 rounded flex-shrink-0">
                    <Gauge className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Mileage</p>
                    <p className="font-semibold text-gray-900">{formatMileage(vehicle.odometer.value)} km</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-50 rounded flex-shrink-0">
                    <Fuel className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Fuel Type</p>
                    <p className="font-semibold text-gray-900">{vehicle.engine.fuelType.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-50 rounded flex-shrink-0">
                    <Settings className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Transmission</p>
                    <p className="font-semibold text-gray-900">{vehicle.transmission.type.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-50 rounded flex-shrink-0">
                    <Zap className="w-5 h-5 text-gray-700" />
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
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Description</h2>
                <div 
                  className="vehicle-description-content"
                  dangerouslySetInnerHTML={{ __html: vehicle.marketing.description }}
                />
              </div>
            )}

            {/* Specifications */}
            <Specifications vehicle={vehicle} />

            {/* Features */}
            {allFeatures.length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Features & Options</h2>
                <div className="space-y-4 sm:space-y-6">
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
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Vehicle Description</h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{vehicle.marketing.description}</p>
              </div>
            )}

            {/* Vehicle History */}
            <VehicleHistory vehicle={vehicle} />
          </div>

          {/* Right Column - Pricing and Contact */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 lg:sticky lg:top-6">
              <div className="mb-6 sm:mb-8">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Price</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">{formatPrice(vehicle.pricing.listPrice)}</p>
                <p className="text-xs sm:text-sm text-gray-500">+ Taxes and Licensing fee</p>
              </div>

              {vehicle.pricing.financing.available && (
                <div className="p-3 sm:p-4 bg-blue-50 rounded-lg mb-4 sm:mb-6">
                  <p className="text-xs sm:text-sm font-semibold text-blue-900 mb-1">Financing Available</p>
                  <p className="text-xs text-blue-700">Ask about our competitive rates</p>
                </div>
              )}

              <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
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
              </div>

              <div className="pt-4 sm:pt-6 border-t border-gray-200 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Call us</p>
                    <a href="tel:+16476222202" className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                      (647) 622-2202
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Email us</p>
                    <a href="mailto:royaldrivemotor@gmail.com" className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                      royaldrivemotor@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Visit us</p>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=751+Danforth+Rd+Toronto+ON" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      751 Danforth Rd, Toronto, ON
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">Availability</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between py-1.5 sm:py-2">
                  <span className="text-xs sm:text-sm text-gray-600">In Stock</span>
                  <span className={`text-xs sm:text-sm font-semibold ${vehicle.availability.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {vehicle.availability.inStock ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 sm:py-2 border-t border-gray-100">
                  <span className="text-xs sm:text-sm text-gray-600">Last Updated</span>
                  <span className="text-xs sm:text-sm font-medium text-gray-900">
                    {new Date(vehicle.availability.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
