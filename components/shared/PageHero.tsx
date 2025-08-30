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
    <section className={`relative overflow-hidden ${compact ? 'min-h-[60vh]' : 'min-h-[70vh]'}`}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gray-900/75" />
        </div>

        {/* Geometric overlay for modern touch */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Content */}
      <div className={`relative z-10 ${compact ? 'pt-32 pb-12' : 'pt-40 pb-16'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">

            {/* Badges */}
            {badges.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-8 mt-4">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
                  >
                    {badge.icon && <span className="mr-2">{badge.icon}</span>}
                    <span className="text-white/95 text-sm font-medium">
                      {badge.text}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Main Content */}
            <div className="space-y-6">
              <h1 className={`font-bold leading-tight text-white ${
                compact 
                  ? 'text-3xl sm:text-4xl lg:text-5xl' 
                  : 'text-4xl sm:text-5xl lg:text-6xl'
              }`}>
                {title}
              </h1>

              <p className={`text-gray-200 max-w-3xl mx-auto leading-relaxed ${
                compact 
                  ? 'text-lg lg:text-xl' 
                  : 'text-xl lg:text-2xl'
              }`}>
                {subtitle}
              </p>
            </div>

            {/* Stats */}
            {stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-300 text-sm font-medium uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            {cta && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                {cta.primary && (
                  <button
                    onClick={() => handleAction(cta.primary!.action, cta.primary!.value)}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {cta.primary.text}
                  </button>
                )}
                {cta.secondary && (
                  <button
                    onClick={() => handleAction(cta.secondary!.action, cta.secondary!.value)}
                    className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-lg transition-all duration-200 hover:border-white/50"
                  >
                    {cta.secondary.text}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}

export default PageHero
