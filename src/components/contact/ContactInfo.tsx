import * as React from "react";
import { COMPANY } from "../../config/company";

export default function ContactInfo() {
  return (
    <div className="rounded-2xl ring-1 ring-slate-200/70 bg-white p-4 md:p-5">
      <div className="grid gap-2 text-sm">
        <div>
          <span className="font-medium">Phone:</span>{" "}
          <a href={COMPANY.phoneHref} className="underline underline-offset-4">{COMPANY.phoneDisplay}</a>
        </div>
        <div>
          <span className="font-medium">Email:</span>{" "}
          <a href={COMPANY.emailHref} className="underline underline-offset-4">{COMPANY.email}</a>
        </div>
        <div>
          <span className="font-medium">Hours:</span> {COMPANY.hours}
        </div>
        <div className="text-slate-500">Licensed Insurance Agent • {COMPANY.npnLabel}: {COMPANY.npn}</div>
      </div>
      <div className="mt-3 text-slate-500 text-xs">BBB Accredited • Licensed Agent</div>
    </div>
  );
}