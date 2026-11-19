# Design Direction

Each concept gets its own identity, drawn from the materials, vernacular and customers of its sector. Shared code stays invisible: only accessibility, spacing logic and the concept-disclosure banner are common. Palette, type, layout and signature interaction are unique to each site.

All typefaces are self-hosted via Fontsource (OFL-licensed, `latin-ext` subset for Turkish characters). Every color pair used for text is checked for WCAG 2.2 AA contrast during QA.

Shared baseline (every site): visible focus rings in the site's own accent, `prefers-reduced-motion` respected, minimum 44×44 px touch targets, body text at 16 px or larger, line length under ~75 characters.

---

## 1. Közde Ocakbaşı (restaurant)

**Idea:** İznik tile meets charcoal fire. The tile pattern is the brand's architecture, not decoration. It frames the hero, divides menu categories and edges the footer, like the tiled walls of a traditional ocakbaşı.

| Token | Hex | Role |
|---|---|---|
| `--tile` | `#F4F6F8` | Background (cool glazed white, not cream) |
| `--cobalt` | `#1B3A8C` | Primary: headings, tile lines, buttons |
| `--iznik-red` | `#B3261E` | Accent: prices, active tab |
| `--turquoise` | `#1F8783` | Secondary tile color |
| `--ink` | `#0E1B33` | Body text |

**Type:** Alfa Slab One for display (heavy slab, like painted shop signage); Figtree for body.
**Layout:** Hero splits into a large photo of the grill and a hand-built SVG tile panel holding the name. The menu page is set like a printed wall menu, with dish names, dotted leaders and prices, organized by tabbed categories.
**Signature:** the SVG İznik tile system, built once and reused structurally.
**Motion:** none on load. Tab changes switch instantly.

## 2. Mavera Diş (dental clinic)

**Idea:** Calm, not clinical. It avoids the hospital-blue cliché in favor of sage and pine, which lowers the anxiety many patients feel about dentists.

| Token | Hex | Role |
|---|---|---|
| `--porcelain` | `#FBFCFB` | Background |
| `--sage` | `#E3EDE7` | Section fields |
| `--pine` | `#123A2E` | Primary text and buttons |
| `--butter` | `#EFCB5E` | Accent: highlights, selected slots |
| `--slate` | `#46554F` | Secondary text |

**Type:** Albert Sans (one family; friendly geometric forms with clear weights).
**Layout:** The hero opens with a question rather than a slogan: "Sizi buraya ne getirdi?" ("What brings you here?"). Visitors pick a concern, such as a toothache or a bleeding gum, and see the matching treatments.
**Signature:** a concern-led treatment finder and a two-step appointment request (pick a day and a time slot, then enter contact details).
**Motion:** the slot picker animates its selection state only.

## 3. Kıyı Gayrimenkul (coastal real estate)

**Idea:** Aegean whitewash, deep sea and bougainvillea. Architecture is the subject, so listings lead with a generated floor-plan drawing alongside the photo, which is the information buyers actually compare.

| Token | Hex | Role |
|---|---|---|
| `--white` | `#FFFFFF` | Background |
| `--stone` | `#ECEAE6` | Fields, image frames |
| `--deep` | `#0D3B4F` | Primary text and UI |
| `--sea` | `#2C7DA0` | Links, filter states |
| `--bougainvillea` | `#B8326A` | Accent: price, "yeni" tag |

**Type:** Archivo, variable width: expanded for headings, condensed for listing data (m², room count, price).
**Layout:** The listing index puts a sticky filter rail on desktop and a filter sheet on mobile beside a grid that changes per listing, with no identical card grids. Detail pages pair a gallery with a data sheet.
**Signature:** a live filter (type, rooms, district, price range) with a useful empty state, plus procedural SVG floor plans per listing.
**Motion:** results reflow without animation; the filter count updates live.

## 4. Arslan & Ekinci Hukuk (law firm)

