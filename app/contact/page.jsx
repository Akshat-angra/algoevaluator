"use client"

import { useState } from "react"
import { Montserrat } from "next/font/google"
import { motion } from "framer-motion"
import { FooterSection } from "../components/footer/FooterSection"

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
})

const contactSections = [
    {
        title: "Contact Us",
        items: [
            { title: "General Inquiries", href: "#general-inquiries" },
            { title: "Support", href: "#support" },
            { title: "Sales", href: "#sales" },
            { title: "Partnerships", href: "#partnerships" },
        ],
    },
    {
        title: "Office Locations",
        items: [
            { title: "New Delhi", href: "#new-delhi" },
            { title: "San Francisco", href: "#san-francisco" },
            { title: "London", href: "#london" },
            { title: "Tokyo", href: "#tokyo" },
        ],
    },
]

function ContactPage() {
    const [activeSection, setActiveSection] = useState("General Inquiries")

    return (
        <div className="min-h-screen w-full bg-black text-gray-100">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-5 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 pointer-events-none" />

            <div className="relative">
                <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-4">
                    <div className="max-w-7xl mx-auto py-4">
                        <h1
                            className={`text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent ${montserrat.className}`}
                        >
                            Contact AlgoEvaluator
                        </h1>
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
                                {contactSections.map((section) => (
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
                                            Contact Us
                                        </span>
                                        <h1
                                            className={`text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent ${montserrat.className}`}
                                        >
                                            Get in Touch with AlgoEvaluator
                                        </h1>
                                    </div>
                                    <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                                        Have questions or need assistance? We're here to help. Reach out to our team for support, sales
                                        inquiries, or partnership opportunities.
                                    </p>
                                </div>

                                <section id="general-inquiries" className="mb-12">
                                    <h2
                                        className={`text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent ${montserrat.className}`}
                                    >
                                        General Inquiries
                                    </h2>
                                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                                        <form className="space-y-4">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    className="w-full bg-white/5 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-white/10"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    className="w-full bg-white/5 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-white/10"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                                                    Message
                                                </label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    rows={4}
                                                    className="w-full bg-white/5 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-white/10"
                                                ></textarea>
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full bg-purple-500 text-white rounded-lg px-4 py-2 hover:bg-purple-600 transition-colors"
                                            >
                                                Send Message
                                            </button>
                                        </form>
                                    </div>
                                </section>

                                <section id="support" className="mb-12">
                                    <h2
                                        className={`text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent ${montserrat.className}`}
                                    >
                                        Support
                                    </h2>
                                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                                        <p className="text-gray-300 mb-4">
                                            For technical support or assistance with your AlgoEvaluator account, please contact our support team:
                                        </p>
                                        <ul className="space-y-2 text-gray-300">
                                            <li>Email: support@algoevaluator.com</li>
                                            <li>Phone: +91 8168754874</li>
                                            <li>Hours: Monday - Friday, 9am - 5pm EST</li>
                                        </ul>
                                    </div>
                                </section>

                                <section id="sales" className="mb-12">
                                    <h2
                                        className={`text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent ${montserrat.className}`}
                                    >
                                        Sales
                                    </h2>
                                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                                        <p className="text-gray-300 mb-4">
                                            Interested in AlgoEvaluator for your organization? Our sales team is ready to assist you:
                                        </p>
                                        <ul className="space-y-2 text-gray-300">
                                            <li>Email: sales@algoevaluator.com</li>
                                            <li>Phone: +91 8168754874</li>
                                            <li>
                                                Schedule a demo:{" "}
                                                <a href="#" className="text-purple-400 hover:underline">
                                                    Book Now
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </section>

                                <section id="partnerships" className="mb-12">
                                    <h2
                                        className={`text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent ${montserrat.className}`}
                                    >
                                        Partnerships
                                    </h2>
                                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                                        <p className="text-gray-300 mb-4">Explore partnership opportunities with AlgoEvaluator:</p>
                                        <ul className="space-y-2 text-gray-300">
                                            <li>Email: partnerships@algoevaluator.com</li>
                                            <li>
                                                Learn more:{" "}
                                                <a href="#" className="text-purple-400 hover:underline">
                                                    Partnership Program
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </section>
                            </motion.div>
                        </main>
                    </div>
                </div>
            </div>
            <div className="flex items-center my-8 w-full">
                <div className="flex-grow h-px bg-gradient-to-r from-cyan-300 via-indigo-500 to-purple-600"></div>
                <div className="flex-shrink-0 mx-4">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50 animate-pulse"></div>
                </div>
                <div className="flex-grow h-px bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-300"></div>
            </div>
            <FooterSection />
        </div>
    )
}

export default ContactPage