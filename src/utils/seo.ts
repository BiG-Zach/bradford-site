export type MetaTag =
  | { name: string; content: string }
  | { property: string; content: string }
  | { httpEquiv: string; content: string };

export type LinkTag = { rel: string; href: string; as?: string; type?: string; crossOrigin?: string };

export interface SEOConfig {
  title?: string;
  titleTemplate?: string; // e.g., "%s — Bradford Informed Guidance"
  description?: string;
  canonical?: string;
  lang?: string;
  meta?: MetaTag[];
  links?: LinkTag[];
  scripts?: Array<{ type?: string; innerHTML?: string; src?: string; defer?: boolean; async?: boolean }>;
  noindex?: boolean;
  themeColor?: string;
}

export const SITE = {
  name: 'Bradford Informed Guidance',
  url: 'https://www.bradfordinformedguidance.com',
  defaultDescription:
    'Health & life insurance guidance for self-employed, families, and early retirees in FL, MI, and NC. Schedule a free consultation today.',
  themeColor: '#0ea5e9',
  twitter: '@', // update when available
};

export function buildTitle(title?: string, template = '%s — Bradford Informed Guidance') {
  if (!title) return SITE.name;
  return template.replace('%s', title);
}

/**
 * Minimal head manager (client-side). It replaces tags by keys to avoid duplicates.
 * Safe for SPA use. On SSR you would render static tags in index.html instead.
 */
export function applyHead(config: SEOConfig) {
  if (typeof document === 'undefined') return;
  const d = document;
  const head = d.head;

  // Title
  if (config.title || config.titleTemplate) {
    d.title = buildTitle(config.title, config.titleTemplate);
  }

  // Lang
  if (config.lang) {
    d.documentElement.lang = config.lang;
  }

  // Theme color
  ensureMeta({ name: 'theme-color', content: config.themeColor || SITE.themeColor });

  // Robots
  if (config.noindex) {
    ensureMeta({ name: 'robots', content: 'noindex, nofollow' });
  } else {
    removeMetaByName('robots');
  }

  // Description
  if (config.description) ensureMeta({ name: 'description', content: config.description });

  // Canonical
  if (config.canonical) ensureLink({ rel: 'canonical', href: config.canonical });

  // Default social tags
  ensureMeta({ property: 'og:site_name', content: SITE.name });
  ensureMeta({ property: 'og:type', content: 'website' });
  ensureMeta({ property: 'og:url', content: config.canonical || SITE.url });
  if (config.title) ensureMeta({ property: 'og:title', content: buildTitle(config.title, config.titleTemplate) });
  if (config.description) ensureMeta({ property: 'og:description', content: config.description });
  ensureMeta({ name: 'twitter:card', content: 'summary_large_image' });
  if (config.title) ensureMeta({ name: 'twitter:title', content: buildTitle(config.title, config.titleTemplate) });
  if (config.description) ensureMeta({ name: 'twitter:description', content: config.description });

  // Custom meta
  config.meta?.forEach(ensureMeta);

  // Links
  config.links?.forEach(ensureLink);

  // Scripts (inline or external)
  config.scripts?.forEach((s) => {
    if (s.src) {
      const key = `script[src="${s.src}"]`;
      let el = head.querySelector<HTMLScriptElement>(key);
      if (!el) {
        el = d.createElement('script');
        el.src = s.src;
        if (s.defer) el.defer = true;
        if (s.async) el.async = true;
        if (s.type) el.type = s.type;
        head.appendChild(el);
      }
    } else if (s.innerHTML) {
      // keyed by content hash surrogate
      const key = `script[data-managed="true"][data-hash="${hash(s.innerHTML)}"]`;
      let el = head.querySelector<HTMLScriptElement>(key);
      if (!el) {
        el = d.createElement('script');
        el.type = s.type || 'application/ld+json';
        el.dataset.managed = 'true';
        el.dataset.hash = String(hash(s.innerHTML));
        el.innerHTML = s.innerHTML;
        head.appendChild(el);
      } else {
        el.innerHTML = s.innerHTML;
      }
    }
  });
}

function ensureMeta(def: MetaTag) {
  const head = document.head;
  let selector = '';
  if ('name' in def) selector = `meta[name="${def.name}"]`;
  if ('property' in def) selector = `meta[property="${def.property}"]`;
  if ('httpEquiv' in def) selector = `meta[http-equiv="${def.httpEquiv}"]`;
  let el = head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    if ('name' in def) el.setAttribute('name', def.name);
    if ('property' in def) el.setAttribute('property', def.property);
    if ('httpEquiv' in def) el.setAttribute('http-equiv', def.httpEquiv);
    head.appendChild(el);
  }
  el.setAttribute('content', def.content);
}

function removeMetaByName(name: string) {
  const el = document.head.querySelector(`meta[name="${name}"]`);
  if (el) el.remove();
}

function ensureLink(def: LinkTag) {
  const head = document.head;
  const selector = `link[rel="${def.rel}"]${def.rel === 'canonical' && def.href ? `[href="${def.href}"]` : ''}`;
  let el = head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.rel = def.rel;
    head.appendChild(el);
  }
  if (def.href) el.href = def.href;
  if (def.as) el.as = def.as;
  if (def.type) el.type = def.type;
  if (def.crossOrigin) el.crossOrigin = def.crossOrigin;
}

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return h;
}

export function canonicalFor(pathname: string) {
  const base = SITE.url.replace(/\/$/, '');
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${base}${path}`;
}