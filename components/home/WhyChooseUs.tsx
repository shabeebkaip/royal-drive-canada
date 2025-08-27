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
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      logo: '/certifications/mvic.png',
      title: 'MVIC Regulated',
      description: 'We are fully regulated by the Motor Vehicle Industry Council of Ontario ensuring ethical sales practices',
      icon: Award,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      logo: '/certifications/ucda.png',
      title: 'UCDA Certified',
      description: 'Proud member of the Used Car Dealers Association with commitment to industry best practices',
      icon: CheckCircle,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
  ]

  const stats = [
    { number: '5,000+', label: 'Happy Customers', icon: Users, color: 'text-green-600' },
    { number: '98%', label: 'Satisfaction Rate', icon: Star, color: 'text-yellow-500' },
    { number: '15+', label: 'Years Experience', icon: TrendingUp, color: 'text-blue-600' }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-50 border border-blue-200 mb-8">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 animate-pulse"></div>
            <span className="text-blue-700 text-sm font-semibold">
              Trusted & Certified Dealership
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            <span className="block">Why Choose</span>
            <span className="block text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
              Royal Drive?
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Our dealership is certified by industry-leading authorities, ensuring you get a reliable
            vehicle with complete transparency and unmatched quality assurance.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="group text-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg border border-gray-100 transition-all duration-300">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className={`p-3 rounded-xl bg-white shadow-md ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl lg:text-4xl font-bold text-gray-900">
                    {stat.number}
                  </span>
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white border-2 ${feature.borderColor} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
            >
              {/* Logo Container */}
              <div className="relative mb-8">
                <div className={`w-24 h-24 mx-auto rounded-2xl ${feature.bgColor} flex items-center justify-center relative border-2 ${feature.borderColor}`}>
                  <Image
                    src={feature.logo}
                    alt={feature.title}
                    width={80}
                    height={50}
                    className="object-contain max-w-[80px] max-h-[50px] group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Floating icon badge */}
                <div className={`absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center shadow-lg`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover effect indicator */}
              <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r ${feature.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl p-12 max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Quality Guarantee
              </h3>
            </div>

            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Every vehicle undergoes rigorous inspection and comes with industry-standard certifications.
              Your satisfaction and safety are our top priorities.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                Browse Certified Vehicles
              </button>
              <button className="px-8 py-4 bg-white hover:bg-gray-50 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl transition-all duration-200 hover:shadow-lg">
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
