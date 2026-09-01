interface CaptionProps {
  selectedLanguage: "en" | "ja" | "ko";
  setSelectedLanguage: (lang: "en" | "ja" | "ko") => void;
}

const LANGUAGES = [
  { code: "en" as const, label: "EN", full: "English"  },
  { code: "ja" as const, label: "JP", full: "日本語" },
  { code: "ko" as const, label: "KR", full: "한국어" },
];

export default function Caption({ selectedLanguage, setSelectedLanguage }: CaptionProps) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">Caption Language</p>
      <div className="flex gap-2">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelectedLanguage(lang.code)}
            type="button"
            className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 border ${
              selectedLanguage === lang.code
                ? "bg-[#e8356d] text-white border-[#e8356d] shadow-md shadow-[#e8356d]/25"
                : "bg-[#f8f8f9] text-slate-500 border-[#e2e2e8] hover:border-slate-300 hover:text-slate-700"
            }`}
          >
            <span className="text-base leading-none">{lang.label}</span>
            <span className={`text-[10px] ${selectedLanguage === lang.code ? "text-white/70" : "text-slate-400"}`}>{lang.full}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
