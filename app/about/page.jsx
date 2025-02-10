"use client";
import React from "react";
import { Amaranth, Montserrat } from "next/font/google";
import { Briefcase, Rocket, Award, TrendingUp } from "lucide-react";
import Algoteam from "../Algoteam";
import { FooterSection } from "../components/footer/FooterSection";

const amaranth = Amaranth({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
});

function Page() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-black to-black text-white overflow-hidden">
            <div className="container mx-auto px-4 py-12 relative">
                <div className="relative">
                    <span
                        className={`absolute top-0 left-0 text-[20vw] md:text-[25vw] lg:text-[20vw] font-bold text-transparent z-10 leading-none ${amaranth.className}`}
                        style={{
                            WebkitTextStroke: "1px #904bfa",
                            animation: "float 6s ease-in-out infinite",
                        }}
                    >
                        About
                    </span>
                    <h1
                        className={`relative z-20 text-5xl md:text-7xl lg:text-8xl font-bold mb-6 ${montserrat.className} text-purple-500 leading-none pt-16 md:pt-24 lg:pt-32`}
                        style={{
                            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                        }}
                    >
                        Algo
                        <br />
                        Hire
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6">
                    <div className="col-span-1 md:col-span-2 md:row-span-1 rounded-xl shadow-lg p-8 bg-gradient-to-r from-gray-800">
                        <Briefcase size={40} className="text-purple-500 mb-4" />
                        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                        <p className="md:text-lg text-sm text-gray-300">
                            To empower developers worldwide by providing advanced tools,
                            curated challenges, and AI-driven assessments to excel in
                            technical interviews and coding competitions.
                        </p>
                    </div>

                    <div className="col-span-1 md:col-span-2 rounded-xl shadow-lg p-8 bg-gradient-to-r from-gray-800">
                        <Rocket size={40} className="text-blue-400 mb-4" />
                        <h2 className="text-2xl font-semibold mb-4">Innovative Features</h2>
                        <p className="md:text-lg text-sm text-gray-300">
                            Unlock the power of personalized coding assessments, instant
                            feedback, and interview simulations, all designed to boost your
                            confidence and performance.
                        </p>
                    </div>

                    <div className="col-span-1 md:col-span-3 md:row-span-1 rounded-xl shadow-lg p-8 bg-gradient-to-r from-gray-800">
                        <Award
                            size={50}
                            className="text-green-400 mb-4 border-green-400 p-2 rounded-full border-2"
                        />
                        <h2 className="text-lg font-semibold">Why AlgoHire?</h2>
                        <p className="md:text-lg text-sm text-gray-300">
                            Trusted by top developers, AlgoHire brings a blend of cutting-edge
                            technology and human-centric design.
                        </p>
                    </div>

                    <div className="col-span-1 md:col-span-1 md:row-span-1 rounded-xl shadow-lg p-8 bg-gradient-to-r from-gray-800">
                        <TrendingUp size={40} className="text-yellow-400 mb-4" />
                        <h2 className="text-lg font-semibold">Get Started</h2>
                        <p className="md:text-lg text-sm text-gray-300">
                            Start your journey with AlgoHire today and achieve your career
                            goals faster than ever.
                        </p>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-purple-600 rounded-tl-full opacity-10 blur-3xl"></div>
            <Algoteam />
            <FooterSection />
        </div>
    );
}

export default Page;
