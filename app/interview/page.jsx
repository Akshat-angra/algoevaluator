"use client";
import React, { useState, useEffect } from 'react';
import { Bot, Brain, Sparkles, ChevronRight, Terminal, Zap, Star, Target, Clock1, Trophy } from 'lucide-react';
import { FooterSection } from '../components/footer/FooterSection';
import { Button } from '../components/ui/button';
import { Bell, Code, Check, AlertCircle } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from "@clerk/nextjs";

export default function App() {
    const [email, setEmail] = useState('');
    const [isHovering, setIsHovering] = useState(false);
    const [countdown, setCountdown] = useState({ days: 18, hours: 8, minutes: 32, seconds: 59 });
    const [activeFeature, setActiveFeature] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const [particleStyles, setParticleStyles] = useState([]);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const { isLoaded, isSignedIn, user } = useAuth();

    const features = [
        { icon: <Terminal />, title: "Live Coding", description: "Code in real-time with instant previews" },
        { icon: <Zap />, title: "AI Assistance", description: "Get intelligent code suggestions as you type" },
        { icon: <Star />, title: "Challenges", description: "Test your skills with interactive coding challenges" }
    ];

    useEffect(() => {
        setIsClient(true);
        const newParticleStyles = Array(30).fill(0).map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 8 + 2}px`,
            height: `${Math.random() * 8 + 2}px`,
            animationDuration: `${Math.random() * 10 + 10}s`
        }));
        setParticleStyles(newParticleStyles);
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);

        const featureInterval = setInterval(() => {
            setActiveFeature(prev => (prev + 1) % features.length);
        }, 3000);

        return () => {
            clearInterval(timer);
            clearInterval(featureInterval);
        };
    }, []);

    const handleNotifyMe = () => {
        if (email && email.includes('@')) {
            toast.success("You're on the list!", {
                description: "We'll notify you as soon as our coding section launches.",
                icon: <Check size={16} />,
                duration: 3000,
            });
            setEmail('');
        } else {
            toast.error("Oops!", {
                description: "Please enter a valid email address.",
                icon: <AlertCircle size={16} />,
                duration: 3000,
            });
        }
    };
    useEffect(() => {
        if (isLoaded && isSignedIn && user) {
            toast.success(`Welcome back, ${user.firstName || 'there'}!`, {
                description: "Ready to challenge your skills today?",
                duration: 4000,
            });
        }
    }, [isLoaded, isSignedIn, user]);

    const handleStartQuiz = async () => {
        setIsRedirecting(true);

        // Only proceed with redirection if auth has loaded
        if (isLoaded) {
            if (isSignedIn) {
                toast.loading("Preparing your personalized quiz...", {
                    duration: 2000,
                });

                // Short delay to show the toast before redirecting
                setTimeout(() => {
                    window.location.replace("/quiz");
                }, 1000);
            } else {
                toast.info("Please sign in to continue", {
                    description: "You'll be redirected to the quiz after signing in",
                    duration: 3000,
                });

                setTimeout(() => {
                    // Add a returnUrl parameter to automatically redirect after sign-in
                    window.location.replace("/sign-in?redirect=/quiz");
                }, 1500);
            }
        }
    };

    const handlePracticeClick = () => {
        toast("Practice mode selected", {
            description: "Loading practice environment...",
            icon: "🎯"
        });
    };

    // If currently redirecting, show a loading state
    if (isRedirecting) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#030014]">
                <Toaster position="top-center" expand={true} richColors />
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 border-4 border-t-blue-500 border-r-blue-300 border-b-blue-200 border-l-blue-400 rounded-full animate-spin"></div>
                    <h2 className="text-2xl font-bold text-white mb-2">Preparing Your Experience</h2>
                    <p className="text-gray-400">Just a moment while we set up your quiz...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#000000] text-white">
            {/* 1St component */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80')] bg-cover bg-center"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A1328]/80 via-[#1A1328] to-[#1A1328]/90"></div>
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-600/20 rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600/20 rounded-full filter blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
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
                        <div className="relative">
                            <div className="rounded-xl overflow-hidden shadow-[0_0_25px_rgba(79,70,229,0.3)]">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 mix-blend-overlay rounded-xl z-10"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                                    alt="AI Technology Background"
                                    className="w-full h-[550px] object-cover rounded-xl"
                                />

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

                                <div className="absolute top-6 left-6 bg-[#231835]/80 backdrop-blur-sm p-3 rounded-lg shadow-lg z-20 border border-indigo-900/50">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                </div>
                                <div className="absolute top-6 right-6 bg-[#231835]/80 backdrop-blur-sm p-3 rounded-lg shadow-lg z-20 border border-indigo-900/50 max-w-[200px] transform rotate-3">
                                    <div className="text-xs font-mono text-indigo-300">
                                        <div>function analyzeResponse(text) {"{"}</div>
                                        <div className="pl-2">return AI.sentiment(text);</div>
                                        <div>{"}"}</div>
                                    </div>
                                </div>
                            </div>

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
                            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg z-30 text-sm font-semibold">
                                AI-Powered
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* 2nd component */}
            <div className="min-h-screen relative overflow-hidden bg-[#000000] py-20">
                <Toaster position="top-right" expand={true} richColors />

                <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl" />
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto text-center mb-16"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4"
                        >
                            <Brain className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-blue-400">AI-Powered Assessments</span>
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Master Your Skills with{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                Intelligent Quizzes
                                <div className="flex justify-start ml-[120px] mb-4">
                                    <img src="./images/one.svg" alt="Underline" className="w-auto" />
                                </div>
                            </span>
                        </h1>

                        <p className="text-gray-400 text-lg mb-8">
                            Challenge yourself with our adaptive technical assessments designed to evaluate and
                            enhance your programming knowledge through real-world scenarios.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                className="default bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl group relative overflow-hidden"
                                onClick={handleStartQuiz}
                                disabled={isRedirecting || !isLoaded}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <span>{isRedirecting ? "Preparing Quiz..." : "Start Quiz Now"}</span>
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <motion.span
                                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700"
                                    initial={{ x: "-100%" }}
                                    animate={{ x: isRedirecting ? "0%" : "-100%" }}
                                    transition={{ duration: 0.5 }}
                                />
                            </Button>

                            <Button
                                variant="outline"
                                className="border-blue-500/20 text-white hover:bg-blue-500/10 px-8 py-6 rounded-xl group relative overflow-hidden"
                                onClick={handlePracticeClick}
                            >
                                <Link href="/practice" className="flex items-center gap-2">
                                    <span>Practice First</span>
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        whileHover={{ opacity: 1, width: "auto" }}
                                        className="overflow-hidden"
                                    >
                                        — Recommended
                                    </motion.span>
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                    >
                        {[
                            {
                                icon: Target,
                                title: "Adaptive Learning",
                                description: "AI-powered quizzes tailored to your specific skill level and goals"
                            },
                            {
                                icon: Clock1,
                                title: "Interview Simulator",
                                description: "Practice under real-world conditions with timed technical challenges"
                            },
                            {
                                icon: Trophy,
                                title: "Performance Analytics",
                                description: "Detailed insights to track your progress and identify growth areas"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 * (index + 3) }}
                                className="group relative p-6 rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 hover:border-b-blue-500/50 hover:border-r-blue-500/50 transition-all duration-300"
                                whileHover={{ y: -5 }}
                                onClick={() => {
                                    toast.info(`Learn about ${feature.title}`, {
                                        description: feature.description
                                    });
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                                <div className="relative z-10">
                                    <motion.div
                                        className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                    >
                                        <feature.icon className="w-6 h-6 text-blue-400" />
                                    </motion.div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                                    <p className="text-gray-400">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-blue-500/10"
                        whileHover={{ boxShadow: "0 0 30px rgba(59, 130, 246, 0.1)" }}
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { value: "1,200+", label: "Technical Questions" },
                                { value: "65+", label: "Topics & Frameworks" },
                                { value: "24/7", label: "Expert Support" },
                                { value: "98%", label: "Interview Success Rate" }
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.5 + (index * 0.1) }}
                                    whileHover={{ y: -5 }}
                                    onClick={() => {
                                        toast(`${stat.label}: ${stat.value}`, {
                                            description: "Click for more details",
                                            icon: "📊"
                                        });
                                    }}
                                >
                                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">{stat.value}</div>
                                    <div className="text-gray-400 text-sm">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* 3rd component */}
            <div className='bg-[#000000]'>
                <div className="container mx-auto px-4 py-16">
                    <h1 className="text-4xl leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-bold text-center">
                        Introducing AlgoStub - Our own built-in house Code Editor
                    </h1>
                    <div className="flex ml-[900px] mt-[-8px] mb-4">
                        <img src="./images/one.svg" alt="Underline" className="w-auto" />
                    </div>
                    <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-[0_0_40px_rgba(128,90,213,0.2)]">
                        <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                        <div className="bg-[rgb(15,11,25)] relative">
                            {isClient && (
                                <div className="absolute inset-0 overflow-hidden">
                                    {particleStyles.map((style, i) => (
                                        <div
                                            key={i}
                                            className="absolute rounded-full bg-purple-500 opacity-10"
                                            style={{
                                                top: style.top,
                                                left: style.left,
                                                width: style.width,
                                                height: style.height,
                                                animation: `float ${style.animationDuration} linear infinite`
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                            <div
                                className="absolute inset-0 opacity-5"
                                style={{
                                    backgroundImage: "linear-gradient(rgba(128, 90, 213, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(128, 90, 213, 0.4) 1px, transparent 1px)",
                                    backgroundSize: "40px 40px"
                                }}
                            />

                            <div className="grid md:grid-cols-5 relative z-10">
                                <div className="md:col-span-3 p-8 md:p-12">
                                    <div
                                        className="transition-all duration-300"
                                        style={{ transform: isHovering ? 'translateY(-5px)' : 'translateY(0)' }}
                                        onMouseEnter={() => setIsHovering(true)}
                                        onMouseLeave={() => setIsHovering(false)}
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-3 bg-purple-600 rounded-lg">
                                                <Code className="h-6 w-6 text-white" />
                                            </div>
                                            <div className="px-3 py-1 bg-purple-900/50 text-purple-300 text-sm rounded-full border border-purple-700/50">
                                                Beta Access Coming Soon
                                            </div>
                                        </div>

                                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                                            AlgoStub
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"> Launching Soon</span>
                                        </h2>

                                        <p className="text-lg text-purple-200 mb-8 max-w-lg">
                                            Get ready for an immersive coding experience that will transform the way you learn and build projects.
                                        </p>

                                        <div className="flex flex-col md:flex-row gap-4 max-w-md mb-10">
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                className="flex-1 px-4 py-3 rounded-lg bg-[rgb(30,22,48)] border border-purple-900/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <button
                                                onClick={handleNotifyMe}
                                                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30"
                                            >
                                                <Bell className="h-4 w-4" />
                                                Notify Me
                                            </button>
                                        </div>

                                        <div className="h-24 relative overflow-hidden mb-6">
                                            {features.map((feature, index) => (
                                                <div
                                                    key={index}
                                                    className="absolute top-0 left-0 w-full transition-all duration-500 opacity-0 transform translate-y-8"
                                                    style={{
                                                        opacity: activeFeature === index ? 1 : 0,
                                                        transform: activeFeature === index ? 'translateY(0)' : 'translateY(8px)'
                                                    }}
                                                >
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="p-2 bg-[rgb(40,30,65)] rounded-lg text-purple-400">
                                                            {feature.icon}
                                                        </div>
                                                        <h3 className="font-semibold text-white">{feature.title}</h3>
                                                    </div>
                                                    <p className="text-purple-300 pl-10">{feature.description}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            {['C', 'C++', 'Java', 'Python', 'TypeScript', 'React', 'Vue', 'Node.js',].map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 bg-[rgb(30,22,48)] text-purple-300 text-sm rounded-full hover:bg-purple-700 hover:text-white transition-colors cursor-pointer border border-purple-900/30"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-span-2 bg-[rgb(20,15,32)] p-8 flex flex-col justify-center items-center">
                                    <div className="w-full max-w-sm">
                                        <div className="text-center mb-8">
                                            <h3 className="text-lg font-medium text-purple-300 mb-2">Launching In</h3>
                                            <div className="flex justify-center gap-4 text-white">
                                                <div className="flex flex-col items-center">
                                                    <div className="text-2xl font-bold bg-[rgb(30,22,48)] w-12 h-12 flex items-center justify-center rounded-lg mb-1">{countdown.days}</div>
                                                    <div className="text-xs text-purple-400">Days</div>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <div className="text-2xl font-bold bg-[rgb(30,22,48)] w-12 h-12 flex items-center justify-center rounded-lg mb-1">{countdown.hours}</div>
                                                    <div className="text-xs text-purple-400">Hours</div>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <div className="text-2xl font-bold bg-[rgb(30,22,48)] w-12 h-12 flex items-center justify-center rounded-lg mb-1">{countdown.minutes}</div>
                                                    <div className="text-xs text-purple-400">Minutes</div>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <div className="text-2xl font-bold bg-[rgb(30,22,48)] w-12 h-12 flex items-center justify-center rounded-lg mb-1">{countdown.seconds}</div>
                                                    <div className="text-xs text-purple-400">Seconds</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-xl overflow-hidden border border-purple-900/30 mb-8">
                                            <div className="p-4 bg-[rgb(25,18,40)] border-b border-purple-900/30">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                                    <div className="ml-2 text-xs text-purple-400">code_preview.js</div>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-[rgb(15,11,25)] font-mono text-sm">
                                                <div className="text-gray-500">// Coming soon</div>
                                                <div><span className="text-purple-400">function</span> <span className="text-blue-400">codeEditor</span><span className="text-gray-400">()</span> <span className="text-gray-400">{'{'}</span></div>
                                                <div className="pl-4"><span className="text-purple-400">return</span> <span className="text-green-400">"The future of coding"</span>;</div>
                                                <div><span className="text-gray-400">{'}'}</span></div>
                                            </div>
                                        </div>

                                        <div className="flex justify-center">
                                            <button className="group flex items-center gap-2 text-purple-300 hover:text-white transition-colors">
                                                Learn more about features
                                                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[rgb(12,9,20)] p-4 text-center border-t border-purple-900/20">
                                <p className="text-purple-400 text-sm">
                                    We're crafting a coding experience unlike anything you've seen before.
                                </p>
                            </div>
                        </div>
                    </div>


                    <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
                </div>
            </div>
            <FooterSection />
        </div>
    );
};