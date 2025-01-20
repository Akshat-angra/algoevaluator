import Navbar from "./Navbar";
import Intro from "./intro";
import About from "./About";
import Features from "./Features";
import Featurestwo from "./featuretwo";
import Algoteam from "./Algoteam";
import { FooterSection } from "./components/footer/FooterSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <Intro />
      <About />
      <Features />
      <Featurestwo />
      <Algoteam />
      <FooterSection />
    </>
  );
}
