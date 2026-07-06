# BRAND-KIT — {{BRAND_NAME}}

> Kopie dieser Datei nach `Brands/<deine-brand>/BRAND.md`. Claude füllt sie im Onboarding aus — DU prüfst und gibst frei.
> Diese Datei ist die EINZIGE Quelle für alle Brand-Parameter im MASTER-EMAIL-SYSTEM.
> Status: ☐ Entwurf (recherchiert + verifiziert) ☐ Geprüft ☐ **Von mir freigegeben am: ____**

---

## 1. Identity

### Logo
| | |
|---|---|
| Wortmarke/Logo-Datei | `assets/logo.svg` (Vektor Pflicht) |
| Figma-Klon-Node | `<node-id>` (in Brand-Datei anlegen, Kopfzeile jeder Mail) |
| Darstellung hell/dunkel | z. B. weiß auf Fotos, Ink auf hellen Flächen |

### Farben
| Token | Hex | RGB (0–1) | Einsatz |
|---|---|---|---|
| `COLOR_INK` | # | | dunkelster Ton: CTAs, Headlines auf hell, Dark-Bands |
| `ACCENT_1` | # | | Standard-Akzent (Punchline-Wort, Preise) |
| `ACCENT_2` | # | | Zweit-Akzent (z. B. Urgency/Sale) |
| `ACCENT_3` | # | | optional (z. B. Trust/Erfolg — Sterne, Häkchen) |
| `BG_LIGHT` | # | | helle Section-Hintergründe |
| `BG_TINT` | # | | Karten/Banner-Ton (Creme-Äquivalent) |

**Gradient-Paletten** (je Mail-Typ eine, für Hero-Verläufe): z. B. Urgency = dunkelrot→Ink, Fresh = mint→weiß …
1. `<name>`: `<hex> → <hex>`
2. …

### Typografie
| Rolle | Font | Schnitte | Verfügbarkeit |
|---|---|---|---|
| `FONT_DISPLAY` | | Black/ExtraBold + Italic | ☐ Google Font ☐ Lizenz-Datei erhalten ☐ in Figma installiert |
| `FONT_BODY` | | SemiBold, Medium | |

- `LETTER_SPACING`: ____ % (pro Font neu kalibrieren! Test: Punchline in 200 px setzen — Wortbild muss kompakt, aber nicht verklebt sein)
- Fallback, falls Brand-Font in Figma fehlt: `<Fallback-Font aus derselben Klasse>` — von mir freigegeben: ☐

## 2. Voice

- **Tonalität in 3 Adjektiven:** z. B. direkt, trocken-humorvoll, ehrlich
- **Anrede:** ☐ Du ☐ Sie
- **Sprache:** z. B. Deutsch
- **So klingen wir (5 echte Beispielsätze aus deiner Website/deinen Ads/Mails):**
  1. …
- **So klingen wir NIE:**
  1. …
- **Tabu-Wörter/-Claims:** …
- **Emojis:** ☐ nie ☐ sparsam (max. 1) ☐ frei

## 3. Produkte

Pro Produktlinie ein Block:

### Produkt: `<Name>`
| | |
|---|---|
| URL | |
| Preis(e) | |
| Kern-USPs (max. 6, belegbar) | mit Quelle (Produktseite/FAQ) |
| Feature-Fakten (für Sections) | z. B. Maße, Material, Laufzeiten, Kompatibilitäten — mit Quelle |
| Bild-Ordner | `assets/<produkt>/` |

**Aktueller Anlass/Kampagne:** z. B. Drop/Launch/Sale mit Datum + Quelle (Website-Countdown, Announcement) — der naheliegendste Mail-Aufhänger. Falls keiner: Zeile streichen.

## 4. Trust-Fakten (`TRUST_FACTS`) — NUR Belegbares

| Fakt | Beleg/Quelle |
|---|---|
| z. B. „160.000+ Kunden" | Shop-Statistik, von dir belegt |
| Bewertungs-Score | Trustpilot/Judge.me/Amazon-Link |
| Rückgabe-/Versandversprechen | AGB/Shop-Policy |
| Garantien | Produktseite |

## 5. Pain Points (`PAIN_POINTS`)

Je Produkt 5–8, mit Quelle:
| # | Pain Point | Quelle (Produktseite/Review/Ad) |
|---|---|---|
| 1 | | |

## 6. Social Proof (`REVIEWS`)

Nur echte, wörtliche Reviews (Kürzen ok, Umschreiben nein):
| Name | Zitat | Quelle | Produkt |
|---|---|---|---|
| | | | |

## 7. CTA-Pool (`CTA_POOL`)

15–20 brandkonforme CTAs (kurz, imperativ, zur Voice passend):
1. …

## 8. Assets

- Bild-Inventar: `assets/` — je Motiv-Typ (Hero-Szene / Produkt frei / Hand / Detail / Varianten) nach Spez. in MASTER-EMAIL-SYSTEM §9
- Cutout-Registry: [HASHES.md](HASHES.md) — Hash · Motiv · Seitenverhältnis
- Node-Registry: [NODES.md](NODES.md) — Mail-Frame-IDs, Logo-Node

## 9. Ops

| | |
|---|---|
| Figma-Datei (Edit-Zugang!) | `<fileKey>` |
| ESP | Klaviyo-Konto: ____ · MCP verbunden: ☐ |
| Freigabe | du selbst — Mails erst exportieren, wenn du sie abgenickt hast |
| No-Gos / Legal | z. B. keine Heilversprechen, Bildrechte-Einschränkungen, Wettbewerber-Nennungen — plus No-Go-Empfehlungen aus der Recherche (z. B. kritische Review-Lage auf einer Plattform, nicht belegbare Claims) |
