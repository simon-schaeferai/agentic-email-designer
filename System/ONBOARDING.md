# ONBOARDING — Deine Brand in < 1 Tag produktionsbereit

Ziel: Von Null bis zur ersten fertigen Mail in unter einem Tag.
Ergebnis von Phase A–C ist ein **von dir freigegebenes `Brands/<deine-brand>/BRAND.md`** — ohne das keine Produktion.

---

## Teil A — Auto-Recherche (macht Claude, ~1–2 h)

Claude arbeitet diese Punkte selbstständig ab und trägt alle Funde ins BRAND.md-Entwurf ein (immer mit Quelle). Offene Felder werden als `⚠️ FEHLT` markiert:

1. **Deine Website & Produktseiten**
   - USPs, Preise, Feature-Fakten, Garantien/Policies → BRAND-KIT §3, §4
   - Deine Formulierungen wörtlich sammeln → Voice-Beispielsätze BRAND-KIT §2
   - Pain Points, wie du sie selbst benennst → BRAND-KIT §5
2. **Deine Review-Quelle** (Trustpilot / Judge.me / Amazon / Shop-Reviews)
   - Score + Anzahl → BRAND-KIT §4
   - 10–15 wörtliche Zitate mit Namen → BRAND-KIT §6 (beste 5 markiert)
   - Wiederkehrende Kundenformulierungen → zusätzliche Pain Points BRAND-KIT §5
   - Hinweis: Trustpilot blockt teils automatische Abrufe (403) → dann Screenshots/Export von dir
3. **Ad-Recherche** (Meta Ad Library — im Browser oder per verbundenem Tool)
   - Deine laufenden Ads: Hooks, Angles, Offers → CTA-Ideen BRAND-KIT §7, Pain Points BRAND-KIT §5
   - 2–3 Wettbewerber gegenchecken (Positionierungs-Lücken)
4. **Deine bisherigen E-Mails** (falls vorhanden: 3–5 weiterleiten oder Screenshots)
   - Was hat funktioniert, was vermeiden

**Shopify-Recon-Rezept** (wenn der Shop auf Shopify läuft — Test: `https://<shop>/products/<handle>.json` liefert JSON):
- `/products/<handle>.json` pro Produkt: Original-Bilder in voller Auflösung (`images[].src` ohne `?width=`), Preise/UVP (`variants[]`), Beschreibung (`body_html`) — verlässlicher als Markdown-Fetches der Shopseiten
- Farben/Fonts: Startseiten-HTML roh laden (`curl`) und `--heading-font-family`/`--text-font-family` + häufigste Hex-Werte extrahieren; Theme-CSS liegt unter `/cdn/shop/t/…/assets/`
- Bilder sichten per Kontaktbogen: alle Galerie-Thumbs (`?width=200`) laden und mit PIL zu einem Übersichts-Bild kacheln — dann EINMAL ansehen statt 50 Einzelbilder
- ⚠️ **Shop-Galerien mischen cleane Produktfotos mit Marketing-Creatives** (eingebrannte Headlines, Stat-Boxen, Badges). Jedes Bild vor Verwendung sichten; cleane Motive notieren, Creatives meiden oder croppen (Rezept: FIGMA-RECIPES §2)

## Teil B — Deine Liefer-Liste (12 Punkte)

> Das kann Claude NICHT recherchieren — das lieferst du:

1. Logo als Vektor (SVG/AI) — helle + dunkle Variante
2. Brand-Font: Name + Lizenz/Font-Dateien (oder Google Font)? Falls unklar: Fallback-Vorschlag von Claude freigeben
3. Offizielle Farbwerte (Hex) — falls du einen Brand-Guide hast: anhängen
4. Hi-Res-Produktbilder nach Bild-Spez (MASTER-EMAIL-SYSTEM §9): **3 Hero-Szenen + 2 Freisteller + 1 Hand-Interaktion pro Produktlinie**
5. Belegbare Trust-Zahlen (Kundenzahl, Bewertungen, Versand-/Rückgabe-Versprechen)
6. Die 3 häufigsten Einwände, die du von Kunden hörst
7. Bestseller & Prioritäten — was sollen die Mails pushen?
8. Figma: dein Account, Edit-Zugriff für die MCP-Verbindung
9. Klaviyo-Zugang (nur falls du den Bonus-Upload willst)
10. Wie du freigeben willst (z. B. jede Mail einzeln im Chat abnicken)
11. No-Gos: rechtlich (Claims, Bildrechte), inhaltlich (Themen, Wörter), visuell
12. 3–5 E-Mails (eigene oder fremde), die dir gefallen — als Stil-Anker/Inspo

## Teil C — Definition of Done (Onboarding fertig, wenn:)

- [ ] BRAND.md vollständig (kein `⚠️ FEHLT` mehr) und **von dir freigegeben**
- [ ] Brand-Font in Figma verfügbar (oder Fallback freigegeben)
- [ ] Brand-Figma-Datei angelegt: Master-Library dupliziert, Logo-Klon-Node erstellt
- [ ] Bilder einsortiert, erste Cutouts erzeugt, `HASHES.md` gestartet
- [ ] (Optional) Klaviyo-Verbindung getestet

## Teil D — Produktions-Ablauf (pro Mail-Batch)

1. **Briefing:** Mail-Typen festlegen (Launch/Restock/Social-Proof/FAQ/Bundle/…) — Variation-Matrix: jede Mail eigene Transition + Hintergrund + 2–4 Sections
2. **Copy-Pass:** Kicker/Punchline/Sub/CTA je Mail aus Pain Points + Voice (MASTER §3), CTAs ohne Wiederholung
3. **Build:** Claude baut per Figma-API nach MASTER-EMAIL-SYSTEM + FIGMA-RECIPES
4. **QA-Loop:** Export → Crop → Sichtprüfung → Fix (MASTER §10) — für JEDE Mail
5. **Export:** 8 Slices 2x JPEG + Alt-Texte + 3–5 Subject/Preheader-Sets
6. **Learnings (zweigeteilt):** Brand-Besonderheiten zurück ins BRAND.md/HASHES/NODES · generische Erkenntnisse (Rezepte, Fallen) als Vorschlag für `System/` dem Nutzer vorlegen — nach Freigabe einarbeiten + `CHANGELOG.md`-Zeile

## Blocker-Checkliste (ohne diese Punkte keine Produktion)

1. **Figma-Edit-Zugang** (die Figma-Verbindung braucht Edit-Rechte — view-only reicht nicht einmal für Screenshots)
2. **Brand-Font in Figma verfügbar**
3. **Hi-Res-Bilder** nach Spez (Hero ≥1080×1920, Freisteller-tauglich)
4. **Belegbare Trust-Fakten + echte Reviews** — es wird nichts erfunden
5. Für den Klaviyo-Bonus: Klaviyo-Zugang
