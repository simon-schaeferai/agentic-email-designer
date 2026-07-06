# Beitragen

Dieses System wird besser, wenn Produktions-Learnings zurückfließen. So geht's:

## Learnings einreichen

Der wertvollste Beitrag ist ein **belegtes Learning** aus echter Produktion: ein Figma-Rezept, eine Recherche-Technik, eine Falle. Format (als Issue oder Pull Request):

1. **Learning:** Was funktioniert / was scheitert (eine konkrete Handlungsanweisung, keine Prosa).
2. **Beleg:** In welcher Situation ist es aufgetreten (Screenshot, Fehlermeldung, Ergebnis).
3. **Zielort:** Wo es hingehört — `System/FIGMA-RECIPES.md` (Technik), `System/ONBOARDING.md` (Recherche), `System/MASTER-EMAIL-SYSTEM.md` (Design-Regel) oder `SETUP.md` (Einrichtung/Troubleshooting).

Regeln: Bestehende Abschnitte per add/replace verbessern statt anhängen. Jede System-Änderung bekommt eine Zeile in `CHANGELOG.md`. Keine Brand-Daten, keine Kundennamen, keine Screenshots mit fremden Produkten einreichen.

## Eigene Brands bleiben privat

`Brands/*` ist bis auf das Beispiel gitignored — deine Brand-Kits, Bilder und Registries verlassen deinen Rechner nie. Dadurch gilt:

- **Updates holen ist gefahrlos:** `git pull` aktualisiert nur System, Skill und Doku; deine `Brands/<deine-brand>/`-Ordner bleiben unberührt.
- Was sich geändert hat, steht in [CHANGELOG.md](CHANGELOG.md).
- Committe nie eigene Brand-Ordner, auch nicht „kurz zum Testen" — Git-History ist für immer.

## Alles andere

Tippfehler, tote Links, Unklarheiten in SETUP: gern direkt als kleiner PR. Größere Struktur-Ideen bitte erst als Issue skizzieren.
