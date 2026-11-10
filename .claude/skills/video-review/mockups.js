// Phone mockups for the review page. Everything is laid out in iPhone points on a
// 430 x 932 screen, using the measurements in safe-zones.md. Exposes window.Mockup.
(() => {
  const W = 430, H = 932;

  // ---------- icons (24x24 viewBox) ----------
  const P = {
    heart: '<path d="M12 20.3s-7.6-4.6-9.4-9.4C1.4 7.6 3.5 4.3 6.9 4.3c2.1 0 3.6 1.2 5.1 3.1 1.5-1.9 3-3.1 5.1-3.1 3.4 0 5.5 3.3 4.3 6.6-1.8 4.8-9.4 9.4-9.4 9.4z"/>',
    igComment: '<path d="M20.7 16.6A9.3 9.3 0 1 0 17.2 20l3.8 1.1z"/>',
    repost: '<path d="M17 2.8l3 3-3 3M4 11.2V9.6a3.8 3.8 0 0 1 3.8-3.8H20M7 21.2l-3-3 3-3M20 12.8v1.6a3.8 3.8 0 0 1-3.8 3.8H4"/>',
    send: '<path d="M21.5 2.5 10 13.6M21.5 2.5l-6.8 19-3.7-7.9-8.5-3.7z"/>',
    bookmark: '<path d="M18.5 21 12 15.6 5.5 21V4.2c0-.7.5-1.2 1.2-1.2h10.6c.7 0 1.2.5 1.2 1.2z"/>',
    lines: '<path d="M5 9.5h14M5 14.5h14"/>',
    dots: '<circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.6" fill="currentColor" stroke="none"/>',
    home: '<path d="M3.5 10.2 12 3.5l8.5 6.7V20a.8.8 0 0 1-.8.8H15v-6.3H9v6.3H4.3a.8.8 0 0 1-.8-.8z"/>',
    reels: '<rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><path d="M10 8.8v6.4l5.2-3.2z" fill="currentColor"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20.5 20.5l-4.6-4.6"/>',
    sliders: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
    music: '<path d="M9 18V5.5l11-2.2V16"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
    back: '<path d="M15 4.5 7.5 12l7.5 7.5"/>',
    close: '<path d="M5.5 5.5l13 13M18.5 5.5l-13 13"/>',
    muted: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3.2-3.2a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0L5.1 13.2a4 4 0 0 0 5.7 5.7l1-1"/>',
    chev: '<path d="M9 5l7 7-7 7"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    plusSq: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><path d="M12 8v8M8 12h8"/>',
    fbLike: '<path d="M7.5 10.5v9.5h-3v-9.5zM7.5 10.5l3.8-6.3c.4-.7 1.2-1 2-.7 1 .4 1.4 1.5 1.1 2.5l-.9 3.5h5c1.2 0 2.1 1.1 1.9 2.3l-1.2 6.8c-.2 1-1 1.7-2 1.7H7.5"/>',
    fbComment: '<path d="M12 3.5c4.9 0 8.5 3.4 8.5 7.6s-3.6 7.6-8.5 7.6c-1 0-2-.1-2.9-.4L4.5 20l1-3.6C4 15 3.5 13.2 3.5 11.1c0-4.2 3.6-7.6 8.5-7.6z"/>',
    fbShare: '<path d="M13.5 4.5 21 11.5l-7.5 7v-4c-5 0-8.2 1.4-10.5 4.5 1-5 4-9.3 10.5-10z"/>',
    messenger: '<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.4 6.4V21l3.1-1.7c.8.2 1.6.3 2.5.3 5 0 9-3.7 9-8.3S17 3 12 3z"/><path d="M7.5 13.5l3-3.2 2.2 2 3.8-2.8-3 3.2-2.2-2z" fill="currentColor"/>',
    inbox: '<path d="M4 5.5h16v11h-6l-2 3-2-3H4z"/>',
    friends: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5"/><circle cx="16.5" cy="8.5" r="2.6"/><path d="M15.5 14.2c2.6-.4 4.6 1.3 5 4.3"/>',
    profile: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c.9-4 3.7-6 7.5-6s6.6 2 7.5 6"/>',
    live: '<rect x="3" y="6" width="18" height="12" rx="3"/><path d="M7 10v4h2.5M12 10v4M14.5 10l1.5 4 1.5-4"/>',
    // TikTok uses solid icons
    heartF: '<path fill="currentColor" stroke="none" d="M12 21s-8.3-5-10.2-10.3C.5 7 2.8 3.4 6.6 3.4c2.3 0 3.9 1.3 5.4 3.4 1.5-2.1 3.1-3.4 5.4-3.4 3.8 0 6.1 3.6 4.8 7.3C20.3 16 12 21 12 21z"/>',
    commentF: '<path fill="currentColor" stroke="none" d="M12 3.2c5.2 0 9.3 3.5 9.3 8s-4.1 8-9.3 8c-.9 0-1.8-.1-2.7-.3L4.6 21l.7-3.8C3.7 15.7 2.7 13.6 2.7 11.2c0-4.5 4.1-8 9.3-8z"/><circle cx="8" cy="11.2" r="1.2" fill="#000" opacity=".55"/><circle cx="12" cy="11.2" r="1.2" fill="#000" opacity=".55"/><circle cx="16" cy="11.2" r="1.2" fill="#000" opacity=".55"/>',
    bookmarkF: '<path fill="currentColor" stroke="none" d="M18.8 21.5 12 16.3l-6.8 5.2V4c0-.9.7-1.5 1.5-1.5h10.6c.8 0 1.5.6 1.5 1.5z"/>',
    shareF: '<path fill="currentColor" stroke="none" d="M13.2 3.5 22 11.6l-8.8 8v-4.5c-5.6 0-8.9 1.6-11 5 .6-6.1 4.2-10.4 11-11z"/>',
  };

  const icon = (name, size, cx, cy, extra = '') =>
    `<svg class="mi" style="left:${cx - size / 2}px;top:${cy - size / 2}px;width:${size}px;height:${size}px;${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${P[name]}</svg>`;

  // text with its vertical centre at cy; align 'l' (x = left), 'c' (x = centre) or 'r' (x = right)
  const text = (x, cy, html, size, { weight = 400, color = '', align = 'l', max = 0, cls = '' } = {}) => {
    const lh = Math.round(size * 1.3);
    const pos = align === 'c' ? `left:${x}px;transform:translateX(-50%)` : align === 'r' ? `right:${W - x}px` : `left:${x}px`;
    return `<div class="mt ${cls}" style="${pos};top:${cy - lh / 2}px;font-size:${size}px;line-height:${lh}px;font-weight:${weight};${color ? `color:${color};` : ''}${max ? `max-width:${max}px;` : ''}">${html}</div>`;
  };
  const box = (x0, y0, x1, y1, style, inner = '') =>
    `<div class="mb" style="left:${x0}px;top:${y0}px;width:${x1 - x0}px;height:${y1 - y0}px;${style}">${inner}</div>`;
  const avatar = (cx, cy, d, letter, ring = 0, img = null) =>
    (ring ? box(cx - ring / 2, cy - ring / 2, cx + ring / 2, cy + ring / 2, 'border-radius:50%;background:conic-gradient(#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5,#feda75)') +
            box(cx - ring / 2 + 2, cy - ring / 2 + 2, cx + ring / 2 - 2, cy + ring / 2 - 2, 'border-radius:50%;background:#000') : '') +
    (img
      ? box(cx - d / 2, cy - d / 2, cx + d / 2, cy + d / 2, `border-radius:50%;background:#333 url('${img}') center/cover`)
      : box(cx - d / 2, cy - d / 2, cx + d / 2, cy + d / 2, `border-radius:50%;background:linear-gradient(135deg,#6a5cff,#3f3bd0);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:${Math.round(d * 0.45)}px`, letter));
  // Instagram's blue verified tick, sized to sit after a name
  const igTick = (size) => `<svg style="width:${size}px;height:${size}px;vertical-align:-${size * 0.18}px;margin-left:3px" viewBox="0 0 40 40"><path fill="#0095F6" d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Z"/><path fill="#fff" d="m17.21 26.6-5.858-5.857 2.121-2.121 3.737 3.737 9.218-9.218 2.121 2.121z"/></svg>`;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function statusBar(dark = false) {
    const c = dark ? '#000' : '#fff';
    return `<div class="mstatus" style="color:${c}">` +
      text(78, 30, '9:41', 17, { weight: 600, align: 'c' }) +
      `<svg class="mi" style="left:318px;top:23px;width:20px;height:13px" viewBox="0 0 20 13"><rect x="0" y="9" width="3.5" height="4" rx="1" fill="${c}"/><rect x="5.3" y="6" width="3.5" height="7" rx="1" fill="${c}"/><rect x="10.6" y="3" width="3.5" height="10" rx="1" fill="${c}"/><rect x="15.9" y="0" width="3.5" height="13" rx="1" fill="${c}"/></svg>` +
      `<svg class="mi" style="left:343px;top:23px;width:18px;height:13px" viewBox="0 0 18 13"><path d="M9 12.5 6.3 9.6a3.8 3.8 0 0 1 5.4 0zM3.6 6.9a7.6 7.6 0 0 1 10.8 0l-1.4 1.4a5.6 5.6 0 0 0-8 0zM.9 4.2a11.4 11.4 0 0 1 16.2 0l-1.4 1.4a9.4 9.4 0 0 0-13.4 0z" fill="${c}"/></svg>` +
      `<svg class="mi" style="left:367px;top:22px;width:28px;height:14px" viewBox="0 0 28 14"><rect x=".5" y=".5" width="23.5" height="13" rx="4" fill="none" stroke="${c}" opacity=".4"/><rect x="2.5" y="2.5" width="19.5" height="9" rx="2.5" fill="${c}"/><path d="M25.5 5v4c.9-.3 1.5-1.1 1.5-2s-.6-1.7-1.5-2z" fill="${c}" opacity=".4"/></svg>` +
      `</div>`;
  }

  // ---------- where the video sits on screen, per placement ----------
  // [x, y, w, h, cornerRadius]; the video is scaled to cover this box
  function media(id) {
    switch (id) {
      case 'igReels': case 'igReelsAd': return [0, 0, W, H, 0];
      case 'igStory': case 'igStoryAd': return [0, 59, W, 764, 7.7];
      case 'igFeed': return [0, 61, W, 692, 0];
      case 'tiktok': case 'tiktokAd': return [0, 0, W, 848.7, 0];
      case 'fbFeed': return [0, FB_T + 86, W, 537.5, 0];
      case 'fbFeedAd': return [0, FB_T + 86, W, 644.7, 0];
      case 'fbReels': case 'fbReelsAd': return [0, 0, W, 854, 0];
    }
    return [0, 0, W, H, 0];
  }
  const FB_T = 100; // y of the divider above the Facebook post
  const screenBg = (id) => (id.startsWith('fbFeed') ? '#fff' : id.startsWith('igStory') ? '#0C0F14' : '#000');

  // ---------- app chrome ----------
  function igReels(o, ad) {
    const h = esc(o.handle), L = o.handle[0]?.toUpperCase() || 'Y';
    let s = statusBar();
    s += text(190, 85, 'Reels', 22, { weight: 700, align: 'r', cls: 'sh' }) + text(204, 85, 'Friends', 22, { weight: 700, color: 'rgba(255,255,255,.6)', cls: 'sh' });
    s += icon('sliders', 26, 399, 85);
    const menu = ad ? 764.2 : 798.8;
    const rail = ad
      ? [['heart', -261.9, '3,812'], ['igComment', -190.8, '16'], ['repost', -118, ''], ['send', -69, '']]
      : [['heart', -360.6, '3,812'], ['igComment', -290, '16'], ['repost', -219.8, '38'], ['send', -142.1, '773'], ['bookmark', -69.6, '346']];
    for (const [n, off, count] of rail) {
      s += icon(n, 27, 399, menu + off, 'filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))');
      if (count) s += text(399, menu + off + 31, count, 12.5, { weight: 500, align: 'c', cls: 'sh' });
    }
    s += icon('lines', 24, 399, menu);
    if (ad) s += text(399, 805, 'Ad', 11, { weight: 500, align: 'c', color: 'rgba(255,255,255,.8)', cls: 'sh' });
    // bottom block
    const pc = 735;
    s += avatar(38, pc, 37.5, L, 44, o.avatar);
    s += text(68.5, pc - 9, h + (o.verified ? igTick(13) : ''), 14.5, { weight: 600, cls: 'sh' });
    s += text(68.5, pc + 11, ad ? 'Sponsored' : `♫ ${h} · Original audio`, 12.5, { cls: 'sh', color: 'rgba(255,255,255,.9)' });
    if (!ad) s += box(68.5 + h.length * 8.2 + (o.verified ? 30 : 14), pc - 21, 68.5 + h.length * 8.2 + (o.verified ? 92 : 76), pc - 1, 'border:1px solid rgba(255,255,255,.75);border-radius:7px', text(31, 10, 'Follow', 12.5, { weight: 600, align: 'c' }));
    if (ad) s += box(16, pc - 57.5 - 23.8, 362.7, pc - 57.5 + 23.8, 'border-radius:10px;background:rgba(255,255,255,.22);backdrop-filter:blur(10px)',
      text(14, 23.8, o.cta, 15, { weight: 600 }) + icon('chev', 18, 330, 23.8));
    if (o.caption) s += text(16, 775, `${esc(o.caption)}`, 13.5, { cls: 'sh clip', max: 360 });
    if (!ad) {
      s += avatar(23, 805.5, 18, '') + avatar(36, 805.5, 18, '');
      s += text(52, 805.5, 'Followed by <b>people you know</b> and <b>328 others</b>', 13, { cls: 'sh', color: 'rgba(255,255,255,.9)' });
    }
    s += box(16, 831, 414, 833, 'background:rgba(255,255,255,.3);border-radius:1px') + box(16, 831, 110, 833, 'background:#fff;border-radius:1px');
    s += igNav('reels', o);
    return s;
  }

  function igNav(active, o) {
    let s = box(53.5, 856, 376.5, 905, 'border-radius:25px;background:rgba(30,30,30,.82);backdrop-filter:blur(14px)');
    const xs = { home: 93, reels: 154, send: 215, search: 276, profile: 337 };
    s += box(xs[active] - 28, 860, xs[active] + 28, 901, 'border-radius:21px;background:rgba(255,255,255,.14)');
    s += icon('home', 24, xs.home, 880.5) + icon('reels', 24, xs.reels, 880.5) + icon('send', 23, xs.send, 880.5) + icon('search', 23, xs.search, 880.5);
    s += avatar(xs.profile, 880.5, 22, o.handle[0].toUpperCase(), 0, o.avatar);
    return `<div style="color:#fff">${s}</div>`;
  }

  function igStory(o, ad) {
    const h = esc(o.handle), L = o.handle[0]?.toUpperCase() || 'Y';
    let s = statusBar();
    s += box(8, 66, 422, 68, 'border-radius:1px;background:rgba(255,255,255,.35)') + box(8, 66, 140, 68, 'border-radius:1px;background:#fff');
    s += avatar(12.3 + 15.65, 77.3 + 15.65, 31.3, L, 0, o.avatar);
    s += text(56.7, ad ? 87 : 93.3, `${h}${o.verified ? igTick(12.5) : ''} <span style="font-weight:400;opacity:.7">${ad ? '' : '2h'}</span>`, 14.5, { weight: 600, cls: 'sh' });
    if (ad) s += text(56.7, 102, 'Sponsored', 12, { cls: 'sh', color: 'rgba(255,255,255,.85)' });
    s += icon('dots', 22, 372, 93.3) + icon('close', 22, 405, 93.3);
    if (ad) {
      const cy = 697.2;
      s += box(215 - 78, cy - 24.15, 215 + 78, cy + 24.15, 'border-radius:11px;background:#fff;color:#000;display:flex;align-items:center;justify-content:center;gap:6px;font-weight:600;font-size:15px',
        `<svg style="width:17px;height:17px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">${P.link}</svg>${esc(o.cta)}`);
    }
    const right = ad ? 294.3 : 329.7;
    s += box(16, 844.3, right, 887.7, 'border:1px solid rgba(255,255,255,.45);border-radius:22px', text(18, 21.7, 'Send message', 14.5, { color: 'rgba(255,255,255,.85)' }));
    s += icon('heart', 26, right + 26, 866) + icon('send', 25, right + 64, 866);
    if (ad) s += icon('dots', 22, 406, 866);
    return `<div style="color:#fff">${s}</div>`;
  }

  function igFeed(o) {
    const h = esc(o.handle), L = o.handle[0]?.toUpperCase() || 'Y';
    let s = avatar(10.7 + 16, 11.7 + 16, 32, L, 0, o.avatar);
    s += text(52.3, 27.7, h + (o.verified ? igTick(13) : ''), 15, { weight: 600 });
    s += icon('dots', 22, 408, 27.7);
    const B = 61 + 692;
    const ay = B + 24;
    s += icon('heart', 26, 24, ay) + icon('igComment', 25, 62, ay) + icon('repost', 25, 100, ay) + icon('send', 24, 138, ay) + icon('bookmark', 25, 406, ay);
    s += text(12, B + 58, 'Liked by <b>people you know</b> and <b>others</b>', 13.5);
    s += text(12, B + 80, `<b>${h}</b> ${esc(o.caption)}`, 13.5, { cls: 'clip', max: 406 });
    s += text(12, B + 101, '2 hours ago', 11.5, { color: 'rgba(255,255,255,.55)' });
    s += igNav('home', o);
    return `<div style="color:#fff">${s}</div>`;
  }

  function tiktok(o, ad) {
    const h = esc(o.handle), L = o.handle[0]?.toUpperCase() || 'Y';
    let s = statusBar();
    s += icon('live', 24, 24, 80.5);
    s += text(361, 80.5, 'For You', 17, { weight: 700, align: 'r', cls: 'sh' });
    s += text(283, 80.5, 'Following', 17, { weight: 600, align: 'r', color: 'rgba(255,255,255,.65)', cls: 'sh' });
    s += box(361 - 32.5 - 11.65, 98.3, 361 - 32.5 + 11.65, 100.8, 'background:#fff;border-radius:2px');
    s += icon('search', 22, 400.7, 80.5);
    // right rail
    const rx = 399.7;
    s += avatar(rx, 450.7, 44.7, L, 0, o.avatar);
    s += box(rx - 10.85, 450.7 + 22.35 - 10.85, rx + 10.85, 450.7 + 22.35 + 10.85, 'border-radius:50%;background:#E94359;color:#fff;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:600;line-height:1', '+');
    for (const [n, y, c] of [['heartF', 544.3, '3812'], ['commentF', 609.7, '16'], ['bookmarkF', 675.3, '346'], ['shareF', 741.7, '773']]) {
      s += icon(n, 34, rx, y, 'filter:drop-shadow(0 1px 2px rgba(0,0,0,.35))');
      s += text(rx, y + 24, c, 12, { weight: 600, align: 'c', cls: 'sh' });
    }
    s += box(rx - 19.65, 795.3, rx + 19.65, 834.6, 'border-radius:50%;background:radial-gradient(circle,#555 0 22%,#161616 24% 100%);border:7px solid #2a2a2a');
    // left block, stacking up from the bottom
    const lastLabel = ad ? 785 : 831;
    let labels = ad ? [`Sponsored`] : [`♫ original sound - ${h}`];
    labels.forEach((t, i) => { s += text(12.3, lastLabel - (labels.length - 1 - i) * 23.5, t, 13.5, { cls: 'sh clip', max: 313 }); });
    const firstLabel = lastLabel - (labels.length - 1) * 23.5;
    const capLast = firstLabel - 24;
    const capLines = [o.caption || ' ', ad ? '' : '#fyp'].filter((x) => x !== '');
    capLines.forEach((t, i) => { s += text(12.3, capLast - (capLines.length - 1 - i) * 17.5, esc(t), 15, { cls: 'sh clip', max: 313 }); });
    const capFirst = capLast - (capLines.length - 1) * 17.5;
    s += text(12.3, capFirst - 28.5, h, 16.5, { weight: 700, cls: 'sh' });
    if (ad) s += box(12.3, 801, 325.7, 836.7, 'border-radius:8px;background:rgba(255,255,255,.22);backdrop-filter:blur(8px)', text(12, 17.85, esc(o.cta), 15, { weight: 600 }) + icon('chev', 16, 298, 17.85));
    // bottom menu
    s += box(0, 848.7, W, H, 'background:#000');
    const mx = [['home', 43, 'Home'], ['friends', 128.7, 'Friends'], [null, 215, ''], ['inbox', 301, 'Inbox'], ['profile', 387, 'Profile']];
    for (const [n, x, l] of mx) {
      if (n) { s += icon(n, 24, x, 870, n === 'home' ? '' : 'opacity:.85'); s += text(x, 893, l, 10, { align: 'c', weight: n === 'home' ? 600 : 400, color: n === 'home' ? '#fff' : 'rgba(255,255,255,.75)' }); }
      else s += box(x - 22, 857, x + 22, 885, 'border-radius:8px;background:#fff;box-shadow:-3px 0 0 #25F4EE,3px 0 0 #FE2C55;color:#000;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:500;line-height:1', '+');
    }
    return `<div style="color:#fff">${s}</div>`;
  }

  function fbFeed(o, ad) {
    const h = esc(o.handle), L = o.handle[0]?.toUpperCase() || 'Y', T = FB_T;
    let s = statusBar(true);
    s += text(14, 75, 'facebook', 27, { weight: 700, color: '#0866FF' }) + `<div style="color:#050505">${icon('plusSq', 25, 320, 75)}${icon('search', 24, 360, 75)}${icon('messenger', 25, 400, 75)}</div>`;
    s += box(0, T, W, T + 2, 'background:#CED0D4');
    s += avatar(12 + 20, T + 12 + 20, 40, L, 0, o.avatar);
    s += text(60.3, T + 24.3, h, 16, { weight: 600, color: '#050505' });
    s += text(60.3, T + 41, `${ad ? 'Ad' : '2h'} · <svg style="width:11px;height:11px;vertical-align:-1px" viewBox="0 0 24 24" fill="none" stroke="#65676B" stroke-width="2.4">${P.globe}</svg>`, 13, { color: '#65676B' });
    s += `<div style="color:#65676B">${icon('dots', 20, 364, T + 22)}${icon('close', 18, 408, T + 22)}</div>`;
    s += text(12, T + 69.7, esc(o.caption), 15.5, { color: '#050505', cls: 'clip', max: 406 });
    const [, V, , vh] = media(ad ? 'fbFeedAd' : 'fbFeed');
    const B = V + vh;
    s += box(400 - 14.5, B - 28 - 14.5, 400 + 14.5, B - 28 + 14.5, 'border-radius:50%;background:rgba(0,0,0,.55);color:#fff', icon('muted', 17, 14.5, 14.5));
    if (ad) {
      s += box(0, B, W, B + 48, 'background:#F8F9FB');
      s += text(13.3, B + 15, `${h.toUpperCase()}.COM`, 11.5, { color: '#65676B' }) + text(13.3, B + 32, 'Your headline here', 15, { weight: 600, color: '#050505' });
      s += box(W - 12 - 98, B + 8, W - 12, B + 40, 'border-radius:8px;background:#0866FF;color:#fff;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600', esc(o.cta));
    }
    const row = ad ? B + 70 : B + 22;
    const actions = [['fbLike', 'Like', 72], ['fbComment', 'Comment', 215], ['fbShare', 'Share', 358]];
    for (const [n, l, x] of actions) s += `<div style="color:#65676B">${icon(n, 20, x - 30, row)}</div>` + text(x - 16, row, l, 14.5, { weight: 600, color: '#65676B' });
    s += box(0, row + 22, W, row + 24, 'background:#CED0D4');
    return s;
  }

  function fbReels(o, ad) {
    const h = esc(o.handle), L = o.handle[0]?.toUpperCase() || 'Y';
    let s = statusBar();
    s += icon('back', 22, 23.35, 85) + icon('search', 22, 356, 85) + icon('dots', 22, 400, 85);
    const rail = ad
      ? [['fbLike', 635.7, '3.8K'], ['fbComment', 710, ''], ['fbShare', 768.7, '']]
      : [['fbLike', 545.7, '3.8K'], ['fbComment', 618.3, '16'], ['fbShare', 690.7, '38'], ['bookmark', 764.7, '']];
    for (const [n, y, c] of rail) {
      s += icon(n, 27, 402, y, 'filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))');
      if (c) s += text(402, y + 27, c, 12.5, { weight: 500, align: 'c', cls: 'sh' });
    }
    s += icon('dots', 22, 402, ad ? 820 : 816);
    const ny = ad ? 703 : 792;
    s += avatar(13 + 18, ny, 36, L, 0, o.avatar);
    const badge = `<span style="display:inline-flex;width:13px;height:13px;border-radius:50%;background:#fff;color:#000;font-size:9px;align-items:center;justify-content:center;vertical-align:0;margin-left:4px">✓</span>`;
    s += text(57.3, ny, `${h}${badge} · <svg style="width:12px;height:12px;vertical-align:-1px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2">${P.globe}</svg>`, 15.5, { weight: 600, cls: 'sh' });
    if (!ad) s += box(57.3 + h.length * 8.8 + 44, ny - 12, 57.3 + h.length * 8.8 + 108, ny + 12, 'border:1px solid rgba(255,255,255,.85);border-radius:6px', text(32, 12, 'Follow', 13.5, { weight: 600, align: 'c' }));
    s += text(13, ad ? 740.8 : 829, `${esc(o.caption)}`, 14, { cls: 'sh clip', max: 360 });
    if (ad) {
      s += box(13, 762, 374, 803.3, 'border-radius:10px;background:rgba(255,255,255,.25);backdrop-filter:blur(8px)', text(14, 20.65, esc(o.cta), 15, { weight: 600 }));
      s += box(12, 820, 60, 841.3, 'border-radius:6px;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;font-size:12.5px;font-weight:600', 'Ad');
    } else {
      s += box(0, 852, W, 853.6, 'background:rgba(255,255,255,.3)') + box(0, 852, 90, 853.6, 'background:#fff');
    }
    s += box(0, 854, W, H, 'background:#000');
    s += box(13.3, 866, 416.7, 910, 'border-radius:22px;background:#191919', text(18, 22, 'Add a comment…', 15, { color: 'rgba(255,255,255,.6)' }));
    return `<div style="color:#fff">${s}</div>`;
  }

  function chrome(id, opts) {
    const given = Object.fromEntries(Object.entries(opts || {}).filter(([, v]) => v != null && v !== ''));
    const o = { handle: 'yourname', verified: false, avatar: null, caption: '', cta: 'Shop now', ...given };
    switch (id) {
      case 'igReels': return igReels(o, false);
      case 'igReelsAd': return igReels(o, true);
      case 'igStory': return igStory(o, false);
      case 'igStoryAd': return igStory(o, true);
      case 'igFeed': return igFeed(o);
      case 'tiktok': return tiktok(o, false);
      case 'tiktokAd': return tiktok(o, true);
      case 'fbFeed': return fbFeed(o, false);
      case 'fbFeedAd': return fbFeed(o, true);
      case 'fbReels': return fbReels(o, false);
      case 'fbReelsAd': return fbReels(o, true);
    }
    return '';
  }

  window.Mockup = { W, H, media, chrome, screenBg };
})();
