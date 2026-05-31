import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ReviewStats from "@/components/reviews/ReviewStats";
import ReviewsExplorer from "@/components/reviews/ReviewsExplorer";
import ReviewForm from "@/components/reviews/ReviewForm";
import StarRating from "@/components/ui/StarRating";
import { reviewStats } from "@/data/reviews";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Read verified reviews from trekkers who explored the Himalayas with Nepal Trek Agency — rated 4.9/5 across 127 reviews.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Trusted by Trekkers Worldwide"
        title="Stories from the Trail"
        variant="flags"
        height="h-[44vh]"
        crumbs={[{ label: "Home", href: "/" }, { label: "Reviews" }]}
      >
        <div className="mt-5 flex items-center gap-3">
          <StarRating value={Math.round(reviewStats.average)} size={22} />
          <span className="font-montserrat text-sm text-snow/85">
            {reviewStats.average} / 5 · {reviewStats.total} reviews
          </span>
        </div>
      </PageHero>
      <ReviewStats />
      <ReviewsExplorer />
      <ReviewForm />
    </>
  );
}
