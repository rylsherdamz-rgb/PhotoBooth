import type { LayoutInfo } from "./layoutInfos";

type LayoutPreviewProps = {
  layout: number[][];
  type: LayoutInfo["type"];
  previewImage?: string;
};

export const LayoutPreview: React.FC<LayoutPreviewProps> = ({
  layout,
  type,
  previewImage,
}) => {
  if (previewImage) {
    return (
      <div className="flex flex-col items-center px-2">
        <img
          src={previewImage}
          alt="Layout preview"
          className="w-20 h-28 object-cover rounded-lg border border-slate-200 shadow-sm"
        />
      </div>
    );
  }

  const rowCount = layout.length;
  const colCount = layout[0]?.length || 0;

  if (rowCount === 0 || colCount === 0) {
    return <div className="w-16 h-16 bg-slate-100 rounded-lg" />;
  }

  const isStrip = type === "Strip";

  return (
    <div className="flex flex-col scale-45 items-center px-2" style={{ position: "relative" }}>
      <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${rowCount}, 24px)`,
          gridTemplateColumns: isStrip
            ? `repeat(1, 1fr)`
            : `repeat(${colCount}, 24px)`,
          gap: "4px",
          border: "1px solid #e4e4e7",
          padding: 8,
          paddingBottom: 16,
          borderRadius: 6,
          backgroundColor: "#fff",
          minWidth: isStrip
            ? undefined
            : `${colCount * 24 + (colCount - 1) * 4 + 16 - 24}px`,
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          boxSizing: "border-box",
          position: "relative",
        }}
        role="grid"
        aria-label="Layout preview"
      >
        {layout.flatMap((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}`}
              role="gridcell"
              style={{
                width: 24,
                height: 24,
                borderRadius: 4,
                backgroundColor: cell === 1 ? "#fce7f3" : "transparent",
              }}
            />
          ))
        )}
        <span
          className="scale-50"
          style={{
            position: "absolute",
            bottom: 4,
            left: 0,
            right: 0,
            fontSize: 7,
            color: "#555",
            textAlign: "center",
            fontWeight: 500,
            userSelect: "none",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            overflow: "hidden",
            lineHeight: 1.1,
          }}
        >
          スナップチャーム
        </span>
      </div>
    </div>
  );
};