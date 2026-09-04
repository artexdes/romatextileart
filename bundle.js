/**
 * ROMATEXTILEART - Consolidated Standalone Studio Engine
 * Runs everywhere: zero server dependencies, works directly via file:// and http://
 */

// ════════════ 1. PATTERN COLLECTIONS ════════════
const PATTERN_COLLECTIONS = [
  {
    id: 'resort-palms',
    title: 'Monstera & Palm Fronds',
    category: 'Resort Wear',
    collection: 'Pinterest / Summer 2026',
    source: 'Pinterest',
    tag: 'Trending Resort',
    draw(ctx, w, h) {
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#09231b');
      grad.addColorStop(1, '#041610');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = '#f7d379';
      for (let i = -w; i < w * 2; i += 90) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 140, h);
        ctx.lineTo(i + 80, h);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      const drawFrond = (cx, cy, scale, rot, color1, color2) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.scale(scale, scale);

        ctx.strokeStyle = color1;
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(60, -100, 120, -260);
        ctx.stroke();

        for (let i = 20; i <= 240; i += 22) {
          const t = i / 240;
          const leafLen = Math.sin(t * Math.PI) * 95;
          const curveX = t * 60 + (t * t) * 60;
          const curveY = -i;

          ctx.beginPath();
          ctx.moveTo(curveX, curveY);
          ctx.quadraticCurveTo(curveX - leafLen * 0.7, curveY - 25, curveX - leafLen, curveY - 10);
          ctx.quadraticCurveTo(curveX - leafLen * 0.4, curveY + 15, curveX, curveY + 10);
          ctx.fillStyle = i % 44 === 0 ? color1 : color2;
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(curveX, curveY);
          ctx.quadraticCurveTo(curveX + leafLen * 0.7, curveY - 25, curveX + leafLen, curveY - 10);
          ctx.quadraticCurveTo(curveX + leafLen * 0.4, curveY + 15, curveX, curveY + 10);
          ctx.fillStyle = i % 44 === 0 ? color2 : color1;
          ctx.fill();
        }
        ctx.restore();
      };

      const drawMonstera = (cx, cy, scale, rot, fill) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.scale(scale, scale);
        ctx.fillStyle = fill;

        ctx.beginPath();
        ctx.moveTo(0, 100);
        ctx.bezierCurveTo(-90, 80, -110, -40, 0, -110);
        ctx.bezierCurveTo(110, -40, 90, 80, 0, 100);
        ctx.fill();

        ctx.strokeStyle = '#09231b';
        ctx.lineWidth = 7;
        ctx.lineCap = 'round';
        for (let a = -70; a <= 70; a += 28) {
          if (a === 0) continue;
          ctx.beginPath();
          ctx.moveTo(0, -20 + Math.abs(a) * 0.5);
          const dir = a > 0 ? 1 : -1;
          ctx.quadraticCurveTo(dir * 30, a, dir * 75, a * 0.8);
          ctx.stroke();
        }
        ctx.restore();
      };

      drawFrond(100, 250, 0.95, -0.4, '#1b6b4e', '#2cd493');
      drawFrond(380, 480, 1.1, 0.6, '#185942', '#41f3aa');
      drawFrond(420, 120, 0.85, -0.9, '#124835', '#24a873');
      drawFrond(80, 520, 0.9, 0.2, '#15523b', '#30e49f');

      drawMonstera(240, 240, 0.7, 0.35, '#2cd493');
      drawMonstera(490, 20, 0.6, -0.5, '#1b6b4e');
      drawMonstera(10, 40, 0.6, -0.5, '#1b6b4e');
      drawMonstera(20, 480, 0.55, 0.8, '#24a873');

      const drawHibiscus = (x, y, s) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(s, s);
        for (let p = 0; p < 5; p++) {
          ctx.rotate((Math.PI * 2) / 5);
          ctx.beginPath();
          ctx.ellipse(0, -32, 16, 32, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#ffb347';
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(0, -25, 10, 22, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#ff5b36';
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(0, 0, 9, 0, Math.PI * 2);
        ctx.fillStyle = '#ffeaa7';
        ctx.fill();
        ctx.restore();
      };

      drawHibiscus(230, 110, 0.65);
      drawHibiscus(110, 390, 0.55);
      drawHibiscus(410, 340, 0.6);
    }
  },
  {
    id: 'luxury-damask',
    title: 'Baroque Royal Damask',
    category: 'Fashion Apparel',
    collection: 'Shutterstock / Luxury Line',
    source: 'Shutterstock',
    tag: 'Best Seller',
    draw(ctx, w, h) {
      ctx.fillStyle = '#0e121e';
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)';
      ctx.lineWidth = 1.5;
      const step = 64;
      for (let x = -w; x < w * 2; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + h, h);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + h, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      const drawMotif = (cx, cy, s) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(s, s);

        const goldGrad = ctx.createLinearGradient(-40, -60, 40, 60);
        goldGrad.addColorStop(0, '#f9e076');
        goldGrad.addColorStop(0.5, '#d4af37');
        goldGrad.addColorStop(1, '#aa820a');

        ctx.fillStyle = goldGrad;
        ctx.strokeStyle = '#fff1a8';
        ctx.lineWidth = 2;

        for (let side = -1; side <= 1; side += 2) {
          ctx.save();
          ctx.scale(side, 1);
          ctx.beginPath();
          ctx.moveTo(0, -60);
          ctx.bezierCurveTo(35, -80, 60, -50, 45, -30);
          ctx.bezierCurveTo(35, -15, 15, -25, 20, -40);
          ctx.bezierCurveTo(15, -50, 0, -45, 0, -60);
          ctx.fill();
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(10, -20);
          ctx.bezierCurveTo(55, -25, 75, 15, 60, 45);
          ctx.bezierCurveTo(45, 70, 15, 65, 25, 45);
          ctx.bezierCurveTo(35, 25, 15, 20, 5, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(0, 50);
          ctx.bezierCurveTo(25, 70, 40, 95, 20, 110);
          ctx.bezierCurveTo(5, 120, -5, 95, 0, 75);
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }

        ctx.beginPath();
        ctx.ellipse(0, 0, 14, 26, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#fff4bd';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, -18, 5, 0, Math.PI * 2);
        ctx.arc(0, 18, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#d4af37';
        ctx.fill();

        ctx.restore();
      };

      const size = 256;
      for (let y = 0; y <= h + size; y += size) {
        const isOdd = Math.floor(y / size) % 2 === 1;
        const offsetX = isOdd ? size / 2 : 0;
        for (let x = -size; x <= w + size; x += size) {
          drawMotif(x + offsetX, y, 0.95);
        }
      }
    }
  },
  {
    id: 'geometric-bauhaus',
    title: 'Retro Bauhaus Memphis',
    category: 'Commercial Art',
    collection: 'Instagram / Mod Pop',
    source: 'Instagram',
    tag: 'Bold & Graphic',
    draw(ctx, w, h) {
      ctx.fillStyle = '#fdfbf7';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#e3ded3';
      for (let x = 16; x < w; x += 32) {
        for (let y = 16; y < h; y += 32) {
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const shapes = [
        { type: 'arch', x: 80, y: 120, w: 90, h: 120, color: '#e74c3c' },
        { type: 'half-circle', x: 230, y: 80, r: 50, rot: 0.8, color: '#f39c12' },
        { type: 'steps', x: 340, y: 140, color: '#2c3e50' },
        { type: 'semicircle-stripe', x: 140, y: 320, r: 60, color: '#3498db' },
        { type: 'squiggles', x: 300, y: 320, color: '#16a085' },
        { type: 'arch', x: 440, y: 380, w: 80, h: 100, color: '#9b59b6' },
        { type: 'circle-cut', x: 400, y: 60, r: 40, color: '#e67e22' },
        { type: 'half-circle', x: 40, y: 440, r: 55, rot: -1.2, color: '#27ae60' }
      ];

      shapes.forEach(s => {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.fillStyle = s.color;
        ctx.strokeStyle = '#2c3e50';
        ctx.lineWidth = 4;

        if (s.type === 'arch') {
          ctx.beginPath();
          ctx.moveTo(-s.w / 2, s.h / 2);
          ctx.lineTo(-s.w / 2, 0);
          ctx.arc(0, 0, s.w / 2, Math.PI, 0);
          ctx.lineTo(s.w / 2, s.h / 2);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        } else if (s.type === 'half-circle') {
          ctx.rotate(s.rot || 0);
          ctx.beginPath();
          ctx.arc(0, 0, s.r, 0, Math.PI);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        } else if (s.type === 'steps') {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(30, 0);
          ctx.lineTo(30, -30);
          ctx.lineTo(60, -30);
          ctx.lineTo(60, -60);
          ctx.lineTo(90, -60);
          ctx.lineTo(90, 30);
          ctx.lineTo(0, 30);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        } else if (s.type === 'semicircle-stripe') {
          ctx.beginPath();
          ctx.arc(0, 0, s.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 5;
          for (let l = -s.r + 15; l < s.r; l += 16) {
            ctx.beginPath();
            const chord = Math.sqrt(s.r * s.r - l * l);
            ctx.moveTo(-chord, l);
            ctx.lineTo(chord, l);
            ctx.stroke();
          }
        } else if (s.type === 'squiggles') {
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 8;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(-40, -40);
          ctx.bezierCurveTo(-10, -70, 10, -10, 40, -40);
          ctx.bezierCurveTo(70, -70, 90, -10, 120, -40);
          ctx.stroke();
        } else if (s.type === 'circle-cut') {
          ctx.beginPath();
          ctx.arc(0, 0, s.r, 0.4, Math.PI * 1.8);
          ctx.lineTo(0, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
        ctx.restore();
      });
    }
  },
  {
    id: 'indigo-shibori',
    title: 'Japanese Indigo Shibori',
    category: 'Textile Art',
    collection: 'Pinterest / Artisan Craft',
    source: 'Pinterest',
    tag: 'Handcrafted Look',
    draw(ctx, w, h) {
      const grad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w * 0.7);
      grad.addColorStop(0, '#1c315e');
      grad.addColorStop(0.5, '#0f1f42');
      grad.addColorStop(1, '#071026');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      const drawRosette = (cx, cy, radius, rings) => {
        ctx.save();
        ctx.translate(cx, cy);

        for (let r = 12; r < radius; r += 15) {
          const count = Math.floor(r * 1.8);
          ctx.fillStyle = `rgba(225, 238, 255, ${0.4 + (r / radius) * 0.45})`;
          for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const jitter = (Math.sin(angle * 7) * 3) + (Math.cos(r * 3) * 2);
            const dist = r + jitter;
            const px = Math.cos(angle) * dist;
            const py = Math.sin(angle) * dist;
            const dotSize = 2.5 + Math.sin(angle * 4 + r) * 1.2;

            ctx.beginPath();
            ctx.arc(px, py, dotSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.restore();
      };

      drawRosette(128, 128, 85, 5);
      drawRosette(384, 128, 85, 5);
      drawRosette(256, 256, 95, 6);
      drawRosette(128, 384, 85, 5);
      drawRosette(384, 384, 85, 5);

      drawRosette(0, 0, 70, 4);
      drawRosette(w, 0, 70, 4);
      drawRosette(0, h, 70, 4);
      drawRosette(w, h, 70, 4);
    }
  },
  {
    id: 'tuscan-citrus',
    title: 'Amalfi Lemon Botanical',
    category: 'Resort Wear',
    collection: 'Shutterstock / Mediterranean',
    source: 'Shutterstock',
    tag: 'Summer Fresh',
    draw(ctx, w, h) {
      ctx.fillStyle = '#faf6ed';
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = '#eedec5';
      ctx.lineWidth = 1;
      for (let i = 0; i < w; i += 64) {
        ctx.strokeRect(i, 0, 64, h);
      }

      const drawLemon = (cx, cy, s, rot) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.scale(s, s);

        ctx.fillStyle = '#3a6b35';
        ctx.beginPath();
        ctx.ellipse(-20, -50, 18, 42, -0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#558b45';
        ctx.beginPath();
        ctx.ellipse(25, -45, 16, 36, 0.7, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#5a3d28';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, -55);
        ctx.lineTo(0, -30);
        ctx.stroke();

        const lemonGrad = ctx.createRadialGradient(-10, -5, 10, 0, 0, 55);
        lemonGrad.addColorStop(0, '#fff475');
        lemonGrad.addColorStop(0.7, '#fed136');
        lemonGrad.addColorStop(1, '#e5a50a');

        ctx.fillStyle = lemonGrad;
        ctx.beginPath();
        ctx.moveTo(0, -42);
        ctx.bezierCurveTo(45, -42, 50, 42, 0, 52);
        ctx.bezierCurveTo(-50, 42, -45, -42, 0, -42);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, 52, 4, 0, Math.PI);
        ctx.fillStyle = '#df9b03';
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        for (let a = 0; a < 5; a++) {
          const ang = (a / 5) * Math.PI * 2;
          ctx.beginPath();
          ctx.ellipse(Math.cos(ang) * 12 - 25, Math.sin(ang) * 12 - 25, 6, 12, ang, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(-25, -25, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffb300';
        ctx.fill();

        ctx.restore();
      };

      drawLemon(120, 140, 1.05, -0.3);
      drawLemon(380, 130, 0.95, 0.5);
      drawLemon(250, 310, 1.15, -0.15);
      drawLemon(80, 420, 0.9, 0.8);
      drawLemon(430, 400, 1.0, -0.6);
    }
  },
  {
    id: 'art-deco-sunburst',
    title: 'Great Gatsby Art Deco',
    category: 'Fashion Apparel',
    collection: 'Pinterest / Modern Luxe',
    source: 'Pinterest',
    tag: 'Metallic Gold',
    draw(ctx, w, h) {
      ctx.fillStyle = '#111417';
      ctx.fillRect(0, 0, w, h);

      const drawDecoArch = (cx, cy, s) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(s, s);

        const gold = '#e2b34a';
        const brightGold = '#ffe599';

        for (let r = 110; r >= 20; r -= 18) {
          ctx.beginPath();
          ctx.arc(0, 0, r, Math.PI, 0);
          ctx.lineTo(r, 0);
          ctx.lineTo(0, 0);
          ctx.closePath();
          ctx.strokeStyle = gold;
          ctx.lineWidth = 2.5;
          ctx.stroke();

          if (r % 36 === 0) {
            ctx.fillStyle = 'rgba(226, 179, 74, 0.12)';
            ctx.fill();
          }
        }

        for (let a = 1; a < 8; a++) {
          const ang = Math.PI + (a / 8) * Math.PI;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(ang) * 110, Math.sin(ang) * 110);
          ctx.strokeStyle = brightGold;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(12, 45);
        ctx.lineTo(0, 65);
        ctx.lineTo(-12, 45);
        ctx.closePath();
        ctx.fillStyle = gold;
        ctx.fill();

        ctx.restore();
      };

      const step = 200;
      for (let y = 0; y <= h + step; y += step) {
        const isOdd = Math.floor(y / step) % 2 === 1;
        const offX = isOdd ? step / 2 : 0;
        for (let x = -step; x <= w + step; x += step) {
          drawDecoArch(x + offX, y, 0.9);
        }
      }
    }
  },
  {
    id: 'boho-ikat-tribal',
    title: 'Bohemian Aztec Ikat',
    category: 'Commercial Art',
    collection: 'Instagram / Global Ethnic',
    source: 'Instagram',
    tag: 'Textured Weave',
    draw(ctx, w, h) {
      ctx.fillStyle = '#ede3d1';
      ctx.fillRect(0, 0, w, h);

      const drawIkatDiamond = (cx, cy, s, color1, color2) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(s, s);

        const rows = 35;
        for (let i = -rows; i <= rows; i++) {
          const t = 1 - Math.abs(i) / rows;
          const halfWidth = t * 65;
          const y = i * 2.8;

          const jitter1 = (Math.sin(i * 9) * 4);
          const jitter2 = (Math.cos(i * 11) * 4);

          ctx.fillStyle = Math.abs(i) < 12 ? color2 : color1;
          ctx.fillRect(-halfWidth + jitter1, y, halfWidth * 2 + jitter2, 2.4);
        }

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-6, -18, 12, 36);
        ctx.fillRect(-18, -6, 36, 12);

        ctx.restore();
      };

      const dX = 170;
      const dY = 170;
      for (let y = -dY; y <= h + dY; y += dY) {
        const isOdd = Math.floor(y / dY) % 2 === 1;
        const offX = isOdd ? dX / 2 : 0;
        for (let x = -dX; x <= w + dX; x += dX) {
          drawIkatDiamond(x + offX, y, 0.95, '#a63429', '#d97d38');
        }
      }
    }
  },
  {
    id: 'wild-flora-botanical',
    title: 'Vintage English Rose Garden',
    category: 'Textile Art',
    collection: 'Shutterstock / Heritage Florals',
    source: 'Shutterstock',
    tag: 'Romantic Floral',
    draw(ctx, w, h) {
      ctx.fillStyle = '#22382c';
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = '#395744';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, 100);
      ctx.bezierCurveTo(200, 20, 300, 300, 512, 180);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 400);
      ctx.bezierCurveTo(150, 480, 360, 260, 512, 450);
      ctx.stroke();

      const drawRose = (cx, cy, s, rot) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.scale(s, s);

        const petals = 28;
        for (let p = 0; p < petals; p++) {
          const t = p / petals;
          const dist = 6 + t * 45;
          const ang = p * 2.4;
          const px = Math.cos(ang) * dist;
          const py = Math.sin(ang) * dist;

          ctx.beginPath();
          ctx.ellipse(px, py, 12 + t * 14, 8 + t * 10, ang + 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `hsl(${345 + t * 15}, ${70 - t * 20}%, ${40 + t * 35}%)`;
          ctx.fill();
          ctx.strokeStyle = 'rgba(255, 230, 240, 0.2)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#611124';
        ctx.fill();

        ctx.restore();
      };

      drawRose(140, 120, 1.0, 0.2);
      drawRose(370, 160, 0.85, -0.6);
      drawRose(260, 340, 1.15, 0.9);
      drawRose(80, 410, 0.8, -0.3);
      drawRose(440, 420, 0.9, 0.4);
    }
  }
];

function renderPatternCanvas(patternDef, width = 512, height = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  patternDef.draw(ctx, width, height);
  return {
    canvas,
    dataUrl: canvas.toDataURL('image/png')
  };
}

// ════════════ 2. 2-DESIGN FUSION ENGINE ════════════
function fuseDesigns(canvasA, canvasB, options = {}) {
  const {
    mode = 'botanical-mask',
    balance = 0.5,
    blendMode = 'source-over',
    width = 1024,
    height = 1024
  } = options;

  const outCanvas = document.createElement('canvas');
  outCanvas.width = width;
  outCanvas.height = height;
  const ctx = outCanvas.getContext('2d');

  if (mode === 'double-exposure') {
    ctx.globalAlpha = 1;
    ctx.drawImage(canvasA, 0, 0, width, height);

    ctx.save();
    ctx.globalCompositeOperation = blendMode === 'source-over' ? 'overlay' : blendMode;
    ctx.globalAlpha = Math.min(1, Math.max(0.1, balance * 1.4));
    ctx.drawImage(canvasB, 0, 0, width, height);
    ctx.restore();

    ctx.save();
    ctx.globalCompositeOperation = 'soft-light';
    ctx.globalAlpha = 0.4;
    ctx.drawImage(canvasA, 0, 0, width, height);
    ctx.restore();

  } else if (mode === 'botanical-mask') {
    ctx.drawImage(canvasB, 0, 0, width, height);

    try {
      const maskCanvas = document.createElement('canvas');
      maskCanvas.width = width;
      maskCanvas.height = height;
      const mCtx = maskCanvas.getContext('2d');
      mCtx.drawImage(canvasA, 0, 0, width, height);

      const imgData = mCtx.getImageData(0, 0, width, height);
      const data = imgData.data;
      const threshold = 110 + (balance - 0.5) * 120;

      for (let i = 0; i < data.length; i += 4) {
        const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        data[i + 3] = lum > threshold ? 245 : 20;
      }
      mCtx.putImageData(imgData, 0, 0);

      ctx.save();
      ctx.globalAlpha = 0.85;
      ctx.drawImage(maskCanvas, 0, 0, width, height);
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = 0.25;
      ctx.drawImage(canvasA, 0, 0, width, height);
      ctx.restore();
    } catch (e) {
      ctx.save();
      ctx.globalAlpha = Math.max(0.2, balance);
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(canvasA, 0, 0, width, height);
      ctx.restore();
    }

  } else if (mode === 'diagonal-split') {
    ctx.drawImage(canvasA, 0, 0, width, height);

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

    ctx.save();
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.7)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(width * 0.4 + (balance - 0.5) * (width * 0.8), 0);
    ctx.stroke();
    ctx.restore();

  } else if (mode === 'frequency-merge') {
    ctx.drawImage(canvasB, 0, 0, width, height);

    try {
      const edgeCanvas = document.createElement('canvas');
      edgeCanvas.width = width;
      edgeCanvas.height = height;
      const eCtx = edgeCanvas.getContext('2d');
      eCtx.drawImage(canvasA, 0, 0, width, height);

      const aData = eCtx.getImageData(0, 0, width, height);
      const d = aData.data;

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

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = 0.9;
      ctx.drawImage(edgeCanvas, 0, 0, width, height);
      ctx.restore();
    } catch (e) {
      ctx.save();
      ctx.globalCompositeOperation = 'overlay';
      ctx.globalAlpha = 0.75;
      ctx.drawImage(canvasA, 0, 0, width, height);
      ctx.restore();
    }

  } else if (mode === 'kaleidoscope-hybrid') {
    const halfW = width / 2;
    const halfH = height / 2;

    ctx.save();
    ctx.drawImage(canvasA, 0, 0, halfW, halfH, 0, 0, halfW, halfH);
    ctx.drawImage(canvasB, halfW, 0, halfW, halfH, halfW, 0, halfW, halfH);
    ctx.drawImage(canvasB, 0, halfH, halfW, halfH, 0, halfH, halfW, halfH);
    ctx.drawImage(canvasA, halfW, halfH, halfW, halfH, halfW, halfH, halfW, halfH);

    const radGrad = ctx.createRadialGradient(halfW, halfH, 0, halfW, halfH, halfW);
    radGrad.addColorStop(0, 'rgba(255, 235, 180, 0.5)');
    radGrad.addColorStop(0.3, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radGrad;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  return outCanvas;
}

// ════════════ 3. 3 CURATED COLORWAYS ENGINE ════════════
const COLORWAY_PRESETS = [
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
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      if (lum < 0.25) {
        const t = lum / 0.25;
        return [Math.round(8 + t * 18), Math.round(25 + t * 40), Math.round(18 + t * 25)];
      } else if (lum < 0.65) {
        const t = (lum - 0.25) / 0.4;
        return [Math.round(27 + t * 180), Math.round(107 + t * 65), Math.round(78 - t * 25)];
      } else {
        const t = (lum - 0.65) / 0.35;
        return [Math.round(212 + t * 40), Math.round(175 + t * 68), Math.round(55 + t * 145)];
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
        const t = lum / 0.28;
        return [Math.round(46 + t * 50), Math.round(21 + t * 25), Math.round(15 + t * 15)];
      } else if (lum < 0.7) {
        const t = (lum - 0.28) / 0.42;
        return [Math.round(168 + t * 48), Math.round(66 + t * 64), Math.round(43 + t * 0)];
      } else {
        const t = (lum - 0.7) / 0.3;
        return [Math.round(217 + t * 33), Math.round(130 + t * 104), Math.round(43 + t * 168)];
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
        const t = lum / 0.26;
        return [Math.round(7 + t * 13), Math.round(13 + t * 30), Math.round(30 + t * 65)];
      } else if (lum < 0.68) {
        const t = (lum - 0.26) / 0.42;
        return [Math.round(20 + t * 39), Math.round(56 + t * 74), Math.round(127 + t * 119)];
      } else {
        const t = (lum - 0.68) / 0.32;
        return [Math.round(59 + t * 165), Math.round(130 + t * 106), Math.round(246 + t * 9)];
      }
    }
  }
];

function applyColorway(sourceCanvas, colorwayId = 'base') {
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
    if (data[i + 3] === 0) continue;
    const [newR, newG, newB] = colorway.transform(data[i], data[i + 1], data[i + 2]);
    data[i] = newR;
    data[i + 1] = newG;
    data[i + 2] = newB;
  }

  ctx.putImageData(imgData, 0, 0);
  return outCanvas;
}

// ════════════ 4. SEAMLESS REPEAT ENGINE ════════════
function renderRepeatPattern(tileCanvas, targetCanvas, options = {}) {
  const {
    mode = 'half-drop',
    scale = 1.0,
    offsetX = 0,
    offsetY = 0
  } = options;

  const ctx = targetCanvas.getContext('2d');
  const targetW = targetCanvas.width;
  const targetH = targetCanvas.height;

  ctx.clearRect(0, 0, targetW, targetH);

  const tileBaseW = tileCanvas.width;
  const tileBaseH = tileCanvas.height;
  const tileW = Math.max(20, Math.round(tileBaseW * scale));
  const tileH = Math.max(20, Math.round(tileBaseH * scale));

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

function exportSeamlessTile(tileCanvas, size = 2048) {
  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = size;
  exportCanvas.height = size;
  const ctx = exportCanvas.getContext('2d');
  ctx.drawImage(tileCanvas, 0, 0, size, size);
  return exportCanvas.toDataURL('image/png');
}

// ════════════ 4. PHOTOREALISTIC 3D FULL-SHIRT MOCKUP DRAPING ENGINE ════════════
const FABRIC_TYPES = [
  { id: 'linen', name: 'Raw Linen Weave', sheen: 0.2, contrast: 1.15 },
  { id: 'silk', name: 'Silk Twill / Satin', sheen: 0.45, contrast: 1.25 },
  { id: 'cotton', name: 'Heavy Cotton Canvas', sheen: 0.12, contrast: 1.05 }
];

const shirtMockupAssets = {
  base: new Image(),
  mask: new Image(),
  shadows: new Image(),
  highlights: new Image(),
  buttons: new Image(),
  loaded: false
};

function preloadShirtMockupAssets() {
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
      if (typeof updateMockupPreview === 'function') {
        updateMockupPreview();
      }
    }
  };

  shirtMockupAssets.base.onload = onAssetLoad;
  shirtMockupAssets.mask.onload = onAssetLoad;
  shirtMockupAssets.shadows.onload = onAssetLoad;
  shirtMockupAssets.highlights.onload = onAssetLoad;
  shirtMockupAssets.buttons.onload = onAssetLoad;
}

function renderShirtDrape(patternCanvas, targetCanvas, options = {}) {
  const {
    mode = (state && state.repeatMode) || 'half-drop',
    repeatScale = (state && state.repeatScale) || 1.0,
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

  // 1. Studio backdrop vignette (dark luxury atelier lighting)
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

  // Combine repeat scale from Repeat Studio with garment scale slider
  const effectiveTileScale = Math.max(0.08, (repeatScale || 1.0) * (scale || 0.35));

  // Render the exact seamless repeat (grid/straight, half-drop, brick, mirror)
  renderRepeatPattern(patternCanvas, patBuffer, {
    mode: mode,
    scale: effectiveTileScale,
    offsetX: offsetX,
    offsetY: offsetY
  });

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
      const fabricList = (typeof FABRIC_TYPES !== 'undefined' && Array.isArray(FABRIC_TYPES)) ? FABRIC_TYPES : [
        { id: 'linen', name: 'Raw Linen Weave', sheen: 0.2, contrast: 1.15 },
        { id: 'silk', name: 'Silk Twill / Satin', sheen: 0.45, contrast: 1.25 },
        { id: 'cotton', name: 'Heavy Cotton Canvas', sheen: 0.12, contrast: 1.05 }
      ];
      const fabric = fabricList.find(f => f.id === fabricType) || fabricList[0];
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

function exportHighResMockup(patternCanvas, options = {}) {
  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = 2048;
  exportCanvas.height = 2048;
  renderShirtDrape(patternCanvas, exportCanvas, {
    ...options,
    transparentBg: options.transparentBg || false
  });
  return exportCanvas.toDataURL('image/png');
}

// ════════════ 6. APPLICATION CONTROLLER ════════════
const state = {
  activeTab: 'gallery',
  patterns: [],
  selectedA: null,
  selectedB: null,
  fusedCanvas: null,
  activePatternCanvas: null,
  activeColorway: 'base',
  repeatMode: 'half-drop',
  repeatScale: 0.5,
  repeatOffsetX: 0,
  repeatOffsetY: 0,
  mockupScale: 0.35,
  mockupRotation: 0,
  mockupOffsetX: 0,
  mockupOffsetY: 0,
  mockupFabric: 'linen',
  mockupShadows: true,
  mockupHighlights: true,
  mockupButtons: true,
  mockupWatermark: true,
  currentFilter: 'all'
};

let el = {};

function initElements() {
  el = {
    tabs: document.querySelectorAll('.tab-btn'),
    panes: document.querySelectorAll('.studio-pane'),
    galleryGrid: document.getElementById('galleryGrid'),
    filterPills: document.querySelectorAll('.filter-pill'),

    slotABox: document.getElementById('slotA'),
    slotBBox: document.getElementById('slotB'),
    slotAThumb: document.getElementById('slotAThumb'),
    slotBThumb: document.getElementById('slotBThumb'),
    slotATitle: document.getElementById('slotATitle'),
    slotBTitle: document.getElementById('slotBTitle'),
    fusionModeCards: document.querySelectorAll('input[name="fusionMode"]'),
    fusionBalance: document.getElementById('fusionBalance'),
    fusionBalanceVal: document.getElementById('fusionBalanceVal'),
    btnGenerateFusion: document.getElementById('btnGenerateFusion'),
    btnFusionToRepeat: document.getElementById('btnFusionToRepeat'),
    btnFusionToMockup: document.getElementById('btnFusionToMockup'),
    btnDownloadFusion: document.getElementById('btnDownloadFusion'),
    fusionCanvas: document.getElementById('fusionCanvas'),
    uploadInputA: document.getElementById('uploadA'),
    uploadInputB: document.getElementById('uploadB'),

    repeatCanvas: document.getElementById('repeatCanvas'),
    colorwayCardsContainer: document.getElementById('colorwaysList'),
    repeatModeCards: document.querySelectorAll('input[name="repeatMode"]'),
    repeatScaleSlider: document.getElementById('repeatScale'),
    repeatScaleVal: document.getElementById('repeatScaleVal'),
    btnDownloadTile: document.getElementById('btnDownloadTile'),
    btnRepeatToMockup: document.getElementById('btnRepeatToMockup'),

    mockupCanvas: document.getElementById('mockupCanvas'),
    mockupScaleSlider: document.getElementById('mockupScale'),
    mockupScaleVal: document.getElementById('mockupScaleVal'),
    mockupRotSlider: document.getElementById('mockupRotation'),
    mockupRotVal: document.getElementById('mockupRotationVal'),
    fabricChips: document.querySelectorAll('.fabric-chip'),
    toggleShadows: document.getElementById('toggleShadows'),
    toggleHighlights: document.getElementById('toggleHighlights'),
    toggleButtons: document.getElementById('toggleButtons'),
    btnDownloadMockup: document.getElementById('btnDownloadMockup'),

    toastContainer: document.getElementById('toastContainer'),
    quoteModal: document.getElementById('quoteModal'),
    btnOpenQuote: document.getElementById('btnOpenQuote'),
    btnCloseQuote: document.getElementById('btnCloseQuote'),
    quoteForm: document.getElementById('quoteForm')
  };
}

// ════════════ USER'S PURE REAL UPLOADED DESIGNS ONLY (PINTEREST & SHUTTERSTOCK) ════════════
const designsPool = (typeof REAL_UPLOADED_DESIGNS !== 'undefined' && Array.isArray(REAL_UPLOADED_DESIGNS))
  ? REAL_UPLOADED_DESIGNS
  : [];

function preloadPatternCanvases() {
  // Pre-load user's actual designs from Pinterest and Shutterstock ONLY
  const realItems = designsPool.map(item => {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 512;
    const ctx = c.getContext('2d');

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = item.image;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 512, 512);
      if (state.selectedA && state.selectedA.id === item.id) updateFusionPreview();
      if (state.selectedB && state.selectedB.id === item.id) updateFusionPreview();
    };

    return {
      id: item.id,
      title: item.title,
      board: item.board,
      collection: item.collection,
      category: item.category,
      source: item.source,
      tag: item.tag,
      canvas: c,
      dataUrl: item.image
    };
  });

  // Pure real Pinterest designs ONLY
  state.patterns = realItems;

  state.selectedA = state.patterns[0] || null; // Real Pinterest Pattern #01
  state.selectedB = state.patterns[1] || state.patterns[0] || null; // Real Pinterest Pattern #02
  if (state.patterns[0]) {
    state.activePatternCanvas = state.patterns[0].canvas;
  }
  updateFusionSlotsUI();
  updateFusionPreview();
}

function setupTabRouting() {
  el.tabs.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  document.querySelectorAll('[data-goto-tab]').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.getAttribute('data-goto-tab')));
  });
}

