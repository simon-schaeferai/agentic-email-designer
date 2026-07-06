# Agentic E-Mail Designer · Projektanweisungen

> Schlanke Always-On-Datei (Ziel: unter 150 Zeilen, hartes Limit 300). Diese Datei ist ein **Router**, kein Handbuch: Detailwissen liegt in den verlinkten Dateien. Jede Zeile hier kostet Instruktions-Budget, also nur aufnehmen, was in JEDER Session gelten muss.

## Was das ist

E-Mail-Design-System für Claude Code + Figma: Aus einem freigegebenen Brand-Kit entstehen fertige Marketing-Mail-Designs in Figma samt Exportpaket (8 Slices, Alt-Texte, Subject Lines). Gebaut für die Community, nutzbar für jede Brand.

Einstieg für Menschen: [SETUP.md](SETUP.md) (Schritt für Schritt von Null). Das Regelwerk für Agenten liegt in `System/`, Brand-Daten in `Brands/<brand>/`.

## Struktur

```
System/                        Regelwerk (nicht anfassen):
                               MASTER-EMAIL-SYSTEM · FIGMA-RECIPES · ONBOARDING · BRAND-KIT-TEMPLATE
Brands/<brand>/                ein Ordner pro Brand: BRAND.md + assets/ + HASHES.md + NODES.md + export/
Brands/beispiel-brand/         versioniertes Beispiel (eigene Brands sind gitignored)
.claude/skills/email-design/   das Produktions-Kommando /email-design
README.md · SETUP.md           Community-Doku
```

## Agent-Routing · was willst du tun?

| Ziel | Einstieg | Wissen liegt in |
|---|---|---|
| Mails/Banner designen oder exportieren | Skill `/email-design <brand>` | `System/MASTER-EMAIL-SYSTEM.md` + `System/FIGMA-RECIPES.md` + `Brands/<brand>/BRAND.md` |
| Neue Brand anlegen | Skill `/email-design <brand>` (startet Onboarding) | `System/ONBOARDING.md` + `System/BRAND-KIT-TEMPLATE.md` |
| In bestehender Brand weiterbauen | zuerst `Brands/<brand>/NODES.md` + `HASHES.md` lesen | dort: Frame-IDs, Bild-Hashes, offene Punkte |

## Regeln

1. Keine Mail-Produktion ohne vom Nutzer freigegebenes `Brands/<brand>/BRAND.md` (Blocker-Checkliste in ONBOARDING.md).
2. Nichts erfinden: Fakten, Reviews und Trust-Zahlen nur aus dem BRAND.md mit Quelle. Fehlt etwas, „Mir fehlt: …" melden statt Platzhalter einzubauen.
3. QA-Pflicht nach jedem Build (MASTER §10): exportieren, croppen, ansehen, nie ungesehen liefern.
4. Nach jedem Build/Upload sofort `HASHES.md`/`NODES.md` der Brand aktualisieren (Wiederanlauf-Fähigkeit).
5. `System/` nur ändern, wenn der Nutzer es ausdrücklich verlangt; es ist das Regelwerk für alle.
6. Exporte nach `Brands/<brand>/export/`, Temporäres ins Scratchpad, nie ins Projekt-Root.
7. Deutsche Umlaute immer korrekt (ä, ö, ü, ß), niemals ae/oe/ue als Ersatz.

## Caveats

- Shopify-Produktbilder von Brands haben oft eingebrannte Text-Overlays (Stats, Badges, Headlines): jedes Bild vor Verwendung sichten; Erkenntnisse je Brand in deren `HASHES.md` notieren.

## Diese Datei pflegen

Diese Datei ist ein lebendes Dokument. **Ergänzen**, wenn ein Fehler zum zweiten Mal passiert oder eine neue Konvention gilt. **Kürzen**, wenn das Budget reißt: Bereichs-Wissen in eine Rule (`.claude/rules/<bereich>.md` mit `paths:`-Frontmatter), Tiefen-Wissen in eine verlinkte Datei. Richtwert unter 150 Zeilen, hart unter 300.
