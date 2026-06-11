"use client";

import ArrivalStar from "./ArrivalStar";
import EnergyWaves from "./EnergyWaves";
import ConstellationGalaxy from "./ConstellationGalaxy";
import LegacyPortals from "./LegacyPortals";
import VIPMode from "./VIPMode";
import NeuralPlexus from "./NeuralPlexus";

export default function SpectalExperience() {
  return (
    <>
      <VIPMode />
      
      {/* Section 1: Neural network plexus environment */}
      <NeuralPlexus />
      
      {/* Section 1: Arrival Star (logo assembly) */}
      <ArrivalStar />
      
      {/* Section 3: Energy Waves */}
      <EnergyWaves />
      
      {/* Section 4: Constellation Galaxy */}
      <ConstellationGalaxy />
      
      {/* Section 5: Legacy Portals */}
      <LegacyPortals />
    </>
  );
}
