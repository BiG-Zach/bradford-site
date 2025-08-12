import { useEffect, useMemo, useState } from 'react';
import SEO from '../../components/SEO';
import Reveal from '../../components/Reveal';
import {
  type QuoteBasics,
  type QuoteHousehold,
  type QuoteContact,
  validateBasics,
  validateHousehold,
  validateContact,
  normalizePhone,
} from '../../utils/validation';

type Step = 0 | 1 | 2 | 3;

type QuoteData = {
  basics: QuoteBasics;
  household: QuoteHousehold;
  contact: QuoteContact;
};

const STORAGE_KEY = 'big-quote-form-v1';

function loadInitial(): QuoteData {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as QuoteData;
  } catch {}
  return {
    basics: { zip: '', state: 'FL', coverageType: 'Health' },
    household: { ages: [], tobacco: false, dependents: 0 },
    contact: { firstName: '', lastName: '', email: '', phone: '', consent: false },
  };
}

function saveState(data: QuoteData) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-sm text-red-600">{msg}</p>;
}

export default function QuotePage() {
  const [step, setStep] = useState<Step>(0);
  const [data, setData] = useState<QuoteData>(() => loadInitial());
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    saveState(data);
  }, [data]);

  const progress = useMemo(
    () => [
      { id: 0, label: 'Basics' },
      { id: 1, label: 'Household' },
      { id: 2, label: 'Contact' },
      { id: 3, label: 'Review' },
    ],
    []
  );

  function next() {
    if (step === 0) {
      const e = validateBasics(data.basics);
      if (Object.keys(e).length) {
        setErrors(Object.fromEntries(Object.entries(e)));
        return;
      }
    }
    if (step === 1) {
      const e = validateHousehold(data.household);
      if (Object.keys(e).length) {
        setErrors(Object.fromEntries(Object.entries(e)));
        return;
      }
    }
    if (step === 2) {
      const e = validateContact(data.contact);
      if (Object.keys(e).length) {
        setErrors(Object.fromEntries(Object.entries(e)));
        return;
      }
    }
    setErrors({});
    setStep((s) => {
      const nxt = Math.min(3, s + 1) as Step;
      return nxt as Step;
    });
  }

  function prev() {
    setStep((s) => {
      const prv = Math.max(0, s - 1) as Step;
      return prv as Step;
    });
  }

  async function submit() {
    // Placeholder submit — replace with API integration
    const payload = {
      ...data,
      contact: {
        ...data.contact,
        phone: normalizePhone(data.contact.phone),
        consentAt: new Date().toISOString(),
      },
      meta: { source: 'web', path: location.pathname },
    };
    console.log('Submitting quote payload', payload);
    // Mock delay
    await new Promise((r) => setTimeout(r, 600));
    location.assign('/thank-you');
  }

  return (
    <main id="content" className="has-sticky-cta">
      <SEO
        title="Get a Quote"
        path="/quote"
        description="Start your personalized quote. Answer a few quick questions and we’ll match options from top carriers."
      />

      <section className="section">
        <div className="container-default">
          <Reveal>
            <h1 className="h1 mb-2">Get a Free Quote</h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="lead mb-8">
              Complete the steps below. We’ll review your details and present clear options that fit your needs.
            </p>
          </Reveal>

          {/* Stepper */}
          <div className="mb-8">
            <ol className="grid grid-cols-4 gap-2 text-sm">
              {progress.map((p, i) => {
                const active = step === i;
                const done = step > i;
                return (
                  <li
                    key={p.id}
                    className={
                      'rounded-lg border px-3 py-2 text-center ' +
                      (active
                        ? 'border-sky-500 bg-sky-50 text-sky-700'
                        : done
                        ? 'border-teal-600 bg-teal-50 text-teal-700'
                        : 'border-slate-200 text-slate-600')
                    }
                  >
                    {p.label}
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Steps */}
          {step === 0 && (
            <Reveal>
              <BasicsStep
                data={data.basics}
                onChange={(b) => setData((d) => ({ ...d, basics: b }))}
                errors={errors}
                onNext={next}
              />
            </Reveal>
          )}

          {step === 1 && (
            <Reveal>
              <HouseholdStep
                data={data.household}
                onChange={(h) => setData((d) => ({ ...d, household: h }))}
                errors={errors}
                onPrev={prev}
                onNext={next}
              />
            </Reveal>
          )}

          {step === 2 && (
            <Reveal>
              <ContactStep
                data={data.contact}
                onChange={(c) => setData((d) => ({ ...d, contact: c }))}
                errors={errors}
                onPrev={prev}
                onNext={next}
              />
            </Reveal>
          )}

          {step === 3 && (
            <Reveal>
              <ReviewStep data={data} onPrev={prev} onSubmit={submit} />
            </Reveal>
          )}
        </div>
      </section>
    </main>
  );
}

function BasicsStep({
  data,
  onChange,
  errors,
  onNext,
}: {
  data: QuoteBasics;
  onChange: (b: QuoteBasics) => void;
  errors: Record<string, string>;
  onNext: () => void;
}) {
  return (
    <form
      className="grid gap-6 max-w-2xl"
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <div>
        <label className="block text-sm font-medium text-slate-700">ZIP Code</label>
        <input
          value={data.zip}
          onChange={(e) => onChange({ ...data, zip: e.target.value })}
          className="mt-1 block w-full rounded-md border-slate-300 focus:border-sky-500 focus:ring-sky-500"
          placeholder="e.g., 33101"
          inputMode="numeric"
          maxLength={5}
          required
        />
        <FieldError msg={errors.zip} />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">State</label>
        <select
          value={data.state}
          onChange={(e) => onChange({ ...data, state: e.target.value as QuoteBasics['state'] })}
          className="mt-1 block w-full rounded-md border-slate-300 focus:border-sky-500 focus:ring-sky-500"
          required
        >
          <option value="FL">Florida</option>
          <option value="MI">Michigan</option>
          <option value="NC">North Carolina</option>
          <option value="OTHER">Other</option>
        </select>
        <FieldError msg={errors.state} />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Coverage Type</label>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {(['Health', 'Life', 'Both'] as QuoteBasics['coverageType'][]).map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => onChange({ ...data, coverageType: opt })}
              className={
                'rounded-lg border px-3 py-2 text-sm ' +
                (data.coverageType === opt
                  ? 'border-sky-600 bg-sky-50 text-sky-700'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50')
              }
            >
              {opt}
            </button>
          ))}
        </div>
        <FieldError msg={errors.coverageType} />
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" className="btn btn-primary">Continue</button>
        <a href="/" className="btn btn-ghost">Cancel</a>
      </div>
    </form>
  );
}

