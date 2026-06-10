"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { featuredTreks, difficultyColor } from "@/data/treks";
import {
  ClockIcon,
  AltitudeIcon,
  ArrowRight,
  PeakIcon,
} from "@/components/ui/Icons";

/* ---------- Anaglyph "3D glasses" image ---------- */
function AnaglyphImage({ src, alt }: { src: string; alt: string }) {
  const [hover, setHover] = useState(false);
  const off = hover ? 11 : 4.5;
  const spring = { type: "spring" as const, stiffness: 120, damping: 14 };
  // Single image on mobile — anaglyph doubles GPU/memory load on small screens
  if (typeof window !== "undefined" && window.innerWidth < 640) {
    return (
      <div className="absolute inset-0 overflow-hidden bg-black">
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      </div>
    );
  }
  return (
    <div
      className="absolute inset-0 overflow-hidden bg-black"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <motion.img
        src={src}
        alt={alt}
        draggable={false}
        initial={{ x: -22 }}
        animate={{ x: -off }}
        transition={spring}
        className="absolute inset-0 h-full w-full object-cover mix-blend-screen"
        style={{ filter: "url(#ana-red)" }}
      />
      <motion.img
        src={src}
        alt=""
        aria-hidden
        draggable={false}
        initial={{ x: 22 }}
        animate={{ x: off }}
        transition={spring}
        className="absolute inset-0 h-full w-full object-cover mix-blend-screen"
        style={{ filter: "url(#ana-cyan)" }}
      />
    </div>
  );
}

/* ---------- Page-turn variants ---------- */
const pageVar: Variants = {
  enter: (d: number) => ({ rotateY: d > 0 ? 90 : -90, opacity: 0.5 }),
  center: { rotateY: 0, opacity: 1 },
  exit: (d: number) => ({ rotateY: d > 0 ? -90 : 90, opacity: 0.5 }),
};

