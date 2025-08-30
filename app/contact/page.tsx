import { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import { MapPin, Phone, Mail, Clock, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Royal Drive Canada - Toronto Used Car Dealership | 751 Danforth Road",
  description: "Contact Royal Drive Canada for quality used cars in Toronto. Visit us at 751 Danforth Road, call (647) 622-2202, or email us. Open Mon-Sat. OMVIC licensed dealer serving the GTA.",
  keywords: "contact Royal Drive Canada, Toronto car dealership contact, 751 Danforth Road, phone (647) 622-2202, used car dealer Toronto contact, hours location",
  openGraph: {
    title: "Contact Royal Drive Canada - Toronto Used Car Dealer",
    description: "Get in touch with Toronto&apos;s trusted used car dealership. Visit, call, or email us today.",
    url: 'https://royaldrivecanada.com/contact',
  },
};

export default function ContactPage() {
  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "AutoDealer",
      "name": "Royal Drive Canada",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "751 Danforth Road",
        "addressLocality": "Toronto",
        "addressRegion": "ON",
        "postalCode": "M1K 1N1",
        "addressCountry": "CA"
      },
      "telephone": "(647) 622-2202",
      "email": "info@royaldrivecanada.com",
      "url": "https://royaldrivecanada.com",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "19:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "09:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "11:00",
          "closes": "17:00"
        }
      ],
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "43.6426",
        "longitude": "-79.3871"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactStructuredData) }}
      />
      
      <div className="min-h-screen bg-white">
        {/* Modern Hero Section */}
        <PageHero
          title="Contact Royal Drive Canada"
          subtitle="Visit Toronto's trusted used car dealership. We're here to help you find your perfect vehicle with transparent pricing and exceptional service."
          backgroundImage="/bg-car.jpg"
          compact={true}
          badges={[
            {
              text: "OMVIC Licensed Dealer",
              icon: <Shield className="w-4 h-4 text-blue-400" />
            }
          ]}
          stats={[
            { value: "5,000+", label: "Happy Customers" },
            { value: "15+", label: "Years Experience" },
            { value: "500+", label: "Vehicles Available" }
          ]}
          cta={{
            primary: {
              text: "Call Now: (647) 622-2202",
              action: "call"
            },
            secondary: {
              text: "Get Directions",
              action: "directions"
            }
          }}
        />

        {/* Contact Information */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Contact Details */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-8 text-gray-900">Get in Touch</h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Visit Our Showroom</h3>
                      <p className="text-gray-600">
                        751 Danforth Road<br/>
                        Toronto, ON M1K 1N1<br/>
                        Canada
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Call or Text</h3>
                      <p className="text-gray-600">
                        <a href="tel:6476222202" className="hover:text-blue-600 transition-colors">
                          (647) 622-2202
                        </a>
                      </p>
                      <p className="text-sm text-gray-500">Available 7 days a week</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Email Us</h3>
                      <p className="text-gray-600">
                        <a href="mailto:info@royaldrivecanada.com" className="hover:text-blue-600 transition-colors">
                          info@royaldrivecanada.com
                        </a>
                      </p>
                      <p className="text-sm text-gray-500">{`We'll respond within 24 hours`}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Business Hours</h3>
                      <div className="text-gray-600 space-y-1">
                        <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                        <p>Saturday: 9:00 AM - 6:00 PM</p>
                        <p>Sunday: 11:00 AM - 5:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-8 text-gray-900">Send us a Message</h2>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="(647) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="john.doe@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                      <option>General Inquiry</option>
                      <option>Vehicle Information</option>
                      <option>Financing Question</option>
                      <option>Trade-in Valuation</option>
                      <option>Service Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Our Location</h2>
              <p className="text-xl text-gray-600">
                Conveniently located on Danforth Road in Toronto
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2884.1234567890123!2d-79.38710000000001!3d43.64260000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cc5ee6e6c6e7%3A0x1234567890abcdef!2s751%20Danforth%20Rd%2C%20Toronto%2C%20ON%20M1K%201N1%2C%20Canada!5e0!3m2!1sen!2sca!4v1234567890123!5m2!1sen!2sca"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-96"
                title="Royal Drive Canada Location - 751 Danforth Road, Toronto"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
