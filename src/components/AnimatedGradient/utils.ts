export function hexToRgba(hex: string): [number, number, number, number] {
  let r = 0,
    g = 0,
    b = 0,
    a = 1;

  if (hex.startsWith("rgba(")) {
    const parts = hex.slice(5, -1).split(",");
    r = parseInt(parts[0]) / 255;
    g = parseInt(parts[1]) / 255;
    b = parseInt(parts[2]) / 255;
    a = parseFloat(parts[3]);
  } else if (hex.startsWith("rgb(")) {
    const parts = hex.slice(4, -1).split(",");
    r = parseInt(parts[0]) / 255;
    g = parseInt(parts[1]) / 255;
    b = parseInt(parts[2]) / 255;
  } else if (hex.startsWith("hsla(") || hex.startsWith("hsl(")) {
    const isHsla = hex.startsWith("hsla(");
    const parts = hex.slice(isHsla ? 5 : 4, -1).split(",");
    const h = parseFloat(parts[0]) / 360;
    const s = parseFloat(parts[1]) / 100;
    const l = parseFloat(parts[2]) / 100;
    a = isHsla ? parseFloat(parts[3]) : 1;
    [r, g, b] = hslToRgb(h, s, l);
  } else if (hex.startsWith("#")) {
    const c = hex.slice(1);
    if (c.length === 3) {
      r = parseInt(c[0] + c[0], 16) / 255;
      g = parseInt(c[1] + c[1], 16) / 255;
      b = parseInt(c[2] + c[2], 16) / 255;
    } else if (c.length >= 6) {
      r = parseInt(c.slice(0, 2), 16) / 255;
      g = parseInt(c.slice(2, 4), 16) / 255;
      b = parseInt(c.slice(4, 6), 16) / 255;
      if (c.length === 8) {
        a = parseInt(c.slice(6, 8), 16) / 255;
      }
    }
  }

  return [r, g, b, a];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r, g, b];
}
