import React from "react";
import { FilterPresets, type FilterStyle } from "./FilterPresets";

interface FilterSelectorProps {
  selectedFilter: string | null;
  onFilterChange: (filter: string | null) => void;
}

export const FilterSelector: React.FC<FilterSelectorProps> = ({
  selectedFilter,
  onFilterChange,
}) => {
  return (
    <>
      <style>
        {`
          .filter-scrollbar::-webkit-scrollbar {
            height: 6px;
            background: transparent;
          }
          .filter-scrollbar::-webkit-scrollbar-thumb {
            background-color: #f472b6;
            border-radius: 3px;
          }
          .filter-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #f472b6 transparent;
          }
        `}
      </style>

      <div className="w-full">
        <div className="flex overflow-x-auto gap-3 pb-2 filter-scrollbar">
          <button
            onClick={() => onFilterChange(null)}
            className={`group relative flex-shrink-0 flex flex-col items-center p-2 rounded-xl transition-all duration-200 bg-white border ${
              selectedFilter === null
                ? 'border-pink-500 shadow-lg scale-[1.02] ring-2 ring-pink-500/20'
                : 'border-slate-200 hover:border-pink-300 hover:shadow-md'
            }`}
            type="button"
          >
            <div className={`w-16 h-16 rounded-lg overflow-hidden transition-transform duration-200 bg-slate-100 flex items-center justify-center ${
              selectedFilter === null ? 'ring-2 ring-pink-500' : 'group-hover:scale-105'
            }`}>
              <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className={`text-xs font-medium mt-1 transition-colors whitespace-nowrap ${
              selectedFilter === null ? 'text-pink-600' : 'text-slate-600 group-hover:text-pink-500'
            }`}>
              None
            </span>
          </button>

          {FilterPresets.map((filterPreset: FilterStyle) => (
            <button
              key={filterPreset.name}
              onClick={() => onFilterChange(filterPreset.cssFilter)}
              className={`group relative flex-shrink-0 flex flex-col items-center p-2 rounded-xl transition-all duration-200 bg-white border ${
                selectedFilter === filterPreset.cssFilter
                  ? 'border-pink-500 shadow-lg scale-[1.02] ring-2 ring-pink-500/20'
                  : 'border-slate-200 hover:border-pink-300 hover:shadow-md'
              }`}
              type="button"
            >
              <div className={`w-16 h-16 rounded-lg overflow-hidden transition-transform duration-200 ${
                selectedFilter === filterPreset.cssFilter ? 'ring-2 ring-pink-500' : 'group-hover:scale-105'
              }`}>
                <img
                  src={filterPreset.icon}
                  alt={filterPreset.name}
                  className="w-full h-full object-cover"
                  style={{ filter: filterPreset.cssFilter }}
                />
              </div>
              <span className={`text-xs font-medium mt-1 transition-colors whitespace-nowrap ${
                selectedFilter === filterPreset.cssFilter ? 'text-pink-600' : 'text-slate-600 group-hover:text-pink-500'
              }`}>
                {filterPreset.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};