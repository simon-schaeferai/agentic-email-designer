# FIGMA-RECIPES — Technische Rezepte für den E-Mail-Build (Plugin API via use_figma)

Alle hart erarbeiteten Learnings aus der Produktion. Vor jedem Build lesen.
**Immer zuerst das `figma-use`-Skill laden** und `skillNames: figma-use` mitgeben.

---

## 1. Setup-Grundlagen

- **Fonts laden vor JEDER Textmutation** — auch die Fonts von BESTANDS-Texten, die nur verschoben/resized werden:
  ```js
  await figma.loadFontAsync({family:'{{FONT}}', style:'Black'});
  // Bestandsfonts unbekannt? Vorher: node.getStyledTextSegments(['fontName'])
  ```
- **Type-Guards für mixed:** `fontSize`, `cornerRadius`, `fills` können `figma.mixed` (Symbol) sein:
  ```js
  const num = v => typeof v === 'number' ? v : -1;   // Vergleich mit Symbol wirft TypeError!
  ```
- **Constraints locken** nach jedem Build: `n.constraints = {horizontal:'MIN', vertical:'MIN'}` auf ALLE Kinder — sonst driftet alles beim Frame-Resize.
- Fehlgeschlagene Scripts sind **atomar** (nichts wurde geändert) → Fehler lesen, fixen, neu laufen lassen.

## 2. Bilder & Cutouts

- Freisteller lokal: `rembg` (Modell u2net) → PNG → per `upload_assets` (POST multipart) hochladen.
- **Transparente PNGs IMMER `scaleMode:'FIT'`** — `FILL` erzeugt weiße Kästen.
- Figma dedupliziert per Hash: Hashes pro Brand in `Brands/<brand>/HASHES.md` pflegen und wiederverwenden:
  ```js
  img.fills = [{type:'IMAGE', scaleMode:'FIT', imageHash:'<hash aus HASHES.md>'}];
  ```
- **Rotierte Nodes:** `x/y/width/height` ≠ sichtbare Bounding Box. Rotierte Cutouts ragen über die Koordinaten hinaus → Kollisionen IMMER visuell prüfen.

## 3. Text

- **`resize()` resettet `textAutoResize` auf FIXED.** Danach `textAutoResize='HEIGHT'` neu setzen, sonst liefern Höhenmessungen Müll (Folgefehler: überlappende Zeilen, falsche Card-Höhen):
  ```js
  t.characters = '…';
  t.textAutoResize = 'HEIGHT';
  t.resize(600, 10);          // Breite setzen — killt HEIGHT!
  t.textAutoResize = 'HEIGHT'; // → Höhe stimmt wieder
  ```
- **Punchline-Fit-Formel** (XXL-Headline auf Zielbreite bringen):
  ```js
  t.fontSize = 100; t.textAutoResize = 'WIDTH_AND_HEIGHT';
  t.fontSize = Math.min(CAP /*≈220–230*/, Math.floor(100 * ZIEL /*≈960*/ / t.width));
  ```
- **Akzentwort einfärben:** `t.setRangeFills(idx, len, [{type:'SOLID', color:ACCENT}])`
- LineHeight Punchlines 100–104 %, Kicker 120 %. `lineHeight`/`letterSpacing` immer als `{unit,value}`.
- Sonderglyphen (★ ✓) NICHT als Text — nicht jeder Font hat sie. Sterne mit `createStar`, Häkchen als SVG.

## 4. SVG & Icons

- SVGs **müssen `width`/`height`-Attribute** haben, sonst verschieben/schrumpfen sie.
- SVG-Frames nach dem Einfügen NICHT gruppieren/umhängen (verschiebt Inhalte).
- Sterne/Siegel: `figma.createStar()` — `pointCount` + `innerRadius` (Siegel: 20 Zacken, 0.88; Bewertungssterne: 5 Zacken, 0.48).
- Häkchen-Badge:
  ```html
  <svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#18A957"/>
  <path d="M11 20.5 L17 26.5 L29 14" stroke="white" stroke-width="4" fill="none"
   stroke-linecap="round" stroke-linejoin="round"/></svg>
  ```

## 5. Sections in flache Layouts einfügen (Shift-Down-Methode)

```js
// 1. atY in einer NAHT zwischen Sections wählen (kein Node läuft über atY hinweg)
// 2. alles ab atY nach unten schieben, Frame wachsen lassen:
for (const n of m.children) { if (n.y >= atY) n.y += H; }
m.resize(m.width, m.height + H);
// 3. neue Nodes bei atY einbauen, Constraints MIN/MIN
```
**Vorsicht:** Verschiebe-Filter wie `y>=subY && width<1050` erwischen auch Hero-Cutouts — vorher entscheiden, ob das Cutout mitwandern soll.

## 6. Gruppierte Bausteine als Frames

Zusammengehörige Elemente (Banner, Cards, Siegel) als **Frame** bauen (`createFrame`, Fill, cornerRadius, `clipsContent=false`), Kinder mit lokalen Koordinaten, dann Frame als Ganzes positionieren/rotieren — Rotation einzelner loser Nodes verschiebt sie gegeneinander.

## 7. Z-Order

`appendChild` legt nach OBEN. Produkt-Cutout in Infografiken zuletzt appenden (liegt vor den Bannern). Bestehende Nodes nach oben holen: einfach erneut `m.appendChild(node)`.

## 8. QA-Export

- `download_assets` (PNG, scale 1) — bei Mails > 4096 px Höhe wird gedeckelt (Breite schrumpft proportional, ~530–630 px: ausreichend für QA).
- `get_screenshot` liefert nur 1024 px lange Kante → für lange Mails unbrauchbar.
- Crop-Workflow: Export laden → per PIL auf die Ziel-Region croppen → ansehen. NIE ungesehen liefern.

## 9. Figma-Zugriff

- Die Figma-MCP-Integration braucht **Edit-Zugriff** — auch für Screenshots/Metadata. View-only reicht nicht.
- Kein Zugriff? Optionen: (a) Kunde shared mit Edit-Rechten, (b) Datei in eigene Drafts duplizieren, (c) Kunde schickt Screenshots.
- Seiten-Kontext resettet pro Call → bei Multi-Page-Arbeit `setCurrentPageAsync` je Call genau 1×.

## 10. Wiederanlauf / Session-Übergabe

Pro Brand in `Brands/<brand>/` pflegen:
- `HASHES.md` — Bild-Hash-Registry (Hash, Motiv, Seitenverhältnis)
- `NODES.md` — Frame-IDs der gebauten Mails + Logo-Klon-Node
- So kann jede neue Session ohne Re-Upload und ohne Suche weiterbauen.
