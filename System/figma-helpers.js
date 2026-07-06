// figma-helpers.js · Version 'h1' — WERKZEUGE, KEIN KORSETT.
// Für Mechanik nutzen (Messen, Stapeln, Zentrieren, Pre-QA), frei komponieren —
// die rohe Plugin-API bleibt jederzeit erlaubt. Bei Nutzung: Datei VERBATIM an den
// Anfang des use_figma-Scripts kopieren (nie kürzen!) und {hv:HV, ...} im return echoen.
// Namens-Empfehlung: '<sektion>/<rolle>[-n]' — Rollen: bg deco img cutout kicker punch
// sub btn pill capsule card stat label. '~free' im Namen = von qaCheck ausgenommen.

const bbox = n => n.absoluteRenderBounds || n.absoluteBoundingBox;
const pax = n => n.parent.absoluteTransform[0][2];
const pay = n => n.parent.absoluteTransform[1][2];

async function txt(chars, o = {}) { // Text-Primitive; kapselt die resize/textAutoResize-Falle
  await figma.loadFontAsync(o.font);
  const t = figma.createText();
  t.fontName = o.font; t.fontSize = o.size || 32; t.characters = chars;
  t.name = o.name || 'text';
  if (o.fill) t.fills = [{ type: 'SOLID', color: o.fill, opacity: o.opacity ?? 1 }];
  if (o.ls != null) t.letterSpacing = { unit: 'PERCENT', value: o.ls };
  if (o.lh != null) t.lineHeight = { unit: 'PERCENT', value: o.lh };
  if (o.align) t.textAlignHorizontal = o.align;
  if (o.w) { t.resize(o.w, 10); t.textAutoResize = 'HEIGHT'; }
  else t.textAutoResize = 'WIDTH_AND_HEIGHT';
  return t;
}

async function pill(chars, o = {}) { // Container wächst IMMER mit dem Inhalt (Auto-Layout HUG)
  const f = figma.createFrame(); f.name = o.name || 'pill';
  f.layoutMode = 'HORIZONTAL';
  f.primaryAxisSizingMode = 'AUTO'; f.counterAxisSizingMode = 'AUTO';
  f.primaryAxisAlignItems = 'CENTER'; f.counterAxisAlignItems = 'CENTER';
  f.paddingLeft = f.paddingRight = o.padX ?? 36;
  f.paddingTop = f.paddingBottom = o.padY ?? 18;
  f.cornerRadius = o.radius ?? 999;
  f.fills = o.fill ? [{ type: 'SOLID', color: o.fill, opacity: o.fillOpacity ?? 1 }] : [];
  if (o.stroke) { f.strokes = [{ type: 'SOLID', color: o.stroke, opacity: o.strokeOpacity ?? 1 }]; f.strokeWeight = o.strokeWeight ?? 2; }
  if (o.blur) f.effects = [{ type: 'BACKGROUND_BLUR', radius: o.blur, visible: true }];
  f.appendChild(await txt(chars, { ...(o.text || {}), name: (o.name || 'pill') + '/label' }));
  return f;
}

async function button(chars, o = {}) { // Fixmaß lt. Spec; Label wird geklemmt — nie abgeschnitten
  const w = o.w ?? 769, h = o.h ?? 148;
  const f = await pill(chars, { ...o, radius: o.radius ?? 44, name: o.name || 'btn' });
  f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = 'FIXED';
  f.resize(w, h);
  const t = f.children[0];
  while (t.width > w - 2 * (o.padX ?? 36) && t.fontSize > 36) t.fontSize -= 2;
  return f;
}

function fitText(t, targetW, cap = 230, min = 100) { // XXL-Zeile auf Zielbreite (Punchline-Formel)
  t.textAutoResize = 'WIDTH_AND_HEIGHT'; t.fontSize = 100;
  t.fontSize = Math.max(min, Math.min(cap, Math.floor(100 * targetW / t.width)));
  return t.fontSize;
}

