import React from 'react'
import Image from 'next/image'

const WhyChooseUs = () => {
  const features = [
    {
      logo: '/carfax.png',
      title: 'CARFAX Verified',
      description: 'Every vehicle comes with a complete CARFAX vehicle history report for your peace of mind'
    },
    {
      logo: '/mvic.png',
      title: 'MVIC Regulated',
      description: 'We are fully regulated by the Motor Vehicle Industry Council of Ontario ensuring ethical sales practices'
    },
    {
      logo: '/ucda.png',
      title: 'UCDA Certified',
      description: 'Proud member of the Used Car Dealers Association with commitment to industry best practices'
    },

  ]

  return (
    <section className="py-16 bg-blue-600">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose Us?</h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Our dealership is certified by industry-leading authorities including CARFAX, 
            MVIC Ontario Vehicle Sales Regulator, and UCDA to ensure you get a reliable 
            vehicle with complete transparency.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center p-3">
                <Image 
                  src={feature.logo}
                  alt={feature.title}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-blue-100">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
