import React from 'react'
import Image from 'next/image'
import SearchCard from '@/components/home/SearchCard'

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/bg.jpg"
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
      </div>

      <div className="relative z-10 flex flex-col justify-center items-start h-full pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl mb-16 lg:mb-24">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-white mb-4">
              Search Less.<br />Live More.
            </h1>
            <p className="text-white/90 text-lg lg:text-xl max-w-2xl">
              Find your perfect car from Canada's most trusted new-car dealership.
            </p>
          </div>
          {/* Search card matches Figma design */}
          <div className="relative">
            <SearchCard />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
