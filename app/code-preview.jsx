import { motion } from "framer-motion";

export function CodePreview() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="relative w-full max-w-2xl mx-auto mt-8"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-violet-500/10 blur-3xl" />
      <div className="relative rounded-xl border border-neutral-800 bg-neutral-900/80 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-neutral-800">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="p-4 text-sm font-mono">
          <div className="text-neutral-500">// AI-powered code analysis</div>
          <div className="text-blue-400">function</div>
          <div>
            <span className="text-violet-400">analyzeCode</span>
            <span className="text-neutral-300">(code: string) {`{`}</span>
          </div>
          <div className="pl-4">
            <span className="text-blue-400">const</span>
            <span className="text-neutral-300"> result = </span>
            <span className="text-green-400">AI.analyze</span>
            <span className="text-neutral-300">(code);</span>
          </div>
          <div className="pl-4">
            <span className="text-blue-400">return</span>
            <span className="text-neutral-300"> result.suggestions;</span>
          </div>
          <div className="text-neutral-300">{`}`}</div>
        </div>
      </div>
    </motion.div>
  );
}
