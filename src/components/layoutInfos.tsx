export interface LayoutSlot {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LayoutInfo {
  id: string;
  count: number;
  description: string;
  layout: number[][];
  type: "Grid" | "Strip" | "Other";
  previewImage?: string;
  backgroundImage?: string;
  slots?: LayoutSlot[];
  showCaption?: boolean;
  debugSlots?: boolean;
  fit?: "cover" | "contain" | "stretch";
  slotPadding?: number;
}

export const layoutInfos: LayoutInfo[] = [
  {
    id: "strip-2",
    count: 2,
    description: "2 Photos",
    layout: [[1], [1]],
    type: "Strip",
  },
  {
    id: "strip-3",
    count: 3,
    description: "3 Photos",
    layout: [[1], [1], [1]],
    type: "Strip",
  },
  {
    id: "strip-4",
    count: 4,
    description: "4 Photos (Strip)",
    layout: [[1], [1], [1], [1]],
    type: "Strip",
  },
  {
    id: "grid-4",
    count: 4,
    description: "4 Photos (Grid)",
    layout: [[1, 1], [1, 1]],
    type: "Grid",
  },
  {
    id: "grid-6",
    count: 6,
    description: "6 Photos",
    layout: [[1, 1], [1, 1], [1, 1]],
    type: "Grid",
  },
  {
    id: "grid-9",
    count: 9,
    description: "9 Photos",
    layout: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
    type: "Grid",
  },
];
