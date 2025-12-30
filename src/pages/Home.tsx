import { useState, useEffect } from "react";
import HomeCanvas from "../components/HomeCanvas";
import SnapCharmText from "../components/SnapCharmText";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  // Automatically hide intro after 2 seconds
  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => setShowIntro(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  return (
    <div className="w-full h-full flex-1 overflow-x-hidden relative">
      {showIntro ? (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-full px-4">
          {/* Ensure SnapCharmText itself is responsive */}
          <SnapCharmText />
        </div>
      ) : (
        <div className="w-full h-full">
          {/* Make HomeCanvas fill the container without overflowing */}
          <HomeCanvas  />
        </div>
      )}
    </div>
  );
}
