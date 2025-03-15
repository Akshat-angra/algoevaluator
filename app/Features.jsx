'use client';
import React, { useEffect, useRef } from 'react';
import { Bot, Code2, Sparkles } from 'lucide-react';

const App = () => {
    const lineRef = useRef(null);
    const contentRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const handleScroll = () => {
                            if (lineRef.current && containerRef.current) {
                                const container = containerRef.current;
                                const containerRect = container.getBoundingClientRect();
                                const containerTop = containerRect.top;
                                const containerHeight = containerRect.height - window.innerHeight;

                                let progress = 0;
                                if (containerTop <= 0) {
                                    progress = Math.min(Math.abs(containerTop) / containerHeight * 100, 100);
                                }

                                lineRef.current.style.height = `${progress}%`;
                                lineRef.current.style.boxShadow = `
                                    0 0 ${Math.min(progress / 3, 15)}px ${Math.min(progress / 5, 8)}px rgba(59, 130, 246, 0.6),
                                    0 0 ${Math.min(progress / 2, 30)}px ${Math.min(progress / 3, 15)}px rgba(59, 130, 246, 0.3)
                                `;
                            }
                        };

                        window.addEventListener('scroll', handleScroll);
                        return () => window.removeEventListener('scroll', handleScroll);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-[100vh] bg-slate-950 relative overflow-hidden" ref={contentRef}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-slate-950 animate-gradient-shift" />

            <div ref={containerRef} className="relative min-h-screen">
                <div className="absolute left-4 md:left-[10%] top-[5vh] bottom-[5vh] w-[2px] after:content-[''] after:absolute after:top-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-[1px] after:h-full after:bg-blue-500/10">
                    <div
                        ref={lineRef}
                        className="absolute top-0 w-full bg-gradient-to-b from-blue-400 via-blue-500 to-blue-400 transition-all duration-100 rounded-full"
                        style={{
                            height: '0%',
                            boxShadow: '0 0 0px 0px rgba(59, 130, 246, 0.5)'
                        }}
                    />
                </div>

                <div className="relative pl-8 md:pl-[15%] pr-4 md:pr-[5%]">
                    <div className="min-h-screen flex items-center">
                        <div className="w-full max-w-2xl space-y-6 md:space-y-8">
                            <div className="relative inline-block">
                                <span className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 blur opacity-75 animate-pulse"></span>
                                <span className="relative inline-block px-4 md:px-6 py-2 md:py-3 bg-slate-900/90 text-blue-400 text-lg md:text-xl font-mono rounded-lg backdrop-blur-sm">
                                    Welcome to the Future
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-7xl font-bold text-white space-y-2 md:space-y-4">
                                <div className="transform hover:translate-x-2 transition-transform duration-300">Create.</div>
                                <div className="transform hover:translate-x-2 transition-transform duration-300">Innovate.</div>
                                <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient-x transform hover:translate-x-2 transition-transform duration-300">
                                    Transform.
                                </div>
                            </h1>
                            <p className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed">
                                Push the boundaries of what's possible with cutting-edge technology
                                and innovative solutions.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="group bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:scale-105 w-full sm:w-auto">
                                    Get Started
                                    <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                                <button className="relative overflow-hidden border border-blue-500 text-blue-400 px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] group w-full sm:w-auto">
                                    <span className="relative z-10">Learn More</span>
                                    <div className="absolute inset-0 bg-blue-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="min-h-screen py-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
                            <div className="col-span-1 lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 p-6 md:p-8 rounded-3xl transform hover:scale-[1.02] transition-transform duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                                <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                                    <div className="bg-blue-500/20 p-4 rounded-2xl">
                                        <Bot className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
                                    </div>
                                    <div className="space-y-3 md:space-y-4">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white">AI-Powered Solutions</h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            Harness the power of artificial intelligence to automate workflows,
                                            gain insights, and make data-driven decisions with unprecedented accuracy.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="row-span-2 relative overflow-hidden rounded-3xl group transform hover:scale-[1.02] transition-transform duration-300 min-h-[300px] lg:min-h-full">
                                <img
                                    src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80"
                                    alt="Technology Abstract"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                                <div className="absolute bottom-0 p-6 md:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">The Future is Now</h3>
                                    <p className="text-gray-300 text-sm md:text-base">
                                        Experience tomorrow's technology today with our cutting-edge solutions.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 md:p-8 rounded-3xl transform hover:scale-[1.02] transition-transform duration-300 hover:shadow-[0_0_30px_rgba(147,51,234,0.2)]">
                                <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                                    <div className="bg-purple-500/20 p-4 rounded-2xl">
                                        <Code2 className="w-8 h-8 md:w-10 md:h-10 text-purple-400" />
                                    </div>
                                    <div className="space-y-3 md:space-y-4">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white">Clean Architecture</h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            Build scalable applications with our battle-tested architecture patterns.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 md:p-8 rounded-3xl transform hover:scale-[1.02] transition-transform duration-300 hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                                <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                                    <div className="bg-yellow-500/20 p-4 rounded-2xl">
                                        <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" />
                                    </div>
                                    <div className="space-y-3 md:space-y-4">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white">Magic Features</h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            Delight your users with magical experiences and seamless interactions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;