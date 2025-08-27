import React from 'react'

interface LogoProps {
  className?: string
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
}

const Logo = ({ className = '', variant = 'dark', size = 'md' }: LogoProps) => {
  

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  }

  const monogramSizeClasses = {
    sm: 'text-3xl',
    md: 'text-4xl',
    lg: 'text-5xl'
  }

  const textColor = variant === 'light' ? 'text-white' : 'text-gray-900'

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* RD Monogram - Exact match to reference */}
      <div className={`${monogramSizeClasses[size]} ${textColor} font-bold leading-none mb-2`}>
        <span className="relative inline-block">
          <span className="font-black">R</span>
          <span className="font-normal ml-1">D</span>
        </span>
      </div>

      {/* ROYAL DRIVE Text */}
      <div className={`${textSizeClasses[size]} ${textColor} font-bold tracking-[0.25em] uppercase text-center leading-none`}>
        ROYAL DRIVE
      </div>
    </div>
  )
}

export default Logo
