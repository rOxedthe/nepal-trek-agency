import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import FeaturedBooklet from "@/components/sections/FeaturedBooklet";
import { ArrowRight } from "@/components/ui/Icons";

export default function FeaturedTreks() {
  return (
    <section className="relative overflow-hidden bg-warm section-pad">
      <AnimatedBackground variant="pines" tone="dark" />
      <div className="container-trek relative z-10">
        <SectionHeading
          eyebrow="Handpicked Journeys"
          title="Choose Your Adventure"
          subtitle="From gentle hills to Everest Base Camp — open the field guide and turn the pages."
        />

        <div className="mt-16">
          <FeaturedBooklet />
        </div>

        <div className="mt-14 text-center">
          <Link href="/treks" className="btn btn-green group">
            View All Treks
            <ArrowRight width={18} height={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