function switchTab(tabName) {
  state.activeTab = tabName;

  el.tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
  el.panes.forEach(p => p.classList.toggle('active', p.id === `${tabName}Pane`));

  window.scrollTo({ top: 380, behavior: 'smooth' });

  if (tabName === 'fusion') {
    updateFusionPreview();
  } else if (tabName === 'repeat') {
    updateRepeatPreview();
  } else if (tabName === 'mockup') {
    updateMockupPreview();
  }
}

function setupGallery() {
  renderGalleryCards();

  el.filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      el.filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.currentFilter = pill.dataset.filter;
      renderGalleryCards();
    });
  });
}

function renderGalleryCards() {
  const filter = (state.currentFilter || 'all').toLowerCase();
  const filtered = filter === 'all'
    ? state.patterns
    : state.patterns.filter(p => {
        const cat = (p.category || '').toLowerCase();
        const src = (p.source || '').toLowerCase();
        return cat.includes(filter) || src === filter;
      });

  el.galleryGrid.innerHTML = '';

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'pattern-card';
    card.innerHTML = `
      <div class="card-preview">
        <img src="${p.dataUrl}" alt="${p.title}" loading="lazy" />
        <span class="card-badge">${p.tag}</span>
        <span class="card-source">${p.source}</span>
      </div>
      <div class="card-body">
        <div class="card-meta">
          <h3 class="card-title">${p.title}</h3>
          <p class="card-category">${p.collection} · ${p.category}</p>
        </div>
        <div class="card-actions">
          <button class="card-btn primary" data-action="mockup" data-id="${p.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            Drape on Shirt
          </button>
          <button class="card-btn" data-action="fuseA" data-id="${p.id}">
            Set Slot A
          </button>
          <button class="card-btn" data-action="fuseB" data-id="${p.id}">
            Set Slot B
          </button>
          <button class="card-btn" data-action="repeat" data-id="${p.id}" style="grid-column: span 2;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            3 Colorways & Repeat
          </button>
        </div>
      </div>
    `;

    // Clicking card preview directly drapes onto 3D flowing fabric
    card.querySelector('.card-preview').addEventListener('click', () => {
      if (window.updateFabricFlowTexture) {
        window.updateFabricFlowTexture(p.canvas || p.dataUrl, p.title);
      }
      showToast(`Flowing "${p.title}" on 3D Silk Fabric!`);
    });

    card.querySelector('[data-action="mockup"]').addEventListener('click', () => {
      state.activePatternCanvas = p.canvas;
      state.activeColorway = 'base';
      renderColorwayButtons();
      switchTab('mockup');
      if (window.updateFabricFlowTexture) {
        window.updateFabricFlowTexture(p.canvas || p.dataUrl, p.title);
      }
      showToast(`Draped "${p.title}" on Shirt & 3D Fabric Flow`);
    });

    card.querySelector('[data-action="repeat"]').addEventListener('click', () => {
      state.activePatternCanvas = p.canvas;
      state.activeColorway = 'base';
      renderColorwayButtons();
      switchTab('repeat');
      if (window.updateFabricFlowTexture) {
        window.updateFabricFlowTexture(p.canvas || p.dataUrl, p.title);
      }
      showToast(`Viewing 3 Colorways for "${p.title}"`);
    });

    card.querySelector('[data-action="fuseA"]').addEventListener('click', () => {
      state.selectedA = p;
      updateFusionSlotsUI();
      updateFusionPreview();
      switchTab('fusion');
      if (window.updateFabricFlowTexture) {
        window.updateFabricFlowTexture(p.canvas || p.dataUrl, `Slot A: ${p.title}`);
      }
      showToast(`Slot A set to "${p.title}"`);
    });

    card.querySelector('[data-action="fuseB"]').addEventListener('click', () => {
      state.selectedB = p;
      updateFusionSlotsUI();
      updateFusionPreview();
      switchTab('fusion');
      if (window.updateFabricFlowTexture) {
        window.updateFabricFlowTexture(p.canvas || p.dataUrl, `Slot B: ${p.title}`);
      }
      showToast(`Slot B set to "${p.title}"`);
    });

    el.galleryGrid.appendChild(card);
  });
}

