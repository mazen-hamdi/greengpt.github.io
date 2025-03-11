"use client";

import React, { useState } from "react";
import Image from "next/image";
import ChatBox, { Stats } from "../components/ChatBox";
import WaterCylinder from "../components/WaterCylinder";
import CO2Cloud from "../components/CO2Cloud";

export default function Home() {
  const [stats, setStats] = useState<Stats>({
    tokens_used: 0,
    co2_emission: 0,
    water_usage: 0,
  });

  const handleUpdateStats = (newStats: Stats) => {
    setStats((prev) => ({
      tokens_used: prev.tokens_used + newStats.tokens_used,
      co2_emission: prev.co2_emission + newStats.co2_emission,
      water_usage: prev.water_usage + newStats.water_usage,
    }));
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="w-full flex flex-col items-center mb-4">
        <Image
          className="dark:invert mb-4"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-2xl font-bold">OpenAI Impact Tracker</h1>
      </header>

      <main className="flex flex-col items-center w-full max-w-4xl">
        <div className="visualization-container flex justify-center gap-12 mb-6 w-full">
          {/* Water Cylinder */}
          <div>
            <WaterCylinder waterUsage={stats.water_usage} maxCapacity={1000} />
            <p className="text-center mt-2">
              Water Usage: {stats.water_usage.toFixed(2)} L
            </p>
          </div>

          {/* CO2 Cloud */}
          <div>
            <CO2Cloud co2Emission={stats.co2_emission} scaleFactor={0.005} />
            <div className="text-center mt-2">
              <p>CO₂: {stats.co2_emission.toFixed(2)} g</p>
            </div>
          </div>
        </div>

        <ChatBox onUpdateStats={handleUpdateStats} />

        <p className="mt-4 font-[family-name:var(--font-geist-mono)]">
          Tokens used so far: {stats.tokens_used}
        </p>
      </main>

      <footer className="flex gap-6 flex-wrap items-center justify-center mt-8">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
