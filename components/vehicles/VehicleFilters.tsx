'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Search, X, SlidersHorizontal, Check } from 'lucide-react'
import { FuelType, TransmissionType } from '@/types/filters'

interface FilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  brands: Array<{ id: string | number; name: string; logo: string }>
  models: Array<{ _id: string; name: string }>
  selectedBrand: string
  selectedModel: string
  onBrandChange: (value: string) => void
  onModelChange: (value: string) => void
  bodyTypes: Array<{ id: string | number; name: string; slug?: string; image?: string }>
  selectedBodyType: string
  onBodyTypeChange: (value: string) => void
  minPrice: number
  maxPrice: number
  onPriceChange: (min: number, max: number) => void
  minYear: number
  maxYear: number
  onYearChange: (min: number, max: number) => void
  minMileage: number
  maxMileage: number
  onMileageChange: (min: number, max: number) => void
  transmissions: TransmissionType[]
  selectedTransmissions: string[]
  onTransmissionsChange: (values: string[]) => void
  fuelTypes: FuelType[]
  selectedFuelTypes: string[]
  onFuelTypesChange: (values: string[]) => void
  selectedColors: string[]
  onColorsChange: (values: string[]) => void
  sortBy: string
  onSortChange: (value: string) => void
  onClearAll: () => void
  activeFiltersCount: number
}

const COLORS = [
  { name: 'White',  hex: '#FFFFFF', value: 'white',  border: true },
  { name: 'Black',  hex: '#111827', value: 'black' },
  { name: 'Silver', hex: '#C0C0C0', value: 'silver' },
  { name: 'Gray',   hex: '#6B7280', value: 'gray' },
  { name: 'Red',    hex: '#DC2626', value: 'red' },
  { name: 'Blue',   hex: '#2563EB', value: 'blue' },
  { name: 'Brown',  hex: '#92400E', value: 'brown' },
  { name: 'Beige',  hex: '#D4B896', value: 'beige' },
  { name: 'Green',  hex: '#059669', value: 'green' },
  { name: 'Orange', hex: '#EA580C', value: 'orange' },
]

const SORT_OPTIONS = [
  { value: 'created_desc', label: 'Recently Added' },
  { value: 'price_asc',    label: 'Price: Low to High' },
  { value: 'price_desc',   label: 'Price: High to Low' },
  { value: 'year_desc',    label: 'Year: Newest First' },
  { value: 'year_asc',     label: 'Year: Oldest First' },
  { value: 'mileage_asc',  label: 'Mileage: Low to High' },
  { value: 'mileage_desc', label: 'Mileage: High to Low' },
  { value: 'featured',     label: 'Featured First' },
]

// ── Reusable sub-components ───────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2.5">
      {children}
    </p>
  )
}

function Divider() {
  return <div className="border-t border-gray-100 my-4" />
}

interface RangeSliderProps {
  min: number
  max: number
  absMin: number
  absMax: number
  step: number
  format: (v: number) => string
  onChange: (min: number, max: number) => void
}

function RangeSlider({ min, max, absMin, absMax, step, format, onChange }: RangeSliderProps) {
  const range = absMax - absMin
  const leftPct  = ((min - absMin) / range) * 100
  const rightPct = ((max - absMin) / range) * 100

  const thumb = '[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-900 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gray-900 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow [&::-moz-range-thumb]:cursor-pointer'

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold text-gray-900">{format(min)}</span>
        <span className="text-xs text-gray-400">–</span>
        <span className="text-sm font-semibold text-gray-900">{format(max)}</span>
      </div>
      <div className="relative h-1 bg-gray-200 rounded-full mx-1">
        <div
          className="absolute h-full bg-gray-900 rounded-full"
          style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }}
        />
        <input
          type="range" min={absMin} max={absMax} step={step} value={min}
          onChange={(e) => { const v = Number(e.target.value); if (v < max) onChange(v, max) }}
          className={`absolute w-full h-full bg-transparent appearance-none cursor-pointer pointer-events-none ${thumb}`}
        />
        <input
          type="range" min={absMin} max={absMax} step={step} value={max}
          onChange={(e) => { const v = Number(e.target.value); if (v > min) onChange(min, v) }}
          className={`absolute w-full h-full bg-transparent appearance-none cursor-pointer pointer-events-none ${thumb}`}
        />
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

