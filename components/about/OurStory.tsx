import React from 'react'
import Image from 'next/image'
import { Target, Heart, Shield, Award } from 'lucide-react'

const OurStory = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide exceptional quality pre-owned vehicles with complete transparency and outstanding customer service.',
      color: 'blue'
    },
    {
      icon: Heart,
      title: 'Our Passion',
      description: 'We are passionate about connecting people with reliable vehicles that enhance their daily lives.',
      color: 'red'
    },
    {
      icon: Shield,
      title: 'Our Promise',
      description: 'Every vehicle undergoes rigorous inspection and comes with our commitment to quality and safety.',
      color: 'green'
    },
    {
      icon: Award,
      title: 'Our Excellence',
      description: 'Committed to industry best practices and building trust with every customer interaction.',
      color: 'purple'
    }
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 border-blue-200 text-blue-600'
      case 'red':
        return 'bg-red-50 border-red-200 text-red-600'
      case 'green':
        return 'bg-green-50 border-green-200 text-green-600'
      case 'purple':
        return 'bg-purple-50 border-purple-200 text-purple-600'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-600'
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                <span className="text-blue-700 text-sm font-semibold">Our Story</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Built on Trust,
                <span className="block text-blue-600">Driven by Excellence</span>
              </h2>

              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Royal Drive was founded with a clear vision: to revolutionize the pre-owned car
                  buying experience in Toronto. We believe that purchasing a vehicle should be
                  transparent, stress-free, and built on trust from day one.
                </p>
                <p>
                  Our dealership brings fresh energy and modern approaches to car sales. Our team
                  consists of experienced automotive professionals who are passionate about helping
                  customers find their perfect vehicle.
                </p>
                <p>
                  Every vehicle in our inventory is carefully selected, thoroughly inspected, and
                  comes with a complete history report. We're not just selling cars – we're building
                  lasting relationships with our community, one satisfied customer at a time.
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/bg.jpg"
                alt="Royal Drive Dealership"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              {/* Floating Stats Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">100%</div>
                    <div className="text-xs text-gray-600">Certified</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">50+</div>
                    <div className="text-xs text-gray-600">Vehicles</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">24/7</div>
                    <div className="text-xs text-gray-600">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="text-center group hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl border-2 ${getColorClasses(value.color)} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <value.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurStory
