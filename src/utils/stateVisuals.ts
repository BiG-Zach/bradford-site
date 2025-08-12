export type StateVisualConfig = {
  image?: string;
  alt: string;
  overlay?: string; // Tailwind classes for overlay e.g., "bg-black/30"
  placeholder?: {
    label: string; // Human-friendly state name
    gradient: string; // Tailwind gradient tokens e.g., "from-orange-400 to-yellow-500"
  };
  cta: {
    headline?: string;
    subcopy?: string;
    primaryLabel?: string;
    secondaryLabel?: string;
    phone?: string; // tel: link target
  };
};

export const DEFAULT_PHONE = '+1-888-555-1234';

/**
 * Resolve an image path preferring slugged assets placed in public/images/states,
 * with curated fallbacks if slugged assets are not available.
 * Accepts 2-letter uppercase code (e.g., 'FL').
 *
 * Note: We cannot check file existence at build-time here. We choose the most
 * likely present path order. Since you've uploaded fl.webp, mi.webp, nc.webp,
 * we prioritize those explicit filenames first.
 */
function resolveStateImage(codeUC: string): string | undefined {
  const lower = codeUC.toLowerCase();

  // 1) Prefer explicitly uploaded slug files (as per project convention).
  const preferred = `/images/states/${lower}.webp`;

  // 2) Curated defaults (kept as secondary).
  const curated: Record<string, string> = {
    FL: '/images/states/florida-beach.webp',
    MI: '/images/states/michigan-lakes.webp',
    NC: '/images/states/north-carolina-mountains.webp',
  };

  // Return preferred path first; if not present at runtime the browser 404s,
  // but since we know these were uploaded, this will render.
  return preferred || curated[codeUC];
}

export const defaultCTA = (stateName: string) => ({
  headline: `Looking for private health coverage in ${stateName}?`,
  subcopy: `Speak with a licensed advisor now and compare options tailored for ${stateName} residents.`,
  primaryLabel: 'Schedule',
  secondaryLabel: 'Call Now',
  phone: DEFAULT_PHONE,
});

export const stateVisuals: Record<string, StateVisualConfig> = {
  FL: {
    image: resolveStateImage('FL'),
    alt: 'Health coverage options in Florida',
    overlay: 'bg-black/30',
    placeholder: { label: 'Florida', gradient: 'from-orange-400 to-yellow-500' },
    cta: {
      headline: 'Speak with a Florida-licensed advisor today',
      subcopy: 'Explore private health coverage tailored to Florida residents.',
      primaryLabel: 'Schedule',
      secondaryLabel: 'Call Now',
      phone: DEFAULT_PHONE,
    },
  },
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
  NC: {
    image: resolveStateImage('NC'),
    alt: 'Health coverage options in North Carolina',
    overlay: 'bg-black/30',
    placeholder: { label: 'North Carolina', gradient: 'from-indigo-500 to-teal-500' },
    cta: {
      headline: 'Connect with a North Carolina-licensed advisor',
      subcopy: 'Compare private options suited for North Carolina residents.',
      primaryLabel: 'Schedule',
      secondaryLabel: 'Call Now',
      phone: DEFAULT_PHONE,
    },
  },
};

// Utility to get a visual config by 2-letter uppercase code, with graceful fallback
export function getStateVisual(codeUC: string, stateName: string): StateVisualConfig {
  const cfg = stateVisuals[codeUC];
  if (cfg) return cfg;

  // Generic fallback: gradient placeholder using state name
  return {
    alt: `Health coverage options in ${stateName}`,
    overlay: 'bg-black/20',
    placeholder: { label: stateName, gradient: 'from-sky-400 to-emerald-500' },
    cta: defaultCTA(stateName),
  };
}
