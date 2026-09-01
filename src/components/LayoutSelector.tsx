import { useState, useRef, useEffect } from "react";
import { layoutInfos, type LayoutInfo } from "./layoutInfos";
import { FaChevronDown, FaTimes, FaCheck } from "react-icons/fa";

// ── Mini grid visual rendered inline — no CSS transforms ──────────────────────
function LayoutGrid({ layout, type, previewImage }: {
  layout: number[][];
  type: LayoutInfo["type"];
  previewImage?: string;
}) {
  if (previewImage) {
    return (
      <img
        src={previewImage}
        alt="layout"
        className="w-full h-full object-cover rounded"
      />
    );
  }

  const rows = layout.length;
  const cols = Math.max(...layout.map((r) => r.length));
  const isStrip = type === "Strip";

  return (
    <div
      className="w-full h-full flex items-center justify-center p-1.5"
    >
      <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: isStrip ? "1fr" : `repeat(${cols}, 1fr)`,
          gap: "2px",
          width: "100%",
          height: "100%",
        }}
      >
        {layout.flatMap((row, ri) =>
          row.map((cell, ci) => (
            <div
              key={`${ri}-${ci}`}
              className={`rounded-sm ${cell === 1 ? "bg-[#e8356d]/20" : "bg-transparent"}`}
            />
          ))
        )}
      </div>
    </div>
  );
}

// ── Group layouts by type ──────────────────────────────────────────────────────
const GROUPS: { label: string; ids: string[] }[] = [
  { label: "Strips", ids: ["strip-2", "strip-3", "strip-4"] },
  { label: "Grids",  ids: ["grid-4", "grid-6", "grid-9"] },
];

export const LayoutSelector = ({
  selectedLayoutId,
  onChange,
}: {
  selectedLayoutId: string | null;
  onChange: (layout: LayoutInfo) => void;
}) => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selected = layoutInfos.find((l) => l.id === selectedLayoutId) ?? layoutInfos[0];

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        modalRef.current && !modalRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <div className="relative">
      {/* ── Trigger button ── */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={`h-10 flex items-center gap-2.5 pl-2.5 pr-3 rounded-xl border text-sm font-medium transition-all duration-150 ${
          open
            ? "bg-[#e8356d] border-[#e8356d] text-white shadow-md shadow-[#e8356d]/25"
            : "bg-[#f8f8f9] border-[#e2e2e8] text-slate-700 hover:border-slate-300 hover:bg-white"
        }`}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {/* Mini preview of current layout */}
        <div className={`w-8 h-8 rounded-lg overflow-hidden border flex-shrink-0 ${
          open ? "border-white/30 bg-white/20" : "border-[#e2e2e8] bg-white"
        }`}>
          <LayoutGrid
            layout={selected.layout}
            type={selected.type}
            previewImage={selected.previewImage}
          />
        </div>
        <span className="hidden sm:block max-w-[120px] truncate">{selected.description}</span>
        <FaChevronDown className={`w-3 h-3 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180 opacity-70" : "opacity-50"}`} />
      </button>

      {/* ── Dropdown panel ── */}
      {open && (
        <div
          ref={modalRef}
          className="absolute left-0 top-full mt-2 z-[200] w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl border border-[#e2e2e8] shadow-2xl shadow-black/12 overflow-hidden animate-scale-in"
          role="dialog"
          aria-label="Layout selector"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#f1f1f4]">
            <p className="text-sm font-bold text-[#141418]">Choose Layout</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Close layout selector"
            >
              <FaTimes className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Scrollable groups */}
          <div className="overflow-y-auto max-h-[400px] p-3 space-y-4" style={{ scrollbarWidth: "thin" }}>
            {GROUPS.map((group) => {
              const items = group.ids
                .map((id) => layoutInfos.find((l) => l.id === id))
                .filter(Boolean) as LayoutInfo[];
              if (!items.length) return null;

              return (
                <div key={group.label}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
                    {group.label}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {items.map((layout) => {
                      const isSelected = selected.id === layout.id;
                      return (
                        <button
                          key={layout.id}
                          type="button"
                          onClick={() => {
                            onChange(layout);
                            setOpen(false);
                          }}
                          className={`relative group flex flex-col items-center gap-2 p-2 rounded-xl border transition-all duration-150 ${
                            isSelected
                              ? "border-[#e8356d] bg-[#fde8ef] shadow-sm"
                              : "border-[#e2e2e8] bg-[#f8f8f9] hover:border-slate-300 hover:bg-white hover:shadow-sm"
                          }`}
                        >
                          {/* Preview thumbnail */}
                          <div className={`w-full rounded-lg overflow-hidden border ${
                            isSelected ? "border-[#e8356d]/20" : "border-[#e2e2e8]"
                          }`} style={{ aspectRatio: "3/4", background: isSelected ? "rgba(232,53,109,0.04)" : "#fff" }}>
                            <LayoutGrid
                              layout={layout.layout}
                              type={layout.type}
                              previewImage={layout.previewImage}
                            />
                          </div>

                          {/* Label */}
                          <span className={`text-[11px] font-semibold leading-tight text-center ${
                            isSelected ? "text-[#e8356d]" : "text-slate-500 group-hover:text-slate-700"
                          }`}>
                            {layout.description}
                          </span>

                          {/* Selected checkmark */}
                          {isSelected && (
                            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#e8356d] flex items-center justify-center shadow-sm">
                              <FaCheck className="w-2 h-2 text-white" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer — photo count info */}
          <div className="px-4 py-2.5 border-t border-[#f1f1f4] bg-[#f8f8f9]">
            <p className="text-[11px] text-slate-400 text-center">
              Selected: <span className="font-semibold text-slate-600">{selected.description}</span>
              &nbsp;&middot;&nbsp;{selected.count} photo{selected.count !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
