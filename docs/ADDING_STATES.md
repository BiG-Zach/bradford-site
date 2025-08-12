# Adding a new State Page (Metadata, Visuals, SEO, CTAs)

This guide explains how to add or extend support for a new US state using the existing dynamic state system. The system is driven by:
- Metadata (SEO, availability) in src/utils/stateMetadata.ts
- Visuals + CTA config in src/utils/stateVisuals.ts
- A single dynamic route/page at /states/:code implemented in src/pages/states/[code].tsx

Follow the steps below to add a new state or refine existing ones.

## 1) Choose the Route Slug

- Path pattern: /states/:code
- :code is a 2-letter lowercase state code (e.g., "fl", "mi", "nc", …)
- The page normalizes to lowercase and validates against stateMetadata. If a code is not in stateMetadata, we redirect to /not-found.

## 2) Add Metadata (name, availability, SEO)

File: src/utils/stateMetadata.ts

- Ensure the new state is included in the StateCodeSlug union.
- Add an entry in stateMetadata keyed by the lowercase code, e.g.:

```ts
// src/utils/stateMetadata.ts:line
mi: {
  name: 'Michigan',
  available: true, // or omit / set false if limited
  seo: {
    title: 'Private Health Insurance in Michigan',
    description: 'Discover Michigan private health plans...',
    keywords: 'Michigan private health insurance, MI PPO plans, ...'
  },
},
```

Notes:
- Available is optional and toggles the on-page availability indicator.
- SEO fields are optional. If omitted, sensible defaults are used on the page.

## 3) Add Visuals and CTA Configuration

File: src/utils/stateVisuals.ts

- Each state uses a 2-letter UPPERCASE key, e.g. "MI".
- Provide hero alt text, optional overlay, optional placeholder gradient, and CTA labels/copy/phone.

```ts
// src/utils/stateVisuals.ts:line
MI: {
  image: resolveStateImage('MI'),
  alt: 'Health coverage options in Michigan',
  overlay: 'bg-black/30',
  placeholder: { label: 'Michigan', gradient: 'from-blue-500 to-emerald-500' },
  cta: {
    headline: 'Talk to a Michigan-licensed advisor',
    subcopy: 'Find flexible plans for Michigan families and individuals.',
    primaryLabel: 'Schedule',
    secondaryLabel: 'Call Now',
    phone: DEFAULT_PHONE,
  },
},
```

- If an image is not present or not desired, omit image. The page will render a responsive gradient placeholder using the configured placeholder and overlay classes.

### Image resolution logic

- The code currently calls resolveStateImage('FL' | 'MI' | 'NC') to pick an image URL.
- You can place optional images under public/images/states using either slugged assets (fl.webp, mi.webp, nc.webp) or curated ones referenced in stateVisuals.
- If no image is present, the page gracefully falls back to a gradient placeholder with the state label.
- Preferred formats: .webp (smaller) or .png/.jpg as fallback.

Add your asset:
- Place under public/images/states/
- Example filenames: fl.webp, mi.webp, nc.webp
- Then wire in stateVisuals with image: resolveStateImage('XX') or directly image: '/images/states/your-file.webp'

## 4) Verify CTAs

- The dynamic page renders two CTAs:
  - Primary: Schedule (links to /contact#schedule)
  - Secondary: Call Now (tel: link if phone provided; falls back to /contact)
- Labels and copy can be customized per state via stateVisuals.cta fields.
- Ensure the phone number in stateVisuals.cta.phone is in a tel-friendly format (digits and +), the page removes spaces.

## 5) SEO Integration

- The page injects SEO meta via src/components/SEO.tsx and pulls defaults from stateMetadata.
- og:title and og:description use the computed values for the state page.
- JSON-LD local business schema is injected with scripts using localBusinessSchema for FL, MI, and NC. To expand schema to more states, adjust the union in localBusinessSchema signature in src/utils/schema.ts and update the invocation in src/pages/states/[code].tsx accordingly.

## 6) Responsive and Lazy Loading

- The hero visual uses a responsive container with min-heights for sm and md breakpoints.
- The hero image uses loading="lazy" and decoding="async".
- If no image is set, a responsive gradient background with centered label is shown.
- CTAs stack vertically on mobile and align horizontally on larger screens.

## 7) Testing Checklist

- Navigate to /states/:code for your new state.
- Confirm:
  - Title and description render correctly, and the H1 matches the SEO title.
  - If image exists, the hero displays with overlay; otherwise gradient placeholder is shown.
  - Both CTAs are visible:
    - "Schedule" links to /contact#schedule
    - "Call Now" uses tel:PHONE if provided, or /contact if not
  - Availability indicator shows the correct status.
  - The layout remains responsive (mobile to desktop).
  - LCP remains reasonable and image loads lazily.

## 8) Adding More States

- Repeat steps 2 and 3:
  - Add metadata entry to stateMetadata
  - Add visuals/CTA entry to stateVisuals (UPPERCASE key)
  - Add an optional image to public/images/states if desired
- If you need JSON-LD schema for more states, extend the localBusinessSchema function parameter union and usage on the page.

## 9) Example: Add Ohio (OH)

1) Metadata:
```ts
// src/utils/stateMetadata.ts:line
oh: {
  name: 'Ohio',
  available: true,
  seo: {
    title: 'Private Health Insurance in Ohio',
    description: 'Find Ohio private health insurance...'
  },
},
```

2) Visuals:
```ts
// src/utils/stateVisuals.ts:line
OH: {
  image: '/images/states/ohio.webp', // or resolveStateImage('OH')
  alt: 'Health coverage options in Ohio',
  overlay: 'bg-black/30',
  placeholder: { label: 'Ohio', gradient: 'from-sky-500 to-emerald-500' },
  cta: {
    headline: 'Talk to an Ohio-licensed advisor',
    subcopy: 'Explore private options suited for Ohio residents.',
    primaryLabel: 'Schedule',
    secondaryLabel: 'Call Now',
    phone: DEFAULT_PHONE,
  },
},
```

3) Asset (optional):
- Add public/images/states/oh.webp

4) Test /states/oh

## 10) Notes

- The dynamic route and lazy-loading are already configured in src/utils/routes.tsx.
- If you rename or move assets, update the image paths accordingly.
- Keep gradients WCAG-friendly; ensure text remains legible on color backgrounds.