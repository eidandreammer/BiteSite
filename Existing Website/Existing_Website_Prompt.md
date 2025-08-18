Master Rebuild & Enhancement Prompt (Restaurant/SBM Websites)

Goal:
Recreate the look-and-feel and information architecture of an existing website while improving aesthetics, performance, accessibility, mobile UX, animations/micro-interactions, and conversion—matching or exceeding the polish found on bun-buddies.com. Do not copy proprietary content/images; create original assets and copy when needed.

Input:

Target site URL to analyze: <<PASTE EXISTING SITE URL>>

Business type & niche: <<e.g., Restaurant – Taiwanese buns>>

Ordering provider / links (if any): <<Toast/Square/ChowNow URL(s)>>

Gift card link (if any): <<URL>>

Address, phone, email: <<text>>

Hours of operation: <<text>>

Social links: <<IG/TikTok/FB handles>>

Logo & brand assets (if provided): <<files/links>>

Color/typography preferences (optional): <<hex values / font prefs>>

1) Crawl & UI Inventory (Analyze the target site)

Produce a concise audit with screenshots that includes:

Site map & navigation: pages, header/footer links, CTAs, external links (order, gift cards, reservations).

Hero section: image/video usage, overlay text, CTAs.

Typography: families, sizes, weights; propose equal/better web-safe or Google Fonts substitutes if unknown.

Color palette: extract hex values; propose brand tokens.

Components: galleries, menus, promos/CTA bands, social embeds, maps, contact forms, hours tables.

Content tone: headline/tagline style, section copy length.

Pain points: performance, accessibility, mobile layout issues, confusing flows, missing trust signals.

Deliverable: “UI Inventory” doc with screenshots and a prioritized enhancement list.

2) Design System & Theme Tokens

Create a small, reusable theme with:

CSS variables (or Tailwind config) for colors, typography scale, spacing, radii, elevation, motion durations/easing.

Type scale using clamp() for responsive headings/body; line length ~65–75ch.

WCAG AA contrast verified for text and controls; dark mode optional but supported by tokens.

Output: A theme.json (or Tailwind theme) and a short style guide page.

3) Core Layout & Components (inspired by Bun Buddies polish)

Rebuild the site as a modern one-pager or multipage, including:

Header & Nav

Sticky header, 48px+ touch targets, focus-visible states.

Drawer menu on mobile with inert background & focus trap.

Prominent primary CTA (e.g., “Order Now”).

Hero

Full-bleed imagery with subtle, GPU-accelerated motion (scale/pan) and prefers-reduced-motion support.

Clear headline + subhead + primary CTA; optional secondary CTA.

Promo/CTA Band

Eye-catching band (e.g., “Order Directly for Best Prices”) with button.

About/Story Block

Two-column layout that stacks gracefully on mobile (copy + photography/logo).

Image Gallery

Responsive grid, lazy-loaded images, enforced aspect-ratios to avoid CLS; optional lightbox.

Contact / Hours / Map

Address, tel/email links, hours table, directions link or embedded map.

Footer

Copyright, social, terms/privacy links; optional platform/agency credit.

Micro-interactions & Animations

Buttons: hover/focus/active states; 150–220 ms transitions with cubic-bezier(.2,.8,.2,1).

Tap feedback on mobile (subtle scale/elevation); accessible focus rings.

Content reveal (intersection-observer) for sections; disable via prefers-reduced-motion.

Code Snippets to Include

Accessible drawer nav (ARIA, focus-lock, ESC to close).

Reusable .btn class with transform/opacity transitions (no layout-thrashing properties).

4) Performance & Accessibility Requirements

Lighthouse targets (Mobile): Performance ≥ 90, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

LCP ≤ 2.5s on a mid-range mobile; CLS ≤ 0.05; TBT minimal.

Image optimization: responsive srcset, modern formats (AVIF/WebP), width hints, lazy-loading.

Font loading: preconnect/preload as appropriate; system-font fallback.

Semantics: landmarks (header/nav/main/footer), labeled controls, descriptive alt text, skip links.

5) SEO, Local, and Analytics

Metadata: title/description per page, OG/Twitter cards with social preview images.

Local SEO: schema.org/Restaurant JSON-LD (name, address, phone, hours, menu/ordering links).

Event tracking: “Order Now”, “Gift Card”, “Call”, “Get Directions”, “Instagram Click”.

XML sitemap, robots.txt, canonical tags.

6) CMS/Content Editing (optional but preferred)

Light CMS (Notion, Headless CMS, or simple JSON) to manage hours, promos, hero, gallery, and CTAs without code.

Image presets/crops to maintain the warm, high-key aesthetic.

7) Legal & Brand Safety

Do not copy images, videos, or trademarked text from the target site. Instead, recreate the concept with original copy and royalty-free/licensed images (or our in-house photography).

Document all asset sources and licenses.

8) Delivery & Hand-Off

Tech stack: Next.js + Tailwind (or Astro + vanilla CSS) with file-based routing.

Repo with README (install, run, deploy).

Environment-ready deploy (Vercel/Netlify) with analytics configured.

Editable theme.json, content JSON, and CMS hooks.

Figma (or lightweight design file) of the final layout and components.

1-page Brand/Usage guide (colors, type, components, motion).

9) QA Checklist (must pass before delivery)

Cross-device test: iOS Safari (current-1), Android Chrome (current-1), Chrome/Edge/Safari desktop.

Keyboard-only navigation, visible focus, ESC closes drawers.

All links/CTAs functional; 404 page present.

Structured data validated (Rich Results test).

Core Web Vitals good in lab metrics.

Acceptance Criteria

Visual parity with the target site’s structure and vibe, with equal or better aesthetics.

Mobile UX, button reactivity, animations, and formatting on par with or better than bun-buddies.com.

Performance, accessibility, and SEO metrics meet or exceed the thresholds above.

Clean, documented code; easy theming for future clients.

No copyrighted assets copied from the target site.

Final Output:

Live preview URL + repo link.

UI Inventory doc, Style Guide, Brand/Usage guide PDF.

Lighthouse/Axe reports (screenshots or JSON).

Short Loom (or written) walkthrough of editing content.

Now run this prompt using the target site: <<http://www.lareinadelsabor.net/>>
If any input is missing, make reasonable assumptions and proceed, flagging what you assumed in a short “Assumptions” section.