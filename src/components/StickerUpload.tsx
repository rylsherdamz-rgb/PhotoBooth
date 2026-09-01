import React, { useState } from "react";
import type { Sticker } from "../hooks/useDownloadCollage";
import { FaTimes, FaPlus } from "react-icons/fa";

// ── Sticker packs ──────────────────────────────────────────────────────────────
// Twemoji CDN for emoji stickers — consistent cross-platform rendering
const TW = (code: string) =>
  `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/${code}.png`;

const PACKS = [
  {
    id: "aesthetic",
    name: "Aesthetic",
    emoji: "✨",
    stickers: [
      // Stars & sparkle
      TW("2728"), TW("1f31f"), TW("1f4ab"), TW("2747"),
      // Florals & nature
      TW("1f338"), TW("1f337"), TW("1f339"), TW("1f33a"),
      TW("1fab7"), TW("1f343"), TW("1f341"), TW("1f344"),
      // Crystals & gems
      TW("1f48e"), TW("1f9ff"), TW("1f9f8"), TW("1f380"),
    ],
  },
  {
    id: "cute",
    name: "Cute",
    emoji: "🩷",
    stickers: [
      TW("1f60d"), TW("1f970"), TW("1f618"), TW("1f929"),
      TW("1f496"), TW("1f49c"), TW("1f49b"), TW("1f9e1"),
      TW("2764"),  TW("1fa77"), TW("1fa76"), TW("1fa75"),
      TW("1f48b"), TW("1f381"), TW("1f382"), TW("1f388"),
    ],
  },
  {
    id: "mood",
    name: "Mood",
    emoji: "🫧",
    stickers: [
      TW("1fae7"), TW("1f9f8"), TW("1f3b6"), TW("1f4f7"),
      TW("1f305"), TW("1f30a"), TW("1f32c"), TW("2600"),
      TW("1f308"), TW("1f319"), TW("1f320"), TW("1f4a7"),
      TW("1fab5"), TW("1f9ca"), TW("2603"),  TW("26a1"),
    ],
  },
  {
    id: "fun",
    name: "Fun",
    emoji: "🎉",
    stickers: [
      TW("1f389"), TW("1f38a"), TW("1f386"), TW("1f387"),
      TW("1f602"), TW("1f923"), TW("1f606"), TW("1f973"),
      TW("1f61c"), TW("1f92a"), TW("1f61d"), TW("1f4f8"),
      TW("1f3a8"), TW("1f3b5"), TW("1f525"), TW("1f47e"),
    ],
  },
];

// ── Types ──────────────────────────────────────────────────────────────────────
interface StickerUploadProps {
  handleStickerUpload: React.ChangeEventHandler<HTMLInputElement>;
  stickers: Sticker[];
  selectedStickerId: string | null;
  setSelectedStickerId: (id: string | null) => void;
  setStickers: React.Dispatch<React.SetStateAction<Sticker[]>>;
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function StickerUpload({
  handleStickerUpload,
  stickers,
  selectedStickerId,
  setSelectedStickerId,
  setStickers,
}: StickerUploadProps) {
  const [activePack, setActivePack] = useState("aesthetic");

  const currentPack = PACKS.find((p) => p.id === activePack) ?? PACKS[0];

  const addSticker = (imgSrc: string) => {
    const img = new Image();
    img.onload = () => {
      const max = 150;
      let w = img.width;
      let h = img.height;
      if (w > h) { if (w > max) { h = (h * max) / w; w = max; } }
      else        { if (h > max) { w = (w * max) / h; h = max; } }
      const id = Math.random().toString(36).slice(2, 9);
      setStickers((prev) => [...prev, { id, imgSrc, x: 50, y: 50, width: w, height: h }]);
      setSelectedStickerId(id);
    };
    img.src = imgSrc;
  };

  const removeSticker = (id: string) => {
    setStickers((prev) => prev.filter((s) => s.id !== id));
    if (selectedStickerId === id) setSelectedStickerId(null);
  };

  return (
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Stickers</p>

      {/* Pack tabs */}
      <div className="flex items-center gap-1.5 mb-3 flex-wrap">
        {PACKS.map((pack) => (
          <button
            key={pack.id}
            type="button"
            onClick={() => setActivePack(pack.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 border ${
              activePack === pack.id
                ? "bg-[#e8356d] border-[#e8356d] text-white shadow-sm shadow-[#e8356d]/25"
                : "bg-[#f8f8f9] border-[#e2e2e8] text-slate-500 hover:border-slate-300 hover:text-slate-700"
            }`}
          >
            <span>{pack.emoji}</span>
            {pack.name}
          </button>
        ))}

        {/* Custom upload */}
        <label
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#f8f8f9] border border-[#e2e2e8] text-slate-500 hover:border-slate-300 hover:text-slate-700 transition-all duration-150 cursor-pointer"
          title="Upload custom sticker"
        >
          <FaPlus className="w-3 h-3" />
          Custom
          <input
            type="file"
            accept="image/*"
            onChange={handleStickerUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Sticker grid */}
      <div
        className="grid grid-cols-4 gap-2 max-h-[200px] overflow-y-auto rounded-xl border border-[#e2e2e8] bg-[#f8f8f9] p-2"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#e2e2e8 transparent" }}
      >
        {currentPack.stickers.map((src, i) => (
          <button
            key={`${activePack}-${i}`}
            type="button"
            onClick={() => addSticker(src)}
            className="aspect-square rounded-xl bg-white border border-[#e2e2e8] hover:border-[#e8356d]/40 hover:shadow-sm hover:scale-105 transition-all duration-150 overflow-hidden p-1.5 flex items-center justify-center"
            title="Add sticker"
          >
            <img
              src={src}
              alt={`${currentPack.name} sticker ${i + 1}`}
              className="w-full h-full object-contain"
              draggable={false}
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Active stickers on canvas */}
      {stickers.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              On canvas ({stickers.length})
            </p>
            <button
              type="button"
              onClick={() => { setStickers([]); setSelectedStickerId(null); }}
              className="text-[11px] text-slate-400 hover:text-red-500 transition-colors duration-150"
            >
              Clear all
            </button>
          </div>

          <div
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#e2e2e8 transparent" }}
          >
            {stickers.map((sticker) => (
              <div
                key={sticker.id}
                className={`relative group flex-shrink-0 w-12 h-12 rounded-xl border bg-white overflow-hidden cursor-pointer transition-all duration-150 ${
                  selectedStickerId === sticker.id
                    ? "border-[#e8356d] ring-2 ring-[#e8356d]/20 shadow-sm"
                    : "border-[#e2e2e8] hover:border-slate-300"
                }`}
                onClick={() => setSelectedStickerId(sticker.id)}
              >
                <img
                  src={sticker.imgSrc}
                  alt="Active sticker"
                  className="w-full h-full object-contain p-1"
                  draggable={false}
                />
                {/* Remove button */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeSticker(sticker.id); }}
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-150"
                  aria-label="Remove sticker"
                >
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <FaTimes className="w-2.5 h-2.5 text-slate-600" />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
