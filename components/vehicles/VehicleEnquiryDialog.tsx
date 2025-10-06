'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

interface VehicleDetails {
  id: string
  slug: string
  year: number
  make: { name: string }
  model: { name: string }
  stockNumber: string
  price?: number
}

interface VehicleEnquiryDialogProps {
  vehicle: VehicleDetails
  trigger?: React.ReactNode
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  preferredContact: 'email' | 'phone' | 'both'
  enquiryType: 'general' | 'financing' | 'trade-in' | 'test-drive' | 'price-negotiation'
  message: string
  preferredDate?: string
  preferredTime?: string
}

export default function VehicleEnquiryDialog({ vehicle, trigger }: VehicleEnquiryDialogProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    enquiryType: 'general',
    message: '',
    preferredDate: '',
    preferredTime: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.royaldrivecanada.com/api/v1'
      
      // Convert time slot to HH:MM format
      const timeSlotMap: Record<string, string> = {
        'morning': '10:00',
        'afternoon': '14:00',
        'evening': '17:00'
      }
      
      const payload = {
        vehicleId: vehicle.id,
        customer: {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          preferredContact: formData.preferredContact,
        },
        enquiry: {
          type: formData.enquiryType,
          message: formData.message.trim(),
          preferredDate: formData.preferredDate ? new Date(formData.preferredDate).toISOString() : undefined,
          preferredTime: formData.preferredTime ? timeSlotMap[formData.preferredTime] || formData.preferredTime : undefined,
        },
        interests: {
          testDrive: formData.enquiryType === 'test-drive',
          financing: formData.enquiryType === 'financing',
          tradeIn: formData.enquiryType === 'trade-in',
          warranty: false,
        },
      }

      const response = await fetch(`${apiUrl}/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to submit enquiry')
      }

      setSubmitStatus('success')
      
      // Reset form after 3 seconds and close dialog
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          preferredContact: 'email',
          enquiryType: 'general',
          message: '',
          preferredDate: '',
          preferredTime: '',
        })
        setSubmitStatus('idle')
        setOpen(false)
      }, 3000)
      
    } catch (error) {
      console.error('Enquiry submission error:', error)
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
            <Mail className="w-5 h-5" />
            Enquire Now
          </button>
        )}
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Vehicle Enquiry</DialogTitle>
          <DialogDescription className="text-base">
            Interested in this {vehicle.year} {vehicle.make.name} {vehicle.model.name}? 
            Fill out the form below and we'll get back to you shortly.
          </DialogDescription>
        </DialogHeader>

        {/* Vehicle Info Card */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-lg text-gray-900">
                {vehicle.year} {vehicle.make.name} {vehicle.model.name}
              </p>
              <p className="text-sm text-gray-600 mt-1">Stock: {vehicle.stockNumber}</p>
            </div>
            {vehicle.price && (
              <p className="text-lg font-bold text-blue-600">
                ${vehicle.price.toLocaleString()}
              </p>
            )}
          </div>
        </div>

        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-900">Enquiry Submitted Successfully!</p>
              <p className="text-sm text-green-700 mt-1">
                Thank you for your interest. Our team will contact you within 24 hours.
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-red-900">Submission Failed</p>
              <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                type="text"
                required
                minLength={2}
                maxLength={50}
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                placeholder="John"
                disabled={isSubmitting || submitStatus === 'success'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                type="text"
                required
                minLength={2}
                maxLength={50}
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="Doe"
                disabled={isSubmitting || submitStatus === 'success'}
              />
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="john.doe@example.com"
                disabled={isSubmitting || submitStatus === 'success'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                required
                pattern="[0-9+\s()-]{10,15}"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+1 (234) 567-8900"
                disabled={isSubmitting || submitStatus === 'success'}
              />
            </div>
          </div>

          {/* Preferred Contact Method */}
          <div className="space-y-2">
            <Label htmlFor="preferredContact">
              Preferred Contact Method <span className="text-red-500">*</span>
            </Label>
            <select
              id="preferredContact"
              value={formData.preferredContact}
              onChange={(e) => handleChange('preferredContact', e.target.value)}
              disabled={isSubmitting || submitStatus === 'success'}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
              required
            >
              <option value="email">📧 Email</option>
              <option value="phone">📞 Phone</option>
              <option value="both">📧📞 Both Email & Phone</option>
            </select>
          </div>

          {/* Enquiry Type */}
          <div className="space-y-2">
            <Label htmlFor="enquiryType">
              I'm Interested In <span className="text-red-500">*</span>
            </Label>
            <select
              id="enquiryType"
              value={formData.enquiryType}
              onChange={(e) => handleChange('enquiryType', e.target.value)}
              disabled={isSubmitting || submitStatus === 'success'}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
              required
            >
              <option value="general">General Enquiry</option>
              <option value="test-drive">Schedule Test Drive</option>
              <option value="financing">Financing Options</option>
              <option value="trade-in">Trade-In Valuation</option>
              <option value="price-negotiation">Price Negotiation</option>
            </select>
          </div>

          {/* Conditional Fields for Test Drive */}
          {formData.enquiryType === 'test-drive' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => handleChange('preferredDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  disabled={isSubmitting || submitStatus === 'success'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredTime">Preferred Time</Label>
                <select
                  id="preferredTime"
                  value={formData.preferredTime}
                  onChange={(e) => handleChange('preferredTime', e.target.value)}
                  disabled={isSubmitting || submitStatus === 'success'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                >
                  <option value="">Select time</option>
                  <option value="morning">Morning (9 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                  <option value="evening">Evening (5 PM - 7 PM)</option>
                </select>
              </div>
            </div>
          )}

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">
              Message <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              required
              minLength={10}
              maxLength={2000}
              rows={4}
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="Tell us more about your requirements, questions, or any specific details..."
              disabled={isSubmitting || submitStatus === 'success'}
              className="resize-none"
            />
            <p className="text-xs text-gray-500">
              {formData.message.length}/2000 characters
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || submitStatus === 'success'}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : submitStatus === 'success' ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Submitted
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  Submit Enquiry
                </>
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
