"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { treks } from "@/data/treks";
import { CloseIcon, ArrowRight } from "@/components/ui/Icons";

const TrekGlobe = dynamic(() => import("@/components/3d/TrekGlobe"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-green-700/40" />
    </div>
  ),
});

const regionGroups = [
  { region: "Everest",    label: "Everest Region",   emoji: "🏔️" },
  { region: "Annapurna", label: "Annapurna Region",  emoji: "⛰️" },
  { region: "Langtang",  label: "Langtang Region",   emoji: "🌿" },
  { region: "Manaslu",   label: "Manaslu Region",    emoji: "🗻" },
  { region: "Restricted",label: "Restricted Areas",  emoji: "🔭" },
];

export default function TrekRegions() {
  const [region, setRegion] = useState<string | null>(null);
  const regionTreks = region ? treks.filter((t) => t.region === region) : [];

  return (
    <section className="relative overflow-hidden bg-green-800 section-pad text-snow">
      <AnimatedBackground variant="compass" tone="light" />
      <div className="container-trek relative z-10">
        <SectionHeading
          eyebrow="Interactive Map"
          title="Explore Nepal's Trek Regions"
          subtitle="Scroll to zoom into Nepal, then click any pin to preview the base camp and dive into the full itinerary."
          tone="light"
        />

        {/* ── Mobile: tap-friendly region cards ── */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:hidden">
          {regionGroups.map((g) => {
            const count = treks.filter((t) => t.region === g.region).length;
            return (
              <button
                key={g.region}
                onClick={() => setRegion(g.region)}
                className="group rounded-2xl border border-snow/15 bg-green-900/60 p-5 text-left transition-all duration-200 active:scale-95 active:bg-green-900"
              >
                <span className="text-3xl">{g.emoji}</span>
                <p className="mt-3 font-playfair text-lg font-bold leading-tight text-snow">
                  {g.region}
                </p>
                <p className="font-montserrat text-[10px] uppercase tracking-widest text-snow/50">
                  {g.label.split(" ").slice(1).join(" ")}
                </p>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <span className="font-playfair text-3xl font-bold text-snow">{count}</span>
                    <span className="ml-1 font-montserrat text-[10px] uppercase tracking-widest text-snow/50">
                      treks
                    </span>
                  </div>
                  <ArrowRight
                    width={18}
                    height={18}
                    className="text-snow/40 transition-transform duration-200 group-active:translate-x-1"
                  />
                </div>
              </button>
            );
          })}

          <Link
            href="/treks"
            className="col-span-2 flex items-center justify-between rounded-2xl border border-snow/15 bg-green-900/40 px-5 py-4 transition-all active:scale-95"
          >
            <span className="font-dm text-lg text-snow">Browse all treks</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-snow/20 px-3 py-1.5 font-montserrat text-xs text-snow/70">
              {treks.length} routes <ArrowRight width={13} height={13} />
            </span>
          </Link>
        </div>

        {/* ── Desktop: 3-D Globe with trail lines ── */}
        <div className="mt-10 hidden h-[460px] w-full md:block">
          <TrekGlobe onSelect={setRegion} />
        </div>
      </div>

      {/* Region modal */}
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