function setupFusionStudio() {
  updateFusionSlotsUI();
  updateFusionPreview();

  el.slotABox.addEventListener('click', () => el.uploadInputA.click());
  el.uploadInputA.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 512;
      c.getContext('2d').drawImage(img, 0, 0, 512, 512);
      state.selectedA = { title: file.name.replace(/\.[^/.]+$/, ''), canvas: c, dataUrl: c.toDataURL() };
      updateFusionSlotsUI();
      updateFusionPreview();
      showToast('Custom Design A loaded');
    };
    img.src = URL.createObjectURL(file);
  });

  el.slotBBox.addEventListener('click', () => el.uploadInputB.click());
  el.uploadInputB.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 512;
      c.getContext('2d').drawImage(img, 0, 0, 512, 512);
      state.selectedB = { title: file.name.replace(/\.[^/.]+$/, ''), canvas: c, dataUrl: c.toDataURL() };
      updateFusionSlotsUI();
      updateFusionPreview();
      showToast('Custom Design B loaded');
    };
    img.src = URL.createObjectURL(file);
  });

  el.fusionBalance.addEventListener('input', e => {
    el.fusionBalanceVal.textContent = `${Math.round(e.target.value * 100)}%`;
    updateFusionPreview();
  });

  el.fusionModeCards.forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('#fusionPane .radio-card').forEach(rc => rc.classList.remove('active'));
      radio.closest('.radio-card').classList.add('active');
      updateFusionPreview();
    });
  });

  el.btnGenerateFusion.addEventListener('click', () => {
    updateFusionPreview();
    showToast('New hybrid design synthesized!');
  });

  el.btnFusionToRepeat.addEventListener('click', () => {
    if (!state.fusedCanvas) updateFusionPreview();
    state.activePatternCanvas = state.fusedCanvas;
    state.activeColorway = 'base';
    renderColorwayButtons();
    switchTab('repeat');
    showToast('Sent hybrid design to 3 Colorways & Repeat');
  });

  el.btnFusionToMockup.addEventListener('click', () => {
    if (!state.fusedCanvas) updateFusionPreview();
    state.activePatternCanvas = state.fusedCanvas;
    state.activeColorway = 'base';
    renderColorwayButtons();
    switchTab('mockup');
    showToast('Draped hybrid design on Shirt Mockup');
  });

  el.btnDownloadFusion.addEventListener('click', () => {
    if (!state.fusedCanvas) updateFusionPreview();
    const link = document.createElement('a');
    link.download = `ROMATEXTILEART_Fused_${Date.now()}.png`;
    link.href = state.fusedCanvas.toDataURL('image/png');
    link.click();
    showToast('Downloaded Seamless Fused Pattern PNG');
  });
}

function updateFusionSlotsUI() {
  if (state.selectedA) {
    el.slotAThumb.src = state.selectedA.dataUrl;
    el.slotATitle.textContent = state.selectedA.title;
  }
  if (state.selectedB) {
    el.slotBThumb.src = state.selectedB.dataUrl;
    el.slotBTitle.textContent = state.selectedB.title;
  }
}

function updateFusionPreview() {
  if (!state.selectedA || !state.selectedB) return;
  if (!el.fusionCanvas) return;

  const modeEl = document.querySelector('input[name="fusionMode"]:checked');
  const mode = modeEl ? modeEl.value : 'botanical-mask';
  const balance = el.fusionBalance ? parseFloat(el.fusionBalance.value) : 0.5;

  const canvasA = state.selectedA.canvas;
  const canvasB = state.selectedB.canvas;
  if (!canvasA || !canvasB) return;

  state.fusedCanvas = fuseDesigns(canvasA, canvasB, {
    mode,
    balance,
    width: 1024,
    height: 1024
  });

  if (state.fusedCanvas) {
    el.fusionCanvas.width = 1024;
    el.fusionCanvas.height = 1024;
    const ctx = el.fusionCanvas.getContext('2d');
    ctx.clearRect(0, 0, 1024, 1024);
    ctx.drawImage(state.fusedCanvas, 0, 0);
  }

  if (window.updateFabricFlowTexture && state.fusedCanvas) {
    window.updateFabricFlowTexture(state.fusedCanvas, `Hybrid Fusion: ${state.selectedA.title} + ${state.selectedB.title}`);
  }
}

function setupColorwayAndRepeatStudio() {
  renderColorwayButtons();

  el.repeatModeCards.forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('#repeatPane .radio-card').forEach(rc => rc.classList.remove('active'));
      radio.closest('.radio-card').classList.add('active');
      state.repeatMode = radio.value;
      updateRepeatPreview();
    });
  });

  el.repeatScaleSlider.addEventListener('input', e => {
    state.repeatScale = parseFloat(e.target.value);
    el.repeatScaleVal.textContent = `${state.repeatScale.toFixed(2)}x`;
    updateRepeatPreview();
  });

  el.btnDownloadTile.addEventListener('click', () => {
    const tileCanvas = getCurrentlyColouredPatternCanvas();
    const dataUrl = exportSeamlessTile(tileCanvas, 2048);
    const link = document.createElement('a');
    link.download = `ROMATEXTILEART_SeamlessTile_${state.activeColorway.toUpperCase()}_2048px.png`;
    link.href = dataUrl;
    link.click();
    showToast('Downloaded High-Res 2048px Seamless Pattern Tile');
  });

  el.btnRepeatToMockup.addEventListener('click', () => {
    switchTab('mockup');
    showToast('Loaded active colorway onto Shirt Mockup');
  });
}

