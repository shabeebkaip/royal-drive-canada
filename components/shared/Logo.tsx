import React from 'react'

interface LogoProps {
  className?: string
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
}

const Logo = ({ className = '', variant = 'dark', size = 'md' }: LogoProps) => {
  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  }

  const letterSpacing = {
    sm: 'tracking-[0.15em]',
    md: 'tracking-[0.2em]',
    lg: 'tracking-[0.25em]'
  }

  // Modern blue color scheme
  const textColor = variant === 'light' ? 'text-white' : 'text-blue-600'
  const accentColor = variant === 'light' ? 'text-blue-300' : 'text-blue-700'

  return (
    <div className={`flex items-center ${className}`}>
      {/* Modern Typography Logo */}
      <div className="flex items-center space-x-1">
        {/* ROYAL */}
        <span className={`${textSizeClasses[size]} ${textColor} font-black ${letterSpacing[size]} uppercase`}>
          ROYAL
        </span>

        {/* Separator Line */}
        <div className={`w-8 h-0.5 ${variant === 'light' ? 'bg-blue-300' : 'bg-blue-600'} mx-2`}></div>

        {/* DRIVE */}
        <span className={`${textSizeClasses[size]} ${accentColor} font-light ${letterSpacing[size]} uppercase`}>
          DRIVE
        </span>
      </div>
    </div>
  )
}

export default Logo
