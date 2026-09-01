import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { FaCamera } from "react-icons/fa";

const DIFFERENTIATORS = [
  {
    title: "Clean experience",
    desc: "No clutter, no learning curve. Open the booth and start shooting.",
    bg: "bg-[#fde8ef]",
    color: "text-[#e8356d]",
  },
  {
    title: "Aesthetic filters",
    desc: "30 curated presets that actually look good on portraits.",
    bg: "bg-[#ede9fe]",
    color: "text-[#7c3aed]",
  },
  {
    title: "Fast everywhere",
    desc: "Runs entirely in your browser. No installs, no loading screens.",
    bg: "bg-[#dcfce7]",
    color: "text-[#16a34a]",
  },
  {
    title: "Your photos, your device",
    desc: "Nothing is uploaded to any server. Your images stay local.",
    bg: "bg-[#fef3c7]",
    color: "text-[#d97706]",
  },
];

const VALUES = [
  {
    title: "Simplicity",
    desc: "No clutter, no learning curve. Just open and snap.",
    img: "https://picsum.photos/seed/simplicity-clean-minimal/480/300",
  },
  {
    title: "Creativity",
    desc: "Tools that let your personality shine through every photo.",
    img: "https://picsum.photos/seed/creativity-colorful-photo/480/300",
  },
  {
    title: "Privacy",
    desc: "Photos never leave your device. No uploads, no accounts.",
    img: "https://picsum.photos/seed/privacy-secure-lock/480/300",
  },
];

export default function About() {
  return (
    <div className="min-h-[100dvh] bg-[#f8f8f9]">
      <Navigation />

      <main className="max-w-[1400px] mx-auto px-6 pt-16 pb-24">

        {/* Hero section — left-aligned, no centered blob */}
        <section className="pt-12 pb-20 lg:pt-16 lg:pb-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#141418] leading-[1.06] tracking-tight mb-6">
              Built for the
              <br />
              <span className="gradient-text">moments between moments.</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
              SnapCharm is a browser-based photobooth built to make capturing cute, aesthetic photos simple and instant. No app required.
            </p>
          </div>
        </section>

        {/* Why section — split, image on right */}
        <section className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#141418] leading-tight">
              Why SnapCharm exists
            </h2>
            <p className="text-slate-500 leading-relaxed text-base">
              We built SnapCharm for people who love taking photos but hate complicated apps, heavy downloads, or confusing interfaces. Whether you're capturing moments alone, with friends, or at events, SnapCharm keeps it effortless.
            </p>
            <p className="text-slate-500 leading-relaxed text-base">
              Open the booth, smile, snap, and download. No sign-ups. No friction.
            </p>

            {/* Differentiators — 2-col grid, no emoji */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {DIFFERENTIATORS.map((item) => (
                <div key={item.title} className={`${item.bg} rounded-2xl p-4`}>
                  <h3 className={`font-semibold text-sm ${item.color} mb-1`}>{item.title}</h3>
                  <p className="text-[#141418] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div
              className="absolute inset-0 rounded-3xl blur-2xl pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgb(232 53 109 / 0.1), rgb(124 58 237 / 0.06))" }}
            />
            <img
              src="https://picsum.photos/seed/photobooth-portrait-fun/600/480"
              alt="Someone enjoying the photo booth"
              className="relative w-full rounded-3xl object-cover shadow-xl shadow-black/10 border border-[#e2e2e8]"
            />
          </div>
        </section>

        {/* Values — 3 cards with images, different layout from differentiators */}
        <section className="mb-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#141418] mb-10 tracking-tight">
            What we stand for
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl border border-[#e2e2e8] overflow-hidden shadow-sm hover:shadow-md hover:border-[#f7c5d5] transition-all duration-200">
                <div className="h-44 overflow-hidden">
                  <img
                    src={v.img}
                    alt={v.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#141418] text-base mb-1.5">{v.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Closing CTA — different from hero, no duplicate intent */}
        <section className="bg-white rounded-3xl border border-[#e2e2e8] p-10 lg:p-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div className="max-w-md">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#141418] leading-tight mb-3">
              Ready to try it?
            </h2>
            <p className="text-slate-500 leading-relaxed">
              Open the booth in your browser right now. No sign-up, no install.
            </p>
          </div>
          <Link
            to="/booth"
            className="flex-shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#e8356d] text-white font-bold shadow-lg shadow-[#e8356d]/30 hover:bg-[#d12460] hover:scale-[1.02] transition-all duration-200 active:scale-[0.97]"
          >
            <FaCamera className="w-4 h-4" />
            Open the Booth
          </Link>
        </section>

      </main>
      <Footer />
    </div>
  );
}
