import React from 'react'
import Image from 'next/image'
import { MapPin, Phone, Clock, Star } from 'lucide-react'

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'David Chen',
      role: 'General Manager',
      image: '', // Using placeholder for now
      experience: '12+ Years',
      speciality: 'Customer Relations',
      description: 'David leads our team with passion and ensures every customer receives exceptional service.'
    },
    {
      name: 'Sarah Johnson',
      role: 'Sales Manager',
      image: '/bg.jpg', // Using placeholder for now
      experience: '8+ Years',
      speciality: 'Vehicle Sourcing',
      description: 'Sarah specializes in finding the perfect vehicle match for every customer\'s needs and budget.'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Service Advisor',
      image: '/bg.jpg', // Using placeholder for now
      experience: '10+ Years',
      speciality: 'Technical Expertise',
      description: 'Mike ensures every vehicle meets our rigorous quality standards before reaching our lot.'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
            <span className="text-blue-700 text-sm font-semibold">Our Team</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet the Experts Behind
            <span className="block text-blue-600">Royal Drive</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our experienced team of automotive professionals is dedicated to helping you find
            the perfect vehicle and providing exceptional service every step of the way.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{member.experience}</div>
                        <div className="text-xs text-gray-600">{member.speciality}</div>
                      </div>
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-xs font-medium text-gray-900 ml-1">Expert</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Ready to Find Your Perfect Vehicle?
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our team is here to help you every step of the way. Visit our showroom,
                give us a call, or send us a message to get started on your automotive journey.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Visit Our Showroom</div>
                    <div className="text-gray-600">751 Danforth Rd, Toronto, ON</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Call Us Today</div>
                    <div className="text-gray-600">(647) 622-2202</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Business Hours</div>
                    <div className="text-gray-600">Mon-Sat: 9AM-7PM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right CTA */}
            <div className="text-center lg:text-left">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  Start Your Journey Today
                </h4>
                <p className="text-gray-600 mb-6">
                  Browse our inventory or schedule a test drive with one of our experts.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                    View Inventory
                  </button>
                  <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors">
                    Schedule Visit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeamSection
