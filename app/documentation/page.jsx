"use client";

import React, { useState } from "react";
import { Montserrat } from "next/font/google";
import { motion } from "framer-motion";
import { FooterSection } from "../components/footer/FooterSection";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const sections = [
    {
        title: "Getting Started",
        items: [
            { title: "Quick Start Guide", href: "#quick-start" },
            { title: "Installation", href: "#installation" },
            { title: "Authentication", href: "#authentication" },
            { title: "First Integration", href: "#first-integration" },
        ],
    },
    {
        title: "Core Concepts",
        items: [
            { title: "Assessment Types", href: "#assessment-types" },
            { title: "Candidate Screening", href: "#candidate-screening" },
            { title: "Interview Process", href: "#interview-process" },
            { title: "Team Management", href: "#team-management" },
        ],
    },
    {
        title: "API Reference",
        items: [
            { title: "REST API Overview", href: "#rest-api" },
            { title: "Authentication", href: "#api-auth" },
            { title: "Rate Limits", href: "#rate-limits" },
            { title: "Webhooks", href: "#webhooks" },
        ],
    },
    {
        title: "Guides",
        items: [
            { title: "Custom Assessments", href: "#custom-assessments" },
            { title: "Integration Examples", href: "#integration-examples" },
            { title: "Best Practices", href: "#best-practices" },
            { title: "Troubleshooting", href: "#troubleshooting" },
        ],
    },
];

function Page() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeSection, setActiveSection] = useState("Getting Started");

    return (
        <div className="min-h-screen w-full bg-black text-gray-100">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-5 pointer-events-none" />

            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 pointer-events-none" />

            <div className="relative">
                <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-4">
                    <div className="max-w-7xl mx-auto py-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search documentation..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 text-gray-100 placeholder-gray-400 rounded-xl px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-white/10 hover:border-white/20 transition-colors"
                            />
                            <svg
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        <motion.aside
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="hidden lg:block lg:col-span-3"
                        >
                            <nav className="sticky top-24 space-y-8">
                                {sections.map((section) => (
                                    <div key={section.title} className="bg-white/5 rounded-xl p-4">
                                        <h3 className="font-semibold text-sm uppercase tracking-wider text-purple-300 mb-3 px-3">
                                            {section.title}
                                        </h3>
                                        <ul className="space-y-1">
                                            {section.items.map((item) => (
                                                <li key={item.title}>
                                                    <a
                                                        href={item.href}
                                                        className={`block px-3 py-2 text-sm rounded-lg transition-all duration-200 ${activeSection === item.title
                                                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/20"
                                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                                            }`}
                                                        onClick={() => setActiveSection(item.title)}
                                                    >
                                                        {item.title}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </nav>
                        </motion.aside>

                        <main className="lg:col-span-9">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="prose prose-invert max-w-none"
                            >
                                <div className="mb-12">
                                    <div className="inline-block">
                                        <span className="px-4 py-1 text-xs font-medium text-purple-300 bg-purple-500/10 rounded-full mb-4 block w-fit">
                                            Documentation
                                        </span>
                                        <h1 className={`text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent ${montserrat.className}`}>
                                            Build with AI-Powered Hiring
                                        </h1>
                                    </div>
                                    <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                                        Learn how to integrate and use our AI-powered hiring platform effectively with comprehensive guides and examples.
                                    </p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4 mb-12">
                                    {["Quick Start Guide", "API Reference", "Best Practices", "Integration Examples"].map(
                                        (title) => (
                                            <motion.a
                                                key={title}
                                                href={`#${title.toLowerCase().replace(/\s+/g, "-")}`}
                                                className="block p-6 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all duration-300 group hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-blue-500/10"
                                                whileHover={{ y: -2 }}
                                            >
                                                <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-purple-300 transition-colors">
                                                    {title}
                                                </h3>
                                                <p className="text-sm text-gray-400">
                                                    Get started with {title.toLowerCase()} and core concepts.
                                                </p>
                                            </motion.a>
                                        )
                                    )}
                                </div>

                                <section id="quick-start" className="mb-12">
                                    <h2 className={`text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent ${montserrat.className}`}>
                                        Quick Start Guide
                                    </h2>
                                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                                        <h3 className="text-xl font-semibold mb-4 text-white">Installation</h3>
                                        <div className="bg-black/50 rounded-lg p-4 mb-6 border border-white/5 group relative">
                                            <code className="text-purple-300">npm install @hiring-platform/sdk</code>
                                            <button className="absolute top-3 right-3 text-gray-500 hover:text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                            </button>
                                        </div>
                                        <p className="text-gray-300 mb-6">
                                            Initialize the SDK with your API credentials:
                                        </p>
                                        <div className="bg-black/50 rounded-lg p-4 border border-white/5 group relative">
                                            <pre className="text-sm">
                                                <code className="text-purple-300">
                                                    {`import { HiringPlatform } from '@hiring-platform/sdk';

const client = new HiringPlatform({
    apiKey: 'your-api-key',
    organizationId: 'your-org-id'
});`}
                                                </code>
                                            </pre>
                                            <button className="absolute top-3 right-3 text-gray-500 hover:text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </section>

                                <section id="authentication" className="mb-12">
                                    <h2 className={`text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent ${montserrat.className}`}>
                                        Authentication
                                    </h2>
                                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                                <svg
                                                    className="w-6 h-6 text-purple-300"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold mb-2 text-white">Secure Authentication</h3>
                                                <p className="text-gray-400">
                                                    Learn how to authenticate your requests and manage API keys securely.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            {["API key authentication", "OAuth 2.0 support", "Role-based access control"].map((feature) => (
                                                <div key={feature} className="flex items-center gap-3 text-gray-300 bg-white/5 p-3 rounded-lg">
                                                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                                                        <svg
                                                            className="w-4 h-4 text-green-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M5 13l4 4L19 7"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            </motion.div>
                        </main>
                    </div>
                </div>
            </div>

            <FooterSection />
        </div>
    );
}

export default Page;