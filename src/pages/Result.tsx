import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { handleStickerUpload } from "../utils/stickerHelpFunction";
import { imageContext } from "../Context/ImageContext";
import { layoutInfos } from "../components/layoutInfos";
import type { Sticker } from "../hooks/useDownloadCollage";
import Navigation from "../components/Navigation";
import ActionButton from "../components/ActionButton";
import StickerUpload from "../components/StickerUpload";
import Caption from "../components/Caption";
import BackgroundColorSelector from "../components/BackgroundColorSelector";
import Canvas from "../components/Canvas";

const predefinedColors = ["#ffffff", "#f8f8f8", "#ffcccc", "#ccffcc", "#ccccff"];

const Result = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [showPicker1, setShowPicker1] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "ja" | "ko">(
    "ja"
  );

  const captions = {
    en: "SnapCharm ",
    ja: "スナップチャーム",
    ko: "스냅참 ",
  };

  const context = useContext(imageContext);
  if (!context) throw new Error("Must be used within ImageContextProvider");
  const { data, selectedLayoutId } = context;
  if (!data) throw new Error("No image data");
  const location = useLocation();
  const routeLayoutId = (location.state as { layoutId?: string } | null)?.layoutId;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fontColor, setFontColor] = useState("#333");
  const [filter] = useState("none");
  const imageSize = 160; // Fixed size
  const [padding] = useState(10);

  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [resizeData, setResizeData] = useState<{
    id: string;
    pos: string;
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
  } | null>(null);
  const [isMoving, setIsMoving] = useState(false);
  const [activeSticker, setActiveSticker] = useState<{
    id: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const [resizeStickerId, setResizeStickerId] = useState<string | null>(null);
  const [templateScale, setTemplateScale] = useState(1);

  const animationFrameRef = useRef<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastRenderTime = useRef<number>(0);
  const RENDER_THROTTLE_MS = 16; // ~60fps

  const selectedLayout = React.useMemo(() => {
    return (
      layoutInfos.find((l) => l.id === routeLayoutId) ||
      layoutInfos.find((l) => l.id === selectedLayoutId) ||
      layoutInfos.find((l) => l.count >= data.length) ||
      layoutInfos[layoutInfos.length - 1]
    );
  }, [data.length, routeLayoutId, selectedLayoutId]);
  const isCustomTemplate = Boolean(selectedLayout.backgroundImage);

  const preloadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      img.src = src;
    });

  const drawImageCover = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    const scale = Math.max(width / img.width, height / img.height);
    const sw = width / scale;
    const sh = height / scale;
    const sx = (img.width - sw) / 2;
    const sy = (img.height - sh) / 2;
    ctx.drawImage(img, sx, sy, sw, sh, x, y, width, height);
  };

  const drawImageContain = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    const scale = Math.min(width / img.width, height / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    const dx = x + (width - dw) / 2;
    const dy = y + (height - dh) / 2;
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  const drawSlotOverlay = (
    ctx: CanvasRenderingContext2D,
    slots: { x: number; y: number; width: number; height: number }[],
    canvasWidth: number,
    canvasHeight: number
  ) => {
    ctx.save();
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.strokeStyle = "rgba(255, 0, 0, 0.85)";
    ctx.fillStyle = "rgba(255, 0, 0, 0.08)";
    slots.forEach((slot) => {
      const x = slot.x * canvasWidth;
      const y = slot.y * canvasHeight;
      const width = slot.width * canvasWidth;
      const height = slot.height * canvasHeight;
      ctx.fillRect(x, y, width, height);
      ctx.strokeRect(x, y, width, height);
    });
    ctx.restore();
  };

  const controlsRef = useRef<HTMLDivElement>(null);
  const updateTemplateScale = React.useCallback(() => {
    if (!controlsRef.current || !canvasRef.current) return;
    const controlsWidth = controlsRef.current.getBoundingClientRect().width;
    const dpr = window.devicePixelRatio || 1;
    const canvasLogicalWidth = canvasRef.current.width / dpr;
    if (!controlsWidth || !canvasLogicalWidth) return;
    const targetWidth = controlsWidth * 2;
    const nextScale = targetWidth / canvasLogicalWidth;
    setTemplateScale(nextScale);
  }, []);

  useEffect(() => {
    if (!isCustomTemplate) return;
    const raf = requestAnimationFrame(() => updateTemplateScale());
    const handleResize = () => updateTemplateScale();
    window.addEventListener("resize", handleResize);
    const observer = new ResizeObserver(() => updateTemplateScale());
    if (controlsRef.current) observer.observe(controlsRef.current);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [isCustomTemplate, updateTemplateScale, data.length, selectedLayout]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const pickerElements = document.querySelectorAll(".chrome-picker");
      const clickedInsidePicker = Array.from(pickerElements).some((el) =>
        el.contains(e.target as Node)
      );
      if (clickedInsidePicker) return;
      if (controlsRef.current && controlsRef.current.contains(e.target as Node)) return;
      const stickerEls = document.querySelectorAll(".sticker-draggable");
      const clickedSticker = Array.from(stickerEls).some((el) =>
        el.contains(e.target as Node)
      );
      if (clickedSticker) return;
      setSelectedStickerId(null);
      setResizeStickerId(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !data.length) return;
    renderCanvas();
  }, [
    data,
    selectedLayout,
    imageSize,
    padding,
    bgColor,
    filter,
    fontColor,
    stickers,
    selectedLanguage,
  ]);

  const renderCanvas = () => {
    if (!canvasRef.current || !data.length) return;

    const now = performance.now();
    if (now - lastRenderTime.current < RENDER_THROTTLE_MS) return;
    lastRenderTime.current = now;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const layout = selectedLayout.layout;
    const rows = layout.length;
    const maxCols = Math.max(...layout.map((row) => row.length));
    const hasCustomBackground =
      Boolean(selectedLayout.backgroundImage) &&
      Boolean(selectedLayout.slots?.length);

    const baseWidth = maxCols * imageSize + (maxCols + 1) * padding;
    const baseHeight = rows * imageSize + (rows + 1) * padding + 40;
    let drawWidth = baseWidth;
    let drawHeight = baseHeight;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = drawWidth * dpr;
    canvas.height = drawHeight * dpr;
    canvas.style.width = `${drawWidth}px`;
    canvas.style.height = `${drawHeight}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, drawWidth, drawHeight);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, drawWidth, drawHeight);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    (async () => {
      try {
        if (hasCustomBackground && selectedLayout.backgroundImage && selectedLayout.slots) {
          const bg = await preloadImage(selectedLayout.backgroundImage);
          if (bg.width !== drawWidth || bg.height !== drawHeight) {
            drawWidth = bg.width;
            drawHeight = bg.height;
            canvas.width = drawWidth * dpr;
            canvas.height = drawHeight * dpr;
            canvas.style.width = `${drawWidth}px`;
            canvas.style.height = `${drawHeight}px`;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
          }

          ctx.clearRect(0, 0, drawWidth, drawHeight);
          ctx.drawImage(bg, 0, 0, drawWidth, drawHeight);

          const images = await Promise.all(
            data.slice(0, selectedLayout.slots.length).map((imgData) =>
              preloadImage(imgData.imgSrc)
            )
          );

          images.forEach((img, index) => {
            const slot = selectedLayout.slots?.[index];
            if (!slot) return;
            const x = slot.x * drawWidth;
            const y = slot.y * drawHeight;
            const width = slot.width * drawWidth;
            const height = slot.height * drawHeight;
            ctx.filter = data[index].filter || filter || "none";
            if (selectedLayout.fit === "contain") {
              drawImageContain(ctx, img, x, y, width, height);
            } else {
              drawImageCover(ctx, img, x, y, width, height);
            }
          });

          if (selectedLayout.debugSlots) {
            drawSlotOverlay(ctx, selectedLayout.slots, drawWidth, drawHeight);
          }
        } else {
          const maxImages = layout.flat().reduce((a, b) => a + b, 0);
          const images = await Promise.all(
            data.slice(0, maxImages).map((imgData) => preloadImage(imgData.imgSrc))
          );

          let imgIndex = 0;
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < layout[row].length; col++) {
              if (layout[row][col] === 1 && imgIndex < images.length) {
                const x = padding + col * (imageSize + padding);
                const y = padding + row * (imageSize + padding);
                ctx.filter = data[imgIndex].filter || filter || "none";
                ctx.drawImage(images[imgIndex], x, y, imageSize, imageSize);
                imgIndex++;
              }
            }
          }
        }

        for (const sticker of stickers) {
          const stickerImg = await preloadImage(sticker.imgSrc);
          ctx.filter = "none";
          ctx.drawImage(stickerImg, sticker.x, sticker.y, sticker.width, sticker.height);
        }

        if (selectedLayout.showCaption !== false) {
          ctx.font = "bold 16px sans-serif";
          ctx.fillStyle = fontColor;
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";
          ctx.fillText(captions[selectedLanguage], drawWidth / 2, drawHeight - 15);
        }
      } catch (e) {
        console.error("Error loading images", e);
      }
    })();
  };

  useEffect(() => {
    if ((!isMoving && !resizeData) || !activeSticker) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const canvasRect = canvasRef.current?.getBoundingClientRect();
        if (!canvasRect) return;

        let newX = e.clientX - canvasRect.left - activeSticker.offsetX;
        let newY = e.clientY - canvasRect.top - activeSticker.offsetY;

        const currentSticker = stickers.find((s) => s.id === activeSticker.id);
        if (!currentSticker) return;

        newX = Math.max(0, Math.min(newX, canvasRect.width - currentSticker.width));
        newY = Math.max(0, Math.min(newY, canvasRect.height - currentSticker.height));

        setStickers((prev) =>
          prev.map((s) =>
            s.id === activeSticker.id ? { ...s, x: newX, y: newY } : s
          )
        );
      });
    };

    const handleMouseUp = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setIsMoving(false);
      setActiveSticker(null);
      renderCanvas();
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMoving, activeSticker, stickers]);

  useEffect(() => {
    if (!resizeData) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { id, pos, startX, startY, startWidth, startHeight } = resizeData;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = stickers.find((s) => s.id === id)?.x || 0;
      let newY = stickers.find((s) => s.id === id)?.y || 0;

      if (pos.includes("right")) newWidth = Math.max(50, startWidth + deltaX);
      if (pos.includes("bottom")) newHeight = Math.max(50, startHeight + deltaY);
      if (pos.includes("left")) {
        newWidth = Math.max(50, startWidth - deltaX);
        newX = startX + deltaX;
      }
      if (pos.includes("top")) {
        newHeight = Math.max(50, startHeight - deltaY);
        newY = startY + deltaY;
      }

      setStickers((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, width: newWidth, height: newHeight, x: newX, y: newY } : s
        )
      );
    };

    const handleMouseUp = () => {
      setResizeData(null);
      renderCanvas();
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizeData]);

  const handleDownload = async () => {
    try {
      if (!canvasRef.current) {
        throw new Error("Canvas not initialized");
      }

      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) {
        throw new Error("Failed to get canvas context");
      }

      const layout = selectedLayout.layout;
      const rows = layout.length;
      const maxCols = Math.max(...layout.map((row) => row.length));

      const hasCustomBackground =
        Boolean(selectedLayout.backgroundImage) &&
        Boolean(selectedLayout.slots?.length);

      const baseWidth = maxCols * imageSize + (maxCols + 1) * padding;
      const baseHeight = rows * imageSize + (rows + 1) * padding + 40;

      let drawWidth = baseWidth;
      let drawHeight = baseHeight;

      const dpr = 2;
      tempCanvas.width = drawWidth * dpr;
      tempCanvas.height = drawHeight * dpr;
      tempCanvas.style.width = `${drawWidth}px`;
      tempCanvas.style.height = `${drawHeight}px`;

      tempCtx.scale(dpr, dpr);
      tempCtx.fillStyle = bgColor;
      tempCtx.fillRect(0, 0, drawWidth, drawHeight);
      tempCtx.imageSmoothingEnabled = true;
      tempCtx.imageSmoothingQuality = "high";

      if (hasCustomBackground && selectedLayout.backgroundImage && selectedLayout.slots) {
        const bg = await preloadImage(selectedLayout.backgroundImage);
        if (bg.width !== drawWidth || bg.height !== drawHeight) {
          drawWidth = bg.width;
          drawHeight = bg.height;
          tempCanvas.width = drawWidth * dpr;
          tempCanvas.height = drawHeight * dpr;
          tempCanvas.style.width = `${drawWidth}px`;
          tempCanvas.style.height = `${drawHeight}px`;
          tempCtx.setTransform(1, 0, 0, 1, 0, 0);
          tempCtx.scale(dpr, dpr);
        }

        tempCtx.clearRect(0, 0, drawWidth, drawHeight);
        tempCtx.drawImage(bg, 0, 0, drawWidth, drawHeight);

        const images = await Promise.all(
          data.slice(0, selectedLayout.slots.length).map((imgData) =>
            preloadImage(imgData.imgSrc)
          )
        );

        images.forEach((img, index) => {
          const slot = selectedLayout.slots?.[index];
          if (!slot) return;
          const x = slot.x * drawWidth;
          const y = slot.y * drawHeight;
          const width = slot.width * drawWidth;
          const height = slot.height * drawHeight;
          tempCtx.filter = data[index].filter || filter || "none";
          if (selectedLayout.fit === "contain") {
            drawImageContain(tempCtx, img, x, y, width, height);
          } else {
            drawImageCover(tempCtx, img, x, y, width, height);
          }
        });

        if (selectedLayout.debugSlots) {
          drawSlotOverlay(tempCtx, selectedLayout.slots, drawWidth, drawHeight);
        }
      } else {
        const maxImages = layout.flat().reduce((a, b) => a + b, 0);
        const images = await Promise.all(
          data.slice(0, maxImages).map((imgData) => preloadImage(imgData.imgSrc))
        );

        let imgIndex = 0;
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < layout[row].length; col++) {
            if (layout[row][col] === 1 && imgIndex < images.length) {
              const x = padding + col * (imageSize + padding);
              const y = padding + row * (imageSize + padding);

              tempCtx.filter = data[imgIndex].filter || filter || "none";
              tempCtx.drawImage(images[imgIndex], x, y, imageSize, imageSize);
              imgIndex++;
            }
          }
        }
      }

      for (const sticker of stickers) {
        try {
          const stickerImg = await preloadImage(sticker.imgSrc);
          tempCtx.filter = "none";
          tempCtx.drawImage(stickerImg, sticker.x, sticker.y, sticker.width, sticker.height);
        } catch (error) {
          console.warn("Failed to load sticker:", error);
        }
      }

      if (selectedLayout.showCaption !== false) {
        tempCtx.font = "bold 16px sans-serif";
        tempCtx.fillStyle = fontColor;
        tempCtx.textAlign = "center";
        tempCtx.textBaseline = "bottom";
        tempCtx.fillText(captions[selectedLanguage], drawWidth / 2, drawHeight - 15);
      }

      const blob = await new Promise<Blob>((resolve, reject) => {
        tempCanvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Failed to create blob"));
        }, "image/png", 1.0);
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `snapcharm-${new Date().getTime()}.png`;

      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("Error downloading collage:", error);
      alert("Failed to download collage. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto p-4 flex flex-col lg:flex-row justify-center items-start mt-5 gap-8">
        <div className="w-full contain lg:w-2/3 flex justify-center">
          <Canvas
            stickers={stickers}
            bgColor={bgColor}
            activeSticker={activeSticker}
            isMoving={isMoving}
            setIsMoving={setIsMoving}
            setActiveSticker={setActiveSticker}
            setResizeData={setResizeData}
            setResizeStickerId={setResizeStickerId}
            setSelectedStickerId={setSelectedStickerId}
            selectedStickerId={selectedStickerId}
            canvasRef={canvasRef}
            containerRef={containerRef}
            fitMode={isCustomTemplate ? "full" : "default"}
            scale={isCustomTemplate ? templateScale : 1}
          />
        </div>

        <div ref={controlsRef} className="w-full lg:w-1/3 space-y-6 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Customize Your Photo</h2>
          <Caption selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
          <div>
            <BackgroundColorSelector
              setBgColor={setBgColor}
              setShowPicker1={setShowPicker1}
              predefinedColors={predefinedColors}
              showPicker1={showPicker1}
              bgColor={bgColor}
              fontColor={fontColor}
              setFontColor={setFontColor}
              showPicker={showPicker}
              setShowPicker={setShowPicker}
            />
          </div>
          <StickerUpload
            handleStickerUpload={(e) => {
              handleStickerUpload(e, setSelectedStickerId, setResizeStickerId, setStickers);
            }}
            setSelectedStickerId={setSelectedStickerId}
            selectedStickerId={selectedStickerId}
            setStickers={setStickers}
            stickers={stickers}
          />
          <ActionButton handleDownload={handleDownload} />
        </div>
      </div>
    </div>
  );
};

export default Result;
