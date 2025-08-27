import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Sophisticated Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a961' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Main Footer Content */}
      <div className="relative">
        {/* Premium Top Section */}
        <div className="border-b border-gray-700/50">
          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

              {/* Brand Section - Enhanced */}
              <div className="lg:col-span-4 space-y-6">
                <Logo variant="light" size="lg" />
                <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                  Toronto's premier destination for luxury pre-owned vehicles.
                  We deliver exceptional quality, safety-certified cars with
                  unmatched customer service.
                </p>

                {/* Contact Cards */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-gray-700/50">
                    <div className="w-12 h-12 bg-[#c9a961] rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg">(647) 622-2202</p>
                      <p className="text-gray-400 text-sm">Available Mon-Sat, 9AM-7PM</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-gray-700/50">
                    <div className="w-12 h-12 bg-[#c9a961] rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold">751 Danforth Rd</p>
                      <p className="text-gray-400 text-sm">Toronto, ON</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Navigation */}
              <div className="lg:col-span-3 space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <span className="w-1 h-8 bg-[#c9a961] rounded-full mr-3"></span>
                  Quick Links
                </h3>
                <div className="space-y-3">
                  {[
                    { href: '/used-cars', label: 'Used Cars', desc: 'Browse inventory' },
                    { href: '/car-financing', label: 'Financing', desc: 'Get approved' },
                    { href: '/car-deal', label: 'Special Offers', desc: 'Current deals' },
                    { href: '/trade-in', label: 'Trade-In', desc: 'Sell your car' },
                    { href: '/about', label: 'About Us', desc: 'Our story' },
                    { href: '/contact', label: 'Contact', desc: 'Get in touch' }
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-all duration-300"
                    >
                      <div>
                        <p className="text-white font-medium group-hover:text-[#c9a961] transition-colors">
                          {link.label}
                        </p>
                        <p className="text-gray-400 text-sm">{link.desc}</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-[#c9a961] group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Vehicle Categories */}
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <span className="w-1 h-8 bg-[#c9a961] rounded-full mr-3"></span>
                  Vehicle Types
                </h3>
                <div className="space-y-3">
                  {[
                    { type: 'sedan', label: 'Sedans', icon: '🚗' },
                    { type: 'suv', label: 'SUVs', icon: '🚙' },
                    { type: 'truck', label: 'Trucks', icon: '🛻' },
                    { type: 'hybrid', label: 'Hybrids', icon: '🔋' },
                    { type: 'luxury', label: 'Luxury', icon: '✨' },
                    { type: 'hatchback', label: 'Compact', icon: '🚐' }
                  ].map((category) => (
                    <Link
                      key={category.type}
                      href={`/inventory?type=${category.type}`}
                      className="flex items-center space-x-3 text-gray-300 hover:text-[#c9a961] transition-colors group"
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform">{category.icon}</span>
                      <span className="font-medium">{category.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter & Services */}
              <div className="lg:col-span-3 space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <span className="w-1 h-8 bg-[#c9a961] rounded-full mr-3"></span>
                  Stay Connected
                </h3>

                {/* Newsletter */}
                <div className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-gray-700/50">
                  <h4 className="text-lg font-semibold text-white mb-3">Get Updates</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Be first to know about new arrivals and exclusive deals
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c9a961] focus:border-transparent transition-all"
                    />
                    <button className="w-full px-4 py-3 bg-[#c9a961] hover:bg-[#b8860b] text-white font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2">
                      <span>Subscribe</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Services */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white">Our Promise</h4>
                  <div className="space-y-2">
                    {[
                      'Safety Certified Vehicles',
                      'Clean Carfax Reports',
                      'Competitive Financing',
                      'Trade-In Welcome'
                    ].map((service) => (
                      <div key={service} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#c9a961] rounded-full"></div>
                        <span className="text-gray-300 text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Section - Enhanced */}
        <div className="border-b border-gray-700/50">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
              <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
                <h4 className="text-lg font-semibold text-white">Certified & Trusted</h4>
                <div className="flex items-center space-x-6">
                  {[
                    { src: '/certifications/mvic.png', alt: 'OMVIC Registered', width: 80 },
                    { src: '/certifications/ucda.png', alt: 'UCDA Member', width: 80 },
                    { src: '/certifications/carfax.png', alt: 'Carfax Verified', width: 80 }
                  ].map((cert) => (
                    <div key={cert.alt} className="p-3 bg-white rounded-lg hover:shadow-lg transition-shadow">
                      <Image
                        src={cert.src}
                        alt={cert.alt}
                        width={cert.width}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media - Enhanced */}
              <div className="flex items-center space-x-4">
                <span className="text-white font-medium">Follow Us</span>
                <div className="flex space-x-3">
                  {[
                    { name: 'Facebook', icon: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' },
                    { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                    { name: 'Twitter', icon: 'M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z' }
                  ].map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className="w-10 h-10 bg-white/10 hover:bg-[#c9a961] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                    >
                      <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar - Elegant */}
        <div className="bg-gray-900/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-gray-400">
                <p className="text-sm">© {currentYear} Royal Drive Premium Motors. All rights reserved.</p>
                <div className="hidden md:block w-px h-4 bg-gray-600"></div>
                <div className="flex space-x-4 text-sm">
                  <Link href="/privacy" className="hover:text-[#c9a961] transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="hover:text-[#c9a961] transition-colors">Terms of Service</Link>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                <span className="flex items-center space-x-2">
                  <span>Made with</span>
                  <span className="text-[#c9a961]">♦</span>
                  <span>in Toronto</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
