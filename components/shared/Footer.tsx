import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from './Logo';
import { Phone, MapPin, Clock, Shield, Award, CheckCircle, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Top Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Brand Section */}
            <div className="lg:col-span-4 space-y-8">
              <div>
                <Logo variant="light" size="lg" />
                <p className="text-lg text-gray-300 mt-6 leading-relaxed">
                  {`Toronto's premier destination for quality pre-owned vehicles.
                  We deliver exceptional quality, safety-certified cars with
                  unmatched customer service.`}
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">(647) 622-2202</p>
                    <p className="text-gray-400 text-sm">Mon-Sat, 9AM-7PM</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">751 Danforth Rd</p>
                    <p className="text-gray-400 text-sm">Toronto, ON</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-3 space-y-6">
              <h3 className="text-2xl font-bold text-white flex items-center">
                <span className="w-1 h-8 bg-blue-400 rounded-full mr-3"></span>
                Quick Links
              </h3>
              <div className="space-y-2">
                {[
                  { href: '/financing', label: 'Car Financing' },
                  { href: '/about', label: 'About Us' },
                  { href: '/contact', label: 'Contact Us' },
                  { href: '/vehicles', label: 'Our Vehicles' }
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-gray-300 hover:text-blue-400 transition-colors py-2 group"
                  >
                    <span className="flex items-center">
                      {link.label}
                      <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter & Trust Badges */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center mb-6">
                  <span className="w-1 h-8 bg-blue-400 rounded-full mr-3"></span>
                  Stay Updated
                </h3>

                {/* Newsletter */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Get New Arrivals</h4>
                  <p className="text-gray-300 text-sm mb-6">
                    Be the first to know about new vehicles and exclusive deals.
                  </p>
                  <div className="space-y-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    />
                    <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg">
                      Subscribe Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Our Promise</h4>
                <div className="space-y-3">
                  {[
                    { icon: Shield, text: 'Safety Certified Vehicles' },
                    { icon: Award, text: 'Quality Guaranteed' },
                    { icon: CheckCircle, text: 'Clean Vehicle History' },
                    { icon: Clock, text: 'Quick Financing Approval' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 text-gray-300">
                      <item.icon className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
              <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
                <div className="inline-flex items-center px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-white/95 text-sm font-semibold">
                    Licensed & Certified Dealer
                  </span>
                </div>

                <div className="flex items-center space-x-6">
                  {[
                    { src: '/certifications/mvic.png', alt: 'OMVIC Registered' },
                    { src: '/certifications/ucda.png', alt: 'UCDA Member' },
                    { src: '/certifications/carfax.png', alt: 'Carfax Verified' }
                  ].map((cert) => (
                    <div key={cert.alt} className="p-4 bg-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <Image
                        src={cert.src}
                        alt={cert.alt}
                        width={80}
                        height={40}
                        className="object-contain w-20 h-10"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="flex items-center space-x-4">
                <span className="text-white font-medium">Follow Us</span>
                <div className="flex space-x-3">
                  {/* Facebook */}
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 hover:bg-blue-600 border border-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  >
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  
                  {/* Instagram */}
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 hover:bg-blue-600 border border-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  >
                    <Instagram className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
                  </a>
                  
                  {/* Twitter */}
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 hover:bg-blue-600 border border-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  >
                    <Twitter className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-white/10 bg-gray-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-gray-400">
                <p className="text-sm">© {currentYear} Royal Drive. All rights reserved.</p>
                <div className="hidden md:block w-px h-4 bg-gray-600"></div>
                <div className="flex space-x-4 text-sm">
                  <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                <span className="flex items-center space-x-2">
                  <span>Built for automotive excellence</span>
                  <span className="text-blue-400">•</span>
                  <span>Toronto, ON</span>
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
