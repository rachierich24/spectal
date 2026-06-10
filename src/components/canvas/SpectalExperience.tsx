"use client";

import ArrivalStar from "./ArrivalStar";
import EnergyWaves from "./EnergyWaves";
import ConstellationGalaxy from "./ConstellationGalaxy";
import LegacyPortals from "./LegacyPortals";
import CultureEngine from "./CultureEngine";
import VIPMode from "./VIPMode";

export default function SpectalExperience() {
  return (
    <>
      <VIPMode />
      
      {/* Section 1: Arrival Star */}
      <ArrivalStar />
      
      {/* Section 3: Energy Waves */}
      <EnergyWaves />
      
      {/* Section 4: Constellation Galaxy */}
      <ConstellationGalaxy />
      
      {/* Section 5: Legacy Portals */}
      <LegacyPortals />
      
      {/* Section 6: Culture Engine */}
      <CultureEngine />
    </>
  );
}
