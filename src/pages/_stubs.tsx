import type { ReactNode } from 'react';
import SEO from '../components/SEO';

export function makePage(title: string, path: string, body?: ReactNode) {
  return function Page() {
    return (
      <main id="content" className="has-sticky-cta">
        <SEO title={title} path={path} />
        <section className="section">
          <div className="container-default">
            <h1 className="h1 mb-4">{title}</h1>
            <p className="lead mb-8">
              This is a scaffolded page for {title}. Content and components will be implemented next.
            </p>
            {body ?? (
              <div className="prose">
                <p>Coming soon: tailored content, CTAs, animations, and SEO schema.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    );
  };
}