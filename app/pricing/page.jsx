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
        title: "Starter",
        price: "29",
        description: "Ideal for individual developers & small projects",
        features: [
            "10,000 API Calls",
            "Basic Analytics",
            "Community Support",
            "5 Concurrent Jobs",
        ],
        accent: "from-teal-400 to-cyan-500",
    },
    {
        title: "Professional",
        price: "99",
        description: "Perfect for growing teams & businesses",
        features: [
            "50,000 API Calls",
            "Advanced Analytics",
            "Priority Support",
            "20 Concurrent Jobs",
            "Custom Integrations",
        ],
        popular: true,
        accent: "from-indigo-400 to-blue-500",
    },
    {
        title: "Enterprise",
        price: "299",
        description: "For large-scale organizations & critical systems",
        features: [
            "Unlimited API Calls",
            "Dedicated Support",
            "Custom SLAs",
            "Unlimited Jobs",
            "Tailored Solutions",
            "Security Audit",
        ],
        accent: "from-purple-400 to-fuchsia-500",
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
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

            <div className="container mx-auto px-4 py-16 md:py-24 relative">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center mb-20"
                >
                    <div className="inline-block relative">
                        <h1
                            className={`text-5xl md:text-6xl font-bold mb-6 ${montserrat.className} bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent`}
                        >
                            Pricing Plans
                        </h1>
                        <div className="absolute bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 blur-md" />
                    </div>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Transparent pricing that grows with your needs. Start small, scale infinitely.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
                >
                    {pricingPlans.map((plan) => (
                        <motion.div
                            key={plan.title}
                            variants={cardVariants}
                            whileHover="hover"
                            className="relative group"
                        >
                            {plan.popular && (
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-xl flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                    </svg>
                                    Most Popular
                                </div>
                            )}
                            <div
                                className={`h-full bg-gradient-to-b from-gray-800/40 to-gray-900/10 backdrop-blur-2xl rounded-2xl p-8 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 ${plan.popular ? "ring-2 ring-blue-500/20 ring-inset" : ""
                                    }`}
                            >
                                <div className="mb-8">
                                    <div className={`w-12 h-12 rounded-lg mb-4 bg-gradient-to-r ${plan.accent} flex items-center justify-center`}>
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h2 className={`text-3xl font-bold mb-2 ${montserrat.className}`}>
                                        {plan.title}
                                    </h2>
                                    <p className="text-gray-300">{plan.description}</p>
                                </div>

                                <div className="mb-8 p-6 bg-gray-900/30 rounded-xl">
                                    <div className="flex items-end gap-2">
                                        <span className="text-5xl font-bold">${plan.price}</span>
                                        <span className="text-gray-400">/month</span>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-12">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-4">
                                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${plan.accent} flex items-center justify-center`}>
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={`w-full py-4 rounded-xl font-medium transition-all duration-300 relative overflow-hidden ${plan.popular
                                            ? "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
                                            : "bg-gray-800 hover:bg-gray-700"
                                        }`}
                                >
                                    <span className="relative z-10">Get Started</span>
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
                    className="mt-16 bg-gradient-to-r from-gray-800/30 to-gray-900/20 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/30 text-center"
                >
                    <div className="max-w-2xl mx-auto">
                        <h3 className={`text-3xl font-bold mb-4 ${montserrat.className}`}>
                            Custom Enterprise Solutions
                        </h3>
                        <p className="text-gray-300 mb-6">
                            Require tailored infrastructure or dedicated support? Let's build a solution that matches your exact needs.
                        </p>
                        <button className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300">
                            Schedule Enterprise Consultation
                        </button>
                    </div>
                </motion.div>
            </div>

            <FooterSection />
        </div>
    );
}

export default Page;