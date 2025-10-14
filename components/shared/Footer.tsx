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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

            {/* Brand Section */}
            <div className="space-y-4">
              <Logo variant="light" size="md" />
              <p className="text-sm text-gray-400">
                Toronto's premier destination for quality pre-owned vehicles.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">Contact</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <p className="text-sm text-gray-400">(647) 622-2202</p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <p className="text-sm text-gray-400">751 Danforth Rd, Toronto</p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <p className="text-sm text-gray-400">Mon-Sat, 9AM-7PM</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">Quick Links</h3>
              <div className="space-y-1.5">
                {[
                  { href: '/vehicles', label: 'Browse Vehicles' },
                  { href: '/financing', label: 'Financing' },
                  { href: '/about', label: 'About Us' },
                  { href: '/contact', label: 'Contact' }
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Trust & Certifications */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">Our Promise</h3>
              <div className="space-y-1.5">
                {[
                  { icon: Shield, text: 'Safety Certified' },
                  { icon: Award, text: 'Quality Guaranteed' },
                  { icon: CheckCircle, text: 'CARFAX Verified' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <item.icon className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-sm text-gray-400">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <span className="text-xs text-gray-500">Licensed & Certified Dealer</span>
                <div className="flex items-center gap-3">
                  {[
                    { src: '/certifications/mvic.png', alt: 'OMVIC Registered', width: 70 },
                    { src: '/certifications/ucda.gif', alt: 'UCDA Member', width: 90 },
                    { src: '/certifications/carfax.png', alt: 'Carfax Verified', width: 70 }
                  ].map((cert) => (
                    <div key={cert.alt} className="p-2.5 bg-white rounded-md border border-gray-200">
                      <Image
                        src={cert.src}
                        alt={cert.alt}
                        width={cert.width}
                        height={35}
                        className="object-contain h-7"
                        style={{ width: 'auto', maxWidth: cert.width }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="flex items-center gap-2">
                <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-md flex items-center justify-center transition-colors">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-md flex items-center justify-center transition-colors">
                  <Instagram className="w-3.5 h-3.5 text-gray-400" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-md flex items-center justify-center transition-colors">
                  <Twitter className="w-3.5 h-3.5 text-gray-400" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-gray-800 bg-gray-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
              <p>© {currentYear} Royal Drive. All rights reserved.</p>
              <div className="flex items-center gap-3">
                <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
                <span>•</span>
                <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
                <span>•</span>
                <span>Toronto, ON</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