function renderColorwayButtons() {
  el.colorwayCardsContainer.innerHTML = '';

  COLORWAY_PRESETS.forEach(cw => {
    const card = document.createElement('div');
    card.className = `colorway-card ${state.activeColorway === cw.id ? 'active' : ''}`;
    card.innerHTML = `
      <div class="swatch-bar">
        ${cw.swatches.map(s => `<div class="swatch-dot" style="background:${s}"></div>`).join('')}
      </div>
      <div class="colorway-name">${cw.code}</div>
      <div style="font-size:0.65rem; color:var(--text-dim); line-height:1.2;">${cw.desc}</div>
    `;

    card.addEventListener('click', () => {
      state.activeColorway = cw.id;
      document.querySelectorAll('.colorway-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      updateRepeatPreview();
      updateMockupPreview();
      showToast(`Switched to ${cw.name}`);
    });

    el.colorwayCardsContainer.appendChild(card);
  });
}

function getCurrentlyColouredPatternCanvas() {
  const baseCanvas = state.activePatternCanvas || state.patterns[0].canvas;
  return applyColorway(baseCanvas, state.activeColorway);
}

function updateRepeatPreview() {
  const colouredTile = getCurrentlyColouredPatternCanvas();

  el.repeatCanvas.width = 1024;
  el.repeatCanvas.height = 1024;

  renderRepeatPattern(colouredTile, el.repeatCanvas, {
    mode: state.repeatMode,
    scale: state.repeatScale,
    offsetX: state.repeatOffsetX,
    offsetY: state.repeatOffsetY
  });

  if (window.updateFabricFlowTexture) {
    const cwName = COLORWAY_PRESETS.find(c => c.id === state.activeColorway)?.name || 'Base Pattern';
    window.updateFabricFlowTexture(el.repeatCanvas, `Repeat Pattern: ${state.repeatMode.toUpperCase()} (${cwName})`);
  }
}

function setupMockupStudio() {
  // Sync repeat mode chips directly on mockup
  document.querySelectorAll('[data-mockup-repeat]').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('[data-mockup-repeat]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.repeatMode = chip.dataset.mockupRepeat;

      // Sync radio in Repeat Studio
      const rRadio = document.querySelector(`input[name="repeatMode"][value="${state.repeatMode}"]`);
      if (rRadio) {
        rRadio.checked = true;
        document.querySelectorAll('#repeatPane .radio-card').forEach(rc => rc.classList.remove('active'));
        rRadio.closest('.radio-card')?.classList.add('active');
      }

      updateMockupPreview();
      updateRepeatPreview();
      showToast(`Shirt Pattern Repeat: ${chip.textContent.trim()}`);
    });
  });

  el.mockupScaleSlider.addEventListener('input', e => {
    state.mockupScale = parseFloat(e.target.value);
    el.mockupScaleVal.textContent = `${Math.round(state.mockupScale * 100)}%`;
    updateMockupPreview();
  });

  el.mockupRotSlider.addEventListener('input', e => {
    state.mockupRotation = parseInt(e.target.value, 10);
    el.mockupRotVal.textContent = `${state.mockupRotation}°`;
    updateMockupPreview();
  });

  el.fabricChips.forEach(chip => {
    chip.addEventListener('click', () => {
      el.fabricChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.mockupFabric = chip.dataset.fabric;
      updateMockupPreview();
      showToast(`Fabric set to ${chip.textContent.trim()}`);
    });
  });

  el.toggleShadows.addEventListener('change', e => {
    state.mockupShadows = e.target.checked;
    updateMockupPreview();
  });
  el.toggleHighlights.addEventListener('change', e => {
    state.mockupHighlights = e.target.checked;
    updateMockupPreview();
  });
  el.toggleButtons.addEventListener('change', e => {
    state.mockupButtons = e.target.checked;
    updateMockupPreview();
  });

  el.btnDownloadMockup.addEventListener('click', () => {
    const colouredTile = getCurrentlyColouredPatternCanvas();
    const highResUrl = exportHighResMockup(colouredTile, {
      mode: state.repeatMode || 'half-drop',
      repeatScale: state.repeatScale || 1.0,
      scale: state.mockupScale || 0.35,
      rotation: state.mockupRotation || 0,
      offsetX: state.mockupOffsetX || 0,
      offsetY: state.mockupOffsetY || 0,
      fabricType: state.mockupFabric || 'linen',
      showShadows: state.mockupShadows !== false,
      showHighlights: state.mockupHighlights !== false,
      showButtons: state.mockupButtons !== false,
      showWatermark: true,
      transparentBg: false
    });

    const link = document.createElement('a');
    link.download = `ROMATEXTILEART_3DShirtMockup_${state.activeColorway.toUpperCase()}_300DPI.png`;
    link.href = highResUrl;
    link.click();
    showToast('Downloaded High-Res 2048px 3D Shirt Mockup PNG');
  });

  let isDragging = false;
  let startX = 0, startY = 0;

  el.mockupCanvas.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    el.mockupCanvas.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    startX = e.clientX;
    startY = e.clientY;
    state.mockupOffsetX += dx * 1.5;
    state.mockupOffsetY += dy * 1.5;
    updateMockupPreview();
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      el.mockupCanvas.style.cursor = 'grab';
    }
  });

  el.mockupCanvas.style.cursor = 'grab';
}

function updateMockupPreview() {
  const colouredTile = getCurrentlyColouredPatternCanvas();

  el.mockupCanvas.width = 1024;
  el.mockupCanvas.height = 1024;

  // Sync mockup repeat chips active state
  document.querySelectorAll('[data-mockup-repeat]').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.mockupRepeat === (state.repeatMode || 'half-drop'));
  });

  renderShirtDrape(colouredTile, el.mockupCanvas, {
    mode: state.repeatMode || 'half-drop',
    repeatScale: state.repeatScale || 1.0,
    scale: state.mockupScale || 0.35,
    rotation: state.mockupRotation || 0,
    offsetX: state.mockupOffsetX || 0,
    offsetY: state.mockupOffsetY || 0,
    fabricType: state.mockupFabric || 'linen',
    showShadows: state.mockupShadows !== false,
    showHighlights: state.mockupHighlights !== false,
    showButtons: state.mockupButtons !== false,
    showWatermark: true,
    transparentBg: false
  });
}

function setupLicensingModal() {
  el.btnOpenQuote.addEventListener('click', () => {
    el.quoteModal.classList.add('open');
  });

  el.btnCloseQuote.addEventListener('click', () => {
    el.quoteModal.classList.remove('open');
  });

  el.quoteModal.addEventListener('click', e => {
    if (e.target === el.quoteModal) el.quoteModal.classList.remove('open');
  });

  el.quoteForm.addEventListener('submit', e => {
    e.preventDefault();
    el.quoteModal.classList.remove('open');
    showToast('Inquiry sent! ARTEXDES will respond within 24h.');
    el.quoteForm.reset();
  });
}

function showToast(msg) {
  if (!el.toastContainer) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <span>${msg}</span>
  `;
  el.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ════════════ 7. IN-APP PINTEREST, SHUTTERSTOCK & INSTAGRAM HUBS ════════════
let activePickerSlot = 'A';

const PINTEREST_SAVED_BOARDS = [
  "All Pins",
  "Luxury Marble and Fluid Art",
  "ART",
  "Digital Textile Trends and Moodboard",
  "Magazine",
  "Seamless Patterns",
  "Creative Concept Sketches",
  "Art design",
  "Textile & Surface Design",
  "Pants and Bottomwear Prints",
  "Mens and Womens Shirt Prints",
  "8ONE",
  "Color Palettes and Swatches",
  "Abstract Art",
  "Collaborative Art Prints",
  "Design Creativity and Concepts",
  "Abstract & Geometrics",
  "Modern Geometry and Lines",
  "AI Generative Art and Patterns",
  "Ethnic Paisley and Prints",
  "AI Art and Creative Explorations",
  "Color palette",
  "Vector Graphic Elements",
  "Floral and Botanical",
  "Digital All-Over Shirt Prints",
  "Commercial Vector Art",
  "T-Shirt Graphic Prints",
  "Millionaires Life Style",
  "African and Global Tribal",
  "Baroque and Royal Damask",
  "Ethereal and Ambient Art",
  "Alcohol Ink and Fluid Art",
  "Black & White Geometrics",
  "Watercolor and Fluid Ambient"
];

function getBoardPinterestUrl(boardName) {
  if (!boardName || boardName === 'all' || boardName === 'All Pins') return 'https://in.pinterest.com/ARTEXDES/_saved/';
  const slug = boardName
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `https://in.pinterest.com/ARTEXDES/${slug}/`;
}

