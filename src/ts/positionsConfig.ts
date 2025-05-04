import { CHARACTERS } from "./constants";

interface Coordinates {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface PositionsConfigItem {
  items?: (Coordinates & { id: string })[];
  bg: Coordinates & { id: string };
  name: string;
}

export const positionsConfig: PositionsConfigItem[] = [
  {
    name: "layer_3",
    items: [{ id: CHARACTERS.DRAK, x: 1255, y: 434, w: 352, h: 286 }],
    bg: { id: "background_3", x: 0, y: 0, w: 2800, h: 800 },
  },
  {
    name: "layer_2",
    items: [
      { id: CHARACTERS.VODNIK, x: 698, y: 411, w: 215, h: 281 },
      {
        id: CHARACTERS.CERTI_RODINKA,
        x: 1615,
        y: 402,
        w: 325,
        h: 381,
      },
      { id: CHARACTERS.DED_VSEVED, x: 2067, y: 393, w: 152, h: 216 },
      { id: CHARACTERS.JEZIBABA, x: 2404, y: 329, w: 244, h: 209 },
    ],
    bg: { id: "background_2", x: 135, y: 0, w: 2530, h: 800 },
  },
  {
    name: "layer_1",
    items: [{ id: CHARACTERS.HEJKAL, x: 1120, y: 282, w: 280, h: 241 }],
    bg: { id: "background_1", x: 341, y: 0, w: 2118, h: 800 },
  },
  {
    name: "layer_0",
    bg: { id: "background_0", x: 600, y: 0, w: 1600, h: 800 },
  },
];
