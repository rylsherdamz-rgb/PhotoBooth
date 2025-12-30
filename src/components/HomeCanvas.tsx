import Navigation from "./Navigation"
import CallToAction from "./BottomSection"
import BodySection from "./BodySection"
import Hero from './Hero'

function HomeCanvas() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Navigation />
        <main className="container mx-auto px-4 py-12 md:py-20">
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