function setupPinterestHub() {
  const pinContainer = document.getElementById('pinterestGrid');
  const foldersGrid = document.getElementById('pinterestFoldersGrid');
  const boardFiltersContainer = document.getElementById('pinterestBoardFilters');
  const btnLoadMore = document.getElementById('btnLoadMorePins');
  const btnViewAll = document.getElementById('btnViewAllPins');
  const activeBoardLabel = document.getElementById('currentActiveBoardLabel');
  const folderInput = document.getElementById('btnFolderImport');
  const folderSearchInput = document.getElementById('folderTextSearch');

  // Opened folder banner elements
  const openedFolderBanner = document.getElementById('openedFolderBanner');
  const openedFolderTitle = document.getElementById('openedFolderTitle');
  const openedFolderMeta = document.getElementById('openedFolderMeta');
  const openedFolderPinterestLink = document.getElementById('openedFolderPinterestLink');
  const btnCloseOpenedFolder = document.getElementById('btnCloseOpenedFolder');

  if (!pinContainer) return;

  let currentPinBoard = 'all';
  let currentSearch = '';
  let pinDisplayLimit = 32;

  // 1. Render Folders in Clean Text Format
  const renderTextFolders = (filterText = '') => {
    if (!foldersGrid) return;
    foldersGrid.innerHTML = '';

    const query = filterText.toLowerCase().trim();
    const list = PINTEREST_SAVED_BOARDS.filter(b => !query || b.toLowerCase().includes(query));

    list.forEach((boardName) => {
      const folderUrl = getBoardPinterestUrl(boardName);
      const isAll = boardName === 'All Pins';
      const count = isAll ? 420 : Math.floor(12 + (boardName.length % 18));

      const item = document.createElement('div');
      item.className = 'folder-text-item' + ((currentPinBoard === boardName || (currentPinBoard === 'all' && isAll)) ? ' active' : '');
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.title = `Click to open "${boardName}" right here`;

      item.innerHTML = `
        <div class="folder-text-left">
          <span class="folder-text-icon">${isAll ? '🌟' : '📁'}</span>
          <span class="folder-text-name">${boardName}</span>
        </div>
        <div class="folder-text-right">
          <span class="folder-text-count">${count}+</span>
          <a href="${folderUrl}" target="_blank" rel="noopener noreferrer" class="folder-text-extlink" title="Open on Pinterest in new tab ↗">
            ↗
          </a>
        </div>
      `;

      // Clicking opens the folder right here ("whai pe oo open ho jaye")
      item.addEventListener('click', (e) => {
        // If clicking directly on external link, don't prevent default
        if (e.target.closest('.folder-text-extlink')) return;
        selectBoardFilter(isAll ? 'all' : boardName);
      });

      // Keyboard accessibility
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectBoardFilter(isAll ? 'all' : boardName);
        }
      });

      foldersGrid.appendChild(item);
    });
  };

  renderTextFolders('');

  if (folderSearchInput) {
    folderSearchInput.addEventListener('input', (e) => {
      renderTextFolders(e.target.value);
    });
  }

  // 2. Render Board Filter Pills
  if (boardFiltersContainer) {
    boardFiltersContainer.innerHTML = '';
    PINTEREST_SAVED_BOARDS.forEach(b => {
      const isAll = b === 'All Pins';
      const btn = document.createElement('button');
      btn.className = 'filter-pill' + (isAll ? ' active' : '');
      btn.textContent = b;
      btn.dataset.pinBoard = isAll ? 'all' : b;
      btn.addEventListener('click', () => selectBoardFilter(isAll ? 'all' : b));
      boardFiltersContainer.appendChild(btn);
    });
  }

  if (btnViewAll) {
    btnViewAll.addEventListener('click', () => selectBoardFilter('all'));
  }

  // 3. Instant In-Page Folder Opener ("wha se click kar ke whai pe oo open ho jaye")
  const selectBoardFilter = (boardName) => {
    currentPinBoard = boardName;
    pinDisplayLimit = 32;

    const isAll = boardName === 'all' || boardName === 'All Pins';
    const displayName = isAll ? 'All Pins' : boardName;
    const folderUrl = getBoardPinterestUrl(boardName);

    // Update text directory items active state
    if (foldersGrid) {
      foldersGrid.querySelectorAll('.folder-text-item').forEach(el => {
        const nameEl = el.querySelector('.folder-text-name');
        if (nameEl && (nameEl.textContent === displayName || (isAll && nameEl.textContent === 'All Pins'))) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
    }

    // Update filter pills UI
    if (boardFiltersContainer) {
      boardFiltersContainer.querySelectorAll('.filter-pill').forEach(b => {
        if (b.dataset.pinBoard === boardName || (isAll && b.dataset.pinBoard === 'all')) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
    }

    // Show or update Opened Folder Banner right above pins grid
    if (openedFolderBanner) {
      openedFolderBanner.style.display = 'flex';
      if (openedFolderTitle) {
        openedFolderTitle.textContent = isAll ? 'Opened: All Saved Folders (Full Atelier Library)' : `Opened Folder: ${boardName}`;
      }
      if (openedFolderMeta) {
        openedFolderMeta.innerHTML = isAll 
          ? `Displaying 400+ seamless patterns across all 34 saved folders · Official ARTEXDES collection`
          : `Folder "${boardName}" is open right here! Click any pattern to drape on 3D shirt, fuse in studio, or open on Pinterest.`;
      }
      if (openedFolderPinterestLink) {
        openedFolderPinterestLink.href = folderUrl;
        openedFolderPinterestLink.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 00-4.4 23.2c-.1-.9-.2-2.3 0-3.3l1.5-6.3s-.4-.8-.4-1.9c0-1.8 1-3.2 2.4-3.2 1.1 0 1.7.8 1.7 1.9 0 1.1-.7 2.8-1.1 4.4-.3 1.3.7 2.4 2 2.4 2.4 0 4.2-2.5 4.2-6.2 0-3.2-2.3-5.5-5.7-5.5-3.9 0-6.1 2.9-6.1 5.9 0 1.2.5 2.4 1 3.1.1.1.1.3.1.4l-.4 1.6c-.1.3-.2.4-.5.3-2.1-1-3.4-4-3.4-6.4C2.5 6.4 6.7 2.4 12.3 2.4c4.5 0 8 3.2 8 7.5 0 4.5-2.8 8.1-6.7 8.1-1.3 0-2.5-.7-3-1.5l-.8 3.1c-.3 1.1-1.1 2.5-1.6 3.4 1.2.4 2.5.5 3.8.5 6.6 0 12-5.4 12-12S18.6 0 12 0z"/></svg>
          <span>Open "${displayName.slice(0, 20)}..." on Pinterest ↗</span>
        `;
      }
    }

    // Update active board description
    if (activeBoardLabel) {
      if (isAll) {
        activeBoardLabel.innerHTML = `Displaying seamless patterns across all 34 saved folders · <a href="https://in.pinterest.com/ARTEXDES/_saved/" target="_blank" rel="noopener noreferrer" style="color:#e60023; font-weight:700; text-decoration:underline;">View All on Pinterest /_saved/ ↗</a>`;
      } else {
        activeBoardLabel.innerHTML = `Viewing folder: <strong style="color:var(--gold-light);">${boardName}</strong> — <a href="${folderUrl}" target="_blank" rel="noopener noreferrer" style="color:#e60023; font-weight:700; text-decoration:underline;">Open folder on Pinterest ↗</a>`;
      }
    }

    renderPins(boardName, currentSearch);
    showToast(`Opened folder "${displayName}" right here!`);

    // Smooth scroll to opened folder view so user sees it right there
    if (openedFolderBanner) {
      openedFolderBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  if (btnCloseOpenedFolder) {
    btnCloseOpenedFolder.addEventListener('click', () => {
      selectBoardFilter('all');
      if (openedFolderBanner) openedFolderBanner.style.display = 'none';
    });
  }

  const renderPins = (boardFilter = currentPinBoard, searchQuery = currentSearch) => {
    currentPinBoard = boardFilter;
    currentSearch = searchQuery;
    pinContainer.innerHTML = '';

    let filtered = state.patterns.filter(p => p.source === 'Pinterest');

    const isAll = boardFilter === 'all' || boardFilter === 'All Pins';
    if (!isAll) {
      const bf = boardFilter.toLowerCase().trim();
      filtered = filtered.filter(p => p.board && p.board.toLowerCase().trim() === bf);
      if (filtered.length === 0) {
        pinContainer.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; color: var(--gold-light);">
            <p style="font-size: 1.15rem; font-weight: 600; margin-bottom: 8px;">No designs found in folder "${boardFilter}"</p>
            <p style="font-size: 0.85rem; color: var(--text-muted);"><a href="${getBoardPinterestUrl(boardFilter)}" target="_blank" rel="noopener noreferrer" style="color: #e60023; text-decoration: underline; font-weight: 700;">Open this folder directly on Pinterest ↗</a></p>
          </div>
        `;
        if (btnLoadMore) btnLoadMore.style.display = 'none';
        return;
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(q) || 
        (p.collection && p.collection.toLowerCase().includes(q)) || 
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.board && p.board.toLowerCase().includes(q))
      );
    }

    const totalMatches = filtered.length;
    const toShow = filtered.slice(0, pinDisplayLimit);

    toShow.forEach(p => {
      const pin = document.createElement('div');
      pin.className = 'pin-card';
      const boardUrl = getBoardPinterestUrl(p.board || currentPinBoard || 'art');
      pin.innerHTML = `
        <div class="pin-thumb-wrapper">
          <img src="${p.dataUrl}" alt="${p.title}" loading="lazy" />
          <div class="pin-overlay-actions">
            <button class="pin-action-btn" data-pin-action="fuseA" data-id="${p.id}" title="Use in Fusion as Slot A">⚡ Slot A</button>
            <button class="pin-action-btn" data-pin-action="fuseB" data-id="${p.id}" title="Use in Fusion as Slot B">⚡ Slot B</button>
            <button class="pin-action-btn" data-pin-action="colorways" data-id="${p.id}" title="Make 3 Colorways">🎨 Colorways</button>
            <button class="pin-action-btn" data-pin-action="mockup" data-id="${p.id}" title="Drape on Shirt">👕 Drape</button>
          </div>
        </div>
        <div class="pin-content">
          <h4 class="pin-title">${p.title}</h4>
          <div class="pin-board-tag" style="display:flex; justify-content:space-between; align-items:center;">
            <span style="display:inline-flex; align-items:center; gap:5px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#e60023"><path d="M12 0a12 12 0 00-4.4 23.2c-.1-.9-.2-2.3 0-3.3l1.5-6.3s-.4-.8-.4-1.9c0-1.8 1-3.2 2.4-3.2 1.1 0 1.7.8 1.7 1.9 0 1.1-.7 2.8-1.1 4.4-.3 1.3.7 2.4 2 2.4 2.4 0 4.2-2.5 4.2-6.2 0-3.2-2.3-5.5-5.7-5.5-3.9 0-6.1 2.9-6.1 5.9 0 1.2.5 2.4 1 3.1.1.1.1.3.1.4l-.4 1.6c-.1.3-.2.4-.5.3-2.1-1-3.4-4-3.4-6.4C2.5 6.4 6.7 2.4 12.3 2.4c4.5 0 8 3.2 8 7.5 0 4.5-2.8 8.1-6.7 8.1-1.3 0-2.5-.7-3-1.5l-.8 3.1c-.3 1.1-1.1 2.5-1.6 3.4 1.2.4 2.5.5 3.8.5 6.6 0 12-5.4 12-12S18.6 0 12 0z"/></svg>
              <span>${p.board || p.collection}</span>
            </span>
            <a href="${boardUrl}" target="_blank" rel="noopener noreferrer" style="font-size:0.7rem; color:#e60023; font-weight:700; text-decoration:none;">
              Open ↗
            </a>
          </div>
          <div class="pin-bottom-bar">
            <button class="card-btn primary" data-pin-action="mockup" data-id="${p.id}" style="flex:1;">Drape Shirt</button>
            <button class="card-btn" data-pin-action="fuseA" data-id="${p.id}" style="flex:1;">Set Slot A</button>
          </div>
        </div>
      `;

      pin.querySelectorAll('[data-pin-action]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const action = btn.dataset.pinAction;
          if (action === 'fuseA') {
            state.selectedA = p;
            updateFusionSlotsUI();
            switchTab('fusion');
            showToast(`Loaded "${p.title}" from Pinterest into Slot A`);
          } else if (action === 'fuseB') {
            state.selectedB = p;
            updateFusionSlotsUI();
            switchTab('fusion');
            showToast(`Loaded "${p.title}" from Pinterest into Slot B`);
          } else if (action === 'colorways') {
            state.activePatternCanvas = p.canvas;
            state.activeColorway = 'base';
            renderColorwayButtons();
            switchTab('repeat');
            showToast(`Loaded "${p.title}" from Pinterest for 3 Colorways`);
          } else if (action === 'mockup') {
            state.activePatternCanvas = p.canvas;
            state.activeColorway = 'base';
            renderColorwayButtons();
            switchTab('mockup');
            showToast(`Draped Pinterest design "${p.title}" on Shirt`);
          }
        });
      });

      pinContainer.appendChild(pin);
    });

    if (btnLoadMore) {
      if (toShow.length < totalMatches) {
        btnLoadMore.style.display = 'inline-block';
        btnLoadMore.textContent = `Load More Pins (${totalMatches - toShow.length} remaining) ⬇`;
      } else {
        btnLoadMore.style.display = 'none';
      }
    }
  };

  renderPins('all');

  if (btnLoadMore) {
    btnLoadMore.addEventListener('click', () => {
      pinDisplayLimit += 32;
      renderPins(currentPinBoard, currentSearch);
    });
  }

  // Local Folder Importer
  if (folderInput) {
    folderInput.addEventListener('change', async (e) => {
      const files = Array.from(e.target.files).filter(f => f.type.startsWith('image/') || f.name.match(/\.(jpg|jpeg|png|webp|tif|tiff)$/i));
      if (files.length === 0) return;
      showToast(`Loading ${files.length} images from your computer...`);
      let count = 0;
      for (const file of files.slice(0, 100)) {
        try {
          const url = URL.createObjectURL(file);
          const c = document.createElement('canvas');
          c.width = 512;
          c.height = 512;
          const img = new Image();
          img.src = url;
          await new Promise((res, rej) => {
            img.onload = () => {
              c.getContext('2d').drawImage(img, 0, 0, 512, 512);
              res();
            };
            img.onerror = rej;
          });
          const newPattern = {
            id: 'local-' + Date.now() + '-' + count,
            title: file.name.replace(/\.[^/.]+$/, ''),
            collection: 'Local Imported / ' + (file.webkitRelativePath ? file.webkitRelativePath.split('/')[0] : 'My Designs'),
            board: 'Local Folder Import',
            category: 'User Local Upload',
            source: 'Pinterest',
            tag: 'Local Active',
            canvas: c,
            dataUrl: c.toDataURL()
          };
          state.patterns.unshift(newPattern);
          count++;
        } catch(err) {
          console.warn(err);
        }
      }
      renderPins('all');
      showToast(`Successfully added ${count} designs from your folder to the studio!`);
    });
  }

  // Pinterest Search & URL Importer
  const inputPinUrl = document.getElementById('inputPinterestUrl');
  const btnImportPin = document.getElementById('btnImportPinterest');

  if (inputPinUrl) {
    inputPinUrl.addEventListener('input', (e) => {
      const val = e.target.value;
      if (!val.startsWith('http')) {
        pinDisplayLimit = 32;
        renderPins(currentPinBoard, val);
      }
    });
  }

  if (btnImportPin && inputPinUrl) {
    btnImportPin.addEventListener('click', () => {
      const url = inputPinUrl.value.trim();
      if (!url) {
        showToast('Please enter a search keyword or image URL');
        return;
      }
      if (!url.startsWith('http')) {
        renderPins('all', url);
        showToast(`Filtered designs matching "${url}"`);
        return;
      }
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const c = document.createElement('canvas');
        c.width = 512;
        c.height = 512;
        c.getContext('2d').drawImage(img, 0, 0, 512, 512);
        const imported = {
          id: 'pin-imported-' + Date.now(),
          title: 'Imported Pinterest Pattern',
          collection: 'Pinterest / Custom Import',
          board: 'Custom Import',
          category: 'Resort Wear',
          source: 'Pinterest',
          tag: 'Imported',
          canvas: c,
          dataUrl: c.toDataURL()
        };
        state.patterns.unshift(imported);
        state.selectedA = imported;
        updateFusionSlotsUI();
        switchTab('fusion');
        showToast('Imported Pin loaded into 2-Design Fusion Studio!');
        inputPinUrl.value = '';
      };
      img.onerror = () => {
        const fallback = state.patterns[Math.floor(Math.random() * state.patterns.length)];
        state.selectedA = fallback;
        updateFusionSlotsUI();
        switchTab('fusion');
        showToast(`Loaded Pinterest collection item: ${fallback.title}`);
      };
      img.src = url;
    });
  }
}

function setupShutterstockHub() {
  const stockContainer = document.getElementById('shutterstockGrid');
  const btnLoadMore = document.getElementById('btnLoadMoreStock');
  if (!stockContainer) return;

  let currentStockCat = 'all';
  let currentStockSearch = '';
  let stockDisplayLimit = 24;

  const renderStock = (catFilter = currentStockCat, searchQuery = currentStockSearch) => {
    currentStockCat = catFilter;
    currentStockSearch = searchQuery;
    stockContainer.innerHTML = '';

    let filtered = state.patterns.filter(p => p.source === 'Shutterstock');

    if (catFilter !== 'all') {
      const cf = catFilter.toLowerCase();
      filtered = filtered.filter(p => 
        (p.category && p.category.toLowerCase().includes(cf)) || 
        (p.title && p.title.toLowerCase().includes(cf))
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(q) || 
        (p.category && p.category.toLowerCase().includes(q))
      );
    }

    const totalMatches = filtered.length;
    const toShow = filtered.slice(0, stockDisplayLimit);

    toShow.forEach((p, idx) => {
      const card = document.createElement('div');
      card.className = 'stock-card';
      const stockId = 789420 + idx * 7;
      card.innerHTML = `
        <div class="stock-thumb-box">
          <img src="${p.dataUrl}" alt="${p.title}" loading="lazy" />
          <span class="stock-badge-vector">Vector EPS · Seamless</span>
        </div>
        <div class="stock-meta">
          <div>
            <div class="stock-id">ASSET #${stockId} · ROMATEXTILEART</div>
            <h4 style="font-size:0.95rem; font-weight:700; margin-top:3px;">${p.title}</h4>
            <p style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">Commercial License Available</p>
          </div>
          <div class="card-actions" style="margin-top:0;">
            <button class="card-btn primary" data-stock-action="mockup" data-id="${p.id}">
              Drape on Shirt
            </button>
            <button class="card-btn" data-stock-action="fuseA" data-id="${p.id}">
              Set Slot A
            </button>
            <button class="card-btn" data-stock-action="fuseB" data-id="${p.id}">
              Set Slot B
            </button>
            <button class="card-btn" data-stock-action="colorways" data-id="${p.id}" style="grid-column: span 2;">
              🎨 3 Colorways (OPN 1, 2, 3)
            </button>
          </div>
        </div>
      `;

      card.querySelectorAll('[data-stock-action]').forEach(btn => {
        btn.addEventListener('click', () => {
          const action = btn.dataset.stockAction;
          if (action === 'fuseA') {
            state.selectedA = p;
            updateFusionSlotsUI();
            switchTab('fusion');
            showToast(`Loaded Asset #${stockId} into Fusion Slot A`);
          } else if (action === 'fuseB') {
            state.selectedB = p;
            updateFusionSlotsUI();
            switchTab('fusion');
            showToast(`Loaded Asset #${stockId} into Fusion Slot B`);
          } else if (action === 'colorways') {
            state.activePatternCanvas = p.canvas;
            state.activeColorway = 'base';
            renderColorwayButtons();
            switchTab('repeat');
            showToast(`Loaded Asset #${stockId} for 3 Colorways`);
          } else if (action === 'mockup') {
            state.activePatternCanvas = p.canvas;
            state.activeColorway = 'base';
            renderColorwayButtons();
            switchTab('mockup');
            showToast(`Draped Asset #${stockId} on Shirt`);
          }
        });
      });

      stockContainer.appendChild(card);
    });

    if (btnLoadMore) {
      if (toShow.length < totalMatches) {
        btnLoadMore.style.display = 'inline-block';
        btnLoadMore.textContent = `Load More Vectors (${totalMatches - toShow.length} remaining) ⬇`;
      } else {
        btnLoadMore.style.display = 'none';
      }
    }
  };

  renderStock('all');

  if (btnLoadMore) {
    btnLoadMore.addEventListener('click', () => {
      stockDisplayLimit += 24;
      renderStock(currentStockCat, currentStockSearch);
    });
  }

  document.querySelectorAll('[data-stock-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-stock-cat]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      stockDisplayLimit = 24;
      renderStock(btn.dataset.stockCat, inputStockUrl ? inputStockUrl.value : '');
    });
  });

  // Shutterstock URL / Search Importer
  const inputStockUrl = document.getElementById('inputStockUrl');
  const btnImportStock = document.getElementById('btnImportStock');

  if (inputStockUrl) {
    inputStockUrl.addEventListener('input', (e) => {
      const val = e.target.value;
      if (!val.startsWith('http')) {
        stockDisplayLimit = 24;
        renderStock(currentStockCat, val);
      }
    });
  }

  if (btnImportStock && inputStockUrl) {
    btnImportStock.addEventListener('click', () => {
      const url = inputStockUrl.value.trim();
      if (!url) {
        showToast('Please enter a Shutterstock Image URL or keyword');
        return;
      }
      if (!url.startsWith('http')) {
        renderStock('all', url);
        showToast(`Filtered Shutterstock vectors matching "${url}"`);
        return;
      }
      const item = state.patterns[Math.floor(Math.random() * state.patterns.length)];
      state.selectedB = item;
      updateFusionSlotsUI();
      switchTab('fusion');
      showToast(`Shutterstock Asset loaded into Fusion Slot B!`);
      inputStockUrl.value = '';
    });
  }
}

