import { useState, useRef, useEffect } from "react";
import { layoutInfos, type LayoutInfo } from "./layoutInfos";
import { LayoutPreview } from "./LayoutPreview";

export const LayoutSelector = ({
  selectedLayoutId,
  onChange,
}: {
  selectedLayoutId: string | null;
  onChange: (layout: LayoutInfo) => void;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLayout =
    layoutInfos.find((info) => info.id === selectedLayoutId) ||
    layoutInfos.find((info) => info.count === 3) ||
    layoutInfos[0];

  return (
    <div
      className="relative w-full max-w-full sm:max-w-[280px] h-11"
      ref={dropdownRef}
    >
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        type="button"
        className="w-full h-full flex items-center justify-between px-3 border border-slate-200 rounded-xl bg-white shadow-sm hover:bg-slate-50 hover:border-pink-300 transition duration-150 focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <div className="flex items-center gap-2 min-w-0">
          {selectedLayout && (
            <div className="scale-[0.85] origin-left shrink-0">
              <LayoutPreview
                layout={selectedLayout.layout}
                type={selectedLayout.type}
                previewImage={selectedLayout.previewImage}
              />
            </div>
          )}
          <span className="text-sm font-medium truncate text-slate-700">
            {selectedLayout.description}
          </span>
        </div>
        <svg
          className="w-4 h-4 text-slate-500 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showDropdown && (
        <ul
          className="absolute z-50 mt-2 w-full max-w-md max-h-[280px] overflow-auto rounded-xl border border-slate-200 bg-white shadow-xl sm:max-w-[300px] glass"
          role="listbox"
        >
          {layoutInfos.map(({ id, description, layout, type, previewImage }) => (
            <li
              key={id}
              tabIndex={0}
              role="option"
              aria-selected={selectedLayout?.id === id}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-100 ${
                selectedLayout?.id === id ? "bg-pink-50 font-semibold" : "hover:bg-slate-50"
              }`}
              onClick={() => {
                const nextLayout = layoutInfos.find((info) => info.id === id);
                if (!nextLayout) return;
                onChange(nextLayout);
                setShowDropdown(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  const nextLayout = layoutInfos.find((info) => info.id === id);
                  if (!nextLayout) return;
                  onChange(nextLayout);
                  setShowDropdown(false);
                }
              }}
            >
              <div className="shrink-0 w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center">
                <div className="scale-[0.85] origin-center w-full h-full flex items-center justify-center">
                  <LayoutPreview layout={layout} type={type} previewImage={previewImage} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm truncate leading-tight text-slate-700">{description}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};