import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { FaCamera, FaDownload, FaMagic, FaArrowRight } from "react-icons/fa";
import gsap from "gsap";

const STRIP_PHOTOS = [
  "https://picsum.photos/seed/photo-booth-girl-1/320/240",
  "https://picsum.photos/seed/photo-booth-friends-2/320/240",
  "https://picsum.photos/seed/photo-booth-portrait-3/320/240",
  "https://picsum.photos/seed/photo-booth-smile-4/320/240",
];

const FEATURES = [
  { icon: FaMagic,    label: "30+ filters"  },
  { icon: FaCamera,   label: "Booth mode"   },
  { icon: FaDownload, label: "HD download"  },
];

export default function Hero() {
  const heroRef  = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Set everything visible immediately so there's no flash of hidden content ──
      gsap.set([".h-eyebrow", ".h-title", ".h-body", ".h-ctas", ".h-features"], {
        opacity: 1,
        y: 0,
        clearProps: "all",
      });

      // ── Now animate from → to ──
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".h-eyebrow",  { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55 })
        .fromTo(".h-title",    { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7  }, "-=0.3")
        .fromTo(".h-body",     { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55 }, "-=0.35")
        .fromTo(".h-ctas",     { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5  }, "-=0.3")
        .fromTo(".h-features", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45 }, "-=0.25");

      // Strip photos stagger in
      gsap.fromTo(
        ".strip-photo",
        { opacity: 0, y: 24, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.09, ease: "power3.out", delay: 0.2 }
      );

      // Gentle continuous float on the strip column
      gsap.to(stripRef.current, {
        y: -10,
        duration: 3.5,
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
      className="relative w-full overflow-hidden bg-[#f8f8f9]"
      style={{ minHeight: "100dvh" }}
    >
      {/* Subtle radial tints */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgb(232 53 109 / 0.07) 0%, transparent 68%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 right-0 w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgb(124 58 237 / 0.05) 0%, transparent 70%)" }}
      />

      {/* Content — vertically centered, padded top for nav */}
      <div className="relative w-full max-w-[1400px] mx-auto px-6 flex items-center" style={{ minHeight: "100dvh" }}>
        <div className="w-full grid lg:grid-cols-[1fr_440px] xl:grid-cols-[1fr_500px] gap-10 xl:gap-16 items-center py-20 lg:py-16">

          {/* ── Left: copy — always renders first in DOM ── */}
          <div className="space-y-6 z-10">

            {/* Eyebrow */}
            <div className="h-eyebrow">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8356d]/10 text-[#e8356d] text-xs font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8356d] animate-pulse" />
                Free forever — no install needed
              </span>
            </div>

            {/* Headline */}
            <h1 className="h-title text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-[#141418] leading-[1.06] tracking-tight">
              Your browser is
              <br />
              <span className="gradient-text">the photo booth.</span>
            </h1>

            {/* Subtext */}
            <p className="h-body text-base sm:text-lg text-slate-500 max-w-[440px] leading-relaxed">
              Capture, filter, and download aesthetic photo strips right from your browser. No app, no sign-up.
            </p>

            {/* CTAs — visible immediately, animated in on mount */}
            <div className="h-ctas flex flex-col sm:flex-row gap-3 pt-1">
              <Link
                to="/booth"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#e8356d] text-white text-base font-semibold shadow-lg shadow-[#e8356d]/30 hover:bg-[#d12460] hover:shadow-[#e8356d]/45 hover:scale-[1.02] transition-all duration-200 active:scale-[0.97]"
              >
                <FaCamera className="w-4 h-4 group-hover:rotate-6 transition-transform duration-200" />
                Start Photo Session
              </Link>
              <Link
                to="/photos"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-slate-700 text-base font-semibold border border-[#e2e2e8] hover:border-slate-300 hover:shadow-md transition-all duration-200 active:scale-[0.97]"
              >
                View Gallery
                <FaArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>

            {/* Feature pills */}
            <div className="h-features flex flex-wrap gap-2">
              {FEATURES.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#e2e2e8] text-sm text-slate-600"
                >
                  <Icon className="w-3 h-3 text-[#e8356d]" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: photo strip ── */}
          <div
            ref={stripRef}
            className="relative z-10 hidden lg:flex justify-end"
          >
            {/* Ambient glow */}
            <div
              className="absolute inset-0 rounded-3xl blur-2xl pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgb(232 53 109 / 0.12), rgb(192 38 211 / 0.08), rgb(124 58 237 / 0.06))" }}
            />

            {/* Strip card */}
            <div className="relative strip-frame max-w-[240px] w-full">
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
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                ))}
              </div>
              <div className="pt-1 pb-0.5 text-center">
                <span
                  className="text-[9px] font-medium tracking-[0.2em] uppercase text-slate-400"
                  style={{ fontFamily: "Geist Mono, monospace" }}
                >
                  SnapCharm
                </span>
              </div>
            </div>

            {/* Floating badge — top right */}
            <div
              className="absolute -top-3 -right-4 xl:-right-6"
              style={{ animation: "anim-in 0.55s 0.65s cubic-bezier(0.16,1,0.3,1) both" }}
            >
              <div className="glass rounded-2xl px-3.5 py-2.5 shadow-lg border border-white/50">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#e8356d]/10 flex items-center justify-center flex-shrink-0">
                    <FaMagic className="w-3.5 h-3.5 text-[#e8356d]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 leading-tight">30+ Filters</p>
                    <p className="text-[10px] text-slate-400 leading-tight">Aesthetic presets</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge — bottom left */}
            <div
              className="absolute -bottom-3 -left-4 xl:-left-8"
              style={{ animation: "anim-in 0.55s 0.85s cubic-bezier(0.16,1,0.3,1) both" }}
            >
              <div className="glass rounded-2xl px-3.5 py-2.5 shadow-lg border border-white/50">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <FaDownload className="w-3.5 h-3.5 text-violet-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 leading-tight">HD PNG</p>
                    <p className="text-[10px] text-slate-400 leading-tight">Ready to share</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-only strip — compact, below copy */}
          <div className="lg:hidden flex justify-center mt-2">
            <div className="strip-frame w-full max-w-[320px]">
              <div className="grid grid-cols-2 gap-1.5 p-1">
                {STRIP_PHOTOS.slice(0, 2).map((src, i) => (
                  <div key={i} className="strip-photo relative overflow-hidden rounded-sm" style={{ aspectRatio: "4/3" }}>
                    <img
                      src={src}
                      alt={`Sample photo ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                ))}
              </div>
              <div className="pt-1 pb-0.5 text-center">
                <span className="text-[9px] font-medium tracking-[0.18em] uppercase text-slate-400" style={{ fontFamily: "Geist Mono, monospace" }}>
                  SnapCharm
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
