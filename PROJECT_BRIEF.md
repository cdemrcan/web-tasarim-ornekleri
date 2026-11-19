# Project Brief: Bionluk Portfolio Samples

## Classification

**Personal portfolio project.** These are concept websites for fictional businesses. They exist to show prospective Bionluk clients the quality, range and process I can deliver. An intentional MVP scope is allowed, but visual design, code quality, responsiveness, accessibility and security must still be at client level. Every limitation is documented, never hidden.

## Objective

Give prospective clients live, clickable proof that I can design and build:

- a site with a distinct visual identity for each industry, not one reskinned template;
- real interactions (filters, booking flows, menus), not screenshots;
- correct, natural Turkish copy;
- responsive, accessible, fast pages.

The samples are linked from my Bionluk gig and profile through a single portfolio hub page.

## Audience

1. **Primary:** Turkish small-business owners browsing Bionluk who need a website: restaurant owners, clinic managers, real estate agents, lawyers, salon owners, contractors. They judge mostly by look, credibility and how it feels on their phone.
2. **Secondary:** the end visitors each concept site is designed for, such as diners and patients. Designing for them convincingly is what persuades the primary audience.

## Language

Turkish throughout, written natively rather than translated. The hub page is in Turkish too.

## Scope

### First MVP: artist portfolio for John Remy (real person)

This is the first site to be built and reviewed. Unlike the concept sites, it represents a **real artist**, so only real content goes on it: Can's own artworks, titles, bio and contact details. Nothing is invented; anything missing stays a clearly marked placeholder until Can provides it.

- **Art direction:** the red and black palette taken from Can's artwork, with exact values sampled from the uploaded images. (This is the client's explicit direction and overrides the generic-defaults caution in DESIGN_DIRECTION.md.)
- **Source material:** artwork files in `artwork/` (inspiration and the gallery content).
- **Forms:** honest demo behavior, as for every other site.

### After review: six concept sites

| # | Sector | Concept business (fictional) | Location setting |
|---|--------|------------------------------|------------------|
| 1 | Restaurant | Közde Ocakbaşı, a charcoal-grill restaurant | Moda, Kadıköy / İstanbul |
| 2 | Dental clinic | Mavera Ağız ve Diş Sağlığı | Ataşehir / İstanbul |
| 3 | Real estate | Kıyı Gayrimenkul, a coastal property agency | Bodrum / Muğla |
| 4 | Law firm | Arslan & Ekinci Hukuk Bürosu | Çankaya / Ankara |
| 5 | Beauty salon | Defne Güzellik Stüdyosu | Karşıyaka / İzmir |
| 6 | Construction | Temel Yapı İnşaat | Selçuklu / Konya |
Pages per site are listed in `IMPLEMENTATION_PLAN.md`.

### Presentation on Bionluk

Each finished site is shown on Bionluk as screenshots plus its live GitHub Pages link. A hub page is optional, so a set of clean desktop and mobile screenshots per site is a deliverable.

## Content integrity rules for fictional businesses

My working standards forbid inventing business facts. A concept site has no real client, so I apply these rules:

1. **Disclosure on every page.** A persistent, accessible notice states that the site is a concept with a fictional business, and links back to the hub.
2. **No fabricated trust signals.** There are no testimonials, review scores, awards, certificates, years in business, client counts or success statistics anywhere. Where a real client site would have them, the layout shows a clearly marked slot, such as "Müşteri yorumları bu alanda yer alır".
3. **Contact details** are shown as obvious samples: area-level addresses and placeholder phone and email values. They are never `tel:` or `mailto:` links that could reach a real person.
4. **Prices** appear only where the sector makes them structurally necessary (restaurant menu, salon services, property listings). They are labeled as sample prices.
5. **People** (doctors, lawyers, agents) appear with a name and role only, with no invented diplomas, specialties or credentials. Portraits are stock photos and are credited as such.
6. **Stock photos** come from Unsplash under the Unsplash License, with photographers credited. No photo is presented as the business's own premises, staff or customers.
7. **Sector rules.** Turkish law limits lawyers' advertising (Avukatlık Kanunu, Art. 55, and the TBB Meslek Kuralları). The law-firm concept is therefore informational only, with no superlatives, solicitation or claims about results. Health advertising is regulated too, so the clinic concept avoids promises about outcomes.

## Forms

There is no backend, so no form can truly be "sent". To keep forms honest:

- every form has real client-side validation and clear error messages;
- on a valid submission the site does **not** claim success. It shows a summary of the request and states that, in this concept, nothing was sent, and that on a client site the form would go to email, WhatsApp or the client's system.

If you want forms that actually deliver, that needs an external form service and your decision (see the open questions).

## Hosting

Static build deployed to GitHub Pages from a public repository under the `cdemrcan` account. Free hosting, HTTPS, no server.

## Known limitations (deliberate MVP scope)

- No real backend, CMS, payments or booking system.
- Contact data, prices and people are samples.
- Listing and menu data live in local data files, not a database.
