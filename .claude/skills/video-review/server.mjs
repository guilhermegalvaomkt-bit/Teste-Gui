#!/usr/bin/env node
// Local video review server. Serves one or more draft videos with a
// timestamped-feedback UI, autosaves feedback next to each video, and exits
// (printing REVIEW_SUBMITTED) when the reviewer hits "Send to Claude".
//
// Usage:
//   node server.mjs <video> [more videos...] [--notes notes.md] [--title "Draft 2"] [--placement igReelsAd] [--handle someaccount] [--verified] [--avatar photo.jpg] [--caption "..."] [--cta "Shop now"] [--port 4747] [--keep-alive]

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));

function parseArgs(argv) {
  const opts = { videos: [], notes: null, title: null, port: 4747, keepAlive: false, placement: null, handle: null, caption: null, cta: null, avatar: null, verified: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--notes') opts.notes = argv[++i];
    else if (a === '--title') opts.title = argv[++i];
    else if (a === '--port') opts.port = Number(argv[++i]);
    else if (a === '--keep-alive') opts.keepAlive = true;
    else if (a === '--placement') opts.placement = argv[++i];
    else if (a === '--handle') opts.handle = argv[++i];
    else if (a === '--caption') opts.caption = argv[++i];
    else if (a === '--cta') opts.cta = argv[++i];
    else if (a === '--avatar') opts.avatar = argv[++i];
    else if (a === '--verified') opts.verified = true;
    else opts.videos.push(a);
  }
  return opts;
}

const opts = parseArgs(process.argv.slice(2));

// The user's own account, set up once in config.json (see SKILL.md). Used for the phone mockups.
let config = {};
try { config = JSON.parse(fs.readFileSync(path.join(HERE, 'config.json'), 'utf8')); } catch {}
const ownAccount = !opts.handle || opts.handle === config.handle;
const avatarFile = opts.avatar ? path.resolve(opts.avatar)
  : ownAccount && config.avatar ? path.resolve(HERE, config.avatar) : null;
const account = {
  handle: opts.handle || config.handle || null,
  verified: opts.verified || (ownAccount && !!config.verified),
  avatar: avatarFile && fs.existsSync(avatarFile) ? '/avatar' : null,
};
if (!opts.videos.length) {
  console.error('Usage: node server.mjs <video> [more videos...] [--notes notes.md] [--title "..."] [--port 4747]');
  process.exit(1);
}

const MIME = {
  '.mp4': 'video/mp4', '.m4v': 'video/mp4', '.mov': 'video/mp4', // Chrome plays H.264 .mov when labelled mp4
  '.webm': 'video/webm', '.mkv': 'video/webm',
};

function probe(file) {
  return new Promise((resolve) => {
    execFile('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries',
      'stream=width,height,r_frame_rate:format=duration', '-of', 'json', file], (err, stdout) => {
      if (err) return resolve({});
      try {
        const j = JSON.parse(stdout);
        const s = j.streams?.[0] || {};
        const [n, d] = String(s.r_frame_rate || '0/1').split('/').map(Number);
        resolve({ width: s.width, height: s.height, fps: d ? +(n / d).toFixed(3) : null, duration: Number(j.format?.duration) || null });
      } catch { resolve({}); }
    });
  });
}

const videos = [];
for (const [i, v] of opts.videos.entries()) {
  const abs = path.resolve(v);
  if (!fs.existsSync(abs)) { console.error(`Not found: ${abs}`); process.exit(1); }
  const base = abs.replace(/\.[^.]+$/, '');
  videos.push({
    id: String(i),
    name: path.basename(abs),
    abs,
    feedbackJson: `${base}.feedback.json`,
    feedbackMd: `${base}.feedback.md`,
    framesDir: `${base}.feedback-frames`,
    meta: await probe(abs),
  });
}

const notes = opts.notes && fs.existsSync(opts.notes) ? fs.readFileSync(opts.notes, 'utf8') : '';
const title = opts.title || (videos.length === 1 ? videos[0].name : `${videos.length} drafts`);

