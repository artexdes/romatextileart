/**
 * ROMATEXTILEART - Seamless Repeat Pattern Engine
 * Supports industry standard repeat layouts:
 * - Half-Drop Repeat (Standard textile offset 1/2)
 * - Straight / Grid Repeat (1:1)
 * - Brick Repeat (Horizontal 1/2 offset)
 * - Mirror / Reflected Repeat
 */

export const REPEAT_MODES = [
  { id: 'half-drop', name: 'Half-Drop (Textile Standard)', desc: 'Columns offset vertically by 50% for seamless apparel' },
  { id: 'grid', name: 'Straight Grid (1:1)', desc: 'Standard uniform repeating grid' },
  { id: 'brick', name: 'Brick By Row (50% Offset)', desc: 'Rows offset horizontally by 50%' },
  { id: 'mirror', name: 'Mirror / Kaleidoscope Repeat', desc: 'Alternating tiles mirrored horizontally & vertically' }
];

/**
 * Render seamless repeated pattern on target canvas
 */
export function renderRepeatPattern(tileCanvas, targetCanvas, options = {}) {
  const {
    mode = 'half-drop',
    scale = 1.0, // 0.25 to 2.5
    rotation = 0, // degrees
    offsetX = 0,
    offsetY = 0
  } = options;

  const ctx = targetCanvas.getContext('2d');
  const targetW = targetCanvas.width;
  const targetH = targetCanvas.height;

  ctx.clearRect(0, 0, targetW, targetH);

  // Calculate scaled tile size
  const tileBaseW = tileCanvas.width;
  const tileBaseH = tileCanvas.height;
  const tileW = Math.max(20, Math.round(tileBaseW * scale));
  const tileH = Math.max(20, Math.round(tileBaseH * scale));

  // If rotation is 0 and mode is grid, we can also use native pattern or manual tiles for full control
  // Manual tile rendering guarantees precise half-drop and mirror behavior:
  ctx.save();

  if (mode === 'grid') {
    const startX = ((offsetX % tileW) - tileW);
    const startY = ((offsetY % tileH) - tileH);

    for (let x = startX; x < targetW + tileW; x += tileW) {
      for (let y = startY; y < targetH + tileH; y += tileH) {
        ctx.drawImage(tileCanvas, x, y, tileW, tileH);
      }
    }
  } else if (mode === 'half-drop') {
    // Vertical Half-Drop: Every odd column is shifted down by tileH / 2
    const startCol = Math.floor(offsetX / tileW) - 2;
    const endCol = Math.ceil((targetW + Math.abs(offsetX)) / tileW) + 2;

    for (let col = startCol; col <= endCol; col++) {
      const colX = col * tileW + (offsetX % tileW);
      const isOddCol = Math.abs(col) % 2 === 1;
      const colShiftY = isOddCol ? tileH * 0.5 : 0;

      const startRow = Math.floor(offsetY / tileH) - 2;
      const endRow = Math.ceil((targetH + Math.abs(offsetY)) / tileH) + 2;

      for (let row = startRow; row <= endRow; row++) {
        const rowY = row * tileH + colShiftY + (offsetY % tileH);
        ctx.drawImage(tileCanvas, colX, rowY, tileW, tileH);
      }
    }
  } else if (mode === 'brick') {
    // Brick: Every odd row is shifted right by tileW / 2
    const startRow = Math.floor(offsetY / tileH) - 2;
    const endRow = Math.ceil((targetH + Math.abs(offsetY)) / tileH) + 2;

    for (let row = startRow; row <= endRow; row++) {
      const rowY = row * tileH + (offsetY % tileH);
      const isOddRow = Math.abs(row) % 2 === 1;
      const rowShiftX = isOddRow ? tileW * 0.5 : 0;

      const startCol = Math.floor(offsetX / tileW) - 2;
      const endCol = Math.ceil((targetW + Math.abs(offsetX)) / tileW) + 2;

      for (let col = startCol; col <= endCol; col++) {
        const colX = col * tileW + rowShiftX + (offsetX % tileW);
        ctx.drawImage(tileCanvas, colX, rowY, tileW, tileH);
      }
    }
  } else if (mode === 'mirror') {
    // Mirror repeat
    const startCol = Math.floor(offsetX / tileW) - 1;
    const endCol = Math.ceil((targetW + Math.abs(offsetX)) / tileW) + 1;
    const startRow = Math.floor(offsetY / tileH) - 1;
    const endRow = Math.ceil((targetH + Math.abs(offsetY)) / tileH) + 1;

    for (let col = startCol; col <= endCol; col++) {
      for (let row = startRow; row <= endRow; row++) {
        const posX = col * tileW + (offsetX % tileW);
        const posY = row * tileH + (offsetY % tileH);
        const flipH = Math.abs(col) % 2 === 1;
        const flipV = Math.abs(row) % 2 === 1;

        ctx.save();
        ctx.translate(posX + (flipH ? tileW : 0), posY + (flipV ? tileH : 0));
        ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
        ctx.drawImage(tileCanvas, 0, 0, tileW, tileH);
        ctx.restore();
      }
    }
  }

  ctx.restore();
}

/**
 * Export clean seamless master tile at requested resolution
 */
export function exportSeamlessTile(tileCanvas, size = 2048) {
  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = size;
  exportCanvas.height = size;
  const ctx = exportCanvas.getContext('2d');
  ctx.drawImage(tileCanvas, 0, 0, size, size);
  return exportCanvas.toDataURL('image/png');
}
