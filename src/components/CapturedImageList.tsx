import React, { useState, useEffect } from "react";
import { FaRedo } from "react-icons/fa";

type CapturedImage = {
  imgSrc: string;
  dateCreated: Date;
  filter?: string | null;
};

type CapturedImageListProps = {
  data: CapturedImage[] | null;
  onRetake: (index: number) => void;
};

export const CapturedImageList: React.FC<CapturedImageListProps> = ({ data, onRetake }) => {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const check = () => setIsLarge(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const photos = data?.slice(0, 9) ?? [];
  const count  = photos.length;

  if (count === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center px-6 py-12">
        <div className="w-16 h-16 rounded-2xl bg-[#f8f8f9] border border-[#e2e2e8] flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-slate-500">No photos yet</p>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">Tap Capture All to start shooting</p>
      </div>
    );
  }

  return (
    <div
      className={
        isLarge
          ? "grid grid-cols-2 gap-2 max-h-[440px] overflow-y-auto pr-0.5"
          : "flex gap-2 overflow-x-auto pb-1"
      }
      style={{ scrollbarWidth: "thin", scrollbarColor: "#e2e2e8 transparent" }}
    >
      {photos.map((img, idx) => (
        <div key={idx} className="group relative flex-shrink-0 rounded-xl overflow-hidden border border-[#e2e2e8] bg-[#f8f8f9]"
          style={{ width: isLarge ? "auto" : "88px", height: isLarge ? "88px" : "88px" }}
        >
          <img
            src={img.imgSrc}
            alt={`Captured photo ${idx + 1}`}
            style={{ filter: img.filter ?? "none" }}
            className="w-full h-full object-cover scale-x-[-1] group-hover:scale-x-[-1] transition-transform duration-300"
          />
          {/* Retake overlay */}
          <button
            onClick={() => onRetake(idx)}
            className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
            aria-label={`Retake photo ${idx + 1}`}
            type="button"
          >
            <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md">
              <FaRedo className="w-3 h-3 text-[#e8356d]" />
            </div>
          </button>
          {/* Index badge */}
          <span className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold flex items-center justify-center leading-none">
            {idx + 1}
          </span>
        </div>
      ))}
    </div>
  );
};
