import Navbar from "./Navbar";
import Intro from "./intro";
import About from "./About";
import Features from "./Features";
import Featurestwo from "./featuretwo";
import { FooterSection } from "./components/footer/FooterSection";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Home() {
  return (
    <>
      <Navbar />
      <SpeedInsights />
      <Intro />
      <About />
      <Features />
      <Featurestwo />
      <FooterSection />
    </>
  );
}
