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
  fit?: "cover" | "contain";
}

const gateNewsLayout: number[][] = [
  [1, 1],
  [0, 1],
  [0, 1],
];

const gateNewsSlots: LayoutSlot[] = [
  { x: 0.075, y: 0.205, width: 0.305, height: 0.145 },
  { x: 0.405, y: 0.170, width: 0.515, height: 0.195 },
  { x: 0.405, y: 0.450, width: 0.515, height: 0.195 },
  { x: 0.405, y: 0.727, width: 0.515, height: 0.195 },
];

export const layoutInfos: LayoutInfo[] = [
  {
    id: "strip-2",
    count: 2,
    description: "2 Photos",
    layout: [
      [1],
      [1],
    ],
    type: "Strip",
  },
  {
    id: "strip-3",
    count: 3,
    description: "3 Photos",
    layout: [
      [1],
      [1],
      [1],
    ],
    type: "Strip",
  },
  {
    id: "strip-4",
    count: 4,
    description: "4 Photos (Strip)",
    layout: [
      [1],
      [1],
      [1],
      [1],
    ],
    type: "Strip",
  },
  {
    id: "grid-4",
    count: 4,
    description: "4 Photos",
    layout: [
      [1, 1],
      [1, 1],
    ],
    type: "Grid",
  },

  {
    id: "grid-6",
    count: 6,
    description: "6 Photos",
    layout: [
      [1, 1],
      [1, 1],
      [1, 1],
    ],
    type: "Grid",
  },

  {
    id: "grid-9",
    count: 9,
    description: "9 Photos",
    layout: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    type: "Grid",
  },
  {
    id: "gatenews-1",
    count: 4,
    description: "GateNews 1",
    layout: gateNewsLayout,
    type: "Other",
    previewImage: "/sample/1.png",
    backgroundImage: "/sample/1.png",
    slots: gateNewsSlots,
    showCaption: false,
    debugSlots: true,
    fit: "contain",
  },
  {
    id: "gatenews-2",
    count: 4,
    description: "GateNews 2",
    layout: gateNewsLayout,
    type: "Other",
    previewImage: "/sample/2.png",
    backgroundImage: "/sample/2.png",
    slots: gateNewsSlots,
    showCaption: false,
    debugSlots: false,
    fit: "contain",
  },
  {
    id: "gatenews-3",
    count: 4,
    description: "GateNews 3",
    layout: gateNewsLayout,
    type: "Other",
    previewImage: "/sample/3.png",
    backgroundImage: "/sample/3.png",
    slots: gateNewsSlots,
    showCaption: false,
    debugSlots: false,
    fit: "contain",
  },
  {
    id: "gatenews-4",
    count: 4,
    description: "GateNews 4",
    layout: gateNewsLayout,
    type: "Other",
    previewImage: "/sample/4.png",
    backgroundImage: "/sample/4.png",
    slots: gateNewsSlots,
    showCaption: false,
    debugSlots: false,
    fit: "contain",
  },
  {
    id: "gatenews-5",
    count: 4,
    description: "GateNews 5",
    layout: gateNewsLayout,
    type: "Other",
    previewImage: "/sample/5.png",
    backgroundImage: "/sample/5.png",
    slots: gateNewsSlots,
    showCaption: false,
    debugSlots: false,
    fit: "contain",
  },
  {
    id: "gatenews-6",
    count: 4,
    description: "GateNews 6",
    layout: gateNewsLayout,
    type: "Other",
    previewImage: "/sample/6.png",
    backgroundImage: "/sample/6.png",
    slots: gateNewsSlots,
    showCaption: false,
    debugSlots: false,
    fit: "contain",
  },
];
