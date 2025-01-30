"use client";
import React, { useState, useEffect } from "react";
import {
  Code2,
  Brain,
  Zap,
  Users,
  Award,
  Laptop,
  ArrowRight,
  Terminal,
  Maximize2,
  Play,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { Amaranth } from "next/font/google";

const amaranth = Amaranth({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const CodeEditorMock = () => (
  <div className="w-full rounded-xl overflow-hidden shadow-2xl">
    <div className="bg-gray-800 p-3 flex items-center gap-2">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="text-gray-400 text-sm">interview.js</div>
      <Maximize2 className="w-4 h-4 text-gray-400 ml-auto" />
    </div>
    <div className="bg-gray-900 p-6 font-mono text-sm">
      <div className="text-blue-400">function</div>
      <div className="pl-4">
        <span className="text-purple-400">findMaxProfit</span>
        <span className="text-gray-300">(</span>
        <span className="text-orange-300">prices</span>
        <span className="text-gray-300">) {`{`}</span>
      </div>
      <div className="pl-8 text-gray-300">
        <div>let maxProfit = 0;</div>
        <div>let minPrice = Infinity;</div>
      </div>
      <div className="pl-8 text-purple-400">
        for{" "}
        <span className="text-gray-300">
          (let i = 0; i {"<"} prices.length; i++) {`{`}
        </span>
      </div>
      <div className="pl-12 text-gray-300">
        <div>minPrice = Math.min(minPrice, prices[i]);</div>
        <div>maxProfit = Math.max(maxProfit, prices[i] - minPrice);</div>
      </div>
      <div className="pl-8 text-gray-300">{`}`}</div>
      <div className="pl-8 text-blue-400">
        return <span className="text-gray-300">maxProfit;</span>
      </div>
      <div className="pl-4 text-gray-300">{`}`}</div>
    </div>
  </div>
);

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [randomPositions, setRandomPositions] = useState([]);

  useEffect(() => {
    setIsVisible(true);

    const positions = [...Array(20)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
    }));

    setRandomPositions(positions);
  }, []);

  const handleDemoClick = () => {
    toast.info("Demo is not available at the moment. We're working on it!", {
      position: "top-center",
      className: "bg-blue-100 text-blue-700 toast-custom",
      autoClose: 3000,
    });
  };

  return (
    <div className="relative w-full bg-black overflow-hidden">
      <ToastContainer />
      <section className="relative min-h-screen w-full bg-gradient-to-b from-gray-900 via-black to-black">
        <span
          className={`absolute top-0 left-0 text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] text-transparent font-bold z-10 pl-7 shadow-lg ${amaranth.className}`}
          style={{
            WebkitTextStroke: "1px #904bfa",
          }}
        >
          About
        </span>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          {randomPositions.map((position, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 bg-blue-500/20 rounded-full animate-pulse"
              style={{
                top: position.top,
                left: position.left,
                animationDelay: position.animationDelay,
              }}
            />
          ))}
        </div>

        <div
          className={`relative z-10 flex items-center justify-center min-h-screen px-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center mt-20">
            <div className="space-y-8">
              <h1 className="text-6xl font-bold">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  AlgoHire
                </span>
              </h1>
              <p className="text-2xl text-gray-400">
                Transform Your Technical Interviews with AI-Powered Intelligence
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 flex items-center gap-2">
                  Try Now <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  className="px-8 py-3 border border-gray-700 rounded-lg text-white font-semibold hover:bg-gray-800 transition-all duration-300"
                  onClick={handleDemoClick}
                >
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />
              <CodeEditorMock />
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powered by Advanced AI
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://st.quantrimang.com/photos/image/2019/06/27/demo-la-gi-2.jpg"
                alt="AI Analysis Visual"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl" />
            </div>
            <div className="space-y-8">
              {[
                {
                  icon: <Brain className="w-8 h-8 text-blue-500" />,
                  title: "Real-time Code Analysis",
                  description:
                    "Our AI engine analyzes code patterns, complexity, and efficiency in real-time",
                },
                {
                  icon: <Terminal className="w-8 h-8 text-purple-500" />,
                  title: "Smart Problem Generation",
                  description:
                    "Dynamically generates questions based on candidate skill level",
                },
                {
                  icon: <Zap className="w-8 h-8 text-pink-500" />,
                  title: "Instant Feedback Loop",
                  description:
                    "Provides immediate, actionable feedback on code quality and performance",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-xl hover:bg-gray-800/50 transition-colors"
                >
                  <div className="p-2 bg-gray-800 rounded-lg h-fit">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="relative py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-white">
                Experience the Future of Technical Interviews
              </h2>
              <p className="text-gray-400">
                Watch how AlgoHire transforms the interview process with
                AI-powered insights and real-time analysis.
              </p>
              <button
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 flex items-center gap-2"
                onClick={handleDemoClick}
              >
                <Play className="w-5 h-5" /> Watch Demo
              </button>
            </div>
            <div className="relative">
              <img
                src="/api/placeholder/600/400"
                alt="Interactive Demo"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Visual Background */}
      <section className="relative py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8 text-blue-500" />,
                stat: "10,000+",
                label: "Active Users",
              },
              {
                icon: <Award className="w-8 h-8 text-purple-500" />,
                stat: "95%",
                label: "Success Rate",
              },
              {
                icon: <Laptop className="w-8 h-8 text-pink-500" />,
                stat: "500+",
                label: "Companies",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 p-6 bg-gray-800/30 rounded-xl backdrop-blur-sm"
              >
                {item.icon}
                <span className="text-4xl font-bold text-white">
                  {item.stat}
                </span>
                <span className="text-gray-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Hiring Process?
          </h2>
          <p className="text-gray-400 mb-8">
            Join thousands of companies revolutionizing their technical
            interviews
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 flex items-center gap-2 mx-auto">
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
