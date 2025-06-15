'use client';
import React, { useState, useEffect } from 'react';
import { Brain, Sparkles, Code, MessageCircle, Zap, ArrowRight, Star, Shield, Database } from 'lucide-react';
import Link from 'next/link';

export default function AlgoStubAIIntroduction() {
    const [activeFeature, setActiveFeature] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [animateBackground, setAnimateBackground] = useState(false);
    const features = [
        {
            icon: <MessageCircle className="h-5 w-5" />,
            title: "Advanced Conversation",
            description: "Experience human-like interactions with deep context understanding"
        },
        {
            icon: <Brain className="h-5 w-5" />,
            title: "Custom Training",
            description: "Built specifically for your organization's unique needs"
        },
        {
            icon: <Code className="h-5 w-5" />,
            title: "Code Assistance",
            description: "Get intelligent code suggestions and debugging help"
        },
        {
            icon: <Database className="h-5 w-5" />,
            title: "Knowledge Integration",
            description: "Seamlessly connects with your existing knowledge bases"
        },
        {
            icon: <Shield className="h-5 w-5" />,
            title: "Enterprise Security",
            description: "Built with privacy and security protocols for sensitive data"
        }
    ];

    const supportedLanguages = [
        'Natural Language', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'C++', 'Java', 'Go', 'Rust'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % features.length);
        }, 3000);
        setAnimateBackground(true);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-gradient-to-b from-black to-indigo-950">
            <div className="container mx-auto px-4 py-16">
                <div className="relative mb-12">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 font-bold text-center relative z-10">
                        Introducing AlgoStub AI
                    </h1>
                    <p className="text-xl md:text-2xl text-center text-purple-200 mt-4 max-w-3xl mx-auto">
                        Our own built-in house AI Assistant designed for developers
                    </p>

                    <div className="flex justify-center mt-6 mb-8">
                        <div className="h-1 w-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto overflow-hidden rounded-3xl shadow-[0_0_60px_rgba(128,90,213,0.4)]">
                    <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                    <div className="bg-[rgb(15,11,25)] relative">
                        <div
                            className={`absolute inset-0 opacity-5 transition-opacity duration-1000 ${animateBackground ? 'opacity-10' : 'opacity-0'}`}
                            style={{
                                backgroundImage: "radial-gradient(circle, rgba(148, 110, 233, 0.4) 1px, transparent 1px), radial-gradient(circle, rgba(148, 110, 233, 0.2) 1px, transparent 1px)",
                                backgroundSize: "30px 30px, 90px 90px"
                            }}
                        />
                        <div className="absolute inset-0 overflow-hidden">
                            {[...Array(12)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 opacity-10"
                                    style={{
                                        top: `${Math.random() * 100}%`,
                                        left: `${Math.random() * 100}%`,
                                        width: `${20 + Math.random() * 40}px`,
                                        height: `${20 + Math.random() * 40}px`,
                                        animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                                        animationDelay: `${Math.random() * 5}s`
                                    }}
                                />
                            ))}
                        </div>
                        <div className="grid md:grid-cols-5 relative z-10">
                            <div className="md:col-span-3 p-8 md:p-12 lg:p-16">
                                <div
                                    className="transition-all duration-500"
                                    style={{ transform: isHovering ? 'translateY(-8px)' : 'translateY(0)' }}
                                    onMouseEnter={() => setIsHovering(true)}
                                    onMouseLeave={() => setIsHovering(false)}
                                >
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg shadow-lg shadow-purple-900/30">
                                            <Brain className="h-6 w-6 text-white" />
                                        </div>
                                        <div className="px-4 py-1.5 bg-purple-900/50 text-purple-200 text-sm rounded-full border border-purple-700/50 backdrop-blur-sm">
                                            Built by Akshat Angra & Team
                                        </div>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                                        Meet AlgoStub AI
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400"> Your Intelligent Assistant</span>
                                    </h2>
                                    <p className="text-lg md:text-xl text-purple-200 mb-10 max-w-lg leading-relaxed">
                                        Experience a new level of AI assistance, custom-built for your workflow and tailored to understand your unique challenges.
                                    </p>
                                    <div className="flex flex-wrap gap-4 mb-12">
                                        <Link href="/chat" className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30 transform hover:scale-105 duration-300">
                                            <Sparkles className="h-5 w-5" />
                                            Try AlgoStub AI
                                        </Link>
                                        <button
                                            className="px-8 py-4 bg-[rgb(30,22,48)] hover:bg-[rgb(40,30,65)] text-purple-300 hover:text-white font-medium rounded-xl transition-all border border-purple-800/50 hover:border-purple-600 transform hover:scale-105 duration-300"
                                        >
                                            Learn More
                                        </button>
                                    </div>
                                    <div className="h-28 relative overflow-hidden mb-8">
                                        {features.map((feature, index) => (
                                            <div
                                                key={index}
                                                className="absolute top-0 left-0 w-full transition-all duration-700 opacity-0 transform translate-y-8"
                                                style={{
                                                    opacity: activeFeature === index ? 1 : 0,
                                                    transform: activeFeature === index ? 'translateY(0)' : 'translateY(8px)'
                                                }}
                                            >
                                                <div className="flex items-center gap-4 mb-3">
                                                    <div className="p-3 bg-gradient-to-br from-purple-800 to-indigo-900 rounded-lg text-purple-300 shadow-md">
                                                        {feature.icon}
                                                    </div>
                                                    <h3 className="font-semibold text-white text-lg">{feature.title}</h3>
                                                </div>
                                                <p className="text-purple-200 pl-12">{feature.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {supportedLanguages.map((lang) => (
                                            <span
                                                key={lang}
                                                className="px-4 py-2 bg-[rgb(30,22,48)] text-purple-300 text-sm rounded-full hover:bg-purple-700 hover:text-white transition-colors cursor-pointer border border-purple-900/30 hover:border-purple-600"
                                            >
                                                {lang}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-2 bg-gradient-to-b from-[rgb(20,15,32)] to-[rgb(18,13,30)] p-8 md:p-10 flex flex-col justify-center items-center rounded-r-lg">
                                <div className="w-full max-w-sm">
                                    <div className="text-center mb-10">
                                        <h3 className="text-xl font-medium text-purple-200 mb-6">Capabilities</h3>
                                        <div className="space-y-4">
                                            {[
                                                { icon: <MessageCircle className="h-4 w-4" />, text: "Natural conversations" },
                                                { icon: <Zap className="h-4 w-4" />, text: "Lightning-fast responses" },
                                                { icon: <Code className="h-4 w-4" />, text: "Code assistance & generation" },
                                                { icon: <Star className="h-4 w-4" />, text: "Personalized recommendations" }
                                            ].map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-4 bg-gradient-to-r from-[rgb(30,22,48)] to-[rgb(35,25,55)] p-4 rounded-xl border border-purple-900/30 hover:border-purple-700 transition-all hover:-translate-y-1 duration-300 cursor-pointer"
                                                >
                                                    <div className="p-2 bg-purple-800/50 rounded-lg text-purple-300">
                                                        {item.icon}
                                                    </div>
                                                    <span className="text-white">{item.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="rounded-xl overflow-hidden border border-purple-900/30 mb-10 shadow-lg shadow-purple-900/20 transform hover:scale-105 transition-transform duration-300">
                                        <div className="p-4 bg-gradient-to-r from-[rgb(25,18,40)] to-[rgb(28,20,45)] border-b border-purple-900/30">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                                <div className="ml-2 text-xs text-purple-400">ai_conversation.txt</div>
                                            </div>
                                        </div>
                                        <div className="p-5 bg-gradient-to-b from-[rgb(15,11,25)] to-[rgb(18,13,30)] font-mono text-sm">
                                            <div className="text-gray-500 mb-2">// Sample conversation</div>
                                            <div className="text-blue-400 mb-2">&gt; How can I optimize this code?</div>
                                            <div className="text-green-400">&lt; Let me analyze that for you...</div>
                                            <div className="text-green-400 pl-3 opacity-90">I see several ways to improve efficiency:</div>
                                            <div className="text-green-400 pl-3 opacity-80">1. Use memoization for repeated calls</div>
                                            <div className="text-green-400 pl-3 opacity-70">2. Replace nested loops with Map</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <Link href="/chat" className="group flex items-center gap-3 text-purple-200 hover:text-white transition-all px-5 py-3 rounded-lg hover:bg-purple-900/30 border border-transparent hover:border-purple-700/50">
                                            Start chatting with AlgoStub AI
                                            <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-[rgb(12,9,20)] to-[rgb(15,11,25)] p-6 text-center border-t border-purple-900/20">
                            <p className="text-purple-300 text-sm">
                                Experience AI assistance reimagined for developers and teams.
                            </p>
                        </div>
                    </div>
                </div>

                <style jsx global>{`
                    @keyframes float {
                        0% { transform: translate(0px, 0px); }
                        25% { transform: translate(10px, -15px); }
                        50% { transform: translate(0px, -30px); }
                        75% { transform: translate(-10px, -15px); }
                        100% { transform: translate(0px, 0px); }
                    }
                `}</style>
            </div>
        </div>
    );
}