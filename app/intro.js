"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Users, Zap, Sparkles, ArrowRight, ChevronRight } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from './components/ui/button';
import { CodePreview } from './code-preview';
import Link from 'next/link';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

function App() {
  return (
    <div className="relative min-h-screen w-full bg-[#050510] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-indigo-500/10 blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-2/3 right-1/3 w-[400px] h-[400px] rounded-full bg-violet-500/10 blur-[90px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent w-full"
            style={{ top: `${15 + i * 20}%` }}
            animate={{
              x: ['-100%', '100%'],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 12 + i * 4,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
          />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i + 5}
            className="absolute w-[1px] bg-gradient-to-b from-transparent via-blue-500/40 to-transparent h-full"
            style={{ left: `${20 + i * 20}%` }}
            animate={{
              y: ['-100%', '100%'],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      <div className="relative w-full container mx-auto px-4 pt-10 pb-16 sm:pt-16 sm:pb-32">
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="flex flex-col items-center text-center space-y-8 relative z-10"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[128px] -z-10" />

          <motion.div variants={fadeIn} className="space-y-4">
            <motion.span
              className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium bg-blue-500/10 text-cyan-400 rounded-full border border-cyan-500/20"
              initial={{ scale: 0.9, opacity: 0, y: -10 }}
              animate={{
                scale: [0.9, 1.05, 1],
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut"
              }}
            >
              <motion.div
                animate={{
                  rotate: [0, 15, -15, 0],
                  y: [0, -3, 3, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
              Next-Gen Interview Platform
            </motion.span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight">
              Revolutionizing{" "}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">
                Technical Recruitment
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={fadeIn}
            className="text-neutral-400 text-lg sm:text-xl max-w-2xl"
          >
            Harness the power of AI-driven insights and real-time collaboration to transform your technical interview process into a seamless experience.
          </motion.p>

          <motion.div
            variants={fadeIn}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button
              size="default"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Link href="/sign-in" legacyBehavior>
                  <a>Get Started Free</a>
                </Link>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
            <Button
              size="default"
              variant="outline"
              className="text-cyan-300 border-cyan-800/50 hover:border-cyan-500/50 group relative overflow-hidden"
              onClick={() =>
                toast.error(
                  "Sorry, backend is down!",
                  {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeButton: false,
                    pauseOnHover: true,
                    draggable: true,
                    icon: false
                  }
                )
              }
            >
              <span className="relative z-10 flex items-center gap-2">
                Schedule Demo
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-cyan-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </motion.div>

          <CodePreview />

          <motion.div
            variants={fadeIn}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 w-full"
          >
            {[
              {
                icon: <Code2 className="w-6 h-6 text-cyan-400" />,
                title: "Real-Time Coding",
                description:
                  "Collaborative code editor with syntax highlighting and auto-completion",
              },
              {
                icon: <Zap className="w-6 h-6 text-violet-400" />,
                title: "AI Analysis",
                description:
                  "Get instant feedback and suggestions during the interview process",
              },
              {
                icon: <Users className="w-6 h-6 text-emerald-400" />,
                title: "Team Collaboration",
                description:
                  "Multiple interviewers can join and evaluate candidates together",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="flex flex-col items-center p-6 rounded-xl bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm border border-neutral-800 hover:border-cyan-500/50 transition-colors w-full group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="p-3 rounded-lg bg-neutral-900/80 group-hover:bg-cyan-900/20 transition-colors relative z-10">
                  {feature.icon}
                </div>
                <h3 className="mt-4 font-semibold text-white relative z-10">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-400 text-center relative z-10">
                  {feature.description}
                </p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="w-full mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 bg-gradient-to-r from-cyan-900/10 to-indigo-900/10 rounded-xl p-6 border border-cyan-500/10 backdrop-blur-sm"
          >
            {[
              { value: "98%", label: "Satisfaction Rate" },
              { value: "2.5x", label: "Hiring Efficiency" },
              { value: "10k+", label: "Interviews Conducted" },
              { value: "500+", label: "Enterprise Clients" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-sm text-neutral-400">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent w-full"
                style={{ top: `${20 + i * 30}%` }}
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 15 + i * 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
      <ToastContainer
        toastClassName="Toastify__toast"
        bodyClassName="Toastify__toast-body"
      />
    </div>
  );
}

export default App;