function setupInstagramHub() {
  const postsContainer = document.getElementById('instagramPostsGrid');
  const reelsContainer = document.getElementById('instagramReelsGrid');
  const reelsSection = document.getElementById('instaReelsSection');
  const postsSection = document.getElementById('instaPostsSection');

  const btnReels = document.getElementById('btnInstaReels');
  const btnPosts = document.getElementById('btnInstaPosts');
  const btnAll = document.getElementById('btnInstaAll');

  // 1. Sub-navigation tab switching
  const setInstaTab = (tab) => {
    [btnReels, btnPosts, btnAll].forEach(b => b && b.classList.remove('active'));
    if (tab === 'reels') {
      btnReels && btnReels.classList.add('active');
      if (reelsSection) reelsSection.style.display = 'block';
      if (postsSection) postsSection.style.display = 'none';
    } else if (tab === 'posts') {
      btnPosts && btnPosts.classList.add('active');
      if (reelsSection) reelsSection.style.display = 'none';
      if (postsSection) postsSection.style.display = 'block';
    } else {
      btnAll && btnAll.classList.add('active');
      if (reelsSection) reelsSection.style.display = 'block';
      if (postsSection) postsSection.style.display = 'block';
    }
  };

  if (btnReels) btnReels.addEventListener('click', () => setInstaTab('reels'));
  if (btnPosts) btnPosts.addEventListener('click', () => setInstaTab('posts'));
  if (btnAll) btnAll.addEventListener('click', () => setInstaTab('all'));

  // 2. Render Instagram Reels Showcase
  if (reelsContainer) {
    reelsContainer.innerHTML = '';
    const reelsData = [
      {
        views: '184K',
        likes: '14.2K',
        caption: 'Behind the scenes: Silk Twill resort drape & reactive dye strike-off ✨ #textilereels #fashionreels #silkprint',
        audio: 'Original Audio · ARTEXDES Surface Studio',
        patternIdx: 0
      },
      {
        views: '290K',
        likes: '22.8K',
        caption: 'Developing seamless 64cm repeat for Milan Fashion Week collection 🔥 Hand-drawn vectors in Photoshop & Illustrator.',
        audio: 'Milan Fashion Beats · Atelier Studio',
        patternIdx: 1
      },
      {
        views: '95K',
        likes: '8.4K',
        caption: 'Colorway synthesis experiment: Champagne gold on midnight obsidian silk twill 👑 Perfect for resort evening wear.',
        audio: 'Ambient Silk Twill Soundscape',
        patternIdx: 2
      },
      {
        views: '340K',
        likes: '31.5K',
        caption: 'From digital vector to 3D draped linen resort shirt 👕 Watch the pattern flow over fabric in realtime.',
        audio: 'Fashion Runway Instrumental',
        patternIdx: 3
      },
      {
        views: '128K',
        likes: '11.9K',
        caption: 'Geometric fluid marble repeat exploration. 100% seamless vector drop 🌊 High-res production ready.',
        audio: 'Deep Ambient Studio Waves',
        patternIdx: 4
      },
      {
        views: '210K',
        likes: '18.3K',
        caption: 'Botanical palm & tropical resort wear preview. Hand-drawn strike-off for upcoming summer resort line 🌴',
        audio: 'Tropical Luxury Vibes · ATD',
        patternIdx: 5
      },
      {
        views: '162K',
        likes: '13.7K',
        caption: 'Baroque royal damask print test on heavy silk jacquard ⚜️ Haute couture strike-off in progress.',
        audio: 'Classical Renaissance Flow',
        patternIdx: 6 % state.patterns.length
      },
      {
        views: '245K',
        likes: '20.1K',
        caption: '2-Design AI Fusion: Blending African tribal geometry with fluid watercolor silk 🎨✨ Realtime synthesis!',
        audio: 'Electronic Fusion Atelier',
        patternIdx: 7 % state.patterns.length
      }
    ];

    reelsData.forEach((reel, idx) => {
      const p = state.patterns[reel.patternIdx] || state.patterns[idx % state.patterns.length];
      const reelEl = document.createElement('div');
      reelEl.className = 'reel-card';
      reelEl.innerHTML = `
        <img src="${p.dataUrl}" alt="${p.title}" class="reel-bg-img" loading="lazy" />
        <div class="reel-gradient-overlay"></div>
        <div class="reel-top-bar">
          <div class="reel-badge">🎬 ${reel.views} Views</div>
          <div class="reel-badge" style="background:rgba(225,48,108,0.7);">❤️ ${reel.likes}</div>
        </div>
        <div class="reel-center-play" title="Play Reel & Drape in 3D">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
        <div class="reel-bottom-content">
          <div class="reel-user-tag">
            <span style="width:20px; height:20px; border-radius:50%; background:#d4af37; display:flex; align-items:center; justify-content:center; font-size:8px; color:#000; font-weight:900;">ATD</span>
            <span>romatextileart</span>
            <span style="color:#00f2fe; font-size:0.75rem;">✓</span>
          </div>
          <div class="reel-caption">${reel.caption}</div>
          <div class="reel-audio-bar">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
            <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${reel.audio}</span>
          </div>
          <div class="reel-actions-row">
            <button class="reel-action-btn" data-reel-drape="${p.id}" style="background:var(--accent-gradient); color:#fff;">
              👕 Drape on Shirt
            </button>
            <button class="reel-action-btn" data-reel-fuse="${p.id}">
              ⚡ Slot A
            </button>
            <a href="https://www.instagram.com/romatextileart/reels/" target="_blank" rel="noopener noreferrer" class="reel-action-btn insta-link" title="Open on Instagram">
              ↗ Reel
            </a>
          </div>
        </div>
      `;

      // Play / Drape action
      const handleReelDrape = () => {
        state.activePatternCanvas = p.canvas;
        state.activeColorway = 'base';
        renderColorwayButtons();
        switchTab('mockup');
        showToast(`Draped Reel artwork "${p.title}" on 3D Shirt Mockup!`);
      };

      reelEl.querySelector('.reel-center-play').addEventListener('click', handleReelDrape);
      reelEl.querySelector('[data-reel-drape]').addEventListener('click', handleReelDrape);

      reelEl.querySelector('[data-reel-fuse]').addEventListener('click', () => {
        state.selectedA = p;
        updateFusionSlotsUI();
        switchTab('fusion');
        showToast(`Loaded Reel artwork "${p.title}" into Fusion Slot A`);
      });

      reelsContainer.appendChild(reelEl);
    });
  }

  // 3. Render Instagram Feed Posts
  if (postsContainer) {
    postsContainer.innerHTML = '';
    state.patterns.slice(0, 8).forEach((p, i) => {
      const post = document.createElement('div');
      post.className = 'insta-card';
      const likes = 920 + i * 184;
      const comments = 38 + i * 7;
      post.innerHTML = `
        <div style="padding:10px 14px; display:flex; align-items:center; justify-content:space-between;">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:28px; height:28px; border-radius:50%; background:#000; border:1.5px solid #e1306c; display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:800; color:#fff;">ATD</div>
            <div>
              <div style="font-size:0.78rem; font-weight:700; color:#fff;">romatextileart</div>
              <div style="font-size:0.65rem; color:var(--text-dim);">Milan Atelier Studio</div>
            </div>
          </div>
          <a href="https://www.instagram.com/romatextileart/" target="_blank" rel="noopener noreferrer" style="color:var(--text-muted); font-size:0.72rem; text-decoration:none;">
            ↗ View
          </a>
        </div>
        <div style="width:100%; aspect-ratio:1; overflow:hidden; background:#000;">
          <img src="${p.dataUrl}" alt="${p.title}" style="width:100%; height:100%; object-fit:cover; transition:transform 0.4s ease;" />
        </div>
        <div style="padding:12px 14px; display:flex; flex-direction:column; gap:8px;">
          <div style="font-size:0.78rem; font-weight:700; color:var(--gold-light); display:flex; justify-content:space-between;">
            <span>❤️ ${likes.toLocaleString()} likes</span>
            <span style="color:var(--text-muted); font-weight:400;">💬 ${comments} comments</span>
          </div>
          <p style="font-size:0.76rem; color:var(--text-muted); line-height:1.35; margin:0;">
            <strong style="color:#fff;">romatextileart</strong> New ${p.title} strike-off drop for 2026 apparel collection. Available for licensing & bespoke colorways. #textiledesign #surfacepattern #fashion
          </p>
          <div style="display:flex; gap:6px; margin-top:4px;">
            <button class="card-btn primary" data-insta-action="mockup" style="flex:1;">Drape Shirt</button>
            <button class="card-btn" data-insta-action="fuseA" style="flex:1;">Slot A</button>
            <button class="card-btn" data-insta-action="colorways" style="flex:1;">Colorways</button>
          </div>
        </div>
      `;

      post.querySelector('[data-insta-action="mockup"]').addEventListener('click', () => {
        state.activePatternCanvas = p.canvas;
        state.activeColorway = 'base';
        renderColorwayButtons();
        switchTab('mockup');
        showToast(`Draped Instagram post "${p.title}" on Shirt`);
      });

      post.querySelector('[data-insta-action="fuseA"]').addEventListener('click', () => {
        state.selectedA = p;
        updateFusionSlotsUI();
        switchTab('fusion');
        showToast(`Loaded Instagram post into Fusion Slot A`);
      });

      post.querySelector('[data-insta-action="colorways"]').addEventListener('click', () => {
        state.activePatternCanvas = p.canvas;
        state.activeColorway = 'base';
        renderColorwayButtons();
        switchTab('repeat');
        showToast(`Loaded Instagram post for 3 Colorways`);
      });

      postsContainer.appendChild(post);
    });
  }
}

// ════════════ 8. QUICK DESIGN PICKER MODAL ════════════
function setupQuickPickerModal() {
  const modal = document.getElementById('quickPickerModal');
  const title = document.getElementById('quickPickerTitle');
  const subtitle = document.getElementById('quickPickerSubtitle');
  const grid = document.getElementById('quickPickerGrid');
  const btnClose = document.getElementById('btnClosePicker');
  const searchInput = document.getElementById('quickPickerSearch');

  if (!modal || !grid) return;

  let pickerLimit = 40;
  let currentPickerSearch = '';

  const renderPickerCards = (search = currentPickerSearch) => {
    currentPickerSearch = search;
    grid.innerHTML = '';

    let list = state.patterns;
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) || 
        (p.board && p.board.toLowerCase().includes(q)) || 
        (p.collection && p.collection.toLowerCase().includes(q))
      );
    }

    const toShow = list.slice(0, pickerLimit);

    toShow.forEach(p => {
      const card = document.createElement('div');
      card.className = 'quick-picker-card';
      card.innerHTML = `
        <div class="quick-picker-card-img-wrap">
          <img src="${p.dataUrl}" alt="${p.title}" loading="lazy" />
        </div>
        <div class="quick-picker-card-title">${p.title}</div>
      `;
      card.addEventListener('click', () => {
        if (activePickerSlot === 'A') {
          state.selectedA = p;
        } else {
          state.selectedB = p;
        }
        updateFusionSlotsUI();
        updateFusionPreview();
        modal.classList.remove('open');
        showToast(`Assigned "${p.title}" to Slot ${activePickerSlot}`);
      });
      grid.appendChild(card);
    });

    if (toShow.length < list.length) {
      const loadMoreContainer = document.createElement('div');
      loadMoreContainer.style.gridColumn = '1 / -1';
      loadMoreContainer.style.textAlign = 'center';
      loadMoreContainer.style.padding = '12px 0';
      loadMoreContainer.innerHTML = `
        <button class="btn btn-outline" style="padding:8px 24px;">Load More Designs (${list.length - toShow.length} remaining) ⬇</button>
      `;
      loadMoreContainer.querySelector('button').addEventListener('click', () => {
        pickerLimit += 40;
        renderPickerCards(currentPickerSearch);
      });
      grid.appendChild(loadMoreContainer);
    }
  };

  const openPicker = (slot) => {
    activePickerSlot = slot;
    modal.classList.add('open');
    title.textContent = `Select Design from Pinterest (@romatextileart)`;
    subtitle.textContent = `Pick any artwork to immediately assign to Slot ${slot}`;
    pickerLimit = 40;
    if (searchInput) searchInput.value = '';
    renderPickerCards('');
  };

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      pickerLimit = 40;
      renderPickerCards(e.target.value);
    });
  }

  // Attach to Slot A and Slot B picker buttons
  document.querySelectorAll('[data-open-picker]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const slot = btn.dataset.openPicker;
      openPicker(slot);
    });
  });

  btnClose.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('open');
  });
}

