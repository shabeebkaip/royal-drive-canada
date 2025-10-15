'use client'

import React from 'react'
import Image from 'next/image'

interface PageHeroProps {
  title: string
  subtitle: string
  backgroundImage?: string
  badges?: Array<{
    text: string
    icon?: React.ReactNode
  }>
  stats?: Array<{
    value: string
    label: string
  }>
  cta?: {
    primary?: {
      text: string
      action: 'call' | 'directions' | 'apply' | 'custom'
      value?: string
    }
    secondary?: {
      text: string
      action: 'call' | 'directions' | 'apply' | 'custom'
      value?: string
    }
  }
  compact?: boolean
}

const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  backgroundImage = '/bg.jpg',
  badges = [],
  stats = [],
  cta,
  compact = false
}) => {

  const handleAction = (action: string, value?: string) => {
    switch (action) {
      case 'call':
        window.open('tel:6476222202')
        break
      case 'directions':
        window.open('https://maps.google.com/?q=751+Danforth+Road+Toronto')
        break
      case 'apply':
        // Handle financing application - could scroll to form or navigate
        const form = document.querySelector('form')
        if (form) {
          form.scrollIntoView({ behavior: 'smooth' })
        }
        break
      case 'custom':
        if (value) {
          window.open(value)
        }
        break
      default:
        console.log('Unknown action:', action)
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
      {/* Content */}
      <div className={`relative ${compact ? 'pt-24 pb-12 sm:pt-28 sm:pb-16' : 'pt-32 pb-16 sm:pt-40 sm:pb-20'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">

            {/* Badges */}
            {badges.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white border border-gray-200 shadow-sm"
                  >
                    {badge.icon && <span className="mr-2">{badge.icon}</span>}
                    <span className="text-gray-700 text-sm font-medium">
                      {badge.text}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Main Content */}
            <div className="space-y-4">
              <h1 className={`font-medium leading-tight text-gray-900 ${
                compact 
                  ? 'text-2xl sm:text-3xl lg:text-4xl' 
                  : 'text-3xl sm:text-4xl lg:text-5xl'
              }`}>
                {title}
              </h1>

              <p className={`text-gray-600 max-w-3xl mx-auto leading-relaxed ${
                compact 
                  ? 'text-base lg:text-lg' 
                  : 'text-lg lg:text-xl'
              }`}>
                {subtitle}
              </p>
            </div>

            {/* Stats */}
            {stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 max-w-2xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="text-xl lg:text-2xl font-medium text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 text-xs font-medium uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            {cta && (
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                {cta.primary && (
                  <button
                    onClick={() => handleAction(cta.primary!.action, cta.primary!.value)}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm"
                  >
                    {cta.primary.text}
                  </button>
                )}
                {cta.secondary && (
                  <button
                    onClick={() => handleAction(cta.secondary!.action, cta.secondary!.value)}
                    className="px-6 py-3 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-medium rounded-lg transition-colors text-sm"
                  >
                    {cta.secondary.text}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PageHero
