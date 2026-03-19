/* =====================================================
   FOTO SHOP ESTUDIO — app.js
   ===================================================== */
(function () {
  'use strict';

  // ── Load data.js fresh (cache-busting) ──────────────
  var dataScript = document.createElement('script');
  dataScript.src = 'js/data.js?v=' + Date.now();
  dataScript.onload = init;
  dataScript.onerror = function() {
    console.error('No se pudo cargar data.js');
  };
  document.head.appendChild(dataScript);

  // ── State ───────────────────────────────────────────
  var activeCat    = 'all';
  var activeClient = 'all';
  var filtered     = [];
  var lbIndex      = 0;

  // ── DOM ─────────────────────────────────────────────
  var gallery      = document.getElementById('gallery');
  var countEl      = document.getElementById('photoCount');
  var clientSel    = document.getElementById('clientSelect');
  var catBtns      = document.querySelectorAll('.cat');
  var clientsGrid  = document.getElementById('clientsGrid');
  var clientTitle  = document.getElementById('clientTitle');
  var clientTitleName = document.getElementById('clientTitleName');

  var lb           = document.getElementById('lb');
  var lbImg        = document.getElementById('lbImg');
  var lbClient     = document.getElementById('lbClient');
  var lbCat        = document.getElementById('lbCat');
  var lbCounter    = document.getElementById('lbCounter');
  var lbClose      = document.getElementById('lbClose');
  var lbPrev       = document.getElementById('lbPrev');
  var lbNext       = document.getElementById('lbNext');

  // ── Helpers ─────────────────────────────────────────
  function getFiltered() {
    return PHOTOS.filter(function(p) {
      var catOk    = activeCat    === 'all' || p.category === activeCat;
      var clientOk = activeClient === 'all' || p.client   === activeClient;
      return catOk && clientOk;
    });
  }

  function fmtCount(n) {
    return n === 1 ? '1 foto' : n + ' fotos';
  }

  // ── Render Gallery ───────────────────────────────────
  function render() {
    filtered = getFiltered();
    gallery.innerHTML = '';

    if (filtered.length === 0) {
      gallery.innerHTML =
        '<div class="empty">' +
        '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">' +
        '<rect x="3" y="3" width="18" height="18" rx="2"/>' +
        '<path d="M3 9l4-4 4 4 4-4 4 4"/>' +
        '<circle cx="8.5" cy="14.5" r="1.5"/>' +
        '</svg>' +
        '<h3>Sin resultados</h3>' +
        '<p>No hay fotos para esta combinación de filtros.</p>' +
        '</div>';
      countEl.textContent = '0 fotos';
      return;
    }

    countEl.textContent = fmtCount(filtered.length);

    filtered.forEach(function(photo, i) {
      var card = document.createElement('div');
      card.className = 'card';
      card.style.animationDelay = Math.min(i, 24) * 30 + 'ms';
      card.innerHTML =
        '<img src="' + photo.src + '" alt="' + photo.client + '" loading="lazy">' +
        '<div class="card__overlay">' +
        '<div class="card__info">' +
        '<span class="card__client">' + photo.client + '</span>' +
        '<span class="card__cat">' + photo.categoryLabel + '</span>' +
        '</div></div>';
      card.addEventListener('click', (function(idx) {
        return function() { openLb(idx); };
      })(i));
      gallery.appendChild(card);
    });
  }

  // ── Populate client dropdown ─────────────────────────
  function populateClients() {
    var clients = [];
    PHOTOS.forEach(function(p) { if (clients.indexOf(p.client) === -1) clients.push(p.client); });
    clients.sort();
    clientSel.innerHTML = '<option value="all">Todos los clientes</option>';
    clients.forEach(function(c) {
      var opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      clientSel.appendChild(opt);
    });
  }

  // ── Clients section ──────────────────────────────────
  function renderClientsSection() {
    var map = {};
    PHOTOS.forEach(function(p) {
      if (!map[p.client]) map[p.client] = { name: p.client, count: 0 };
      map[p.client].count++;
    });

    var sorted = Object.values(map).sort(function(a, b) { return b.count - a.count; });
    clientsGrid.innerHTML = '';

    sorted.forEach(function(c) {
      var card = document.createElement('div');
      card.className = 'client-card';
      card.innerHTML =
        '<p class="client-card__name">' + c.name + '</p>' +
        '<p class="client-card__count">' + fmtCount(c.count) + '</p>' +
        '<span class="client-card__bar"></span>';
      card.addEventListener('click', function() {
        activeClient = c.name;
        clientSel.value = c.name;
        activeCat = 'all';
        catBtns.forEach(function(b) { b.classList.toggle('active', b.dataset.cat === 'all'); });
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
    var p = filtered[lbIndex];
    lbImg.src             = p.src;
    lbImg.alt             = p.client;
    lbClient.textContent  = p.client;
    lbCat.textContent     = p.categoryLabel;
    lbCounter.textContent = (lbIndex + 1) + ' / ' + filtered.length;
  }

  // ── Touch swipe for lightbox ─────────────────────────
  var touchStartX = 0;
  lb.addEventListener('touchstart', function(e) { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function(e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) moveLb(dx < 0 ? 1 : -1);
  });

  // ── Events ───────────────────────────────────────────
  function bindEvents() {
    catBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        catBtns.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        activeCat = btn.dataset.cat;
        render();
      });
    });

    clientSel.addEventListener('change', function() {
      activeClient = clientSel.value;
      render();
    });

    lbClose.addEventListener('click', closeLb);
    lbPrev.addEventListener('click', function() { moveLb(-1); });
    lbNext.addEventListener('click', function() { moveLb(1); });

    lb.addEventListener('click', function(e) { if (e.target === lb) closeLb(); });

    document.addEventListener('keydown', function(e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape')     closeLb();
      if (e.key === 'ArrowLeft')  moveLb(-1);
      if (e.key === 'ArrowRight') moveLb(1);
    });
  }

  // ── Footer year ──────────────────────────────────────
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Init (called after data.js loads) ────────────────
  function init() {
    // Show fixed title from admin config
    if (typeof FEATURED_CLIENT !== 'undefined' && FEATURED_CLIENT) {
      clientTitleName.textContent = FEATURED_CLIENT;
      clientTitle.style.display = 'block';
    }
    populateClients();
    render();
    renderClientsSection();
    bindEvents();
  }

})();
