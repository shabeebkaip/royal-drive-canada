import React from 'react'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 flex items-center min-h-screen pb-32">
        <div className="w-full px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-10">
              {/* Trust badge */}
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full border border-gray-200 shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700 tracking-wide">Authorized New Car Dealership</span>
              </div>

              <div className="space-y-8">
                <h1 className="text-6xl lg:text-8xl font-bold text-gray-900 leading-[0.85] tracking-tight">
                  Your new car
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent font-extrabold">
                    showroom
                  </span>
                  <br />
                  <span className="text-4xl lg:text-6xl font-light text-gray-600 tracking-normal">experience</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-gray-600 max-w-xl leading-relaxed font-light">
                  Discover the latest 2024-2025 models in our state-of-the-art showroom. 
                  Brand new vehicles, factory warranties, and unbeatable financing options.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center lg:text-left">
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">500+</div>
                  <div className="text-sm font-medium text-gray-600 tracking-wide uppercase">New vehicles</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">25+</div>
                  <div className="text-sm font-medium text-gray-600 tracking-wide uppercase">Top brands</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">24/7</div>
                  <div className="text-sm font-medium text-gray-600 tracking-wide uppercase">Support</div>
                </div>
              </div>

              {/* Modern CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-5">
                <Link 
                  href="/showroom" 
                  className="group relative bg-blue-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 tracking-wide"
                >
                  <span className="relative z-10">Visit Showroom</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link 
                  href="/new-cars" 
                  className="group bg-white text-gray-900 px-10 py-5 rounded-2xl font-semibold text-lg border-2 border-gray-200 hover:border-blue-600 transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 tracking-wide"
                >
                  Browse New Cars
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
                </Link>
              </div>

              {/* Canadian badges */}
              <div className="flex items-center gap-8 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-4 bg-red-500 relative">
                    <div className="absolute inset-y-0 right-0 w-3 bg-red-600"></div>
                  </div>
                  <span className="text-sm text-gray-600 font-medium tracking-wide">Canadian Dealership</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600 font-medium tracking-wide">Factory Warranty</span>
                </div>
              </div>
            </div>

            {/* Right Content - Modern Car Showcase */}
            <div className="relative lg:pl-8">
              {/* Main showcase card */}
              <div className="relative">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200">
                  {/* Car image placeholder with modern styling */}
                  <div className="relative mb-6">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-48 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                      <div className="relative">
                        <div className="w-32 h-16 bg-gray-800 rounded-lg shadow-lg transform -rotate-1"></div>
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-600 rounded-full"></div>
                        <div className="absolute -top-1 -left-1 w-4 h-4 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Floating elements */}
                    <div className="absolute -top-3 -right-3 bg-blue-500 text-white text-xs px-4 py-2 rounded-full font-semibold shadow-lg tracking-wide">
                      Brand New
                    </div>
                    <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors group">
                      <svg className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                  {/* Car details */}
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 tracking-tight">2025 BMW X3</h3>
                      <p className="text-gray-600 font-light text-lg tracking-wide">xDrive30i • M Sport Package • Premium</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">MSRP</p>
                        <p className="text-3xl font-bold text-green-600 tracking-tight">$62,900 CAD</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">Monthly from</p>
                        <p className="text-3xl font-bold text-blue-600 tracking-tight">$749/mo</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors tracking-wide">
                        Schedule Visit
                      </button>
                      <button className="flex-1 bg-gray-100 text-gray-900 py-4 px-6 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-colors tracking-wide">
                        Get Quote
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating mini cards */}
                <div className="absolute -left-6 top-16 bg-white rounded-2xl shadow-xl p-5 w-36 transform -rotate-3">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600 tracking-tight">2025</div>
                    <div className="text-xs text-gray-600 font-medium tracking-wide uppercase">Latest Models</div>
                  </div>
                </div>

                <div className="absolute -right-6 bottom-16 bg-white rounded-2xl shadow-xl p-5 w-36 transform rotate-3">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600 tracking-tight">0%</div>
                    <div className="text-xs text-gray-600 font-medium tracking-wide uppercase">Financing Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero