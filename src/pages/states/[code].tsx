import { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import { localBusinessSchema } from '../../utils/schema';
import { stateMetadata, type StateCodeSlug } from '../../utils/stateMetadata';
import Button from '../../components/Button';
import { getStateVisual } from '../../utils/stateVisuals';

// Normalize incoming code param to lowercase slug
function normalizeSlug(param?: string): StateCodeSlug | null {
  if (!param) return null;
  const slug = param.trim().toLowerCase() as StateCodeSlug;
  return (stateMetadata as Record<string, unknown>)[slug] ? slug : null;
}

function HeroVisual({ codeUC, stateName }: { codeUC: string; stateName: string }) {
  const cfg = getStateVisual(codeUC, stateName);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-2xl ring-1 ring-black/5 min-h-[200px] sm:min-h-[240px] md:min-h-[320px]"
    >
      {cfg.image ? (
        <>
          <img
            src={cfg.image}
            alt={cfg.alt || `Health coverage options in ${stateName}`}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className={`absolute inset-0 ${cfg.overlay ?? 'bg-black/20'}`} aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
            <div className="inline-flex rounded-lg bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 ring-1 ring-black/5">
              {stateName}
            </div>
          </div>
        </>
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center bg-gradient-to-r ${cfg.placeholder?.gradient ?? 'from-sky-400 to-emerald-500'}`}
          aria-label={`Coverage in ${stateName}`}
        >
          <span className="text-white/95 text-lg sm:text-xl md:text-2xl font-semibold drop-shadow">
            {cfg.placeholder?.label ?? stateName}
          </span>
        </div>
      )}
    </motion.div>
  );
}

function CTASection({
  codeUC,
  stateName,
}: {
  codeUC: string;
  stateName: string;
}) {
  const cfg = getStateVisual(codeUC, stateName);
  const headline =
    cfg.cta.headline || `Looking for private health coverage in ${stateName}? Speak with a licensed advisor now.`;
  const subcopy =
    cfg.cta.subcopy || `Compare options tailored to ${stateName} residents and get guidance from licensed advisors.`;
  const primaryLabel = cfg.cta.primaryLabel || 'Schedule';
  const secondaryLabel = cfg.cta.secondaryLabel || 'Call Now';
  const phone = (cfg.cta.phone || '').split(' ').join('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-black/5"
      aria-label={`Get help with coverage in ${stateName}`}
    >
      <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">{headline}</h3>
      <p className="mt-2 text-slate-600">{subcopy}</p>

      <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row">
        <Button as="a" href="/contact#schedule" variant="primary" size="lg" aria-label={`Schedule in ${stateName}`}>
          {primaryLabel}
        </Button>
        <Button
          as="a"
          href={phone ? `tel:${phone}` : '/contact'}
          variant="outline"
          size="lg"
          aria-label={`Call an advisor for ${stateName}`}
        >
          {secondaryLabel}
        </Button>
      </div>
    </motion.div>
  );
}

export default function StateDynamicPage() {
  const params = useParams();
  const raw = params.code ?? '';
  const slug = normalizeSlug(raw);

  if (!slug) {
    return <Navigate to="/not-found" replace />;
  }

  const entry = stateMetadata[slug];
  const codeUC = slug.toUpperCase();

  const seo = useMemo(() => {
    const title = entry.seo?.title ?? `Private Health Insurance in ${entry.name}`;
    const description =
      entry.seo?.description ??
      `Explore medically underwritten plans available now in ${entry.name}. Compare options and schedule a free consultation.`;
    const path = `/states/${slug}`;
    const keywords =
      entry.seo?.keywords ??
      `private health insurance, ${entry.name}, medically underwritten plans, PPO, affordable coverage`;
    return { title, description, path, keywords };
  }, [entry, slug]);

  return (
    <main id="content" className="has-sticky-cta">
      <SEO
        title={seo.title}
        path={seo.path}
        description={seo.description}
        meta={[
          { name: 'keywords', content: seo.keywords },
          { property: 'og:title', content: seo.title },
          { property: 'og:description', content: seo.description },
        ]}
        scripts={[{ innerHTML: localBusinessSchema(codeUC as 'FL' | 'MI' | 'NC') }]}
      />

      <section className="section">
        <div className="container-default">
          <h1 className="h1 mb-4">{seo.title}</h1>
          <p className="lead mb-6">
            Explore medically underwritten plans available now in {entry.name}. Our licensed agents provide personalized
            guidance to help you find the right coverage and control your healthcare costs.
          </p>

          {/* Hero visual */}
          <HeroVisual codeUC={codeUC} stateName={entry.name} />

          {/* CTA section */}
          <div className="mt-8">
            <CTASection codeUC={codeUC} stateName={entry.name} />
          </div>

          {/* Availability indicator */}
          <div className="mt-6 text-sm text-slate-600 dark:text-slate-300">
            {entry.available ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Available now in {entry.name}
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                Availability may be limited — contact us to confirm options in {entry.name}.
              </span>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}