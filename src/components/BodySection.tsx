import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCamera, FaMagic, FaDownload, FaSmile, FaPalette, FaImage } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: FaMagic,
    title: "Aesthetic Filters",
    desc: "30 curated presets from vintage to cyberpunk — each tuned to look great on portraits.",
    img: "https://picsum.photos/seed/aesthetic-filter-warm/400/260",
    accent: "#e8356d",
    accentLight: "rgb(232 53 109 / 0.08)",
    span: "lg:col-span-2",
    tall: false,
  },
  {
    icon: FaCamera,
    title: "Classic Booth Mode",
    desc: "Timed countdown captures, just like a real photobooth.",
    img: null,
    accent: "#7c3aed",
    accentLight: "rgb(124 58 237 / 0.08)",
    span: "",
    tall: false,
  },
  {
    icon: FaSmile,
    title: "Stickers & Decorations",
    desc: "Upload custom stickers or choose from built-in packs. Place and resize freely.",
    img: null,
    accent: "#e8356d",
    accentLight: "rgb(232 53 109 / 0.08)",
    span: "",
    tall: false,
  },
  {
    icon: FaDownload,
    title: "Instant HD Download",
    desc: "Save your collage in high-resolution PNG, ready to post anywhere.",
    img: "https://picsum.photos/seed/download-share-hd/400/260",
    accent: "#16a34a",
    accentLight: "rgb(22 163 74 / 0.08)",
    span: "lg:col-span-2",
    tall: false,
  },
  {
    icon: FaPalette,
    title: "Custom Backgrounds",
    desc: "Color picker with caption in EN, JP, or KR.",
    img: null,
    accent: "#d97706",
    accentLight: "rgb(217 119 6 / 0.08)",
    span: "",
    tall: false,
  },
  {
    icon: FaImage,
    title: "Flexible Layouts",
    desc: "12 templates: strips, grids, and magazine layouts.",
    img: null,
    accent: "#7c3aed",
    accentLight: "rgb(124 58 237 / 0.08)",
    span: "",
    tall: false,
  },
];

const steps = [
  {
    num: "01",
    title: "Open the Booth",
    desc: "Launch from your browser — no downloads, no accounts, no friction.",
    img: "https://picsum.photos/seed/open-browser-booth/480/320",
  },
  {
    num: "02",
    title: "Capture and Style",
    desc: "Take photos, apply filters, pick a layout, add stickers and captions.",
    img: "https://picsum.photos/seed/camera-capture-style/480/320",
  },
  {
    num: "03",
    title: "Download and Share",
    desc: "Save your creation in HD. Post directly or send to friends.",
    img: "https://picsum.photos/seed/download-collage-share/480/320",
  },
];

