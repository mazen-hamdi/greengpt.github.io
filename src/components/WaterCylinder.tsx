// components/WaterCylinder.tsx
"use client";

import React from "react";

interface WaterCylinderProps {
  waterUsage: number;
  maxCapacity?: number;
}

export default function WaterCylinder({ waterUsage, maxCapacity = 100 }: WaterCylinderProps) {
  // Ensure even small amounts show some water (minimum 2% fill)
  const minFillPercentage = 2;
  const calculatedFillPercentage = (waterUsage / maxCapacity) * 100;
  
  // Use the calculated percentage or the minimum, whichever is larger
  // And ensure it doesn't exceed 100%
  const fillPercentage = Math.min(
    Math.max(calculatedFillPercentage, waterUsage > 0 ? minFillPercentage : 0),
    100
  );

  return (
    <div className="water-cylinder">
      <div
        className="water-fill"
        style={{ height: `${fillPercentage}%` }}
      />
    </div>
  );
}
