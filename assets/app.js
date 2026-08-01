/* ===================================================================
   Biblioteca de Briefings de Copy — lógica do app
   Dados em localStorage. Sem backend, sem build.
   =================================================================== */

(function () {
  'use strict';

  var STORAGE_KEY = 'briefings_copy_v1';
  var THEME_KEY = 'briefings_theme';

  var state = { briefings: [], filters: { q: '', status: '', tipo: '', tag: '' } };

  /* ---------------- Utils ---------------- */
  function uid() {
    return 'b_' + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36);
  }
  function nowISO() { return new Date().toISOString(); }
  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function fmtDate(iso) {
    if (!iso) return '—';
    try {
      return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) { return '—'; }
  }
  function slugStatus(s) {
    return ({ 'Rascunho': 'Rascunho', 'Em revisão': 'Revisao', 'Aprovado': 'Aprovado', 'Publicado': 'Publicado' })[s] || 'Rascunho';
  }
  function $(sel) { return document.querySelector(sel); }
  function $all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  /* ---------------- Persistência ---------------- */
  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) { state.briefings = JSON.parse(raw); return true; }
    } catch (e) { /* ignore */ }
    return false;
  }
  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.briefings));
    } catch (e) {
      toast('Não foi possível salvar (armazenamento cheio). Use links em vez de subir imagens grandes.');
    }
  }

  /* ---------------- Embeds de vídeo / imagem ---------------- */
  function parseEmbed(url, tipo) {
    if (!url) return null;
    var u = url.trim();

    // YouTube
    var yt = u.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
    if (yt) return { kind: 'iframe', src: 'https://www.youtube.com/embed/' + yt[1], thumb: 'https://img.youtube.com/vi/' + yt[1] + '/hqdefault.jpg' };

    // Vimeo
    var vm = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vm) return { kind: 'iframe', src: 'https://player.vimeo.com/video/' + vm[1], thumb: null };

    // Google Drive
    var gd = u.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
    if (gd) return { kind: 'iframe', src: 'https://drive.google.com/file/d/' + gd[1] + '/preview', thumb: null };

    // Arquivo de vídeo direto
    if (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(u)) return { kind: 'video', src: u, thumb: null };

    // Imagem (link direto, data URL, ou quando o briefing indica que a referência é imagem)
    if (/^data:image\//.test(u) || /\.(png|jpe?g|gif|webp|avif|svg)(\?|$)/i.test(u) || tipo === 'imagem') return { kind: 'image', src: u, thumb: u };

    return { kind: 'link', src: u, thumb: null };
  }

  // Thumbnail para o card
  function cardThumb(b) {
    if (b.imagemUpload) return b.imagemUpload;
    var e = parseEmbed(b.referenciaUrl, b.tipoReferencia);
    if (e && e.thumb) return e.thumb;
    if (e && e.kind === 'image') return e.src;
    return null;
  }

  /* ---------------- Render: cards ---------------- */
  function matchesFilter(b) {
    var f = state.filters;
    if (f.status && b.status !== f.status) return false;
    if (f.tipo && b.tipoReferencia !== f.tipo) return false;
    if (f.tag && (b.tags || []).indexOf(f.tag) === -1) return false;
    if (f.q) {
      var hay = [b.titulo, b.campanha, b.headline, b.copy, b.cta, b.observacoes, (b.tags || []).join(' ')]
        .join(' ').toLowerCase();
      if (hay.indexOf(f.q.toLowerCase()) === -1) return false;
    }
    return true;
  }

  function render() {
    var grid = $('#grid');
    var list = state.briefings.filter(matchesFilter)
      .sort(function (a, b) { return (b.atualizadoEm || '').localeCompare(a.atualizadoEm || ''); });

    // stats
    var total = state.briefings.length;
    $('#stats').innerHTML = total
      ? '<strong>' + list.length + '</strong> de <strong>' + total + '</strong> briefing' + (total > 1 ? 's' : '')
      : '';

    // empty state
    $('#empty').hidden = list.length > 0;
    grid.innerHTML = list.map(cardHTML).join('');

    // eventos de clique nos cards
    $all('.card').forEach(function (el) {
      el.addEventListener('click', function () { openDetail(el.getAttribute('data-id')); });
    });

    refreshTagFilter();
  }

  function cardHTML(b) {
    var thumb = cardThumb(b);
    var isVideo = b.tipoReferencia === 'video';
    var media = thumb
      ? '<img src="' + esc(thumb) + '" alt="" loading="lazy" onerror="this.parentNode.classList.add(\'card__media--placeholder\');this.remove();">'
      : '';
    var playIcon = (isVideo && thumb) ? '<div class="card__play"><span>▶</span></div>' : '';
    var typeLabel = isVideo ? '🎬 Vídeo' : '🖼️ Imagem';

    var tags = (b.tags || []).slice(0, 3).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('');

    return '' +
      '<article class="card' + (!thumb ? '' : '') + '" data-id="' + esc(b.id) + '">' +
        '<div class="card__media' + (thumb ? '' : ' card__media--placeholder') + '">' +
          (thumb ? media : (isVideo ? '🎬' : '🖼️')) +
          playIcon +
          '<span class="card__type">' + typeLabel + '</span>' +
        '</div>' +
        '<div class="card__body">' +
          '<div class="card__top">' +
            (b.campanha ? '<span class="card__campanha">' + esc(b.campanha) + '</span>' : '<span></span>') +
            '<span class="badge badge--' + slugStatus(b.status) + '">' + esc(b.status) + '</span>' +
          '</div>' +
          '<h3 class="card__title">' + esc(b.titulo) + '</h3>' +
          (b.copy ? '<p class="card__excerpt">' + esc(b.copy) + '</p>' : '') +
          (tags ? '<div class="card__tags">' + tags + '</div>' : '') +
        '</div>' +
      '</article>';
  }

  function refreshTagFilter() {
    var sel = $('#filter-tag');
    var current = sel.value;
    var tags = {};
    state.briefings.forEach(function (b) { (b.tags || []).forEach(function (t) { tags[t] = true; }); });
    var opts = ['<option value="">Todas as tags</option>']
      .concat(Object.keys(tags).sort().map(function (t) { return '<option value="' + esc(t) + '">' + esc(t) + '</option>'; }));
    sel.innerHTML = opts.join('');
    sel.value = current;
  }

  /* ---------------- Render: detalhe ---------------- */
  function mediaHTML(b) {
    if (b.imagemUpload) return '<div class="detail__media"><img src="' + esc(b.imagemUpload) + '" alt=""></div>';
    var e = parseEmbed(b.referenciaUrl, b.tipoReferencia);
    if (!e) return '<div class="detail__noref">' + (b.tipoReferencia === 'video' ? '🎬' : '🖼️') + '</div>';
    if (e.kind === 'iframe') return '<div class="detail__media"><iframe src="' + esc(e.src) + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>';
    if (e.kind === 'video') return '<div class="detail__media"><video src="' + esc(e.src) + '" controls></video></div>';
    if (e.kind === 'image') return '<div class="detail__media"><img src="' + esc(e.src) + '" alt=""></div>';
    // link genérico
    return '<div class="detail__noref">🔗</div>';
  }

  function openDetail(id) {
    var b = state.briefings.find(function (x) { return x.id === id; });
    if (!b) return;
    var e = parseEmbed(b.referenciaUrl, b.tipoReferencia);
    var linkBtn = (b.referenciaUrl && (!e || e.kind === 'link'))
      ? '<a class="btn btn--ghost btn--sm" href="' + esc(b.referenciaUrl) + '" target="_blank" rel="noopener">🔗 Abrir referência</a>'
      : (b.referenciaUrl ? '<a class="btn btn--ghost btn--sm" href="' + esc(b.referenciaUrl) + '" target="_blank" rel="noopener">🔗 Link original</a>' : '');

    var tags = (b.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('');

    $('#detail-body').innerHTML = '' +
      mediaHTML(b) +
      '<div class="detail__content">' +
        (b.campanha ? '<div class="detail__campanha">' + esc(b.campanha) + '</div>' : '') +
        '<div class="detail__head">' +
          '<h2 class="detail__title" id="detail-title">' + esc(b.titulo) + '</h2>' +
          '<span class="badge badge--' + slugStatus(b.status) + '">' + esc(b.status) + '</span>' +
        '</div>' +
        (tags ? '<div class="detail__tags">' + tags + '</div>' : '') +

        '<div class="copy-block">' +
          '<div class="copy-block__head">' +
            '<h3>Copy</h3>' +
            '<button class="btn btn--ghost btn--sm" id="btn-copy">📋 Copiar copy</button>' +
          '</div>' +
          (b.headline ? '<p class="copy-block__headline">' + esc(b.headline) + '</p>' : '') +
          '<p class="copy-block__text">' + esc(b.copy || '') + '</p>' +
          (b.cta ? '<div class="copy-block__cta">CTA: <strong>' + esc(b.cta) + '</strong></div>' : '') +
        '</div>' +

        '<div class="detail__meta">' +
          '<div class="meta-item"><span>Tipo</span>' + (b.tipoReferencia === 'video' ? '🎬 Vídeo' : '🖼️ Imagem') + '</div>' +
          '<div class="meta-item"><span>Atualizado</span>' + fmtDate(b.atualizadoEm) + '</div>' +
        '</div>' +

        (b.observacoes ? '<div class="detail__obs"><strong>Observações:</strong> ' + esc(b.observacoes) + '</div>' : '') +

        '<div class="detail__actions">' +
          '<button class="btn btn--primary btn--sm" id="btn-edit">✏️ Editar</button>' +
          linkBtn +
        '</div>' +
      '</div>';

    // ações do detalhe
    var copyBtn = $('#btn-copy');
    if (copyBtn) copyBtn.addEventListener('click', function () {
      var text = [b.headline, b.copy, (b.cta ? 'CTA: ' + b.cta : '')].filter(Boolean).join('\n\n');
      copyToClipboard(text);
    });
    $('#btn-edit').addEventListener('click', function () { closeModal('#modal-detail'); openForm(b); });

    openModal('#modal-detail');
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast('Copy copiada! ✅'); },
        function () { fallbackCopy(text); });
    } else { fallbackCopy(text); }
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); toast('Copy copiada! ✅'); } catch (e) { toast('Não foi possível copiar.'); }
    document.body.removeChild(ta);
  }

  /* ---------------- Formulário ---------------- */
  function openForm(b) {
    var isEdit = !!b;
    $('#form-title').textContent = isEdit ? 'Editar briefing' : 'Novo briefing';
    $('#f-id').value = isEdit ? b.id : '';
    $('#f-titulo').value = isEdit ? (b.titulo || '') : '';
    $('#f-campanha').value = isEdit ? (b.campanha || '') : '';
    $('#f-status').value = isEdit ? (b.status || 'Rascunho') : 'Rascunho';
    $('#f-url').value = isEdit ? (b.referenciaUrl || '') : '';
    $('#f-headline').value = isEdit ? (b.headline || '') : '';
    $('#f-copy').value = isEdit ? (b.copy || '') : '';
    $('#f-cta').value = isEdit ? (b.cta || '') : '';
    $('#f-tags').value = isEdit ? (b.tags || []).join(', ') : '';
    $('#f-obs').value = isEdit ? (b.observacoes || '') : '';
    var tipo = isEdit ? (b.tipoReferencia || 'video') : 'video';
    $all('input[name="tipo"]').forEach(function (r) { r.checked = r.value === tipo; });

    // imagem upload
    pendingUpload = isEdit ? (b.imagemUpload || '') : '';
    $('#f-imagem').value = '';
    renderUploadPreview();

    $('#btn-delete').hidden = !isEdit;
    openModal('#modal-form');
    setTimeout(function () { $('#f-titulo').focus(); }, 50);
  }

  var pendingUpload = '';
  function renderUploadPreview() {
    var box = $('#upload-preview');
    if (pendingUpload) {
      box.hidden = false;
      box.innerHTML = '<img src="' + esc(pendingUpload) + '" alt="prévia"> ' +
        '<button type="button" class="btn btn--danger-ghost btn--sm" id="btn-rm-upload">Remover imagem</button>';
      $('#btn-rm-upload').addEventListener('click', function () { pendingUpload = ''; $('#f-imagem').value = ''; renderUploadPreview(); });
    } else {
      box.hidden = true; box.innerHTML = '';
    }
  }

  function handleImageUpload(file) {
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      toast('Imagem grande (>3MB). Prefira colar um link para não encher o armazenamento.');
    }
    var reader = new FileReader();
    reader.onload = function (ev) { pendingUpload = ev.target.result; renderUploadPreview(); };
    reader.readAsDataURL(file);
  }

  function submitForm(e) {
    e.preventDefault();
    var id = $('#f-id').value;
    var tipo = ($all('input[name="tipo"]').find(function (r) { return r.checked; }) || {}).value || 'video';
    var tags = $('#f-tags').value.split(',').map(function (t) { return t.trim(); }).filter(Boolean);

    var data = {
      titulo: $('#f-titulo').value.trim(),
      campanha: $('#f-campanha').value.trim(),
      status: $('#f-status').value,
      tipoReferencia: tipo,
      referenciaUrl: $('#f-url').value.trim(),
      imagemUpload: pendingUpload || '',
      headline: $('#f-headline').value.trim(),
      copy: $('#f-copy').value.trim(),
      cta: $('#f-cta').value.trim(),
      tags: tags,
      observacoes: $('#f-obs').value.trim(),
      atualizadoEm: nowISO()
    };

    if (id) {
      var b = state.briefings.find(function (x) { return x.id === id; });
      if (b) Object.assign(b, data);
    } else {
      data.id = uid();
      data.criadoEm = nowISO();
      state.briefings.push(data);
    }
    save();
    render();
    closeModal('#modal-form');
    toast(id ? 'Briefing atualizado ✅' : 'Briefing criado ✅');
  }

  function deleteCurrent() {
    var id = $('#f-id').value;
    if (!id) return;
    if (!confirm('Excluir este briefing? Esta ação não pode ser desfeita.')) return;
    state.briefings = state.briefings.filter(function (x) { return x.id !== id; });
    save();
    render();
    closeModal('#modal-form');
    toast('Briefing excluído');
  }

  /* ---------------- Exportar / Importar ---------------- */
  function exportJSON() {
    if (!state.briefings.length) { toast('Nada para exportar ainda.'); return; }
    var blob = new Blob([JSON.stringify(state.briefings, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = 'briefings-backup.json';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast('Backup exportado ⬇️');
  }

  function importJSON(file) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (ev) {
      try {
        var arr = JSON.parse(ev.target.result);
        if (!Array.isArray(arr)) throw new Error('formato');
        var existing = {};
        state.briefings.forEach(function (b) { existing[b.id] = true; });
        var added = 0;
        arr.forEach(function (b) {
          if (!b || !b.titulo) return;
          if (!b.id || existing[b.id]) b.id = uid();
          if (!b.criadoEm) b.criadoEm = nowISO();
          if (!b.atualizadoEm) b.atualizadoEm = b.criadoEm;
          if (!b.status) b.status = 'Rascunho';
          if (!b.tipoReferencia) b.tipoReferencia = b.imagemUpload ? 'imagem' : 'video';
          state.briefings.push(b); added++;
        });
        save(); render();
        toast(added + ' briefing(s) importado(s) ✅');
      } catch (err) {
        toast('Arquivo inválido. Selecione um backup JSON exportado por aqui.');
      }
    };
    reader.readAsText(file);
  }

  /* ---------------- Dados de exemplo ---------------- */
  function loadSeed() {
    fetch('data/briefings.example.json')
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (arr) {
        if (Array.isArray(arr) && arr.length) {
          state.briefings = arr.map(function (b) {
            if (!b.id) b.id = uid();
            if (!b.criadoEm) b.criadoEm = nowISO();
            if (!b.atualizadoEm) b.atualizadoEm = b.criadoEm;
            return b;
          });
          save();
        }
        render();
      })
      .catch(function () { render(); });
  }

  /* ---------------- Modais / Tema / Toast ---------------- */
  function openModal(sel) { $(sel).hidden = false; document.body.style.overflow = 'hidden'; }
  function closeModal(sel) { $(sel).hidden = true; if (!anyModalOpen()) document.body.style.overflow = ''; }
  function anyModalOpen() { return $all('.modal').some(function (m) { return !m.hidden; }); }

  var toastTimer;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg; t.hidden = false;
    requestAnimationFrame(function () { t.classList.add('show'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      t.classList.remove('show');
      setTimeout(function () { t.hidden = true; }, 220);
    }, 2600);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    $('#btn-theme').textContent = theme === 'light' ? '🌙' : '☀️';
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }

  /* ---------------- Bind de eventos ---------------- */
  function bind() {
    $('#btn-new').addEventListener('click', function () { openForm(null); });
    $('#brief-form').addEventListener('submit', submitForm);
    $('#btn-delete').addEventListener('click', deleteCurrent);
    $('#f-imagem').addEventListener('change', function (e) { handleImageUpload(e.target.files[0]); });

    $('#search').addEventListener('input', function (e) { state.filters.q = e.target.value; render(); });
    $('#filter-status').addEventListener('change', function (e) { state.filters.status = e.target.value; render(); });
    $('#filter-type').addEventListener('change', function (e) { state.filters.tipo = e.target.value; render(); });
    $('#filter-tag').addEventListener('change', function (e) { state.filters.tag = e.target.value; render(); });

    $('#btn-export').addEventListener('click', exportJSON);
    $('#btn-import').addEventListener('click', function () { $('#import-file').click(); });
    $('#import-file').addEventListener('change', function (e) { importJSON(e.target.files[0]); e.target.value = ''; });

    $('#btn-theme').addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(cur === 'dark' ? 'light' : 'dark');
    });

    // fechar modais (backdrop, X, ou ESC)
    $all('[data-close]').forEach(function (el) {
      el.addEventListener('click', function () {
        var modal = el.closest('.modal');
        if (modal) closeModal('#' + modal.id);
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') $all('.modal').forEach(function (m) { if (!m.hidden) closeModal('#' + m.id); });
    });
  }

  /* ---------------- Init ---------------- */
  function init() {
    var savedTheme = 'dark';
    try { savedTheme = localStorage.getItem(THEME_KEY) || 'dark'; } catch (e) {}
    applyTheme(savedTheme);

    bind();

    if (load()) {
      render();
    } else {
      loadSeed(); // primeira visita: carrega exemplos
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