export default function FeaturedBooklet() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reduce = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setOpen(true), reduce ? 0 : 420);
      return () => clearTimeout(t);
    }
  }, [inView, reduce]);

  const trek = featuredTreks[index];
  const go = (d: number) => {
    setDir(d);
    setIndex((i) => (i + d + featuredTreks.length) % featuredTreks.length);
  };

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-4xl">
      {/* hidden anaglyph channel filters */}
      <svg className="absolute h-0 w-0" aria-hidden focusable="false">
        <defs>
          <filter id="ana-red" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            />
          </filter>
          <filter id="ana-cyan" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>

      {/* desk shadow */}
      <div className="pointer-events-none absolute inset-x-10 bottom-2 -z-10 h-10 rounded-[50%] bg-black/30 blur-2xl" />

      <motion.div
        className="grid grid-cols-1 [perspective:2600px] sm:grid-cols-2"
        animate={{ x: !open && isDesktop ? "-25%" : "0%" }}
        transition={{ type: "spring", stiffness: 55, damping: 14, mass: 1.1 }}
      >
        {/* left placeholder column (filled by the opened cover's back face) */}
        <div className="hidden sm:block" />

        {/* RIGHT PAGE (active trek) + COVER */}
        <div className="relative aspect-[3/4] w-full [transform-style:preserve-3d]">
          {/* base = right page */}
          <div className="absolute inset-0 rounded-r-2xl rounded-l-sm bg-green-900 shadow-trek-lg [transform-style:preserve-3d]">
            <AnimatePresence custom={dir} mode="sync">
              <motion.div
                key={trek.slug}
                custom={dir}
                variants={pageVar}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 origin-left overflow-hidden rounded-r-2xl rounded-l-sm [backface-visibility:hidden]"
              >
                <AnaglyphImage src={trek.image} alt={trek.name} />
                {/* readability gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-green-900/30 to-transparent" />
                {/* spine shading */}
                <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/45 to-transparent" />

                {/* top badges */}
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                  <span className="rounded-full bg-snow/95 px-3 py-1 font-montserrat text-[11px] font-semibold uppercase tracking-wider text-green-800">
                    {trek.region}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 font-montserrat text-[11px] font-semibold ${difficultyColor[trek.difficulty]}`}
                  >
                    {trek.difficulty}
                  </span>
                </div>

                {/* trek info */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-playfair text-3xl font-bold leading-tight text-snow">
                    {trek.name}
                  </h3>
                  <p className="mt-2 max-w-sm font-lato text-sm leading-relaxed text-snow/75">
                    {trek.blurb}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-4 font-montserrat text-xs text-snow/70">
                    <span className="inline-flex items-center gap-1.5">
                      <ClockIcon width={15} height={15} className="text-amber-400" />
                      {trek.days} days
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <AltitudeIcon width={15} height={15} className="text-amber-400" />
                      {trek.maxAltitude.toLocaleString()} m
                    </span>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-snow/15 pt-4">
                    <div>
                      <span className="block font-montserrat text-[10px] uppercase tracking-widest text-snow/50">
                        From
                      </span>
                      <span className="font-playfair text-2xl font-bold text-amber-400">
                        ${trek.price.toLocaleString()}
                      </span>
                    </div>
                    <Link
                      href={`/treks/${trek.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-5 py-2.5 font-montserrat text-xs font-semibold text-green-900 transition-transform hover:scale-105"
                    >
                      View Trek <ArrowRight width={15} height={15} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* page-curl highlight on the outer edge */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-white/15 to-transparent" />
          </div>

          {/* COVER (hinged on the spine, swings open to become the left page) */}
          <motion.button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close field guide" : "Open field guide"}
            className="absolute inset-0 origin-left rounded-2xl [transform-style:preserve-3d]"
            initial={false}
            animate={{ rotateY: open ? -162 : 0 }}
            transition={{ type: "spring", stiffness: 55, damping: 14, mass: 1.1 }}
            style={{ zIndex: open ? 5 : 20 }}
          >
            {/* FRONT of cover */}
            <span className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-amber-400/30 bg-gradient-to-br from-green-800 to-green-900 p-6 text-center shadow-trek-lg [backface-visibility:hidden]">
              <span className="pointer-events-none absolute inset-0 bg-grain opacity-[0.07]" />
              <span className="pointer-events-none absolute inset-3 rounded-xl border border-amber-400/25" />
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-green-900">
                <PeakIcon width={30} height={30} strokeWidth={1.7} />
              </span>
              <span className="mt-5 font-montserrat text-[10px] uppercase tracking-[0.4em] text-amber-300/80">
                Nepal Trek Agency
              </span>
              <span className="mt-2 font-playfair text-3xl font-bold leading-tight text-snow">
                The Field Guide
              </span>
              <span className="mt-3 max-w-[14rem] font-lato text-sm text-snow/60">
                {featuredTreks.length} handpicked Himalayan journeys
              </span>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-400/40 px-4 py-2 font-montserrat text-[11px] font-semibold uppercase tracking-widest text-amber-300">
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                >
                  ▸
                </motion.span>
                Tap to open
              </span>
            </span>

            {/* BACK of cover = inside-cover / LEFT page (nav lives here) */}
            <span onClick={(e) => e.stopPropagation()} className="absolute inset-0 flex flex-col rounded-2xl border border-stone-300 bg-warm p-7 text-left shadow-inner [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <span className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/10 to-transparent" />
              <span className="eyebrow text-amber-600">Contents</span>
              <span className="mt-2 font-playfair text-2xl font-bold leading-tight text-green-900">
                Choose your
                <br />
                adventure
              </span>
              <span className="mt-3 font-lato text-sm leading-relaxed text-stone-500">
                Turn the pages to preview each route, then dive into the full
                itinerary.
              </span>

              {/* trek tabs */}
              <span className="mt-6 flex flex-col gap-2">
                {featuredTreks.map((t, i) => (
                  <span
                    key={t.slug}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDir(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 transition-colors ${
                      i === index
                        ? "border-amber-400 bg-amber-400/10"
                        : "border-stone-200 hover:border-amber-400/50"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full font-montserrat text-[11px] font-bold ${
                        i === index ? "bg-amber-400 text-green-900" : "bg-stone-200 text-stone-500"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="truncate font-dm text-sm text-green-900">{t.name}</span>
                  </span>
                ))}
              </span>

              {/* prev / next */}
              <span className="mt-auto flex items-center justify-between pt-6">
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  className="flex h-10 w-10 rotate-180 cursor-pointer items-center justify-center rounded-full border border-stone-300 text-green-800 transition-colors hover:bg-green-700 hover:text-snow"
                >
                  <ArrowRight width={18} height={18} />
                </span>
                <span className="font-montserrat text-xs text-stone-500">
                  {index + 1} / {featuredTreks.length}
                </span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-stone-300 text-green-800 transition-colors hover:bg-green-700 hover:text-snow"
                >
                  <ArrowRight width={18} height={18} />
                </span>
              </span>
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* mobile nav (cover-back is hidden off-screen on small layouts) */}
      <div className="mt-6 flex items-center justify-center gap-4 sm:hidden">
        <button
          onClick={() => go(-1)}
          aria-label="Previous trek"
          className="flex h-11 w-11 rotate-180 items-center justify-center rounded-full border border-stone-300 text-green-800"
        >
          <ArrowRight width={18} height={18} />
        </button>
        <span className="font-montserrat text-xs text-stone-500">
          {index + 1} / {featuredTreks.length}
        </span>
        <button
          onClick={() => go(1)}
          aria-label="Next trek"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 text-green-800"
        >
          <ArrowRight width={18} height={18} />
        </button>
      </div>
    </div>
  );
}
