"use client";

import Image from "next/image";
import { useState } from "react";

export interface Guide {
  name: string;
  role: string;
  speciality: string;
  years: number;
  languages: string;
  bio: string;
  image: string;
}

export default function TeamCard({ guide, index }: { guide: Guide; index: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="group h-80 [perspective:1200px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl [backface-visibility:hidden]">
          <Image
            src={guide.image}
            alt={guide.name}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-green-900/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <span className="rounded-full bg-amber-400 px-3 py-1 font-montserrat text-[10px] font-semibold uppercase tracking-wider text-green-900">
              {guide.years} yrs
            </span>
            <h3 className="mt-3 font-playfair text-2xl font-bold text-snow">{guide.name}</h3>
            <p className="font-montserrat text-xs uppercase tracking-widest text-amber-300">{guide.role}</p>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex flex-col justify-center rounded-3xl bg-green-900 p-6 text-snow [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <h3 className="font-playfair text-2xl font-bold text-amber-300">{guide.name}</h3>
          <p className="mt-1 font-montserrat text-xs uppercase tracking-widest text-snow/60">{guide.role}</p>
          <p className="mt-4 font-lato text-sm leading-relaxed text-snow/85">{guide.bio}</p>
          <div className="mt-4 space-y-1 border-t border-snow/10 pt-4 font-montserrat text-xs text-snow/70">
            <p><span className="text-amber-300">Speciality:</span> {guide.speciality}</p>
            <p><span className="text-amber-300">Languages:</span> {guide.languages}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
