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

function hashCode(str: string) {
  let hash = 0,
    i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export function generateColor(id: string) {
  const hash = hashCode(id);
  const r_random = seedrandom(`red-${hash}-red-${id}-red-${hash}-red`);
  const g_random = seedrandom(`green-${hash}-green-${id}-green-${hash}-red`);
  const b_random = seedrandom(`blue-${hash}-blue-${id}-blue-${hash}-red`);
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
