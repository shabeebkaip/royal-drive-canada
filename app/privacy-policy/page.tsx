import React from 'react';
import { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Privacy Policy',
  description: 'Privacy policy and data protection practices at Royal Drive Canada. Learn how we collect, use, and protect your personal information in compliance with PIPEDA and Canadian privacy laws.',
  path: '/privacy-policy',
  keywords: ['PIPEDA compliance', 'data protection', 'privacy policy Canada'],
});

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
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
                Royal Drive Canada (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information in compliance with the Personal Information Protection and Electronic Documents Act (PIPEDA) and other applicable Canadian privacy laws.
              </p>
              <p>
                This policy applies to all personal information collected through our website, in-person at our dealership, over the phone, or through other means of communication.
              </p>
            </section>

            {/* PIPEDA Compliance */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Commitment to PIPEDA Compliance
              </h2>
              <p className="mb-4">
                We comply with PIPEDA&apos;s 10 Fair Information Principles:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Accountability:</strong> We are responsible for personal information under our control</li>
                <li><strong>Identifying Purposes:</strong> We identify the purposes for collecting information</li>
                <li><strong>Consent:</strong> We obtain your consent when collecting, using, or disclosing information</li>
                <li><strong>Limiting Collection:</strong> We collect only information necessary for identified purposes</li>
                <li><strong>Limiting Use, Disclosure, and Retention:</strong> We use information only for stated purposes</li>
                <li><strong>Accuracy:</strong> We keep personal information accurate and up-to-date</li>
                <li><strong>Safeguards:</strong> We protect information with appropriate security measures</li>
                <li><strong>Openness:</strong> We make information about our policies readily available</li>
                <li><strong>Individual Access:</strong> You can access your personal information</li>
                <li><strong>Challenging Compliance:</strong> You can challenge our compliance with these principles</li>
              </ol>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">
                3.1 Personal Information
              </h3>
              <p className="mb-4">
                We may collect the following types of personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Contact Information:</strong> Name, email address, phone number, mailing address</li>
                <li><strong>Identification Information:</strong> Driver&apos;s license number, date of birth (for financing and registration)</li>
                <li><strong>Financial Information:</strong> Credit information, income details, employment information (for financing applications)</li>
                <li><strong>Vehicle Information:</strong> Trade-in vehicle details, vehicle preferences, purchase history</li>
                <li><strong>Transaction Information:</strong> Purchase agreements, payment information, service records</li>
                <li><strong>Communication Records:</strong> Emails, phone calls, chat messages, inquiries</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">
                3.2 Automatically Collected Information
              </h3>
              <p className="mb-4">
                When you visit our website, we automatically collect:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages viewed and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. How We Use Your Information
              </h2>
              <p className="mb-4">
                We collect and use personal information for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Vehicle Sales:</strong> Processing vehicle purchases, registrations, and transfers</li>
                <li><strong>Financing:</strong> Processing credit applications and arranging financing</li>
                <li><strong>Customer Service:</strong> Responding to inquiries, providing support, scheduling appointments</li>
                <li><strong>Marketing:</strong> Sending promotional materials, newsletters, and special offers (with consent)</li>
                <li><strong>Legal Compliance:</strong> Complying with OMVIC, tax, and other legal requirements</li>
                <li><strong>Business Operations:</strong> Improving our services, analyzing trends, preventing fraud</li>
                <li><strong>Service Reminders:</strong> Sending maintenance reminders and recall notifications</li>
              </ul>
            </section>

            {/* Consent */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Consent
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">
                5.1 How We Obtain Consent
              </h3>
              <p className="mb-4">
                We obtain your consent in various ways:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Express Consent:</strong> Written or verbal agreement (e.g., signing forms, checking boxes)</li>
                <li><strong>Implied Consent:</strong> Through your actions (e.g., providing your email for inquiries)</li>
                <li><strong>Opt-in Consent:</strong> For marketing communications</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">
                5.2 Withdrawing Consent
              </h3>
              <p className="mb-4">
                You may withdraw your consent at any time, subject to legal or contractual restrictions. To withdraw consent:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email us at privacy@royaldrivecanada.com</li>
                <li>Call our dealership directly</li>
                <li>Click &quot;unsubscribe&quot; in marketing emails</li>
                <li>Visit us in person</li>
              </ul>
              <p className="mt-4">
                Note: Withdrawing consent may limit our ability to provide certain services.
              </p>
            </section>

            {/* Information Disclosure */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Information Disclosure and Sharing
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">
                6.1 Third-Party Service Providers
              </h3>
              <p className="mb-4">
                We may share your information with trusted third parties who assist in our operations:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Financial Institutions:</strong> For credit applications and financing</li>
                <li><strong>OMVIC and Government Agencies:</strong> For licensing and registration</li>
                <li><strong>Insurance Companies:</strong> For insurance quotes and policies</li>
                <li><strong>Service Ontario:</strong> For vehicle registration and permits</li>
                <li><strong>Credit Bureaus:</strong> For credit checks (with consent)</li>
                <li><strong>Marketing Service Providers:</strong> For email campaigns and advertising</li>
                <li><strong>IT Service Providers:</strong> For website hosting and data storage</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">
                6.2 Legal Requirements
              </h3>
              <p>
                We may disclose personal information when required by law, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Compliance with court orders or subpoenas</li>
                <li>Protection of our legal rights</li>
                <li>Investigation of fraud or illegal activities</li>
                <li>Emergency situations involving public safety</li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Data Security
              </h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Physical Security:</strong> Secure facilities with restricted access</li>
                <li><strong>Technical Security:</strong> Encryption, firewalls, secure servers, SSL certificates</li>
                <li><strong>Organizational Security:</strong> Staff training, confidentiality agreements, access controls</li>
                <li><strong>Data Minimization:</strong> Collecting only necessary information</li>
                <li><strong>Regular Audits:</strong> Periodic security assessments and updates</li>
              </ul>
              <p className="mt-4">
                While we strive to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Data Retention
              </h2>
              <p className="mb-4">
                We retain personal information only as long as necessary for the purposes identified or as required by law:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Transaction Records:</strong> 7 years (as required by tax laws)</li>
                <li><strong>Customer Records:</strong> Duration of customer relationship plus 1 year</li>
                <li><strong>Marketing Lists:</strong> Until you unsubscribe or withdraw consent</li>
                <li><strong>Website Analytics:</strong> 26 months (Google Analytics default)</li>
                <li><strong>OMVIC Requirements:</strong> As mandated by OMVIC regulations</li>
              </ul>
              <p className="mt-4">
                After the retention period, information is securely destroyed or anonymized.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Your Privacy Rights
              </h2>
              <p className="mb-4">
                Under PIPEDA, you have the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Right to Access:</strong> Request access to your personal information</li>
                <li><strong>Right to Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for collection, use, or disclosure</li>
                <li><strong>Right to Complaint:</strong> File a complaint about our privacy practices</li>
                <li><strong>Right to Explanation:</strong> Receive explanation of how we use your information</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact our Privacy Officer at privacy@royaldrivecanada.com.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Cookies and Tracking Technologies
              </h2>
              <p className="mb-4">
                Our website uses cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remember your preferences</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Improve user experience</li>
                <li>Deliver targeted advertising</li>
                <li>Measure marketing campaign effectiveness</li>
              </ul>
              <p className="mt-4">
                You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                11. Children&apos;s Privacy
              </h2>
              <p>
                Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from minors. If you believe we have collected information from a minor, please contact us immediately.
              </p>
            </section>

            {/* International Data Transfers */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                12. International Data Transfers
              </h2>
              <p>
                Your personal information may be stored and processed outside of Canada by our service providers. When transferring data internationally, we ensure appropriate safeguards are in place to protect your information in accordance with Canadian privacy laws.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                13. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will post the updated policy on our website with a new &quot;Last Updated&quot; date. Material changes will be communicated through prominent notices on our website or direct communication.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                14. Contact Us
              </h2>
              <p className="mb-4">
                For questions, concerns, or to exercise your privacy rights, please contact:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Privacy Officer</p>
                <p className="font-semibold">Royal Drive Canada</p>
                <p>Toronto, Ontario, Canada</p>
                <p className="mt-3">
                  <strong>Email:</strong> privacy@royaldrivecanada.com
                  <br />
                  <strong>General Inquiries:</strong> info@royaldrivecanada.com
                  <br />
                  <strong>Phone:</strong> Available on our Contact page
                </p>
                <p className="mt-4 text-sm text-gray-600">
                  We will respond to your inquiries within 30 days as required by PIPEDA.
                </p>
              </div>
            </section>

            {/* Filing a Complaint */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                15. Filing a Complaint
              </h2>
              <p className="mb-4">
                If you are not satisfied with how we handle your privacy complaint, you may file a complaint with:
              </p>
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">
                  Office of the Privacy Commissioner of Canada
                </p>
                <p>30 Victoria Street</p>
                <p>Gatineau, Quebec K1A 1H3</p>
                <p className="mt-3">
                  <strong>Toll-free:</strong> 1-800-282-1376
                  <br />
                  <strong>Website:</strong> www.priv.gc.ca
                  <br />
                  <strong>Email:</strong> info@priv.gc.ca
                </p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="border-t pt-6">
              <p className="text-sm text-gray-600">
                By using our website and services, you acknowledge that you have read and understood this Privacy Policy and consent to the collection, use, and disclosure of your personal information as described herein.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
