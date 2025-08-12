import { BRAND } from "../../lib/brand";

export default function StickyCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden">
      <div className="mx-3 mb-3 glass-dock flex gap-2 p-2">
        <a href="/lead" data-gtm={`${BRAND.gtm.quote}_sticky`} className="flex-1 btn-primary text-center" aria-label="Get my quote">Get My Quote</a>
        <a href={BRAND.phoneTel} data-gtm={`${BRAND.gtm.call}_sticky`} className="flex-1 btn-secondary text-center" aria-label={`Call ${BRAND.phoneHuman}`}>Call Now</a>
      </div>
    </div>
  );
}