function HouseholdStep({
  data,
  onChange,
  errors,
  onPrev,
  onNext,
}: {
  data: QuoteHousehold;
  onChange: (h: QuoteHousehold) => void;
  errors: Record<string, string>;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [ageInput, setAgeInput] = useState('');

  function addAge() {
    const n = Number(ageInput);
    if (!isNaN(n) && n > 0) {
      onChange({ ...data, ages: [...data.ages, n] });
      setAgeInput('');
    }
  }

  function removeAge(i: number) {
    const copy = [...data.ages];
    copy.splice(i, 1);
    onChange({ ...data, ages: copy });
  }

  return (
    <form
      className="grid gap-6 max-w-2xl"
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <div>
        <label className="block text-sm font-medium text-slate-700">Ages</label>
        <div className="mt-2 flex gap-2">
          <input
            value={ageInput}
            onChange={(e) => setAgeInput(e.target.value)}
            className="block flex-1 rounded-md border-slate-300 focus:border-sky-500 focus:ring-sky-500"
            placeholder="e.g., 38"
            inputMode="numeric"
          />
          <button type="button" onClick={addAge} className="btn btn-accent">Add</button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {data.ages.map((a, i) => (
            <span key={i} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-sm">
              {a}
              <button type="button" className="text-slate-500 hover:text-red-600" onClick={() => removeAge(i)} aria-label="Remove age">
                &times;
              </button>
            </span>
          ))}
        </div>
        <FieldError msg={errors.ages} />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="tobacco"
          type="checkbox"
          checked={data.tobacco}
          onChange={(e) => onChange({ ...data, tobacco: e.target.checked })}
          className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
        />
        <label htmlFor="tobacco" className="text-sm text-slate-700">Tobacco user</label>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Dependents</label>
        <input
          value={data.dependents}
          onChange={(e) => onChange({ ...data, dependents: Math.max(0, Number(e.target.value) || 0) })}
          className="mt-1 block w-full rounded-md border-slate-300 focus:border-sky-500 focus:ring-sky-500"
          inputMode="numeric"
        />
        <FieldError msg={errors.dependents} />
      </div>

      <div className="flex items-center gap-3">
        <button type="button" onClick={onPrev} className="btn btn-ghost">Back</button>
        <button type="submit" className="btn btn-primary">Continue</button>
      </div>
    </form>
  );
}

function ContactStep({
  data,
  onChange,
  errors,
  onPrev,
  onNext,
}: {
  data: QuoteContact;
  onChange: (c: QuoteContact) => void;
  errors: Record<string, string>;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <form
      className="grid gap-6 max-w-2xl"
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">First name</label>
          <input
            value={data.firstName}
            onChange={(e) => onChange({ ...data, firstName: e.target.value })}
            className="mt-1 block w-full rounded-md border-slate-300 focus:border-sky-500 focus:ring-sky-500"
            required
          />
          <FieldError msg={errors.firstName} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Last name</label>
          <input
            value={data.lastName}
            onChange={(e) => onChange({ ...data, lastName: e.target.value })}
            className="mt-1 block w-full rounded-md border-slate-300 focus:border-sky-500 focus:ring-sky-500"
            required
          />
          <FieldError msg={errors.lastName} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            className="mt-1 block w-full rounded-md border-slate-300 focus:border-sky-500 focus:ring-sky-500"
            placeholder="you@example.com"
            required
          />
          <FieldError msg={errors.email} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Phone</label>
          <input
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            className="mt-1 block w-full rounded-md border-slate-300 focus:border-sky-500 focus:ring-sky-500"
            inputMode="tel"
            placeholder="(555) 555-5555"
            required
          />
          <FieldError msg={errors.phone} />
        </div>
      </div>

      <div className="flex items-start gap-2">
        <input
          id="consent"
          type="checkbox"
          checked={data.consent}
          onChange={(e) => onChange({ ...data, consent: e.target.checked })}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
        />
        <label htmlFor="consent" className="text-sm text-slate-700">
          By submitting, you agree to receive calls, texts, or emails from Bradford Informed Guidance about insurance
          options. Consent is not a condition of purchase. Message and data rates may apply.
        </label>
      </div>
      <FieldError msg={errors.consent} />

      <div className="flex items-center gap-3">
        <button type="button" onClick={onPrev} className="btn btn-ghost">Back</button>
        <button type="submit" className="btn btn-primary">Continue</button>
      </div>
    </form>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="text-sm font-medium text-slate-800">{value}</div>
    </div>
  );
}

function ReviewStep({ data, onPrev, onSubmit }: { data: QuoteData; onPrev: () => void; onSubmit: () => void }) {
  const { basics, household, contact } = data;
  return (
    <div className="grid gap-6">
      <div className="rounded-lg border border-slate-200 p-6">
        <h2 className="font-semibold text-lg mb-3">Review Details</h2>
        <div className="divide-y divide-slate-200">
          <Row label="ZIP" value={basics.zip} />
          <Row label="State" value={basics.state} />
          <Row label="Coverage" value={basics.coverageType} />
          <Row label="Ages" value={household.ages.join(', ') || '—'} />
          <Row label="Tobacco" value={household.tobacco ? 'Yes' : 'No'} />
          <Row label="Dependents" value={String(household.dependents)} />
          <Row label="First Name" value={contact.firstName} />
          <Row label="Last Name" value={contact.lastName} />
          <Row label="Email" value={contact.email} />
          <Row label="Phone" value={contact.phone} />
          <Row label="Consent" value={contact.consent ? 'Given' : 'Not given'} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="button" onClick={onPrev} className="btn btn-ghost">Back</button>
        <button type="button" onClick={onSubmit} className="btn btn-primary">Submit</button>
      </div>
    </div>
  );
}