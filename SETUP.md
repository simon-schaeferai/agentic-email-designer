# SETUP — Von Null zu fertigen E-Mail-Designs für DEINE Brand

Diese Anleitung führt dich Schritt für Schritt durch das komplette Setup. Am Ende hast du:

- ✅ Ein **Brand-Kit** für deine Brand (Farben, Fonts, Voice, Fakten — einmalig, dann immer wiederverwendbar)
- ✅ **Fertige E-Mail-Designs in deinem Figma** — so viele du willst, in deinem Look
- ✅ Pro Mail: **8 Bild-Slices (2x JPEG) + Alt-Texte + Subject Lines** — bereit für Klaviyo & Co.

Du musst nicht designen und nicht programmieren können. Claude macht die Arbeit — du lieferst deine Brand-Infos und gibst frei.

> **Wichtig — das „Fehlt etwas?"-Prinzip:** Claude ist so eingestellt, dass es dir **sofort sagt, wenn ihm etwas fehlt** (Bilder, Logo, Font, Fakten, Reviews, Inspo), statt Lücken mit Erfundenem zu füllen. Wenn Claude „Mir fehlt: …" schreibt: einfach liefern, was dort steht — dann geht's weiter. Was typischerweise fehlt, siehst du in [Kapitel 12](#12-wenn-claude-sagt-mir-fehlt-etwas).

---

## 0. Was du brauchst (Checkliste vor dem Start)

| # | Was | Details |
|---|---|---|
| 1 | **Claude-Abo** | Pro oder Max (claude.ai) — Claude Code ist enthalten |
| 2 | **Figma-Account** | kostenloser Account reicht — figma.com |
| 3 | **Deine Produktbilder** | pro Produkt: **3 Stimmungs-/Szenenfotos (hochkant, mind. 1080×1920 px)** + **2 Produktfotos auf ruhigem Hintergrund** + **1 Foto mit Hand/Produkt in Benutzung**. Je größer, desto besser. |
| 4 | **Dein Logo** | als SVG oder AI (Vektor). Notfalls PNG in hoher Auflösung |
| 5 | **Deine Fakten** | Kundenzahl, Bewertungs-Score, Versand-/Rückgabe-Versprechen — nur was du belegen kannst |
| 6 | **~2–3 Stunden** | fürs einmalige Setup + erste Mails |

---

## 1. Claude Code installieren

**Aktion:** Lade Claude Code herunter und installiere es: **https://claude.com/claude-code** (Mac/Windows, auch als Terminal-Version). Melde dich mit deinem Claude-Account an.

**✓ Check:** Du kannst Claude Code öffnen und siehst ein Eingabefeld.

## 2. Dieses Repo holen

**Aktion — Weg A (einfach):** Öffne `https://github.com/simon-schaeferai/agentic-email-designer.git` im Browser → grüner Button **„Code" → „Download ZIP"** → ZIP entpacken → Ordner an einen Ort legen, den du wiederfindest (z. B. Dokumente).

**Aktion — Weg B (mit git):**
```
git clone https://github.com/simon-schaeferai/agentic-email-designer.git
```

**✓ Check:** Du hast einen Ordner `email-design-system` mit `SETUP.md`, `System/` und `Brands/` darin.

## 3. Claude Code in diesem Ordner starten

