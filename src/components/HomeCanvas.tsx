import Navigation from "./Navigation";
import CallToAction from "./BottomSection";
import BodySection from "./BodySection";
import Hero from "./Hero";

function HomeCanvas() {
  return (
    <div className="w-full bg-[#f8f8f9] overflow-x-hidden">
      <Navigation />
      <Hero />
      <BodySection />
      <CallToAction />
    </div>
  );
}

export default HomeCanvas;
