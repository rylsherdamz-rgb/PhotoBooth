import { Link } from "react-router-dom";
import { FaCamera, FaArrowRight } from "react-icons/fa";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CallToAction() {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-inner > *",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.72,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 82%",
          },
        }
      );
    }, ctaRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ctaRef}
      className="relative overflow-hidden mx-6 lg:mx-auto max-w-[1352px] mb-16 lg:mb-20 rounded-3xl"
      style={{
        background: "linear-gradient(135deg, #e8356d 0%, #c026d3 55%, #7c3aed 100%)",
      }}
    >
      {/* Grain texture over gradient */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none rounded-3xl"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Subtle top-right radial */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="cta-inner relative z-10 flex flex-col items-center text-center px-8 py-20 lg:py-24 gap-7 max-w-2xl mx-auto">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
          Ready to snap
          <br />
          something cute?
        </h2>

        <p className="text-white/70 text-lg max-w-md leading-relaxed">
          No apps. No sign-ups. Open the booth and start shooting.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/booth"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white text-[#e8356d] text-base font-bold shadow-xl shadow-black/20 hover:scale-[1.02] hover:shadow-black/30 transition-all duration-200 active:scale-[0.97] btn-press"
          >
            <FaCamera className="w-4 h-4" />
            Start Photo Session
          </Link>
          <Link
            to="/photos"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/15 text-white text-base font-semibold border border-white/25 hover:bg-white/22 transition-all duration-200 active:scale-[0.97]"
          >
            View Gallery
            <FaArrowRight className="w-3.5 h-3.5 opacity-70" />
          </Link>
        </div>

        <p className="text-white/50 text-sm">
          100% free — works on mobile and desktop
        </p>
      </div>
    </section>
  );
}
