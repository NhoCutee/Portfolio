---
target: src/app/page.tsx
total_score: 20
max_score: 36
na_heuristics: 10
p0_count: 1
p1_count: 1
target_identity: "file:D:\\Portfolio\\src\\app\\page.tsx"
target_fingerprint: 'sha256:337e369c0c324def234f27870191796a87e915b2b7fb5eb18e231773e487bdbe'
target_path: "D:\\Portfolio\\src\\app\\page.tsx"
timestamp: 2026-09-23T07-22-05Z
slug: src-app-page-tsx
---

#### Design Health Score

| #         | Heuristic                       |   Score   | Key Issue                                                                                                                                  |
| --------- | ------------------------------- | :-------: | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 1         | Visibility of System Status     |    3/4    | Spotify status works well, but all 3 experience cards pulse green "Working" simultaneously                                                 |
| 2         | Match System / Real World       |    2/4    | Globe icon labeled "View Website" links to GitHub code repo; secret page exposed in Command Palette                                        |
| 3         | User Control and Freedom        |    2/4    | No controls to pause or dismiss motion-heavy novelties (Oneko cat, power glitch); no "Expand All" for experience                           |
| 4         | Consistency and Standards       |    2/4    | ClashDisplay used only on 2 isolated elements; section padding shifts arbitrarily (`py-12` vs `py-6`); CTA button is an unsemantic `<div>` |
| 5         | Error Prevention                |    2/4    | Hero bio skill pills look like tags but redirect visitors off-site to third-party docs                                                     |
| 6         | Recognition Rather Than Recall  |    2/4    | Tech icons in ProjectCard and About have no visible text labels on mobile touchscreens                                                     |
| 7         | Flexibility and Efficiency      |    3/4    | Command Palette (`Ctrl+K` & `/`) provides exceptional navigation efficiency for power users                                                |
| 8         | Aesthetic and Minimalist Design |    1/4    | Severe visual clutter: googly eyes, power glitch, cat sprite, and uncurated 23-icon dump compete with engineering credentials              |
| 9         | Error Recovery                  |    3/4    | GitHub activity calendar handles fetch failure gracefully with dashed fallback container                                                   |
| 10        | Help and Documentation          |    n/a    | Not applicable: personal portfolio does not require end-user documentation                                                                 |
| **Total** |                                 | **20/36** | **Acceptable (55.5% — Significant improvements needed)**                                                                                   |

#### Design Specificity Verdict

**Verdict:** _Category-interchangeable frontend gimmick sampler with suppressed backend authority._

- **LLM Assessment:** The portfolio currently suffers from an acute identity tension. Nguyen Huy’s positioning in `PRODUCT.md` is clear: **“A Backend & System-focused Engineer with strong Full Stack execution (Spring Boot, PostgreSQL, scalable SaaS, real-time collaboration).”** Yet the homepage front-loads every trendy frontend gimmick (glitching avatar, matrix scrambling text, liquid metal button with cursor-tracking googly eyes, running 8-bit cat) while his actual engineering achievements at **VNPT Media** (Spring Boot microservices, RabbitMQ message queues, gRPC, Redis) are **collapsed and hidden inside an accordion** behind a tiny chevron.
- **Deterministic Scan:** 3 findings detected:
  - `side-tab` (slop warning): Thick colored accent border `border-l-4` in `src/components/blog/BlogComponents.tsx:184` and `src/components/projects/ProjectComponents.tsx:374`.
  - `bounce-easing` (slop warning): Elastic easing `cubic-bezier(0.34, 1.56, 0.64, 1)` in `src/components/common/KonamiCode.tsx:238`.

#### Overall Impression

The portfolio has an atmospheric, high-craft visual foundation (smooth 3D GLSL noise shader, fluid view-transitions, snappy Command Palette), but it severely misrepresents the engineer. It presents as a junior frontend code-sampler instead of the mature, backend-first systems engineer described in `PRODUCT.md`.

#### What's Working

1. **WebGL Simplex Noise Shader:** Fractional Brownian Motion running smoothly at capped 30 FPS provides a world-class, tactile visual texture across dark and light themes without draining GPU resources.
2. **Dynamic View-Transitions Engine:** Radial circular clip-path transition anchored dynamically to click coordinates gives a seamless, perfectly balanced theme-switch experience.
3. **Desktop-Grade Command Palette:** Fast, responsive `Ctrl+K` modal with capture-phase event listening and deep keyboard shortcuts.

