/* dr.GUT Fibras LP - seletor de kit, carrinho e checkout Yampi. Vanilla JS, sem build.
 *
 * Como a loja funciona de verdade (conferido na Shopify e na Yampi em 2026-10-27):
 *  - Existe UM produto com UMA variante (48293682151642). Os "kits" são a mesma
 *    lata em quantidade 1, 2, 3..., com desconto automático por quantidade.
 *  - O checkout é a Yampi (seguro.drgut.com.br). Ela recebe a quantidade e aplica
 *    o desconto do kit sozinha, além do Pix com 5% OFF.
 *  - Os totais abaixo (TIERS) são os que o checkout da Yampi mostra. Se a loja
 *    mudar preço ou desconto, atualize aqui E nos valores escritos no HTML.
 */
(function () {
  'use strict';

  // ---- config da loja -----------------------------------------------------
  var YAMPI = {
    checkout: 'https://seguro.drgut.com.br/checkout',
    productOptionId: '304113092',                        // SKU da lata na Yampi
    storeToken: 'THcvrcOSUtt5Y4PpaI9yngzmcYrnxTzsT4o6R4z1' // token público da loja (aparece na URL de todo checkout)
  };
  var SHOPIFY = { shop: 'https://www.drgut.com.br', variant: '48293682151642' }; // fallback
  var UNIT = 147.00;        // preço da lata
  var COMPARE = 160.00;     // "compare at" da lata
  var TIERS = { 1: 147.00, 2: 247.00, 3: 336.99 }; // totais por quantidade (Yampi)
  var UNIT_4PLUS = 112.34;  // 4 ou mais latas: R$ 34,66 OFF por unidade
  var FREE_SHIP_FROM = 247; // "Frete grátis acima de R$ 247"
  var PIX_OFF = 0.05;       // 5% no Pix
  var KEY = 'drgut_cart_v2';

  // ---- helpers ------------------------------------------------------------
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function brl(n) { return 'R$ ' + n.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function round2(n) { return Math.round(n * 100) / 100; }
  function totalFor(qty) { return qty >= 4 ? round2(UNIT_4PLUS * qty) : TIERS[qty]; }
  function compareFor(qty) { return round2(COMPARE * qty); }
  function latas(qty) { return qty + (qty === 1 ? ' lata' : ' latas'); }

  // UTMs da página seguem pro checkout (atribuição do anúncio)
  function utms() {
    var out = [];
    try {
      var sp = new URLSearchParams(window.location.search);
      sp.forEach(function (v, k) { if (/^(utm_|fbclid|gclid|ttclid|hef_|tw_)/.test(k)) out.push(encodeURIComponent(k) + '=' + encodeURIComponent(v)); });
    } catch (e) {}
    return out.length ? '&' + out.join('&') : '';
  }

  function checkoutUrl(qty) {
    if (YAMPI.checkout && YAMPI.productOptionId) {
      return YAMPI.checkout +
        '?product_option_id%5B0%5D=' + YAMPI.productOptionId +
        '&quantity%5B0%5D=' + qty +
        '&redirectTo=checkout&skipToCheckout=1&clearCart=1&isShopify=1' +
        '&store_token=' + YAMPI.storeToken +
        '&metadata%5Bsource_platform%5D=shopify' + utms();
    }
    // fallback: checkout nativo da Shopify (mesmos descontos automáticos)
    return SHOPIFY.shop + '/cart/' + SHOPIFY.variant + ':' + qty;
  }

  // localStorage com fallback em memória (modo privado / storage bloqueado)
  var mem = null;
  function readQty() {
    if (mem !== null) return mem;
    try { var v = parseInt(localStorage.getItem(KEY), 10); return v > 0 ? v : 0; } catch (e) { return 0; }
  }
  function writeQty(q) {
    try { localStorage.setItem(KEY, String(q)); mem = null; } catch (e) { mem = q; }
  }

  // ---- seletor de kit (radiogroup acessível) ------------------------------
  var plans = $$('.plan');
  var current = null; // quantidade selecionada

  function select(el, focus) {
    if (!el) return;
    plans.forEach(function (p) {
      var on = p === el;
      p.setAttribute('aria-checked', on ? 'true' : 'false');
      p.tabIndex = on ? 0 : -1;
    });
    current = parseInt(el.dataset.qty, 10);
    if (focus) el.focus();
    paint();
  }

  // Mantém estático e dinâmico iguais: o HTML já nasce com o kit padrão
  // selecionado e os mesmos valores que esta função escreve.
  function paint() {
    if (!current) return;
    var total = totalFor(current), compare = compareFor(current);
    var set = function (sel, val) { var el = $(sel); if (el) el.textContent = val; };
    set('[data-r-label]', latas(current) + ' de dr.GUT Fibras (' + (current * 30) + ' doses)');
    set('[data-r-compare]', brl(compare));
    set('[data-r-save]', '-' + brl(round2(compare - total)));
    set('[data-r-ship]', total >= FREE_SHIP_FROM ? 'Grátis' : 'Calculado no checkout');
    set('[data-r-total]', brl(total));
    set('[data-r-inst]', '3x de ' + brl(round2(total / 3)));
    set('[data-r-pix]', brl(round2(total * (1 - PIX_OFF))));
    set('[data-add-price]', brl(total));
    set('[data-sticky-price]', brl(total));
    var buyNow = $('[data-buy-now]'); if (buyNow) buyNow.href = checkoutUrl(current);
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
  if (plans.length) select($('.plan[aria-checked="true"]') || plans[0], false);

  // Botões que vão direto pro checkout com uma quantidade fixa (cards de kit)
  $$('[data-checkout-qty]').forEach(function (a) {
    var q = parseInt(a.dataset.checkoutQty, 10);
    if (q > 0) a.href = checkoutUrl(q);
  });

  // ---- galeria ------------------------------------------------------------
  var main = $('#galMain');
  $$('.thumb').forEach(function (t) {
    t.addEventListener('click', function () {
      if (main) { main.src = t.dataset.src; if (t.dataset.srcset) main.srcset = t.dataset.srcset; }
      $$('.thumb').forEach(function (x) { x.classList.toggle('is-on', x === t); });
    });
  });

  // ---- carrinho (uma linha: a lata, em quantidade) ------------------------
  var cart = $('#cart'), ovl = $('[data-cart-ovl]'), lastFocus = null;

  function render() {
    var qty = readQty();
    var box = $('[data-cart-lines]');
    var empty = $('[data-cart-empty]');
    var total = qty ? totalFor(qty) : 0;

    if (box) {
      box.innerHTML = '';
      if (qty) {
        var row = document.createElement('div');
        row.className = 'line';
        var img = qty >= 3 ? 'kit3' : (qty === 2 ? 'kit2' : 'kit1');
        row.innerHTML =
          '<img src="assets/img/' + img + '-160.webp" alt="" width="160" height="160">' +
          '<div class="line__t"><p class="line__n">dr.GUT Fibras · ' + latas(qty) + '</p>' +
          '<p class="line__p"><s>' + brl(compareFor(qty)) + '</s> ' + brl(total) + '</p></div>' +
          '<div class="line__qty">' +
            '<button type="button" data-dec aria-label="Diminuir quantidade">-</button>' +
            '<span>' + qty + '</span>' +
            '<button type="button" data-inc aria-label="Aumentar quantidade">+</button>' +
          '</div>';
        box.appendChild(row);
      }
    }

    if (empty) empty.hidden = qty > 0;
    var t = $('[data-cart-total]'); if (t) t.textContent = brl(total);
    var p = $('[data-cart-pix]'); if (p) p.textContent = brl(round2(total * (1 - PIX_OFF)));
    var ship = $('[data-cart-ship]'); if (ship) ship.hidden = !(total >= FREE_SHIP_FROM);

    var badge = $('[data-cart-count]');
    if (badge) { badge.textContent = qty; badge.hidden = qty === 0; }

    var co = $('[data-checkout]');
    if (co) {
      co.href = qty ? checkoutUrl(qty) : '#';
      co.setAttribute('aria-disabled', qty ? 'false' : 'true');
    }
  }

  function add() {
    if (!current) return;
    // Adicionar de novo o mesmo kit soma as latas (a Yampi recalcula o desconto)
    writeQty(readQty() + current);
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
    if (!cart || cart.hidden) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab') return;
    var f = focusables(); if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  if (cart) cart.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-dec],[data-inc]') : null;
    if (!t) return;
    var q = readQty() + (t.hasAttribute('data-dec') ? -1 : 1);
    writeQty(q < 1 ? 0 : q);
    render();
  });

  if (cart) cart.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('[data-checkout]') : null;
    if (a && a.getAttribute('aria-disabled') === 'true') e.preventDefault();
  });

  render();

  // ---- CTA fixo mobile ----------------------------------------------------
  // index.html usa .hero/#comprar; laxante-v1.html usa .ahero/#oferta
  var sticky = $('#sticky'), hero = $('.hero') || $('.ahero'), buy = $('#comprar') || $('#oferta');
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
