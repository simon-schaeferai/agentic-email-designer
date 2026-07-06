# FIGMA-RECIPES — Technische Rezepte für den E-Mail-Build (Plugin API via use_figma)

Alle hart erarbeiteten Learnings aus der Produktion. Vor jedem Build lesen.
**Immer zuerst das `figma-use`-Skill laden** und `skillNames: figma-use` mitgeben.

---

## 1. Setup-Grundlagen

- **Werkzeugkasten (optional, empfohlen für die Mechanik):** [figma-helpers.js](figma-helpers.js) — 12 Helfer (messen, stapeln, zentrieren, Pre-QA), die die häufigsten Layout-Rechenfehler eliminieren. Bei Nutzung: Datei VERBATIM an den Script-Anfang kopieren (nie kürzen) und `{hv:HV, …}` im return echoen — fehlt `hv`, wurde die Kopie verstümmelt. Werkzeuge, kein Korsett: Komposition bleibt frei, rohe Plugin-API jederzeit erlaubt.

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
- **Fixes an Bestands-Nodes:** IDs immer aus den return-Werten früherer Calls nehmen, nie aus dem Gedächtnis — und vor der Mutation den Node-Typ prüfen (`n.type`). Klassiker: `characters`-Edit trifft einen STAR statt des TEXT-Nodes, weil die ID um eins daneben lag.

## 2. Bilder & Cutouts

- **Upload-Flow konkret:** `upload_assets` (count=N) liefert Submit-URLs → pro Bild `curl -s -X POST "<submitUrl>" -F "file=@bild.webp;type=image/webp"` → die Response enthält den `imageHash` direkt. Der Upload legt einen Temp-Frame auf dem Canvas an → im nächsten Script löschen. Hash sofort in `Brands/<brand>/HASHES.md`.
- **Freisteller-Optionen, in dieser Reihenfolge:**
  1. **BG-Blend statt Freistellen:** Studiofotos haben oft einen uniformen Hintergrund (Eckpixel lokal mit PIL prüfen). Section-/Karten-BG exakt auf diesen Ton setzen → Bild blendet nahtlos, funktioniert auch rotiert. Kein rembg nötig.
  2. Freisteller lokal: `rembg` (Modell u2net) → PNG → hochladen (Achtung: pip-Install kann an PEP 668 scheitern).
- **CROP gegen eingebrannte Overlays** (Headlines/Stat-Boxen im Shop-Bild): cleane Region lokal vermessen (PIL-Zeilenfüllungs-Profil zeigt die Lücke zwischen Overlay und Produkt), dann:
  ```js
  img.fills = [{type:'IMAGE', scaleMode:'CROP',
    imageTransform: [[w, 0, x0], [0, h, y0]],   // Region normalisiert 0–1
    imageHash: '<hash>'}];
  // Node-Seitenverhältnis MUSS dem Regions-Verhältnis entsprechen, sonst verzerrt
  ```
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
- **Punchline-Fit-Formel** (XXL-Headline auf Zielbreite bringen) — als Helfer: `fitText(t, 960)`:
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
**Vorsicht:** Verschiebe-Filter wie `y>=subY && width<1050` erwischen auch Hero-Cutouts — vorher entscheiden, ob das Cutout mitwandern soll. Als Helfer: `shiftDown(m, atY, H, skip)` — die Cutout-Ausnahme wird zum expliziten `skip`-Callback.

## 5b. Auto-Layout in Baustein-Frames (erlaubt und empfohlen)

Die „kein Auto-Layout"-Regel gilt für den MAIL-FRAME (flach, wegen Shift-Down) — **innerhalb von Baustein-Frames ist Auto-Layout erlaubt** und macht abgeschnittene Texte strukturell unmöglich:

| Baustein | Auto-Layout? | Modus |
|---|---|---|
| Badge-Pill, Glass-/Outline-Capsule | ✔ empfohlen (`pill()`-Helfer) | HORIZONTAL, HUG×HUG — Container wächst mit Text |
| CTA-Buttons | ✔ empfohlen (`button()`-Helfer) | Fixmaß lt. Spec, Auto-Layout zentriert + klemmt das Label |
| Cards (Review, VS-Spalten, Q&A) | optional | VERTICAL, Breite FIXED, Höhe HUG; freie Deko-Kinder via `layoutPositioning:'ABSOLUTE'` |
| Sections als Ganzes, Hero, Mail-Frame | ✘ nein | geschichtete Kompositionen → plain Frame + `stack()`/`centerX()` |

