import React from 'react'
import Link from 'next/link'

const BuyingSelling = () => {
  return (
    <section className="py-16 bg-[#0c1444]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Buying Card */}
          <div className="relative overflow-hidden rounded-3xl bg-white min-h-[500px]">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/car-buy.jpg')`,
                backgroundPosition: 'center bottom'
              }}
            >
              {/* Intelligent gradient overlay - stronger at top for text, lighter at bottom for image visibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-transparent"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#0c1444] mb-6 leading-tight">
                  Buying<br />a used car?
                </h2>
                <p className="text-gray-700 text-lg mb-8 max-w-md">
                  Leave the headache to us and focus on what matters, your new ride.
                </p>
              </div>
              
              <div className="mt-auto">
                <Link 
                  href="/inventory" 
                  className="inline-block bg-[#0042c9] hover:bg-blue-800 text-white font-medium px-10 py-4 rounded-full transition-colors"
                >
                  Explore used cars
                </Link>
              </div>
            </div>
          </div>

          {/* Selling Card */}
          <div className="relative overflow-hidden rounded-3xl bg-[#f2f6ff] min-h-[500px]">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/car-sell.jpg')`,
                backgroundPosition: 'center bottom'
              }}
            >
              {/* Intelligent gradient overlay - stronger at top for text, lighter at bottom for image visibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#f2f6ff]/80 via-[#f2f6ff]/40 to-transparent"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#0c1444] mb-6 leading-tight">
                  Selling<br />a used car?
                </h2>
                <p className="text-gray-700 text-lg mb-8 max-w-md">
                  We take care of everything, so you can focus on what matters, getting a fair deal.
                </p>
              </div>
              
              {/*<div className="mt-auto">*/}
              {/*  <Link */}
              {/*    href="/sell" */}
              {/*    className="inline-block bg-[#0042c9] hover:bg-blue-800 text-white font-medium px-10 py-4 rounded-full transition-colors"*/}
              {/*  >*/}
              {/*    Sell my car*/}
              {/*  </Link>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BuyingSelling
