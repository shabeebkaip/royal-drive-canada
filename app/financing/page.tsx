import { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import { CreditCard, Shield, CheckCircle, DollarSign, Clock, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Car Financing Toronto - Auto Loans & Credit Solutions | Royal Drive Canada",
  description: "Get approved for car financing in Toronto with Royal Drive Canada. We offer flexible auto loans, bad credit financing, and competitive rates for all credit types. Apply online or visit our dealership.",
  keywords: "car financing Toronto, auto loans, bad credit car financing, vehicle financing, car loans Toronto, auto financing, credit solutions, finance pre-owned cars, Royal Drive financing",
  openGraph: {
    title: "Car Financing Toronto - Auto Loans & Credit Solutions",
    description: "Get approved for car financing with competitive rates and flexible terms. All credit types welcome at Royal Drive Canada.",
    url: 'https://royaldrivecanada.com/financing',
  },
};

export default function FinancingPage() {
  const financingStructuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Royal Drive Canada Auto Financing",
    "description": "Car financing and auto loan services for all credit types in Toronto and GTA.",
    "provider": {
      "@type": "AutoDealer",
      "name": "Royal Drive Canada"
    },
    "areaServed": "Greater Toronto Area",
    "serviceType": [
      "Auto Financing",
      "Car Loans", 
      "Bad Credit Financing",
      "Vehicle Financing"
    ],
    "offers": {
      "@type": "Offer",
      "description": "Competitive auto financing rates and flexible terms for all credit types"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(financingStructuredData) }}
      />
      
      <div className="min-h-screen bg-white">
        {/* Modern Hero Section */}
        <PageHero
          title="Car Financing Made Easy"
          subtitle="Get approved for auto financing with competitive rates and flexible terms. All credit types welcome at Royal Drive Canada."
          backgroundImage="/bg.jpg"
          compact={true}
          badges={[
            {
              text: "All Credit Types Welcome",
              icon: <CreditCard className="w-4 h-4 text-green-400" />
            },
            {
              text: "Quick Approval Process",
              icon: <Clock className="w-4 h-4 text-blue-400" />
            },
            {
              text: "Competitive Rates",
              icon: <DollarSign className="w-4 h-4 text-yellow-400" />
            }
          ]}
          stats={[
            { value: "3.9%", label: "Starting APR" },
            { value: "96", label: "Max Months" },
            { value: "24hrs", label: "Quick Approval" }
          ]}
          cta={{
            primary: {
              text: "Apply Online Now",
              action: "apply"
            },
            secondary: {
              text: "Call (647) 622-2202",
              action: "call"
            }
          }}
        />

        {/* Financing Options */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Financing Solutions for Everyone</h2>
              <p className="text-xl text-gray-600">
                We work with multiple lenders to find the best rates for your situation
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Excellent Credit</h3>
                <p className="text-gray-600 mb-6">
                  Enjoy the lowest rates and best terms available for qualified buyers.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Competitive interest rates from 3.9%
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Flexible payment terms up to 96 months
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Quick approval process
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Multiple lender options
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Fair Credit</h3>
                <p className="text-gray-600 mb-6">
                  Rebuilding your credit? We have solutions that work for you.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    Competitive rates for fair credit
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    Flexible down payment options
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    Credit improvement programs
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    Personal service and guidance
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Challenged Credit</h3>
                <p className="text-gray-600 mb-6">
                  Past credit challenges don't have to stop you from getting a quality vehicle.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-orange-500 mr-2" />
                    Second chance financing programs
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-orange-500 mr-2" />
                    No credit turned away
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-orange-500 mr-2" />
                    Build your credit with payments
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-orange-500 mr-2" />
                    Fresh start opportunities
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Application Process</h2>
              <p className="text-xl text-gray-600">
                Get pre-approved in minutes with our streamlined process
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Apply Online",
                  description: "Fill out our secure online application in just 5 minutes",
                  icon: <CreditCard className="w-8 h-8" />
                },
                {
                  step: "2",
                  title: "Get Pre-Approved",
                  description: "Receive instant pre-approval with terms and rates",
                  icon: <CheckCircle className="w-8 h-8" />
                },
                {
                  step: "3",
                  title: "Choose Your Vehicle",
                  description: "Browse our inventory and find your perfect match",
                  icon: <Shield className="w-8 h-8" />
                },
                {
                  step: "4",
                  title: "Drive Away Today",
                  description: "Complete the paperwork and drive off the lot",
                  icon: <Users className="w-8 h-8" />
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600">{item.icon}</span>
                  </div>
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Apply for Financing</h2>
                <p className="text-xl text-gray-600">
                  Get pre-approved in minutes - it won't affect your credit score
                </p>
              </div>

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

                <div className="grid md:grid-cols-2 gap-6">
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
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Income *
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                      <option>Select Income Range</option>
                      <option>Under $30,000</option>
                      <option>$30,000 - $50,000</option>
                      <option>$50,000 - $75,000</option>
                      <option>$75,000 - $100,000</option>
                      <option>Over $100,000</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employment Status *
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                      <option>Select Employment Status</option>
                      <option>Full-time Employee</option>
                      <option>Part-time Employee</option>
                      <option>Self-employed</option>
                      <option>Retired</option>
                      <option>Student</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Down Payment
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                      <option>No Down Payment</option>
                      <option>$1,000 - $5,000</option>
                      <option>$5,000 - $10,000</option>
                      <option>$10,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Credit Rating
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                      <option>Select Credit Rating</option>
                      <option>Excellent (750+)</option>
                      <option>Good (650-749)</option>
                      <option>Fair (550-649)</option>
                      <option>Poor (Below 550)</option>
                      <option>No Credit History</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Get Pre-Approved Now
                </button>

                <p className="text-sm text-gray-500 text-center">
                  By submitting this form, you agree to our privacy policy. This will not affect your credit score.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Why Choose Our Financing */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Financing?</h2>
              <p className="text-xl text-gray-600">
                We make car financing simple, transparent, and affordable
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <CheckCircle className="w-8 h-8 text-green-600" />,
                  title: "No Hidden Fees",
                  description: "Transparent pricing with no surprise charges"
                },
                {
                  icon: <Clock className="w-8 h-8 text-blue-600" />,
                  title: "Quick Approval",
                  description: "Get approved in as little as 24 hours"
                },
                {
                  icon: <Shield className="w-8 h-8 text-purple-600" />,
                  title: "Secure Process",
                  description: "Your information is protected and secure"
                },
                {
                  icon: <Users className="w-8 h-8 text-orange-600" />,
                  title: "Expert Support",
                  description: "Our financing experts guide you every step"
                }
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
