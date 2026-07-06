# Changelog

Änderungen am System (Regelwerk, Skill, Setup). Eine Zeile pro Änderung, neueste zuerst. Brand-Daten (`Brands/*`) tauchen hier nicht auf.

## 2026-07-06

- System: Learnings-Pass als Pflicht-Schritt 6 im `/email-design`-Skill (brand-lokal ohne Rückfrage, generisch → System-Vorschlag mit Freigabe + CHANGELOG-Zeile)
- FIGMA-RECIPES: Rezepte aus der ersten Produktion ergänzt — Upload-per-curl-Flow, BG-Blend statt rembg, CROP gegen eingebrannte Overlays, `frame.screenshot()`-QA, Fix-Regel (Node-Typ prüfen), Export/Slicing-Rezept (ungetestet)
- ONBOARDING: Shopify-Recon-Rezept (Produkt-JSON, Theme-CSS, Kontaktbögen) + Warnung vor Text-Creatives in Shop-Galerien; §-Verweise als „BRAND-KIT §N" qualifiziert; Learnings-Punkt zweigeteilt
- MASTER: Export-Ablage `Brands/<brand>/export/<mail-name>/` in §11 verankert; §9-Warnung zu eingebrannten Text-Overlays
- SETUP: Master-Library als optional gekennzeichnet (Mails entstehen auch direkt nach Regelwerk), Bau-Verweis auf §2+§4 korrigiert; Troubleshooting-Zeile zum Figma-MCP-Limit (Starter/View-Seat ≈ 6 Calls/Monat)
- BRAND-KIT-TEMPLATE: Beleg-Spalten und „Aktueller Anlass"-Zeile aus der Produktions-Praxis nachgezogen
- Beispiel-Brand: HASHES.md/NODES.md-Beispiele + assets-README ergänzt (Erwartungsbild für die Registries)
- Repo: CONTRIBUTING.md neu, CHANGELOG.md neu, verwaiste `.env.example`-Zeile aus `.gitignore` entfernt
- README: Brand-Teaser (docs/teaser.png) + Schaufenster-Struktur (Idee, How it works, Quick start, Design-Entscheidungen, Grenzen)

## 2026-07-05

- Repo: Claude-Setup (Router-CLAUDE.md, `.claude/settings.json` mit Privacy-Defaults und Klaviyo-ask-Permissions), MIT-LICENSE, `{{LIBRARY_LINK}}`-Platzhalter in SETUP durch Bring-your-own-Figma-Weg ersetzt

## 2026-07-04

- Initial Release: System-Regelwerk (MASTER, FIGMA-RECIPES, ONBOARDING, BRAND-KIT-TEMPLATE), `/email-design`-Skill, Beispiel-Brand, SETUP-Anleitung
