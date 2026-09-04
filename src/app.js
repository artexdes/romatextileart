/**
 * ROMATEXTILEART - Studio Main Application Controller
 */

import { PATTERN_COLLECTIONS, renderPatternCanvas } from './patterns-data.js';
import { fuseDesigns, FUSION_MODES } from './fusion-engine.js';
import { COLORWAY_PRESETS, applyColorway } from './colorway-engine.js';
import { REPEAT_MODES, renderRepeatPattern, exportSeamlessTile } from './repeat-engine.js';
import { FABRIC_TYPES, renderShirtDrape, exportHighResMockup } from './mockup-engine.js';

// Global State
const state = {
  activeTab: 'gallery',
  patterns: [],
  selectedA: null,
  selectedB: null,
  fusedCanvas: null,
  activePatternCanvas: null, // the active pattern feeding into repeat & mockup
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

// UI Elements Cache
let el = {};

function initElements() {
  el = {
    tabs: document.querySelectorAll('.tab-btn'),
    panes: document.querySelectorAll('.studio-pane'),
    galleryGrid: document.getElementById('galleryGrid'),
    filterPills: document.querySelectorAll('.filter-pill'),

    // Fusion Elements
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

    // Repeat & Colorways Elements
    repeatCanvas: document.getElementById('repeatCanvas'),
    colorwayCardsContainer: document.getElementById('colorwaysList'),
    repeatModeCards: document.querySelectorAll('input[name="repeatMode"]'),
    repeatScaleSlider: document.getElementById('repeatScale'),
    repeatScaleVal: document.getElementById('repeatScaleVal'),
    btnDownloadTile: document.getElementById('btnDownloadTile'),
    btnRepeatToMockup: document.getElementById('btnRepeatToMockup'),

    // Mockup Elements
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

    // Toast Container
    toastContainer: document.getElementById('toastContainer'),

    // Licensing Modal
    quoteModal: document.getElementById('quoteModal'),
    btnOpenQuote: document.getElementById('btnOpenQuote'),
    btnCloseQuote: document.getElementById('btnCloseQuote'),
    quoteForm: document.getElementById('quoteForm')
  };
}

// ════════════ INITIALIZATION ════════════
export function initApp() {
  initElements();
  setupTabRouting();
  preloadPatternCanvases();
  setupGallery();
  setupFusionStudio();
  setupColorwayAndRepeatStudio();
  setupMockupStudio();
  setupLicensingModal();

  showToast('Welcome to ROMATEXTILEART Atelier Studio');
}

// Pre-render procedural canvases for each pattern
function preloadPatternCanvases() {
  state.patterns = PATTERN_COLLECTIONS.map(p => {
    const rendered = renderPatternCanvas(p, 512, 512);
    return {
      ...p,
      canvas: rendered.canvas,
      dataUrl: rendered.dataUrl
    };
  });

  // Default selections
  state.selectedA = state.patterns[0]; // Palms
  state.selectedB = state.patterns[1]; // Damask
  state.activePatternCanvas = state.patterns[0].canvas;
}

// ════════════ TAB ROUTING ════════════
function setupTabRouting() {
  el.tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.dataset.tab;
      switchTab(tabName);
    });
  });

  document.querySelectorAll('[data-goto-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-goto-tab');
      switchTab(target);
    });
  });
}

function switchTab(tabName) {
  state.activeTab = tabName;

  el.tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
  el.panes.forEach(p => p.classList.toggle('active', p.id === `${tabName}Pane`));

  window.scrollTo({ top: 380, behavior: 'smooth' });

  // Update canvas in newly opened tab
  if (tabName === 'fusion') {
    updateFusionPreview();
  } else if (tabName === 'repeat') {
    updateRepeatPreview();
  } else if (tabName === 'mockup') {
    updateMockupPreview();
  }
}

// ════════════ GALLERY LOGIC ════════════
function setupGallery() {
  renderGalleryCards();

  // Filters
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
  const filtered = state.currentFilter === 'all'
    ? state.patterns
    : state.patterns.filter(p => p.category.toLowerCase().includes(state.currentFilter.toLowerCase()) || p.source.toLowerCase() === state.currentFilter.toLowerCase());

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

    // Actions
    card.querySelector('[data-action="mockup"]').addEventListener('click', () => {
      state.activePatternCanvas = p.canvas;
      state.activeColorway = 'base';
      renderColorwayButtons();
      switchTab('mockup');
      showToast(`Draped "${p.title}" on Shirt`);
    });

    card.querySelector('[data-action="repeat"]').addEventListener('click', () => {
      state.activePatternCanvas = p.canvas;
      state.activeColorway = 'base';
      renderColorwayButtons();
      switchTab('repeat');
      showToast(`Viewing 3 Colorways for "${p.title}"`);
    });

    card.querySelector('[data-action="fuseA"]').addEventListener('click', () => {
      state.selectedA = p;
      updateFusionSlotsUI();
      switchTab('fusion');
      showToast(`Slot A set to "${p.title}"`);
    });

    card.querySelector('[data-action="fuseB"]').addEventListener('click', () => {
      state.selectedB = p;
      updateFusionSlotsUI();
      switchTab('fusion');
      showToast(`Slot B set to "${p.title}"`);
    });

    el.galleryGrid.appendChild(card);
  });
}

