"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ItineraryDay } from "@/data/treks";
import { ChevronDown, AltitudeIcon } from "@/components/ui/Icons";

export default function ItineraryAccordion({ itinerary }: { itinerary: ItineraryDay[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-stone-200 overflow-hidden rounded-2xl border border-stone-200 bg-snow">
      {itinerary.map((d, i) => {
        const isOpen = open === i;
        return (
          <div key={d.day}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-warm"
            >
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-green-700 font-montserrat text-sm font-bold text-snow">
                {d.day}
              </span>
              <span className="flex-1">
                <span className="block font-dm text-lg text-green-900">{d.title}</span>
                <span className="inline-flex items-center gap-1.5 font-montserrat text-xs text-amber-600">
                  <AltitudeIcon width={13} height={13} />
                  {d.altitude.toLocaleString()} m
                </span>
              </span>
              <ChevronDown
                width={20}
                height={20}
                className={`flex-none text-stone-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 pl-[4.75rem] font-lato text-sm leading-relaxed text-stone-800">
                    {d.detail}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
