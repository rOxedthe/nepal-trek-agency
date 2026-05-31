import { Suspense } from "react";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import TreksExplorer from "@/components/treks/TreksExplorer";

export const metadata: Metadata = {
  title: "Find Your Trek",
  description:
    "Browse every Nepal Trek Agency expedition — Everest, Annapurna, Langtang, Manaslu and restricted regions. Filter by difficulty, duration and price.",
};

export default function TreksPage() {
  return (
    <>
      <PageHero
        eyebrow="12 Curated Expeditions"
        title="Find Your Trek"
        subtitle="Every route is led by local guides who know the trail by heart. Filter to find the journey that fits you."
        image="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=80&auto=format&fit=crop"
        variant="footprints"
        crumbs={[{ label: "Home", href: "/" }, { label: "Treks" }]}
      />
      <Suspense fallback={<div className="section-pad text-center font-montserrat text-stone-500">Loading treks…</div>}>
        <TreksExplorer />
      </Suspense>
    </>
  );
}
