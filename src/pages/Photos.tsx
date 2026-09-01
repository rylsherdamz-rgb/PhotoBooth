import { useEffect, useState, useContext } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { imageContext } from "../Context/ImageContext";

type DownloadedCollage = {
  imgSrc: string;
  timestamp: number;
  expiryDate: number;
};

const Photos = () => {
  const [collages, setCollages] = useState<DownloadedCollage[]>([]);
  const [selectedCollage, setSelectedCollage] = useState<DownloadedCollage | null>(null);
  const context = useContext(imageContext);

  if (!context) return null;
  const { data: recentPhotos } = context;

  useEffect(() => {
    const loadCollages = () => {
      const stored = localStorage.getItem('photobooth_downloaded_collages');
      if (stored) {
        try {
          const parsed: DownloadedCollage[] = JSON.parse(stored);
          const now = Date.now();
          const valid = parsed.filter(c => c.expiryDate > now);
          setCollages(valid);
          if (valid.length !== parsed.length) {
            localStorage.setItem('photobooth_downloaded_collages', JSON.stringify(valid));
          }
        } catch (e) {
          console.error("Storage corrupted", e);
        }
      }
    };

    loadCollages();
    const interval = setInterval(loadCollages, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleDownload = (collage: DownloadedCollage) => {
    const link = document.createElement('a');
    link.href = collage.imgSrc;
    link.download = `snapcharm-${collage.timestamp}.png`;
    link.click();
  };

  const handleDelete = (timestamp: number) => {
    const updated = collages.filter(c => c.timestamp !== timestamp);
    setCollages(updated);
    localStorage.setItem('photobooth_downloaded_collages', JSON.stringify(updated));
  };

  const formatDate = (ts: number) => new Date(ts).toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main className="max-w-[1400px] mx-auto px-6 pt-24 pb-24 lg:pt-32 lg:pb-32">
        <header className="text-center mb-16 max-w-2xl mx-auto space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-600 text-xs font-semibold uppercase tracking-wider">
            Gallery
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 leading-tight">
            Your Photo Collection
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            Photos are stored locally and expire after 24 hours.
          </p>
        </header>

        {recentPhotos && recentPhotos.length > 0 && (
          <section className="mb-16 animate-in">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Recent Session</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
              {recentPhotos.map((img, i) => (
                <div key={i} className="flex-shrink-0 w-32 h-32 sm:w-36 sm:h-36 rounded-xl overflow-hidden border-2 border-slate-200 shadow-lg hover:scale-105 transition-transform duration-300">
                  <img src={img.imgSrc} alt="Snapshot" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="animate-in" style={{ animationDelay: '100ms' }}>
          <h2 className="text-2xl font-semibold text-slate-900 mb-8">Saved Collages</h2>

          {collages.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm border-2 border-dashed border-slate-200 rounded-2xl py-20 lg:py-24 text-center animate-in" style={{ animationDelay: '200ms' }}>
              <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-slate-500 text-lg">No collages found yet</p>
              <p className="text-slate-400 mt-2">Time to hit the booth and create some memories!</p>
              <a href="/booth" className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-pink-500 text-white font-semibold hover:bg-pink-400 transition-colors">
                Start Photo Session
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {collages.map((collage) => (
                <div key={collage.timestamp} className="group relative bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-slate-200 shadow-xl hover:shadow-2xl hover:shadow-pink-500/10 hover:border-pink-200 transition-all duration-300 animate-in" style={{ animationDelay: `${200 + collages.indexOf(collage) * 50}ms` }}>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100">
                    <img
                      src={collage.imgSrc}
                      className="w-full h-full object-cover cursor-zoom-in group-hover:scale-105 transition-transform duration-500"
                      onClick={() => setSelectedCollage(collage)}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDownload(collage); }}
                        className="bg-white text-pink-600 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-pink-50 hover:scale-105 transition-all duration-200"
                      >
                        Download
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(collage.timestamp); }}
                        className="text-white text-sm font-medium hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 px-1 flex justify-between items-end">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Captured</p>
                      <p className="text-slate-700 font-medium">{formatDate(collage.timestamp)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-red-400 uppercase tracking-wider">Expires</p>
                      <p className="text-red-400 text-sm font-medium">{formatDate(collage.expiryDate)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedCollage && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in"
              onClick={() => setSelectedCollage(null)}
              role="dialog"
              aria-modal="true"
              aria-label="Expanded collage view"
            >
              <button
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-3xl transition-colors"
                onClick={(e) => { e.stopPropagation(); setSelectedCollage(null); }}
                aria-label="Close expanded view"
              >
                &times;
              </button>
              <img
                src={selectedCollage.imgSrc}
                className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl"
                alt="Expanded collage view"
              />
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Photos;