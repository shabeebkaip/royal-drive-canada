import { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import { DollarSign, Clock, ShieldCheck, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Sell Your Car Toronto - Get Cash for Your Vehicle | Royal Drive Canada",
  description: "Sell your car quickly and easily in Toronto. Get a fair cash offer for your vehicle within 24 hours. Free appraisal, instant payment, and hassle-free process at Royal Drive Canada.",
  keywords: "sell car Toronto, sell my car, cash for cars, car appraisal, vehicle trade-in, sell car fast, Royal Drive Canada",
  openGraph: {
    title: "Sell Your Car Toronto - Get Cash for Your Vehicle",
    description: "Get a fair cash offer for your vehicle within 24 hours. Free appraisal and instant payment.",
    url: 'https://royaldrivecanada.com/sell-your-car',
  },
};

export default function SellYourCarPage() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <PageHero
          title="Sell Your Car"
          subtitle="Get a fair cash offer for your vehicle within 24 hours. Free appraisal and instant payment."
          compact={true}
          badges={[
            {
              text: "Fair Market Value",
              icon: <DollarSign className="w-4 h-4 text-blue-600" />
            },
            {
              text: "Quick Process",
              icon: <Clock className="w-4 h-4 text-blue-600" />
            },
            {
              text: "Secure Transaction",
              icon: <ShieldCheck className="w-4 h-4 text-blue-600" />
            }
          ]}
          cta={{
            primary: {
              text: "Get Your Offer",
              action: "apply"
            },
            secondary: {
              text: "Call (647) 622-2202",
              action: "call"
            }
          }}
        />

        {/* How It Works */}
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-3">How It Works</h2>
              <p className="text-base text-gray-600">
                Sell your car in three simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Get Your Quote",
                  description: "Fill out our simple form or call us for an instant quote",
                  icon: <DollarSign className="w-6 h-6" />
                },
                {
                  step: "2",
                  title: "Vehicle Inspection",
                  description: "We'll inspect your vehicle and confirm the offer",
                  icon: <CheckCircle className="w-6 h-6" />
                },
                {
                  step: "3",
                  title: "Get Paid",
                  description: "Accept the offer and get paid instantly",
                  icon: <Clock className="w-6 h-6" />
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600">{item.icon}</span>
                  </div>
                  <div className="text-sm font-medium text-blue-600 mb-3">
                    Step {item.step}
                  </div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-3">
              Ready to Sell Your Car?
            </h2>
            <p className="text-base text-gray-600 mb-6">
              Contact us today to get started
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:6476222202"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm"
              >
                Call (647) 622-2202
              </a>
              <a
                href="/contact"
                className="px-6 py-3 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-medium rounded-lg transition-colors text-sm"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

