import * as React from "react";
import Section from "../layout/Section";
import Magnetic from "../ui/Magnetic";

export default function AboutCTA() {
  return (
    <Section className="relative">
      <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-sky-600 text-white px-6 py-8 md:px-10 md:py-10 shadow-xl ring-1 ring-white/10">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 md:items-center">
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
            Let's Make Your Insurance Work for You.
          </h3>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Magnetic>
              <a
                href="/quote"
                data-gtm="about-cta-quote"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-emerald-700 font-medium shadow-lg hover:shadow-xl transition active:scale-[.99]"
              >
                Get a Free Quote
              </a>
            </Magnetic>
            <Magnetic strength={10}>
              <a
                href="/contact"
                data-gtm="about-cta-schedule"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium ring-1 ring-white/40 text-white hover:bg-white/10 transition active:scale-[.99]"
              >
                Schedule Consultation
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </Section>
  );
}