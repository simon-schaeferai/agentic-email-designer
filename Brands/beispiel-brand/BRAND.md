# BRAND-KIT — Aurea (BEISPIEL — fiktive Brand)

> Dieses Kit zeigt, wie ein VOLLSTÄNDIG ausgefülltes Brand-Kit aussieht.
> „Aurea" ist ein erfundener Schmuck-Brand — alle Werte sind Beispiele.
> Status: ☑ Entwurf ☑ Geprüft ☑ Von mir freigegeben am: 01.07.2026

---

## 1. Identity

### Logo
| | |
|---|---|
| Wortmarke | „AUREA", Serifenlos, gesperrt (Letter Spacing +8 %) |
| Datei | `assets/logo.svg` (hell + dunkel) |
| Figma-Klon-Node | `12:34` (in der Brand-Figma-Datei) |

### Farben
| Token | Hex | RGB (0–1) | Einsatz |
|---|---|---|---|
| `COLOR_INK` | #14110F | 0.08/0.07/0.06 | CTAs, Dark-Bands, Headlines auf hell |
| `ACCENT_1` | #C9A24B | 0.79/0.64/0.29 | Gold — Punchline-Wörter, Preise, Siegel |
| `ACCENT_2` | #7A3B2E | 0.48/0.23/0.18 | Terrakotta — Urgency/Sale |
| `ACCENT_3` | #2E6B4F | 0.18/0.42/0.31 | Trust — Häkchen, Bewertungssterne |
| `BG_LIGHT` | #FAF6EF | 0.98/0.96/0.94 | helle Sections |
| `BG_TINT` | #F1E8D8 | 0.95/0.91/0.85 | Karten/Banner |

**Gradient-Paletten:** Premium = Ink→Espresso · Sale = Terrakotta→Ink · Fresh = Champagner→Weiß · Gift = Gold→Creme

### Typografie
| Rolle | Font | Schnitte |
|---|---|---|
| `FONT_DISPLAY` | Fraunces (Google Font ✓) | Black, Black Italic |
| `FONT_BODY` | Inter (Google Font ✓) | SemiBold, Medium |

- `LETTER_SPACING`: Display −2 %, Body 0 % (für Fraunces/Inter kalibriert — NICHT blind übernehmen!)
- Fallback: entfällt (Google Fonts)

## 2. Voice

- **Tonalität:** warm, selbstbewusst, reduziert
- **Anrede:** Du · **Sprache:** Deutsch
- **So klingen wir:**
  1. „Schmuck, den du nie wieder abnimmst."
  2. „18 Karat. 0 Kompromisse."
  3. „Wasserfest. Alltagsfest. Für immer."
  4. „Dieses Stück wartet nicht auf besondere Anlässe."
  5. „Ehrlicher Preis. Weil kein Zwischenhändler mitverdient."
- **So klingen wir NIE:** kitschig-romantisch, rabattschreiend, technisch-kalt
- **Tabu:** „billig", Fake-Countdowns, „Luxus für alle"
- **Emojis:** Design-Mails nie; WhatsApp max. 1

## 3. Produkte

### Bold-Hoops (Creolen)
| | |
|---|---|
| URL | aurea-beispiel.de/products/bold-hoops |
| Preis | 79 € |
| Kern-USPs | 18-Karat-Vergoldung auf 925er Silber, wasserfest, anlaufgeschützt, 2 Jahre Garantie |
| Feature-Fakten | 3 Größen, hypoallergen, handpoliert, recyceltes Silber |
| Bild-Ordner | `assets/hoops/` |

### Signature-Kette
| | |
|---|---|
| URL | aurea-beispiel.de/products/signature-kette |
| Preis | 99 € · Bundle mit Hoops 159 € |
| Kern-USPs | verstellbar 40–45 cm, wasserfest, Gravur möglich, Geschenkbox inklusive |
| Bild-Ordner | `assets/kette/` |

## 4. Trust-Fakten

| Fakt | Beleg |
|---|---|
| 40.000+ Kundinnen | Shop-Statistik |
| 4,9/5 · 1.200+ Bewertungen | Judge.me Widget |
| 30 Tage Rückgabe | Shop-Policy |
| 2 Jahre Anlauf-Garantie | Produktseite |
| Klimaneutraler Versand in 2–4 Tagen | Versandseite |

## 5. Pain Points

| # | Pain Point | Produkt | Quelle |
|---|---|---|---|
| 1 | Vergoldung läuft nach Wochen an / färbt ab | alle | Reviews Wettbewerber |
| 2 | Schmuck muss vorm Duschen/Sport abgenommen werden (und geht dabei verloren) | alle | Produktseite |
| 3 | Allergie/juckende Ohren bei Modeschmuck | Hoops | Reviews |
| 4 | Geschenk wirkt beliebig (Gutschein/Blumen) | Kette | Saisonal |
| 5 | Echtgold zu teuer, Modeschmuck zu billig — nichts dazwischen | alle | Ads |
| 6 | „Sieht man den Unterschied zu Echtgold?" (Einwand) | alle | Support |

## 6. Social Proof (fiktive Beispiel-Reviews — bei echter Brand: NUR echte!)

| Name | Zitat | Quelle | Produkt |
|---|---|---|---|
| Sophie K. | „Trage die Hoops seit 4 Monaten täglich, dusche damit, Sport, alles — sehen aus wie am ersten Tag." | Judge.me | Hoops |
| Melina R. | „Endlich Schmuck, bei dem meine Ohren nicht jucken. Nie wieder was anderes." | Judge.me | Hoops |
| Jana T. | „Als Geschenk für meine Schwester — die Box, die Karte, alles fühlt sich hochwertig an. Sie trägt sie jeden Tag." | Judge.me | Kette |

## 7. CTA-Pool

FÜR IMMER TRAGEN · NIE MEHR ABNEHMEN · ZUM LIEBLINGSSTÜCK · GESCHENK LÖSEN · JETZT ANLEGEN · OHREN SCHONEN · GOLD BLEIBT GOLD · SET SICHERN · MEINE GRÖSSE FINDEN · BOX ÖFFNEN · ZUR GRAVUR · ALLTAGSFEST SHOPPEN

## 8. Assets

- `assets/hoops/`, `assets/kette/` — je 3 Hero-Szenen + 2 Freisteller + 1 Hand/Ohr-Interaktion
- Cutout-Registry: `HASHES.md` (entsteht beim ersten Upload)
- Node-Registry: `NODES.md` (entsteht beim ersten Build)

## 9. Ops

| | |
|---|---|
| Figma-Datei | „Aurea-Emails" — `<fileKey>` (Duplikat der Master-Library, Edit ✓) |
| ESP | Klaviyo (optional) |
| Freigabe | ich selbst, jede Mail einzeln im Chat |
| No-Gos | kein „Echtgold"-Claim (ist Vergoldung!), keine Hautkontakt-Heilversprechen, Modell-Fotos nur aus `assets/` (Bildrechte) |