function emptyFeedback(v) {
  return { video: v.abs, videoName: v.name, status: 'in_progress', verdict: null, overall: '', comments: [], createdAt: new Date().toISOString(), updatedAt: null };
}

function loadFeedback(v) {
  try { return JSON.parse(fs.readFileSync(v.feedbackJson, 'utf8')); } catch { return emptyFeedback(v); }
}

function saveFeedback(v, fb) {
  fb.video = v.abs;
  fb.videoName = v.name;
  fb.updatedAt = new Date().toISOString();
  fs.writeFileSync(v.feedbackJson, JSON.stringify(fb, null, 2));
}

function ts(sec) {
  if (sec == null) return '';
  const m = Math.floor(sec / 60);
  const s = (sec % 60).toFixed(1).padStart(4, '0');
  return `${m}:${s}`;
}

function toMarkdown(v, fb) {
  const verdict = fb.verdict === 'approved' ? 'Approved' : fb.verdict === 'changes' ? 'Needs changes' : 'No verdict';
  const lines = [`# Feedback: ${v.name}`, '', `**Verdict:** ${verdict}  `, `**Submitted:** ${fb.updatedAt}`, ''];
  if (fb.overall?.trim()) lines.push('## Overall', '', fb.overall.trim(), '');
  const open = [...fb.comments].sort((a, b) => a.start - b.start);
  lines.push(`## Timestamped notes (${open.length})`, '');
  if (!open.length) lines.push('_None._');
  for (const c of open) {
    const when = c.end != null ? `${ts(c.start)}–${ts(c.end)}` : ts(c.start);
    const tag = c.category ? ` **${c.category}**` : '';
    const done = c.resolved ? ' ~~(resolved)~~' : '';
    const seen = c.placement ? ` _(viewed as ${c.placement})_` : '';
    lines.push(`- [ ] \`${when}\`${tag} — ${c.text.trim().replace(/\n/g, '\n  ')}${seen}${done}`);
    if (c.frame) lines.push(`  - frame: ${c.frame}`);
  }
  return lines.join('\n') + '\n';
}

