'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import type { Vehicle } from '@/types/api'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
// Removed effect-fade to avoid missing CSS issues with mismatched Swiper versions

interface FeaturedCarsSliderProps {
  vehicles: Vehicle[]
}

const FeaturedCarsSlider = ({ vehicles }: FeaturedCarsSliderProps) => {
  // If no vehicles, show fallback
  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 border border-slate-200">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">No featured vehicles available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={vehicles.length > 1}
        className="featured-cars-swiper rounded-2xl sm:rounded-3xl"
      >
        {vehicles.map((vehicle) => {
          const carImage = vehicle.images?.[0] || '/orange-car.webp'
          const carPrice = vehicle.price 
            ? `$${vehicle.price.toLocaleString()}`
            : 'Contact for price'
          const carTitle = vehicle.name
          const carSlug = vehicle.slug ? `/vehicles/${vehicle.slug}` : '/vehicles'

          return (
            <SwiperSlide key={vehicle.id}>
              <Link href={carSlug}>
                <div className="group relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-200 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden">
                  {/* Stock Badge */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 z-10 bg-green-500 text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                    In Stock
                  </div>
                  
                  {/* Car Image */}
                  <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-5 lg:mb-6">
                    <Image
                      src={carImage}
                      alt={carTitle}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                      priority
                    />
                  </div>

                  {/* Car Info */}
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 line-clamp-2">{carTitle}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600">{carPrice}</span>
                      <span className="text-gray-500 text-xs sm:text-sm">+ taxes</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all pt-1">
                      <span className="text-sm sm:text-base">View Details</span>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>

      <style jsx global>{`
        /* Mobile styles */
        @media (max-width: 640px) {
          .featured-cars-swiper .swiper-button-next,
          .featured-cars-swiper .swiper-button-prev {
            width: 36px !important;
            height: 36px !important;
          }
          
          .featured-cars-swiper .swiper-button-next:after,
          .featured-cars-swiper .swiper-button-prev:after {
            font-size: 16px !important;
          }
          
          .featured-cars-swiper .swiper-pagination {
            bottom: 12px !important;
          }
          
          .featured-cars-swiper .swiper-pagination-bullet {
            width: 6px !important;
            height: 6px !important;
            margin: 0 3px !important;
          }
        }
        
        /* Tablet and desktop */
        @media (min-width: 641px) {
          .featured-cars-swiper .swiper-pagination {
            bottom: 20px !important;
          }
        }
      `}</style>


    </div>
  )
}

export default FeaturedCarsSlider
