import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SearchCard from '@/components/home/SearchCard'
import { getFeaturedVehicles } from '@/lib/api'
import FeaturedCarsSlider from '@/components/home/FeaturedCarsSlider'

const Hero = async () => {
  // Fetch featured vehicles for the slider
  const featuredVehicles = await getFeaturedVehicles(6)

  return (
    <section className="relative bg-white">
      {/* Hero Container - Less padding on mobile (no mega menu), more on lg+ (with mega menu) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-24 lg:pt-40 pb-12 sm:pb-16">
        
        {/* Top Section: Headline + Featured Car */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-8 sm:mb-12">
          
          {/* Left: Headline & Info */}
          <div className="space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 border border-blue-200 rounded-full">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
              </svg>
              <span className="text-xs sm:text-sm font-semibold text-blue-700">
                Toronto's Trusted Used Car Dealership
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Find Your Next
              <span className="block text-blue-600">Used Car</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
              Quality pre-owned vehicles with transparent pricing, safety certifications, and flexible financing options.
            </p>

            <div className="flex flex-wrap gap-4 sm:gap-6 pt-2 sm:pt-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-gray-700 font-medium">Safety Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-gray-700 font-medium">Best Prices</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-gray-700 font-medium">Easy Financing</span>
              </div>
            </div>
          </div>

          {/* Right: Featured Cars Slider - Hidden on mobile */}
          <div className="relative hidden lg:block">
            <FeaturedCarsSlider vehicles={featuredVehicles} />
          </div>

        </div>

        {/* Bottom Section: Search Card */}
        <div className="container mx-auto mb-8 sm:mb-12">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 p-1.5 sm:p-2">
            <SearchCard />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link href="/vehicles" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base">
              Browse All Vehicles
            </button>
          </Link>
          <Link href="/sell-your-car" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-200 text-sm sm:text-base">
              Sell Your Car
            </button>
          </Link>
        </div>

      </div>
    </section>
  )
}

export default Hero
