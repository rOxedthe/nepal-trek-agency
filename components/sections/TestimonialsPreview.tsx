import Link from "next/link";
import { reviews } from "@/data/reviews";
import ReviewCard from "@/components/ui/ReviewCard";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { ArrowRight } from "@/components/ui/Icons";

export default function TestimonialsPreview() {
  const featured = reviews.slice(0, 3);
  return (
    <section className="relative overflow-hidden bg-stone-100 section-pad">
      <AnimatedBackground variant="eagles" tone="dark" />
      <div className="container-trek relative z-10">
        <SectionHeading
          eyebrow="Trail Stories"
          title="What Our Trekkers Say"
          subtitle="Real words from real adventurers who shared the trail with us."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {featured.map((r, i) => (
            <ReviewCard key={r.id} review={r} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/reviews" className="btn btn-green group">
            Read All Reviews
            <ArrowRight width={18} height={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
