import React, { useContext, useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { Link } from "react-router-dom";
import { imageContext, videoConstraints } from "../Context/ImageContext";
import { FilterPresets } from "./FilterPresets";
import { LayoutSelector } from "./LayoutSelector";
import { layoutInfos, type LayoutInfo } from "./layoutInfos";
import { TimerSelector } from "./TimerSelector";
import { CapturedImageList } from "./CapturedImageList";
import { FaCamera, FaImages, FaMagic, FaDownload, FaTimes } from "react-icons/fa";
import gsap from "gsap";

export const WebcamCapture = () => {
  const context = useContext(imageContext);
  if (!context) throw new Error("Must be used within provider");
  const { data, setImage, selectedLayoutId, setSelectedLayoutId } = context;

  if (!data) throw new Error("Must be used within provider");
  const defaultLayout =
    layoutInfos.find((info) => info.id === selectedLayoutId) ||
    layoutInfos.find((info) => info.count === 3) ||
    layoutInfos[0];
  const [layoutImageCount, setLayoutImageCount] = useState<number>(
    defaultLayout.count
  );
  const [selectedTimer, setSelectedTimer] = useState(3);
  const [filter, setFilter] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [, setEditIndex] = useState<number | null>(null);
  const [isCapturingSequence, setIsCapturingSequence] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const webcamRef = useRef<Webcam | null>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const currentCount = data.length;
  const isReady = currentCount >= layoutImageCount;

  useEffect(() => {
    if (!selectedLayoutId) {
      setSelectedLayoutId(defaultLayout.id);
    }
  }, [defaultLayout.id, selectedLayoutId, setSelectedLayoutId]);

  useEffect(() => {
    if (data.length > layoutImageCount) {
      setImage(data.slice(0, layoutImageCount));
    }
  }, [layoutImageCount, data, setImage]);

  useEffect(() => {
    const selectedLayout = layoutInfos.find((info) => info.id === selectedLayoutId);
    if (!selectedLayout || selectedLayout.count !== layoutImageCount) {
      const nextLayout =
        layoutInfos.find((info) => info.count === layoutImageCount) ||
        layoutInfos[0];
      setSelectedLayoutId(nextLayout.id);
    }
  }, [layoutImageCount, selectedLayoutId, setSelectedLayoutId]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".booth-control", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.from(".filter-chip", {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        stagger: 0.05,
        ease: "back.out(1.7)",
        delay: 0.2,
      });
    }, controlsRef);

    return () => ctx.revert();
  }, []);

  const capture = useCallback(
    (index: number | null) => {
      const img = webcamRef.current?.getScreenshot();
      if (!img) return;
      const newImage = { imgSrc: img, dateCreated: new Date(), filter };

      setImage((prev: string | any[]) => {
        const copy = [...prev];
        if (index !== null) copy[index] = newImage;
        else if (prev.length < layoutImageCount) copy.push(newImage);
        else copy[layoutImageCount - 1] = newImage;
        return copy.slice(0, layoutImageCount);
      });
      setEditIndex(null);
    },
    [filter, layoutImageCount, setImage]
  );

  const startCapture = (index: number | null = null) => {
    if (index === null && currentCount >= layoutImageCount) return;
    setEditIndex(index);
    setIsCountingDown(true);
    setTimer(selectedTimer);
    let count = selectedTimer;
    const iv = setInterval(() => {
      count -= 1;
      setTimer(count);
      if (count === 0) {
        clearInterval(iv);
        setIsCountingDown(false);
        capture(index);
      }
    }, 1000);
  };

  const captureAllPhotos = async () => {
    if (isCapturingSequence) return;
    setIsCapturingSequence(true);

    for (let i = 0; i < layoutImageCount; i++) {
      await new Promise<void>(res => {
        setTimer(selectedTimer);
        setIsCountingDown(true);
        let count = selectedTimer;
        const iv = setInterval(() => {
          count -= 1;
          setTimer(count);
          if (count === 0) {
            clearInterval(iv);
            setIsCountingDown(false);
            capture(i);
            res();
          }
        }, 1000);
      });
      await new Promise(r => setTimeout(r, 300));
    }

    setEditIndex(null);
    setIsCapturingSequence(false);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const newImage = { imgSrc: reader.result as string, dateCreated: new Date(), filter };
      setImage((prev: any) => {
        const copy = [...prev];
        if (copy.length < layoutImageCount) copy.push(newImage);
        else copy[layoutImageCount - 1] = newImage;
        return copy.slice(0, layoutImageCount);
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFilterSelect = (newFilter: string | null) => {
    setFilter(newFilter);
    setShowFilterPanel(false);
  };

  const clearAllPhotos = () => {
    setImage([]);
    setFilter(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-4 py-6 lg:py-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-950">Photo Booth</h1>
          <p className="text-slate-500 mt-1">Layout: <span className="font-medium text-slate-700 capitalize">{defaultLayout.description}</span> • {layoutImageCount} photos</p>
        </div>

        <div ref={controlsRef} className="grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-8">
          <div className="space-y-6">
            <div className="relative">
              <Webcam
                mirrored={false}
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="w-full aspect-[4/3] rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 object-cover bg-slate-100"
                style={{ filter: filter ?? "none" }}
              />
              {isCountingDown && timer > 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <div className="glass rounded-2xl px-8 py-6 text-center shadow-2xl">
                    <span className="text-7xl lg:text-9xl font-extrabold text-pink-500 animate-pulse">
                      {timer}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 booth-control">
              <div className="flex items-center gap-4 flex-wrap">
                <TimerSelector selected={selectedTimer} onChange={setSelectedTimer} />
                <LayoutSelector
                  selectedLayoutId={selectedLayoutId}
                  onChange={(layout: LayoutInfo) => {
                    setLayoutImageCount(layout.count);
                    setSelectedLayoutId(layout.id);
                  }}
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 hover:border-pink-300 cursor-pointer transition-colors">
                  <FaImages className="w-5 h-5 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">Upload</span>
                  <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                </label>
                <button
                  onClick={() => setShowFilterPanel(!showFilterPanel)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${
                    showFilterPanel || filter
                      ? "bg-pink-500 border-pink-500 text-white"
                      : "bg-white border-slate-200 text-slate-700 hover:border-pink-300"
                  }`}
                  type="button"
                >
                  <FaMagic className="w-5 h-5" />
                  <span className="text-sm font-medium">Filters</span>
                  {filter && (
                    <span className="w-2 h-2 rounded-full bg-white/50" />
                  )}
                </button>
              </div>
            </div>

            {showFilterPanel && (
              <div className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 booth-control">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Filters</h3>
                  <button
                    onClick={() => setShowFilterPanel(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    type="button"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex overflow-x-auto gap-3 pb-2 custom-scrollbar">
                  <button
                    onClick={() => handleFilterSelect(null)}
                    className={`group relative flex-shrink-0 flex flex-col items-center p-2 rounded-xl transition-all duration-200 bg-white border ${
                      filter === null
                        ? 'border-pink-500 shadow-lg scale-[1.02] ring-2 ring-pink-500/20'
                        : 'border-slate-200 hover:border-pink-300 hover:shadow-md'
                    }`}
                    type="button"
                  >
                    <div className={`w-16 h-16 rounded-lg overflow-hidden transition-transform duration-200 bg-slate-100 flex items-center justify-center ${
                      filter === null ? 'ring-2 ring-pink-500' : 'group-hover:scale-105'
                    }`}>
                      <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className={`text-xs font-medium mt-1 transition-colors whitespace-nowrap ${
                      filter === null ? 'text-pink-600' : 'text-slate-600 group-hover:text-pink-500'
                    }`}>
                      None
                    </span>
                  </button>

                  {FilterPresets.map((filterPreset) => (
                    <button
                      key={filterPreset.name}
                      onClick={() => handleFilterSelect(filterPreset.cssFilter)}
                      className={`group relative flex-shrink-0 flex flex-col items-center p-2 rounded-xl transition-all duration-200 bg-white border ${
                        filter === filterPreset.cssFilter
                          ? 'border-pink-500 shadow-lg scale-[1.02] ring-2 ring-pink-500/20'
                          : 'border-slate-200 hover:border-pink-300 hover:shadow-md'
                      }`}
                      type="button"
                    >
                      <div className={`w-16 h-16 rounded-lg overflow-hidden transition-transform duration-200 ${
                        filter === filterPreset.cssFilter ? 'ring-2 ring-pink-500' : 'group-hover:scale-105'
                      }`}>
                        <img
                          src={filterPreset.icon}
                          alt={filterPreset.name}
                          className="w-full h-full object-cover"
                          style={{ filter: filterPreset.cssFilter }}
                        />
                      </div>
                      <span className={`text-xs font-medium mt-1 transition-colors whitespace-nowrap ${
                        filter === filterPreset.cssFilter ? 'text-pink-600' : 'text-slate-600 group-hover:text-pink-500'
                      }`}>
                        {filterPreset.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 booth-control">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100">
                  <FaCamera className="w-4 h-4" />
                  {currentCount}/{layoutImageCount}
                </span>
                {currentCount > 0 && (
                  <button
                    onClick={clearAllPhotos}
                    className="text-slate-400 hover:text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-full transition-colors"
                    type="button"
                  >
                    Clear all
                  </button>
                )}
              </div>
              {isReady ? (
                <Link
                  to="/result"
                  state={{ layoutId: selectedLayoutId }}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-pink-500 text-white text-lg font-semibold shadow-xl shadow-pink-500/40 hover:bg-pink-400 hover:scale-[1.02] hover:shadow-pink-500/50 transition-all duration-200 active:scale-[0.98]"
                >
                  <FaDownload />
                  Next: Customize
                </Link>
              ) : (
                <button
                  onClick={captureAllPhotos}
                  disabled={isCountingDown || isCapturingSequence}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-pink-500 text-white text-lg font-semibold shadow-xl shadow-pink-500/40 hover:bg-pink-400 hover:scale-[1.02] hover:shadow-pink-500/50 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-pink-500"
                  type="button"
                >
                  <FaCamera />
                  {isCapturingSequence ? "Taking Photos..." : "Capture All"}
                </button>
              )}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 space-y-6">
            <CapturedImageList data={data} onRetake={startCapture} />
          </div>
        </div>
      </div>
    </div>
  );
};