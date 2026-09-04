/**
 * ROMATEXTILEART - 3 Curated Colorways Engine
 * Generates 3 Best-to-Best commercial textile colorways:
 * - OPN 1: Royal Emerald & Champagne Gold
 * - OPN 2: Tuscan Terracotta & Sunlit Ochre
 * - OPN 3: Midnight Cobalt & Platinum Silver
 */

export const COLORWAY_PRESETS = [
  {
    id: 'base',
    name: 'Original Design',
    code: 'BASE',
    desc: 'Master original color harmony',
    swatches: ['#333333', '#888888', '#d4af37', '#ffffff']
  },
  {
    id: 'opn1',
    name: 'OPN 1: Royal Emerald & Gold',
    code: 'OPN 1',
    desc: 'Deep forest green, warm champagne gold, bronze',
    swatches: ['#08281d', '#1b6b4e', '#d4af37', '#fdf3c6'],
    transform(r, g, b) {
      // Luminance
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      if (lum < 0.25) {
        // Deep shadows -> rich obsidian emerald
        const t = lum / 0.25;
        return [
          Math.round(8 + t * 18),
          Math.round(25 + t * 40),
          Math.round(18 + t * 25)
        ];
      } else if (lum < 0.65) {
        // Midtones -> lush jade & bronze gold
        const t = (lum - 0.25) / 0.4;
        return [
          Math.round(27 + t * 180),
          Math.round(107 + t * 65),
          Math.round(78 - t * 25)
        ];
      } else {
        // Highlights -> warm champagne ivory
        const t = (lum - 0.65) / 0.35;
        return [
          Math.round(212 + t * 40),
          Math.round(175 + t * 68),
          Math.round(55 + t * 145)
        ];
      }
    }
  },
  {
    id: 'opn2',
    name: 'OPN 2: Terracotta & Sunlit Ochre',
    code: 'OPN 2',
    desc: 'Warm Tuscan clay, desert rust, sun-drenched saffron',
    swatches: ['#2e150f', '#a8422b', '#d9822b', '#faead3'],
    transform(r, g, b) {
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      if (lum < 0.28) {
        // Deep shadows -> dark espresso terracotta
        const t = lum / 0.28;
        return [
          Math.round(46 + t * 50),
          Math.round(21 + t * 25),
          Math.round(15 + t * 15)
        ];
      } else if (lum < 0.7) {
        // Midtones -> vibrant rust & golden saffron
        const t = (lum - 0.28) / 0.42;
        return [
          Math.round(168 + t * 48),
          Math.round(66 + t * 64),
          Math.round(43 + t * 0)
        ];
      } else {
        // Highlights -> warm sunlit linen cream
        const t = (lum - 0.7) / 0.3;
        return [
          Math.round(217 + t * 33),
          Math.round(130 + t * 104),
          Math.round(43 + t * 168)
        ];
      }
    }
  },
  {
    id: 'opn3',
    name: 'OPN 3: Midnight Cobalt & Platinum',
    code: 'OPN 3',
    desc: 'Abyssal navy, electric cobalt, crisp ice platinum',
    swatches: ['#070d1e', '#14387f', '#3b82f6', '#e0ecff'],
    transform(r, g, b) {
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      if (lum < 0.26) {
        // Deep shadows -> midnight navy
        const t = lum / 0.26;
        return [
          Math.round(7 + t * 13),
          Math.round(13 + t * 30),
          Math.round(30 + t * 65)
        ];
      } else if (lum < 0.68) {
        // Midtones -> vivid royal cobalt
        const t = (lum - 0.26) / 0.42;
        return [
          Math.round(20 + t * 39),
          Math.round(56 + t * 74),
          Math.round(127 + t * 119)
        ];
      } else {
        // Highlights -> pure ice silver platinum
        const t = (lum - 0.68) / 0.32;
        return [
          Math.round(59 + t * 165),
          Math.round(130 + t * 106),
          Math.round(246 + t * 9)
        ];
      }
    }
  }
];

/**
 * Apply selected colorway to a source canvas and return new canvas
 */
export function applyColorway(sourceCanvas, colorwayId = 'base') {
  const width = sourceCanvas.width;
  const height = sourceCanvas.height;

  const outCanvas = document.createElement('canvas');
  outCanvas.width = width;
  outCanvas.height = height;
  const ctx = outCanvas.getContext('2d');

  if (colorwayId === 'base') {
    ctx.drawImage(sourceCanvas, 0, 0);
    return outCanvas;
  }

  const colorway = COLORWAY_PRESETS.find(c => c.id === colorwayId);
  if (!colorway || !colorway.transform) {
    ctx.drawImage(sourceCanvas, 0, 0);
    return outCanvas;
  }

  ctx.drawImage(sourceCanvas, 0, 0);
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3];
    if (alpha === 0) continue;

    const [newR, newG, newB] = colorway.transform(data[i], data[i + 1], data[i + 2]);
    data[i] = newR;
    data[i + 1] = newG;
    data[i + 2] = newB;
  }

  ctx.putImageData(imgData, 0, 0);
  return outCanvas;
}
