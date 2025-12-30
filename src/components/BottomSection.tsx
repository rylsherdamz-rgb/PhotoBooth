import { Link } from "react-router-dom";
import { FaCamera } from "react-icons/fa";

export default function CallToAction() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 py-40">
      {/* Soft ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-pink-200/30 blur-3xl rounded-full" />

      <div className="relative text-center max-w-3xl mx-auto space-y-10">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
          Ready to Capture Something
          <span className="text-pink-500"> Cute?</span>
        </h2>

        <p className="text-lg md:text-xl text-slate-600">
          No apps. No sign-ups. Just open the booth and start snapping
          adorable moments instantly.
        </p>

        <Link
          to="/booth"
          className="
            inline-flex items-center justify-center
            px-10 py-5 rounded-2xl
            bg-pink-500 text-white text-lg font-semibold
            shadow-xl shadow-pink-300/40
            hover:bg-pink-400 hover:scale-[1.05]
            transition-all duration-200
          "
        >
          <FaCamera className="mr-3" />
          Start Photo Session
        </Link>

        <p className="text-sm text-slate-500">
          100% free · Works on mobile & desktop
        </p>
      </div>
    </section>
  );
}
