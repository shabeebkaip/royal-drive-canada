import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SearchCard from '@/components/home/SearchCard'
import { Shield, Tag, CreditCard } from 'lucide-react'

const POPULAR_SEARCHES = ['SUV', 'Truck', 'Sedan', 'BMW', 'Honda', 'Toyota', 'Audi']

const STATS = [
  {
    icon: (
      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
      </svg>
    ),
    value: '500+ Vehicles',
    sub: 'Wide selection across Toronto',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    value: 'Safety Certified',
    sub: 'All vehicles inspected & certified',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    value: 'Financing Available',
    sub: 'Competitive rates, quick approval',
  },
]

const Hero = async () => {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white min-h-[85vh] flex flex-col">

        {/* Background image — full bleed */}
        <Image
          src="/hero-background.png"
          alt="Royal Drive hero"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Left panel: opaque white where text lives, fades to transparent on the right */}
        <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-white via-white/92 to-transparent" />
        {/* Bottom fade so search card sits cleanly */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/70 to-transparent" />

        {/* Flex layout: navbar spacer → text (flex-1 centered) → search pinned to bottom */}
        <div className="relative z-10 flex flex-col flex-1 container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Navbar spacer — accounts for double navbar on large screens */}
          <div className="h-[130px] lg:h-[160px] flex-shrink-0" />

          {/* Hero text — grows and centers itself in the remaining space */}
          <div className="flex-1 flex flex-col justify-center pb-8">
            <div className="max-w-xl space-y-5 sm:space-y-6">

              {/* Trust badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50">
                <span className="text-sm leading-none">🇨🇦</span>
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-widest">
                  Canada's Trusted Used Car Dealership
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-[4.25rem] font-extrabold text-gray-900 leading-[1.04] tracking-tight">
                Find Your Next<br />Used Car
              </h1>

              {/* Subtitle */}
              <p className="text-base lg:text-lg text-gray-500 leading-relaxed max-w-md">
                Quality pre-owned vehicles with transparent pricing, safety certifications, and flexible financing options.
              </p>

              {/* Feature badges */}
              <div className="flex flex-wrap gap-x-5 gap-y-3 pt-1">
                {[
                  { icon: <Shield className="w-4 h-4 text-blue-600" />, label: 'Safety Certified', sub: 'All vehicles inspected' },
                  { icon: <Tag className="w-4 h-4 text-blue-600" />, label: 'Best Prices', sub: 'Market competitive' },
                  { icon: <CreditCard className="w-4 h-4 text-blue-600" />, label: 'Easy Financing', sub: 'Pre-approved options' },
                ].map(({ icon, label, sub }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                      {icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 leading-none">{label}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Search card — pinned to bottom of hero */}
          <div className="pb-10 lg:pb-14">
            <div className="bg-white rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.10)] border border-gray-100 overflow-hidden">
              <SearchCard />
            </div>
          </div>

        </div>

      </section>

      {/* ── Popular searches ── */}
      <div className="border-t border-gray-100 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center flex-wrap gap-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-1">Popular:</span>
          {POPULAR_SEARCHES.map((tag) => (
            <Link
              key={tag}
              href={`/vehicles?search=${encodeURIComponent(tag)}`}
              className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-semibold text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {STATS.map((stat) => (
              <div key={stat.value} className="flex items-center gap-4 py-5 px-2">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Hero
