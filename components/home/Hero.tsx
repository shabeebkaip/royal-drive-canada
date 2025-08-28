import React from 'react'
import Image from 'next/image'
import SearchCard from '@/components/home/SearchCard'

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-gradient-to-br from-blue-900 via-gray-800 to-gray-900">
      {/* Professional Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <Image
            src="/bg.jpg"
            alt="Car dealership showroom"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gray-900/70" />
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="relative z-10 min-h-[85vh] pt-32 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(85vh-10rem)]">

            {/* Left Column - Hero Content */}
            <div className="space-y-8">
              {/* Professional Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span className="text-white/95 text-sm font-semibold">
                  Quality Vehicles for Every Budget
                </span>
              </div>

              {/* Main Headline */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
                  <span className="block">Find Your Perfect</span>
                  <span className="block text-blue-400">Vehicle Today</span>
                </h1>

                <p className="text-lg lg:text-xl text-gray-300 max-w-lg leading-relaxed">
                 {`Discover quality pre-owned vehicles with transparent pricing and safety certifications at Toronto's trusted dealership.`}
                </p>
              </div>

              {/* Compact Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">100+</div>
                  <div className="text-gray-400 text-xs font-medium uppercase tracking-wide">Quality Vehicles</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">10+</div>
                  <div className="text-gray-400 text-xs font-medium uppercase tracking-wide">Vehicles Available</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">100%</div>
                  <div className="text-gray-400 text-xs font-medium uppercase tracking-wide">Safety Certified</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg">
                  Browse All Vehicles
                </button>
                <button className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-lg transition-colors duration-200">
                  Get Pre-Approved
                </button>
              </div>

              {/* Trust Indicators - Moved to left column */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center space-x-2 text-white/90 text-sm">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>All Budgets Welcome</span>
                </div>
                <div className="flex items-center space-x-2 text-white/90 text-sm">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Trade-Ins Accepted</span>
                </div>
              </div>
            </div>

            {/* Right Column - Search Card */}
            <div className="lg:pl-8">
              <SearchCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
