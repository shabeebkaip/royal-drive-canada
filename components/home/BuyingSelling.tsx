'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, ShieldCheck, Truck } from 'lucide-react'

const BuyingSelling = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            {`Your Journey Starts Here`}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {`Whether you're buying your dream car or selling your current one, we make the process seamless and stress-free.`}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Buying Card */}
          <div className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-md min-h-[600px] shadow-xl hover:shadow-2xl border border-white/20 transition-all duration-500 hover:scale-[1.02]">
            {/* Background Image with enhanced overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage: `url('/car-buy.jpg')`,
                backgroundPosition: 'center bottom'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/80 to-white/60"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10"></div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-8 right-8 w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-blue-200/50 group-hover:rotate-12 transition-transform duration-300">
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Find Your Dream</span>
                </div>

                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Buying<br />
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">a used car?</span>
                </h3>

                <p className="text-gray-600 text-lg mb-8 max-w-md leading-relaxed">
                  {`Leave the headache to us and focus on what matters most – finding your perfect ride with confidence.`}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600">Safety Certified Vehicles</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600">Transparent Pricing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600">Expert Inspection</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto">
                <Link 
                  href="/inventories"
                  className="group/btn inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Explore Used Cars
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>

          {/* Selling Card */}
          <div className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-md min-h-[600px] shadow-xl hover:shadow-2xl border border-white/20 transition-all duration-500 hover:scale-[1.02]">
            {/* Background Image with enhanced overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage: `url('/car-sell.jpg')`,
                backgroundPosition: 'center bottom'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/80 to-white/60"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10"></div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-8 right-8 w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-emerald-200/50 group-hover:rotate-12 transition-transform duration-300">
              <Sparkles className="w-8 h-8 text-emerald-600" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Get Fair Value</span>
                </div>

                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Selling<br />
                  <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">a used car?</span>
                </h3>

                <p className="text-gray-600 text-lg mb-8 max-w-md leading-relaxed">
                  We take care of everything, so you can focus on what matters most – getting the best deal for your vehicle.
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600">Free Vehicle Appraisal</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600">Instant Cash Offers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600">Hassle-Free Process</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <Link
                  href="/sell"
                  className="group/btn inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Sell My Car
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md rounded-full px-6 py-3 border border-white/30 shadow-lg">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="text-gray-700 font-medium">{`Trade-ins welcome • OMVIC & UCDA Registered`}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BuyingSelling
