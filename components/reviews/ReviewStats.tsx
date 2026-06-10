"use client";

import { motion } from "framer-motion";
import { reviewStats } from "@/data/reviews";
import StarRating from "@/components/ui/StarRating";

export default function ReviewStats() {
  return (
    <section className="relative overflow-hidden bg-warm py-16">
      <div className="container-trek relative z-10 grid items-center gap-12 px-6 md:grid-cols-2 md:px-12">
        <div className="text-center md:text-left">
          <p className="font-playfair text-7xl font-bold text-green-900">
            {reviewStats.average}
            <span className="text-3xl text-stone-500">/5</span>
          </p>
          <div className="mt-3 flex justify-center md:justify-start">
            <StarRating value={Math.round(reviewStats.average)} size={24} />
          </div>
          <p className="mt-3 font-montserrat text-sm text-stone-500">
            Based on {reviewStats.total} verified reviews
          </p>
        </div>

        <div className="space-y-3">
          {reviewStats.distribution.map((d, i) => (
            <div key={d.stars} className="flex items-center gap-3">
              <span className="w-12 font-montserrat text-xs text-stone-500">{d.stars} star</span>
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-stone-200">
                <motion.div
                  className="h-full rounded-full bg-amber-600"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${d.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                />
              </div>
              <span className="w-10 text-right font-montserrat text-xs font-semibold text-green-900">
                {d.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
