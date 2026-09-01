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
  const divRef = useRef<HTMLDivElement>(null);
  const divRef2 = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(e.target as Node)) {
      setShowPicker(false);
    }
    if (divRef2.current && !divRef2.current.contains(e.target as Node)) {
      setShowPicker1(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowPicker, setShowPicker1]);

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-slate-900 mb-3">Background Color</h4>
        <div className="flex flex-wrap gap-2 items-center">
          {predefinedColors.map((color) => (
            <button
              key={color}
              className={`w-9 h-9 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                bgColor === color ? "ring-2 ring-pink-500 ring-offset-2 scale-110" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setBgColor(color)}
              type="button"
              aria-label={`Background color ${color}`}
            />
          ))}
          <button
            onClick={() => setShowPicker1(!showPicker1)}
            className="w-9 h-9 rounded-full border bg-gradient-to-br from-pink-400 via-yellow-300 to-purple-400 hover:scale-110 transition-transform"
            type="button"
            aria-label="Custom background color"
          />
        </div>
        {showPicker1 && (
          <div ref={divRef2} className="absolute z-20 mt-2 glass p-2 rounded-xl shadow-xl border border-white/30">
            <ChromePicker color={bgColor} onChange={(c) => setBgColor(c.hex)} disableAlpha />
          </div>
        )}
      </div>

      <div>
        <h4 className="font-semibold text-slate-900 mb-3">Caption Color</h4>
        <div className="flex flex-wrap gap-2 items-center">
          {predefinedColors.map((color) => (
            <button
              key={color}
              className={`w-9 h-9 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                fontColor === color ? "ring-2 ring-pink-500 ring-offset-2 scale-110" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setFontColor(color)}
              type="button"
              aria-label={`Caption color ${color}`}
            />
          ))}
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="w-9 h-9 rounded-full border bg-gradient-to-br from-pink-400 via-yellow-300 to-purple-400 hover:scale-110 transition-transform"
            type="button"
            aria-label="Custom caption color"
          />
        </div>
        {showPicker && (
          <div ref={divRef} className="absolute z-20 mt-2 glass p-2 rounded-xl shadow-xl border border-white/30">
            <ChromePicker color={fontColor} onChange={(c) => setFontColor(c.hex)} disableAlpha />
          </div>
        )}
      </div>
    </div>
  );
}