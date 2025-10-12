'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Car, 
  DollarSign, 
  User, 
  Phone, 
  Mail, 
  Calendar,
  Gauge,
  Palette,
  Settings,
  CheckCircle,
  ArrowRight,
  Loader2,
  Shield,
  Clock,
  TrendingUp
} from 'lucide-react'
import { toast } from 'sonner'
import PageHero from '@/components/shared/PageHero'
import SEOContent from '@/components/shared/SEOContent'
import ImageUpload from '@/components/sell-car/ImageUpload'
import { submitCar, CarSubmissionData } from '@/lib/api/car-submission'

// Types for dropdown options
interface DropdownOption {
  _id: string
  name: string
  slug: string
}

const SellYourCarPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  
  // API dropdown options
  const [vehicleTypes, setVehicleTypes] = useState<DropdownOption[]>([])
  const [transmissions, setTransmissions] = useState<DropdownOption[]>([])
  const [fuelTypes, setFuelTypes] = useState<DropdownOption[]>([])
  const [drivetrains, setDrivetrains] = useState<DropdownOption[]>([])
  
  // Form state
  const [formData, setFormData] = useState<CarSubmissionData>({
    vehicle: {
      make: '',
      model: '',
      year: new Date().getFullYear(),
      vin: '',
      mileage: 0,
      condition: 'good',
      trim: '',
      bodyType: '',
      exteriorColor: '',
      interiorColor: '',
      transmission: '',
      fuelType: '',
      drivetrain: '',
      engineSize: '',
    },
    owner: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      preferredContactMethod: 'either',
      preferredContactTime: '',
    },
    pricing: {
      expectedPrice: 0,
      reasonForSelling: '',
    },
  })

  // Fetch dropdown options from API
  useEffect(() => {
    const fetchDropdownOptions = async () => {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.royaldrivecanada.com/api/v1'
      
      try {
        // Fetch vehicle types (body types)
        const vehicleTypesRes = await fetch(`${apiBaseUrl}/vehicle-types/dropdown`)
        const vehicleTypesData = await vehicleTypesRes.json()
        if (vehicleTypesData.success && vehicleTypesData.data) {
          setVehicleTypes(vehicleTypesData.data)
        }

        // Fetch transmissions
        const transmissionsRes = await fetch(`${apiBaseUrl}/transmissions`)
        const transmissionsData = await transmissionsRes.json()
        if (transmissionsData.success && transmissionsData.data?.transmissions) {
          setTransmissions(transmissionsData.data.transmissions.filter((t: any) => t.active))
        }

        // Fetch fuel types
        const fuelTypesRes = await fetch(`${apiBaseUrl}/fuel-types`)
        const fuelTypesData = await fuelTypesRes.json()
        if (fuelTypesData.success && fuelTypesData.data?.fuelTypes) {
          setFuelTypes(fuelTypesData.data.fuelTypes.filter((ft: any) => ft.active))
        }

        // Fetch drivetrains
        const drivetrainsRes = await fetch(`${apiBaseUrl}/drivetrains`)
        const drivetrainsData = await drivetrainsRes.json()
        if (drivetrainsData.success && drivetrainsData.data?.drivetrains) {
          setDrivetrains(drivetrainsData.data.drivetrains.filter((dt: any) => dt.active))
        }
      } catch (error) {
        console.error('Failed to fetch dropdown options:', error)
        toast.error('Failed to load form options', {
          description: 'Some dropdown options may not be available'
        })
      }
    }

    fetchDropdownOptions()
  }, [])

  const handleInputChange = (
    section: 'vehicle' | 'owner' | 'pricing',
    field: string,
    value: string | number
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.vehicle.make || !formData.vehicle.model) {
      toast.error('Required fields missing', {
        description: 'Please fill in make and model'
      })
      return
    }

    if (!formData.owner.firstName || !formData.owner.lastName || !formData.owner.email || !formData.owner.phone) {
      toast.error('Required fields missing', {
        description: 'Please fill in all contact information'
      })
      return
    }

    if (formData.pricing.expectedPrice <= 0) {
      toast.error('Invalid price', {
        description: 'Please enter your expected price'
      })
      return
    }

    setLoading(true)

    try {
      // Add images to submission data
      const submissionData: CarSubmissionData = {
        ...formData,
        media: images.length > 0 ? { images } : undefined,
      }

      const result = await submitCar(submissionData)

      toast.success('Submission successful! 🎉', {
        description: `Your submission number is ${result.data.submissionNumber}. We'll contact you within ${result.data.estimatedResponseTime}.`,
        duration: 5000,
      })

      // Redirect to success page or home after a short delay
      setTimeout(() => {
        router.push('/')
      }, 2000)

    } catch (error) {
      console.error('Submission error:', error)
      toast.error('Submission failed', {
        description: error instanceof Error ? error.message : 'Please try again later'
      })
    } finally {
      setLoading(false)
    }
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i)

  return (
    <div className="min-h-screen bg-white">
      {/* Page Hero */}
      <PageHero
        title="Sell Your Car"
        subtitle="Get a fair, competitive offer for your vehicle. We make selling your car quick, easy, and hassle-free. Fill out our simple form and receive an offer within 24-48 hours."
        backgroundImage="https://res.cloudinary.com/dm5c31z7w/image/upload/v1756556283/bg_bfnqou.jpg"
        compact={true}
        badges={[
          {
            text: "Fair Market Value",
            icon: <DollarSign className="w-4 h-4 text-blue-400" />
          },
          {
            text: "Quick Response",
            icon: <Clock className="w-4 h-4 text-blue-400" />
          }
        ]}
        stats={[
          { value: "24-48h", label: "Response Time" },
          { value: "Free", label: "Valuation" },
          { value: "Easy", label: "Process" }
        ]}
      />

      {/* Form Container */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Introduction */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Complete the form below with your vehicle details and we&apos;ll provide you with a competitive offer
            </p>

            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Submit Details</h3>
                <p className="text-sm text-gray-600">Fill out the form with your vehicle information</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Get Evaluation</h3>
                <p className="text-sm text-gray-600">We review and evaluate your vehicle</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Receive Offer</h3>
                <p className="text-sm text-gray-600">Get a fair offer within 24-48 hours</p>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Sell to Royal Drive Canada?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Fair Prices</h3>
                <p className="text-sm text-gray-600">Competitive market value for your vehicle</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Quick Process</h3>
                <p className="text-sm text-gray-600">Fast response within 24-48 hours</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">OMVIC Licensed</h3>
                <p className="text-sm text-gray-600">Trusted and regulated dealer</p>
              </div>
              
              <div className="text-center">
                <div className="bg-yellow-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Easy Steps</h3>
                <p className="text-sm text-gray-600">Simple, hassle-free selling experience</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
          {/* Vehicle Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Car className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Vehicle Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Make */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Make <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.vehicle.make}
                  onChange={(e) => handleInputChange('vehicle', 'make', e.target.value)}
                  placeholder="e.g., Toyota, Honda, BMW"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Model */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.vehicle.model}
                  onChange={(e) => handleInputChange('vehicle', 'model', e.target.value)}
                  placeholder="e.g., Camry, Civic, X5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.vehicle.year}
                  onChange={(e) => handleInputChange('vehicle', 'year', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Mileage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mileage (km) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Gauge className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.vehicle.mileage || ''}
                    onChange={(e) => handleInputChange('vehicle', 'mileage', parseInt(e.target.value) || 0)}
                    placeholder="e.g., 50000"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Condition */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.vehicle.condition}
                  onChange={(e) => handleInputChange('vehicle', 'condition', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>

              {/* VIN */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  VIN (Optional)
                </label>
                <input
                  type="text"
                  value={formData.vehicle.vin}
                  onChange={(e) => handleInputChange('vehicle', 'vin', e.target.value)}
                  placeholder="17-character VIN"
                  maxLength={17}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Trim */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trim (Optional)
                </label>
                <input
                  type="text"
                  value={formData.vehicle.trim}
                  onChange={(e) => handleInputChange('vehicle', 'trim', e.target.value)}
                  placeholder="e.g., XLE, Sport, Limited"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Body Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Body Type (Optional)
                </label>
                <select
                  value={formData.vehicle.bodyType}
                  onChange={(e) => handleInputChange('vehicle', 'bodyType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select body type</option>
                  {vehicleTypes.map((type) => (
                    <option key={type._id} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Exterior Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exterior Color (Optional)
                </label>
                <div className="relative">
                  <Palette className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.vehicle.exteriorColor}
                    onChange={(e) => handleInputChange('vehicle', 'exteriorColor', e.target.value)}
                    placeholder="e.g., Silver, Black, White"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Interior Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interior Color (Optional)
                </label>
                <input
                  type="text"
                  value={formData.vehicle.interiorColor}
                  onChange={(e) => handleInputChange('vehicle', 'interiorColor', e.target.value)}
                  placeholder="e.g., Black Leather"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Transmission */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transmission (Optional)
                </label>
                <div className="relative">
                  <Settings className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={formData.vehicle.transmission}
                    onChange={(e) => handleInputChange('vehicle', 'transmission', e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select transmission</option>
                    {transmissions.map((transmission) => (
                      <option key={transmission._id} value={transmission.name}>
                        {transmission.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Fuel Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuel Type (Optional)
                </label>
                <select
                  value={formData.vehicle.fuelType}
                  onChange={(e) => handleInputChange('vehicle', 'fuelType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select fuel type</option>
                  {fuelTypes.map((fuelType) => (
                    <option key={fuelType._id} value={fuelType.name}>
                      {fuelType.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Drivetrain */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Drivetrain (Optional)
                </label>
                <select
                  value={formData.vehicle.drivetrain}
                  onChange={(e) => handleInputChange('vehicle', 'drivetrain', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select drivetrain</option>
                  {drivetrains.map((drivetrain) => (
                    <option key={drivetrain._id} value={drivetrain.name}>
                      {drivetrain.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Engine Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Engine Size (Optional)
                </label>
                <input
                  type="text"
                  value={formData.vehicle.engineSize}
                  onChange={(e) => handleInputChange('vehicle', 'engineSize', e.target.value)}
                  placeholder="e.g., 2.5L, 3.0L V6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Owner Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-2 rounded-lg">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Your Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.owner.firstName}
                  onChange={(e) => handleInputChange('owner', 'firstName', e.target.value)}
                  placeholder="John"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.owner.lastName}
                  onChange={(e) => handleInputChange('owner', 'lastName', e.target.value)}
                  placeholder="Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={formData.owner.email}
                    onChange={(e) => handleInputChange('owner', 'email', e.target.value)}
                    placeholder="john.doe@example.com"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={formData.owner.phone}
                    onChange={(e) => handleInputChange('owner', 'phone', e.target.value)}
                    placeholder="+1-555-123-4567"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Contact Method
                </label>
                <select
                  value={formData.owner.preferredContactMethod}
                  onChange={(e) => handleInputChange('owner', 'preferredContactMethod', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="either">Either</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                </select>
              </div>

              {/* Preferred Contact Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Contact Time
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={formData.owner.preferredContactTime}
                    onChange={(e) => handleInputChange('owner', 'preferredContactTime', e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Anytime</option>
                    <option value="Morning">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon">Afternoon (12 PM - 5 PM)</option>
                    <option value="Evening">Evening (5 PM - 8 PM)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Pricing</h2>
            </div>

            <div className="space-y-6">
              {/* Expected Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Price (CAD) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    required
                    min="0"
                    step="100"
                    value={formData.pricing.expectedPrice || ''}
                    onChange={(e) => handleInputChange('pricing', 'expectedPrice', parseInt(e.target.value) || 0)}
                    placeholder="25000"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Reason for Selling */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Selling (Optional)
                </label>
                <textarea
                  value={formData.pricing.reasonForSelling}
                  onChange={(e) => handleInputChange('pricing', 'reasonForSelling', e.target.value)}
                  placeholder="e.g., Upgrading to a newer model, Downsizing, etc."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          {/* Vehicle Photos */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Car className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Vehicle Photos</h2>
            </div>

            <ImageUpload images={images} onImagesChange={setImages} maxImages={10} />
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="space-y-4">
              {/* Terms */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <p className="font-medium mb-1">By submitting this form, you agree to:</p>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Receive communication from Royal Drive Canada</li>
                      <li>• Allow us to inspect your vehicle if interested</li>
                      <li>• Our privacy policy and terms of service</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Your Car
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-center text-sm text-gray-500">
                We&apos;ll review your submission and get back to you within 24-48 hours
              </p>
            </div>
          </div>
        </form>
        </div>
      </div>

      {/* SEO Content Section */}
      <SEOContent
        title="Sell Your Car in Toronto - Get a Fair Offer Today"
        description="Looking to sell your used car in Toronto? Royal Drive Canada makes it easy to get a fair, competitive offer for your vehicle. As an OMVIC licensed dealer, we provide transparent pricing and a hassle-free selling experience. We purchase all makes and models of vehicles in various conditions. Simply fill out our online form with your vehicle details, upload photos, and receive a competitive offer within 24-48 hours. No hidden fees, no complicated paperwork - just a straightforward, honest evaluation of your vehicle. Trade-ins welcome!"
        keywords={[
          'sell my car Toronto',
          'sell used car Toronto',
          'car valuation Toronto',
          'trade in car Toronto',
          'sell vehicle GTA',
          'cash for cars Toronto',
          'we buy cars Toronto',
          'car buyer Toronto',
          'sell car fast Toronto',
          'fair car offer Toronto'
        ]}
        location="Toronto"
        serviceType="Car Buying Service"
      />
    </div>
  )
}

export default SellYourCarPage
