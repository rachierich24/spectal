"use client";

import EnergyWaves from "./EnergyWaves";
import ConstellationGalaxy from "./ConstellationGalaxy";
import LegacyPortals from "./LegacyPortals";
import VIPMode from "./VIPMode";

export default function SpectalExperience() {
  return (
    <>
      <VIPMode />
      
      {/* Section 3: Energy Waves */}
      <EnergyWaves />
      
      {/* Section 4: Constellation Galaxy */}
      <ConstellationGalaxy />
      
      {/* Section 5: Legacy Portals */}
      <LegacyPortals />
    </>
  );
}
