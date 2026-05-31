"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryPhoto } from "@/data/gallery";
import { CloseIcon, ArrowRight } from "./Icons";

interface Props {
  photos: GalleryPhoto[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
}

export default function Lightbox({ photos, index, onClose, onNavigate }: Props) {
  const open = index !== null;

  const next = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % photos.length);
  }, [index, photos.length, onNavigate]);

  const prev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + photos.length) % photos.length);
  }, [index, photos.length, onNavigate]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, next, prev, onClose]);

  const photo = index !== null ? photos[index] : null;

  return (
    <AnimatePresence>
      {open && photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-green-900/85 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <button
            aria-label="Close gallery"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-snow/10 text-snow transition-colors hover:bg-amber-400 hover:text-green-900"
            onClick={onClose}
          >
            <CloseIcon width={22} height={22} />
          </button>

          <button
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 rotate-180 items-center justify-center rounded-full bg-snow/10 text-snow transition-colors hover:bg-amber-400 hover:text-green-900 md:left-8"
          >
            <ArrowRight width={22} height={22} />
          </button>
          <button
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-snow/10 text-snow transition-colors hover:bg-amber-400 hover:text-green-900 md:right-8"
          >
            <ArrowRight width={22} height={22} />
          </button>

          <motion.figure
            key={photo.id}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.3 }}
            className="relative flex max-h-[88vh] w-full max-w-5xl flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[72vh] w-full overflow-hidden rounded-2xl">
              <Image
                src={photo.full}
                alt={photo.title}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <figcaption className="mt-4 text-center">
              <p className="font-playfair text-xl text-snow">{photo.title}</p>
              <p className="mt-1 font-montserrat text-xs uppercase tracking-widest text-amber-300">
                {photo.location} · {index! + 1} / {photos.length}
              </p>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
