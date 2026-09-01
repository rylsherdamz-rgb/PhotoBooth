import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { imageContext } from "../Context/ImageContext";
import { FaDownload, FaTrash, FaTimes, FaCamera } from "react-icons/fa";

type DownloadedCollage = {
  imgSrc: string;
  timestamp: number;
  expiryDate: number;
};

const formatDate = (ts: number) =>
  new Date(ts).toLocaleString("en-US", {
    month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

const Photos = () => {
  const [collages, setCollages] = useState<DownloadedCollage[]>([]);
  const [selected, setSelected] = useState<DownloadedCollage | null>(null);

  const context = useContext(imageContext);
  if (!context) return null;
  const { data: recentPhotos } = context;

  useEffect(() => {
    const load = () => {
      const stored = localStorage.getItem("photobooth_downloaded_collages");
      if (!stored) return;
      try {
        const parsed: DownloadedCollage[] = JSON.parse(stored);
        const now = Date.now();
        const valid = parsed.filter((c) => c.expiryDate > now);
        setCollages(valid);
        if (valid.length !== parsed.length) {
          localStorage.setItem("photobooth_downloaded_collages", JSON.stringify(valid));
        }
      } catch {
        /* corrupted storage — skip */
      }
    };
    load();
    const iv = setInterval(load, 60_000);
    return () => clearInterval(iv);
  }, []);

  const handleDownload = (collage: DownloadedCollage) => {
    const a = document.createElement("a");
    a.href = collage.imgSrc;
    a.download = `snapcharm-${collage.timestamp}.png`;
    a.click();
  };

  const handleDelete = (timestamp: number) => {
    const next = collages.filter((c) => c.timestamp !== timestamp);
    setCollages(next);
    localStorage.setItem("photobooth_downloaded_collages", JSON.stringify(next));
    if (selected?.timestamp === timestamp) setSelected(null);
  };

  return (
    <div className="min-h-[100dvh] bg-[#f8f8f9]">
      <Navigation />

      <main className="max-w-[1400px] mx-auto px-6 pt-16 pb-24">

        {/* Page heading */}
        <div className="pt-10 pb-14">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#141418] leading-tight tracking-tight mb-3">
            Your photos
          </h1>
          <p className="text-slate-500 text-base">
            Stored locally on your device. Saved collages expire after 24 hours.
          </p>
        </div>

        {/* Recent session strip */}
        {recentPhotos && recentPhotos.length > 0 && (
          <section className="mb-14 animate-in">
            <h2 className="text-lg font-bold text-[#141418] mb-4">Recent session</h2>
            <div
              className="flex gap-3 overflow-x-auto pb-2"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#e2e2e8 transparent" }}
            >
              {recentPhotos.map((img, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-28 h-28 rounded-xl overflow-hidden border border-[#e2e2e8] shadow-sm hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={img.imgSrc}
                    alt={`Session photo ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Saved collages */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[#141418]">Saved collages</h2>
            {collages.length > 0 && (
              <span className="text-xs font-medium text-slate-400 tabular-nums">
                {collages.length} {collages.length === 1 ? "collage" : "collages"}
              </span>
            )}
          </div>

          {collages.length === 0 ? (
            /* Empty state */
            <div className="bg-white rounded-2xl border-2 border-dashed border-[#e2e2e8] py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#f8f8f9] border border-[#e2e2e8] flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-[#141418] font-semibold text-base mb-1">No saved collages yet</p>
              <p className="text-slate-400 text-sm mb-6">
                Download a collage from the customize page and it will appear here for 24 hours.
              </p>
              <Link
                to="/booth"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e8356d] text-white text-sm font-bold shadow-lg shadow-[#e8356d]/30 hover:bg-[#d12460] transition-all duration-200"
              >
                <FaCamera className="w-3.5 h-3.5" />
                Start Photo Session
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {collages.map((collage, i) => (
                <div
                  key={collage.timestamp}
                  className="group bg-white rounded-2xl border border-[#e2e2e8] shadow-sm hover:shadow-md hover:border-[#f7c5d5] transition-all duration-200 overflow-hidden animate-in"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#f8f8f9] cursor-zoom-in" onClick={() => setSelected(collage)}>
                    <img
                      src={collage.imgSrc}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={`Collage from ${formatDate(collage.timestamp)}`}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                      <span className="text-white text-xs font-semibold bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        Click to expand
                      </span>
                    </div>
                  </div>

                  {/* Meta + actions */}
                  <div className="px-4 py-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400 leading-tight">Saved</p>
                      <p className="text-sm font-medium text-[#141418] truncate">{formatDate(collage.timestamp)}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => handleDownload(collage)}
                        className="w-8 h-8 rounded-lg bg-[#fde8ef] text-[#e8356d] flex items-center justify-center hover:bg-[#e8356d] hover:text-white transition-all duration-150"
                        aria-label="Download collage"
                        type="button"
                      >
                        <FaDownload className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(collage.timestamp)}
                        className="w-8 h-8 rounded-lg bg-[#f8f8f9] text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 border border-[#e2e2e8] transition-all duration-150"
                        aria-label="Delete collage"
                        type="button"
                      >
                        <FaTrash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Expanded collage"
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); setSelected(null); }}
            aria-label="Close"
            type="button"
          >
            <FaTimes className="w-4.5 h-4.5" />
          </button>
          <img
            src={selected.imgSrc}
            className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl"
            alt="Expanded collage"
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Photos;
