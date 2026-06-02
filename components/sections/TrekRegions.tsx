"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { treks } from "@/data/treks";
import { CloseIcon, ArrowRight } from "@/components/ui/Icons";

/* ── Trail bezier path (viewBox 0 0 1000 470) ── */
const TRAIL =
  "M 100,355 C 148,288 228,218 292,192 C 356,166 408,130 490,120 C 572,110 618,148 704,196 C 782,242 844,300 902,358";

const TRAIL_DUR = 2.6; // seconds for full draw animation

/* ── Camp waypoints ── */
const CAMPS = [
  { region: "Annapurna",  name: "Annapurna BC",  x: 100, y: 355, alt: "4,130 m", below: true,  t: 0    },
  { region: "Manaslu",    name: "Larkya La",      x: 292, y: 192, alt: "5,106 m", below: false, t: 0.25 },
  { region: "Langtang",   name: "Langtang",       x: 490, y: 120, alt: "3,430 m", below: false, t: 0.5  },
  { region: "Everest",    name: "Base Camp",      x: 704, y: 196, alt: "5,364 m", below: false, t: 0.75 },
  { region: "Restricted", name: "Muktinath",      x: 902, y: 358, alt: "4,200 m", below: true,  t: 1    },
];

/* ── Distance badges (positioned above each segment's bezier midpoint) ── */
const SEGMENTS = [
  { x: 193, y: 248, km: "170 km", t: 0.125 },
  { x: 388, y: 138, km: "125 km", t: 0.375 },
  { x: 638, y: 148, km: "215 km", t: 0.625 },
  { x: 806, y: 258, km: "250 km", t: 0.875 },
];

