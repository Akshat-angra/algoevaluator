import React from 'react';
import { Bot, Brain, Sparkles, ChevronRight, CheckCircle, Shield, Clock, BarChart } from 'lucide-react';

function App() {
    return (
        <div className="min-h-screen bg-[#1A1328] text-white">

            {/* AI Interview Section */}
            <section className="py-20 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80')] bg-cover bg-center"></div>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A1328]/80 via-[#1A1328] to-[#1A1328]/90"></div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-600/20 rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600/20 rounded-full filter blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        {/* Text Content Side */}
                        <div className="space-y-8" style={{ backgroundImage: "url('./images/course-hero-grid.svg')" }}>
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-700/50">
                                <Sparkles className="h-4 w-4 mr-2" />
                                <span className="text-sm font-medium">AI-Powered Insights</span>
                            </div>
                            <h2 className="text-5xl font-bold text-white leading-tight">
                                Revolutionizing <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Interviews</span> with Artificial Intelligence
                            </h2>
                            <p className="text-lg text-gray-300">
                                Our cutting-edge AI technology transforms the traditional interview process,
                                providing deeper insights, reducing bias, and helping you find the perfect
                                candidates faster than ever before.
                            </p>

                            <div className="bg-[#231835]/80 backdrop-blur-sm p-6 rounded-xl border border-indigo-900/50 shadow-[0_0_15px_rgba(79,70,229,0.15)]">
                                <div className="flex items-start mb-6">
                                    <div className="bg-indigo-600 p-2 rounded-full mr-4 shadow-[0_0_10px_rgba(79,70,229,0.5)]">
                                        <Bot className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">AI Interviewer</h3>
                                        <p className="text-gray-300 mt-1">
                                            How would you approach solving complex problems in a fast-paced environment?
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-[#2A1F3D] p-2 rounded-full mr-4">
                                        <div className="h-6 w-6 rounded-full bg-gray-500/50"></div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">Candidate</h3>
                                        <p className="text-gray-300 mt-1">
                                            I believe in breaking down complex problems into manageable components,
                                            prioritizing tasks based on impact and urgency, and leveraging collaborative
                                            approaches when beneficial...
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-900/30 inline-flex items-center group">
                                    <span>Get Started</span>
                                    <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="bg-[#231835] text-white px-6 py-3 rounded-md border border-indigo-800/30 hover:bg-[#2A1F3D] transition-colors">
                                    Learn More
                                </button>
                            </div>
                        </div>

                        {/* Image Side */}
                        <div className="relative">
                            <div className="rounded-xl overflow-hidden shadow-[0_0_25px_rgba(79,70,229,0.3)]">
                                {/* Background Image with Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 mix-blend-overlay rounded-xl z-10"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                                    alt="AI Technology Background"
                                    className="w-full h-[550px] object-cover rounded-xl"
                                />

                                {/* Overlaid Image */}
                                <div className="absolute bottom-8 right-8 w-3/4 z-20 transform translate-y-4 translate-x-4 transition-all duration-500 hover:translate-y-0 hover:translate-x-0 hover:scale-105">
                                    <div className="bg-[#231835]/90 backdrop-blur-sm p-4 rounded-lg shadow-xl border border-indigo-900/50">
                                        <img
                                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                                            alt="AI Analysis Dashboard"
                                            className="w-full h-auto rounded"
                                        />
                                        <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl rounded-tr">
                                            AI ANALYSIS
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative Elements */}
                                <div className="absolute top-6 left-6 bg-[#231835]/80 backdrop-blur-sm p-3 rounded-lg shadow-lg z-20 border border-indigo-900/50">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                </div>

                                {/* Code Snippet */}
                                <div className="absolute top-6 right-6 bg-[#231835]/80 backdrop-blur-sm p-3 rounded-lg shadow-lg z-20 border border-indigo-900/50 max-w-[200px] transform rotate-3">
                                    <div className="text-xs font-mono text-indigo-300">
                                        <div>function analyzeResponse(text) {"{"}</div>
                                        <div className="pl-2">return AI.sentiment(text);</div>
                                        <div>{"}"}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Card */}
                            <div className="absolute -bottom-6 -left-6 bg-[#231835]/90 backdrop-blur-sm p-4 rounded-lg shadow-xl z-30 border-l-4 border-indigo-600">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-indigo-900/50 p-2 rounded-full">
                                        <Brain className="h-6 w-6 text-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Interview Efficiency</p>
                                        <p className="text-xl font-bold text-white">+78%</p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg z-30 text-sm font-semibold">
                                AI-Powered
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;