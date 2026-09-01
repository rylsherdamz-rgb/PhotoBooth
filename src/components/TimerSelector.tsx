export const TimerSelector = ({
  selected,
  onChange,
}: {
  selected: number;
  onChange: (value: number) => void;
}) => {
  const options = [
    { value: 3, label: "3s" },
    { value: 5, label: "5s" },
    { value: 10, label: "10s" },
  ];

  return (
    <div className="relative">
      <select
        value={selected}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full max-w-[100px] px-8 py-2 pr-10 border border-slate-200 rounded-xl bg-white text-sm font-medium text-slate-700 shadow-sm hover:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition duration-150 appearance-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};