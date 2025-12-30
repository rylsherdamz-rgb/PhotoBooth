import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { FaCamera } from "react-icons/fa";
import gsap from "gsap";

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text entrance
      gsap.from(".hero-item", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
      });

      // Preview entrance
      gsap.from(previewRef.current, {
        opacity: 0,
        x: 40,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });

      // Floating animation
      gsap.to(previewRef.current, {
        y: -12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Camera flash effect
      gsap.fromTo(
        previewRef.current,
        { filter: "brightness(1)" },
        {
          filter: "brightness(1.15)",
          duration: 0.15,
          repeat: -1,
          repeatDelay: 4,
          yoyo: true,
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-x-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-8 sm:space-y-10">
          <div className="space-y-4 sm:space-y-5">
            <h1 className="hero-item text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              SnapCharm <br />
              <span className="text-pink-500 drop-shadow-sm">
                Online PhotoBooth
              </span>
            </h1>

            <p className="hero-item text-base sm:text-lg md:text-xl text-slate-600 max-w-lg">
              Capture cute, aesthetic moments right from your browser.
              Apply filters, frames, and download instantly — no app needed ✨
            </p>
          </div>

          {/* CTA */}
          <div className="hero-item flex flex-col sm:flex-row gap-4">
            <Link
              to="/booth"
              className="inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 rounded-xl bg-pink-500 text-white text-lg font-semibold shadow-lg shadow-pink-300/40 hover:bg-pink-400 hover:scale-[1.03] transition-all duration-200"
            >
              <FaCamera className="mr-2" />
              Start Photo Session
            </Link>
          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-6">
            {[
              { title: "Cute Filters", desc: "Soft & aesthetic styles" },
              { title: "Instant Download", desc: "Save photos in seconds" },
              { title: "Clean Layouts", desc: "Minimal photo frames" },
              { title: "HD Quality", desc: "Bright & clear shots" },
            ].map((item, i) => (
              <div key={i} className="hero-item">
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm sm:text-base text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PHOTO PREVIEW */}
        <div
          ref={previewRef}
          className="relative flex justify-center mt-8 md:mt-0 overflow-visible"
        >
          {/* MAIN PHOTO */}
          <div className="relative w-[220px] sm:w-[280px] md:w-[320px] lg:w-[360px] aspect-[3/4] rounded-3xl bg-white shadow-2xl shadow-pink-300/40 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop"
              alt="Photobooth preview"
              className="w-full h-full object-cover"
            />

            {/* Camera overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />

            {/* Caption */}
            <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-md py-2 sm:py-3 text-center">
              <p className="text-sm sm:text-base font-medium text-slate-700">
                SnapCharm ✨
              </p>
            </div>
          </div>

          {/* PHOTO STRIP */}
          <div className="absolute right-0 top-10 rotate-6 scale-90 hidden md:flex flex-col space-y-2">
            <div className="w-[100px] sm:w-[120px] bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
                className="w-full h-24 sm:h-28 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
                className="w-full h-24 sm:h-28 object-cover"
              />
            </div>
          </div>

          {/* GLOW */}
          <div className="absolute inset-0 flex justify-center items-center -z-10">
            <div className="w-[240px] sm:w-[300px] h-[340px] sm:h-[420px] bg-pink-300/40 blur-3xl rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