function overlaps(a, b, pad = 0) { // AABB-Schnitt, rotation-aware (überschätzt bei Rotation)
  const A = bbox(a), B = bbox(b);
  return !!(A && B) && A.x < B.x + B.width + pad && B.x < A.x + A.width + pad
    && A.y < B.y + B.height + pad && B.y < A.y + A.height + pad;
}

function assertColumn(n, xMax, ref) { // Spaltenwächter — wirft SOFORT; xMax frame-relativ, ref = Mail-Frame
  const b = bbox(n), off = ref ? bbox(ref).x : 0;
  if (b.x + b.width - off > xMax) throw Error(n.name + ': rechte Kante ' + Math.round(b.x + b.width - off) + ' > ' + xMax);
}

function stack(P, items, o) { // stapelt mit gemessenen Höhen; Item oder [Item, eigenerGap]
  let cur = o.y;                // returnt y NACH dem letzten Gap (= Naht für die nächste Section)
  for (const it of items) {
    const [n, g] = Array.isArray(it) ? it : [it, o.gap ?? 24];
    if (n.parent !== P) P.appendChild(n);
    n.y += (pay(n) + cur) - bbox(n).y;
    if (o.cx != null) centerX(n, o.cx); else if (o.x != null) n.x = o.x;
    cur = Math.round(cur + bbox(n).height + g);
  }
  return cur;
}

function shiftDown(m, atY, H, skip) { // Section einfügen: alles ab atY runter, Frame wächst
  for (const n of m.children) if (n.y >= atY && !(skip && skip(n))) n.y += H;
  m.resize(m.width, m.height + H);
  return atY;
}

function centerX(n, W = 1080) { // zentriert über die SICHTBARE Hülle (auch rotiert korrekt)
  const b = bbox(n);
  n.x += (pax(n) + (W - b.width) / 2) - b.x;
  return n;
}

function byName(root, name, type) { // eindeutiger Zugriff; wirft bei 0 oder >1 Treffern
  const h = root.findAll(n => n.name === name && (!type || n.type === type));
  if (h.length !== 1) throw Error("byName '" + name + "' (" + (type || '*') + "): " + h.length + ' Treffer');
  return h[0];
}

async function setText(root, name, chars) { // Standard-Copy-Fix; lädt Bestandsfonts selbst
  const t = byName(root, name, 'TEXT');
  await Promise.all(t.getRangeAllFontNames(0, t.characters.length).map(f => figma.loadFontAsync(f)));
  const ar = t.textAutoResize; t.characters = chars; t.textAutoResize = ar;
  return t;
}

function lockAll(m) { // Constraints MIN/MIN; Auto-Layout-Kinder werden übersprungen
  m.findAll(n => 'constraints' in n && (!('layoutMode' in n.parent) || n.parent.layoutMode === 'NONE'))
    .forEach(n => { n.constraints = { horizontal: 'MIN', vertical: 'MIN' }; });
}