Zwei Fallen: (a) `resize()` auf einem HUG-Frame stellt still auf FIXED um — Pills nie resizen, stattdessen Text/Padding ändern. (b) `x/y` auf Kindern IN Auto-Layout ist wirkungslos — Padding/`itemSpacing` nutzen. (c) Rotation nur am GANZEN Baustein-Frame, nie an Auto-Layout-Kindern.

## 6. Gruppierte Bausteine als Frames

Zusammengehörige Elemente (Banner, Cards, Siegel) als **Frame** bauen (`createFrame`, Fill, cornerRadius, `clipsContent=false`), Kinder mit lokalen Koordinaten, dann Frame als Ganzes positionieren/rotieren — Rotation einzelner loser Nodes verschiebt sie gegeneinander.

## 7. Z-Order

`appendChild` legt nach OBEN. Produkt-Cutout in Infografiken zuletzt appenden (liegt vor den Bannern). Bestehende Nodes nach oben holen: einfach erneut `m.appendChild(node)`.

## 8. QA-Export

- **Schnellster Weg für Frames bis ~2500 px:** `await frame.screenshot()` am ENDE desselben `use_figma`-Calls — das Bild kommt inline zurück, Build und Sichtprüfung in einem Call.
- **Pre-QA vor dem Screenshot (optional, spart Fix-Zyklen):** `qaCheck(m)` aus dem Werkzeugkasten meldet Layout-Defekte als Daten (Überlappungen, abgeschnittene/verdeckte Texte, Spalten-Überläufe) — Befunde bewerten und fixen, BEVOR der Screenshot fällt. Ersetzt die Sichtprüfung NICHT (Kontrast auf Fotos, Bildanschnitt, Ästhetik sieht nur der Export). Absichtliche Design-Entscheidungen im QA-Bericht als solche benennen.
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

## 11. Export/Slicing (MASTER §11) — ⚠️ UNGETESTET, beim ersten realen Export verifizieren und dieses Rezept nachschärfen

1. Frame-Höhe auf eine durch 8 teilbare Zahl bringen (unten minimal Weißraum ergänzen).
2. Pro Slice ein **`figma.createSlice()`** (1080 × H/8) bei y = i·H/8 über der Mail platzieren, mit `exportSettings = [{format:'JPG', constraint:{type:'SCALE', value:2}}]`. **NICHT Kind-Frames verwenden** — ein Frame exportiert nur den EIGENEN Teilbaum und liefert leere JPGs; SLICE-Nodes exportieren die darunterliegende Canvas-Region.
3. Je Slice einzeln `download_assets` — umgeht den 4096-px-Deckel, weil pro Slice exportiert wird. Slices danach löschen.
4. Ablage: `Brands/<brand>/export/<mail-name>/` als `01.jpg` … `08.jpg` + `alt-texte.md` (pro Slice ein Alt-Text, zusammen die lesbare Text-Version) + `subjects.md` (3–5 Subject/Preheader-Sets).

## 12. Namenskonvention (Empfehlung — macht Pre-QA präzise und Fixes ID-frei)

Jeder erzeugte Node: `<sektion>/<rolle>[-n]` — z. B. `hero/punch-1`, `sec2/bg`, `hero/cutout`. Rollen mit QA-Semantik: `bg` (Hintergrund — Text darauf ist normal), `deco` (Glows/Transitions — von allen Checks ausgenommen), `img`/`cutout` (Bildmaterial — Text-Kollision wird gemeldet), `btn`/`pill` (Label-Fit wird geprüft). Suffix `~free` = Node bewusst von qaCheck ausgenommen (im QA-Bericht nennen!). Fixes laufen dann über `byName(m, 'hero/punch-1', 'TEXT')`/`setText()` statt über gemerkte IDs — die Fehlerklasse „falschen Node erwischt" verschwindet.

**Smoke-Test nach jeder Änderung an figma-helpers.js** (ein Call): Test-Frame bauen mit (a) `pill()` mit Überlänge-Text, (b) Rect `t/img` + Text absichtlich darüber, (c) Text absichtlich unter einem später appendeten Rect, (d) 4er-`stack()`. Erwartung: `qaCheck` meldet GENAU die 2 absichtlichen Fehler (TEXT_OVERLAP, COVERED) und keine falschen; Pill-Text vollständig. Danach Test-Frame löschen.
