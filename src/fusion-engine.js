/**
 * ROMATEXTILEART - 2-Design Fusion Engine
 * Allows users to pick Design A & Design B and synthesize a brand new textile artwork.
 */

export const FUSION_MODES = [
  { id: 'botanical-mask', name: 'Organic Mask Fusion', desc: 'Design A silhouette masks Design B textures' },
  { id: 'double-exposure', name: 'Double Exposure Overlay', desc: 'Soft luminous harmonic overlay of both prints' },
  { id: 'diagonal-split', name: 'Geometric Modern Split', desc: 'Diagonal angled split collage with feathered seam' },
  { id: 'frequency-merge', name: 'Line-Art & Palette Synthesis', desc: 'Outlines of A with vibrant color palette of B' },
  { id: 'kaleidoscope-hybrid', name: 'Symmetrical Interlace', desc: 'Radial 4-way kaleidoscope combining A and B' }
];

/**
 * Perform 2-Design Fusion onto a target canvas
 */
export function fuseDesigns(canvasA, canvasB, options = {}) {
  const {
    mode = 'botanical-mask',
    balance = 0.5, // 0 = 100% A, 1 = 100% B
    blendMode = 'source-over',
    width = 1024,
    height = 1024
  } = options;

  const outCanvas = document.createElement('canvas');
  outCanvas.width = width;
  outCanvas.height = height;
  const ctx = outCanvas.getContext('2d');

  if (mode === 'double-exposure') {
    // Pass 1: Draw A
    ctx.globalAlpha = 1;
    ctx.drawImage(canvasA, 0, 0, width, height);

    // Pass 2: Draw B with selected blend and balance
    ctx.save();
    ctx.globalCompositeOperation = blendMode === 'source-over' ? 'overlay' : blendMode;
    ctx.globalAlpha = Math.min(1, Math.max(0.1, balance * 1.4));
    ctx.drawImage(canvasB, 0, 0, width, height);
    ctx.restore();

    // Pass 3: Soft light tone harmonize
    ctx.save();
    ctx.globalCompositeOperation = 'soft-light';
    ctx.globalAlpha = 0.4;
    ctx.drawImage(canvasA, 0, 0, width, height);
    ctx.restore();

  } else if (mode === 'botanical-mask') {
    // 1. Draw Design B as base
    ctx.drawImage(canvasB, 0, 0, width, height);

    // 2. Create offscreen mask from Design A
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = width;
    maskCanvas.height = height;
    const mCtx = maskCanvas.getContext('2d');
    mCtx.drawImage(canvasA, 0, 0, width, height);

    const imgData = mCtx.getImageData(0, 0, width, height);
    const data = imgData.data;
    const threshold = 110 + (balance - 0.5) * 120;

    for (let i = 0; i < data.length; i += 4) {
      // Luminance
      const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      data[i + 3] = lum > threshold ? 245 : 20;
    }
    mCtx.putImageData(imgData, 0, 0);

    // 3. Composite mask with Design A over Design B
    ctx.save();
    ctx.globalAlpha = 0.85;
    ctx.drawImage(maskCanvas, 0, 0, width, height);
    ctx.restore();

    // Subtle edge highlight
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = 0.25;
    ctx.drawImage(canvasA, 0, 0, width, height);
    ctx.restore();

  } else if (mode === 'diagonal-split') {
    // Base A
    ctx.drawImage(canvasA, 0, 0, width, height);

    // Diagonal clip for B
    ctx.save();
    ctx.beginPath();
    const splitOffset = (balance - 0.5) * (width * 0.8);
    ctx.moveTo(0, height);
    ctx.lineTo(width * 0.4 + splitOffset, 0);
    ctx.lineTo(width, 0);
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(canvasB, 0, 0, width, height);
    ctx.restore();

    // Elegant gold hairline separation seam
    ctx.save();
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.7)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(width * 0.4 + (balance - 0.5) * (width * 0.8), 0);
    ctx.stroke();
    ctx.restore();

  } else if (mode === 'frequency-merge') {
    // Draw B as rich color foundation
    ctx.drawImage(canvasB, 0, 0, width, height);

    // Extract high-pass line work from A
    const edgeCanvas = document.createElement('canvas');
    edgeCanvas.width = width;
    edgeCanvas.height = height;
    const eCtx = edgeCanvas.getContext('2d');
    eCtx.drawImage(canvasA, 0, 0, width, height);

    const aData = eCtx.getImageData(0, 0, width, height);
    const d = aData.data;

    // Simple Sobel edge filter for structural textile line art
    for (let y = 1; y < height - 1; y += 2) {
      for (let x = 1; x < width - 1; x += 2) {
        const idx = (y * width + x) * 4;
        const left = (y * width + (x - 1)) * 4;
        const right = (y * width + (x + 1)) * 4;
        const top = ((y - 1) * width + x) * 4;
        const bot = ((y + 1) * width + x) * 4;

        const diffH = Math.abs(d[right] - d[left]);
        const diffV = Math.abs(d[bot] - d[top]);
        const edge = Math.min(255, (diffH + diffV) * 2.2);

        d[idx] = edge > 40 ? 255 : 0;
        d[idx + 1] = edge > 40 ? 255 : 0;
        d[idx + 2] = edge > 40 ? 255 : 0;
        d[idx + 3] = edge > 40 ? Math.min(240, edge * 1.2) : 0;
      }
    }
    eCtx.putImageData(aData, 0, 0);

    // Overlay edges
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = 0.9;
    ctx.drawImage(edgeCanvas, 0, 0, width, height);
    ctx.restore();

  } else if (mode === 'kaleidoscope-hybrid') {
    const halfW = width / 2;
    const halfH = height / 2;

    // Quadrant 1 & 4 from A, Quadrant 2 & 3 from B
    ctx.save();
    ctx.drawImage(canvasA, 0, 0, halfW, halfH, 0, 0, halfW, halfH);
    ctx.drawImage(canvasB, halfW, 0, halfW, halfH, halfW, 0, halfW, halfH);
    ctx.drawImage(canvasB, 0, halfH, halfW, halfH, 0, halfH, halfW, halfH);
    ctx.drawImage(canvasA, halfW, halfH, halfW, halfH, halfW, halfH, halfW, halfH);

    // Center jewel blend
    const radGrad = ctx.createRadialGradient(halfW, halfH, 0, halfW, halfH, halfW);
    radGrad.addColorStop(0, 'rgba(255, 235, 180, 0.5)');
    radGrad.addColorStop(0.3, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radGrad;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  return outCanvas;
}
