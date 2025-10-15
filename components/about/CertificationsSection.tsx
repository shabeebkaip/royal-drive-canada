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
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Certified Excellence &
            <span className="block text-blue-600">Industry Recognition</span>
          </h2>

          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Our commitment to quality and customer satisfaction has earned us
            industry certifications and recognition from leading automotive
            organizations.
          </p>
        </div>

        {/* Certifications */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                  <Image
                    src={cert.logo}
                    alt={cert.title}
                    width={70}
                    height={45}
                    className="object-contain max-w-[70px] max-h-[45px]"
                  />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {cert.title}
                </h4>
                <p className="text-sm text-gray-600">
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
        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <div className="text-center">
            <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Experience the Royal Drive Difference
            </h3>
            <p className="text-base text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have chosen Royal Drive
              for their automotive needs. Experience our certified quality and
              award-winning service today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm">
                Browse Our Inventory
              </button>
              <button className="border border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors text-sm">
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
