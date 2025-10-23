import React from 'react'
import Image from 'next/image'
import { VehicleDetail } from '@/types/vehicle'
import { Shield, Car, Wrench, FileText, Check, X, Clock, User, ExternalLink } from 'lucide-react'

interface VehicleHistoryProps {
  vehicle: VehicleDetail
}

const VehicleHistory: React.FC<VehicleHistoryProps> = ({ vehicle }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Vehicle History & Certification</h2>
        <p className="text-sm text-gray-600">Comprehensive history and verification details</p>
      </div>
      
      <div className="space-y-3">
        {/* CARFAX Report - Premium Feature */}
        {vehicle.carfax?.hasCleanHistory && (
          vehicle.carfax.reportUrl ? (
            <a
              href={vehicle.carfax.reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-lg border-2 border-green-200 bg-green-50 hover:border-green-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="p-3 rounded-lg bg-white shadow-sm">
                  <Image 
                    src="/certifications/carfax.png" 
                    alt="CARFAX" 
                    width={80} 
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-gray-900">CARFAX® Vehicle History Report</p>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-600 text-white">
                      View Full Report
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-0.5">No accidents or damage reported</p>
                </div>
              </div>
              <div className="flex-shrink-0 text-green-600">
                <ExternalLink className="w-5 h-5" />
              </div>
            </a>
          ) : (
            <div className="flex items-center justify-between p-4 rounded-lg border border-green-200 bg-green-50">
              <div className="flex items-center gap-4 flex-1">
                <div className="p-3 rounded-lg bg-white shadow-sm">
                  <Image 
                    src="/certifications/carfax.png" 
                    alt="CARFAX" 
                    width={80} 
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-gray-900">CARFAX® Vehicle History Report</p>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-700 text-white border border-green-200">
                      Verified
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-0.5">No accidents or damage reported</p>
                </div>
              </div>
              <div className="flex-shrink-0 text-green-600">
                <Check className="w-5 h-5" />
              </div>
            </div>
          )
        )}

        {/* Ownership History */}
        {vehicle.numberOfPreviousOwners !== undefined && vehicle.numberOfPreviousOwners <= 1 && (
          <div className="flex items-center justify-between p-4 rounded-lg border border-blue-200 bg-blue-50">
            <div className="flex items-center gap-4 flex-1">
              <div className="p-3 rounded-lg bg-white shadow-sm text-blue-600">
                <User className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-gray-900">
                    {vehicle.numberOfPreviousOwners === 0 ? 'First Owner' : 'Single Previous Owner'}
                  </p>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-700 text-white border border-blue-200">
                    Verified
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-0.5">
                  {vehicle.numberOfPreviousOwners === 0 
                    ? 'Original owner, never transferred' 
                    : 'One previous owner only'}
                </p>
              </div>
            </div>
            <div className="flex-shrink-0 text-blue-600">
              <Check className="w-5 h-5" />
            </div>
          </div>
        )}

        {/* Accident History */}
        <div className={`flex items-center justify-between p-4 rounded-lg border ${vehicle.accidentHistory ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
          <div className="flex items-center gap-4 flex-1">
            <div className={`p-3 rounded-lg bg-white shadow-sm ${vehicle.accidentHistory ? 'text-red-600' : 'text-gray-600'}`}>
              <Car className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900">Accident History</p>
              <p className="text-sm text-gray-600 mt-0.5">
                {vehicle.accidentHistory ? 'Previous accidents reported' : 'No accidents reported'}
              </p>
            </div>
          </div>
          <div className={`flex-shrink-0 ${vehicle.accidentHistory ? 'text-red-600' : 'text-gray-600'}`}>
            {vehicle.accidentHistory ? <X className="w-5 h-5" /> : <Check className="w-5 h-5" />}
          </div>
        </div>

        {/* Safety Standard */}
        {vehicle.ontario?.safetyStandard && (
          <div className={`flex items-center justify-between p-4 rounded-lg border ${vehicle.ontario.safetyStandard.passed ? 'border-gray-200 bg-gray-50' : 'border-amber-200 bg-amber-50'}`}>
            <div className="flex items-center gap-4 flex-1">
              <div className={`p-3 rounded-lg bg-white shadow-sm ${vehicle.ontario.safetyStandard.passed ? 'text-gray-600' : 'text-amber-600'}`}>
                <Wrench className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-gray-900">Ontario Safety Standard</p>
                  {vehicle.ontario.safetyStandard.passed && (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-700 text-white border border-gray-200">
                      Certified
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-0.5">
                  {vehicle.ontario.safetyStandard.passed ? 'Safety certified and inspected' : 'Safety certification pending'}
                </p>
              </div>
            </div>
            <div className={`flex-shrink-0 ${vehicle.ontario.safetyStandard.passed ? 'text-gray-600' : 'text-amber-600'}`}>
              {vehicle.ontario.safetyStandard.passed ? <Check className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
            </div>
          </div>
        )}

        {/* Service Records */}
        {(vehicle.carfax?.serviceRecords ?? 0) > 0 && (
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-gray-50">
            <div className="flex items-center gap-4 flex-1">
              <div className="p-3 rounded-lg bg-white shadow-sm text-gray-600">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-gray-900">Service Records</p>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-700 text-white border border-gray-200">
                    {vehicle.carfax.serviceRecords} {vehicle.carfax.serviceRecords === 1 ? 'Record' : 'Records'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-0.5">
                  Complete service history available
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VehicleHistory
