import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaCamera,
  FaMagic,
  FaDownload,
  FaSmile,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function BodySection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const blobLeft = useRef<HTMLDivElement>(null);
  const blobRight = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* FEATURES */
      gsap.fromTo(
        featuresRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 85%",
          },
        }
      );

      /* STEPS */
      gsap.fromTo(
        stepsRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 85%",
          },
        }
      );

      /* PARALLAX BLOBS */
      gsap.to(blobLeft.current, {
        y: -160,
        ease: "none",
        scrollTrigger: {
          scrub: true,
        },
      });

      gsap.to(blobRight.current, {
        y: 140,
        ease: "none",
        scrollTrigger: {
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative">
      {/* BLOBS FLOAT OUTSIDE SECTIONS */}
      <div
        ref={blobLeft}
        className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] bg-pink-200/30 blur-3xl rounded-full"
      />
      <div
        ref={blobRight}
        className="pointer-events-none absolute top-[40%] -right-40 w-[420px] h-[420px] bg-purple-200/30 blur-3xl rounded-full"
      />

      {/* FEATURES (NO SECTION BG) */}
      <section className="max-w-7xl mx-auto px-6 pt-32">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Everything You Need
          </h2>
          <p className="text-slate-600 text-lg">
            Capture, customize, and download beautiful photobooth photos.
          </p>
        </div>

        <div
          ref={featuresRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {[
            {
              icon: <FaMagic />,
              title: "Cute Filters",
              desc: "Soft, aesthetic tones for every vibe.",
            },
            {
              icon: <FaCamera />,
              title: "Booth Mode",
              desc: "Classic photobooth-style captures.",
            },
            {
              icon: <FaSmile />,
              title: "Stickers",
              desc: "Add fun captions and decorations.",
            },
            {
              icon: <FaDownload />,
              title: "Instant Save",
              desc: "Download your photos instantly.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="
                bg-white
                rounded-2xl p-6
                shadow-[0_12px_30px_-12px_rgba(0,0,0,0.18)]
                hover:shadow-[0_20px_40px_-12px_rgba(236,72,153,0.35)]
                transition-all
              "
            >
              <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-500 flex items-center justify-center text-xl mb-4">
                {item.icon}
              </div>
              <h3 className="font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 mt-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* STEPS — OFFSET DOWN TO BREAK RECTANGLE FEEL */}
      <section className="max-w-7xl mx-auto px-6 mt-48 pb-40">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            How It Works
          </h2>
          <p className="text-slate-600 text-lg">
            Simple, fast, and fun.
          </p>
        </div>

        <div
          ref={stepsRef}
          className="grid md:grid-cols-3 gap-14"
        >
          {[
            {
              step: "01",
              title: "Open Booth",
              desc: "Launch instantly from your browser.",
            },
            {
              step: "02",
              title: "Capture & Style",
              desc: "Take photos and customize them.",
            },
            {
              step: "03",
              title: "Download",
              desc: "Save or share your photos.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="
                relative bg-white
                rounded-3xl p-8
                shadow-[0_12px_30px_-12px_rgba(0,0,0,0.18)]
              "
            >
              <span className="absolute -top-12 left-6 text-7xl font-bold text-pink-100 select-none">
                {step.step}
              </span>
              <h3 className="text-xl font-semibold text-slate-900 relative">
                {step.title}
              </h3>
              <p className="text-slate-600 mt-3">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
