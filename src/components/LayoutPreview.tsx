import type { LayoutInfo } from "./layoutInfos";

type LayoutPreviewProps = {
  layout: number[][];
  type: LayoutInfo["type"];
  previewImage?: string;
};

export const LayoutPreview: React.FC<LayoutPreviewProps> = ({ layout, type, previewImage }) => {
  if (previewImage) {
    return (
      <img
        src={previewImage}
        alt="Layout preview"
        className="w-10 h-10 object-cover rounded-lg border border-[#e2e2e8]"
      />
    );
  }

  const rows = layout.length;
  const cols = Math.max(...layout.map((r) => r.length));
  const isStrip = type === "Strip";

  return (
    <div
      className="w-10 h-10 rounded-lg border border-[#e2e2e8] bg-white flex items-center justify-center p-1.5 overflow-hidden"
    >
      <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: isStrip ? "1fr" : `repeat(${cols}, 1fr)`,
          gap: "2px",
          width: "100%",
          height: "100%",
        }}
      >
        {layout.flatMap((row, ri) =>
          row.map((cell, ci) => (
            <div
              key={`${ri}-${ci}`}
              className={`rounded-[1px] ${cell === 1 ? "bg-[#e8356d]/25" : "bg-transparent"}`}
            />
          ))
        )}
      </div>
    </div>
  );
};
