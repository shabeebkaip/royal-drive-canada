import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Royal Drive Canada',
  description: 'Terms and conditions for purchasing vehicles from Royal Drive Canada, an OMVIC licensed dealer in Toronto, Ontario.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Terms and Conditions
          </h1>
          <p className="text-sm text-gray-600 mb-8">
            Last Updated: November 3, 2025
          </p>

          <div className="space-y-8 text-gray-700">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Introduction
              </h2>
              <p className="mb-4">
                Welcome to Royal Drive Canada. These Terms and Conditions (&quot;Terms&quot;) govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms and all applicable laws and regulations in Ontario, Canada.
              </p>
              <p>
                Royal Drive Canada is a registered motor vehicle dealer licensed by the Ontario Motor Vehicle Industry Council (OMVIC) and operates in compliance with the Motor Vehicle Dealers Act, 2002 (MVDA).
              </p>
            </section>

            {/* OMVIC Compliance */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. OMVIC Compliance
              </h2>
              <p className="mb-4">
                As an OMVIC registered dealer, we adhere to the following:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All vehicles sold are accompanied by a Bill of Sale as required by OMVIC</li>
                <li>All used vehicles are provided with a Used Vehicle Information Package (UVIP)</li>
                <li>Safety Standards Certificates are provided as required under Ontario law</li>
                <li>All advertising complies with OMVIC&apos;s General Regulation 333/08</li>
                <li>Fair and transparent pricing practices</li>
                <li>Disclosure of all material facts about vehicles</li>
              </ul>
            </section>

            {/* Vehicle Sales */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Vehicle Sales and Purchases
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">
                3.1 Vehicle Information
              </h3>
              <p className="mb-4">
                All vehicle information displayed on our website is believed to be accurate but is subject to verification. We make every effort to ensure accuracy but do not guarantee that all information is error-free. Vehicle specifications, features, and pricing are subject to change without notice.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">
                3.2 Pricing
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>All prices are in Canadian Dollars (CAD)</li>
                <li>Prices do not include applicable taxes (HST at 13% in Ontario)</li>
                <li>Additional fees may include: licensing, registration, OMVIC fee ($10), and dealer administration fees</li>
                <li>All-in pricing includes freight and PDI where applicable</li>
                <li>Advertised prices are valid for vehicles in stock only</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">
                3.3 Vehicle Availability
              </h3>
              <p>
                Vehicles advertised on our website are subject to prior sale. We reserve the right to withdraw any vehicle from sale at any time. Inventory is updated regularly but may not reflect real-time availability.
              </p>
            </section>

            {/* Financing */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Financing
              </h2>
              <p className="mb-4">
                Financing options are provided through third-party lenders and are subject to credit approval. Terms and conditions of financing are determined by the lending institution. Royal Drive Canada acts as an intermediary and is not the lender.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All financing applications are subject to credit approval</li>
                <li>Interest rates and terms vary based on creditworthiness</li>
                <li>Down payment requirements may apply</li>
                <li>Trade-in values are subject to vehicle inspection and verification</li>
              </ul>
            </section>

            {/* Warranties and Disclaimers */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Warranties and Disclaimers
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">
                5.1 Vehicle Condition
              </h3>
              <p className="mb-4">
                All used vehicles are sold &quot;as is&quot; unless otherwise stated. We disclose all known material facts about each vehicle in accordance with OMVIC regulations. Buyers are encouraged to conduct independent inspections.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">
                5.2 Extended Warranties
              </h3>
              <p>
                Extended warranty options may be available through third-party providers. Terms and conditions are set by the warranty provider. Royal Drive Canada is not responsible for warranty claims.
              </p>
            </section>

            {/* Returns and Exchanges */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Returns and Exchanges
              </h2>
              <p className="mb-4">
                All sales are final unless otherwise agreed in writing. In accordance with Ontario&apos;s Consumer Protection Act, certain cooling-off period rights may apply to specific transactions. Please refer to your purchase agreement for specific terms.
              </p>
            </section>

            {/* Website Use */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Website Use and Intellectual Property
              </h2>
              <p className="mb-4">
                All content on this website, including text, images, logos, and software, is the property of Royal Drive Canada or its licensors and is protected by Canadian copyright and trademark laws.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You may not reproduce, distribute, or modify any content without written permission</li>
                <li>You may not use our website for any unlawful purpose</li>
                <li>You agree not to interfere with the website&apos;s functionality</li>
                <li>We reserve the right to terminate access to users who violate these terms</li>
              </ul>
            </section>

            {/* Personal Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Personal Information
              </h2>
              <p>
                Collection, use, and disclosure of personal information are governed by our Privacy Policy and comply with the Personal Information Protection and Electronic Documents Act (PIPEDA). Please review our Privacy Policy for detailed information.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Limitation of Liability
              </h2>
              <p className="mb-4">
                To the fullest extent permitted by law, Royal Drive Canada shall not be liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Any indirect, incidental, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Errors or omissions in vehicle information</li>
                <li>Website downtime or technical issues</li>
                <li>Actions or omissions of third-party service providers</li>
              </ul>
            </section>

            {/* Dispute Resolution */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Dispute Resolution
              </h2>
              <p className="mb-4">
                Any disputes arising from these Terms or vehicle transactions shall be resolved through:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Initial good-faith negotiations between parties</li>
                <li>Mediation through OMVIC&apos;s dispute resolution process if applicable</li>
                <li>Arbitration or legal proceedings in Ontario courts</li>
              </ol>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                11. Governing Law
              </h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of the Province of Ontario and the federal laws of Canada applicable therein. Any legal action must be brought in the courts of Ontario.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                12. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated revision date. Your continued use of our website after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                13. Contact Information
              </h2>
              <p className="mb-4">
                For questions about these Terms and Conditions, please contact:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Royal Drive Canada</p>
                <p>Toronto, Ontario</p>
                <p>Email: info@royaldrivecanada.com</p>
                <p>Phone: Available on our Contact page</p>
                <p className="mt-4 text-sm">
                  <strong>OMVIC Licensed Dealer</strong>
                  <br />
                  Registered under the Motor Vehicle Dealers Act, 2002
                </p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="border-t pt-6">
              <p className="text-sm text-gray-600">
                By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, as well as our Privacy Policy. If you do not agree to these Terms, please do not use our website or services.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
