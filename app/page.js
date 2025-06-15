import Navbar from "./Navbar";
import About from "./About";
import Features from "./Features";
import Featurestwo from "./featuretwo";
import { FooterSection } from "./components/footer/FooterSection";
import { SpeedInsights } from "@vercel/speed-insights/next"
import AlgoEvaluatorFAQ from "./faq";
import AlgoStubAIIntroduction from "./components/AiIntro";
import AlgoEvaluatorHero from "./intro";

export default function Home() {
  return (
    <>
      <Navbar />
      <SpeedInsights />
      <AlgoEvaluatorHero />
      <About />
      <AlgoStubAIIntroduction />
      <Features />
      <Featurestwo />
      <AlgoEvaluatorFAQ />
      <FooterSection />
    </>
  );
}
