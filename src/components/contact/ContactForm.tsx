import * as React from "react";

export default function ContactForm() {
  return (
    <form className="grid md:grid-cols-2 gap-3 md:gap-4" action="/contact" method="POST">
      <div className="grid gap-1">
        <label htmlFor="name" className="text-sm font-medium">Full name</label>
        <input id="name" name="name" required className="rounded-xl ring-1 ring-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" />
      </div>
      <div className="grid gap-1">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input id="email" type="email" name="email" required className="rounded-xl ring-1 ring-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" />
      </div>
      <div className="grid gap-1">
        <label htmlFor="phone" className="text-sm font-medium">Phone</label>
        <input id="phone" name="phone" className="rounded-xl ring-1 ring-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" />
      </div>
      <div className="grid gap-1">
        <label htmlFor="state" className="text-sm font-medium">State</label>
        <input id="state" name="state" className="rounded-xl ring-1 ring-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" />
      </div>
      <div className="md:col-span-2 grid gap-1">
        <label htmlFor="message" className="text-sm font-medium">How can we help?</label>
        <textarea id="message" name="message" rows={4} className="rounded-xl ring-1 ring-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60" />
      </div>
      <div className="md:col-span-2">
        <button
          type="submit"
          data-gtm="contact-submit"
          className="w-full md:w-auto rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium shadow-lg hover:bg-emerald-500 active:scale-[.99] transition"
        >
          Send Message
        </button>
      </div>
      <p className="md:col-span-2 text-slate-500 text-sm">Secure form • We never sell your data</p>
    </form>
  );
}