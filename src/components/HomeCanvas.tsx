import Navigation from "./Navigation"
import CallToAction from "./BottomSection"
import BodySection from "./BodySection"
import Hero from './Hero'

function HomeCanvas() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Subtle background pattern */}
      

      {/* Main content */}
      <div className="">
        <Navigation />
        <main className="  px-4 py-12 md:py-20">
          <Hero />
          <div className="">
            <BodySection />
            <CallToAction />
          </div>
        </main>
      </div>
    </div>
  )
}

export default HomeCanvas