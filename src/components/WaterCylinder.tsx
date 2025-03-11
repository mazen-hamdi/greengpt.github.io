// components/WaterCylinder.tsx
"use client";

import React from "react";

interface WaterCylinderProps {
  waterUsage: number;
  maxCapacity?: number;
}

export default function WaterCylinder({ waterUsage, maxCapacity = 1000 }: WaterCylinderProps) {
  // For example, if waterUsage = 50 liters and maxCapacity=1000,
  // fillHeight = 5% (just a rough example).
  const fillPercentage = Math.min((waterUsage / maxCapacity) * 100, 100);

  return (
    <div className="water-cylinder">
      <div
        className="water-fill"
        style={{ height: `${fillPercentage}%` }}
      />
    </div>
  );
}
