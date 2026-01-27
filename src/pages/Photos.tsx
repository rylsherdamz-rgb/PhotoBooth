import { useEffect, useState, useContext } from 'react';
import Navigation from '../components/Navigation';
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
    const interval = setInterval(loadCollages, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // HANDLERS
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pb-20">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Photo Collection</h1>
          <p className="text-gray-500 italic">Photos are stored locally and expire after 24 hours.</p>
        </header>

        {/* SECTION: Recent Session Snapshots (from Context) */}
        {recentPhotos.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Session</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {recentPhotos.map((img, i) => (
                <div key={i} className="flex-shrink-0 w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-md">
                  <img src={img.imgSrc} alt="Snapshot" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION: Saved Collages */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-700">Saved Collages</h2>
          
          {collages.length === 0 ? (
            <div className="bg-white/50 border-2 border-dashed border-gray-300 rounded-3xl py-20 text-center">
              <p className="text-gray-500">No collages found. Time to hit the booth!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collages.map((collage) => (
                <div key={collage.timestamp} className="group relative bg-white p-3 rounded-3xl shadow-xl transition-transform hover:-translate-y-2">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100">
                    <img 
                      src={collage.imgSrc} 
                      className="w-full h-full object-cover cursor-zoom-in" 
                      onClick={() => setSelectedCollage(collage)}
                    />
                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                      <button 
                        onClick={() => handleDownload(collage)}
                        className="bg-white text-pink-600 px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform"
                      >
                        Download
                      </button>
                      <button 
                        onClick={() => handleDelete(collage.timestamp)}
                        className="text-white text-sm hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 px-2 flex justify-between items-end">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Captured</p>
                      <p className="text-gray-700 font-medium">{formatDate(collage.timestamp)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Expires</p>
                      <p className="text-red-400 text-sm">{formatDate(collage.expiryDate)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {selectedCollage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setSelectedCollage(null)}
        >
          <button className="absolute top-8 right-8 text-white text-4xl">&times;</button>
          <img 
            src={selectedCollage.imgSrc} 
            className="max-h-screen max-w-full rounded-lg shadow-2xl" 
            alt="Expanded view"
          />
        </div>
      )}
    </div>
  );
};

export default Photos;
