/**
 * ROMATEXTILEART - Photorealistic 3D Full-Shirt Mockup & Draping Engine
 * Accurately drapes seamless textile patterns onto a tailored full-sleeve button-down shirt.
 * Features realistic fabric fold shadows, cloth highlights, genuine collar stand, and mother-of-pearl buttons.
 */

export const FABRIC_TYPES = [
  { id: 'linen', name: 'Raw Linen Weave', sheen: 0.2, contrast: 1.15 },
  { id: 'silk', name: 'Silk Twill / Satin', sheen: 0.45, contrast: 1.25 },
  { id: 'cotton', name: 'Heavy Cotton Canvas', sheen: 0.12, contrast: 1.05 }
];

export const shirtMockupAssets = {
  base: new Image(),
  mask: new Image(),
  shadows: new Image(),
  highlights: new Image(),
  buttons: new Image(),
  loaded: false
};

export function preloadShirtMockupAssets(onComplete) {
  shirtMockupAssets.base.crossOrigin = 'anonymous';
  shirtMockupAssets.mask.crossOrigin = 'anonymous';
  shirtMockupAssets.shadows.crossOrigin = 'anonymous';
  shirtMockupAssets.highlights.crossOrigin = 'anonymous';
  shirtMockupAssets.buttons.crossOrigin = 'anonymous';

  shirtMockupAssets.base.src = './assets/shirt-mockup/shirt-base.jpg';
  shirtMockupAssets.mask.src = './assets/shirt-mockup/shirt-mask.png';
  shirtMockupAssets.shadows.src = './assets/shirt-mockup/shirt-shadows.png';
  shirtMockupAssets.highlights.src = './assets/shirt-mockup/shirt-highlights.png';
  shirtMockupAssets.buttons.src = './assets/shirt-mockup/shirt-buttons.png';

  let count = 0;
  const onAssetLoad = () => {
    count++;
    if (count >= 4) {
      shirtMockupAssets.loaded = true;
      if (typeof onComplete === 'function') onComplete();
    }
  };

  shirtMockupAssets.base.onload = onAssetLoad;
  shirtMockupAssets.mask.onload = onAssetLoad;
  shirtMockupAssets.shadows.onload = onAssetLoad;
  shirtMockupAssets.highlights.onload = onAssetLoad;
  shirtMockupAssets.buttons.onload = onAssetLoad;
}

/**
 * Render high-fidelity draped shirt on a target canvas
 */
