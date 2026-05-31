import Image from "next/image";
import Link from "next/link";
import { gallery } from "@/data/gallery";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";

export default function PhotoTeaser() {
  const photos = gallery.slice(0, 6);
  return (
    <section className="relative overflow-hidden bg-warm section-pad">
      <AnimatedBackground variant="clouds" tone="dark" />
      <div className="container-trek relative z-10">
        <SectionHeading
          eyebrow="The Gallery"
          title="The Himalayas Through Our Eyes"
          subtitle="A glimpse of the moments and landscapes that await on the trail."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
          {photos.map((p, i) => (
            <Reveal
              key={p.id}
              i={i}
              className={`group relative overflow-hidden rounded-2xl ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <div className={`relative ${i === 0 ? "h-80 md:h-full" : "h-44 md:h-56"} w-full`}>
                <Image
                  src={p.src}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="font-playfair text-lg text-snow">{p.title}</p>
                  <p className="font-montserrat text-[11px] uppercase tracking-widest text-amber-300">
                    {p.location}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/gallery" className="btn btn-green group">
            View Full Gallery
            <ArrowRight width={18} height={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
