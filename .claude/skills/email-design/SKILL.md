---
name: email-design
description: Produziert Marketing-E-Mail-Designs in Figma nach dem Community-System (Hero-Formate, Section-Baukasten, QA, Export) für die Brand des Nutzers. Aufruf mit Brand-Namen als Argument, z. B. /email-design meine-brand. Nutzen bei allen Aufgaben rund um E-Mail-Design, Mail-Kampagnen in Figma, Slices/Alt-Texte/Subject-Lines.
---

# E-Mail-Design-Produktion (Community-Workflow)

Du produzierst E-Mail-Designs in Figma nach einem festen System. Das Argument ist der Brand-Slug (z. B. `meine-brand`). Alle Pfade sind relativ zum Repo-Root (dem Ordner, in dem Claude Code gestartet wurde).

## Grundprinzip: „Fehlt etwas? → Sofort melden."

Vor JEDEM Schritt prüfst du, ob dir etwas fehlt, um das System 1:1 umzusetzen — Bilder, Logo, Font, belegbare Fakten, echte Reviews, Copy-Input, Stil-Inspo, Zugänge. Wenn ja: **STOPP** und melde es als klare Liste im Format:

> **Mir fehlt:** … (was genau, wofür ich es brauche)
> **Bitte liefere:** … (konkret: Format, Größe, Anzahl — z. B. „3 Hero-Fotos ≥1080×1920 px")
> **Alternativ:** … (was ich stattdessen tun kann, z. B. Section weglassen, Fallback-Font)

Niemals stillschweigend Platzhalter einbauen, Fakten erfinden oder Reviews ausdenken. Lieber eine Section weglassen als sie mit erfundenem Inhalt füllen.

## Schritt 0 — Kontext laden (PFLICHT, vor allem anderen)

1. Lies `System/MASTER-EMAIL-SYSTEM.md` — das Regelwerk (Hero-Aufbau, 4 Headline-Typo-Stile, 23 Section-Typen, Copy-Regeln, QA, Export).
2. Lies `System/FIGMA-RECIPES.md` — technische Plugin-API-Rezepte und bekannte Fallen.
3. Lies `Brands/<brand>/BRAND.md` — alle Brand-Parameter — sowie `HASHES.md`/`NODES.md` daneben, falls vorhanden.
4. Lade das `figma-use`-Skill, bevor du `use_figma` aufrufst.

**Existiert kein `Brands/<brand>/BRAND.md`:** Starte das Onboarding nach `System/ONBOARDING.md` — recherchiere selbst (Teil A), stelle dem Nutzer die Liefer-Liste (Teil B) und fülle `System/BRAND-KIT-TEMPLATE.md` als `Brands/<brand>/BRAND.md` aus. Offene Punkte als `⚠️ FEHLT` markieren und dem Nutzer gesammelt melden. **Keine Mail-Produktion, bevor der Nutzer das BRAND.md freigegeben hat** (Blocker-Checkliste in ONBOARDING.md beachten).

**Enthält das BRAND.md noch `⚠️ FEHLT`-Marker, die den Auftrag betreffen:** Erst melden (Format oben), dann weiter.

## Schritt 1 — Briefing klären

Aus der Anfrage ableiten (nur nachfragen, was wirklich fehlt): Anzahl Mails, Mail-Typen (Launch/Restock/Social-Proof/FAQ/Bundle/…), Produktlinie(n). Dann Variation-Matrix aufstellen: jede Mail bekommt eine einzigartige Kombination aus Transition + Hintergrund/Gradient + Headline-Typo-Stil + 2–4 Sections. **Blocker-Check:** Reichen die vorhandenen Bilder für die geplanten Mails (Bild-Spez MASTER §9)? Wenn nein → melden.

## Schritt 2 — Copy-Pass

Pro Mail: Kicker (Szene/Flüsterzeile) + XXL-Punchline (Payoff, ein Akzentwort) + Sub + eigener CTA aus dem CTA-Pool (keine Wiederholung innerhalb der Kampagne). Pain Points und Reviews NUR aus dem BRAND.md. **Blocker-Check:** Fehlen Pain Points oder Reviews für die geplanten Sections → melden (Alternativ-Vorschlag: andere Section aus dem Baukasten).

## Schritt 3 — Build in Figma

In der Brand-Figma-Datei des Nutzers (Duplikat der Master-Library „EMAIL-SYSTEM-LIBRARY" oder neue Datei). Nach MASTER-EMAIL-SYSTEM §2 (Hero) und §4/§5 (Sections/Body), technisch nach FIGMA-RECIPES. Bilder: Hintergrund entfernen (rembg) wo nötig, hochladen, Hash sofort in `Brands/<brand>/HASHES.md` eintragen; neue Frame-IDs in `NODES.md`. **Blocker-Check:** Brand-Font in Figma verfügbar? Edit-Zugriff auf die Datei? Wenn nein → melden mit Lösungsweg.

## Schritt 4 — QA (für JEDE Mail, keine Ausnahme)

Export via `download_assets` (PNG, scale 1) → Hero und jede Section croppen → ansehen → Checkliste aus MASTER §10 abhaken → Fehler fixen, dann erst weiter. Dem Nutzer pro Mail einen Screenshot/eine Beschreibung zur Freigabe zeigen.

## Schritt 5 — Export & Lieferung

Nach Freigabe: 8 gleiche Slices (2x JPEG) + Alt-Text pro Slice + 3–5 Subject/Preheader-Sets pro Mail (MASTER §6, §11). Optional (falls verbunden): Klaviyo-Upload. Abschließend Zusammenfassung mit Figma-Links und allen Headlines/CTAs.
