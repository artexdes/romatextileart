/**
 * ROMATEXTILEART - Procedural High-Resolution Textile Patterns Library
 * Handcrafted 12 curated commercial pattern designs across:
 * Resort Tropical, Bohemian Damask, Geometric Bauhaus, Indigo Shibori,
 * Italian Citrus, Abstract Marbled, Tuscan Florals, Art Deco, etc.
 */

export const PATTERN_COLLECTIONS = [
  {
    id: 'resort-palms',
    title: 'Monstera & Palm Palms',
    category: 'Resort Wear',
    collection: 'Pinterest / Summer 2026',
    source: 'Pinterest',
    tag: 'Trending Resort',
    draw(ctx, w, h) {
      // Deep tropical background
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#09231b');
      grad.addColorStop(1, '#041610');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Sunlit ambient rays
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

      // Draw large palm fronds
      const drawFrond = (cx, cy, scale, rot, color1, color2) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.scale(scale, scale);

        // Stem
        ctx.strokeStyle = color1;
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(60, -100, 120, -260);
        ctx.stroke();

        // Leaves
        for (let i = 20; i <= 240; i += 22) {
          const t = i / 240;
          const leafLen = Math.sin(t * Math.PI) * 95;
          const curveX = t * 60 + (t * t) * 60;
          const curveY = -i;

          // Left leaf
          ctx.beginPath();
          ctx.moveTo(curveX, curveY);
          ctx.quadraticCurveTo(curveX - leafLen * 0.7, curveY - 25, curveX - leafLen, curveY - 10);
          ctx.quadraticCurveTo(curveX - leafLen * 0.4, curveY + 15, curveX, curveY + 10);
          ctx.fillStyle = i % 44 === 0 ? color1 : color2;
          ctx.fill();

          // Right leaf
          ctx.beginPath();
          ctx.moveTo(curveX, curveY);
          ctx.quadraticCurveTo(curveX + leafLen * 0.7, curveY - 25, curveX + leafLen, curveY - 10);
          ctx.quadraticCurveTo(curveX + leafLen * 0.4, curveY + 15, curveX, curveY + 10);
          ctx.fillStyle = i % 44 === 0 ? color2 : color1;
          ctx.fill();
        }
        ctx.restore();
      };

      // Draw monstera leaf
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

        // Ribs / cutouts
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

      // Repeat seamless elements
      drawFrond(100, 250, 0.95, -0.4, '#1b6b4e', '#2cd493');
      drawFrond(380, 480, 1.1, 0.6, '#185942', '#41f3aa');
      drawFrond(420, 120, 0.85, -0.9, '#124835', '#24a873');
      drawFrond(80, 520, 0.9, 0.2, '#15523b', '#30e49f');

      // Add gold tropical flowers / accents
      drawMonstera(240, 240, 0.7, 0.35, '#2cd493');
      drawMonstera(490, 20, 0.6, -0.5, '#1b6b4e');
      drawMonstera(10, 40, 0.6, -0.5, '#1b6b4e');
      drawMonstera(20, 480, 0.55, 0.8, '#24a873');

      // Exotic flower blossoms (Bird of Paradise / Hibiscus gold)
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
      // Midnight navy velvet background
      ctx.fillStyle = '#0e121e';
      ctx.fillRect(0, 0, w, h);

      // Subtle textured diamond lattice
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

      // Draw symmetrical ornate damask motif
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

        // Acanthus crown
        for (let side = -1; side <= 1; side += 2) {
          ctx.save();
          ctx.scale(side, 1);
          // Upper scroll
          ctx.beginPath();
          ctx.moveTo(0, -60);
          ctx.bezierCurveTo(35, -80, 60, -50, 45, -30);
          ctx.bezierCurveTo(35, -15, 15, -25, 20, -40);
          ctx.bezierCurveTo(15, -50, 0, -45, 0, -60);
          ctx.fill();
          ctx.stroke();

          // Outer wing
          ctx.beginPath();
          ctx.moveTo(10, -20);
          ctx.bezierCurveTo(55, -25, 75, 15, 60, 45);
          ctx.bezierCurveTo(45, 70, 15, 65, 25, 45);
          ctx.bezierCurveTo(35, 25, 15, 20, 5, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Bottom curl
          ctx.beginPath();
          ctx.moveTo(0, 50);
          ctx.bezierCurveTo(25, 70, 40, 95, 20, 110);
          ctx.bezierCurveTo(5, 120, -5, 95, 0, 75);
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }

        // Center Pine / Jewel
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

      // Repeat grid with half drop
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
      // Cream retro canvas
      ctx.fillStyle = '#fdfbf7';
      ctx.fillRect(0, 0, w, h);

      // Grid of dots
      ctx.fillStyle = '#e3ded3';
      for (let x = 16; x < w; x += 32) {
        for (let y = 16; y < h; y += 32) {
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Playful Bauhaus forms
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
          // Stripes inside
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
      // Rich deep indigo tie-dye
      const grad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w * 0.7);
      grad.addColorStop(0, '#1c315e');
      grad.addColorStop(0.5, '#0f1f42');
      grad.addColorStop(1, '#071026');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Shibori ring rosettes
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
        // Center pinch
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.restore();
      };

      // Grid arrangement
      drawRosette(128, 128, 85, 5);
      drawRosette(384, 128, 85, 5);
      drawRosette(256, 256, 95, 6);
      drawRosette(128, 384, 85, 5);
      drawRosette(384, 384, 85, 5);

      // Corner wraps for seamless effect
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
      // Mediterranean terracotta/cream base
      ctx.fillStyle = '#faf6ed';
      ctx.fillRect(0, 0, w, h);

      // Subtle vintage tile outlines
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

        // Leaves
        ctx.fillStyle = '#3a6b35';
        ctx.beginPath();
        ctx.ellipse(-20, -50, 18, 42, -0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#558b45';
        ctx.beginPath();
        ctx.ellipse(25, -45, 16, 36, 0.7, 0, Math.PI * 2);
        ctx.fill();

        // Stems
        ctx.strokeStyle = '#5a3d28';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, -55);
        ctx.lineTo(0, -30);
        ctx.stroke();

        // Lemon fruit
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

        // Lemon tip nipple
        ctx.beginPath();
        ctx.arc(0, 52, 4, 0, Math.PI);
        ctx.fillStyle = '#df9b03';
        ctx.fill();

        // Orange blossom flowers
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
      // Rich charcoal black
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

          // Alternating fans
          if (r % 36 === 0) {
            ctx.fillStyle = 'rgba(226, 179, 74, 0.12)';
            ctx.fill();
          }
        }

        // Fan spokes
        for (let a = 1; a < 8; a++) {
          const ang = Math.PI + (a / 8) * Math.PI;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(ang) * 110, Math.sin(ang) * 110);
          ctx.strokeStyle = brightGold;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Pendant teardrop
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
      // Warm desert linen base
      ctx.fillStyle = '#ede3d1';
      ctx.fillRect(0, 0, w, h);

      // Ikat feathered diamond
      const drawIkatDiamond = (cx, cy, s, color1, color2) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(s, s);

        const rows = 35;
        for (let i = -rows; i <= rows; i++) {
          const t = 1 - Math.abs(i) / rows;
          const halfWidth = t * 65;
          const y = i * 2.8;

          // Jitter horizontal threads for true ikat weave look
          const jitter1 = (Math.sin(i * 9) * 4);
          const jitter2 = (Math.cos(i * 11) * 4);

          ctx.fillStyle = Math.abs(i) < 12 ? color2 : color1;
          ctx.fillRect(-halfWidth + jitter1, y, halfWidth * 2 + jitter2, 2.4);
        }

        // Center cross
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
      // Sage meadow green background
      ctx.fillStyle = '#22382c';
      ctx.fillRect(0, 0, w, h);

      // Twining vines
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

        // Rose petals layered in spiral
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

        // Center bud
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

/**
 * Helper to render a pattern to an Offscreen or HTML5 Canvas and return dataURL & canvas
 */
export function renderPatternCanvas(patternDef, width = 512, height = 512) {
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
