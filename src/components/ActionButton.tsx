import type { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { FaCamera, FaDownload } from "react-icons/fa";

interface ActionButtonProp {
  handleDownload: MouseEventHandler<HTMLButtonElement>;
}

export default function ActionButton({ handleDownload }: ActionButtonProp) {
  return (
    <div className="flex flex-col gap-2.5">
      <button
        onClick={handleDownload}
        className="w-full flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-[#e8356d] text-white text-sm font-bold shadow-lg shadow-[#e8356d]/35 hover:bg-[#d12460] hover:scale-[1.02] transition-all duration-200 active:scale-[0.97] btn-press"
      >
        <FaDownload className="w-4 h-4" />
        Download Collage
      </button>
      <Link
        to="/booth"
        className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#f8f8f9] text-slate-600 text-sm font-semibold border border-[#e2e2e8] hover:bg-white hover:border-slate-300 transition-all duration-200 active:scale-[0.97]"
      >
        <FaCamera className="w-3.5 h-3.5 text-slate-400" />
        Take Photos Again
      </Link>
    </div>
  );
}
