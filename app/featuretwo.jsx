"use client";
import { Bot, Code2, LineChart, Users, Zap, ArrowRight } from "lucide-react";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

function FeaturesModern() {
  return (
    <section className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* Enhanced grid background with blurred animated gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-emerald-500/10 animate-pulse" style={{ animationDuration: '10s' }} />
      
      {/* Floating glowing orbs */}
      <div className="absolute top-40 left-20 w-32 h-32 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-40 right-20 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl" />
      
      {/* Modern header with animated text */}
      <div className="relative z-10 container mx-auto px-4 pt-28 pb-16">
        <div className="space-y-6 text-center">
          <div className="relative inline-block">
            <h1 className={`text-5xl md:text-7xl font-bold tracking-tight ${outfit.className}`}>
              <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text">
                Insights
              </span>
            </h1>
            <div className="flex justify-center mt-1">
              <svg width="180" height="12" viewBox="0 0 180 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 md:w-64">
                <path d="M1 11C45.6667 3.66667 134.333 -1.00001 179 3.99999" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="1" y1="6" x2="179" y2="6" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5DE2E7" stopOpacity="0.2"/>
                    <stop offset="0.5" stopColor="#5DE2E7"/>
                    <stop offset="1" stopColor="#5DE2E7" stopOpacity="0.2"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-bold ${outfit.className}`}>
            <span className="text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text animate-gradient">
              Powerful
            </span>{" "}
            <span className="text-white">Features</span>
          </h2>
          
          <p className="text-neutral-300 max-w-2xl mx-auto text-lg md:text-xl font-light">
            Streamline your hiring process with our comprehensive suite of
            AI-powered tools and analytics
          </p>
        </div>
      </div>

      {/* Modern card layout with smooth hover effects */}
      <div className="relative z-10 container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto">
          {/* Main feature card */}
          <div className="md:col-span-5 md:row-span-2 group">
            <div className="h-full bg-gradient-to-br from-[#070B14] to-[#0A1222] backdrop-blur-lg p-8 md:p-10 rounded-3xl border border-blue-500/20 transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Bot className="w-8 h-8 text-blue-400 group-hover:text-blue-300" />
              </div>
              
              <h3 className={`text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors ${outfit.className}`}>
                AI-Powered Matching
              </h3>
              
              <p className="text-neutral-300 leading-relaxed mb-8 tracking-wide font-light">
                Our advanced AI algorithms analyze both candidate profiles and
                job requirements in real-time, ensuring the most relevant
                matches. Experience precision recruiting with intelligent
                automation that learns and adapts to your hiring patterns.
              </p>
              
              <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors font-medium">
                <span>Learn more</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Wide card */}
          <div className="md:col-span-7 group">
            <div className="bg-gradient-to-br from-[#070B14] to-[#0A1222] backdrop-blur-lg p-8 md:p-10 rounded-3xl border border-purple-500/20 transition-all duration-500 hover:border-purple-500/50 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-700/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Code2 className="w-8 h-8 text-purple-400 group-hover:text-purple-300" />
              </div>
              
              <h3 className={`text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors ${outfit.className}`}>
                Technical Assessment Platform
              </h3>
              
              <p className="text-neutral-300 leading-relaxed tracking-wide font-light">
                Comprehensive coding challenges and technical assessments that
                evaluate real-world skills. Automated scoring and detailed
                analytics provide deep insights into candidate capabilities.
              </p>
            </div>
          </div>

          {/* Small cards */}
          <div className="md:col-span-3 md:col-start-6 group">
            <div className="h-full bg-gradient-to-br from-[#070B14] to-[#0A1222] backdrop-blur-lg p-8 md:p-10 rounded-3xl border border-emerald-500/20 transition-all duration-500 hover:border-emerald-500/50 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <LineChart className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300" />
              </div>
              
              <h3 className={`text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors ${outfit.className}`}>
                Smart Analytics
              </h3>
              
              <p className="text-neutral-300 leading-relaxed tracking-wide font-light">
                Data-driven insights to optimize your hiring process and make
                informed decisions based on real-time metrics and trends.
              </p>
            </div>
          </div>

          <div className="md:col-span-4 group">
            <div className="h-full bg-gradient-to-br from-[#070B14] to-[#0A1222] backdrop-blur-lg p-8 md:p-10 rounded-3xl border border-amber-500/20 transition-all duration-500 hover:border-amber-500/50 hover:shadow-[0_0_30px_-5px_rgba(251,191,36,0.3)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-700/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-amber-400 group-hover:text-amber-300" />
              </div>
              
              <h3 className={`text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-amber-300 transition-colors ${outfit.className}`}>
                Automated Screening
              </h3>
              
              <p className="text-neutral-300 leading-relaxed tracking-wide font-light">
                Save time with intelligent pre-screening that identifies top
                candidates automatically using advanced matching algorithms.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Style for the animated gradient */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        .animate-pulse {
          animation: pulse 10s ease-in-out infinite;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}

export default FeaturesModern;