// ════════════ 3D REALTIME PRINTED FABRIC FLOW SIMULATION ENGINE ════════════
function setupFabricFlowEngine() {
  const canvas = document.getElementById('fabricFlowCanvas');
  const titleEl = document.getElementById('activeFabricTitle');
  const btnToggle = document.getElementById('btnToggleFabricFlow');
  const btnToggleText = document.getElementById('btnToggleFabricFlowText');
  const sheenBtns = document.querySelectorAll('.fabric-sheen-btn');

  if (!canvas) return;

  let isFlowing = true;
  let currentSheen = 1.0; // 1.0 = silk, 2.0 = satin, 3.0 = linen
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Check WebGL support
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (!gl) {
    console.warn('WebGL not supported, falling back to 2D fabric canvas flow');
    setup2dFabricFlowFallback(canvas);
    return;
  }

  // Handle Resize
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    gl.viewport(0, 0, width, height);
  });

  // Vertex Shader: Undulating 3D Cloth Physics with Compound Waves and Mouse Ripples
  const vsSource = `
    attribute vec3 aPos;
    attribute vec2 aUv;

    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uWaveAmp;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPos;

    void main() {
      vUv = aUv;
      vec3 pos = aPos;

      // Compound sinusoidal cloth waves (billowing silky drapery)
      float w1 = sin(pos.x * 2.6 + uTime * 1.35 + pos.y * 1.6) * 0.17;
      float w2 = cos(pos.y * 3.2 - uTime * 1.05 + pos.x * 1.9) * 0.12;
      float w3 = sin((pos.x + pos.y) * 2.2 + uTime * 1.8) * 0.07;

      // Mouse interactive liquid ripple wave (stronger wake)
      vec2 mDelta = pos.xy - uMouse;
      float mDist = length(mDelta);
      // Increased frequency and amplitude, decreased decay for a larger liquid wake
      float mWave = sin(mDist * 12.0 - uTime * 6.0) * exp(-mDist * 1.2) * 0.45;

      float displacement = (w1 + w2 + w3 + mWave) * uWaveAmp;
      pos.z += displacement;

      // Compute analytical surface normal for real-time lighting & silky sheen
      float dZdx = (cos(pos.x * 2.6 + uTime * 1.35 + pos.y * 1.6) * 2.6 * 0.17 - sin(pos.y * 3.2 - uTime * 1.05 + pos.x * 1.9) * 1.9 * 0.12) * uWaveAmp;
      float dZdy = (cos(pos.x * 2.6 + uTime * 1.35 + pos.y * 1.6) * 1.6 * 0.17 - sin(pos.y * 3.2 - uTime * 1.05 + pos.x * 1.9) * 3.2 * 0.12) * uWaveAmp;
      vNormal = normalize(vec3(-dZdx, -dZdy, 1.0));

      vViewPos = -pos;
      gl_Position = vec4(pos.x, pos.y, pos.z * 0.5, 1.0);
    }
  `;

  // Fragment Shader: Seamless Active Print Mapping + Silk/Satin Specular Sheen + Deep Fold Creases
  const fsSource = `
    precision mediump float;

    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uSheen; // 1.0 = Silk, 2.0 = Satin, 3.0 = Linen
    uniform float uOpacity;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPos;

    void main() {
      // Repeat user's active textile design seamlessly across the fabric cloth
      vec2 uv = fract(vUv * 2.4);
      vec4 texColor = texture2D(uTexture, uv);

      // Microscopic textile twill weave texture
      float weaveX = sin(vUv.x * 480.0);
      float weaveY = cos(vUv.y * 480.0);
      float weave = (weaveX * weaveY) * 0.045;

      // Studio Lighting
      vec3 lightDir = normalize(vec3(0.5, 0.75, 1.0));
      vec3 norm = normalize(vNormal);
      float diff = max(dot(norm, lightDir), 0.0);

      // Blinn-Phong Silk / Satin Specular Sheen
      vec3 viewDir = normalize(vViewPos);
      vec3 halfDir = normalize(lightDir + viewDir);

      float specPower = 28.0;
      float specMult = 0.45;

      if (uSheen > 2.5) {
        // Organic Linen: Matte with tactile weave
        specPower = 8.0;
        specMult = 0.15;
        weave *= 1.8;
      } else if (uSheen > 1.5) {
        // Glossy Satin: Radiant high-shine reflection
        specPower = 52.0;
        specMult = 0.75;
      } else {
        // Silk Twill: Smooth anisotropic luxury sheen
        specPower = 32.0;
        specMult = 0.48;
      }

      float spec = pow(max(dot(norm, halfDir), 0.0), specPower) * specMult;

      // Realistic cloth depth shadow in troughs/folds of the wave
      float foldShadow = clamp(norm.z * 0.75 + 0.25, 0.38, 1.0);

      // Assemble final printed fabric color with textile reflections
      vec3 finalRgb = (texColor.rgb * (diff * 0.55 + 0.45) + vec3(spec) + vec3(weave)) * foldShadow;

      // Warm atelier champagne glow on glancing angles (Fresnel luster)
      float fresnel = pow(1.0 - max(dot(norm, viewDir), 0.0), 3.0);
      finalRgb += vec3(0.16, 0.08, 0.04) * fresnel;

      // Dark luxury background vignette to ensure foreground panels remain super crisp
      float vignette = 1.0 - length(vUv - 0.5) * 0.7;
      finalRgb *= clamp(vignette, 0.55, 1.0);

      gl_FragColor = vec4(finalRgb, uOpacity);
    }
  `;

  // Compile Shader Helper
  function createShader(gl, type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  }

  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    return;
  }

  gl.useProgram(program);

  // Generate 3D Cloth Mesh Grid (64 cols x 44 rows)
  const cols = 64, rows = 44;
  const positions = [];
  const uvs = [];
  const indices = [];

  for (let y = 0; y <= rows; y++) {
    const v = y / rows;
    const posY = (1.0 - v * 2.0); // -1.0 to 1.0
    for (let x = 0; x <= cols; x++) {
      const u = x / cols;
      const posX = (u * 2.0 - 1.0); // -1.0 to 1.0

      positions.push(posX, posY, 0.0);
      uvs.push(u, v);
    }
  }

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const p1 = y * (cols + 1) + x;
      const p2 = p1 + 1;
      const p3 = (y + 1) * (cols + 1) + x;
      const p4 = p3 + 1;

      indices.push(p1, p3, p2);
      indices.push(p2, p3, p4);
    }
  }

  // Position Buffer
  const posBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  const aPosLoc = gl.getAttribLocation(program, 'aPos');
  gl.enableVertexAttribArray(aPosLoc);
  gl.vertexAttribPointer(aPosLoc, 3, gl.FLOAT, false, 0, 0);

  // UV Buffer
  const uvBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);
  const aUvLoc = gl.getAttribLocation(program, 'aUv');
  gl.enableVertexAttribArray(aUvLoc);
  gl.vertexAttribPointer(aUvLoc, 2, gl.FLOAT, false, 0, 0);

  // Index Buffer
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

  // Uniform Locations
  const uTimeLoc = gl.getUniformLocation(program, 'uTime');
  const uMouseLoc = gl.getUniformLocation(program, 'uMouse');
  const uWaveAmpLoc = gl.getUniformLocation(program, 'uWaveAmp');
  const uSheenLoc = gl.getUniformLocation(program, 'uSheen');
  const uOpacityLoc = gl.getUniformLocation(program, 'uOpacity');
  const uTextureLoc = gl.getUniformLocation(program, 'uTexture');

  // Create WebGL Texture for Printed Pattern
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  // Initial Placeholder Texture (light warm tone)
  const initPixel = new Uint8Array([240, 238, 235, 255]);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, initPixel);

  // Mouse Interaction Variables
  let targetMouseX = 0.0, targetMouseY = 0.0;
  let currentMouseX = 0.0, currentMouseY = 0.0;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / width) * 2.0 - 1.0;
    targetMouseY = 1.0 - (e.clientY / height) * 2.0;
  });

  // Global Texture Update Method
  window.updateFabricFlowTexture = function(source, title = 'Custom Printed Textile') {
    if (!source) return;

    if (titleEl && title) {
      const sheenLabel = currentSheen > 2.5 ? 'Organic Linen' : currentSheen > 1.5 ? 'Glossy Satin' : 'Silk Twill';
      titleEl.textContent = `${sheenLabel} · ${title}`;
    }

    if (source instanceof HTMLCanvasElement || source instanceof HTMLImageElement) {
      try {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
      } catch (err) {
        console.warn('Direct texture upload failed, creating clone canvas', err);
      }
    } else if (typeof source === 'string') {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      };
      img.src = source;
    }
  };

  // Sheen Mode Selector Buttons
  sheenBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sheenBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const s = btn.dataset.sheen;
      if (s === 'satin') currentSheen = 2.0;
      else if (s === 'linen') currentSheen = 3.0;
      else currentSheen = 1.0;

      if (titleEl) {
        const parts = titleEl.textContent.split('·');
        const designName = parts.length > 1 ? parts[1].trim() : 'Active Design';
        const sheenLabel = currentSheen > 2.5 ? 'Organic Linen' : currentSheen > 1.5 ? 'Glossy Satin' : 'Silk Twill';
        titleEl.textContent = `${sheenLabel} · ${designName}`;
      }
      showToast(`Fabric substrate changed to ${btn.textContent}`);
    });
  });

  // Toggle Fabric Flow Button
  if (btnToggle) {
    btnToggle.addEventListener('click', () => {
      isFlowing = !isFlowing;
      if (isFlowing) {
        canvas.style.opacity = '0.12';
        btnToggleText.textContent = 'Fabric Flow: ON 🌊';
        showToast('Background 3D Fabric Flow Enabled');
      } else {
        canvas.style.opacity = '0';
        btnToggleText.textContent = 'Fabric Flow: OFF ⏸';
        showToast('Background 3D Fabric Flow Hidden');
      }
    });
  }

  // Animation Loop (60 FPS WebGL Render)
  let startTime = performance.now();

  function renderFabric() {
    if (isFlowing) {
      const elapsed = (performance.now() - startTime) * 0.001;

      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;

      gl.viewport(0, 0, width, height);
      // Light warm background to match glassmorphic theme
      gl.clearColor(0.949, 0.941, 0.929, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.useProgram(program);

      gl.uniform1f(uTimeLoc, elapsed);
      gl.uniform2f(uMouseLoc, currentMouseX, currentMouseY);
      gl.uniform1f(uWaveAmpLoc, 1.0);
      gl.uniform1f(uSheenLoc, currentSheen);
      gl.uniform1f(uOpacityLoc, 0.88);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(uTextureLoc, 0);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    }

    requestAnimationFrame(renderFabric);
  }

  renderFabric();
}

// 2D Fallback for older browsers
function setup2dFabricFlowFallback(canvas) {
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let patternImg = null;
  window.updateFabricFlowTexture = function(source, title) {
    if (source instanceof HTMLCanvasElement || source instanceof HTMLImageElement) {
      patternImg = source;
    }
  };

  let t = 0;
  function render() {
    t += 0.02;
    ctx.clearRect(0, 0, width, height);
    if (patternImg) {
      const pat = ctx.createPattern(patternImg, 'repeat');
      ctx.fillStyle = pat;
      ctx.save();
      ctx.translate(Math.sin(t) * 20, Math.cos(t * 0.8) * 15);
      ctx.fillRect(-50, -50, width + 100, height + 100);
      ctx.restore();
    }
    requestAnimationFrame(render);
  }
  render();
}

