"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Award,
  CheckCircle,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

const WhyChooseUs = () => {
  const [vehicleCount, setVehicleCount] = useState<number>(100);

  useEffect(() => {
    const fetchVehicleCount = async () => {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ;
      try {
        const response = await fetch(`${apiBase}/vehicles?limit=1`);
        const data = await response.json();
        if (data.success && data.data?.pagination?.total) {
          setVehicleCount(data.data.pagination.total);
        }
      } catch (error) {
        console.error('Failed to fetch vehicle count:', error);
      }
    };

    fetchVehicleCount();
  }, []);

  const features = [
    {
      logo: "/certifications/carfax.png",
      title: "CARFAX Verified",
      description:
        "Every vehicle comes with a complete CARFAX vehicle history report for your peace of mind",
      icon: Shield,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      logo: "/certifications/mvic.png",
      title: "OMVIC Regulated",
      description:
        "We are fully regulated by the Motor Vehicle Industry Council of Ontario ensuring ethical sales practices",
      icon: Award,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      logo: "/certifications/ucda.png",
      title: "UCDA Certified",
      description:
        "Proud member of the Used Car Dealers Association with commitment to industry best practices",
      icon: CheckCircle,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
  ];

  const stats = [
    {
      number: `${vehicleCount}+`,
      label: "Quality Vehicles",
      icon: Users,
      color: "text-green-600",
    },
    {
      number: "100%",
      label: "Safety Certified",
      icon: Star,
      color: "text-yellow-500",
    },
    {
      number: "24/7",
      label: "Support Available",
      icon: TrendingUp,
      color: "text-blue-600",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Royal Drive?
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our dealership is certified by industry-leading authorities,
            ensuring you get a reliable vehicle with complete transparency and
            unmatched quality assurance.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-5 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-2xl lg:text-3xl font-bold text-gray-900">
                    {stat.number}
                  </span>
                </div>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              {/* Logo Container */}
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto rounded-lg bg-gray-50 flex items-center justify-center border border-gray-200">
                  <Image
                    src={feature.logo}
                    alt={feature.title}
                    width={70}
                    height={45}
                    className="object-contain max-w-[70px] max-h-[45px]"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white border border-gray-200 rounded-lg p-8 sm:p-10 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Quality Guarantee
              </h3>
            </div>

            <p className="text-base text-gray-600 mb-8 max-w-2xl mx-auto">
              Every vehicle undergoes rigorous inspection and comes with
              industry-standard certifications. Your satisfaction and safety are
              our top priorities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/vehicles">
                <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm">
                  Browse Certified Vehicles
                </button>
              </Link>
              <Link href="/about">
                <button className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-medium rounded-lg transition-colors text-sm">
                  Learn More About Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
