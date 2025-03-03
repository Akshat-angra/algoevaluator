import { Bot, Code2, LineChart, Users, Zap } from "lucide-react";
import { Amaranth } from "next/font/google";

const amaranth = Amaranth({
  subsets: ["latin"],
  weight: ["400", "700"],
});

function Featurestwo() {
  return (
    <section className="relative min-h-screen w-full bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10" />

      <span
        className={`absolute top-0 left-0 text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] font-bold z-10 pl-7 select-none opacity-50 ${amaranth.className}`}
        style={{
          WebkitTextStroke: "1px #5DE2E7",
        }}
      >
        Insights
      </span>

      <div className="relative z-10 container mx-auto px-4 pt-48 pb-8">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text">
              Powerful
            </span>{" "}
            <span className="text-white">Features</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            Streamline your hiring process with our comprehensive suite of
            AI-powered tools and analytics
          </p>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="md:row-span-2 group">
            <div className="h-full bg-[#05090F] backdrop-blur-sm p-10 rounded-3xl border border-blue-500/50 transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Bot className="w-8 h-8 text-blue-400 group-hover:text-blue-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                AI-Powered Matching
              </h3>
              <p className="text-neutral-400 leading-relaxed mb-6 tracking-wider">
                Our advanced AI algorithms analyze both candidate profiles and
                job requirements in real-time, ensuring the most relevant
                matches. Experience precision recruiting with intelligent
                automation that learns and adapts to your hiring patterns.
              </p>
              <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                <span className="font-medium">Learn more</span>
                <Zap className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
          </div>

          <div className="md:col-span-2 group">
            <div className="bg-[#05090F] backdrop-blur-sm p-10 rounded-3xl border border-purple-500/50 transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <div className="h-14 w-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Code2 className="w-8 h-8 text-purple-400 group-hover:text-purple-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                Technical Assessment Platform
              </h3>
              <p className="text-neutral-400 leading-relaxed tracking-wider">
                Comprehensive coding challenges and technical assessments that
                evaluate real-world skills. Automated scoring and detailed
                analytics provide deep insights into candidate capabilities.
              </p>
            </div>
          </div>

          <div className="group">
            <div className="h-full bg-[#05090F] backdrop-blur-sm p-10 rounded-3xl border border-emerald-500/50 transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <LineChart className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors">
                Smart Analytics
              </h3>
              <p className="text-neutral-400 leading-relaxed tracking-wider">
                Data-driven insights to optimize your hiring process and make
                informed decisions based on real-time metrics and trends.
              </p>
            </div>
          </div>

          <div className="group">
            <div className="h-full bg-[#05090F] backdrop-blur-sm p-10 rounded-3xl border border-amber-500/50 transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(251,191,36,0.3)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <div className="h-14 w-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-amber-400 group-hover:text-amber-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-300 transition-colors">
                Automated Screening
              </h3>
              <p className="text-neutral-400 leading-relaxed tracking-wider">
                Save time with intelligent pre-screening that identifies top
                candidates automatically using advanced matching algorithms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Featurestwo;