**Aktion:** Öffne Claude Code **im Ordner `email-design-system`** (Desktop-App: „Open Folder…" → den Ordner wählen · Terminal: `cd` in den Ordner, dann `claude`).

**✓ Check:** Schreib Claude: *„Was steht in SETUP.md Kapitel 0?"* — Claude fasst die Checkliste zusammen. Wenn ja: Claude sieht deine Dateien, alles richtig.

> Der Ordner bringt ein fertiges Kommando mit: `/email-design`. Es funktioniert nur, wenn Claude Code in DIESEM Ordner gestartet wurde.

## 4. Figma verbinden

**Aktion:** Verbinde die Figma-Integration in Claude Code (Einstellungen → Connectors/MCP → **Figma** → mit deinem Figma-Account einloggen und Zugriff erlauben).

**✓ Check:** Schreib Claude: *„Prüfe per Figma-whoami, mit welchem Account ich verbunden bin."* — Claude nennt deinen Figma-Namen.

> ⚠️ Die Verbindung braucht **Bearbeiten-Rechte** auf die Dateien, mit denen Claude arbeitet. Eigene Dateien in deinem Account sind automatisch okay.

## 5. Design-Bibliothek in dein Figma holen

Die **EMAIL-SYSTEM-LIBRARY** enthält alle Master-Vorlagen: 4 Headline-Stile, 9 Übergänge, 23 fertige Section-Typen (neutral in Graustufen — deine Farben kommen später automatisch drauf).

**Aktion:** Öffne `{{LIBRARY_LINK}}` → oben **„Duplicate"/„Duplizieren"** klicken → die Kopie liegt jetzt in deinen Figma-Drafts.

**✓ Check:** In deinem Figma existiert eine Datei „EMAIL-SYSTEM-LIBRARY".

> Link geht nicht? Sag Claude: *„Baue mir die Master-Library nach System/MASTER-EMAIL-SYSTEM.md §4 in einer neuen Figma-Datei auf."* — dauert länger, gleiches Ergebnis.

## 6. Dein Brand-Onboarding starten

Jetzt lernt Claude deine Brand kennen. Einmalig, danach immer wiederverwendbar.

**Aktion:** Schreib in Claude Code:
```
/email-design meine-brand
```
(ersetze `meine-brand` durch deinen Brand-Namen, klein, ohne Leerzeichen — z. B. `aurea`)

Claude wird dann:
1. **Deine Website, Produktseiten, Reviews und Ads recherchieren** — gib Claude dafür deine Shop-URL
2. Dir eine **Liefer-Liste** stellen (Logo, Font, Farben, Bilder, Fakten — siehe Checkliste Kapitel 0)
3. Daraus dein **Brand-Kit** bauen: `Brands/meine-brand/BRAND.md`

**Deine Bilder übergibst du so:** Lege sie in den Ordner `Brands/meine-brand/assets/` (Claude sagt dir, wenn welche fehlen oder zu klein sind) — oder zieh sie direkt in den Chat.

**✓ Check:** Es existiert `Brands/meine-brand/BRAND.md` und Claude hat dir gesagt, was noch `⚠️ FEHLT` (oder dass nichts fehlt).

## 7. Brand-Kit prüfen und freigeben

Das Brand-Kit ist die Grundlage für ALLE Mails — 5 Minuten Kontrolle lohnen sich.

**Aktion:** Öffne `Brands/meine-brand/BRAND.md` und prüfe: Stimmen die Farben? Klingt „So klingen wir" wirklich nach dir? Sind alle Fakten korrekt und belegbar? Korrekturen einfach Claude sagen (*„Ändere Accent 1 auf #E63946"*). Dann:
```
Das Brand-Kit ist freigegeben.
```

**✓ Check:** Im BRAND.md steht kein `⚠️ FEHLT` mehr (oder nur bei Dingen, die du bewusst weglässt — z. B. keine Reviews, weil Pre-Launch).

> ⚠️ Claude baut absichtlich **keine Mails ohne freigegebenes Brand-Kit** — das schützt dich vor 10 Mails im falschen Look.

## 8. Mails bauen lassen — so viele du willst

**Aktion:** Bestell deine Mails. Beispiele:
```
Baue mir 5 E-Mails: 1× Launch, 1× Social Proof mit Reviews,
1× FAQ/Einwände, 1× Bundle-Angebot, 1× Restock.
```
```
Baue mir eine Black-Friday-Mail für [Produkt] mit Countdown-Feeling.
```
Claude baut jede Mail in deinem Figma (nach dem System: großer Hero, XXL-Headline, abwechslungsreiche Sections — keine zwei Mails sehen gleich aus), prüft sie selbst per Screenshot und zeigt dir das Ergebnis.

