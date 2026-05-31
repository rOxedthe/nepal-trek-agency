import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "The Himalayas through our eyes — photographs from Everest, Annapurna, Langtang and beyond, captured on Nepal Trek Agency expeditions.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Field Notes"
        title="The Himalayas Through Our Eyes"
        subtitle="Moments from the trail — peaks, prayer flags, people and the in-between."
        image="https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=1600&q=80&auto=format&fit=crop"
        variant="clouds"
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />
      <GalleryGrid />
    </>
  );
}
