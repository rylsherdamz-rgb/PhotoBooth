import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SnapCharmText() {
  const textRef = useRef<SVGTextElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SVG text animation
      if (textRef.current) {
        const textEl = textRef.current;
        const length = textEl.getComputedTextLength();
        textEl.style.strokeDasharray = `${length}`;
        textEl.style.strokeDashoffset = `${length}`;
        textEl.style.opacity = "1";

        gsap.to(textEl, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
        });
      }

      // Logo pulse
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 0.3,
          }
        );

        gsap.to(logoRef.current, {
          scale: 1.05,
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "sine.inOut",
          delay: 1.5,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div ref={logoRef} className="mb-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-xl shadow-pink-500/30">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <svg viewBox="0 0 400 100" className="w-[280px] h-[80px]" role="img" aria-label="SnapCharm loading">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        <text
          ref={textRef}
          x="200"
          y="65"
          textAnchor="middle"
          fontFamily="'Pacifico', cursive"
          fontSize="64"
          fill="none"
          stroke="url(#grad)"
          strokeWidth="3"
          opacity="0"
        >
          SnapCharm
        </text>
      </svg>

      <div className="mt-6 flex items-center gap-2 text-slate-400 text-sm">
        <div className="w-6 h-6 border-2 border-pink-300 border-t-pink-500 rounded-full animate-spin" />
        <span>Loading your photobooth...</span>
      </div>
    </div>
  );
}