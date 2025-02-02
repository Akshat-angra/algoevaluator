"use client";

import React from "react";
import { Montserrat } from "next/font/google";
import { FooterSection } from "../components/footer/FooterSection";
import { motion } from "framer-motion";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const pricingPlans = [
    {
        title: "Essential",
        price: "199",
        description: "Perfect for startups and small teams",
        features: [
            "Up to 10 Active Jobs",
            "AI-Powered Candidate Screening",
            "Basic Technical Assessments",
            "Email Support",
            "Interview Scheduling",
        ],
        accent: "from-emerald-400 to-teal-500",
        buttonText: "Start Free Trial",
    },
    {
        title: "Growth",
        price: "499",
        description: "Ideal for growing companies",
        features: [
            "Up to 25 Active Jobs",
            "Advanced AI Screening",
            "Custom Assessment Library",
            "Priority Support",
            "ATS Integration",
            "Video Interviews",
            "Team Collaboration Tools",
        ],
        popular: true,
        accent: "from-violet-400 to-purple-500",
        buttonText: "Get Started Now",
    },
    {
        title: "Scale",
        price: "999",
        description: "For large organizations and enterprises",
        features: [
            "Unlimited Active Jobs",
            "Enterprise AI Solutions",
            "Custom Workflow Builder",
            "Dedicated Success Manager",
            "Advanced Analytics Dashboard",
            "API Access",
            "White-labeling",
            "SSO Integration",
        ],
        accent: "from-blue-400 to-indigo-500",
        buttonText: "Contact Sales",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    hover: { y: -10 },
};

function Page() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-[#0F0F2A] to-gray-900 text-gray-100 overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-10" />

            <div className="relative">
                {/* Navigation Hint */}
                <div className="absolute top-4 sm:top-8 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] sm:w-auto">
                    <div className="px-3 sm:px-4 py-2 bg-gray-800/50 backdrop-blur-md rounded-full border border-gray-700/30">
                        <ul className="flex justify-center space-x-4 sm:space-x-8 text-sm sm:text-base">
                            <li className="text-gray-400 hover:text-white transition-colors">Monthly</li>
                            <li className="text-white font-medium">Annual (Save 20%)</li>
                        </ul>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-16 sm:py-24 md:py-32 relative">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center mb-16 sm:mb-24 mt-16 sm:mt-0"
                    >
                        <div className="inline-block relative mb-6">
                            <span className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full text-xs sm:text-sm font-medium text-purple-200">
                                Pricing Plans
                            </span>
                            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold ${montserrat.className} bg-gradient-to-r from-purple-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent px-4 sm:px-0`}>
                                Choose Your Perfect Plan
                            </h1>
                            <div className="absolute bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-purple-500/30 via-indigo-500/30 to-purple-500/30 blur-md" />
                        </div>
                        <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
                            Transform your technical hiring process with AI-powered assessments and intelligent candidate screening.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm px-4">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-300">14-day free trial</span>
                            </div>
                            <div className="hidden sm:block w-1 h-1 bg-gray-700 rounded-full"></div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-300">No credit card required</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Pricing Cards */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto relative z-10 px-4 sm:px-6"
                    >
                        {pricingPlans.map((plan) => (
                            <motion.div
                                key={plan.title}
                                variants={cardVariants}
                                whileHover="hover"
                                className="relative group"
                            >
                                {plan.popular && (
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm font-medium shadow-xl flex items-center gap-2 whitespace-nowrap">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                        </svg>
                                        Most Popular
                                    </div>
                                )}
                                <div className={`h-full bg-gradient-to-b from-gray-800/40 to-gray-900/10 backdrop-blur-2xl rounded-2xl p-6 sm:p-8 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 ${plan.popular ? "ring-2 ring-purple-500/20 shadow-2xl shadow-purple-500/5" : ""
                                    }`}>
                                    <div className="mb-6 sm:mb-8">
                                        <div className={`w-12 h-12 rounded-xl mb-4 bg-gradient-to-r ${plan.accent} p-0.5`}>
                                            <div className="w-full h-full bg-gray-900 rounded-[10px] flex items-center justify-center">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h2 className={`text-xl sm:text-2xl font-bold mb-2 ${montserrat.className}`}>
                                            {plan.title}
                                        </h2>
                                        <p className="text-gray-400 text-sm">{plan.description}</p>
                                    </div>

                                    <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gray-900/30 rounded-xl border border-gray-800/50">
                                        <div className="flex items-baseline gap-1 sm:gap-2">
                                            <span className="text-sm text-gray-400">$</span>
                                            <span className="text-4xl sm:text-5xl font-bold">{plan.price}</span>
                                            <span className="text-gray-400">/month</span>
                                        </div>
                                        <div className="mt-2 text-xs sm:text-sm text-gray-500">Billed annually</div>
                                    </div>

                                    <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-12">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-3 sm:gap-4">
                                                <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gradient-to-r ${plan.accent} flex items-center justify-center flex-shrink-0`}>
                                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className="text-gray-300 text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button className={`w-full py-3 sm:py-4 rounded-xl font-medium transition-all duration-300 relative overflow-hidden text-sm sm:text-base ${plan.popular
                                            ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                                            : "bg-gray-800 hover:bg-gray-700"
                                        }`}>
                                        <span className="relative z-10">{plan.buttonText}</span>
                                        <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition-opacity" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Enterprise CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-16 sm:mt-24 relative px-4 sm:px-6"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10 blur-3xl" />
                        <div className="relative bg-gradient-to-r from-gray-800/30 to-gray-900/20 backdrop-blur-xl rounded-2xl p-6 sm:p-12 border border-gray-700/30">
                            <div className="max-w-4xl mx-auto text-center">
                                <h3 className={`text-2xl sm:text-3xl font-bold mb-4 ${montserrat.className}`}>
                                    Need a Custom Enterprise Solution?
                                </h3>
                                <p className="text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
                                    Large hiring volume or specific requirements? Let's build a tailored solution that scales with your organization.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <button className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base min-w-[200px]">
                                        Contact Enterprise Sales
                                    </button>
                                    <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium transition-all duration-300 border border-gray-700 hover:border-gray-600 text-sm sm:text-base min-w-[200px]">
                                        Schedule Demo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <FooterSection />
        </div>
    );
}

export default Page;