export default function BodySection() {
  const rootRef    = useRef<HTMLDivElement>(null);
  const bentoRef   = useRef<HTMLDivElement>(null);
  const stepsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Bento cells stagger
      gsap.fromTo(
        ".bento-cell",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.72,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bentoRef.current,
            start: "top 82%",
          },
        }
      );

      // Steps stagger
      gsap.fromTo(
        ".step-card",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.13,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 80%",
          },
        }
      );

      // Section headings
      gsap.fromTo(
        ".section-head",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: { trigger: ".section-head", start: "top 85%" },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative">
      {/* ── Features bento ── */}
      <section className="max-w-[1400px] mx-auto px-6 pt-20 lg:pt-28 pb-8">

        {/* Section heading */}
        <div className="section-head mb-14 max-w-lg">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141418] leading-tight tracking-tight">
            Everything you need
            <br />
            <span className="text-slate-400 font-medium">in one booth.</span>
          </h2>
        </div>

        {/* Bento grid — 3 columns, varied cell sizes */}
        <div ref={bentoRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Cell 1 — wide, has image */}
          <div className="bento-cell lg:col-span-2 surface surface-hover rounded-2xl overflow-hidden flex flex-col min-h-[280px]">
            <div className="relative h-44 overflow-hidden">
              <img
                src={features[0].img!}
                alt="Aesthetic filter preview"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div
                className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: features[0].accentLight, color: features[0].accent }}
              >
                <FaMagic className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="p-6 flex-1">
              <h3 className="font-semibold text-[#141418] text-lg mb-1.5">{features[0].title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{features[0].desc}</p>
            </div>
          </div>

          {/* Cell 2 — tall, no image */}
          <div className="bento-cell surface surface-hover rounded-2xl p-6 flex flex-col justify-between min-h-[280px]"
               style={{ background: "linear-gradient(135deg, #fde8ef 0%, #fff 60%)" }}>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: "rgb(232 53 109 / 0.12)", color: "#e8356d" }}
            >
              <FaCamera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-[#141418] text-lg mb-1.5">{features[1].title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{features[1].desc}</p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              {[3, 5, 10].map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-full bg-white border border-[#e2e2e8] text-xs font-semibold text-slate-600 shadow-xs">
                  {s}s
                </span>
              ))}
            </div>
          </div>

          {/* Cell 3 — no image */}
          <div className="bento-cell surface surface-hover rounded-2xl p-6 flex flex-col justify-between min-h-[220px]"
               style={{ background: "linear-gradient(135deg, #ede9fe 0%, #fff 65%)" }}>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: "rgb(124 58 237 / 0.1)", color: "#7c3aed" }}
            >
              <FaSmile className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-[#141418] text-lg mb-1.5">{features[2].title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{features[2].desc}</p>
            </div>
          </div>

          {/* Cell 4 — no image */}
          <div className="bento-cell surface surface-hover rounded-2xl p-6 flex flex-col justify-between min-h-[220px]"
               style={{ background: "linear-gradient(135deg, #fef3c7 0%, #fff 65%)" }}>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: "rgb(217 119 6 / 0.1)", color: "#d97706" }}
            >
              <FaPalette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-[#141418] text-lg mb-1.5">{features[4].title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{features[4].desc}</p>
              <div className="mt-4 flex items-center gap-2">
                {["EN", "JP", "KR"].map((l) => (
                  <span key={l} className="px-2.5 py-1 rounded-lg bg-white border border-[#e2e2e8] text-xs font-bold text-slate-500 shadow-xs">{l}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Cell 5 — wide, has image */}
          <div className="bento-cell lg:col-span-3 surface surface-hover rounded-2xl overflow-hidden flex flex-col sm:flex-row min-h-[200px]">
            <div className="relative sm:w-80 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
              <img
                src={features[3].img!}
                alt="HD download preview"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
            </div>
            <div className="p-6 flex flex-col justify-center gap-3 flex-1">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgb(22 163 74 / 0.1)", color: "#16a34a" }}
              >
                <FaDownload className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-[#141418] text-lg mb-1.5">{features[3].title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-sm">{features[3].desc}</p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3 py-1.5 rounded-full bg-[#dcfce7] text-[#16a34a] text-xs font-semibold">PNG</span>
                <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">High Resolution</span>
                <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">No watermark</span>
              </div>
            </div>
          </div>

          {/* Cell 6 — layouts */}
          <div className="bento-cell lg:col-span-3 surface surface-hover rounded-2xl p-6 min-h-[160px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgb(124 58 237 / 0.1)", color: "#7c3aed" }}
              >
                <FaImage className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-[#141418] text-lg mb-1">{features[5].title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-sm">{features[5].desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {["Strip 2", "Strip 3", "Strip 4", "Grid 4", "Grid 6", "Grid 9", "+ GateNews"].map((l) => (
                <span key={l} className="px-3 py-1.5 rounded-full bg-white border border-[#e2e2e8] text-xs font-medium text-slate-600 shadow-xs whitespace-nowrap">
                  {l}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── How it works ── */}
      <section className="max-w-[1400px] mx-auto px-6 pt-20 lg:pt-28 pb-24">

        {/* Section heading — different alignment to break repetition */}
        <div className="section-head mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141418] leading-tight tracking-tight max-w-sm">
            Three steps,
            <br />
            zero friction.
          </h2>
          <p className="text-slate-500 text-base max-w-xs leading-relaxed">
            Open the booth, capture your moment, download your collage. That's it.
          </p>
        </div>

        <div ref={stepsRef} className="grid md:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <div key={i} className="step-card group surface surface-hover rounded-2xl overflow-hidden">
              {/* Image top */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {/* Step number overlay */}
                <span className="absolute bottom-4 left-4 text-5xl font-black text-white/20 leading-none select-none" style={{ fontFamily: "Geist Mono, monospace" }}>
                  {step.num}
                </span>
              </div>

              {/* Copy */}
              <div className="p-6">
                <h3 className="font-semibold text-[#141418] text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
