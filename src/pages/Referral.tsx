import SEO from '../components/SEO';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import Button from '../components/Button';

export default function Referral() {
  return (
    <main id="content" className="has-sticky-cta">
      <SEO
        title="Referral"
        path="/referral"
        description="Refer a friend or client. Provide basic details and we’ll reach out to help them compare options."
      />

      <Section bg="gradient">
        <Reveal>
          <h1 className="h1 mb-4">Referral</h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="lead max-w-3xl">
            Use the form below to refer someone who could benefit from our guidance. We’ll follow up promptly.
          </p>
        </Reveal>
      </Section>

      <Section>
        <div className="rounded-lg border border-slate-200 p-6 bg-white">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Your Name</label>
              <input className="mt-1 block w-full rounded-md border-slate-300 focus:ring-sky-500 focus:border-sky-500" placeholder="Jane Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Your Email</label>
              <input type="email" className="mt-1 block w-full rounded-md border-slate-300 focus:ring-sky-500 focus:border-sky-500" placeholder="you@example.com" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Referral Name</label>
              <input className="mt-1 block w-full rounded-md border-slate-300 focus:ring-sky-500 focus:border-sky-500" placeholder="John Smith" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Referral Contact</label>
              <input className="mt-1 block w-full rounded-md border-slate-300 focus:ring-sky-500 focus:border-sky-500" placeholder="email or phone" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Notes</label>
              <textarea rows={4} className="mt-1 block w-full rounded-md border-slate-300 focus:ring-sky-500 focus:border-sky-500" placeholder="Anything we should know?" />
            </div>
          </div>
          <div className="mt-4">
            <Button>Submit Referral</Button>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            By submitting, you confirm you have permission to share these details. We will only use them to follow up about coverage options.
          </p>
        </div>
      </Section>
    </main>
  );
}