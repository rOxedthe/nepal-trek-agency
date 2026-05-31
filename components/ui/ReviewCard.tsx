"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Review } from "@/data/reviews";
import StarRating from "./StarRating";
import { CheckIcon } from "./Icons";

function initials(name: string) {
  return name
    .split(" ")
    .filter((w) => /[A-Za-z]/.test(w[0]))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function ReviewCard({ review, index = 0 }: { review: Review; index?: number }) {
  const [expanded, setExpanded] = useState(false);
  const long = review.text.length > 220;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
      className="flex h-full flex-col rounded-2xl border border-stone-200 bg-warm p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/60 hover:shadow-trek"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-green-700 font-montserrat text-sm font-bold text-snow">
          {initials(review.name)}
        </div>
        <div className="min-w-0">
          <p className="truncate font-dm text-lg leading-tight text-green-900">
            {review.name}
          </p>
          <p className="font-montserrat text-xs text-stone-500">
            {review.flag} {review.country}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <StarRating value={review.rating} size={16} />
        <span className="rounded-full bg-amber-400/15 px-3 py-1 font-montserrat text-[11px] font-semibold text-amber-600">
          {review.trek}
        </span>
      </div>

      <p
        className={`mt-4 flex-1 font-lato text-sm leading-relaxed text-stone-800 ${!expanded && long ? "line-clamp-4" : ""}`}
      >
        “{review.text}”
      </p>

      {long && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 self-start font-montserrat text-xs font-semibold text-green-600 hover:text-amber-600"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}

      <div className="mt-5 flex items-center justify-between border-t border-stone-200 pt-4">
        <span className="font-montserrat text-xs text-stone-500">{review.date}</span>
        {review.verified && (
          <span className="inline-flex items-center gap-1.5 font-montserrat text-xs font-semibold text-green-600">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-snow">
              <CheckIcon width={11} height={11} />
            </span>
            Verified Trek
          </span>
        )}
      </div>
    </motion.article>
  );
}