export default function TrekRegions() {
  const [region, setRegion] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const regionTreks = region ? treks.filter((t) => t.region === region) : [];

  return (
    <section className="relative overflow-hidden bg-green-800 section-pad text-snow">
      <AnimatedBackground variant="compass" tone="light" />

      <div ref={ref} className="container-trek relative z-10">
        <SectionHeading
          eyebrow="Trek Trail"
          title="Nepal's Great Himalayan Trails"
          subtitle="Five legendary regions linked by one wild trail. Tap any camp to explore the routes."
          tone="light"
        />

        {/* Trail SVG — scrollable on narrow screens, full-width on desktop */}
        <div className="mt-12 w-full overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <svg
            viewBox="0 0 1000 470"
            className="h-auto"
            style={{ minWidth: 560, width: "100%" }}
            aria-label="Nepal trekking regions trail map"
          >
            <defs>
              {/* Gradient along the trail */}
              <linearGradient id="trailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="rgba(255,255,255,0.35)" />
                <stop offset="40%"  stopColor="rgba(255,255,255,0.9)"  />
                <stop offset="60%"  stopColor="rgba(255,255,255,0.9)"  />
                <stop offset="100%" stopColor="rgba(255,255,255,0.35)" />
              </linearGradient>

              {/* Soft glow filter for trail */}
              <filter id="trailGlow" x="-20%" y="-100%" width="140%" height="300%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Subtle elevation-fill beneath the trail */}
            <motion.path
              d={`${TRAIL} L 902,470 L 100,470 Z`}
              fill="rgba(255,255,255,0.035)"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 1.4 }}
            />

            {/* Trail outer glow */}
            <motion.path
              d={TRAIL}
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth={16}
              strokeLinecap="round"
              filter="url(#trailGlow)"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: TRAIL_DUR, ease: "easeInOut" }}
            />

            {/* Trail core line */}
            <motion.path
              d={TRAIL}
              fill="none"
              stroke="url(#trailGrad)"
              strokeWidth={3.5}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: TRAIL_DUR, ease: "easeInOut" }}
            />

            {/* ── Distance badges ── */}
            {SEGMENTS.map((seg, i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  delay: seg.t * TRAIL_DUR + 0.22,
                  duration: 0.38,
                  ease: "easeOut",
                }}
              >
                {/* Badge pill */}
                <rect
                  x={seg.x - 31} y={seg.y - 28}
                  width={62} height={20} rx={10}
                  fill="rgba(26,5,8,0.88)"
                  stroke="rgba(255,255,255,0.28)"
                  strokeWidth={1}
                />
                {/* Badge text */}
                <text
                  x={seg.x}
                  y={seg.y - 14}
                  textAnchor="middle"
                  fill="white"
                  fontSize={10}
                  fontFamily="Montserrat, sans-serif"
                  fontWeight={600}
                  letterSpacing="0.06em"
                >
                  {seg.km}
                </text>
                {/* Connector dot on trail */}
                <motion.circle
                  cx={seg.x} cy={seg.y - 8}
                  r={2}
                  fill="rgba(255,255,255,0.45)"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: seg.t * TRAIL_DUR + 0.35 }}
                />
              </motion.g>
            ))}

            {/* ── Camp markers ── */}
            {CAMPS.map((c, i) => {
              const count = treks.filter((t) => t.region === c.region).length;
              /* label direction: below=true → text appears below the circle */
              const nameY  = c.below ? c.y + 28 : c.y - 28;
              const subY   = c.below ? c.y + 42 : c.y - 16;
              const countY = c.below ? c.y + 55 : c.y - 5;

              return (
                <motion.g
                  key={c.region}
                  role="button"
                  tabIndex={0}
                  aria-label={`${c.region} Region — ${count} treks`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setRegion(c.region)}
                  onKeyDown={(e) => e.key === "Enter" && setRegion(c.region)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: c.t * TRAIL_DUR + 0.18,
                    type: "spring",
                    stiffness: 220,
                    damping: 16,
                  }}
                >
                  {/* Pulse ring */}
                  <motion.circle
                    cx={c.x} cy={c.y} r={22}
                    fill="none"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth={1.5}
                    animate={{ scale: [0.85, 1.9, 0.85], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.45 }}
                    style={{ transformOrigin: `${c.x}px ${c.y}px` }}
                  />

                  {/* Outer circle */}
                  <circle
                    cx={c.x} cy={c.y} r={13}
                    fill="rgba(26,5,8,0.92)"
                    stroke="rgba(255,255,255,0.75)"
                    strokeWidth={2}
                  />

                  {/* Inner dot */}
                  <circle cx={c.x} cy={c.y} r={4.5} fill="white" />

                  {/* Region name */}
                  <text
                    x={c.x} y={nameY}
                    textAnchor="middle"
                    fill="white"
                    fontSize={12.5}
                    fontFamily="'Playfair Display', serif"
                    fontWeight={700}
                  >
                    {c.region}
                  </text>

                  {/* Short camp name · altitude */}
                  <text
                    x={c.x} y={subY}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.52)"
                    fontSize={8.5}
                    fontFamily="Montserrat, sans-serif"
                    letterSpacing="0.04em"
                  >
                    {c.name} · {c.alt}
                  </text>

                  {/* Trek count */}
                  <text
                    x={c.x} y={countY}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.32)"
                    fontSize={8}
                    fontFamily="Montserrat, sans-serif"
                    letterSpacing="0.07em"
                  >
                    {count} {count === 1 ? "trek" : "treks"}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </div>

        {/* Tap hint on mobile */}
        <p className="mt-2 text-center font-montserrat text-[10px] uppercase tracking-widest text-snow/35 md:hidden">
          Tap any camp marker to explore
        </p>
      </div>

      {/* ── Region modal (shared) ── */}
      <AnimatePresence>
        {region && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-green-900/80 p-4 backdrop-blur-md"
            onClick={() => setRegion(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-3xl border border-snow/10 bg-warm p-8 text-green-900 shadow-trek-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="eyebrow text-amber-600">{region} Region</p>
                  <h3 className="mt-2 font-playfair text-3xl font-bold">
                    {regionTreks.length} treks to explore
                  </h3>
                </div>
                <button
                  onClick={() => setRegion(null)}
                  aria-label="Close"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-200 text-green-900 hover:bg-stone-300 transition-colors"
                >
                  <CloseIcon width={18} height={18} />
                </button>
              </div>

              <ul className="mt-6 space-y-2">
                {regionTreks.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/treks/${t.slug}`}
                      className="flex items-center justify-between rounded-xl border border-stone-200 bg-snow px-4 py-3 transition-colors hover:border-green-600 hover:bg-green-600/5 active:scale-[0.99]"
                    >
                      <span className="font-dm text-lg">{t.name}</span>
                      <span className="inline-flex items-center gap-2 font-montserrat text-sm text-green-700">
                        ${t.price.toLocaleString()}
                        <ArrowRight width={15} height={15} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