#### Priority Issues

- **[P0] Accessibility & Conversion Failure: Non-Semantic Contact CTA**
  - **Why it matters:** The primary meeting trigger in `CTA.tsx` is an unadorned `<div>` with `onClick`. Keyboard and assistive technology users cannot focus, activate, or book a call.
  - **Fix:** Replace with semantic `<Button>` or add `role="button" tabIndex={0}` and Enter/Space keyboard handlers.
  - **Suggested command:** `$impeccable harden`

- **[P1] Brand Positioning Crisis: Gimmick Surcharge vs. Suppressed Substance**
  - **Why it matters:** Blinking googly eyes in the Resume button, infinite avatar glitching, and a domestic cat photo in About overshadow real distributed systems achievements at VNPT Media. Technical recruiters evaluate within 15–30 seconds and miss his backend depth.
  - **Fix:** Remove googly eyes and infinite glitch from career CTAs; expand VNPT Media achievements by default; replace the cat photo in About with a professional headshot, workstation, or system architecture diagram.
  - **Suggested command:** `$impeccable quieter`

- **[P2] Navigation Friction: Off-Site Bio Traps & Broken Project Links**
  - **Why it matters:** Skill pills in the Hero bio bounce visitors off-site to `spring.io`. Project cards display a globe icon ("View Website") that dumps users into GitHub code repos instead of live demos.
  - **Fix:** Make bio skill pills non-navigating badges or project filters; split project card actions into a GitHub code icon and a live demo globe icon.
  - **Suggested command:** `$impeccable clarify`

- **[P3] Typographic Incoherence & Light Mode Theming Bugs**
  - **Why it matters:** ClashDisplay is only applied to 2 headings via inline styles, while section headings use default Hanken Grotesk. GitHub activity calendar hardcodes `colorScheme="dark"`, breaking in light mode. `border-l-4` side-tabs trigger AI-template slop warnings.
  - **Fix:** Apply a unified `.font-clash-display` utility across section headings; pass resolved theme to GitHub calendar; replace `border-l-4` side-tabs with subtle card borders.
  - **Suggested command:** `$impeccable typeset`

#### Persona Red Flags

- **Alex (Senior Engineering Manager / Tech Recruiter):** `[RED FLAG]` Critical backend architectural bullets (Spring Boot, RabbitMQ, gRPC) are collapsed inside accordions by default. `[RED FLAG]` Googly eyes on the primary resume button undermine enterprise credibility.
- **Jordan (Staff Backend Engineer / Open Source Collaborator):** `[RED FLAG]` Bio skill pills hijack navigation by sending visitors off-site to third-party docs. `[RED FLAG]` Globe icon labeled "View Website" links to GitHub code instead of live deployments.
- **Sam (Keyboard & Assistive Technology User):** `[RED FLAG]` Main contact CTA button is completely inaccessible via keyboard (`div` without `role="button"` or `tabIndex`). `[RED FLAG]` Screen readers announce corrupted characters during MatrixText scrambles without `aria-label` protection.

#### Minor Observations

- `ProjectCard` forces a cramped `16 / 5.5` aspect ratio, severely cropping UI dashboard screenshots.
- The "About" section duplicates Huy's name and bio sentence already stated in the Hero sidebar.
- In `HeroCTAButtons.tsx`, `<Button>` wraps an `<a>` tag, causing invalid nested interactive elements.
- `Quote.tsx` references nonexistent Tailwind utility classes (`dark:border-dark-white-50`).

#### Questions to Consider

1. _If an Engineering VP lands on your portfolio with 20 seconds to decide whether to interview you for a distributed systems backend role, does a resume button with animated googly eyes convey the engineering maturity they need?_
2. _Why are your deepest backend architectural triumphs (RabbitMQ, gRPC, PostgreSQL, Redis) hidden behind collapsed accordions, while a 240px cat photo and 23 unlabelled icons are given prime visual space?_
3. _What if the primary project cards featured interactive architecture diagrams (API flow, queue workers, database schema) rather than static frontend cropped thumbnails?_
