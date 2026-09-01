import type { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { FaCamera, FaDownload } from "react-icons/fa";

interface ActionButtonProp {
  handleDownload: MouseEventHandler<HTMLButtonElement>;
}

export default function ActionButton({ handleDownload }: ActionButtonProp) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-2">
      <Link
        to="/booth"
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-700 font-semibold border border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
      >
        <FaCamera className="w-5 h-5" />
        Take Photos Again
      </Link>
      <button
        onClick={handleDownload}
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-pink-500 text-white font-semibold shadow-xl shadow-pink-500/40 hover:bg-pink-400 hover:scale-[1.02] hover:shadow-pink-500/50 transition-all duration-200 active:scale-[0.98]"
      >
        <FaDownload className="w-5 h-5" />
        Download Collage
      </button>
    </div>
  );
}