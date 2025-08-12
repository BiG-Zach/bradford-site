import { BRAND } from "../lib/brand";
import { useState } from "react";

export default function ContactPage() {
  const [channel,setChannel] = useState<"text"|"email"|"call">("text");

  return (
    <main className="container mx-auto px-4 py-10 md:py-12">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">Contact</h1>
        <p className="mt-2 text-sm">{BRAND.name} • NPN {BRAND.npn} • {BRAND.hours}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <a href={BRAND.phoneTel} className="btn-secondary" data-gtm={`${BRAND.gtm.call}_contact_top`}>{BRAND.phoneHuman}</a>
          <a href={`mailto:${BRAND.email}`} className="btn-secondary">{BRAND.email}</a>
        </div>
      </header>

      <section className="glass p-4">
        <div className="flex items-center gap-2 mb-3">
          <button onClick={()=>setChannel("text")}  className={`btn-secondary ${channel==="text"?"ring-2 ring-brand-sky-600":""}`}>Text me</button>
          <button onClick={()=>setChannel("email")} className={`btn-secondary ${channel==="email"?"ring-2 ring-brand-sky-600":""}`}>Email me</button>
          <button onClick={()=>setChannel("call")}  className={`btn-secondary ${channel==="call"?"ring-2 ring-brand-sky-600":""}`}>Call me</button>
          <a href="https://calendly.com/bradfordinformedguidance" target="_blank" rel="noreferrer" className="ml-auto btn-secondary">Schedule</a>
        </div>

        <form className="grid sm:grid-cols-2 gap-3" onSubmit={(e)=>{e.preventDefault(); alert("Thanks! We'll be in touch shortly.");}}>
          <label className="flex flex-col gap-1"><span className="text-sm">Name</span><input className="rounded-xl border px-3 py-2 focus:ring-2 focus:ring-brand-sky-500" required/></label>
          <label className="flex flex-col gap-1"><span className="text-sm">ZIP</span><input className="rounded-xl border px-3 py-2 focus:ring-2 focus:ring-brand-sky-500" required/></label>
          <label className="flex flex-col gap-1"><span className="text-sm">Email</span><input type="email" className="rounded-xl border px-3 py-2 focus:ring-2 focus:ring-brand-sky-500" required={channel!=="call"}/></label>
          <label className="flex flex-col gap-1"><span className="text-sm">Phone</span><input className="rounded-xl border px-3 py-2 focus:ring-2 focus:ring-brand-sky-500" required/></label>
          <label className="flex flex-col gap-1 sm:col-span-2"><span className="text-sm">Message</span><textarea rows={4} className="rounded-xl border px-3 py-2 focus:ring-2 focus:ring-brand-sky-500" placeholder="Doctors you want to keep, budget goals, etc." /></label>
          <button className="btn-primary sm:col-span-2" data-gtm="cta_contact_submit">Send</button>
          <p className="text-xs text-ink-1/70 sm:col-span-2">By contacting us you agree we may reach you by call, text, or email. No spam. Opt out anytime.</p>
        </form>
      </section>

      <div className="mt-6">
        <iframe
          title="Office map: 4200 W Cypress St, Tampa, FL 33607"
          loading="lazy"
          className="w-full h-64 rounded-2xl border"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=4200%20W%20Cypress%20St,%20Tampa,%20FL%2033607&output=embed"
        />
      </div>
    </main>
  );
}