function qaCheck(m, o = {}) { // Pre-QA als BERICHT (blockt nichts) — Befunde VOR dem Screenshot
  const tol = o.tol ?? 2, F = [], mb = bbox(m);
  const role = (n, ...rs) => rs.some(r => new RegExp('(^|/)' + r + '(-\\d+)?($|/|~)').test(n.name));
  const free = n => n.name.includes('~free');
  const inside = (a, b) => { let p = a.parent; while (p) { if (p === b) return true; p = p.parent; } return false; };
  const lum = c => { const f = v => v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); return .2126 * f(c.r) + .7152 * f(c.g) + .0722 * f(c.b); };
  const solid = n => ('fills' in n && Array.isArray(n.fills) && n.fills.length === 1 && n.fills[0].type === 'SOLID' && (n.fills[0].opacity ?? 1) > .95 && (n.opacity ?? 1) > .95) ? n.fills[0].color : null;
  const topOf = n => { let p = n; while (p.parent !== m) p = p.parent; return p; };
  const texts = m.findAll(n => n.type === 'TEXT' && n.visible && !free(n));
  const media = m.findAll(n => role(n, 'img', 'cutout') && n.visible && !free(n));
  for (const n of m.children) { // OUT_OF_FRAME
    if (free(n) || role(n, 'deco')) continue; const b = bbox(n); if (!b) continue;
    if (b.x < mb.x - tol || b.y < mb.y - tol || b.x + b.width > mb.x + mb.width + tol || b.y + b.height > mb.y + mb.height + tol)
      F.push({ sev: 'warn', code: 'OUT_OF_FRAME', node: n.name });
  }
  for (const f of m.findAll(n => role(n, 'btn', 'pill') && 'layoutMode' in n && n.primaryAxisSizingMode === 'FIXED')) {
    const t = f.children.find(c => c.type === 'TEXT'); // BTN_FIT (nur Fixmaß-Fälle)
    if (t && t.width > f.width - f.paddingLeft - f.paddingRight + tol)
      F.push({ sev: 'error', code: 'BTN_FIT', node: f.name });
  }
  for (const t of texts) {
    for (const im of media) { // TEXT_OVERLAP: Text darf img/cutout nicht schneiden (bg/ ist ok!)
      if (inside(t, im) || inside(im, t)) continue;
      if (overlaps(t, im)) F.push({ sev: (im.rotation || t.rotation) ? 'warn' : 'error', code: 'TEXT_OVERLAP', node: t.name, other: im.name });
    }
    if (o.colMax != null) { const b = bbox(t); if (b.x + b.width - mb.x > o.colMax + tol) F.push({ sev: 'error', code: 'COL_OVERFLOW', node: t.name }); }
    if (t.textAutoResize === 'NONE' || t.textAutoResize === 'TRUNCATE')
      F.push({ sev: 'warn', code: 'CLIPPED_RISK', node: t.name, msg: 'Fixhöhe/Truncate = Clipping-Risiko' });
    if (!t.name.includes('/')) F.push({ sev: 'info', code: 'NAME_LINT', node: t.name });
    const top = topOf(t), sibs = m.children, ti = sibs.indexOf(top);
    let under = null;
    for (let i = 0; i < sibs.length; i++) { // Unterlage für Kontrast (letzter Solid unter Textmitte)
      const s = sibs[i]; if (s === top) break;
      if (role(s, 'deco') || free(s)) continue;
      const sc = solid(s); if (!sc) continue;
      const b = bbox(t), c = bbox(s), cx2 = b.x + b.width / 2, cy2 = b.y + b.height / 2;
      if (cx2 >= c.x && cx2 <= c.x + c.width && cy2 >= c.y && cy2 <= c.y + c.height) under = sc;
    }
    for (let i = ti + 1; i < sibs.length; i++) { // COVERED: Text komplett unter späterem opakem Geschwister
      const s = sibs[i]; if (role(s, 'deco') || free(s)) continue;
      const op = solid(s) || ('fills' in s && Array.isArray(s.fills) && s.fills[0] && s.fills[0].type === 'IMAGE' && (s.opacity ?? 1) > .95);
      if (!op) continue; const b = bbox(t), c = bbox(s);
      if (b && c && b.x >= c.x - tol && b.y >= c.y - tol && b.x + b.width <= c.x + c.width + tol && b.y + b.height <= c.y + c.height + tol)
        F.push({ sev: 'error', code: 'COVERED', node: t.name, other: s.name });
    }
    const tc = solid(t); // LOW_CONTRAST: nur SOLID↔SOLID prüfbar (Fotos/Gradients → Screenshot-QA)
    if (tc && under) {
      const L1 = lum(tc), L2 = lum(under), r = (Math.max(L1, L2) + .05) / (Math.min(L1, L2) + .05);
      if (r < 3) F.push({ sev: 'warn', code: 'LOW_CONTRAST', node: t.name, ratio: Math.round(r * 10) / 10 });
    }
  }
  return { v: 'qa1', errors: F.filter(x => x.sev === 'error').length, warns: F.filter(x => x.sev === 'warn').length, findings: F };
}

const HV = 'h1';
