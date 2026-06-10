"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { ArrowRight, ChevronDown } from "@/components/ui/Icons";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-[#071830] via-green-900 to-green-800" />
  ),
});

export default function HeroSection() {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden">
      {/* 3D backdrop */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-green-900/40 via-transparent to-green-900/90" />
      <AnimatedBackground variant="snow" tone="light" className="z-[2]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="mb-7 flex justify-center"
        >
          <div className="group relative rounded-2xl bg-white p-2.5 shadow-[0_20px_45px_-18px_rgba(0,0,0,0.7)] ring-1 ring-amber-400/40 transition-transform duration-500 hover:scale-[1.03]">
            <span className="pointer-events-none absolute -inset-1 -z-10 rounded-3xl bg-amber-400/20 blur-md" />
            <Image
              src="/logo.jpg"
              alt="Nepal Trek Agency logo"
              width={200}
              height={96}
              priority
              className="h-auto w-[150px] rounded-xl md:w-[190px]"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="eyebrow text-amber-300"
        >
          Est. 2010 · Kathmandu, Nepal
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-6 font-playfair text-5xl font-bold leading-[1.05] text-snow text-balance sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          Trek Beyond <span className="gradient-text">the Horizon</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mx-auto mt-6 max-w-xl font-lato text-lg leading-relaxed text-snow/75 md:text-xl"
        >
          Expert-led Himalayan expeditions from Everest to Annapurna — guided by
          the people who call these mountains home.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/treks" className="btn btn-amber group">
            Explore Treks
            <ArrowRight width={18} height={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/about" className="btn btn-outline">
            Our Story
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <span className="font-montserrat text-[10px] uppercase tracking-[0.3em] text-snow/60">
          Scroll to discover
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="mt-2 flex justify-center text-amber-300"
        >
          <ChevronDown width={22} height={22} />
        </motion.div>
      </motion.div>
    </section>
  );
}
