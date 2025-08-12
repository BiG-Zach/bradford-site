import { useEffect } from 'react';
import { applyHead, canonicalFor, SITE } from '../utils/seo';
import type { SEOConfig } from '../utils/seo';

type SEOProps = Omit<SEOConfig, 'canonical' | 'themeColor' | 'titleTemplate'> & {
  path?: string;
  title?: string;
  template?: string;
  themeColor?: string;
};

export default function SEO({
  title,
  description = SITE.defaultDescription,
  path = '/',
  template = '%s — Bradford Informed Guidance',
  themeColor = SITE.themeColor,
  lang = 'en',
  meta,
  links,
  scripts,
  noindex,
}: SEOProps) {
  useEffect(() => {
    applyHead({
      title,
      titleTemplate: template,
      description,
      canonical: canonicalFor(path),
      lang,
      meta,
      links,
      scripts,
      noindex,
      themeColor,
    });
  }, [title, description, path, template, themeColor, lang, meta, links, scripts, noindex]);

  return null;
}