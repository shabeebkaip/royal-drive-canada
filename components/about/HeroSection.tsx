import React from "react";
import Image from "next/image";
import Link from "next/link";
import {Star, Award, Users, Calendar} from "lucide-react";

const HeroSection = () => {
    const stats = [
        {icon: Users, number: "100+", label: "Quality Vehicles"},
        {icon: Star, number: "100%", label: "Safety Certified"},
        {icon: Calendar, number: "24/7", label: "Support Available"},
        {icon: Award, number: "10+", label: "Current Inventory"},
    ];

    return (
        <section
            className="relative min-h-[70vh] overflow-hidden bg-gradient-to-br from-blue-900 via-gray-800 to-gray-900">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="https://res.cloudinary.com/dm5c31z7w/image/upload/v1756556283/bg_bfnqou.jpg"
                    alt="Royal Drive Dealership"
                    fill
                    priority
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gray-900/75"/>
            </div>

            {/* Content */}
            <div className="relative z-10 pt-32 pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-8">
                            <div
                                className="inline-flex items-center px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                                <span className="text-white/95 text-sm font-semibold">
                  About Royal Drive
                </span>
                            </div>

                            <div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                    <span className="block">Your Trusted</span>
                                    <span className="block text-blue-400">
                    Automotive Partner
                  </span>
                                </h1>

                                <p className="text-xl text-gray-300 leading-relaxed">
                                    {`Royal Drive is Toronto's destination for quality pre-owned vehicles.
                  We're committed to providing exceptional service, transparent pricing, and
                  helping you find the perfect vehicle for your needs and budget.`}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/vehicles">
                                    <button
                                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg">
                                        Our Inventory
                                    </button>
                                </Link>
                                <Link href="/contact">
                                    <button
                                        className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-lg transition-colors duration-200">
                                        Contact Us
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Stats Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300"
                                >
                                    <div
                                        className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <stat.icon className="w-6 h-6 text-white"/>
                                    </div>
                                    <div className="text-2xl font-bold text-white mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-300 text-sm font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
