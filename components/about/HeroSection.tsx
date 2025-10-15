"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {Star, Award, Users, Calendar} from "lucide-react";

const HeroSection = () => {
    const [vehicleCount, setVehicleCount] = useState<number>(100);

    useEffect(() => {
        const fetchVehicleCount = async () => {
            try {
                const response = await fetch('https://api.royaldrivecanada.com/api/v1/vehicles?limit=1');
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

    const stats = [
        {icon: Users, number: `${vehicleCount}+`, label: "Quality Vehicles"},
        {icon: Star, number: "100%", label: "Safety Certified"},
        {icon: Calendar, number: "24/7", label: "Support Available"},
    ];

    return (
        <section className="bg-white">
            {/* Content */}
            <div className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                                    Your Trusted
                                    <span className="block text-blue-600">
                    Automotive Partner
                  </span>
                                </h1>

                                <p className="text-base sm:text-lg text-gray-600">
                                    {`Royal Drive is Toronto's destination for quality pre-owned vehicles.
                  We're committed to providing exceptional service, transparent pricing, and
                  helping you find the perfect vehicle for your needs and budget.`}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link href="/vehicles">
                                    <button
                                        className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm">
                                        Our Inventory
                                    </button>
                                </Link>
                                <Link href="/contact">
                                    <button
                                        className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-medium rounded-lg transition-colors text-sm">
                                        Contact Us
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center hover:border-gray-300 hover:shadow-sm transition-all"
                                >
                                    <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3"/>
                                    <div className="text-2xl font-bold text-gray-900 mb-1">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-600 text-sm">
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
