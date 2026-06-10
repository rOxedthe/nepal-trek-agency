"use client";

import { useState } from "react";
import { StarIcon } from "./Icons";

interface Props {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
  interactive?: boolean;
  className?: string;
}

export default function StarRating({
  value,
  onChange,
  size = 18,
  interactive = false,
  className = "",
}: Props) {
  const [hover, setHover] = useState(0);
  const display = hover || value;

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div
        className="flex"
        onMouseLeave={() => interactive && setHover(0)}
        role={interactive ? "radiogroup" : undefined}
        aria-label={interactive ? "Select a rating" : `Rated ${value} out of 5`}
      >
        {[1, 2, 3, 4, 5].map((n) => {
          const active = n <= display;
          return (
            <button
              key={n}
              type="button"
              disabled={!interactive}
              onMouseEnter={() => interactive && setHover(n)}
              onClick={() => interactive && onChange?.(n)}
              className={`transition-transform duration-200 ${interactive ? "cursor-pointer hover:scale-125" : "cursor-default"}`}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              aria-checked={interactive ? n === value : undefined}
              role={interactive ? "radio" : undefined}
            >
              <StarIcon
                width={size}
                height={size}
                className={active ? "text-amber-600" : "text-stone-200"}
                style={{
                  filter: active ? "drop-shadow(0 1px 2px rgba(200,133,42,0.4))" : "none",
                }}
              />
            </button>
          );
        })}
      </div>
      {interactive && (
        <span className="ml-2 font-montserrat text-sm text-stone-500">
          {value ? `${value} out of 5 stars` : "Tap to rate"}
        </span>
      )}
    </div>
  );
}
