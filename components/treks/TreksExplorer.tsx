"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { treks, regions, difficulties, type Region, type Difficulty } from "@/data/treks";
import TrekCard from "@/components/ui/TrekCard";
import { CloseIcon } from "@/components/ui/Icons";

const durationBuckets = [
  { label: "1–5 days", min: 1, max: 5 },
  { label: "6–10 days", min: 6, max: 10 },
  { label: "11–20 days", min: 11, max: 20 },
  { label: "20+ days", min: 21, max: 99 },
];

const maxPrice = Math.max(...treks.map((t) => t.price));

export default function TreksExplorer() {
  const params = useSearchParams();
  const [region, setRegion] = useState<Region | "All">("All");
  const [difficulty, setDifficulty] = useState<Difficulty | "All">("All");
  const [duration, setDuration] = useState<string>("All");
  const [price, setPrice] = useState<number>(maxPrice);

  useEffect(() => {
    const r = params.get("region") as Region | null;
    if (r && regions.includes(r)) setRegion(r);
  }, [params]);

  const filtered = useMemo(() => {
    return treks.filter((t) => {
      if (region !== "All" && t.region !== region) return false;
      if (difficulty !== "All" && t.difficulty !== difficulty) return false;
      if (duration !== "All") {
        const b = durationBuckets.find((d) => d.label === duration);
        if (b && (t.days < b.min || t.days > b.max)) return false;
      }
      if (t.price > price) return false;
      return true;
    });
  }, [region, difficulty, duration, price]);

  const activeFilters = [
    region !== "All" && { key: "region", label: region, clear: () => setRegion("All") },
    difficulty !== "All" && { key: "diff", label: difficulty, clear: () => setDifficulty("All") },
    duration !== "All" && { key: "dur", label: duration, clear: () => setDuration("All") },
    price < maxPrice && { key: "price", label: `Under $${price.toLocaleString()}`, clear: () => setPrice(maxPrice) },
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[];

  const reset = () => {
    setRegion("All");
    setDifficulty("All");
    setDuration("All");
    setPrice(maxPrice);
  };

  return (
    <section className="relative overflow-hidden bg-warm section-pad">
      <div className="container-trek relative z-10">
        {/* Filter bar */}
        <div className="sticky top-20 z-30 mb-10 rounded-3xl border border-stone-200 bg-snow/95 p-5 shadow-trek backdrop-blur md:p-6">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <Select label="Region" value={region} onChange={(v) => setRegion(v as Region | "All")} options={["All", ...regions]} />
            <Select label="Difficulty" value={difficulty} onChange={(v) => setDifficulty(v as Difficulty | "All")} options={["All", ...difficulties]} />
            <Select label="Duration" value={duration} onChange={setDuration} options={["All", ...durationBuckets.map((d) => d.label)]} />
            <div>
              <label className="mb-2 block font-montserrat text-xs font-semibold uppercase tracking-widest text-stone-500">
                Max Price · ${price.toLocaleString()}
              </label>
              <input
                type="range"
                min={300}
                max={maxPrice}
                step={50}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-stone-200 accent-amber-500"
              />
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-stone-200 pt-4">
              {activeFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={f.clear}
                  className="inline-flex items-center gap-1.5 rounded-full bg-green-700 px-3 py-1.5 font-montserrat text-xs font-medium text-snow transition-colors hover:bg-earth-700"
                >
                  {f.label}
                  <CloseIcon width={13} height={13} />
                </button>
              ))}
              <button onClick={reset} className="font-montserrat text-xs font-semibold text-amber-600 hover:underline">
                Clear all
              </button>
            </div>
          )}
        </div>

        <p className="mb-6 font-montserrat text-sm text-stone-500">
          Showing <span className="font-bold text-green-900">{filtered.length}</span> of {treks.length} treks
        </p>

        <motion.div layout className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((trek, i) => (
              <motion.div
                key={trek.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
              >
                <TrekCard trek={trek} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="rounded-3xl border border-dashed border-stone-300 py-20 text-center">
            <p className="font-playfair text-2xl text-green-900">No treks match those filters</p>
            <button onClick={reset} className="btn btn-amber mt-6">Reset filters</button>
          </div>
        )}
      </div>
    </section>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block font-montserrat text-xs font-semibold uppercase tracking-widest text-stone-500">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-stone-200 bg-warm px-4 py-2.5 font-lato text-sm text-green-900 outline-none transition-colors focus:border-amber-400"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
