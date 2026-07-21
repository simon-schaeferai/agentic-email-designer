# MASTER E-MAIL-SYSTEM (brand-agnostisch)

Das Regelwerk für alle E-Mail-Designs der Agentur. Gilt für JEDEN Brand.
Alle `{{PLATZHALTER}}` kommen aus dem Brand-Kit des jeweiligen Kunden
(`Brands/<brand>/BRAND.md`). **Ohne abgenommenes Brand-Kit keine Produktion.**

Technische Figma-API-Rezepte: siehe [FIGMA-RECIPES.md](FIGMA-RECIPES.md).
Onboarding-Prozess: siehe [ONBOARDING.md](ONBOARDING.md).

---

## 1. Grundregeln (gelten IMMER, brandunabhängig)

| Regel | Wert |
|---|---|
| Breite | **1080 px** pro E-Mail-Frame |
| Schrift | `{{FONT_DISPLAY}}` für Headlines/CTAs, `{{FONT_BODY}}` für Subs & Body |
| Letter Spacing | `{{LETTER_SPACING}}` — pro Font kalibrieren! (−5 % war eine Poppins-Entscheidung, nicht universell) |
| Dunkelste Farbe | `{{COLOR_INK}}` (fast-schwarzer Marken-Ton, nie reines #000) |
| Logo | `{{LOGO_NODE}}` — als Klon-Quelle in der Brand-Figma-Datei anlegen |
| Lesbarkeit | Mobile-first: Body nie unter ~30 px, Icons groß, alles ohne Zoomen lesbar |
| Footer | **Kein** Footer-Block im Design — der Footer kommt aus dem ESP (Klaviyo) |
| Struktur | **Ein flacher Frame** pro Mail: alle Elemente/Bausteine direkt als Kinder, kein Auto-Layout auf Mail-Frame-Ebene. Baustein-Frames (Pill/Button/Capsule/Card) DÜRFEN intern Auto-Layout nutzen (FIGMA-RECIPES §5b) |
| Constraints | Nach jedem Build/Patch ALLE Kinder auf `MIN/MIN` locken |
| Bilder | Pro Mail nur Bilder der beworbenen Produktlinie — nie Produktlinien mischen |
| Fakten | Nur belegbare Trust-Fakten aus `{{TRUST_FACTS}}`, nur echte Reviews aus `{{REVIEWS}}` — **nichts erfinden** |

---

## 2. Hero-Aufbau (oberer Bereich jeder Mail)

Reihenfolge von oben nach unten:

1. **Logo** (zentriert, y≈70)
2. **Badge-Pill** (Caps-Label zum Mail-Anlass, z. B. „LOW-STOCK-ALARM")
3. **Kicker-Zeile** — klein, `{{FONT_DISPLAY}}` SemiBold-Äquivalent 32–42, CAPS, 75–85 % Deckkraft, reiner Text (keine Pill)
4. **XXL-Punchline** — fetteste Schnitt-Stufe **105–230 px**, füllt ~960 px Breite (links-ausgerichtet: ~880 px). Ein Wort in der Mail-Akzentfarbe
5. **Sub** — Body-Schnitt 38–52, max. 2–3 Zeilen, punchy
6. **Heller CTA-Button** — 769×148 px, Radius `{{BUTTON_RADIUS}}` (aus dem Brand-Kit — 0 = eckig, 44 = Pille), Text fett ~70 in `{{COLOR_INK}}` (links-ausgerichtete Mails: 560 px breit)
7. **Glass-Capsule** unter dem Button (Pill mit Background-Blur, Micro-Trust-Zeile)

**CTA-Typo-Hierarchie (PFLICHT):** Die Stützzeile unter einem CTA (Capsule, Abbinder) muss **deutlich kleiner** sein als der Button-Text — Ziel-Verhältnis **≤ 0,5** (Button ~64–70 → Stützzeile ~30–34). Nie fast gleich groß: eine Full-Width-Zeile bei 40 px wirkt gegen einen geboxten 64-px-Button optisch gleich laut und schwächt den CTA. Kapsel-Pills an die kleinere Textbreite anpassen (huggen), nicht leer stehen lassen.

**Hintergrund:** Foto 1080×1920 oben + Gradient-Overlay für Textlesbarkeit + Photo-Cover-Rechteck darunter (Standard y=2160) + **Transition-Shape** zum nächsten Abschnitt.

### Headline-Typografie: 4 Stile (pro Mail EINEN, über die Kampagne variieren)

| Stil | Aufbau | Muster |
|---|---|---|
| **Riesen-Einzelwort** (SEKOU) | Mini-Kicker + 1 gigantische Zeile (bis 230 px) | „KURZE WARNUNG:" → „FAST **WEG.**" |
| **Gestapelte Caps** (Casely) | 2–3 fette Caps-Zeilen, jede füllt die volle Breite | „EINS, DAS / **BLEIBT.**" |
| **Fett + Italic-Mix** | Caps-Zeile + Italic-Zeile in Akzentfarbe | „WALLET? / ***PEINLICH.***" |
| **Größenmix** (OG X) | Kleine Zeile + riesiges Wort + mittlere Zeile | „VERLIEREN / *ist freiwillig.*" |

**Autoscale-Regel:** Punchline so groß wie möglich; wenn der Stack den Sub verdrängt, in 8-%-Schritten verkleinern (nie unter ~100 px). Abstände: Kicker→Punch 24–26 px, Punch→Punch 8–10 px, Stack→Sub ≥ 16 px.

### Links-ausgerichtete Color-Heros (Sonderfall)
- Vollflächiger Farb-Hintergrund statt Foto, Text links bei x=70
- **Textspalte max. 630 px** (Sub 540–600 px), Produkt-Cutout rechts
- Rotierte Cutouts: Bounding Box ragt über x/y hinaus — Cutout darf die Textspalte nie berühren (notfalls verschieben oder auf ~80 % skalieren)
- Bei zu hohem Headline-Stack: EINE breite Zeile statt zwei gestapelte

---

## 3. Copywriting-Regeln

1. **Kicker = Szene/Flüsterzeile, Punchline = Payoff.** Die erste Headline muss provokant sein und zum Weiterlesen zwingen. Muster: konkreter Moment („Kassenzone. 17:42 Uhr.") → emotionaler Payoff („Alle schauen **zu.**")
2. **Kurze, punchy Sätze.** Ein Gedanke pro Zeile. Keine Schachtelsätze.
3. **Jede Mail hat einen EIGENEN CTA** aus `{{CTA_POOL}}` — nie zweimal derselbe innerhalb einer Kampagne.
4. **Pain Points** aus `{{PAIN_POINTS}}` (Quelle: Produktseiten, Reviews, Ads des Brands).
5. **Social Proof nur mit echten Reviews** aus `{{REVIEWS}}` (Name + Quelle).
6. Sprache und Anrede nach `{{VOICE}}` (Du/Sie, Tonalität, Tabu-Wörter beachten).

---

## 4. Section-Baukasten (Variation ist Pflicht!)

**Goldene Regel:** Jede Mail bekommt eine **einzigartige Kombination** aus Transition + Hintergrund + 2–4 Sections, die es in den Nachbar-Mails NICHT gibt.

### Transitions (Hero → Body)
Wave · Wave 2 · Zigzag · Zigzag fein · Diagonal · Diagonal 2 · Arc · Arc-Line · Soft Fade

### Section-Typen (Bibliothek — visuelle Referenz: Figma „EMAIL-SYSTEM-LIBRARY")
| # | Typ | Beschreibung |
|---|---|---|
| 1 | Zigzag-Rows | Bild-Text-Reihen abwechselnd links/rechts |
| 2 | Stat-Row | 3er-Reihe große Zahlen + Label |
| 3 | Stat-Stack | Untereinander gestapelte Zahlen (Huel-Stil) |
| 4 | Gauge | Halbkreis-Tacho mit Bewertungs-Score |
| 5 | XL-Zahlenband | Vollbreites Band mit Riesen-Zahl |
| 6 | Promise-Grid | 2×2 Karten Icon + Versprechen (Versand/Rückgabe/Zahlung/Support) |
| 7 | Chat-Bubbles | Frage/Antwort als Chat („Ihr habt gefragt:") |
| 8 | Code-Box | Gutschein-/Aktionscode gerahmt |
| 9 | Highlighter | Statement-Satz mit Textmarker-Effekt |
| 10 | VS-Duell | Zwei Spalten Alt vs. Neu / Zweifel vs. Realität mit ✕/✓ |
| 11 | Picks-Grid | 2×2 Produkt-/Empfehlungs-Kacheln |
| 12 | Review-Panel | Großes Einzelreview mit Sternen (Trustpilot-Look) |
| 13 | Insta-Kommentar | Kommentar-Karte im Social-Look |
| 14 | Infografik A | Produktfoto frei + Callout-Kreise/Pills mit Linien |
| 15 | Infografik B | Foto frei + unten 3 Glass-Cards mit 01/02/03-Chips |
| 16 | Cutout-Panel | Freigestelltes Produkt auf Farbfläche |
| 17 | Color-Ticker | Farb-/Variantenchips als Laufband |
| 18 | Dark Icon-Band | Dunkles Band mit 2×3 Icons + Labels |
| 19 | Outline-Circles | Kreise mit Outline-Icons |
| 20 | Q&A-Karten | Einwand als Zitat + Antwort |
| 21 | Vorher/Nachher | Zwei Spalten Zeit-/Zustandsvergleich |
| 22 | Ribbon-Infografik | Produkt mittig VORNE, 4 schräge Banner (±3–4°) + Sternen-Siegel (Gruns-Stil) |
| 23 | Verified-Buyer-Cards | Dunkles Band, helle Review-Karten mit Sternen + „Verifizierter Käufer"-Häkchen |

### Bauregeln Ribbon-Infografik (#22)
- Section-BG: heller Ton aus der Brand-Palette; Banner: Creme-/Tint-Ton, Radius 36, Rotation ±3–4°
- **Produkt-Cutout (380 px) liegt IMMER im Vordergrund** (zuletzt appenden)
- Banner-Texte nach AUSSEN: linke Banner Text bei x=36 (endet < 350), rechte bei x=134 — innere Enden bleiben leer und verschwinden hinterm Produkt
- Headings 36–42 (kein Wortende hinterm Produkt!), Body 32 bei 65 % Deckkraft, Breite 290
- Siegel: Stern-Node 20 Zacken, innerRadius 0.88 — außen Akzent (320 px), innen Ink (280 px), helle Texte + 5 Mini-Sterne, −8° rotiert

### Bauregeln Verified-Buyer-Cards (#23)
- Vollbreites Ink-Band, Kicker (34, 60 % hell) + Headline (fett 70, hell)
- Karten 900 px, Radius 40, heller Ton — zweite Karte 60 px versetzt
- Pro Karte: 5 Stern-Nodes 36 px (KEIN ★-Glyph — nicht jeder Font hat ihn), Name fett 42 + Häkchen-Kreis (SVG) + „Verifizierter Käufer" (32, 50 %), Zitat fett 38, „Gefällt mir / Antworten" (30, 45 %)
- Kleines gekipptes Produkt-Cutout oben rechts (±10°), Texte darüber

---

## 5. Body-Grundgerüst (nach dem Hero)

1. Transition + erste Content-Section
2. 1–2 Unique-Sections aus dem Baukasten
3. **Dunkler CTA-Button** 960×148, Radius `{{BUTTON_RADIUS}}`, heller Text + Outline-Capsule (Preis/USP)
4. Dunkles Icon-Band oder weitere Section
5. **Finale Headline** (fett ~90–100, 2 Zeilen) + Abbinder-Sub
6. Zweiter dunkler CTA (gleicher CTA-Text wie oben)
7. **Trust-Row** aus `{{TRUST_FACTS}}` (3 Spalten: Zahl + Label)

---

## 6. Subject Lines & Preheader

- **Subject < 45 Zeichen**, Preheader ergänzt (führt den Gedanken weiter, wiederholt nicht)
- Pro Mail 3–5 Varianten liefern, verschiedene Angles:
  - **Neugier/Loop:** unvollständiger Gedanke („Wir haben uns verkalkuliert.")
  - **Szene:** konkreter Moment aus dem Hero-Kicker
  - **Zahl/Beweis:** härtester Trust-Fakt
  - **Dringlichkeit:** ehrlich begründet (Lagerbestand, Deadline) — nie fake
  - **Direkt:** Produkt + Kernnutzen
- Kein CAPS-Spam, max. 1 Emoji (wenn Brand-Voice es erlaubt), keine Spam-Trigger („GRATIS!!!")

## 7. Text-Only-Mails (Klaviyo, „persönliche" Mails)

- Absender-Stil: wie eine private Mail des Gründers — kein Design, reiner Text
- Struktur: persönlicher Einstieg (1–2 Sätze Story) → ein Punkt, ehrlich begründet → ein Link → kurzer Gruß mit Vornamen
- Länge: 80–150 Wörter. Keine Bilder, kein Button — Textlink.
- Voice strenger als Design-Mails: `{{VOICE}}`-Beispielsätze als Maßstab

## 8. WhatsApp-Formate

- Max. ~500 Zeichen, 2–4 kurze Absätze, 1–3 passende Emojis
- Aufbau: Hook-Zeile → Begründung/Story (ehrlich, z. B. „wir haben nicht viele produziert") → klare Handlung + Link
- Immer eine Variante mit und ohne Rabatt-Anreiz liefern

## 9. Bild-Anforderungen (Spezifikation für Kunden-Assets)

| Motiv-Typ | Zweck | Anforderung |
|---|---|---|
| Hero-Szene | Hero-Hintergrund | ≥1080×1920, Produkt nicht mittig (Platz für Text), stimmungsvoll |
| Produkt frei | Cutouts, Infografiken | ≥1500 px Kante, gleichmäßiger BG (Freisteller-tauglich für rembg) |
| Hand-Interaktion | Cutout-Kompositionen | Hand + Produkt vom Bildrand kommend |
| Detail | Zigzag-Rows, Material-Sections | Nahaufnahme Textur/Mechanik |
| Varianten | Color-Ticker, Picks-Grid | Alle Farben, identische Perspektive |

Mindestens: 3 Hero-Szenen + 2 Freisteller-Motive + 1 Hand-Interaktion **pro Produktlinie**.

> ⚠️ Shop-Galerien (z. B. Shopify) mischen cleane Produktfotos mit Marketing-Creatives, die eingebrannte Headlines/Stat-Boxen/Badges enthalten. Nur cleane Originale verwenden — jedes Bild VOR Verwendung sichten; unvermeidbare Creatives per CROP auf die cleane Region beschneiden (FIGMA-RECIPES §2).

## 10. Qualitätssicherung (Pflicht nach jedem Build)

1. Export über `download_assets` (PNG, Scale 1 — Achtung 4096-px-Deckel; `get_screenshot` ist mit 1024 px zu klein)
2. Hero + jede neue Section **croppen und ansehen** (nie nur Metadaten!)
3. Checkliste:
   - [ ] Kicker → Punchline → Sub → Button → Capsule klar getrennt
   - [ ] Button-Text vollständig sichtbar, nichts hinter Cutouts
   - [ ] Kein Text hinter Produktbildern (auch Wortenden prüfen)
   - [ ] Akzentwort in der richtigen Brand-Farbe
   - [ ] Transition sauber, Foto endet unterm Cover-Rechteck
   - [ ] Alle Texte mobil lesbar
4. Fehler erst fixen, dann weiterbauen

## 11. Export & Lieferung (Klaviyo)

- Mail in **8 gleich hohe Slices**, Export **2x JPEG**
- Ablage: `Brands/<brand>/export/<mail-name>/` — Slices nummeriert (`01.jpg` … `08.jpg`) + `alt-texte.md` + `subjects.md`
- Pro Slice ein **Alt-Text**; alle Alt-Texte zusammen = lesbare Text-Version der Mail
- Lieferpaket pro Mail: Slices + Alt-Texte + 3–5 Subject/Preheader-Sets + Figma-Link
- Bei Klaviyo-Zugang: Bilder hochladen + Template anlegen (Kunden-eigene Klaviyo-MCP-Verbindung nötig)
- Design endet mit der Trust-Row — Footer kommt aus Klaviyo
