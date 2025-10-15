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

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Built on Trust,
                <span className="block text-blue-600">Driven by Excellence</span>
              </h2>

              <div className="space-y-4 text-base text-gray-600">
                <p>
                    {`Royal Drive was founded with a clear vision: to revolutionize the pre-owned car
                    buying experience in Toronto. We believe that purchasing a vehicle should be
                    transparent, stress-free, and built on trust from day one.`}
                </p>
                <p>
                  {`Our dealership brings fresh energy and modern approaches to car sales. Our team
                  consists of experienced automotive professionals who are passionate about helping
                  customers find their perfect vehicle.`}
                </p>
                <p>
                  {`Every vehicle in our inventory is carefully selected, thoroughly inspected, and
                  comes with a complete history report. We're not just selling cars – we're building
                  lasting relationships with our community, one satisfied customer at a time.`}
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden border border-gray-200">
            <Image
              src="/bg.jpg"
              alt="Royal Drive Dealership"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <value.icon className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-sm text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurStory
