'use client'

import React, { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'
import { uploadImage } from '@/lib/api/upload'

interface ImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  images, 
  onImagesChange, 
  maxImages = 10 
}) => {
  const [uploading, setUploading] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    if (files.length === 0) return

    // Check if adding these files would exceed the limit
    if (images.length + files.length > maxImages) {
      toast.error('Too many images', {
        description: `You can only upload up to ${maxImages} images. Currently you have ${images.length} image(s).`
      })
      return
    }

    // Validate file types
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error('Invalid file type', {
          description: `${file.name} is not an image file`
        })
        return false
      }
      return true
    })

    if (validFiles.length === 0) return

    setUploading(true)
    const uploadedUrls: string[] = []
    const fileNames = validFiles.map(f => f.name)
    setUploadingFiles(fileNames)

    try {
      // Upload files sequentially to avoid overwhelming the server
      for (const file of validFiles) {
        try {
          const url = await uploadImage(file)
          uploadedUrls.push(url)
        } catch (error) {
          console.error(`Failed to upload ${file.name}:`, error)
          // Continue with other uploads even if one fails
        }
      }

      if (uploadedUrls.length > 0) {
        onImagesChange([...images, ...uploadedUrls])
        toast.success('Upload complete', {
          description: `Successfully uploaded ${uploadedUrls.length} image(s)`
        })
      }
    } finally {
      setUploading(false)
      setUploadingFiles([])
      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
    toast.success('Image removed')
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleUploadClick}
          disabled={uploading || images.length >= maxImages}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            uploading || images.length >= maxImages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {uploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Upload Images
            </>
          )}
        </button>
        
        <span className="text-sm text-gray-600">
          {images.length} / {maxImages} images
        </span>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Uploading Progress */}
      {uploading && uploadingFiles.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            <p className="text-sm font-medium text-blue-900">Uploading images...</p>
          </div>
          <div className="space-y-1">
            {uploadingFiles.map((fileName, index) => (
              <p key={index} className="text-xs text-blue-700">• {fileName}</p>
            ))}
          </div>
        </div>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div
              key={index}
              className="relative group aspect-square rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50"
            >
              <Image
                src={url}
                alt={`Upload ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />
              
              {/* Remove Button */}
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Image Number Badge */}
              <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && !uploading && (
        <div 
          onClick={handleUploadClick}
          className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all"
        >
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium mb-1">Click to upload images</p>
          <p className="text-sm text-gray-500">
            Upload up to {maxImages} photos of your vehicle
          </p>
          <p className="text-xs text-gray-400 mt-2">
            JPG, PNG or WEBP (Max 10MB each)
          </p>
        </div>
      )}

      {/* Helper Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-900 font-medium mb-1">📸 Photo Tips:</p>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Take photos in good lighting (daylight preferred)</li>
          <li>• Include front, rear, side, and interior shots</li>
          <li>• Show any damage or special features</li>
          <li>• Clean your car before taking photos</li>
        </ul>
      </div>
    </div>
  )
}

export default ImageUpload