**Idea:** Restraint and precision. The section sign (§) and article-style numbering ("Madde 1") come from the material lawyers actually work with, and they number practice areas the way a statute does. Copy is informational only, per bar advertising rules.

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#F7F7F5` | Background (cool off-white) |
| `--graphite` | `#23262B` | Body text |
| `--oxblood` | `#5A1A24` | Primary: headings, buttons |
| `--brass` | `#A88449` | Hairline accents, § marks (decorative only, never body text) |
| `--mist` | `#E4E5E7` | Dividers, fields |

**Type:** Libre Caslon Display for headings, Hanken Grotesk for body. The pairing is clearly two families: one traditional, one functional.
**Layout:** Asymmetric. A narrow left column holds § numbers and a wide right column holds text. A large § glyph anchors the hero.
**Signature:** the "Süreç" page, a real stepped sequence of how a consultation works (numbering is justified here), and a pre-consultation request form with a KVKK disclosure.
**Motion:** practice-area accordions open and close; nothing else moves.

## 5. Defne Güzellik Stüdyosu (beauty salon)

**Idea:** Laurel and skin tones: botanical and calm rather than glossy pink. The name (defne means laurel) guides the palette.

| Token | Hex | Role |
|---|---|---|
| `--milk` | `#FFFCF8` | Background |
| `--peach` | `#F6E3D6` | Fields |
| `--laurel` | `#2F3A26` | Primary text and buttons |
| `--sage` | `#8C9A7B` | Secondary, decorative lines |
| `--rose` | `#A8395A` | Accent: selected services, totals |

**Type:** Bodoni Moda for display (fashion-editorial contrast), Jost for body.
**Layout:** Editorial. Tall portrait crops, staggered images and a price list set like a printed salon card.
**Signature:** a service basket. Visitors pick services, see the total duration and sample price update live, then request an appointment.
**Motion:** the basket total updates with a short number transition; reduced motion turns it off.

## 6. Temel Yapı İnşaat (construction)

**Idea:** The construction site itself: blueprint grid, concrete grey and safety yellow used the way real site signage uses it, sparingly and for important things only.

| Token | Hex | Role |
|---|---|---|
| `--concrete` | `#DAD9D5` | Fields |
| `--white` | `#FFFFFF` | Background |
| `--steel` | `#1F3550` | Primary text and UI |
| `--rebar` | `#1A1C1E` | Footer, dark sections |
| `--safety` | `#F2B800` | Accent: CTAs and status badges, on dark or with dark text only |

**Type:** Big Shoulders Display for headings (industrial, condensed), Archivo for body.
**Layout:** Blueprint-grid hero with dimension lines around the headline. The project index can be filtered by status (completed / ongoing). Each project page shows a phase timeline.
**Signature:** a project phase timeline (zemin etüdü → kaba inşaat → ince işler → teslim), a sequence where numbering is legitimate, plus the status filter.
**Motion:** none beyond state changes.

## Hub: portfolio index

**Idea:** Get out of the way of the work. Typographic index rows (sector and concept name), each with a real screenshot. On desktop the screenshot appears on hover or focus; on mobile it shows inline.

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#FFFFFF` | Background |
| `--text` | `#15171A` | Text |
| `--muted` | `#5D636B` | Secondary text |
| `--line` | `#D9DCE0` | Row dividers |
| `--focus` | `#0B5FFF` | Focus and link color |

**Type:** Instrument Sans.

---

## Review against generic defaults

| Risk | Decision |
|---|---|
| Same template six times | Every site has its own palette, typeface pairing, grid concept and signature interaction. |
| Cream + terracotta serif | Not used. The restaurant uses cool tile white and cobalt; the salon uses laurel and rose. |
| SaaS card grids, uniform radius and shadows | Radius and shadow are set per site; the law and construction sites use none. |
| Caps eyebrow labels, `→` buttons, middle-dot meta strings | Not used. Buttons say exactly what they do. |
| Numbered markers as decoration | Used only for real sequences (law-firm process, construction phases) and statute-style § numbering. |
| Scattered fade-in animations | None. Motion appears only in response to user actions. |
