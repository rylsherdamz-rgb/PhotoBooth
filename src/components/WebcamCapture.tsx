import React, { useContext, useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { Link } from "react-router-dom";
import { imageContext, videoConstraints } from "../Context/ImageContext";
import { FilterPresets } from "./FilterPresets";
import { LayoutSelector } from "./LayoutSelector";
import { layoutInfos, type LayoutInfo } from "./layoutInfos";
import { TimerSelector } from "./TimerSelector";
import { CapturedImageList } from "./CapturedImageList";
import { FaCamera, FaImages, FaMagic, FaArrowRight, FaTimes, FaTrash } from "react-icons/fa";
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

  const [layoutImageCount, setLayoutImageCount] = useState<number>(defaultLayout.count);
  const [selectedTimer, setSelectedTimer] = useState(3);
  const [filter, setFilter] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [, setEditIndex] = useState<number | null>(null);
  const [isCapturingSequence, setIsCapturingSequence] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const webcamRef      = useRef<Webcam | null>(null);
  const rootRef        = useRef<HTMLDivElement>(null);
  const filterPanelRef = useRef<HTMLDivElement>(null);
  const filterBtnRef   = useRef<HTMLButtonElement>(null);
  const currentCount = data.length;
  const isReady    = currentCount >= layoutImageCount;

  // Close filter panel on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        filterPanelRef.current && !filterPanelRef.current.contains(e.target as Node) &&
        filterBtnRef.current  && !filterBtnRef.current.contains(e.target as Node)
      ) {
        setShowFilterPanel(false);
      }
    };
    if (showFilterPanel) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showFilterPanel]);

  // Sync layout id
  useEffect(() => {
    if (!selectedLayoutId) setSelectedLayoutId(defaultLayout.id);
  }, [defaultLayout.id, selectedLayoutId, setSelectedLayoutId]);

  useEffect(() => {
    if (data.length > layoutImageCount) setImage(data.slice(0, layoutImageCount));
  }, [layoutImageCount, data, setImage]);

  useEffect(() => {
    const sel = layoutInfos.find((info) => info.id === selectedLayoutId);
    if (!sel || sel.count !== layoutImageCount) {
      const next = layoutInfos.find((info) => info.count === layoutImageCount) || layoutInfos[0];
      setSelectedLayoutId(next.id);
    }
  }, [layoutImageCount, selectedLayoutId, setSelectedLayoutId]);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".booth-col", {
        opacity: 0, y: 24, duration: 0.6,
        stagger: 0.1, ease: "power3.out",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const capture = useCallback((index: number | null) => {
    const img = webcamRef.current?.getScreenshot();
    if (!img) return;
    const newImage = { imgSrc: img, dateCreated: new Date(), filter };
    setImage((prev: any[]) => {
      const copy = [...prev];
      if (index !== null) copy[index] = newImage;
      else if (prev.length < layoutImageCount) copy.push(newImage);
      else copy[layoutImageCount - 1] = newImage;
      return copy.slice(0, layoutImageCount);
    });
    setEditIndex(null);
  }, [filter, layoutImageCount, setImage]);

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
      await new Promise<void>((res) => {
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
      await new Promise((r) => setTimeout(r, 300));
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
    <div ref={rootRef} className="min-h-[100dvh] bg-[#f8f8f9]">
      <div className="max-w-[1400px] mx-auto px-4 py-6 lg:py-8">

        {/* Page header */}
        <div className="booth-col mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-[#141418] tracking-tight">Photo Booth</h1>
            <p className="text-slate-400 text-sm mt-0.5">
              {defaultLayout.description} &middot; {layoutImageCount} photos
            </p>
          </div>
          {currentCount > 0 && (
            <button
              onClick={clearAllPhotos}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-slate-400 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all duration-200"
              type="button"
            >
              <FaTrash className="w-3.5 h-3.5" />
              Clear all
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-5 lg:gap-6">

          {/* ── Left column: camera + controls ── */}
          <div className="booth-col space-y-4 relative overflow-visible">

            {/* Webcam viewport */}
            <div className="relative overflow-hidden rounded-2xl bg-[#141418] shadow-xl shadow-black/10 border border-[#e2e2e8]">
              <Webcam
                mirrored={false}
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="w-full aspect-[4/3] object-cover block"
                style={{ filter: filter ?? "none" }}
              />

              {/* Countdown overlay */}
              {isCountingDown && timer > 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 bg-black/20">
                  <div
                    className="rounded-2xl px-10 py-6 text-center"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(16px)",
                      border: "1px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    <span
                      className="text-8xl lg:text-9xl font-black text-white leading-none"
                      style={{ textShadow: "0 2px 24px rgba(232,53,109,0.6)" }}
                    >
                      {timer}
                    </span>
                  </div>
                </div>
              )}

              {/* Active filter badge */}
              {filter && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-[#e8356d]/90 backdrop-blur-sm shadow-md">
                    {FilterPresets.find((f) => f.cssFilter === filter)?.name ?? "Filter"}
                  </span>
                </div>
              )}

              {/* Progress bar at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                <div
                  className="h-full bg-[#e8356d] transition-all duration-300"
                  style={{ width: `${(currentCount / layoutImageCount) * 100}%` }}
                />
              </div>
            </div>

            {/* Controls bar + filter panel wrapper — position:relative so the overlay anchors here */}
            <div className="relative">
              <div className="bg-white rounded-2xl border border-[#e2e2e8] shadow-sm p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                {/* Left: timer + layout */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wide hidden sm:block">Timer</span>
                    <TimerSelector selected={selectedTimer} onChange={setSelectedTimer} />
                  </div>
                  <div className="w-px h-6 bg-[#e2e2e8] hidden sm:block" />
                  <LayoutSelector
                    selectedLayoutId={selectedLayoutId}
                    onChange={(layout: LayoutInfo) => {
                      setLayoutImageCount(layout.count);
                      setSelectedLayoutId(layout.id);
                    }}
                  />
                </div>

                {/* Right: upload + filter */}
                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#f8f8f9] border border-[#e2e2e8] hover:border-slate-300 cursor-pointer transition-all duration-150 text-sm font-medium text-slate-600">
                    <FaImages className="w-4 h-4 text-slate-400" />
                    Upload
                    <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                  </label>
                  <button
                    ref={filterBtnRef}
                    onClick={() => setShowFilterPanel(!showFilterPanel)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-medium transition-all duration-150 ${
                      showFilterPanel || filter
                        ? "bg-[#e8356d] border-[#e8356d] text-white shadow-md shadow-[#e8356d]/30"
                        : "bg-[#f8f8f9] border-[#e2e2e8] text-slate-600 hover:border-slate-300"
                    }`}
                    type="button"
                  >
                    <FaMagic className="w-4 h-4" />
                    Filters
                    {filter && !showFilterPanel && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                    )}
                  </button>
                </div>
              </div>

              {/* Filter panel — absolutely positioned overlay, does NOT affect document flow */}
              {showFilterPanel && (
                <div ref={filterPanelRef} className="absolute left-0 right-0 top-full mt-2 z-50 bg-white rounded-2xl border border-[#e2e2e8] shadow-xl p-4 animate-scale-in">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-[#141418]">Choose Filter</h3>
                    <button
                      onClick={() => setShowFilterPanel(false)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                      type="button"
                      aria-label="Close filter panel"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex overflow-x-auto gap-2.5 pb-1" style={{ scrollbarWidth: "thin" }}>
                    {/* None option */}
                    <button
                      onClick={() => handleFilterSelect(null)}
                      className={`group flex-shrink-0 flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all duration-150 border ${
                        filter === null
                          ? "border-[#e8356d] shadow-md shadow-[#e8356d]/15 bg-[#fde8ef]"
                          : "border-[#e2e2e8] bg-white hover:border-slate-300"
                      }`}
                      type="button"
                    >
                      <div className={`w-14 h-14 rounded-lg overflow-hidden bg-[#f8f8f9] flex items-center justify-center border ${
                        filter === null ? "border-[#e8356d]/30" : "border-[#e2e2e8]"
                      }`}>
                        <svg className="w-7 h-7 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className={`text-[11px] font-medium whitespace-nowrap ${
                        filter === null ? "text-[#e8356d]" : "text-slate-500"
                      }`}>
                        None
                      </span>
                    </button>

                    {FilterPresets.map((fp) => (
                      <button
                        key={fp.name}
                        onClick={() => handleFilterSelect(fp.cssFilter)}
                        className={`group flex-shrink-0 flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all duration-150 border ${
                          filter === fp.cssFilter
                            ? "border-[#e8356d] shadow-md shadow-[#e8356d]/15 bg-[#fde8ef]"
                            : "border-[#e2e2e8] bg-white hover:border-slate-300"
                        }`}
                        type="button"
                      >
                        <div className={`w-14 h-14 rounded-lg overflow-hidden border ${
                          filter === fp.cssFilter ? "border-[#e8356d]/30" : "border-[#e2e2e8] group-hover:border-slate-300"
                        }`}>
                          <img
                            src={fp.icon}
                            alt={fp.name}
                            className="w-full h-full object-cover"
                            style={{ filter: fp.cssFilter }}
                            loading="lazy"
                          />
                        </div>
                        <span className={`text-[11px] font-medium whitespace-nowrap ${
                          filter === fp.cssFilter ? "text-[#e8356d]" : "text-slate-500"
                        }`}>
                          {fp.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Photo counter + primary action */}
            <div className="flex items-center justify-between">
              {/* Counter */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-[#e2e2e8] text-sm font-medium text-slate-600 shadow-xs">
                  <FaCamera className="w-3.5 h-3.5 text-[#e8356d]" />
                  <span className="font-bold text-[#141418]">{currentCount}</span>
                  <span className="text-slate-400">/ {layoutImageCount}</span>
                </div>
              </div>

              {/* CTA */}
              {isReady ? (
                <Link
                  to="/result"
                  state={{ layoutId: selectedLayoutId }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#e8356d] text-white text-sm font-bold shadow-lg shadow-[#e8356d]/35 hover:bg-[#d12460] hover:scale-[1.02] transition-all duration-200 active:scale-[0.97] btn-press"
                >
                  Customize Collage
                  <FaArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <button
                  onClick={captureAllPhotos}
                  disabled={isCountingDown || isCapturingSequence}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#e8356d] text-white text-sm font-bold shadow-lg shadow-[#e8356d]/35 hover:bg-[#d12460] hover:scale-[1.02] transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-[#e8356d] btn-press"
                  type="button"
                >
                  <FaCamera className="w-3.5 h-3.5" />
                  {isCapturingSequence ? "Capturing..." : "Capture All"}
                </button>
              )}
            </div>
          </div>

          {/* ── Right column: captured photos panel ── */}
          <div className="booth-col lg:sticky lg:top-24 self-start">
            <div className="bg-white rounded-2xl border border-[#e2e2e8] shadow-sm overflow-hidden">
              {/* Panel header */}
              <div className="px-4 py-3 border-b border-[#e2e2e8] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#e8356d]" />
                  <h3 className="text-sm font-semibold text-[#141418]">Captured Photos</h3>
                </div>
                <span className="text-xs font-medium text-slate-400 tabular-nums">
                  {currentCount} / {layoutImageCount}
                </span>
              </div>

              {/* Photo grid */}
              <div className="p-3">
                <CapturedImageList data={data} onRetake={startCapture} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