**✓ Check:** Du siehst jede Mail als Vorschau im Chat + in deiner Figma-Datei.

## 9. Feedback geben

**Aktion:** Sag konkret, was du ändern willst — pro Mail, mit Ansage was und wo:
- *„Mail 2: Die Headline ist zu brav — provokanter, gern frecher."*
- *„Mail 3: Nimm das andere Produktfoto im Hero und mach den Button-Text zu ‚JETZT SICHERN'."*
- *„Alle Mails: Der Gelbton ist zu grell — nimm #E8B84B."*

**✓ Check:** Claude zeigt dir nach jeder Änderung einen neuen Screenshot.

## 10. Export: Slices, Alt-Texte, Subject Lines

**Aktion:** Pro fertiger Mail:
```
Exportiere Mail 1: 8 gleiche Slices als 2x JPEG, Alt-Texte pro Slice
und 5 Subject-Line-/Preheader-Varianten.
```

**✓ Check:** Du hast 8 JPEGs (nummeriert), eine Alt-Text-Liste und 5 Betreff-Varianten — fertig zum Einbau in dein E-Mail-Tool (Bilder untereinander, Alt-Texte eintragen, fertig).

## 11. Bonus: Direkt nach Klaviyo (optional)

Wenn du Klaviyo nutzt: Verbinde die **Klaviyo-Integration** in Claude Code (wie Figma in Kapitel 4). Dann:
```
Lade die Slices von Mail 1 in Klaviyo hoch und lege ein Template an.
```

## 12. Wenn Claude sagt „Mir fehlt etwas"

Das ist Absicht — besser als erfundene Inhalte. Die häufigsten Meldungen und was du dann tust:

| Claude meldet | Du lieferst |
|---|---|
| „Mir fehlen Hero-Bilder" | 3 hochkant-Fotos ≥1080×1920 px pro Produkt (Szene/Stimmung, Produkt nicht mittig) |
| „Kein Freisteller-taugliches Produktfoto" | Produkt auf ruhigem, gleichmäßigem Hintergrund, ≥1500 px |
| „Keine echten Reviews gefunden" | Wörtliche Kundenzitate mit Namen (Screenshot reicht) — ODER sag „lass Social-Proof-Sections weg" |
| „Trust-Zahl nicht belegbar" | Beleg (Screenshot/Link) — ODER Fakt streichen |
| „Brand-Font nicht in Figma" | Font in Figma installieren/teilen — ODER Claudes Fallback-Vorschlag freigeben |
| „Keine Stil-Inspo" | 3–5 Mails (Screenshots), die dir gefallen — ODER sag „nutz den Library-Katalog als Stil" |
| „Copy-Input fehlt" (z. B. Aktion unklar) | Die Eckdaten: Was ist das Angebot? Bis wann? Warum (ehrliche Begründung)? |
| „Kein Edit-Zugriff auf die Figma-Datei" | Datei aus DEINEM Account verwenden oder Freigabe auf „can edit" stellen |

## 13. Troubleshooting

| Problem | Lösung |
|---|---|
| `/email-design` wird nicht erkannt | Claude Code wurde nicht im Repo-Ordner gestartet → Kapitel 3 |
| Figma-Fehler „no edit access" | Die Verbindung braucht Bearbeiten-Rechte — nutze Dateien aus deinem eigenen Account (Kapitel 4/5) |
| Trustpilot-Recherche schlägt fehl (403) | Normal — mach Screenshots deiner besten Reviews und gib sie Claude |
| Eine Mail sieht kaputt aus (Überlappungen o. ä.) | Sag: *„Mach einen QA-Pass auf Mail X nach System/MASTER-EMAIL-SYSTEM §10 und fixe alle Overlaps."* |
| Claude „vergisst" das System in einer neuen Session | Einfach wieder `/email-design meine-brand` aufrufen — das lädt alles neu |
| Fragen? | Community: `{{COMMUNITY_LINK}}` |

---

**Viel Erfolg! 🚀** Einmal eingerichtet, ist jede weitere Mail nur noch ein Prompt.
