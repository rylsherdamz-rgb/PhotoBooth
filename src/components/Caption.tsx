interface CaptionProps {
  selectedLanguage: 'en' | 'ja' | 'ko';
  setSelectedLanguage: (selectedLanguage: 'en' | 'ja' | 'ko') => void;
}

export default function Caption({ selectedLanguage, setSelectedLanguage }: CaptionProps) {
  const languages = [
    { code: 'en' as const, label: 'English', flag: '🇺🇸' },
    { code: 'ja' as const, label: '日本語', flag: '🇯🇵' },
    { code: 'ko' as const, label: '한국어', flag: '🇰🇷' },
  ];

  return (
    <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-slate-200">
      <h4 className="font-semibold text-slate-900 mb-3">Caption Language</h4>
      <div className="flex gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelectedLanguage(lang.code)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              selectedLanguage === lang.code
                ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
            type="button"
          >
            <span>{lang.flag}</span>
            <span>{lang.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}