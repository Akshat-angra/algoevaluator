"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Code2, Users, Zap, Sparkles } from "lucide-react";
import { CodePreview } from "./code-preview";
import { toast, ToastContainer } from "react-toastify";

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

export function Intro() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-neutral-900 to-neutral-950 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative w-full container mx-auto px-4 pt-10 pb-16 sm:pt-16 sm:pb-32">
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="flex flex-col items-center text-center space-y-8 relative z-10"
        >
          {/* Glowing Orb */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[128px] -z-10" />

          <motion.div variants={fadeIn} className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium bg-blue-500/10 text-blue-400 rounded-full">
              <Sparkles className="w-4 h-4" />
              AI Powered Interviews
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight">
              Transform Your Technical Interviews with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                AI-Assisted Intelligence
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={fadeIn}
            className="text-neutral-400 text-lg sm:text-xl max-w-2xl"
          >
            Conduct seamless technical interviews with real-time code
            collaboration, AI-powered insights, and comprehensive candidate
            evaluation.
          </motion.p>

          <motion.div
            variants={fadeIn}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button size="lg" className="bg-blue-500 hover:bg-blue-400">
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-blue-300 border-neutral-700 border-blue-300"
              onClick={() =>
                toast.error(
                  "Sorry, backend is down!",
                  {
                    position: "top-center",
                    autoClose: 3000,
                    draggable: true,
                    className: "bg-red-100 text-red-700 toast-custom",
                  }
                )
              }
            >
              Schedule Demo
            </Button>
          </motion.div>
          <CodePreview />
          <motion.div
            variants={fadeIn}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 w-full"
          >
            {[
              {
                icon: <Code2 className="w-6 h-6 text-blue-400" />,
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
                icon: <Users className="w-6 h-6 text-green-400" />,
                title: "Team Collaboration",
                description:
                  "Multiple interviewers can join and evaluate candidates together",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="flex flex-col items-center p-6 rounded-xl bg-white/5 border border-neutral-800 w-full"
              >
                <div className="p-3 rounded-lg bg-neutral-900">
                  {feature.icon}
                </div>
                <h3 className="mt-4 font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-400 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Intro;
