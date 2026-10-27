(() => {
  document.documentElement.classList.add('js');
  const VARIANT = '48293682151642';
  const brl = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  // Kit selector: price, image, cart permalink
  const buy = document.querySelector('[data-buy]');
  const total = document.querySelector('[data-total]');
  const kitImg = document.querySelector('[data-kit-img]');
  const setKit = (input) => {
    const qty = input.value;
    total.textContent = brl(parseFloat(input.dataset.price));
    buy.href = `https://www.drgut.com.br/cart/${VARIANT}:${qty}`;
    const next = `assets/kit${qty}.webp`;
    if (!kitImg.src.endsWith(next)) {
      kitImg.classList.add('swap');
      setTimeout(() => { kitImg.src = next; kitImg.onload = () => kitImg.classList.remove('swap'); }, 180);
    }
  };
  document.querySelectorAll('input[name="kit"]').forEach((el) => {
    el.addEventListener('change', () => setKit(el));
    if (el.checked) setKit(el);
  });

  // Gallery carousel
  const slides = document.querySelector('[data-slides]');
  const thumbs = document.querySelector('[data-thumbs]');
  const imgs = [...slides.querySelectorAll('img')];
  let current = 0;
  imgs.forEach((img, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Ver foto ${i + 1} de ${imgs.length}`);
    const t = document.createElement('img');
    t.src = img.getAttribute('src'); t.alt = ''; t.loading = 'lazy'; t.width = 120; t.height = 120;
    b.append(t);
    b.addEventListener('click', () => go(i));
    thumbs.append(b);
  });
  const mark = (i) => {
    current = i;
    [...thumbs.children].forEach((b, j) => b.setAttribute('aria-current', j === i ? 'true' : 'false'));
  };
  const go = (i) => {
    const n = (i + imgs.length) % imgs.length;
    slides.scrollTo({ left: slides.clientWidth * n, behavior: 'smooth' });
    mark(n);
  };
  mark(0);
  let st;
  slides.addEventListener('scroll', () => {
    clearTimeout(st);
    st = setTimeout(() => mark(Math.round(slides.scrollLeft / slides.clientWidth)), 80);
  }, { passive: true });
  document.querySelector('[data-prev]').addEventListener('click', () => go(current - 1));
  document.querySelector('[data-next]').addEventListener('click', () => go(current + 1));

  // Nutrition label modal
  const modal = document.querySelector('[data-label-modal]');
  document.querySelector('[data-open-label]').addEventListener('click', () => modal.showModal());
  modal.querySelector('[data-close]').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });

  // Reveal for reasons (content visible by default without JS)
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -12% 0px' });
    document.querySelectorAll('.reason').forEach((r) => io.observe(r));
  } else {
    document.querySelectorAll('.reason').forEach((r) => r.classList.add('in'));
  }

  // Sticky mobile buy bar: after hero CTA leaves, hidden while the buy module is on screen
  const sticky = document.querySelector('[data-sticky]');
  const heroCta = document.querySelector('[data-hero-cta]');
  const buySection = document.querySelector('.buy');
  if (sticky && 'IntersectionObserver' in window) {
    sticky.hidden = false;
    let pastHero = false, inBuy = false;
    const sync = () => sticky.classList.toggle('show', pastHero && !inBuy);
    new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting && e.boundingClientRect.top < 0; sync(); }).observe(heroCta);
    new IntersectionObserver(([e]) => { inBuy = e.isIntersecting; sync(); }).observe(buySection);
  }

  // Capture form (front-end only until an ESP is wired)
  const form = document.querySelector('[data-capture]');
  const input = form.querySelector('input');
  const label = form.querySelector('[data-cap-label]');
  const toggle = form.querySelector('[data-cap-toggle]');
  const msg = form.querySelector('[data-cap-msg]');
  let mode = 'whatsapp';
  toggle.addEventListener('click', () => {
    mode = mode === 'whatsapp' ? 'email' : 'whatsapp';
    const email = mode === 'email';
    input.type = email ? 'email' : 'tel';
    input.inputMode = email ? 'email' : 'tel';
    input.autocomplete = email ? 'email' : 'tel';
    input.placeholder = email ? 'voce@email.com' : '(11) 90000-0000';
    label.textContent = email ? 'Seu e-mail' : 'Seu WhatsApp';
    toggle.textContent = email ? 'Prefiro receber pelo WhatsApp' : 'Prefiro receber por e-mail';
    input.value = ''; input.removeAttribute('aria-invalid'); msg.textContent = '';
    input.focus();
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = input.value.trim();
    const ok = mode === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) : v.replace(/\D/g, '').length >= 10;
    msg.className = 'cap-msg ' + (ok ? 'ok' : 'err');
    if (!ok) {
      input.setAttribute('aria-invalid', 'true');
      msg.textContent = mode === 'email'
        ? 'Confira o e-mail: falta o @ ou o domínio (ex.: voce@email.com).'
        : 'Confira o número: use DDD + celular (ex.: 11 90000-0000).';
      input.focus();
      return;
    }
    input.removeAttribute('aria-invalid');
    msg.textContent = 'Pronto! Seu cupom de 10% OFF está a caminho.';
    form.reset();
  });
})();