const VehicleFilters: React.FC<FilterProps> = ({
  searchTerm, onSearchChange,
  brands, models, selectedBrand, selectedModel, onBrandChange, onModelChange,
  bodyTypes, selectedBodyType, onBodyTypeChange,
  minPrice, maxPrice, onPriceChange,
  minYear, maxYear, onYearChange,
  minMileage, maxMileage, onMileageChange,
  transmissions, selectedTransmissions, onTransmissionsChange,
  fuelTypes, selectedFuelTypes, onFuelTypesChange,
  selectedColors, onColorsChange,
  sortBy, onSortChange,
  onClearAll, activeFiltersCount,
}) => {
  const [openSections, setOpenSections] = useState({
    price: true, year: true, mileage: false,
    bodyType: true, transmission: true, fuelType: true, colors: false,
  })

  const toggle = (s: keyof typeof openSections) =>
    setOpenSections(p => ({ ...p, [s]: !p[s] }))

  const toggleChip = (arr: string[], val: string, set: (v: string[]) => void) =>
    set(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val])

  const fmtPrice = (v: number) => v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${v}`
  const fmtMileage = (v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}K km` : `${v} km`

  const currentYear = new Date().getFullYear()

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

      {/* ── Header ── */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-bold text-gray-900">Filters</span>
          {activeFiltersCount > 0 && (
            <span className="bg-gray-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      {/* ── Scrollable body ── */}
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
        <div className="px-5 py-4 space-y-0">

          {/* Sort */}
          <div>
            <SectionLabel>Sort by</SectionLabel>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border-0 rounded-lg text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 appearance-none cursor-pointer"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <Divider />

          {/* Search */}
          <div>
            <SectionLabel>Search</SectionLabel>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Make, model, year…"
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border-0 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              {searchTerm && (
                <button onClick={() => onSearchChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <Divider />

          {/* Brand */}
          <div>
            <SectionLabel>Make</SectionLabel>
            <select
              value={selectedBrand}
              onChange={(e) => { onBrandChange(e.target.value); onModelChange('') }}
              className="w-full px-3 py-2 bg-gray-50 border-0 rounded-lg text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 appearance-none cursor-pointer"
            >
              <option value="">All Makes</option>
              {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>

          {selectedBrand && (
            <div className="mt-3">
              <SectionLabel>Model</SectionLabel>
              <select
                value={selectedModel}
                onChange={(e) => onModelChange(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border-0 rounded-lg text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 appearance-none cursor-pointer"
              >
                <option value="">All Models</option>
                {models.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
              </select>
            </div>
          )}

          <Divider />

          {/* Price */}
          <div>
            <button onClick={() => toggle('price')} className="w-full flex items-center justify-between mb-3 group">
              <SectionLabel>Price</SectionLabel>
              <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${openSections.price ? 'text-gray-400' : 'text-gray-300'}`}>
                {openSections.price ? '−' : '+'}
              </span>
            </button>
            {openSections.price && (
              <RangeSlider
                min={minPrice} max={maxPrice}
                absMin={0} absMax={100000} step={1000}
                format={fmtPrice}
                onChange={onPriceChange}
              />
            )}
          </div>

          <Divider />

          {/* Year */}
          <div>
            <button onClick={() => toggle('year')} className="w-full flex items-center justify-between mb-3 group">
              <SectionLabel>Year</SectionLabel>
              <span className="text-[10px] font-bold text-gray-400">{openSections.year ? '−' : '+'}</span>
            </button>
            {openSections.year && (
              <RangeSlider
                min={minYear} max={maxYear}
                absMin={2000} absMax={currentYear} step={1}
                format={(v) => String(v)}
                onChange={onYearChange}
              />
            )}
          </div>

          <Divider />

          {/* Mileage */}
          <div>
            <button onClick={() => toggle('mileage')} className="w-full flex items-center justify-between mb-3">
              <SectionLabel>Mileage</SectionLabel>
              <span className="text-[10px] font-bold text-gray-400">{openSections.mileage ? '−' : '+'}</span>
            </button>
            {openSections.mileage && (
              <RangeSlider
                min={minMileage} max={maxMileage}
                absMin={0} absMax={200000} step={5000}
                format={fmtMileage}
                onChange={onMileageChange}
              />
            )}
          </div>

          <Divider />

          {/* Body Type */}
          <div>
            <button onClick={() => toggle('bodyType')} className="w-full flex items-center justify-between mb-3">
              <SectionLabel>Body Type</SectionLabel>
              <span className="text-[10px] font-bold text-gray-400">{openSections.bodyType ? '−' : '+'}</span>
            </button>
            {openSections.bodyType && (
              <div className="grid grid-cols-3 gap-1.5">
                {bodyTypes.map((type) => {
                  const isSelected = selectedBodyType === type.id.toString()
                  return (
                    <button
                      key={type.id}
                      onClick={() => onBodyTypeChange(isSelected ? '' : type.id.toString())}
                      className={`relative flex flex-col items-center justify-end pb-2 pt-3 rounded-lg border transition-all ${
                        isSelected
                          ? 'border-gray-900 bg-gray-900'
                          : 'border-gray-150 bg-gray-50 hover:border-gray-300 hover:bg-white'
                      }`}
                      style={{ borderColor: isSelected ? undefined : '#ebebeb' }}
                    >
                      {type.image ? (
                        <div className="relative w-12 h-7 mb-1.5">
                          <Image
                            src={type.image}
                            alt={type.name}
                            fill
                            className={`object-contain transition-all ${isSelected ? 'brightness-0 invert' : ''}`}
                            sizes="48px"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-7 mb-1.5" />
                      )}
                      <span className={`text-[10px] font-semibold leading-none ${isSelected ? 'text-white' : 'text-gray-600'}`}>
                        {type.name}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <Divider />

          {/* Transmission */}
          <div>
            <button onClick={() => toggle('transmission')} className="w-full flex items-center justify-between mb-3">
              <SectionLabel>Transmission</SectionLabel>
              <span className="text-[10px] font-bold text-gray-400">{openSections.transmission ? '−' : '+'}</span>
            </button>
            {openSections.transmission && (
              <div className="flex flex-wrap gap-2">
                {transmissions.map((t) => {
                  const isSelected = selectedTransmissions.includes(t._id)
                  return (
                    <button
                      key={t._id}
                      onClick={() => toggleChip(selectedTransmissions, t._id, onTransmissionsChange)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-gray-900 border-gray-900 text-white'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                      {t.name}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <Divider />

          {/* Fuel Type */}
          <div>
            <button onClick={() => toggle('fuelType')} className="w-full flex items-center justify-between mb-3">
              <SectionLabel>Fuel Type</SectionLabel>
              <span className="text-[10px] font-bold text-gray-400">{openSections.fuelType ? '−' : '+'}</span>
            </button>
            {openSections.fuelType && (
              <div className="flex flex-wrap gap-2">
                {fuelTypes.map((f) => {
                  const isSelected = selectedFuelTypes.includes(f._id)
                  return (
                    <button
                      key={f._id}
                      onClick={() => toggleChip(selectedFuelTypes, f._id, onFuelTypesChange)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-gray-900 border-gray-900 text-white'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                      {f.name}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <Divider />

          {/* Color */}
          <div className="pb-2">
            <button onClick={() => toggle('colors')} className="w-full flex items-center justify-between mb-3">
              <SectionLabel>Colour</SectionLabel>
              <span className="text-[10px] font-bold text-gray-400">{openSections.colors ? '−' : '+'}</span>
            </button>
            {openSections.colors && (
              <div className="flex flex-wrap gap-2">
                {COLORS.map((c) => {
                  const isSelected = selectedColors.includes(c.value)
                  return (
                    <button
                      key={c.value}
                      onClick={() => toggleChip(selectedColors, c.value, onColorsChange)}
                      title={c.name}
                      className={`relative w-7 h-7 rounded-full transition-all ${
                        isSelected ? 'ring-2 ring-offset-2 ring-gray-900' : 'hover:scale-110'
                      } ${c.border ? 'border border-gray-300' : ''}`}
                      style={{ backgroundColor: c.hex }}
                    >
                      {isSelected && (
                        <Check className={`w-3 h-3 absolute inset-0 m-auto ${c.value === 'white' || c.value === 'beige' || c.value === 'silver' ? 'text-gray-700' : 'text-white'}`} />
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default VehicleFilters
