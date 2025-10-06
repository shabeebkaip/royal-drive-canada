'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Heart, Share2, ChevronLeft } from 'lucide-react'


export function ImageGallery({ images, vehicleName }: { images: string[], vehicleName: string }) {
  const [selectedImage, setSelectedImage] = useState(0)

  if (images.length === 0) {
    return null
  }

  return (
    <>
      <div className="relative w-full h-full">
        <Image
          src={images[selectedImage]}
          alt={vehicleName}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
          priority={selectedImage === 0}
        />
      </div>
      
      {images.length > 1 && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-5 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? 'border-blue-600 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Image
                  src={image}
                  alt={`${vehicleName} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 20vw, 10vw"
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
