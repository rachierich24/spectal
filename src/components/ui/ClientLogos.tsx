import React from "react";

export interface ClientLogo {
  name: string;
  src: string;
}

// Exact company logos copied from MDN Events website, optimized for dark backgrounds
export const CLIENT_LOGOS: ClientLogo[] = [
  {
    name: "Nighlight",
    src: "/logos/nighlight.webp"
  },
  {
    name: "Red Bull",
    src: "/logos/redbull.webp"
  },
  {
    name: "Buona",
    src: "/logos/buona.webp"
  },
  {
    name: "Tequila Patron",
    src: "/logos/tequilapatron.svg"
  },
  {
    name: "Playground",
    src: "/logos/playground.webp"
  },
  {
    name: "Cape Coast",
    src: "/logos/capecoast.webp"
  },
  {
    name: "Daily Bagel",
    src: "/logos/dailybagel.webp"
  }
];
