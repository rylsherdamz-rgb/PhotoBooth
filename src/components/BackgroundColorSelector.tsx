import { ChromePicker } from "react-color";
import { useEffect, useRef } from "react";

interface BackgroundColorSelectorProps {
  setBgColor: (color: string) => void;
  bgColor: string;
  showPicker1: boolean;
  setShowPicker1: (show: boolean) => void;
  predefinedColors: string[];
  fontColor: string;
  setFontColor: (color: string) => void;
  showPicker: boolean;
  setShowPicker: (show: boolean) => void;
}

export default function BackgroundColorSelector({
  setBgColor,
  setShowPicker,
  showPicker,
  setFontColor,
  bgColor,
  fontColor,
  showPicker1,
  setShowPicker1,
  predefinedColors,
}: BackgroundColorSelectorProps) {
  const divRef  = useRef<HTMLDivElement>(null);
  const divRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (divRef.current  && !divRef.current.contains(e.target as Node))  setShowPicker(false);
      if (divRef2.current && !divRef2.current.contains(e.target as Node)) setShowPicker1(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setShowPicker, setShowPicker1]);

  const Swatches = ({
    current,
    onSelect,
    onCustom,
    showCustom,
    customRef,
    onCustomChange,
    label,
  }: {
    current: string;
    onSelect: (c: string) => void;
    onCustom: () => void;
    showCustom: boolean;
    customRef: React.RefObject<HTMLDivElement | null>;
    onCustomChange: (c: string) => void;
    label: string;
  }) => (
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">{label}</p>
      <div className="flex items-center gap-2 flex-wrap">
        {predefinedColors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onSelect(color)}
            aria-label={`Set ${label.toLowerCase()} to ${color}`}
            className={`w-8 h-8 rounded-lg border-2 transition-all duration-150 hover:scale-105 ${
              current === color
                ? "border-[#e8356d] scale-110 shadow-sm shadow-[#e8356d]/30"
                : "border-[#e2e2e8] hover:border-slate-300"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
        {/* Custom picker trigger */}
        <button
          type="button"
          onClick={onCustom}
          aria-label={`Custom ${label.toLowerCase()}`}
          className="w-8 h-8 rounded-lg border-2 border-[#e2e2e8] hover:border-slate-300 overflow-hidden hover:scale-105 transition-all duration-150"
          style={{
            background: "linear-gradient(135deg, #e8356d, #c026d3, #7c3aed)",
          }}
        />
      </div>
      {showCustom && (
        <div ref={customRef} className="relative z-20 mt-3">
          <div className="rounded-xl overflow-hidden shadow-xl border border-[#e2e2e8]">
            <ChromePicker color={current} onChange={(c) => onCustomChange(c.hex)} disableAlpha />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-5">
      <Swatches
        label="Background Color"
        current={bgColor}
        onSelect={setBgColor}
        onCustom={() => setShowPicker1(!showPicker1)}
        showCustom={showPicker1}
        customRef={divRef2}
        onCustomChange={setBgColor}
      />
      <Swatches
        label="Caption Color"
        current={fontColor}
        onSelect={setFontColor}
        onCustom={() => setShowPicker(!showPicker)}
        showCustom={showPicker}
        customRef={divRef}
        onCustomChange={setFontColor}
      />
    </div>
  );
}
