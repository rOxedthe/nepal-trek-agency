import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { ArrowRight } from "@/components/ui/Icons";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-green-900 py-24 text-center text-snow">
      <AnimatedBackground variant="flags" tone="light" />
      <AnimatedBackground variant="mountains" tone="light" />
      <div className="container-trek relative z-10 px-6">
        <Reveal>
          <p className="eyebrow text-amber-300">Ready When You Are</p>
        </Reveal>
        <Reveal i={1}>
          <h2 className="mx-auto mt-4 max-w-3xl font-playfair text-4xl font-bold leading-tight text-balance md:text-6xl">
            Your Himalayan Adventure Awaits
          </h2>
        </Reveal>
        <Reveal i={2}>
          <p className="mx-auto mt-6 max-w-xl font-lato text-lg text-snow/75">
            Plan your trek with local experts. No cookie-cutter itineraries —
            just journeys built around you.
          </p>
        </Reveal>
        <Reveal i={3}>
          <Link href="/contact" className="btn btn-amber group mt-10">
            Start Planning
            <ArrowRight width={18} height={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