function readBody(req, limit = 20 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', (c) => { size += c.length; if (size > limit) { reject(new Error('too large')); req.destroy(); } else chunks.push(c); });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function json(res, code, body) {
  res.writeHead(code, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
}

function serveVideo(req, res, v) {
  const stat = fs.statSync(v.abs);
  const type = MIME[path.extname(v.abs).toLowerCase()] || 'application/octet-stream';
  const range = req.headers.range;
  if (range) {
    const m = /bytes=(\d*)-(\d*)/.exec(range);
    let start = m[1] ? parseInt(m[1], 10) : 0;
    let end = m[2] ? parseInt(m[2], 10) : stat.size - 1;
    if (!m[1] && m[2]) { start = stat.size - parseInt(m[2], 10); end = stat.size - 1; }
    if (start >= stat.size) { res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` }); return res.end(); }
    res.writeHead(206, { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1, 'Content-Range': `bytes ${start}-${end}/${stat.size}` });
    fs.createReadStream(v.abs, { start, end }).pipe(res);
  } else {
    res.writeHead(200, { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Content-Length': stat.size });
    fs.createReadStream(v.abs).pipe(res);
  }
}

let submitted = false;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const parts = url.pathname.split('/').filter(Boolean);
  const vid = (id) => videos.find((x) => x.id === id);

  try {
    if (req.method === 'GET' && url.pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
      return res.end(fs.readFileSync(path.join(HERE, 'review.html')));
    }
    if (req.method === 'GET' && url.pathname === '/avatar') {
      if (!account.avatar) return json(res, 404, { error: 'no avatar' });
      const type = /\.png$/i.test(avatarFile) ? 'image/png' : /\.webp$/i.test(avatarFile) ? 'image/webp' : 'image/jpeg';
      res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
      return fs.createReadStream(avatarFile).pipe(res);
    }
    if (req.method === 'GET' && url.pathname === '/mockups.js') {
      res.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8', 'Cache-Control': 'no-store' });
      return res.end(fs.readFileSync(path.join(HERE, 'mockups.js')));
    }
    if (req.method === 'GET' && url.pathname === '/api/session') {
      return json(res, 200, { title, notes, placement: opts.placement, handle: account.handle, caption: opts.caption, cta: opts.cta, verified: account.verified, avatar: account.avatar, videos: videos.map(({ id, name, meta }) => ({ id, name, meta })) });
    }
    if (parts[0] === 'video' && req.method === 'GET') {
      const v = vid(parts[1]); if (!v) return json(res, 404, { error: 'no video' });
      return serveVideo(req, res, v);
    }
    if (parts[0] === 'api' && parts[1] === 'feedback') {
      const v = vid(parts[2]); if (!v) return json(res, 404, { error: 'no video' });
      if (req.method === 'GET') return json(res, 200, loadFeedback(v));
      if (req.method === 'PUT') {
        const fb = JSON.parse(await readBody(req));
        saveFeedback(v, fb);
        return json(res, 200, { ok: true, savedAt: fb.updatedAt });
      }
    }
    if (parts[0] === 'api' && parts[1] === 'frame' && req.method === 'POST') {
      const v = vid(parts[2]); if (!v) return json(res, 404, { error: 'no video' });
      const { commentId, dataUrl } = JSON.parse(await readBody(req));
      const safeId = String(commentId).replace(/[^a-z0-9_-]/gi, '');
      const b64 = String(dataUrl).replace(/^data:image\/\w+;base64,/, '');
      fs.mkdirSync(v.framesDir, { recursive: true });
      const file = path.join(v.framesDir, `${safeId}.jpg`);
      fs.writeFileSync(file, Buffer.from(b64, 'base64'));
      return json(res, 200, { path: file, url: `/frames/${v.id}/${safeId}.jpg` });
    }
    if (parts[0] === 'frames' && req.method === 'GET') {
      const v = vid(parts[1]); if (!v) return json(res, 404, { error: 'no video' });
      const file = path.join(v.framesDir, path.basename(parts[2] || ''));
      if (!fs.existsSync(file)) return json(res, 404, { error: 'no frame' });
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      return fs.createReadStream(file).pipe(res);
    }
    if (req.method === 'POST' && url.pathname === '/api/submit') {
      const out = [];
      for (const v of videos) {
        const fb = loadFeedback(v);
        fb.status = 'submitted';
        saveFeedback(v, fb);
        fs.writeFileSync(v.feedbackMd, toMarkdown(v, fb));
        out.push({ video: v.abs, json: v.feedbackJson, md: v.feedbackMd, verdict: fb.verdict, comments: fb.comments.length });
      }
      json(res, 200, { ok: true, files: out });
      submitted = true;
      console.log('REVIEW_SUBMITTED');
      for (const o of out) console.log(`FEEDBACK ${o.verdict || 'no-verdict'} ${o.comments} notes -> ${o.md}`);
      if (!opts.keepAlive) setTimeout(() => process.exit(0), 600);
      return;
    }
    json(res, 404, { error: 'not found' });
  } catch (err) {
    console.error('Request failed:', req.method, req.url, err);
    json(res, 500, { error: String(err.message || err) });
  }
});

function listen(port, triesLeft = 20) {
  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE' && triesLeft > 0) return listen(port + 1, triesLeft - 1);
    console.error('Could not start server:', err.message);
    process.exit(1);
  });
  server.listen(port, '127.0.0.1', () => {
    console.log(`REVIEW_URL http://localhost:${port}`);
    for (const v of videos) console.log(`VIDEO ${v.name} -> feedback at ${v.feedbackJson}`);
  });
}

listen(opts.port);
