import { Metadata } from "next";

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
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Car Financing Made Easy in Toronto
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Get approved for auto financing with competitive rates and flexible terms. 
              All credit types welcome at Royal Drive Canada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Apply Online Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Call (647) 622-2202
              </button>
            </div>
          </div>
        </section>

        {/* Financing Options */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Financing Solutions for Everyone</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-600">Excellent Credit</h3>
                <p className="text-gray-600 mb-4">
                  Enjoy the lowest rates and best terms available for qualified buyers.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Competitive interest rates from 3.9%</li>
                  <li>• Flexible payment terms up to 96 months</li>
                  <li>• Quick approval process</li>
                  <li>• Multiple lender options</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-600">Fair Credit</h3>
                <p className="text-gray-600 mb-4">
                  Rebuilding your credit? We have solutions that work for you.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Competitive rates for fair credit</li>
                  <li>• Flexible down payment options</li>
                  <li>• Credit improvement programs</li>
                  <li>• Personal service and guidance</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-600">Challenged Credit</h3>
                <p className="text-gray-600 mb-4">
                  Past credit challenges don&apos;t have to stop you from getting a quality vehicle.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Bad credit financing specialists</li>
                  <li>• Fresh start programs</li>
                  <li>• Bankruptcy and consumer proposal OK</li>
                  <li>• Build credit with on-time payments</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Royal Drive Financing?</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-bold mb-2">Fast Approval</h3>
                <p className="text-gray-600">Get approved in minutes, not days</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="font-bold mb-2">Competitive Rates</h3>
                <p className="text-gray-600">Best rates in the GTA area</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="font-bold mb-2">All Credit Welcome</h3>
                <p className="text-gray-600">Solutions for every credit situation</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="font-bold mb-2">OMVIC Licensed</h3>
                <p className="text-gray-600">Licensed and regulated dealer</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8">
              Take the first step towards owning your next vehicle. Our financing experts are here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Apply for Financing
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
                Browse Our Inventory
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
