import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { FaCamera, FaDownload, FaMagic, FaArrowRight } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Photo strip images — real picsum seeds for variety
const STRIP_PHOTOS = [
  "https://picsum.photos/seed/photo-booth-girl-1/280/360",
  "https://picsum.photos/seed/photo-booth-friends-2/280/360",
  "https://picsum.photos/seed/photo-booth-portrait-3/280/360",
  "https://picsum.photos/seed/photo-booth-smile-4/280/360",
];

const FEATURES = [
  { icon: FaMagic,    label: "30+ filters" },
  { icon: FaCamera,   label: "Booth mode" },
  { icon: FaDownload, label: "HD download" },
];

export default function Hero() {
  const heroRef    = useRef<HTMLDivElement>(null);
  const stripRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".h-eyebrow",  { opacity: 0, y: 16, duration: 0.6 })
        .from(".h-title",    { opacity: 0, y: 28, duration: 0.8 }, "-=0.35")
        .from(".h-body",     { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .from(".h-ctas",     { opacity: 0, y: 18, duration: 0.55 }, "-=0.35")
        .from(".h-features", { opacity: 0, y: 14, duration: 0.5 }, "-=0.3");

      // Strip photos stagger in
      gsap.from(".strip-photo", {
        opacity: 0,
        y: 32,
        scale: 0.96,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.25,
      });

      // Gentle float on strip
      gsap.to(stripRef.current, {
        y: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[100dvh] flex items-center overflow-hidden bg-[#f8f8f9]"
    >
      {/* Subtle radial tint — top-left only, low opacity */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[560px] h-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgb(232 53 109 / 0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgb(124 58 237 / 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-[1400px] mx-auto px-6 py-20 lg:py-0">
        <div className="grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-12 xl:gap-20 items-center min-h-[100dvh] lg:min-h-0 lg:py-24">

          {/* ── Left: copy ── */}
          <div className="space-y-8 z-10 order-2 lg:order-1">

            {/* Eyebrow badge */}
            <div className="h-eyebrow flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8356d]/10 text-[#e8356d] text-xs font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8356d] animate-pulse" />
                Free forever — no install needed
              </span>
            </div>

            {/* Headline — max 2 lines */}
            <h1 className="h-title text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold text-[#141418] leading-[1.04] tracking-tight max-w-xl">
              Your browser is
              <br />
              <span className="gradient-text">the photo booth.</span>
            </h1>

            {/* Subtext — max 20 words */}
            <p className="h-body text-lg text-slate-500 max-w-md leading-relaxed">
              Capture, filter, and download aesthetic photo strips right from your browser. No app, no sign-up.
            </p>

            {/* CTAs */}
            <div className="h-ctas flex flex-col sm:flex-row gap-3">
              <Link
                to="/booth"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#e8356d] text-white text-base font-semibold shadow-lg shadow-[#e8356d]/35 hover:bg-[#d12460] hover:shadow-[#e8356d]/50 hover:scale-[1.02] transition-all duration-200 active:scale-[0.97] btn-press"
              >
                <FaCamera className="w-4 h-4 group-hover:rotate-6 transition-transform duration-200" />
                Start Photo Session
              </Link>
              <Link
                to="/photos"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white text-slate-700 text-base font-semibold border border-[#e2e2e8] hover:border-slate-300 hover:shadow-md transition-all duration-200 active:scale-[0.97]"
              >
                View Gallery
                <FaArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>

            {/* Feature pills */}
            <div className="h-features flex flex-wrap gap-2.5">
              {FEATURES.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#e2e2e8] text-sm text-slate-600 shadow-xs"
                >
                  <Icon className="w-3.5 h-3.5 text-[#e8356d]" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: photo strip mosaic ── */}
          <div
            ref={stripRef}
            className="relative z-10 order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            {/* Ambient glow behind strip */}
            <div
              className="absolute inset-4 rounded-3xl blur-3xl"
              style={{
                background:
                  "linear-gradient(135deg, rgb(232 53 109 / 0.15), rgb(192 38 211 / 0.1), rgb(124 58 237 / 0.08))",
              }}
            />

            {/* Classic photo strip card */}
            <div className="relative strip-frame max-w-[260px] w-full">
              <div className="space-y-1.5 p-1">
                {STRIP_PHOTOS.map((src, i) => (
                  <div
                    key={i}
                    className="strip-photo relative overflow-hidden rounded-sm"
                    style={{ aspectRatio: "4/3" }}
                  >
                    <img
                      src={src}
                      alt={`Photo strip frame ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                    {/* Subtle overlay for aesthetics */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                ))}
              </div>

              {/* Strip caption printed at bottom */}
              <div className="pt-1 pb-1 text-center">
                <span
                  className="text-[10px] font-medium tracking-[0.18em] uppercase text-slate-400"
                  style={{ fontFamily: "Geist Mono, monospace" }}
                >
                  SnapCharm
                </span>
              </div>
            </div>

            {/* Floating badge — top right */}
            <div className="absolute -top-4 -right-2 lg:-right-6 animate-in" style={{ animationDelay: "0.6s" }}>
              <div className="glass rounded-2xl px-4 py-3 shadow-lg shadow-black/8 border border-white/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#e8356d]/10 flex items-center justify-center">
                    <FaMagic className="w-4 h-4 text-[#e8356d]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 leading-tight">30+ Filters</p>
                    <p className="text-[10px] text-slate-400 leading-tight">Aesthetic presets</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge — bottom left */}
            <div className="absolute -bottom-4 -left-4 lg:-left-8 animate-in" style={{ animationDelay: "0.8s" }}>
              <div className="glass rounded-2xl px-4 py-3 shadow-lg shadow-black/8 border border-white/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                    <FaDownload className="w-4 h-4 text-violet-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 leading-tight">HD PNG</p>
                    <p className="text-[10px] text-slate-400 leading-tight">Ready to share</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
