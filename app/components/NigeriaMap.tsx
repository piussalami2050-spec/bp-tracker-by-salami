"use client";

import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { nigeria } from "../data"; // Gets the state data

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/nigeria/nigeria-states.json";

export default function NigeriaMap() {
  const [tooltipContent, setTooltipContent] = useState("");

  const getColor = (stateName: string) => {
    const state = nigeria.find(s => 
      s.state.toLowerCase().replace(/\s+/g, '') === stateName.toLowerCase().replace(/\s+/g, '')
    );
    const rate = state ? state.sick : 0;
    if (rate < 25) return "#10B981"; // Green
    if (rate < 35) return "#F59E0B"; // Orange
    return "#EF4444"; // Red
  };

  const handleMouseEnter = (geo: any) => {
    const state = nigeria.find(s => 
      s.state.toLowerCase().replace(/\s+/g, '') === geo.properties.NAME.toLowerCase().replace(/\s+/g, '')
    );
    if (state) {
      setTooltipContent(`${state.state}: ${state.sick}% 😱`);
    }
  };

  const handleClick = (geo: any) => {
    const state = nigeria.find(s => 
      s.state.toLowerCase().replace(/\s+/g, '') === geo.properties.NAME.toLowerCase().replace(/\s+/g, '')
    );
    if (state) {
      const tweet = `🌡️ My state ${state.state} has ${state.sick}% high BP! Nigeria avg 32%. Check: https://yourusername.github.io/naija-bp-tracker #NaijaBPTracker`;
      navigator.clipboard.writeText(tweet);
      alert("Tweet copied! Paste it on X/Twitter 🚀");
    }
  };

  return (
    <div className="w-full h-[400px] md:h-[500px] relative">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 1800, center: [8.5, 9.5] }}
        className="w-full h-full"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={getColor(geo.properties.NAME)}
                stroke="#FFF"
                strokeWidth={0.5}
                onMouseEnter={() => handleMouseEnter(geo)}
                onClick={() => handleClick(geo)}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", filter: "brightness(1.1)" },
                  pressed: { outline: "none" },
                }}
                data-tooltip-id="tooltip"
                data-tooltip-content={tooltipContent}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
      <Tooltip id="tooltip" place="top" className="bg-black text-white p-2 rounded text-sm" />
      
      {/* Simple Legend */}
      <div className="absolute bottom-2 left-2 bg-white p-2 rounded shadow text-xs">
        <div><span className="w-3 h-3 inline-block bg-green-500 mr-1"></span>Low</div>
        <div><span className="w-3 h-3 inline-block bg-orange-500 mr-1"></span>Medium</div>
        <div><span className="w-3 h-3 inline-block bg-red-500 mr-1"></span>High</div>
      </div>
    </div>
  );
}
