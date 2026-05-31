"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "@/components/ui/Icons";

const faqs = [
  {
    q: "What is the best time to trek in Nepal?",
    a: "The two prime seasons are spring (March–May), when rhododendrons bloom, and autumn (September–November), with the clearest skies. Some treks like Upper Mustang and Dolpo are also excellent during the monsoon as they sit in the rain shadow.",
  },
  {
    q: "Do I need prior trekking experience?",
    a: "Not for most treks. Easier routes like Ghorepani Poon Hill are perfect for first-timers. For high-altitude treks such as Everest Base Camp, good general fitness matters more than technical experience — and our guides set a comfortable pace.",
  },
  {
    q: "What permits are required?",
    a: "It depends on the region — typically a TIMS card plus a national park or conservation area permit. Restricted areas (Mustang, Manaslu, Kanchenjunga) need a special permit. We arrange every permit for you; you just bring your passport and photos.",
  },
  {
    q: "What's included in the trek price?",
    a: "Guide and porter support, all permits, teahouse accommodation, three meals a day on the trail, airport transfers, and domestic flights where specified. Full inclusions and exclusions are listed on every trek page.",
  },
  {
    q: "How fit do I need to be?",
    a: "You should be able to walk 5–7 hours a day on varied terrain. We recommend a few months of regular cardio and hill walking before your trek. Our itineraries build in acclimatisation days to keep you strong and safe.",
  },
  {
    q: "Can you arrange solo treks?",
    a: "Absolutely. Many of our trekkers travel solo with a private guide. It's a wonderful way to set your own pace while still having local expertise and company on the trail.",
  },
  {
    q: "What about altitude sickness?",
    a: "We take it seriously. Our itineraries follow proven acclimatisation schedules, guides carry pulse oximeters and first-aid kits, and they are trained to recognise early symptoms and respond. Your safety always comes before the summit.",
  },
  {
    q: "What gear should I bring?",
    a: "Layered clothing, a warm sleeping bag, broken-in boots, a down jacket and trekking poles are the essentials. We send every trekker a complete packing list on booking, and gear can be rented or bought easily in Kathmandu.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            className={`overflow-hidden rounded-2xl border bg-snow transition-colors ${isOpen ? "border-amber-400" : "border-stone-200"}`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-dm text-lg text-green-900">{f.q}</span>
              <ChevronDown
                width={20}
                height={20}
                className={`flex-none text-amber-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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
                  <p className="px-6 pb-5 font-lato text-sm leading-relaxed text-stone-800">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
