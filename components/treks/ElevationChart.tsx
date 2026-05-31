"use client";

import { motion } from "framer-motion";
import type { ItineraryDay } from "@/data/treks";

export default function ElevationChart({ itinerary }: { itinerary: ItineraryDay[] }) {
  const W = 760;
  const H = 240;
  const padX = 36;
  const padY = 28;
  const alts = itinerary.map((d) => d.altitude);
  const max = Math.max(...alts);
  const min = Math.min(...alts);
  const range = max - min || 1;

  const points = itinerary.map((d, i) => {
    const x = padX + (i / (itinerary.length - 1)) * (W - padX * 2);
    const y = H - padY - ((d.altitude - min) / range) * (H - padY * 2);
    return { x, y, d };
  });

  const line = points.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${padX},${H - padY} ${line} ${W - padX},${H - padY}`;

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full min-w-[560px]">
        <defs>
          <linearGradient id="elev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5b245" stopOpacity={0.45} />
            <stop offset="100%" stopColor="#f5b245" stopOpacity={0.02} />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((g) => {
          const y = padY + g * (H - padY * 2);
          const val = Math.round(max - g * range);
          return (
            <g key={g}>
              <line x1={padX} y1={y} x2={W - padX} y2={y} stroke="#ece7df" strokeWidth={1} />
              <text x={6} y={y + 4} className="fill-stone-500" fontSize={10}>
                {val}m
              </text>
            </g>
          );
        })}

        <motion.polygon
          points={area}
          fill="url(#elev)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <motion.polyline
          points={line}
          fill="none"
          stroke="#c8852a"
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={3} fill="#2d5a2d" />
            {i === points.findIndex((q) => q.d.altitude === max) && (
              <text x={p.x} y={p.y - 8} textAnchor="middle" fontSize={10} className="fill-green-900" fontWeight="bold">
                {max.toLocaleString()}m
              </text>
            )}
            <text x={p.x} y={H - 8} textAnchor="middle" fontSize={9} className="fill-stone-500">
              {p.d.day}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-2 text-center font-montserrat text-xs text-stone-500">Altitude by day</p>
    </div>
  );
}
