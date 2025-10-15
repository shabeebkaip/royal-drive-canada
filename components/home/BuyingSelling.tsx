'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, ShieldCheck, Truck } from 'lucide-react'

const BuyingSelling = () => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Buy or Sell With Confidence
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            {`Professional service whether you're buying your next vehicle or selling your current one`}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Buying Card */}
          <div className="group relative overflow-hidden rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-15"
              style={{
                backgroundImage: `url('/car-sell.jpg')`,
                backgroundPosition: 'center bottom'
              }}
            />
            
            {/* Content */}
            <div className="relative z-10 p-6 sm:p-8 min-h-[400px] flex flex-col">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-blue-600 font-semibold text-sm">Buying</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Find Your Perfect Vehicle
                </h3>

                <p className="text-sm sm:text-base text-gray-600 mb-6">
                  Browse our inventory of quality pre-owned vehicles with transparent pricing and detailed vehicle history.
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Safety certified vehicles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Transparent pricing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Professional inspection</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <Link 
                  href="/vehicles"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors text-sm"
                >
                  Browse Vehicles
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Selling Card */}
          <div className="group relative overflow-hidden rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-15"
              style={{
                backgroundImage: `url('/car-buy.jpg')`,
                backgroundPosition: 'center bottom'
              }}
            />
            
            {/* Content */}
            <div className="relative z-10 p-6 sm:p-8 min-h-[400px] flex flex-col">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-green-600 font-semibold text-sm">Selling</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Get Top Value for Your Car
                </h3>

                <p className="text-sm sm:text-base text-gray-600 mb-6">
                  Quick and easy process to sell your vehicle. Get a fair market value offer with no hidden fees.
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Free vehicle appraisal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Competitive cash offers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Fast and simple process</span>
                  </li>
                </ul>
              </div>

              <div>
                <Link
                  href="/sell-your-car"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors text-sm"
                >
                  Sell Your Car
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Trade-ins welcome • OMVIC & UCDA Registered
          </p>
        </div>
      </div>
    </section>
  )
}

export default BuyingSelling
