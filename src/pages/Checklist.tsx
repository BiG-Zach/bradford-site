import SEO from '../components/SEO';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import Button from '../components/Button';

export default function Checklist() {
  return (
    <main id="content" className="has-sticky-cta">
      <SEO
        title="Checklist"
        path="/checklist"
        description="Download our pre-enrollment checklist to prepare for a smooth plan selection process."
      />

      <Section bg="gradient">
        <Reveal>
          <h1 className="h1 mb-4">Pre‑Enrollment Checklist</h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="lead max-w-3xl">
            Get organized before you compare plans. We’ll email you the PDF after you provide your details.
          </p>
        </Reveal>
      </Section>

      <Section>
        <div className="rounded-lg border border-slate-200 p-6 bg-white">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Name</label>
              <input className="mt-1 block w-full rounded-md border-slate-300 focus:ring-sky-500 focus:border-sky-500" placeholder="Jane Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input type="email" className="mt-1 block w-full rounded-md border-slate-300 focus:ring-sky-500 focus:border-sky-500" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Phone</label>
              <input className="mt-1 block w-full rounded-md border-slate-300 focus:ring-sky-500 focus:border-sky-500" placeholder="(555) 555-5555" />
            </div>
            <div className="sm:col-span-2">
              <label className="inline-flex items-start gap-2 text-sm text-slate-700">
                <input type="checkbox" className="mt-1 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                <span>I consent to be contacted about insurance options. Message/data rates may apply.</span>
              </label>
            </div>
          </div>
          <div className="mt-4">
            <Button>Get the Checklist</Button>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            We’ll email your checklist link and may follow up to ensure you received it.
          </p>
        </div>
      </Section>
    </main>
  );
}