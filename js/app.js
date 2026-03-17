/* =====================================================
   FOTO SHOP ESTUDIO — app.js
   ===================================================== */
(function () {
  'use strict';

  // ── State ───────────────────────────────────────────
  let activeCat    = 'all';
  let activeClient = 'all';
  let filtered     = [];
  let lbIndex      = 0;

  // ── DOM ─────────────────────────────────────────────
  const gallery    = document.getElementById('gallery');
  const countEl    = document.getElementById('photoCount');
  const clientSel  = document.getElementById('clientSelect');
  const catBtns    = document.querySelectorAll('.cat');
  const clientsGrid = document.getElementById('clientsGrid');

  const lb         = document.getElementById('lb');
  const lbImg      = document.getElementById('lbImg');
  const lbClient   = document.getElementById('lbClient');
  const lbCat      = document.getElementById('lbCat');
  const lbCounter  = document.getElementById('lbCounter');
  const lbClose    = document.getElementById('lbClose');
  const lbPrev     = document.getElementById('lbPrev');
  const lbNext     = document.getElementById('lbNext');

  // ── Helpers ─────────────────────────────────────────
  function getFiltered() {
    return PHOTOS.filter(p => {
      const catOk    = activeCat    === 'all' || p.category === activeCat;
      const clientOk = activeClient === 'all' || p.client   === activeClient;
      return catOk && clientOk;
    });
  }

  function fmtCount(n) {
    return n === 1 ? '1 foto' : `${n} fotos`;
  }

  // ── Render Gallery ───────────────────────────────────
  function render() {
    filtered = getFiltered();
    gallery.innerHTML = '';

    if (filtered.length === 0) {
      gallery.innerHTML = `
        <div class="empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M3 9l4-4 4 4 4-4 4 4"/>
            <circle cx="8.5" cy="14.5" r="1.5"/>
          </svg>
          <h3>Sin resultados</h3>
          <p>No hay fotos para esta combinación de filtros.</p>
        </div>`;
      countEl.textContent = '0 fotos';
      return;
    }

    countEl.textContent = fmtCount(filtered.length);

    filtered.forEach((photo, i) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.animationDelay = `${Math.min(i, 24) * 30}ms`;
      card.innerHTML = `
        <img src="${photo.src}" alt="${photo.client}" loading="lazy">
        <div class="card__overlay">
          <div class="card__info">
            <span class="card__client">${photo.client}</span>
            <span class="card__cat">${photo.categoryLabel}</span>
          </div>
        </div>`;
      card.addEventListener('click', () => openLb(i));
      gallery.appendChild(card);
    });
  }

  // ── Populate client dropdown ─────────────────────────
  function populateClients() {
    const clients = [...new Set(PHOTOS.map(p => p.client))].sort();
    clientSel.innerHTML = '<option value="all">Todos los clientes</option>';
    clients.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      clientSel.appendChild(opt);
    });
  }

  // ── Clients section ──────────────────────────────────
  function renderClientsSection() {
    const map = {};
    PHOTOS.forEach(p => {
      if (!map[p.client]) map[p.client] = { name: p.client, count: 0 };
      map[p.client].count++;
    });

    const sorted = Object.values(map).sort((a, b) => b.count - a.count);
    clientsGrid.innerHTML = '';

    sorted.forEach(c => {
      const card = document.createElement('div');
      card.className = 'client-card';
      card.innerHTML = `
        <p class="client-card__name">${c.name}</p>
        <p class="client-card__count">${fmtCount(c.count)}</p>
        <span class="client-card__bar"></span>`;
      card.addEventListener('click', () => {
        // Activate client filter and scroll to gallery
        activeClient = c.name;
        clientSel.value = c.name;
        activeCat = 'all';
        catBtns.forEach(b => b.classList.toggle('active', b.dataset.cat === 'all'));
        render();
        document.getElementById('gallery').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      clientsGrid.appendChild(card);
    });
  }

  // ── Lightbox ─────────────────────────────────────────
  function openLb(i) {
    lbIndex = i;
    updateLb();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function moveLb(dir) {
    lbIndex = (lbIndex + dir + filtered.length) % filtered.length;
    updateLb();
  }

  function updateLb() {
    const p = filtered[lbIndex];
    lbImg.src             = p.src;
    lbImg.alt             = p.client;
    lbClient.textContent  = p.client;
    lbCat.textContent     = p.categoryLabel;
    lbCounter.textContent = `${lbIndex + 1} / ${filtered.length}`;
  }

  // ── Touch swipe for lightbox ─────────────────────────
  let touchStartX = 0;
  lb.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) moveLb(dx < 0 ? 1 : -1);
  });

  // ── Events ───────────────────────────────────────────
  function bindEvents() {
    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCat = btn.dataset.cat;
        render();
      });
    });

    clientSel.addEventListener('change', () => {
      activeClient = clientSel.value;
      render();
    });

    lbClose.addEventListener('click', closeLb);
    lbPrev.addEventListener('click',  () => moveLb(-1));
    lbNext.addEventListener('click',  () => moveLb(1));

    lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });

    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape')     closeLb();
      if (e.key === 'ArrowLeft')  moveLb(-1);
      if (e.key === 'ArrowRight') moveLb(1);
    });
  }

  // ── Footer year ──────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Init ─────────────────────────────────────────────
  populateClients();
  render();
  renderClientsSection();
  bindEvents();

})();
