import { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import { MapPin, Phone, Mail, Clock, Shield } from "lucide-react";
import { createMetadata } from "@/lib/metadata";
import { getPublicSettings } from "@/lib/api/settings";

export const metadata: Metadata = createMetadata({
  title:
    "Contact Royal Drive Canada - Toronto Used Car Dealership | 751 Danforth Road",
  description:
    "Contact Royal Drive Canada for quality used cars in Toronto. Visit us at 751 Danforth Road, call (647) 622-2202, or email us. Open Mon-Sat. OMVIC licensed dealer serving the GTA.",
  keywords: ["dealership contact", "751 Danforth Road", "Toronto dealer hours"],
  path: "/contact",
});

export default async function ContactPage() {
  // Fetch business settings from API
  const settings = await getPublicSettings({ revalidate: 300 });

  // Extract data with fallbacks
  const businessName = settings.businessName || "Royal Drive Canada";
  const phone = settings.contactInfo?.primaryPhone || "(647) 622-2202";
  const email =
    settings.contactInfo?.primaryEmail || "royaldrivemotor@gmail.com";
  const street = settings.address?.street || "751 Danforth Road";
  const city = settings.address?.city || "Toronto";
  const province = settings.address?.province || "ON";
  const postalCode = settings.address?.postalCode || "M1K 1N1";
  const country = settings.address?.country || "Canada";

  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "AutoDealer",
      name: businessName,
      address: {
        "@type": "PostalAddress",
        streetAddress: street,
        addressLocality: city,
        addressRegion: province,
        postalCode: postalCode,
        addressCountry: country === "Canada" ? "CA" : country,
      },
      telephone: phone,
      email: email,
      url: "https://royaldrivecanada.com",
      openingHoursSpecification: settings.businessHours
        ?.filter((h) => h.isOpen)
        .map((hour) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: hour.day,
          opens: hour.openTime,
          closes: hour.closeTime,
        })) || [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "19:00",
        },
      ],
      geo: {
        "@type": "GeoCoordinates",
        latitude: "43.6426",
        longitude: "-79.3871",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactStructuredData),
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Modern Hero Section */}
        <PageHero
          title="Contact Royal Drive Canada"
          subtitle="Visit Toronto's trusted used car dealership. We're here to help you find your perfect vehicle with transparent pricing and exceptional service."
          backgroundImage="https://res.cloudinary.com/dm5c31z7w/image/upload/v1756556283/bg_bfnqou.jpg"
          compact={true}
          badges={[
            {
              text: "OMVIC Licensed Dealer",
              icon: <Shield className="w-4 h-4 text-blue-400" />,
            },
          ]}
          cta={{
            primary: {
              text: `Call Now: ${phone}`,
              action: "call",
            },
            secondary: {
              text: "Get Directions",
              action: "directions",
            },
          }}
        />

        {/* Contact Information */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Details */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-8 text-gray-900">
                  Get in Touch
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        Visit Our Showroom
                      </h3>
                      <p className="text-gray-600">
                        {street}
                        <br />
                        {city}, {province} {postalCode}
                        <br />
                        {country}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        Call or Text
                      </h3>
                      <p className="text-gray-600">
                        <a
                          href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {phone}
                        </a>
                      </p>
                      <p className="text-sm text-gray-500">
                        Available 7 days a week
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        Email Us
                      </h3>
                      <p className="text-gray-600">
                        <a
                          href={`mailto:${email}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {email}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-3">
                        Business Hours
                      </h3>
                      <div className="space-y-2 text-gray-600">
                        {settings.businessHours &&
                        settings.businessHours.length > 0 ? (
                          settings.businessHours.map((day) => {
                            const isToday =
                              new Date().toLocaleDateString("en-US", {
                                weekday: "long",
                              }) === day.day;

                            return (
                              <div
                                key={day.day}
                                className="flex justify-between items-center"
                              >
                                <span
                                  className={
                                    isToday ? "font-semibold text-gray-900" : ""
                                  }
                                >
                                  {day.day}
                                </span>
                                <span
                                  className={!day.isOpen ? "text-red-500" : ""}
                                >
                                  {day.isOpen
                                    ? `${day.openTime} - ${day.closeTime}`
                                    : "Closed"}
                                </span>
                              </div>
                            );
                          })
                        ) : (
                          <>
                            <div className="flex justify-between">
                              <span>Monday - Friday</span>
                              <span>9:00 AM - 7:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Saturday</span>
                              <span>9:00 AM - 6:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Sunday</span>
                              <span className="text-red-500">Closed</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Find Our Location
              </h2>
              <p className="text-xl text-gray-600">
                Conveniently located on Danforth Road in Toronto
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
                  `${street}, ${city}, ${province} ${postalCode}, ${country}`
                )}`}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-96"
                title={`${businessName} Location - ${street}, ${city}`}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
