import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from './Logo';
import { Phone, MapPin, Clock, Shield, Award, CheckCircle, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900">
      {/* Main Footer Content */}
      <div>
        {/* Top Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Brand Section */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <Logo variant="light" size="lg" />
                <p className="text-base text-gray-400 mt-4">
                  {`Toronto's premier destination for quality pre-owned vehicles.
                  We deliver exceptional quality, safety-certified cars with
                  unmatched customer service.`}
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">(647) 622-2202</p>
                    <p className="text-gray-500 text-sm">Mon-Sat, 9AM-7PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">751 Danforth Rd</p>
                    <p className="text-gray-500 text-sm">Toronto, ON</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-lg font-bold text-white">
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
                    className="block text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter & Trust Badges */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">
                  Stay Updated
                </h3>

                {/* Newsletter */}
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
                  <h4 className="text-base font-medium text-white mb-2">Get New Arrivals</h4>
                  <p className="text-gray-400 text-sm mb-4">
                    Be the first to know about new vehicles and exclusive deals.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <button className="w-full px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm">
                      Subscribe Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="space-y-3">
                <h4 className="text-base font-medium text-white">Our Promise</h4>
                <div className="space-y-2">
                  {[
                    { icon: Shield, text: 'Safety Certified Vehicles' },
                    { icon: Award, text: 'Quality Guaranteed' },
                    { icon: CheckCircle, text: 'Clean Vehicle History' },
                    { icon: Clock, text: 'Quick Financing Approval' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-400">
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
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <span className="text-sm text-gray-400 font-medium">
                  Licensed & Certified Dealer
                </span>

                <div className="flex items-center gap-4">
                  {[
                    { src: '/certifications/mvic.png', alt: 'OMVIC Registered' },
                    { src: '/certifications/ucda.gif', alt: 'UCDA Member' },
                    { src: '/certifications/carfax.png', alt: 'Carfax Verified' }
                  ].map((cert) => (
                    <div key={cert.alt} className="p-3 bg-white rounded-lg border border-gray-200">
                      <Image
                        src={cert.src}
                        alt={cert.alt}
                        width={70}
                        height={35}
                        className="object-contain w-16 h-8"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400 font-medium">Follow Us</span>
                <div className="flex gap-2">
                  {/* Facebook */}
                  <a
                    href="#"
                    className="w-9 h-9 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  
                  {/* Instagram */}
                  <a
                    href="#"
                    className="w-9 h-9 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-gray-400" />
                  </a>
                  
                  {/* Twitter */}
                  <a
                    href="#"
                    className="w-9 h-9 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Twitter className="w-4 h-4 text-gray-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-gray-800 bg-gray-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-gray-500">
                <p className="text-sm">© {currentYear} Royal Drive. All rights reserved.</p>
                <div className="hidden sm:block w-px h-4 bg-gray-700"></div>
                <div className="flex gap-4 text-sm">
                  <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Toronto, ON
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
