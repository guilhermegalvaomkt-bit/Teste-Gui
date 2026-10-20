/* dr.GUT Fibras LP - carrinho, seletor de kit e animações. Vanilla JS, sem build. */
(function () {
  'use strict';

  // ---- config da loja -----------------------------------------------------
  // TROCAR PELOS DADOS REAIS DA LOJA ANTES DE RODAR TRÁFEGO:
  //   SHOP      -> domínio do checkout
  //   DISCOUNT  -> código do cupom (aplicado UMA vez no checkout)
  //   data-variant em cada .plan no HTML -> IDs reais de variante
  var SHOP = 'https://www.drgut.com.br';
  var DISCOUNT = '';            // vazio = sem cupom no link
  var FREE_SHIP_FROM = 247;     // "Frete grátis acima de R$ 247"
  var PIX_OFF = 0.05;           // 5% no Pix
  var KEY = 'drgut_cart_v1';

  // ---- helpers ------------------------------------------------------------
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  function brl(n) {
    return 'R$ ' + n.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  // localStorage com fallback em memória (modo privado / storage bloqueado)
  var mem = null;
  function read() {
    if (mem) return mem;
    try {
      var raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }
  function write(lines) {
    try { localStorage.setItem(KEY, JSON.stringify(lines)); mem = null; }
    catch (e) { mem = lines; }
  }

  // ---- seletor de kit (radiogroup acessível) ------------------------------
  var plans = $$('.plan');
  var group = $('#plans');
  var current = null;

  function planData(el) {
    return {
      qty: parseInt(el.dataset.qty, 10),
      variant: el.dataset.variant,
      total: parseFloat(el.dataset.total),
      compare: parseFloat(el.dataset.compare),
      save: parseFloat(el.dataset.save),
      perdose: parseFloat(el.dataset.perdose),
      freeShip: el.dataset.ship === '1'
    };
  }

  function select(el, focus) {
    if (!el) return;
    plans.forEach(function (p) {
      var on = p === el;
      p.setAttribute('aria-checked', on ? 'true' : 'false');
      p.tabIndex = on ? 0 : -1;
    });
    current = planData(el);
    if (focus) el.focus();
    paint();
  }

  // Mantém estático e dinâmico iguais: o HTML já nasce com o kit de 2
  // selecionado e os mesmos valores que esta função escreve.
  function paint() {
    if (!current) return;
    var doses = current.qty * 30;
    var label = current.qty + (current.qty === 1 ? ' lata' : ' latas') +
                ' de dr.GUT Fibras (' + doses + ' doses)';

    var set = function (sel, val) { var el = $(sel); if (el) el.textContent = val; };
    set('[data-r-label]', label);
    set('[data-r-compare]', brl(current.compare));
    set('[data-r-save]', '-' + brl(current.save));
    set('[data-r-ship]', current.freeShip ? 'Grátis' : 'Calculado no checkout');
    set('[data-r-total]', brl(current.total));
    set('[data-r-pix]', brl(current.total * (1 - PIX_OFF)));
    set('[data-add-price]', brl(current.total));
    set('[data-sticky-price]', brl(current.total));
  }

  plans.forEach(function (el) {
    el.addEventListener('click', function () { select(el, false); });
    el.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); select(el, true); return; }
      var i = plans.indexOf(el), next = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = plans[(i + 1) % plans.length];
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = plans[(i - 1 + plans.length) % plans.length];
      if (next) { e.preventDefault(); select(next, true); }
    });
  });
  if (group) select($('.plan[aria-checked="true"]') || plans[0], false);

  // ---- galeria ------------------------------------------------------------
  var main = $('#galMain');
  $$('.thumb').forEach(function (t) {
    t.addEventListener('click', function () {
      if (main) main.src = t.dataset.src;
      $$('.thumb').forEach(function (x) { x.classList.toggle('is-on', x === t); });
    });
  });

  // ---- carrinho -----------------------------------------------------------
  var cart = $('#cart'), ovl = $('[data-cart-ovl]'), lastFocus = null;

  function render() {
    var lines = read();
    var box = $('[data-cart-lines]');
    var empty = $('[data-cart-empty]');
    var total = 0, units = 0;

    if (box) box.innerHTML = '';
    lines.forEach(function (l, idx) {
      total += l.total * l.n;
      units += l.qty * l.n;
      if (!box) return;
      var row = document.createElement('div');
      row.className = 'line';
      row.innerHTML =
        '<img src="assets/img/kit' + l.qty + '.webp" alt="" width="320" height="320">' +
        '<div class="line__t"><p class="line__n">' + l.qty + (l.qty === 1 ? ' lata' : ' latas') + '</p>' +
        '<p class="line__p">' + brl(l.total) + '</p></div>' +
        '<div class="line__qty">' +
          '<button type="button" data-dec="' + idx + '" aria-label="Diminuir quantidade">-</button>' +
          '<span>' + l.n + '</span>' +
          '<button type="button" data-inc="' + idx + '" aria-label="Aumentar quantidade">+</button>' +
        '</div>';
      box.appendChild(row);
    });

    if (empty) empty.hidden = lines.length > 0;
    var t = $('[data-cart-total]'); if (t) t.textContent = brl(total);
    var p = $('[data-cart-pix]'); if (p) p.textContent = brl(total * (1 - PIX_OFF));
    var ship = $('[data-cart-ship]'); if (ship) ship.hidden = !(total > FREE_SHIP_FROM);

    var badge = $('[data-cart-count]');
    if (badge) { badge.textContent = units; badge.hidden = units === 0; }

    var co = $('[data-checkout]');
    if (co) {
      // Permalink da Shopify: /cart/VARIANTE:QTD,VARIANTE:QTD?discount=CODIGO
      var parts = lines.map(function (l) { return l.variant + ':' + l.n; });
      co.href = parts.length
        ? SHOP + '/cart/' + parts.join(',') + (DISCOUNT ? '?discount=' + DISCOUNT : '')
        : '#';
      co.setAttribute('aria-disabled', parts.length ? 'false' : 'true');
    }
  }

  function add() {
    if (!current) return;
    var lines = read();
    var hit = null;
    lines.forEach(function (l) { if (l.variant === current.variant) hit = l; });
    if (hit) hit.n += 1;                                  // adição duplicada funde
    else lines.push({ variant: current.variant, qty: current.qty, total: current.total, n: 1 });
    write(lines);
    render();
    open();
  }

  function focusables() {
    return $$('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])', cart);
  }

  function open() {
    lastFocus = document.activeElement;
    if (ovl) ovl.hidden = false;
    if (cart) { cart.hidden = false; var f = focusables(); if (f[0]) f[0].focus(); }
    document.body.style.overflow = 'hidden';
  }

  function close() {
    if (ovl) ovl.hidden = true;
    if (cart) cart.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  $$('[data-cart-open]').forEach(function (b) { b.addEventListener('click', open); });
  $$('[data-cart-close]').forEach(function (b) { b.addEventListener('click', close); });
  if (ovl) ovl.addEventListener('click', close);
  $$('[data-add]').forEach(function (b) { b.addEventListener('click', add); });

  document.addEventListener('keydown', function (e) {
    if (cart && cart.hidden) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab') return;
    var f = focusables(); if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  if (cart) cart.addEventListener('click', function (e) {
    var dec = e.target.getAttribute && e.target.getAttribute('data-dec');
    var inc = e.target.getAttribute && e.target.getAttribute('data-inc');
    if (dec === null && inc === null) return;
    var lines = read();
    var i = parseInt(dec !== null ? dec : inc, 10);
    if (!lines[i]) return;
    lines[i].n += (dec !== null ? -1 : 1);
    if (lines[i].n < 1) lines.splice(i, 1);
    write(lines);
    render();
  });

  render();

  // ---- CTA fixo mobile ----------------------------------------------------
  var sticky = $('#sticky'), hero = $('.hero'), buy = $('#comprar');
  function stickyCheck() {
    if (!sticky || !hero) return;
    var pastHero = hero.getBoundingClientRect().bottom < 0;
    var overBuy = false;
    if (buy) {
      var r = buy.getBoundingClientRect();
      overBuy = r.top < window.innerHeight && r.bottom > 0;
    }
    sticky.hidden = !(pastHero && !overBuy);
  }
  window.addEventListener('scroll', stickyCheck, { passive: true });
  window.addEventListener('resize', stickyCheck);
  stickyCheck();

  // ---- animações (respeitam prefers-reduced-motion via CSS) ---------------
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    $$('.sec, .facts, .stats, .guar').forEach(function (el) { el.classList.add('fx'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        io.unobserve(en.target);
        $$('[data-count]', en.target).forEach(countUp);
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    $$('.fx').forEach(function (el) { io.observe(el); });
  } else {
    $$('[data-count]').forEach(countUp);
  }

  function countUp(el) {
    var to = parseFloat(el.dataset.count);
    var dec = parseInt(el.dataset.dec || '0', 10);
    var t0 = null, dur = 900;
    function tick(ts) {
      if (!t0) t0 = ts;
      var k = Math.min((ts - t0) / dur, 1);
      var v = (to * (1 - Math.pow(1 - k, 3))).toFixed(dec);
      el.textContent = String(v).replace('.', ',');
      if (k < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
})();
