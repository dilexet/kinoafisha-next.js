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

export function generateColor(id: string) {
  const r_random = seedrandom(`blue-${id}-red-${id}-green`);
  const g_random = seedrandom(`red-${id}-green-${id}-blue`);
  const b_random = seedrandom(`green-${id}-blue-${id}-red`);

  const { r_normalize, g_normalize, b_normalize } = normalize(
    r_random(),
    g_random(),
    b_random(),
  );

  const r = Math.floor(r_normalize * 256);
  const g = Math.floor(g_normalize * 256);
  const b = Math.floor(b_normalize * 256);

  const color = new Color(r, g, b);

  return color.toHex();
}
