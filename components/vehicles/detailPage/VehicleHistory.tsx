import React from 'react'
import Image from 'next/image'
import { VehicleDetail } from '@/types/vehicle'
import { Check, X, Clock, User, ExternalLink, ShieldCheck, AlertTriangle, FileText, Car } from 'lucide-react'

interface VehicleHistoryProps {
  vehicle: VehicleDetail
}

interface HistoryRowProps {
  icon: React.ReactNode
  iconBg: string
  title: string
  subtitle: string
  badge?: { label: string; color: string }
  status: 'pass' | 'fail' | 'pending' | 'info'
  href?: string
}

function HistoryRow({ icon, iconBg, title, subtitle, badge, status, href }: HistoryRowProps) {
  const statusIcon = {
    pass: <Check className="w-4 h-4 stroke-[2.5]" />,
    fail: <X className="w-4 h-4 stroke-[2.5]" />,
    pending: <Clock className="w-4 h-4" />,
    info: <Check className="w-4 h-4 stroke-[2.5]" />,
  }[status]

  const statusColor = {
    pass: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    fail: 'text-red-600 bg-red-50 border-red-200',
    pending: 'text-amber-600 bg-amber-50 border-amber-200',
    info: 'text-blue-600 bg-blue-50 border-blue-200',
  }[status]

  const rowBg = {
    pass: 'bg-white hover:bg-emerald-50/30',
    fail: 'bg-red-50/50',
    pending: 'bg-amber-50/40',
    info: 'bg-white',
  }[status]

  const content = (
    <div className={`flex items-center gap-4 p-4 rounded-xl border border-gray-100 transition-all ${rowBg} ${href ? 'cursor-pointer hover:shadow-sm hover:border-gray-200' : ''}`}>
      <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-gray-900 text-sm">{title}</span>
          {badge && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${badge.color}`}>
              {badge.label}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
      </div>
      <div className={`w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 ${statusColor}`}>
        {statusIcon}
      </div>
      {href && <ExternalLink className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 -ml-2" />}
    </div>
  )

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>
  }
  return content
}

const VehicleHistory: React.FC<VehicleHistoryProps> = ({ vehicle }) => {
  return (
    <div>
      <div className="space-y-2.5">

        {/* CARFAX */}
        {vehicle.carfax?.hasCleanHistory && (
          <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${vehicle.carfax.reportUrl ? 'border-emerald-200 bg-emerald-50/60 hover:shadow-sm cursor-pointer' : 'border-emerald-100 bg-emerald-50/40'}`}>
            <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center flex-shrink-0 border border-emerald-100 p-1.5">
              <Image src="/certifications/carfax.png" alt="CARFAX" width={40} height={16} className="object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-gray-900 text-sm">CARFAX® Vehicle History</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-emerald-600 text-white">
                  Clean History
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">No accidents or damage reported</p>
            </div>
            {vehicle.carfax.reportUrl ? (
              <a href={vehicle.carfax.reportUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-white border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all whitespace-nowrap flex-shrink-0">
                View Report <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <div className="w-7 h-7 rounded-full border border-emerald-200 bg-emerald-50 flex items-center justify-center flex-shrink-0 text-emerald-600">
                <Check className="w-4 h-4 stroke-[2.5]" />
              </div>
            )}
          </div>
        )}

        {/* Ownership */}
        {vehicle.numberOfPreviousOwners !== undefined && vehicle.numberOfPreviousOwners <= 2 && (
          <HistoryRow
            icon={<User className="w-5 h-5 text-blue-600" />}
            iconBg="bg-blue-100"
            title={vehicle.numberOfPreviousOwners === 0 ? 'First Owner' : vehicle.numberOfPreviousOwners === 1 ? 'Single Previous Owner' : '2 Previous Owners'}
            subtitle={vehicle.numberOfPreviousOwners === 0 ? 'Original owner — never previously registered' : vehicle.numberOfPreviousOwners === 1 ? 'Well-maintained by one careful owner' : 'Two previous registered owners'}
            badge={vehicle.numberOfPreviousOwners <= 1 ? { label: 'Verified', color: 'bg-blue-100 text-blue-700' } : undefined}
            status={vehicle.numberOfPreviousOwners <= 1 ? 'pass' : 'info'}
          />
        )}

        {/* Accident */}
        <HistoryRow
          icon={<Car className="w-5 h-5 text-gray-600" />}
          iconBg={vehicle.accidentHistory ? 'bg-red-100' : 'bg-gray-100'}
          title="Accident History"
          subtitle={vehicle.accidentHistory ? 'Previous accidents have been reported for this vehicle' : 'No accidents or collisions reported'}
          badge={!vehicle.accidentHistory ? { label: 'Clean', color: 'bg-gray-100 text-gray-600' } : undefined}
          status={vehicle.accidentHistory ? 'fail' : 'pass'}
        />

        {/* Ontario Safety */}
        {vehicle.ontario?.safetyStandard && (
          <HistoryRow
            icon={<ShieldCheck className="w-5 h-5 text-gray-600" />}
            iconBg={vehicle.ontario.safetyStandard.passed ? 'bg-emerald-100' : 'bg-amber-100'}
            title="Ontario Safety Standard Certificate"
            subtitle={vehicle.ontario.safetyStandard.passed ? 'Vehicle has passed Ontario safety inspection' : 'Safety certification is pending — available upon request'}
            badge={vehicle.ontario.safetyStandard.passed ? { label: 'Certified', color: 'bg-emerald-100 text-emerald-700' } : undefined}
            status={vehicle.ontario.safetyStandard.passed ? 'pass' : 'pending'}
          />
        )}

        {/* Emission Test */}
        {vehicle.ontario?.emissionTest?.required && (
          <HistoryRow
            icon={<AlertTriangle className="w-5 h-5 text-gray-500" />}
            iconBg={vehicle.ontario.emissionTest.passed ? 'bg-emerald-100' : 'bg-amber-100'}
            title="Ontario Emission Test"
            subtitle={vehicle.ontario.emissionTest.passed ? 'Emission standards met — environmentally compliant' : 'Emission test pending for this vehicle'}
            badge={vehicle.ontario.emissionTest.passed ? { label: 'Passed', color: 'bg-emerald-100 text-emerald-700' } : undefined}
            status={vehicle.ontario.emissionTest.passed ? 'pass' : 'pending'}
          />
        )}

        {/* UVIP */}
        {vehicle.ontario?.uvip?.required && (
          <HistoryRow
            icon={<FileText className="w-5 h-5 text-gray-500" />}
            iconBg={vehicle.ontario.uvip.obtained ? 'bg-emerald-100' : 'bg-gray-100'}
            title="Used Vehicle Information Package (UVIP)"
            subtitle={vehicle.ontario.uvip.obtained ? 'UVIP obtained — full vehicle ownership history included' : 'Required by Ontario regulation for used vehicle transfers'}
            badge={vehicle.ontario.uvip.obtained ? { label: 'Obtained', color: 'bg-emerald-100 text-emerald-700' } : undefined}
            status={vehicle.ontario.uvip.obtained ? 'pass' : 'pending'}
          />
        )}

        {/* Service Records */}
        {(vehicle.carfax?.serviceRecords ?? 0) > 0 && (
          <HistoryRow
            icon={<FileText className="w-5 h-5 text-gray-600" />}
            iconBg="bg-gray-100"
            title={`${vehicle.carfax.serviceRecords} Service ${vehicle.carfax.serviceRecords === 1 ? 'Record' : 'Records'} on File`}
            subtitle="Complete documented service history available"
            badge={{ label: 'Documented', color: 'bg-gray-100 text-gray-600' }}
            status="info"
          />
        )}
      </div>

    </div>
  )
}

export default VehicleHistory