// ════════════ HELMO MODE 3D GLASS BLOB + PARTICLE FLOW ENGINE ════════════
function setupPeachweb3dEngine() {
  // 1. Organic 3D Glass Blobs + Dispersing Particle Flow Canvas
  const canvas = document.getElementById('peachweb3dCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    // ─── ORGANIC GLASS BLOBS (Helmo Mode Showroom Style) ───
    const blobs = [
      {
        x: 0.3, y: 0.28, radius: 200,
        colors: ['#ff9966', '#ff6b6b', '#ffaa85'],
        speed: { x: 0.0003, y: 0.0005 },
        phase: 0, morphSpeed: 0.4
      },
      {
        x: 0.55, y: 0.55, radius: 170,
        colors: ['#5b8def', '#88c8ff', '#a8d8ff'],
        speed: { x: -0.0004, y: 0.0003 },
        phase: 2.1, morphSpeed: 0.35
      },
      {
        x: 0.7, y: 0.35, radius: 140,
        colors: ['#6ecfb8', '#a8e6cf', '#ddfff0'],
        speed: { x: 0.0002, y: -0.0004 },
        phase: 4.2, morphSpeed: 0.45
      },
      {
        x: 0.25, y: 0.7, radius: 120,
        colors: ['#ffaa85', '#ff9966', '#ffc299'],
        speed: { x: 0.0005, y: 0.0002 },
        phase: 1.5, morphSpeed: 0.38
      }
    ];

    // ─── DISPERSING PARTICLES (Flowing like 2nd video) ───
    const particles = [];
    const particleCount = Math.min(280, Math.floor((width * height) / 6000));

    for (let i = 0; i < particleCount; i++) {
      const blobIdx = Math.floor(Math.random() * blobs.length);
      const blob = blobs[blobIdx];
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * blob.radius * 2.5;
      particles.push({
        x: blob.x * width + Math.cos(angle) * dist,
        y: blob.y * height + Math.sin(angle) * dist,
        z: Math.random() * 400 - 100,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8 - 0.15,
        vz: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 0.5,
        life: Math.random(),
        lifeSpeed: 0.001 + Math.random() * 0.003,
        colorIdx: blobIdx,
        alpha: Math.random() * 0.6 + 0.15
      });
    }

    let mouseX = width / 2, mouseY = height / 2;
    let smoothMouseX = width / 2, smoothMouseY = height / 2;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    let t = 0;

    function drawBlob(blob, time) {
      const cx = blob.x * width + Math.sin(time * blob.speed.x * 1000 + blob.phase) * 60;
      const cy = blob.y * height + Math.cos(time * blob.speed.y * 1000 + blob.phase * 0.7) * 45;
      const r = blob.radius;

      // Organic morphing shape using bezier curves
      ctx.save();
      ctx.translate(cx, cy);

      // Liquid viscosity displacement
      const distX = smoothMouseX - cx;
      const distY = smoothMouseY - cy;
      const distSq = distX * distX + distY * distY;
      
      // Large interaction radius (600px) for strong liquid feel
      const dist = Math.sqrt(distSq);
      const interactionForce = Math.max(0, 1 - dist / 600);
      
      // Pull the center of the blob towards the mouse
      const dx = distX * (0.05 + Math.pow(interactionForce, 2) * 0.3);
      const dy = distY * (0.05 + Math.pow(interactionForce, 2) * 0.3);
      ctx.translate(dx, dy);

      // Multi-layer glass blob with transparency
      for (let layer = 0; layer < 3; layer++) {
        const layerR = r * (1.0 - layer * 0.18);
        const layerAlpha = [0.22, 0.15, 0.1][layer];
        
        // Morph wildly when interacting
        const morph = time * blob.morphSpeed * (1 + interactionForce * 4.0);

        ctx.beginPath();

        // 12-point organic shape for smoother liquid stretching
        const points = [];
        const numPoints = 12;
        for (let i = 0; i < numPoints; i++) {
          const angle = (i / numPoints) * Math.PI * 2;
          
          // Calculate point absolute position to check if it's near the mouse
          const px = cx + dx + Math.cos(angle) * layerR;
          const py = cy + dy + Math.sin(angle) * layerR;
          const pDistX = smoothMouseX - px;
          const pDistY = smoothMouseY - py;
          const pDist = Math.sqrt(pDistX * pDistX + pDistY * pDistY);
          
          // Stretch points strongly towards the mouse if very close
          const pullForce = Math.max(0, 1 - pDist / 300);
          
          // Heavy sine/cosine wobble simulating liquid turbulence
          let wobble = Math.sin(morph + i * 1.5 + layer * 0.6) * (0.2 + interactionForce * 0.4) + 
                       Math.cos(morph * 0.8 + i * 1.1) * (0.15 + interactionForce * 0.3);
                       
          // Apply viscous stretch
          wobble += pullForce * 0.6; // Pull radius outwards

          const pr = layerR * (1.0 + wobble);
          points.push({
            x: Math.cos(angle) * pr,
            y: Math.sin(angle) * pr
          });
        }

        // Draw smooth closed curve through points
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 0; i < points.length; i++) {
          const curr = points[i];
          const next = points[(i + 1) % points.length];
          const nextNext = points[(i + 2) % points.length];
          const cpx = (curr.x + next.x) / 2;
          const cpy = (curr.y + next.y) / 2;
          const cpx2 = (next.x + nextNext.x) / 2;
          const cpy2 = (next.y + nextNext.y) / 2;
          ctx.quadraticCurveTo(next.x, next.y, cpx2, cpy2);
        }
        ctx.closePath();

        // Glass gradient fill
        const grad = ctx.createRadialGradient(
          layerR * 0.2, -layerR * 0.3, layerR * 0.1,
          0, 0, layerR * 1.3
        );
        grad.addColorStop(0, blob.colors[0] + Math.floor(layerAlpha * 255).toString(16).padStart(2, '0'));
        grad.addColorStop(0.5, blob.colors[1] + Math.floor(layerAlpha * 0.6 * 255).toString(16).padStart(2, '0'));
        grad.addColorStop(1, blob.colors[2] + '08');

        ctx.fillStyle = grad;
        ctx.fill();

        // Subtle glass highlight on top
        if (layer === 0) {
          const highlightGrad = ctx.createRadialGradient(
            -layerR * 0.15, -layerR * 0.4, layerR * 0.05,
            -layerR * 0.1, -layerR * 0.2, layerR * 0.6
          );
          highlightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
          highlightGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = highlightGrad;
          ctx.fill();
        }
      }

      // Soft drop shadow beneath blob
      ctx.shadowColor = blob.colors[0] + '30';
      ctx.shadowBlur = 80;
      ctx.shadowOffsetX = 15;
      ctx.shadowOffsetY = 25;
      ctx.beginPath();
      ctx.ellipse(10, r * 0.7, r * 0.7, r * 0.2, 0, 0, Math.PI * 2);
      ctx.fillStyle = blob.colors[1] + '10';
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      ctx.restore();
    }

    function drawParticles(time) {
      const focalLength = 500;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update life cycle
        p.life += p.lifeSpeed;
        if (p.life > 1) {
          // Respawn near a random blob
          const blobIdx = Math.floor(Math.random() * blobs.length);
          const blob = blobs[blobIdx];
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * blob.radius * 1.5;
          p.x = blob.x * width + Math.cos(angle) * dist;
          p.y = blob.y * height + Math.sin(angle) * dist;
          p.z = Math.random() * 200;
          p.life = 0;
          p.colorIdx = blobIdx;
          p.vx = (Math.random() - 0.5) * 1.2;
          p.vy = (Math.random() - 0.5) * 1.2 - 0.2;
          p.vz = (Math.random() - 0.5) * 0.6;
        }

        // Dispersion movement (flowing outward from blob centers)
        p.x += p.vx + Math.sin(time * 0.3 + i * 0.01) * 0.3;
        p.y += p.vy + Math.cos(time * 0.25 + i * 0.015) * 0.2;
        p.z += p.vz;

        // Strong Liquid Wake (Hand moving through fluid)
        const mdx = p.x - smoothMouseX;
        const mdy = p.y - smoothMouseY;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        
        if (mDist < 350) {
          // Force gets stronger as particle is closer to cursor
          const force = Math.pow(1 - mDist / 350, 2) * 1.5;
          
          // 1. Bow Wake: Push particles away from cursor
          p.vx += (mdx / mDist) * force;
          p.vy += (mdy / mDist) * force;
          
          // 2. Swirling Turbulence: Spin particles perpendicularly
          p.vx += (mdy / mDist) * force * 0.8;
          p.vy -= (mdx / mDist) * force * 0.8;
        }

        // 3D perspective projection
        const scale = focalLength / (focalLength + p.z + 200);
        if (scale <= 0) continue;

        const px = p.x;
        const py = p.y;
        const radius = Math.max(0.3, p.size * scale);

        // Fade in/out based on life cycle
        const lifeFade = Math.sin(p.life * Math.PI);
        const alpha = p.alpha * lifeFade * scale;

        if (alpha < 0.01) continue;

        const blob = blobs[p.colorIdx];
        const color = blob.colors[0];

        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = color + Math.floor(Math.min(1, alpha) * 255).toString(16).padStart(2, '0');
        ctx.fill();
      }
    }

    function render3d() {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      smoothMouseX += (mouseX - smoothMouseX) * 0.04;
      smoothMouseY += (mouseY - smoothMouseY) * 0.04;

      // Draw organic glass blobs
      for (const blob of blobs) {
        drawBlob(blob, t);
      }

      // Draw dispersing particle flow
      drawParticles(t);

      requestAnimationFrame(render3d);
    }

    render3d();
  }

  // 2. Interactive 3D Perspective Tilt on Bento Cards
  const tiltSelectors = '.hero-card, .viewport-card, .controls-card, .pattern-card, .pin-card, .colorway-card';

  function attachTiltToElement(el) {
    if (el._hasTilt) return;
    el._hasTilt = true;
    el.classList.add('peachweb-tilt');

    // Add specular glare layer
    let glare = el.querySelector('.card-3d-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'card-3d-glare';
      el.appendChild(glare);
    }

    let isHovered = false;

    el.addEventListener('mouseenter', () => {
      isHovered = true;
      glare.style.opacity = '1';
    });

    el.addEventListener('mousemove', (e) => {
      if (!isHovered) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotX = ((0.5 - y) * 14).toFixed(2);
      const rotY = ((x - 0.5) * 14).toFixed(2);

      el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;

      glare.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255, 255, 255, 0.16), transparent 60%)`;
    });

    el.addEventListener('mouseleave', () => {
      isHovered = false;
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      glare.style.opacity = '0';
    });
  }

  // Attach to existing elements
  document.querySelectorAll(tiltSelectors).forEach(attachTiltToElement);

  // Observe dynamically rendered cards (Pinterest Masonry, Portfolio gallery)
  const cardObserver = new MutationObserver(() => {
    document.querySelectorAll(tiltSelectors).forEach(attachTiltToElement);
  });
  cardObserver.observe(document.body, { childList: true, subtree: true });

  // 3. Interactive 3D Drag / Orbit on Shirt Mockup Canvas
  const shirtCanvas = document.getElementById('shirtMockupCanvas');
  if (shirtCanvas) {
    let isDragging = false;
    let startX = 0, startY = 0;
    let rotX = 0, rotY = 0;

    shirtCanvas.style.cursor = 'grab';
    shirtCanvas.style.transition = 'transform 0.15s ease-out';

    shirtCanvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      shirtCanvas.style.cursor = 'grabbing';
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      rotY = Math.max(-20, Math.min(20, rotY + dx * 0.15));
      rotX = Math.max(-15, Math.min(15, rotX - dy * 0.15));

      shirtCanvas.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03, 1.03, 1.03)`;

      startX = e.clientX;
      startY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        shirtCanvas.style.cursor = 'grab';
        // Gently reset after drag release
        setTimeout(() => {
          if (!isDragging) {
            shirtCanvas.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            rotX = 0;
            rotY = 0;
          }
        }, 600);
      }
    });
  }
}

// ════════════ FLOATING LIQUID SCULPTURES ENGINE (UPLOADED ARTWORKS) ════════════
function setupLiquidSculpturesEngine() {
  const container = document.getElementById('liquidSculpturesContainer');
  if (!container) return;

  const sculptures = Array.from(container.querySelectorAll('.liquid-sculpture')).map((el, idx) => {
    const parallax = parseFloat(el.dataset.parallax) || (0.3 + idx * 0.15);
    const swaySpeed = parseFloat(el.dataset.swaySpeed) || 1.0;
    const rotFactor = parseFloat(el.dataset.rotFactor) || (idx % 2 === 0 ? 0.03 : -0.03);
    const baseScale = parseFloat(el.dataset.scale) || 1.0;

    return {
      el,
      parallax,
      swaySpeed,
      rotFactor,
      baseScale,
      phase: idx * 1.57,
      mouseOffsetX: 0,
      mouseOffsetY: 0,
      tiltX: 0,
      tiltY: 0,
      type: idx
    };
  });

  let scrollY = window.scrollY || window.pageYOffset || 0;
  let smoothScrollY = scrollY;
  let lastScrollY = scrollY;
  let scrollVelocity = 0;

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY || window.pageYOffset || 0;
  }, { passive: true });

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  let t = 0;
  function animateLiquidSculptures() {
    t += 0.016;

    // Smooth scroll lerp
    smoothScrollY += (scrollY - smoothScrollY) * 0.08;
    const currentVelocity = scrollY - lastScrollY;
    scrollVelocity += (currentVelocity - scrollVelocity) * 0.12;
    lastScrollY = scrollY;

    // Fluid viscous stretch when scrolling (feels suspended in liquid)
    const stretchY = 1 + Math.min(0.2, Math.abs(scrollVelocity) * 0.003);
    const stretchX = 1 - Math.min(0.08, Math.abs(scrollVelocity) * 0.0015);
    const flowTilt = Math.max(-10, Math.min(10, scrollVelocity * 0.12));

    for (let i = 0; i < sculptures.length; i++) {
      const s = sculptures[i];

      // 1. Organic liquid floating undulation (breathing + sway)
      const waveY = Math.sin(t * s.swaySpeed + s.phase) * 26 + Math.cos(t * s.swaySpeed * 0.6) * 10;
      const waveX = Math.cos(t * s.swaySpeed * 0.8 + s.phase) * 18;
      const waveRot = Math.sin(t * s.swaySpeed * 0.4 + s.phase) * 5;
      const breathingScale = s.baseScale * (1 + Math.sin(t * s.swaySpeed * 0.7 + s.phase) * 0.03);

      // 2. Multi-way scrolling response (each sculpture reacts differently)
      let scrollOffsetY = 0;
      let scrollOffsetX = 0;
      let scrollRot = 0;
      let scrollPerspectiveTilt = 0;

      if (s.type === 0) {
        // Sculpture 1: Smooth downward drift + slow clockwise turn + lateral wave
        scrollOffsetY = -smoothScrollY * s.parallax;
        scrollOffsetX = Math.sin(smoothScrollY * 0.0018) * 40;
        scrollRot = smoothScrollY * s.rotFactor;
      } else if (s.type === 1) {
        // Sculpture 2: Fast counter-flow + wide elliptical arc + counter-clockwise twist
        scrollOffsetY = -smoothScrollY * s.parallax;
        scrollOffsetX = Math.cos(smoothScrollY * 0.0022) * -55;
        scrollRot = smoothScrollY * s.rotFactor + Math.sin(smoothScrollY * 0.001) * 8;
        scrollPerspectiveTilt = Math.sin(smoothScrollY * 0.0015) * 12;
      } else if (s.type === 2) {
        // Sculpture 3: Mid-page floating ring, expands and rotates in depth
        scrollOffsetY = -smoothScrollY * s.parallax;
        scrollOffsetX = Math.sin(smoothScrollY * 0.0012 + 1.2) * 35;
        scrollRot = smoothScrollY * s.rotFactor;
      } else {
        // Sculpture 4: Deep helix sweep, responds dynamically to scroll velocity
        scrollOffsetY = -smoothScrollY * s.parallax;
        scrollOffsetX = Math.cos(smoothScrollY * 0.0016) * 45;
        scrollRot = smoothScrollY * s.rotFactor;
      }

      // 3. Proximity Mouse Interaction (Liquid displacement & 3D tilt)
      const rect = s.el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distToMouse = Math.hypot(mouseX - centerX, mouseY - centerY);

      if (distToMouse < 500) {
        const force = Math.pow(1 - distToMouse / 500, 1.8);
        const targetOffsetX = ((mouseX - centerX) / 500) * 35 * force;
        const targetOffsetY = ((mouseY - centerY) / 500) * 35 * force;
        s.mouseOffsetX += (targetOffsetX - s.mouseOffsetX) * 0.08;
        s.mouseOffsetY += (targetOffsetY - s.mouseOffsetY) * 0.08;

        const targetTiltX = -((mouseY - centerY) / 500) * 15 * force;
        const targetTiltY = ((mouseX - centerX) / 500) * 15 * force;
        s.tiltX += (targetTiltX - s.tiltX) * 0.08;
        s.tiltY += (targetTiltY - s.tiltY) * 0.08;
      } else {
        s.mouseOffsetX += (0 - s.mouseOffsetX) * 0.05;
        s.mouseOffsetY += (0 - s.mouseOffsetY) * 0.05;
        s.tiltX += (0 - s.tiltX) * 0.05;
        s.tiltY += (0 - s.tiltY) * 0.05;
      }

      // Total transform combination
      const totalX = waveX + scrollOffsetX + s.mouseOffsetX;
      const totalY = waveY + scrollOffsetY + s.mouseOffsetY;
      const totalRot = waveRot + scrollRot + flowTilt;
      const totalTiltX = s.tiltX;
      const totalTiltY = s.tiltY + scrollPerspectiveTilt;
      const totalScaleX = breathingScale * stretchX;
      const totalScaleY = breathingScale * stretchY;

      s.el.style.transform = `translate3d(${totalX.toFixed(2)}px, ${totalY.toFixed(2)}px, 0) ` +
                             `rotateX(${totalTiltX.toFixed(2)}deg) ` +
                             `rotateY(${totalTiltY.toFixed(2)}deg) ` +
                             `rotateZ(${totalRot.toFixed(2)}deg) ` +
                             `scale3d(${totalScaleX.toFixed(3)}, ${totalScaleY.toFixed(3)}, 1)`;
    }

    requestAnimationFrame(animateLiquidSculptures);
  }

  animateLiquidSculptures();
}

// ════════════ BOOT ON LOAD ════════════
function initApp() {
  initElements();
  setupTabRouting();
  preloadPatternCanvases();
  preloadShirtMockupAssets();
  setupFabricFlowEngine();
  setupPeachweb3dEngine();
  setupLiquidSculpturesEngine();
  setupGallery();
  setupPinterestHub();
  setupInstagramHub();
  setupFusionStudio();
  setupQuickPickerModal();
  setupColorwayAndRepeatStudio();
  setupMockupStudio();
  setupLicensingModal();

  // Initial renders
  updateFusionPreview();
  updateRepeatPreview();
  updateMockupPreview();

  // Initialize 3D Flowing Background Fabric with default pattern
  if (window.updateFabricFlowTexture) {
    const initialPattern = state.patterns && state.patterns[0];
    if (initialPattern) {
      window.updateFabricFlowTexture(initialPattern.canvas || initialPattern.dataUrl, initialPattern.title);
    }
  }

  showToast('ROMATEXTILEART Atelier Studio Ready');
}

window.addEventListener('DOMContentLoaded', initApp);

