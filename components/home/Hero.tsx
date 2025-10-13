import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SearchCard from '@/components/home/SearchCard'
import { getFeaturedVehicles } from '@/lib/api'

const Hero = async () => {
  // Fetch a featured vehicle for display
  const featuredVehicles = await getFeaturedVehicles(1)
  const featuredCar = featuredVehicles?.[0]

  // Fallback data if no featured vehicle is available
  const carImage = featuredCar?.images?.[0] || '/orange-car.webp'
  const carPrice = featuredCar?.price 
    ? `$${featuredCar.price.toLocaleString()}`
    : '$8,995'
  const carTitle = featuredCar?.name || 'Featured used car'
  const carSlug = featuredCar?.slug ? `/vehicles/${featuredCar.slug}` : '/vehicles'
  const isInStock = featuredCar ? true : false

  return (
    <section className="relative bg-white">
      {/* Hero Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        
        {/* Top Section: Headline + Featured Car */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          
          {/* Left: Headline & Info */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
              </svg>
              <span className="text-sm font-semibold text-blue-700">
                Toronto's Trusted Used Car Dealership
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Find Your Next
              <span className="block text-blue-600">Used Car</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Quality pre-owned vehicles with transparent pricing, safety certifications, and flexible financing options.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Safety Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Best Prices</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Easy Financing</span>
              </div>
            </div>
          </div>

          {/* Right: Featured Car */}
          <div className="relative">
            <Link href={carSlug}>
              <div className="group relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 border border-slate-200 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden">
                {/* Stock Badge */}
                {isInStock && (
                  <div className="absolute top-6 right-6 z-10 bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                    In Stock
                  </div>
                )}
                
                {/* Car Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={carImage}
                    alt={carTitle}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>

                {/* Car Info */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-gray-900">{carTitle}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-blue-600">{carPrice}</span>
                    <span className="text-gray-500 text-sm">+ taxes</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                    <span>View Details</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>

        </div>

        {/* Bottom Section: Search Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-2">
            <SearchCard />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link href="/vehicles">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
              Browse All Vehicles
            </button>
          </Link>
          <Link href="/sell-your-car">
            <button className="px-8 py-4 bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-200">
              Sell Your Car
            </button>
          </Link>
        </div>

      </div>
    </section>
  )
}

export default Hero
