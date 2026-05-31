"use client";

import { motion } from "framer-motion";
import CountUp from "@/components/ui/CountUp";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

const stats = [
  { end: 1000, suffix: "+", label: "Treks Completed" },
  { end: 15, suffix: "+", label: "Years Experience" },
  { end: 50, suffix: "+", label: "Routes Available" },
  { end: 98, suffix: "%", label: "Client Satisfaction" },
];

export default function StatsBar() {
  return (
    <section className="relative overflow-hidden bg-green-900 py-16">
      <AnimatedBackground variant="contours" tone="light" />
      <div className="container-trek relative z-10 grid grid-cols-2 gap-8 px-6 md:grid-cols-4 md:px-12">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <p className="font-playfair text-4xl font-bold text-amber-400 md:text-5xl">
              <CountUp end={s.end} suffix={s.suffix} />
            </p>
            <p className="mt-2 font-montserrat text-xs uppercase tracking-widest text-snow/70 md:text-sm">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
