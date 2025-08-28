import React from "react";
import Image from "next/image";
import { Shield, CheckCircle } from "lucide-react";

const CertificationsSection = () => {
  const certifications = [
    {
      logo: "/certifications/carfax.png",
      title: "CARFAX Verified",
      description:
        "Every vehicle comes with a complete CARFAX vehicle history report",
    },
    {
      logo: "/certifications/mvic.png",
      title: "OMVIC Registered",
      description:
        "Licensed and regulated by the Ontario Motor Vehicle Industry Council",
    },
    {
      logo: "/certifications/ucda.png",
      title: "UCDA Certified",
      description: "Proud member of the Used Car Dealers Association",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 border border-green-200 mb-6">
            <Shield className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-green-700 text-sm font-semibold">
              Trust & Excellence
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Certified Excellence &
            <span className="block text-green-600">Industry Recognition</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our commitment to quality and customer satisfaction has earned us
            industry certifications and recognition from leading automotive
            organizations.
          </p>
        </div>

        {/* Certifications */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Industry Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-gray-200"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-50 rounded-2xl flex items-center justify-center">
                  <Image
                    src={cert.logo}
                    alt={cert.title}
                    width={80}
                    height={50}
                    className="object-contain max-w-[80px] max-h-[50px]"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {cert.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        {/*<div className="mb-16">*/}
        {/*  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Awards & Recognition</h3>*/}
        {/*  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">*/}
        {/*    {achievements.map((achievement, index) => (*/}
        {/*      <div*/}
        {/*        key={index}*/}
        {/*        className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-200 group"*/}
        {/*      >*/}
        {/*        <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">*/}
        {/*          <achievement.icon className="w-8 h-8 text-blue-600" />*/}
        {/*        </div>*/}
        {/*        <div className="text-sm text-blue-600 font-semibold mb-2">{achievement.year}</div>*/}
        {/*        <h4 className="font-bold text-gray-900 mb-3 text-lg">{achievement.title}</h4>*/}
        {/*        <p className="text-gray-600 text-sm leading-relaxed">{achievement.description}</p>*/}
        {/*      </div>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/* Call to Action */}
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-gray-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Experience the Royal Drive Difference
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have chosen Royal Drive
              for their automotive needs. Experience our certified quality and
              award-winning service today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Browse Our Inventory
              </button>
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors">
                Schedule a Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