export function renderShirtDrape(patternCanvas, targetCanvas, options = {}) {
  const {
    mode = 'half-drop',
    repeatScale = 1.0,
    scale = 0.35,
    rotation = 0,
    offsetX = 0,
    offsetY = 0,
    fabricType = 'linen',
    showShadows = true,
    showHighlights = true,
    showButtons = true,
    showWatermark = true,
    transparentBg = false
  } = options;

  const w = targetCanvas.width;
  const h = targetCanvas.height;
  const ctx = targetCanvas.getContext('2d');

  ctx.clearRect(0, 0, w, h);

  // 1. Studio Backdrop (luxurious atelier vignette or transparent)
  if (!transparentBg) {
    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 80, w / 2, h / 2, w * 0.72);
    bgGrad.addColorStop(0, '#1d222e');
    bgGrad.addColorStop(0.55, '#131722');
    bgGrad.addColorStop(1, '#090b10');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Realistic ambient floor contact shadow
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(w / 2, h * 0.94, w * 0.42, h * 0.05, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.filter = 'blur(22px)';
    ctx.fill();
    ctx.restore();
  }

  if (!patternCanvas) return;

  // 2. Prepare seamless pattern buffer using the EXACT user-configured repeat mode:
  const patBuffer = document.createElement('canvas');
  patBuffer.width = w;
  patBuffer.height = h;

  // Effective tile scale combining Repeat Studio scale and Mockup Scale slider
  const effectiveTileScale = Math.max(0.08, (repeatScale || 1.0) * (scale || 0.35));

  // Tiling based on chosen repeat mode (half-drop, brick, mirror, grid)
  const tileBaseW = patternCanvas.width;
  const tileBaseH = patternCanvas.height;
  const tileW = Math.max(20, Math.round(tileBaseW * effectiveTileScale));
  const tileH = Math.max(20, Math.round(tileBaseH * effectiveTileScale));

  const pCtx = patBuffer.getContext('2d');
  pCtx.clearRect(0, 0, w, h);

  if (mode === 'grid' || mode === 'straight') {
    const startX = ((offsetX % tileW) - tileW);
    const startY = ((offsetY % tileH) - tileH);
    for (let x = startX; x < w + tileW; x += tileW) {
      for (let y = startY; y < h + tileH; y += tileH) {
        pCtx.drawImage(patternCanvas, x, y, tileW, tileH);
      }
    }
  } else if (mode === 'brick') {
    const startRow = Math.floor(offsetY / tileH) - 2;
    const endRow = Math.ceil((h + Math.abs(offsetY)) / tileH) + 2;
    for (let row = startRow; row <= endRow; row++) {
      const rowY = row * tileH + (offsetY % tileH);
      const isOddRow = Math.abs(row) % 2 === 1;
      const rowShiftX = isOddRow ? tileW * 0.5 : 0;
      const startCol = Math.floor(offsetX / tileW) - 2;
      const endCol = Math.ceil((w + Math.abs(offsetX)) / tileW) + 2;
      for (let col = startCol; col <= endCol; col++) {
        const colX = col * tileW + rowShiftX + (offsetX % tileW);
        pCtx.drawImage(patternCanvas, colX, rowY, tileW, tileH);
      }
    }
  } else if (mode === 'mirror') {
    const mCanvas = document.createElement('canvas');
    mCanvas.width = tileW * 2;
    mCanvas.height = tileH * 2;
    const mCtx = mCanvas.getContext('2d');

    mCtx.drawImage(patternCanvas, 0, 0, tileW, tileH);
    mCtx.save();
    mCtx.translate(tileW * 2, 0);
    mCtx.scale(-1, 1);
    mCtx.drawImage(patternCanvas, 0, 0, tileW, tileH);
    mCtx.restore();

    mCtx.save();
    mCtx.translate(0, tileH * 2);
    mCtx.scale(1, -1);
    mCtx.drawImage(patternCanvas, 0, 0, tileW, tileH);
    mCtx.restore();

    mCtx.save();
    mCtx.translate(tileW * 2, tileH * 2);
    mCtx.scale(-1, -1);
    mCtx.drawImage(patternCanvas, 0, 0, tileW, tileH);
    mCtx.restore();

    const mTileW = tileW * 2;
    const mTileH = tileH * 2;
    const startX = ((offsetX % mTileW) - mTileW);
    const startY = ((offsetY % mTileH) - mTileH);
    for (let x = startX; x < w + mTileW; x += mTileW) {
      for (let y = startY; y < h + mTileH; y += mTileH) {
        pCtx.drawImage(mCanvas, x, y, mTileW, mTileH);
      }
    }
  } else {
    // Default: Half-drop
    const startCol = Math.floor(offsetX / tileW) - 2;
    const endCol = Math.ceil((w + Math.abs(offsetX)) / tileW) + 2;
    for (let col = startCol; col <= endCol; col++) {
      const colX = col * tileW + (offsetX % tileW);
      const isOddCol = Math.abs(col) % 2 === 1;
      const colShiftY = isOddCol ? tileH * 0.5 : 0;
      const startRow = Math.floor(offsetY / tileH) - 2;
      const endRow = Math.ceil((h + Math.abs(offsetY)) / tileH) + 2;
      for (let row = startRow; row <= endRow; row++) {
        const rowY = row * tileH + colShiftY + (offsetY % tileH);
        pCtx.drawImage(patternCanvas, colX, rowY, tileW, tileH);
      }
    }
  }

  // Handle pattern rotation on shirt if specified
  let drapedPattern = patBuffer;
  if (rotation && rotation !== 0) {
    const rotCanvas = document.createElement('canvas');
    rotCanvas.width = w;
    rotCanvas.height = h;
    const rCtx = rotCanvas.getContext('2d');
    rCtx.save();
    rCtx.translate(w / 2, h / 2);
    rCtx.rotate((rotation * Math.PI) / 180);
    rCtx.drawImage(patBuffer, -w / 2, -h / 2);
    rCtx.restore();
    drapedPattern = rotCanvas;
  }

  // 3. 3D Photorealistic Full-Shirt Composite
  if (shirtMockupAssets.loaded || (shirtMockupAssets.mask.complete && shirtMockupAssets.mask.naturalWidth > 0)) {
    const garmentCanvas = document.createElement('canvas');
    garmentCanvas.width = w;
    garmentCanvas.height = h;
    const gCtx = garmentCanvas.getContext('2d');

    // A. Mask repeat pattern to real tailored full-sleeve shirt silhouette
    gCtx.drawImage(drapedPattern, 0, 0, w, h);
    gCtx.globalCompositeOperation = 'destination-in';
    gCtx.drawImage(shirtMockupAssets.mask, 0, 0, w, h);

    // B. Multiply 3D Fabric Wrinkles & Fold Shadows
    if (showShadows && shirtMockupAssets.shadows.complete) {
      gCtx.globalCompositeOperation = 'multiply';
      gCtx.drawImage(shirtMockupAssets.shadows, 0, 0, w, h);
    }

    // C. Screen 3D Specular Light & Cloth Sheen
    if (showHighlights && shirtMockupAssets.highlights.complete) {
      const fabric = FABRIC_TYPES.find(f => f.id === fabricType) || FABRIC_TYPES[0];
      gCtx.globalCompositeOperation = 'screen';
      gCtx.globalAlpha = fabric.sheen || 0.25;
      gCtx.drawImage(shirtMockupAssets.highlights, 0, 0, w, h);
      gCtx.globalAlpha = 1.0;
    }

    // Re-apply shirt silhouette mask to ensure zero edge bleeding from multiply/screen passes
    gCtx.globalCompositeOperation = 'destination-in';
    gCtx.drawImage(shirtMockupAssets.mask, 0, 0, w, h);

    // Draw masked & shaded 3D draped garment onto target canvas
    ctx.drawImage(garmentCanvas, 0, 0, w, h);

    // D. Genuine Mother-of-Pearl Buttons & Inner Collar Stand
    if (showButtons && shirtMockupAssets.buttons.complete && shirtMockupAssets.buttons.naturalWidth > 0) {
      ctx.save();
      ctx.drawImage(shirtMockupAssets.buttons, 0, 0, w, h);
      ctx.restore();
    }
  } else {
    // Immediate fallback while images are loading
    ctx.save();
    ctx.drawImage(drapedPattern, 0, 0, w, h);
    ctx.restore();
  }

  // 4. Atelier Brand Watermark
  if (showWatermark) {
    ctx.save();
    ctx.font = '600 13px Inter, sans-serif';
    ctx.fillStyle = 'rgba(212, 175, 55, 0.85)';
    ctx.textAlign = 'right';
    ctx.fillText('ROMATEXTILEART · ARTEXDES', w - 30, h - 38);
    ctx.font = '400 11px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.fillText('3D Tailored Bespoke Garment Draping', w - 30, h - 20);
    ctx.restore();
  }
}

/**
 * Render High-Resolution Exportable Mockup (2048 x 2048)
 */
export function exportHighResMockup(patternCanvas, options = {}) {
  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = 2048;
  exportCanvas.height = 2048;
  renderShirtDrape(patternCanvas, exportCanvas, {
    ...options,
    transparentBg: options.transparentBg || false
  });
  return exportCanvas.toDataURL('image/png');
}
