/* dr.GUT LPs - rastreamento, espelhando o que a loja (drgut.com.br) já faz:
 *  - mesmo contêiner do Google Tag Manager (GTM-WW7Q4F65), que carrega o GA4
 *    (G-VFRPPK4TKG) e o Pixel da Meta (1903636167271234);
 *  - mesmos eventos e formato do dataLayer: view_item, add_to_cart, begin_checkout,
 *    com event_id para deduplicação navegador/servidor na Meta;
 *  - Consent Mode v2 com o mesmo padrão da loja (granted até existir um banner).
 * Carregado antes de app.js. Não depende dele: se app.js falhar, o view_item sai.
 */
(function () {
  'use strict';
  var GTM_ID = 'GTM-WW7Q4F65';
  var PRODUCT = { id: '9416963490010', variant: '48293682151642', name: 'dr.GUT Fibras', brand: 'Dr.Gut', price: 147.0 };

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { dataLayer.push(arguments); };
  gtag('consent', 'default', {
    ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted',
    analytics_storage: 'granted', functionality_storage: 'granted', security_storage: 'granted'
  });
  window.__eid = window.__eid || function () {
    return 'e' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
  };

  function item(qty, unitPrice) {
    return {
      item_id: 'shopify_ZZ_' + PRODUCT.id + '_' + PRODUCT.variant,
      item_variant_id: PRODUCT.variant,
      item_name: PRODUCT.name,
      item_brand: PRODUCT.brand,
      item_category: '',
      item_variant: 'Default Title',
      price: unitPrice != null ? unitPrice : PRODUCT.price,
      quantity: qty || 1
    };
  }
  function push(event, value, qty, unitPrice, extra) {
    dataLayer.push({ ecommerce: null });
    var ev = { event: event, event_id: __eid(), ecommerce: { currency: 'BRL', value: Number(value || 0), items: [item(qty, unitPrice)] } };
    if (extra) for (var k in extra) ev[k] = extra[k];
    dataLayer.push(ev);
  }

  // contexto da página (mesmas chaves da loja)
  var pageName = (location.pathname.replace(/^\/|\.html$/g, '') || 'home');
  dataLayer.push({ customer: { id: null, type: 'guest' }, page_type: 'landing', page_name: pageName });

  // view_item ao abrir a LP (a LP é a página do produto)
  push('view_item', PRODUCT.price, 1, PRODUCT.price);

  // GTM
  (function (w, d, s, l, i) {
    w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', GTM_ID);

  // API usada pelo app.js (carrinho) e pelos botões de kit
  window.__drgutTrack = {
    addToCart: function (qty, total) { push('add_to_cart', total, qty, qty ? Math.round(total / qty * 100) / 100 : PRODUCT.price); },
    beginCheckout: function (qty, total) { push('begin_checkout', total, qty, qty ? Math.round(total / qty * 100) / 100 : PRODUCT.price); },
    selectKit: function (qty, total) { dataLayer.push({ event: 'select_item', event_id: __eid(), kit_qty: qty, kit_total: Number(total || 0) }); }
  };

  // begin_checkout nos botões que vão direto pro checkout (cards de kit) e no botão do carrinho
  document.addEventListener('click', function (ev) {
    var el = ev.target && ev.target.closest ? ev.target.closest('[data-checkout-qty], [data-checkout]') : null;
    if (!el) return;
    var qty = parseInt(el.getAttribute('data-checkout-qty') || el.getAttribute('data-qty') || '0', 10);
    var total = parseFloat(el.getAttribute('data-total') || '0');
    if (el.hasAttribute('data-checkout-qty')) window.__drgutTrack.addToCart(qty, total);
    window.__drgutTrack.beginCheckout(qty, total);
  }, true);
})();
