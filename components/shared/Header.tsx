"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from './Logo'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Professional Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 shadow-lg' : 'py-4'}`}>
        {/* Clean Professional Background */}
        <div className="absolute inset-0 bg-white/95 backdrop-blur-md border-b border-gray-200/50"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Professional Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                <Logo variant="dark" size="md" />
              </Link>
            </div>

            {/* Clean Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="/used-cars"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
              >
                All Vehicles
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                href="/car-financing"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
              >
                Financing
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                href="/car-deal"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
              >
                Special Deals
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                href="/about"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                href="/contact"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
              >
                Contact Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>

            {/* Professional Right Side */}
            <div className="flex items-center space-x-6">
              {/* Contact Information */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-semibold text-gray-900">647-622-2202</span>
                </div>
                <div className="w-px h-6 bg-gray-300"></div>
              </div>

              {/* Professional CTA Button - Updated for All Customers */}
              <button className="hidden sm:inline-flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Sell Your Car
              </button>

              {/* Professional Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg border border-gray-300 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <svg className={`h-5 w-5 transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Professional Mobile Menu */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Clean Backdrop */}
        <div
          className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        ></div>

        {/* Professional Menu Content */}
        <div className={`absolute top-20 left-4 right-4 transform transition-all duration-300 ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Menu Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Navigation</h3>
            </div>

            <nav className="p-2">
              {[
                { href: '/used-cars', label: 'All Vehicles', desc: 'Browse our complete inventory' },
                { href: '/car-financing', label: 'Car Financing', desc: 'Get pre-approved today' },
                { href: '/car-deal', label: 'Special Deals', desc: 'Current promotions & offers' },
                { href: '/about', label: 'About', desc: 'Learn about our company' },
                { href: '/contact', label: 'Contact Us', desc: 'Get in touch with us' }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{item.label}</div>
                      <div className="text-sm text-gray-500">{item.desc}</div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}

              {/* Contact Section */}
              <div className="p-4 bg-gray-50 rounded-lg mt-2">
                <button
                  className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Sell Your Car
                </button>

                <div className="text-center mt-3 text-gray-600">
                  <div className="font-semibold">📞 647-622-2202</div>
                  <div className="text-xs mt-1">All budgets welcome • Trade-ins accepted</div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
