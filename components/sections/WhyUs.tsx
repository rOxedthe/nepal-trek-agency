"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { GuideIcon, ShieldIcon, LeafIcon, GroupIcon } from "@/components/ui/Icons";

const values = [
  {
    Icon: GuideIcon,
    title: "Local Expert Guides",
    text: "Born and raised in the Himalayas, our guides know every trail, teahouse and shortcut.",
  },
  {
    Icon: ShieldIcon,
    title: "Safety First",
    text: "Government-certified guides, daily oximeter checks and clear emergency protocols.",
  },
  {
    Icon: LeafIcon,
    title: "Sustainable Trekking",
    text: "Leave No Trace certified practices that protect the mountains we love.",
  },
  {
    Icon: GroupIcon,
    title: "Small Groups",
    text: "Maximum 12 trekkers per group for a personal, unhurried experience.",
  },
];

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-warm section-pad">
      <AnimatedBackground variant="contours" tone="dark" />
      <div className="container-trek relative z-10">
        <SectionHeading
          eyebrow="Why Trek With Us"
          title="Trusted by Trekkers Worldwide"
          subtitle="Fifteen years of leading Himalayan journeys, built on local knowledge and genuine care."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-3xl border border-stone-200 bg-snow p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400 hover:shadow-trek"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-700 text-amber-300 transition-transform duration-500 group-hover:rotate-[18deg] group-hover:scale-110">
                <v.Icon width={28} height={28} />
              </span>
              <h3 className="mt-5 font-playfair text-xl font-bold text-green-900">
                {v.title}
              </h3>
              <p className="mt-2 font-lato text-sm leading-relaxed text-stone-800">
                {v.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
