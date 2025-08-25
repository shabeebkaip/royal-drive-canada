import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-3xl font-bold text-blue-600 tracking-tight">
              Royal Drive
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/new-cars" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-semibold transition-colors tracking-wide"
            >
              New cars
            </Link>
            <Link 
              href="/used-cars" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-semibold transition-colors tracking-wide"
            >
              Used cars
            </Link>
            <Link 
              href="/car-service" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-semibold transition-colors tracking-wide"
            >
              Car service
            </Link>
            <Link 
              href="/car-financing" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-semibold transition-colors tracking-wide"
            >
              Car financing
            </Link>
            <Link 
              href="/car-deal" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-semibold transition-colors tracking-wide"
            >
              Car deal
            </Link>
            <Link 
              href="/electric-cars" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-semibold transition-colors tracking-wide"
            >
              Electric cars
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