// ════════════ 2-DESIGN FUSION STUDIO ════════════
function setupFusionStudio() {
  updateFusionSlotsUI();

  // Upload custom design A
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

  // Upload custom design B
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

  // Balance Slider
  el.fusionBalance.addEventListener('input', e => {
    el.fusionBalanceVal.textContent = `${Math.round(e.target.value * 100)}%`;
    updateFusionPreview();
  });

  // Mode Selection
  el.fusionModeCards.forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.radio-card').forEach(rc => rc.classList.remove('active'));
      radio.closest('.radio-card').classList.add('active');
      updateFusionPreview();
    });
  });

  // Generate / Refresh Button
  el.btnGenerateFusion.addEventListener('click', () => {
    updateFusionPreview();
    showToast('New hybrid design synthesized!');
  });

  // Action: Send to Repeat & Colorways
  el.btnFusionToRepeat.addEventListener('click', () => {
    if (!state.fusedCanvas) updateFusionPreview();
    state.activePatternCanvas = state.fusedCanvas;
    state.activeColorway = 'base';
    renderColorwayButtons();
    switchTab('repeat');
    showToast('Sent hybrid design to 3 Colorways & Repeat');
  });

  // Action: Send to Mockup
  el.btnFusionToMockup.addEventListener('click', () => {
    if (!state.fusedCanvas) updateFusionPreview();
    state.activePatternCanvas = state.fusedCanvas;
    state.activeColorway = 'base';
    renderColorwayButtons();
    switchTab('mockup');
    showToast('Draped hybrid design on Shirt Mockup');
  });

  // Action: Download Fused Tile
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

  const mode = document.querySelector('input[name="fusionMode"]:checked').value;
  const balance = parseFloat(el.fusionBalance.value);

  state.fusedCanvas = fuseDesigns(state.selectedA.canvas, state.selectedB.canvas, {
    mode,
    balance,
    width: 1024,
    height: 1024
  });

  el.fusionCanvas.width = 1024;
  el.fusionCanvas.height = 1024;
  const ctx = el.fusionCanvas.getContext('2d');
  ctx.drawImage(state.fusedCanvas, 0, 0);
}

// ════════════ 3 COLORWAYS & REPEAT STUDIO ════════════
function setupColorwayAndRepeatStudio() {
  renderColorwayButtons();

  // Repeat Mode selection
  el.repeatModeCards.forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('#repeatPane .radio-card').forEach(rc => rc.classList.remove('active'));
      radio.closest('.radio-card').classList.add('active');
      state.repeatMode = radio.value;
      updateRepeatPreview();
    });
  });

  // Repeat Scale Slider
  el.repeatScaleSlider.addEventListener('input', e => {
    state.repeatScale = parseFloat(e.target.value);
    el.repeatScaleVal.textContent = `${state.repeatScale.toFixed(2)}x`;
    updateRepeatPreview();
  });

  // Download Seamless Repeat Tile
  el.btnDownloadTile.addEventListener('click', () => {
    const tileCanvas = getCurrentlyColouredPatternCanvas();
    const dataUrl = exportSeamlessTile(tileCanvas, 2048);
    const link = document.createElement('a');
    link.download = `ROMATEXTILEART_SeamlessTile_${state.activeColorway.toUpperCase()}_2048px.png`;
    link.href = dataUrl;
    link.click();
    showToast('Downloaded High-Res 2048px Seamless Pattern Tile');
  });

  // Drape this exact colorway on shirt mockup
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

// Returns the canvas with the currently selected colorway applied
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
}

// ════════════ SHIRT MOCKUP STUDIO ════════════
function setupMockupStudio() {
  // Pattern scale on shirt
  el.mockupScaleSlider.addEventListener('input', e => {
    state.mockupScale = parseFloat(e.target.value);
    el.mockupScaleVal.textContent = `${Math.round(state.mockupScale * 100)}%`;
    updateMockupPreview();
  });

  // Pattern rotation
  el.mockupRotSlider.addEventListener('input', e => {
    state.mockupRotation = parseInt(e.target.value, 10);
    el.mockupRotVal.textContent = `${state.mockupRotation}°`;
    updateMockupPreview();
  });

  // Fabric chip selection
  el.fabricChips.forEach(chip => {
    chip.addEventListener('click', () => {
      el.fabricChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.mockupFabric = chip.dataset.fabric;
      updateMockupPreview();
      showToast(`Fabric set to ${chip.textContent.trim()}`);
    });
  });

  // Toggles
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

  // 1-Click Download High-Res Mockup
  el.btnDownloadMockup.addEventListener('click', () => {
    const colouredTile = getCurrentlyColouredPatternCanvas();
    const highResUrl = exportHighResMockup(colouredTile, {
      scale: state.mockupScale,
      rotation: state.mockupRotation,
      fabricType: state.mockupFabric,
      showShadows: state.mockupShadows,
      showHighlights: state.mockupHighlights,
      showButtons: state.mockupButtons,
      showWatermark: true,
      transparentBg: false
    });

    const link = document.createElement('a');
    link.download = `ROMATEXTILEART_ResortShirtMockup_${state.activeColorway.toUpperCase()}_300DPI.png`;
    link.href = highResUrl;
    link.click();
    showToast('Downloaded High-Res 2048px Apparel Mockup PNG');
  });

  // Interactive Drag on Mockup to offset pattern position
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

  renderShirtDrape(colouredTile, el.mockupCanvas, {
    scale: state.mockupScale,
    rotation: state.mockupRotation,
    offsetX: state.mockupOffsetX,
    offsetY: state.mockupOffsetY,
    fabricType: state.mockupFabric,
    showShadows: state.mockupShadows,
    showHighlights: state.mockupHighlights,
    showButtons: state.mockupButtons,
    showWatermark: true,
    transparentBg: false
  });
}

// ════════════ LICENSING MODAL ════════════
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

// ════════════ TOAST NOTIFIER ════════════
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
