"use client";

import React, { useState } from "react";
import Image from "next/image";
import Chatbox, { Stats } from "@/components/Chatbox";
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
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-4 pb-12 gap-6 sm:p-12 animated-bg">
      <header className="w-full flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold mb-2 header-gradient">OpenAI Impact Tracker</h1>
        <p className="text-gray-300 text-center max-w-2xl">
          Monitor the environmental impact of your AI interactions in real-time
        </p>
      </header>

      <main className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
        <div className="visualization-container flex justify-center gap-8 mb-10 w-full">
          {/* Visualization Cards with improved styling */}
          <div className="visualization-card">
            <h3 className="text-center text-lg font-medium mb-4 text-blue-300">Water Consumption</h3>
            <WaterCylinder waterUsage={stats.water_usage} maxCapacity={1000} />
            <p className="text-center mt-4 text-lg">
              <span className="font-bold text-blue-300">{stats.water_usage.toFixed(2)}</span> Liters
            </p>
          </div>

          <div className="visualization-card">
            <h3 className="text-center text-lg font-medium mb-4 text-gray-300">CO₂ Emissions</h3>
            <CO2Cloud co2Emission={stats.co2_emission} scaleFactor={0.005} />
            <p className="text-center mt-4 text-lg">
              <span className="font-bold text-gray-300">{stats.co2_emission.toFixed(2)}</span> grams
            </p>
          </div>
        </div>

        <div className="chat-wrapper w-full flex justify-center">
          <div className="chat-container p-6 mb-6 w-full max-w-2xl">
            <Chatbox onUpdateStats={handleUpdateStats} />
          </div>
        </div>

        <p className="mt-2 py-2 px-4 bg-gray-800 rounded-full text-gray-300 font-mono text-sm">
          Tokens used: <span className="font-bold text-white">{stats.tokens_used}</span>
        </p>
      </main>

      <footer className="flex gap-6 flex-wrap items-center justify-center mt-6 text-sm text-gray-400">
        <a
          className="flex items-center gap-2 hover:text-blue-300 transition-colors"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image 
            src="/file.svg" 
            alt="File icon" 
            width={16} 
            height={16} 
            className="opacity-70"
          />
          Documentation
        </a>
        <a
          className="flex items-center gap-2 hover:text-blue-300 transition-colors"
          href="https://github.com/yourusername/openai-impact"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image 
            src="/window.svg" 
            alt="Window icon" 
            width={16} 
            height={16} 
            className="opacity-70"
          />
          GitHub Repo
        </a>
      </footer>
    </div>
  );
}
