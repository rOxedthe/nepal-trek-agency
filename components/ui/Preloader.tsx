"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";

const MIN_DURATION = 1700; // keep the splash on screen at least this long

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const start = Date.now();
    const finish = () => {
      const wait = Math.max(0, MIN_DURATION - (Date.now() - start));
      window.setTimeout(() => setLoading(false), wait);
    };
    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
      return () => window.removeEventListener("load", finish);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center overflow-hidden bg-green-900"
        >
          <AnimatedBackground variant="mountains" tone="light" />
          <AnimatedBackground variant="snow" tone="light" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Logo medallion */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -4 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 13, delay: 0.1 }}
              className="relative rounded-2xl bg-white p-3 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.8)] ring-1 ring-amber-400/40"
            >
              <span className="pointer-events-none absolute -inset-2 -z-10 animate-pulse rounded-3xl bg-amber-400/25 blur-lg" />
              <Image
                src="/logo.jpg"
                alt="Nepal Trek Agency"
                width={240}
                height={115}
                priority
                className="h-auto w-[190px] rounded-xl md:w-[230px]"
              />
            </motion.div>

            {/* Progress track */}
            <div className="mt-8 h-[3px] w-48 overflow-hidden rounded-full bg-green-800">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: MIN_DURATION / 1000, ease: "easeInOut" }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-5 font-montserrat text-[11px] uppercase tracking-[0.4em] text-amber-300/80"
            >
              Preparing your expedition
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
