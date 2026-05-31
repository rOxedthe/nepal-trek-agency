"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { difficultyColor, type Trek } from "@/data/treks";
import { ClockIcon, ArrowRight, AltitudeIcon } from "./Icons";

export default function TrekCard({ trek, index = 0 }: { trek: Trek; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="group relative overflow-hidden rounded-3xl bg-green-900 shadow-trek transition-all duration-300 hover:-translate-y-2 hover:shadow-trek-lg"
    >
      <Link href={`/treks/${trek.slug}`} className="block">
        <div className="relative h-72 w-full overflow-hidden">
          <Image
            src={trek.image}
            alt={`${trek.name} — ${trek.region} region of Nepal`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-green-900/30 to-transparent" />

          <span className="absolute left-4 top-4 rounded-full bg-snow/95 px-3 py-1 font-montserrat text-[11px] font-semibold uppercase tracking-wider text-green-800">
            {trek.region}
          </span>
          <span
            className={`absolute right-4 top-4 rounded-full px-3 py-1 font-montserrat text-[11px] font-semibold ${difficultyColor[trek.difficulty]}`}
          >
            {trek.difficulty}
          </span>
        </div>

        <div className="relative -mt-16 px-6 pb-6">
          <h3 className="font-playfair text-2xl font-bold leading-tight text-snow">
            {trek.name}
          </h3>
          <p className="mt-2 line-clamp-2 font-lato text-sm leading-relaxed text-snow/70">
            {trek.blurb}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 font-montserrat text-xs text-snow/60">
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon width={15} height={15} className="text-amber-400" />
              {trek.days} days
            </span>
            <span className="inline-flex items-center gap-1.5">
              <AltitudeIcon width={15} height={15} className="text-amber-400" />
              {trek.maxAltitude.toLocaleString()} m
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-snow/10 pt-4">
            <div>
              <span className="block font-montserrat text-[10px] uppercase tracking-widest text-snow/50">
                From
              </span>
              <span className="font-playfair text-2xl font-bold text-amber-400">
                ${trek.price.toLocaleString()}
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 px-4 py-2 font-montserrat text-xs font-semibold text-amber-300 transition-all duration-300 group-hover:bg-amber-400 group-hover:text-green-900">
              View Trek
              <ArrowRight width={15} height={15} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
