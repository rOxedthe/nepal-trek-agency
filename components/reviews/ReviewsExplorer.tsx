"use client";

import { useMemo, useState } from "react";
import { reviews } from "@/data/reviews";
import { treks } from "@/data/treks";
import ReviewCard from "@/components/ui/ReviewCard";

export default function ReviewsExplorer() {
  const [trek, setTrek] = useState("All");
  const [rating, setRating] = useState("All");
  const [country, setCountry] = useState("All");

  const trekOptions = useMemo(
    () => ["All", ...Array.from(new Set(reviews.map((r) => r.trek)))],
    [],
  );
  const countryOptions = useMemo(
    () => ["All", ...Array.from(new Set(reviews.map((r) => r.country)))],
    [],
  );

  const filtered = reviews.filter((r) => {
    if (trek !== "All" && r.trek !== trek) return false;
    if (rating !== "All" && r.rating !== Number(rating)) return false;
    if (country !== "All" && r.country !== country) return false;
    return true;
  });

  return (
    <section className="relative overflow-hidden bg-stone-100 section-pad">
      <div className="container-trek relative z-10">
        <div className="mb-10 grid gap-4 rounded-3xl border border-stone-200 bg-snow p-5 sm:grid-cols-3">
          <Field label="Trek" value={trek} onChange={setTrek} options={trekOptions} />
          <Field label="Rating" value={rating} onChange={setRating} options={["All", "5", "4", "3"]} />
          <Field label="Country" value={country} onChange={setCountry} options={countryOptions} />
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r, i) => (
              <ReviewCard key={r.id} review={r} index={i} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center font-playfair text-2xl text-green-900">
            No reviews match those filters yet.
          </p>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block font-montserrat text-xs font-semibold uppercase tracking-widest text-stone-500">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-stone-200 bg-warm px-4 py-2.5 font-lato text-sm text-green-900 outline-none focus:border-green-600"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o === "All" ? `All ${label.toLowerCase()}s` : o}
          </option>
        ))}
      </select>
    </div>
  );
}
