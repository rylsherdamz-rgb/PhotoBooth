import React, { useState, useEffect } from "react";

type CapturedImage = {
  imgSrc: string;
  dateCreated: Date;
  filter?: string | null;
};

type CapturedImageListProps = {
  data: CapturedImage[] | null;
  onRetake: (index: number) => void;
};

export const CapturedImageList: React.FC<CapturedImageListProps> = ({ data, onRetake }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const count = data ? Math.min(data.length, 9) : 0;

  return (
    <>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            height: 6px;
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #f472b6;
            border-radius: 3px;
          }
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #f472b6 transparent;
          }
        `}
      </style>

      <div className="w-full lg:w-64 px-4 lg:px-0">
        <div className="glass rounded-2xl border border-white/30 shadow-xl p-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-500" />
            Captured Photos ({count})
          </h3>

          {count <= 0 ? (
            <div className="w-full h-48 flex flex-col items-center justify-center text-center px-6">
              <svg className="w-16 h-16 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-slate-500 text-sm">No photos captured yet</p>
              <p className="text-xs text-slate-400 mt-1">Take your first photo to get started</p>
            </div>
          ) : (
            <div
              className={`flex items-center justify-start gap-3 w-full ${
                count > 5 ? "overflow-x-auto custom-scrollbar" : ""
              } flex-nowrap ${isLargeScreen ? "lg:flex-col lg:items-center lg:h-[400px] lg:overflow-y-auto" : ""}`}
              style={{
                maxHeight: isLargeScreen ? "400px" : "140px",
              }}
            >
              {data?.slice(0, 9).map((img, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 rounded-xl border-2 overflow-hidden transition-all duration-200 ${
                    isLargeScreen ? "w-full max-w-xs" : "w-28 h-28"
                  }`}
                  style={{
                    borderColor: isLargeScreen ? "#e4e4e7" : "#e4e4e7",
                    flexBasis: isLargeScreen ? "auto" : "72px",
                  }}
                  onClick={() => onRetake(index)}
                >
                  <img
                    src={img.imgSrc}
                    alt={`Captured photo ${index + 1}`}
                    style={{ filter: img.filter ?? "none" }}
                    className="w-full h-full object-cover scale-x-[-1] hover:scale-105 transition-transform duration-300"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};