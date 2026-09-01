export const TimerSelector = ({
  selected,
  onChange,
}: {
  selected: number;
  onChange: (value: number) => void;
}) => {
  const options = [
    { value: 3,  label: "3s"  },
    { value: 5,  label: "5s"  },
    { value: 10, label: "10s" },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-[#f8f8f9] rounded-xl border border-[#e2e2e8]">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
            selected === opt.value
              ? "bg-white text-[#e8356d] shadow-sm border border-[#e2e2e8]"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};
