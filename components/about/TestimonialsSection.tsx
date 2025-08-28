import React from 'react'
import { Star, Quote } from 'lucide-react'

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Jennifer Martinez',
      role: 'Business Owner',
      rating: 5,
      text: 'Royal Drive made buying my first car an amazing experience. The team was professional, transparent, and helped me find the perfect vehicle within my budget. Highly recommend!',
      vehicle: '2019 Honda Civic',
      date: 'March 2024'
    },
    {
      name: 'Robert Thompson',
      role: 'Engineer',
      rating: 5,
      text: 'I\'ve purchased three vehicles from Royal Drive over the years. Their quality standards are exceptional, and the after-sales service is outstanding. They truly care about their customers.',
      vehicle: '2020 Toyota RAV4',
      date: 'January 2024'
    },
    {
      name: 'Maria Santos',
      role: 'Teacher',
      rating: 5,
      text: 'The entire process was smooth and stress-free. David and his team went above and beyond to ensure I got the best deal. The car has been perfect for over a year now!',
      vehicle: '2018 Mazda CX-5',
      date: 'February 2023'
    },
    {
      name: 'Michael Chen',
      role: 'Consultant',
      rating: 5,
      text: 'Royal Drive\'s transparency and honesty set them apart. They provided a detailed inspection report and history for my vehicle. No surprises, just excellent service.',
      vehicle: '2021 Subaru Outback',
      date: 'November 2023'
    },
    {
      name: 'Sarah Williams',
      role: 'Marketing Director',
      rating: 5,
      text: 'From browsing to purchase, everything was professional and efficient. The team made sure I understood every aspect of my purchase. Will definitely return for my next car!',
      vehicle: '2019 Volkswagen Jetta',
      date: 'September 2023'
    },
    {
      name: 'James Parker',
      role: 'Small Business Owner',
      rating: 5,
      text: 'Exceptional service from start to finish. They helped me find a reliable vehicle for my business needs and the financing process was seamless. Great experience overall!',
      vehicle: '2020 Ford Transit',
      date: 'May 2023'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-50 border border-yellow-200 mb-6">
            <Star className="w-4 h-4 text-yellow-600 mr-2 fill-current" />
            <span className="text-yellow-700 text-sm font-semibold">Customer Reviews</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Customers
            <span className="block text-yellow-600">Are Saying</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our satisfied customers have to say
            about their experience with Royal Drive.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Quote Icon */}
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Quote className="w-6 h-6 text-blue-600" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-blue-600">{testimonial.vehicle}</div>
                    <div className="text-xs text-gray-500">{testimonial.date}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1,200+</div>
              <div className="text-gray-600">Customer Reviews</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-gray-600">Would Recommend</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
              <div className="text-gray-600">Return Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
