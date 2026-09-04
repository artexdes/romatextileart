/**
 * ROMATEXTILEART - Photorealistic Apparel Shirt Mockup & Draping Engine
 * Accurately drapes seamless textile patterns onto a tailored Cuban/Resort button-down shirt.
 * Features realistic fabric fold shadows, cloth highlights, collar seams, and genuine buttons.
 */

export const FABRIC_TYPES = [
  { id: 'linen', name: 'Raw Linen Weave', sheen: 0.15, contrast: 1.15 },
  { id: 'silk', name: 'Silk Twill / Satin', sheen: 0.45, contrast: 1.25 },
  { id: 'cotton', name: 'Heavy Cotton Canvas', sheen: 0.1, contrast: 1.05 }
];

/**
 * Render high-fidelity draped shirt on a target canvas
 */
export function renderShirtDrape(patternCanvas, targetCanvas, options = {}) {
  const {
    scale = 0.35, // pattern scale on shirt
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

  // 1. Studio background (luxurious atelier vignette or transparent)
  if (!transparentBg) {
    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 80, w / 2, h / 2, w * 0.7);
    bgGrad.addColorStop(0, '#1c202a');
    bgGrad.addColorStop(0.6, '#13161e');
    bgGrad.addColorStop(1, '#0b0d13');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Subtle floor shadow
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(w / 2, h * 0.89, w * 0.38, h * 0.05, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.filter = 'blur(20px)';
    ctx.fill();
    ctx.restore();
  }

  // Shirt Geometry Coordinates (Normalized to scale nicely with canvas w, h)
  const cx = w / 2;
  const cy = h * 0.49;
  const sw = w * 0.78; // shirt width
  const sh = h * 0.82; // shirt height

  // 2. Build Garment Path (Cuban Collar Short-Sleeve Resort Shirt)
  const buildShirtPath = (pathCtx) => {
    pathCtx.beginPath();
    // Neck collar center back
    pathCtx.moveTo(cx - sw * 0.12, cy - sh * 0.44);
    pathCtx.quadraticCurveTo(cx, cy - sh * 0.42, cx + sw * 0.12, cy - sh * 0.44);

    // Right Shoulder
    pathCtx.quadraticCurveTo(cx + sw * 0.28, cy - sh * 0.42, cx + sw * 0.36, cy - sh * 0.36);

    // Right Sleeve Top & Cuff
    pathCtx.lineTo(cx + sw * 0.54, cy - sh * 0.14);
    pathCtx.quadraticCurveTo(cx + sw * 0.52, cy - sh * 0.04, cx + sw * 0.43, cy - sh * 0.01);
    // Underarm
    pathCtx.quadraticCurveTo(cx + sw * 0.34, cy - sh * 0.08, cx + sw * 0.31, cy - sh * 0.12);

    // Right Torso Side & Waist curve
    pathCtx.quadraticCurveTo(cx + sw * 0.30, cy + sh * 0.15, cx + sw * 0.32, cy + sh * 0.42);

    // Bottom Hem
    pathCtx.quadraticCurveTo(cx, cy + sh * 0.46, cx - sw * 0.32, cy + sh * 0.42);

    // Left Torso Side
    pathCtx.quadraticCurveTo(cx - sw * 0.30, cy + sh * 0.15, cx - sw * 0.31, cy - sh * 0.12);

    // Left Underarm & Sleeve
    pathCtx.quadraticCurveTo(cx - sw * 0.34, cy - sh * 0.08, cx - sw * 0.43, cy - sh * 0.01);
    pathCtx.quadraticCurveTo(cx - sw * 0.52, cy - sh * 0.04, cx - sw * 0.54, cy - sh * 0.14);

    // Left Shoulder
    pathCtx.lineTo(cx - sw * 0.36, cy - sh * 0.36);
    pathCtx.quadraticCurveTo(cx - sw * 0.28, cy - sh * 0.42, cx - sw * 0.12, cy - sh * 0.44);

    pathCtx.closePath();
  };

  // 3. Render Pattern draped inside the garment mask
  ctx.save();
  buildShirtPath(ctx);
  ctx.clip();

  // Pattern drape repetition
  const patternSize = Math.max(30, 512 * scale);
  const rotRad = (rotation * Math.PI) / 180;

  ctx.save();
  ctx.translate(cx + offsetX, cy + offsetY);
  ctx.rotate(rotRad);

  const startX = -w;
  const endX = w * 2;
  const startY = -h;
  const endY = h * 2;

  // Half-drop tile tiling for apparel drape
  for (let x = startX; x < endX; x += patternSize) {
    const isOdd = Math.abs(Math.floor(x / patternSize)) % 2 === 1;
    const shiftY = isOdd ? patternSize * 0.5 : 0;
    for (let y = startY; y < endY; y += patternSize) {
      ctx.drawImage(patternCanvas, x - cx, y - cy + shiftY, patternSize, patternSize);
    }
  }
  ctx.restore();

  // 4. Fabric Texture Overlay (Linen weave / Twill)
  const fabric = FABRIC_TYPES.find(f => f.id === fabricType) || FABRIC_TYPES[0];
  ctx.save();
  ctx.globalCompositeOperation = 'overlay';
  ctx.globalAlpha = 0.18;
  // Linen fine cross-hatch
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 0.8;
  for (let i = 0; i < w; i += 4) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, h);
    ctx.stroke();
  }
  for (let j = 0; j < h; j += 4) {
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(w, j);
    ctx.stroke();
  }
  ctx.restore();

  // 5. Realistic Fold Shading & Wrinkles (Multiply Layer)
  if (showShadows) {
    ctx.save();
    ctx.globalCompositeOperation = 'multiply';

    // Ambient body gradient (shading on edges/ribs)
    const bodyShadow = ctx.createRadialGradient(cx, cy + sh * 0.1, sw * 0.1, cx, cy + sh * 0.1, sw * 0.55);
    bodyShadow.addColorStop(0, 'rgba(0, 0, 0, 0)');
    bodyShadow.addColorStop(0.7, 'rgba(0, 0, 0, 0.22)');
    bodyShadow.addColorStop(1, 'rgba(0, 0, 0, 0.65)');
    ctx.fillStyle = bodyShadow;
    ctx.fillRect(0, 0, w, h);

    // Sleeve fold shadows
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.filter = 'blur(8px)';

    // Right sleeve wrinkle
    ctx.beginPath();
    ctx.moveTo(cx + sw * 0.32, cy - sh * 0.12);
    ctx.quadraticCurveTo(cx + sw * 0.42, cy - sh * 0.16, cx + sw * 0.48, cy - sh * 0.08);
    ctx.stroke();

    // Left sleeve wrinkle
    ctx.beginPath();
    ctx.moveTo(cx - sw * 0.32, cy - sh * 0.12);
    ctx.quadraticCurveTo(cx - sw * 0.42, cy - sh * 0.16, cx - sw * 0.48, cy - sh * 0.08);
    ctx.stroke();

    // Torso folds & chest drape creases
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(cx - sw * 0.18, cy + sh * 0.15);
    ctx.quadraticCurveTo(cx - sw * 0.05, cy + sh * 0.22, cx + sw * 0.08, cy + sh * 0.18);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx + sw * 0.18, cy + sh * 0.32);
    ctx.quadraticCurveTo(cx + sw * 0.02, cy + sh * 0.35, cx - sw * 0.12, cy + sh * 0.28);
    ctx.stroke();

    // Placket vertical drop shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.fillRect(cx + 6, cy - sh * 0.28, 12, sh * 0.72);

    ctx.restore();
  }

  // 6. Realistic Cloth Specular & Fold Highlights (Screen/Overlay Layer)
  if (showHighlights) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = fabric.sheen;
    ctx.filter = 'blur(12px)';

    // Chest ridge highlight
    const chestHl = ctx.createLinearGradient(cx - sw * 0.25, cy - sh * 0.1, cx + sw * 0.25, cy + sh * 0.1);
    chestHl.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    chestHl.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
    chestHl.addColorStop(1, 'rgba(255, 255, 255, 0.2)');
    ctx.fillStyle = chestHl;
    ctx.beginPath();
    ctx.ellipse(cx, cy - sh * 0.05, sw * 0.2, sh * 0.22, -0.1, 0, Math.PI * 2);
    ctx.fill();

    // Shoulder highlight
    ctx.beginPath();
    ctx.ellipse(cx - sw * 0.24, cy - sh * 0.38, sw * 0.12, 14, -0.4, 0, Math.PI * 2);
    ctx.ellipse(cx + sw * 0.24, cy - sh * 0.38, sw * 0.12, 14, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Restore clip of garment
  ctx.restore();

  // 7. Render Realistic Collar, Lapels, Placket, and Buttons on Top
  ctx.save();

  // Central Button Placket band
  const placketW = 32;
  const placketGrad = ctx.createLinearGradient(cx - placketW / 2, 0, cx + placketW / 2, 0);
  placketGrad.addColorStop(0, 'rgba(0, 0, 0, 0.35)');
  placketGrad.addColorStop(0.2, 'rgba(255, 255, 255, 0.15)');
  placketGrad.addColorStop(0.8, 'rgba(255, 255, 255, 0.05)');
  placketGrad.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
  ctx.fillStyle = placketGrad;
  ctx.fillRect(cx - placketW / 2, cy - sh * 0.24, placketW, sh * 0.69);

  // Placket topstitch seams
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 1.2;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(cx - placketW / 2 + 3, cy - sh * 0.24);
  ctx.lineTo(cx - placketW / 2 + 3, cy + sh * 0.45);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx + placketW / 2 - 3, cy - sh * 0.24);
  ctx.lineTo(cx + placketW / 2 - 3, cy + sh * 0.45);
  ctx.stroke();
  ctx.setLineDash([]);

  // Cuban / Camp Lapel Collars (Left & Right notch wings)
  const drawCollarWing = (isRight) => {
    ctx.save();
    const sign = isRight ? 1 : -1;

    ctx.beginPath();
    ctx.moveTo(cx, cy - sh * 0.41);
    ctx.lineTo(cx + sign * sw * 0.11, cy - sh * 0.44);
    ctx.lineTo(cx + sign * sw * 0.17, cy - sh * 0.35); // Upper notch
    ctx.lineTo(cx + sign * sw * 0.13, cy - sh * 0.32); // Notch indent
    ctx.lineTo(cx + sign * sw * 0.18, cy - sh * 0.22); // Lower point
    ctx.lineTo(cx + sign * 6, cy - sh * 0.25); // Placket join
    ctx.closePath();

    // Collar drop shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = sign * 4;
    ctx.shadowOffsetY = 6;

    // Collar pattern clip
    ctx.save();
    ctx.clip();
    // Re-draw pattern on collar at slightly rotated orientation for natural textile drape
    ctx.translate(cx, cy - sh * 0.32);
    ctx.rotate(sign * 0.25);
    for (let x = -sw * 0.3; x < sw * 0.3; x += patternSize) {
      for (let y = -sh * 0.2; y < sh * 0.2; y += patternSize) {
        ctx.drawImage(patternCanvas, x, y, patternSize, patternSize);
      }
    }
    // Collar lighting gradient
    const cGrad = ctx.createLinearGradient(cx, cy - sh * 0.4, cx + sign * sw * 0.18, cy - sh * 0.22);
    cGrad.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
    cGrad.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
    ctx.fillStyle = cGrad;
    ctx.fillRect(-sw * 0.3, -sh * 0.2, sw * 0.6, sh * 0.4);
    ctx.restore();

    // Stitching around collar edge
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.restore();
  };

  drawCollarWing(false); // Left
  drawCollarWing(true);  // Right

  // Interior Neck Arc (Inside back collar with designer brand label)
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx - sw * 0.11, cy - sh * 0.44);
  ctx.quadraticCurveTo(cx, cy - sh * 0.36, cx + sw * 0.11, cy - sh * 0.44);
  ctx.lineTo(cx, cy - sh * 0.32);
  ctx.closePath();
  ctx.fillStyle = '#11141c';
  ctx.fill();

  // Designer Label Tag
  const tagW = 68;
  const tagH = 26;
  ctx.fillStyle = '#0a0d14';
  ctx.fillRect(cx - tagW / 2, cy - sh * 0.42, tagW, tagH);
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 1;
  ctx.strokeRect(cx - tagW / 2, cy - sh * 0.42, tagW, tagH);

  ctx.fillStyle = '#d4af37';
  ctx.font = 'bold 8px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('ROMATEXTILEART', cx, cy - sh * 0.42 + 12);
  ctx.font = '6px Inter, sans-serif';
  ctx.fillStyle = '#aaaaaa';
  ctx.fillText('100% ARTISAN', cx, cy - sh * 0.42 + 20);
  ctx.restore();

  // 8. Mother-of-Pearl Natural Shell Buttons
  if (showButtons) {
    const buttonYs = [
      cy - sh * 0.21,
      cy - sh * 0.07,
      cy + sh * 0.08,
      cy + sh * 0.23,
      cy + sh * 0.38
    ];

    buttonYs.forEach(btnY => {
      const br = 8.5; // button radius

      ctx.save();
      ctx.translate(cx, btnY);

      // Button drop shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 3;

      // Pearl button body
      const btnGrad = ctx.createRadialGradient(-2, -2, 1, 0, 0, br);
      btnGrad.addColorStop(0, '#ffffff');
      btnGrad.addColorStop(0.7, '#e4e2dd');
      btnGrad.addColorStop(1, '#b8b4ab');
      ctx.fillStyle = btnGrad;
      ctx.beginPath();
      ctx.arc(0, 0, br, 0, Math.PI * 2);
      ctx.fill();

      // Button rim groove
      ctx.strokeStyle = '#999488';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(0, 0, br - 2.2, 0, Math.PI * 2);
      ctx.stroke();

      // 4 thread holes
      const holeD = 2.4;
      ctx.fillStyle = '#3a3832';
      [[-holeD, -holeD], [holeD, -holeD], [-holeD, holeD], [holeD, holeD]].forEach(([hx, hy]) => {
        ctx.beginPath();
        ctx.arc(hx, hy, 0.9, 0, Math.PI * 2);
        ctx.fill();
      });

      // Thread cross stitch
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(-holeD, -holeD);
      ctx.lineTo(holeD, holeD);
      ctx.moveTo(holeD, -holeD);
      ctx.lineTo(-holeD, holeD);
      ctx.stroke();

      ctx.restore();
    });
  }

  // 9. Brand Studio Stamp / Watermark
  if (showWatermark) {
    ctx.save();
    ctx.font = '600 13px Inter, sans-serif';
    ctx.fillStyle = 'rgba(212, 175, 55, 0.85)';
    ctx.textAlign = 'right';
    ctx.fillText('ROMATEXTILEART · ARTEXDES', w - 30, h - 38);
    ctx.font = '400 11px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.fillText('Pinterest · Shutterstock · Instagram Portfolio', w - 30, h - 20);
    ctx.restore();
  }

  ctx.restore();
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
