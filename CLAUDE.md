# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Corporate website for **Joveny Models Academy** — a modeling, personal image, and personal development academy in Santiago, Chile. Static single-page site with dark luxury aesthetic (black + gold).

## Tech Stack

- HTML5 / CSS3 / Vanilla JavaScript (no frameworks, no build tools, no npm)
- Google Fonts: Playfair Display (headings), Montserrat (body)
- Deployed via Dokploy (Static build type) from GitHub on push to `master`

## Development

No build step. Open `index.html` directly in a browser:
```bash
start index.html    # Windows
open index.html     # macOS
```

## Architecture

**Single HTML file** (`index.html`) with 10 anchor-linked sections: `#inicio`, `#nosotros`, `#cursos`, `#equipo`, `#sede`, `#clase-zero`, `#testimonios`, `#contacto`, plus course detail modals and footer.

**CSS** (`css/styles.css`) — Single file using CSS custom properties (`:root` variables) for the full design system. Responsive breakpoints at 1024px, 768px, 480px. Includes `prefers-reduced-motion` support.

**JS** (`js/main.js`) — Single IIFE with: sticky header scroll detection, mobile hamburger menu, smooth scroll with offset, active nav highlighting via scroll, Intersection Observer for reveal animations, animated counters, hero parallax + canvas particle system (gold floating particles with glow), course modal system, and contact form UI feedback (no backend).

**Hero effects** — Multiple layered elements: background image, aurora glow (CSS animated blurred orbs), canvas particles (JS), CSS meteor lines, spotlight radial gradient, shimmer text animation on headline.

## Key Design Tokens

All colors/spacing defined in `:root` CSS variables. Primary: `#000000`, Gold: `#D4AF37`, Background: `#0A0A0A`, Section alt: `#111111`.

## Deployment

- **Repo:** `github.com/freddy-ztrata/joveny-models-web`
- **Branch:** `master`
- **Host:** Dokploy on EC2 (Static build type, autodeploy on push)
- Push to `master` triggers automatic deployment

## Content Notes

- All content is in **Spanish**
- Contact: WhatsApp `+56 9 8435 9687`, email `Admision@jovenymodels.com`, Instagram `@jovenymodels_academy`
- 5 courses with full detail modals (includes, curriculum, pricing in CLP)
- Contact form is UI-only (no backend)
- Logo is `assets/logo/joveny-logo.webp` (monogram JEA in gold) — do not replace or regenerate, use the original file
