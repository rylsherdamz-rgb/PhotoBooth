import React, { useState } from "react";
import type { Sticker } from "../hooks/useDownloadCollage";
import { FaImage, FaPlus, FaStar, FaHeart, FaTimes } from "react-icons/fa";

const PREDEFINED_STICKER_PACKS = {
  "cute": {
    name: "Cute",
    icon: FaHeart,
    stickers: [
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f60d.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f496.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f49c.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2764.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f970.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f618.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f49b.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f9e1.png",
    ],
  },
  "sparkles": {
    name: "Sparkles",
    icon: FaStar,
    stickers: [
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2728.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f31f.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4a1.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2601.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f308.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f31f.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2747.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4ab.png",
    ],
  },
  "fun": {
    name: "Fun",
    icon: FaStar,
    stickers: [
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f602.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f923.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f606.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f973.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f61c.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f92a.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f61d.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f929.png",
    ],
  },
  "party": {
    name: "Party",
    icon: FaPlus,
    stickers: [
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f389.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f38a.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f386.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f387.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f388.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f382.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f383.png",
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f384.png",
    ],
  },
};

interface StickerUploadProps {
  handleStickerUpload: React.ChangeEventHandler<HTMLInputElement>;
  stickers: Sticker[];
  selectedStickerId: string | null;
  setSelectedStickerId: (sticker: string | null) => void;
  setStickers: React.Dispatch<React.SetStateAction<Sticker[]>>;
}

export default function StickerUpload({
  handleStickerUpload,
  stickers,
  selectedStickerId,
  setSelectedStickerId,
  setStickers,
}: StickerUploadProps) {
  const [activePack, setActivePack] = useState<keyof typeof PREDEFINED_STICKER_PACKS>("cute");

  const addPredefinedSticker = (imgSrc: string) => {
    const img = new Image();
    img.onload = () => {
      const maxSize = 150;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }
      }

      const newStickerId = Math.random().toString(36).substring(2, 9);
      setStickers((prev) => [
        ...prev,
        {
          id: newStickerId,
          imgSrc,
          x: 50,
          y: 50,
          width,
          height,
        },
      ]);
      setSelectedStickerId(newStickerId);
    };
    img.src = imgSrc;
  };

  const currentPack = PREDEFINED_STICKER_PACKS[activePack];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-slate-900">Stickers</h4>
        <label className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl border border-slate-200 hover:border-pink-300 cursor-pointer transition-colors">
          <FaImage className="w-4 h-4 text-slate-500" />
          <span className="text-sm font-medium text-slate-700">Upload</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleStickerUpload}
            className="hidden"
            id="sticker-upload"
          />
        </label>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {Object.entries(PREDEFINED_STICKER_PACKS).map(([key, pack]) => (
            <button
              key={key}
              onClick={() => setActivePack(key as keyof typeof PREDEFINED_STICKER_PACKS)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200 ${
                activePack === key
                  ? "bg-pink-500 border-pink-500 text-white shadow-lg"
                  : "bg-white border-slate-200 text-slate-600 hover:border-pink-300 hover:text-pink-500"
              }`}
              type="button"
            >
              <pack.icon className="w-4 h-4" />
              <span className="text-sm font-medium whitespace-nowrap">{pack.name}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-3 max-h-56 overflow-y-auto p-1 custom-scrollbar">
          {currentPack.stickers.map((stickerSrc, i) => (
            <button
              key={`${activePack}-${i}`}
              onClick={() => addPredefinedSticker(stickerSrc)}
              className="relative aspect-square rounded-xl bg-white border border-slate-200 hover:border-pink-300 hover:shadow-md transition-all duration-200 overflow-hidden"
              type="button"
            >
              <img
                src={stickerSrc}
                alt={`${currentPack.name} sticker ${i + 1}`}
                className="w-full h-full object-contain p-2"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>

      {stickers.length > 0 && (
        <div className="pt-4 border-t border-slate-200">
          <h4 className="font-semibold text-slate-900 mb-3">Your Stickers</h4>
          <div className="grid grid-cols-4 gap-3 max-h-48 overflow-y-auto p-1 custom-scrollbar">
            {stickers.map((sticker) => (
              <div
                key={sticker.id}
                className={`relative group aspect-square rounded-xl border overflow-hidden bg-white shadow-sm hover:shadow-md transition-all ${
                  selectedStickerId === sticker.id ? 'ring-2 ring-pink-500' : 'border-slate-200'
                }`}
              >
                <img
                  src={sticker.imgSrc}
                  alt="sticker"
                  className="w-full h-full object-contain p-1"
                  onClick={() => setSelectedStickerId(sticker.id)}
                  draggable={false}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setStickers((prev) => prev.filter((s) => s.id !== sticker.id));
                      if (selectedStickerId === sticker.id) setSelectedStickerId(null);
                    }}
                    className="p-1.5 bg-white rounded-full shadow-lg hover:bg-red-50 hover:text-red-500 transition-colors"
                    type="button"
                  >
                    <FaTimes className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}