import React, { useState } from 'react';

export default function HeroForm() {
  const [firstName, setFirst] = useState('');
  const [lastName, setLast] = useState('');
  const [zipCode, setZip] = useState('');
  const [ages, setAges] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!firstName || !lastName || !zipCode || !email || !phone) {
      setError('First, Last, ZIP, Email, and Phone are required.');
      return;
    }
    if (!consent) { setError('Please agree to the consent to continue.'); return; }
    setLoading(true);
    try {
      const utm = Object.fromEntries(new URLSearchParams(window.location.search));
      const consentText =
        'By submitting, you agree Bradford Informed Guidance may call and text you at the number provided (including via autodialer). Consent is not a condition of purchase. Message/data rates may apply.';
      const body = {
        firstName, lastName, zipCode, ages, email, phone,
        consentChecked: true, consentText,
        landingUrl: window.location.href, utm
      };
      const resp = await fetch('/api/lead', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!resp.ok) {
        const j = await resp.json().catch(() => ({}));
        throw new Error(j?.detail || 'Submission failed. Please call (689) 325-6570.');
      }
      setOk(true);
    } catch (err: any) { setError(err.message || 'Something went wrong. Please call (689) 325-6570.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-white/20">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">Premium Health & Life Coverage</h1>
        <p className="text-emerald-600 font-semibold text-lg">Clear. Fast. Year-Round.</p>
        <div className="text-sm text-gray-600 mt-2">Licensed FL • MI • NC • Expanding Nationwide</div>
      </div>
      <form onSubmit={onSubmit} id="mobileQuoteForm" className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">First name</label>
            <input value={firstName} onChange={e => setFirst(e.target.value)}
                  className="w-full p-4 border-2 rounded-xl text-base focus:border-emerald-500" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Last name</label>
            <input value={lastName} onChange={e => setLast(e.target.value)}
                  className="w-full p-4 border-2 rounded-xl text-base focus:border-emerald-500" required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">ZIP Code</label>
          <input value={zipCode} onChange={e => setZip(e.target.value.replace(/\D/g, '').slice(0,5))}
                inputMode="numeric" className="w-full p-4 border-2 rounded-xl text-base focus:border-emerald-500" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Ages (comma-separated)</label>
          <input value={ages} onChange={e => setAges(e.target.value)}
                className="w-full p-4 border-2 rounded-xl text-base focus:border-emerald-500" placeholder="39, 37, 12" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full p-4 border-2 rounded-xl text-base focus:border-emerald-500" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                className="w-full p-4 border-2 rounded-xl text-base focus:border-emerald-500" required />
        </div>
        <div className="flex items-start space-x-3">
          <input id="consent" type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)}
                className="mt-1 h-5 w-5" />
          <label htmlFor="consent" className="text-sm text-gray-600">
            By submitting, you agree Bradford Informed Guidance may call and text you at the number provided (including via autodialer).
            Consent is not a condition of purchase. Message/data rates may apply.
          </label>
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {ok ? (
          <div className="text-emerald-600 font-semibold">Thanks! We’ll send your options within 45–90 minutes.</div>
        ) : (
          <button disabled={loading} type="submit"
                  className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg">
            {loading ? 'Processing…' : 'Get My Custom Quote'}
          </button>
        )}
        <a href="tel:+16893256570" className="block w-full bg-gray-800 text-white mt-3 py-4 rounded-xl text-center font-bold text-lg">
          Call Now — (689) 325-6570
        </a>
        <div className="text-xs text-gray-500 mt-3 text-center">⚡ First options in 45–90 minutes • Mon–Sun 8AM–8PM EST</div>
      </form>
    </div>
  );
}
