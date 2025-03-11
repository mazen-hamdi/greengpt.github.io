// components/CO2Cloud.tsx
"use client";

import React from "react";

interface CO2CloudProps {
  co2Emission: number;
  scaleFactor?: number; 
}

export default function CO2Cloud({ co2Emission, scaleFactor = 0.01 }: CO2CloudProps) {
  // For instance, if co2Emission=100 grams, scaleFactor=0.01 => scale=1 + 100*0.01 = 2
  // That means the cloud doubles in size at 100 grams. Tweak the formula as needed.
  const scaleValue = 1 + co2Emission * scaleFactor;

  return (
    <div
      className="co2-cloud"
      style={{
        transform: `scale(${scaleValue})`,
      }}
    />
  );
}
