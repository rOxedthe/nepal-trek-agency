"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gallery, galleryCategories, type GalleryCategory } from "@/data/gallery";
import Lightbox from "@/components/ui/Lightbox";

export default function GalleryGrid() {
  const [active, setActive] = useState<"All" | GalleryCategory>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const photos = useMemo(
    () => (active === "All" ? gallery : gallery.filter((p) => p.category === active)),
    [active],
  );

  return (
    <section className="relative overflow-hidden bg-warm section-pad">
      <div className="container-trek relative z-10">
        {/* Tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2.5">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-5 py-2 font-montserrat text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? "bg-green-700 text-snow shadow-trek"
                  : "border border-stone-200 bg-snow text-stone-800 hover:border-amber-400 hover:text-amber-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry */}
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {photos.map((p, i) => (
            <motion.button
              key={p.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
              onClick={() => setLightbox(i)}
              className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl"
            >
              <div className={`relative w-full ${p.tall ? "h-80" : "h-56"}`}>
                <Image
                  src={p.src}
                  alt={p.title}
                  fill
                  sizes="(max-width:768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/85 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 text-left opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="font-playfair text-base text-snow">{p.title}</p>
                  <p className="font-montserrat text-[10px] uppercase tracking-widest text-amber-300">
                    {p.location}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox
        photos={photos}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={setLightbox}
      />
    </section>
  );
}
