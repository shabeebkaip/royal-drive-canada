"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Logo from './Logo'
import { Brand } from '@/types/api'
import { BrandAPI } from '@/types/filters'

interface MegaMenuProps {
  showMegaMenu: boolean
}

const HeaderWithMegaMenu = ({ showMegaMenu = false }: MegaMenuProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
    const [brands, setBrands] = useState<Brand[]>([])
    const pathname = usePathname()
    const router = useRouter()

    // Navigation items for consistency
    const navigationItems = [
        { href: '/', label: 'Home', desc: 'Return to homepage' },
        { href: '/about', label: 'About', desc: 'Learn about our company' },
        { href: '/vehicles', label: 'Our Vehicles', desc: 'Browse our complete inventory' },
        { href: '/financing', label: 'Financing', desc: 'Get pre-approved today' },
        { href: '/contact', label: 'Contact Us', desc: 'Get in touch with us' }
    ]

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (showMegaMenu) {
            const fetchBrands = async () => {
                const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ;
                try {
                    const brandsRes = await fetch(`${apiBase}/makes/dropdown`)
                    const brandsData = await brandsRes.json()
                    if (brandsData.success && brandsData.data) {
                        const brandsList = Array.isArray(brandsData.data) ? brandsData.data : brandsData.data.makes || []
                        const activeBrands = brandsList.map((b: BrandAPI) => ({
                            id: b._id,
                            name: b.name,
                            logo: b.logo,
                            slug: b.slug
                        }))
                        setBrands(activeBrands)
                    }
                } catch (error) {
                    console.error('Failed to fetch brands:', error)
                }
            }
            fetchBrands()
        }
    }, [showMegaMenu])

    const navigateWithFilters = (params: Record<string, string | undefined>) => {
        const searchParams = new URLSearchParams()
        Object.entries(params).forEach(([key, value]) => {
            if (value) searchParams.append(key, value)
        })
        router.push(`/vehicles?${searchParams.toString()}`)
        setActiveMegaMenu(null)
    }

    const vehicleTypes = [
        { label: 'All Used Vehicles', icon: '🚗', params: {} },
        { label: 'Used Cars', icon: '🚘', params: { vehicleType: 'sedan' } },
        { label: 'Used SUVs', icon: '🚙', params: { vehicleType: 'suv' } },
        { label: 'Used Trucks', icon: '🚚', params: { vehicleType: 'truck' } },
        { label: 'Used Vans', icon: '🚐', params: { vehicleType: 'van' } },
        { label: 'Used Coupes', icon: '🏎️', params: { vehicleType: 'coupe' } },
    ]

    const priceRanges = [
        { label: 'Under $10,000', params: { maxPrice: '10000' } },
        { label: '$10,000 - $15,000', params: { minPrice: '10000', maxPrice: '15000' } },
        { label: '$15,000 - $20,000', params: { minPrice: '15000', maxPrice: '20000' } },
        { label: '$20,000 - $25,000', params: { minPrice: '20000', maxPrice: '25000' } },
        { label: '$25,000 - $30,000', params: { minPrice: '25000', maxPrice: '30000' } },
        { label: '$30,000 - $40,000', params: { minPrice: '30000', maxPrice: '40000' } },
        { label: '$40,000 - $50,000', params: { minPrice: '40000', maxPrice: '50000' } },
        { label: 'Over $50,000', params: { minPrice: '50000' } },
    ]

    const paymentRanges = [
        { label: 'Under $200/month', params: { maxPayment: '200' } },
        { label: '$200 - $300/month', params: { minPayment: '200', maxPayment: '300' } },
        { label: '$300 - $400/month', params: { minPayment: '300', maxPayment: '400' } },
        { label: '$400 - $500/month', params: { minPayment: '400', maxPayment: '500' } },
        { label: '$500 - $600/month', params: { minPayment: '500', maxPayment: '600' } },
        { label: 'Over $600/month', params: { minPayment: '600' } },
    ]

    const specialCategories = [
        { label: 'Cheap Cars (Under $15k)', icon: '💰', params: { maxPrice: '15000' } },
        { label: 'Fuel Efficient Cars', icon: '⚡', params: { fuelType: 'hybrid' } },
        { label: '7+ Seater Vehicles', icon: '👨‍👩‍👧‍👦', params: { minSeats: '7' } },
        { label: 'Luxury Vehicles', icon: '👑', params: { minPrice: '50000' } },
    ]

    return (
        <>
            {/* Professional Header */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 shadow-lg' : 'py-4'}`}>
                {/* Clean Professional Background */}
                <div className="absolute inset-0 bg-white/95 backdrop-blur-md border-b border-gray-200/50"></div>

                <div className="relative container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-14 sm:h-16">
                        {/* Professional Logo */}
                        <div className="flex-shrink-0 min-w-0">
                            <Link href="/" className="block">
                                <Logo variant="dark" size="md"/>
                            </Link>
                        </div>

                        {/* Clean Navigation */}
                        <nav className="hidden lg:flex items-center space-x-8">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`font-medium transition-colors duration-200 relative group ${
                                        pathname === item.href 
                                            ? 'text-blue-600' 
                                            : 'text-gray-700 hover:text-gray-900'
                                    }`}
                                >
                                    {item.label}
                                    <span
                                        className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                                            pathname === item.href 
                                                ? 'w-full' 
                                                : 'w-0 group-hover:w-full'
                                        }`}
                                    ></span>
                                </Link>
                            ))}
                        </nav>

                        {/* Professional Right Side */}
                        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-6">
                            {/* Contact Information */}
                            <div className="hidden xl:flex items-center space-x-4">
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                    </svg>
                                    <span className="font-semibold text-gray-900 text-sm">647-622-2202</span>
                                </div>
                                <div className="w-px h-6 bg-gray-300"></div>
                            </div>

                            {/* Professional CTA Button */}
                            <Link
                                href="/sell-your-car"
                                className="hidden md:inline-flex items-center px-3 md:px-4 lg:px-6 py-2 md:py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md whitespace-nowrap">
                                <svg className="w-4 h-4 mr-1.5 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                </svg>
                                <span className="hidden lg:inline">Sell Your Car</span>
                                <span className="lg:hidden">Sell Car</span>
                            </Link>

                            {/* Professional Mobile Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden p-1.5 sm:p-2 rounded-lg border border-gray-300 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 flex-shrink-0"
                                aria-label="Toggle menu"
                            >
                                <svg
                                    className={`h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`}
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M6 18L18 6M6 6l12 12"/>
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M4 6h16M4 12h16M4 18h16"/>
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mega Menu - Only on Home Page */}
            {showMegaMenu && (
                <div className="fixed top-[56px] sm:top-[64px] left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-md">
                    <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                        <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide">
                            {/* Shop Used Vehicles */}
                            <div className="relative">
                                <button
                                    onMouseEnter={() => setActiveMegaMenu('vehicles')}
                                    onClick={() => setActiveMegaMenu(activeMegaMenu === 'vehicles' ? null : 'vehicles')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-sm font-medium ${
                                        activeMegaMenu === 'vehicles' 
                                            ? 'bg-blue-50 text-blue-700' 
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    Shop Used Vehicles
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Shop By Price */}
                            <div className="relative">
                                <button
                                    onMouseEnter={() => setActiveMegaMenu('price')}
                                    onClick={() => setActiveMegaMenu(activeMegaMenu === 'price' ? null : 'price')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-sm font-medium ${
                                        activeMegaMenu === 'price' 
                                            ? 'bg-blue-50 text-blue-700' 
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    Shop By Price
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Shop By Payment */}
                            <div className="relative">
                                <button
                                    onMouseEnter={() => setActiveMegaMenu('payment')}
                                    onClick={() => setActiveMegaMenu(activeMegaMenu === 'payment' ? null : 'payment')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-sm font-medium ${
                                        activeMegaMenu === 'payment' 
                                            ? 'bg-blue-50 text-blue-700' 
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    Shop By Payment
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Shop By Brand */}
                            <div className="relative">
                                <button
                                    onMouseEnter={() => setActiveMegaMenu('brand')}
                                    onClick={() => setActiveMegaMenu(activeMegaMenu === 'brand' ? null : 'brand')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-sm font-medium ${
                                        activeMegaMenu === 'brand' 
                                            ? 'bg-blue-50 text-blue-700' 
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    Shop By Brand
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Special Categories */}
                            <div className="relative">
                                <button
                                    onMouseEnter={() => setActiveMegaMenu('special')}
                                    onClick={() => setActiveMegaMenu(activeMegaMenu === 'special' ? null : 'special')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-sm font-medium ${
                                        activeMegaMenu === 'special' 
                                            ? 'bg-blue-50 text-blue-700' 
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    Special Categories
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mega Menu Dropdown */}
                    {activeMegaMenu && (
                        <div 
                            className="absolute left-0 right-0 bg-white border-t border-gray-200 shadow-xl"
                            onMouseLeave={() => setActiveMegaMenu(null)}
                        >
                            <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8">
                                {/* Vehicle Types Menu */}
                                {activeMegaMenu === 'vehicles' && (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {vehicleTypes.map((type, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => navigateWithFilters(type.params)}
                                                className="flex items-center gap-3 p-4 rounded-lg hover:bg-blue-50 transition-colors text-left group"
                                            >
                                                <span className="text-2xl">{type.icon}</span>
                                                <span className="font-medium text-gray-700 group-hover:text-blue-600">{type.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Price Ranges Menu */}
                                {activeMegaMenu === 'price' && (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                        {priceRanges.map((range, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => navigateWithFilters(range.params)}
                                                className="p-4 rounded-lg hover:bg-blue-50 transition-colors text-left font-medium text-gray-700 hover:text-blue-600 border border-gray-200 hover:border-blue-300"
                                            >
                                                {range.label}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Payment Ranges Menu */}
                                {activeMegaMenu === 'payment' && (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                        {paymentRanges.map((range, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => navigateWithFilters(range.params)}
                                                className="p-4 rounded-lg hover:bg-blue-50 transition-colors text-left font-medium text-gray-700 hover:text-blue-600 border border-gray-200 hover:border-blue-300"
                                            >
                                                {range.label}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Brands Menu */}
                                {activeMegaMenu === 'brand' && (
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-96 overflow-y-auto">
                                        {brands.map((brand) => (
                                            <button
                                                key={brand.id}
                                                onClick={() => navigateWithFilters({ make: brand.id.toString() })}
                                                className="p-3 rounded-lg hover:bg-blue-50 transition-colors text-center font-medium text-gray-700 hover:text-blue-600 border border-gray-200 hover:border-blue-300"
                                            >
                                                {brand.name}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Special Categories Menu */}
                                {activeMegaMenu === 'special' && (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {specialCategories.map((category, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => navigateWithFilters(category.params)}
                                                className="flex items-center gap-3 p-4 rounded-lg hover:bg-blue-50 transition-colors text-left group"
                                            >
                                                <span className="text-2xl">{category.icon}</span>
                                                <span className="font-medium text-gray-700 group-hover:text-blue-600">{category.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Backdrop for mega menu */}
            {activeMegaMenu && (
                <div 
                    className="fixed inset-0 bg-black/10 z-30"
                    onClick={() => setActiveMegaMenu(null)}
                />
            )}

            {/* Professional Mobile Menu (existing code) */}
            <div
                className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div
                    className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
                    onClick={() => setIsMenuOpen(false)}
                ></div>

                <div
                    className={`absolute top-20 left-4 right-4 transform transition-all duration-300 ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
                    <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Navigation</h3>
                        </div>

                        <nav className="p-2">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`block p-4 rounded-lg transition-colors duration-200 border-b border-gray-100 last:border-b-0 ${
                                        pathname === item.href 
                                            ? 'bg-blue-50 border-blue-200' 
                                            : 'hover:bg-gray-50'
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className={`font-semibold ${
                                                pathname === item.href 
                                                    ? 'text-blue-600' 
                                                    : 'text-gray-900'
                                            }`}>
                                                {item.label}
                                            </div>
                                            <div className="text-sm text-gray-500">{item.desc}</div>
                                        </div>
                                        <svg className={`w-5 h-5 ${
                                            pathname === item.href 
                                                ? 'text-blue-500' 
                                                : 'text-gray-400'
                                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M9 5l7 7-7 7"/>
                                        </svg>
                                    </div>
                                </Link>
                            ))}

                            <div className="p-4 bg-gray-50 rounded-lg mt-2">
                                <a
                                    href="tel:6476222202"
                                    className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                    </svg>
                                    Call (647) 622-2202
                                </a>

                                <div className="text-center mt-3 text-gray-600">
                                    <div className="text-xs">All budgets welcome • Trade-ins accepted</div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderWithMegaMenu
