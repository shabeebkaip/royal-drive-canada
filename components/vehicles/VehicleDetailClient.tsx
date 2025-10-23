'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react'


export function ImageGallery({ images, vehicleName }: { images: string[], vehicleName: string }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (images.length === 0) {
    return null
  }

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  // Touch/Swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      handleNext()
    }
    if (isRightSwipe) {
      handlePrevious()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  return (
    <>
      <div 
        className="relative w-full h-full group bg-white"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={images[selectedImage]}
          alt={vehicleName}
          fill
          className={`${isMobile ? 'object-cover' : 'object-contain'}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
          priority={selectedImage === 0}
        />
        
        {/* Instagram-style dots indicator (Mobile only) */}
        {isMobile && images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === selectedImage
                    ? 'w-8 bg-white shadow-lg'
                    : 'w-1.5 bg-white/60'
                }`}
              />
            ))}
          </div>
        )}

        {/* Desktop: Show swipe navigation arrows on hover */}
        {!isMobile && images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-gray-800/20 hover:bg-gray-800/30 backdrop-blur-sm text-gray-800 rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-lg z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-gray-800/20 hover:bg-gray-800/30 backdrop-blur-sm text-gray-800 rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-lg z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
      
      {/* Thumbnails - Desktop only (hidden on mobile for cleaner Instagram look) */}
      {!isMobile && images.length > 1 && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-5 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? 'border-blue-600 ring-2 ring-blue-200 scale-105'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Image
                  src={image}
                  alt={`${vehicleName} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="10vw"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export function FavoriteButton() {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <button
      onClick={() => setIsFavorite(!isFavorite)}
      className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full transition-colors shadow-lg"
    >
      <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
    </button>
  )
}

export function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
    >
      <ChevronLeft className="w-5 h-5" />
      <span className="font-medium">Back to Inventory</span>
    </button>
  )
}

export function ShareButton() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Share canceled', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <button 
      onClick={handleShare}
      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <Share2 className="w-6 h-6 text-gray-600" />
    </button>
  )
}
