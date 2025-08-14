import React from "react";
import MobileHero from "./MobileHero";
import MobileStickyCTA from "./MobileStickyCTA";

export default function MobileHome() {
  return (
    <main className="relative">
      <MobileHero />
      <MobileStickyCTA />
    </main>
  );
}