import seedrandom from "seedrandom";
import Color from "@/modules/shared/utils/color";

function normalize(r: number, g: number, b: number) {
  const multiplier = 1 / Math.sqrt(r * r + g * g + b * b);
  return {
    r_normalize: r * multiplier,
    g_normalize: g * multiplier,
    b_normalize: b * multiplier,
  };
}

export function generateColor(seatTypeId: string) {
  const r_random = seedrandom(`red-${seatTypeId}-red-${seatTypeId}-red`);
  const g_random = seedrandom(`green-${seatTypeId}-green-${seatTypeId}-green`);
  const b_random = seedrandom(`blue-${seatTypeId}-blue-${seatTypeId}-blue`);

  const { r_normalize, g_normalize, b_normalize } = normalize(r_random(), g_random(), b_random());

  const r = Math.floor(r_normalize * 256);
  const g = Math.floor(g_normalize * 256);
  const b = Math.floor(b_normalize * 256);

  const color = new Color(r, g, b);

  return color.toHex();
}