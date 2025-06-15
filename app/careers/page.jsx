'use client';

import { useState, useEffect } from 'react';
import ApplicationForm from '../components/careers/ApplicationForm';

export default function CareerPageClient() {
    const [activeTab, setActiveTab] = useState('about');
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect for navbar - using useEffect to ensure browser-only execution
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        // Only add the event listener on the client
        window.addEventListener('scroll', handleScroll);

        // Clean up
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-black"></div>

                {/* Background effects - only rendered client-side */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute inset-0"></div>
                </div>

                {/* Grid Pattern Background */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: 'linear-gradient(to right, rgba(75, 0, 130, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(75, 0, 130, 0.1) 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                        transform: isScrolled ? 'translateY(10px)' : 'translateY(0px)',
                        transition: 'transform 0.5s ease-out'
                    }}
                ></div>

                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-purple-500/20"
                            style={{
                                width: `${Math.floor(Math.random() * 300 + 100)}px`,
                                height: `${Math.floor(Math.random() * 300 + 100)}px`,
                                left: `${Math.floor(Math.random() * 100)}%`,
                                top: `${Math.floor(Math.random() * 100)}%`,
                                animation: `float ${Math.floor(Math.random() * 10 + 15)}s ease-in-out infinite`,
                                animationDelay: `${Math.floor(Math.random() * 5)}s`
                            }}
                        ></div>
                    ))}
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">
                            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500">Mission</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-2xl">
                            Help us build the future of algorithmic evaluation and responsible AI systems.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => scrollToSection("application")}
                                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium rounded-md hover:from-purple-700 hover:to-purple-900 transition-all transform hover:scale-105"
                            >
                                Apply Now
                            </button>
                            <button
                                onClick={() => scrollToSection("positions")}
                                className="px-8 py-4 bg-transparent border border-purple-500 text-purple-300 font-medium rounded-md hover:bg-purple-500/10 transition-all transform hover:scale-105"
                            >
                                View Positions
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
                    <div
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => scrollToSection("main-content")}
                    >
                        <span className="text-sm text-zinc-400 mb-2">Scroll Down</span>
                        <div className="w-6 h-10 border-2 border-zinc-400 rounded-full flex justify-center">
                            <div
                                className="w-2 h-2 bg-zinc-400 rounded-full mt-2 animate-bounce"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sticky Navigation */}
            <div
                className={`sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-lg transition-all duration-300 ${isScrolled ? 'shadow-lg shadow-purple-900/10' : ''}`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                            AlgoEvaluator
                        </div>
                        <div className="flex space-x-6">
                            <button
                                className={`py-2 px-4 font-medium transition-all hover:text-purple-400 ${activeTab === "about" ? "text-purple-500" : "text-zinc-400"}`}
                                onClick={() => setActiveTab("about")}
                            >
                                About
                            </button>
                            <button
                                className={`py-2 px-4 font-medium transition-all hover:text-purple-400 ${activeTab === "positions" ? "text-purple-500" : "text-zinc-400"}`}
                                onClick={() => {
                                    setActiveTab("positions");
                                    scrollToSection("positions");
                                }}
                            >
                                Positions
                            </button>
                            <button
                                className={`py-2 px-4 font-medium transition-all hover:text-purple-400 ${activeTab === "application" ? "text-purple-500" : "text-zinc-400"}`}
                                onClick={() => {
                                    setActiveTab("application");
                                    scrollToSection("application");
                                }}
                            >
                                Apply
                            </button>
                            <button
                                className="ml-4 py-2 px-4 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition-all transform hover:scale-105"
                                onClick={() => {
                                    setActiveTab("application");
                                    scrollToSection("application");
                                }}
                            >
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <section id="main-content" className="py-16 bg-gradient-to-b from-zinc-950 to-black">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        {/* Tabs */}
                        <div className="flex border-b border-zinc-800 mb-8">
                            <button
                                className={`py-3 px-6 font-medium text-lg transition-all ${activeTab === "about"
                                        ? "text-purple-500 border-b-2 border-purple-500"
                                        : "text-zinc-400 hover:text-white"
                                    }`}
                                onClick={() => setActiveTab("about")}
                            >
                                About Us
                            </button>
                            <button
                                className={`py-3 px-6 font-medium text-lg transition-all ${activeTab === "positions"
                                        ? "text-purple-500 border-b-2 border-purple-500"
                                        : "text-zinc-400 hover:text-white"
                                    }`}
                                onClick={() => setActiveTab("positions")}
                                id="positions"
                            >
                                Open Positions
                            </button>
                            <button
                                className={`py-3 px-6 font-medium text-lg transition-all ${activeTab === "application"
                                        ? "text-purple-500 border-b-2 border-purple-500"
                                        : "text-zinc-400 hover:text-white"
                                    }`}
                                onClick={() => setActiveTab("application")}
                                id="application"
                            >
                                Apply
                            </button>
                        </div>

                        {/* About Tab */}
                        {activeTab === "about" && (
                            <div className="space-y-12">
                                <div>
                                    <h2 className="text-3xl font-bold mb-6 inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Who We Are</h2>
                                    <p className="text-zinc-300 mb-4 text-lg">
                                        AlgoEvaluator is a pioneering company focused on developing cutting-edge tools for algorithmic evaluation,
                                        fairness assessment, and AI system auditing. Our mission is to ensure that AI systems are transparent,
                                        fair, and accountable.
                                    </p>
                                    <p className="text-zinc-300 text-lg">
                                        Founded in 2023 by a team of AI researchers and engineers with experience from leading tech companies and
                                        research institutions, we're building solutions that help organizations evaluate, improve, and document
                                        their algorithmic systems.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-3xl font-bold mb-6 inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Our Values</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-zinc-900/60 p-8 rounded-lg border border-purple-900/30 hover:border-purple-500/50 transition-all group">
                                            <div className="h-12 w-12 rounded-lg bg-purple-900/30 flex items-center justify-center mb-4 group-hover:bg-purple-600/30 transition-colors">
                                                <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-semibold mb-3 text-purple-400">Innovation</h3>
                                            <p className="text-zinc-300">
                                                We're constantly pushing the boundaries of what's possible in algorithmic evaluation and AI fairness.
                                            </p>
                                        </div>

                                        <div className="bg-zinc-900/60 p-8 rounded-lg border border-purple-900/30 hover:border-purple-500/50 transition-all group">
                                            <div className="h-12 w-12 rounded-lg bg-purple-900/30 flex items-center justify-center mb-4 group-hover:bg-purple-600/30 transition-colors">
                                                <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-semibold mb-3 text-purple-400">Transparency</h3>
                                            <p className="text-zinc-300">
                                                We believe in open communication, clear documentation, and explainable AI systems.
                                            </p>
                                        </div>

                                        <div className="bg-zinc-900/60 p-8 rounded-lg border border-purple-900/30 hover:border-purple-500/50 transition-all group">
                                            <div className="h-12 w-12 rounded-lg bg-purple-900/30 flex items-center justify-center mb-4 group-hover:bg-purple-600/30 transition-colors">
                                                <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-semibold mb-3 text-purple-400">Impact</h3>
                                            <p className="text-zinc-300">
                                                We focus on work that makes a meaningful difference in how AI is built and deployed.
                                            </p>
                                        </div>

                                        <div className="bg-zinc-900/60 p-8 rounded-lg border border-purple-900/30 hover:border-purple-500/50 transition-all group">
                                            <div className="h-12 w-12 rounded-lg bg-purple-900/30 flex items-center justify-center mb-4 group-hover:bg-purple-600/30 transition-colors">
                                                <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-semibold mb-3 text-purple-400">Growth</h3>
                                            <p className="text-zinc-300">
                                                We support continuous learning and development for all team members.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-3xl font-bold mb-6 inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Benefits</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[
                                            { icon: "💰", text: "Competitive salary & equity" },
                                            { icon: "🌎", text: "Remote-first culture" },
                                            { icon: "⏰", text: "Flexible working hours" },
                                            { icon: "🏥", text: "Comprehensive health benefits" },
                                            { icon: "📚", text: "Learning & development budget" },
                                            { icon: "🏠", text: "Home office stipend" },
                                            { icon: "✈️", text: "Regular team retreats" },
                                            { icon: "🧠", text: "Mental health days" }
                                        ].map((benefit, index) => (
                                            <div
                                                key={index}
                                                className="bg-zinc-900/40 p-4 rounded-lg flex items-center gap-4 hover:bg-zinc-900/60 transition-all"
                                            >
                                                <span className="text-2xl">{benefit.icon}</span>
                                                <span className="text-zinc-300">{benefit.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Positions Tab */}
                        {activeTab === "positions" && (
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-3xl font-bold mb-6 inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Open Positions</h2>

                                    <div className="space-y-6">
                                        {/* Position 1 */}
                                        <div className="bg-zinc-900/60 p-6 rounded-xl border border-purple-900/30 hover:border-purple-600/50 transition-all">
                                            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                                <div>
                                                    <h3 className="text-2xl font-semibold text-white">Senior Frontend Developer</h3>
                                                    <p className="text-purple-400">Engineering • Remote</p>
                                                </div>
                                                <span className="px-4 py-1.5 bg-purple-900/40 text-purple-300 text-sm font-medium rounded-full">
                                                    Full-time
                                                </span>
                                            </div>
                                            <p className="text-zinc-300 mb-6 text-lg">
                                                We're looking for an experienced frontend developer to help build intuitive and powerful interfaces for our algorithmic evaluation platform.
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                <span className="px-3 py-1.5 bg-zinc-800/80 text-zinc-300 text-sm rounded-md">React</span>
                                                <span className="px-3 py-1.5 bg-zinc-800/80 text-zinc-300 text-sm rounded-md">TypeScript</span>
                                                <span className="px-3 py-1.5 bg-zinc-800/80 text-zinc-300 text-sm rounded-md">Next.js</span>
                                                <span className="px-3 py-1.5 bg-zinc-800/80 text-zinc-300 text-sm rounded-md">Tailwind CSS</span>
                                                <span className="px-3 py-1.5 bg-zinc-800/80 text-zinc-300 text-sm rounded-md">Data Visualization</span>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setActiveTab("application");
                                                    scrollToSection("application");
                                                }}
                                                className="px-5 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium rounded-md hover:from-purple-700 hover:to-purple-900 transition-all flex items-center gap-2"
                                            >
                                                Apply Now
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Position 2 */}
                                        <div className="bg-zinc-900/60 p-6 rounded-xl border border-purple-900/30 hover:border-purple-600/50 transition-all">
                                            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                                <div>
                                                    <h3 className="text-2xl font-semibold text-white">Machine Learning Engineer</h3>
                                                    <p className="text-purple-400">AI Research • Remote</p>
                                                </div>
                                                <span className="px-4 py-1.5 bg-purple-900/40 text-purple-300 text-sm font-medium rounded-full">
                                                    Full-time
                                                </span>
                                            </div>
                                            <p className="text-zinc-300 mb-6 text-lg">
                                                Join our ML team to develop advanced evaluation methods for algorithmic systems and help build our core fairness assessment engine.
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                <span className="px-3 py-1.5 bg-zinc-800/80 text-zinc-300 text-sm rounded-md">Python</span>
                                                <span className="px-3 py-1.5 bg-zinc-800/80 text-zinc-300 text-sm rounded-md">PyTorch</span>
                                                <span className="px-3 py-1.5 bg-zinc-800/80 text-zinc-300 text-sm rounded-md">TensorFlow</span>
                                                <span className="px-3 py-1.5 bg-zinc-800/80 text-zinc-300 text-sm rounded-md">MLOps</span>
                                                <span className="px-3 py-1.5 bg-zinc-800/80 text-zinc-300 text-sm rounded-md">Fairness Metrics</span>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setActiveTab("application");
                                                    scrollToSection("application");
                                                }}
                                                className="px-5 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium rounded-md hover:from-purple-700 hover:to-purple-900 transition-all flex items-center gap-2"
                                            >
                                                Apply Now
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Position 3 */}
                                        <div className="bg-zinc-900/60 p-6 rounded-xl border border-purple-900/30 hover:border-purple-600/50 transition-all">
                                            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                                <div>
                                                    <h3 className="text-2xl font-semibold text-white">Product Manager</h3>
                                                    <p className="text-purple-400">Product • Remote</p>
                                                </div>
                                                <span className="px-4 py-1.5 bg-purple-900/40 text-purple-300 text-sm font-medium rounded-full">
                                                    Full-time
                                                </span>
                                            </div>
                                            <p className="text-zinc-300 mb-6 text-lg">
                                                Drive the vision for our algorithmic evaluation products, working closely with engineering, design, and customer success teams.
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                <span className="px-3 py-1.5 bg-zinc-800/80 text-zinc-300 text-sm rounded-md">Product Strategy</span>
                                                <span className="px-3 py-1.5 bg-zinc-800/80 text-zinc-300 text-sm rounded-md">User Research</span>
                                                <span className="px-3 py-1.5 bg-zinc-800/80 text-zinc-300 text-sm rounded-md">Roadmapping</span>
                                                <span className="px-3 py-1.5 bg-zinc-800/80 text-zinc-300 text-sm rounded-md">AI/ML Knowledge</span>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setActiveTab("application");
                                                    scrollToSection("application");
                                                }}
                                                className="px-5 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium rounded-md hover:from-purple-700 hover:to-purple-900 transition-all flex items-center gap-2"
                                            >
                                                Apply Now
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Application Tab */}
                        {activeTab === "application" && (
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-3xl font-bold mb-6">Apply Now</h2>
                                    <p className="text-zinc-300 mb-8">
                                        We're excited that you're interested in joining our team! Please fill out the form below to apply for one of our open positions.
                                        Feel free to attach your resume, portfolio, or any other materials that showcase your skills and experience.
                                    </p>

                                    <ApplicationForm />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-16 bg-gradient-to-b from-zinc-950 to-black">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to make an impact?</h2>
                        <p className="text-zinc-300 mb-8 max-w-2xl mx-auto">
                            Join our team and help shape the future of algorithmic evaluation and responsible AI.
                        </p>
                        <button
                            onClick={() => {
                                setActiveTab("application");
                                scrollToSection("application");
                            }}
                            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium rounded-md hover:from-purple-700 hover:to-purple-900 transition-all"
                        >
                            Apply Today
                        </button>
                    </div>
                </div>

                {/* Simple Footer */}
                <footer className="mt-16 border-t border-zinc-800 pt-8">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="mb-6 md:mb-0">
                                <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                                    AlgoEvaluator
                                </div>
                                <p className="text-zinc-400 mt-2">Building a more transparent future for AI</p>
                            </div>
                            <div className="flex space-x-6">
                                <a href="#" className="text-zinc-400 hover:text-purple-400">About</a>
                                <a href="#" className="text-zinc-400 hover:text-purple-400">Careers</a>
                                <a href="#" className="text-zinc-400 hover:text-purple-400">Contact</a>
                                <a href="#" className="text-zinc-400 hover:text-purple-400">Privacy</a>
                            </div>
                        </div>
                        <div className="mt-8 text-center text-zinc-500 text-sm">
                            © {new Date().getFullYear()} AlgoEvaluator. All rights reserved.
                        </div>
                    </div>
                </footer>
            </section>

            {/* Add key-frames for floating animation */}
            <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
        </div>
    );
}