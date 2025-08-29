import { Metadata } from "next";

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
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Contact Royal Drive Canada
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Visit Toronto&apos;s premier used car dealership. We&apos;re here to help you find your perfect vehicle.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Contact Details */}
              <div>
                <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">📍</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Visit Our Showroom</h3>
                      <p className="text-gray-600">
                        751 Danforth Road<br/>
                        Toronto, ON M1K 1N1<br/>
                        Canada
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">📞</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Call Us</h3>
                      <p className="text-gray-600">
                        <a href="tel:6476222202" className="hover:text-blue-600">
                          (647) 622-2202
                        </a>
                      </p>
                      <p className="text-sm text-gray-500">Available during business hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">✉️</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Email Us</h3>
                      <p className="text-gray-600">
                        <a href="mailto:info@royaldrivecanada.com" className="hover:text-blue-600">
                          info@royaldrivecanada.com
                        </a>
                      </p>
                      <p className="text-sm text-gray-500">We&apos;ll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">🕒</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Business Hours</h3>
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
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name *</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name *</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Interest</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Browse Inventory</option>
                      <option>Financing Information</option>
                      <option>Trade-in Value</option>
                      <option>Schedule Test Drive</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us how we can help you..."
                      required
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Find Us</h2>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883.4965300123445!2d-79.25921972386499!3d43.72101104804258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4ce47d9bd0091%3A0x9692846d74981a40!2s751%20Danforth%20Rd%2C%20Toronto%2C%20ON%20M1K%201G6%2C%20Canada!5e0!3m2!1sen!2ssa!4v1756461805118!5m2!1sen!2ssa"
                width="100%" 
                height="450" 
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Royal Drive Canada Location - 751 Danforth Road, Toronto"
                className="w-full"
              />
            </div>
            <div className="text-center mt-6">
              <p className="text-gray-600 mb-2">
                <strong>751 Danforth Road, Toronto, ON M1K 1G6</strong>
              </p>
              <p className="text-sm text-gray-500">
                Easily accessible with plenty of parking available
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">Why Choose Royal Drive Canada?</h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="font-bold mb-2">OMVIC Licensed</h3>
                <p className="text-gray-600">Fully licensed and regulated dealer</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="font-bold mb-2">Safety Certified</h3>
                <p className="text-gray-600">All vehicles are safety certified</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="font-bold mb-2">Financing Available</h3>
                <p className="text-gray-600">Flexible financing for all credit types</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="font-bold mb-2">Exceptional Service</h3>
                <p className="text-gray-600">Customer satisfaction guaranteed</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
