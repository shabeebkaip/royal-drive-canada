"use client"
import React from 'react'
import Image from 'next/image'
import { Shield, Award, CheckCircle, Star, TrendingUp, Users } from 'lucide-react'

const WhyChooseUs = () => {
  const features = [
    {
      logo: '/certifications/carfax.png',
      title: 'CARFAX Verified',
      description: 'Every vehicle comes with a complete CARFAX vehicle history report for your peace of mind',
      icon: Shield,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50'
    },
    {
      logo: '/certifications/mvic.png',
      title: 'MVIC Regulated',
      description: 'We are fully regulated by the Motor Vehicle Industry Council of Ontario ensuring ethical sales practices',
      icon: Award,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      logo: '/certifications/ucda.png',
      title: 'UCDA Certified',
      description: 'Proud member of the Used Car Dealers Association with commitment to industry best practices',
      icon: CheckCircle,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
  ]

  const stats = [
    { number: '5,000+', label: 'Happy Customers', icon: Users },
    { number: '98%', label: 'Satisfaction Rate', icon: Star },
    { number: '15+', label: 'Years Experience', icon: TrendingUp }
  ]

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Professional Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <Image
            src="/bg.jpg"
            alt="Car dealership showroom"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gray-900/85" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
            <span className="text-white/95 text-sm font-semibold">
              Trusted & Certified Dealership
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="block">Why Choose</span>
            <span className="block text-blue-400">Royal Drive?</span>
          </h2>

          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our dealership is certified by industry-leading authorities, ensuring you get a reliable
            vehicle with complete transparency and unmatched quality assurance.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" />
                  <span className="text-2xl lg:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {stat.number}
                  </span>
                </div>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Logo Container */}
              <div className="relative mb-6">
                <div className={`w-20 h-20 mx-auto rounded-xl ${feature.bgColor} flex items-center justify-center relative`}>
                  <Image
                    src={feature.logo}
                    alt={feature.title}
                    width={50}
                    height={50}
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Floating icon badge */}
                <div className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center shadow-lg`}>
                  <feature.icon className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white">
                Quality Guarantee
              </h3>
            </div>

            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Every vehicle undergoes rigorous inspection and comes with industry-standard certifications.
              Your satisfaction and safety are our top priorities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg">
                Browse Certified Vehicles
              </button>
              <button className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-lg transition-colors duration-200">
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
