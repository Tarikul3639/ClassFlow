"use client";

import React from "react";

import { CloudSun } from "lucide-react";

const WeatherWidget = ({ weather }: { weather: any }) => (
  <div className="flex items-center gap-2 text-xxs md:text-[11px] font-black text-[#617789] bg-linear-to-br from-blue-50/80 to-cyan-50/80 backdrop-blur-sm px-2.5 py-1.5 rounded-full border border-blue-200/30 hover:shadow-md transition-all duration-300">
    <CloudSun
      size={14}
      className="text-[#399aef] animate-[spin_20s_linear_infinite]"
    />
    <span className="truncate">
      <span className="inline lg:hidden">{weather?.temp || "18"}°C</span>
      <span className="hidden lg:inline">
        {weather?.desc || "Clear"}, {weather?.temp || "18"}°C
      </span>
    </span>
  </div>
);

export default WeatherWidget;