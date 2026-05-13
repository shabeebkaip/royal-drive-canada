"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, Search } from 'lucide-react'
import { Brand, VehicleType } from '@/types/api'
import { Model } from '@/types/filters'

interface SearchCardClientProps {
  initialBrands: Brand[]
  initialBodyTypes: VehicleType[]
}

const PRICE_OPTIONS = [
  { value: '',       label: 'Any Price' },
  { value: '10000',  label: 'Under $10K' },
  { value: '20000',  label: 'Under $20K' },
  { value: '30000',  label: 'Under $30K' },
  { value: '40000',  label: 'Under $40K' },
  { value: '50000',  label: 'Under $50K' },
  { value: '75000',  label: 'Under $75K' },
  { value: '100000', label: 'Under $100K' },
]

interface FieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  disabled?: boolean
  last?: boolean
}

function Field({ label, value, onChange, options, disabled, last }: FieldProps) {
  const selected = options.find(o => o.value === value)
  const display  = selected ? selected.label : options[0]?.label ?? label

  return (
    <div className={`relative flex-1 min-w-0 ${!last ? 'border-r border-gray-100' : ''}`}>
      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 px-5 pt-4 pb-0 pointer-events-none">
        {label}
      </label>
      <div className={`flex items-center gap-1 px-5 pb-4 pt-1 ${disabled ? 'opacity-40' : ''}`}>
        <span className="text-sm font-semibold text-gray-800 truncate flex-1">{display}</span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}

const SearchCardClient = ({ initialBrands, initialBodyTypes }: SearchCardClientProps) => {
  const router = useRouter()
  const [brand,     setBrand]     = useState('')
  const [model,     setModel]     = useState('')
  const [price,     setPrice]     = useState('')
  const [bodyType,  setBodyType]  = useState('')
  const [models,    setModels]    = useState<Model[]>([])
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    if (!brand) { setModels([]); setModel(''); return }
    const base = process.env.NEXT_PUBLIC_API_BASE_URL
    fetch(`${base}/models?make=${brand}&active=true&limit=100`)
      .then(r => r.json())
      .then(d => { if (d.success && d.data?.models) setModels(d.data.models.filter((m: Model) => m.active)) })
      .catch(() => {})
  }, [brand])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearching(true)
    const p = new URLSearchParams()
    if (brand)    p.append('make',        brand)
    if (model)    p.append('model',       model)
    if (price)    p.append('maxPrice',    price)
    if (bodyType) p.append('vehicleType', bodyType)
    router.push(`/vehicles?${p.toString()}`)
  }

  const brandOptions    = [{ value: '', label: 'Any Make' },    ...initialBrands.map(b => ({ value: String(b.id), label: b.name }))]
  const modelOptions    = [{ value: '', label: 'Any Model' },   ...models.map(m => ({ value: m._id, label: m.name }))]
  const bodyTypeOptions = [{ value: '', label: 'Any Type' },    ...initialBodyTypes.map(t => ({ value: String(t.id), label: t.name }))]

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch">

      {/* ── Filter columns ── */}
      <div className="flex-1 flex flex-col sm:flex-row divide-y sm:divide-y-0">
        <Field label="Make"       value={brand}    onChange={(v) => { setBrand(v); setModel('') }} options={brandOptions}    />
        <Field label="Model"      value={model}    onChange={setModel}     options={modelOptions}    disabled={!brand || models.length === 0} />
        <Field label="Price"      value={price}    onChange={setPrice}     options={PRICE_OPTIONS}   />
        <Field label="Body Type"  value={bodyType} onChange={setBodyType}  options={bodyTypeOptions} last />
      </div>

      {/* ── Search button ── */}
      <button
        type="submit"
        disabled={searching}
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 text-white font-bold text-sm px-8 py-5 transition-colors whitespace-nowrap min-w-[140px] border-t sm:border-t-0 sm:border-l border-blue-500/30"
      >
        <Search className="w-4 h-4" />
        {searching ? 'Searching…' : 'Search'}
      </button>

    </form>
  )
}

export default SearchCardClient
