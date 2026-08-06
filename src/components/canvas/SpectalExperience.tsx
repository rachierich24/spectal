"use client";

import ConstellationGalaxy from "./ConstellationGalaxy";
import LegacyPortals from "./LegacyPortals";
import VIPMode from "./VIPMode";

export default function SpectalExperience() {
  return (
    <>
      <VIPMode />
      
      {/* Section: Constellation Galaxy */}
      <ConstellationGalaxy />
      
      {/* Section: Legacy Portals */}
      <LegacyPortals />
    </>
  );
}

